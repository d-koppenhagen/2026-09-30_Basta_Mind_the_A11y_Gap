<template>
  <div class="focus-outline-demo">
    <div class="button-row">
      <!-- ❌ Kein Outline -->
      <div class="demo-card bad" :class="{ 'is-focused': focused === 'none' }">
        <div class="card-badge danger">❌ outline: none</div>
        <button
          class="demo-btn btn-none"
          :class="{ 'show-focus': focused === 'none' }"
          @focus="keyboardFocus = 'none'"
          @blur="onBlur('none')"
        >
          Button
        </button>
        <pre class="card-code">button<span class="fv">:focus-visible</span> {
  outline: none;
}</pre>
        <span class="card-note">Kein sichtbarer Focus</span>

        <!-- Pfeil von unten auf die Box mit fokussiertem Button -->
        <Transition name="pointer-fade">
          <div v-if="focused === 'none'" class="focus-pointer danger">
            <span class="pointer-label">Fokus ist hier &ndash; aber unsichtbar!</span>
            <svg class="pointer-arrow" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M12 4l7 8h-4v8h-6v-8H5z" />
            </svg>
          </div>
        </Transition>
      </div>

      <!-- ✅ Standard Outline -->
      <div class="demo-card good" :class="{ 'is-focused': focused === 'outline' }">
        <div class="card-badge ok">✅ outline</div>
        <button
          class="demo-btn btn-outline"
          :class="{ 'show-focus': focused === 'outline' }"
          @focus="keyboardFocus = 'outline'"
          @blur="onBlur('outline')"
        >
          Button
        </button>
        <pre class="card-code">button<span class="fv">:focus-visible</span> {
  outline: 2px solid;
  outline-offset: 2px;
}</pre>
        <span class="card-note">Klarer Focus-Ring</span>

        <Transition name="pointer-fade">
          <div v-if="focused === 'outline'" class="focus-pointer ok">
            <span class="pointer-label">Fokus sichtbar</span>
            <svg class="pointer-arrow" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M12 4l7 8h-4v8h-6v-8H5z" />
            </svg>
          </div>
        </Transition>
      </div>

      <!-- ✅ Custom box-shadow -->
      <div class="demo-card good" :class="{ 'is-focused': focused === 'shadow' }">
        <div class="card-badge ok">✅ box-shadow</div>
        <button
          class="demo-btn btn-shadow"
          :class="{ 'show-focus': focused === 'shadow' }"
          @focus="keyboardFocus = 'shadow'"
          @blur="onBlur('shadow')"
        >
          Button
        </button>
        <pre class="card-code">button<span class="fv">:focus-visible</span> {
  box-shadow:
    0 0 0 2px #fff,
    0 0 0 5px #7c6fce;
}</pre>
        <span class="card-note">Design-flexibel</span>

        <Transition name="pointer-fade">
          <div v-if="focused === 'shadow'" class="focus-pointer ok">
            <span class="pointer-label">Fokus sichtbar</span>
            <svg class="pointer-arrow" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M12 4l7 8h-4v8h-6v-8H5z" />
            </svg>
          </div>
        </Transition>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue';
import { useNav } from '@slidev/client';

// Klick-Steuerung: mit dem Clicker durch die drei Zustaende steppen.
// clicks 0 = nichts, 1 = none, 2 = outline, 3 = shadow
const { clicks } = useNav();
const steps = ['none', 'outline', 'shadow'];
const clickedFocus = computed(() => steps[clicks.value - 1] ?? null);

// Echter Tastatur-Fokus (Fallback, falls doch getabbt wird)
const keyboardFocus = ref(null);

// Klick-Steuerung hat Vorrang; sonst der echte Fokus
const focused = computed(() => clickedFocus.value ?? keyboardFocus.value);

// Nur zuruecksetzen, wenn der Fokus wirklich diese Card verlassen hat
function onBlur(key) {
  if (keyboardFocus.value === key) keyboardFocus.value = null;
}
</script>

<style scoped>
.focus-outline-demo {
  display: flex;
  flex-direction: column;
  gap: 20px;
  align-items: center;
  justify-content: center;
  /* vertikal & horizontal mittig im verfügbaren Folienbereich */
  min-height: 34vh;
}

