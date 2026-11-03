// =====================================================================
//  WURZEL & MUSTER – Wortfamilien
//  r: die drei Wurzelbuchstaben · w: Familie { id, ar, m (Mīzān), cat?, g: Bedeutung pro Sprache }
//  cat: verb = Verb (Vergangenheit), doer = der Handelnde (فَاعِلٌ), done = das Behandelte (مَفْعُولٌ), place = Ort (مَفْعَلٌ/مَفْعِلٌ/مَفْعَلَةٌ)
// =====================================================================

export const MASTER_AT = 2;
export const HUNT_SECONDS = 60;
export const HUNT_GOAL = 12;
export const CATS = ["verb", "doer", "done", "place"];

export const ROOTS = [
  { id: "ktb", r: ["ك", "ت", "ب"], g: { de: "schreiben", en: "writing", fr: "écrire", ru: "писать", tr: "yazmak" }, w: [
    { id: "kataba", ar: "كَتَبَ", m: "فَعَلَ", cat: "verb", g: { de: "er schrieb", en: "he wrote", fr: "il a écrit", ru: "он написал", tr: "yazdı" } },
    { id: "kitab", ar: "كِتَابٌ", m: "فِعَالٌ", g: { de: "Buch", en: "book", fr: "livre", ru: "книга", tr: "kitap" } },
    { id: "katib", ar: "كَاتِبٌ", m: "فَاعِلٌ", cat: "doer", g: { de: "Schreiber", en: "writer", fr: "écrivain", ru: "писатель", tr: "yazar" } },
    { id: "maktub", ar: "مَكْتُوبٌ", m: "مَفْعُولٌ", cat: "done", g: { de: "geschrieben", en: "written", fr: "écrit", ru: "написанный", tr: "yazılmış" } },
    { id: "maktab", ar: "مَكْتَبٌ", m: "مَفْعَلٌ", cat: "place", g: { de: "Schreibtisch, Büro", en: "desk, office", fr: "bureau", ru: "письменный стол, офис", tr: "masa, büro" } },
    { id: "maktaba", ar: "مَكْتَبَةٌ", m: "مَفْعَلَةٌ", cat: "place", g: { de: "Bibliothek", en: "library", fr: "bibliothèque", ru: "библиотека", tr: "kütüphane" } },
  ] },
  { id: "ilm", r: ["ع", "ل", "م"], g: { de: "wissen", en: "knowing", fr: "savoir", ru: "знать", tr: "bilmek" }, w: [
    { id: "alima", ar: "عَلِمَ", m: "فَعِلَ", cat: "verb", g: { de: "er wusste", en: "he knew", fr: "il a su", ru: "он знал", tr: "bildi" } },
    { id: "ilm", ar: "عِلْمٌ", m: "فِعْلٌ", g: { de: "Wissen", en: "knowledge", fr: "savoir", ru: "знание", tr: "ilim" } },
    { id: "alim", ar: "عَالِمٌ", m: "فَاعِلٌ", cat: "doer", g: { de: "Gelehrter, Wissender", en: "scholar, one who knows", fr: "savant", ru: "учёный, знающий", tr: "âlim, bilen" } },
    { id: "malum", ar: "مَعْلُومٌ", m: "مَفْعُولٌ", cat: "done", g: { de: "bekannt", en: "known", fr: "connu", ru: "известный", tr: "bilinen" } },
    { id: "muallim", ar: "مُعَلِّمٌ", m: "مُفَعِّلٌ", g: { de: "Lehrer", en: "teacher", fr: "enseignant", ru: "учитель", tr: "öğretmen" } },
  ] },
  { id: "drs", r: ["د", "ر", "س"], g: { de: "lernen, studieren", en: "studying", fr: "étudier", ru: "учиться", tr: "ders çalışmak" }, w: [
    { id: "darasa", ar: "دَرَسَ", m: "فَعَلَ", cat: "verb", g: { de: "er lernte", en: "he studied", fr: "il a étudié", ru: "он учил", tr: "ders çalıştı" } },
    { id: "dars", ar: "دَرْسٌ", m: "فَعْلٌ", g: { de: "Lektion", en: "lesson", fr: "leçon", ru: "урок", tr: "ders" } },
    { id: "daris", ar: "دَارِسٌ", m: "فَاعِلٌ", cat: "doer", g: { de: "Lernender", en: "one who studies", fr: "celui qui étudie", ru: "изучающий", tr: "okuyan" } },
    { id: "madrasa", ar: "مَدْرَسَةٌ", m: "مَفْعَلَةٌ", cat: "place", g: { de: "Schule", en: "school", fr: "école", ru: "школа", tr: "okul" } },
  ] },
  { id: "sjd", r: ["س", "ج", "د"], g: { de: "sich niederwerfen", en: "prostrating", fr: "se prosterner", ru: "совершать земной поклон", tr: "secde etmek" }, w: [
    { id: "sajada", ar: "سَجَدَ", m: "فَعَلَ", cat: "verb", g: { de: "er warf sich nieder", en: "he prostrated", fr: "il s'est prosterné", ru: "он совершил земной поклон", tr: "secde etti" } },
    { id: "sajid", ar: "سَاجِدٌ", m: "فَاعِلٌ", cat: "doer", g: { de: "sich Niederwerfender", en: "one in prostration", fr: "celui qui se prosterne", ru: "совершающий поклон", tr: "secde eden" } },
    { id: "masjid", ar: "مَسْجِدٌ", m: "مَفْعِلٌ", cat: "place", g: { de: "Moschee (Ort der Niederwerfung)", en: "mosque (place of prostration)", fr: "mosquée (lieu de prosternation)", ru: "мечеть (место поклона)", tr: "mescit (secde yeri)" } },
    { id: "sujud", ar: "سُجُودٌ", m: "فُعُولٌ", g: { de: "Niederwerfung", en: "prostration", fr: "prosternation", ru: "земной поклон", tr: "secde" } },
    { id: "sajjada", ar: "سَجَّادَةٌ", m: "فَعَّالَةٌ", g: { de: "Gebetsteppich", en: "prayer rug", fr: "tapis de prière", ru: "молитвенный коврик", tr: "seccade" } },
  ] },
  { id: "jls", r: ["ج", "ل", "س"], g: { de: "sitzen", en: "sitting", fr: "s'asseoir", ru: "сидеть", tr: "oturmak" }, w: [
    { id: "jalasa", ar: "جَلَسَ", m: "فَعَلَ", cat: "verb", g: { de: "er setzte sich", en: "he sat down", fr: "il s'est assis", ru: "он сел", tr: "oturdu" } },
    { id: "jalis", ar: "جَالِسٌ", m: "فَاعِلٌ", cat: "doer", g: { de: "sitzend", en: "sitting", fr: "assis", ru: "сидящий", tr: "oturan" } },
    { id: "majlis", ar: "مَجْلِسٌ", m: "مَفْعِلٌ", cat: "place", g: { de: "Sitzung, Versammlungsort", en: "gathering, sitting place", fr: "assemblée, salon", ru: "собрание, место встречи", tr: "meclis" } },
    { id: "julus", ar: "جُلُوسٌ", m: "فُعُولٌ", g: { de: "das Sitzen", en: "sitting (the act)", fr: "le fait de s'asseoir", ru: "сидение", tr: "oturma" } },
  ] },
  { id: "lab", r: ["ل", "ع", "ب"], g: { de: "spielen", en: "playing", fr: "jouer", ru: "играть", tr: "oynamak" }, w: [
    { id: "laiba", ar: "لَعِبَ", m: "فَعِلَ", cat: "verb", g: { de: "er spielte", en: "he played", fr: "il a joué", ru: "он играл", tr: "oynadı" } },
    { id: "laib", ar: "لَاعِبٌ", m: "فَاعِلٌ", cat: "doer", g: { de: "Spieler", en: "player", fr: "joueur", ru: "игрок", tr: "oyuncu" } },
    { id: "malab", ar: "مَلْعَبٌ", m: "مَفْعَلٌ", cat: "place", g: { de: "Spielfeld, Stadion", en: "playing field, stadium", fr: "terrain, stade", ru: "стадион, площадка", tr: "oyun sahası, stadyum" } },
    { id: "luba", ar: "لُعْبَةٌ", m: "فُعْلَةٌ", g: { de: "Spielzeug, Spiel", en: "toy, game", fr: "jouet, jeu", ru: "игрушка, игра", tr: "oyuncak, oyun" } },
  ] },
  { id: "fth", r: ["ف", "ت", "ح"], g: { de: "öffnen", en: "opening", fr: "ouvrir", ru: "открывать", tr: "açmak" }, w: [
    { id: "fataha", ar: "فَتَحَ", m: "فَعَلَ", cat: "verb", g: { de: "er öffnete", en: "he opened", fr: "il a ouvert", ru: "он открыл", tr: "açtı" } },
    { id: "fath", ar: "فَتْحٌ", m: "فَعْلٌ", g: { de: "Öffnung, Sieg", en: "opening, victory", fr: "ouverture, victoire", ru: "открытие, победа", tr: "açılış, fetih" } },
    { id: "fatiha", ar: "فَاتِحَةٌ", m: "فَاعِلَةٌ", g: { de: "die Eröffnende (al-Fātiḥa)", en: "the opener (al-Fātiḥa)", fr: "l'ouvrante (al-Fātiḥa)", ru: "открывающая (аль-Фатиха)", tr: "açan (Fâtiha)" } },
    { id: "maftuh", ar: "مَفْتُوحٌ", m: "مَفْعُولٌ", cat: "done", g: { de: "geöffnet", en: "open", fr: "ouvert", ru: "открытый", tr: "açık" } },
    { id: "miftah", ar: "مِفْتَاحٌ", m: "مِفْعَالٌ", g: { de: "Schlüssel", en: "key", fr: "clé", ru: "ключ", tr: "anahtar" } },
  ] },
  { id: "tbkh", r: ["ط", "ب", "خ"], g: { de: "kochen", en: "cooking", fr: "cuisiner", ru: "готовить", tr: "pişirmek" }, w: [
    { id: "tabakha", ar: "طَبَخَ", m: "فَعَلَ", cat: "verb", g: { de: "er kochte", en: "he cooked", fr: "il a cuisiné", ru: "он приготовил", tr: "pişirdi" } },
    { id: "tabbakh", ar: "طَبَّاخٌ", m: "فَعَّالٌ", g: { de: "Koch", en: "cook", fr: "cuisinier", ru: "повар", tr: "aşçı" } },
    { id: "matbakh", ar: "مَطْبَخٌ", m: "مَفْعَلٌ", cat: "place", g: { de: "Küche", en: "kitchen", fr: "cuisine", ru: "кухня", tr: "mutfak" } },
    { id: "matbukh", ar: "مَطْبُوخٌ", m: "مَفْعُولٌ", cat: "done", g: { de: "gekocht", en: "cooked", fr: "cuit", ru: "приготовленный", tr: "pişmiş" } },
  ] },
  { id: "hmd", r: ["ح", "م", "د"], g: { de: "loben", en: "praising", fr: "louer", ru: "хвалить", tr: "övmek" }, w: [
    { id: "hamida", ar: "حَمِدَ", m: "فَعِلَ", cat: "verb", g: { de: "er lobte", en: "he praised", fr: "il a loué", ru: "он восхвалил", tr: "hamd etti" } },
    { id: "hamd", ar: "حَمْدٌ", m: "فَعْلٌ", g: { de: "Lob", en: "praise", fr: "louange", ru: "хвала", tr: "hamd" } },
    { id: "hamid", ar: "حَامِدٌ", m: "فَاعِلٌ", cat: "doer", g: { de: "Lobender", en: "one who praises", fr: "celui qui loue", ru: "восхваляющий", tr: "hamd eden" } },
    { id: "mahmud", ar: "مَحْمُودٌ", m: "مَفْعُولٌ", cat: "done", g: { de: "gelobt", en: "praised", fr: "loué", ru: "восхваляемый", tr: "övülmüş" } },
    { id: "muhammad", ar: "مُحَمَّدٌ", m: "مُفَعَّلٌ", g: { de: "Muhammad (der viel Gelobte)", en: "Muhammad (the much praised)", fr: "Muhammad (le très loué)", ru: "Мухаммад (многовосхваляемый)", tr: "Muhammed (çok övülen)" } },
  ] },
  { id: "dkhl", r: ["د", "خ", "ل"], g: { de: "eintreten", en: "entering", fr: "entrer", ru: "входить", tr: "girmek" }, w: [
    { id: "dakhala", ar: "دَخَلَ", m: "فَعَلَ", cat: "verb", g: { de: "er trat ein", en: "he entered", fr: "il est entré", ru: "он вошёл", tr: "girdi" } },
    { id: "dakhil", ar: "دَاخِلٌ", m: "فَاعِلٌ", cat: "doer", g: { de: "Eintretender, innen", en: "one entering, inside", fr: "celui qui entre, intérieur", ru: "входящий, внутренний", tr: "giren, içeri" } },
    { id: "madkhal", ar: "مَدْخَلٌ", m: "مَفْعَلٌ", cat: "place", g: { de: "Eingang", en: "entrance", fr: "entrée", ru: "вход", tr: "giriş" } },
    { id: "dukhul", ar: "دُخُولٌ", m: "فُعُولٌ", g: { de: "das Eintreten", en: "entering (the act)", fr: "l'entrée (le fait d'entrer)", ru: "вхождение", tr: "giriş (girme)" } },
  ] },
  { id: "khrj", r: ["خ", "ر", "ج"], g: { de: "hinausgehen", en: "going out", fr: "sortir", ru: "выходить", tr: "çıkmak" }, w: [
    { id: "kharaja", ar: "خَرَجَ", m: "فَعَلَ", cat: "verb", g: { de: "er ging hinaus", en: "he went out", fr: "il est sorti", ru: "он вышел", tr: "çıktı" } },
    { id: "kharij", ar: "خَارِجٌ", m: "فَاعِلٌ", cat: "doer", g: { de: "Hinausgehender, außen", en: "one going out, outside", fr: "celui qui sort, extérieur", ru: "выходящий, внешний", tr: "çıkan, dışarı" } },
    { id: "makhraj", ar: "مَخْرَجٌ", m: "مَفْعَلٌ", cat: "place", g: { de: "Ausgang (auch: Artikulationsstelle)", en: "exit (also: point of articulation)", fr: "sortie (aussi : point d'articulation)", ru: "выход (также: место артикуляции)", tr: "çıkış (ayrıca: mahreç)" } },
    { id: "khuruj", ar: "خُرُوجٌ", m: "فُعُولٌ", g: { de: "das Hinausgehen", en: "going out (the act)", fr: "la sortie (le fait de sortir)", ru: "выход (действие)", tr: "çıkış (çıkma)" } },
  ] },
];

/** Die Familie von ر ح م für die Erklärung (nur zum Ansehen) */
export const RAHMA = [
  { ar: "رَحِمَ", m: "فَعِلَ", k: "verb" }, { ar: "رَحْمَةٌ", m: "فَعْلَةٌ", k: "mercy" },
  { ar: "الرَّحْمٰنُ", m: "الفَعْلَانُ", k: "rahman" }, { ar: "الرَّحِيمُ", m: "الفَعِيلُ", k: "rahim" },
];

export const WORDS = ROOTS.flatMap((R) => R.w.map((w) => ({ ...w, root: R })));
