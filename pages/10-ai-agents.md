---
layout: section
---

# 🤖 AI Agents & A11y

<p class="text-[#64748b] text-xl mt-4">Dein nächster User ist eine Maschine</p>

<!--
- Provokante These: nächster „User" ist evtl. kein Mensch
- AI Agents browsen aktiv das Web
- → Überleitung: Was heißt das für unsere Arbeit?
-->

---
layout: default
---

# AI Agents lesen den Accessibility Tree

<style>
/* Theme fügt "—" via .slidev-layout ul > li::before hinzu.
   Diese Boxen nutzen eigene ▸-Marker → Theme-Dash entfernen,
   sonst überlagern sich beide Marker. */
.agent-tree-list > li::before {
  content: none !important;
}
</style>

<div class="grid grid-cols-[1fr_1fr] gap-6 mt-2">

<div class="p-5 rounded-xl bg-indigo-500/10 border border-indigo-500/30">
  <h3 class="!text-indigo-800 dark:!text-indigo-400 !text-lg !mb-3 flex items-center gap-2"><carbon-bot /> Wie Agents „sehen"</h3>

  <ul class="agent-tree-list space-y-2 text-sm !list-none !pl-0 !my-0">
    <li class="!list-none !ml-0 !pl-0"><span class="text-indigo-400">▸</span> Kein Rendering — nur <strong>Accessibility Tree</strong></li>
    <li class="!list-none !ml-0 !pl-0"><span class="text-indigo-400">▸</span> Gleiche Datenquelle wie <strong>Screen Reader</strong></li>
    <li class="!list-none !ml-0 !pl-0"><span class="text-indigo-400">▸</span> Schlechte A11y = Agent kann App <strong>nicht bedienen</strong></li>
  </ul>

  <div class="mt-4 px-3 py-2 rounded bg-indigo-500/20 text-xs font-mono">
    ChatGPT · Gemini · Claude · Kiro · Copilot · …
  </div>
</div>

<div class="p-5 rounded-xl bg-emerald-500/10 border border-emerald-500/30">
  <h3 class="!text-emerald-800 dark:!text-emerald-400 !text-lg !mb-3 flex items-center gap-2"><carbon-tools-alt /> AI-Tools im Dev-Workflow</h3>

  <ul class="agent-tree-list space-y-2 text-sm !list-none !pl-0 !my-0">
    <li class="!list-none !ml-0 !pl-0"><span class="text-emerald-400">▸</span> <strong>Chrome DevTools MCP</strong> — Agents steuern Chrome fern</li>
    <li class="!list-none !ml-0 !pl-0"><span class="text-emerald-400">▸</span> Lighthouse-Audits <strong>automatisch</strong> ausführen & fixen</li>
    <li class="!list-none !ml-0 !pl-0"><span class="text-emerald-400">▸</span> <strong>Modern Web Guidance</strong> — Best Practices im Agent-Kontext</li>
  </ul>

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
- Agents nutzen den A11y Tree als primäres Datenmodell – gleiche Basis wie SR
- Merksatz: SR kann App nicht bedienen → Agent auch nicht
- MCP = Model Context Protocol; Chrome DevTools MCP: Agent navigiert, auditiert, fixt
- .NET: GitHub Copilot generiert oft NICHT barrierefreien Code (divs statt buttons, fehlende Labels)
- Gegenmittel: „Make this accessible" oder A11y-Regeln in `.github/copilot-instructions.md`
- Pointe: für Menschen bauen = für Maschinen bauen → weiterer Business-Case
- → Überleitung: Zusammenfassung
-->
