<template>
  <div class="browser-window">
    <div class="browser-chrome">
      <div class="browser-bar">
        <div class="browser-dots">
          <span class="dot red"></span>
          <span class="dot yellow"></span>
          <span class="dot green"></span>
        </div>

        <!-- Tabs (optional) -->
        <div v-if="tabs.length" class="browser-tabs">
          <span
            v-for="(tab, i) in tabs"
            :key="i"
            :class="['browser-tab', { active: i === activeTab }]"
          >
            <span class="tab-label">{{ tab }}</span>
          </span>
        </div>

        <div class="browser-url" :class="urlClass">
          <slot name="url">{{ url }}</slot>
        </div>
      </div>

      <div class="browser-body" :style="{ height: bodyHeight }">
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  url: { type: String, default: 'https://example.org/' },
  urlClass: { type: [String, Object, Array], default: '' },
  tabs: { type: Array, default: () => [] },
  activeTab: { type: Number, default: 0 },
  bodyHeight: { type: String, default: '330px' },
});
</script>

<style scoped>
.browser-window {
  font-family: system-ui, -apple-system, sans-serif;
  font-size: 0.82rem;
}

.browser-chrome {
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 4px 24px rgba(0, 0, 0, 0.3);
  border: 1px solid rgba(255, 255, 255, 0.08);
}

.browser-bar {
  background: #2d2d2d;
  padding: 7px 12px;
  display: flex;
  align-items: center;
  gap: 12px;
}

.browser-dots {
  display: flex;
  gap: 5px;
  flex-shrink: 0;
}

.dot {
  width: 9px;
  height: 9px;
  border-radius: 50%;
}
.dot.red { background: #ff5f57; }
.dot.yellow { background: #febc2e; }
.dot.green { background: #28c840; }

/* Tabs */
.browser-tabs {
  display: flex;
  gap: 2px;
  flex: 1;
  min-width: 0;
  overflow: hidden;
}

.browser-tab {
  display: flex;
  align-items: center;
  padding: 4px 12px;
  background: #1a1a1a;
  border-radius: 4px 4px 0 0;
  color: #777;
  font-size: 0.68rem;
  max-width: 150px;
  min-width: 0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  transition: all 0.2s;
}

.browser-tab.active {
  background: #3a3a3a;
  color: #e2e8f0;
}

.tab-label {
  overflow: hidden;
  text-overflow: ellipsis;
}

/* URL bar */
.browser-url {
  background: #1a1a1a;
  padding: 4px 12px;
  border-radius: 4px;
  color: #aaa;
  font-size: 0.7rem;
  flex: 1;
  font-family: monospace;
  position: relative;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 8px;
}

/* When tabs are shown, URL bar shrinks */
.browser-tabs ~ .browser-url {
  flex: 0 1 auto;
  min-width: 180px;
}

.browser-body {
  background: #1e1e2e;
  overflow: hidden;
}
</style>
