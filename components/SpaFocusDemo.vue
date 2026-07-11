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
          <div class="browser-url" :class="{ 'url-highlight': currentStep === 4 }">
            {{ displayUrl }}
            <span v-if="currentStep === 4" class="history-badge">↻ history.pushState()</span>
          </div>
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
          <main class="router-view" :class="{ 'main-focused': currentStep === 2, 'router-swapping': currentStep === 0 || currentStep === 4 }">
            <!-- Router swap indicator (step 0: initial load) -->
            <span v-if="currentStep === 0" class="router-swap-border"></span>
            <span v-if="currentStep === 0" class="router-swap-label">⟳ Router-View: /home</span>

            <!-- Focus outline around main (step 2) -->
            <span v-if="currentStep === 2" class="focus-outline-main"></span>

            <!-- Router swap indicator (step 4: contact load) -->
            <span v-if="currentStep === 4" class="router-swap-border"></span>
            <span v-if="currentStep === 4" class="router-swap-label">⟳ Router-View: /contact</span>

            <Transition name="fade" mode="out-in">
              <!-- Router swap animation (step 0: initial home load) -->
              <div v-if="currentStep === 0" key="swapping-home" class="route-content swap-view">
                <div class="swap-skeleton">
                  <div class="skeleton-line-dim w-70"></div>
                  <div class="skeleton-line-dim w-50"></div>
                  <div class="skeleton-line-dim w-60"></div>
                  <div class="skeleton-line-dim w-40"></div>
                </div>
              </div>

              <!-- Home page (steps 1–3) -->
              <div v-else-if="currentStep <= 3" key="home" class="route-content home-page">
                <h2>Home</h2>
                <div class="skeleton-line w-90"></div>
                <div class="skeleton-line w-70"></div>
                <div class="skeleton-line w-80"></div>
                <div class="skeleton-line w-50"></div>
                <div class="skeleton-line w-60"></div>
                <div class="cta-area">
                  <button class="cta-button" :class="{ clicking: currentStep === 3 }">
                    📧 Kontakt
                    <span v-if="currentStep === 3" class="focus-outline-btn"></span>
                    <span v-if="currentStep === 3" class="click-ripple"></span>
                  </button>
                </div>
              </div>

              <!-- Router swap animation (step 4) -->
              <div v-else-if="currentStep === 4" key="swapping" class="route-content swap-view">
                <div class="swap-skeleton">
                  <div class="skeleton-line-dim w-70"></div>
                  <div class="skeleton-line-dim w-50"></div>
                  <div class="skeleton-line-dim w-60"></div>
                  <div class="skeleton-line-dim w-40"></div>
                </div>
              </div>

              <!-- Contact page with misplaced focus (step 5) -->
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
      <div v-if="currentStep === 0" class="explanation-step swap-step">
        <div class="step-badge swap-badge">⟳ SPA-Router</div>
        <p>Der SPA-Router lädt den <strong>Home-View</strong> in den Router-Outlet.</p>
        <p>Nur der <code>&lt;main&gt;</code>-Bereich wird befüllt — der Rest der Seite steht bereits.</p>
      </div>

      <div v-else-if="currentStep === 1" class="explanation-step">
        <div class="step-badge">Startseite geladen</div>
        <p>Home-View ist geladen.</p>
        <p>Der Router hat den Focus auf <code>&lt;main&gt;</code> gesetzt.</p>
      </div>

      <div v-else-if="currentStep === 2" class="explanation-step">
        <div class="step-badge">Focus auf &lt;main&gt;</div>
        <p>Focus liegt auf dem <strong>&lt;main&gt;</strong>-Bereich (Router-View).</p>
        <p>Per <kbd>Tab</kbd> navigiert der User zum „Kontakt"-Button.</p>
      </div>

      <div v-else-if="currentStep === 3" class="explanation-step">
        <div class="step-badge">Focus auf Button</div>
        <p>Focus liegt auf <strong>„Kontakt"</strong>.</p>
        <p>User drückt <kbd>Enter</kbd> → SPA-Router navigiert zu <code>/contact</code>.</p>
      </div>

      <div v-else-if="currentStep === 4" class="explanation-step swap-step">
        <div class="step-badge swap-badge">⟳ SPA-Router</div>
        <p>Nur der <strong>Router-View</strong> wird ausgetauscht.</p>
        <p>Navigation bleibt <strong>unverändert</strong> — kein Full-Page-Reload!</p>
        <p class="history-hint">URL wird per <code>history.pushState()</code> auf <code>/contact</code> geändert.</p>
        <p>Der Browser setzt den Focus <strong>nicht</strong> automatisch zurück.</p>
      </div>

      <div v-else class="explanation-step warning">
        <div class="step-badge danger">⚠️ Problem</div>
        <p>Neuer Inhalt geladen — aber <strong>Focus landet im 2. Formularfeld</strong> (E-Mail).</p>
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

