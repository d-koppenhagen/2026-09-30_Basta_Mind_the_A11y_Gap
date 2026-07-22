---
layout: section
---

# 🤖 AI Agents & A11y

<p class="text-[#8892b0] text-xl mt-4">Dein nächster User ist eine Maschine</p>

<!--
- Provokante These: Der nächste „User" eurer App ist vielleicht gar kein Mensch
- AI Agents (ChatGPT, Gemini, Claude, Kiro, ...) browsen aktiv das Web
- Was das für unsere Arbeit bedeutet → nächster Slide
-->

---
layout: default
---

# AI Agents lesen den Accessibility Tree

<div class="grid grid-cols-[1fr_1fr] gap-6 mt-2">

<div class="p-5 rounded-xl bg-indigo-500/10 border border-indigo-500/30">
  <h3 class="!text-indigo-800 dark:!text-indigo-400 !text-lg !mb-3 flex items-center gap-2"><carbon-bot /> Wie Agents „sehen"</h3>

  <div class="space-y-2 text-sm">
    <div class="flex items-start gap-2"><span class="text-indigo-400 mt-0.5">▸</span> Kein Rendering — nur <strong>Accessibility Tree</strong></div>
    <div class="flex items-start gap-2"><span class="text-indigo-400 mt-0.5">▸</span> Gleiche Datenquelle wie <strong>Screen Reader</strong></div>
    <div class="flex items-start gap-2"><span class="text-indigo-400 mt-0.5">▸</span> Schlechte A11y = Agent kann App <strong>nicht bedienen</strong></div>
  </div>

  <div class="mt-4 px-3 py-2 rounded bg-indigo-500/20 text-xs font-mono">
    ChatGPT · Gemini · Claude · Kiro · Copilot · …
  </div>
</div>

<div class="p-5 rounded-xl bg-emerald-500/10 border border-emerald-500/30">
  <h3 class="!text-emerald-800 dark:!text-emerald-400 !text-lg !mb-3 flex items-center gap-2"><carbon-tools-alt /> AI-Tools im Dev-Workflow</h3>

  <div class="space-y-2 text-sm">
    <div class="flex items-start gap-2"><span class="text-emerald-400 mt-0.5">▸</span> <strong>Chrome DevTools MCP</strong> — Agents steuern Chrome fern</div>
    <div class="flex items-start gap-2"><span class="text-emerald-400 mt-0.5">▸</span> Lighthouse-Audits <strong>automatisch</strong> ausführen & fixen</div>
    <div class="flex items-start gap-2"><span class="text-emerald-400 mt-0.5">▸</span> <strong>Modern Web Guidance</strong> — Best Practices im Agent-Kontext</div>
  </div>

  <div class="mt-4 px-3 py-2 rounded bg-emerald-500/20 text-xs font-mono">
    Code schreiben → prüfen → fixen → verifizieren 🔄
  </div>
</div>

</div>

<v-click>
<div class="mt-5 p-4 rounded-lg bg-gradient-to-r from-indigo-500/15 to-emerald-500/15 border border-white/10 text-center text-lg">
  🎯 <strong>Gute A11y = gute Agent-Readiness.</strong> Für Menschen bauen → automatisch für Maschinen bauen.
</div>
</v-click>

<!--
- LINKS: AI Agents nutzen den Accessibility Tree als primäres Datenmodell
  - Kein visuelles Rendering, nur programmatische Struktur
  - Exakt gleiche Basis wie Screen Reader → gleiche Probleme
  - Wenn ein Screen Reader eure App nicht bedienen kann, kann es ein Agent auch nicht
- RECHTS: Wir können AI auch FÜR uns nutzen
  - Chrome DevTools MCP: Agent navigiert, auditiert, fixt
  - Modern Web Guidance: Aktuelle Best Practices direkt im Agent
  - Vollständiger Kreislauf: schreiben → prüfen → fixen → verifizieren
- [KLICK] Die Pointe: Wer für Menschen baut, baut automatisch für Maschinen
  - Noch ein Business-Case für A11y!
- → Überleitung: Zusammenfassung der wichtigsten Erkenntnisse
-->
