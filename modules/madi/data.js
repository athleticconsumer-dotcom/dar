// =====================================================================
//  VERGANGENHEIT (الفِعْلُ المَاضِي) – Personen, Verben und Qur'an-Beispiele
//  Jede Form = Stamm (Verb ohne letzten Vokal) + Vokal auf dem 3. Wurzelbuchstaben (m) + Endung (suf)
//  row/col/rs/cs: Platz in der Tabelle (Spalte 1 = Einzahl, rechts) · Reihenfolge = klassische Reihenfolge
//  Qur'an-Text der Beispiele aus Tanzil (Uthmani, Hafs), wortgenau ausgeschnitten.
// =====================================================================

export const MASTER_AT = 3;
export const TABLE_GOAL = 3;
export const MAX_MISTAKES = 2;

export const PERSONS = [
  { id: "huwa", pr: "هُوَ", m: "َ", suf: "", row: 1, col: 1, rs: 1, cs: 1, grp: "3m" },
  { id: "huma_m", pr: "هُمَا", m: "َ", suf: "ا", row: 1, col: 2, rs: 1, cs: 1, grp: "3m" },
  { id: "hum", pr: "هُمْ", m: "ُ", suf: "وا", row: 1, col: 3, rs: 1, cs: 1, grp: "3m" },
  { id: "hiya", pr: "هِيَ", m: "َ", suf: "تْ", row: 2, col: 1, rs: 1, cs: 1, grp: "3f" },
  { id: "huma_f", pr: "هُمَا", m: "َ", suf: "تَا", row: 2, col: 2, rs: 1, cs: 1, grp: "3f" },
  { id: "hunna", pr: "هُنَّ", m: "ْ", suf: "نَ", row: 2, col: 3, rs: 1, cs: 1, grp: "3f" },
  { id: "anta", pr: "أَنْتَ", m: "ْ", suf: "تَ", row: 3, col: 1, rs: 1, cs: 1, grp: "2m" },
  { id: "antuma", pr: "أَنْتُمَا", m: "ْ", suf: "تُمَا", row: 3, col: 2, rs: 2, cs: 1, grp: "2" },
  { id: "antum", pr: "أَنْتُمْ", m: "ْ", suf: "تُمْ", row: 3, col: 3, rs: 1, cs: 1, grp: "2m" },
  { id: "anti", pr: "أَنْتِ", m: "ْ", suf: "تِ", row: 4, col: 1, rs: 1, cs: 1, grp: "2f" },
  { id: "antunna", pr: "أَنْتُنَّ", m: "ْ", suf: "تُنَّ", row: 4, col: 3, rs: 1, cs: 1, grp: "2f" },
  { id: "ana", pr: "أَنَا", m: "ْ", suf: "تُ", row: 5, col: 1, rs: 1, cs: 1, grp: "1" },
  { id: "nahnu", pr: "نَحْنُ", m: "ْ", suf: "نَا", row: 5, col: 2, rs: 1, cs: 2, grp: "1" },
];

/** Formen, die leicht verwechselt werden (für die Falschantworten) */
export const CONFUSE = [["anta", "anti", "ana", "hiya"], ["antum", "antuma", "antunna"], ["hum", "huma_m"], ["hunna", "nahnu"], ["huma_f", "hiya", "huma_m"], ["huwa", "hiya"]];

export const VERBS = [
  { id: "kataba", ar: "كَتَبَ", g: {"de": "schreiben", "en": "write", "fr": "écrire", "ru": "писать", "tr": "yazmak"} },
  { id: "darasa", ar: "دَرَسَ", g: {"de": "lernen", "en": "study", "fr": "étudier", "ru": "учить", "tr": "ders çalışmak"} },
  { id: "dhahaba", ar: "ذَهَبَ", g: {"de": "gehen", "en": "go", "fr": "aller", "ru": "идти", "tr": "gitmek"} },
  { id: "jalasa", ar: "جَلَسَ", g: {"de": "sich setzen", "en": "sit down", "fr": "s'asseoir", "ru": "садиться", "tr": "oturmak"} },
  { id: "fataha", ar: "فَتَحَ", g: {"de": "öffnen", "en": "open", "fr": "ouvrir", "ru": "открывать", "tr": "açmak"} },
  { id: "sajada", ar: "سَجَدَ", g: {"de": "sich niederwerfen", "en": "prostrate", "fr": "se prosterner", "ru": "совершать земной поклон", "tr": "secde etmek"} },
  { id: "shakara", ar: "شَكَرَ", g: {"de": "danken", "en": "thank", "fr": "remercier", "ru": "благодарить", "tr": "teşekkür etmek"} },
  { id: "dhakara", ar: "ذَكَرَ", g: {"de": "gedenken, erwähnen", "en": "remember, mention", "fr": "se souvenir, mentionner", "ru": "поминать", "tr": "anmak"} },
  { id: "kharaja", ar: "خَرَجَ", g: {"de": "hinausgehen", "en": "go out", "fr": "sortir", "ru": "выходить", "tr": "çıkmak"} },
  { id: "dakhala", ar: "دَخَلَ", g: {"de": "eintreten", "en": "enter", "fr": "entrer", "ru": "входить", "tr": "girmek"} },
  { id: "alima", ar: "عَلِمَ", g: {"de": "wissen", "en": "know", "fr": "savoir", "ru": "знать", "tr": "bilmek"} },
  { id: "shariba", ar: "شَرِبَ", g: {"de": "trinken", "en": "drink", "fr": "boire", "ru": "пить", "tr": "içmek"} },
  { id: "laiba", ar: "لَعِبَ", g: {"de": "spielen", "en": "play", "fr": "jouer", "ru": "играть", "tr": "oynamak"} },
  { id: "hamida", ar: "حَمِدَ", g: {"de": "loben", "en": "praise", "fr": "louer", "ru": "восхвалять", "tr": "hamd etmek"} },
  { id: "samia", ar: "سَمِعَ", g: {"de": "hören", "en": "hear", "fr": "entendre", "ru": "слышать", "tr": "duymak"} },
  { id: "fahima", ar: "فَهِمَ", g: {"de": "verstehen", "en": "understand", "fr": "comprendre", "ru": "понимать", "tr": "anlamak"} },
  { id: "hafiza", ar: "حَفِظَ", g: {"de": "auswendig lernen", "en": "memorise", "fr": "mémoriser", "ru": "заучивать", "tr": "ezberlemek"} },
  { id: "rajaa", ar: "رَجَعَ", g: {"de": "zurückkehren", "en": "return", "fr": "revenir", "ru": "возвращаться", "tr": "dönmek"} },
  { id: "tabakha", ar: "طَبَخَ", g: {"de": "kochen", "en": "cook", "fr": "cuisiner", "ru": "готовить", "tr": "pişirmek"} },
  { id: "ghasala", ar: "غَسَلَ", g: {"de": "waschen", "en": "wash", "fr": "laver", "ru": "мыть", "tr": "yıkamak"} },
];

