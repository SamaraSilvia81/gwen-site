import { useState } from 'react'

export default function Contato() {
  const [sent, setSent] = useState('')
  const onSubmit = (e) => {
    e.preventDefault()
    // TODO: gravar numa tabela do Supabase (gwen_site_messages) quando o envio for ligado
    setSent('Ainda não está ligado: a mensagem não foi enviada.')
  }
  return (
    <>
{/* ============ 9. COMUNIDADE E CONTATO ============ */}
<section className="s" id="contato" style={{paddingTop:'0'}}>
  <div className="wrap contact">
    <div className="contact-l rv">
      <span className="label">$ gwen <b>--contato</b></span>
      <h2 className="h2">Fale com<br /><span className="out">quem faz.</span></h2>
      <p>Enquanto a comunidade não abre, fale direto com quem faz. Sugestão, problema, dúvida ou um relato do seu uso.</p>
      <div className="soon"><span><i className="ph ph-discord-logo"></i>Discord em breve</span><span><i className="ph ph-github-logo"></i>Issues no GitHub</span></div>
    </div>
    <form className="form rv d1" onSubmit={onSubmit}>
      <div className="row">
        <label>nome<input type="text" placeholder="Como você se chama" required /></label>
        <label>e-mail<input type="email" placeholder="voce@email.com" required /></label>
      </div>
      <label>assunto<select><option>Sugestão</option><option>Encontrei um problema</option><option>Quero contar como uso</option><option>Outro</option></select></label>
      <label>mensagem<textarea placeholder="Escreva aqui" required></textarea></label>
      <button className="btn btn-solid" type="submit"><i className="ph ph-paper-plane-tilt"></i>Enviar</button>
      <small className="n">{sent || 'Resposta em até alguns dias, pelo e-mail que você deixar.'}</small>
    </form>
  </div>
</section>

    </>
  )
}
