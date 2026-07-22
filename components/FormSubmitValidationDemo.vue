<template>
  <div class="form-submit-demo">
    <!-- Left: Browser Demo -->
    <BrowserWindow url="https://my-app.de/register" body-height="340px">
      <div class="form-container">
        <h2 class="form-title">Registrierung</h2>

        <div class="form-group">
          <label>Name <span class="required">*</span></label>
          <div class="fake-input filled">
            <span class="input-text">Max Mustermann</span>
          </div>
        </div>

        <div class="form-group" :class="{ 'has-error': currentStep >= 2 }">
          <label>E-Mail <span class="required">*</span></label>
          <div
            class="fake-input"
            :class="{
              empty: currentStep < 2,
              'invalid-input': currentStep >= 2,
              'focused-input': currentStep >= 2,
            }"
          >
            <span v-if="currentStep < 2" class="placeholder-text">E-Mail eingeben...</span>
            <span v-else class="cursor-blink"></span>
            <span v-if="currentStep >= 2" class="focus-outline-field"></span>
          </div>
          <Transition name="error-fade">
            <span v-if="currentStep >= 2" class="field-error" role="alert">
              Bitte geben Sie eine gültige E-Mail ein
            </span>
          </Transition>
        </div>

        <div class="form-group">
          <label>Passwort <span class="required">*</span></label>
          <div class="fake-input empty">
            <span class="placeholder-text">Passwort eingeben...</span>
          </div>
        </div>

        <div class="button-area">
          <button
            class="submit-btn active-btn"
            :class="{ clicking: currentStep === 1 }"
          >
            Submit
            <span v-if="currentStep === 1" class="click-ripple"></span>
          </button>
        </div>
      </div>
    </BrowserWindow>

    <!-- Right: Explanation -->
    <div class="explanation">
      <div v-if="currentStep === 0" class="explanation-step">
        <div class="step-badge success">✅ Button aktiv</div>
        <p>Submit-Button ist <strong>immer aktiviert</strong> — egal ob Formular gültig oder nicht.</p>
        <p>Nutzende können jederzeit absenden.</p>
        <p class="code-hint"><code>&lt;button type="submit"&gt;Submit&lt;/button&gt;</code></p>
      </div>

      <div v-else-if="currentStep === 1" class="explanation-step">
        <div class="step-badge">Klick auf Submit</div>
        <p>User klickt auf <strong>Submit</strong>.</p>
        <p>Formular wird clientseitig <strong>validiert</strong>.</p>
        <p>Fehler werden erkannt → Fehlerbehandlung startet.</p>
      </div>

      <div v-else class="explanation-step success-step">
        <div class="step-badge success">✅ Richtige Lösung</div>
        <ul>
          <li>Erstes ungültiges Feld wird <strong>fokussiert</strong></li>
          <li><code>aria-invalid="true"</code> markiert das Feld</li>
          <li>Fehlermeldung per <code>aria-describedby</code> verknüpft</li>
          <li><code>role="alert"</code> → Screen Reader liest sofort vor</li>
        </ul>
        <p class="takeaway success-text">Klares Feedback — für alle!</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { useSlideContext } from '@slidev/client';
import BrowserWindow from './BrowserWindow.vue';

const { $clicks } = useSlideContext();

// Step 0: Form with active button
// Step 1: User clicks submit
// Step 2: First invalid field focused, error shown
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
  position: relative;
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

/* Invalid input */
.invalid-input {
  border-color: #ef4444 !important;
  box-shadow: 0 0 0 2px rgba(239, 68, 68, 0.3);
}

.focused-input {
  border-color: #ef4444 !important;
}

.focus-outline-field {
  position: absolute;
  inset: -4px;
  border: 2px dashed #f59e0b;
  border-radius: 6px;
  animation: pulse-outline 1.5s ease-in-out infinite;
  pointer-events: none;
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

@keyframes pulse-outline {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.4; }
}

.field-error {
  display: block;
  margin-top: 4px;
  font-size: 0.68rem;
  color: #fca5a5;
  animation: fade-in 0.3s ease;
}

.has-error label {
  color: #fca5a5;
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
  overflow: hidden;
}

.active-btn {
  background: #3b82f6;
  color: #fff;
  cursor: pointer;
}

.active-btn.clicking {
  transform: scale(0.95);
  background: #2563eb;
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
  to { width: 120px; height: 120px; opacity: 0; }
}

/* Error transition */
.error-fade-enter-active,
.error-fade-leave-active {
  transition: all 0.3s ease;
}
.error-fade-enter-from,
.error-fade-leave-to {
  opacity: 0;
  transform: translateY(-4px);
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

.explanation-step.success-step {
  background: rgba(34, 197, 94, 0.08);
  border-color: rgba(34, 197, 94, 0.25);
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
  margin-top: 10px !important;
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

.step-badge.success {
  background: rgba(34, 197, 94, 0.15);
  color: #22c55e;
}

.takeaway {
  font-weight: 600;
  margin-top: 10px !important;
}

.success-text {
  color: #22c55e !important;
}

@keyframes fade-in {
  from { opacity: 0; transform: translateY(-4px); }
  to { opacity: 1; transform: translateY(0); }
}
</style>
