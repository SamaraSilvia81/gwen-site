/**
 * Envio do formulário de contato direto para o Supabase, sem biblioteca: só a API REST.
 * Precisa de duas variáveis no .env (e na Vercel):
 *   VITE_SUPABASE_URL=https://xxxx.supabase.co
 *   VITE_SUPABASE_ANON_KEY=...
 * A tabela e o bucket saem do SQL em extras/supabase-contato.sql.
 * Sem as variáveis, contatoLigado() é false e a página avisa que o envio não está ligado.
 */
const URL_ = import.meta.env.VITE_SUPABASE_URL
const KEY = import.meta.env.VITE_SUPABASE_ANON_KEY
const BUCKET = 'gwen-site-anexos'
export const ANEXO_MAX = 10 * 1024 * 1024 // 10 MB
export const ANEXO_TIPOS = '.png,.jpg,.jpeg,.webp,.gif,.pdf,.txt,.log,.zip'

export const contatoLigado = () => Boolean(URL_ && KEY)

const headers = { apikey: KEY, Authorization: `Bearer ${KEY}` }

async function subirAnexo(file) {
  const seguro = file.name.normalize('NFD').replace(/[^\w.-]+/g, '-').slice(-80)
  const caminho = `${new Date().toISOString().slice(0, 10)}/${crypto.randomUUID()}-${seguro}`
  const r = await fetch(`${URL_}/storage/v1/object/${BUCKET}/${caminho}`, {
    method: 'POST',
    headers: { ...headers, 'Content-Type': file.type || 'application/octet-stream', 'x-upsert': 'false' },
    body: file,
  })
  if (!r.ok) throw new Error('Não deu para enviar o anexo.')
  return caminho
}

export async function enviarContato({ nome, email, assunto, mensagem, publicar, versao, anexo }) {
  if (!contatoLigado()) throw new Error('O envio ainda não está ligado.')
  const anexo_path = anexo ? await subirAnexo(anexo) : null
  const r = await fetch(`${URL_}/rest/v1/gwen_site_messages`, {
    method: 'POST',
    headers: { ...headers, 'Content-Type': 'application/json', Prefer: 'return=minimal' },
    body: JSON.stringify({ nome, email, assunto, mensagem, publicar: Boolean(publicar), versao, anexo_path, anexo_nome: anexo?.name ?? null, pagina: location.href }),
  })
  if (!r.ok) throw new Error('Não deu para enviar agora. Tente de novo em instantes.')
}
