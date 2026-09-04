---
theme: ./slidev-theme-k9n
title: Mind the A11y Gap - Die häufigsten Fallstricke bei der Umsetzung barrierefreier Webanwendungen
titleTemplate: '%s | DB Systel GmbH'
colorSchema: both
info: |
  ## Mind the A11y Gap: Die häufigsten Fallstricke bei der Umsetzung barrierefreier Webanwendungen

  Barrierefreiheit ist kein Nice-to-have – sie ist essenziell für digitale Erlebnisse, die für alle funktionieren.

  Von Danny Koppenhagen
configs:
  title: Mind the A11y Gap
  author: Danny Koppenhagen
  company: DB Systel GmbH
  date: 30.09.2026
layout: cover
background: /bridging-a11y.png
drawings:
  persist: false
mdc: true
duration: 45min
css: unocss
lang: de
---

<style src="./style.css"></style>

# Mind the A11y Gap

## Die häufigsten Fallstricke bei der Umsetzung barrierefreier Webanwendungen

<div class="abs-br m-6 flex gap-2">
  <a href="https://k9n.dev" target="_blank" alt="Website" title="Website"
    class="text-xl slidev-icon-btn text-white/90 !border-none hover:text-white">
    <carbon-earth />
  </a>
  <a href="https://github.com/d-koppenhagen" target="_blank" alt="GitHub" title="GitHub"
    class="text-xl slidev-icon-btn text-white/90 !border-none hover:text-white">
    <carbon-logo-github />
  </a>
  <a href="https://bsky.app/profile/k9n.dev" target="_blank" alt="BlueSky" title="BlueSky"
    class="text-xl slidev-icon-btn text-white/90 !border-none hover:text-white">
    <carbon-logo-bluesky />
  </a>
</div>

<!--
- A11y = Accessibility (a + 11 Buchstaben + y)
- Framework-agnostisch: HTML/CSS/JS, sofort anwendbar
- Bezüge zu Blazor / .NET-Ökosystem an passenden Stellen
-->

---
src: ./pages/01-intro.md
---

---
src: ./pages/02-why-a11y.md
---

---
src: ./pages/03-common-traps.md
---

---
src: ./pages/04-semantic-html.md
---

---
src: ./pages/05-keyboard-focus.md
---

---
src: ./pages/06-forms.md
---

---
src: ./pages/07-live-regions.md
---

---
src: ./pages/08-visual-a11y.md
---

---
src: ./pages/09-testing.md
---

---
src: ./pages/10-ai-agents.md
---

---
src: ./pages/11-outro.md
---
