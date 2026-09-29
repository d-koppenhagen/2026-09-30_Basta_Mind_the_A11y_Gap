---
layout: section
---

# Formulare richtig gestalten

Fehlerbehandlung und Validierung barrierefrei umsetzen

<!--
- Formulare: hier bricht A11y oft komplett zusammen, v. a. Fehlerbehandlung
- → Überleitung: Patterns, die man kennen muss
-->

---
layout: default
dragPos:
  square: 691,32,167,_,-16
audience: [screenreader, cognitive, voice]
---

# Formular-Labels

<div class="grid grid-cols-12 gap-4">

<div class="col-span-4">

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

<div class="col-span-8">

<v-click>

## ✅ Lösung

```html
<label for="email">Enter your email</label>
<input type="email" id="email" autocomplete="email" />

<label for="terms">
  <input type="checkbox" id="terms" />
  Accept terms
</label>
```

**Vorteile:**
- Richtige Verknüpfung – auch bei Verschachtelung `for`/`id` setzen
- Klickbares Label
- Screen Reader: „Enter your email, Textfeld"
- `autocomplete` hilft Nutzenden mit kognitiven Einschränkungen oder Nicht-Tastatur-Nutzenden (z. B. Smartphone, Sprachsteuerung)

</v-click>

</div>

</div>

<!--
- Placeholder verschwindet beim Tippen → als Label unbrauchbar
- Verknüpfung: `label` mit `for`/`id`; Klick aufs Label fokussiert
- Auch bei Verschachtelung (Input im Label) zusätzlich `for`/`id` setzen – manche assistive Technologien verlassen sich auf die explizite Verknüpfung
- `autocomplete` hilft nicht nur kognitiv, sondern auch Nicht-Tastatur-Nutzenden (Smartphone) und Sprachsteuerung
- Blazor: EditForm + InputText rendern `<input>`, aber KEIN `<label>` – selbst setzen
- FluentUI/MudBlazor: prüfen, ob Label korrekt verknüpft wird
- → Überleitung: ungültige Felder markieren
-->

---
layout: default
audience: [screenreader]
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

<InvalidFieldDemo variant="problem" />

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

<InvalidFieldDemo variant="solution" />

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
audience: [screenreader, keyboard]
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
audience: [screenreader, keyboard]
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
audience: [screenreader, keyboard]
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
