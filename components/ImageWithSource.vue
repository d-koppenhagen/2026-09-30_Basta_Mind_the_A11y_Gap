<template>
  <div class="image-with-source" :class="wrapperClass">
    <img v-bind="imgAttrs" :src="src" :alt="alt" />
    <a
      v-if="resolvedHref"
      class="image-source image-source-link"
      :href="resolvedHref"
      target="_blank"
      rel="noopener noreferrer"
      :title="resolvedTitle"
    >
      <span v-if="resolvedLabel">{{ resolvedLabel }}</span>
      <span v-if="showUrl" class="image-source-url">{{ displayUrl }}</span>
    </a>
    <span v-else-if="resolvedLabel" class="image-source" :title="resolvedTitle">
      {{ resolvedLabel }}
    </span>
  </div>
</template>

<script setup>
import { computed, useAttrs } from 'vue';

defineOptions({ inheritAttrs: false });

const props = defineProps({
  src: { type: String, required: true },
  alt: { type: String, default: '' },
  // Sichtbare Quellenangabe (Text oder URL). Wenn gesetzt, erscheint das Overlay.
  source: { type: String, default: '' },
  // Optionales Label; fällt auf `source` zurück.
  sourceLabel: { type: String, default: '' },
  // Optionale Ziel-URL. Wenn gesetzt, wird das Overlay zu einem Link
  // (öffnet in neuem Tab). Ist `sourceHref` leer, aber `source` selbst eine
  // URL, wird `source` als Ziel verwendet.
  sourceHref: { type: String, default: '' },
  // Ziel-URL zusätzlich zum Label sichtbar anzeigen (Default: true).
  showUrl: { type: Boolean, default: true },
  // Optionale Klasse für den Wrapper (Positionierung/Layout).
  wrapperClass: { type: [String, Object, Array], default: '' },
});

const attrs = useAttrs();

const isUrl = (value) => /^(https?:\/\/|\/\/|mailto:|\/)/i.test(value);

// Sichtbares Label (Text). Fällt von sourceLabel auf source zurück.
const resolvedLabel = computed(() => props.sourceLabel || props.source);

// Ziel-Link: bevorzugt sourceHref, sonst source (falls es eine URL ist).
const resolvedHref = computed(() => {
  if (props.sourceHref) return props.sourceHref;
  if (props.source && isUrl(props.source)) return props.source;
  return '';
});

// URL inklusive Schema anzeigen, nur ein evtl. trailing slash entfernen.
const displayUrl = computed(() => resolvedHref.value.replace(/\/$/, ''));

// URL nur zusätzlich zeigen, wenn sie sich vom Label unterscheidet.
const showUrl = computed(
  () => props.showUrl && !!resolvedHref.value && displayUrl.value !== resolvedLabel.value,
);

// Tooltip: die Ziel-URL, sonst das Label.
const resolvedTitle = computed(() => resolvedHref.value || resolvedLabel.value);

// Alle übrigen Attribute (class, title, aria-*, ...) auf das <img> durchreichen.
const imgAttrs = computed(() => attrs);
</script>

<style scoped>
.image-with-source {
  position: relative;
  display: inline-block;
  line-height: 0;
}

.image-with-source :deep(img) {
  display: block;
}

.image-source {
  position: absolute;
  right: 0;
  top: 100%;
  max-width: 100%;
  padding: 1px 5px;
  background: rgba(90, 90, 90, 0.7);
  color: rgba(255, 255, 255, 0.85);
  font-size: 0.42rem;
  line-height: 1.3;
  font-family: system-ui, -apple-system, sans-serif;
  border-bottom-left-radius: 3px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  pointer-events: none;
}

/* Klickbare Variante */
.image-with-source a.image-source-link {
  pointer-events: auto;
  display: inline-flex;
  align-items: baseline;
  gap: 4px;
  color: rgba(255, 255, 255, 0.85);
  /* Theme-Link-Styles (dashed border + underline) neutralisieren */
  border: none;
  text-decoration: none;
  cursor: pointer;
}

/* Zusätzliche URL neben dem Label, dezent abgesetzt */
.image-with-source a.image-source-link .image-source-url {
  color: rgba(255, 255, 255, 0.6);
}

.image-with-source a.image-source-link .image-source-url::before {
  content: '·';
  margin-right: 4px;
  color: rgba(255, 255, 255, 0.45);
}

.image-with-source a.image-source-link:hover,
.image-with-source a.image-source-link:active,
.image-with-source a.image-source-link:focus-visible {
  border: none;
  text-decoration: underline;
  text-underline-offset: 2px;
  color: #fff;
}

.image-with-source a.image-source-link:focus-visible {
  outline: 2px solid #fff;
  outline-offset: 1px;
}
</style>
