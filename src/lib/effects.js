/**
 * Efeitos da landing que mexem direto no DOM (scroll, revelar, luz nos cards,
 * Começar agora animado, troca de temas e a abertura do hero C).
 * Cada função devolve a limpeza, para o useEffect desfazer ao sair da página.
 */
export function landingEffects() {
  const off = []
  const nav = document.getElementById('nav')
  const heroWin = document.getElementById('heroWin')
  const totop = document.getElementById('totop')

  const onScroll = () => {
    const y = scrollY
    nav?.classList.toggle('solid', y > 40)
    if (heroWin) {
      const p = Math.min(1, y / (innerHeight * 0.55))
      heroWin.style.setProperty('--tilt', (22 - 22 * p).toFixed(2) + 'deg')
      heroWin.style.setProperty('--sc', (0.92 + 0.08 * p).toFixed(3))
    }
    const max = document.documentElement.scrollHeight - innerHeight
    totop?.classList.toggle('show', y > innerHeight * 0.8)
    totop?.style.setProperty('--off', (176 - 176 * (y / max)).toFixed(1))
  }
  addEventListener('scroll', onScroll, { passive: true }); onScroll()
  off.push(() => removeEventListener('scroll', onScroll))

  const io = new IntersectionObserver((es) => es.forEach((e) => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target) } }), { threshold: 0.14 })
  document.querySelectorAll('.rv').forEach((el) => io.observe(el))
  off.push(() => io.disconnect())

  // luz que segue o mouse (corrige o zoom de 90% das seções)
  const move = (e) => {
    const c = e.target.closest('.card,.hov')
    if (!c) return
    const r = c.getBoundingClientRect()
    c.style.setProperty('--mx', (e.clientX - r.left) / (r.width / c.offsetWidth) + 'px')
    c.style.setProperty('--my', (e.clientY - r.top) / (r.height / c.offsetHeight) + 'px')
  }
  document.addEventListener('pointermove', move)
  off.push(() => document.removeEventListener('pointermove', move))

  // Começar agora por dentro: os itens acendem em sequência
  const lp = document.getElementById('lp')
  const timers = []
  if (lp) {
    const lo = new IntersectionObserver((es) => es.forEach((e) => {
      if (!e.isIntersecting) return
      lo.disconnect()
      const rows = lp.querySelectorAll('.lp-row')
      rows.forEach((r, i) => timers.push(setTimeout(() => r.classList.add('on'), 400 + i * 420)))
      timers.push(setTimeout(() => {
        const t0 = Date.now(), el = document.getElementById('lpTime')
        timers.push(setInterval(() => {
          const s = Math.floor((Date.now() - t0) / 1000)
          if (el) el.textContent = [s / 3600, (s % 3600) / 60, s % 60].map((n) => String(Math.floor(n)).padStart(2, '0')).join(':')
        }, 1000))
      }, 400 + rows.length * 420))
    }), { threshold: 0.4 })
    lo.observe(lp)
    off.push(() => lo.disconnect())
  }

  // mesma tela, quatro temas
  const shots = [...document.querySelectorAll('#themeshow img')]
  const sws = [...document.querySelectorAll('#swatches .sw')]
  let ti = 0, tt
  const showTheme = (i) => { ti = i; shots.forEach((s, k) => s.classList.toggle('on', k === i)); sws.forEach((s, k) => s.classList.toggle('on', k === i)) }
  const cycle = () => { clearInterval(tt); tt = setInterval(() => showTheme((ti + 1) % shots.length), 2600) }
  sws.forEach((s, k) => s.addEventListener('click', () => { showTheme(k); cycle() }))
  if (shots.length) cycle()
  off.push(() => clearInterval(tt))

  // ambientes: destaca um por vez
  const envs = [...document.querySelectorAll('#envs span')]; let ei = 0
  const et = envs.length ? setInterval(() => { envs[ei].classList.remove('on'); ei = (ei + 1) % envs.length; envs[ei].classList.add('on') }, 1800) : null
  off.push(() => clearInterval(et))

  off.push(() => timers.forEach((t) => { clearTimeout(t); clearInterval(t) }))
  return () => off.forEach((f) => f())
}

