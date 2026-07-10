---
layout: section
---

# Live Regions & Dynamische Inhalte

Änderungen für Screen-Reader-Nutzer ankündigen

<!--
Moderne Apps sind dynamisch – Inhalte ändern sich ohne Seitenneuladen.

Aber Screen Reader kündigen diese Änderungen nicht automatisch an.

Hier kommen ARIA Live Regions ins Spiel.

Und hier wird es knifflig...
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

<v-click>

**Probleme:**
- Element NACH aria-live erstellt
- Screen Reader verpassen es!
- Stiller Fehler – keine Ankündigung

</v-click>

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
Das ist eins der kniffligsten A11y-Probleme in SPAs.

LINKS – Problem:
Ein Element erstellen und gleichzeitig aria-live setzen.
Sieht aus als sollte es funktionieren, oder?

[KLICK]
Falsch! Screen Reader brauchen das aria-live-Element BEVOR sich der Inhalt ändert.
Wenn man es dynamisch erstellt, verpassen sie es. Stiller Fehler.

RECHTS:
[KLICK]
Lösung: Globales Live-Region-Pattern.
Eine persistente, leere Live Region im HTML erstellen.
Wenn ihr etwas ankündigen müsst, einfach den Inhalt aktualisieren.

Das ist das zuverlässige Pattern, das in allen Screen Readern funktioniert.

Aber es gibt noch einen anderen Ansatz...
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
Zwei Patterns für Live Regions:

LINKS – Globales Pattern:
Ein einzelner Announcer für die gesamte App.
Perfekt für Toast-Benachrichtigungen, Status-Meldungen, globale Ankündigungen.
Einfach zu implementieren und zu pflegen.

RECHTS – Lokales Pattern:
Live Region innerhalb einer bestimmten Komponente.
Perfekt für Chat-Nachrichten, Live-Feeds, komponentenspezifische Updates.
Die Live Region ist Teil der Komponentenstruktur.

[KLICK]
Die entscheidende Regel für beide: Die Live Region muss im DOM existieren, BEVOR ihr ihren Inhalt aktualisiert.

Das ist das Geheimnis für zuverlässige Screen-Reader-Ankündigungen.
-->

---
layout: default
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
Kurzreferenz für ARIA Live Attribute:

[DURCH JEDEN KLICK GEHEN]

aria-live="polite": Warten bis Nutzer fertig ist, dann ankündigen. Das verwenden in 99% der Fälle.

aria-live="assertive": Sofort unterbrechen. Nur für kritische Alerts wie „Eure Sitzung läuft ab!"

aria-atomic="true": Die gesamte Region vorlesen. Gut für Status-Meldungen.

aria-atomic="false": Nur vorlesen was sich geändert hat. Gut für Chat-Nachrichten oder Listen.

aria-relevant: Steuern, was Ankündigungen auslöst.

[LETZTER KLICK]
Warnung: Assertive nicht übermäßig verwenden! Es ist als würde jemand schreien, während man versucht zu lesen.
Sehr nervig und desorientierend.

Polite ist fast immer die richtige Wahl.

Jetzt decken wir schnell visuelle Barrierefreiheit ab...
-->

---
layout: center
class: text-center
---

# Ausprobieren

<a href="https://practica11y.dev/challenges/live-region-dynamic" target="_blank" class="text-2xl pt-10">🎮 Challenge: Live Region Dynamic</a>

<!--
- Hier die passende Challenge auf practica11y.dev zum Selbstausprobieren
- Dynamische Live Region korrekt implementieren
- → Überleitung: Jetzt zu visueller Barrierefreiheit
-->
