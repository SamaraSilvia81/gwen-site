export default function Duvidas() {
  return (
    <>
{/* ============ 11. DÚVIDAS ============ */}
<section className="s" id="duvidas">
  <div className="wrap faq">
    <div className="s-head rv" style={{marginBottom:'0'}}>
      <span className="label">$ gwen <b>--duvidas</b></span>
      <h2 className="h2">Perguntas<br /><span className="out">frequentes.</span></h2>
      <p>Não achou? <a href="/contato" style={{color:'var(--bone)', borderBottom:'1px solid'}}>Mande uma mensagem.</a></p>
    </div>
    <div className="rv d1">
      <details open><summary>A G.W.E.N. é grátis?<i className="ph ph-plus"></i></summary><p>Sim. O uso local é gratuito e vai continuar sendo. Os planos pagos, depois do beta, são para nuvem e para recursos de quem fatura com projetos.</p></details>
      <details><summary>Funciona no Mac ou no Linux?<i className="ph ph-plus"></i></summary><p>Por enquanto só no Windows 10 e 11. O Linux está nos planos, mas partes como o mapeamento de apps, a bandeja e a bolha usam recursos do Windows e precisam ser refeitas.</p></details>
      <details><summary>O Windows avisou "editor desconhecido". É seguro?<i className="ph ph-plus"></i></summary><p>O aviso aparece porque o instalador ainda não tem certificado digital, que é pago por ano. Clique em Mais informações e depois em Executar assim mesmo. As atualizações automáticas são assinadas e verificadas pelo próprio app.</p></details>
      <details><summary>Ela vê o que eu faço no computador?<i className="ph ph-plus"></i></summary><p>Só se você ligar o mapeamento, e mesmo assim ela guarda apenas o nome do programa em primeiro plano. Nunca o título da janela, o conteúdo ou o que você digita. Tudo fica no seu computador.</p></details>
      <details><summary>Preciso saber programar?<i className="ph ph-plus"></i></summary><p>Não. Várias coisas são de dev (Git, comandos, terminal), mas pastas, links, apps, pausas e tarefas servem para qualquer pessoa. No primeiro acesso você escolhe o seu ambiente.</p></details>
      <details><summary>Atualizar ou desinstalar apaga os meus dados?<i className="ph ph-plus"></i></summary><p>Não. Os dados ficam numa pasta separada do app e não são tocados ao atualizar, reinstalar ou desinstalar. E dá para exportar um backup em JSON quando quiser.</p></details>
    </div>
  </div>
</section>

    </>
  )
}
