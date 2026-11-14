export default function Mais() {
  return (
    <>
{/* ============ 5. E O RESTO ============ */}
<section className="s" style={{paddingTop:'0'}}>
  <div className="wrap">
    <div className="s-head rv">
      <span className="label">$ gwen <b>--mais</b></span>
      <h2 className="h2">E o resto<br /><span className="out">que faz falta.</span></h2>
    </div>
    <div className="bento">
      <div className="card c3 rv">
        <h4><i className="ph ph-palette"></i>Com a sua cara</h4>
        <p>Noir por padrão. Monte o seu tema com cores em HEX, ou use o modo claro e o estilo Terminal.</p>
        <div className="themeshow" id="themeshow">
          <img src="/prints/inicio-roxo.webp" alt="Início num tema roxo" className="on" />
          <img src="/prints/inicio-teal.webp" alt="Início num tema verde-água" />
          <img src="/prints/inicio-ambar.webp" alt="Início num tema âmbar" />
          <img src="/prints/inicio-azul.webp" alt="Início num tema azul" />
        </div>
        <div className="swatches" id="swatches">
          <button className="sw on" style={{background:'#8c52ff'}} aria-label="Tema roxo"></button>
          <button className="sw" style={{background:'#2dd4bf'}} aria-label="Tema verde-água"></button>
          <button className="sw" style={{background:'#f5a524'}} aria-label="Tema âmbar"></button>
          <button className="sw" style={{background:'#5b8cff'}} aria-label="Tema azul"></button>
          <small>mesma tela, quatro temas</small>
        </div>
      </div>
      <div className="card c3 rv d1">
        <h4><i className="ph ph-game-controller"></i>Apps e jogos</h4>
        <p>Quanto tempo foi no VS Code, no Discord ou na Steam. Opcional, local e com alertas de jogo e de trabalho.</p>
        <div className="peek" style={{height:'auto', aspectRatio:'16/10'}}><img src="/prints/apps.webp" alt="Relatório de apps e jogos num tema verde-água" /></div>
      </div>
      <div className="card c2 rv">
        <h4><i className="ph ph-circle-half"></i>A bolha</h4>
        <p>Minimizou? Ela vira um círculo arrastável com o tempo da sessão.</p>
        <div className="bubble-demo">
          <div className="orbit"><i className="ph-fill ph-music-notes"></i></div>
          <div className="bubble"><svg viewBox="14 14 36 36"><use href="#g" color="#EDEBE7"/></svg></div>
        </div>
      </div>
      <div className="card c4 rv d1">
        <h4><i className="ph ph-squares-four"></i>Hábitos em mapa de calor</h4>
        <p>Trabalho, pausas, água e alongamento em grades de 12 meses, como as do GitHub.</p>
        <div className="peek"><img src="/prints/perfil-claro.webp" alt="Perfil no modo claro com mapa de atividade" style={{objectPosition:'70% 52%'}} /></div>
      </div>
      <div className="card c3 rv">
        <h4><i className="ph ph-keyboard"></i>Feita para o teclado</h4>
        <div className="keys">
          <div><span>Abrir qualquer projeto</span><span><span className="kbd">Ctrl</span> <span className="kbd">K</span></span></div>
          <div><span>Mostrar ou esconder o painel</span><span><span className="kbd">Ctrl</span> <span className="kbd">B</span></span></div>
          <div><span>Nova tarefa</span><span className="kbd">N</span></div>
          <div><span>Zoom da interface</span><span><span className="kbd">Ctrl</span> <span className="kbd">+</span> <span className="kbd">-</span></span></div>
        </div>
      </div>
      <div className="card c3 rv d1">
        <h4><i className="ph ph-heartbeat"></i>Modo saúde</h4>
        <p>Lembretes de água, alongamento e olhos que esperam a sua resposta, com pausa guiada de 5 minutos.</p>
        <div className="toast"><div className="toast-h"><i className="ph-fill ph-drop"></i><span><b>Hora da água</b><small>45 min desde o último copo</small></span></div><div className="toast-a"><span className="on">Fazer</span><span>Adiar 10 min</span><span>Dispensar</span></div></div>
      </div>
    </div>
  </div>
</section>

    </>
  )
}
