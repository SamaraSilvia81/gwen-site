import { useEffect } from 'react'
import { marked } from 'marked'
import Nav from '../components/Nav'
import Footer from '../components/Footer'
import ToTop from '../components/ToTop'
import { useReleases } from '../lib/release'

const fmt = (d) => (d ? new Date(d).toLocaleDateString('pt-BR', { day: '2-digit', month: 'long', year: 'numeric' }) : '')

/** Novidades: cada release publicada do gwen-app, com as notas, puxada do GitHub */
export default function Novidades({ release }) {
  const list = useReleases()
  useEffect(() => {
    const nav = document.getElementById('nav')
    const on = () => nav?.classList.toggle('solid', scrollY > 40)
    on(); addEventListener('scroll', on, { passive: true })
    document.title = 'Novidades · G.W.E.N.'
    return () => removeEventListener('scroll', on)
  }, [])
  return (
    <>
      <Nav release={release} />
      <div className="news">
        <span className="label">$ gwen <b>--novidades</b></span>
        <h1 className="h2" style={{ marginTop: 18, marginBottom: 46 }}>O que mudou<br /><span className="out">em cada versão.</span></h1>
        {list.length === 0 && <p className="label">Nenhuma versão publicada ainda.</p>}
        {list.map((r, i) => (
          <article key={r.tag} className="news-item">
            <header>
              <h2>{r.tag}{i === 0 && <span className="latest">atual</span>}</h2>
              <time dateTime={r.date}>{fmt(r.date)}</time>
            </header>
            <div className="md" dangerouslySetInnerHTML={{ __html: marked.parse(r.notes || 'Sem notas para esta versão.') }} />
            <div className="news-actions">
              {r.exe && <a href={r.exe.url} className="btn btn-solid"><i className="ph-fill ph-windows-logo"></i>Baixar {r.tag}</a>}
              <a href={r.url} target="_blank" rel="noopener" className="btn btn-ghost"><i className="ph ph-github-logo"></i>Ver no GitHub</a>
            </div>
          </article>
        ))}
      </div>
      <Footer release={release} />
      <ToTop />
    </>
  )
}
