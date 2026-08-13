<template>
  <div class="aria-ecosystem">
    <!-- Top: Three-layer model -->
    <div class="layers-row">
      <div class="layer-box layer-code" :class="{ active: step >= 0 }">
        <div class="layer-icon">📄</div>
        <div class="layer-label">DOM + Semantik</div>
        <div class="layer-sub">Was wir schreiben</div>
      </div>
      <div class="layer-arrow" :class="{ active: step >= 1 }">→</div>
      <div class="layer-box layer-tree" :class="{ active: step >= 1 }">
        <div class="layer-icon">🌳</div>
        <div class="layer-label">Accessibility Tree</div>
        <div class="layer-sub">Gemeinsame Schnittstelle</div>
      </div>
      <div class="layer-arrow" :class="{ active: step >= 3 }">→</div>
      <div class="layer-box layer-output" :class="{ active: step >= 3 }">
        <div class="layer-icon">🖥️ 🗣️ ⠿ 🎙️</div>
        <div class="layer-label">Präsentation</div>
        <div class="layer-sub">Was Nutzende erleben</div>
      </div>
    </div>

    <!-- Middle: Standards pipeline (smaller) -->
    <div class="standards-row" :class="{ visible: step >= 1 }">
      <div class="std-pill" :class="{ active: step >= 0 }">WAI-ARIA</div>
      <span class="std-arrow">→</span>
      <div class="std-pill" :class="{ active: step >= 1 }">ARIA in HTML</div>
      <span class="std-arrow">→</span>
      <div class="std-pill" :class="{ active: step >= 2 }">Core-AAM</div>
      <span class="std-arrow">→</span>
      <div class="std-pill" :class="{ active: step >= 2 }">Plattform-APIs</div>
    </div>

    <!-- Bottom: Live transformation -->
    <div class="transform-area">
      <!-- Left: Source code (DOM) -->
      <div class="panel source-panel">
        <div class="panel-header">
          <span class="panel-icon">📄</span> DOM
        </div>
        <div class="code-content">
          <pre><code><span class="tag">&lt;button</span> <span v-if="step >= 1" class="aria-attr">role="button"<span class="implicit-badge">implizit</span></span><span v-if="step >= 1" class="aria-attr">aria-pressed="false"</span><span class="tag">&gt;</span>
  Speichern
