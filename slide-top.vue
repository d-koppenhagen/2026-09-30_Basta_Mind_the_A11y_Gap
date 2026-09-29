<script setup>
import { computed } from 'vue';
import { useSlideContext } from '@slidev/client';

/**
 * Per-Slide-Layer: rendert oben rechts (neben dem DB-Logo) die
 * A11y-Zielgruppen-Badges. Gesteuert über das Frontmatter jeder Slide:
 *
 *   ---
 *   audience: [screenreader, keyboard]
 *   ---
 *
 * Ohne `audience` im Frontmatter wird nichts gerendert.
 * Die verfügbaren Keys sind in components/A11yAudience.vue definiert.
 */
const { $frontmatter } = useSlideContext();

const groups = computed(() => {
  const a = $frontmatter?.audience;
  if (Array.isArray(a)) return a;
  if (typeof a === 'string' && a.trim()) {
    // erlaubt auch "screenreader, keyboard" als String
    return a.split(',').map((s) => s.trim()).filter(Boolean);
  }
  return [];
});
</script>

<template>
  <A11yAudience v-if="groups.length" :groups="groups" />
</template>
