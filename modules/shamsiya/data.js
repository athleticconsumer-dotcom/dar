// =====================================================================
//  SONNEN- & MONDBUCHSTABEN – ein Beispielwort für jeden der 28 Buchstaben
//  n: Nomen ohne ال · pre/rest: Umschrift (pre = gesprochener Artikel)
// =====================================================================

export const MASTER_AT = 2;
export const GOAL = 20;

export const LETTERS = [
  { id: "t", l: "ت", sun: true, n: "تُفَّاحُ", pre: "at", rest: "tuffāḥ", g: {"de": "Apfel", "en": "apple", "fr": "pomme", "ru": "яблоко", "tr": "elma"} },
  { id: "th", l: "ث", sun: true, n: "ثَوْبُ", pre: "ath", rest: "thawb", g: {"de": "Gewand", "en": "garment", "fr": "vêtement", "ru": "одежда", "tr": "elbise"} },
  { id: "d", l: "د", sun: true, n: "دَرْسُ", pre: "ad", rest: "dars", g: {"de": "Lektion", "en": "lesson", "fr": "leçon", "ru": "урок", "tr": "ders"} },
  { id: "dh", l: "ذ", sun: true, n: "ذَهَبُ", pre: "adh", rest: "dhahab", g: {"de": "Gold", "en": "gold", "fr": "or", "ru": "золото", "tr": "altın"} },
  { id: "r", l: "ر", sun: true, n: "رَجُلُ", pre: "ar", rest: "rajul", g: {"de": "Mann", "en": "man", "fr": "homme", "ru": "мужчина", "tr": "adam"} },
  { id: "z", l: "ز", sun: true, n: "زَيْتُ", pre: "az", rest: "zayt", g: {"de": "Öl", "en": "oil", "fr": "huile", "ru": "масло", "tr": "yağ"} },
  { id: "s", l: "س", sun: true, n: "سَمَاءُ", pre: "as", rest: "samāʾ", g: {"de": "Himmel", "en": "sky", "fr": "ciel", "ru": "небо", "tr": "gök"} },
  { id: "sh", l: "ش", sun: true, n: "شَمْسُ", pre: "ash", rest: "shams", g: {"de": "Sonne", "en": "sun", "fr": "soleil", "ru": "солнце", "tr": "güneş"} },
  { id: "s2", l: "ص", sun: true, n: "صَلَاةُ", pre: "aṣ", rest: "ṣalāh", g: {"de": "Gebet", "en": "prayer", "fr": "prière", "ru": "молитва", "tr": "namaz"} },
  { id: "d2", l: "ض", sun: true, n: "ضَيْفُ", pre: "aḍ", rest: "ḍayf", g: {"de": "Gast", "en": "guest", "fr": "invité", "ru": "гость", "tr": "misafir"} },
  { id: "t2", l: "ط", sun: true, n: "طَالِبُ", pre: "aṭ", rest: "ṭālib", g: {"de": "Schüler, Student", "en": "student", "fr": "étudiant", "ru": "ученик, студент", "tr": "öğrenci"} },
  { id: "z2", l: "ظ", sun: true, n: "ظُهْرُ", pre: "aẓ", rest: "ẓuhr", g: {"de": "Mittag", "en": "midday", "fr": "midi", "ru": "полдень", "tr": "öğle"} },
  { id: "l", l: "ل", sun: true, n: "لَيْلُ", pre: "al", rest: "layl", g: {"de": "Nacht", "en": "night", "fr": "nuit", "ru": "ночь", "tr": "gece"} },
  { id: "n", l: "ن", sun: true, n: "نُورُ", pre: "an", rest: "nūr", g: {"de": "Licht", "en": "light", "fr": "lumière", "ru": "свет", "tr": "nur, ışık"} },
  { id: "a", l: "أ", sun: false, n: "أَبُ", pre: "al", rest: "ab", g: {"de": "Vater", "en": "father", "fr": "père", "ru": "отец", "tr": "baba"} },
  { id: "b", l: "ب", sun: false, n: "بَيْتُ", pre: "al", rest: "bayt", g: {"de": "Haus", "en": "house", "fr": "maison", "ru": "дом", "tr": "ev"} },
  { id: "j", l: "ج", sun: false, n: "جَبَلُ", pre: "al", rest: "jabal", g: {"de": "Berg", "en": "mountain", "fr": "montagne", "ru": "гора", "tr": "dağ"} },
  { id: "h", l: "ح", sun: false, n: "حَمْدُ", pre: "al", rest: "ḥamd", g: {"de": "Lob", "en": "praise", "fr": "louange", "ru": "хвала", "tr": "hamd"} },
  { id: "kh", l: "خ", sun: false, n: "خُبْزُ", pre: "al", rest: "khubz", g: {"de": "Brot", "en": "bread", "fr": "pain", "ru": "хлеб", "tr": "ekmek"} },
  { id: "ay", l: "ع", sun: false, n: "عِلْمُ", pre: "al", rest: "ʿilm", g: {"de": "Wissen", "en": "knowledge", "fr": "savoir", "ru": "знание", "tr": "ilim"} },
  { id: "gh", l: "غ", sun: false, n: "غُرْفَةُ", pre: "al", rest: "ghurfa", g: {"de": "Zimmer", "en": "room", "fr": "chambre", "ru": "комната", "tr": "oda"} },
  { id: "f", l: "ف", sun: false, n: "فَجْرُ", pre: "al", rest: "fajr", g: {"de": "Morgendämmerung", "en": "dawn", "fr": "aube", "ru": "рассвет", "tr": "fecir, şafak"} },
  { id: "q", l: "ق", sun: false, n: "قَمَرُ", pre: "al", rest: "qamar", g: {"de": "Mond", "en": "moon", "fr": "lune", "ru": "луна", "tr": "ay"} },
  { id: "k", l: "ك", sun: false, n: "كِتَابُ", pre: "al", rest: "kitāb", g: {"de": "Buch", "en": "book", "fr": "livre", "ru": "книга", "tr": "kitap"} },
  { id: "m", l: "م", sun: false, n: "مَسْجِدُ", pre: "al", rest: "masjid", g: {"de": "Moschee", "en": "mosque", "fr": "mosquée", "ru": "мечеть", "tr": "mescit"} },
  { id: "h2", l: "ه", sun: false, n: "هِلَالُ", pre: "al", rest: "hilāl", g: {"de": "Mondsichel", "en": "crescent", "fr": "croissant de lune", "ru": "полумесяц", "tr": "hilal"} },
  { id: "w", l: "و", sun: false, n: "وَلَدُ", pre: "al", rest: "walad", g: {"de": "Junge", "en": "boy", "fr": "garçon", "ru": "мальчик", "tr": "oğlan"} },
  { id: "y", l: "ي", sun: false, n: "يَوْمُ", pre: "al", rest: "yawm", g: {"de": "Tag", "en": "day", "fr": "jour", "ru": "день", "tr": "gün"} },
];

const SH = "\u0651", SK = "\u0652";
/** richtige Schreibung: Sonne → ال + Shadda, Mond → الْ */
export const word = (x) => x.sun ? "ال" + x.n[0] + SH + x.n.slice(1) : "ال" + SK + x.n;
/** typischer Fehler: genau umgekehrt */
export const wrongWord = (x) => x.sun ? "ال" + SK + x.n : "ال" + x.n[0] + SH + x.n.slice(1);
export const say = (x) => `${x.pre}-${x.rest}`;
/** falsche Aussprache: Sonne mit al-, Mond assimiliert */
export function wrongSay(x) {
  if (x.sun) return `al-${x.rest}`;
  const c = (x.rest.match(/^(kh|gh|sh|th|dh|ʿ|ʾ|[a-zḥṣḍṭẓ])/i) || [""])[0];
  return c && !/^[aāiīuū]/.test(x.rest) ? `a${c}-${x.rest}` : `a${x.rest[0]}-${x.rest}`;
}
