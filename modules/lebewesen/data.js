// =====================================================================
//  LEBEWESEN & DINGE (الكَائِنَات وَالجَمَادَات) – nach Lektion 6 des Lehrers
//  grp: animal | plant | insect | object | fluid   (Namen und Überblick separat)
//  e: Bild (Emoji), wenn es eins gibt
// =====================================================================

export const OVERVIEW = [
  { id: "kainat", ar: "الكَائِنَاتُ", tr: "al-kāʾināt", g: { de: "Lebewesen", en: "living beings", fr: "êtres vivants", ru: "живые существа", tr: "canlılar" } },
  { id: "insan", ar: "إِنْسَانٌ", tr: "insān", e: "🧑", g: { de: "Mensch", en: "human being", fr: "être humain", ru: "человек", tr: "insan" } },
  { id: "hayawan", ar: "حَيَوَانٌ", tr: "ḥayawān", e: "🐾", g: { de: "Tier", en: "animal", fr: "animal", ru: "животное", tr: "hayvan" } },
  { id: "nabat", ar: "نَبَاتٌ", tr: "nabāt", e: "🌱", g: { de: "Pflanze", en: "plant", fr: "plante", ru: "растение", tr: "bitki" } },
  { id: "hasharat", ar: "الحَشَرَاتُ", tr: "al-ḥasharāt", e: "🐜", g: { de: "Insekten", en: "insects", fr: "insectes", ru: "насекомые", tr: "böcekler" } },
  { id: "jamadat", ar: "الجَمَادَاتُ", tr: "al-jamādāt", e: "🪑", g: { de: "Gegenstände (Unbelebtes)", en: "objects (non-living things)", fr: "objets (choses inanimées)", ru: "неживые предметы", tr: "cansız varlıklar" } },
  { id: "sawail", ar: "السَّوَائِلُ", tr: "as-sawāʾil", e: "💧", g: { de: "Flüssigkeiten", en: "fluids", fr: "liquides", ru: "жидкости", tr: "sıvılar" } },
];

export const NAMES = [
  { ar: "أَحْمَدُ", tr: "Aḥmad" }, { ar: "مُحَمَّدٌ", tr: "Muḥammad" }, { ar: "مَحْمُودٌ", tr: "Maḥmūd" }, { ar: "عَلِيٌّ", tr: "ʿAlī" },
  { ar: "عَبْدُ الرَّحْمٰنِ", tr: "ʿAbd ar-Raḥmān" }, { ar: "حَسَنٌ", tr: "Ḥasan" }, { ar: "عَبْدُ اللّٰهِ", tr: "ʿAbdullāh" }, { ar: "إِبْرَاهِيمُ", tr: "Ibrāhīm" },
  { ar: "فَاطِمَةُ", tr: "Fāṭima", f: true }, { ar: "مَرْيَمُ", tr: "Maryam", f: true }, { ar: "سَلْوَى", tr: "Salwā", f: true }, { ar: "عَائِشَةُ", tr: "ʿĀʾisha", f: true },
];

