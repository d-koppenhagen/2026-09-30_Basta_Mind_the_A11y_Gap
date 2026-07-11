<template>
  <div class="spa-demo-wrapper">
    <!-- Left: Browser Demo -->
    <div class="spa-demo">
      <div class="browser-chrome">
        <div class="browser-bar">
          <div class="browser-dots">
            <span class="dot red"></span>
            <span class="dot yellow"></span>
            <span class="dot green"></span>
          </div>
          <div class="browser-url">{{ displayUrl }}</div>
        </div>

        <div class="spa-layout">
          <!-- Navigation -->
          <nav class="spa-nav">
            <span
              v-for="link in navLinks"
              :key="link.path"
              :class="['nav-link', { active: link.path === activeNav }]"
            >{{ link.label }}</span>
          </nav>

          <!-- Router View -->
          <main class="router-view" :class="{ 'main-focused': currentStep === 1 }">
            <!-- Focus outline around main -->
            <span v-if="currentStep === 1" class="focus-outline-main"></span>

            <Transition name="fade" mode="out-in">
              <!-- Home page -->
              <div v-if="currentStep < 3" key="home" class="route-content home-page">
                <h2>Home</h2>
                <div class="skeleton-line w-90"></div>
                <div class="skeleton-line w-70"></div>
                <div class="skeleton-line w-80"></div>
                <div class="skeleton-line w-50"></div>
                <div class="skeleton-line w-60"></div>
                <div class="cta-area">
                  <button class="cta-button" :class="{ 'btn-focused': currentStep === 2, clicking: currentStep === 2 }">
                    📧 Kontakt
                    <span v-if="currentStep === 2" class="focus-outline-btn"></span>
                    <span v-if="currentStep === 2" class="click-ripple"></span>
                  </button>
                </div>
              </div>

              <!-- Contact page with misplaced focus -->
              <div v-else key="contact" class="route-content contact-page">
                <h2>Contact</h2>
                <div class="form-group">
                  <label>Name</label>
                  <div class="fake-input">Max Mustermann</div>
                </div>
                <div class="form-group">
                  <label>E-Mail</label>
                  <div class="fake-input has-focus">
                    <span class="cursor-blink"></span>
                    <span class="focus-outline-field"></span>
                  </div>
                </div>
                <div class="form-group">
                  <label>Nachricht</label>
                  <div class="fake-textarea"></div>
                </div>
                <button class="submit-btn">Absenden</button>
              </div>
            </Transition>
          </main>
        </div>
      </div>
    </div>

    <!-- Right: Explanation -->
    <div class="explanation">
      <div v-if="currentStep === 0" class="explanation-step">
        <div class="step-badge">Ausgangslage</div>
        <p>Wir sind auf der <strong>Startseite</strong>.</p>
        <p>Nach der Navigation hat der Router den Focus auf den <code>&lt;main&gt;</code>-Bereich gesetzt.</p>
        <p class="hint">→ Weiter</p>
      </div>

      <div v-else-if="currentStep === 1" class="explanation-step">
        <div class="step-badge">Focus auf &lt;main&gt;</div>
        <p>Focus liegt auf dem <strong>&lt;main&gt;</strong>-Bereich (gesamter Router-View).</p>
        <p>Per <kbd>Tab</kbd> wird zum „Kontakt"-Button navigiert.</p>
        <p class="hint">→ Weiter</p>
      </div>

      <div v-else-if="currentStep === 2" class="explanation-step">
        <div class="step-badge">Focus auf Button</div>
        <p>Focus liegt auf <strong>„Kontakt"</strong>.</p>
        <p><kbd>Enter</kbd> wird gedrückt → SPA-Router navigiert zu <code>/contact</code>.</p>
        <p class="hint">→ Weiter</p>
      </div>

      <div v-else class="explanation-step warning">
        <div class="step-badge danger">⚠️ Problem</div>
        <p>Route wechselt auf <code>/contact</code> — aber der <strong>Focus landet im 2. Formularfeld</strong> (E-Mail).</p>
        <ul>
          <li>Nicht am Seitenanfang</li>
          <li>Nicht am Beginn von <code>&lt;main&gt;</code></li>
          <li>Screen Reader kündigt keinen Seitenwechsel an</li>
        </ul>
        <p class="takeaway">Unklar, wo man sich befindet!</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { useSlideContext } from '@slidev/client';

const { $clicks } = useSlideContext();

