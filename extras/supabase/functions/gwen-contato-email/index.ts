// Edge Function do Supabase: manda os e-mails do formulário de contato do site da G.W.E.N. pelo Gmail (SMTP).
// Disparada por um Database Webhook no INSERT de public.gwen_site_messages.
//   1) avisa você que chegou mensagem (dados, mensagem e anexo com prévia)
//   2) manda a confirmação para quem escreveu (cópia da mensagem e do anexo)
//
// Segredos (Edge Functions > Secrets):
//   GMAIL_USER          Gmail que ENVIA os e-mails (pode ser uma conta só da G.W.E.N., com o logo de foto)
//   GMAIL_APP_PASSWORD  senha de app do Google desse Gmail (16 letras)
//   CONTATO_PARA        opcional: onde VOCÊ recebe os avisos. Sem ele, os avisos vão para o GMAIL_USER
//   SITE_URL            opcional: endereço do site, para o logo e os links (padrão https://gwenapp.vercel.app)
// O Supabase só libera a porta 465 para SMTP, por isso ela está fixa aqui.
// SUPABASE_URL e SUPABASE_SERVICE_ROLE_KEY já existem em toda Edge Function.

import { createClient } from 'npm:@supabase/supabase-js@2'
import nodemailer from 'npm:nodemailer@6'

const USER = Deno.env.get('GMAIL_USER')!
const PARA = Deno.env.get('CONTATO_PARA') || USER
const SITE = (Deno.env.get('SITE_URL') || 'https://gwenapp.vercel.app').replace(/\/$/, '')
const REF = (Deno.env.get('SUPABASE_URL') || '').replace('https://', '').split('.')[0]

const ASSUNTOS: Record<string, string> = {
  sugestao: 'Sugestão',
  problema: 'Encontrei um problema',
  caso: 'Quero contar como uso',
  beta: 'Quero entrar no beta',
  outro: 'Outro',
}

