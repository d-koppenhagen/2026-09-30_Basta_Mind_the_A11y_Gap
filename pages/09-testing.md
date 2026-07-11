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

<v-click>

## Browser DevTools
- **Accessibility Tree** – sehen was assistive Technologien sehen
- **Contrast Checker** – Farbverhältnisse prüfen
- **Lighthouse** – automatisiertes Audit

</v-click>

<v-click>

## Automatisiertes Testen
- **axe DevTools** (Chrome/Firefox-Erweiterung) – findet ~30–40 % der Probleme
- **Lighthouse** (in Chrome eingebaut) – Accessibility-Audit
- **WAVE** (WebAIM) – visuelles Feedback-Overlay

</v-click>
<v-click>

## Manuelles Testen
- **Nur Tastatur** – Maus abstöpseln, versucht eure App zu benutzen!
- **Screen Reader** – VoiceOver (Mac), NVDA (Windows, kostenlos), JAWS (Windows)
- **Auf 200 % zoomen** – funktioniert euer Layout noch?

</v-click>

<!--
- [KLICK] Automatisierte Tools:
  - axe DevTools: Beste Browser-Erweiterung
  - Lighthouse: In Chrome eingebaut, gibt Score
  - WAVE: Visuelles Overlay
  - Aber: Finden nur 30–40 % der Probleme!
- [KLICK] Manuelles Testen essenziell:
  - Maus abstöpseln, App nur mit Tastatur bedienen
  - Screen Reader testen (VoiceOver / NVDA)
  - 200 % Zoom prüfen
- [KLICK] Browser DevTools:
  - Accessibility Tree zeigt was Screen Reader sehen
  - Contrast Checker eingebaut
  - Lighthouse für schnelle Audits
- Automatisiert anfangen, aber nicht dabei aufhören!
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
