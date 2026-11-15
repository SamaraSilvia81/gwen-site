// planos: os três cartões e, embaixo, a comparação detalhada do que cabe em cada um
const Y = { s: 'y' }, N = { s: 'n' }
const L = (t) => ({ s: 't', t })

const GRUPOS = [
  { g: 'Trabalho', itens: [
    ['Projetos, frentes e Começar agora', Y, Y, Y],
    ['Sessões de tempo, inclusive em paralelo', Y, Y, Y],
    ['Onde parei, status do Git e Ctrl + K', Y, Y, Y],
    ['Tarefas em kanban e lista', Y, Y, Y],
    ['Relatório por projeto e categoria, com CSV', Y, Y, Y],
  ] },
  { g: 'Pausa e saúde', itens: [
    ['Modo pausa', Y, Y, Y],
    ['Lembretes de água, alongamento e olhos, com fonte', Y, Y, Y],
    ['Hábitos em mapa de calor', Y, Y, Y],
  ] },
  { g: 'Computador e aparência', itens: [
    ['Mapeamento de apps e jogos, com alertas', Y, Y, Y],
    ['Temas por HEX, modo claro e estilo Terminal', Y, Y, Y],
    ['A bolha e o atalho na bandeja', Y, Y, Y],
  ] },
  { g: 'Clientes e dinheiro', soon: 'chega na v0.10 e na v0.11', itens: [
    ['Clientes e fase comercial dos projetos', L('com limite'), L('sem limite'), L('com limite')],
    ['Cobranças, recebidos e atrasados', L('com limite'), L('sem limite'), L('com limite')],
    ['Comprovantes e extratos guardados', N, Y, N],
    ['Valor real da sua hora por projeto', N, Y, N],
    ['Relatórios financeiros', N, Y, N],
  ] },
  { g: 'Dados e nuvem', itens: [
    ['Funciona sem conta, com os dados no seu computador', Y, Y, Y],
    ['Backup manual em arquivo', Y, Y, Y],
    ['Atualizações sem perder dados', Y, Y, Y],
    ['Login com Google', N, Y, Y],
    ['Sincronização entre computadores', N, Y, Y],
    ['Backup automático na nuvem', N, Y, Y],
  ] },
]

function Cel({ v }) {
  if (v.s === 'y') return <td><i className="ph-bold ph-check" aria-label="incluso"></i></td>
  if (v.s === 'n') return <td><span className="pt-no" aria-label="não incluso">—</span></td>
  return <td><span className="pt-tx">{v.t}</span></td>
}

export default function Planos() {
  return (
    <section className="s paper planos" id="planos">
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
            <a href="/contato?assunto=beta" className="btn btn-ink">Testar no beta</a>
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
            <a href="/contato?assunto=beta" className="btn btn-ghost">Testar no beta</a>
          </div>
        </div>

        {/* o que cabe em cada plano */}
        <div className="ptable rv">
          <div className="ptable-h">
            <h3>O que cabe em cada plano</h3>
            <p>No beta fechado, tudo está liberado. Os preços e o tamanho dos limites saem junto com o lançamento público.</p>
          </div>
          <div className="ptable-scroll">
            <table>
              <thead>
                <tr><th scope="col"><span className="sr">Recurso</span></th><th scope="col">Gratuito</th><th scope="col" className="hl">Freelance</th><th scope="col">Pro</th></tr>
              </thead>
              {GRUPOS.map((g) => (
                <tbody key={g.g}>
                  <tr className="pt-g"><th colSpan={4} scope="colgroup">{g.g}{g.soon && <em>{g.soon}</em>}</th></tr>
                  {g.itens.map(([nome, a, b, c]) => (
                    <tr key={nome}><th scope="row">{nome}</th><Cel v={a} /><Cel v={b} /><Cel v={c} /></tr>
                  ))}
                </tbody>
              ))}
            </table>
          </div>
        </div>

        <div className="prules rv">
          <div><i className="ph ph-heart"></i><b>O núcleo nunca é pago</b><span>Projetos, tempo, pausa e saúde continuam grátis, sem prazo.</span></div>
          <div><i className="ph ph-cloud"></i><b>Paga só o que custa servidor</b><span>Nuvem e o que só faz falta quando o negócio cresce.</span></div>
          <div><i className="ph ph-flask"></i><b>Beta com tudo liberado</b><span>Quem testa agora usa os planos pagos sem pagar nada.</span></div>
        </div>
      </div>
    </section>
  )
}
