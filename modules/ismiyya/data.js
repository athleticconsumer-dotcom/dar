// =====================================================================
//  NOMINALSATZ – Mubtadaʾ (bestimmtes Nomen) + Khabar (unbestimmtes Adjektiv, passt im Geschlecht)
//  NOUNS: Nomen ohne ال mit Ḍamma · ADJ: männliche Form mit Tanwīn (weiblich: + ة)
//  Qur'an-Text der Beispiele aus Tanzil (Uthmani, Hafs), wortgenau ausgeschnitten.
// =====================================================================

export const MASTER_AT = 2;
export const GOAL = 20;

export const NOUNS = [
  { id: "bayt", ar: "بَيْتُ", gen: "m", g: {"de": "das Haus", "en": "the house", "fr": "la maison", "ru": "дом", "tr": "ev"} },
  { id: "masjid", ar: "مَسْجِدُ", gen: "m", g: {"de": "die Moschee", "en": "the mosque", "fr": "la mosquée", "ru": "мечеть", "tr": "mescit"} },
  { id: "kitab", ar: "كِتَابُ", gen: "m", g: {"de": "das Buch", "en": "the book", "fr": "le livre", "ru": "книга", "tr": "kitap"} },
  { id: "bab", ar: "بَابُ", gen: "m", g: {"de": "die Tür", "en": "the door", "fr": "la porte", "ru": "дверь", "tr": "kapı"} },
  { id: "walad", ar: "وَلَدُ", gen: "m", g: {"de": "der Junge", "en": "the boy", "fr": "le garçon", "ru": "мальчик", "tr": "oğlan"} },
  { id: "qamar", ar: "قَمَرُ", gen: "m", g: {"de": "der Mond", "en": "the moon", "fr": "la lune", "ru": "луна", "tr": "ay"} },
  { id: "rajul", ar: "رَجُلُ", gen: "m", g: {"de": "der Mann", "en": "the man", "fr": "l'homme", "ru": "мужчина", "tr": "adam"} },
  { id: "sayyara", ar: "سَيَّارَةُ", gen: "f", g: {"de": "das Auto", "en": "the car", "fr": "la voiture", "ru": "машина", "tr": "araba"} },
  { id: "madrasa", ar: "مَدْرَسَةُ", gen: "f", g: {"de": "die Schule", "en": "the school", "fr": "l'école", "ru": "школа", "tr": "okul"} },
  { id: "shams", ar: "شَمْسُ", gen: "f", g: {"de": "die Sonne", "en": "the sun", "fr": "le soleil", "ru": "солнце", "tr": "güneş"} },
  { id: "bint", ar: "بِنْتُ", gen: "f", g: {"de": "das Mädchen", "en": "the girl", "fr": "la fille", "ru": "девочка", "tr": "kız"} },
  { id: "ghurfa", ar: "غُرْفَةُ", gen: "f", g: {"de": "das Zimmer", "en": "the room", "fr": "la chambre", "ru": "комната", "tr": "oda"} },
  { id: "shajara", ar: "شَجَرَةُ", gen: "f", g: {"de": "der Baum", "en": "the tree", "fr": "l'arbre", "ru": "дерево", "tr": "ağaç"} },
  { id: "madina", ar: "مَدِينَةُ", gen: "f", g: {"de": "die Stadt", "en": "the city", "fr": "la ville", "ru": "город", "tr": "şehir"} },
];

export const ADJ = [
  { id: "kabir", ar: "كَبِيرٌ", g: {"de": "groß", "en": "big", "fr": "grand", "ru": "большой", "tr": "büyük"} },
  { id: "saghir", ar: "صَغِيرٌ", g: {"de": "klein", "en": "small", "fr": "petit", "ru": "маленький", "tr": "küçük"} },
  { id: "jamil", ar: "جَمِيلٌ", g: {"de": "schön", "en": "beautiful", "fr": "beau", "ru": "красивый", "tr": "güzel"} },
  { id: "jadid", ar: "جَدِيدٌ", g: {"de": "neu", "en": "new", "fr": "nouveau", "ru": "новый", "tr": "yeni"} },
  { id: "qadim", ar: "قَدِيمٌ", g: {"de": "alt", "en": "old", "fr": "ancien", "ru": "старый", "tr": "eski"} },
  { id: "nazif", ar: "نَظِيفٌ", g: {"de": "sauber", "en": "clean", "fr": "propre", "ru": "чистый", "tr": "temiz"} },
  { id: "qarib", ar: "قَرِيبٌ", g: {"de": "nah", "en": "near", "fr": "proche", "ru": "близкий", "tr": "yakın"} },
  { id: "baid", ar: "بَعِيدٌ", g: {"de": "weit weg", "en": "far", "fr": "loin", "ru": "далёкий", "tr": "uzak"} },
];

/** Adjektiv im passenden Geschlecht, unbestimmt (Khabar) */
export const adjF = (a, gen) => gen === "f" ? a.ar.slice(0, -1) + "َةٌ" : a.ar;
/** ohne Tanwīn, mit Ḍamma (für ال) */
export const adjBare = (a, gen) => adjF(a, gen).slice(0, -1) + "ُ";

export const QURAN = [{"ref": "112:2", "hl": [0, 1], "tr": {"de": "Allah ist der Absolute.", "en": "Allah is the Eternal Refuge.", "fr": "Allah est l'Absolu.", "ru": "Аллах Самодостаточный.", "tr": "Allah Samed'dir."}, "tag": "m+k", "text": "ٱللَّهُ ٱلصَّمَدُ", "start": true, "end": true}, {"ref": "48:29", "hl": [0, 1], "tr": {"de": "Muhammad ist der Gesandte Allahs.", "en": "Muhammad is the Messenger of Allah.", "fr": "Muhammad est le Messager d'Allah.", "ru": "Мухаммад Посланник Аллаха.", "tr": "Muhammed Allah'ın Resulüdür."}, "tag": "m+k", "text": "مُّحَمَّدࣱ رَّسُولُ ٱللَّهِۚ", "start": true, "end": false}, {"ref": "1:2", "hl": [0, 1], "tr": {"de": "Das Lob ist für Allah.", "en": "Praise is for Allah.", "fr": "La louange est à Allah.", "ru": "Хвала Аллаху.", "tr": "Hamd Allah'adır."}, "tag": "m+k", "text": "ٱلۡحَمۡدُ لِلَّهِ", "start": true, "end": false}, {"ref": "2:257", "hl": [0, 1], "tr": {"de": "Allah ist der Schutzherr derer, die glauben.", "en": "Allah is the ally of those who believe.", "fr": "Allah est le protecteur de ceux qui croient.", "ru": "Аллах Покровитель тех, кто уверовал.", "tr": "Allah iman edenlerin dostudur."}, "tag": "m+k", "text": "ٱللَّهُ وَلِيُّ ٱلَّذِينَ ءَامَنُواْ", "start": true, "end": false}];
