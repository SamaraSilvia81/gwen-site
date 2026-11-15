// requisitos para instalar: aparece no hero e no fim da página
export default function Reqs({ release, className = '' }) {
  return (
    <div className={`reqs ${className}`}>
      <div><small><i className="ph ph-windows-logo"></i>sistema</small><b>Windows 10 ou 11</b><span>64 bits</span></div>
      <div><small><i className="ph ph-download-simple"></i>download</small><b>{release.sizeLabel}</b><span>instalador <span className="mono" style={{display:'inline',margin:0}}>{release.fileName}</span></span></div>
      <div><small><i className="ph ph-browser"></i>componente</small><b>WebView2</b><span>já vem no Windows 11; o instalador baixa no 10</span></div>
      <div><small><i className="ph ph-git-branch"></i>opcional</small><b>Git</b><span>para mostrar o status dos repositórios</span></div>
    </div>
  )
}
