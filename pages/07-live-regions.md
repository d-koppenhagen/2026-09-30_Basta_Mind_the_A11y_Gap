---
layout: section
---

# Live Regions & Dynamische Inhalte

Änderungen für Screen-Reader-Nutzer ankündigen

<!--
- Moderne Apps: Inhalte ändern sich ohne Seitenneuladen
- Screen Reader kündigen Änderungen nicht automatisch an
- ARIA Live Regions lösen das Problem
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

<div class="grid grid-cols-2 gap-4">

<div>

## Globales Pattern

```html
<!-- Globaler einzelner Announcer -->
<div id="announcer" class="sr-only"
  aria-live="polite">
</div>
```

```js
announce("Artikel zum Warenkorb hinzugefügt");
announce("Formular gespeichert");
announce("3 neue Nachrichten");
```

**Verwenden wenn:**
- Toast-Benachrichtigungen
- Status-Meldungen
- Globale Ankündigungen

</div>

<div>

## Lokales Pattern

```html
<!-- Live Region in Komponente -->
<div class="chat">
  <div aria-live="polite" aria-atomic="false">
    <div>Erste Nachricht von Jane</div>
    <!-- Neue Nachrichten hier -->
    <div>Neue Nachricht von John</div>
  </div>
</div>
```

**Verwenden wenn:**
- Chat-Nachrichten
- Live-Feeds
- Komponentenspezifische Updates

</div>

</div>

<v-click>

<div class="mt-2 p-4 bg-blue-500 bg-opacity-10 rounded">
💡 Schlüssel: Live Region muss BEVOR sich Inhalte ändern existieren!
</div>

</v-click>

<!--
- Zwei Patterns:
  - LINKS – Global: Ein Announcer für die gesamte App (Toasts, Status-Meldungen)
  - RECHTS – Lokal: Live Region in Komponente (Chat, Live-Feeds)
- [KLICK] Entscheidende Regel: Live Region muss im DOM existieren BEVOR Inhalt aktualisiert wird
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

<v-clicks>

- **aria-live="polite"** – Ankündigen wenn Nutzer untätig ist (häufigster Fall)
- **aria-live="assertive"** – Sofort ankündigen (sparsam verwenden!)
- **aria-atomic="true"** – Gesamte Region vorlesen (vs nur Änderungen)
- **aria-atomic="false"** – Nur Änderungen vorlesen (gut für Listen)
- **aria-relevant** – Welche Änderungen ankündigen (additions, removals, text, all)

</v-clicks>

<v-click>

<div class="mt-4 p-4 bg-yellow-500 bg-opacity-10 rounded">
⚠️ Assertive sparsam verwenden – es unterbricht den Nutzer!
</div>

</v-click>

<!--
- Kurzreferenz ARIA Live Attribute:
- [KLICK] polite: Warten bis Nutzer fertig ist → 99% der Fälle
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
  { slug: 'live-region-dynamic', title: 'Live Region Dynamic' },
]" />

<!--
- Challenge: Dynamische Live Region korrekt implementieren
- → Überleitung: Visuelle Barrierefreiheit
-->
