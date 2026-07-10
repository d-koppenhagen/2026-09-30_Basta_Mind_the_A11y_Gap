---
layout: section
---

# Visuelle Barrierefreiheit

Farbkontrast und Medien-Alternativen

<!--
Wir haben uns viel auf Screen Reader und Tastatur-Nutzer konzentriert.

Aber visuelle Barrierefreiheit ist auch wichtig!

Decken wir die Grundlagen schnell ab...
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

**Tools:** Chrome DevTools, WebAIM Contrast Checker, Stark

</v-clicks>

<!--
Farbkontrast ist kritisch für Nutzer mit Sehbehinderung oder Farbenblindheit.

LINKS – Problem:
Hellgrau auf Weiß. Sieht modern und minimalistisch aus, aber...
Kontrastverhältnis ist nur 2,85:1 – fällt bei WCAG durch!

RECHTS – Lösung:
Dunkleres Grau auf Weiß. Sieht immer noch gut aus, aber lesbar.
Kontrastverhältnis ist 7:1 – besteht AAA!

[KLICKS]
WCAG-Anforderungen:
- Level AA (Minimum): 4,5:1 für normalen Text
- Level AAA (erweitert): 7:1 für normalen Text
- Großer Text hat niedrigere Anforderungen

Tools zum Prüfen:
- Chrome DevTools hat einen eingebauten Kontrast-Checker
- WebAIM hat ein Online-Tool
- Stark-Plugin für Figma/Sketch

Profi-Tipp: Prüft eure Design-System-Farben früh!
-->

---
layout: default
---

# Medien-Alternativen

<div class="flex gap-4">

<div class="w-[70%]">

<v-click>

## Bilder

```html
<!-- Informatives Bild -->
<img src="angular-buch.png"
     alt="Book Cover of the German book 'Das moderne Praxisbuch zu Angular: Von den Grundlagen bis zur professionellen Entwicklung mit Signals', written by Ferdinand Malcher, Danny Koppenhagen and Johannes Hoppe" />

<!-- Dekoratives Bild -->
<img src="decoration.png" alt="" />

<!-- Komplexes Bild -->
<img src="diagram.png" alt="Systemarchitektur"
     aria-describedby="diagram-desc" />
<div id="diagram-desc">
  Detaillierte Beschreibung der Architektur...
</div>
```

</v-click>

</div>

<div class="w-[30%]">

<v-switch>
  <template #1>

## ❌ Problem

<img src="https://foo.bar/INVALID.png" class="h-70 w-55 rounded shadow border-1" />

  </template>
  <template #2>

## ✅ Korrekt

<img src="/book-cover-v1m.png" alt="Book Cover of the German book 'Das moderne Praxisbuch zu Angular: Von den Grundlagen bis zur professionellen Entwicklung mit Signals', written by Ferdinand Malcher, Danny Koppenhagen and Johannes Hoppe" class="max-h-70 rounded shadow" />

   </template>
</v-switch>

</div>

</div>

<!--
Medien-Alternativen sind essenziell für Nutzer, die Inhalte nicht sehen oder hören können.

Bilder:
- Informative Bilder: Beschreiben was das Bild vermittelt
- Dekorative Bilder: Leerer Alt-Text (alt="") damit Screen Reader es überspringen
- Komplexe Bilder: aria-describedby für längere Beschreibungen verwenden

[KLICK] Hier sehen wir ein Bild mit einer ungültigen URL – der Browser zeigt ein Broken-Image-Icon.
[KLICK] Nach dem Korrigieren der URL lädt das Buchcover korrekt.

Faustregel: Wenn das Entfernen des Bildes/Videos Informationen verlieren würde, braucht ihr eine Alternative.
-->

---
layout: default
---

# Medien-Alternativen

## Videos

```html
<video controls>
  <source src="tutorial.mp4" type="video/mp4" />
  <track kind="captions" src="captions.vtt" srclang="en" label="English" />
  <track kind="descriptions" src="descriptions.vtt" srclang="en" />
</video>
```

<!--
Medien-Alternativen sind essenziell für Nutzer, die Inhalte nicht sehen oder hören können.

[KLICK]
Videos:
- Immer Untertitel für gehörlose Nutzer bereitstellen
- Audiobeschreibungen für blinde Nutzer in Betracht ziehen
- Das track-Element mit WebVTT-Dateien verwenden

Faustregel: Wenn das Entfernen des Bildes/Videos Informationen verlieren würde, braucht ihr eine Alternative.

Jetzt reden wir über reduzierte Bewegung und visuelle Präferenzen...
-->

---
layout: default
---

# Reduzierte Bewegung

<div class="grid grid-cols-2 gap-4">

<div>

```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}
```

</div>

<div>

<v-clicks>

- Manche Nutzer erleben **Bewegungskrankheit** durch Animationen
- Die OS-Präferenz per Media Query respektieren
- Einfach umzusetzen, große Wirkung

</v-clicks>

</div>

</div>

<!--
Reduzierte Bewegung wird oft übersehen, ist aber wichtig.

Manche Nutzer werden schwindelig oder übel von Animationen und Transitions.
Moderne Betriebssysteme lassen Nutzer eine „Bewegung reduzieren"-Präferenz setzen.
Wir können das mit einer einfachen Media Query respektieren.

Das ist einer der einfachsten A11y-Gewinne, die ihr erzielen könnt!
-->

---
layout: center
class: text-center
---

# Ausprobieren

<a href="https://practica11y.dev/challenges/color-contrast-fail" target="_blank" class="text-2xl pt-10">🎮 Challenge: Color Contrast Fail</a>
<br>
<a href="https://practica11y.dev/challenges/missing-alt-text" target="_blank" class="text-2xl pt-4">🎮 Challenge: Missing Alt Text</a>
<br>
<a href="https://practica11y.dev/challenges/reduced-motion" target="_blank" class="text-2xl pt-4">🎮 Challenge: Reduced Motion</a>

<!--
- Passende Challenges zum Kapitel visuelle Barrierefreiheit
- Color Contrast: Kontrastverhältnisse reparieren
- Missing Alt Text: Alt-Texte für Bilder ergänzen
- Reduced Motion: prefers-reduced-motion korrekt umsetzen
-->
