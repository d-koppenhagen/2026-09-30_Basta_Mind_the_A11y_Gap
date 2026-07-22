---
layout: image
image: /testing.jpg
class: text-white
---

# Testen & Tools {.!text-white}

Barrierefreiheit verifizieren

<!--
- Was man nicht misst, kann man nicht verbessern
- Die wichtigsten Tools zum Testen von Barrierefreiheit
- → Überleitung: Automatisiert vs Manuell
-->

---
layout: default
---

# Wichtige Test-Tools

<div class="grid grid-cols-3 gap-6 mt-4">

<v-click>
<div class="p-4 rounded-xl bg-blue-500/10 border border-blue-500/40 hover:bg-blue-500/20 transition-all dark:border-blue-500/30">
  <div class="text-3xl mb-2">🔍</div>
  <h3 class="!text-blue-700 dark:!text-blue-400 !text-lg !mb-2">Browser DevTools</h3>
  <ul class="!text-sm !list-none !pl-0 space-y-1">
    <li><carbon-tree-view class="inline text-blue-600 dark:text-blue-300" /> Accessibility Tree</li>
    <li><carbon-color-palette class="inline text-blue-600 dark:text-blue-300" /> Contrast Checker</li>
    <li><carbon-meter class="inline text-blue-600 dark:text-blue-300" /> Lighthouse Audit</li>
  </ul>
</div>
</v-click>

<v-click>
<div class="p-4 rounded-xl bg-green-500/10 border border-green-500/40 hover:bg-green-500/20 transition-all dark:border-green-500/30">
  <div class="text-3xl mb-2">🤖</div>
  <h3 class="!text-green-700 dark:!text-green-400 !text-lg !mb-2">Automatisiert</h3>
  <ul class="!text-sm !list-none !pl-0 space-y-1">
    <li><carbon-bot class="inline text-green-600 dark:text-green-300" /> axe DevTools</li>
    <li><carbon-meter class="inline text-green-600 dark:text-green-300" /> Lighthouse</li>
    <li><carbon-view class="inline text-green-600 dark:text-green-300" /> WAVE (WebAIM)</li>
  </ul>
  <div class="mt-3 px-2 py-1 rounded bg-yellow-100 dark:bg-yellow-500/20 text-yellow-800 dark:text-yellow-300 text-xs text-center font-medium">
    ⚠️ Findet nur 30–40 % der Probleme!
  </div>
</div>
</v-click>

<v-click>
<div class="p-4 rounded-xl bg-purple-500/10 border border-purple-500/40 hover:bg-purple-500/20 transition-all dark:border-purple-500/30">
  <div class="text-3xl mb-2">🧑</div>
  <h3 class="!text-purple-700 dark:!text-purple-400 !text-lg !mb-2">Manuell</h3>
  <ul class="!text-sm !list-none !pl-0 space-y-1">
    <li><carbon-keyboard class="inline text-purple-600 dark:text-purple-300" /> Nur Tastatur</li>
    <li><carbon-headphones class="inline text-purple-600 dark:text-purple-300" /> Screen Reader</li>
    <li><carbon-zoom-in class="inline text-purple-600 dark:text-purple-300" /> 200 % Zoom</li>
  </ul>
  <div class="mt-3 px-2 py-1 rounded bg-red-100 dark:bg-red-500/20 text-red-800 dark:text-red-300 text-xs text-center font-medium">
    🎯 Unverzichtbar!
  </div>
</div>
</v-click>

</div>

<!--
- [KLICK] Browser DevTools: Eingebaut und sofort nutzbar
  - Accessibility Tree: Was Screen Reader tatsächlich sehen
  - Contrast Checker, Lighthouse für schnelle Audits
- [KLICK] Automatisierte Tools: Guter Einstieg, aber begrenzt
  - axe DevTools: Beste Browser-Erweiterung
  - Lighthouse: Score als Orientierung
  - WAVE: Visuelles Overlay direkt auf der Seite
  - Wichtig: Finden nur 30–40 % der echten Probleme!
- [KLICK] Manuelles Testen: Hier wird's ernst
  - Maus abstöpseln, App nur mit Tastatur bedienen
  - Screen Reader ausprobieren (VoiceOver / NVDA)
  - 200 % Zoom – bricht euer Layout?
- Fazit: Automatisiert anfangen, manuell vertiefen
- → Überleitung: Demo – 100 % Score, 0 % Barrierefreiheit
-->

---
layout: center
hide: true
---

# 🎯 Demo: 100 % Score – 0 % Barrierefreiheit

<div class="text-xl mt-4 mb-8">

Automatisierte Tools wie **Lighthouse** und **axe** geben dieser Seite einen **perfekten Score**.

Trotzdem ist sie **nicht barrierefrei**.

</div>

<a href="http://localhost:3200" target="_blank" class="text-2xl px-6 py-3 bg-blue-600 !text-white rounded-lg hover:bg-blue-700 no-underline">
  → Live-Demo öffnen
</a>

<!--
- Demo öffnen: http://localhost:3200
- Seite sieht gut aus, Lighthouse gibt 100 %
- Aber: Keine echten Überschriften, keine Landmarks, div statt button, keine echten Links
- Screen Reader sieht quasi nichts Sinnvolles
- Lektion: Automatisierte Tests sind notwendig, aber nicht hinreichend!
-->

---
layout: default
---

# 🔍 Warum 100 % Score?

```html
<!DOCTYPE html>
<html lang="de">
<head>
  <!-- ... -->
  <title>MyApp</title>
</head>
<body>
  <main>
    <div class="nav">
      <span onclick="location.href='#'">Startseite</span>
      <span onclick="location.href='#'">Kontakt</span>
    </div>
    <div class="title">Willkommen!</div>
    <div class="label">Ihr Name</div>
    <input type="text"
      aria-label="Your Name"
      placeholder="Max Mustermann">
    <div class="btn" onclick="alert('Gesendet!')">Absenden</div>
  </main>
</body>
</html>
```

<div class="absolute right-97 top-33 w-[30%] z-10">
  <img src="/demo-100.png" alt="Vorschau des Quellcodes" class="rounded shadow-lg" />
</div>

<div class="absolute right-7 top-10 w-[32%] flex flex-col gap-10 z-10">
  <img src="/axe-100.png" alt="axe DevTools: 0 Violations" class="rounded shadow-lg" />
  <img src="/lighthouse-100.png" alt="Lighthouse Score: 100" class="rounded shadow-lg" />
</div>


<!--
- Vereinfachtes Beispiel: Lighthouse & axe melden 0 Fehler
- Aber: span statt a, div statt h1, div statt button, div statt label
- aria-label befriedigt axe – aber kein echtes Label-Element vorhanden
- Tastatur-Nutzende können Navigation und Button nicht erreichen
- Screen Reader sieht keine Überschrift, keine Landmarks
- → Überleitung: AI Agents und Barrierefreiheit
-->
