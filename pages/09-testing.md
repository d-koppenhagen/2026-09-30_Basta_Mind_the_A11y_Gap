---
layout: image
image: /testing.jpg
class: text-white
---

# Testen & Tools {.!text-white}

Barrierefreiheit verifizieren

<!--
- „Was man nicht misst, kann man nicht verbessern"
- → Überleitung: automatisiert vs. manuell
-->

---
layout: default
---

# Wichtige Test-Tools

<div class="grid grid-cols-3 gap-6 mt-4">

<v-click>
<div class="p-4 rounded-xl bg-blue-500/10 border border-blue-500/40 hover:bg-blue-500/20 transition-all dark:border-blue-500/30">
  <div class="text-3xl mb-2">🔍</div>
  <h3 class="!text-blue-900 dark:!text-blue-400 !text-lg !mb-2">Browser DevTools</h3>
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
  <h3 class="!text-green-900 dark:!text-green-400 !text-lg !mb-2">Automatisiert</h3>
  <ul class="!text-sm !list-none !pl-0 space-y-1">
    <li><carbon-bot class="inline text-green-600 dark:text-green-300" /> axe DevTools</li>
    <li><carbon-meter class="inline text-green-600 dark:text-green-300" /> Lighthouse</li>
    <li><carbon-view class="inline text-green-600 dark:text-green-300" /> WAVE (WebAIM)</li>
  </ul>
  <div class="mt-3 px-2 py-1 rounded bg-yellow-100 dark:bg-yellow-500/20 text-yellow-900 dark:text-yellow-300 text-xs text-center font-medium">
    ⚠️ Findet nur 30–40 % der Probleme!
  </div>
</div>
</v-click>

<v-click>
<div class="p-4 rounded-xl bg-purple-500/10 border border-purple-500/40 hover:bg-purple-500/20 transition-all dark:border-purple-500/30">
  <div class="text-3xl mb-2">🧑</div>
  <h3 class="!text-purple-900 dark:!text-purple-400 !text-lg !mb-2">Manuell</h3>
  <ul class="!text-sm !list-none !pl-0 space-y-1">
    <li><carbon-keyboard class="inline text-purple-600 dark:text-purple-300" /> Nur Tastatur</li>
    <li><carbon-headphones class="inline text-purple-600 dark:text-purple-300" /> Screen Reader</li>
    <li><carbon-zoom-in class="inline text-purple-600 dark:text-purple-300" /> 200 % Zoom</li>
  </ul>
  <div class="mt-3 px-2 py-1 rounded bg-red-100 dark:bg-red-500/20 text-red-900 dark:text-red-300 text-xs text-center font-medium">
    🎯 Unverzichtbar!
  </div>
</div>
</v-click>

</div>

<!--
- WAVE = Web Accessibility Evaluation Tool (visuelles Overlay), axe von Deque
- Kernaussage: automatisiert findet nur 30–40 % → manuell unverzichtbar
- Manuell konkret: Maus abstöpseln, SR (VoiceOver/NVDA), 200 % Zoom
- .NET: Playwright for .NET + axe-core, bUnit prüft gerendertes Markup, Deque.AxeCore.Playwright für CI
- CI/CD = Continuous Integration / Continuous Delivery
- Fazit: automatisiert anfangen, manuell vertiefen
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
- Demo öffnen: http://localhost:3200 (Slide versteckt)
- Trotz 100 %: keine echten Überschriften/Landmarks, div statt button, keine echten Links
- Lektion: automatisierte Tests notwendig, aber nicht hinreichend
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
      aria-label="Ihr Name"
      placeholder="Max Mustermann">
    <div class="btn" onclick="alert('Gesendet!')">Absenden</div>
  </main>
</body>
</html>
```

<div class="absolute right-97 top-28 w-[30%] z-10">
  <img src="/demo-100.png" alt="Vorschau des Quellcodes" class="rounded shadow-lg" />
</div>

<div class="absolute right-7 top-20 w-[32%] flex flex-col gap-10 z-10">
  <img src="/axe-100.png" alt="axe DevTools: 0 Violations" class="rounded shadow-lg" />
  <img src="/lighthouse-100.png" alt="Lighthouse Score: 100" class="rounded shadow-lg" />
</div>


<!--
- Warum 100 %: `aria-label` befriedigt axe, aber kein echtes Label/keine Semantik
- span statt a, div statt h1/button → Tastatur erreicht Nav & Button nicht
- → Überleitung: AI Agents & A11y
-->
