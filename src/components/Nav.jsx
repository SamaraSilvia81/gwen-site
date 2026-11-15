import { useEffect, useState } from 'react'

const LINKS = [
  ['Como usar', '/#como-usar'],
  ['Recursos', '/#recursos'],
  ['Para você', '/#para-voce'],
  ['Privacidade', '/#privacidade'],
  ['Casos', '/#casos'],
  ['História', '/historia'],
  ['Planos', '/#planos'],
  ['Dúvidas', '/#duvidas'],
  ['Contato', '/contato'],
]

export default function Nav({ release }) {
  const [open, setOpen] = useState(false)
  // fecha o menu ao rolar ou ao voltar para tela larga
  useEffect(() => {
    if (!open) return
    const close = () => setOpen(false)
    addEventListener('scroll', close, { passive: true })
    addEventListener('resize', close)
    return () => { removeEventListener('scroll', close); removeEventListener('resize', close) }
  }, [open])

  // bolinha no sino quando a última versão saiu há menos de 21 dias
  const isNew = release.date ? Date.now() - new Date(release.date).getTime() < 21 * 864e5 : false

  return (
    <nav className={`nav ${open ? 'menu-open' : ''}`} id="nav">
      <div className="nav-in">
        <a href="/#topo" className="logo" aria-label="G.W.E.N., início">
          <svg viewBox="14 14 36 36"><use href="#g" color="#EDEBE7" /><rect className="charge" x="30" y="30" width="20" height="8" fill="#5E5E66" /></svg>
          <span>G.W.E.N.</span>
        </a>
        <ul className="nav-pill">
          {LINKS.map(([label, href]) => <li key={href}><a href={href}>{label}</a></li>)}
        </ul>
        <div className="nav-r">
          <a href="/novidades" className="nav-news" aria-label={`Novidades da versão ${release.tag}`}>
            <i className="ph ph-bell"></i>
            {isNew && <span className="nav-news-dot" aria-hidden="true"></span>}
            <span className="nav-news-tip">Novidades · {release.tag}</span>
          </a>
          <a href="/#baixar" className="btn btn-solid"><i className="ph-bold ph-download-simple"></i>Baixar grátis</a>
          <button className="nav-burger" onClick={() => setOpen((v) => !v)} aria-expanded={open} aria-controls="nav-menu" aria-label={open ? 'Fechar menu' : 'Abrir menu'}>
            <i className={`ph-bold ${open ? 'ph-x' : 'ph-list'}`}></i>
          </button>
        </div>
      </div>
      <div className="nav-menu" id="nav-menu" hidden={!open}>
        {LINKS.map(([label, href]) => <a key={href} href={href} onClick={() => setOpen(false)}>{label}<i className="ph ph-arrow-right"></i></a>)}
        <span className="nav-menu-ver">versão {release.tag} · Windows 10 e 11</span>
      </div>
    </nav>
  )
}
