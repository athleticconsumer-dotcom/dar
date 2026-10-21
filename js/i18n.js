// =====================================================================
//  SPRACHEN
//  t("schlüssel", {werte})  → Text der Oberfläche in der gewählten Sprache
//  L({ de: …, en: … })      → Inhalt in der gewählten Sprache (Fallback: Deutsch)
//  Neue Sprache: lang/<code>.js anlegen (Kopie von de.js) und unten eintragen.
// =====================================================================
import de from "../lang/de.js";
import en from "../lang/en.js";
import fr from "../lang/fr.js";
import ru from "../lang/ru.js";
import tr from "../lang/tr.js";

const DICT = { de, en, fr, ru, tr };
export const LANGS = [
  { id: "de", name: "Deutsch", short: "DE" },
  { id: "en", name: "English", short: "EN" },
  { id: "fr", name: "Français", short: "FR" },
  { id: "ru", name: "Русский", short: "RU" },
  { id: "tr", name: "Türkçe", short: "TR" },
];
const KEY = "dar-lang";
const listeners = new Set();

function initial() {
  try { const s = localStorage.getItem(KEY); if (s && DICT[s]) return s; } catch (e) {}
  const nav = (navigator.languages || [navigator.language || "de"]).map((l) => l.slice(0, 2).toLowerCase());
  return nav.find((l) => DICT[l]) || "de";
}
let cur = initial();
document.documentElement.lang = cur;

export const lang = () => cur;
export function setLang(l) {
  if (!DICT[l] || l === cur) return;
  cur = l;
  try { localStorage.setItem(KEY, l); } catch (e) {}
  document.documentElement.lang = l;
  listeners.forEach((fn) => fn(l));
}
export const onLang = (fn) => { listeners.add(fn); return () => listeners.delete(fn); };

/** Oberflächentext. Platzhalter {name} werden ersetzt. */
export function t(key, vars) {
  let s = DICT[cur][key] ?? DICT.de[key] ?? key;
  if (vars) s = s.replace(/\{(\w+)\}/g, (m, k) => (vars[k] ?? m));
  return s;
}

/** Inhalt in der aktuellen Sprache: Objekt { de, en, … } oder einfacher Wert. */
export function L(v) {
  if (v == null) return "";
  if (typeof v !== "object" || Array.isArray(v)) return v;
  return v[cur] ?? v.de ?? Object.values(v)[0];
}

/** true, wenn ein Inhalt in der aktuellen Sprache fehlt (für den Hinweis „nur auf Deutsch“). */
export const missing = (v) => v && typeof v === "object" && !Array.isArray(v) && cur !== "de" && v[cur] == null;
