import Depoimentos from '../components/Depoimentos'
import { depoimentosVisiveis } from '../content/depoimentos'

// casos e depoimentos, no escuro (a origem está guardada em src/content/origem.js para a página de história)
export default function Casos() {
  const total = depoimentosVisiveis().length + 1
  return (
    <section className="s casos" id="casos">
      <div className="wrap">
        <div className="casos-head rv">
          <div>
            <span className="label">$ gwen <b>--casos</b></span>
            <h2 className="h2">Quem usa<br /><span className="out">conta como é.</span></h2>
          </div>
          <p className="casos-count"><b>{String(total).padStart(2, '0')}</b><span>{total === 1 ? 'relato do beta' : 'relatos do beta'}</span></p>
        </div>

        <figure className="case-hero rv">
          <span className="case-hero-mark" aria-hidden="true">“</span>
          <blockquote>Uso todos os dias para alternar entre clientes, a dissertação e os meus produtos. O Começar agora tirou a fricção de trocar de contexto, e a <em>pausa virou hábito.</em></blockquote>
          <figcaption>
            <span className="case-hero-who"><span className="av">S</span><span><b>Samara Silvia Sabino</b><small>criadora · dev frontend e ux/ui · mestranda</small></span></span>
            <span className="case-hero-facts">
              <span><small>uso</small>diário, desde a primeira versão</span>
              <span><small>projetos</small>freelance, pesquisa e produtos</span>
              <span><small>mais usa</small>Começar agora e pausa</span>
            </span>
          </figcaption>
          <span className="case-hero-tag">caso 01</span>
        </figure>
      </div>

      <Depoimentos />

      <div className="wrap">
        <div className="slot rv">
          <p><b>Seu caso aqui.</b> Quem está no beta pode contar como usa, e o relato aparece nesta seção.</p>
          <a href="/contato" className="btn btn-ghost"><i className="ph ph-chat-circle-dots"></i>Contar o meu</a>
        </div>
      </div>
    </section>
  )
}
