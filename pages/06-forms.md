---
layout: section
---

# Formulare richtig machen

Fehlerbehandlung und Validierung barrierefrei umsetzen

<!--
Formulare sind der Bereich, in dem Barrierefreiheit oft komplett zusammenbricht.

Fehlerbehandlung ist besonders problematisch.

Schauen wir uns die Patterns an, die ihr kennen müsst...
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

<v-click>

**Probleme:**
- Placeholder ist kein Label
- Checkbox nicht verknüpft
- Screen Reader: „Textfeld, leer"

</v-click>

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
Formular-Labels sind kritisch, werden aber oft vergessen.

LINKS – Problem:
Placeholder als Label verwenden – sehr häufiger Fehler!
Checkbox mit Text daneben, aber keine Verknüpfung

[KLICK]
Probleme:
- Placeholder verschwinden beim Tippen
- Screen Reader sagen nur „Textfeld, leer" – kein Kontext!
- Man kann den Text nicht klicken um das Eingabefeld zu fokussieren

RECHTS:
[KLICK]
Lösung:
Richtige label-Elemente mit for/id-Verknüpfung verwenden
Oder den Input im Label umschließen

Vorteile:
- Screen Reader kündigen das Label an
- Man kann den Label-Text klicken um zu fokussieren
- Labels verschwinden nicht
- Es ist einfach bessere UX für alle!
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

<v-click>

**Probleme:**
- Nur visuelle Anzeige (Farbe)
- Screen Reader weiß nicht, dass es ungültig ist
- Fehlermeldung nicht verknüpft

</v-click>

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
Formular-Validierung ist kritisch für Barrierefreiheit.

LINKS – Problem:
Nur visuelle Anzeige – roter Rahmen.
Screen-Reader-Nutzer haben keine Ahnung, dass das Feld ungültig ist!

[KLICK]
Die Fehlermeldung ist nur Text in der Nähe – nicht mit dem Feld verknüpft.

RECHTS:
[KLICK]
Lösung:
aria-invalid="true" verwenden um das Feld als ungültig zu markieren.
aria-errormessage (oder aria-describedby als Fallback) um die Fehlermeldung zu verknüpfen.
role="alert" hinzufügen damit der Fehler sofort angekündigt wird.

Jetzt sagen Screen Reader:
„Email, ungültig, Textfeld. Es wurde keine gültige E-Mail eingegeben"

Nutzer wissen genau, was falsch ist!

Aber es gibt noch mehr...
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
Vergleichen wir drei Ansätze zur Formular-Validierung:

[KLICK 1]
Deaktiviert ohne Erklärung: Absolut inakzeptabel
Der Button ist einfach grau und tut nichts
Nutzer haben keine Ahnung warum

[KLICK 2]
Deaktiviert mit Hinweis: Besser, aber immer noch problematisch
- Der Button kann nicht mit der Tastatur fokussiert werden
- Der Hinweis ist zu generisch
- Man weiß nicht, WELCHE Felder das Problem sind
- Screen-Reader-Nutzer müssen den Hinweis erst finden

[KLICK 3]
Die richtige Lösung:
- aria-invalid markiert das Feld als ungültig
- aria-errormessage verknüpft die spezifische Fehlermeldung
- role="alert" macht die Meldung sofort für Screen Reader verfügbar
- Nach Submit setzen wir den Focus auf das erste ungültige Feld
- So weiß jeder sofort, wo das Problem ist und was zu tun ist
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

<v-click>

**Probleme:**
- Nutzer muss den Fehler finden
- Kein sofortiges Feedback
- Tastatur-Nutzer sind verloren

</v-click>

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
Felder als ungültig zu markieren ist gut, aber nicht genug.

LINKS – Problem:
Formular validiert, zeigt Fehler, aber Focus bleibt auf dem Submit-Button.
Nutzer muss den Fehler suchen!

[KLICK]
Besonders schlimm für Screen-Reader-Nutzer – sie müssen wieder durch das gesamte Formular tabben.

RECHTS:
[KLICK]
Lösung:
Nach der Validierung den Focus programmatisch auf das erste ungültige Feld setzen.

Jetzt ist der Nutzer sofort beim Problem.
Screen Reader kündigt das Feld und seinen Fehler an.
Klares, sofortiges Feedback!

Das ist so eine einfache Verbesserung, macht Formulare aber so viel besser.

Kombiniert mit aria-invalid und aria-describedby habt ihr ein vollständig barrierefreies Formular-Validierungs-Pattern.

Jetzt reden wir über dynamische Inhalte...
-->

---
layout: center
class: text-center
---

# Demo

<StorybookLink story="11-form-demo" />

<!--
Schauen wir uns das alles in Aktion an – Formular-Labels, Validierung, Fehlerbehandlung und Focus-Management kombiniert in einer Demo.
-->
