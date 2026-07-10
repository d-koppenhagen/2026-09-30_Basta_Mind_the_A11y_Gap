---
layout: section
---

# 🤖 AI Agents & Barrierefreiheit

<p class="text-[#8892b0] text-xl mt-4">Warum A11y auch für Maschinen zählt</p>

<!--
- KI-Assistenten browsen das Web – nutzen denselben Accessibility Tree wie Screen Reader
- → Was das für uns bedeutet
-->

---
layout: default
---

# AI Agents = Screen Reader

<div class="grid grid-cols-2 gap-8">

<div>

- AI Agents **browsen das Web** (ChatGPT, Gemini, Claude, Kiro, ...)
- Nutzen den **Accessibility Tree** als Datenmodell
- Schlechte A11y → schlechte Agent-Interaktion

</div>

<div>

- **Semantisches HTML** & programmatische Namen
- **Labels / ARIA** für Formulare
- **Stabile Layouts** (kein CLS)

</div>

</div>

<v-click>

<div class="mt-4 p-4 bg-blue-500 bg-opacity-10 rounded">
💡 Gute A11y = gute Agent-Readiness. Für Menschen bauen → automatisch für Maschinen bauen.
</div>

</v-click>

<!--
- AI Agents nutzen Accessibility Tree als primäres Datenmodell
- Alles was für Screen Reader hilft, hilft auch KI-Agenten
- Weiterer Business-Case für A11y!
- → Überleitung: Chrome DevTools für Agents
-->

---
layout: default
---

# Chrome Built-in AI Tools

<div class="grid grid-cols-2 gap-8">

<div>

## Chrome DevTools MCP

- KI-Agents **steuern Chrome fern**
- Lighthouse-Audits automatisch ausführen
- A11y + SEO + Agentic Browsing prüfen

```bash
npx chrome-devtools-mcp@latest
```

</div>

<div>

## Modern Web Guidance

- Best Practices direkt im Agent-Kontext
- Webplattform-Expertise & A11y-Patterns
- Legacy-Modernisierung & Performance

```bash
npx modern-web-guidance@latest install
```

</div>

</div>

<v-click>

<div class="mt-4 p-4 bg-green-500 bg-opacity-10 rounded">
✅ DevTools MCP + Web Guidance = AI-gestützter A11y-Workflow
</div>

</v-click>

<!--
- Chrome DevTools MCP: Agent kann navigieren, Lighthouse laufen lassen, A11y Tree inspizieren
- Modern Web Guidance: Skills mit Web-Expertise für Agents
- Kombination = vollständiger A11y-Workflow: Code schreiben → prüfen → fixen → verifizieren
- → Überleitung: Zusammenfassung
-->
