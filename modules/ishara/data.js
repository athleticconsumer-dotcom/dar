// =====================================================================
//  HINWEISWÖRTER – nah / fern, männlich / weiblich, zwei / viele
//  NOUNS: Einzahl (Zweizahl wird gebildet) · PLURALS: Menschen im Plural (هٰؤُلَاءِ / أُولٰئِكَ)
//  Qur'an-Text der Beispiele aus Tanzil (Uthmani, Hafs), wortgenau ausgeschnitten.
// =====================================================================

export const MASTER_AT = 3;
export const GOAL = 20;

export const DEMS = [
  { id: "hadha", ar: "هٰذَا", dist: "near", gen: "m", num: "s" },
  { id: "hadhihi", ar: "هٰذِهِ", dist: "near", gen: "f", num: "s" },
  { id: "hadhani", ar: "هٰذَانِ", dist: "near", gen: "m", num: "d" },
  { id: "hatani", ar: "هَاتَانِ", dist: "near", gen: "f", num: "d" },
  { id: "haulai", ar: "هٰؤُلَاءِ", dist: "near", gen: "x", num: "p" },
  { id: "dhalika", ar: "ذٰلِكَ", dist: "far", gen: "m", num: "s" },
  { id: "tilka", ar: "تِلْكَ", dist: "far", gen: "f", num: "s" },
  { id: "ulaika", ar: "أُولٰئِكَ", dist: "far", gen: "x", num: "p" },
];

export const NOUNS = [
  { id: "kitab", ar: "كِتَابٌ", gen: "m", g: {"de": "Buch", "en": "book", "fr": "livre", "ru": "книга", "tr": "kitap"} },
  { id: "bayt", ar: "بَيْتٌ", gen: "m", g: {"de": "Haus", "en": "house", "fr": "maison", "ru": "дом", "tr": "ev"} },
  { id: "qalam", ar: "قَلَمٌ", gen: "m", g: {"de": "Stift", "en": "pen", "fr": "stylo", "ru": "ручка", "tr": "kalem"} },
  { id: "masjid", ar: "مَسْجِدٌ", gen: "m", g: {"de": "Moschee", "en": "mosque", "fr": "mosquée", "ru": "мечеть", "tr": "mescit"} },
  { id: "rajul", ar: "رَجُلٌ", gen: "m", g: {"de": "Mann", "en": "man", "fr": "homme", "ru": "мужчина", "tr": "adam"} },
  { id: "walad", ar: "وَلَدٌ", gen: "m", g: {"de": "Junge", "en": "boy", "fr": "garçon", "ru": "мальчик", "tr": "oğlan"} },
  { id: "sayyara", ar: "سَيَّارَةٌ", gen: "f", g: {"de": "Auto", "en": "car", "fr": "voiture", "ru": "машина", "tr": "araba"} },
  { id: "madrasa", ar: "مَدْرَسَةٌ", gen: "f", g: {"de": "Schule", "en": "school", "fr": "école", "ru": "школа", "tr": "okul"} },
  { id: "shajara", ar: "شَجَرَةٌ", gen: "f", g: {"de": "Baum", "en": "tree", "fr": "arbre", "ru": "дерево", "tr": "ağaç"} },
  { id: "ghurfa", ar: "غُرْفَةٌ", gen: "f", g: {"de": "Zimmer", "en": "room", "fr": "chambre", "ru": "комната", "tr": "oda"} },
  { id: "talib", ar: "طَالِبٌ", gen: "m", g: {"de": "Schüler", "en": "student", "fr": "élève", "ru": "ученик", "tr": "öğrenci"} },
  { id: "taliba", ar: "طَالِبَةٌ", gen: "f", g: {"de": "Schülerin", "en": "student (f)", "fr": "élève (f)", "ru": "ученица", "tr": "kız öğrenci"} },
];

