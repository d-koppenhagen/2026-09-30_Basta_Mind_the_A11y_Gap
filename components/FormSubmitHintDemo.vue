<template>
  <div class="form-submit-demo">
    <!-- Left: Browser Demo -->
    <BrowserWindow url="https://my-app.de/register" body-height="320px">
      <div class="form-container">
        <h2 class="form-title">Registrierung</h2>

        <div class="form-group">
          <label>Name <span class="required">*</span></label>
          <div class="fake-input filled">
            <span class="input-text">Max Mustermann</span>
          </div>
        </div>

        <div class="form-group">
          <label>E-Mail <span class="required">*</span></label>
          <div class="fake-input empty">
            <span class="placeholder-text">E-Mail eingeben...</span>
          </div>
        </div>

        <div class="form-group">
          <label>Passwort <span class="required">*</span></label>
          <div class="fake-input empty">
            <span class="placeholder-text">Passwort eingeben...</span>
          </div>
        </div>

        <div class="button-area">
          <button
            class="submit-btn disabled-btn"
            :class="{ 'try-focus': currentStep === 2 }"
          >
            Submit
            <span v-if="currentStep === 2" class="tab-skip">⇥ Skip</span>
          </button>
          <Transition name="hint-fade">
            <span v-if="currentStep >= 1" class="hint-text" :class="{ 'hint-highlight': currentStep === 1 }">
              ⚠️ Bitte alle Pflichtfelder ausfüllen
            </span>
          </Transition>
        </div>

        <!-- aria-describedby code hint -->
        <Transition name="hint-fade">
          <div v-if="currentStep >= 1" class="aria-hint">
            <code>aria-describedby="submit-hint"</code>
          </div>
        </Transition>
      </div>
    </BrowserWindow>

    <!-- Right: Explanation -->
    <div class="explanation">
      <div v-if="currentStep === 0" class="explanation-step">
        <div class="step-badge">Ausgangslage</div>
        <p>Formular nicht komplett ausgefüllt. Button ist <strong>deaktiviert</strong>.</p>
        <p>Idee: Einen Hinweistext anzeigen, warum der Button deaktiviert ist.</p>
      </div>

      <div v-else-if="currentStep === 1" class="explanation-step caution">
        <div class="step-badge warn">⚠️ Hinweis sichtbar</div>
        <p>Hinweis erscheint per <code>aria-describedby</code>:</p>
        <p class="code-hint"><code>&lt;button disabled aria-describedby="hint"&gt;</code></p>
        <p><strong>Besser als ohne Hinweis</strong> — aber noch nicht ideal.</p>
      </div>

      <div v-else class="explanation-step warning">
        <div class="step-badge danger">⚠️ Immer noch Probleme</div>
        <ul>
          <li>Button <strong>nicht fokussierbar</strong> per Tastatur</li>
          <li><code>aria-describedby</code> wird <strong>nicht vorgelesen</strong>, weil <code>disabled</code> den Button aus dem Accessibility Tree entfernt</li>
          <li>Hinweis zu <strong>generisch</strong> — welche Felder fehlen?</li>
          <li>Nutzende müssen selbst herausfinden, was fehlt</li>
        </ul>
        <p class="takeaway">Besser — aber immer noch keine gute UX!</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { useSlideContext } from '@slidev/client';
import BrowserWindow from './BrowserWindow.vue';

const { $clicks } = useSlideContext();

// Step 0: Form with disabled button
// Step 1: Hint text appears
// Step 2: Still not focusable — problems remain
const currentStep = computed(() => {
  const c = $clicks.value;
  if (c >= 2) return 2;
  if (c >= 1) return 1;
  return 0;
});
</script>

<style scoped>
.form-submit-demo {
  display: flex;
  gap: 24px;
  align-items: flex-start;
  max-width: 100%;
}

.form-submit-demo > :first-child {
  flex: 1.3;
  min-width: 0;
}

