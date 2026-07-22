import { defineShikiSetup } from '@slidev/types'

/**
 * Custom Shiki setup with accessible token colors.
 * The default vitesse-light theme has several colors that fail WCAG AA (4.5:1)
 * on the theme's code background (#f4f2f9).
 * These overrides ensure all syntax tokens meet at least 4.5:1 contrast ratio.
 */
export default defineShikiSetup(() => {
  return {
    themes: {
      dark: 'vitesse-dark',
      light: {
        name: 'vitesse-light-accessible',
        type: 'light',
        colors: {
          'editor.background': '#f4f2f9',
          'editor.foreground': '#393a34',
        },
        tokenColors: [
          // Comments: #a0ada0 → #5a6d5a (5.02:1)
          {
            scope: ['comment', 'punctuation.definition.comment', 'string.comment'],
            settings: { foreground: '#5a6d5a' },
          },
          // Punctuation/Closing tags: #999999 → #6e6e6e (4.59:1)
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
          // Attributes: #b07d48 → #8b5e2b (5.07:1)
          {
            scope: [
              'entity.other.attribute-name',
              'support.type.property-name',
              'meta.object-literal.key',
              'variable.other.property',
            ],
            settings: { foreground: '#8b5e2b' },
          },
          // Keywords/CSS properties: #998418 → #7a6600 (5.07:1)
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
          // Strings: #b5695a → #9b4a3a (5.51:1)
          {
            scope: [
              'string',
              'string.quoted',
              'entity.other.attribute-name.html',
            ],
            settings: { foreground: '#9b4a3a' },
          },
          // Functions: #59873a → #3d7525 (5.02:1)
          {
            scope: [
              'entity.name.function',
              'support.function',
              'meta.function-call',
            ],
            settings: { foreground: '#3d7525' },
          },
          // Units/Numeric: #ab5959 → #9b3a3a (6.18:1)
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
