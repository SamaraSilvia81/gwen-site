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
    <div className="reqs rv">
      <div><small><i className="ph ph-windows-logo"></i>sistema</small><b>Windows 10 ou 11</b><span>64 bits</span></div>
      <div><small><i className="ph ph-download-simple"></i>download</small><b>{release.sizeLabel}</b><span>instalador <span className="mono" style={{display:'inline',margin:0}}>{release.fileName}</span></span></div>
      <div><small><i className="ph ph-browser"></i>componente</small><b>WebView2</b><span>já vem no Windows 11; o instalador baixa no 10</span></div>
      <div><small><i className="ph ph-git-branch"></i>opcional</small><b>Git</b><span>para mostrar o status dos repositórios</span></div>
    </div>
  </div>
</section>
    </>
  )
}
