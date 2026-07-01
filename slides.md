---
theme: the-unnamed
title: Mind the A11y Gap - Die häufigsten Fallstricke bei der Umsetzung barrierefreier Webanwendungen
info: |
  ## Mind the A11y Gap: Die häufigsten Fallstricke bei der Umsetzung barrierefreier Webanwendungen

  Barrierefreiheit ist kein Nice-to-have – sie ist essenziell für digitale Erlebnisse, die für alle funktionieren.

  Von Danny Koppenhagen
class: text-center
drawings:
  persist: false
transition: slide-left
mdc: true
duration: 45min
css: unocss
layout: image
image: /bridging-a11y.png
---

<style src="./style.css"></style>


# Mind the A11y Gap
## Die häufigsten Fallstricke bei der Umsetzung barrierefreier Webanwendungen

<div class="abs-br m-6 flex gap-2">
  <a href="https://k9n.dev" target="_blank" alt="Website" title="Website"
    class="text-xl slidev-icon-btn opacity-50 !border-none !hover:text-white">
    <carbon-earth />
  </a>
  <a href="https://github.com/d-koppenhagen" target="_blank" alt="GitHub" title="GitHub"
    class="text-xl slidev-icon-btn opacity-50 !border-none !hover:text-white">
    <carbon-logo-github />
  </a>
  <a href="https://bsky.app/profile/k9n.dev" target="_blank" alt="BlueSky" title="BlueSky"
    class="text-xl slidev-icon-btn opacity-50 !border-none !hover:text-white">
    <carbon-logo-bluesky />
  </a>
</div>

<!--
Willkommen alle zu „Mind the A11y Gap"!

Heute erkunden wir die häufigsten Barrierefreiheits-Fallen in modernen Web-Applikationen und lernen, wie man sie vermeidet.

Dieser Talk behandelt praktische, Framework-agnostische Lösungen, die ihr sofort anwenden könnt.
-->

---
layout: center
---

# Über mich

<div class="flex items-center gap-8 m-t-12">
  <div class="flex flex-col gap-8 content-center items-center justify-center m-t--30 mr-6">
    <img src="/danny.jpeg" class="w-48 h-48 rounded-full" alt="Danny Koppenhagen" />
    <img src="/book-cover-v1m.png" alt="Book Cover of the German book 'Das moderne Praxisbuch zu Angular: Von den Grundlagen bis zur professionellen Entwicklung mit Signals', written by Ferdinand Malcher, Danny Koppenhagen and Johannes Hoppe" class="max-h-30 rounded shadow" />
  </div>
  <div class="leading-8 opacity-80">
    Danny Koppenhagen<br>
    Frontend Architect @ DB Systel GmbH<br>
    <br>
    ♿ Leidenschaftlich für Barrierefreiheit & inklusives Design<br>
    📚 Co-Autor des deutschen Angular-Buchs<br>
    🌐 k9n.dev<br>
  </div>
</div>

<!--
Kurze Vorstellung:
- Ich bin Danny, Frontend Architect bei DB Systel
- Ich arbeite an großen Web-Applikationen für die Deutsche Bahn
- Leidenschaftlich dafür, das Web für alle zugänglich zu machen
- Ich glaube gute Software sollte robust, skalierbar UND inklusiv sein
-->

---
layout: default
---

# Warum Barrierefreiheit wichtig ist

<div class="text-xl pt-4">

- 🌍 **15 % der Weltbevölkerung** haben eine Form von Beeinträchtigung
- 📱 **Alle profitieren** – temporäre Verletzungen, situative Einschränkungen, etc.
- ⚖️ **Es ist Gesetz** – EAA, BFSG & weitere: WCAG-Konformität erforderlich (Juni 2025)
- 💼 **Business-Wert** – größere Zielgruppe, besseres SEO, bessere UX für alle

</div>

<v-click>

<div class="text-xl mt-8 p-4 bg-blue-500 bg-opacity-10 rounded">
💡 Barrierefreiheit ist kein Nice-to-have – sie ist essenziell
</div>

</v-click>

<!--
Warum sollten wir uns um Barrierefreiheit kümmern?

1. 15 % der Menschen weltweit haben eine Form von Behinderung – das sind über 1 Milliarde Menschen
2. Aber es geht nicht nur um dauerhafte Behinderungen – denkt an:
   - Gebrochener Arm (temporär)
   - Baby halten (situativ)
   - Helle Sonne auf dem Bildschirm (umgebungsbedingt)
3. Gesetzliche Anforderungen: European Accessibility Act, deutsches BFSG – Konformität ist Pflicht ab Juni 2025
4. Business Case: Größere Zielgruppe, besseres SEO, und ehrlich gesagt – barrierefreie Apps sind einfach besser für alle

