// TEMPORARY: everything DB-theme-specific in this file exists only because the
// theme is currently wired in via `link:` (a symlink outside node_modules),
// whose public/ assets Slidev/Vite neither serve nor copy automatically.
// Once the theme is installed as a published version from the corporate
// Artifactory, its assets are handled by the standard Slidev/Vite flow. Then
// remove: the `serveLinkedThemePublic` plugin, the `hasDbTheme` block, the
// `public/db` entry in .gitignore, and switch the link: dependency to the
// real version.
import {
  cpSync,
  createReadStream,
  existsSync,
  statSync,
} from 'node:fs'
import { extname, join, normalize, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import type { Plugin } from 'vite'

// Root of the locally linked theme (link:../../tt-web/slidev-theme-db-systel).
const themeRoot = fileURLToPath(
  new URL('../../tt-web/slidev-theme-db-systel', import.meta.url),
)
// The theme's public/ directory. Slidev does not automatically serve public/
// assets from themes linked via `link:`, so we forward those requests here
// ourselves.
const themePublicDir = join(themeRoot, 'public')

const MIME: Record<string, string> = {
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.gif': 'image/gif',
  '.webp': 'image/webp',
  '.ico': 'image/x-icon',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
  '.css': 'text/css',
}

// Target folder inside the project's public/ where the theme assets are
// mirrored. The DB theme references its assets with absolute paths
// (e.g. /db/db-logo.svg); Vite resolves such paths against the project public/.
const themePublicSubdir = 'db'
const projectDbPublicDir = fileURLToPath(
  new URL(`./public/${themePublicSubdir}`, import.meta.url),
)

/**
 * Wires up the static assets from the public/ directory of the locally linked
 * theme (e.g. /db/db-logo.svg). Slidev/Vite neither serve nor copy public/
 * assets from themes linked via `link:` automatically.
 *
 * - Dev (`configureServer`): requests are served directly from the theme public/.
 * - Build (`buildStart`): the theme assets are mirrored into public/db/ so Vite
 *   resolves the absolute /db/... references and copies them into dist/
 *   (e.g. for `build:db`/`export:db`). The mirrored folder is gitignored.
 */
function serveLinkedThemePublic(): Plugin {
  return {
    name: 'serve-linked-theme-public',
    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        if (!req.url) return next()
        const urlPath = decodeURIComponent(req.url.split('?')[0])
        // Guard against path traversal.
        const candidate = normalize(join(themePublicDir, urlPath))
        if (!candidate.startsWith(resolve(themePublicDir))) return next()
        if (!existsSync(candidate) || !statSync(candidate).isFile()) return next()

        const type = MIME[extname(candidate).toLowerCase()]
        if (type) res.setHeader('Content-Type', type)
        createReadStream(candidate).pipe(res)
      })
    },
    buildStart() {
      const source = join(themePublicDir, themePublicSubdir)
      if (!existsSync(source)) return
      cpSync(source, projectDbPublicDir, { recursive: true })
    },
  }
}

// Is the locally linked DB theme present at all? Outside the corporate network
// (e.g. on GitHub) the link: path does not exist – in that case the k9n theme
// is used and the DB-specific Vite configuration is skipped.
const hasDbTheme = existsSync(themeRoot)

export default {
  server: {
    fs: {
      strict: false,
    },
  },
  // Do NOT pre-bundle the locally linked theme, so changes to its
  // styles/layouts propagate directly via HMR (instead of node_modules/.vite/deps).
  // Only relevant when the DB theme is linked locally.
  optimizeDeps: {
    exclude: hasDbTheme ? ['@db-tt-web/slidev-theme-dbsystel'] : [],
  },
  plugins: hasDbTheme ? [serveLinkedThemePublic()] : [],
}
