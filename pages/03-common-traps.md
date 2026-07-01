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