export const PLURALS = [
  { id: "tullab", ar: "طُلَّابٌ", g: {"de": "Schüler (Pl.)", "en": "students", "fr": "élèves", "ru": "ученики", "tr": "öğrenciler"} },
  { id: "rijal", ar: "رِجَالٌ", g: {"de": "Männer", "en": "men", "fr": "hommes", "ru": "мужчины", "tr": "adamlar"} },
  { id: "muslimun", ar: "مُسْلِمُونَ", g: {"de": "Muslime", "en": "Muslims", "fr": "musulmans", "ru": "мусульмане", "tr": "Müslümanlar"} },
  { id: "banat", ar: "بَنَاتٌ", g: {"de": "Mädchen (Pl.)", "en": "girls", "fr": "filles", "ru": "девочки", "tr": "kızlar"} },
];

/** Zweizahl im Nominativ: كِتَابٌ → كِتَابَانِ, سَيَّارَةٌ → سَيَّارَتَانِ */
export const dual = (n) => n.ar.endsWith("ةٌ") ? n.ar.slice(0, -2) + "تَانِ" : n.ar.slice(0, -1) + "َانِ";
/** ohne Tanwīn, mit ال (für „dieses Buch“) */
const SUN = "تثدذرزسشصضطظلن";
export const withAl = (n) => { const b = n.ar.slice(0, -1) + "ُ"; return SUN.includes(b[0]) ? "ال" + b[0] + "\u0651" + b.slice(1) : "الْ" + b; };
/** passendes Hinweiswort */
export const demFor = (dist, gen, num) => DEMS.find((d) => d.dist === dist && d.num === num && (num === "p" || d.gen === gen));

export const QURAN = [{"ref": "2:2", "hl": [0], "tr": {"de": "Dieses Buch …", "en": "That is the Book …", "fr": "C'est le Livre …", "ru": "Это Писание …", "tr": "İşte o Kitap …"}, "tag": "ذٰلِكَ", "text": "ذَٰلِكَ ٱلۡكِتَٰبُ", "start": true, "end": false}, {"ref": "6:76", "hl": [0], "tr": {"de": "… Das ist mein Herr …", "en": "… This is my Lord …", "fr": "… Voici mon Seigneur …", "ru": "… Это мой Господь …", "tr": "… Bu benim Rabbim …"}, "tag": "هٰذَا", "text": "هَٰذَا رَبِّيۖ", "start": false, "end": false}, {"ref": "7:73", "hl": [0], "tr": {"de": "… Das ist die Kamelstute Allahs …", "en": "… This is the she-camel of Allah …", "fr": "… Voici la chamelle d'Allah …", "ru": "… Это верблюдица Аллаха …", "tr": "… Bu Allah'ın devesidir …"}, "tag": "هٰذِهِ", "text": "هَٰذِهِۦ نَاقَةُ ٱللَّهِ", "start": false, "end": false}, {"ref": "10:1", "hl": [0], "tr": {"de": "Das sind die Zeichen des weisen Buches.", "en": "Those are the verses of the wise Book.", "fr": "Voici les versets du Livre sage.", "ru": "Это аяты мудрого Писания.", "tr": "Bunlar hikmetli Kitab'ın âyetleridir."}, "tag": "تِلْكَ", "text": "تِلۡكَ ءَايَٰتُ ٱلۡكِتَٰبِ ٱلۡحَكِيمِ", "start": false, "end": true}, {"ref": "3:66", "hl": [1], "tr": {"de": "Ihr da …", "en": "There you are, those …", "fr": "Vous voilà …", "ru": "Вот вы, те …", "tr": "İşte siz şunlarsınız …"}, "tag": "هٰؤُلَاءِ", "text": "هَٰٓأَنتُمۡ هَٰٓؤُلَآءِ", "start": true, "end": false}, {"ref": "2:5", "hl": [0], "tr": {"de": "Diese folgen einer Rechtleitung von ihrem Herrn …", "en": "Those are upon guidance from their Lord …", "fr": "Ceux-là sont sur la bonne voie de leur Seigneur …", "ru": "Они следуют верному руководству от их Господа …", "tr": "İşte onlar Rablerinden bir hidayet üzeredir …"}, "tag": "أُولٰئِكَ", "text": "أُوْلَٰٓئِكَ عَلَىٰ هُدࣰى مِّن رَّبِّهِمۡۖ", "start": true, "end": false}];
