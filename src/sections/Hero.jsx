export default function Hero({ release, variant }) {
  return (
    <>
<header className="hero" id="topo" data-v={variant}>
  <div className="hero-top">
    <div className="hero-bg" aria-hidden="true"></div>
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
    </div>
  </div>

  <div className="z90">
    <div className="shot-stage">
      <div className="win" id="heroWin">
        <div className="win-bar"><span className="dots"><i></i><i></i><i></i></span><span>G.W.E.N. / Início</span><span>2 sessões · 1:44:06</span></div>
        <img src="/prints/inicio-roxo.webp" alt="Tela inicial da G.W.E.N. num tema roxo, com duas sessões em paralelo, onde parei, saúde e semana" width="2560" height="1600" />
      </div>
    </div>
    <div className="strip" aria-label="Apps que a G.W.E.N. abre junto com o projeto">
      <div className="strip-t">
        <span><i className="ph ph-code"></i>VS Code</span><span><i className="ph ph-terminal-window"></i>Git Bash</span><span><i className="ph ph-terminal"></i>Windows Terminal</span><span><i className="ph ph-folder-open"></i>Explorer</span><span><i className="ph ph-discord-logo"></i>Discord</span><span><i className="ph ph-whatsapp-logo"></i>WhatsApp</span><span><i className="ph ph-spotify-logo"></i>Spotify</span><span><i className="ph ph-notion-logo"></i>Notion</span><span><i className="ph ph-figma-logo"></i>Figma</span><span><i className="ph ph-github-logo"></i>GitHub</span>
        <span><i className="ph ph-code"></i>VS Code</span><span><i className="ph ph-terminal-window"></i>Git Bash</span><span><i className="ph ph-terminal"></i>Windows Terminal</span><span><i className="ph ph-folder-open"></i>Explorer</span><span><i className="ph ph-discord-logo"></i>Discord</span><span><i className="ph ph-whatsapp-logo"></i>WhatsApp</span><span><i className="ph ph-spotify-logo"></i>Spotify</span><span><i className="ph ph-notion-logo"></i>Notion</span><span><i className="ph ph-figma-logo"></i>Figma</span><span><i className="ph ph-github-logo"></i>GitHub</span>
      </div>
    </div>
    <div className="strip-cta"><a href="#por-dentro"><i className="ph ph-arrow-down"></i>Tudo isso abre junto com o seu projeto. Veja como</a></div>
  </div>
</header>
    </>
  )
}
