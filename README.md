# Dār – Arabisch lernen (دَار)

Eine Lern-App für Hocharabisch (Fuṣḥā), aufgebaut aus **Rubriken** – kleinen Apps in der App.
Jede Rubrik hat ihr eigenes Design, Erklärungen, Übungen, ein Spiel und einen eigenen Fortschritt.
Ein **Leitfaden** empfiehlt, womit man anfängt, und ein **Gesamt-Tracker** zeigt den Fortschritt über alles.

Läuft als reine Web-App auf **GitHub Pages**, der Fortschritt wird in **Firebase (Firestore)** gespeichert.

## Ordnerstruktur

```
index.html              App-Rahmen (Kopfzeile, Anmeldung)
css/base.css            Farben, Schriften, gemeinsame Bausteine
js/
  app.js                Navigation, Startseite, Leitfaden-Seite, Fortschritt-Seite
  registry.js           ⭐ Liste aller Rubriken – hier kommen neue dazu
  guide.js              Fragen des Leitfadens + Logik für die Reihenfolge
  store.js              Fortschritt (lokal + Cloud)
  firebase.js           Anmeldung + Speichern in Firestore
  config.js             ⭐ Firebase-Konfiguration eintragen
  shared.js             Helfer für Rubriken (Ziffern, Vorlesen, Antwort prüfen)
modules/
  zahlen/               Rubrik Zahlen (index.js, data.js, style.css)
  uhrzeit/              Rubrik Uhrzeit
  _vorlage/             Vorlage für neue Rubriken
firestore.rules         Sicherheitsregeln für Firestore
firebase.json           Firebase-Projektdatei (für Funktionen + Regeln)
functions/              Firebase-Funktion „tts“ für die Sprachausgabe
.nojekyll               nötig, damit GitHub Pages den Ordner _vorlage ausliefert
```


## Lernwege

Die Startseite hat drei Blöcke: den **Wortschatz-Weg** (Level 1: Zahlen, Uhrzeit, …), den **Grammatik-Weg** (Level 1: Ism/Fiʿl/Ḥarf, bestimmt/unbestimmt, …) und die **Geschichten aus dem Qur'an**.
Lernwege stehen in `js/registry.js` unter `APPROACHES`, jedes Level hat `approach: "vokabel"` oder `approach: "grammatik"`.
Der Leitfaden (drei Fragen) plant nur den Wortschatz-Weg; der Grammatik-Weg folgt der Reihenfolge in der Registry.
Erste Grammatik-Rubrik: `modules/wortarten/` (Inhalte in `data.js`, Texte in `lang.js`).

## Neue Rubrik hinzufügen

1. `modules/_vorlage` kopieren und umbenennen, z. B. `modules/farben`.
2. In `modules/farben/index.js` Inhalte, Erklärungen und Aufgaben schreiben.
   Jede Rubrik liefert drei Dinge: `percent(p)`, `summary(p)` und `mount(root, api)` – siehe Kommentar in der Vorlage.
3. In `js/registry.js` den Eintrag ergänzen (oder einen „soon“-Eintrag auf `status: "live"` stellen und `load` hinzufügen).
4. Optional: in `js/guide.js` bei `WHY` und `GOAL_ORDER` festlegen, wo die Rubrik im Leitfaden auftaucht.

Fertig – Startseite, Leitfaden und Fortschritt-Tracker übernehmen die Rubrik automatisch.

## Firebase einrichten (einmalig)