Fazit: Barrierefreiheit ist essenziell, nicht optional.

Schauen wir uns an, was typischerweise schiefgeht...
-->

---
layout: default
---

# UX ❤️ A11y

<div class="grid grid-cols-2 gap-8 items-center">

<div>

- **Gute UX und A11y gehen Hand in Hand**
- Verwirrende Interfaces schaden **allen** – nicht nur Menschen mit Behinderungen
- Barrierefreies Design ist einfach **besseres Design**
- A11y-Probleme sind oft **UX-Probleme** in Verkleidung
- UX fixen verbessert A11y (und umgekehrt)

<v-click>

<div class="mt-6 p-4 bg-pink-500 bg-opacity-10 rounded">
💡 Wenn Nutzer es nicht verstehen, ist es egal wie es aussieht
</div>

</v-click>

</div>

<div class="absolute right-0 top-0 h-full">
  <img src="/ux_fail.jpeg" alt="Verwirrendes Aufzugpanel in einem Hotel: Zwischen zwei Aufzügen sind die Ruftasten rechts am linken Aufzug montiert – unklar welchen Aufzug sie rufen" class="h-full object-cover rounded-l shadow" />
  <div class="absolute top-10 right-8 text-md opacity-90 text-white bg-black/80 px-2 py-1 rounded">
    Wo muss ich drücken? 🤔
  </div>
</div>

</div>

<!--
Bevor wir in die technischen Fallen eintauchen, kurz innehalten.

UX und Barrierefreiheit sind keine getrennten Themen – sie gehen Hand in Hand.

Schaut euch dieses Foto an, das ich in einem Hotel gemacht habe:
- Es gibt ZWEI Aufzüge nebeneinander
- Die Ruftasten sind RECHTS am LINKEN Aufzug montiert
- Welchen Aufzug rufen sie also? Den linken (neben den Tasten) oder den rechten (in dessen Richtung die Tasten zeigen)?

Das ist ein klassisches UX-Versagen – und es betrifft alle:
- Sehende müssen raten
- Menschen mit kognitiven Einschränkungen sind verwirrt
- Menschen mit Sehbehinderung können es auch nicht leicht herausfinden

Die Lektion: Wenn etwas verwirrend oder unintuitiv ist, ist es SOWOHL ein UX-Problem ALS AUCH ein A11y-Problem.

Gute Barrierefreiheit bedeutet meist gute UX. Und gute UX bedeutet meist gute Barrierefreiheit.

Denkt also bei den folgenden Fallen daran: Wir bauen nicht nur für „Nutzer mit Behinderungen" – wir bauen für alle.
-->

---
layout: section
---

# The Gap: Häufige Fallen

Was schiefgeht und warum

<!--
Reden wir über „The Gap" – die Lücke zwischen dem, was wir bauen wollen, und dem, was wir tatsächlich in Sachen Barrierefreiheit liefern.

Ich zeige euch einige Praxisbeispiele häufiger Fehler.

Bei jedem will ich, dass ihr denkt: „Kann ich das Problem erkennen?"
-->

---
layout: default
---

# Code Review: Findet die Probleme

<div class="grid grid-cols-5 gap-4">

<div class="col-span-3">

```html
<div class="header">
  <div class="headline">My App</div>
  <div class="nav">
    <div onclick="goToHome()">Home</div>
    <div onclick="goToProducts()">Products</div>
  </div>
</div>
<div class="content">
  <div class="title">Welcome</div>
  <div class="form">
    <input type="text" placeholder="Enter your name" />
    <div class="button" onclick="submit()">Submit</div>
  </div>
</div>
```

<v-click>

<div class="mt-4 p-4 bg-red-500 bg-opacity-10 rounded">
❌ Dieser Code hat mindestens 7 Barrierefreiheits-Probleme!
</div>

</v-click>

</div>

<div class="col-span-2">
  <div class="w-95% ml-5 text-right">
    <img src="/a11y_dept_everywhere.jpg" attributionsrc="https://i.imgflip.com/ahxlzv.jpg" title="made at imgflip.com" class="mt-7"/>
  </div>
</div>

</div>



<!--
Machen wir zusammen ein Code Review. Das ist echter Code, den ich in Produktion gesehen habe.

[KLICK durch Highlights]
- Zeile 2: "headline" als div – keine semantische Überschrift
- Zeile 3: "nav" – ein div, kein nav-Element
- Zeile 5: Klickbare divs statt Buttons oder Links
- Zeile 10: Ein Formular komplett aus divs gebaut
- Und mehr...

[LETZTER KLICK]
Dieser Code hat mindestens 7 schwerwiegende A11y-Probleme!

Kann jemand einige davon erkennen?
[PAUSE für Publikumsinteraktion]

