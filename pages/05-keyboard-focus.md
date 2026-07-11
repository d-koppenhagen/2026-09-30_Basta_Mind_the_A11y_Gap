---
layout: section
---

# Tastatur-Navigation & Focus

Die App ohne Maus benutzbar machen

<!--
- Nicht alle benutzen eine Maus
- Manche navigieren ausschließlich mit der Tastatur
- Hier scheitern viele moderne Web-Apps
- → Überleitung: Häufigste Probleme bei Tastatur-Navigation
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
- Eins der schlimmsten Dinge für A11y: Focus-Outlines entfernen
- LINKS: outline:none überall – sieht man leider ständig
- [KLICK] Tastatur-Nutzende wissen nicht, wo sie auf der Seite sind
- RECHTS:
  - [KLICK] Outline behalten oder passend zum Design stylen
  - :focus-visible → nur für Tastatur-Nutzende, nicht bei Mausklick
  - box-shadow als Alternative für mehr Design-Flexibilität
- Niemals Focus-Indikatoren komplett entfernen!
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
- Div and Conquer: Klickbare Divs durch richtige Buttons ersetzen
- Lost Without a Map: Fehlende Landmarks ergänzen
- → Überleitung: Verlorener Focus in SPAs
-->

---
layout: default
clicks: 5
---

# Verlorener Focus: Die User Experience

<SpaFocusDemo />

<!--
- [Initial] SPA-Router lädt den Home-View (lila Rahmen um Router-Outlet)
- [KLICK 1] Home-View fertig geladen
- [KLICK 2] Focus liegt auf <main> – orange Umrandung
- [KLICK 3] Per Tab zum „Kontakt"-Button, Enter
- [KLICK 4] SPA-Router tauscht NUR den Router-View aus – kein Full Reload
- [KLICK 5] Neuer Inhalt da – Focus landet im 2. Formularfeld statt am Seitenanfang!
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
- Riesiges Problem in Single Page Applications
- LINKS: Klick auf Link, Inhalt ändert sich, Focus bleibt auf altem Link
  - [KLICK] Screen-Reader-Nutzende hören nichts, müssen gesamtes Formular erneut durchtabben
- RECHTS:
  - [KLICK] Nach Navigation Focus auf main-Element setzen
  - tabindex="-1" macht es fokussierbar, dann focus() aufrufen
  - Screen Reader kündigt neuen Inhalt sofort an
- SPA-spezifisches Problem – leicht zu übersehen!
- → Überleitung: Seitentitel
-->

---
layout: default
---

# Eindeutige Seitentitel

<div class="grid grid-cols-2 gap-4">

<div>

## ❌ Problem

```html
<!-- Jede Seite -->
<title>
  My App
</title>
```

**Probleme:**
- Kein Kontext zur aktuellen Seite
- Browser-Tabs sehen alle gleich aus
- Screen-Reader-Nutzende können Seiten nicht unterscheiden
- Schlechtes SEO

</div>

<div>

<v-click>

## ✅ Lösung

```js
function updateTitle(pageName) {
  document.title = `${pageName} - My App`;
}
// "Products - My App", "Imprint - My App"
```

**Vorteile:**
- Klarer Seitenkontext
- Unterscheidbare Browser-Tabs
- Screen Reader kündigt Seite an
- Besseres SEO

</v-click>

</div>

</div>

<!--
- Weiteres häufiges SPA-Problem: Statische Seitentitel
- LINKS: Jede Seite heißt "My App"
  - [KLICK] Tabs nicht unterscheidbar, Screen Reader kündigt immer gleichen Titel an
- RECHTS:
  - [KLICK] document.title bei jedem Routenwechsel aktualisieren
  - Muster: „Seitenname – App-Name"
- Einfacher Fix, große Wirkung: Screen Reader, Tabs, SEO
- → Überleitung: Formulare
-->
