// =====================================================================
//  LEITFADEN – drei kurze Fragen, daraus entsteht ein persönlicher Lernweg.
// =====================================================================
import { RUBRIKEN } from "./registry.js";
import { t } from "./i18n.js";

// Texte der Fragen stehen in lang/<sprache>.js unter guide.<key>, guide.<key>.<wert> und guide.<key>.<wert>.d
export const QUESTIONS = [
  { key: "reading", options: ["none", "slow", "fluent"] },
  { key: "goal", options: ["quran", "alltag", "allgemein"] },
  { key: "daily", options: [10, 20, 40] },
];

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
    return { rubrik, optional, why: optional ? t("why.optional") : t("why." + id) };
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