Schauen wir uns an, was falsch ist und wie wir es fixen...
-->


---
layout: image
image: /soup_div.png
---

<!--
Bildnotiz: Generiert mit ChatGPT
-->

---
layout: default
transition: slide-up
---

# Was ist falsch?

<v-clicks>

1. ❌ Kein semantisches HTML – alles ist ein `<div>`
2. ❌ Keine Landmarks (`<header>`, `<nav>`, `<main>`)
3. ❌ Klickbare divs statt `<button>` oder `<a>`
4. ❌ Keine Überschriften-Struktur (`<h1>`, `<h2>`, etc.)
5. ❌ Fehlende Formular-Labels
6. ❌ Placeholder als Label (schlechte Praxis!)
7. ❌ Keine Tastatur-Unterstützung (onclick auf divs)

</v-clicks>

<v-click>

<div class="mt-2 p-4 bg-yellow-500 bg-opacity-10 rounded">
⚠️ Screen Reader können diese Struktur nicht verstehen<br>
⚠️ Tastatur-Nutzer können nicht navigieren<br>
⚠️ Suchmaschinen können sie nur schlecht indexieren
</div>

</v-click>

<!--
Hier ist, was an dem Code falsch ist:

[DURCH JEDEN PUNKT GEHEN]

Das Ergebnis?
- Screen Reader sehen nur eine flache Liste von Text – keine Struktur, keine Navigation
- Tastatur-Nutzer können nicht durch die Seite tabben
- Selbst Suchmaschinen haben Schwierigkeiten zu verstehen, was wichtig ist

Das nenne ich „div-Suppe" – und es kommt überraschend häufig vor.

Schauen wir uns an, wie man es richtig macht...
-->


---
layout: section
---

# Semantisches HTML: Das Fundament

Die richtigen Elemente für den Job verwenden

<!--
Das Fundament der Barrierefreiheit ist semantisches HTML.

HTML5 gibt uns mächtige Elemente mit eingebauten A11y-Features.

Wir müssen sie nur verwenden!

Schauen wir uns das gleiche Beispiel an, aber richtig umgesetzt...
-->


---
layout: default
transition: slide-up
---

# Die Lösung: Semantisches HTML

```html
<header>
  <h1>My App</h1>
  <nav>
    <a href="/">Home</a>
    <a href="/products">Products</a>
  </nav>
</header>
<main>
  <h2>Welcome</h2>
  <form>
    <label for="name">Enter your name</label>
    <input type="text" id="name" placeholder="e. g. John Doe" />
    <button type="submit">Submit</button>
  </form>
</main>
```

<v-click>

<div class="mt-2 p-4 bg-green-500 bg-opacity-10 rounded">
✅ Semantische Struktur, tastatur-zugänglich, Screen-Reader-freundlich!
</div>

</v-click>

<!--
Hier ist die gleiche Funktionalität, aber richtig umgesetzt:

[KLICK durch Highlights]
- Zeile 1: Richtiges header-Landmark
- Zeile 2: H1 für die Hauptüberschrift
- Zeilen 3-6: nav-Landmark mit echten Links
- Zeile 9: main-Landmark für den Hauptinhalt
- Zeile 10: H2 für Abschnittsüberschrift (richtige Hierarchie)
- Zeilen 11-12: Label korrekt mit Input verknüpft
- Button ist ein echter Button

[LETZTER KLICK]
Jetzt haben wir:
- Klare Struktur für Screen Reader
- Volle Tastatur-Unterstützung (Links und Buttons sind fokussierbar)
- Richtige Semantik für Suchmaschinen
- Und wir brauchten keine ARIA-Attribute!

Gehen wir tiefer in spezifische Patterns...
-->


---
layout: default
---

# Landmarks & Überschriften

<div class="flex justify-center items-center">
  <img src="/structure.png" alt="Visualisierung einer typischen Seitenstruktur mit Landmarks: header, nav, main, aside und footer" class="max-h-100" />
</div>

---
layout: default
---

# Landmarks & Überschriften

<div class="grid grid-cols-8 gap-4">

<div class="col-span-3">

## ❌ Problem

```html
<div class="header">...</div>
<div class="sidebar">...</div>
<div class="content">
  <div class="title">Featured</div>
</div>
<div class="footer">...</div>
```

</div>

<div class="col-span-2">

## ✅ Lösung

```html
<header>...</header>
<aside>...</aside>
<main>
  <h2>Featured</h2>
</main>
<footer>...</footer>
```

</div>

<div class="col-span-3">
  <div class="w-95% ml-5 text-right">
    <img src="/structure_landmark.png" alt="" class=""/>
  </div>
</div>

</div>

<v-click>

