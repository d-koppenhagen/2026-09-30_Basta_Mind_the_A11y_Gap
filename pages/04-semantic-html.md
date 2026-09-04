---
layout: section
---

# Semantisches HTML: Das Fundament

Die richtigen Elemente für den Job verwenden

<!--
- HTML5-Elemente bringen A11y-Features eingebaut mit – wir müssen sie nur nutzen
- → Überleitung: gleiches Beispiel, richtig umgesetzt
-->

---
layout: default
---

# Die Lösung: Semantisches HTML

```html
<header>
  <h1>My App</h1>
  <nav>
    <ul>
      <li><a href="/">Home</a></li>
      <li><a href="/products">Products</a></li>
    </ul>
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
- Gleiche Funktion, richtige Elemente – Betonung: KEINE ARIA-Attribute nötig
- Blazor rendert am Ende HTML – Browser kennt kein „Blazor-Element"
- WPF/MAUI-Umsteiger: dort Semantik eingebaut, im Web seid IHR verantwortlich
- → Überleitung: tiefer in spezifische Patterns
-->


---
layout: default
---

# Landmarks & Überschriften

<div class="flex justify-center items-center">
  <img src="/structure.png" alt="Visualisierung einer typischen Seitenstruktur mit Landmarks: header, nav, main, aside und footer" class="max-h-100" />
</div>

<!--
- Landmarks = wie ein Inhaltsverzeichnis der Seite
- SR springt per Shortcut zwischen ihnen
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
    <img src="/structure_landmark.png" alt="Seitenstruktur mit HTML-Landmarks markiert: header, aside, main mit h2, footer" class=""/>
  </div>
</div>

<div class="col-span-5 p-4 bg-blue-500 bg-opacity-10 rounded self-start">
💡 Landmarks erzeugen eine navigierbare Struktur. Screen-Reader-Nutzende können zwischen ihnen springen!
</div>

</div>

<!--
- Ohne Landmarks: alles linear durchhören
- Wichtig: Überschriften-Hierarchie nie überspringen (h1 → h2 → h3)
- → Überleitung: Skip Links als Ergänzung
-->

---
layout: default
---

# Skip Links

<div class="grid grid-cols-[2fr_3fr] gap-4 pb-4">

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
- Nützlich für **Tastatur-Nutzende** um lange Navigation zu überspringen
- Sinnvoll wenn **viele Nav-Items** vor dem Hauptinhalt stehen

<v-click>

<div class="mt-4 p-4 bg-yellow-500 bg-opacity-10 rounded">
⚠️ Mit Bedacht einsetzen: Bei richtigen Landmarks sind Skip Links eine UX-Verbesserung, keine Pflicht.
</div>

</v-click>

<!--
- Primär für sehende Tastatur-Nutzende (SR haben schon Landmark-Navigation)
- → Überleitung: Wie funktioniert das visuelle Verstecken?
-->

---
layout: default
clicks: 7
---

# Visuell versteckte Inhalte – Schritt für Schritt

<div class="grid grid-cols-2 gap-8 mt-2">

<div class="text-sm">

| #                                                                                        | Property               | Effekt                                                                                            |
| ---------------------------------------------------------------------------------------- | ---------------------- | ------------------------------------------------------------------------------------------------- |
| <span :class="{ 'dark:text-green-400 text-green-700 font-bold': $clicks >= 1 }">1</span> | `white-space: nowrap`  | <span :class="{ 'dark:text-green-400 text-green-700': $clicks >= 1 }">Text einzeilig</span>       |
| <span :class="{ 'dark:text-green-400 text-green-700 font-bold': $clicks >= 2 }">2</span> | `padding: 0`           | <span :class="{ 'dark:text-green-400 text-green-700': $clicks >= 2 }">Innenabstand weg</span>     |
| <span :class="{ 'dark:text-green-400 text-green-700 font-bold': $clicks >= 3 }">3</span> | `border: 0`            | <span :class="{ 'dark:text-green-400 text-green-700': $clicks >= 3 }">Rahmen weg</span>           |
| <span :class="{ 'dark:text-green-400 text-green-700 font-bold': $clicks >= 4 }">4</span> | `overflow: hidden`     | <span :class="{ 'dark:text-green-400 text-green-700': $clicks >= 4 }">Überlauf abschneiden</span> |
| <span :class="{ 'dark:text-green-400 text-green-700 font-bold': $clicks >= 5 }">5</span> | `width: 1px`           | <span :class="{ 'dark:text-green-400 text-green-700': $clicks >= 5 }">Breite minimieren</span>    |
| <span :class="{ 'dark:text-green-400 text-green-700 font-bold': $clicks >= 6 }">6</span> | `height: 1px`          | <span :class="{ 'dark:text-green-400 text-green-700': $clicks >= 6 }">Höhe minimieren</span>      |
| <span :class="{ 'dark:text-green-400 text-green-700 font-bold': $clicks >= 7 }">7</span> | `clip-path` + `margin` | <span :class="{ 'dark:text-green-400 text-green-700': $clicks >= 7 }">Final unsichtbar</span>     |

</div>

<div class="mt-10">
  <div class="relative rounded-lg p-4 w-full h-60 flex items-center justify-center bg-gray-200 dark:bg-gray-800">
    <a
      href="#main"
      class="skip-link-demo font-bold text-center rounded no-underline inline-block !text-[#1a1a2e] dark:!text-white"
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


<div v-if="$clicks >= 7" class="mt-4 p-3 bg-green-500 bg-opacity-10 rounded text-sm">
✅ Visuell unsichtbar — aber im DOM & für Screen Reader vorhanden. Bei <code>:focus</code> werden alle Properties zurückgesetzt!
</div>
</div>

</div>


<!--
- Reihenfolge so gewählt, dass jeder Schritt sichtbar etwas verändert
- WICHTIG: display:none / visibility:hidden würden es AUCH für SR verstecken – deshalb der Umweg
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
  <img src="https://i.imgflip.com/ahxldt.jpg" alt="Meme: Button oder Link? – Die ewige Frage der Webentwicklung" attributionsrc="https://i.imgflip.com/ahxldt.jpg" title="made at imgflip.com" class="mt--6 max-h-85"/>
</div>

</div>

<div v-click class="mt-4 p-4 bg-yellow-500 bg-opacity-10 rounded">
💡 <strong>Die <em>primäre Aktion</em> entscheidet!</strong> Formular absenden, dann Redirect → <code>&lt;button&gt;</code>
</div>

<!--
- Grauzone „Speichern, dann navigieren": primäre Aktion entscheidet → Button; Redirect ist nur Nebeneffekt
- Umgekehrt „Zurück zur Übersicht" = primär Navigation = Link
- Blazor: `NavigationManager.NavigateTo()` trotzdem mit `<a href>`; `<NavLink>` rendert korrekt `<a>`
- Für Aktionen `<button @onclick>` – nie `<a>` ohne href
- → Überleitung: Ausprobieren auf practica11y.dev
-->

---
layout: center
class: text-center
---

# Ausprobieren

<ChallengeLinks :challenges="[
  { slug: 'button-vs-link', title: 'Click Bait', highlighted: true },
  { slug: 'no-skip-link', title: 'No Shortcut Home' },
  { slug: 'heading-chaos', title: 'Head Over Levels' },
]" />

<!--
- Challenges auf practica11y.dev, Themen: richtiges Element, Skip Links, Überschriften-Hierarchie
-->

---
layout: challenge
slug: button-vs-link
title: "Challenge: Button vs Link"
---

<!--
- Live-Demo: Button = Aktion, Link = Navigation
-->
