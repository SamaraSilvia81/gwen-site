export default function Dia() {
  return (
    <>
{/* ============ 1. IDENTIFICAÇÃO ============ */}
<section className="s" id="dia">
  <span className="glow" style={{width:'520px', height:'520px', left:'-200px', top:'20%'}}></span>
  <div className="wrap">
    <div className="s-head c rv">
      <span className="label">$ gwen <b>--segunda-feira</b></span>
      <h2 className="h2">Você já viveu<br /><span className="out">esse dia.</span></h2>
    </div>
    <div className="story">
      <div className="beat rv"><time>09:00</time><p>Abre o VS Code. Depois o terminal. Procura a pasta certa, roda o <span>yarn dev</span>, abre o Jira, o Figma, o repositório...</p></div>
      <div className="beat rv"><time>09:14</time><p><em>Quatorze minutos</em> depois, ainda não escreveu uma linha.</p></div>
      <div className="beat rv"><time>15:40</time><p>Faz quatro horas que não levanta da cadeira. <em>Nem um copo de água.</em></p></div>
      <div className="beat rv"><time>19:30</time><p>Trabalhou o dia inteiro em três projetos. Quanto em cada um? <em>Não sabe dizer.</em></p></div>
    </div>
    <div className="story-end rv">
      <p>A G.W.E.N. existe<br /><span className="out">para esses três momentos.</span></p>
      <div className="map"><span><i className="ph ph-lightning"></i>abrir tudo de uma vez</span><span><i className="ph ph-coffee"></i>lembrar de parar</span><span><i className="ph ph-timer"></i>saber para onde o dia foi</span></div>
    </div>
  </div>
</section>

    </>
  )
}
