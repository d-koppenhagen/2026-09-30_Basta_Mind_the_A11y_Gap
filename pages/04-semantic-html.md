---
layout: section
---

# Semantisches HTML: Das Fundament

Die richtigen Elemente für den Job verwenden

<!--
- HTML5 gibt uns mächtige Elemente mit eingebauten A11y-Features
- Wir müssen sie nur verwenden!
- → Überleitung: Gleiches Beispiel, aber richtig umgesetzt
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
- Gleiche Funktionalität, richtig umgesetzt:
  - header-Landmark, h1 für Hauptüberschrift
  - nav-Landmark mit echten Links
  - main-Landmark, h2 für Abschnittsüberschrift
  - Label korrekt mit Input verknüpft
  - Echter Button statt div
- [KLICK] Ergebnis:
  - Klare Struktur für Screen Reader
  - Volle Tastatur-Unterstützung
  - Richtige Semantik für Suchmaschinen
  - Keine ARIA-Attribute nötig!
- → Überleitung: Tiefer in spezifische Patterns
-->


---
layout: default
---

# Landmarks & Überschriften

<div class="flex justify-center items-center">
  <img src="/structure.png" alt="Visualisierung einer typischen Seitenstruktur mit Landmarks: header, nav, main, aside und footer" class="max-h-100" />
</div>

<!--
- Typische Seitenstruktur mit Landmarks: header, nav, main, aside, footer
- Screen-Reader-Nutzer springen per Shortcut zwischen Landmarks
- Wie ein Inhaltsverzeichnis für die Seite
-->

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
- LINKS: Alles divs mit Klassen – Screen Reader sehen keine Struktur
- RECHTS: Richtige Landmarks (header, aside, main, footer) + Überschriften-Hierarchie
- [KLICK] Screen-Reader-Nutzer springen per Taste zwischen Landmarks/Überschriften
- Ohne Landmarks: Alles linear durchhören
- Wichtig: Überschriften-Hierarchie nie überspringen!
- → Überleitung: Skip Links als Ergänzung
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
- Skip Links: Tastatur-Nutzer springen direkt zum Hauptinhalt
- Ergänzung zu Landmarks, kein Ersatz!
- Screen-Reader-Nutzer haben bereits Landmark-Navigation
- Primär für sehende Tastatur-Nutzer
- Sinnvoll bei vielen Nav-Items oder komplexem Header
- → Überleitung: Buttons vs Links
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
- Häufigster Fehler: Buttons und Links verwechseln
- LINKS:
  - Div mit onclick: Nicht tastatur-zugänglich, keine Semantik
  - Button für Navigation: Falsches Element
- [KLICK] Screen Reader wissen nicht was die Elemente tun
- RECHTS:
  - [KLICK] Einfache Regel: Button = Aktion, Anchor = Navigation
  - Löst viele Probleme auf einmal!
- → Überleitung: Ausprobieren auf practica11y.dev
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
- Passende Challenges auf practica11y.dev zum Ausprobieren
- Button vs Link: Richtiges Element für den Job wählen
- No Skip Link: Skip Links selbst implementieren
- Heading Chaos: Überschriften-Hierarchie reparieren
- → Überleitung: Tastatur-Navigation und Focus
-->
