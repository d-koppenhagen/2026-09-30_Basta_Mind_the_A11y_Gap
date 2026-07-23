---
layout: section
---

# The Gap: Häufige Fallen

Was schiefgeht und warum

<!--
- „The Gap" – die Lücke zwischen Intention und tatsächlicher Barrierefreiheit
- Praxisbeispiele häufiger Fehler
- Bei jedem Beispiel: „Kann ich das Problem erkennen?"
- → Überleitung: Machen wir ein Code Review
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
❌ Dieser Code hat mindestens 6 Barrierefreiheits-Probleme!
</div>

</v-click>

</div>

<div class="col-span-2">
  <div class="w-95% ml-5 text-right">
    <img src="/a11y_dept_everywhere.jpg" alt="Meme: Buzz Lightyear zeigt Woody das Universum – A11y-Probleme, A11y-Probleme überall" attributionsrc="https://i.imgflip.com/ahxlzv.jpg" title="made at imgflip.com" class="mt-7"/>
  </div>
</div>

</div>



<!--
- Echter Code aus der Produktion – Code Review zusammen
- Probleme erkennen lassen:
  - „headline" als div – keine semantische Überschrift
  - „nav" ist ein div, kein nav-Element
  - Klickbare divs statt Buttons oder Links
  - Formular komplett aus divs
- [KLICK] Mindestens 6 schwerwiegende A11y-Probleme!
- Blazor-Bezug: <div @onclick="Submit"> ist genauso kaputt wie vanilla JS!
  - Blazor schützt euch NICHT vor Div-Suppe
  - Razor-Syntax verführt sogar dazu: @onclick auf beliebige Elemente setzen
- Publikum fragen: Welche Probleme fallen euch auf?
- → Überleitung: Schauen wir im Detail, was falsch ist
-->


---
layout: image
image: /soup_div.png
---

<!--
- „Div-Suppe" – ein Klassiker
- Bild generiert mit ChatGPT
- → Überleitung: Die konkreten Probleme im Detail
-->

---
layout: default
---

# Was ist falsch?

1. ❌ Kein semantisches HTML – alles ist ein `<div>`
2. ❌ Keine Landmarks (`<header>`, `<nav>`, `<main>`)
3. ❌ Klickbare divs statt `<button>` oder `<a>` (Fehlende Tastaturunterstützung)
4. ❌ Keine Überschriften-Struktur (`<h1>`, `<h2>`, etc.)
5. ❌ Fehlende Formular-Labels
6. ❌ Placeholder als Label (schlechte Praxis!)

<v-click>

<div class="mt-2 p-4 bg-yellow-500 bg-opacity-10 rounded">
⚠️ Screen Reader können diese Struktur nicht verstehen<br>
⚠️ Tastatur-Nutzende können nicht navigieren<br>
⚠️ Suchmaschinen & AI Agents können sie nur schlecht den Inhalt entnehmen
</div>

</v-click>

<!--
- [DURCH JEDEN PUNKT KLICKEN]
- Kein semantisches HTML, keine Landmarks, klickbare Divs, etc.
- Ergebnis:
  - Screen Reader: Flache Textliste, keine Struktur
  - Tastatur-Nutzende: Können nicht durch die Seite tabben
  - Suchmaschinen & AI Agents: Können Wichtigkeit nicht erkennen
- Das ist „div-Suppe" – überraschend häufig in Produktion
- .NET-Bezug: Wer aus WPF/WinForms kommt, kennt semantische Controls (Button ist Button)
  - Im Web (Blazor/Razor) gibt es diesen Schutz nicht – ihr seid selbst verantwortlich
  - <div @onclick="..."> kompiliert fehlerfrei, ist aber nicht tastatur-zugänglich
- → Überleitung: Wie macht man es richtig?
-->
