import { useEffect, useState } from 'react'
import Defs from './components/Defs'
import Nav from './components/Nav'
import Footer from './components/Footer'
import Intro from './components/Intro'
import Hero from './sections/Hero'
import Manifesto from './sections/Manifesto'
import Dia from './sections/Dia'
import ComoUsar from './sections/ComoUsar'
import Recursos from './sections/Recursos'
import PorDentro from './sections/PorDentro'
import TresMomentos from './sections/TresMomentos'
import { StripCta } from './components/AppsStrip'
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
// teste dos números do manifesto: a = frase e depois números, b = números primeiro
const MF = params.get('mf') === 'b' ? 'b' : 'a'
// estilo dos números: a = círculos, c = só os números grandes
const NUMS = params.get('nums') === 'c' ? 'c' : 'a'
// teste do botão "Tudo isso abre junto com o seu projeto": a = no hero, colado na faixa; b = mais abaixo, antes do "por dentro"
const STRIP = params.get('strip') === 'a' ? 'a' : 'b'
const SHOW_AB = import.meta.env.DEV || params.has('ab')

function Landing({ release }) {
  const [intro, setIntro] = useState(HERO === 'c')
  // painel dos testes recolhível; lembra se estava aberto
  const [abOpen, setAbOpen] = useState(() => { try { return localStorage.getItem('gwen.ab') !== '0' } catch { return true } })
  useEffect(() => { try { localStorage.setItem('gwen.ab', abOpen ? '1' : '0') } catch { /* sem storage */ } }, [abOpen])
  useEffect(() => landingEffects(), [])
  useEffect(() => (intro ? playIntro(() => setIntro(false)) : undefined), [intro])
  return (
    <>
      {intro && <Intro />}
      <Nav release={release} />
      {/* C é só a abertura: ao terminar, a página segue no visual do D */}
      <Hero release={release} variant={HERO === 'c' ? 'd' : HERO} strip={STRIP === 'a'} />
      <main className="z90">
        <Manifesto order={MF} style={NUMS} />
        <Dia />
        <ComoUsar />
        <Recursos />
        <TresMomentos />
        {STRIP === 'b' && <StripCta below />}
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
        <div className={`ab${abOpen ? '' : ' closed'}`}>
          <button className="ab-tog" onClick={() => setAbOpen(!abOpen)} aria-label={abOpen ? 'Recolher testes' : 'Abrir testes'}><i className={`ph ${abOpen ? 'ph-caret-left' : 'ph-flask'}`}></i>{!abOpen && 'testes'}</button>
          <span className="ab-in">
          hero {['a', 'b', 'c', 'd'].map((v) => <a key={v} href={`?hero=${v}&mf=${MF}&nums=${NUMS}&strip=${STRIP}${params.has('ab') ? '&ab' : ''}`} className={HERO === v ? 'on' : ''}>{v.toUpperCase()}</a>)}
          <span className="ab-sep">ordem</span> {['a', 'b'].map((v) => <a key={v} href={`?hero=${HERO}&mf=${v}&nums=${NUMS}&strip=${STRIP}${params.has('ab') ? '&ab' : ''}#manifesto`} className={MF === v ? 'on' : ''} title={v === 'a' ? 'frase antes dos números' : 'números antes da frase'}>{v.toUpperCase()}</a>)}
          <span className="ab-sep">números</span> {['a', 'c'].map((v) => <a key={v} href={`?hero=${HERO}&mf=${MF}&nums=${v}&strip=${STRIP}${params.has('ab') ? '&ab' : ''}#manifesto`} className={NUMS === v ? 'on' : ''} title={v === 'a' ? 'em círculos' : 'só os números'}>{v.toUpperCase()}</a>)}
          <span className="ab-sep">botão</span> {['a', 'b'].map((v) => <a key={v} href={`?hero=${HERO}&mf=${MF}&nums=${NUMS}&strip=${v}${params.has('ab') ? '&ab' : ''}#${v === 'a' ? 'topo' : 'por-dentro'}`} className={STRIP === v ? 'on' : ''} title={v === 'a' ? 'botão colado na faixa' : 'botão mais abaixo'}>{v.toUpperCase()}</a>)}
          </span>
        </div>
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