<div class="mt-4 p-4 bg-blue-500 bg-opacity-10 rounded">
💡 Landmarks erzeugen eine navigierbare Struktur. Screen-Reader-Nutzer können zwischen ihnen springen!
</div>

</v-click>

<!--
Landmarks und Überschriften erzeugen die navigierbare Struktur eurer Seite.

LINKS – Problem:
Alles divs mit Klassen. Screen Reader sehen keine Struktur.

RECHTS – Lösung:
Richtige Landmarks: header, aside, main, footer
Richtige Überschriften-Hierarchie: h1 für Seitentitel, h2 für Abschnitte

[KLICK]
Warum das wichtig ist:
Screen-Reader-Nutzer können per Taste zwischen Landmarks oder Überschriften springen.
Es ist wie ein Inhaltsverzeichnis für eure Seite!

Ohne das müssen sie ALLES linear durchhören.

Wichtig: Die Überschriften-Hierarchie muss korrekt sein – niemals Ebenen überspringen!
-->

---
layout: default
---

# Skip Links

<div class="grid grid-cols-2 gap-4">

<div>

```html
<body>
  <a href="#main" class="skip-link">
    Zum Hauptinhalt springen
  </a>
  <header>...</header>
  <nav>...</nav>
  <main id="main" tabindex="-1">
    <!-- Hauptinhalt -->
  </main>
</body>
```

</div>

<div>

```css
.skip-link:not(:focus, :focus-within) {
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip-path: inset(50%);
  white-space: nowrap;
  border: 0;
}
```

</div>

</div>

<v-clicks>

- **Ergänzung zu Landmarks** – kein Ersatz (Screen Reader haben bereits Landmark-Navigation)!
- Nützlich für **Tastatur-Nutzer** um lange Navigation zu überspringen
- Sinnvoll wenn **viele Nav-Items** vor dem Hauptinhalt stehen

</v-clicks>

<v-click>

<div class="mt-4 p-4 bg-yellow-500 bg-opacity-10 rounded">
⚠️ Mit Bedacht einsetzen: Bei richtigen Landmarks sind Skip Links eine UX-Verbesserung, keine Pflicht.
</div>

</v-click>

<!--
Skip Links erlauben Tastatur-Nutzern, direkt zum Hauptinhalt zu springen.

Aber: Wenn ihr richtige Landmarks habt, können Screen-Reader-Nutzer bereits mit Shortcuts navigieren.

Skip Links sind primär für sehende Tastatur-Nutzer, die keine Landmark-Navigation verwenden können.

Nutzt sie wenn:
- Ihr viele Navigations-Items habt
- Euer Header komplex ist mit vielen interaktiven Elementen

Verlasst euch nicht auf Skip Links als Ersatz für richtige Landmarks!
-->

---
layout: default
---

# Buttons vs Links

<div class="grid grid-cols-3 gap-4">

<div>

## ❌ Problem

```html
<div onclick="save()">
  Save
</div>

<button onclick="navigate()">
  Go to Products
</button>
```

<v-click>

**Probleme:**
- Div nicht tastatur-zugänglich
- Button für Navigation genutzt
- Keine semantische Bedeutung

</v-click>

</div>

<div>

<v-click>

## ✅ Lösung

```html
<button onclick="save()">
  Save
</button>

<a href="/products">
  Go to Products
</a>
```

**Regel:**
- `<button>` für Aktionen
- `<a>` für Navigation

</v-click>

</div>

<div class="w-95% ml-5 text-right">
  <img src="https://i.imgflip.com/ahxldt.jpg" attributionsrc="https://i.imgflip.com/ahxldt.jpg" title="made at imgflip.com" class="mt--10"/>
</div>

</div>

<!--
Einer der häufigsten Fehler: Buttons und Links verwechseln.

LINKE SEITE – Das Problem:
- Div mit onclick: Nicht tastatur-zugänglich, keine semantische Bedeutung
- Button für Navigation: Falsches Element für den Job

[KLICK]
Probleme: Screen Reader wissen nicht, was diese tun, Tastatur-Nutzer erreichen das div nicht

RECHTE SEITE:
[KLICK]
Die Lösung ist einfach:
- Button für Aktionen verwenden (speichern, absenden, umschalten)
- Anchor für Navigation verwenden (zu einer anderen Seite gehen)

Diese einfache Regel löst so viele Probleme!
-->

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

<StorybookLink story="01-semantic-html" />

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

---
layout: section
---

# Live Regions & Dynamische Inhalte

Änderungen für Screen-Reader-Nutzer ankündigen

<!--
Moderne Apps sind dynamisch – Inhalte ändern sich ohne Seitenneuladen.

Aber Screen Reader kündigen diese Änderungen nicht automatisch an.

Hier kommen ARIA Live Regions ins Spiel.

