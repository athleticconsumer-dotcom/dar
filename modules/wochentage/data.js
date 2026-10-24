// =====================================================================
//  TAGE & MONATE – Inhalte
//  DAYS: Woche beginnt am Sonntag (arabische Zählung)
//  HIJRI: Mondkalender, sacred = einer der vier heiligen Monate (9:36)
//  GREG: Monatsnamen wie in Ägypten/Golf (ar) und in der Levante (lev)
// =====================================================================

export const DAYS = [
  { id: "ahad", gen: "الأَحَدِ", ar: "الأَحَد", tr: "al-aḥad", root: "أَحَد", g: { de: "Sonntag", en: "Sunday", fr: "dimanche", ru: "воскресенье", tr: "Pazar" } },
  { id: "ithnayn", gen: "الاثْنَيْنِ", ar: "الاثْنَيْن", tr: "al-ithnayn", root: "اثْنَان", g: { de: "Montag", en: "Monday", fr: "lundi", ru: "понедельник", tr: "Pazartesi" } },
  { id: "thulatha", gen: "الثُّلَاثَاءِ", ar: "الثُّلَاثَاء", tr: "ath-thulāthāʾ", root: "ثَلَاثَة", g: { de: "Dienstag", en: "Tuesday", fr: "mardi", ru: "вторник", tr: "Salı" } },
  { id: "arbiaa", gen: "الأَرْبِعَاءِ", ar: "الأَرْبِعَاء", tr: "al-arbiʿāʾ", root: "أَرْبَعَة", g: { de: "Mittwoch", en: "Wednesday", fr: "mercredi", ru: "среда", tr: "Çarşamba" } },
  { id: "khamis", gen: "الخَمِيسِ", ar: "الخَمِيس", tr: "al-khamīs", root: "خَمْسَة", g: { de: "Donnerstag", en: "Thursday", fr: "jeudi", ru: "четверг", tr: "Perşembe" } },
  { id: "jumua", gen: "الجُمُعَةِ", ar: "الجُمُعَة", tr: "al-jumuʿa", root: "جَمَعَ", g: { de: "Freitag", en: "Friday", fr: "vendredi", ru: "пятница", tr: "Cuma" } },
  { id: "sabt", gen: "السَّبْتِ", ar: "السَّبْت", tr: "as-sabt", root: "سَبْت", g: { de: "Samstag", en: "Saturday", fr: "samedi", ru: "суббота", tr: "Cumartesi" } },
];

export const HIJRI = [
  { id: "muharram", ar: "مُحَرَّم", tr: "Muḥarram", sacred: true },
  { id: "safar", ar: "صَفَر", tr: "Ṣafar" },
  { id: "rabi1", ar: "رَبِيعٌ الأَوَّل", tr: "Rabīʿ al-awwal" },
  { id: "rabi2", ar: "رَبِيعٌ الآخِر", tr: "Rabīʿ al-ākhir" },
  { id: "jumada1", ar: "جُمَادَى الأُولَى", tr: "Jumādā l-ūlā" },
  { id: "jumada2", ar: "جُمَادَى الآخِرَة", tr: "Jumādā l-ākhira" },
  { id: "rajab", ar: "رَجَب", tr: "Rajab", sacred: true },
  { id: "shaban", ar: "شَعْبَان", tr: "Shaʿbān" },
  { id: "ramadan", ar: "رَمَضَان", tr: "Ramaḍān" },
  { id: "shawwal", ar: "شَوَّال", tr: "Shawwāl" },
  { id: "dhulqada", ar: "ذُو القَعْدَة", tr: "Dhū l-Qaʿda", sacred: true },
  { id: "dhulhijja", ar: "ذُو الحِجَّة", tr: "Dhū l-Ḥijja", sacred: true },
];
// Monate mit einer kurzen Erklärung in lang.js (hn.<id>)
export const HIJRI_NOTES = ["muharram", "rajab", "shaban", "ramadan", "shawwal", "dhulqada", "dhulhijja"];

export const GREG = [
  { id: "jan", ar: "يَنَايِر", tr: "yanāyir", lev: "كَانُونُ الثَّانِي", levTr: "kānūn ath-thānī", g: { de: "Januar", en: "January", fr: "janvier", ru: "январь", tr: "Ocak" } },
  { id: "feb", ar: "فِبْرَايِر", tr: "fibrāyir", lev: "شُبَاط", levTr: "shubāṭ", g: { de: "Februar", en: "February", fr: "février", ru: "февраль", tr: "Şubat" } },
  { id: "mar", ar: "مَارِس", tr: "māris", lev: "آذَار", levTr: "ādhār", g: { de: "März", en: "March", fr: "mars", ru: "март", tr: "Mart" } },
  { id: "apr", ar: "أَبْرِيل", tr: "abrīl", lev: "نَيْسَان", levTr: "naysān", g: { de: "April", en: "April", fr: "avril", ru: "апрель", tr: "Nisan" } },
  { id: "may", ar: "مَايُو", tr: "māyū", lev: "أَيَّار", levTr: "ayyār", g: { de: "Mai", en: "May", fr: "mai", ru: "май", tr: "Mayıs" } },
  { id: "jun", ar: "يُونْيُو", tr: "yūnyū", lev: "حَزِيرَان", levTr: "ḥazīrān", g: { de: "Juni", en: "June", fr: "juin", ru: "июнь", tr: "Haziran" } },
  { id: "jul", ar: "يُولْيُو", tr: "yūlyū", lev: "تَمُّوز", levTr: "tammūz", g: { de: "Juli", en: "July", fr: "juillet", ru: "июль", tr: "Temmuz" } },
  { id: "aug", ar: "أُغُسْطُس", tr: "ughusṭus", lev: "آب", levTr: "āb", g: { de: "August", en: "August", fr: "août", ru: "август", tr: "Ağustos" } },
  { id: "sep", ar: "سِبْتَمْبِر", tr: "sibtambir", lev: "أَيْلُول", levTr: "aylūl", g: { de: "September", en: "September", fr: "septembre", ru: "сентябрь", tr: "Eylül" } },
  { id: "oct", ar: "أُكْتُوبَر", tr: "uktūbar", lev: "تِشْرِينُ الأَوَّل", levTr: "tishrīn al-awwal", g: { de: "Oktober", en: "October", fr: "octobre", ru: "октябрь", tr: "Ekim" } },
  { id: "nov", ar: "نُوفَمْبِر", tr: "nūfambir", lev: "تِشْرِينُ الثَّانِي", levTr: "tishrīn ath-thānī", g: { de: "November", en: "November", fr: "novembre", ru: "ноябрь", tr: "Kasım" } },
  { id: "dec", ar: "دِيسَمْبِر", tr: "dīsambir", lev: "كَانُونُ الأَوَّل", levTr: "kānūn al-awwal", g: { de: "Dezember", en: "December", fr: "décembre", ru: "декабрь", tr: "Aralık" } },
];

// gestern / heute / morgen
export const REL = [
  { id: "ams", ar: "أَمْسِ", tr: "amsi" },
  { id: "yawm", ar: "اليَوْمَ", tr: "al-yawma" },
  { id: "ghad", ar: "غَدًا", tr: "ghadan" },
];

export const SETS = ["days", "hijri", "greg"];
export const MASTER_AT = 2;