export const QURAN = [
  {"ref": "95:4", "text": "لَقَدۡ خَلَقۡنَا ٱلۡإِنسَٰنَ فِيٓ أَحۡسَنِ تَقۡوِيمࣲ", "start": true, "end": true, "hl": [1], "p": ["nahnu"], "v": "خَلَقَ", "tr": {"de": "Wir haben den Menschen ja in schönster Gestalt erschaffen.", "en": "We have indeed created the human being in the finest form.", "fr": "Nous avons certes créé l'homme dans la plus belle forme.", "ru": "Мы уже сотворили человека в прекраснейшем облике.", "tr": "Andolsun, Biz insanı en güzel biçimde yarattık."}},
  {"ref": "46:15", "text": "حَمَلَتۡهُ أُمُّهُۥ", "start": false, "end": false, "hl": [0], "p": ["hiya"], "v": "حَمَلَ", "tr": {"de": "… seine Mutter trug ihn …", "en": "… his mother carried him …", "fr": "… sa mère l'a porté …", "ru": "… мать носила его …", "tr": "… annesi onu taşıdı …"}},
  {"ref": "2:34", "text": "فَسَجَدُوٓاْ إِلَّآ إِبۡلِيسَ", "start": false, "end": false, "hl": [0], "p": ["hum"], "v": "سَجَدَ", "tr": {"de": "… da warfen sie sich nieder, außer Iblīs …", "en": "… so they prostrated, except Iblīs …", "fr": "… ils se prosternèrent, sauf Iblīs …", "ru": "… и они пали ниц, кроме Иблиса …", "tr": "… hepsi secde ettiler, İblis hariç …"}},
  {"ref": "94:7", "text": "فَإِذَا فَرَغۡتَ فَٱنصَبۡ", "start": true, "end": true, "hl": [1], "p": ["anta"], "v": "فَرَغَ", "tr": {"de": "Wenn du fertig bist, dann mühe dich (im Gottesdienst).", "en": "So when you have finished, then stand up (in worship).", "fr": "Quand tu as terminé, lève-toi (pour l'adoration).", "ru": "Когда же освободишься, то усердствуй (в поклонении).", "tr": "Boş kaldığında hemen (ibadete) koyul."}},
  {"ref": "28:16", "text": "قَالَ رَبِّ إِنِّي ظَلَمۡتُ نَفۡسِي فَٱغۡفِرۡ لِي فَغَفَرَ لَهُۥٓۚ", "start": true, "end": false, "hl": [3, 7], "p": ["ana", "huwa"], "v": "ظَلَمَ · غَفَرَ", "tr": {"de": "Er sagte: Mein Herr, ich habe mir selbst Unrecht getan, so vergib mir. Da vergab Er ihm.", "en": "He said: My Lord, I have wronged myself, so forgive me. So He forgave him.", "fr": "Il dit : Mon Seigneur, je me suis fait du tort, pardonne-moi. Il lui pardonna.", "ru": "Он сказал: Господи, я поступил несправедливо по отношению к себе, прости же меня. И Он простил его.", "tr": "Dedi ki: Rabbim, ben kendime zulmettim, beni bağışla. O da onu bağışladı."}},
];

/** Form einer Person: Stamm + Vokal + Endung */
export const stem = (v) => v.ar.slice(0, -1);
export const form = (v, p) => stem(v) + p.m + p.suf;