const navLinks = [
  { path: '/', label: 'Home' },
  { path: '/about', label: 'About' },
  { path: '/contact', label: 'Contact' },
];

// Step 0: Initial (Home page, no focus shown)
// Step 1: Focus outline around <main> (click >= 1)
// Step 2: Focus jumps to "Kontakt" button (click >= 2)
// Step 3: Route changes, focus lands in wrong field (click >= 3)
const currentStep = computed(() => {
  const c = $clicks.value;
  if (c >= 3) return 3;
  if (c >= 2) return 2;
  if (c >= 1) return 1;
  return 0;
});

const activeNav = computed(() => (currentStep.value < 3 ? '/' : '/contact'));

const displayUrl = computed(() => {
  if (currentStep.value < 3) return 'https://example.org/';
  return 'https://example.org/contact';
});
</script>

<style scoped>
.spa-demo-wrapper {
  display: flex;
  gap: 24px;
  align-items: flex-start;
  max-width: 100%;
}

.spa-demo {
  font-family: system-ui, -apple-system, sans-serif;
  font-size: 0.82rem;
  flex: 1.3;
  min-width: 0;
}

/* Browser Chrome */
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
}

.dot {
  width: 9px;
  height: 9px;
  border-radius: 50%;
}
.dot.red { background: #ff5f57; }
.dot.yellow { background: #febc2e; }
.dot.green { background: #28c840; }

.browser-url {
  background: #1a1a1a;
  padding: 4px 12px;
  border-radius: 4px;
  color: #aaa;
  font-size: 0.7rem;
  flex: 1;
  font-family: monospace;
}

/* SPA Layout */
.spa-layout {
  background: #1e1e2e;
  height: 320px;
  display: flex;
  flex-direction: column;
}

.spa-nav {
  display: flex;
  background: #16213e;
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
}

.nav-link {
  padding: 7px 14px;
  color: #94a3b8;
  font-size: 0.75rem;
  cursor: default;
  border-bottom: 2px solid transparent;
  transition: all 0.2s;
}

.nav-link.active {
  color: #e2e8f0;
  border-bottom-color: #3b82f6;
  background: rgba(59, 130, 246, 0.08);
}

/* Router View / Main */
.router-view {
  position: relative;
  padding: 14px 18px;
  flex: 1;
}

.router-view.main-focused {
  /* subtle background to indicate focus area */
}

/* Focus outline around entire main */
.focus-outline-main {
  position: absolute;
  inset: 4px;
  border: 2px dashed #f59e0b;
  border-radius: 6px;
  animation: pulse-outline 1.5s ease-in-out infinite;
  pointer-events: none;
  z-index: 10;
}

/* Home Page */
.home-page {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.home-page h2 {
  margin: 0 0 6px;
  font-size: 1rem;
  color: #e2e8f0;
}

.skeleton-line {
  height: 10px;
  border-radius: 5px;
  background: linear-gradient(90deg, rgba(255,255,255,0.06) 25%, rgba(255,255,255,0.12) 50%, rgba(255,255,255,0.06) 75%);
  background-size: 200% 100%;
  animation: shimmer 1.8s infinite;
}

.w-90 { width: 90%; }
.w-80 { width: 80%; }
.w-70 { width: 70%; }
.w-60 { width: 60%; }
.w-50 { width: 50%; }

@keyframes shimmer {
  0% { background-position: 200% 0; }
  100% { background-position: -200% 0; }
}

.cta-area {
  display: flex;
  justify-content: center;
  margin-top: 16px;
}

.cta-button {
  position: relative;
  padding: 8px 20px;
  background: #3b82f6;
  color: #fff;
  border: none;
  border-radius: 6px;
  font-size: 0.8rem;
  font-weight: 600;
  cursor: pointer;
  overflow: visible;
  transition: transform 0.1s;
}

.cta-button.clicking {
  transform: scale(0.95);
  background: #2563eb;
}

/* Focus outline around button */
.focus-outline-btn {
  position: absolute;
  inset: -4px;
  border: 2px dashed #f59e0b;
  border-radius: 10px;
  animation: pulse-outline 1.5s ease-in-out infinite;
  pointer-events: none;
}

.click-ripple {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 0;
  height: 0;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.3);
  transform: translate(-50%, -50%);
  animation: ripple 0.8s ease-out forwards;
  pointer-events: none;
}

@keyframes ripple {
  to {
    width: 140px;
    height: 140px;
    opacity: 0;
  }
}

/* Contact Page */
.contact-page h2 {
  margin: 0 0 10px;
  font-size: 1rem;
  color: #e2e8f0;
}

.form-group {
  margin-bottom: 8px;
}

.form-group label {
  display: block;
  font-size: 0.68rem;
  color: #94a3b8;
  margin-bottom: 2px;
}

.fake-input {
  position: relative;
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid rgba(255, 255, 255, 0.12);
  border-radius: 4px;
  padding: 5px 9px;
  color: #64748b;
  font-size: 0.74rem;
  height: 26px;
  display: flex;
  align-items: center;
}

.fake-input.has-focus {
  border-color: #3b82f6;
  box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.3);
}

.cursor-blink {
  width: 1px;
  height: 13px;
  background: #e2e8f0;
  animation: blink 1s step-end infinite;
}

@keyframes blink {
  0%, 100% { opacity: 1; }
  50% { opacity: 0; }
}

/* Focus outline around the email field */
.focus-outline-field {
  position: absolute;
  inset: -4px;
  border: 2px dashed #f59e0b;
  border-radius: 6px;
  animation: pulse-outline 1.5s ease-in-out infinite;
  pointer-events: none;
}

@keyframes pulse-outline {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.4; }
}

.fake-textarea {
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid rgba(255, 255, 255, 0.12);
  border-radius: 4px;
  height: 40px;
}

.submit-btn {
  margin-top: 8px;
  padding: 5px 14px;
  background: #3b82f6;
  color: #fff;
  border: none;
  border-radius: 4px;
  font-size: 0.74rem;
  cursor: default;
  opacity: 0.7;
}

/* Transition */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

/* Right-side explanation */
.explanation {
  flex: 0.7;
  min-width: 0;
}

.explanation-step {
  padding: 14px 16px;
  border-radius: 8px;
  background: rgba(59, 130, 246, 0.08);
  border: 1px solid rgba(59, 130, 246, 0.2);
  animation: fade-in 0.3s ease;
}

.explanation-step.warning {
  background: rgba(239, 68, 68, 0.08);
  border-color: rgba(239, 68, 68, 0.25);
}

.explanation-step p {
  margin: 6px 0;
  font-size: 0.78rem;
  color: #1e293b;
  line-height: 1.5;
}

.explanation-step ul {
  margin: 6px 0;
  padding-left: 16px;
  font-size: 0.75rem;
  color: #334155;
  line-height: 1.6;
}

.explanation-step code {
  background: rgba(100, 116, 139, 0.12);
  padding: 1px 5px;
  border-radius: 3px;
  font-size: 0.7rem;
  color: #1e293b;
}

.explanation-step kbd {
  background: rgba(100, 116, 139, 0.12);
  border: 1px solid rgba(100, 116, 139, 0.25);
  padding: 1px 5px;
  border-radius: 3px;
  font-size: 0.68rem;
  font-family: system-ui;
  color: #1e293b;
}

.step-badge {
  display: inline-block;
  font-size: 0.68rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.04em;
  padding: 2px 8px;
  border-radius: 4px;
  background: rgba(59, 130, 246, 0.15);
  color: #1d4ed8;
  margin-bottom: 8px;
}

.step-badge.danger {
  background: rgba(239, 68, 68, 0.15);
  color: #b91c1c;
}

.hint {
  opacity: 0.6;
  font-style: italic;
  font-size: 0.72rem !important;
}

.takeaway {
  font-weight: 600;
  color: #b91c1c !important;
  margin-top: 10px !important;
}

/* Dark mode overrides */
:global(.dark) .explanation-step p {
  color: #cbd5e1;
}

:global(.dark) .explanation-step ul {
  color: #94a3b8;
}

:global(.dark) .explanation-step code {
  background: rgba(255, 255, 255, 0.08);
  color: #e2e8f0;
}

:global(.dark) .explanation-step kbd {
  background: rgba(255, 255, 255, 0.08);
  border-color: rgba(255, 255, 255, 0.15);
  color: #e2e8f0;
}

:global(.dark) .step-badge {
  color: #93c5fd;
}

:global(.dark) .step-badge.danger {
  color: #fca5a5;
}

:global(.dark) .takeaway {
  color: #fca5a5 !important;
}

@keyframes fade-in {
  from { opacity: 0; transform: translateY(-4px); }
  to { opacity: 1; transform: translateY(0); }
}
</style>
