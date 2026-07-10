---
layout: section
---

# Tastatur-Navigation & Focus

Die App ohne Maus benutzbar machen

<!--
Nicht jeder benutzt eine Maus. Manche navigieren ausschließlich mit der Tastatur.

Hier scheitern viele moderne Web-Apps.

Schauen wir uns die häufigsten Probleme an...
-->


---
layout: default
---

# Focus-Outlines: Niemals entfernen!

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

<v-click>

**Ergebnis:**
- Kein sichtbarer Focus-Indikator
- Tastatur-Nutzer sind verloren
- „Wo bin ich auf der Seite?"

</v-click>

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
- `:focus-visible` nur für Tastatur

</v-click>

</div>

</div>

<!--
Das ist eins der schlimmsten Dinge, die man für die Barrierefreiheit tun kann.

LINKS – Problem:
Outlines komplett entfernen. Das sehe ich STÄNDIG.
Entwickler finden es hässlich und entfernen es.

[KLICK]
Ergebnis: Tastatur-Nutzer haben keine Ahnung, wo sie auf der Seite sind.
Stellt euch vor, ihr tabbt durch ein Formular und wisst nicht, in welchem Feld ihr seid!

RECHTS:
[KLICK]
Lösung:
Den Standard-Outline behalten, oder ihn passend zum Design stylen.
focus-visible verwenden, um ihn nur für Tastatur-Nutzer zu zeigen, nicht bei Mausklicks.

Profi-Tipp: Modernes CSS bietet box-shadow für mehr Design-Flexibilität.

Niemals, NIEMALS Focus-Indikatoren komplett entfernen!
-->

---
layout: center
class: text-center
---

# Demo

<a href="https://practica11y.dev/challenges/clickable-div" target="_blank" class="text-2xl pt-10">🎮 Challenge: Div and Conquer</a>
<br>
<a href="https://practica11y.dev/challenges/missing-landmarks" target="_blank" class="text-2xl pt-4">🎮 Challenge: Lost Without a Map</a>

---
layout: default
---

# Verlorener Focus: Die User Experience

<div class="flex justify-center mb--10">
  <img src="/focus-router-wrong.drawio.png" class="w-80%" alt="Vergleich des Focus-Verhaltens in klassischen Multi-Page-Apps vs SPAs" />
</div>

**Probleme:**
- Focus bleibt auf dem Navigations-Link: Verlorener Focus nach Navigation
- Keine Ankündigung des Seitenwechsels, Nutzer wissen nicht, dass sich der Inhalt aktualisiert hat
- Erwartung: Focus am Seitenanfang oder direkt nach der Navigation

<!--
-->

---
layout: default
---

# SPA-Problem: Verlorener Focus nach Navigation

<div class="grid grid-cols-2 gap-4">

<div>

## ❌ Problem

```js
// Nutzer klickt auf "Products"-Link
router.navigate('/products');
// Seiteninhalt ändert sich
// Aber Focus bleibt auf dem Link!
// Screen Reader: "Products, link"
// Nutzer: "Ist etwas passiert?"
```

<v-click>

**Probleme:**
- Verlorener / falscher Focus
- Keine Ankündigung des Seitenwechsels
- Nutzer weiß nicht, dass sich Inhalt aktualisiert hat

</v-click>

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
Das ist ein riesiges Problem in Single Page Applications.

LINKS – Problem:
Nutzer klickt einen Link, Inhalt ändert sich, aber Focus bleibt auf dem alten Link.
Screen-Reader-Nutzer hören nichts – sie wissen nicht, dass sich die Seite geändert hat!

[KLICK]
Das ist verwirrend und bricht das erwartete Verhalten.

RECHTS:
[KLICK]
Lösung:
Nach der Navigation den Focus programmatisch auf den Hauptinhalt verschieben.
tabindex="-1" setzen um es fokussierbar zu machen, dann focus() aufrufen.

Das gibt Screen-Reader-Nutzern sofortiges Feedback, dass sich die Seite geändert hat.

Alternative: Ein Skip-Link-Pattern verwenden, das immer verfügbar ist.

Das ist eins dieser SPA-spezifischen Probleme, die man leicht übersieht!
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

<v-click>

**Probleme:**
- Kein Kontext zur aktuellen Seite
- Browser-Tabs sehen alle gleich aus
- Screen Reader können Seiten nicht unterscheiden
- Schlechtes SEO

</v-click>

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
Ein weiteres häufiges SPA-Problem: Statische Seitentitel.

LINKS – Problem:
Jede Seite hat den gleichen Titel: "My App"

[KLICK]
Probleme:
- Nutzer können nicht erkennen, welcher Tab welcher ist
- Screen Reader kündigen für jede Seite den gleichen Titel an
- Kein Kontext wo man sich befindet
- Suchmaschinen können eure Seiten nicht unterscheiden

RECHTS:
[KLICK]
Lösung:
Den document.title bei jedem Routenwechsel aktualisieren.
Muster: „Seitenname – App-Name"

Das ist so ein einfacher Fix, aber macht einen riesigen Unterschied!

Screen Reader kündigen den Titel an, wenn die Seite lädt.
Nutzer können sehen, welcher Tab welcher ist.
SEO verbessert sich.

Win-win-win!

Jetzt reden wir über Formulare...
-->