1. [console.firebase.google.com](https://console.firebase.google.com) → Projekt anlegen.
2. Projekteinstellungen → „App hinzufügen“ → Web `</>` → den `firebaseConfig`-Block in **js/config.js** einfügen.
3. Authentication → Anmeldemethode: **Anonym** und **Google** aktivieren.
4. Authentication → Einstellungen → Autorisierte Domains: `DEINNAME.github.io` hinzufügen.
5. Firestore Database → Datenbank erstellen (Standort z. B. `eur3`, Produktionsmodus) → Tab **Regeln** → Inhalt von `firestore.rules` einfügen → Veröffentlichen.

Ohne Schritt 2 läuft die App trotzdem und speichert nur im Browser.

## Auf GitHub Pages veröffentlichen

1. github.com → **New repository** → Name z. B. `dar` → **Public** → Create.
2. „uploading an existing file“ → den **Inhalt** des Ordners `dar` hineinziehen (nicht den Ordner selbst,
   und die Datei `.nojekyll` mit) → **Commit changes**.
3. Settings → **Pages** → Source: „Deploy from a branch“ → Branch `main`, Ordner `/ (root)` → Save.
4. Nach 1–2 Minuten läuft die App unter `https://DEINNAME.github.io/dar/`.
5. In Firebase → Authentication → Einstellungen → Autorisierte Domains: `DEINNAME.github.io` eintragen.

Änderungen später: Datei im Repo öffnen → Stift-Symbol → bearbeiten → Commit. Oder in VS Code:
Ordner öffnen → Quellcodeverwaltung → „Publish to GitHub“, danach nur noch Commit + Sync.

## Sprachausgabe (live, auf allen Geräten)

Die App spricht live – es gibt keine fertigen Audiodateien:
- Hat das Gerät eine arabische Stimme (iPhone, iPad, Mac, die meisten Android-Geräte), kann sie genutzt werden.
- Für alle anderen Geräte (Windows, Chrome am PC, Firefox) erzeugt die Firebase-Funktion `tts` die Sprache
  im Moment des Klicks mit Google Text-to-Speech.

Einrichten (einmalig, im Terminal von VS Code):
1. Firebase-Projekt auf den **Blaze-Tarif** umstellen (nötig für Funktionen; Kreditkarte, aber mit Freikontingent).
   Tipp: In der Google Cloud Console unter Abrechnung ein **Budget mit Warnung** (z. B. 5 €) anlegen.
2. In der Google Cloud Console für dasselbe Projekt die **Cloud Text-to-Speech API** aktivieren.
3. ```
   npm install -g firebase-tools
   firebase login
   cd dar
   firebase use --add          (dein Projekt auswählen)
   cd functions && npm install && cd ..
   firebase deploy --only functions
   ```
4. Die angezeigte Adresse der Funktion `tts` in **js/config.js** bei `TTS_URL` eintragen und auf GitHub hochladen.

`TTS_PREFER_CLOUD = true` → überall dieselbe Stimme. `false` → Gerätestimme, Cloud nur als Ersatz (spart Kontingent).
Die Funktion akzeptiert nur arabischen Text bis 200 Zeichen. Der Browser speichert jede Antwort zwischen.

## Lokal testen

Die App nutzt JavaScript-Module, darum nicht per Doppelklick öffnen, sondern über einen kleinen Server:

```
npx serve .
```
oder in VS Code mit der Erweiterung „Live Server“.

## So wird gespeichert

Firestore-Dokument `users/{uid}`:

```
{ rev, profile: { reading, goal, daily },
  overall: { xp, answered, correct, dayStreak, bestDayStreak, lastDay, today },
  modules: { zahlen: { answered, correct, streak, best, mastery: {...}, sprintBest },
             uhrzeit: { ..., mastery: {...}, gameBest } } }
```

Jeder Besucher wird automatisch anonym angemeldet. „Mit Google anmelden“ übernimmt den bisherigen Fortschritt ins Google-Konto, dann ist er auf allen Geräten verfügbar.

## Arbeitsblätter (PDF zum Ausdrucken)

Jede Rubrik kann einen Tab **Arbeitsblätter** haben. Die PDFs liegen in `modules/<rubrik>/blaetter/<sprache>/`
zusammen mit einem Vorschaubild (`.png`) und der Liste `index.json`:

```json
[{ "id": "ziffern", "title": "Die Ziffern ٠–٩", "desc": "…", "pdf": "blaetter/de/ziffern.pdf", "img": "blaetter/de/ziffern.png", "pages": 3 }]
```

- **Eigene PDFs** (z. B. aus Canva): Datei und ein Vorschaubild in den Ordner legen und einen Eintrag in `index.json` ergänzen.
- **Neue Blätter im App-Design erzeugen:** in `tools/worksheets/generate.py` eine Funktion ergänzen und
  `python3 tools/worksheets/generate.py` ausführen (braucht Python mit Playwright, pdftoppm und die Schriften Scheherazade New, Cinzel, Plus Jakarta Sans).
- In einer neuen Rubrik den Tab einbauen: `showWorksheets(element, import.meta.url)` aus `js/shared.js` aufrufen.

## Geschichten aus dem Qur'an (Kategorie, Adresse #/geschichten)

`modules/propheten/` – Personen-Übersicht → Level einer Person → Ablauf je Level: Erzählung, Ayat als Lückentext, Quiz (bestanden ab 4/5, schaltet das nächste Level frei).

- Inhalte einer Person: `modules/propheten/data/<person>.js` (Erzählung, Ayat-Referenzen mit Lücken, Quiz). Vorbild: `musa.js`.
- Neue Person in `modules/propheten/index.js` bei `PERSONS` mit `data` eintragen.
- Der Qur'an-Text wird nie von Hand geschrieben: `python3 tools/quran/build_ayat.py <pfad-zu-quran-api>` holt alle verwendeten Ayat
  aus dem Tanzil-Text (Uthmani/Hafs, github.com/fawazahmed0/quran-api), prüft jede Lücke und schreibt `modules/propheten/ayat.json`.
- Rezitation: Mishary Rāshid al-ʿAfāsī über everyayah.com.

## Sprachen (de, en, fr, ru, tr)

- **Oberfläche:** `lang/<sprache>.js`. `de.js` ist die Referenz; fehlt ein Schlüssel in einer anderen Sprache, erscheint Deutsch.
  Im Code: `t("schlüssel", { platzhalter })` aus `js/i18n.js`.
- **Inhalte** (Erzählungen, Wortbedeutungen, Quiz, Namen, Rubrik-Titel): pro Sprache als Objekt `{ de: …, en: …, fr: …, ru: …, tr: … }`,
  angezeigt mit `L(…)`. Fehlt eine Sprache, zeigt die App Deutsch und einen Hinweis.
- **Neue Sprache:** `lang/de.js` nach `lang/<code>.js` kopieren, übersetzen und in `js/i18n.js` bei `DICT` und `LANGS` eintragen.
- `tools/quran/build_ayat.py` prüft für **jede** Sprache, dass jede Ayah genau so viele Wortbedeutungen wie Wörter hat.
- Mūsā-Inhalte (Geschichte, Wortbedeutungen, Quiz): in allen 5 Sprachen (Prüfung durch den Lehrer steht noch aus). Neue Sprache einfügen: `node tools/quran/merge_lang.mjs modules/propheten/data/musa.js <sprache> <datei.json>` (prüft Wortanzahl pro Aya und Quiz-Antworten).
- Arbeitsblätter: `python3 tools/worksheets/generate.py` erzeugt jedes Blatt in allen Sprachen nach `modules/<rubrik>/blaetter/<sprache>/` (Texte in `tools/worksheets/texts.py`, gleiche Aufgaben in jeder Sprache).
