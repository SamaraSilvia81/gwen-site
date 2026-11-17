export default function Privacidade() {
  return (
    <>
{/* ============ 7. PRIVACIDADE ============ */}
<section className="s paper" id="privacidade">
  <svg className="stamp" viewBox="14 14 36 36" aria-hidden="true"><use href="#g" color="#0A0A0B"/></svg>
  <div className="wrap privacy">
    <div className="privacy-l rv">
      <span className="label">$ gwen <b>--privacidade</b></span>
      <h2 className="big" style={{marginTop:'22px'}}>Seus dados <span className="out">não saem</span> daqui.</h2>
      <p>Tudo fica num banco no seu computador. Nada de conta obrigatória, nada de servidor guardando o seu dia.</p>
      <div className="legal">
        <a href="#" title="Página em breve"><i className="ph ph-shield"></i>Política de privacidade</a>
        <a href="#" title="Página em breve"><i className="ph ph-file-text"></i>Termos de uso</a>
      </div>
    </div>
    <div className="plist rv d2">
      <div><i className="ph ph-hard-drives"></i><span><h5>Banco local</h5><p>Projetos, sessões e hábitos ficam num arquivo que é só seu.</p></span></div>
      <div><i className="ph ph-eye-slash"></i><span><h5>Nunca lê as suas janelas</h5><p>O mapeamento registra o nome do programa, nunca o título da janela, o vídeo ou o e-mail aberto.</p></span></div>
      <div><i className="ph ph-shield-check"></i><span><h5>Atualizações assinadas</h5><p>Cada versão nova é verificada antes de instalar e não toca nos seus dados.</p></span></div>
      <div><i className="ph ph-cloud-slash"></i><span><h5>Nuvem só se você quiser</h5><p>Backup em JSON a qualquer hora. Sincronização entre computadores fica como opção.</p></span></div>
      <div><i className="ph ph-chart-bar"></i><span><h5>Registro de quem usa</h5><p>Para saber quem está usando, o app envia o nome e a foto que você escolheu, um código aleatório, a versão e o sistema. Nada do seu dia. Dá para desligar em Ajustes, e desligar apaga o registro.</p></span></div>
    </div>
  </div>
</section>

    </>
  )
}
