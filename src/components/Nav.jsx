export default function Nav({ release }) {
  return (
    <>
<nav className="nav" id="nav">
  <div className="wrap">
    <a href="/#topo" className="logo" aria-label="G.W.E.N., início">
      <svg viewBox="14 14 36 36"><use href="#g" color="#EDEBE7"/><rect className="charge" x="30" y="30" width="20" height="8" fill="#5E5E66"/></svg>
      <span>G.W.E.N.</span>
    </a>
    <ul className="nav-pill">
      <li><a href="/#como-usar">Como usar</a></li>
      <li><a href="/#recursos">Recursos</a></li>
      <li><a href="/#para-voce">Para você</a></li>
      <li><a href="/#privacidade">Privacidade</a></li>
      <li><a href="/#casos">Casos</a></li>
      <li><a href="/#planos">Planos</a></li>
      <li><a href="/#duvidas">Dúvidas</a></li>
    </ul>
    <div className="nav-r">
      <span className="ver">{release.tag}</span>
      <a href="/#baixar" className="btn btn-solid"><i className="ph-bold ph-download-simple"></i>Baixar grátis</a>
    </div>
  </div>
</nav>

    </>
  )
}
