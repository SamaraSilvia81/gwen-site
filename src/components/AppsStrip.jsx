// faixa dos apps que a G.W.E.N. abre junto com o projeto (saiu do hero e veio para perto do "por dentro")
export default function AppsStrip({ inHero = false }) {
  return (
    <div className={inHero ? 'apps-strip in-hero' : 'apps-strip'}>
    <div className="strip" aria-label="Apps que a G.W.E.N. abre junto com o projeto">
        <div className="strip-t">
          <span><i className="ph ph-code"></i>VS Code</span><span><i className="ph ph-terminal-window"></i>Git Bash</span><span><i className="ph ph-terminal"></i>Windows Terminal</span><span><i className="ph ph-folder-open"></i>Explorer</span><span><i className="ph ph-discord-logo"></i>Discord</span><span><i className="ph ph-whatsapp-logo"></i>WhatsApp</span><span><i className="ph ph-spotify-logo"></i>Spotify</span><span><i className="ph ph-notion-logo"></i>Notion</span><span><i className="ph ph-figma-logo"></i>Figma</span><span><i className="ph ph-github-logo"></i>GitHub</span>
          <span><i className="ph ph-code"></i>VS Code</span><span><i className="ph ph-terminal-window"></i>Git Bash</span><span><i className="ph ph-terminal"></i>Windows Terminal</span><span><i className="ph ph-folder-open"></i>Explorer</span><span><i className="ph ph-discord-logo"></i>Discord</span><span><i className="ph ph-whatsapp-logo"></i>WhatsApp</span><span><i className="ph ph-spotify-logo"></i>Spotify</span><span><i className="ph ph-notion-logo"></i>Notion</span><span><i className="ph ph-figma-logo"></i>Figma</span><span><i className="ph ph-github-logo"></i>GitHub</span>
        </div>
      </div>
      <div className="strip-cta"><a href="#por-dentro"><i className="ph ph-arrow-down"></i>Tudo isso abre junto com o seu projeto. Veja como</a></div>
      </div>
  )
}
