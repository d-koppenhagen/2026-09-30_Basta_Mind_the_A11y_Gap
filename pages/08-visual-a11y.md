---
layout: section
---

# Visuelle Barrierefreiheit

Farbkontrast und Medien-Alternativen

<!--
- Bisher SR & Tastatur – visuelle A11y ist ebenso wichtig
- → Überleitung: Farbkontrast
-->


---
layout: default
---

# Farbkontrast

<div class="grid grid-cols-2 gap-4">

<div>

## ❌ Problem


<div class="mt-3 p-3" style="color: #999999; background: #FFFFFF; border: 1px solid #ccc;">
Dieser Text ist schwer lesbar
</div>

</div>

<div>

## ✅ Lösung


<div class="mt-3 p-3" style="color: #000000; background: #FFFFFF; border: 1px solid #ccc;">
Dieser Text ist gut lesbar
</div>

</div>

</div>

**WCAG-Anforderungen:**
- **Level AA:** 4,5:1 für normalen Text, 3:1 für großen Text
- **Level AAA:** 7:1 für normalen Text, 4,5:1 für großen Text

<FutureFeature title="contrast-color()" status="baseline" badge="Baseline 04/2026" href="https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Values/color_value/contrast-color">

Der Browser wählt automatisch <code>black</code> oder <code>white</code> — je nachdem, was gegen die Hintergrundfarbe besser kontrastiert. Kein manuelles Nachrechnen mehr.

```css
.badge { background: var(--brand); color: contrast-color(var(--brand)); }
```

</FutureFeature>

<!--
- Kritisch für Sehbehinderung & Farbenblindheit; „modernes" Hellgrau reißt AA oft
- AA = Level AA (Minimum), AAA = strengste Stufe
- Tipp: Design-System-Farben früh prüfen (spart teure Nacharbeit)
- contrast-color(): Browser wählt schwarz/weiß mit bestem Kontrast, garantiert i. d. R. AA
- Baseline Newly Available seit April 2026 (Firefox, Chrome, Safari) — schon einsetzbar
- Grenze: liefert nur schwarz/weiß, keine beliebige Marken-Farbe
- → Überleitung: Medien-Alternativen
-->

---
layout: default
---

# Bilder & Alternativtexte

<v-switch at="+0">
  <template #1>
    <div class="flex gap-8 items-start">
      <div class="w-[55%]">
        <div class="shiki-container">

```html
<img src="angular-buch.png" />
```

</div>
        <div class="mt-4 p-4 bg-gray-100 dark:bg-gray-800 rounded text-center">
          <div class="text-6xl mb-2">🖼️</div>
          <p class="text-sm opacity-70">Was sehen Sie?<br><strong>Genau: nichts.</strong></p>
          <p class="text-xs opacity-50 mt-2">So nehmen blinde Menschen Bilder ohne Alternativtext wahr.</p>
        </div>
      </div>
      <div class="w-[45%]">
        <h3>Kein Alternativtext</h3>
        <ul>
          <li>Bild existiert, aber <strong>kein <code>alt</code></strong></li>
          <li>Screen Reader: „Bild" — keine Info</li>
          <li>Gleiches Erlebnis wie ein kaputtes Bild</li>
        </ul>
      </div>
    </div>
  </template>
  <template #2>
    <div class="flex gap-8 items-start">
      <div class="w-[55%]">
        <div class="shiki-container">

```html
<img src="angular-buch.png"
     alt="Buchcover: Angular – Das Praxisbuch,
          von Malcher, Koppenhagen, Hoppe" />
```

</div>
        <div class="mt-4 p-4 bg-gray-100 dark:bg-gray-800 rounded text-center">
          <div class="text-6xl mb-2">🖼️</div>
          <p class="text-sm">🔊 „Buchcover: Angular – Das Praxisbuch, von Malcher, Koppenhagen, Hoppe"</p>
          <p class="text-xs opacity-50 mt-2">Screen Reader kann vorlesen — obwohl visuell nichts zu sehen ist.</p>
        </div>
      </div>
      <div class="w-[45%]">
        <h3>Mit <code>alt</code>-Attribut</h3>
        <ul>
          <li>Screen Reader liest den Text vor</li>
          <li>Auch wenn das Bild nicht lädt → Info vorhanden</li>
          <li><strong>Kernregel:</strong> Was vermittelt das Bild?</li>
        </ul>
      </div>
    </div>
  </template>
  <template #3>
    <div class="flex gap-8 items-start">
      <div class="w-[55%]">
        <div class="shiki-container">