Und hier wird es knifflig...
-->

---
layout: default
---

# Das Live-Region-Problem

<div class="grid grid-cols-2 gap-4">

<div>

## ❌ Problem

```js
// Benachrichtigung hinzufügen
function showNotification(msg) {
  const div = document.createElement('div');
  div.setAttribute('aria-live', 'polite');
  div.textContent = msg;
  // Live Region wird NACH dem
  // initialen Laden hinzugefügt
  document.body.appendChild(div);
}
```

<v-click>

**Probleme:**
- Element NACH aria-live erstellt
- Screen Reader verpassen es!
- Stiller Fehler – keine Ankündigung

</v-click>

</div>

<div>

<v-click>

## ✅ Lösung: Globale Live Region

```html
<!-- Im HTML, immer vorhanden -->
<div class="sr-only" id="announcer"
  aria-live="polite" aria-atomic="true"
></div>
```

```js
function announce(msg) { // Inhalt aktualisieren
  document.getElementById('announcer')
    .textContent = msg;
}
```

**Vorteile:**
- Live Region existiert vor dem Update
- Zuverlässige Ankündigungen
- Funktioniert in allen Screen Readern

</v-click>

</div>

</div>

<!--
Das ist eins der kniffligsten A11y-Probleme in SPAs.

LINKS – Problem:
Ein Element erstellen und gleichzeitig aria-live setzen.
Sieht aus als sollte es funktionieren, oder?

[KLICK]
Falsch! Screen Reader brauchen das aria-live-Element BEVOR sich der Inhalt ändert.
Wenn man es dynamisch erstellt, verpassen sie es. Stiller Fehler.

RECHTS:
[KLICK]
Lösung: Globales Live-Region-Pattern.
Eine persistente, leere Live Region im HTML erstellen.
Wenn ihr etwas ankündigen müsst, einfach den Inhalt aktualisieren.

Das ist das zuverlässige Pattern, das in allen Screen Readern funktioniert.

Aber es gibt noch einen anderen Ansatz...
-->

---
layout: default
---

# Globale vs Lokale Live Regions

<div class="grid grid-cols-2 gap-4">

<div>

## Globales Pattern

```html
<!-- Globaler einzelner Announcer -->
<div id="announcer" class="sr-only"
  aria-live="polite">
</div>
```

```js
announce("Artikel zum Warenkorb hinzugefügt");
announce("Formular gespeichert");
announce("3 neue Nachrichten");
```

**Verwenden wenn:**
- Toast-Benachrichtigungen
- Status-Meldungen
- Globale Ankündigungen

</div>

<div>

## Lokales Pattern

```html
<!-- Live Region in Komponente -->
<div class="chat">
  <div aria-live="polite" aria-atomic="false">
    <div>Erste Nachricht von Jane</div>
    <!-- Neue Nachrichten hier -->
    <div>Neue Nachricht von John</div>
  </div>
</div>
```

**Verwenden wenn:**
- Chat-Nachrichten
- Live-Feeds
- Komponentenspezifische Updates

</div>

</div>

<v-click>

<div class="mt-2 p-4 bg-blue-500 bg-opacity-10 rounded">
💡 Schlüssel: Live Region muss BEVOR sich Inhalte ändern existieren!
</div>

</v-click>

<!--
Zwei Patterns für Live Regions:

LINKS – Globales Pattern:
Ein einzelner Announcer für die gesamte App.
Perfekt für Toast-Benachrichtigungen, Status-Meldungen, globale Ankündigungen.
Einfach zu implementieren und zu pflegen.

RECHTS – Lokales Pattern:
Live Region innerhalb einer bestimmten Komponente.
Perfekt für Chat-Nachrichten, Live-Feeds, komponentenspezifische Updates.
Die Live Region ist Teil der Komponentenstruktur.

[KLICK]
Die entscheidende Regel für beide: Die Live Region muss im DOM existieren, BEVOR ihr ihren Inhalt aktualisiert.

Das ist das Geheimnis für zuverlässige Screen-Reader-Ankündigungen.
-->

---
layout: default
---

# ARIA Live Attribute

```html
<div aria-live="polite" aria-atomic="true" aria-relevant="additions text">
  Inhalt wird hier aktualisiert
</div>
```

<v-clicks>

- **aria-live="polite"** – Ankündigen wenn Nutzer untätig ist (häufigster Fall)
- **aria-live="assertive"** – Sofort ankündigen (sparsam verwenden!)
- **aria-atomic="true"** – Gesamte Region vorlesen (vs nur Änderungen)
- **aria-atomic="false"** – Nur Änderungen vorlesen (gut für Listen)
- **aria-relevant** – Welche Änderungen ankündigen (additions, removals, text, all)

</v-clicks>

<v-click>

