<template>
  <div class="page-title-demo">
    <!-- ❌ Problem: alle Tabs gleich -->
    <div class="demo-col">
      <BrowserWindow
        url="https://my-app.de/products"
        :tabs="badTabs"
        :active-tab="activeTabIndex"
        body-height="300px"
      >
        <div class="page-content">
          <h1 class="page-headline">My Page</h1>
          <div class="code-block">
            <div class="code-comment">&lt;!-- Jede Seite --&gt;</div>
            <div class="code-line">&lt;title&gt;<span class="code-str">My App</span>&lt;/title&gt;</div>
          </div>
          <ul class="info-list bad-list">
            <li>Kein Kontext zur aktuellen Seite</li>
            <li>Tabs nicht unterscheidbar</li>
            <li>Screen Reader: immer gleicher Titel</li>
            <li>Schlechtes SEO</li>
          </ul>
        </div>
      </BrowserWindow>
    </div>

    <!-- ✅ Lösung: eindeutige Titel -->
    <div v-if="showSolution" class="demo-col">
      <BrowserWindow
        url="https://my-app.de/products"
        :tabs="goodTabs"
        :active-tab="activeTabIndex"
        body-height="300px"
      >
        <div class="page-content">
          <h1 class="page-headline">Products</h1>
          <div class="code-block">
            <div class="code-line"><span class="code-kw">document</span>.title = <span class="code-str">`${pageName} – My App`</span>;</div>
            <div class="code-comment">// "Products – My App", "Contact – My App"</div>
          </div>
          <ul class="info-list good-list">
            <li>Klarer Seitenkontext</li>
            <li>Unterscheidbare Browser-Tabs</li>
            <li>Screen Reader kündigt Seite an</li>
            <li>Besseres SEO</li>
          </ul>
        </div>
      </BrowserWindow>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { useSlideContext } from '@slidev/client';
import BrowserWindow from './BrowserWindow.vue';

const { $clicks } = useSlideContext();

const badTabs = ['My App', 'My App'];
const goodTabs = ['Home – My App', 'Products – My App'];

// Click 0: nur bad-Beispiel sichtbar
// Click 1: good-Beispiel dazu
const showSolution = computed(() => $clicks.value >= 1);

const activeTabIndex = 1;
</script>

<style scoped>
.page-title-demo {
  display: flex;
  gap: 32px;
  align-items: flex-start;
  justify-content: center;
}

h1.page-headline {
  font-size: 1.2rem;
  margin: 0;

  &::before {
    background: var(--k9n-heading-section);
  }
}

.demo-col {
  flex: 1;
  min-width: 0;
  max-width: 440px;
  animation: fade-in 0.3s ease;
}

.page-content {
  padding: 16px 18px;
  display: flex;
  flex-direction: column;
  gap: 14px;
  font-size: 1rem;
}

/* Code block */
.code-block {
  background: rgba(0, 0, 0, 0.3);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 6px;
  padding: 10px 14px;
  font-family: 'Fira Code', 'JetBrains Mono', monospace;
  line-height: 1.6;
  font-size: .85rem;
}

.code-line {
  color: #e2e8f0;
}

.code-comment {
  color: #64748b;
  font-style: italic;
}

.code-str {
  color: #a5d6ff;
}

.code-kw {
  color: #c084fc;
}

/* Info lists */
.info-list {
  margin: 0;
  padding-left: 18px;
  line-height: 1.7;
}

.bad-list {
  color: #fca5a5;
}

.bad-list li::marker {
  content: '✗ ';
  color: #ef4444;
}

.good-list {
  color: #86efac;
}

.good-list li::marker {
  content: '✓ ';
  color: #22c55e;
}

@keyframes fade-in {
  from { opacity: 0; transform: translateY(-4px); }
  to { opacity: 1; transform: translateY(0); }
}
</style>
