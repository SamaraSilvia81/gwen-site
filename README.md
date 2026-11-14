# G.W.E.N. · site

Landing e página de novidades da G.W.E.N., em React + Vite + Tailwind v4. O site não tem cópia da versão do app: ele lê as releases do repositório [`gwen-app`](https://github.com/SamaraSilvia81/gwen-app), então cada versão nova aparece sozinha.

### $ como o site fica ligado ao app

| Onde | O que acontece |
|---|---|
| **No build** | `scripts/fetch-release.mjs` roda antes do `vite build` (script `prebuild`) e grava `src/generated/releases.json` com todas as releases publicadas: versão, data, notas, link e tamanho do instalador. Sem rede, o arquivo anterior continua valendo |
| **No navegador** | `src/lib/release.js` começa com esse arquivo e confere a API do GitHub ao abrir a página. Se saiu versão depois do último deploy, o site já mostra a nova |
| **Ao publicar uma release** | o workflow `notify-site.yml` do `gwen-app` chama o Deploy Hook da Vercel, que refaz o build com as notas novas |

O que se atualiza sozinho: o selo da versão no topo e no hero, os botões de baixar (link direto do `.exe`), o tamanho do instalador nos requisitos e a página `/novidades`, que lista cada versão com as notas da release.

### $ rodar no Windows

```powershell
yarn
yarn dev
```

Abre em `http://localhost:5174`. Para puxar as releases na hora: `yarn releases`. Para gerar a versão final: `yarn build` (sai em `dist/`).

No dev, o seletor **hero A B C** aparece no canto. Em produção ele some; para ver lá, use `?ab` no endereço (`/?hero=c&ab`).

### $ estrutura

```text
src/
  App.jsx            monta a landing e escolhe a página (/ ou /novidades)
  components/        Nav, Footer, Intro (abertura do hero C), Defs (símbolo do G)
  sections/          uma seção por arquivo, na ordem da história
  pages/Novidades.jsx
  lib/release.js     versão e releases (build + API)
  lib/effects.js     scroll, revelar, luz nos cards, animações
  styles/index.css   Tailwind + tokens da marca + componentes
  generated/         releases.json (gerado no build, vai pro git)
public/
  prints/            prints do app com dados fictícios, em vários temas
  wallpaper-hero.webp
```

### $ publicar na Vercel

1. Crie o repositório `gwen-site` no GitHub com esta pasta e envie.
2. Na Vercel, importe o repositório. Framework: Vite. Build: `yarn build`. Output: `dist`.
3. Em **Settings > Git > Deploy Hooks**, crie um hook (nome `gwen-app release`, branch `main`) e copie a URL.
4. No `gwen-app`, em **Settings > Secrets and variables > Actions**, crie `VERCEL_DEPLOY_HOOK` com essa URL.

O domínio `gwen-site.vercel.app` serve bem no beta.

### $ ordem da landing

Hero → identificação ("Você já viveu esse dia") → como usar → recursos 01 a 04 → o que acontece quando você clica → e o resto → para você → privacidade → origem e casos → contato → planos → dúvidas → baixar.

### $ pendências

- **Onboarding:** a landing promete a escolha de ambiente no primeiro acesso. Precisa existir no app antes de divulgar (planejado na 0.12)
- **Contato:** o formulário ainda não envia. A ideia é gravar numa tabela do Supabase
- **Páginas:** história, política de privacidade e termos de uso

© 2026 Samara Silvia Sabino. Todos os direitos reservados.