export const WORDS = [
  // ---- Tiere ----
  { id: "arnab", grp: "animal", ar: "أَرْنَبٌ", tr: "arnab", e: "🐇", g: { de: "Hase, Kaninchen", en: "rabbit", fr: "lapin", ru: "кролик", tr: "tavşan" } },
  { id: "kalb", grp: "animal", ar: "كَلْبٌ", tr: "kalb", e: "🐕", g: { de: "Hund", en: "dog", fr: "chien", ru: "собака", tr: "köpek" } },
  { id: "usfur", grp: "animal", ar: "عُصْفُورٌ", tr: "ʿuṣfūr", e: "🐦", g: { de: "Spatz, kleiner Vogel", en: "sparrow, small bird", fr: "moineau, petit oiseau", ru: "воробей, птичка", tr: "serçe, kuş" } },
  { id: "qitta", grp: "animal", ar: "قِطَّةٌ", tr: "qiṭṭa", e: "🐈", g: { de: "Katze", en: "cat", fr: "chat", ru: "кошка", tr: "kedi" } },
  { id: "zarafa", grp: "animal", ar: "زَرَافَةٌ", tr: "zarāfa", e: "🦒", g: { de: "Giraffe", en: "giraffe", fr: "girafe", ru: "жираф", tr: "zürafa" } },
  { id: "asad", grp: "animal", ar: "أَسَدٌ", tr: "asad", e: "🦁", g: { de: "Löwe", en: "lion", fr: "lion", ru: "лев", tr: "aslan" } },
  { id: "hisan", grp: "animal", ar: "حِصَانٌ / فَرَسٌ", say: "حِصَانٌ، فَرَسٌ", tr: "ḥiṣān / faras", e: "🐎", g: { de: "Pferd", en: "horse", fr: "cheval", ru: "лошадь", tr: "at" } },
  { id: "samaka", grp: "animal", ar: "سَمَكَةٌ", tr: "samaka", e: "🐟", g: { de: "Fisch", en: "fish", fr: "poisson", ru: "рыба", tr: "balık" } },
  { id: "fahd", grp: "animal", ar: "فَهْدٌ", tr: "fahd", e: "🐆", g: { de: "Gepard, Panther", en: "cheetah, panther", fr: "guépard, panthère", ru: "гепард, пантера", tr: "çita, pars" } },
  { id: "fil", grp: "animal", ar: "فِيلٌ", tr: "fīl", e: "🐘", g: { de: "Elefant", en: "elephant", fr: "éléphant", ru: "слон", tr: "fil" } },
  // ---- Pflanzen ----
  { id: "nakhla", grp: "plant", ar: "نَخْلَةٌ", tr: "nakhla", e: "🌴", g: { de: "Dattelpalme", en: "date palm", fr: "palmier dattier", ru: "финиковая пальма", tr: "hurma ağacı" } },
  { id: "birsim", grp: "plant", ar: "بِرْسِيمٌ", tr: "birsīm", e: "🍀", g: { de: "Klee, Luzerne", en: "alfalfa, clover", fr: "luzerne, trèfle", ru: "люцерна, клевер", tr: "yonca" } },
  { id: "jazar", grp: "plant", ar: "جَزَرٌ", tr: "jazar", e: "🥕", g: { de: "Karotten", en: "carrots", fr: "carottes", ru: "морковь", tr: "havuç" } },
  { id: "shajara", grp: "plant", ar: "شَجَرَةٌ", tr: "shajara", e: "🌳", g: { de: "Baum", en: "tree", fr: "arbre", ru: "дерево", tr: "ağaç" } },
  { id: "warda", grp: "plant", ar: "وَرْدَةٌ", tr: "warda", e: "🌹", g: { de: "Rose, Blume", en: "rose, flower", fr: "rose, fleur", ru: "роза, цветок", tr: "gül" } },
  { id: "bittikh", grp: "plant", ar: "بِطِّيخٌ", tr: "biṭṭīkh", e: "🍉", g: { de: "Wassermelone", en: "watermelon", fr: "pastèque", ru: "арбуз", tr: "karpuz" } },
  { id: "ful", grp: "plant", ar: "فُولٌ", tr: "fūl", e: "🫘", g: { de: "Ackerbohnen", en: "fava beans", fr: "fèves", ru: "бобы", tr: "bakla" } },
  // ---- Insekten ----
  { id: "nahla", grp: "insect", ar: "نَحْلَةٌ", tr: "naḥla", e: "🐝", g: { de: "Biene", en: "bee", fr: "abeille", ru: "пчела", tr: "arı" } },
  { id: "ankabut", grp: "insect", ar: "عَنْكَبُوتٌ", tr: "ʿankabūt", e: "🕷️", g: { de: "Spinne", en: "spider", fr: "araignée", ru: "паук", tr: "örümcek" } },
  { id: "burghuth", grp: "insect", ar: "بُرْغُوثٌ", tr: "burghūth", g: { de: "Floh", en: "flea", fr: "puce", ru: "блоха", tr: "pire" } },
  { id: "dabbur", grp: "insect", ar: "دَبُّورٌ", tr: "dabbūr", g: { de: "Wespe", en: "wasp", fr: "guêpe", ru: "оса", tr: "eşek arısı" } },
  { id: "namla", grp: "insect", ar: "نَمْلَةٌ", tr: "namla", e: "🐜", g: { de: "Ameise", en: "ant", fr: "fourmi", ru: "муравей", tr: "karınca" } },
  { id: "jarad", grp: "insect", ar: "جَرَادٌ", tr: "jarād", e: "🦗", g: { de: "Heuschrecken", en: "locusts", fr: "criquets", ru: "саранча", tr: "çekirge" } },
  { id: "sursur", grp: "insect", ar: "صُرْصُورٌ", tr: "ṣurṣūr", e: "🪳", g: { de: "Kakerlake", en: "cockroach", fr: "cafard", ru: "таракан", tr: "hamamböceği" } },
  // ---- Gegenstände ----
  { id: "sarir", grp: "object", ar: "سَرِيرٌ", tr: "sarīr", e: "🛏️", g: { de: "Bett", en: "bed", fr: "lit", ru: "кровать", tr: "yatak" } },
  { id: "mirah", grp: "object", ar: "مِرْآةٌ", tr: "mirʾāh", e: "🪞", g: { de: "Spiegel", en: "mirror", fr: "miroir", ru: "зеркало", tr: "ayna" } },
  { id: "bab", grp: "object", ar: "بَابٌ", tr: "bāb", e: "🚪", g: { de: "Tür", en: "door", fr: "porte", ru: "дверь", tr: "kapı" } },
  { id: "mindada", grp: "object", ar: "مِنْضَدَةٌ", tr: "minḍada", g: { de: "kleiner Tisch", en: "small table", fr: "petite table", ru: "столик", tr: "sehpa" } },
  { id: "hasub", grp: "object", ar: "حَاسُوبٌ", tr: "ḥāsūb", e: "💻", g: { de: "Computer", en: "computer", fr: "ordinateur", ru: "компьютер", tr: "bilgisayar" } },
  { id: "maktaba", grp: "object", ar: "مَكْتَبَةٌ", tr: "maktaba", e: "📚", g: { de: "Bibliothek, Bücherregal", en: "library, bookcase", fr: "bibliothèque", ru: "библиотека, книжный шкаф", tr: "kütüphane" } },
  { id: "luba", grp: "object", ar: "لُعْبَةٌ", tr: "luʿba", e: "🧸", g: { de: "Spielzeug", en: "toy", fr: "jouet", ru: "игрушка", tr: "oyuncak" } },
  { id: "kursi", grp: "object", ar: "كُرْسِيٌّ", tr: "kursī", e: "🪑", g: { de: "Stuhl", en: "chair", fr: "chaise", ru: "стул", tr: "sandalye" } },
  { id: "hatif", grp: "object", ar: "هَاتِفٌ", tr: "hātif", e: "📱", g: { de: "Telefon", en: "phone", fr: "téléphone", ru: "телефон", tr: "telefon" } },
  { id: "thallaja", grp: "object", ar: "ثَلَّاجَةٌ", tr: "thallāja", g: { de: "Kühlschrank", en: "fridge", fr: "réfrigérateur", ru: "холодильник", tr: "buzdolabı" } },
  // ---- Flüssigkeiten ----
  { id: "asal", grp: "fluid", ar: "عَسَلٌ", tr: "ʿasal", e: "🍯", g: { de: "Honig", en: "honey", fr: "miel", ru: "мёд", tr: "bal" } },
  { id: "laban", grp: "fluid", ar: "لَبَنٌ", tr: "laban", e: "🥛", g: { de: "Milch", en: "milk", fr: "lait", ru: "молоко", tr: "süt" } },
  { id: "qahwa", grp: "fluid", ar: "قَهْوَةٌ", tr: "qahwa", e: "☕", g: { de: "Kaffee", en: "coffee", fr: "café", ru: "кофе", tr: "kahve" } },
  { id: "maa", grp: "fluid", ar: "مَاءٌ", tr: "māʾ", e: "💧", g: { de: "Wasser", en: "water", fr: "eau", ru: "вода", tr: "su" } },
  { id: "shay", grp: "fluid", ar: "شَايٌ", tr: "shāy", e: "🍵", g: { de: "Tee", en: "tea", fr: "thé", ru: "чай", tr: "çay" } },
  { id: "asir", grp: "fluid", ar: "عَصِيرٌ", tr: "ʿaṣīr", e: "🧃", g: { de: "Saft", en: "juice", fr: "jus", ru: "сок", tr: "meyve suyu" } },
];

