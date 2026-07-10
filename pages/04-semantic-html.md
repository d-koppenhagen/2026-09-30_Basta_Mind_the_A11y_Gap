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

<div class="mt-2 p-4 bg-green-500 bg-opacity-10 rounded">
✅ Semantische Struktur, tastatur-zugänglich, Screen-Reader-freundlich!
</div>

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

<div class="col-span-3 row-span-2 self-start">
  <div class="w-95% ml-5 text-right">
    <img src="/structure_landmark.png" alt="" class=""/>
  </div>
</div>

<div class="col-span-5 p-4 bg-blue-500 bg-opacity-10 rounded self-start">
💡 Landmarks erzeugen eine navigierbare Struktur. Screen-Reader-Nutzer können zwischen ihnen springen!
</div>

</div>

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
.skip-link:not(:focus):not(:active):not(:focus-within) {
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

- **Ergänzung zu Landmarks** – kein Ersatz (Screen Reader haben bereits Landmark-Navigation)!
- Nützlich für **Tastatur-Nutzer** um lange Navigation zu überspringen
- Sinnvoll wenn **viele Nav-Items** vor dem Hauptinhalt stehen

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
- → Überleitung: Wie funktioniert das visuelle Verstecken?
-->

---
layout: default
clicks: 7
---

# Visuell versteckte Inhalte – Schritt für Schritt

<div class="grid grid-cols-2 gap-8 mt-2">

<div class="text-sm">

| # | Property | Effekt |
|---|----------|--------|
| <span :class="{ 'text-green-400 font-bold': $clicks >= 1 }">1</span> | `white-space: nowrap` | <span :class="{ 'text-green-400': $clicks >= 1 }">Text einzeilig</span> |
| <span :class="{ 'text-green-400 font-bold': $clicks >= 2 }">2</span> | `padding: 0` | <span :class="{ 'text-green-400': $clicks >= 2 }">Innenabstand weg</span> |
| <span :class="{ 'text-green-400 font-bold': $clicks >= 3 }">3</span> | `border: 0` | <span :class="{ 'text-green-400': $clicks >= 3 }">Rahmen weg</span> |
| <span :class="{ 'text-green-400 font-bold': $clicks >= 4 }">4</span> | `overflow: hidden` | <span :class="{ 'text-green-400': $clicks >= 4 }">Überlauf abschneiden</span> |
| <span :class="{ 'text-green-400 font-bold': $clicks >= 5 }">5</span> | `width: 1px` | <span :class="{ 'text-green-400': $clicks >= 5 }">Breite minimieren</span> |
| <span :class="{ 'text-green-400 font-bold': $clicks >= 6 }">6</span> | `height: 1px` | <span :class="{ 'text-green-400': $clicks >= 6 }">Höhe minimieren</span> |
| <span :class="{ 'text-green-400 font-bold': $clicks >= 7 }">7</span> | `clip-path` + `margin` | <span :class="{ 'text-green-400': $clicks >= 7 }">Final unsichtbar</span> |

</div>

<div class="flex items-center justify-center">
  <div class="relative bg-gray-800 rounded-lg p-4 w-full h-60 flex items-center justify-center">
    <a
      href="#main"
      class="skip-link-demo text-white font-bold text-center rounded no-underline inline-block"
      :style="{
        whiteSpace: $clicks >= 1 ? 'nowrap' : 'normal',
        padding: $clicks >= 2 ? '0' : '2.5rem 3rem',
        border: $clicks >= 3 ? 'none' : '8px solid #f59e0b',
        overflow: $clicks >= 4 ? 'hidden' : 'visible',
        width: $clicks >= 5 ? '1px' : '200px',
        height: $clicks >= 6 ? '1px' : '80px',
        clipPath: $clicks >= 7 ? 'inset(50%)' : 'none',
        margin: $clicks >= 7 ? '-1px' : '0',
        transition: 'all 0.5s ease',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '1.7rem',
        backgroundColor: '#10b981',
      }"
    >Zum Hauptinhalt springen</a>
  </div>
</div>

</div>

<div v-if="$clicks >= 7" class="mt-2 p-3 bg-green-500 bg-opacity-10 rounded text-sm">
✅ Visuell unsichtbar — aber im DOM & für Screen Reader vorhanden. Bei <code>:focus</code> werden alle Properties zurückgesetzt!
</div>

<!--
- Animation zeigt Schritt für Schritt wie der Skip Link visuell versteckt wird
- Reihenfolge gewählt damit jeder Schritt sichtbare Veränderung zeigt
- white-space: nowrap — Text wird einzeilig
- padding: 0 — Box schrumpft sichtbar
- border: 0 — Rahmen verschwindet
- overflow: hidden — Vorbereitung: Überlauf wird abgeschnitten
- width/height: 1px — Element wird winzig, Text wird geclippt
- clip-path + margin: Letzter Rest verschwindet
- WICHTIG: display:none oder visibility:hidden würden es AUCH für Screen Reader verstecken!
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

**Probleme:**
- Div nicht tastatur-zugänglich
- Button für Navigation genutzt
- Keine semantische Bedeutung

</div>

<div>

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

</div>

<div class="w-95% ml-5 text-right">
  <img src="https://i.imgflip.com/ahxldt.jpg" attributionsrc="https://i.imgflip.com/ahxldt.jpg" title="made at imgflip.com" class="mt--18"/>
</div>

</div>

<div v-click class="mt-4 p-4 bg-yellow-500 bg-opacity-10 rounded">
💡 <strong>Die <em>primäre Aktion</em> entscheidet!</strong> Formular absenden, dann Redirect → <code>&lt;button&gt;</code>
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
- Grauzone: Was ist mit "Speichern" das danach navigiert?
  - Die PRIMÄRE Aktion entscheidet → Speichern = Aktion = Button
  - Navigation danach ist nur Nebeneffekt (programmatischer Redirect)
  - Andersrum: "Zurück zur Übersicht" = primär Navigation = Link
- → Überleitung: Ausprobieren auf practica11y.dev
-->

---
layout: center
class: text-center
---

# Ausprobieren

<ChallengeLinks :challenges="[
  { slug: 'button-vs-link', title: 'Button vs Link' },
  { slug: 'no-skip-link', title: 'No Skip Link' },
  { slug: 'heading-chaos', title: 'Heading Chaos' },
]" />

<!--
- Passende Challenges auf practica11y.dev zum Ausprobieren
- Button vs Link: Richtiges Element für den Job wählen
- No Skip Link: Skip Links selbst implementieren
- Heading Chaos: Überschriften-Hierarchie reparieren
- → Überleitung: Tastatur-Navigation und Focus
-->
