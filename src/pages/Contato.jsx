import { useEffect, useState } from 'react'
import Nav from '../components/Nav'
import Footer from '../components/Footer'
import ToTop from '../components/ToTop'

const ASSUNTOS = {
  sugestao: 'Sugestão',
  problema: 'Encontrei um problema',
  caso: 'Quero contar como uso',
  beta: 'Quero entrar no beta',
  outro: 'Outro',
}

/** Contato: formulário próprio (o envio ainda vai ser ligado ao Supabase) */
export default function Contato({ release }) {
  const inicial = new URLSearchParams(location.search).get('assunto')
  const [assunto, setAssunto] = useState(ASSUNTOS[inicial] ? inicial : 'sugestao')
  const [sent, setSent] = useState('')
  useEffect(() => {
    const nav = document.getElementById('nav')
    const on = () => nav?.classList.toggle('solid', scrollY > 40)
    on(); addEventListener('scroll', on, { passive: true })
    document.title = 'Contato · G.W.E.N.'
    return () => removeEventListener('scroll', on)
  }, [])
  const onSubmit = (e) => {
    e.preventDefault()
    // TODO: gravar numa tabela do Supabase (gwen_site_messages) quando o envio for ligado
    setSent('O envio ainda não está ligado: a mensagem não foi enviada. Enquanto isso, use as Issues do GitHub.')
  }
  return (
    <>
      <Nav release={release} />
      <main className="contact-page">
        <div className="contact-bg" aria-hidden="true"></div>
        <div className="wrap contact">
          <div className="contact-l">
            <span className="label">$ gwen <b>--contato</b></span>
            <h1 className="h2">Fale com<br /><span className="out">quem faz.</span></h1>
            <p>Sugestão, problema, dúvida ou um relato de como você usa. Quem responde é quem faz a G.W.E.N.</p>
            <ul className="contact-ways">
              <li><i className="ph ph-envelope-simple"></i><span><b>Pelo formulário</b><small>resposta em até alguns dias, no e-mail que você deixar</small></span></li>
              <li><a href="https://github.com/SamaraSilvia81/gwen-app/issues" target="_blank" rel="noopener"><i className="ph ph-github-logo"></i><span><b>Issues no GitHub</b><small>para problemas que outras pessoas também podem ter</small></span><i className="ph ph-arrow-up-right go"></i></a></li>
              <li className="off"><i className="ph ph-discord-logo"></i><span><b>Discord</b><small>a comunidade abre junto com o lançamento público</small></span></li>
            </ul>
          </div>
          <form className="form" onSubmit={onSubmit}>
            <div className="row">
              <label>nome<input type="text" placeholder="Como você se chama" required /></label>
              <label>e-mail<input type="email" placeholder="voce@email.com" required /></label>
            </div>
            <label>assunto
              <select value={assunto} onChange={(e) => setAssunto(e.target.value)}>
                {Object.entries(ASSUNTOS).map(([k, v]) => <option key={k} value={k}>{v}</option>)}
              </select>
            </label>
            <label>mensagem<textarea placeholder={assunto === 'caso' ? 'Conte como você usa a G.W.E.N. no seu dia' : 'Escreva aqui'} required></textarea></label>
            {assunto === 'caso' && <label className="check"><input type="checkbox" /> pode publicar o meu relato no site, com nome e função</label>}
            <button className="btn btn-solid" type="submit"><i className="ph ph-paper-plane-tilt"></i>Enviar</button>
            <small className="n">{sent || `Versão atual: ${release.tag}. Se for um problema, diga o que fez antes de acontecer.`}</small>
          </form>
        </div>
      </main>
      <Footer release={release} />
      <ToTop />
    </>
  )
}
