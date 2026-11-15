import { useEffect, useRef } from 'react'

// botão de voltar ao topo, com o anel que enche conforme a rolagem; usado em todas as páginas
export default function ToTop() {
  const ref = useRef(null)
  useEffect(() => {
    const el = ref.current
    const on = () => {
      const y = scrollY, max = Math.max(1, document.documentElement.scrollHeight - innerHeight)
      el?.classList.toggle('show', y > innerHeight * 0.8)
      el?.style.setProperty('--off', (176 - 176 * (y / max)).toFixed(1))
    }
    on(); addEventListener('scroll', on, { passive: true })
    return () => removeEventListener('scroll', on)
  }, [])
  const top = (e) => { e.preventDefault(); scrollTo({ top: 0, behavior: 'smooth' }) }
  return (
    <a href="#" ref={ref} onClick={top} className="totop" aria-label="Voltar ao topo">
      <svg viewBox="0 0 60 60" aria-hidden="true"><circle cx="30" cy="30" r="28" /></svg>
      <i className="ph-bold ph-arrow-up"></i>
    </a>
  )
}
