---
layout: section
---

# Tastatur-Navigation & Focus

Die App ohne Maus benutzbar machen

<!--
- Viele navigieren nur mit Tastatur – hier scheitern viele moderne Apps
- → Überleitung: häufigste Probleme
-->


---
layout: default
---

# Focus Outlines: Niemals entfernen!

<div class="grid grid-cols-2 gap-4">

<div>

## ❌ Problem

```css
* {
  outline: none;
}


button:focus {
  outline: 0;
}
```

**Ergebnis:**
- Kein sichtbarer Focus-Indikator
- Tastatur-Nutzende sind verloren
- Wo bin ich auf der Seite?

</div>

<div>

<v-click>

## ✅ Lösung

```css
button:focus-visible { /* anpassen */
  outline: 2px solid blue;
  outline-offset: 2px;
}

button:focus-visible { /* Alternative */
  box-shadow: 0 0 0 3px rgba(0, 30, 50, 0.5);
}
```

**Vorteile:**
- Klare Focus-Anzeige
- Tastatur-Navigation möglich
- `:focus-visible` nur bei Tastatur-Nutzung

</v-click>

</div>

</div>

<!--
- `outline: none` sieht man leider ständig – Todsünde
- `:focus-visible` = nur bei Tastatur-Fokus, nicht bei Mausklick (Design bleibt clean)
- box-shadow als Alternative für mehr Design-Flexibilität
- → Überleitung: Ausprobieren
-->

---
layout: center
class: text-center
---

# Ausprobieren

<ChallengeLinks :challenges="[
  { slug: 'clickable-div', title: 'Div and Conquer' },
  { slug: 'missing-landmarks', title: 'Lost Without a Map' },
]" />

<!--
- Challenges: klickbare Divs → Buttons; fehlende Landmarks ergänzen
- → Überleitung: verlorener Focus in SPAs
- SPA = Single Page Application
-->

---
layout: default
clicks: 5
---

# Verlorener Focus: Die User Experience

<SpaFocusDemo />

<!--
- Demo-Ablauf: Router tauscht nur den View, kein Full Reload
- Pointe: Focus landet danach willkürlich (2. Feld) statt am Seitenanfang
- → Überleitung: Wie löst man das?
-->

---
layout: default
---

# SPA-Problem: Verlorener Focus nach Navigation

<div class="grid grid-cols-2 gap-4">

<div>

## ❌ Problem

```js
// Klick auf "Products"-Link
router.navigate('/products');
// Seiteninhalt ändert sich
// Aber Focus bleibt auf dem Link!
// Screen Reader: "Products, link"
// "Ist etwas passiert?"
```

**Probleme:**
- Verlorener / falscher Focus
- Keine Ankündigung des Seitenwechsels
- Unklar, dass sich Inhalt aktualisiert hat

</div>

<div>

<v-click>

## ✅ Lösung

```js
router.navigate('/products'); // Nach Nav

// Focus auf Hauptinhalt verschieben
const main = document.querySelector('main');
main.setAttribute('tabindex', '-1');
main.focus();
```

**Vorteile:**
- Focus bewegt sich zum neuen Inhalt
- Screen Reader kündigt neue Seite an
- Klares Navigations-Feedback

</v-click>

</div>

</div>

<!--
- `tabindex="-1"` macht `main` fokussierbar (nicht per Tab erreichbar), dann `focus()`
- Blazor: betrifft Server UND WebAssembly (WASM); Router tauscht DOM, kümmert sich NICHT um Focus
- Lösung: `FocusOnNavigate`-Komponente (seit .NET 7) oder LocationChanged + JSInterop
- → Überleitung: Seitentitel
-->

---
layout: default
clicks: 1
---

# Eindeutige Seitentitel

<PageTitleDemo />

<!--
- Häufiges SPA-Problem: statischer Titel, SR kündigt bei jedem Wechsel denselben an
- Muster „Seitenname – App-Name" per `document.title`
- Wirkung auf SR, Tabs und SEO
- Blazor: `<PageTitle>`-Komponente (seit .NET 6), kein JS nötig – wird oft vergessen
- → Überleitung: Formulare
-->