/* Theme-taugliche Farben mit Fallback-Kette:
   1. DB-Theme (--db-*)  →  2. k9n-Theme (--k9n-*)  →  3. statischer Wert.
   Beide Themes liefern Light- und Dark-Werte, daher passt die Demo
   automatisch in allen vier Kombinationen (DB/k9n × light/dark).
   Danger/Success haben in keinem Theme dedizierte Tokens – hier nutze
   ich DB-Rot/-Grün als kräftige Werte, die auf hellem UND dunklem
   Grund gut lesbar sind. */
.focus-outline-demo {
  --fg: var(--db-fg, var(--k9n-text-primary, #e2e8f0));
  --fg-muted: var(--db-fg-muted, var(--k9n-text-muted, #94a3b8));
  --surface: var(--db-bg-elevated, var(--k9n-surface-elevated, rgba(127, 127, 127, 0.08)));
  --border: var(--db-border, var(--k9n-border, rgba(127, 127, 127, 0.3)));
  --code-bg: var(--db-code-bg, var(--k9n-code-bg, rgba(127, 127, 127, 0.14)));
  --danger: var(--db-red-500, #dc2626);
  --danger-soft: color-mix(in srgb, var(--danger) 12%, transparent);
  --danger-border: color-mix(in srgb, var(--danger) 35%, transparent);
  /* Hellere Text-Variante: DB-Rot/-Grün liegen als Text auf dunklem Grund
     knapp unter AA (4.1:1). Diese Werte erreichen >= 4.5:1 fuer Label-Text. */
  --danger-text: #ff6b6b;
  --success: var(--db-green-500, #16a34a);
  --success-soft: color-mix(in srgb, var(--success) 12%, transparent);
  --success-border: color-mix(in srgb, var(--success) 35%, transparent);
  --success-text: #5cae4d;
  /* Button-Farbe: DB-Theme = Lilac (Design-Token, dunkler Ton für
     ausreichenden Kontrast zu weißem Text), sonst k9n-Accent / Blau. */
  --primary: var(--db-lilac-600, var(--k9n-accent, #3b82f6));

  /* Akzentfarbe fuer :focus-visible IM Code-Snippet.
     Anders als --primary steht diese Farbe als Text auf dem Code-Hintergrund,
     nicht als weisser Text auf lila Button. Deshalb ein separater Wert:
     Light-Mode nutzt Lilac-600 (Kontrast ~5.8:1 auf hellem Code-BG),
     Dark-Mode wird unten via .dark auf Lilac-200 hochgezogen (~5.8:1 auf
     dunklem Code-BG). Beide erfuellen WCAG AA (>= 4.5:1). */
  --fv-color: var(--db-lilac-600, var(--k9n-accent, #3b82f6));

  /* Farbe des box-shadow-Focus-Rings der dritten Karte.
     --primary (Lilac-600) ist zu dunkel und sitzt direkt auf dem lila
     Button -> kaum sichtbar. Deshalb ein kraeftigerer, mittlerer Ton mit
     voller Deckkraft. Dark-Mode wird unten aufgehellt. */
  --ring-color: var(--db-lilac-400, var(--k9n-accent, #3b82f6));
  /* Gap-Farbe zwischen Button und Ring = Kartenhintergrund, damit sich der
     Ring klar vom Button absetzt (Button | Luecke | Ring). */
  --ring-gap: var(--surface);
}

/* Dark-Mode: hellere Lilac-Toene fuer :focus-visible-Text UND Focus-Ring,
   damit beide auf dem dunklen Hintergrund gut erkennbar sind.
   Der Selektor muss auf .focus-outline-demo selbst zielen (gleiche
   Spezifitaet wie die Basis-Definition oben), sonst gewinnt die lokale
   Regel gegen eine nur auf html gesetzte Variable. */
html.dark .focus-outline-demo {
  --fv-color: var(--db-lilac-200, var(--k9n-accent, #93c5fd));
  --ring-color: var(--db-lilac-200, var(--k9n-accent, #93c5fd));
}

.button-row {
  display: flex;
  gap: 28px;
  justify-content: center;
  align-items: stretch;
  flex-wrap: nowrap;
  /* Platz unter den Karten für die Pfeile reservieren */
  padding-bottom: 80px;
}

.demo-card {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
  padding: 22px 28px;
  border-radius: 14px;
  background: var(--surface);
  border: 1px solid var(--border);
  min-width: 230px;
  /* gleiche Höhe für alle Karten, damit card-note bündig unten sitzt */
  align-self: stretch;
  transition: border-color 0.2s ease, box-shadow 0.2s ease;
}

.demo-card.bad {
  border-color: var(--danger-border);
  background: var(--danger-soft);
}

.demo-card.good {
  border-color: var(--success-border);
  background: var(--success-soft);
}

/* Aktive Karte dezent hervorheben */
.demo-card.is-focused.bad {
  box-shadow: 0 0 0 1px var(--danger);
}

.demo-card.is-focused.good {
  box-shadow: 0 0 0 1px var(--success);
}

.card-badge {
  font-size: 0.85rem;
  font-weight: 700;
  padding: 3px 11px;
  border-radius: 5px;
}

.card-badge.danger {
  background: var(--danger-soft);
  color: var(--danger-text);
}

.card-badge.ok {
  background: var(--success-soft);
  color: var(--success-text);
}

/* Basis-Button */
.demo-btn {
  padding: 11px 32px;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 600;
  background: var(--primary);
  color: #fff;
  cursor: pointer;
}

/* ❌ Kein Focus-Indikator (Tastatur ODER Klick-Steuerung) */
.btn-none:focus-visible,
.btn-none.show-focus {
  outline: none;
}

/* ✅ Standard-Outline (Tastatur ODER Klick-Steuerung) */
.btn-outline:focus-visible,
.btn-outline.show-focus {
  outline: 2px solid var(--fg);
  outline-offset: 2px;
}

/* ✅ Custom box-shadow (Tastatur ODER Klick-Steuerung)
   Zweistufig: schmale Luecke in Kartenfarbe, dann farbiger Ring mit voller
   Deckkraft. So hebt sich der Ring klar vom lila Button ab. */
.btn-shadow:focus-visible,
.btn-shadow.show-focus {
  outline: none;
  box-shadow:
    0 0 0 2px var(--ring-gap),
    0 0 0 5px var(--ring-color);
}

.card-code {
  margin: 0;
  font-family: 'Fira Code', 'JetBrains Mono', monospace;
  font-size: 0.78rem;
  color: var(--fg);
  background: var(--code-bg);
  border: 1px solid var(--border);
  padding: 9px 14px;
  border-radius: 6px;
  text-align: left;
  line-height: 1.55;
  white-space: pre;
  align-self: stretch;
}

/* :focus-visible dezent hervorheben, damit der Kern-Selektor auffaellt */
.card-code .fv {
  color: var(--fv-color);
  font-weight: 600;
}

.card-note {
  font-size: 0.85rem;
  color: var(--fg-muted);
  /* immer am unteren Rand der Karte ausrichten */
  margin-top: auto;
}

/* Pfeil von außen (unten) auf die aktive Karte */
.focus-pointer {
  position: absolute;
  top: calc(100% + 10px);
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  flex-direction: column-reverse;
  align-items: center;
  gap: 4px;
  white-space: nowrap;
  pointer-events: none;
}

.pointer-arrow {
  width: 26px;
  height: 26px;
  fill: currentColor;
  animation: bob 0.9s ease-in-out infinite;
}

.pointer-label {
  font-size: 0.82rem;
  font-weight: 600;
  padding: 4px 10px;
  border-radius: 5px;
}

.focus-pointer.danger .pointer-arrow { color: var(--danger-text); }
.focus-pointer.danger .pointer-label {
  color: var(--danger-text);
  background: var(--danger-soft);
  border: 1px solid var(--danger-border);
}

.focus-pointer.ok .pointer-arrow { color: var(--success-text); }
.focus-pointer.ok .pointer-label {
  color: var(--success-text);
  background: var(--success-soft);
  border: 1px solid var(--success-border);
}

@keyframes bob {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-5px); }
}

/* Ein-/Ausblenden des Pfeils */
.pointer-fade-enter-active,
.pointer-fade-leave-active {
  transition: opacity 0.2s ease, transform 0.2s ease;
}
.pointer-fade-enter-from,
.pointer-fade-leave-to {
  opacity: 0;
  transform: translateX(-50%) translateY(6px);
}
</style>
