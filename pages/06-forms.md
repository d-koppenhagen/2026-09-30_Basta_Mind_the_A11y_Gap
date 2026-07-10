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

<div class="grid grid-cols-2 gap-4">

<div>

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

<div>

<v-click>

## ✅ Lösung

```html
<label for="email">Enter your email</label>
<input type="email" id="email"
  autocomplete="email" />

<label>
  <input type="checkbox" />
  Accept terms
</label>
```

**Vorteile:**
- Richtige Verknüpfung
- Klickbares Label
- Screen Reader: „Enter your email, Textfeld"
- `autocomplete` hilft Nutzern mit kognitiven Einschränkungen

</v-click>

</div>

</div>

<!--
- LINKS: Placeholder als Label – sehr häufiger Fehler!
  - Checkbox mit Text daneben ohne Verknüpfung
  - [KLICK] Placeholder verschwindet beim Tippen, Screen Reader sagt nur „Textfeld, leer"
- RECHTS:
  - [KLICK] label mit for/id-Verknüpfung oder Input im Label umschließen
  - Screen Reader kündigt Label an
  - Klick auf Label fokussiert das Feld
  - autocomplete hilft bei kognitiven Einschränkungen
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
⚠️ Hinweis: `aria-errormessage` hat eingeschränkten Browser-Support. Nutzt `aria-describedby` als Fallback für breitere Kompatibilität.
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

# Formular-Absendung

Wie gehen wir damit um, wenn Nutzer ungültige Formulare absenden wollen?

<v-clicks>

<div class="mt-4 p-4 bg-red-500 bg-opacity-10 rounded">

## ❌ Deaktiviert ohne Erklärung

```html
<button type="submit" disabled>Submit</button>
```

**Problem:** Nutzer wissen nicht, warum der Button nicht funktioniert
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
-->

---
layout: default
---

# Formular-Absendung

<div class="mt-4 p-4 bg-green-500 bg-opacity-10 rounded">

## ✅ Aktiviert mit Feld-Validierung

```html
<input aria-invalid="true" aria-errormessage="email-error" />
<div id="email-error" role="alert">Please enter a valid email</div>
```
```js
// Bei Submit: Erstes ungültiges Feld fokussieren
document.querySelector('[aria-invalid="true"]')?.focus();
```

**Vorteile:** Spezifische Fehlermeldungen, Focus auf Problem, Screen-Reader-kompatibel
</div>

<!--
- Die richtige Lösung: Button NICHT deaktivieren
- aria-invalid markiert ungültige Felder
- aria-errormessage verknüpft spezifische Fehlermeldung
- role="alert" kündigt Fehler sofort an
- Nach Submit: Focus auf erstes ungültiges Feld setzen
- So weiß jeder sofort, wo das Problem ist und was zu tun ist
- → Überleitung: Focus-Management bei Fehlern im Detail
-->

---
layout: default
---

# Focus-Management bei Fehlern

<div class="grid grid-cols-2 gap-4">

<div>

## ❌ Problem

```js
function handleSubmit(e) {
  e.preventDefault();
  const errors = validate(formData);
  if (errors.length > 0) {
    // Fehler nur anzeigen
    setErrors(errors);
    // Focus bleibt auf Submit-Button!
  }
}
```

**Probleme:**
- Nutzer muss den Fehler finden
- Kein sofortiges Feedback
- Tastatur-Nutzer sind verloren

</div>

<div>

<v-click>

## ✅ Lösung

```js
function handleSubmit(e) {
  e.preventDefault();
  const errors = validate(formData);
  if (errors.length > 0) {
    setErrors(errors);
    const firstError = document
      .querySelector('[aria-invalid="true"]');
    firstError?.focus();
  }
}
```

**Vorteile:**
- Sofortiger Focus auf das Problem
- Screen Reader kündigt Fehler an
- Klare nächste Aktion

</v-click>

</div>

</div>

<!--
- LINKS: Fehler anzeigen, aber Focus bleibt auf Submit-Button
  - [KLICK] Nutzer muss Fehler suchen, besonders schlimm für Screen-Reader-Nutzer
- RECHTS:
  - [KLICK] Nach Validierung Focus auf erstes ungültiges Feld setzen
  - Screen Reader kündigt Feld und Fehler an
  - Sofortiges, klares Feedback
- Einfache Verbesserung, riesiger Effekt
- Kombiniert mit aria-invalid + aria-describedby = vollständig barrierefreies Formular
- → Überleitung: Dynamische Inhalte und Live Regions
-->

---
layout: center
class: text-center
---

# Demo

<a href="https://practica11y.dev/challenges/invalid-form-error" target="_blank" class="text-2xl pt-10">🎮 Challenge: Silent Treatment</a>
<br>
<a href="https://practica11y.dev/challenges/missing-label" target="_blank" class="text-2xl pt-4">🎮 Challenge: Name That Field</a>

<!--
- Demo: Alles zusammen in Aktion – Labels, Validierung, Fehlerbehandlung, Focus-Management
- Silent Treatment: Formular-Fehler ohne Feedback
- Name That Field: Fehlende Labels ergänzen
- → Überleitung: Live Regions und dynamische Inhalte
-->