<div class="mt-4 p-4 bg-yellow-500 bg-opacity-10 rounded">
⚠️ Assertive sparsam verwenden – es unterbricht den Nutzer!
</div>

</v-click>

<!--
Kurzreferenz für ARIA Live Attribute:

[DURCH JEDEN KLICK GEHEN]

aria-live="polite": Warten bis Nutzer fertig ist, dann ankündigen. Das verwenden in 99% der Fälle.

aria-live="assertive": Sofort unterbrechen. Nur für kritische Alerts wie „Eure Sitzung läuft ab!"

aria-atomic="true": Die gesamte Region vorlesen. Gut für Status-Meldungen.

aria-atomic="false": Nur vorlesen was sich geändert hat. Gut für Chat-Nachrichten oder Listen.

aria-relevant: Steuern, was Ankündigungen auslöst.

[LETZTER KLICK]
Warnung: Assertive nicht übermäßig verwenden! Es ist als würde jemand schreien, während man versucht zu lesen.
Sehr nervig und desorientierend.

Polite ist fast immer die richtige Wahl.

Jetzt decken wir schnell visuelle Barrierefreiheit ab...
-->

---
layout: section
---

# Visuelle Barrierefreiheit

Farbkontrast und Medien-Alternativen

<!--
Wir haben uns viel auf Screen Reader und Tastatur-Nutzer konzentriert.

Aber visuelle Barrierefreiheit ist auch wichtig!

Decken wir die Grundlagen schnell ab...
-->


---
layout: default
---

# Farbkontrast

<div class="grid grid-cols-2 gap-4">

<div>

## ❌ Problem

```css
/* Hellgrau auf Weiß */
.text {
  color: #999999;
  background: #FFFFFF;
}
/* Kontrastverhältnis: 2.85:1 */
```

<div class="mt-4 p-4" style="color: #999999; background: #FFFFFF; border: 1px solid #ccc;">
Dieser Text ist schwer lesbar
</div>

</div>

<div>

## ✅ Lösung

```css
/* Dunkelgrau auf Weiß */
.text {
  color: #595959;
  background: #FFFFFF;
}
/* Kontrastverhältnis: 7:1 */
```

<div class="mt-4 p-4" style="color: #595959; background: #FFFFFF; border: 1px solid #ccc;">
Dieser Text ist gut lesbar
</div>

</div>

</div>

<v-clicks>

**WCAG-Anforderungen:**
- **Level AA:** 4,5:1 für normalen Text, 3:1 für großen Text
- **Level AAA:** 7:1 für normalen Text, 4,5:1 für großen Text

**Tools:** Chrome DevTools, WebAIM Contrast Checker, Stark

</v-clicks>

<!--
Farbkontrast ist kritisch für Nutzer mit Sehbehinderung oder Farbenblindheit.

LINKS – Problem:
Hellgrau auf Weiß. Sieht modern und minimalistisch aus, aber...
Kontrastverhältnis ist nur 2,85:1 – fällt bei WCAG durch!

RECHTS – Lösung:
Dunkleres Grau auf Weiß. Sieht immer noch gut aus, aber lesbar.
Kontrastverhältnis ist 7:1 – besteht AAA!

[KLICKS]
WCAG-Anforderungen:
- Level AA (Minimum): 4,5:1 für normalen Text
- Level AAA (erweitert): 7:1 für normalen Text
- Großer Text hat niedrigere Anforderungen

Tools zum Prüfen:
- Chrome DevTools hat einen eingebauten Kontrast-Checker
- WebAIM hat ein Online-Tool
- Stark-Plugin für Figma/Sketch

Profi-Tipp: Prüft eure Design-System-Farben früh!
-->

---
layout: default
---

# Medien-Alternativen

<div class="flex gap-4">

<div class="w-[70%]">

<v-click>

## Bilder

```html
<!-- Informatives Bild -->
<img src="angular-buch.png"
     alt="Book Cover of the German book 'Das moderne Praxisbuch zu Angular: Von den Grundlagen bis zur professionellen Entwicklung mit Signals', written by Ferdinand Malcher, Danny Koppenhagen and Johannes Hoppe" />

<!-- Dekoratives Bild -->
<img src="decoration.png" alt="" />

<!-- Komplexes Bild -->
<img src="diagram.png" alt="Systemarchitektur"
     aria-describedby="diagram-desc" />
<div id="diagram-desc">
  Detaillierte Beschreibung der Architektur...
</div>
```

</v-click>

</div>

<div class="w-[30%]">

<v-switch>
  <template #1>

## ❌ Problem

<img src="https://foo.bar/INVALID.png" class="h-70 w-55 rounded shadow border-1" />

  </template>
  <template #2>

## ✅ Korrekt