export const GROUPS = ["animal", "plant", "insect", "object", "fluid"];
// Kategorie-Wort für jede Gruppe (für Aufgaben und Spiel)
export const GROUP_AR = { animal: "حَيَوَانٌ", plant: "نَبَاتٌ", insect: "حَشَرَةٌ", object: "جَمَادٌ", fluid: "سَائِلٌ" };

// Sammelwort → ein einzelnes (mit ة); die ersten drei sind Namen von Suren
export const UNITS = [
  { coll: "نَحْلٌ", one: "نَحْلَةٌ", tr: "naḥl → naḥla", sura: "النَّحْل", n: 16 },
  { coll: "نَمْلٌ", one: "نَمْلَةٌ", tr: "naml → namla", sura: "النَّمْل", n: 27 },
  { coll: "سَمَكٌ", one: "سَمَكَةٌ", tr: "samak → samaka" },
  { coll: "شَجَرٌ", one: "شَجَرَةٌ", tr: "shajar → shajara" },
  { coll: "نَخْلٌ", one: "نَخْلَةٌ", tr: "nakhl → nakhla" },
  { coll: "وَرْدٌ", one: "وَرْدَةٌ", tr: "ward → warda" },
];
export const SURAS = [
  { ar: "النَّحْل", n: 16, id: "nahla" }, { ar: "النَّمْل", n: 27, id: "namla" }, { ar: "العَنْكَبُوت", n: 29, id: "ankabut" }, { ar: "الفِيل", n: 105, id: "fil" },
];

export const MASTER_AT = 2;
export const SPRINT_SECONDS = 60;
export const SPRINT_GOAL = 15;
