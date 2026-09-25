<template>
  <div class="skip-demo-wrapper">
    <!-- Links: Browser-Demo -->
    <BrowserWindow url="https://example.org/" body-height="290px">
      <div class="page">
        <!-- Top-Bar mit fester Höhe: Skip-Link links, App-Titel rechts.
             Feste Höhe → Layout springt nicht, wenn der Skip-Link verschwindet. -->
        <div class="topbar">
          <span class="logo">🚆 MyApp</span>
          <!-- Skip-Link: wird Schritt für Schritt versteckt, bei Fokus wieder sichtbar -->
          <a
            href="#main"
            class="skip-link"
            :class="{ 'is-focused': focused }"
            :style="skipLinkStyle"
          >
            Zum Hauptinhalt springen
          </a>
        </div>

        <!-- Kontext: eine lange Hauptnavigation, die übersprungen werden soll -->
        <header class="site-header">
          <nav class="main-nav" aria-label="Hauptnavigation">
            <span v-for="item in navItems" :key="item" class="nav-item">{{ item }}</span>
          </nav>
        </header>

        <main id="main" class="site-main" :class="{ 'main-target': highlightTarget }">
          <h2>Willkommen</h2>
          <div class="skeleton-line w-90"></div>
          <div class="skeleton-line w-70"></div>
          <div class="skeleton-line w-80"></div>
        </main>
      </div>
    </BrowserWindow>

    <!-- Rechts: CSS wächst Zeile für Zeile (Code-Block-Look) -->
    <div class="explain">
      <div class="code-block">
        <div class="code-head">
          <code class="selector">.skip-link:not(:focus, :active, :focus-within)</code> <span class="brace">{</span>
        </div>

        <ul class="css-lines">
          <li
            v-for="(line, i) in cssLines"
            :key="line.prop"
            class="css-line"
            :class="{ visible: step > i, active: step === i + 1 }"
          >
            <code>{{ line.prop }}: {{ line.value }};</code>
            <span class="effect">{{ line.effect }}</span>
          </li>
        </ul>

        <div class="brace-close" :class="{ visible: step > 0 }">}</div>
      </div>

      <Transition name="note-fade">
        <div v-if="step > cssLines.length" class="focus-note">
          <div class="focus-badge">✅ :focus</div>
          <p>Bei Tastatur-Fokus werden alle Properties zurückgesetzt — der Skip-Link ist <strong>sichtbar &amp; klickbar</strong>.</p>
        </div>
      </Transition>
    </div>
  </div>
</template>

<script setup>
import { computed, ref, watch } from 'vue';
import { useSlideContext } from '@slidev/client';
import BrowserWindow from './BrowserWindow.vue';

const { $clicks } = useSlideContext();

const navItems = [
  'Home', 'Produkte', 'Lösungen', 'Preise', 'Blog', 'Über uns', 'Kontakt',
];

// Reihenfolge so, dass jeder Schritt links sichtbar etwas verändert.
// width/height schrumpfen zuerst → Text läuft sichtbar über,
// erst danach schneidet overflow:hidden ihn ab.
const cssLines = [
  { prop: 'white-space', value: 'nowrap', effect: 'Text einzeilig' },
  { prop: 'padding', value: '0', effect: 'Innenabstand weg' },
  { prop: 'border', value: '0', effect: 'Rahmen weg' },
  { prop: 'width', value: '1px', effect: 'Breite minimieren – läuft über' },
  { prop: 'height', value: '1px', effect: 'Höhe minimieren' },
  { prop: 'overflow', value: 'hidden', effect: 'Überlauf abschneiden' },
  { prop: 'clip-path', value: 'inset(50%)', effect: 'Final unsichtbar' },
];

// Schritt 0: alles sichtbar. 1..7: CSS-Zeilen. 8: :focus (wieder sichtbar).
const step = computed(() => Math.min($clicks.value, cssLines.length + 1));

// Letzter Klick = Fokus-Zustand: Skip-Link wieder voll sichtbar.
const focused = computed(() => step.value > cssLines.length);

