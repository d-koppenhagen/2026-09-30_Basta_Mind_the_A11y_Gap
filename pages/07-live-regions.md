---
layout: section
---

# Live Regions & Dynamische Inhalte

Änderungen für Screen-Reader-Nutzende ankündigen

<!--
- Moderne Apps: Inhalte ändern sich ohne Seitenneuladen
- Screen Reader kündigen Änderungen nicht automatisch an
- ARIA Live Regions lösen dieses Problem
- Aber: Hier wird es knifflig...
- → Überleitung: Das Live-Region-Problem
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
  div.textContent = msg;
  // Live Region wird NACH dem
  // initialen Laden hinzugefügt
  document.body.appendChild(div);
}
```

**Probleme:**
- Element NACH aria-live erstellt
- Screen Reader verpassen es!
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
- Kniffligstes A11y-Problem in SPAs
- LINKS: Element erstellen UND gleichzeitig aria-live setzen
  - Sieht korrekt aus, funktioniert aber nicht!
  - [KLICK] Screen Reader brauchen aria-live BEVOR sich Inhalt ändert
  - Stiller Fehler – keine Ankündigung
- RECHTS:
  - [KLICK] Globales Live-Region-Pattern: Persistente leere Region im HTML
  - Zum Ankündigen nur textContent aktualisieren
  - Zuverlässig in allen Screen Readern
- → Überleitung: Globale vs lokale Patterns
-->

---
layout: default
---

# Globale vs Lokale Live Regions

<LiveRegionDemo />

<!--
- Zwei Patterns nebeneinander als Demo:
  - LINKS – Global: Notification-Banner oben in der Seite (Toasts, Status-Meldungen)
    - Augen schauen nach oben wenn Notification erscheint
    - Ein einzelner Announcer für die gesamte App
  - RECHTS – Lokal: Chat-Widget unten rechts (Live-Feeds, Chat-Nachrichten)
    - Chat öffnet sich, Nachrichten kommen rein, Chat schließt sich
    - Augen schauen zum Chat wenn neue Nachrichten kommen
- Entscheidende Regel: Live Region muss im DOM existieren BEVOR Inhalt aktualisiert wird
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
- Kurzreferenz ARIA Live Attribute:
- [KLICK] polite: Warten bis Nutzende fertig sind → 99% der Fälle
- [KLICK] assertive: Sofort unterbrechen → nur kritische Alerts!
- [KLICK] atomic="true": Gesamte Region vorlesen (Status-Meldungen)
- [KLICK] atomic="false": Nur Änderungen vorlesen (Chat, Listen)
- [KLICK] aria-relevant: Steuert was Ankündigungen auslöst
- [KLICK] Warnung: assertive sparsam verwenden! Sehr störend.
- → Überleitung: Visuelle Barrierefreiheit
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
- Challenge: Dynamische Live Region korrekt implementieren
- → Überleitung: Visuelle Barrierefreiheit
-->
