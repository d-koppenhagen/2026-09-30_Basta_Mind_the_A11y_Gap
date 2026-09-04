---
layout: default
---

# Warum Barrierefreiheit wichtig ist

<div class="grid grid-cols-2 gap-6 pt-4">

<v-click>

<div class="p-5 rounded-lg bg-gradient-to-br from-green-500/15 to-green-500/5 border border-green-500/20">
  <div class="text-4xl font-bold text-green-700 dark:text-green-400">1,3 Mrd.</div>
  <div class="text-lg mt-1 opacity-90">Menschen weltweit mit Beeinträchtigung</div>
  <div class="text-sm mt-2 opacity-70">~ 16 % der Weltbevölkerung</div>
</div>

</v-click>

<v-click>

<div class="p-5 rounded-lg bg-gradient-to-br from-blue-500/15 to-blue-500/5 border border-blue-500/20">
  <div class="text-4xl font-bold text-blue-700 dark:text-blue-400">100 %</div>
  <div class="text-lg mt-1 opacity-90">profitieren von guter A11y</div>
  <div class="text-sm mt-2 opacity-70">Gebrochener Arm · Baby auf dem Arm · Sonne auf Display</div>
</div>

</v-click>

<v-click>

<div class="p-5 rounded-lg bg-gradient-to-br from-amber-500/15 to-amber-500/5 border border-amber-500/20">
  <div class="text-4xl font-bold text-amber-700 dark:text-amber-400">Gesetz</div>
  <div class="text-lg mt-1 opacity-90">EAA & BFSG seit Juni 2025</div>
  <div class="text-sm mt-2 opacity-70">WCAG-Konformität verpflichtend</div>
</div>

</v-click>

<v-click>

<div class="p-5 rounded-lg bg-gradient-to-br from-purple-500/15 to-purple-500/5 border border-purple-500/20">
  <div class="text-4xl font-bold text-purple-700 dark:text-purple-400">ROI</div>
  <div class="text-lg mt-1 opacity-90">Mehr Reichweite, besseres SEO</div>
  <div class="text-sm mt-2 opacity-70">Bessere UX für alle = Business Value</div>
</div>

</v-click>

</div>

<v-click at="4">

<div class="mt-6 text-center text-xl font-semibold p-3 bg-white/5 rounded-lg border border-white/10">
  A11y ist kein Feature — es ist die Baseline.
</div>

</v-click>

<!--
- 1,3 Mrd. = WHO-Zahl
- Behinderung nicht nur dauerhaft, auch temporär/situativ/umgebungsbedingt
- EAA = European Accessibility Act
- BFSG = Barrierefreiheitsstärkungsgesetz (dt. Umsetzung des EAA)
- SEO = Search Engine Optimization, ROI = Return on Investment
- → Überleitung: gute A11y ist auch gute UX – und umgekehrt
-->

---
layout: default
---

# UX ❤️ A11y

<div class="grid grid-cols-2 gap-8 items-center">

<div>

- **Gute UX und A11y gehen Hand in Hand**
- Verwirrende Interfaces schaden **allen** – nicht nur Menschen mit Behinderungen
- Barrierefreies Design ist einfach **besseres Design**
- A11y-Probleme sind oft **UX-Probleme**
- UX fixen verbessert A11y (und umgekehrt)

<v-click>

</v-click>

</div>

<div class="absolute right-0 top-0 h-full">
  <img src="/ux_fail.jpeg" alt="Verwirrendes Aufzugpanel in einem Hotel: Zwischen zwei Aufzügen sind die Ruftasten rechts am linken Aufzug montiert – unklar welchen Aufzug sie rufen" class="h-full object-cover rounded-l shadow" />
  <div class="absolute top-10 right-8 text-md opacity-90 text-white bg-black/80 px-2 py-1 rounded">
    Wo muss ich drücken? 🤔
  </div>
</div>

</div>

<!--
- UX = User Experience
- Foto-Kontext: Ruftaste sitzt am falschen Aufzug → niemand weiß, welchen sie ruft
- Betrifft alle: Sehende raten, kognitiv Eingeschränkte verwirrt, Blinde chancenlos
- Kernaussage: verwirrend = UX-Problem UND A11y-Problem
- → Überleitung: Wer nutzt eigentlich welche Tools?
-->