// Ziel-Highlight (grüner Rahmen um <main>) + Sprungpfeil erscheinen
// bewusst 500 ms verzögert, damit erst der Fokus, dann der Sprung wirkt.
const highlightTarget = ref(false);
let highlightTimer;
watch(
  focused,
  (isFocused) => {
    clearTimeout(highlightTimer);
    if (isFocused) {
      highlightTimer = setTimeout(() => {
        highlightTarget.value = true;
      }, 500);
    } else {
      // Zurückklicken: sofort ausblenden.
      highlightTarget.value = false;
    }
  },
  { immediate: true },
);

const skipLinkStyle = computed(() => {
  // Bei Fokus: alle Verstecke zurücksetzen (Default-Look).
  if (focused.value) {
    return {
      whiteSpace: 'nowrap',
      padding: '0.2rem 1rem',
      border: '2px solid transparent',
      overflow: 'visible',
      width: 'auto',
      height: 'auto',
      clipPath: 'none',
      margin: '0',
    };
  }
  const s = step.value;
  return {
    // Initial: normal breiter, flacher Button. Erst width:1px erzeugt den
    // Überlauf, den overflow:hidden danach sichtbar abschneidet.
    whiteSpace: 'nowrap',
    padding: s >= 2 ? '0' : '0.35rem 1rem',
    border: s >= 3 ? '0' : '2px solid #f59e0b',
    width: s >= 4 ? '1px' : 'auto',
    height: s >= 5 ? '1px' : 'auto',
    overflow: s >= 6 ? 'hidden' : 'visible',
    clipPath: s >= 7 ? 'inset(50%)' : 'none',
    margin: s >= 7 ? '-1px' : '0',
  };
});
</script>

<style scoped>
.skip-demo-wrapper {
  display: flex;
  gap: 24px;
  align-items: flex-start;
  max-width: 100%;
  --accent: #10b981;
  /* Dunkleres Grün als Button-Grund → weißer Text erreicht AA (~4.8:1) */
  --accent-strong: #047857;
  --amber: #f59e0b;
}

.skip-demo-wrapper > :first-child {
  flex: 1;
  min-width: 0;
}

/* ---------- Left: fake page inside browser ---------- */
.page {
  position: relative;
  height: 100%;
  padding: 14px;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

/* Top-Bar: Skip-Link links, App-Titel rechts. Feste Höhe, damit das
   Layout beim Ein-/Ausblenden des Skip-Links nicht springt. */
.topbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
  height: 40px;
  flex-shrink: 0;
}

.skip-link {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  background: var(--accent-strong);
  /* Heller Text auf dunkelgrünem Grund → hoher Kontrast (AA, ~4.8:1) */
  color: #ffffff;
  font-weight: 700;
  font-size: 0.8rem;
  border-radius: 6px;
  text-decoration: none;
  z-index: 20;
}

.skip-link.is-focused {
  animation:
    focus-ring 1s ease-in-out 0.1s 3 both;
}

@keyframes focus-ring {
  0%,
  100% {
    box-shadow: 0 0 0 2px rgba(255, 255, 255, 0.35);
    transform: scale(1);
  }
  50% {
    box-shadow: 0 0 0 2px rgba(255, 255, 255, 0.9);
    transform: scale(1.05);
  }
}

.site-header {
  display: flex;
  align-items: center;
  gap: 14px;
  padding: 8px 10px;
  background: #16213e;
  border-radius: 6px;
  flex-wrap: wrap;
}

.logo {
  /* gleiche Textgröße wie der Button; steht links in der Top-Bar */
  font-size: 0.8rem;
  font-weight: 700;
  color: #e2e8f0;
  white-space: nowrap;
}

.main-nav {
  display: flex;
  flex-wrap: wrap;
  gap: 4px 10px;
}

.nav-item {
  font-size: 0.72rem;
  color: #94a3b8;
  padding: 2px 4px;
}

.site-main {
  position: relative;
  flex: 1;
  padding: 12px 14px;
  background: rgba(255, 255, 255, 0.03);
  border-radius: 6px;
  display: flex;
  flex-direction: column;
  gap: 8px;
  transition: box-shadow 0.3s ease;
}

.site-main.main-target {
  box-shadow: inset 0 0 0 2px rgba(16, 185, 129, 0.6);
}

.site-main h2 {
  margin: 0;
  font-size: 0.95rem;
  color: #e2e8f0;
}

.skeleton-line {
  height: 9px;
  border-radius: 5px;
  background: linear-gradient(90deg, rgba(255,255,255,0.06) 25%, rgba(255,255,255,0.12) 50%, rgba(255,255,255,0.06) 75%);
  background-size: 200% 100%;
  animation: shimmer 1.8s infinite;
}

