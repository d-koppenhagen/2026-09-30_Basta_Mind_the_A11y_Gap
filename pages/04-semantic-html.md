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
layout: center
class: text-center
---

# Ausprobieren

<a href="https://practica11y.dev/challenges/button-vs-link" target="_blank" class="text-2xl pt-10">🎮 Challenge: Button vs Link</a>
<br>
<a href="https://practica11y.dev/challenges/no-skip-link" target="_blank" class="text-2xl pt-4">🎮 Challenge: No Skip Link</a>
<br>
<a href="https://practica11y.dev/challenges/heading-chaos" target="_blank" class="text-2xl pt-4">🎮 Challenge: Heading Chaos</a>

<!--
- Hier einige passende Challenges auf practica11y.dev zum Ausprobieren
- Button vs Link: Das gerade besprochene Pattern üben
- No Skip Link: Skip Links selbst implementieren
- Heading Chaos: Überschriften-Hierarchie reparieren
-->
