// =====================================================================
//  REGISTRY – die Liste aller Rubriken ("Räume") der App.
//  Neue Rubrik hinzufügen:
//    1. Ordner modules/<id>/ anlegen (Vorlage: modules/_vorlage/)
//    2. Hier einen Eintrag ergänzen, status: "live" und load: () => import(...)
//  Die Reihenfolge hier ist die Standard-Lernreihenfolge für den Leitfaden.
// =====================================================================

// Hauptkategorien. Jede Rubrik gehört über "level" zu genau einem Level.
// Neues Level: hier eintragen, dann bei den Rubriken level: 2 usw. setzen.
export const LEVELS = [
  {
    id: 1, title: "Level 1", ar: "المُسْتَوَى الأَوَّل",
    desc: "Die Grundlagen: Schrift und Laute, Zahlen, Uhrzeit, erste Sätze und der Alltag in der Familie.",
  },
];

export const RUBRIKEN = [
  {
    id: "alphabet", status: "soon",
    title: "Alphabet & Laute", ar: "الحُرُوف",
    desc: "Die 28 Buchstaben, ihre Formen am Wortanfang, in der Mitte und am Ende.",
    needs: [], level: 1,
    color: { light: "#82384E", dark: "#E7A1B4" },
  },
  {
    id: "harakat", status: "soon",
    title: "Vokale & Lesen", ar: "الحَرَكَات",
    desc: "Fatḥa, Kasra, Ḍamma, Sukūn, Shadda – vom Buchstaben zum Wort.",
    needs: ["alphabet"], level: 1,
    color: { light: "#2C6A6F", dark: "#8FCFD3" },
  },
  {
    id: "zahlen", status: "live",
    title: "Zahlen", ar: "الأَرْقَام",
    desc: "0 bis 9999 lesen, hören und schreiben – mit arabisch-indischen Ziffern.",
    needs: [], level: 1,
    color: { light: "#A8742B", dark: "#E8C58D" },
    load: () => import("../modules/zahlen/index.js"),
  },
  {
    id: "uhrzeit", status: "live",
    title: "Uhrzeit", ar: "السَّاعَة",
    desc: "Die Uhr lesen: Viertel, Drittel, halb und „minus“ – wie im Hocharabischen üblich.",
    needs: ["zahlen"], level: 1,
    color: { light: "#4B2D63", dark: "#C8A9E6" },
    load: () => import("../modules/uhrzeit/index.js"),
  },
  {
    id: "begruessung", status: "soon",
    title: "Begrüßungen", ar: "التَّحِيَّات",
    desc: "Salām, Vorstellung, Höflichkeitsformen und Antworten darauf.",
    needs: [], level: 1,
    color: { light: "#2F6B4F", dark: "#94D3AE" },
  },
  {
    id: "wochentage", status: "soon",
    title: "Tage & Monate", ar: "الأَيَّام وَالشُّهُور",
    desc: "Wochentage, Monate (hidschri und gregorianisch) und Datumsangaben.",
    needs: ["zahlen"], level: 1,
    color: { light: "#8A4B2A", dark: "#E6AE88" },
  },
  {
    id: "familie", status: "soon",
    title: "Familie", ar: "العَائِلَة",
    desc: "Verwandtschaft, Possessiv-Endungen (ـي، ـكَ، ـهُ) und kleine Sätze.",
    needs: [], level: 1,
    color: { light: "#5E5A2A", dark: "#D3CC8A" },
  },
];

export const byId = (id) => RUBRIKEN.find((r) => r.id === id);
export const liveRubriken = () => RUBRIKEN.filter((r) => r.status === "live");
export const levelById = (id) => LEVELS.find((l) => l.id === Number(id));
export const rubrikenOf = (levelId) => RUBRIKEN.filter((r) => r.level === Number(levelId));
