---
layout: image
image: /testing.jpg
---

# Testen & Tools

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
- → Überleitung: AI Agents und Barrierefreiheit
-->
