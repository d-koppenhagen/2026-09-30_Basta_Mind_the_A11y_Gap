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
        :class="[
          active.key,
          step.variant ? `variant-${step.variant}` : null,
          { 'is-dark': active.key === 'scheme' && schemeMode === 'dark' },
        ]"
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

        <!-- Zeigt, welche Technik den gleichen Effekt erzeugt -->
        <div
          v-if="active.key === 'scheme'"
          class="scheme-badge"
          :class="step.variant"
          aria-hidden="true"
        >
          {{ step.variant === 'media' ? '@media prefers-color-scheme' : 'light-dark() · contrast-color() · contrast()' }}
        </div>

        <!-- Beispiel-Card, auf die alle Präferenzen wirken -->
        <div class="sample-card" :class="{ animate: active.key === 'motion' }">
          <div class="sample-avatar" aria-hidden="true">🎧</div>
          <div class="sample-body">
            <div class="sample-title">A11y Weekly</div>
            <div class="sample-text">Präferenzen respektieren</div>
          </div>
        </div>
        <div class="preview-note">{{ previewText }}</div>
      </div>
    </div>

    <!-- Rechts: nur der eine relevante Schnipsel + ein Satz -->
    <div class="pref-explain">
      <div class="explain-head">
        <span class="explain-icon" aria-hidden="true">{{ active.icon }}</span>
        <span class="explain-title">{{ active.title }}</span>
      </div>
      <pre class="explain-code"><code v-html="activeCode" /></pre>
      <p class="explain-desc" v-html="activeDesc" />
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
    // preview/code/desc kommen für diesen Schritt aus schemeVariants
    // (modern vs. media), weil er in zwei Sub-Steps aufgeteilt ist.
    key: 'scheme',
    icon: '🌗',
    tab: 'Dark / Light',
    title: 'Dark / Light Mode',
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

// Der Dark/Light-Schritt zeigt zwei Sub-Steps: erst die moderne Variante
// (light-dark + contrast-color + contrast), dann derselbe Effekt klassisch
// per @media (prefers-color-scheme). Deshalb wird 'scheme' auf zwei Steps
// abgebildet; alle anderen Präferenzen bleiben ein Step.
const schemeVariants = {
  modern: {
    preview: 'Eine Card, drei moderne Funktionen — ganz ohne Media Query.',
    code:
      '<span class="c-sel">:root</span> { <span class="c-prop">color-scheme</span>: light dark; }\n' +
      '<span class="c-sel">.card</span> {\n' +
      '  <span class="c-cmt">/* Fläche folgt dem Schema */</span>\n' +
      '  <span class="c-prop">--surface</span>: <span class="c-fn">light-dark</span>(#fff, #1a1a2e);\n' +
      '  <span class="c-prop">background</span>: var(--surface);\n' +
      '  <span class="c-cmt">/* Text automatisch lesbar */</span>\n' +
      '  <span class="c-prop">color</span>: <span class="c-fn">contrast-color</span>(var(--surface));\n' +
      '  <span class="c-cmt">/* on top nachgeschärft */</span>\n' +
      '  <span class="c-prop">filter</span>: <span class="c-fn">contrast</span>(1.25);\n' +
      '}',
    desc:
      'Alle drei greifen an <strong>einer</strong> Card: <code>light-dark()</code> wählt die Fläche, <code>contrast-color()</code> setzt automatisch lesbaren Text (schwarz/weiß) und der Filter <code>contrast()</code> schärft das Ergebnis nach — komplett ohne Media Query.',
  },
  media: {
    preview: 'Gleiches Ergebnis — klassisch per Media Query.',
    code:
      '<span class="c-sel">.card</span> {\n' +
      '  <span class="c-prop">--surface</span>: #fff;\n' +
      '  <span class="c-prop">background</span>: var(--surface);\n' +
      '  <span class="c-prop">color</span>: #222;\n' +
      '}\n' +
      '<span class="c-at">@media</span> (<span class="c-prop">prefers-color-scheme</span>: dark) {\n' +
      '  <span class="c-sel">.card</span> {\n' +
      '    <span class="c-prop">--surface</span>: #1a1a2e;\n' +
      '    <span class="c-prop">color</span>: #eee;\n' +
      '  }\n' +
      '}',
    desc:
      'Der klassische Weg: eine <code>@media (prefers-color-scheme)</code>-Query und <strong>jedes</strong> Farbpaar doppelt gepflegt. Funktioniert überall, ist aber mehr Code — und der Kontrast wird nicht automatisch garantiert.',
  },
};

// Reihenfolge der Steps: motion, scheme(modern), scheme(media), contrast, forced.
const steps = prefs.flatMap((p) =>
  p.key === 'scheme'
    ? [
        { pref: p, variant: 'modern' },
        { pref: p, variant: 'media' },
      ]
    : [{ pref: p, variant: null }],
);

const { clicks } = useNav();
// clicks 0 -> erster Step, danach durchsteppen; am Ende clampen.
const step = computed(() => steps[Math.min(clicks.value, steps.length - 1)]);
const active = computed(() => step.value.pref);

