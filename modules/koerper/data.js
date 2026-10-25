// =====================================================================
//  KÖRPER – Inhalte
//  grp: head | body | inner
//  f: weiblich · pl: Plural · du: Dual (bei Paaren)
//  pt: Punkt auf der Figur { v: "face" | "body", x, y } (Koordinaten der SVGs in index.js)
// =====================================================================

export const WORDS = [
  // ---- Kopf & Gesicht ----
  { id: "shar", grp: "head", ar: "شَعْر", tr: "shaʿr", pt: { v: "face", x: 120, y: 50 }, g: { de: "Haar", en: "hair", fr: "cheveux", ru: "волосы", tr: "saç" } },
  { id: "ras", grp: "head", ar: "رَأْس", tr: "raʾs", pl: "رُؤُوس", plTr: "ruʾūs", pt: { v: "body", x: 120, y: 24 }, g: { de: "Kopf", en: "head", fr: "tête", ru: "голова", tr: "baş" } },
  { id: "wajh", grp: "head", ar: "وَجْه", tr: "wajh", pl: "وُجُوه", plTr: "wujūh", pt: { v: "body", x: 120, y: 56 }, g: { de: "Gesicht", en: "face", fr: "visage", ru: "лицо", tr: "yüz" } },
  { id: "jabha", grp: "head", ar: "جَبْهَة", tr: "jabha", f: true, pt: { v: "face", x: 120, y: 94 }, g: { de: "Stirn", en: "forehead", fr: "front", ru: "лоб", tr: "alın" } },
  { id: "ayn", grp: "head", ar: "عَيْن", tr: "ʿayn", f: true, du: "عَيْنَانِ", duTr: "ʿaynāni", pl: "أَعْيُن", plTr: "aʿyun", pt: { v: "face", x: 152, y: 130 }, g: { de: "Auge", en: "eye", fr: "œil", ru: "глаз", tr: "göz" } },
  { id: "udhun", grp: "head", ar: "أُذُن", tr: "udhun", f: true, du: "أُذُنَانِ", duTr: "udhunāni", pl: "آذَان", plTr: "ādhān", pt: { v: "face", x: 201, y: 146 }, g: { de: "Ohr", en: "ear", fr: "oreille", ru: "ухо", tr: "kulak" } },
  { id: "anf", grp: "head", ar: "أَنْف", tr: "anf", pl: "أُنُوف", plTr: "unūf", pt: { v: "face", x: 121, y: 166 }, g: { de: "Nase", en: "nose", fr: "nez", ru: "нос", tr: "burun" } },
  { id: "fam", grp: "head", ar: "فَم", tr: "fam", pl: "أَفْوَاه", plTr: "afwāh", pt: { v: "face", x: 120, y: 212 }, g: { de: "Mund", en: "mouth", fr: "bouche", ru: "рот", tr: "ağız" } },
  { id: "shafa", grp: "head", ar: "شَفَة", tr: "shafa", f: true, du: "شَفَتَانِ", duTr: "shafatāni", g: { de: "Lippe", en: "lip", fr: "lèvre", ru: "губа", tr: "dudak" } },
  { id: "sinn", grp: "head", ar: "سِنّ", tr: "sinn", f: true, pl: "أَسْنَان", plTr: "asnān", g: { de: "Zahn", en: "tooth", fr: "dent", ru: "зуб", tr: "diş" } },
  { id: "lisan", grp: "head", ar: "لِسَان", tr: "lisān", pl: "أَلْسِنَة", plTr: "alsina", g: { de: "Zunge, Sprache", en: "tongue, language", fr: "langue", ru: "язык", tr: "dil" } },
  { id: "khadd", grp: "head", ar: "خَدّ", tr: "khadd", pl: "خُدُود", plTr: "khudūd", pt: { v: "face", x: 163, y: 184 }, g: { de: "Wange", en: "cheek", fr: "joue", ru: "щека", tr: "yanak" } },
  { id: "lihya", grp: "head", ar: "لِحْيَة", tr: "liḥya", f: true, g: { de: "Bart", en: "beard", fr: "barbe", ru: "борода", tr: "sakal" } },
  { id: "raqaba", grp: "head", ar: "رَقَبَة", tr: "raqaba", f: true, pt: { v: "body", x: 120, y: 88 }, g: { de: "Hals, Nacken", en: "neck", fr: "cou", ru: "шея", tr: "boyun" } },
  // ---- Körper & Glieder ----
  { id: "katif", grp: "body", ar: "كَتِف", tr: "katif", du: "كَتِفَانِ", duTr: "katifāni", pl: "أَكْتَاف", plTr: "aktāf", pt: { v: "body", x: 168, y: 106 }, g: { de: "Schulter", en: "shoulder", fr: "épaule", ru: "плечо", tr: "omuz" } },
  { id: "sadr", grp: "body", ar: "صَدْر", tr: "ṣadr", pl: "صُدُور", plTr: "ṣudūr", pt: { v: "body", x: 100, y: 136 }, g: { de: "Brust", en: "chest", fr: "poitrine", ru: "грудь", tr: "göğüs" } },
  { id: "batn", grp: "body", ar: "بَطْن", tr: "baṭn", pl: "بُطُون", plTr: "buṭūn", pt: { v: "body", x: 120, y: 196 }, g: { de: "Bauch", en: "belly", fr: "ventre", ru: "живот", tr: "karın" } },
  { id: "zahr", grp: "body", ar: "ظَهْر", tr: "ẓahr", pl: "ظُهُور", plTr: "ẓuhūr", g: { de: "Rücken", en: "back", fr: "dos", ru: "спина", tr: "sırt" } },
  { id: "dhira", grp: "body", ar: "ذِرَاع", tr: "dhirāʿ", f: true, du: "ذِرَاعَانِ", duTr: "dhirāʿāni", pt: { v: "body", x: 59, y: 148 }, g: { de: "Arm", en: "arm", fr: "bras", ru: "рука (от локтя)", tr: "kol" } },
  { id: "mirfaq", grp: "body", ar: "مِرْفَق", tr: "mirfaq", pl: "مَرَافِق", plTr: "marāfiq", pt: { v: "body", x: 50, y: 186 }, g: { de: "Ellbogen", en: "elbow", fr: "coude", ru: "локоть", tr: "dirsek" } },
  { id: "yad", grp: "body", ar: "يَد", tr: "yad", f: true, du: "يَدَانِ", duTr: "yadāni", pl: "أَيْدٍ", plTr: "aydin", pt: { v: "body", x: 42, y: 270 }, g: { de: "Hand", en: "hand", fr: "main", ru: "кисть руки", tr: "el" } },
  { id: "isba", grp: "body", ar: "إِصْبَع", tr: "iṣbaʿ", f: true, pl: "أَصَابِع", plTr: "aṣābiʿ", pt: { v: "body", x: 199, y: 286 }, g: { de: "Finger", en: "finger", fr: "doigt", ru: "палец", tr: "parmak" } },
  { id: "rijl", grp: "body", ar: "رِجْل", tr: "rijl", f: true, du: "رِجْلَانِ", duTr: "rijlāni", pl: "أَرْجُل", plTr: "arjul", pt: { v: "body", x: 147, y: 372 }, g: { de: "Bein, Fuß", en: "leg, foot", fr: "jambe, pied", ru: "нога", tr: "bacak, ayak" } },
  { id: "rukba", grp: "body", ar: "رُكْبَة", tr: "rukba", f: true, pl: "رُكَب", plTr: "rukab", pt: { v: "body", x: 94, y: 330 }, g: { de: "Knie", en: "knee", fr: "genou", ru: "колено", tr: "diz" } },
  { id: "kab", grp: "body", ar: "كَعْب", tr: "kaʿb", du: "كَعْبَانِ", duTr: "kaʿbāni", pt: { v: "body", x: 92, y: 404 }, g: { de: "Knöchel", en: "ankle", fr: "cheville", ru: "лодыжка", tr: "topuk kemiği" } },
  { id: "qadam", grp: "body", ar: "قَدَم", tr: "qadam", f: true, du: "قَدَمَانِ", duTr: "qadamāni", pl: "أَقْدَام", plTr: "aqdām", pt: { v: "body", x: 157, y: 420 }, g: { de: "Fuß", en: "foot", fr: "pied", ru: "стопа", tr: "ayak" } },
  // ---- Innen & mehr ----
  { id: "qalb", grp: "inner", ar: "قَلْب", tr: "qalb", pl: "قُلُوب", plTr: "qulūb", pt: { v: "body", x: 139, y: 140 }, g: { de: "Herz", en: "heart", fr: "cœur", ru: "сердце", tr: "kalp" } },
  { id: "jism", grp: "inner", ar: "جِسْم", tr: "jism", pl: "أَجْسَام", plTr: "ajsām", g: { de: "Körper", en: "body", fr: "corps", ru: "тело", tr: "beden" } },
  { id: "dam", grp: "inner", ar: "دَم", tr: "dam", pl: "دِمَاء", plTr: "dimāʾ", g: { de: "Blut", en: "blood", fr: "sang", ru: "кровь", tr: "kan" } },
  { id: "azm", grp: "inner", ar: "عَظْم", tr: "ʿaẓm", pl: "عِظَام", plTr: "ʿiẓām", g: { de: "Knochen", en: "bone", fr: "os", ru: "кость", tr: "kemik" } },
  { id: "jild", grp: "inner", ar: "جِلْد", tr: "jild", pl: "جُلُود", plTr: "julūd", g: { de: "Haut", en: "skin", fr: "peau", ru: "кожа", tr: "deri" } },
  { id: "maida", grp: "inner", ar: "مَعِدَة", tr: "maʿida", f: true, g: { de: "Magen", en: "stomach", fr: "estomac", ru: "желудок", tr: "mide" } },
  { id: "aql", grp: "inner", ar: "عَقْل", tr: "ʿaql", g: { de: "Verstand", en: "mind, intellect", fr: "raison", ru: "разум", tr: "akıl" } },
  { id: "nafs", grp: "inner", ar: "نَفْس", tr: "nafs", f: true, pl: "أَنْفُس", plTr: "anfus", g: { de: "Seele, Selbst", en: "self, soul", fr: "âme, soi", ru: "душа, сам", tr: "nefis" } },
  { id: "ruh", grp: "inner", ar: "رُوح", tr: "rūḥ", f: true, g: { de: "Geist, Seele", en: "spirit", fr: "esprit", ru: "дух", tr: "ruh" } },
];

