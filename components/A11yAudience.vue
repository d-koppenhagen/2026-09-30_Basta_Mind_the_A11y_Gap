<script setup>
import { computed } from 'vue';

/**
 * A11yAudience – zeigt an, auf welche Nutzergruppe(n) eine Slide „einzahlt".
 *
 * Zwei Modi:
 *  1) Badge-Leiste (Default): oben rechts, links neben dem DB-Logo.
 *     Nutzung pro Slide:  <A11yAudience :groups="['screenreader', 'keyboard']" />
 *  2) Legende (legend):    volle Aufschlüsselung aller Gruppen als Grid,
 *     einmalig auf einer Übersichts-Slide.
 *     Nutzung:  <A11yAudience legend />
 *
 * Jede Gruppe hat ein eigenes Inline-SVG-Icon und eine Akzentfarbe, damit die
 * Darstellung unabhängig von Icon-Collections überall (Dev + Build) rendert.
 */

// Zentrale Registry aller Nutzergruppen. Neue Gruppen einfach hier ergänzen.
const REGISTRY = {
  screenreader: {
    label: 'Screenreader',
    desc: 'Nutzt Sprachausgabe / Braille',
    // RGB-Tripel (für rgba()-Mischungen)
    color: '59, 130, 246', // blue-500
    // Sprechblase mit Schallwellen (kompakt, komplett innerhalb der Viewbox)
    icon: `<path fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" d="M3 5h10a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2H8l-3.5 3v-3H3a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2Z"/><path fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" d="M18 7.5a4 4 0 0 1 0 6M20.5 5.5a7 7 0 0 1 0 10"/>`,
  },
  keyboard: {
    label: 'Tastatur',
    desc: 'Bedient ohne Maus',
    color: '16, 185, 129', // emerald-500
    // Tastatur-Umriss mit Tasten
    icon: `<rect x="2" y="6" width="20" height="12" rx="2" fill="none" stroke="currentColor" stroke-width="2"/><path stroke="currentColor" stroke-width="2" stroke-linecap="round" d="M6 10h.01M10 10h.01M14 10h.01M18 10h.01M8 14h8"/>`,
  },
  blind: {
    label: 'Blind / Sehbeh.',
    desc: 'Blind oder stark sehbeeinträchtigt',
    color: '168, 85, 247', // purple-500
    // Auge mit Schrägstrich (blind)
    icon: `<path fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" d="M2 12s3.5-6 10-6 10 6 10 6-3.5 6-10 6-10-6-10-6Z"/><circle cx="12" cy="12" r="2.5" fill="none" stroke="currentColor" stroke-width="2"/><path stroke="currentColor" stroke-width="2" stroke-linecap="round" d="M3 3l18 18"/>`,
  },
  lowvision: {
    label: 'Sehschwäche',
    desc: 'Kontrast, Zoom, Vergrößerung',
    color: '234, 179, 8', // amber-500
    // Lupe
    icon: `<circle cx="11" cy="11" r="7" fill="none" stroke="currentColor" stroke-width="2"/><path stroke="currentColor" stroke-width="2" stroke-linecap="round" d="m20 20-3.5-3.5"/><path stroke="currentColor" stroke-width="2" stroke-linecap="round" d="M8 11h6M11 8v6"/>`,
  },
  cognitive: {
    label: 'Kognitiv',
    desc: 'Verständlichkeit, Fokus, klare Struktur',
    color: '236, 72, 153', // pink-500
    // Gehirn (Lucide-Stil): zwei Hälften mit Windungen, klar erkennbar
    icon: `<path fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" d="M12 5a2.5 2.5 0 0 0-5 .5 2.5 2.5 0 0 0-2 3.5 2.5 2.5 0 0 0 0 4.5 2.5 2.5 0 0 0 3 3.5A2.5 2.5 0 0 0 12 19Zm0 0a2.5 2.5 0 0 1 5 .5 2.5 2.5 0 0 1 2 3.5 2.5 2.5 0 0 1 0 4.5 2.5 2.5 0 0 1-3 3.5A2.5 2.5 0 0 1 12 19"/><path fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" d="M7.5 5.5c0 1 .5 1.8 1.5 2M5 9.5c.7.3 1.5.3 2.2-.2M5 14c.8-.3 1.6-.2 2.3.3M16.5 5.5c0 1-.5 1.8-1.5 2M19 9.5c-.7.3-1.5.3-2.2-.2M19 14c-.8-.3-1.6-.2-2.3.3"/>`,
  },
  motor: {
    label: 'Motorik',
    desc: 'Eingeschränkte Feinmotorik / Zielflächen',
    color: '20, 184, 166', // teal-500
    // Zeigefinger tippt auf Zielfläche (klarer Tap-Cursor)
    icon: `<circle cx="12" cy="6" r="4" fill="none" stroke="currentColor" stroke-width="2" opacity="0.45"/><path fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" d="M11 12V6.5a1.5 1.5 0 0 1 3 0v6.5l3-1.2a1.6 1.6 0 0 1 2 1.6c0 3-1.2 5.6-2 6.6-.5.6-1.2 1-2.2 1h-2.3c-1 0-1.6-.4-2.2-1.1L8 16.5a1.5 1.5 0 0 1 2.3-1.9L11 15"/>`,
  },
  deaf: {
    label: 'Gehörlos',
    desc: 'Untertitel, Transkripte, visuelle Signale',
    color: '245, 158, 11', // amber-600-ish / orange
    // Ohr mit Schrägstrich
    icon: `<path fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" d="M6 9a6 6 0 0 1 12 0c0 3-2.5 3.8-3.5 5s-.5 2.5-2.5 2.5a2.5 2.5 0 0 1-2.5-2.5"/><path stroke="currentColor" stroke-width="2" stroke-linecap="round" d="M9 9a3 3 0 0 1 4.5-2.6"/><path stroke="currentColor" stroke-width="2" stroke-linecap="round" d="M3 3l18 18"/>`,
  },
  voice: {
    label: 'Sprachsteuerung',
    desc: 'Steuert per Stimme (Voice Control)',
    color: '99, 102, 241', // indigo-500
    // Mikrofon
    icon: `<rect x="9" y="2" width="6" height="11" rx="3" fill="none" stroke="currentColor" stroke-width="2"/><path fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" d="M5 10a7 7 0 0 0 14 0M12 17v4M8 21h8"/>`,
  },
};