```html
<img src="angular-buch.png"
     alt="Buchcover: Angular – Das Praxisbuch,
          von Malcher, Koppenhagen, Hoppe" />
```

</div>
        <img src="/book-cover-v1m.png" alt="Buchcover: Angular – Das Praxisbuch, von Malcher, Koppenhagen, Hoppe" class="mt-4 max-h-50 mx-auto" />
      </div>
      <div class="w-[45%]">
        <h3>Bild + Alt ✅</h3>
        <ul>
          <li>Sehende sehen das Bild</li>
          <li>Blinde hören die Beschreibung</li>
          <li><strong>Gleichwertiger Informationszugang</strong></li>
        </ul>
      </div>
    </div>
  </template>
  <template #4>
    <div class="flex gap-8 items-start">
      <div class="w-[55%]">
        <div class="shiki-container">

```html
<img src="angular-buch.png" aria-describedby="desc"
     alt="Buchcover: Angular – Das Praxisbuch,
          von Malcher, Koppenhagen, Hoppe" />
<p id="desc">
  Erschienen bei dpunkt.verlag, 1. Auflage.
  Behandelt modernes Angular ab Version 22
  mit Signals und moderne Best Practices.
</p>
```

</div>
        <img src="/book-cover-v1m.png" alt="Buchcover: Angular – Das Praxisbuch, von Malcher, Koppenhagen, Hoppe" class="mt-4 max-h-50 mx-auto" />
      </div>
      <div class="w-[45%]">
        <h3>Lange Beschreibung</h3>
        <ul>
          <li><code>aria-describedby</code> für komplexe Bilder</li>
          <li>Referenziert eine ausführliche Beschreibung</li>
          <li>Für Diagramme, Infografiken, Charts</li>
        </ul>
      </div>
    </div>
  </template>
</v-switch>

<!--
- Publikum aktivieren: „Was seht ihr?" → nichts = Erlebnis ohne alt
- `alt` hilft auch bei gebrochenem Bild
- `aria-describedby` für komplexe Bilder (Diagramme, Infografiken)
- Faustregel: Entfernen = Infoverlust → braucht Alternativtext
- → Überleitung: dekorative Bilder & SVG
-->

---
layout: default
---

# Dekorative Bilder & SVG

## Dekoratives Bild → `alt=""`

<div class="grid grid-cols-[auto_1fr] gap-6 items-center">

<button class="flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-600 text-white text-lg font-medium shadow shrink-0">
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" focusable="false">
    <path d="M17 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V7l-4-4Zm-5 16a3 3 0 1 1 0-6 3 3 0 0 1 0 6Zm3-10H5V5h10v4Z" />
  </svg>
  Speichern
</button>

<div>

```html
<!-- Bild rein dekorativ → Label "Speichern" trägt die Info -->
<button><img src="disk.png" alt="" />Speichern</button>
```

</div>

</div>

<v-click>

<h2 class="mt-8">SVG → informativ oder dekorativ?</h2>

<div class="grid grid-cols-2 gap-6 items-start [&_.slidev-code]:!my-0">

<div class="flex flex-col gap-2">

<div class="flex items-center justify-center h-14">
  <span class="flex items-center gap-2 px-3 py-2 rounded-lg border border-amber-500/60 bg-amber-500/10 text-amber-500 font-medium" role="img" aria-label="Warnung">
    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" focusable="false">
      <path d="M12 2 1 21h22L12 2Zm0 5 7.5 13h-15L12 7Zm-1 4v4h2v-4h-2Zm0 6v2h2v-2h-2Z" />
    </svg>
    Warnung
  </span>
</div>

```html
<!-- Info allein -> role + Label -->
<svg role="img" aria-label="Warnung">
  …
</svg>
```

</div>

<div class="flex flex-col gap-2">

