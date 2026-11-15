import { useEffect, useRef, useState } from 'react'
import { useStats } from '../lib/release'

// número que sobe de 0 até o valor quando aparece na tela
function Count({ to, prefix = '', suffix = '' }) {
  const ref = useRef(null)
  const [n, setN] = useState(0)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    let raf
    const io = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return
      io.disconnect()
      const t0 = performance.now(), dur = 1600
      const step = (t) => {
        const k = Math.min(1, (t - t0) / dur)
        setN(Math.round(to * (1 - Math.pow(1 - k, 3))))
        if (k < 1) raf = requestAnimationFrame(step)
      }
      raf = requestAnimationFrame(step)
    }, { threshold: 0.4 })
    io.observe(el)
    return () => { io.disconnect(); cancelAnimationFrame(raf) }
  }, [to])
  return <span ref={ref}>{prefix}{n.toLocaleString('pt-BR')}{suffix}</span>
}

export default function Manifesto() {
  const { downloads, versions, stars } = useStats()
  // só entram os números que já dizem alguma coisa; zero não passa confiança
  const stats = [
    downloads > 0 && { to: downloads, suffix: '+', label: 'downloads' },
    versions > 0 && { to: versions, label: versions === 1 ? 'versão lançada' : 'versões lançadas' },
    stars > 0 && { to: stars, label: stars === 1 ? 'estrela no GitHub' : 'estrelas no GitHub' },
    { to: 0, prefix: 'R$', label: 'para usar, para sempre', fixed: true },
  ].filter(Boolean)

  return (
    <section className="s manifesto" id="manifesto">
      <div className="wrap">
        <div className="mf rv">
          <p className="mf-t">
            <i className="ph-fill ph-asterisk mf-star" aria-hidden="true"></i>
            A G.W.E.N. é o seu <span className="pill" style={{ backgroundImage: 'url(/prints/inicio-roxo.webp)', backgroundSize: '280% auto', backgroundPosition: '48% 88%' }} aria-hidden="true"></span> ponto de partida.{' '}
            <span className="dim">Abre o projeto com tudo junto, conta o tempo de cada um e <span className="pill" style={{ backgroundImage: 'url(/prints/inicio-teal.webp)', backgroundSize: '400% auto', backgroundPosition: '99% 68%' }} aria-hidden="true"></span> lembra você de parar, do primeiro clique até a <span className="pill" style={{ backgroundImage: 'url(/prints/inicio-ambar.webp)', backgroundSize: '400% auto', backgroundPosition: '99% 15%' }} aria-hidden="true"></span> última pausa do dia.</span>
          </p>
          <p className="mf-note">Um app de Windows feito por uma dev que cansou de abrir dez janelas toda manhã. Grátis, leve e direto ao ponto.</p>
        </div>
        <div className={`mf-stats rv n${stats.length}`}>
          {stats.map((s) => (
            <div key={s.label} className="mf-stat">
              <b>{s.fixed ? `${s.prefix}0` : <Count to={s.to} prefix={s.prefix} suffix={s.suffix} />}</b>
              <span>{s.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
