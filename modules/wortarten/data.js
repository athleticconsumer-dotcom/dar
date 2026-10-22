// =====================================================================
//  WORTARTEN – Inhalte
//  t: "ism" | "fiil" | "harf"
//  s: Erkennungszeichen (Text dazu in lang.js unter "s.<s>")
//  g: Bedeutung pro Sprache
// =====================================================================

export const TYPES = ["ism", "fiil", "harf"];

export const WORDS = [
  // ---- Ism ----
  { id: "kitab", ar: "كِتَابٌ", tr: "kitābun", t: "ism", s: "tanwin", g: { de: "ein Buch", en: "a book", fr: "un livre", ru: "книга", tr: "bir kitap" } },
  { id: "bayt", ar: "البَيْتُ", tr: "al-baytu", t: "ism", s: "al", g: { de: "das Haus", en: "the house", fr: "la maison", ru: "дом", tr: "ev" } },
  { id: "muhammad", ar: "مُحَمَّدٌ", tr: "Muḥammadun", t: "ism", s: "name", g: { de: "Muhammad", en: "Muhammad", fr: "Muhammad", ru: "Мухаммад", tr: "Muhammed" } },
  { id: "madrasa", ar: "مَدْرَسَةٌ", tr: "madrasatun", t: "ism", s: "ta", g: { de: "eine Schule", en: "a school", fr: "une école", ru: "школа", tr: "bir okul" } },
  { id: "qalam", ar: "القَلَمُ", tr: "al-qalamu", t: "ism", s: "al", g: { de: "der Stift", en: "the pen", fr: "le calame", ru: "калам (ручка)", tr: "kalem" } },
  { id: "huwa", ar: "هُوَ", tr: "huwa", t: "ism", s: "pron", g: { de: "er", en: "he", fr: "il", ru: "он", tr: "o (erkek)" } },
  { id: "kabir", ar: "كَبِيرٌ", tr: "kabīrun", t: "ism", s: "tanwin", g: { de: "groß", en: "big", fr: "grand", ru: "большой", tr: "büyük" } },
  { id: "sama", ar: "السَّمَاءُ", tr: "as-samāʾu", t: "ism", s: "al", g: { de: "der Himmel", en: "the sky", fr: "le ciel", ru: "небо", tr: "gök" } },
  { id: "masjid", ar: "مَسْجِدٌ", tr: "masjidun", t: "ism", s: "tanwin", g: { de: "eine Moschee", en: "a mosque", fr: "une mosquée", ru: "мечеть", tr: "bir cami" } },
  { id: "ana", ar: "أَنَا", tr: "anā", t: "ism", s: "pron", g: { de: "ich", en: "I", fr: "je", ru: "я", tr: "ben" } },
  { id: "fatima", ar: "فَاطِمَةُ", tr: "Fāṭimatu", t: "ism", s: "name", g: { de: "Fāṭima", en: "Fāṭima", fr: "Fāṭima", ru: "Фатима", tr: "Fatıma" } },
  { id: "maa", ar: "المَاءُ", tr: "al-māʾu", t: "ism", s: "al", g: { de: "das Wasser", en: "the water", fr: "l'eau", ru: "вода", tr: "su" } },
  // ---- Fiʿl ----
  { id: "kataba", ar: "كَتَبَ", tr: "kataba", t: "fiil", s: "past", g: { de: "er schrieb", en: "he wrote", fr: "il a écrit", ru: "он написал", tr: "yazdı" } },
  { id: "dhahaba", ar: "ذَهَبَ", tr: "dhahaba", t: "fiil", s: "past", g: { de: "er ging", en: "he went", fr: "il est allé", ru: "он пошёл", tr: "gitti" } },
  { id: "yaqrau", ar: "يَقْرَأُ", tr: "yaqraʾu", t: "fiil", s: "mudari", g: { de: "er liest", en: "he reads", fr: "il lit", ru: "он читает", tr: "okuyor" } },
  { id: "katabat", ar: "كَتَبَتْ", tr: "katabat", t: "fiil", s: "tat", g: { de: "sie schrieb", en: "she wrote", fr: "elle a écrit", ru: "она написала", tr: "(kadın) yazdı" } },
  { id: "sayakul", ar: "سَيَأْكُلُ", tr: "sayaʾkulu", t: "fiil", s: "sin", g: { de: "er wird essen", en: "he will eat", fr: "il mangera", ru: "он будет есть", tr: "yiyecek" } },
  { id: "uktub", ar: "اُكْتُبْ", tr: "uktub", t: "fiil", s: "amr", g: { de: "schreib!", en: "write!", fr: "écris !", ru: "пиши!", tr: "yaz!" } },
  { id: "naktubu", ar: "نَكْتُبُ", tr: "naktubu", t: "fiil", s: "mudari", g: { de: "wir schreiben", en: "we write", fr: "nous écrivons", ru: "мы пишем", tr: "yazıyoruz" } },
  { id: "jalasa", ar: "جَلَسَ", tr: "jalasa", t: "fiil", s: "past", g: { de: "er saß", en: "he sat", fr: "il s'est assis", ru: "он сел", tr: "oturdu" } },
  { id: "fatahat", ar: "فَتَحَتْ", tr: "fataḥat", t: "fiil", s: "tat", g: { de: "sie öffnete", en: "she opened", fr: "elle a ouvert", ru: "она открыла", tr: "(kadın) açtı" } },
  { id: "yashrabu", ar: "يَشْرَبُ", tr: "yashrabu", t: "fiil", s: "mudari", g: { de: "er trinkt", en: "he drinks", fr: "il boit", ru: "он пьёт", tr: "içiyor" } },
  // ---- Ḥarf ----
  { id: "fi", ar: "فِي", tr: "fī", t: "harf", s: "harf", g: { de: "in", en: "in", fr: "dans", ru: "в", tr: "-de, içinde" } },
  { id: "min", ar: "مِنْ", tr: "min", t: "harf", s: "harf", g: { de: "von, aus", en: "from", fr: "de", ru: "из, от", tr: "-den" } },
  { id: "ila", ar: "إِلَى", tr: "ilā", t: "harf", s: "harf", g: { de: "zu, nach", en: "to", fr: "vers, à", ru: "к, в", tr: "-e, -a" } },
  { id: "ala", ar: "عَلَى", tr: "ʿalā", t: "harf", s: "harf", g: { de: "auf", en: "on", fr: "sur", ru: "на", tr: "üzerinde" } },
  { id: "wa", ar: "وَ", tr: "wa", t: "harf", s: "harf", g: { de: "und", en: "and", fr: "et", ru: "и", tr: "ve" } },
  { id: "lam", ar: "لَمْ", tr: "lam", t: "harf", s: "harf", g: { de: "nicht (Vergangenheit)", en: "did not", fr: "ne … pas (passé)", ru: "не (в прошлом)", tr: "-medi (olumsuz)" } },
  { id: "hal", ar: "هَلْ", tr: "hal", t: "harf", s: "harf", g: { de: "Fragewort (ob)", en: "question word", fr: "particule interrogative", ru: "вопросительная частица", tr: "soru edatı (mi?)" } },
  { id: "thumma", ar: "ثُمَّ", tr: "thumma", t: "harf", s: "harf", g: { de: "dann", en: "then", fr: "puis", ru: "затем", tr: "sonra" } },
  { id: "qad", ar: "قَدْ", tr: "qad", t: "harf", s: "harf", g: { de: "schon, gewiss", en: "already, indeed", fr: "déjà, certes", ru: "уже, действительно", tr: "muhakkak, -di bile" } },
];

