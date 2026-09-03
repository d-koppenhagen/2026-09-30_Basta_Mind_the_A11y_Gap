# Mind the A11y Gap: Die häufigsten Fallstricke bei der Umsetzung barrierefreier Webanwendungen

Barrierefreiheit ist nicht nur ein nettes Extra – sie ist entscheidend, um digitale Erlebnisse zu schaffen, die für alle funktionieren. Aber zu wissen, wo man anfangen soll und was wirklich Priorität hat, kann schnell überwältigend wirken. In diesem Vortrag schauen wir uns die häufigsten Barrierefreiheits-Fallstricke in modernen Webanwendungen an und gehen der Frage nach, warum sie überhaupt auftreten – und wie man sie wirksam löst. Dabei geht es um praktische, frameworkunabhängige Best Practices, mit denen sich viele Probleme von Anfang an vermeiden lassen: Semantik, Tastaturnavigation, Fokusmanagement, Farbkontraste, Medienalternativen und eine sinnvolle Inhaltsstruktur. Anhand konkreter Beispiele zeige ich Muster, die oft unbemerkt Barrieren aufbauen – und wie man sie abbaut, ohne zusätzliche Komplexität in die Anwendung zu bringen.

**[Von Danny Koppenhagen](https://k9n.dev)**

**Event:** [BASTA! Mainz - 30. September 2026](https://basta.net/user-interface/bridging-accessibility-pitfalls/)

## 📊 Die Präsentation

Du kannst dir die Präsentationsfolien hier ansehen:

**[https://d-koppenhagen.github.io/2026-09-30-Basta_Mind_the_A11y_Gap/](https://d-koppenhagen.github.io/2026-09-30-Basta_Mind_the_A11y_Gap/)**

## 🔬 Interaktive Demos: Practica11y

Erkunde eine Vielzahl interaktiver Demos und Challenges in Practica11y:
**[https://practica11y.dev/](https://practica11y.dev)**

## 🛠️ Lokaler Start

```bash
pnpm install
pnpm run dev
```

## 🎨 Themes

Die Präsentation nutzt standardmäßig das lokale Theme `slidev-theme-k9n`. Dieses
ist immer verfügbar und wird auch beim Build für GitHub Pages sowie beim
Veröffentlichen verwendet.

Für doe DB branded slides kann das Theme `@db-tt-web/slidev-theme-dbsystel`
genutzt werden. Es ist als `optionalDependency` eingebunden.

Um mit dem DB-Theme zu arbeiten, gibt es eigene Scripts (Suffix `:db`), die das
Theme per `--theme`-Flag überschreiben:

```bash
pnpm run dev:db      # Dev-Server mit DB-Theme
pnpm run build:db    # Build mit DB-Theme
pnpm run export:db   # PDF-Export mit DB-Theme
pnpm run start:db    # Dev-Server + Demos + KeyCastr mit DB-Theme
```

### DB-Theme (lokaler Link)

> **Hinweis:** Dieser Abschnitt ist nur relevant, wenn du das DB-Theme lokal
> vorliegen hast. Externe Nutzer können ihn ignorieren – für sie wird das Theme
> beim `pnpm install` automatisch übersprungen (es ist eine `optionalDependency`).

Das Theme `@db-tt-web/slidev-theme-dbsystel` wird **nicht** ins Repo eingecheckt
und **nicht** aus einer Registry installiert. Stattdessen wird es per lokalem
`link:` aus einem benachbarten Verzeichnis eingebunden:

```json
"optionalDependencies": {
  "@db-tt-web/slidev-theme-dbsystel": "link:../../tt-web/slidev-theme-db-systel"
}
```

So gelangt weder eine interne Registry-URL noch interner Theme-Code ins
(öffentliche) Repo. Das Lockfile enthält lediglich die `link:`-Referenz.

**Voraussetzung:** Der Theme-Ordner muss relativ zu diesem Repo unter
`../../tt-web/slidev-theme-db-systel` liegen. Ist das der Fall, reicht ein
normaler Install:

```bash
pnpm install
pnpm run dev:db
```

Liegt der Ordner nicht dort, wird das Theme beim Install übersprungen und die
`:db`-Scripts funktionieren nicht – die Standard-Scripts (mit `slidev-theme-k9n`)
laufen aber weiterhin.

> **Falls `pnpm install` mit einem Supply-Chain-Policy-Fehler abbricht**
> (kann nach einem Wechsel der Theme-Quelle passieren, weil ein veralteter
> Lockfile-Eintrag gegen die Registry geprüft wird): das Lockfile einmalig mit
> `pnpm install --config.trustLockfile=true` neu erzeugen. Danach läuft
> `pnpm install` wieder ohne Flag durch.
