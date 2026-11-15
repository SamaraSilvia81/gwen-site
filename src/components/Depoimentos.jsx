import { depoimentosVisiveis } from '../content/depoimentos'

const iniciais = (nome) => nome.split(' ').filter(Boolean).slice(0, 2).map((p) => p[0]).join('')

/** Grade de depoimentos. Some sozinha se não houver nenhum real publicado. */
export default function Depoimentos() {
  const lista = depoimentosVisiveis()
  if (!lista.length) return null
  return (
    <div className="quotes">
      {lista.map((d) => (
        <figure key={d.nome} className="quote hov rv">
          <i className="ph-fill ph-quotes q-mark" aria-hidden="true"></i>
          <blockquote>{d.texto}</blockquote>
          <figcaption>
            <span className="q-av" aria-hidden="true">{iniciais(d.nome)}</span>
            <span><b>{d.nome}</b><small>{d.papel}</small></span>
          </figcaption>
          {d.usa?.length > 0 && <div className="q-tags">{d.usa.map((u) => <span key={u}>{u}</span>)}</div>}
          {d.exemplo && <span className="q-ex" title="Texto provisório: não aparece no site publicado">exemplo</span>}
        </figure>
      ))}
    </div>
  )
}
