---
layout: section
---

# Formulare richtig machen

Fehlerbehandlung und Validierung barrierefrei umsetzen

<!--
- Formulare: Bereich wo A11y oft komplett zusammenbricht
- Fehlerbehandlung besonders problematisch
- → Überleitung: Patterns die ihr kennen müsst
-->

---
layout: default
dragPos:
  square: 691,32,167,_,-16
---

# Formular-Labels

<div class="grid grid-cols-12 gap-4">

<div class="col-span-5">

## ❌ Problem

```html
<input
  type="text"
  placeholder="Enter your email"
/>

<input type="checkbox" />
<span>Accept terms</span>
```

**Probleme:**
- Placeholder ist kein Label
- Checkbox nicht verknüpft
- Screen Reader: „Textfeld, leer"

</div>

<div class="col-span-7">

<v-click>

## ✅ Lösung

```html
<label for="email">Enter your email</label>
<input type="email" id="email" autocomplete="email" />

<label>
  <input type="checkbox" />
  Accept terms
</label>
```

**Vorteile:**
- Richtige Verknüpfung
- Klickbares Label
- Screen Reader: „Enter your email, Textfeld"
- `autocomplete` hilft Nutzenden mit kognitiven Einschränkungen

</v-click>

</div>

</div>

<!--
- LINKS: Nutzen Placeholder als Label – sehr häufiger Fehler!
  - Checkbox mit Text daneben ohne Verknüpfung
  - [KLICK] Placeholder verschwindet beim Tippen, Screen Reader sagt nur „Textfeld, leer"
- RECHTS:
  - [KLICK] label mit for/id-Verknüpfung oder Input im Label umschließen
  - Screen Reader kündigt Label an
  - Klick auf Label fokussiert das Feld
  - `autocomplete` hilft bei kognitiven Einschränkungen
- → Überleitung: Ungültige Felder markieren
-->

---
layout: default
---

# Ungültige Felder markieren

<div class="grid grid-cols-2 gap-4">

<div>

## ❌ Problem

```html
<style>
  .error { border: 2px solid red; }
</style>
<label for="email">Email</label>
<input type="email" id="email" class="error" />
<span class="error-text">
  No valid email was entered
</span>
```

**Probleme:**
- Nur visuelle Anzeige (Farbe)
- Screen Reader weiß nicht, dass es ungültig ist
- Fehlermeldung nicht verknüpft

</div>

<div>

<v-click>

## ✅ Lösung

```html
<label for="email">Email</label>
<input type="email" id="email" class="error"
  aria-invalid="true"
  aria-errormessage="email-error"
/>
<span id="email-error" role="alert">
  No valid email was entered
</span>
```

**Vorteile:**
- Screen Reader kündigt „ungültig" an
- Fehlermeldung wird vorgelesen
- Programmatische Verknüpfung

</v-click>

</div>

</div>

<v-click>

<div class="mt-2 p-2 bg-yellow-500 bg-opacity-10 rounded text-sm">
⚠️ Hinweis: <code>aria-errormessage</code> hat eingeschränkten Browser-Support. Nutzt <code>aria-describedby</code> als Fallback für breitere Kompatibilität.
</div>

</v-click>

<!--
- LINKS: Nur visueller Hinweis (roter Rahmen) – Screen Reader merken nichts!
  - [KLICK] Fehlermeldung ist nur Text in der Nähe, nicht verknüpft
- RECHTS:
  - [KLICK] aria-invalid="true" markiert Feld als ungültig
  - aria-errormessage verknüpft die Fehlermeldung
  - role="alert" → sofortige Ankündigung
  - Screen Reader sagt: „Email, ungültig. Es wurde keine gültige E-Mail eingegeben"
- [KLICK] Hinweis: aria-errormessage hat eingeschränkten Support → aria-describedby als Fallback
- → Überleitung: Was passiert beim Absenden?
-->

---
layout: default
---

# Formular-Absendung: Deaktivierter Button

Wie gehen wir damit um, wenn Nutzende ungültige Formulare absenden wollen?

<v-clicks>

<div class="mt-4 p-4 bg-red-500 bg-opacity-10 rounded">

## ❌ Deaktiviert ohne Erklärung

```html
<button type="submit" disabled>Submit</button>
```

**Problem:** Nutzende wissen nicht, warum der Button nicht funktioniert
</div>

<div class="mt-4 p-4 bg-yellow-500 bg-opacity-10 rounded">

## ⚠️ Deaktiviert mit Hinweis

```html
<button type="submit" disabled aria-describedby="submit-hint">Submit</button>
<div id="submit-hint">Please fill all required fields</div>
```

**Probleme:** Button nicht fokussierbar, generischer Hinweis, keine Info über spezifische Fehler
</div>

</v-clicks>

<!--
- Wie mit ungültigen Formularen umgehen?
- [KLICK 1] Deaktiviert ohne Erklärung: Absolut inakzeptabel – keine Information warum
- [KLICK 2] Deaktiviert mit Hinweis: Besser, aber immer noch problematisch
  - Button nicht per Tastatur fokussierbar
  - Hinweis zu generisch, nennt nicht die konkreten Fehler
- → Überleitung: Die richtige Lösung

---
layout: default
---

# Formular-Absendung: Die Lösung

<div class="mt-4 p-4 bg-green-500 bg-opacity-10 rounded">

## ✅ Aktiviert mit Feld-Validierung & Focus-Management

```html
<input aria-invalid="true" aria-errormessage="email-error" />
<div id="email-error" role="alert">Please enter a valid email</div>
```
```js
function handleSubmit(e) {
  e.preventDefault();
  const errors = validate(formData);
  if (errors.length > 0) {
    setErrors(errors);
    const firstError = document.querySelector('[aria-invalid="true"]');
    firstError?.focus();
  }
}
```

</div>

<v-click>

<div class="mt-4 p-4 bg-blue-500 bg-opacity-10 rounded">
💡 <strong>Regel:</strong> Submit-Button nie deaktivieren — stattdessen bei Submit validieren, Focus auf erstes ungültiges Feld setzen, <code>aria-invalid</code> + <code>role="alert"</code> nutzen.
</div>

</v-click>

<!--
- Die richtige Lösung: Button NICHT deaktivieren, immer aktiviert lassen
- aria-invalid markiert ungültige Felder
- aria-errormessage verknüpft spezifische Fehlermeldung
- role="alert" kündigt Fehler sofort an
- Nach Submit: Focus auf erstes ungültiges Feld setzen
- [KLICK] Kernregel zusammengefasst
- Einfache Verbesserung, riesiger Effekt für alle Nutzenden
- → Überleitung: Dynamische Inhalte und Live Regions
-->

---
layout: center
class: text-center
---

# Ausprobieren

<ChallengeLinks :challenges="[
  { slug: 'invalid-form-error', title: 'Silent Treatment' },
  { slug: 'missing-label', title: 'Name That Field' },
]" />

<!--
- Demo: Alles zusammen in Aktion – Labels, Validierung, Fehlerbehandlung, Focus-Management
- Silent Treatment: Formular-Fehler ohne Feedback
- Name That Field: Fehlende Labels ergänzen
- → Überleitung: Live Regions und dynamische Inhalte
-->
