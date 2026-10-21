// =====================================================================
//  LEITFADEN – drei kurze Fragen, daraus entsteht ein persönlicher Lernweg.
// =====================================================================
import { RUBRIKEN } from "./registry.js";

export const QUESTIONS = [
  {
    key: "reading", label: "Wie gut liest du arabische Schrift?",
    options: [
      { v: "none", t: "Noch gar nicht", d: "Die Buchstaben sind mir neu." },
      { v: "slow", t: "Langsam, mit Vokalzeichen", d: "Ich kann Wörter mit Ḥarakāt entziffern." },
      { v: "fluent", t: "Sicher", d: "Ich lese flüssig, auch Qurʾān." },
    ],
  },
  {
    key: "goal", label: "Wofür lernst du Arabisch?",
    options: [
      { v: "quran", t: "Qurʾān verstehen", d: "Zahlen, Zeiten und Begriffe aus den Āyāt." },
      { v: "alltag", t: "Alltag & Gespräche", d: "Grüßen, sich vorstellen, Uhrzeit fragen." },
      { v: "allgemein", t: "Ein solides Fundament", d: "Schritt für Schritt alles Wichtige." },
    ],
  },
  {
    key: "daily", label: "Wie viel möchtest du am Tag schaffen?",
    options: [
      { v: 10, t: "10 richtige Antworten", d: "Etwa 5 Minuten" },
      { v: 20, t: "20 richtige Antworten", d: "Etwa 10 Minuten" },
      { v: 40, t: "40 richtige Antworten", d: "Etwa 20 Minuten" },
    ],
  },
];

const WHY = {
  alphabet: "Ohne Buchstaben geht nichts – das ist dein Startpunkt.",
  harakat: "Mit den Vokalzeichen liest du jedes Wort richtig aus.",
  zahlen: "Zahlen brauchst du überall, und die Ziffern lernst du auch ohne Lesekenntnisse.",
  uhrzeit: "Baut direkt auf den Zahlen auf: Ordnungszahlen für die Stunden.",
  begruessung: "Die ersten Sätze, die du jeden Tag benutzt.",
  wochentage: "Tage, Monate und Datum – inklusive hidschri-Kalender.",
  familie: "Über Menschen sprechen und erste Besitzformen.",
};
const GOAL_ORDER = {
  quran: ["zahlen", "uhrzeit", "wochentage", "familie", "begruessung"],
  alltag: ["begruessung", "zahlen", "uhrzeit", "familie", "wochentage"],
  allgemein: null, // Reihenfolge aus der Registry
};

/** Liefert den Lernweg: [{ rubrik, optional, why }] */
export function buildPath(profile) {
  const p = profile || { reading: "none", goal: "allgemein" };
  const basics = ["alphabet", "harakat"];
  const rest = RUBRIKEN.map((r) => r.id).filter((id) => !basics.includes(id));
  const ordered = GOAL_ORDER[p.goal]
    ? [...GOAL_ORDER[p.goal].filter((id) => rest.includes(id)), ...rest.filter((id) => !GOAL_ORDER[p.goal].includes(id))]
    : rest;

  const skip = p.reading === "fluent" ? basics : p.reading === "slow" ? ["alphabet"] : [];
  const required = basics.filter((id) => !skip.includes(id));
  const ids = [...required, ...ordered, ...skip];

  return ids.map((id) => {
    const rubrik = RUBRIKEN.find((r) => r.id === id);
    const optional = skip.includes(id);
    return { rubrik, optional, why: optional ? "Optional – du kannst schon lesen. Gut zum Auffrischen." : WHY[id] || rubrik.desc };
  });
}

/** Die nächste Rubrik, die der Nutzer machen sollte (+ ggf. Hinweis auf eine, die noch fehlt). */
export function recommend(profile, percentOf, doneAt) {
  const path = buildPath(profile).filter((s) => !s.optional);
  const next = path.find((s) => s.rubrik.status === "live" && percentOf(s.rubrik.id) < doneAt)
    || path.find((s) => s.rubrik.status === "live") || null;
  // eine empfohlene Rubrik davor, die es noch nicht gibt („kommt bald“)
  const blocked = next ? path.slice(0, path.indexOf(next)).find((s) => s.rubrik.status !== "live") || null : null;
  return { next, blocked };
}