<span class="tag">&lt;/button&gt;</span></code></pre>
        </div>
      </div>

      <!-- Center: Transformation arrow with label -->
      <div class="transform-center">
        <Transition name="fade" mode="out-in">
          <div v-if="step === 0" key="s0" class="transform-label">
            <span class="transform-icon">🌐</span>
            <span>Browser parst HTML</span>
          </div>
          <div v-else-if="step === 1" key="s1" class="transform-label">
            <span class="transform-icon">🏷️</span>
            <span>Implizite Rollen<br>werden zugewiesen</span>
          </div>
          <div v-else-if="step === 2" key="s2" class="transform-label">
            <span class="transform-icon">🔀</span>
            <span>Core-AAM mappt auf<br>Plattform-APIs</span>
          </div>
          <div v-else-if="step === 3" key="s3" class="transform-label">
            <span class="transform-icon">🖥️</span>
            <span>Browser rendert<br>visuell</span>
          </div>
          <div v-else key="s4" class="transform-label at-label">
            <span class="transform-icon">🔊</span>
            <span>AT präsentiert<br>nicht-visuell</span>
          </div>
        </Transition>
        <div class="transform-arrow">⟹</div>
      </div>

      <!-- Right: Output -->
      <div class="panel output-panel">
        <Transition name="fade" mode="out-in">
          <!-- Step 0-1: A11y Tree -->
          <div v-if="step <= 1" key="tree" class="panel-inner">
            <div class="panel-header">
              <span class="panel-icon">🌳</span> Accessibility Tree
            </div>
            <div class="tree-content" :class="{ dimmed: step === 0 }">
              <div class="tree-node root">
                <span class="node-role">button</span>
                <span class="node-name">"Speichern"</span>
              </div>
              <div class="tree-props">
                <div class="tree-prop"><span class="prop-key">role:</span> button</div>
                <div class="tree-prop"><span class="prop-key">name:</span> "Speichern"</div>
                <div class="tree-prop"><span class="prop-key">pressed:</span> false</div>
                <div class="tree-prop"><span class="prop-key">focusable:</span> true</div>
              </div>
            </div>
          </div>

          <!-- Step 2: Platform API mapping -->
          <div v-else-if="step === 2" key="platform" class="panel-inner">
            <div class="panel-header">
              <span class="panel-icon">💻</span> Plattform-APIs
            </div>
            <div class="platform-content">
              <div class="platform-row">
                <span class="platform-os">Windows</span>
                <span class="platform-api">UIA: Button control</span>
              </div>
              <div class="platform-row">
                <span class="platform-os">macOS</span>
                <span class="platform-api">AXButton, AXPress</span>
              </div>
              <div class="platform-row">
                <span class="platform-os">Linux</span>
                <span class="platform-api">ATK: ROLE_PUSH_BUTTON</span>
              </div>
              <div class="platform-row">
                <span class="platform-os">Android</span>
                <span class="platform-api">AccessibilityNodeInfo</span>
              </div>
            </div>
          </div>

          <!-- Step 3: Browser visual + AT -->
          <div v-else-if="step === 3" key="browser" class="panel-inner">
            <div class="panel-header">
              <span class="panel-icon">🖥️</span> Präsentation: Browser
            </div>
            <div class="browser-content">
              <div class="browser-preview">
                <button class="fake-button">Speichern</button>
              </div>
              <div class="browser-note">
                Der Browser nutzt den DOM für die <strong>visuelle</strong> Darstellung.
                AT nutzen den A11y Tree für die <strong>nicht-visuelle</strong> Darstellung.
              </div>
            </div>
          </div>

          <!-- Step 4: All AT outputs -->
          <div v-else key="at" class="panel-inner">
            <div class="panel-header">
              <span class="panel-icon">🔊</span> Präsentation: Assistive Technologies
            </div>
            <div class="sr-content">
              <div class="sr-output">
                <div class="sr-bubble">
                  <span class="sr-text">"Speichern, Schalter, nicht gedrückt"</span>
                </div>
              </div>
              <div class="sr-actions">
                <div class="sr-action"><span class="at-type">Screen Reader</span> → Vorlesen + Navigation</div>
                <div class="sr-action"><span class="at-type">Braillezeile</span> → Taktile Ausgabe</div>
                <div class="sr-action"><span class="at-type">Sprachsteuerung</span> → "Klick Speichern"</div>
                <div class="sr-action"><span class="at-type">Switch / Eye-Tracking</span> → Fokus-Navigation</div>
              </div>
            </div>
          </div>
        </Transition>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { useSlideContext } from '@slidev/client';

const { $clicks } = useSlideContext();

const step = computed(() => Math.min($clicks.value, 4));
</script>

<style scoped>
.aria-ecosystem {
  display: flex;
  flex-direction: column;
  gap: 12px;
  font-family: system-ui, -apple-system, sans-serif;
}

/* ========== Top: Three-layer model ========== */
.layers-row {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
}

.layer-box {
  padding: 10px 18px;
  border-radius: 10px;
  text-align: center;
  opacity: 0.3;
  transform: scale(0.93);
  transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
  border: 2px solid transparent;
  min-width: 160px;
}

.layer-box.active {
  opacity: 1;
  transform: scale(1);
}

.layer-code {
  background: rgba(59, 130, 246, 0.1);
  border-color: rgba(59, 130, 246, 0.25);
}
.layer-code.active {
  border-color: rgba(59, 130, 246, 0.5);
  box-shadow: 0 0 16px rgba(59, 130, 246, 0.12);
}

.layer-tree {
  background: rgba(168, 85, 247, 0.1);
  border-color: rgba(168, 85, 247, 0.25);
}
.layer-tree.active {
  border-color: rgba(168, 85, 247, 0.5);
  box-shadow: 0 0 16px rgba(168, 85, 247, 0.12);
}

