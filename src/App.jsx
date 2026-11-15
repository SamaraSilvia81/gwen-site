import { useEffect, useState } from 'react'
import Defs from './components/Defs'
import Nav from './components/Nav'
import Footer from './components/Footer'
import Intro from './components/Intro'
import Hero from './sections/Hero'
import Dia from './sections/Dia'
import ComoUsar from './sections/ComoUsar'
import Recursos from './sections/Recursos'
import PorDentro from './sections/PorDentro'
import Mais from './sections/Mais'
import ParaVoce from './sections/ParaVoce'
import Privacidade from './sections/Privacidade'
import Casos from './sections/Casos'
import Contato from './sections/Contato'
import Planos from './sections/Planos'
import Duvidas from './sections/Duvidas'
import Final from './sections/Final'
import Novidades from './pages/Novidades'
import { useRelease } from './lib/release'
import { landingEffects, playIntro } from './lib/effects'

const params = new URLSearchParams(location.search)
const HERO = ['a', 'b', 'c', 'd'].includes(params.get('hero')) ? params.get('hero') : 'a'
// painel do teste A/B: aparece no dev ou com ?ab no endereço
// enquanto a abertura roda, o hero fica guardado para entrar em cena depois dela
if (HERO === 'c') document.documentElement.classList.add('intro-run')
const SHOW_AB = import.meta.env.DEV || params.has('ab')

function Landing({ release }) {
  const [intro, setIntro] = useState(HERO === 'c')
  useEffect(() => landingEffects(), [])
  useEffect(() => (intro ? playIntro(() => setIntro(false)) : undefined), [intro])
  return (
    <>
      {intro && <Intro />}
      <Nav release={release} />
      {/* C é só a abertura: ao terminar, a página segue no visual do D */}
      <Hero release={release} variant={HERO === 'c' ? 'd' : HERO} />
      <main className="z90">
        <Dia />
        <ComoUsar />
        <Recursos />
        <PorDentro />
        <Mais />
        <ParaVoce />
        <Privacidade />
        <Casos />
        <Contato />
        <Planos />
        <Duvidas />
      </main>
      <Final release={release} />
      <Footer release={release} />
      <a href="#topo" className="totop" id="totop" aria-label="Voltar ao topo">
        <svg viewBox="0 0 60 60" aria-hidden="true"><circle cx="30" cy="30" r="28" /></svg>
        <i className="ph-bold ph-arrow-up"></i>
      </a>
      {SHOW_AB && (
        <div className="ab">hero {['a', 'b', 'c', 'd'].map((v) => <a key={v} href={`?hero=${v}${params.has('ab') ? '&ab' : ''}`} className={HERO === v ? 'on' : ''}>{v.toUpperCase()}</a>)}</div>
      )}
    </>
  )
}

export default function App() {
  const release = useRelease()
  const page = location.pathname.replace(/\/+$/, '') || '/'
  return (
    <>
      <div className="grain" aria-hidden="true"></div>
      <Defs />
      {page === '/novidades' ? <Novidades release={release} /> : <Landing release={release} />}
    </>
  )
}
