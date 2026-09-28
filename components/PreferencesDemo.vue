<template>
  <div class="pref-demo" :class="`is-${active.key}`">
    <!-- Links: Live-Vorschau, reagiert je nach aktiver Präferenz -->
    <div class="pref-stage">
      <div class="pref-tabs" role="tablist" aria-label="Präferenzen">
        <span
          v-for="p in prefs"
          :key="p.key"
          class="pref-tab"
          :class="{ active: p.key === active.key }"
        >
          <span class="tab-icon" aria-hidden="true">{{ p.icon }}</span>
          {{ p.tab }}
        </span>
      </div>

      <div
        class="preview-frame"
        :class="[active.key, { 'is-dark': active.key === 'scheme' && schemeMode === 'dark' }]"
      >
        <!-- Switch oben in der Box: nur im Dark/Light-Zustand, visualisiert das
             aktuell (automatisch) gewählte Schema. -->
        <div v-if="active.key === 'scheme'" class="scheme-switch" aria-hidden="true">
          <span class="switch-label" :class="{ on: schemeMode === 'light' }">☀️ Light</span>
          <span class="switch-track" :class="schemeMode">
            <span class="switch-thumb" />
          </span>
          <span class="switch-label" :class="{ on: schemeMode === 'dark' }">🌙 Dark</span>
        </div>

        <!-- Beispiel-Card, auf die alle Präferenzen wirken -->
        <div class="sample-card" :class="{ animate: active.key === 'motion' }">
          <div class="sample-avatar" aria-hidden="true">🎧</div>
          <div class="sample-body">
            <div class="sample-title">A11y Weekly</div>
            <div class="sample-text">Präferenzen respektieren</div>
          </div>
        </div>
        <div class="preview-note">{{ active.preview }}</div>
      </div>
    </div>

    <!-- Rechts: nur der eine relevante Schnipsel + ein Satz -->
    <div class="pref-explain">
      <div class="explain-head">
        <span class="explain-icon" aria-hidden="true">{{ active.icon }}</span>
        <span class="explain-title">{{ active.title }}</span>
      </div>
      <pre class="explain-code"><code v-html="active.code" /></pre>
      <p class="explain-desc" v-html="active.desc" />
    </div>
  </div>
</template>

<script setup>
import { computed, ref, watch, onUnmounted } from 'vue';
import { useNav } from '@slidev/client';

// Pro Klick wird genau eine Präferenz aktiv -> immer nur ein Konzept sichtbar.
const prefs = [
  {
    key: 'motion',
    icon: '🌀',
    tab: 'Motion',
    title: 'Reduced Motion',
    preview: 'Bewegung nur bei no-preference — sonst ruhig.',
    code:
      '<span class="c-at">@media</span> (<span class="c-prop">prefers-reduced-motion</span>: no-preference) {\n' +
      '  .card { <span class="c-prop">transition</span>: transform .3s; }\n' +
      '}',
    desc:
      'Animationen können Übelkeit oder Anfälle auslösen. Bewegung <strong>additiv</strong> aktivieren (Progressive Enhancement) statt global abschalten.',
  },
  {
    key: 'scheme',
    icon: '🌗',
    tab: 'Dark / Light',
    title: 'Dark / Light Mode',
    preview: 'Farben folgen dem System — via light-dark().',
    code:
      '<span class="c-sel">:root</span> {\n' +
      '  <span class="c-prop">color-scheme</span>: light dark;\n' +
      '  <span class="c-prop">--bg</span>: <span class="c-fn">light-dark</span>(#fff, #1a1a2e);\n' +
      '  <span class="c-prop">--text</span>: <span class="c-fn">light-dark</span>(#222, #eee);\n' +
      '}',
    desc:
      '<code>light-dark()</code> liefert die passende Farbe — <strong>ohne</strong> Media Query. Die bleibt frei für das, was sie nicht kann (Schatten, Bilder, Icons).',
  },
  {
    key: 'contrast',
    icon: '🔲',
    tab: 'Contrast',
    title: 'Prefers Contrast',
    preview: 'Mehr Kontrast: kräftigere Borders & Text.',
    code:
      '<span class="c-at">@media</span> (<span class="c-prop">prefers-contrast</span>: more) {\n' +
      '  :root { <span class="c-prop">--border</span>: 2px solid #000; }\n' +
      '}',
    desc:
      'Ein <strong>Wunsch</strong> nach mehr (oder weniger) Kontrast. Über Borders, Schriftgewicht und Farben nachschärfen.',
  },
  {
    key: 'forced',
    icon: '🎨',
    tab: 'Forced Colors',
    title: 'Forced Colors',
    preview: 'System erzwingt Farben — Borders tragen die Info.',
    code:
      '<span class="c-at">@media</span> (<span class="c-prop">forced-colors</span>: active) {\n' +
      '  .card { <span class="c-prop">border</span>: 1px solid CanvasText; }\n' +
      '}',
    desc:
      '<strong>Zwang</strong> statt Wunsch (Windows High Contrast): das System überschreibt alle Farben. Struktur über Borders sichern, nicht über Hintergrund.',
  },
];

