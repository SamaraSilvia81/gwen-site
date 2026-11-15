export default function ParaVoce() {
  return (
    <>
{/* ============ 6. PARA VOCÊ ============ */}
<section className="s" id="para-voce">
  <span className="glow" style={{width:'520px', height:'520px', right:'-200px', top:'10%'}}></span>
  <div className="wrap">
    <div className="s-head rv">
      <span className="label">$ gwen <b>--para-voce</b></span>
      <h2 className="h2">Do seu jeito<br /><span className="out">de trabalhar.</span></h2>
      <p>Ela nasceu entre pastas de código, mas serve para qualquer pessoa que vive de projeto em projeto.</p>
    </div>
    <div className="adapt rv">
      <div>
        <h4>Você escolhe o ambiente, ela se ajusta.</h4>
        <p>No primeiro acesso, diga como trabalha. Os exemplos, os atalhos e o que aparece no Início mudam com a sua escolha, e dá para trocar depois em Ajustes.</p>
      </div>
      <div className="envs" id="envs">
        <span className="on"><i className="ph ph-code"></i>TI e desenvolvimento</span>
        <span><i className="ph ph-graduation-cap"></i>Estudo e pesquisa</span>
        <span><i className="ph ph-pen-nib"></i>Design</span>
        <span><i className="ph ph-briefcase"></i>Freelance</span>
        <span><i className="ph ph-sparkle"></i>Geral</span>
      </div>
    </div>
    <div className="uses">
      <div className="use hov rv"><i className="ph ph-briefcase"></i><h5>Freelancers</h5><p>Vários clientes na mesma semana e a dúvida de quanto tempo cada um levou de verdade.</p><ul><li>Um projeto por cliente, com frentes</li><li>Relatório em CSV para cobrar as horas</li><li>Clientes e finanças nas próximas versões</li></ul></div>
      <div className="use hov rv d1"><i className="ph ph-graduation-cap"></i><h5>Pesquisa e estudo</h5><p>Artigo, dissertação, dataset e disciplina disputando o mesmo dia.</p><ul><li>Categorias como Mestrado reunindo várias pastas</li><li>Onde parei para voltar ao capítulo certo</li><li>Hábitos para ver a constância do semestre</li></ul></div>
      <div className="use hov rv d2"><i className="ph ph-code"></i><h5>Devs com muitos repositórios</h5><p>Abrir cinco programas toda vez que troca de contexto cansa.</p><ul><li>Começar agora com pastas, comando e links</li><li>Status do Git em cada card</li><li>Issues do GitHub como tarefas</li></ul></div>
    </div>
  </div>
</section>

    </>
  )
}