// Für den Scheme-Schritt: moderne vs. klassische Variante. Preview/Code/Desc
// kommen dann aus schemeVariants statt aus dem prefs-Eintrag.
const schemeVariant = computed(() =>
  active.value.key === 'scheme' ? schemeVariants[step.value.variant] : null,
);
const previewText = computed(() =>
  schemeVariant.value ? schemeVariant.value.preview : active.value.preview,
);
const activeCode = computed(() =>
  schemeVariant.value ? schemeVariant.value.code : active.value.code,
);
const activeDesc = computed(() =>
  schemeVariant.value ? schemeVariant.value.desc : active.value.desc,
);

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
      }, 4000);
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
  /* Feste Höhe + feste Row, damit die linke Stage beim Durchklicken nicht
     springt. grid-template-rows fixiert die Zeilenhöhe, sodass die Zellen
     nicht am Inhalt wachsen. */
  height: 40vh;
  grid-template-rows: minmax(0, 1fr);
}

html.dark .pref-demo {
  --accent-text: var(--db-lilac-200, var(--k9n-accent, #c4bbef));
}

/* ===== Linke Seite: Stage ===== */
.pref-stage {
  display: flex;
  flex-direction: column;
  gap: 14px;
  /* min-height:0 lässt den preview-frame (flex:1) den Resthöhe füllen,
     statt am Inhalt zu wachsen -> konstante Höhe über alle Klicks. */
  min-height: 0;
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
  /* min-height:0 + overflow verhindern, dass unterschiedlich viel Inhalt
     (Badge/Switch/längere Note) die feste Höhe sprengt. */
  min-height: 0;
  overflow: hidden;
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

/* Dark/Light: color-scheme startet hell und kippt per Auto-Timer (.is-dark)
   ins Dunkle. Alle Farben leiten sich daraus ab — light-dark() reagiert
   direkt auf diesen Wert. */
.preview-frame.scheme {
  color-scheme: light;
  background: light-dark(#f4f4f8, #1a1a2e);
  border-color: light-dark(#d7d7e0, #33334d);
}
.preview-frame.scheme.is-dark {
  color-scheme: dark;
}

/* Ein einziges Beispiel, drei Funktionen zusammen:
   1. light-dark()      -> Fläche folgt dem (simulierten) Schema
   2. contrast-color()  -> Text automatisch lesbar auf dieser Fläche
   3. contrast()        -> schärft die ganze Card on top nach
   Der zweite color:-Wert ist ein Fallback via light-dark(), falls der
   Browser contrast-color() noch nicht unterstützt. */
.preview-frame.scheme .sample-card {
  --card-surface: light-dark(#fff, #24243e);
  background: var(--card-surface);
  border-color: light-dark(#d7d7e0, #3a3a55);
}
/* Moderne Variante: Text via contrast-color(), Card via contrast() geschärft. */
.preview-frame.scheme.variant-modern .sample-card {
  color: light-dark(#222, #eee); /* Fallback, falls contrast-color() fehlt */
  color: contrast-color(var(--card-surface));
  filter: contrast(1.25);
}
/* Klassische Variante: feste Farbpaare, wie sie die Media Query setzt. */
.preview-frame.scheme.variant-media .sample-card {
  color: light-dark(#222, #eee);
}
/* Titel/Text erben die contrast-color()-Farbe der Card, statt eigene
   feste Werte zu setzen — so bleibt das Beispiel EINE Quelle der Wahrheit. */
.preview-frame.scheme .sample-title,
.preview-frame.scheme .sample-text {
  color: inherit;
  opacity: 1;
}
.preview-frame.scheme .preview-note {
  color: light-dark(#5a5a6b, #a0a0b5);
}

/* Switch oben in der Box */
.scheme-switch {
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 0.78rem;
  font-weight: 600;
}
.preview-frame.scheme .switch-label {
  color: light-dark(#6b6b7b, #9a9ab0);
  opacity: 0.5;
  transition: opacity 0.3s ease, color 0.3s ease;
}
.preview-frame.scheme .switch-label.on {
  opacity: 1;
  color: light-dark(#222, #fff);
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

/* Technik-Badge: macht sichtbar, ob gerade der moderne oder der klassische
   (Media-Query-)Weg gezeigt wird. */
.scheme-badge {
  font-family: 'Fira Code', 'JetBrains Mono', monospace;
  font-size: 0.68rem;
  font-weight: 700;
  letter-spacing: 0.01em;
  padding: 4px 10px;
  border-radius: 999px;
  border: 1px solid transparent;
  white-space: nowrap;
}
.scheme-badge.modern {
  color: #1f7a4d;
  background: #d8f3e3;
  border-color: #9fdcbd;
}
.scheme-badge.media {
  color: #8a5a1a;
  background: #fbe6cf;
  border-color: #e6c68a;
}
.preview-frame.scheme.is-dark .scheme-badge.modern {
  color: #7ee6ac;
  background: #123726;
  border-color: #1f5c3d;
}
.preview-frame.scheme.is-dark .scheme-badge.media {
  color: #f0c078;
  background: #3a2a12;
  border-color: #5c451f;
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
.explain-code :deep(.c-cmt) { color: var(--fg-muted); font-style: italic; }

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