.layer-output {
  background: rgba(249, 115, 22, 0.1);
  border-color: rgba(249, 115, 22, 0.25);
}
.layer-output.active {
  border-color: rgba(249, 115, 22, 0.5);
  box-shadow: 0 0 16px rgba(249, 115, 22, 0.12);
}

.layer-icon {
  font-size: 1.3rem;
  margin-bottom: 2px;
}

.layer-label {
  font-weight: 700;
  font-size: 0.78rem;
  color: var(--k9n-text-primary);
}

.layer-sub {
  font-size: 0.6rem;
  color: var(--k9n-text-muted);
  margin-top: 2px;
}

.layer-arrow {
  font-size: 1.4rem;
  opacity: 0.15;
  transition: all 0.4s ease;
  color: var(--k9n-text-muted);
}

.layer-arrow.active {
  opacity: 0.7;
}

/* ========== Middle: Standards pipeline ========== */
.standards-row {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  opacity: 0;
  transition: opacity 0.4s ease;
}

.standards-row.visible {
  opacity: 1;
}

.std-pill {
  font-size: 0.58rem;
  padding: 3px 8px;
  border-radius: 4px;
  background: var(--k9n-accent-subtle, rgba(255,255,255,0.05));
  border: 1px solid var(--k9n-border, rgba(255,255,255,0.1));
  color: var(--k9n-text-muted);
  opacity: 0.4;
  transition: all 0.3s ease;
}

.std-pill.active {
  opacity: 1;
  color: var(--k9n-text-secondary);
}

.std-arrow {
  font-size: 0.7rem;
  color: var(--k9n-text-muted);
  opacity: 0.4;
}

/* ========== Bottom: Transformation area ========== */
.transform-area {
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  gap: 12px;
  align-items: stretch;
}

.panel {
  border-radius: 8px;
  overflow: hidden;
  border: 1px solid var(--k9n-border);
  background: var(--k9n-code-bg);
}

.panel-inner {
  height: 100%;
  display: flex;
  flex-direction: column;
}

.panel-header {
  padding: 6px 12px;
  background: var(--k9n-surface-elevated);
  border-bottom: 1px solid var(--k9n-border);
  font-size: 0.72rem;
  font-weight: 600;
  color: var(--k9n-text-primary);
  display: flex;
  align-items: center;
  gap: 6px;
}

.panel-icon {
  font-size: 0.8rem;
}

/* Source panel (DOM) */
.source-panel .panel-header {
  background: rgba(59, 130, 246, 0.08);
}

.code-content {
  padding: 10px 14px;
  font-family: 'Fira Code', 'JetBrains Mono', monospace;
  font-size: 0.68rem;
  line-height: 1.6;
  flex: 1;
}

.code-content pre {
  margin: 0;
}

.code-content code {
  color: var(--k9n-text-primary);
}

