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

**Tools:** Chrome DevTools, WebAIM Contrast Checker, Stark

</v-clicks>

<!--
- Farbkontrast kritisch für Sehbehinderung und Farbenblindheit
- LINKS: Hellgrau auf Weiß – sieht modern aus, aber nur 2,85:1 Kontrast
- RECHTS: Dunkleres Grau – immer noch gut aussehend, 7:1 Kontrast (AAA!)
- [KLICK] WCAG-Anforderungen:
  - AA (Minimum): 4,5:1 normaler Text, 3:1 großer Text
  - AAA (erweitert): 7:1 normaler Text
- Tools: Chrome DevTools, WebAIM, Stark-Plugin
- Tipp: Design-System-Farben früh prüfen!
- → Überleitung: Medien-Alternativen
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
- Medien-Alternativen essenziell für Nutzer die nicht sehen/hören können
- [KLICK] Bilder:
  - Informativ: Beschreiben was das Bild vermittelt
  - Dekorativ: Leerer Alt-Text (alt="") → Screen Reader überspringt
  - Komplex: aria-describedby für längere Beschreibungen
- [KLICK] Broken Image ohne URL → nach Korrektur lädt das Bild korrekt
- Faustregel: Wenn Entfernen Informationsverlust bedeutet → Alternative nötig
- → Überleitung: Videos
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
- Videos: Immer Untertitel für gehörlose Nutzer
- Audiobeschreibungen für blinde Nutzer erwägen
- track-Element mit WebVTT-Dateien verwenden
- → Überleitung: Reduzierte Bewegung
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
- Manche Nutzer werden schwindelig/übel von Animationen
- Betriebssysteme bieten „Bewegung reduzieren"-Präferenz
- Einfache Media Query respektiert die Einstellung
- Einer der einfachsten A11y-Gewinne!
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
