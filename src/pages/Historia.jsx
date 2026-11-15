import { useEffect } from 'react'
import Nav from '../components/Nav'
import Footer from '../components/Footer'
import ToTop from '../components/ToTop'
import { ORIGEM, NOME, COMO_COMECOU, VERSOES, PROXIMAS, PRINCIPIOS, QUEM_FEZ } from '../content/historia'

/** História: de onde a G.W.E.N. veio, o que o nome quer dizer, as versões e quem fez */
export default function Historia({ release }) {
  useEffect(() => {
    const nav = document.getElementById('nav')
    const on = () => nav?.classList.toggle('solid', scrollY > 40)
    on(); addEventListener('scroll', on, { passive: true })
    document.title = 'História · G.W.E.N.'
    // revela os blocos ao rolar
    const io = new IntersectionObserver((es) => es.forEach((e) => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target) } }), { threshold: 0.14 })
    document.querySelectorAll('.hist .rv').forEach((el) => io.observe(el))
    return () => { removeEventListener('scroll', on); io.disconnect() }
  }, [])

  return (
    <>
      <Nav release={release} />
      <main className="hist">
        {/* abertura */}
        <header className="hist-top">
          <div className="hist-bg" aria-hidden="true"></div>
          <div className="wrap hist-top-c">
            <span className="label">$ gwen <b>--historia</b></span>
            <h1 className="hist-h1">{ORIGEM.titulo[0]}<br /><span className="out">{ORIGEM.titulo[1]}</span></h1>
            <p className="hist-lede">{ORIGEM.subtitulo} {ORIGEM.texto}</p>
          </div>
        </header>

        {/* o nome */}
        <section className="s hist-nome">
          <div className="wrap">
            <div className="s-head rv">
              <span className="label">$ gwen <b>--nome</b></span>
              <h2 className="h2">Quatro letras,<br /><span className="out">quatro promessas.</span></h2>
            </div>
            <div className="acro">
              {NOME.map((n, i) => (
                <div key={n.l} className="acro-i rv" style={{ transitionDelay: `${i * 0.1}s` }}>
                  <span className="acro-l">{n.l}</span>
                  <b>{n.w}</b>
                  <p>{n.p}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* como começou */}
        <section className="s paper hist-comeco">
          <div className="wrap hist-comeco-row">
            <div className="s-head rv">
              <span className="label">$ gwen <b>--comeco</b></span>
              <h2 className="h2">Como<br /><span className="out">começou.</span></h2>
            </div>
            <div className="hist-txt">
              {COMO_COMECOU.map((t, i) => <p key={i} className="rv" style={{ transitionDelay: `${i * 0.1}s` }}>{t}</p>)}
            </div>
          </div>
        </section>

        {/* versões */}
        <section className="s hist-versoes">
          <div className="wrap">
            <div className="s-head rv">
              <span className="label">$ gwen <b>--versoes</b></span>
              <h2 className="h2">Uma versão<br /><span className="out">de cada vez.</span></h2>
            </div>
            <div className="tl">
              <div className="tl-col">
                <span className="tl-cap rv">já lançadas</span>
                {VERSOES.map((v) => (
                  <div key={v.v} className={`tl-i rv${v.atual ? ' now' : ''}`}>
                    <span className="tl-dot" aria-hidden="true"></span>
                    <div><b>v{v.v}{v.atual && <em>atual</em>}</b><small>{v.quando}</small><p>{v.t}</p></div>
                  </div>
                ))}
              </div>
              <div className="tl-col next">
                <span className="tl-cap rv">o que vem</span>
                {PROXIMAS.map((v) => (
                  <div key={v.v} className="tl-i rv">
                    <span className="tl-dot" aria-hidden="true"></span>
                    <div><b>v{v.v}</b><p>{v.t}</p></div>
                  </div>
                ))}
                <a href="/novidades" className="btn btn-ghost tl-more"><i className="ph ph-list-bullets"></i>Ver as notas de cada versão</a>
              </div>
            </div>
          </div>
        </section>

        {/* princípios */}
        <section className="s paper hist-princ">
          <div className="wrap">
            <div className="s-head rv">
              <span className="label">$ gwen <b>--principios</b></span>
              <h2 className="h2">O que não<br /><span className="out">muda.</span></h2>
            </div>
            <div className="princ">
              {PRINCIPIOS.map((p, i) => (
                <div key={p.t} className="princ-i rv" style={{ transitionDelay: `${i * 0.08}s` }}>
                  <i className={`ph ${p.i}`}></i>
                  <h4>{p.t}</h4>
                  <p>{p.p}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* quem fez */}
        <section className="s paper hist-quem">
          <div className="wrap">
            <div className="maker rv">
              <div className="avatar"><img src="/samara.webp" alt="Samara Silvia Sabino" width="896" height="921" /></div>
              <div>
                <span className="label">$ gwen <b>--quem-fez</b></span>
                <h3 style={{ marginTop: 14 }}>{QUEM_FEZ.nome}</h3>
                <p className="role">{QUEM_FEZ.papel}</p>
                <p>{QUEM_FEZ.texto}</p>
                <div className="links">
                  <a href={release.downloadUrl} className="btn btn-ink"><i className="ph-fill ph-windows-logo"></i>Baixar a G.W.E.N.</a>
                  <a href="/contato" className="btn btn-ghost"><i className="ph ph-chat-circle-dots"></i>Falar com ela</a>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer release={release} />
      <ToTop />
    </>
  )
}
