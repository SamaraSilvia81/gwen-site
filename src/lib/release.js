import { useEffect, useState } from 'react'
import built from '../generated/releases.json'

/**
 * Versão do app no site.
 * 1. Começa com o que o build trouxe (src/generated/releases.json).
 * 2. No navegador, confere a API do GitHub. Se saiu versão depois do último
 *    deploy, o site já mostra a nova sem precisar publicar de novo.
 */
const REPO = 'SamaraSilvia81/gwen-app'
const FALLBACK_URL = `https://github.com/${REPO}/releases/latest`

const toView = (r) => ({
  tag: r?.tag || 'v0.9.1',
  date: r?.date || null,
  url: r?.url || FALLBACK_URL,
  notes: r?.notes || '',
  downloadUrl: r?.exe?.url || FALLBACK_URL,
  fileName: r?.exe?.name || 'GWEN_x64-setup.exe',
  sizeLabel: r?.exe ? `${(r.exe.size / 1048576).toFixed(1).replace('.', ',')} MB` : '5 MB',
})

export const builtReleases = built.releases

export function useReleases() {
  const [list, setList] = useState(built.releases)
  useEffect(() => {
    let alive = true
    fetch(`https://api.github.com/repos/${REPO}/releases?per_page=30`, { headers: { Accept: 'application/vnd.github+json' } })
      .then((r) => (r.ok ? r.json() : Promise.reject()))
      .then((data) => {
        if (!alive) return
        const fresh = data.filter((r) => !r.draft && !r.prerelease).map((r) => {
          const exe = (r.assets || []).find((a) => a.name.endsWith('-setup.exe'))
          return { tag: r.tag_name, name: r.name, date: r.published_at, url: r.html_url, notes: r.body || '', exe: exe ? { name: exe.name, size: exe.size, url: exe.browser_download_url } : null, downloads: exe?.download_count ?? 0 }
        })
        if (fresh.length) setList(fresh)
      })
      .catch(() => {})
    return () => { alive = false }
  }, [])
  return list
}

export function useRelease() {
  const list = useReleases()
  return toView(list[0])
}

/**
 * Números da landing, sempre de dados reais do GitHub:
 * downloads somados de todas as versões, quantas versões saíram e estrelas do repositório.
 * Começa com o que o build trouxe e atualiza no navegador.
 */
export function useStats() {
  const list = useReleases()
  const [stars, setStars] = useState(built.stars ?? 0)
  useEffect(() => {
    let alive = true
    fetch(`https://api.github.com/repos/${REPO}`, { headers: { Accept: 'application/vnd.github+json' } })
      .then((r) => (r.ok ? r.json() : Promise.reject()))
      .then((d) => { if (alive && typeof d.stargazers_count === 'number') setStars(d.stargazers_count) })
      .catch(() => {})
    return () => { alive = false }
  }, [])
  const downloads = list.reduce((n, r) => n + (r.downloads || 0), 0)
  return { downloads, versions: list.length, stars }
}
