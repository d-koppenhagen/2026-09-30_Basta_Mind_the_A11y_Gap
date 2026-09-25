<template>
  <div class="future-feature" :class="[`status-${status}`]">
    <div class="ff-head">
      <span class="ff-flask" aria-hidden="true">{{ icon }}</span>
      <span class="ff-title">
        <slot name="title">{{ title }}</slot>
      </span>
      <span class="ff-badge">{{ statusLabel }}</span>
    </div>

    <div class="ff-body">
      <slot />
    </div>

    <a
      v-if="href"
      class="ff-link no-underline"
      :href="href"
      target="_blank"
      rel="noopener noreferrer"
    >
      <carbon-launch class="ff-link-icon" />
      <span>{{ linkLabel }}</span>
    </a>
  </div>
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps({
  // Kurztitel des Features, z. B. "contrast-color()"
  title: { type: String, default: '' },
  // Reifegrad: 'experimental' | 'progress' | 'baseline'
  status: {
    type: String,
    default: 'experimental',
    validator: (v) => ['experimental', 'progress', 'baseline'].includes(v),
  },
  // Freitext-Override fürs Badge (sonst automatisch aus status)
  badge: { type: String, default: '' },
  // Optionale Doku-URL (MDN, Chrome, Spec)
  href: { type: String, default: '' },
  // Sichtbarer Link-Text
  linkLabel: { type: String, default: 'Mehr erfahren' },
});

const statusLabel = computed(() => {
  if (props.badge) return props.badge;
  switch (props.status) {
    case 'baseline':
      return 'Baseline';
    case 'progress':
      return 'In Arbeit';
    default:
      return 'Experimentell';
  }
});

// Icon je Reifegrad: verfügbar (Baseline) vs. experimentell.
const icon = computed(() => (props.status === 'baseline' ? '✅' : '🧪'));
</script>

<style scoped>
.future-feature {
  --ff-accent: 139, 92, 246; /* violet-500, Default = experimentell */
  /* Mischfarbe für den Link: im Dark Mode Richtung Weiß (aufhellen),
     im Light Mode Richtung Schwarz (abdunkeln) → AA in beiden Modi.
     Default (ohne .dark) = Light-Mode-Fall. */
  --ff-link-mix: #000000;
  --ff-link-amount: 45%;
  margin-top: 1rem;
  padding: 0.85rem 1rem;
  border-radius: 0.75rem;
  border: 1px dashed rgba(var(--ff-accent), 0.55);
  background: linear-gradient(
    135deg,
    rgba(var(--ff-accent), 0.14),
    rgba(var(--ff-accent), 0.04)
  );
}

/* Dark Mode: Link Richtung Weiß aufhellen statt abdunkeln.
   Ganzer Selektor innerhalb :global(), sonst fällt der Descendant-Teil
   aus dem scoped-Scoping (dann greift die Regel nicht). */
:global(.dark) .future-feature,
:global(.dark .future-feature) {
  --ff-link-mix: #ffffff;
  --ff-link-amount: 25%;
}

.future-feature.status-progress {
  --ff-accent: 234, 179, 8; /* amber-500 */
}

.future-feature.status-baseline {
  --ff-accent: 16, 185, 129; /* emerald-500 */
  /* Baseline = stabil verfügbar → solider Rahmen statt gestrichelt. */
  border-style: solid;
}

.ff-head {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 0.4rem;
}

.ff-flask {
  font-size: 1.1rem;
  line-height: 1;
}

.ff-title {
  font-weight: 700;
  font-size: 0.95rem;
  /* Gleiche modusabhängige Anhebung wie der Link → AA in beiden Modi. */
  color: color-mix(in srgb, rgb(var(--ff-accent)), var(--ff-link-mix) var(--ff-link-amount));
}

.ff-badge {
  margin-left: auto;
  font-size: 0.6rem;
  font-weight: 600;
  letter-spacing: 0.02em;
  text-transform: uppercase;
  padding: 0.12rem 0.5rem;
  border-radius: 999px;
  background: rgba(var(--ff-accent), 0.2);
  color: rgb(var(--ff-accent));
  border: 1px solid rgba(var(--ff-accent), 0.4);
  white-space: nowrap;
}

.ff-body {
  font-size: 0.8rem;
  line-height: 1.45;
  opacity: 0.92;
}

/* Inline-Links im Body: gleiche barrierefreie Akzentfarbe wie .ff-link,
   kein rotes Theme-Styling, kein Rahmen. */
.ff-body :deep(a) {
  color: color-mix(in srgb, rgb(var(--ff-accent)), var(--ff-link-mix) var(--ff-link-amount)) !important;
  border: none !important;
  text-decoration: underline;
  text-underline-offset: 2px;
  text-decoration-thickness: 1px;
  font-weight: 600;
}

.ff-body :deep(a:hover),
.ff-body :deep(a:focus-visible) {
  color: color-mix(in srgb, rgb(var(--ff-accent)), var(--ff-link-mix) var(--ff-link-amount)) !important;
  border: none !important;
  text-decoration-thickness: 2px;
}

.ff-body :deep(a:focus-visible) {
  outline: 2px solid rgb(var(--ff-accent));
  outline-offset: 2px;
  border-radius: 3px;
}

.ff-body :deep(code) {
  font-size: 0.9em;
}

.ff-body :deep(p) {
  margin: 0;
}

.ff-body :deep(p + p) {
  margin-top: 0.4rem;
}

.ff-link {
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  margin-top: 0.55rem;
  font-size: 0.72rem;
  font-weight: 600;
  /* Akzentfarbe modusabhängig abgedunkelt/aufgehellt → AA in beiden Modi. */
  color: color-mix(in srgb, rgb(var(--ff-accent)), var(--ff-link-mix) var(--ff-link-amount));
  border: none !important;
  text-decoration: none;
  border-radius: 4px;
  transition: color 0.15s ease, background 0.15s ease;
}

/* Theme-Link-Hover (rotes DB-Accent + solider Rahmen) gezielt neutralisieren
   und durch einen dezenten, barrierefreien Hover ersetzen. */
.ff-link:hover,
.ff-link:focus-visible {
  color: color-mix(in srgb, rgb(var(--ff-accent)), var(--ff-link-mix) var(--ff-link-amount)) !important;
  background: rgba(var(--ff-accent), 0.12);
  border: none !important;
  text-decoration: underline;
  text-underline-offset: 2px;
  text-decoration-thickness: 1px;
  padding: 0 0.25rem;
  margin-left: -0.25rem;
}

.ff-link:focus-visible {
  outline: 2px solid rgb(var(--ff-accent));
  outline-offset: 2px;
}

.ff-link-icon {
  font-size: 0.85rem;
}
</style>
