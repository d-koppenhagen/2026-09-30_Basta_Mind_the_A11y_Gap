<template>
  <div class="image-with-source" :class="wrapperClass">
    <img v-bind="imgAttrs" :src="src" :alt="alt" />
    <a
      v-if="source && isLink"
      class="image-source image-source-link"
      :href="source"
      target="_blank"
      rel="noopener noreferrer"
      :title="source"
    >
      {{ sourceLabel }}
    </a>
    <span v-else-if="source" class="image-source" :title="source">
      {{ sourceLabel }}
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
  // Optionale Klasse für den Wrapper (Positionierung/Layout).
  wrapperClass: { type: [String, Object, Array], default: '' },
});

const attrs = useAttrs();

const sourceLabel = computed(() => props.sourceLabel || props.source);

// Quelle als Link rendern, wenn sie wie eine URL aussieht.
const isLink = computed(() => /^(https?:\/\/|\/\/|mailto:|\/)/i.test(props.source));

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
  color: rgba(255, 255, 255, 0.85);
  /* Theme-Link-Styles (dashed border + underline) neutralisieren */
  border: none;
  text-decoration: none;
  cursor: pointer;
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