// Sätze für das Spiel: w = Wörter (von rechts nach links), t = Wortart je Wort
export const SENTENCES = [
  { ar: ["ذَهَبَ", "مُوسَىٰ", "إِلَى", "فِرْعَوْنَ"], t: ["fiil", "ism", "harf", "ism"],
    g: { de: "Mūsā ging zu Pharao.", en: "Mūsā went to Pharaoh.", fr: "Mūsā est allé vers Pharaon.", ru: "Муса пошёл к Фараону.", tr: "Musa Firavun'a gitti." } },
  { ar: ["الكِتَابُ", "عَلَى", "المَكْتَبِ"], t: ["ism", "harf", "ism"],
    g: { de: "Das Buch ist auf dem Schreibtisch.", en: "The book is on the desk.", fr: "Le livre est sur le bureau.", ru: "Книга на столе.", tr: "Kitap masanın üzerinde." } },
  { ar: ["هَلْ", "تَقْرَأُ", "القُرْآنَ"], t: ["harf", "fiil", "ism"],
    g: { de: "Liest du den Qur'an?", en: "Do you read the Qur'an?", fr: "Lis-tu le Coran ?", ru: "Ты читаешь Коран?", tr: "Kur'an okuyor musun?" } },
  { ar: ["جَلَسَ", "الوَلَدُ", "فِي", "البَيْتِ"], t: ["fiil", "ism", "harf", "ism"],
    g: { de: "Der Junge saß im Haus.", en: "The boy sat in the house.", fr: "Le garçon s'est assis dans la maison.", ru: "Мальчик сидел в доме.", tr: "Çocuk evde oturdu." } },
  { ar: ["لَمْ", "يَكْتُبْ", "زَيْدٌ", "الدَّرْسَ"], t: ["harf", "fiil", "ism", "ism"],
    g: { de: "Zayd hat die Lektion nicht geschrieben.", en: "Zayd did not write the lesson.", fr: "Zayd n'a pas écrit la leçon.", ru: "Зайд не написал урок.", tr: "Zeyd dersi yazmadı." } },
  { ar: ["فَتَحَتْ", "فَاطِمَةُ", "البَابَ"], t: ["fiil", "ism", "ism"],
    g: { de: "Fāṭima öffnete die Tür.", en: "Fāṭima opened the door.", fr: "Fāṭima a ouvert la porte.", ru: "Фатима открыла дверь.", tr: "Fatıma kapıyı açtı." } },
  { ar: ["قَدْ", "قَامَتِ", "الصَّلَاةُ"], t: ["harf", "fiil", "ism"],
    g: { de: "Das Gebet hat begonnen. (aus der Iqāma)", en: "The prayer has begun. (from the iqāma)", fr: "La prière a commencé. (de l'iqāma)", ru: "Молитва началась. (из икамы)", tr: "Namaz başladı. (kametten)" } },
  { ar: ["سَيَشْرَبُ", "الرَّجُلُ", "المَاءَ"], t: ["fiil", "ism", "ism"],
    g: { de: "Der Mann wird das Wasser trinken.", en: "The man will drink the water.", fr: "L'homme boira l'eau.", ru: "Мужчина выпьет воду.", tr: "Adam suyu içecek." } },
  { ar: ["خَرَجْتُ", "مِنَ", "البَيْتِ", "ثُمَّ", "ذَهَبْتُ", "إِلَى", "السُّوقِ"], t: ["fiil", "harf", "ism", "harf", "fiil", "harf", "ism"],
    g: { de: "Ich ging aus dem Haus, dann ging ich zum Markt.", en: "I left the house, then I went to the market.", fr: "Je suis sorti de la maison, puis je suis allé au marché.", ru: "Я вышел из дома, потом пошёл на рынок.", tr: "Evden çıktım, sonra çarşıya gittim." } },
];

export const MASTER_AT = 2;