<div class="flex items-center justify-center h-14">
  <button class="flex items-center gap-2 px-3 py-2 rounded-lg bg-red-600 text-white font-medium shadow">
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" focusable="false">
      <path d="M19 6.4 17.6 5 12 10.6 6.4 5 5 6.4 10.6 12 5 17.6 6.4 19 12 13.4 17.6 19 19 17.6 13.4 12 19 6.4Z" />
    </svg>
    Löschen
  </button>
</div>

```html
<!-- Deko neben Text -->
<button>
  <svg aria-hidden="true">…</svg> Löschen
</button>
```

</div>

</div>

<div class="mt-3">

Info allein → `role="img"` + `aria-label` &nbsp;·&nbsp; neben Text → `aria-hidden="true"` &nbsp;·&nbsp; Inline-SVG immer `focusable="false"`

</div>

</v-click>

<!--
- Deko-Icon = Entfernen ohne Infoverlust, weil sichtbares Label die Info trägt
- Warn-Icon ohne Text trägt die Info allein → braucht `role="img"` + `aria-label`
- SVG = Scalable Vector Graphics; `focusable="false"` gegen IE/Edge-Legacy-Bug
- → Überleitung: Video & Audio
-->

---
layout: default
---

# Video & Audio

<div class="grid grid-cols-2 gap-4">

<div>

## Video

```html
<video controls>
  <source src="tutorial.mp4" type="video/mp4" />
  <track kind="captions" src="captions.vtt"
         srclang="en" label="English" />
  <track kind="descriptions" src="desc.vtt"
         srclang="en" />
</video>
```

</div>

<div>

## Audio

```html
<audio controls>
  <source src="podcast.mp3" type="audio/mpeg" />
  <a href="transcript.html">Transkript</a>
</audio>
```

</div>

</div>

- **Captions** – Untertitel inkl. Geräusche / Musik für gehörlose Menschen
- **Audio-Descriptions** – visuelle Inhalte für blinde Menschen beschreiben
- **Transkripte** – für reine Audio-Inhalte (Podcasts) oft ausreichend

<!--
- `track`-Element nutzt WebVTT = Web Video Text Tracks
- Captions = Untertitel inkl. Geräusche/Musik (gehörlos), nicht nur Dialog
- Audio-Description = beschreibt visuelle Inhalte (blind)
- → Überleitung: Präferenzen respektieren
-->

---
layout: default
---

# Präferenzen Respektieren

<div class="grid grid-cols-2 gap-4">

<div>

```css
@media (prefers-reduced-motion: reduce) {
  * { animation-duration: 0.01ms !important; }
}

@media (prefers-color-scheme: dark) {
  :root { --bg: #1a1a2e; --text: #eee; }
}

@media (prefers-contrast: more) {
  :root { --border: 2px solid #000; }
}

@media (forced-colors: active) {
  .card { border: 1px solid CanvasText; }
}
```

</div>

<div>

- **Reduced Motion**: Animationen können vestibuläre Beschwerden oder epileptische Anfälle auslösen
- **Dark / Light Mode**: Farbschema je nach Umgebung und Sehfähigkeit wählbar
- **Prefers Contrast**: Mehr (oder weniger) Kontrast gewünscht – Borders, Schriftgewicht, Farben anpassen
- **Forced Colors** (Windows High Contrast): System überschreibt alle Farben – Borders statt Hintergrund nutzen

</div>

</div>

<!--
- Alle vier per CSS Media Query abfragbar
- Kernunterschied: `prefers-contrast` = Wunsch, `forced-colors` = Zwang (System überschreibt alles)
- Testen: DevTools → Rendering → Emulationen
- → Überleitung: Challenges
-->

---
layout: center
class: text-center
---

# Ausprobieren

<ChallengeLinks :challenges="[
  { slug: 'color-contrast-fail', title: 'Fifty Shades of Gray' },
  { slug: 'missing-alt-text', title: 'A Picture Says Nothing' },
  { slug: 'reduced-motion', title: 'Chill Out' },
]" />

<!--
- Challenges: Kontrast reparieren, Alt-Texte ergänzen, prefers-reduced-motion umsetzen
- → Überleitung: Testen & Tools
-->
