// =====================================================================
//  REGISTRY – die Liste aller Rubriken ("Räume") der App.
//  Neue Rubrik hinzufügen:
//    1. Ordner modules/<id>/ anlegen (Vorlage: modules/_vorlage/)
//    2. Hier einen Eintrag ergänzen, status: "live" und load: () => import(...)
//  Die Reihenfolge hier ist die Standard-Lernreihenfolge für den Leitfaden.
//  title/desc gibt es pro Sprache (de, en, fr, ru, tr); angezeigt wird mit L() aus i18n.js.
// =====================================================================

// Hauptkategorien. Jede Rubrik gehört über "level" zu genau einem Level.
// Neues Level: hier eintragen, dann bei den Rubriken level: 2 usw. setzen.
export const LEVELS = [
  {
    id: 1, title: { de: "Level 1", en: "Level 1", fr: "Niveau 1", ru: "Уровень 1", tr: "Seviye 1" }, ar: "المُسْتَوَى الأَوَّل",
    desc: { de: "Die Grundlagen: Schrift und Laute, Zahlen, Uhrzeit, erste Sätze und der Alltag in der Familie.", en: "The basics: script and sounds, numbers, telling the time, first sentences and family life.", fr: "Les bases : écriture et sons, nombres, l'heure, premières phrases et la vie en famille.", ru: "Основы: письмо и звуки, числа, время, первые фразы и жизнь в семье.", tr: "Temeller: yazı ve sesler, sayılar, saat, ilk cümleler ve aile hayatı." },
  },
];

