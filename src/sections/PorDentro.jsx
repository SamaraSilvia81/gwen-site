export default function PorDentro() {
  return (
    <>
{/* ============ 4. A FAIXA, POR DENTRO ============ */}
<section className="s" id="por-dentro" style={{paddingTop:'0'}}>
  <span className="glow" style={{width:'460px', height:'460px', left:'-160px', top:'30%'}}></span>
  <div className="wrap">
    <div className="s-head rv">
      <span className="label">$ gwen <b>--começar-agora</b></span>
      <h2 className="h2">O que acontece<br /><span className="out">quando você clica.</span></h2>
      <p>Você monta o ambiente uma vez. A G.W.E.N. lembra e repete, todo dia, na ordem certa.</p>
    </div>
    <div className="launch">
      <div className="lp rv" id="lp">
        <div className="lp-h"><b>Loja Aurora · Checkout</b><span>frente: front</span></div>
        <div className="lp-row"><i className="ic ph ph-code"></i><span><strong>Pasta no VS Code</strong><small>C:\dev\loja-aurora</small></span><span className="st"><i className="ph ph-check"></i>aberto</span></div>
        <div className="lp-row"><i className="ic ph ph-terminal-window"></i><span><strong>Git Bash na pasta</strong><small>main · 2 alterações</small></span><span className="st"><i className="ph ph-check"></i>aberto</span></div>
        <div className="lp-row"><i className="ic ph ph-play"></i><span><strong>Comando</strong><small>yarn dev</small></span><span className="st"><i className="ph ph-check"></i>rodando</span></div>
        <div className="lp-row"><i className="ic ph ph-globe-simple"></i><span><strong>Links</strong><small>repositório · Jira · Figma</small></span><span className="st"><i className="ph ph-check"></i>3 abas</span></div>
        <div className="lp-row"><i className="ic ph ph-spotify-logo"></i><span><strong>Apps</strong><small>Discord · Spotify</small></span><span className="st"><i className="ph ph-check"></i>aberto</span></div>
        <div className="lp-f"><span className="t" id="lpTime">00:00:00</span><span className="btn btn-solid"><i className="ph-fill ph-play"></i>Começar agora</span></div>
      </div>
      <div className="kinds">
        <div className="kind hov rv"><i className="ph ph-folder-open"></i><h5>Pastas</h5><p>Cada pasta abre no que você escolher: VS Code, Explorer, Git Bash, Windows Terminal ou PowerShell.</p></div>
        <div className="kind hov rv d1"><i className="ph ph-terminal"></i><h5>Comandos</h5><p>O servidor de desenvolvimento já sobe sozinho, como <span className="mono">yarn dev</span> ou <span className="mono">npm start</span>.</p></div>
        <div className="kind hov rv d2"><i className="ph ph-link"></i><h5>Links</h5><p>Repositório, Jira, Confluence, Figma. O link do GitHub vem sozinho da pasta.</p></div>
        <div className="kind hov rv d3"><i className="ph ph-app-window"></i><h5>Apps</h5><p>Discord, WhatsApp, Spotify, Notion ou qualquer programa do seu computador.</p></div>
      </div>
    </div>

    <div className="integ">
      <div className="ig hov rv"><i className="ph ph-code"></i><b>VS Code</b><small>pasta</small><p>Abre a pasta do projeto no editor.</p></div>
      <div className="ig hov rv d1"><i className="ph ph-terminal-window"></i><b>Git Bash</b><small>pasta</small><p>Terminal já dentro da pasta, com o status do Git no card.</p></div>
      <div className="ig hov rv d2"><i className="ph ph-terminal"></i><b>Windows Terminal</b><small>pasta e comando</small><p>Roda o comando da pasta, como <span className="mono">yarn dev</span>.</p></div>
      <div className="ig hov rv d3"><i className="ph ph-folder-open"></i><b>Explorer</b><small>pasta</small><p>Abre a pasta no Windows para arrastar arquivos.</p></div>
      <div className="ig hov rv"><i className="ph ph-github-logo"></i><b>GitHub</b><small>link e tarefas</small><p>Link do repositório automático e Issues como tarefas.</p></div>
      <div className="ig hov rv d1"><i className="ph ph-figma-logo"></i><b>Figma</b><small>link</small><p>O arquivo de design abre numa aba junto com o resto.</p></div>
      <div className="ig hov rv d2"><i className="ph ph-notion-logo"></i><b>Notion</b><small>app ou link</small><p>A página do projeto ou o app instalado.</p></div>
      <div className="ig hov rv d3"><i className="ph ph-discord-logo"></i><b>Discord</b><small>app</small><p>Abre junto para falar com o time ou o cliente.</p></div>
      <div className="ig hov rv"><i className="ph ph-whatsapp-logo"></i><b>WhatsApp</b><small>app</small><p>O app do Windows, aberto com o projeto.</p></div>
      <div className="ig hov rv d1"><i className="ph ph-spotify-logo"></i><b>Spotify</b><small>app</small><p>A sua trilha de foco começa junto com a sessão.</p></div>
    </div>
    <p className="integ-cap rv">Não está na lista? Qualquer programa pelo caminho do <span className="mono">.exe</span> ou por protocolo (<span className="mono">app://</span>) também entra.</p>
  </div>
</section>

    </>
  )
}
