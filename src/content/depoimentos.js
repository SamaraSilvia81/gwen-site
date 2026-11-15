/**
 * Depoimentos da landing.
 *
 * `exemplo: true` marca os textos provisórios, escritos só para desenhar a
 * seção. Eles aparecem no `yarn dev` e somem sozinhos no site publicado, para
 * nenhum depoimento inventado ir ao ar. Quando chegar um relato real do beta,
 * troque o texto, o nome e a função, e apague o `exemplo`.
 */
export const DEPOIMENTOS = [
  {
    nome: 'Rafaela Duarte',
    papel: 'dev front-end freelancer',
    texto: 'Eu abria seis coisas toda vez que trocava de cliente. Agora é um clique e o yarn dev já sobe sozinho. Parece pouco, mas no fim da semana são horas.',
    usa: ['Começar agora', 'frentes'],
    exemplo: true,
  },
  {
    nome: 'Thiago Moura',
    papel: 'mestrando em engenharia de software',
    texto: 'O "onde parei" salvou a minha dissertação. Fecho o dia anotando a próxima frase e no outro dia volto exatamente dali.',
    usa: ['onde parei', 'categorias'],
    exemplo: true,
  },
  {
    nome: 'Bianca Lopes',
    papel: 'designer de interfaces',
    texto: 'Não sou dev e uso todo dia. Cadastrei o Figma, a pasta dos arquivos e o Notion de cada cliente. E a pausa com a barra enchendo é a coisa mais calma que já vi num app de produtividade.',
    usa: ['apps', 'pausa'],
    exemplo: true,
  },
  {
    nome: 'Pedro Henrique Alves',
    papel: 'desenvolvedor full stack',
    texto: 'Rodo três repositórios ao mesmo tempo e ela conta cada um sem duplicar a hora. Finalmente o relatório bate com o que eu cobro.',
    usa: ['sessões em paralelo', 'relatório'],
    exemplo: true,
  },
  {
    nome: 'Lívia Castro',
    papel: 'estudante de computação',
    texto: 'O mapa de calor dos hábitos virou meu termômetro do semestre. Quando a grade fica vazia, eu sei que alguma coisa saiu do lugar.',
    usa: ['hábitos', 'modo saúde'],
    exemplo: true,
  },
  {
    nome: 'Marcos Vinícius',
    papel: 'tech lead',
    texto: 'O que me convenceu foi saber que nada sai do computador. O mapeamento só guarda o nome do programa, e isso para mim faz toda a diferença.',
    usa: ['privacidade', 'apps e jogos'],
    exemplo: true,
  },
]

/** No site publicado, só os depoimentos reais */
export const depoimentosVisiveis = () => DEPOIMENTOS.filter((d) => !d.exemplo || import.meta.env.DEV)