export const RUBRIKEN = [
  {
    id: "alphabet", status: "soon",
    title: { de: "Alphabet & Laute", en: "Alphabet & sounds", fr: "Alphabet & sons", ru: "Алфавит и звуки", tr: "Alfabe ve sesler" }, ar: "الحُرُوف",
    desc: { de: "Die 28 Buchstaben, ihre Formen am Wortanfang, in der Mitte und am Ende.", en: "The 28 letters and their forms at the beginning, middle and end of a word.", fr: "Les 28 lettres et leurs formes en début, milieu et fin de mot.", ru: "28 букв и их формы в начале, середине и конце слова.", tr: "28 harf ve kelimenin başında, ortasında ve sonundaki şekilleri." },
    needs: [], level: 1,
    color: { light: "#82384E", dark: "#E7A1B4" },
  },
  {
    id: "harakat", status: "soon",
    title: { de: "Vokale & Lesen", en: "Vowels & reading", fr: "Voyelles & lecture", ru: "Огласовки и чтение", tr: "Harekeler ve okuma" }, ar: "الحَرَكَات",
    desc: { de: "Fatḥa, Kasra, Ḍamma, Sukūn, Shadda: vom Buchstaben zum Wort.", en: "Fatḥa, kasra, ḍamma, sukūn, shadda: from letter to word.", fr: "Fatḥa, kasra, ḍamma, sukūn, shadda : de la lettre au mot.", ru: "Фатха, кясра, дамма, сукун, шадда: от буквы к слову.", tr: "Üstün, esre, ötre, cezm, şedde: harften kelimeye." },
    needs: ["alphabet"], level: 1,
    color: { light: "#2C6A6F", dark: "#8FCFD3" },
  },
  {
    id: "zahlen", status: "live",
    title: { de: "Zahlen", en: "Numbers", fr: "Nombres", ru: "Числа", tr: "Sayılar" }, ar: "الأَرْقَام",
    desc: { de: "0 bis 9999 lesen, hören und schreiben, mit arabisch-indischen Ziffern.", en: "Read, hear and write 0 to 9999, with Arabic-Indic digits.", fr: "Lire, écouter et écrire de 0 à 9999, avec les chiffres arabo-indiens.", ru: "Читать, слушать и писать числа от 0 до 9999, с арабо-индийскими цифрами.", tr: "0'dan 9999'a kadar okumak, dinlemek ve yazmak, Arap-Hint rakamlarıyla." },
    needs: [], level: 1,
    color: { light: "#A8742B", dark: "#E8C58D" },
    load: () => import("../modules/zahlen/index.js"),
  },
  {
    id: "uhrzeit", status: "live",
    title: { de: "Uhrzeit", en: "Telling the time", fr: "L'heure", ru: "Время", tr: "Saat" }, ar: "السَّاعَة",
    desc: { de: "Die Uhr lesen: Viertel, Drittel, halb und „minus“, wie im Hocharabischen üblich.", en: "Reading the clock: quarter, third, half and “minus”, as is usual in Standard Arabic.", fr: "Lire l'heure : quart, tiers, demie et « moins », comme en arabe littéraire.", ru: "Читать часы: четверть, треть, половина и «без», как принято в литературном арабском.", tr: "Saati okumak: çeyrek, üçte bir, buçuk ve “kala”, Fushâ'da olduğu gibi." },
    needs: ["zahlen"], level: 1,
    color: { light: "#4B2D63", dark: "#C8A9E6" },
    load: () => import("../modules/uhrzeit/index.js"),
  },
  {
    id: "begruessung", status: "soon",
    title: { de: "Begrüßungen", en: "Greetings", fr: "Salutations", ru: "Приветствия", tr: "Selamlaşma" }, ar: "التَّحِيَّات",
    desc: { de: "Salām, Vorstellung, Höflichkeitsformen und Antworten darauf.", en: "Salām, introducing yourself, polite phrases and how to reply.", fr: "Salām, se présenter, formules de politesse et réponses.", ru: "Салам, знакомство, вежливые фразы и ответы на них.", tr: "Selam, kendini tanıtmak, nezaket ifadeleri ve cevapları." },
    needs: [], level: 1,
    color: { light: "#2F6B4F", dark: "#94D3AE" },
  },
  {
    id: "wochentage", status: "soon",
    title: { de: "Tage & Monate", en: "Days & months", fr: "Jours & mois", ru: "Дни и месяцы", tr: "Günler ve aylar" }, ar: "الأَيَّام وَالشُّهُور",
    desc: { de: "Wochentage, Monate (hidschri und gregorianisch) und Datumsangaben.", en: "Days of the week, months (Hijri and Gregorian) and dates.", fr: "Jours de la semaine, mois (hégiriens et grégoriens) et dates.", ru: "Дни недели, месяцы (по хиджре и григорианские) и даты.", tr: "Haftanın günleri, aylar (hicrî ve miladî) ve tarihler." },
    needs: ["zahlen"], level: 1,
    color: { light: "#8A4B2A", dark: "#E6AE88" },
  },
  {
    id: "familie", status: "soon",
    title: { de: "Familie", en: "Family", fr: "Famille", ru: "Семья", tr: "Aile" }, ar: "العَائِلَة",
    desc: { de: "Verwandtschaft, Possessiv-Endungen (ـي، ـكَ، ـهُ) und kleine Sätze.", en: "Relatives, possessive endings (ـي، ـكَ، ـهُ) and short sentences.", fr: "La parenté, les suffixes possessifs (ـي، ـكَ، ـهُ) et de petites phrases.", ru: "Родственники, притяжательные окончания (ـي، ـكَ، ـهُ) и короткие фразы.", tr: "Akrabalar, iyelik ekleri (ـي، ـكَ، ـهُ) ve kısa cümleler." },
    needs: [], level: 1,
    color: { light: "#5E5A2A", dark: "#D3CC8A" },
  },
];

export const byId = (id) => RUBRIKEN.find((r) => r.id === id);
export const liveRubriken = () => RUBRIKEN.filter((r) => r.status === "live");
export const levelById = (id) => LEVELS.find((l) => l.id === Number(id));
export const rubrikenOf = (levelId) => RUBRIKEN.filter((r) => r.level === Number(levelId));
