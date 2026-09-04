---
layout: section
---

# The Gap: Häufige Fallen

Was schiefgeht und warum

<!--
- „The Gap" = Lücke zwischen Intention und echter Barrierefreiheit
- Publikum aktivieren: „Erkennt ihr das Problem?"
- → Überleitung: gemeinsames Code Review
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
- Echter Produktionscode – Publikum fragen: welche Probleme fallen auf?
- Kandidaten: div statt Überschrift/nav, klickbare divs, Formular nur aus divs
- Blazor-Bezug: `<div @onclick>` genauso kaputt; Razor verführt dazu, schützt nicht vor Div-Suppe
- → Überleitung: Probleme im Detail
-->


---
layout: image
image: /soup_div.png
---

<!--
- „Div-Suppe" = alles nur `<div>`, ein Klassiker
- Bild mit ChatGPT generiert
- → Überleitung: konkrete Probleme im Detail
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
- Folge: SR hört flache Textliste, Tastatur kann nicht tabben, Crawler/Agents erkennen Wichtigkeit nicht
- Überraschend häufig in Produktion
- .NET-Bezug: WPF/WinForms haben semantische Controls (Button = Button); im Web fehlt dieser Schutz
- `<div @onclick>` kompiliert, ist aber nicht tastatur-zugänglich
- → Überleitung: Wie macht man's richtig?
-->
