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

# Landmarks

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

# Landmarks

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
- Landmarks (header/nav/main/aside/footer) = navigierbare Struktur, SR springt per Shortcut
- → Überleitung: Skip Links als Ergänzung
-->

---
layout: default
clicks: 8
---

# Skip Links

<SkipLinkDemo class="mt-2" />

<div class="mt-7">
<strong>Ergänzung zu Landmarks</strong>, kein Ersatz &middot; hilft <strong>sehenden Tastatur-Nutzenden</strong>, lange Navigation zu überspringen
</div>

<!--
- Skip Link = Sprung an den Hauptinhalt, primär für sehende Tastatur-Nutzende (SR haben schon Landmark-Navigation)
- Sinnvoll v. a. wenn viele Nav-Items vor dem Hauptinhalt stehen; bei sauberen Landmarks UX-Plus, keine Pflicht
- Demo links: Skip-Link startet voll sichtbar über der langen Hauptnavigation
- Rechts wächst die CSS-Klasse Zeile für Zeile – links schrumpft der Link synchron mit
- WICHTIG: display:none / visibility:hidden würden ihn AUCH für SR verstecken – deshalb dieser Umweg (im DOM bleiben!)
- Letzter Klick: :focus setzt alles zurück → Link wird sichtbar & klickbar, Sprung ins <main>
- `main` braucht `tabindex="-1"`, damit der Sprung den Fokus wirklich dorthin setzt
- → Überleitung: Überschriften-Hierarchie
-->

---
layout: default
---

# Überschriften-Hierarchie

<div class="grid grid-cols-2 gap-8">

<div>

## ❌ Problem

```html
<h1>Shop</h1>
<h4>Angebote</h4>   <!-- Ebene übersprungen -->
<h2>Kategorie</h2>
<div class="title">Neu</div>  <!-- gar keine Überschrift -->
```

</div>

<div>

## ✅ Lösung

```html
<h1>Shop</h1>
  <h2>Kategorie</h2>
    <h3>Angebote</h3>
    <h3>Neu</h3>
```

</div>

</div>

<div class="mt-5 mb-10 p-2 bg-blue-500 bg-opacity-10 rounded text-sm">
💡 Nie Ebenen überspringen (h1 → h2 → h3). Die Hierarchie ist das Inhaltsverzeichnis für Screen Reader.
</div>

<FutureFeature title="headingoffset & headingreset" status="experimental" href="https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Global_attributes/headingoffset">

<code>headingoffset</code> verschiebt die Ebene von Nachfahren (kumulativ), <code>headingreset</code> stoppt die Vererbung von oben — ideal für <strong>eingebettete Widgets</strong> oder User-Generated-Content, die intern bei <code>h1</code> starten.

</FutureFeature>

<!--
- Kernregel: Ebenen NIE überspringen (h1 → h2 → h3), genau eine h1 pro Seite/Dokument
- Screen Reader baut daraus die Gliederung (Überschriften-Navigation per Shortcut)
- Häufiger Fehler: Ebene nach Optik statt nach Struktur wählen → stattdessen per CSS stylen
- headingoffset: verschiebt Nachfahren-Ebene, ohne die Elemente zu ändern; Offsets über verschachtelte Container summieren sich
- headingreset: stoppt genau diese Vererbung von oben – ab hier zählt nur der eigene Offset (verhindert ungewolltes Aufsummieren)
- Idealfall: eingebettete/wiederverwendbare Inhalte (Widgets, UGC), die intern bei h1 starten – Kontext hebt sie auf die richtige Ebene, headingreset koppelt sie sauber ab
- Löst „welche Ebene hat meine Komponente?" ohne aria-level-Gefrickel; nie über h6 hinaus; noch experimentell
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
  <ImageWithSource src="https://i.imgflip.com/ahxldt.jpg" alt="Meme: Button oder Link? – Die ewige Frage der Webentwicklung" source="via Imgflip" source-href="https://imgflip.com/i/ahxldt" class="mt--6 max-h-85"/>
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
