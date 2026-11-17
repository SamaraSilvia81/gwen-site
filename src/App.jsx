import { useEffect, useState } from 'react'
import Defs from './components/Defs'
import Nav from './components/Nav'
import Footer from './components/Footer'
import Intro from './components/Intro'
import Hero, { StripBlock, ShotReqs, ShotText } from './sections/Hero'
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
// Contato saiu da landing: o formulário vai ganhar a página própria /contato (ainda não feita)
import Planos from './sections/Planos'
import Duvidas from './sections/Duvidas'
import Final from './sections/Final'
import Novidades from './pages/Novidades'
import Historia from './pages/Historia'
import ToTop from './components/ToTop'
import ContatoPage from './pages/Contato'
import { useRelease } from './lib/release'
import { landingEffects, playIntro } from './lib/effects'

const params = new URLSearchParams(location.search)
const HERO = ['a', 'b', 'c', 'd'].includes(params.get('hero')) ? params.get('hero') : 'c'
// painel do teste A/B: aparece no dev ou com ?ab no endereço
// enquanto a abertura roda, o hero fica guardado para entrar em cena depois dela
// só na landing: nas outras páginas não tem abertura, e essa classe escondia a topbar
const NA_LANDING = (location.pathname.replace(/\/+$/, '') || '/') === '/'
// a abertura roda uma vez por aba: recarregar ou voltar para a home na mesma aba não repete.
// ?hero=c no endereço força, para testar.
const INTRO_KEY = 'gwen.introVista'
const introVista = () => { try { return sessionStorage.getItem(INTRO_KEY) === '1' } catch { return false } }
// chegando com #secao (de uma página interna), vai direto para ela, sem abertura
const COM_INTRO = HERO === 'c' && NA_LANDING && !location.hash && (params.get('hero') === 'c' || !introVista())
if (COM_INTRO) document.documentElement.classList.add('intro-run')
// páginas internas entram com um fade, mesmo quando o React demora um quadro para desenhar
if (!NA_LANDING) document.documentElement.classList.add('pg-inner')
// teste dos números do manifesto: a = frase e depois números, b = números primeiro
const MF = params.get('mf') === 'b' ? 'b' : 'a'
// estilo dos números: a = círculos, c = só os números grandes
const NUMS = params.get('nums') === 'c' ? 'c' : 'a'
// teste do botão "Tudo isso abre junto com o seu projeto": a = no hero, colado na faixa; b = mais abaixo, antes do "por dentro"
const STRIP = params.get('strip') === 'a' ? 'a' : 'b'
// teste do layout do topo:
// a = card e print dentro do hero
// b = hero limpo com seta; depois faixa, print + card 2x2 e o texto
// c = igual ao b, mas o print + card 2x2 vem depois dos números
// d = faixa, texto e números; depois seção clara com print e texto; o card de requisitos (1x4) vai para o "como usar"
const LAY = ['a', 'b', 'c'].includes(params.get('lay')) ? params.get('lay') : 'd'
// monta o link do painel mantendo os outros testes como estão
const abLink = (over, hash = '') => {
  const q = { hero: HERO, lay: LAY, mf: MF, nums: NUMS, strip: STRIP, ...over }
  return `?${new URLSearchParams(q)}${params.has('ab') ? '&ab' : ''}${hash ? '#' + hash : ''}`
}
const SHOW_AB = import.meta.env.DEV || params.has('ab')