---
layout: default
---

# Assistive Technologies im Überblick

<div class="at-grid">
  <div class="at-card">
    <div class="at-icon">🗣️</div>
    <div class="at-label">Screen Reader</div>
    <div class="at-desc">VoiceOver, NVDA, JAWS, TalkBack</div>
  </div>
  <div class="at-card">
    <div class="at-icon">⠿</div>
    <div class="at-label">Braillezeilen</div>
    <div class="at-desc">Taktile Textausgabe</div>
  </div>
  <div class="at-card">
    <div class="at-icon">🎙️</div>
    <div class="at-label">Sprachsteuerung</div>
    <div class="at-desc">Dragon, Voice Control, Voice Access</div>
  </div>
  <div class="at-card">
    <div class="at-icon">🔲</div>
    <div class="at-label">Switch-Control</div>
    <div class="at-desc">Schaltersteuerung / Scanning</div>
  </div>
  <div class="at-card">
    <div class="at-icon">🔍</div>
    <div class="at-label">Bildschirmlupen</div>
    <div class="at-desc">ZoomText, macOS Zoom, Magnifier</div>
  </div>
  <div class="at-card">
    <div class="at-icon">👁️</div>
    <div class="at-label">Eye-Tracking</div>
    <div class="at-desc">Augensteuerung / Gaze Control</div>
  </div>
</div>

<div class="at-footer">
  Alle nutzen denselben <strong>Accessibility Tree</strong> als Schnittstelle
</div>

<style>
.at-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
  margin-top: 24px;
}

.at-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px 12px;
  border-radius: 12px;
  background: var(--k9n-code-bg, rgba(255,255,255,0.05));
  border: 1px solid var(--k9n-border, rgba(255,255,255,0.1));
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.at-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0,0,0,0.15);
}

.at-icon {
  font-size: 2.4rem;
  margin-bottom: 8px;
}

.at-label {
  font-weight: 700;
  font-size: 0.9rem;
  color: var(--k9n-text-primary, #fff);
  margin-bottom: 4px;
}

.at-desc {
  font-size: 0.65rem;
  color: var(--k9n-text-muted, rgba(255,255,255,0.6));
  text-align: center;
}

.at-footer {
  margin-top: 24px;
  text-align: center;
  font-size: 0.85rem;
  color: var(--k9n-text-secondary, rgba(255,255,255,0.8));
  padding: 10px;
  border-radius: 8px;
  background: rgba(59, 130, 246, 0.08);
  border: 1px solid rgba(59, 130, 246, 0.2);
}
</style>

<!--
- AT = Assistive Technologies (Hilfsmittel)
- SR = Screen Reader: VoiceOver (Apple), NVDA/JAWS (Windows), TalkBack (Android)
- NVDA = NonVisual Desktop Access, JAWS = Job Access With Speech
- Sprachsteuerung nutzt Accessible Names zum Ansteuern
- Switch-Control: 1–2 Taster, für starke motorische Einschränkung
- Bildschirmlupe (z. B. ZoomText) liest auch vor & folgt dem Fokus
- Kernpunkt: alle nutzen denselben Accessibility Tree – auch der Browser selbst
- → Überleitung: Wie kommt unser Code in diesen Tree?
-->

---
layout: default
clicks: 4
---

# Vom Code zum Accessibility Tree

<AriaEcosystemDemo />

<!--
- 3 Schichten: DOM+Semantik (schreiben wir) → A11y Tree (Schnittstelle) → Präsentation (Browser & AT)
- DOM = Document Object Model
- WAI-ARIA = Web Accessibility Initiative – Accessible Rich Internet Applications; generisch, nicht nur HTML (auch SVG, ePub)
- ARIA definiert Rollen, States, Properties; `button` hat implizit role="button"
- aria-pressed macht daraus einen Toggle/Schalter
- Core-AAM = Accessibility API Mappings: mappt auf Plattform-APIs
- Windows: MSAA / UIA, Apple: AX API, Linux: ATK / AT-SPI
- → erklärt leichte Abweichungen je OS/Browser
- Kernbotschaft: stimmt die DOM-Semantik, funktioniert Browser UND alle AT
- → Überleitung: Was passiert, wenn wir Fehler machen?
-->
