import AppsStrip, { StripCta } from '../components/AppsStrip'
import Reqs from '../components/Reqs'

// layout b: o hero fica só com o texto e uma seta; a faixa, o print e o card 2x2 vêm logo depois (ver HeroB em App)
export default function Hero({ release, variant, strip = false, layout = 'a' }) {
  const b = layout !== 'a'
  return (
    <>
<header className="hero" id="topo" data-v={variant}>
  <div className="hero-top">
    <div className="hero-bg" aria-hidden="true"></div>
    <div className="hero-dof" aria-hidden="true"><i></i><i></i><i></i></div>
    <div className="blobs" aria-hidden="true"><span className="blob b1"></span><span className="blob b2"></span><span className="blob b3"></span><span className="lines"></span></div>
    <div className="hero-c">
      <span className="badge"><em>beta</em><span>{release.tag} · para Windows 10 e 11</span></span>
      <h1 className="h1">
        <span className="l"><span>Seu trabalho em um clique.</span></span>
        <span className="l"><span className="out">Sua pausa, a sério.</span></span>
      </h1>
      <p className="lede">Abre seus projetos, conta o seu tempo e lembra você de parar.</p>
      <div className="cta">
        <a href={release.downloadUrl} className="btn btn-solid"><i className="ph-fill ph-windows-logo"></i>Baixar grátis para Windows</a>
        <a href="#como-usar" className="btn btn-ghost"><i className="ph ph-play-circle"></i>Ver como funciona</a>
      </div>
      {!b && <Reqs release={release} className="hero-reqs" />}
    </div>
    {b && <a href="#depois-hero" className="hero-arrow" aria-label="Rolar para baixo"><i className="ph ph-arrow-down"></i></a>}
  </div>

  {!b && <div className="z90">
    <div className="shot-stage">
      <div className="win" id="heroWin">
        <div className="win-bar"><span className="dots"><i></i><i></i><i></i></span><span>G.W.E.N. / Início</span><span>2 sessões · 1:44:06</span></div>
        <img src="/prints/inicio-roxo.webp" alt="Tela inicial da G.W.E.N. num tema roxo, com duas sessões em paralelo, onde parei, saúde e semana" width="2560" height="1600" />
      </div>
    </div>
    <AppsStrip inHero />
    {strip && <StripCta />}
</div>}
</header>
    </>
  )
}

// layouts b, c e d: a faixa dos apps vem logo depois do hero
export function StripBlock({ strip = false }) {
  return (
    <div className="hero-b" id="depois-hero">
      <AppsStrip />
      {strip && <StripCta />}
    </div>
  )
}

const HeroWin = () => (
  <div className="win">
    <div className="win-bar"><span className="dots"><i></i><i></i><i></i></span><span>G.W.E.N. / Início</span><span>2 sessões · 1:44:06</span></div>
    <img src="/prints/inicio-roxo.webp" alt="Tela inicial da G.W.E.N. num tema roxo, com duas sessões em paralelo, onde parei, saúde e semana" width="2560" height="1600" />
  </div>
)

// layouts b e c: o print com o card de requisitos 2x2 ao lado
export function ShotReqs({ release }) {
  return (
    <div className="wrap hero-b-row">
      <HeroWin />
      <Reqs release={release} className="grid2" />
    </div>
  )
}

// layout d: seção clara com o print e um texto ao lado
export function ShotText() {
  return (
    <section className="s paper shot-text" id="inicio-app">
      <div className="wrap shot-text-row">
        <HeroWin />
        <div className="shot-text-t">
          <span className="label">$ gwen <b>--inicio</b></span>
          <h2 className="h2">Tudo do seu dia<br /><span className="out">numa tela só.</span></h2>
          <p>Sessões em paralelo, onde você parou, os lembretes de saúde e a sua semana. É a primeira coisa que aparece quando você abre a G.W.E.N.</p>
        </div>
      </div>
    </section>
  )
}
