<template>
  <div class="invalid-field-demo" :class="variant">
    <div class="ifd-field">
      <label :for="fieldId" class="ifd-label">Email</label>
      <div class="ifd-input">
        <span class="ifd-value">max.mustermann</span>
        <span class="ifd-cursor"></span>
        <span v-if="variant === 'solution'" class="ifd-invalid-icon" aria-hidden="true">⚠</span>
      </div>
      <span :id="`${fieldId}-error`" class="ifd-error" role="alert">
        No valid email was entered
      </span>
    </div>

    <div v-if="variant === 'solution'" class="ifd-sr ifd-sr-success">
      <div class="ifd-sr-head"><span aria-hidden="true">🔊</span> Screen Reader</div>
      <span class="ifd-sr-text">
        „Email, Textfeld, <strong>ungültige Eingabe</strong>. No valid email was entered."
      </span>
    </div>
    <div v-else class="ifd-sr ifd-sr-danger">
      <div class="ifd-sr-head"><span aria-hidden="true">🔇</span> Screen Reader</div>
      <span class="ifd-sr-text">„Email, Textfeld." <em>— Fehler nicht angekündigt</em></span>
    </div>
  </div>
</template>

<script setup>
defineProps({
  variant: {
    type: String,
    default: 'problem', // 'problem' | 'solution'
  },
});

const fieldId = `email-${Math.random().toString(36).slice(2, 7)}`;
</script>

<style scoped>
/* Theme-taugliche Farben mit Fallback-Kette:
   1. DB-Theme (--db-*)  →  2. k9n-Theme (--k9n-*)  →  3. statischer Wert.
   Beide Themes liefern Light- und Dark-Werte, daher passt die Demo
   automatisch in allen vier Kombinationen (DB/k9n × light/dark). */
.invalid-field-demo {
  --fg: var(--db-fg, var(--k9n-text-primary, #e2e8f0));
  --fg-muted: var(--db-fg-muted, var(--k9n-text-muted, #94a3b8));
  --surface: var(--db-bg-elevated, var(--k9n-surface-elevated, rgba(127, 127, 127, 0.08)));
  --input-bg: var(--db-bg, var(--k9n-surface, rgba(127, 127, 127, 0.06)));
  --border: var(--db-border, var(--k9n-border, rgba(127, 127, 127, 0.3)));
  --danger: var(--db-red-500, #dc2626);
  /* Etwas helleres Rot nur für den Input-Rahmen, damit er weicher wirkt */
  --danger-border-soft: color-mix(in srgb, var(--danger) 62%, #fff);
  --danger-soft: color-mix(in srgb, var(--danger) 20%, transparent);
  --danger-border: color-mix(in srgb, var(--danger) 55%, transparent);
  --danger-text: color-mix(in srgb, var(--danger) 78%, var(--fg));
  --success: var(--db-green-500, #16a34a);
  --success-soft: color-mix(in srgb, var(--success) 20%, transparent);
  --success-border: color-mix(in srgb, var(--success) 55%, transparent);
  --success-text: color-mix(in srgb, var(--success) 78%, var(--fg));

  margin-top: 12px;
  padding: 12px 14px;
  border-radius: 8px;
  background: var(--surface);
  border: 1px solid var(--border);
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.ifd-field {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.ifd-label {
  font-size: 0.72rem;
  color: var(--fg-muted);
}

.ifd-input {
  position: relative;
  display: flex;
  align-items: center;
  gap: 2px;
  background: var(--input-bg);
  border: 1px solid var(--danger-border-soft);
  border-radius: 4px;
  padding: 6px 10px;
  height: 30px;
  font-size: 0.8rem;
}

.solution .ifd-input {
  box-shadow: 0 0 0 2px var(--danger-soft);
}

.ifd-value {
  color: var(--fg);
}

.ifd-cursor {
  width: 1px;
  height: 14px;
  background: var(--fg);
  animation: ifd-blink 1s step-end infinite;
}

.ifd-invalid-icon {
  margin-left: auto;
  color: var(--danger);
  font-size: 0.9rem;
}

.ifd-error {
  font-size: 0.7rem;
  color: var(--danger-text);
}

.ifd-sr {
  display: flex;
  flex-direction: column;
  gap: 3px;
  padding: 7px 9px;
  border-radius: 6px;
  font-size: 0.68rem;
  line-height: 1.4;
}

.ifd-sr-success {
  background: var(--success-soft);
  border: 1px solid var(--success-border);
  color: var(--fg);
}

.ifd-sr-danger {
  background: var(--danger-soft);
  border: 1px solid var(--danger-border);
  color: var(--fg);
}

.ifd-sr-head {
  font-weight: 700;
  font-size: 0.64rem;
  color: var(--fg-muted);
}

/* In den Boxen bewusst KEIN roter/grüner Text auf farbigem Grund
   (schlechter Kontrast). Hervorhebung nur über fett/kursiv. */
.ifd-sr-success strong {
  color: var(--fg);
  font-weight: 700;
}

.ifd-sr-danger em {
  color: var(--fg);
  font-style: italic;
}

@keyframes ifd-blink {
  0%, 100% { opacity: 1; }
  50% { opacity: 0; }
}
</style>
