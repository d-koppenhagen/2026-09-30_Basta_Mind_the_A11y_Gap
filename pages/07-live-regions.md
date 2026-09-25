---
layout: section
---

# Live Regions & Dynamische Inhalte

Änderungen für Screen-Reader-Nutzende ankündigen

<!--
- Inhalte ändern sich ohne Reload; SR kündigt das nicht automatisch an
- ARIA Live Regions lösen das – aber knifflig in der Umsetzung
- → Überleitung: das Live-Region-Problem
-->

---
layout: default
---

# Das Live-Region-Problem

<div class="grid grid-cols-2 gap-4">

<div>

## ❌ Problem

```js
// Benachrichtigung hinzufügen
function showNotification(msg) {
  const div = document.createElement('div');
  div.setAttribute('aria-live', 'polite');
  div.textContent = msg; // Region + Inhalt
  // im selben Schritt erzeugt
  // → SR registriert keine Änderung
  document.body.appendChild(div);
}
```

**Probleme:**
- Region + Inhalt gleichzeitig erzeugt
- SR registriert keine Änderung
- Stiller Fehler – keine Ankündigung

</div>

<div>

<v-click>

## ✅ Lösung: Globale Live Region

```html
<!-- Im HTML, immer vorhanden -->
<div class="sr-only" id="announcer"
  aria-live="polite" aria-atomic="true"
></div>
```

```js
function announce(msg) { // Inhalt aktualisieren
  document.getElementById('announcer')
    .textContent = msg;
}
```

**Vorteile:**
- Live Region existiert vor dem Update
- Zuverlässige Ankündigungen
- Funktioniert in allen Screen Readern

</v-click>

</div>

</div>

<!--
- Kernregel: Region muss im DOM + vom SR registriert sein, BEVOR Inhalt reinkommt – nicht zwingend beim initialen Laden
- Faustregel: erst leere Region einfügen → kurz warten (1 Frame) → dann Text setzen
- Fehler: Region + Inhalt im selben Schritt → SR sieht keine Änderung → still
- Chat: Widget darf später in den DOM, aber leere Region vor der ersten Nachricht anlegen
- SR = Screen Reader
- → Überleitung: globale vs lokale Patterns
-->

---
layout: default
---

# Globale vs Lokale Live Regions

<LiveRegionDemo />

<!--
- Global: ein Announcer für die ganze App (Toasts, Status-Meldungen)
- Lokal: eigene Region am Ort (Chat, Live-Feed) – Fokus/Blick ist schon dort
- Beide: Region muss im DOM sein, BEVOR aktualisiert wird
- → Überleitung: Attribute im Detail
-->

---
layout: default
hide: true
---

# ARIA Live Attribute

```html
<div aria-live="polite" aria-atomic="true" aria-relevant="additions text">
  Inhalt wird hier aktualisiert
</div>
```

- **aria-live="polite"** – Ankündigen wenn Nutzende untätig sind (häufigster Fall)
- **aria-live="assertive"** – Sofort ankündigen (sparsam verwenden!)
- **aria-atomic="true"** – Gesamte Region vorlesen (vs nur Änderungen)
- **aria-atomic="false"** – Nur Änderungen vorlesen (gut für Listen)
- **aria-relevant** – Welche Änderungen ankündigen (additions, removals, text, all)

<v-click>

<div class="mt-4 p-4 bg-yellow-500 bg-opacity-10 rounded">
⚠️ Assertive sparsam verwenden – es unterbricht die Nutzenden!
</div>

</v-click>

<!--
- Kurzreferenz (Slide versteckt)
- Merksatz: polite ≈ 99 % der Fälle, assertive nur für kritische Alerts (unterbricht)
- → Überleitung: visuelle Barrierefreiheit
-->

---
layout: center
class: text-center
---

# Ausprobieren

<ChallengeLinks :challenges="[
  { slug: 'live-region-dynamic', title: 'Breaking News' },
]" />

<!--
- Challenge: dynamische Live Region korrekt implementieren
- → Überleitung: visuelle Barrierefreiheit
-->