<img src="/book-cover-v1m.png" alt="Book Cover of the German book 'Das moderne Praxisbuch zu Angular: Von den Grundlagen bis zur professionellen Entwicklung mit Signals', written by Ferdinand Malcher, Danny Koppenhagen and Johannes Hoppe" class="max-h-70 rounded shadow" />

   </template>
</v-switch>

</div>

</div>

<!--
Medien-Alternativen sind essenziell für Nutzer, die Inhalte nicht sehen oder hören können.

Bilder:
- Informative Bilder: Beschreiben was das Bild vermittelt
- Dekorative Bilder: Leerer Alt-Text (alt="") damit Screen Reader es überspringen
- Komplexe Bilder: aria-describedby für längere Beschreibungen verwenden

[KLICK] Hier sehen wir ein Bild mit einer ungültigen URL – der Browser zeigt ein Broken-Image-Icon.
[KLICK] Nach dem Korrigieren der URL lädt das Buchcover korrekt.

Faustregel: Wenn das Entfernen des Bildes/Videos Informationen verlieren würde, braucht ihr eine Alternative.
-->

---
layout: default
---

# Medien-Alternativen

## Videos

```html
<video controls>
  <source src="tutorial.mp4" type="video/mp4" />
  <track kind="captions" src="captions.vtt" srclang="en" label="English" />
  <track kind="descriptions" src="descriptions.vtt" srclang="en" />
</video>
```

<!--
Medien-Alternativen sind essenziell für Nutzer, die Inhalte nicht sehen oder hören können.

[KLICK]
Videos:
- Immer Untertitel für gehörlose Nutzer bereitstellen
- Audiobeschreibungen für blinde Nutzer in Betracht ziehen
- Das track-Element mit WebVTT-Dateien verwenden

Faustregel: Wenn das Entfernen des Bildes/Videos Informationen verlieren würde, braucht ihr eine Alternative.

Jetzt reden wir über reduzierte Bewegung und visuelle Präferenzen...
-->

---
layout: default
---

# Reduzierte Bewegung

<div class="grid grid-cols-2 gap-4">

<div>

```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}
```

</div>

<div>

<v-clicks>

- Manche Nutzer erleben **Bewegungskrankheit** durch Animationen
- Die OS-Präferenz per Media Query respektieren
- Einfach umzusetzen, große Wirkung

</v-clicks>

</div>

</div>

<!--
Reduzierte Bewegung wird oft übersehen, ist aber wichtig.

Manche Nutzer werden schwindelig oder übel von Animationen und Transitions.
Moderne Betriebssysteme lassen Nutzer eine „Bewegung reduzieren"-Präferenz setzen.
Wir können das mit einer einfachen Media Query respektieren.

Das ist einer der einfachsten A11y-Gewinne, die ihr erzielen könnt!
-->

---
layout: image
image: /testing.jpg
---

# Testen & Tools

Barrierefreiheit verifizieren

<!--
Was man nicht misst, kann man nicht verbessern.

Schauen wir uns die wichtigsten Tools zum Testen von Barrierefreiheit an.

Ich halte es kurz, da wir knapp an Zeit sind...
-->

---
layout: default
---

# Wichtige Test-Tools

<v-clicks>

## Automatisiertes Testen
- **axe DevTools** (Chrome/Firefox-Erweiterung) – findet ~30–40 % der Probleme
- **Lighthouse** (in Chrome eingebaut) – Accessibility-Audit
- **WAVE** (WebAIM) – visuelles Feedback-Overlay

## Manuelles Testen
- **Nur Tastatur** – Maus abstöpseln, versucht eure App zu benutzen!
- **Screen Reader** – VoiceOver (Mac), NVDA (Windows, kostenlos), JAWS (Windows)
- **Auf 200 % zoomen** – funktioniert euer Layout noch?

## Browser DevTools
- **Accessibility Tree** – sehen was assistive Technologien sehen
- **Contrast Checker** – Farbverhältnisse prüfen
- **Lighthouse** – automatisiertes Audit

</v-clicks>

<!--
Barrierefreiheit testen erfordert sowohl automatisierte Tools als auch manuelles Testen.

[KLICK]
Automatisierte Tools:
- axe DevTools: Beste Browser-Erweiterung, findet viele Probleme
- Lighthouse: In Chrome eingebaut, gibt euch einen Score
- WAVE: Visuelles Overlay das Probleme zeigt

Aber automatisierte Tools finden nur 30–40 % der Probleme!

[KLICK]
Manuelles Testen ist essenziell:
- Nur Tastatur: Maus abstöpseln und versuchen, die App zu benutzen
- Screen Reader: Wirklich mit VoiceOver oder NVDA testen
- Zoom: Sicherstellen, dass das Layout bei 200 % Zoom funktioniert

