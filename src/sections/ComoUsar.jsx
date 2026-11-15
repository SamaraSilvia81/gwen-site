// passos do download ao primeiro foco. Ao passar o mouse, o card abre e mostra o vídeo do passo;
// os outros encolhem. Para colocar um vídeo, é só preencher "video" com o caminho em public/ (ex.: '/videos/passo-1.mp4')
const PASSOS = [
  { icon: 'ph-download-simple', t: 'Instale e escolha o seu ambiente', p: 'Na primeira abertura, diga como você trabalha. A G.W.E.N. ajusta os exemplos e os atalhos.', chips: ['TI', 'estudo', 'design', 'geral'], video: '' },
  { icon: 'ph-folder-plus', t: 'Cadastre um projeto', p: 'Escolha a pasta: nome, descrição e link do repositório vêm sozinhos. Marque o que abre junto.', video: '' },
  { icon: 'ph-play', t: 'Aperte Começar agora', p: 'Tudo abre de uma vez e o tempo começa a contar. Rode outro projeto em paralelo se precisar.', video: '' },
  { icon: 'ph-coffee', t: 'Pare quando ela lembrar', p: 'Água, alongamento, olhos. Ao encerrar, anote onde parou e volte amanhã do ponto certo.', video: '' },
]

function Video({ src, n }) {
  return (
    <div className="stp-video" aria-hidden={!src}>
      {src
        ? <video src={src} muted loop playsInline autoPlay preload="metadata" />
        : <div className="stp-video-ph"><i className="ph ph-play-circle"></i><span>vídeo do passo {n} em breve</span></div>}
    </div>
  )
}

export default function ComoUsar() {
  return (
    <section className="s paper como" id="como-usar">
      <div className="wrap">
        <div className="s-head rv">
          <span className="label">$ gwen <b>--como-usar</b></span>
          <h2 className="h2">Do download<br /><span className="out">ao primeiro foco.</span></h2>
          <p>Grátis, sem conta e sem cadastro. Leva menos de dois minutos para o primeiro projeto.</p>
        </div>
        <div className="steps acc rv">
          {PASSOS.map((s, i) => (
            <div key={s.t} className="stp" tabIndex={0}>
              <div className="stp-body">
                <div className="n">{i + 1}</div>
                <i className={`ph ${s.icon}`}></i>
                <h5>{s.t}</h5>
                <p>{s.p}</p>
                {s.chips && <div className="chips">{s.chips.map((c) => <span key={c}>{c}</span>)}</div>}
              </div>
              <Video src={s.video} n={i + 1} />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