export const GROUPS = ["head", "body", "inner"];
export const MASTER_AT = 2;

// Wuḍūʾ-Teil von al-Māʾida 5:6 (Tanzil, Uthmani/Hafs); hl: Körperwort → id
export const WUDU = {
  ref: "5:6",
  words: [
    { ar: "فَٱغۡسِلُواْ" }, { ar: "وُجُوهَكُمۡ", hl: "wajh" }, { ar: "وَأَيۡدِيَكُمۡ", hl: "yad" }, { ar: "إِلَى" }, { ar: "ٱلۡمَرَافِقِ", hl: "mirfaq" },
    { ar: "وَٱمۡسَحُواْ" }, { ar: "بِرُءُوسِكُمۡ", hl: "ras" }, { ar: "وَأَرۡجُلَكُمۡ", hl: "rijl" }, { ar: "إِلَى" }, { ar: "ٱلۡكَعۡبَيۡنِ", hl: "kab" },
  ],
};

// „Was ich mit meinem Körper tue“: Verb + بِـ (mit) + Körperteil + ـِي (mein)
export const SENSES = [
  { id: "ayn", ar: "أَرَى بِعَيْنِي", tr: "arā bi-ʿaynī", g: { de: "Ich sehe mit meinem Auge.", en: "I see with my eye.", fr: "Je vois avec mon œil.", ru: "Я вижу своим глазом.", tr: "Gözümle görürüm." } },
  { id: "udhun", ar: "أَسْمَعُ بِأُذُنِي", tr: "asmaʿu bi-udhunī", g: { de: "Ich höre mit meinem Ohr.", en: "I hear with my ear.", fr: "J'entends avec mon oreille.", ru: "Я слышу своим ухом.", tr: "Kulağımla duyarım." } },
  { id: "anf", ar: "أَشُمُّ بِأَنْفِي", tr: "ashummu bi-anfī", g: { de: "Ich rieche mit meiner Nase.", en: "I smell with my nose.", fr: "Je sens avec mon nez.", ru: "Я чувствую запах носом.", tr: "Burnumla koklarım." } },
  { id: "lisan", ar: "أَتَكَلَّمُ بِلِسَانِي", tr: "atakallamu bi-lisānī", g: { de: "Ich spreche mit meiner Zunge.", en: "I speak with my tongue.", fr: "Je parle avec ma langue.", ru: "Я говорю своим языком.", tr: "Dilimle konuşurum." } },
  { id: "yad", ar: "أَكْتُبُ بِيَدِي", tr: "aktubu bi-yadī", g: { de: "Ich schreibe mit meiner Hand.", en: "I write with my hand.", fr: "J'écris avec ma main.", ru: "Я пишу своей рукой.", tr: "Elimle yazarım." } },
  { id: "rijl", ar: "أَمْشِي بِرِجْلِي", tr: "amshī bi-rijlī", g: { de: "Ich gehe mit meinem Fuß.", en: "I walk with my foot.", fr: "Je marche avec mon pied.", ru: "Я хожу своей ногой.", tr: "Ayağımla yürürüm." } },
  { id: "qalb", ar: "أُحِبُّ بِقَلْبِي", tr: "uḥibbu bi-qalbī", g: { de: "Ich liebe mit meinem Herzen.", en: "I love with my heart.", fr: "J'aime avec mon cœur.", ru: "Я люблю своим сердцем.", tr: "Kalbimle severim." } },
  { id: "aql", ar: "أُفَكِّرُ بِعَقْلِي", tr: "ufakkiru bi-ʿaqlī", g: { de: "Ich denke mit meinem Verstand.", en: "I think with my mind.", fr: "Je pense avec ma raison.", ru: "Я думаю своим разумом.", tr: "Aklımla düşünürüm." } },
];
