// Conteúdo da página /historia. Tudo aqui saiu do que a Samara contou e do roadmap de 13/11 (PRD-GWEN/00-DOCS).
// Para mudar um texto, mude aqui.
export { ORIGEM } from './origem'

export const NOME = [
  { l: 'G', w: 'Gestão', p: 'dos projetos, das frentes e do tempo de cada um' },
  { l: 'W', w: 'Wellness', p: 'pausa e saúde como parte do trabalho' },
  { l: 'E', w: 'Eficiência', p: 'um clique no lugar de dez janelas' },
  { l: 'N', w: 'Navegação', p: 'saber onde parou e para onde o dia foi' },
]

export const COMO_COMECOU = [
  'A ideia é antiga: um assistente para o dia a dia de trabalho, que abrisse o ambiente de cada projeto e mostrasse o que está andando, o que parou e o que já foi entregue.',
  'Ela virou código quando o problema ficou grande demais para ignorar. Alternando entre clientes, o mestrado e os próprios produtos, eram dez minutos para montar o ambiente de cada um, e horas sem levantar da cadeira.',
  'A primeira versão era só um launcher. Cada versão seguinte nasceu do uso de verdade: o que faltava no dia, o que travava, o que dava para fazer melhor.',
]

// versões já lançadas (do CHANGELOG/roadmap) e as próximas
export const VERSOES = [
  { v: '0.1', quando: 'out 2026', t: 'Launcher, categorias, projetos, sessões de tempo, modo pausa e temas' },
  { v: '0.2 a 0.4', quando: 'out 2026', t: 'Login com Google opcional, modo claro, modo saúde e dados locais em SQLite' },
  { v: '0.5 e 0.6', quando: 'out 2026', t: 'Status do Git, frentes, Onde parei, Ctrl + K, bandeja e relatório com CSV' },
  { v: '0.7', quando: 'out 2026', t: 'Interface nova, Início, hábitos em mapa de calor, alertas de saúde com fonte e a bolha' },
  { v: '0.8 e 0.9', quando: 'out 2026', t: 'Sessões em paralelo, linha do tempo, apps e jogos, e tarefas em kanban' },
  { v: '0.9.1', quando: 'nov 2026', t: 'Beta fechado: correções do primeiro feedback de uso e mapeamento de mídia e jogos', atual: true },
]
export const PROXIMAS = [
  { v: '0.10', t: 'Clientes e fase comercial dos projetos' },
  { v: '0.11', t: 'Finanças: cobranças, recebidos e o valor real da sua hora' },
  { v: '0.12', t: 'Pronta para o público: onboarding, instalador assinado e lançamento' },
  { v: '0.13', t: 'Calendário com o Google Calendar' },
  { v: '0.14 a 0.17', t: 'Sistemas, Caderno, Ideias e padrões de trabalho' },
  { v: '1.0', t: 'Um assistente local que conversa sobre os seus dados' },
]

export const PRINCIPIOS = [
  { i: 'ph-circle-half', t: 'Noir por padrão', p: 'A G.W.E.N. é preto e branco, inclusive no logo. A cor é sua: cada pessoa monta o próprio tema.' },
  { i: 'ph-hard-drives', t: 'Seus dados no seu computador', p: 'Funciona sem conta. Projetos, sessões e o mapeamento ficam na sua máquina; a nuvem é opcional.' },
  { i: 'ph-heartbeat', t: 'Saúde com fonte', p: 'Os lembretes de pausa, água e alongamento vêm com a pesquisa que sustenta cada um.' },
  { i: 'ph-arrows-clockwise', t: 'Nasce do uso', p: 'Cada versão sai do que faltou no dia a dia. Atualizar nunca apaga os seus dados.' },
]

export const QUEM_FEZ = {
  nome: 'Samara Silvia Sabino',
  papel: 'dev frontend e ux/ui · mestranda em ciência da computação no CIn/UFPE',
  texto: 'Desenvolvedora frontend e designer de interfaces em Recife. Pesquisa arquitetura de microfrontends no mestrado e cria os próprios produtos. A G.W.E.N. é a ferramenta que ela usa todos os dias para dar conta de tudo isso.',
}
