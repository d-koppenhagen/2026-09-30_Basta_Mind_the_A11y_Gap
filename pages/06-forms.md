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
  aria-describedby="email-error"
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

<!--
- LINKS: Nur visueller Hinweis (roter Rahmen) – Screen Reader merken nichts!
  - [KLICK] Fehlermeldung ist nur Text in der Nähe, nicht verknüpft
- RECHTS:
  - [KLICK] aria-invalid="true" markiert Feld als ungültig
  - aria-errormessage/aria-describedby verknüpft die Fehlermeldung
  - role="alert" → sofortige Ankündigung
  - Screen Reader sagt: „Email, ungültig. Es wurde keine gültige E-Mail eingegeben"
- [KLICK] Hinweis: aria-errormessage hat eingeschränkten Support → aria-describedby als Fallback
- → Überleitung: Was passiert beim Absenden?
-->

---
layout: default
clicks: 2
---

# ❌ Deaktivierter Button ohne Erklärung

<FormSubmitDisabledDemo />

<!--
- Wie mit ungültigen Formularen umgehen? Häufiges Pattern: Button deaktivieren
- [Initial] Formular nicht komplett ausgefüllt, Button ist disabled
- [KLICK 1] User versucht zu klicken – nichts passiert, kein Hinweis warum
- [KLICK 2] Per Tab nicht fokussierbar – disabled entfernt aus Tab-Reihenfolge
- Absolut inakzeptabel: Keinerlei Feedback!
- → Überleitung: Besser mit Hinweistext?
-->

---
layout: default
clicks: 2
---

# ⚠️ Deaktivierter Button mit Hinweis

<FormSubmitHintDemo />

<!--
- Nächster Versuch: Hinweistext per aria-describedby
- [Initial] Disabled Button, noch kein Hinweis
- [KLICK 1] Hinweis erscheint – „Bitte alle Pflichtfelder ausfüllen"
- [KLICK 2] Aber: Button nicht fokussierbar, aria-describedby wird nicht vorgelesen bei disabled
  - Hinweis zu generisch – welche Felder fehlen genau?
  - Nutzende müssen selbst raten
- Besser als vorher – aber immer noch keine gute UX
- → Überleitung: Die richtige Lösung
-->

---
layout: default
clicks: 2
---

# ✅ Submit frei: Validierung & Focus-Management

<FormSubmitValidationDemo />

<!--
- Die richtige Lösung: Button NICHT deaktivieren!
- [Initial] Button ist immer aktiv und fokussierbar
- [KLICK 1] User klickt auf Submit – Validierung startet
- [KLICK 2] Erstes ungültiges Feld wird fokussiert + rot markiert
  - aria-invalid="true" kennzeichnet das Feld
  - Fehlermeldung per aria-describedby verknüpft
  - role="alert" → Screen Reader liest Fehler sofort vor
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
