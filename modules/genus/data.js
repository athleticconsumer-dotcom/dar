// =====================================================================
//  MÄNNLICH & WEIBLICH – Nomen mit Grund und Paare mit ة
//  why: m = männlich (kein Zeichen) · ta = ة · alif = ـى / ـاء · meaning = weiblich von der Bedeutung · hidden = weiblich ohne Zeichen
//  Qur'an-Text der Beispiele aus Tanzil (Uthmani, Hafs), wortgenau ausgeschnitten.
// =====================================================================

export const MASTER_AT = 2;
export const GOAL = 20;
export const REASONS = ["ta", "alif", "meaning", "hidden"];

export const NOUNS = [
  { id: "bayt", ar: "بَيْتٌ", gen: "m", why: "m", g: {"de": "Haus", "en": "house", "fr": "maison", "ru": "дом", "tr": "ev"} },
  { id: "kitab", ar: "كِتَابٌ", gen: "m", why: "m", g: {"de": "Buch", "en": "book", "fr": "livre", "ru": "книга", "tr": "kitap"} },
  { id: "qalam", ar: "قَلَمٌ", gen: "m", why: "m", g: {"de": "Stift", "en": "pen", "fr": "stylo", "ru": "ручка", "tr": "kalem"} },
  { id: "bab", ar: "بَابٌ", gen: "m", why: "m", g: {"de": "Tür", "en": "door", "fr": "porte", "ru": "дверь", "tr": "kapı"} },
  { id: "masjid", ar: "مَسْجِدٌ", gen: "m", why: "m", g: {"de": "Moschee", "en": "mosque", "fr": "mosquée", "ru": "мечеть", "tr": "mescit"} },
  { id: "walad", ar: "وَلَدٌ", gen: "m", why: "m", g: {"de": "Junge", "en": "boy", "fr": "garçon", "ru": "мальчик", "tr": "oğlan"} },
  { id: "qamar", ar: "قَمَرٌ", gen: "m", why: "m", g: {"de": "Mond", "en": "moon", "fr": "lune", "ru": "луна", "tr": "ay"} },
  { id: "jabal", ar: "جَبَلٌ", gen: "m", why: "m", g: {"de": "Berg", "en": "mountain", "fr": "montagne", "ru": "гора", "tr": "dağ"} },
  { id: "sayyara", ar: "سَيَّارَةٌ", gen: "f", why: "ta", g: {"de": "Auto", "en": "car", "fr": "voiture", "ru": "машина", "tr": "araba"} },
  { id: "madrasa", ar: "مَدْرَسَةٌ", gen: "f", why: "ta", g: {"de": "Schule", "en": "school", "fr": "école", "ru": "школа", "tr": "okul"} },
  { id: "ghurfa", ar: "غُرْفَةٌ", gen: "f", why: "ta", g: {"de": "Zimmer", "en": "room", "fr": "chambre", "ru": "комната", "tr": "oda"} },
  { id: "shajara", ar: "شَجَرَةٌ", gen: "f", why: "ta", g: {"de": "Baum", "en": "tree", "fr": "arbre", "ru": "дерево", "tr": "ağaç"} },
  { id: "madina", ar: "مَدِينَةٌ", gen: "f", why: "ta", g: {"de": "Stadt", "en": "city", "fr": "ville", "ru": "город", "tr": "şehir"} },
  { id: "salah", ar: "صَلَاةٌ", gen: "f", why: "ta", g: {"de": "Gebet", "en": "prayer", "fr": "prière", "ru": "молитва", "tr": "namaz"} },
  { id: "umm", ar: "أُمٌّ", gen: "f", why: "meaning", g: {"de": "Mutter", "en": "mother", "fr": "mère", "ru": "мать", "tr": "anne"} },
  { id: "bint", ar: "بِنْتٌ", gen: "f", why: "meaning", g: {"de": "Mädchen, Tochter", "en": "girl, daughter", "fr": "fille", "ru": "девочка, дочь", "tr": "kız"} },
  { id: "ukht", ar: "أُخْتٌ", gen: "f", why: "meaning", g: {"de": "Schwester", "en": "sister", "fr": "sœur", "ru": "сестра", "tr": "kız kardeş"} },
  { id: "maryam", ar: "مَرْيَمُ", gen: "f", why: "meaning", g: {"de": "Maryam", "en": "Maryam", "fr": "Maryam", "ru": "Марьям", "tr": "Meryem"} },
  { id: "shams", ar: "شَمْسٌ", gen: "f", why: "hidden", g: {"de": "Sonne", "en": "sun", "fr": "soleil", "ru": "солнце", "tr": "güneş"} },
  { id: "ard", ar: "أَرْضٌ", gen: "f", why: "hidden", g: {"de": "Erde", "en": "earth", "fr": "terre", "ru": "земля", "tr": "yer, toprak"} },
  { id: "nar", ar: "نَارٌ", gen: "f", why: "hidden", g: {"de": "Feuer", "en": "fire", "fr": "feu", "ru": "огонь", "tr": "ateş"} },
  { id: "dar", ar: "دَارٌ", gen: "f", why: "hidden", g: {"de": "Wohnstätte", "en": "home, abode", "fr": "demeure", "ru": "обитель", "tr": "yurt, ev"} },
  { id: "ayn", ar: "عَيْنٌ", gen: "f", why: "hidden", g: {"de": "Auge, Quelle", "en": "eye, spring", "fr": "œil, source", "ru": "глаз, источник", "tr": "göz, pınar"} },
  { id: "yad", ar: "يَدٌ", gen: "f", why: "hidden", g: {"de": "Hand", "en": "hand", "fr": "main", "ru": "рука", "tr": "el"} },
  { id: "nafs", ar: "نَفْسٌ", gen: "f", why: "hidden", g: {"de": "Seele", "en": "soul", "fr": "âme", "ru": "душа", "tr": "nefis"} },
  { id: "dhikra", ar: "ذِكْرَى", gen: "f", why: "alif", g: {"de": "Ermahnung, Erinnerung", "en": "reminder", "fr": "rappel", "ru": "напоминание", "tr": "öğüt, hatırlatma"} },
  { id: "bushra", ar: "بُشْرَى", gen: "f", why: "alif", g: {"de": "frohe Botschaft", "en": "good news", "fr": "bonne nouvelle", "ru": "благая весть", "tr": "müjde"} },
  { id: "sahra", ar: "صَحْرَاءُ", gen: "f", why: "alif", g: {"de": "Wüste", "en": "desert", "fr": "désert", "ru": "пустыня", "tr": "çöl"} },
];

