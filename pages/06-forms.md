---
layout: section
---

# Formulare richtig machen

Fehlerbehandlung und Validierung barrierefrei umsetzen

<!--
- Formulare: hier bricht A11y oft komplett zusammen, v. a. Fehlerbehandlung
- → Überleitung: Patterns, die man kennen muss
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
- Placeholder verschwindet beim Tippen → als Label unbrauchbar
- Verknüpfung: `label` mit `for`/`id` ODER Input im Label umschließen; Klick aufs Label fokussiert
- Blazor: EditForm + InputText rendern `<input>`, aber KEIN `<label>` – selbst setzen
- FluentUI/MudBlazor: prüfen, ob Label korrekt verknüpft wird
- → Überleitung: ungültige Felder markieren
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
- Nur Farbe = SR merkt nichts; `aria-invalid` + verknüpfte Meldung nötig
- `role="alert"` → sofortige Ankündigung
- `aria-errormessage` hat schwachen Support → `aria-describedby` als Fallback
- Blazor: DataAnnotations + `<ValidationMessage>` reichen NICHT (nur ein div, keine aria-Attribute/role)
- Tipp: `AdditionalAttributes`-Dictionary in InputBase für aria-*
- → Überleitung: Was passiert beim Absenden?
-->

---
layout: default
clicks: 2
---

# ❌ Deaktivierter Button ohne Erklärung

<FormSubmitDisabledDemo />

<!--
- Anti-Pattern: Button `disabled` → Klick tut nichts, kein Hinweis warum
- `disabled` fliegt aus der Tab-Reihenfolge → gar nicht erreichbar
- Kein Feedback = inakzeptabel
- → Überleitung: besser mit Hinweistext?
-->

---
layout: default
clicks: 2
---

# ⚠️ Deaktivierter Button mit Hinweis

<FormSubmitHintDemo />

<!--
- Versuch: Hinweis per `aria-describedby`
- Problem bleibt: disabled Button nicht fokussierbar → describedby wird nicht vorgelesen
- Hinweis zu generisch – welche Felder fehlen genau?
- → Überleitung: die richtige Lösung
-->

---
layout: default
clicks: 2
---

# ✅ Submit frei: Validierung & Focus-Management

<FormSubmitValidationDemo />

<!--
- Lösung: Button NIE deaktivieren – immer aktiv & fokussierbar
- Bei Submit: erstes ungültiges Feld fokussieren + `aria-invalid`, Meldung per `aria-describedby`, `role="alert"`
- Einfach umzusetzen, große Wirkung für alle
- → Überleitung: dynamische Inhalte & Live Regions
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
- Challenges: Formular-Fehler ohne Feedback; fehlende Labels ergänzen
- → Überleitung: Live Regions & dynamische Inhalte
-->