[KLICK]
Browser DevTools:
- Accessibility Tree zeigt was Screen Reader sehen
- Contrast Checker eingebaut in Chrome
- Lighthouse für schnelle Audits

Mit automatisierten Tools anfangen, aber nicht dabei aufhören!

Fassen wir zusammen...
-->

---
layout: center
class: text-center
---

# Wichtigste Erkenntnisse

<div class="mt-4 p-4">
<v-clicks>

1. 🏗️ **Semantisches HTML verwenden** – das ist 80 % der Lösung
2. ⌨️ **Mit Tastatur testen** – wenn man es nicht benutzen kann, ist es kaputt
3. 🎯 **Focus-Management** – besonders in SPAs
4. 📝 **Formulare brauchen Labels** – und richtige Fehlerbehandlung
5. 📢 **Live Regions** – müssen vor Updates existieren
6. 🎨 **Kontrast ist wichtig** – Farben prüfen
7. 🧪 **Testen, testen, testen** – automatisiert + manuell

</v-clicks>
</div>

<v-click>

<div class="mt-8 p-4 bg-green-500 bg-opacity-10 rounded">
💚 Barrierefreiheit ist kein Feature – sie ist eine grundlegende Anforderung
</div>

</v-click>

<!--
Fassen wir mit den wichtigsten Erkenntnissen zusammen:

[DURCH JEDEN KLICK GEHEN]

1. Semantisches HTML löst die meisten Probleme – die richtigen Elemente verwenden!
2. Tastatur-Testen ist essenziell – Maus abstöpseln
3. Focus-Management in SPAs – Focus nach Navigation verschieben
4. Formulare brauchen richtige Labels und Fehlerbehandlung
5. Live Regions müssen existieren bevor man sie aktualisiert
6. Farbkontrast prüfen – leicht zu fixen
7. Mit automatisierten Tools UND manuell testen

[LETZTER KLICK]
Denkt daran: Barrierefreiheit ist kein Feature, das man am Ende hinzufügt.
Es ist eine grundlegende Anforderung für Software, die für alle funktioniert.

Klein anfangen, aber heute anfangen!
-->

---
layout: default
---

# Ressourcen

<div class="grid grid-cols-2 gap-8">

<div>

## Weiterlernen
- [WCAG-Richtlinien](https://www.w3.org/WAI/WCAG21/quickref/)
- [MDN Accessibility](https://developer.mozilla.org/en-US/docs/Web/Accessibility)
- [WebAIM](https://webaim.org/)
- [A11y Project](https://www.a11yproject.com/)

## Tools
- [axe DevTools](https://www.deque.com/axe/devtools/)
- [WAVE](https://wave.webaim.org/)
- [Contrast Checker](https://webaim.org/resources/contrastchecker/)

</div>

<div>

## Meine Inhalte

- 📝 [Blog: k9n.dev](https://k9n.dev)
- 🐦 [BlueSky: @k9n.dev](https://bsky.app/profile/k9n.dev)
- 💼 [LinkedIn](https://linkedin.com/in/d-koppenhagen)

## Dieser Talk

- 📊 Slides: [github.com/d-koppenhagen/...](https://github.com/d-koppenhagen)
- 💬 Fragen? Sprecht mich an!

</div>

</div>

<!--
Hier sind Ressourcen um eure Barrierefreiheits-Reise fortzusetzen:

LINKE SEITE:
- WCAG-Richtlinien: Die offizielle Spezifikation
- MDN: Tolle praxisnahe Anleitungen
- WebAIM: Exzellente Artikel und Tools
- A11y Project: Community-getriebene Ressourcen

Tools die wir heute besprochen haben

RECHTE SEITE:
Meine Inhalte falls ihr folgen oder mich erreichen wollt
Und diese Slides werden auf GitHub verfügbar sein

Fragen?
-->

---
layout: end
---

# Danke! 🙏

## Fragen?

<div class="mt-8 flex items-center justify-center gap-8">
  <div>
    <a href="https://github.com/d-koppenhagen/2026-02-11-Mind_the_A11y_Gap" target="_blank">
      <img src="/qr-github.png" alt="QR-Code zum GitHub-Repository" class="w-48 h-48" />
    </a>
    <p class="text-sm mt-2">Slides & Code</p>
  </div>
  <div>
    Danny Koppenhagen<br>
    <a href="https://k9n.dev">k9n.dev</a>
  </div>
</div>

<!--
Vielen Dank für eure Aufmerksamkeit!

Ich hoffe, das gibt euch einen guten Startpunkt um Barrierefreiheit in euren Projekten zu verbessern.

Denkt daran: Klein anfangen, aber heute anfangen.

Jede Verbesserung macht das Web inklusiver.

Fragen?
-->