const { clicks } = useNav();
// clicks 0 -> erste Präferenz, danach durchsteppen; am Ende clampen.
const active = computed(() => prefs[Math.min(clicks.value, prefs.length - 1)]);

// Auto-Umschaltung Light <-> Dark, nur solange der Dark/Light-Zustand aktiv ist.
const schemeMode = ref('light');
let schemeTimer = null;

function stopSchemeTimer() {
  if (schemeTimer) {
    clearInterval(schemeTimer);
    schemeTimer = null;
  }
}

watch(
  () => active.value.key,
  (key) => {
    stopSchemeTimer();
    if (key === 'scheme') {
      schemeMode.value = 'light';
      schemeTimer = setInterval(() => {
        schemeMode.value = schemeMode.value === 'light' ? 'dark' : 'light';
      }, 5000);
    }
  },
  { immediate: true },
);

onUnmounted(stopSchemeTimer);
</script>

<style scoped>
/* Theme-taugliche Farben mit Fallback-Kette:
   1. DB-Theme (--db-*)  ->  2. k9n-Theme (--k9n-*)  ->  3. statischer Wert.
   Beide Themes liefern Light- und Dark-Werte. */
.pref-demo {
  --fg: var(--db-fg, var(--k9n-text-primary, #e2e8f0));
  --fg-muted: var(--db-fg-muted, var(--k9n-text-muted, #94a3b8));
  --surface: var(--db-bg-elevated, var(--k9n-surface-elevated, rgba(127, 127, 127, 0.08)));
  --border: var(--db-border, var(--k9n-border, rgba(127, 127, 127, 0.3)));
  --code-bg: var(--db-code-bg, var(--k9n-code-bg, rgba(127, 127, 127, 0.14)));
  --accent: var(--db-lilac-500, var(--k9n-accent, #7c6fce));
  --accent-text: var(--db-lilac-600, var(--k9n-accent, #6d5fc0));

  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 28px;
  align-items: stretch;
  min-height: 42vh;
}

html.dark .pref-demo {
  --accent-text: var(--db-lilac-200, var(--k9n-accent, #c4bbef));
}

/* ===== Linke Seite: Stage ===== */
.pref-stage {
  display: flex;
  flex-direction: column;
  gap: 14px;
}

.pref-tabs {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.pref-tab {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-size: 0.78rem;
  font-weight: 600;
  padding: 5px 12px;
  border-radius: 999px;
  color: var(--fg-muted);
  background: var(--surface);
  border: 1px solid var(--border);
  opacity: 0.55;
  transition: all 0.25s ease;
}

.pref-tab.active {
  opacity: 1;
  color: #fff;
  background: var(--accent);
  border-color: var(--accent);
}

.tab-icon {
  font-size: 0.9rem;
}

.preview-frame {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 16px;
  padding: 24px;
  border-radius: 14px;
  background: var(--surface);
  border: 1px solid var(--border);
  transition: background 0.4s ease, color 0.4s ease, border-color 0.4s ease;
}

/* Dark/Light: Frame startet hell und kippt per Auto-Timer (.is-dark) ins Dunkle */
.preview-frame.scheme {
  background: #f4f4f8;
  border-color: #d7d7e0;
}
/* Light-Box: feste dunkle Textfarben, damit der Kontrast unabhängig vom
   Präsentations-Theme stimmt (die Box ist immer hell). */
.preview-frame.scheme .sample-card {
  background: #fff;
  color: #222;
  border-color: #d7d7e0;
}
.preview-frame.scheme .sample-title { color: #1a1a2e; }
.preview-frame.scheme .sample-text { color: #4a4a5a; opacity: 1; }
.preview-frame.scheme .preview-note { color: #5a5a6b; }

/* Dark-Box: feste helle Textfarben. */
.preview-frame.scheme.is-dark {
  background: #1a1a2e;
  border-color: #33334d;
}
.preview-frame.scheme.is-dark .sample-card {
  background: #24243e;
  color: #eee;
  border-color: #3a3a55;
}
.preview-frame.scheme.is-dark .sample-title { color: #fff; }
.preview-frame.scheme.is-dark .sample-text { color: #c4c4d4; opacity: 1; }
.preview-frame.scheme.is-dark .preview-note { color: #a0a0b5; }

/* Switch oben in der Box */
.scheme-switch {
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 0.78rem;
  font-weight: 600;
}
.preview-frame.scheme .switch-label {
  color: #6b6b7b;
  opacity: 0.5;
  transition: opacity 0.3s ease, color 0.3s ease;
}
.preview-frame.scheme .switch-label.on {
  opacity: 1;
  color: #222;
}
.preview-frame.scheme.is-dark .switch-label {
  color: #9a9ab0;
}
.preview-frame.scheme.is-dark .switch-label.on {
  color: #fff;
}
.switch-track {
  position: relative;
  width: 46px;
  height: 24px;
  border-radius: 999px;
  background: #cfcfe0;
  transition: background 0.3s ease;
}
.switch-track.dark {
  background: var(--accent);
}
.switch-thumb {
  position: absolute;
  top: 3px;
  left: 3px;
  width: 18px;
  height: 18px;
  border-radius: 50%;
  background: #fff;
  box-shadow: 0 1px 3px rgb(0 0 0 / 0.3);
  transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}
.switch-track.dark .switch-thumb {
  transform: translateX(22px);
}

/* Contrast: kräftige Rahmen + fetter Text */
.preview-frame.contrast .sample-card {
  border: 2px solid var(--fg);
  font-weight: 700;
}
.preview-frame.contrast .sample-text {
  color: var(--fg);
}

/* Forced Colors: nur Borders tragen Struktur, kein Flächen-Look */
.preview-frame.forced {
  background: transparent;
}
.preview-frame.forced .sample-card {
  background: transparent;
  border: 1px solid var(--fg);
  box-shadow: none;
}
.preview-frame.forced .sample-avatar {
  background: transparent;
  border: 1px solid var(--fg);
}

.sample-card {
  display: flex;
  align-items: center;
  gap: 14px;
  padding: 16px 20px;
  border-radius: 12px;
  background: var(--db-bg, #fff);
  color: var(--db-fg, #222);
  border: 1px solid var(--border);
  box-shadow: 0 2px 12px rgb(0 0 0 / 0.12);
  min-width: 230px;
}

/* Reduced Motion: nur in dieser Variante bewegt sich die Card */
.sample-card.animate {
  animation: pref-float 1.6s ease-in-out infinite;
}

.sample-avatar {
  width: 44px;
  height: 44px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.4rem;
  border-radius: 10px;
  background: color-mix(in srgb, var(--accent) 18%, transparent);
}

.sample-title {
  font-weight: 700;
  font-size: 0.95rem;
}

.sample-text {
  font-size: 0.8rem;
  opacity: 0.8;
}

.preview-note {
  font-size: 0.82rem;
  color: var(--fg-muted);
  text-align: center;
}

/* ===== Rechte Seite: Erklärung ===== */
.pref-explain {
  display: flex;
  flex-direction: column;
  gap: 14px;
  justify-content: center;
}

.explain-head {
  display: flex;
  align-items: center;
  gap: 10px;
}

.explain-icon {
  font-size: 1.4rem;
}

.explain-title {
  font-size: 1.25rem;
  font-weight: 700;
  color: var(--fg);
}

.explain-code {
  margin: 0;
  font-family: 'Fira Code', 'JetBrains Mono', monospace;
  font-size: 0.82rem;
  line-height: 1.6;
  color: var(--fg);
  background: var(--code-bg);
  border: 1px solid var(--border);
  border-radius: 8px;
  padding: 14px 16px;
  white-space: pre;
  overflow-x: auto;
}

.explain-code :deep(.c-at) { color: var(--accent-text); font-weight: 600; }
.explain-code :deep(.c-sel) { color: var(--accent-text); font-weight: 600; }
.explain-code :deep(.c-prop) { color: var(--accent-text); }
.explain-code :deep(.c-fn) { color: var(--accent-text); font-weight: 600; }

.explain-desc {
  margin: 0;
  font-size: 0.92rem;
  line-height: 1.55;
  color: var(--fg);
}

.explain-desc :deep(code) {
  font-family: 'Fira Code', 'JetBrains Mono', monospace;
  font-size: 0.85em;
  padding: 1px 5px;
  border-radius: 4px;
  background: var(--code-bg);
}

@keyframes pref-float {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-8px); }
}
</style>