export const PAIRS = [
  { id: "p_muallim", m: "مُعَلِّمٌ", f: "مُعَلِّمَةٌ", g: {"de": "Lehrer / Lehrerin", "en": "teacher (m / f)", "fr": "enseignant / enseignante", "ru": "учитель / учительница", "tr": "öğretmen (e. / k.)"} },
  { id: "p_talib", m: "طَالِبٌ", f: "طَالِبَةٌ", g: {"de": "Student / Studentin", "en": "student (m / f)", "fr": "étudiant / étudiante", "ru": "студент / студентка", "tr": "öğrenci (e. / k.)"} },
  { id: "p_muslim", m: "مُسْلِمٌ", f: "مُسْلِمَةٌ", g: {"de": "Muslim / Muslima", "en": "Muslim (m / f)", "fr": "musulman / musulmane", "ru": "мусульманин / мусульманка", "tr": "Müslüman (e. / k.)"} },
  { id: "p_tabib", m: "طَبِيبٌ", f: "طَبِيبَةٌ", g: {"de": "Arzt / Ärztin", "en": "doctor (m / f)", "fr": "médecin (m / f)", "ru": "врач (м / ж)", "tr": "doktor (e. / k.)"} },
  { id: "p_sadiq", m: "صَدِيقٌ", f: "صَدِيقَةٌ", g: {"de": "Freund / Freundin", "en": "friend (m / f)", "fr": "ami / amie", "ru": "друг / подруга", "tr": "arkadaş (e. / k.)"} },
  { id: "p_katib", m: "كَاتِبٌ", f: "كَاتِبَةٌ", g: {"de": "Schreiber / Schreiberin", "en": "writer (m / f)", "fr": "écrivain / écrivaine", "ru": "писатель / писательница", "tr": "yazar (e. / k.)"} },
  { id: "p_kabir", m: "كَبِيرٌ", f: "كَبِيرَةٌ", g: {"de": "groß", "en": "big", "fr": "grand / grande", "ru": "большой / большая", "tr": "büyük"} },
  { id: "p_saghir", m: "صَغِيرٌ", f: "صَغِيرَةٌ", g: {"de": "klein", "en": "small", "fr": "petit / petite", "ru": "маленький / маленькая", "tr": "küçük"} },
  { id: "p_jamil", m: "جَمِيلٌ", f: "جَمِيلَةٌ", g: {"de": "schön", "en": "beautiful", "fr": "beau / belle", "ru": "красивый / красивая", "tr": "güzel"} },
  { id: "p_jadid", m: "جَدِيدٌ", f: "جَدِيدَةٌ", g: {"de": "neu", "en": "new", "fr": "nouveau / nouvelle", "ru": "новый / новая", "tr": "yeni"} },
];

export const QURAN = [{"ref": "81:1", "hl": [1, 2], "tr": {"de": "Wenn die Sonne zusammengerollt wird …", "en": "When the sun is wrapped up …", "fr": "Quand le soleil sera enroulé …", "ru": "Когда солнце будет скручено …", "tr": "Güneş dürüldüğü zaman …"}, "note": "shams", "text": "إِذَا ٱلشَّمۡسُ كُوِّرَتۡ", "start": true, "end": true}, {"ref": "99:1", "hl": [1, 2], "tr": {"de": "Wenn die Erde heftig erbebt …", "en": "When the earth is shaken …", "fr": "Quand la terre sera secouée …", "ru": "Когда земля сотрясётся …", "tr": "Yer sarsıldığı zaman …"}, "note": "ard", "text": "إِذَا زُلۡزِلَتِ ٱلۡأَرۡضُ", "start": true, "end": false}, {"ref": "82:1", "hl": [1, 2], "tr": {"de": "Wenn der Himmel sich spaltet …", "en": "When the sky splits open …", "fr": "Quand le ciel se rompra …", "ru": "Когда небо раскололось …", "tr": "Gök yarıldığı zaman …"}, "note": "sama", "text": "إِذَا ٱلسَّمَآءُ ٱنفَطَرَتۡ", "start": true, "end": true}, {"ref": "89:27", "hl": [0, 1, 2], "tr": {"de": "O du Seele, die Ruhe gefunden hat …", "en": "O soul at peace …", "fr": "Ô toi âme apaisée …", "ru": "О успокоившаяся душа …", "tr": "Ey huzura ermiş nefis …"}, "note": "nafs", "text": "يَٰٓأَيَّتُهَا ٱلنَّفۡسُ ٱلۡمُطۡمَئِنَّةُ", "start": true, "end": true}];

/** falsche weibliche Formen: offenes ت statt ة, oder ة ohne Tanwīn */
export const openT = (f) => f.replace("ةٌ", "تٌ");
export const noTan = (f) => f.replace("ةٌ", "ةُ");