// Step 0: Router loads Home-View (swap border visible)
// Step 1: Home loaded, view ready
// Step 2: Focus outline around <main>
// Step 3: Focus on "Kontakt" button + click
// Step 4: Router-View swap to /contact
// Step 5: Contact page, focus in wrong field
const currentStep = computed(() => {
  const c = $clicks.value;
  if (c >= 5) return 5;
  if (c >= 4) return 4;
  if (c >= 3) return 3;
  if (c >= 2) return 2;
  if (c >= 1) return 1;
  return 0;
});

const activeNav = computed(() => (currentStep.value >= 4 ? '/contact' : '/'));

const displayUrl = computed(() => {
  if (currentStep.value >= 4) return 'https://example.org/contact';
  return 'https://example.org/';
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
  position: relative;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 8px;
}

.browser-url.url-highlight {
  background: rgba(234, 179, 8, 0.15);
  border: 1px solid #eab308;
  color: #fde047;
  box-shadow: 0 0 8px rgba(234, 179, 8, 0.3);
}

.history-badge {
  font-size: 0.55rem;
  font-weight: 600;
  color: #eab308;
  background: rgba(234, 179, 8, 0.15);
  border: 1px solid rgba(234, 179, 8, 0.35);
  padding: 1px 6px;
  border-radius: 3px;
  white-space: nowrap;
  animation: fade-in 0.3s ease;
  margin-left: auto;
}

/* SPA Layout */
.spa-layout {
  background: #1e1e2e;
  height: 330px;
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
  transition: background 0.3s;
}

.router-view.router-swapping {
  background: rgba(168, 85, 247, 0.04);
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

/* Router swap border */
.router-swap-border {
  position: absolute;
  inset: 4px;
  border: 2px solid #a855f7;
  border-radius: 6px;
  animation: swap-pulse 0.8s ease-in-out infinite;
  pointer-events: none;
  z-index: 10;
}

.router-swap-label {
  position: absolute;
  top: 8px;
  right: 10px;
  font-size: 0.65rem;
  font-weight: 600;
  color: #a855f7;
  background: rgba(168, 85, 247, 0.15);
  padding: 2px 8px;
  border-radius: 4px;
  z-index: 11;
  animation: fade-in 0.3s ease;
}

@keyframes swap-pulse {
  0%, 100% { border-color: #a855f7; opacity: 1; }
  50% { border-color: #c084fc; opacity: 0.6; }
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
.w-40 { width: 40%; }

@keyframes shimmer {
  0% { background-position: 200% 0; }
  100% { background-position: -200% 0; }
}

/* Swap skeleton (dimmed) */
.swap-view {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
}

.swap-skeleton {
  display: flex;
  flex-direction: column;
  gap: 12px;
  width: 100%;
  opacity: 0.4;
  animation: swap-fade 1s ease-in-out infinite alternate;
}

.skeleton-line-dim {
  height: 10px;
  border-radius: 5px;
  background: rgba(168, 85, 247, 0.25);
}

@keyframes swap-fade {
  from { opacity: 0.2; }
  to { opacity: 0.5; }
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

/* =============================================
   Right-side explanation
   Uses theme CSS vars for proper dark/light contrast
   ============================================= */
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

.explanation-step.swap-step {
  background: rgba(168, 85, 247, 0.08);
  border-color: rgba(168, 85, 247, 0.25);
}

.explanation-step p {
  margin: 6px 0;
  font-size: 0.78rem;
  color: var(--k9n-text-primary, #1e293b);
  line-height: 1.5;
}

.explanation-step ul {
  margin: 6px 0;
  padding-left: 16px;
  font-size: 0.75rem;
  color: var(--k9n-text-secondary, #334155);
  line-height: 1.6;
}

.explanation-step strong {
  color: var(--k9n-text-primary, #1e293b);
}

.explanation-step code {
  background: rgba(100, 116, 139, 0.15);
  padding: 1px 5px;
  border-radius: 3px;
  font-size: 0.7rem;
  color: var(--k9n-text-primary, #1e293b);
}

.explanation-step kbd {
  background: rgba(100, 116, 139, 0.15);
  border: 1px solid rgba(100, 116, 139, 0.3);
  padding: 1px 5px;
  border-radius: 3px;
  font-size: 0.68rem;
  font-family: system-ui;
  color: var(--k9n-text-primary, #1e293b);
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
  color: #3b82f6;
  margin-bottom: 8px;
}

.step-badge.danger {
  background: rgba(239, 68, 68, 0.15);
  color: #ef4444;
}

.step-badge.swap-badge {
  background: rgba(168, 85, 247, 0.15);
  color: #a855f7;
}

.hint {
  opacity: 0.6;
  font-style: italic;
  font-size: 0.72rem !important;
}

.takeaway {
  font-weight: 600;
  color: #ef4444 !important;
  margin-top: 10px !important;
}

.history-hint {
  color: #eab308 !important;
  font-weight: 500;
}

@keyframes fade-in {
  from { opacity: 0; transform: translateY(-4px); }
  to { opacity: 1; transform: translateY(0); }
}
</style>