.w-90 { width: 90%; }
.w-80 { width: 80%; }
.w-70 { width: 70%; }

@keyframes shimmer {
  0% { background-position: 200% 0; }
  100% { background-position: -200% 0; }
}

/* ---------- Right: growing CSS ---------- */
.explain {
  flex: 0.85;
  min-width: 0;
  font-family: 'Fira Code', 'JetBrains Mono', monospace;
  /* Theme-taugliche Token-Kette (DB → k9n → Fallback), damit die
     rechte Spalte auf hellem UND dunklem Slide-Grund lesbar ist. */
  --txt: var(--db-fg, var(--k9n-text-primary, #e2e8f0));
  --txt-muted: var(--db-fg-muted, var(--k9n-text-secondary, #94a3b8));
}

/* Ganzer CSS-Bereich als Code-Block: bewusst in BEIDEN Modi dunkel
   (wie ein echter Editor/Code-Block), heller Text darauf. */
.code-block {
  background: #1e1e2e;
  border: 1px solid rgba(255, 255, 255, 0.12);
  border-radius: 8px;
  padding: 10px 12px;
  --txt: #e2e8f0;
  --txt-muted: #94a3b8;
  --selector: #7dd3fc;
}

.code-head {
  font-size: 0.8rem;
  color: var(--txt-muted);
}

.code-head .selector { color: var(--selector); }
.code-head .brace { opacity: 0.6; }

.css-lines {
  list-style: none;
  margin: 2px 0;
  padding: 0;
}

/* Theme setzt `.slidev-layout ul > li::before { content: '—' }` (roter
   Strich). Für die Code-Zeilen entfernen. */
.css-lines > li::before {
  content: none !important;
}

.css-line {
  display: flex;
  align-items: baseline;
  gap: 10px;
  /* Engere Zeilen für kompakten Code-Look. */
  padding: 1px 8px;
  margin: 0 0 0 14px;
  border-left: 2px solid transparent;
  border-radius: 0 4px 4px 0;
  font-size: 0.8rem;
  line-height: 1.6;
  opacity: 0;
  transform: translateX(-6px);
  transition: opacity 0.35s ease, transform 0.35s ease, background 0.35s ease;
}

.css-line.visible {
  opacity: 1;
  transform: translateX(0);
}

.css-line.active {
  background: rgba(245, 158, 11, 0.14);
  border-left-color: var(--amber);
}

/* Theme-Chip-Styling für code-Tags im Code-Block neutralisieren:
   kein heller Chip-Grund, damit heller Text direkt auf dem dunklen
   Block-Grund steht (sonst hell-auf-hell im Light Mode). */
.code-block :deep(code) {
  background: transparent;
  padding: 0;
  border: none;
  border-radius: 0;
}

.css-line code {
  color: var(--txt);
  white-space: nowrap;
}

.css-line .effect {
  font-family: system-ui, -apple-system, sans-serif;
  font-size: 0.68rem;
  color: var(--txt-muted);
  margin-left: auto;
  white-space: nowrap;
}

.brace-close {
  font-size: 0.82rem;
  color: var(--txt-muted);
  opacity: 0;
  transition: opacity 0.3s ease;
}

.brace-close.visible { opacity: 0.6; }

.focus-note {
  margin-top: 14px;
  padding: 10px 12px;
  border-radius: 8px;
  background: rgba(16, 185, 129, 0.1);
  border: 1px solid rgba(16, 185, 129, 0.3);
  font-family: system-ui, -apple-system, sans-serif;
}

.focus-badge {
  display: inline-block;
  font-size: 0.68rem;
  font-weight: 700;
  padding: 2px 8px;
  border-radius: 4px;
  /* Weißer Text auf sattem Grün → AA-konform in beiden Modi (5.48:1) */
  background: #047857;
  color: #ffffff;
  margin-bottom: 6px;
}

.focus-note p {
  margin: 0;
  font-size: 0.78rem;
  line-height: 1.5;
  color: var(--txt);
}

.note-fade-enter-active { transition: opacity 0.3s ease, transform 0.3s ease; }
.note-fade-enter-from { opacity: 0; transform: translateY(-4px); }
</style>
