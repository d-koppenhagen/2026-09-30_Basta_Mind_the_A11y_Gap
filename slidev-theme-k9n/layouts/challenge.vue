<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useNav } from '@slidev/client'

const props = defineProps({
  slug: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    default: '',
  },
  /**
   * Extra scale factor to fine-tune the iframe size.
   * 1 = counter Slidev's zoom exactly (1:1 with real viewport).
   * < 1 = iframe content appears smaller, > 1 = larger.
   */
  scale: {
    type: Number,
    default: 1.35,
  },
})

const { next, prev } = useNav()

const base = import.meta.env.DEV
  ? 'http://localhost:4200'
  : 'https://practica11y.dev'

const iframeUrl = computed(() => `${base}/challenges/${props.slug}`)

// Counter the Slidev slide scale so the iframe uses the real viewport
const iframeScale = ref(1)
const iframeWidth = ref('100%')
const iframeHeight = ref('100%')

function updateScale() {
  const slidevScale = parseFloat(
    getComputedStyle(document.documentElement).getPropertyValue('--slidev-slide-scale')
  ) || 1
  const combinedScale = props.scale / slidevScale
  iframeScale.value = combinedScale
  iframeWidth.value = `${100 / combinedScale}%`
  iframeHeight.value = `${100 / combinedScale}%`
}

onMounted(() => {
  updateScale()
  window.addEventListener('resize', updateScale)
})

onUnmounted(() => {
  window.removeEventListener('resize', updateScale)
})
</script>

<template>
  <div class="slidev-layout challenge-layout">
    <header v-if="title" class="challenge-header">
      <span class="challenge-header-icon">🎮</span>
      <h2 class="challenge-header-title">{{ title }}</h2>
    </header>

    <div class="challenge-iframe-wrapper">
      <iframe
        :src="iframeUrl"
        :title="title || `Challenge: ${slug}`"
        class="challenge-iframe"
        allow="clipboard-write"
        :style="{
          transform: `scale(${iframeScale})`,
          width: iframeWidth,
          height: iframeHeight,
        }"
      />

      <button
        class="nav-btn nav-btn-prev"
        aria-label="Vorherige Slide"
        @click="prev"
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="15 18 9 12 15 6"/></svg>
      </button>
      <button
        class="nav-btn nav-btn-next"
        aria-label="Nächste Slide"
        @click="next"
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"/></svg>
      </button>
    </div>
  </div>
</template>

<style scoped>
.challenge-layout {
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
  padding: 0;
  margin: 0;
  overflow: hidden;
}

.challenge-header {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  background: rgba(0, 0, 0, 0.03);
  border-bottom: 1px solid rgba(0, 0, 0, 0.08);
  flex-shrink: 0;
}

.dark .challenge-header {
  background: rgba(255, 255, 255, 0.03);
  border-bottom-color: rgba(255, 255, 255, 0.08);
}

.challenge-header-icon {
  font-size: 1.25rem;
}

.challenge-header-title {
  font-size: 1rem;
  font-weight: 600;
  margin: 0;
}

.challenge-iframe-wrapper {
  position: relative;
  flex: 1;
  min-height: 0;
}

.challenge-iframe {
  width: 100%;
  height: 100%;
  border: none;
  display: block;
  transform-origin: top left;
}

/* Navigation overlay buttons */
.nav-btn {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width: 3rem;
  height: 3rem;
  border-radius: 50%;
  border: none;
  background: rgba(0, 0, 0, 0.55);
  color: white;
  cursor: pointer;
  display: grid;
  place-items: center;
  opacity: 0.4;
  transition: opacity 0.2s ease, transform 0.2s ease;
  z-index: 10;
}

.nav-btn:hover {
  opacity: 1;
  transform: translateY(-50%) scale(1.1);
}

.nav-btn:active {
  transform: translateY(-50%) scale(0.95);
}

.nav-btn-prev {
  left: 0.75rem;
}

.nav-btn-next {
  right: 0.75rem;
}
</style>
