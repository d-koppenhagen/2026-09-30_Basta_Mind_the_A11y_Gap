import { defineShikiSetup } from '@slidev/types'
import vitesseDark from '@shikijs/themes/vitesse-dark'

/**
 * Project-level Shiki setup with accessible token colors.
 *
 * A project-root setup/shiki.ts takes precedence over any theme's shiki
 * setup
 *
 * The stock vitesse-light and vitesse-dark themes have several syntax
 * tokens that fail WCAG AA (4.5:1) on the rendered code background
 * (dark: #262c38, light: #f4f2f9). These overrides lift the failing
 * tokens to >= 4.5:1 while keeping the vitesse look.
 */

// Dark: appended to vitesse-dark; later tokenColors win for the same scope,
// so all other (already passing) colors are preserved.
const darkA11yOverrides = [
  // Comments: #758575dd (3.58:1) -> #95a595 (5.40:1)
  {
    scope: ['comment', 'punctuation.definition.comment', 'string.comment'],
    settings: { foreground: '#95a595' },
  },
  // Punctuation / brackets / operators: #666666 (2.44:1) -> #9a9a9a (4.98:1)
  // Covers every scope vitesse-dark colours with #666666.
  {
    scope: [
      'punctuation',
      'meta.brace',
      'delimiter',
      'delimiter.bracket',
      'keyword.operator.rest',
      'keyword.operator.spread',
      'keyword.operator.type.annotation',
      'keyword.operator.relational',
      'keyword.operator.assignment',
      'keyword.operator.type',
      'meta.tag.block.any.html',
      'meta.tag.inline.any.html',
      'meta.tag.structure.input.void.html',
      'meta.type.annotation',
      'meta.embedded.block.github-actions-expression',
      'storage.type.function.arrow',
      'meta.objectliteral.ts',
      'punctuation.definition.string.begin.html.vue',
      'punctuation.definition.string.end.html.vue',
    ],
    settings: { foreground: '#9a9a9a' },
  },
  // Tags / keywords / booleans: #4d9375 (3.83:1) -> #6bbf98 (6.35:1)
  {
    scope: [
      'entity.name.tag',
      'tag.html',
      'keyword',
      'storage.type.class.jsdoc',
      'constant.language.boolean',
      'constant.language',
      'markup.heading',
      'markup.raw',
    ],
    settings: { foreground: '#6bbf98' },
  },
  // Numerics / units: #4C9A91 (4.23:1) -> #5cb8ae (5.95:1)
  {
    scope: ['constant.numeric', 'number', 'keyword.other.unit'],
    settings: { foreground: '#5cb8ae' },
  },
  // Faint string-quote punctuation: #c98a7d77 (2.17:1) -> #c98a7d (4.94:1)
  {
    scope: [
      'punctuation.definition.string',
      'punctuation.definition.string.begin',
      'punctuation.definition.string.end',
      'punctuation.support.type.property-name',
    ],
    settings: { foreground: '#c98a7d' },
  },
  // Keyword operators / storage: #cb7676 (4.26:1) -> #d98a8a (5.30:1)
  {
    scope: [
      'keyword.operator',
      'storage',
      'storage.type',
      'support.type.builtin',
      'meta.var.expr.ts',
    ],
    settings: { foreground: '#d98a8a' },
  },
]

export default defineShikiSetup(() => {
  return {
    themes: {
      dark: {
        ...vitesseDark,
        name: 'vitesse-dark-accessible',
        tokenColors: [
          ...(vitesseDark.tokenColors ?? []),
          ...darkA11yOverrides,
        ],
      },
      light: {
        name: 'vitesse-light-accessible',
        type: 'light',
        colors: {
          'editor.background': '#f4f2f9',
          'editor.foreground': '#393a34',
        },
        tokenColors: [
          // Comments: #a0ada0 -> #5a6d5a (5.02:1)
          {
            scope: ['comment', 'punctuation.definition.comment', 'string.comment'],
            settings: { foreground: '#5a6d5a' },
          },
          // Punctuation/Closing tags: #999999 -> #6e6e6e (4.59:1)
          {
            scope: [
              'punctuation',
              'punctuation.definition.tag',
              'punctuation.separator',
              'punctuation.terminator',
              'meta.brace',
            ],
            settings: { foreground: '#6e6e6e' },
          },
          // Attributes: #b07d48 -> #8b5e2b (5.07:1)
          {
            scope: [
              'entity.other.attribute-name',
              'support.type.property-name',
              'meta.object-literal.key',
              'variable.other.property',
            ],
            settings: { foreground: '#8b5e2b' },
          },
          // Keywords/CSS properties: #998418 -> #7a6600 (5.07:1)
          {
            scope: [
              'keyword',
              'storage.type',
              'storage.modifier',
              'keyword.control',
              'keyword.operator',
              'support.type.property-name.css',
            ],
            settings: { foreground: '#7a6600' },
          },
          // Strings: #b5695a -> #9b4a3a (5.51:1)
          {
            scope: [
              'string',
              'string.quoted',
              'entity.other.attribute-name.html',
            ],
            settings: { foreground: '#9b4a3a' },
          },
          // Functions: #59873a -> #3d7525 (5.02:1)
          {
            scope: [
              'entity.name.function',
              'support.function',
              'meta.function-call',
            ],
            settings: { foreground: '#3d7525' },
          },
          // Units/Numeric: #ab5959 -> #9b3a3a (6.18:1)
          {
            scope: [
              'constant.numeric',
              'keyword.other.unit',
              'constant.language',
            ],
            settings: { foreground: '#9b3a3a' },
          },
          // Tags (already passing but enforce): #1e754f (5.09:1)
          {
            scope: ['entity.name.tag', 'support.class.component'],
            settings: { foreground: '#1e754f' },
          },
          // Variables/Foreground text
          {
            scope: ['variable', 'variable.other'],
            settings: { foreground: '#393a34' },
          },
        ],
      },
    },
  }
})
