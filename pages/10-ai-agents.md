---
layout: section
---

# 🤖 AI Agents & Barrierefreiheit

<p class="text-[#8892b0] text-xl mt-4">Warum A11y auch für Maschinen zählt</p>

<!--
- KI-gesteuerte Assistenten interagieren zunehmend mit Websites
- Sie nutzen denselben Accessibility Tree wie Screen Reader
- → Überleitung: Was das für uns bedeutet
-->

---
layout: default
---

# AI Agents verstehen eure Seite wie Screen Reader

<div class="grid grid-cols-2 gap-8">

<div>

## Warum das relevant ist

- AI Agents (ChatGPT, Gemini, Claude) **browsen das Web**
- Sie nutzen den **Accessibility Tree** als Datenmodell
- Gleiche Basis wie assistive Technologien
- Schlechte A11y = schlechte Agent-Interaktion

</div>

<div>

## Was Agents brauchen

- **Semantisches HTML** – klare Struktur
- **Programmatische Namen** für alle interaktiven Elemente
- **Stabile Layouts** (kein CLS)
- **Labels und ARIA** für Formulare
- Klare Navigationsstruktur

</div>

</div>

<v-click>

<div class="mt-4 p-4 bg-blue-500 bg-opacity-10 rounded">
💡 Gute Barrierefreiheit = gute Agent-Readiness. Wer für Menschen baut, baut automatisch für Maschinen mit.
</div>

</v-click>

<!--
- AI Agents nutzen den Accessibility Tree als primäres Datenmodell
- Alles was wir über semantisches HTML, Labels, ARIA gelernt haben:
  - Hilft Menschen mit Behinderungen
  - Hilft auch KI-Agenten die Seite zu verstehen
- Schlecht zugänglich = schlecht für AI Agents
- Weiterer Business-Case für Barrierefreiheit!
- → Überleitung: Chrome DevTools für Agents
-->

---
layout: default
---

# Chrome DevTools für AI Agents

<div class="grid grid-cols-2 gap-8">

<div>

## Chrome DevTools for Agents (MCP)

- KI-Agents können Chrome **fernsteuern**
- Lighthouse-Audits **automatisch** ausführen
- Barrierefreiheit + SEO + Agentic Browsing prüfen
- Agent simuliert echte Nutzer-Interaktionen

```bash
npx chrome-devtools-mcp@latest
```

</div>

<div>

## Use Cases

- 🧪 **Automatische A11y-Audits** im CI/CD
- 🔍 **Proaktive Qualitätssicherung** vor Deploy
- 🖥️ **Emulation** verschiedener Geräte und Standorte
- 🐛 **Live-Debugging** mit AI-Support

</div>

</div>

<!--
- Chrome DevTools for Agents: MCP-Server für KI-Coding-Agents
- Agent kann: Navigieren, Lighthouse Audits, Accessibility Tree inspizieren, Debuggen
- Perfekt für automatisiertes A11y-Testing im Entwicklungs-Workflow
- → Überleitung: Modern Web Guidance
-->


---
layout: default
---

# Modern Web Guidance

<div class="grid grid-cols-2 gap-8">

<div>

## Skills für Coding-Agents

- Best Practices direkt in den Agent einbetten
- Webplattform-Expertise & Browser-Kompatibilität
- Modernisierung von Legacy-Code
- Performance- & Security-Optimierung

```bash
npx modern-web-guidance@latest install
```

</div>

<div>

## Beispiel-Prompts

- *„Migriere modale Dialoge auf das `<dialog>`-Element"*
- *„Implementiere einen Passkey-Login-Flow"*
- *„Führe ein A11y-Audit durch und schlage Fixes vor"*
- *„Optimiere mein LCP"*

</div>

</div>

<v-click>

<div class="mt-4 p-4 bg-green-500 bg-opacity-10 rounded">
✅ Kombination: Modern Web Guidance Skills + Chrome DevTools for Agents = AI-gestützter A11y-Workflow
</div>

</v-click>

<!--
- Modern Web Guidance: Skills für Coding-Agents mit Web-Expertise
- Best Practices direkt im Agent-Context: A11y, Performance, Security, moderne APIs
- Kombination mit Chrome DevTools = vollständiger A11y-Workflow:
  - Agent schreibt Code → prüft automatisch → fixed Probleme → verifiziert
- → Überleitung: Zusammenfassung
-->
