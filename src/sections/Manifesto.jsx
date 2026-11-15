import { useEffect, useRef, useState } from 'react'
import { useStats } from '../lib/release'

// ano em que a G.W.E.N. nasceu
const CREATED = 2026

// avisa quando o elemento entra na tela (uma vez só); a classe fica no estado do React,
// então não some quando os números chegam do GitHub e o componente renderiza de novo
function useInView(threshold = 0.2) {
  const ref = useRef(null)
  const [seen, setSeen] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el || seen) return
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setSeen(true); io.disconnect() } }, { threshold })
    io.observe(el)
    return () => io.disconnect()
  }, [seen, threshold])
  return [ref, seen]
}

// número que sobe de 0 até o valor quando aparece
function Count({ to, run, suffix = '' }) {
  const [n, setN] = useState(0)
  useEffect(() => {
    if (!run) return
    let raf
    const t0 = performance.now(), dur = 1600
    const step = (t) => {
      const k = Math.min(1, (t - t0) / dur)
      setN(Math.round(to * (1 - Math.pow(1 - k, 3))))
      if (k < 1) raf = requestAnimationFrame(step)
    }
    raf = requestAnimationFrame(step)
    return () => cancelAnimationFrame(raf)
  }, [to, run])
  return <>{n.toLocaleString('pt-BR')}{suffix}</>
}

// a frase entra em pedaços, um depois do outro
const PARTS = [
  { t: 'A G.W.E.N. é o seu', mark: true },
  { pill: 'img' },
  { t: 'ponto de partida.' },
  { t: 'Abre o projeto com tudo junto,', dim: true },
  { t: 'conta o tempo de cada um e', dim: true },
  { pill: 'light' },
  { t: 'lembra você de parar,', dim: true },
  { t: 'do primeiro clique até a', dim: true },
  { pill: 'dark' },
  { t: 'última pausa do dia.', dim: true },
]

function Frase() {
  const [ref, seen] = useInView(0.3)
  return (
    <div ref={ref} className={`mf${seen ? ' on' : ''}`}>
      <p className="mf-t">
        {PARTS.map((p, i) => (
          <span key={i} className={`mf-p${p.dim ? ' dim' : ''}`} style={{ transitionDelay: `${i * 0.12}s` }}>
            {p.mark && <span className="mf-here" aria-hidden="true"><i></i></span>}
            {p.pill ? <span className={`pill ${p.pill}`} aria-hidden="true"></span> : p.t}
            {' '}
          </span>
        ))}
      </p>
      <p className="mf-note" style={{ transitionDelay: `${PARTS.length * 0.12 + 0.1}s` }}>Um app de Windows feito por uma dev que cansou de abrir dez janelas toda manhã. Grátis, leve e direto ao ponto.</p>
    </div>
  )
}

function Numeros({ style }) {
  const { downloads, versions } = useStats()
  const [ref, seen] = useInView(0.3)
  // número em zero não entra: não passa confiança
  const items = [
    { n: CREATED, label: 'ano de criação', plain: true },
    downloads > 0 && { n: downloads, suffix: '+', label: 'downloads' },
    versions > 0 && { n: versions, label: versions === 1 ? 'versão lançada' : 'versões lançadas' },
    { word: 'grátis', label: 'plano gratuito', fill: true },
  ].filter(Boolean)
  return (
    <div ref={ref} className={`mf-nums st-${style}${seen ? ' on' : ''} n${items.length}`}>
      <div className="mf-nums-h"><span className="label">$ gwen <b>--em-numeros</b></span><p>G.W.E.N.<br />em números</p></div>
      <div className="mf-circles">
        {items.map((it, i) => (
          <div key={it.label} className={`mf-c${it.fill ? ' fill' : ''}`} style={{ transitionDelay: `${0.15 + i * 0.14}s` }}>
            <b>{it.word ? it.word : it.plain ? it.n : <Count to={it.n} run={seen} suffix={it.suffix} />}</b>
            <span>{it.label}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

export default function Manifesto({ order = 'a', style = 'a' }) {
  return (
    <section className={`s manifesto o-${order}`} id="manifesto">
      <div className="wrap">
        {order === 'b' ? <><Numeros style={style} /><Frase /></> : <><Frase /><Numeros style={style} /></>}
      </div>
    </section>
  )
}
