export default function Planos() {
  return (
    <>
{/* ============ 10. PLANOS ============ */}
<section className="s" id="planos" style={{paddingTop:'0'}}>
  <div className="wrap">
    <div className="s-head c rv">
      <span className="label">$ gwen <b>--planos</b></span>
      <h2 className="h2">Grátis para começar,<br /><span className="out">pago só se crescer.</span></h2>
      <p>O núcleo e a saúde nunca vão ser pagos. Os planos cobram o que custa servidor ou o que só faz falta quando o seu trabalho cresce.</p>
    </div>
    <div className="plans">
      <div className="plan hov rv">
        <h5>Gratuito</h5><p className="for">Para quem usa sozinho, num computador</p>
        <div className="price">R$ 0<small>para sempre</small></div>
        <ul>
          <li><i className="ph ph-check"></i>Projetos, sessões e Começar agora</li>
          <li><i className="ph ph-check"></i>Pausa e modo saúde completos</li>
          <li><i className="ph ph-check"></i>Tarefas, relatório e mapeamento</li>
          <li><i className="ph ph-check"></i>Todos os temas</li>
          <li><i className="ph ph-check"></i>Clientes e finanças com limite</li>
        </ul>
        <a href="#baixar" className="btn btn-ghost">Baixar grátis</a>
      </div>
      <div className="plan hl rv d1">
        <span className="tg">em breve</span>
        <h5>Freelance</h5><p className="for">Para quem fatura com projetos</p>
        <div className="price">depois<small>do beta</small></div>
        <ul>
          <li><i className="ph ph-check"></i>Tudo do Pro</li>
          <li><i className="ph ph-check"></i>Clientes e cobranças sem limite</li>
          <li><i className="ph ph-check"></i>Comprovantes guardados</li>
          <li><i className="ph ph-check"></i>Valor real da sua hora</li>
          <li><i className="ph ph-check"></i>Relatórios financeiros</li>
        </ul>
        <a href="#baixar" className="btn btn-ink">Testar no beta</a>
      </div>
      <div className="plan hov rv d2">
        <span className="tg">em breve</span>
        <h5>Pro</h5><p className="for">Para quem quer os dados na nuvem</p>
        <div className="price">depois<small>do beta</small></div>
        <ul>
          <li><i className="ph ph-check"></i>Tudo do Gratuito</li>
          <li><i className="ph ph-check"></i>Sincronização entre computadores</li>
          <li><i className="ph ph-check"></i>Backup automático na nuvem</li>
          <li><i className="ph ph-check"></i>Login com Google</li>
        </ul>
        <a href="#baixar" className="btn btn-ghost">Testar no beta</a>
      </div>
    </div>
    <p className="plans-note rv">No beta fechado, tudo está liberado. Os preços saem junto com o lançamento público.</p>
  </div>
</section>

    </>
  )
}
