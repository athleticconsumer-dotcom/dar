// =====================================================================
//  BESTIMMT & UNBESTIMMT (المَعْرِفَة وَالنَّكِرَة) – Inhalte
//  Alle Nomen beginnen mit einem Mondbuchstaben, damit das ل von ال hörbar ist
//  (Sonnenbuchstaben kommen im nächsten Thema).
//  n = unbestimmt (nakira, mit Tanwīn), m = bestimmt (maʿrifa, mit ال)
//  g: [unbestimmt, bestimmt] pro Sprache
// =====================================================================

export const NOUNS = [
  { id: "kitab", n: "كِتَابٌ", nTr: "kitābun", m: "الْكِتَابُ", mTr: "al-kitābu", acc: "كِتَابًا", gen: "كِتَابٍ",
    g: { de: ["ein Buch", "das Buch"], en: ["a book", "the book"], fr: ["un livre", "le livre"], ru: ["какая-то книга", "эта книга"], tr: ["bir kitap", "o kitap"] } },
  { id: "bayt", n: "بَيْتٌ", nTr: "baytun", m: "الْبَيْتُ", mTr: "al-baytu",
    g: { de: ["ein Haus", "das Haus"], en: ["a house", "the house"], fr: ["une maison", "la maison"], ru: ["какой-то дом", "этот дом"], tr: ["bir ev", "o ev"] } },
  { id: "qalam", n: "قَلَمٌ", nTr: "qalamun", m: "الْقَلَمُ", mTr: "al-qalamu",
    g: { de: ["ein Stift", "der Stift"], en: ["a pen", "the pen"], fr: ["un stylo", "le stylo"], ru: ["какая-то ручка", "эта ручка"], tr: ["bir kalem", "o kalem"] } },
  { id: "bab", n: "بَابٌ", nTr: "bābun", m: "الْبَابُ", mTr: "al-bābu",
    g: { de: ["eine Tür", "die Tür"], en: ["a door", "the door"], fr: ["une porte", "la porte"], ru: ["какая-то дверь", "эта дверь"], tr: ["bir kapı", "o kapı"] } },
  { id: "walad", n: "وَلَدٌ", nTr: "waladun", m: "الْوَلَدُ", mTr: "al-waladu",
    g: { de: ["ein Junge", "der Junge"], en: ["a boy", "the boy"], fr: ["un garçon", "le garçon"], ru: ["какой-то мальчик", "этот мальчик"], tr: ["bir oğlan", "o oğlan"] } },
  { id: "masjid", n: "مَسْجِدٌ", nTr: "masjidun", m: "الْمَسْجِدُ", mTr: "al-masjidu",
    g: { de: ["eine Moschee", "die Moschee"], en: ["a mosque", "the mosque"], fr: ["une mosquée", "la mosquée"], ru: ["какая-то мечеть", "эта мечеть"], tr: ["bir cami", "o cami"] } },
  { id: "qamar", n: "قَمَرٌ", nTr: "qamarun", m: "الْقَمَرُ", mTr: "al-qamaru",
    g: { de: ["ein Mond", "der Mond"], en: ["a moon", "the moon"], fr: ["une lune", "la lune"], ru: ["какая-то луна", "эта луна"], tr: ["bir ay", "o ay"] } },
  { id: "kursi", n: "كُرْسِيٌّ", nTr: "kursiyyun", m: "الْكُرْسِيُّ", mTr: "al-kursiyyu",
    g: { de: ["ein Stuhl", "der Stuhl"], en: ["a chair", "the chair"], fr: ["une chaise", "la chaise"], ru: ["какой-то стул", "этот стул"], tr: ["bir sandalye", "o sandalye"] } },
  { id: "bint", n: "بِنْتٌ", nTr: "bintun", m: "الْبِنْتُ", mTr: "al-bintu",
    g: { de: ["ein Mädchen", "das Mädchen"], en: ["a girl", "the girl"], fr: ["une fille", "la fille"], ru: ["какая-то девочка", "эта девочка"], tr: ["bir kız", "o kız"] } },
  { id: "jamal", n: "جَمَلٌ", nTr: "jamalun", m: "الْجَمَلُ", mTr: "al-jamalu",
    g: { de: ["ein Kamel", "das Kamel"], en: ["a camel", "the camel"], fr: ["un chameau", "le chameau"], ru: ["какой-то верблюд", "этот верблюд"], tr: ["bir deve", "o deve"] } },
  { id: "madrasa", n: "مَدْرَسَةٌ", nTr: "madrasatun", m: "الْمَدْرَسَةُ", mTr: "al-madrasatu",
    g: { de: ["eine Schule", "die Schule"], en: ["a school", "the school"], fr: ["une école", "l'école"], ru: ["какая-то школа", "эта школа"], tr: ["bir okul", "o okul"] } },
  { id: "ghurfa", n: "غُرْفَةٌ", nTr: "ghurfatun", m: "الْغُرْفَةُ", mTr: "al-ghurfatu",
    g: { de: ["ein Zimmer", "das Zimmer"], en: ["a room", "the room"], fr: ["une chambre", "la chambre"], ru: ["какая-то комната", "эта комната"], tr: ["bir oda", "o oda"] } },
  { id: "hadiqa", n: "حَدِيقَةٌ", nTr: "ḥadīqatun", m: "الْحَدِيقَةُ", mTr: "al-ḥadīqatu",
    g: { de: ["ein Garten", "der Garten"], en: ["a garden", "the garden"], fr: ["un jardin", "le jardin"], ru: ["какой-то сад", "этот сад"], tr: ["bir bahçe", "o bahçe"] } },
];

// Sonderfälle: immer bestimmt, obwohl kein ال davor steht
export const SPECIAL = [
  { id: "muhammad", ar: "مُحَمَّدٌ", tr: "Muḥammadun", why: "name" },
  { id: "makka", ar: "مَكَّةُ", tr: "Makkatu", why: "name" },
  { id: "huwa", ar: "هُوَ", tr: "huwa", why: "pron" },
  { id: "ana", ar: "أَنَا", tr: "anā", why: "pron" },
  { id: "hiya", ar: "هِيَ", tr: "hiya", why: "pron" },
];

// Sūrat al-Ikhlāṣ (112), Tanzil Uthmani/Hafs. k: n = Tanwīn, m = ال, name = Name Allahs
export const IKHLAS = [
  { a: 1, w: [{ ar: "قُلۡ" }, { ar: "هُوَ" }, { ar: "ٱللَّهُ", k: "name" }, { ar: "أَحَدٌ", k: "n" }] },
  { a: 2, w: [{ ar: "ٱللَّهُ", k: "name" }, { ar: "ٱلصَّمَدُ", k: "m" }] },
  { a: 3, w: [{ ar: "لَمۡ" }, { ar: "يَلِدۡ" }, { ar: "وَلَمۡ" }, { ar: "يُولَدۡ" }] },
  { a: 4, w: [{ ar: "وَلَمۡ" }, { ar: "يَكُن" }, { ar: "لَّهُۥ" }, { ar: "كُفُوًا", k: "n" }, { ar: "أَحَدُۢ", k: "n" }] },
];

export const MASTER_AT = 2;
export const SPRINT_SECONDS = 60;
export const SPRINT_GOAL = 15;