/* som de clique sintetizado; o navegador só libera áudio depois da primeira interação */
let actx, clickBuf
const audio = () => {
  actx = actx || new (window.AudioContext || window.webkitAudioContext)()
  if (actx.state === 'suspended') actx.resume().catch(() => {})
  return actx
}
// o navegador só libera som depois de um gesto: se a pessoa tocar na página, o áudio destrava
const unlock = () => { try { audio() } catch { /* sem áudio */ } }
function loadClick() {
  try {
    fetch('/sounds/click.mp3').then((r) => r.arrayBuffer()).then((b) => audio().decodeAudioData(b)).then((buf) => { clickBuf = buf }).catch(() => {})
  } catch { /* sem áudio */ }
}
// clique do mouse: o som que a Samara escolheu (public/sounds/click.mp3)
function clickSound() {
  try {
    if (!clickBuf) return
    const a = audio(), src = a.createBufferSource(), g = a.createGain()
    src.buffer = clickBuf; g.gain.value = 0.9
    src.connect(g).connect(a.destination); src.start()
  } catch { /* sem áudio */ }
}
// tecla: um estalo curto de ruído filtrado, com timbre um pouco diferente a cada letra
function keySound(space) {
  try {
    const a = audio(), t = a.currentTime, len = 0.045
    const buf = a.createBuffer(1, Math.ceil(a.sampleRate * len), a.sampleRate), d = buf.getChannelData(0)
    for (let i = 0; i < d.length; i++) d[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / d.length, 6)
    const src = a.createBufferSource(), bp = a.createBiquadFilter(), g = a.createGain()
    src.buffer = buf
    bp.type = 'bandpass'; bp.frequency.value = (space ? 900 : 1900) + Math.random() * 900; bp.Q.value = 1.4
    g.gain.setValueAtTime(space ? 0.32 : 0.24 + Math.random() * 0.08, t)
    src.connect(bp).connect(g).connect(a.destination); src.start(t)
  } catch { /* sem áudio */ }
}

/** Abertura do hero C: digita, o cursor entra, clica e o círculo branco revela a página */
export function playIntro(onDone) {
  const intro = document.getElementById('intro'), T = document.getElementById('introT')
  const cur = document.getElementById('cursor'), rip = document.getElementById('ripple'), logo = document.getElementById('introLogo')
  if (!intro) return () => {}
  document.body.style.overflow = 'hidden'
  loadClick(); addEventListener('pointerdown', unlock, { once: true }); addEventListener('keydown', unlock, { once: true })
  const wait = (ms) => new Promise((r) => setTimeout(r, ms))
  let done = false
  const finish = () => { if (done) return; done = true; intro.classList.add('gone'); document.body.style.overflow = ''; setTimeout(onDone, 750) }
  document.getElementById('introSkip').onclick = finish
  const type = async (txt, cls) => {
    const span = document.createElement('span'); if (cls) span.className = cls
    T.insertBefore(span, T.querySelector('.caret'))
    for (const ch of txt) { if (done) return; span.textContent += ch; keySound(ch === ' '); await wait(ch === ' ' ? 40 : 55 + Math.random() * 40) }
  }
  ;(async () => {
    T.innerHTML = '<span class="caret"></span>'
    await wait(500); await type('Seu trabalho em um clique.'); T.insertBefore(document.createElement('br'), T.querySelector('.caret'))
    await wait(250); await type('Sua pausa, a sério.', 'o'); await wait(500)
    if (done) return
    T.querySelector('.caret')?.remove()
    const r = T.getBoundingClientRect(), tx = innerWidth / 2 + 40, ty = r.bottom + 70
    cur.style.setProperty('--cx', tx + 'px'); cur.style.setProperty('--cy', ty + 'px')
    await wait(1400); if (done) return
    cur.classList.add('press'); clickSound(); await wait(120); cur.classList.remove('press')
    rip.style.setProperty('--rx', tx + 'px'); rip.style.setProperty('--ry', ty + 'px')
    rip.style.setProperty('--rs', Math.ceil(Math.hypot(innerWidth, innerHeight) / 10))
    rip.classList.add('go'); T.style.transition = 'opacity .4s'; T.style.opacity = 0
    await wait(650); logo.classList.add('on'); cur.style.opacity = 0
    await wait(1100); finish()
  })()
  return () => { done = true; document.body.style.overflow = '' }
}