const esc = (s: unknown) => String(s ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]!))
const quebra = (s: unknown) => esc(s).replace(/\n/g, '<br>')
const quando = (iso: string) => new Date(iso).toLocaleString('pt-BR', { timeZone: 'America/Recife', day: '2-digit', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit' })
const ehImagem = (nome = '') => /\.(png|jpe?g|webp|gif)$/i.test(nome)

// ---------- peças do e-mail (tabelas e estilos inline, para funcionar no Gmail e no Outlook) ----------
const MONO = "'JetBrains Mono',Consolas,monospace"
const C = { void: '#0A0A0B', card: '#121214', alt: '#19191C', rule: '#26262A', bone: '#EDEBE7', txt: '#C9C6C0', muted: '#77777F' }

const linha = (rotulo: string, valor: string) => `
  <tr>
    <td style="padding:10px 0;border-bottom:1px solid ${C.rule};font-family:${MONO};font-size:11px;letter-spacing:.1em;text-transform:uppercase;color:${C.muted};width:110px;vertical-align:top">${rotulo}</td>
    <td style="padding:10px 0;border-bottom:1px solid ${C.rule};font-size:14px;color:${C.bone}">${valor}</td>
  </tr>`

const botao = (texto: string, href: string, claro = true) => `
  <a href="${href}" style="display:inline-block;margin:0 8px 8px 0;padding:12px 22px;border-radius:999px;font-size:14px;font-weight:600;text-decoration:none;${claro ? `background:${C.bone};color:${C.void}` : `border:1px solid #3A3A40;color:${C.bone}`}">${texto}</a>`

const blocoMensagem = (m: any) => `
  <div style="margin-top:26px;font-family:${MONO};font-size:11px;letter-spacing:.1em;text-transform:uppercase;color:${C.muted}">mensagem</div>
  <div style="margin-top:10px;padding:18px 20px;background:${C.alt};border:1px solid ${C.rule};border-radius:12px;font-size:15px;line-height:1.65;color:${C.bone}">${quebra(m.mensagem)}</div>`

const blocoAnexo = (m: any, url: string | null) => {
  if (!m.anexo_path || !url) return ''
  const previa = ehImagem(m.anexo_nome)
    ? `<a href="${url}"><img src="${url}" alt="${esc(m.anexo_nome)}" width="100%" style="display:block;max-width:100%;border-radius:10px;border:1px solid ${C.rule};margin-bottom:12px"></a>`
    : ''
  return `
  <div style="margin-top:26px;font-family:${MONO};font-size:11px;letter-spacing:.1em;text-transform:uppercase;color:${C.muted}">anexo</div>
  <div style="margin-top:10px;padding:16px;background:${C.alt};border:1px solid ${C.rule};border-radius:12px">
    ${previa}
    <table role="presentation" width="100%" cellspacing="0" cellpadding="0"><tr>
      <td style="font-size:14px;color:${C.bone};word-break:break-all">${esc(m.anexo_nome || 'arquivo')}</td>
      <td align="right" style="white-space:nowrap"><a href="${url}" style="font-family:${MONO};font-size:12px;color:${C.bone}">abrir ↗</a></td>
    </tr></table>
    <div style="margin-top:6px;font-family:${MONO};font-size:11px;color:${C.muted}">o link vale por 7 dias</div>
  </div>`
}

const moldura = ({ etiqueta, titulo, intro, corpo, botoes, rodapeNota }: { etiqueta: string; titulo: string; intro: string; corpo: string; botoes: string; rodapeNota: string }) => `<!doctype html>
<html lang="pt-BR"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="color-scheme" content="dark"><title>${esc(titulo)}</title></head>
<body style="margin:0;padding:0;background:${C.void};font-family:Inter,Segoe UI,Arial,sans-serif;color:${C.txt}">
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background:${C.void}"><tr><td align="center" style="padding:36px 14px">
    <table role="presentation" width="600" cellspacing="0" cellpadding="0" style="max-width:600px;width:100%">
      <!-- topo com o logo -->
      <tr><td style="padding:0 6px 18px">
        <table role="presentation" width="100%" cellspacing="0" cellpadding="0"><tr>
          <td><a href="${SITE}"><img src="${SITE}/email/gwen-wordmark.png" alt="G.W.E.N." width="150" style="display:block;width:150px;height:auto;border:0"></a></td>
          <td align="right" style="font-family:${MONO};font-size:11px;letter-spacing:.12em;text-transform:uppercase;color:${C.muted}">${etiqueta}</td>
        </tr></table>
      </td></tr>
      <!-- cartão -->
      <tr><td style="background:${C.card};border:1px solid ${C.rule};border-radius:18px;padding:34px 34px 30px">
        <div style="font-size:28px;font-weight:700;letter-spacing:-.02em;line-height:1.15;color:${C.bone}">${titulo}</div>
        <div style="margin-top:12px;font-size:15px;line-height:1.6;color:${C.txt}">${intro}</div>
        ${corpo}
        <div style="margin-top:28px">${botoes}</div>
      </td></tr>
      <!-- rodapé com o logo -->
      <tr><td style="padding:26px 6px 0">
        <table role="presentation" width="100%" cellspacing="0" cellpadding="0"><tr>
          <td width="44" style="vertical-align:middle"><img src="${SITE}/email/gwen-avatar.png" alt="" width="36" height="36" style="display:block;border-radius:9px;border:0"></td>
          <td style="vertical-align:middle;padding-left:12px">
            <div style="font-size:14px;font-weight:700;letter-spacing:.18em;color:${C.bone}">G.W.E.N.</div>
            <div style="font-family:${MONO};font-size:11px;color:${C.muted};margin-top:3px">Gestão de Wellness, Eficiência e Navegação</div>
          </td>
          <td align="right" style="vertical-align:middle;font-size:12px">
            <a href="${SITE}" style="color:${C.txt};text-decoration:none">site</a>
            <span style="color:#3A3A40"> · </span>
            <a href="${SITE}/novidades" style="color:${C.txt};text-decoration:none">novidades</a>
            <span style="color:#3A3A40"> · </span>
            <a href="${SITE}/historia" style="color:${C.txt};text-decoration:none">história</a>
          </td>
        </tr></table>
        <div style="margin-top:18px;font-size:11.5px;line-height:1.6;color:#55555C">${rodapeNota}</div>
      </td></tr>
    </table>
  </td></tr></table>
</body></html>`

const smtp = nodemailer.createTransport({ host: 'smtp.gmail.com', port: 465, secure: true, auth: { user: USER, pass: Deno.env.get('GMAIL_APP_PASSWORD') } })
const enviar = (to: string, subject: string, html: string, replyTo?: string) =>
  smtp.sendMail({ from: `G.W.E.N. <${USER}>`, to, subject, html, ...(replyTo ? { replyTo } : {}) })

Deno.serve(async (req) => {
  try {
    const { type, record: m } = await req.json()
    if (type !== 'INSERT' || !m) return new Response('ignorado', { status: 200 })

    const assunto = ASSUNTOS[m.assunto] ?? m.assunto
    const primeiroNome = String(m.nome).trim().split(' ')[0]

    // link temporário (7 dias) do anexo, que fica num bucket privado
    let anexoUrl: string | null = null
    if (m.anexo_path) {
      const sb = createClient(Deno.env.get('SUPABASE_URL')!, Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!)
      const { data } = await sb.storage.from('gwen-site-anexos').createSignedUrl(m.anexo_path, 60 * 60 * 24 * 7)
      anexoUrl = data?.signedUrl ?? null
    }

    const dados = `
      <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="margin-top:24px;border-top:1px solid ${C.rule}">
        ${linha('de', `${esc(m.nome)} <span style="color:${C.muted}">&lt;${esc(m.email)}&gt;</span>`)}
        ${linha('assunto', esc(assunto))}
        ${linha('enviada', esc(quando(m.created_at)))}
        ${linha('versão', esc(m.versao || '?'))}
        ${m.assunto === 'caso' ? linha('publicar', m.publicar ? 'pode publicar no site' : 'não publicar') : ''}
      </table>`

    // 1) aviso para você; "responder" já vai para quem escreveu
    await enviar(
      PARA,
      `[G.W.E.N.] ${assunto} · ${m.nome}`,
      moldura({
        etiqueta: 'nova mensagem',
        titulo: `${esc(primeiroNome)} escreveu pelo site.`,
        intro: `Chegou uma mensagem nova pelo formulário de contato.`,
        corpo: dados + blocoMensagem(m) + blocoAnexo(m, anexoUrl),
        botoes: botao(`Responder ${esc(primeiroNome)}`, `mailto:${encodeURIComponent(m.email)}?subject=${encodeURIComponent(`Re: ${assunto} · G.W.E.N.`)}`) +
          (REF ? botao('Ver no Supabase', `https://supabase.com/dashboard/project/${REF}/editor`, false) : ''),
        rodapeNota: 'Aviso automático do formulário de contato do site da G.W.E.N.',
      }),
      m.email,
    )

    // 2) confirmação para quem escreveu, com cópia da mensagem e do anexo
    await enviar(
      m.email,
      'Recebemos a sua mensagem · G.W.E.N.',
      moldura({
        etiqueta: 'mensagem recebida',
        titulo: `Oi, ${esc(primeiroNome)}. Mensagem recebida.`,
        intro: `Obrigada por escrever. Quem responde é quem faz a G.W.E.N., e a resposta chega neste e-mail em até alguns dias.`,
        corpo: `
          <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="margin-top:24px;border-top:1px solid ${C.rule}">
            ${linha('assunto', esc(assunto))}
            ${linha('enviada', esc(quando(m.created_at)))}
          </table>` + blocoMensagem(m) + blocoAnexo(m, anexoUrl) + `
          <div style="margin-top:26px;font-size:15px;color:${C.txt}">Samara Silvia Sabino<br><span style="font-family:${MONO};font-size:12px;color:${C.muted}">quem faz a G.W.E.N.</span></div>`,
        botoes: botao('Ver as novidades', `${SITE}/novidades`) + botao('Conhecer a história', `${SITE}/historia`, false),
        rodapeNota: 'Você recebeu este e-mail porque escreveu pelo formulário de contato do site da G.W.E.N. Se não foi você, é só ignorar.',
      }),
    )

    return new Response('ok', { status: 200 })
  } catch (e) {
    console.error(e)
    return new Response(String(e), { status: 500 })
  }
})
