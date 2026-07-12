---
layout: section
---

# Visuelle Barrierefreiheit

Farbkontrast und Medien-Alternativen

<!--
- Bisher Fokus auf Screen Reader und Tastatur
- Visuelle Barrierefreiheit ist ebenso wichtig
- → Überleitung: Farbkontrast
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

**Tools:** Chrome DevTools, WebAIM Contrast Checker

</v-clicks>

<!--
- Farbkontrast kritisch für Sehbehinderung und Farbenblindheit
- LINKS: Hellgrau auf Weiß – sieht modern aus, aber nur 2,85:1 Kontrast
- RECHTS: Dunkleres Grau – immer noch gut aussehend, 7:1 Kontrast (AAA!)
- [KLICK] WCAG-Anforderungen:
  - AA (Minimum): 4,5:1 normaler Text, 3:1 großer Text
  - AAA (erweitert): 7:1 normaler Text
- Tools: Chrome DevTools, WebAIM
- Tipp: Design-System-Farben früh prüfen!
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
- Frage ans Publikum: Was sehen Sie? Genau — nichts.
- So fühlt es sich für blinde Nutzer an, wenn alt fehlt
- [KLICK] Alt gesetzt → Screen Reader kann vorlesen, auch bei gebrochenem Bild
- [KLICK] Bild korrekt geladen → jetzt haben alle was davon
- [KLICK] aria-describedby für komplexere Bilder (Diagramme, Infografiken)
- Faustregel: Wenn Entfernen = Informationsverlust → braucht Alternativtext
- → Überleitung: Dekorative Bilder & SVG
-->

---
layout: default
---

# Dekorative Bilder & SVG

<div class="grid grid-cols-[1fr_1fr] gap-8 items-center">

<div>

```html
<!-- Leerer alt → Screen Reader überspringt -->
<img src="decoration.png" alt="" />
```

</div>

<div>

**Dekorative Bilder**

Wenn man das Bild entfernt und kein Informationsverlust entsteht → `alt=""`

</div>

</div>

<v-click>

<div class="grid grid-cols-[1fr_1fr] gap-8 items-center mt-4">

<div>

```html
<!-- Informatives SVG -->
<svg role="img" aria-label="Warnung: Fehler">
  <path d="..." />
</svg>

<!-- Dekoratives SVG -->
<svg aria-hidden="true" focusable="false">
  <circle cx="50" cy="50" r="40" />
</svg>
```

</div>

<div>

**SVG-Regeln:**
- Informativ → `role="img"` + `aria-label`
- Dekorativ → `aria-hidden="true"`
- Inline-SVG: Immer `focusable="false"` (IE/Edge Legacy)

</div>

</div>

</v-click>

<!--
- [KLICK] Dekorative Bilder: Leerer alt-Text, damit Screen Reader sie überspringt
- Nicht jedes Bild ist informativ — Hintergründe, Trennlinien, Ornamente
- Faustregel: Entfernen = kein Infoverlust → dekorativ
- [KLICK] SVG: Zwei Kategorien — informativ vs. dekorativ
- Informativ: role="img" + aria-label (oder aria-labelledby)
- Dekorativ: aria-hidden + focusable="false"
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

<v-clicks>

- **Captions** – Untertitel inkl. Geräusche / Musik für gehörlose Menschen
- **Audio-Descriptions** – visuelle Inhalte für blinde Menschen beschreiben
- **Transkripte** – für reine Audio-Inhalte (Podcasts) oft ausreichend

</v-clicks>

<!--
- Video: track-Element mit WebVTT für Captions und Descriptions
- Audio: Transkript verlinken – reicht für reine Audio-Inhalte
- [KLICK] Captions: Untertitel inkl. Geräusche, Musik-Hinweise
- [KLICK] Audio-Descriptions: Beschreibung visueller Inhalte im Video
- [KLICK] Transkripte: Text-Version, durchsuchbar und flexibel
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

<v-clicks>

- **Reduced Motion**: Animationen können vestibuläre Beschwerden oder epileptische Anfälle auslösen
- **Dark / Light Mode**: Farbschema je nach Umgebung und Sehfähigkeit wählbar
- **Prefers Contrast**: Mehr (oder weniger) Kontrast gewünscht – Borders, Schriftgewicht, Farben anpassen
- **Forced Colors** (Windows High Contrast): System überschreibt alle Farben – Borders statt Hintergrund nutzen

</v-clicks>

</div>

</div>

<!--
- Vier wichtige User-Präferenzen die wir per CSS Media Query respektieren können
- Reduced Motion: Schwindel, Übelkeit, Epilepsie → Animationen deaktivieren
- Color Scheme: Manche brauchen dunklen Hintergrund (Lichtempfindlichkeit), andere hellen
- Prefers Contrast: Mehr Kontrast gewünscht → dickere Borders, stärkere Farben, klarere Trennung
- Forced Colors: Windows High Contrast – alle Farben werden überschrieben, Hintergründe verschwinden
- Unterschied prefers-contrast vs. forced-colors: prefers-contrast ist ein Wunsch, forced-colors ein Zwang
- Tipp: DevTools → Rendering → Emulationen zum Testen
- → Überleitung: Challenges zum Ausprobieren
-->

---
layout: center
class: text-center
---

# Ausprobieren

<ChallengeLinks :challenges="[
  { slug: 'color-contrast-fail', title: 'Color Contrast Fail' },
  { slug: 'missing-alt-text', title: 'Missing Alt Text' },
  { slug: 'reduced-motion', title: 'Reduced Motion' },
]" />

<!--
- Challenges zum Kapitel visuelle Barrierefreiheit
- Color Contrast: Kontrastverhältnisse reparieren
- Missing Alt Text: Alt-Texte ergänzen
- Reduced Motion: prefers-reduced-motion umsetzen
- → Überleitung: Testen und Tools
-->
