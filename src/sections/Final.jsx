import Reqs from '../components/Reqs'

export default function Final({ release }) {
  return (
    <>
{/* ============ CTA FINAL ============ */}
<section className="final" id="baixar">
  <div className="final-bg" aria-hidden="true"></div>
  <div className="wrap z90">
    <div className="final-c rv">
      <span className="label">$ gwen <b>--instalar</b></span>
      <h2 className="h2" style={{marginTop:'18px'}}>Comece pelo<br /><span className="out">próximo projeto.</span></h2>
      <p>Baixe, cadastre um projeto e aperte Começar agora.</p>
      <div className="cta">
        <a href={release.downloadUrl} className="btn btn-solid"><i className="ph-fill ph-windows-logo"></i>Baixar grátis para Windows</a>
        <a href="/novidades" className="btn btn-ghost"><i className="ph ph-list-bullets"></i>Ver o que mudou</a>
      </div>
    </div>
    <Reqs release={release} />
  </div>
</section>
    </>
  )
}