.form-container {
  padding: 16px 20px;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.form-title {
  margin: 0 0 4px;
  font-size: 1rem;
  color: #e2e8f0;
}

.form-group label {
  display: block;
  font-size: 0.72rem;
  color: #94a3b8;
  margin-bottom: 3px;
}

.required {
  color: #ef4444;
}

.fake-input {
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid rgba(255, 255, 255, 0.12);
  border-radius: 4px;
  padding: 6px 10px;
  font-size: 0.76rem;
  height: 28px;
  display: flex;
  align-items: center;
}

.fake-input.filled {
  border-color: rgba(255, 255, 255, 0.2);
}

.input-text {
  color: #e2e8f0;
}

.placeholder-text {
  color: #4a5568;
  font-style: italic;
}

.fake-input.empty {
  border-color: rgba(255, 255, 255, 0.08);
}

/* Button */
.button-area {
  margin-top: 8px;
  display: flex;
  align-items: center;
  gap: 12px;
}

.submit-btn {
  position: relative;
  padding: 7px 20px;
  border: none;
  border-radius: 5px;
  font-size: 0.78rem;
  font-weight: 600;
  cursor: not-allowed;
}

.disabled-btn {
  background: #4a5568;
  color: #94a3b8;
  opacity: 0.6;
}

.submit-btn.try-focus {
  outline: 2px dashed rgba(239, 68, 68, 0.5);
  outline-offset: 3px;
}

.tab-skip {
  position: absolute;
  top: -10px;
  right: -30px;
  font-size: 0.65rem;
  font-weight: 600;
  color: #ef4444;
  background: rgba(239, 68, 68, 0.15);
  padding: 2px 6px;
  border-radius: 3px;
  animation: pop-in 0.3s ease;
}

.hint-text {
  font-size: 0.72rem;
  color: #fbbf24;
  animation: fade-in 0.3s ease;
}

.hint-text.hint-highlight {
  background: rgba(251, 191, 36, 0.1);
  padding: 3px 8px;
  border-radius: 4px;
  border: 1px solid rgba(251, 191, 36, 0.3);
}

.aria-hint {
  margin-top: 4px;
  padding: 4px 10px;
  background: rgba(0, 0, 0, 0.3);
  border-radius: 4px;
  font-size: 0.68rem;
  animation: fade-in 0.3s ease;
}

.aria-hint code {
  color: #a5d6ff;
  font-family: 'Fira Code', 'JetBrains Mono', monospace;
}

/* Transitions */
.hint-fade-enter-active,
.hint-fade-leave-active {
  transition: all 0.3s ease;
}
.hint-fade-enter-from,
.hint-fade-leave-to {
  opacity: 0;
  transform: translateY(-4px);
}

@keyframes pop-in {
  from { opacity: 0; transform: scale(0.5); }
  to { opacity: 1; transform: scale(1); }
}

/* Explanation */
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

.explanation-step.caution {
  background: rgba(251, 191, 36, 0.08);
  border-color: rgba(251, 191, 36, 0.25);
}

.explanation-step.warning {
  background: rgba(239, 68, 68, 0.08);
  border-color: rgba(239, 68, 68, 0.25);
}

.explanation-step p {
  margin: 6px 0;
  font-size: 0.78rem;
  color: var(--k9n-text-primary, #e2e8f0);
  line-height: 1.5;
}

.explanation-step ul {
  margin: 6px 0;
  padding-left: 16px;
  font-size: 0.75rem;
  color: var(--k9n-text-primary, #e2e8f0);
  line-height: 1.7;
}

.explanation-step strong {
  color: var(--k9n-text-primary, #e2e8f0);
}

.explanation-step code {
  background: rgba(100, 116, 139, 0.15);
  padding: 1px 5px;
  border-radius: 3px;
  font-size: 0.7rem;
  color: var(--k9n-text-primary, #e2e8f0);
}

.code-hint {
  margin-top: 8px !important;
  padding: 6px 10px;
  background: rgba(0, 0, 0, 0.3);
  border-radius: 4px;
  font-family: 'Fira Code', 'JetBrains Mono', monospace;
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

.step-badge.warn {
  background: rgba(251, 191, 36, 0.15);
  color: #fbbf24;
}

.step-badge.danger {
  background: rgba(239, 68, 68, 0.15);
  color: #ef4444;
}

.takeaway {
  font-weight: 600;
  color: #ef4444 !important;
  margin-top: 10px !important;
}

@keyframes fade-in {
  from { opacity: 0; transform: translateY(-4px); }
  to { opacity: 1; transform: translateY(0); }
}
</style>
