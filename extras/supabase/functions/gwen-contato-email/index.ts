// Edge Function do Supabase: manda os e-mails do formulário de contato do site da G.W.E.N. pelo Resend.
// Disparada por um Database Webhook no INSERT de public.gwen_site_messages.
//   1) avisa a Samara que chegou mensagem (com link do anexo, se houver)
//   2) manda a confirmação para quem escreveu
//
// Segredos (Edge Functions > Secrets):
//   RESEND_API_KEY   chave do Resend
//   CONTATO_PARA     e-mail que recebe os avisos (o seu)
//   CONTATO_DE       remetente, ex.: G.W.E.N. <contato@seudominio.com> (sem domínio verificado: onboarding@resend.dev)
// SUPABASE_URL e SUPABASE_SERVICE_ROLE_KEY já existem em toda Edge Function.

import { createClient } from 'npm:@supabase/supabase-js@2'

const ASSUNTOS: Record<string, string> = {
  sugestao: 'Sugestão',
  problema: 'Encontrei um problema',
  caso: 'Quero contar como uso',
  beta: 'Quero entrar no beta',
  outro: 'Outro',
}

const esc = (s: unknown) => String(s ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]!))
const quebra = (s: unknown) => esc(s).replace(/\n/g, '<br>')

// moldura noir dos e-mails: preto, branco e cinzas, igual ao site
const moldura = (titulo: string, corpo: string) => `<!doctype html><html><body style="margin:0;background:#0A0A0B;padding:32px 16px;font-family:Inter,Arial,sans-serif;color:#EDEBE7">
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0"><tr><td align="center">
    <table role="presentation" width="560" cellspacing="0" cellpadding="0" style="max-width:560px;background:#121214;border:1px solid #26262A;border-radius:16px">
      <tr><td style="padding:28px 32px 8px;font-family:'JetBrains Mono',monospace;font-size:12px;letter-spacing:.2em;color:#77777F">G.W.E.N.</td></tr>
      <tr><td style="padding:0 32px;font-size:24px;font-weight:700;line-height:1.2;color:#EDEBE7">${titulo}</td></tr>
      <tr><td style="padding:20px 32px 32px;font-size:15px;line-height:1.6;color:#C9C6C0">${corpo}</td></tr>
    </table>
    <p style="font-family:'JetBrains Mono',monospace;font-size:11px;color:#55555C;margin-top:18px">Gestão de Wellness, Eficiência e Navegação</p>
  </td></tr></table></body></html>`

async function enviar(para: string, assunto: string, html: string, responderPara?: string) {
  const r = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: { Authorization: `Bearer ${Deno.env.get('RESEND_API_KEY')}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({ from: Deno.env.get('CONTATO_DE'), to: [para], subject: assunto, html, ...(responderPara ? { reply_to: responderPara } : {}) }),
  })
  if (!r.ok) throw new Error(`Resend ${r.status}: ${await r.text()}`)
}

Deno.serve(async (req) => {
  try {
    const { type, record: m } = await req.json()
    if (type !== 'INSERT' || !m) return new Response('ignorado', { status: 200 })

    const assunto = ASSUNTOS[m.assunto] ?? m.assunto
    let anexoHtml = ''
    if (m.anexo_path) {
      // link temporário (7 dias) para o anexo no bucket privado
      const sb = createClient(Deno.env.get('SUPABASE_URL')!, Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!)
      const { data } = await sb.storage.from('gwen-site-anexos').createSignedUrl(m.anexo_path, 60 * 60 * 24 * 7)
      if (data?.signedUrl) anexoHtml = `<p><b style="color:#EDEBE7">Anexo:</b> <a href="${data.signedUrl}" style="color:#EDEBE7">${esc(m.anexo_nome || 'arquivo')}</a> <span style="color:#77777F">(link vale por 7 dias)</span></p>`
    }

    // 1) aviso para você; "responder" já vai para quem escreveu
    await enviar(
      Deno.env.get('CONTATO_PARA')!,
      `[G.W.E.N.] ${assunto} · ${m.nome}`,
      moldura(`${esc(assunto)}`, `
        <p><b style="color:#EDEBE7">${esc(m.nome)}</b> &lt;${esc(m.email)}&gt;</p>
        <p style="border-left:2px solid #3A3A40;padding-left:14px">${quebra(m.mensagem)}</p>
        ${anexoHtml}
        <p style="font-family:'JetBrains Mono',monospace;font-size:12px;color:#77777F">versão ${esc(m.versao || '?')}${m.publicar ? ' · pode publicar o relato' : ''}</p>`),
      m.email,
    )

    // 2) confirmação para quem escreveu. Sem domínio verificado (remetente onboarding@resend.dev),
    //    o Resend só entrega para o dono da conta, então a confirmação fica desligada até ter domínio.
    if ((Deno.env.get('CONTATO_DE') ?? '').includes('resend.dev')) return new Response('ok (sem confirmação: falta domínio)', { status: 200 })
    await enviar(
      m.email,
      'Recebemos a sua mensagem · G.W.E.N.',
      moldura('Mensagem recebida.', `
        <p>Oi, ${esc(String(m.nome).split(' ')[0])}. Obrigada por escrever. A resposta chega neste e-mail em até alguns dias.</p>
        <p style="margin-top:22px;font-family:'JetBrains Mono',monospace;font-size:12px;color:#77777F">o que você enviou · ${esc(assunto)}</p>
        <p style="border-left:2px solid #3A3A40;padding-left:14px">${quebra(m.mensagem)}</p>
        <p style="margin-top:22px">Samara, de quem faz a G.W.E.N.</p>`),
    )

    return new Response('ok', { status: 200 })
  } catch (e) {
    console.error(e)
    return new Response(String(e), { status: 500 })
  }
})
