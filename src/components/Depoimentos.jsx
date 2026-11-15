import { depoimentosVisiveis } from '../content/depoimentos'

const iniciais = (nome) => nome.split(' ').filter(Boolean).slice(0, 2).map((p) => p[0]).join('')

function Quote({ d, hidden = false }) {
  return (
    <figure className="dq" aria-hidden={hidden || undefined}>
      <blockquote>{d.texto}</blockquote>
      <figcaption>
        <span className="dq-av" aria-hidden="true">{iniciais(d.nome)}</span>
        <span><b>{d.nome}</b><small>{d.papel}</small></span>
      </figcaption>
      {d.usa?.length > 0 && <div className="dq-tags">{d.usa.map((u) => <span key={u}>{u}</span>)}</div>}
      {d.exemplo && <span className="dq-ex" title="Texto provisório: não aparece no site publicado">exemplo</span>}
    </figure>
  )
}

/**
 * Depoimentos em duas faixas que correm em sentidos opostos e param quando o mouse passa.
 * Com poucos relatos (menos de 4), vira uma grade simples. Some se não houver nenhum real publicado.
 */
export default function Depoimentos() {
  const lista = depoimentosVisiveis()
  if (!lista.length) return null
  if (lista.length < 4) return <div className="dq-grid">{lista.map((d) => <Quote key={d.nome} d={d} />)}</div>
  const meio = Math.ceil(lista.length / 2)
  const linhas = [lista.slice(0, meio), lista.slice(meio)]
  return (
    <div className="dq-rows">
      {linhas.map((linha, i) => (
        <div key={i} className={`dq-row${i ? ' rev' : ''}`}>
          <div className="dq-track">
            {[...linha, ...linha, ...linha].map((d, k) => <Quote key={k} d={d} hidden={k >= linha.length} />)}
          </div>
        </div>
      ))}
    </div>
  )
}
