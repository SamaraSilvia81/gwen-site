import Depoimentos from '../components/Depoimentos'

// casos e depoimentos (a origem saiu daqui e está guardada em src/content/origem.js para a página de história)
export default function Casos() {
  return (
    <section className="s paper casos" id="casos">
      <div className="wrap">
        <div className="s-head rv">
          <span className="label">$ gwen <b>--casos</b></span>
          <h2 className="h2">Quem usa<br /><span className="out">conta como é.</span></h2>
        </div>
        <div className="case rv">
          <span className="badge2">caso 01</span>
          <div className="who"><span className="av">S</span><span><b>Samara Silvia Sabino</b><small>criadora · dev frontend e ux/ui · mestranda</small></span></div>
          <blockquote>Uso todos os dias para alternar entre clientes, a dissertação e os meus produtos. O Começar agora tirou a fricção de trocar de contexto, e a pausa virou hábito.</blockquote>
          <ul>
            <li><b>uso</b>diário, desde a primeira versão</li>
            <li><b>projetos</b>freelance, pesquisa e produtos</li>
            <li><b>mais usa</b>Começar agora, onde parei e pausa</li>
            <li><b>tema</b>personalizado, roxo e magenta</li>
          </ul>
        </div>
        <div className="casos-quotes"><Depoimentos /></div>
        <div className="slot rv">
          <p><b>Seu caso aqui.</b> Quem está no beta pode contar como usa, e o relato aparece nesta seção.</p>
          <a href="/contato" className="btn btn-ghost"><i className="ph ph-chat-circle-dots"></i>Contar o meu</a>
        </div>
      </div>
    </section>
  )
}