.tag { color: #2563eb; }
:global(.dark) .tag { color: #7dd3fc; }

.aria-attr {
  display: inline;
  color: #047857;
  animation: highlight-in 0.4s ease;
  position: relative;
  margin: 0 2px;
}
:global(.dark) .aria-attr { color: #86efac; }

.implicit-badge {
  font-size: 0.5rem;
  background: rgba(16, 185, 129, 0.2);
  color: #047857;
  padding: 0 4px;
  border-radius: 2px;
  margin-left: 4px;
  vertical-align: middle;
}
:global(.dark) .implicit-badge { color: #6ee7b7; }

@keyframes highlight-in {
  from { opacity: 0; background: rgba(16, 185, 129, 0.2); }
  to { opacity: 1; background: transparent; }
}

/* Transform center */
.transform-center {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 8px;
  min-width: 110px;
}

.transform-label {
  text-align: center;
  font-size: 0.65rem;
  color: var(--k9n-text-secondary);
  line-height: 1.4;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
}

.transform-label.at-label { color: #c2410c; }
:global(.dark) .transform-label.at-label { color: #fdba74; }

.transform-icon {
  font-size: 1.2rem;
}

.transform-arrow {
  font-size: 1.5rem;
  color: var(--k9n-text-muted);
  opacity: 0.5;
}

/* Output panel */
.output-panel {
  min-height: 170px;
}

/* A11y Tree content */
.tree-content {
  padding: 10px 14px;
  transition: opacity 0.3s;
}

.tree-content.dimmed {
  opacity: 0.3;
}

.tree-node {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 8px;
  padding: 6px 10px;
  background: rgba(168, 85, 247, 0.1);
  border: 1px solid rgba(168, 85, 247, 0.25);
  border-radius: 6px;
}

.node-role {
  font-size: 0.7rem;
  font-weight: 700;
  color: #7c3aed;
  font-family: monospace;
}
:global(.dark) .node-role { color: #c084fc; }

.node-name {
  font-size: 0.68rem;
  color: #1d4ed8;
}
:global(.dark) .node-name { color: #a5d6ff; }

.tree-props {
  padding-left: 16px;
  border-left: 2px solid rgba(168, 85, 247, 0.2);
  display: flex;
  flex-direction: column;
  gap: 3px;
}

.tree-prop {
  font-size: 0.62rem;
  color: var(--k9n-text-secondary);
  font-family: monospace;
}

.prop-key {
  color: #b45309;
  font-weight: 600;
}
:global(.dark) .prop-key { color: #fbbf24; }

/* Platform API content */
.platform-content {
  padding: 10px 14px;
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.platform-row {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 5px 8px;
  border-radius: 4px;
  background: rgba(6, 182, 212, 0.06);
  border: 1px solid rgba(6, 182, 212, 0.15);
}

.platform-os {
  font-size: 0.62rem;
  font-weight: 700;
  color: #0e7490;
  min-width: 55px;
}
:global(.dark) .platform-os { color: #67e8f9; }

.platform-api {
  font-size: 0.6rem;
  font-family: monospace;
  color: var(--k9n-text-secondary);
}

/* Browser preview */
.browser-content {
  padding: 12px 14px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  align-items: center;
}

.browser-preview {
  padding: 12px 20px;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid var(--k9n-border);
  border-radius: 6px;
}

.fake-button {
  padding: 6px 16px;
  border-radius: 4px;
  background: #3b82f6;
  color: white;
  font-size: 0.75rem;
  font-weight: 600;
  border: none;
  cursor: pointer;
}

.browser-note {
  font-size: 0.62rem;
  color: var(--k9n-text-muted);
  text-align: center;
  line-height: 1.5;
}

/* Screen Reader output */
.sr-content {
  padding: 10px 14px;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.sr-output {
  display: flex;
  justify-content: center;
}

.sr-bubble {
  background: rgba(249, 115, 22, 0.1);
  border: 1px solid rgba(249, 115, 22, 0.3);
  border-radius: 8px;
  padding: 8px 14px;
  position: relative;
}

.sr-bubble::before {
  content: '';
  position: absolute;
  left: -6px;
  top: 50%;
  transform: translateY(-50%);
  border: 5px solid transparent;
  border-right-color: rgba(249, 115, 22, 0.3);
}

.sr-text {
  font-size: 0.72rem;
  font-weight: 600;
  color: #c2410c;
  font-style: italic;
}
:global(.dark) .sr-text { color: #fdba74; }

.sr-actions {
  display: flex;
  flex-direction: column;
  gap: 3px;
}

.sr-action {
  font-size: 0.6rem;
  color: var(--k9n-text-secondary);
}

.at-type {
  font-weight: 600;
  color: #c2410c;
  font-size: 0.58rem;
}
:global(.dark) .at-type { color: #fdba74; }

/* Transitions */
.fade-enter-active {
  transition: all 0.35s cubic-bezier(0.16, 1, 0.3, 1);
}
.fade-leave-active {
  transition: all 0.2s ease-in;
}
.fade-enter-from {
  opacity: 0;
  transform: translateY(6px);
}
.fade-leave-to {
  opacity: 0;
  transform: translateY(-4px);
}
</style>