const props = defineProps({
  /**
   * Gruppen, auf die die Slide einzahlt.
   * Array aus Registry-Keys, z. B. ['screenreader', 'keyboard'].
   * Unbekannte Keys werden still ignoriert.
   */
  groups: {
    type: Array,
    default: () => [],
  },
  /** Legenden-Modus: volle Aufschlüsselung aller Gruppen (Übersichts-Slide). */
  legend: {
    type: Boolean,
    default: false,
  },
});

// Alle Registry-Einträge (für die Legende), inkl. Key.
const allGroups = computed(() =>
  Object.entries(REGISTRY).map(([key, value]) => ({ key, ...value })),
);

// Nur die für diese Slide konfigurierten Gruppen (für die Badge-Leiste).
const activeGroups = computed(() =>
  props.groups
    .map((key) => (REGISTRY[key] ? { key, ...REGISTRY[key] } : null))
    .filter(Boolean),
);
</script>

<template>
  <!-- Legende: einmalige Aufschlüsselung aller Nutzergruppen -->
  <div v-if="legend" class="aa-legend">
    <div
      v-for="g in allGroups"
      :key="g.key"
      class="aa-legend-item"
      :style="{ '--aa-accent': g.color }"
    >
      <span class="aa-legend-badge" aria-hidden="true">
        <svg viewBox="0 0 24 24" width="26" height="26" v-html="g.icon" />
      </span>
      <span class="aa-legend-text">
        <span class="aa-legend-label">{{ g.label }}</span>
        <span class="aa-legend-desc">{{ g.desc }}</span>
      </span>
    </div>
  </div>

  <!-- Badge-Leiste: oben rechts, links neben dem DB-Logo -->
  <div
    v-else-if="activeGroups.length"
    class="aa-bar"
    role="img"
    :aria-label="`Zielgruppe dieser Folie: ${activeGroups.map((g) => g.label).join(', ')}`"
  >
    <span
      v-for="g in activeGroups"
      :key="g.key"
      class="aa-badge"
      :style="{ '--aa-accent': g.color }"
      :title="g.label"
    >
      <svg
        class="aa-badge-icon"
        viewBox="0 0 24 24"
        width="20"
        height="20"
        aria-hidden="true"
        v-html="g.icon"
      />
    </span>
  </div>
</template>

<style scoped>
/* ---------- Badge-Leiste (oben rechts, neben DB-Logo) ---------- */
.aa-bar {
  position: absolute;
  top: 1.4rem;
  /* Logo sitzt bei right: 2.5rem, Höhe 2.2rem, ~ Breite ~2.4rem.
     Wir lassen ~4rem frei und legen die Badges links daneben. */
  right: 7rem;
  z-index: 21;
  display: flex;
  align-items: center;
  gap: 0.45rem;
  pointer-events: none;
}

.aa-badge {
  --aa-fg: rgb(var(--aa-accent));
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 2.2rem;
  height: 2.2rem;
  border-radius: 0.6rem;
  color: var(--aa-fg);
  background: rgba(var(--aa-accent), 0.14);
  border: 1px solid rgba(var(--aa-accent), 0.45);
  box-shadow: 0 2px 8px rgba(var(--aa-accent), 0.18);
  backdrop-filter: blur(4px);
  transition: transform 0.2s ease;
}

.aa-badge:hover {
  transform: translateY(-1px);
}

.aa-badge-icon {
  display: block;
}

/* ---------- Legende (Übersichts-Slide) ---------- */
.aa-legend {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 0.9rem 1.4rem;
  margin-top: 1.5rem;
}

.aa-legend-item {
  display: flex;
  align-items: center;
  gap: 0.85rem;
  padding: 0.7rem 0.9rem;
  border-radius: 0.75rem;
  background: linear-gradient(
    135deg,
    rgba(var(--aa-accent), 0.14),
    rgba(var(--aa-accent), 0.04)
  );
  border: 1px solid rgba(var(--aa-accent), 0.3);
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.aa-legend-item:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 16px rgba(var(--aa-accent), 0.2);
}

.aa-legend-badge {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex: none;
  width: 2.9rem;
  height: 2.9rem;
  border-radius: 0.7rem;
  color: rgb(var(--aa-accent));
  background: rgba(var(--aa-accent), 0.16);
  border: 1px solid rgba(var(--aa-accent), 0.4);
}

.aa-legend-text {
  display: flex;
  flex-direction: column;
  gap: 0.15rem;
  min-width: 0;
}

.aa-legend-label {
  font-weight: 700;
  font-size: 1rem;
  line-height: 1.1;
  /* modusabhängig anheben → guter Kontrast in Light & Dark */
  color: color-mix(in srgb, rgb(var(--aa-accent)), var(--aa-legend-mix, #000) 40%);
}

.aa-legend-desc {
  font-size: 0.78rem;
  line-height: 1.25;
  opacity: 0.8;
}

/* Dark Mode: Label Richtung Weiß aufhellen statt abdunkeln. */
:global(.dark) .aa-legend-item,
:global(.dark .aa-legend-item) {
  --aa-legend-mix: #fff;
}
</style>