function Landing({ release }) {
  const [intro, setIntro] = useState(COM_INTRO)
  useEffect(() => { if (intro) try { sessionStorage.setItem(INTRO_KEY, '1') } catch { /* sem storage */ } }, [intro])
  // painel dos testes recolhível; lembra se estava aberto
  const [abOpen, setAbOpen] = useState(() => { try { return localStorage.getItem('gwen.ab') !== '0' } catch { return true } })
  useEffect(() => { try { localStorage.setItem('gwen.ab', abOpen ? '1' : '0') } catch { /* sem storage */ } }, [abOpen])
  useEffect(() => landingEffects(), [])
  // o navegador procura a #secao antes do React desenhar a página e não acha;
  // então rola aqui, e de novo quando imagens acima terminam de carregar e empurram tudo
  useEffect(() => {
    const id = decodeURIComponent(location.hash.slice(1))
    if (!id) return
    const go = (behavior) => document.getElementById(id)?.scrollIntoView({ behavior, block: 'start' })
    const t = [requestAnimationFrame(() => go('auto'))]
    const timers = [250, 700, 1400].map((ms) => setTimeout(() => go('auto'), ms))
    return () => { t.forEach(cancelAnimationFrame); timers.forEach(clearTimeout) }
  }, [])
  useEffect(() => (intro ? playIntro(() => setIntro(false)) : undefined), [intro])
  return (
    <>
      {intro && <Intro />}
      <Nav release={release} />
      {/* C é só a abertura: ao terminar, a página segue no visual do D */}
      <Hero release={release} variant={HERO === 'c' ? 'd' : HERO} strip={STRIP === 'a'} layout={LAY} />
      <main className="z90">
        {LAY !== 'a' && <StripBlock strip={STRIP === 'a'} />}
        {LAY === 'b' && <ShotReqs release={release} />}
        <Manifesto order={MF} style={NUMS} />
        {LAY === 'c' && <ShotReqs release={release} />}
        {LAY === 'd' && <ShotText />}
        <Dia />
        <ComoUsar release={LAY === 'd' ? release : null} />
        <Recursos />
        <TresMomentos />
        {STRIP === 'b' && <StripCta below />}
        <PorDentro />
        <Mais />
        <ParaVoce />
        <Privacidade />
        <Casos />
        <Planos />
        <Duvidas />
      </main>
      <Final release={release} />
      <Footer release={release} />
      <ToTop />
      {SHOW_AB && (
        <div className={`ab${abOpen ? '' : ' closed'}`}>
          <button className="ab-tog" onClick={() => setAbOpen(!abOpen)} aria-label={abOpen ? 'Recolher testes' : 'Abrir testes'}><i className={`ph ${abOpen ? 'ph-caret-left' : 'ph-flask'}`}></i>{!abOpen && 'testes'}</button>
          <span className="ab-in">
          hero {['a', 'b', 'c', 'd'].map((v) => <a key={v} href={abLink({ hero: v })} className={HERO === v ? 'on' : ''}>{v.toUpperCase()}</a>)}
          <span className="ab-sep">layout</span> {['a', 'b', 'c', 'd'].map((v) => <a key={v} href={abLink({ lay: v })} className={LAY === v ? 'on' : ''} title={{ a: 'card e print no hero', b: 'faixa, print + card 2x2, texto', c: 'faixa, texto, print + card 2x2', d: 'faixa, texto, print no claro, card no como usar' }[v]}>{v.toUpperCase()}</a>)}
          <span className="ab-sep">ordem</span> {['a', 'b'].map((v) => <a key={v} href={abLink({ mf: v }, 'manifesto')} className={MF === v ? 'on' : ''} title={v === 'a' ? 'frase antes dos números' : 'números antes da frase'}>{v.toUpperCase()}</a>)}
          <span className="ab-sep">números</span> {['a', 'c'].map((v) => <a key={v} href={abLink({ nums: v }, 'manifesto')} className={NUMS === v ? 'on' : ''} title={v === 'a' ? 'em círculos' : 'só os números'}>{v.toUpperCase()}</a>)}
          <span className="ab-sep">botão</span> {['a', 'b'].map((v) => <a key={v} href={abLink({ strip: v }, v === 'a' ? 'topo' : 'por-dentro')} className={STRIP === v ? 'on' : ''} title={v === 'a' ? 'botão colado na faixa' : 'botão mais abaixo'}>{v.toUpperCase()}</a>)}
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
      {page === '/novidades' ? <Novidades release={release} /> : page === '/historia' ? <Historia release={release} /> : page === '/contato' ? <ContatoPage release={release} /> : <Landing release={release} />}
    </>
  )
}
