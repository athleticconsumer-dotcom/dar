// =====================================================================
//  PRÄPOSITIONEN (حُرُوف الجَرّ) – danach steht das Nomen im Genitiv (Kasra)
//  joined: wird an das nächste Wort angehängt (بِـ لِـ كَـ)
//  Qur'an-Text der Beispiele aus Tanzil (Uthmani, Hafs), wortgenau ausgeschnitten.
// =====================================================================

export const MASTER_AT = 3;
export const GOAL = 20;

export const PREPS = [
  { id: "fi", ar: "فِي", joined: false, g: {"de": "in", "en": "in", "fr": "dans", "ru": "в", "tr": "içinde"} },
  { id: "min", ar: "مِنْ", joined: false, g: {"de": "von, aus", "en": "from", "fr": "de", "ru": "из, от", "tr": "-den"} },
  { id: "ila", ar: "إِلَى", joined: false, g: {"de": "zu, nach", "en": "to", "fr": "vers, à", "ru": "к, в", "tr": "-e"} },
  { id: "ala", ar: "عَلَى", joined: false, g: {"de": "auf", "en": "on", "fr": "sur", "ru": "на", "tr": "üzerinde"} },
  { id: "an", ar: "عَنْ", joined: false, g: {"de": "über, von … weg", "en": "about, away from", "fr": "au sujet de, loin de", "ru": "о, от", "tr": "hakkında, -den"} },
  { id: "bi", ar: "بِـ", joined: true, g: {"de": "mit, durch", "en": "with, by", "fr": "avec, par", "ru": "с помощью, через", "tr": "ile"} },
  { id: "li", ar: "لِـ", joined: true, g: {"de": "für, gehört", "en": "for, belongs to", "fr": "pour, à", "ru": "для, принадлежит", "tr": "için, -e ait"} },
  { id: "ka", ar: "كَـ", joined: true, g: {"de": "wie", "en": "like", "fr": "comme", "ru": "как", "tr": "gibi"} },
];

export const NOUNS = {
  bayt: "بَيْتُ",
  masjid: "مَسْجِدُ",
  madrasa: "مَدْرَسَةُ",
  tawila: "طَاوِلَةُ",
  dars: "دَرْسُ",
  qalam: "قَلَمُ",
  talib: "طَالِبُ",
  qamar: "قَمَرُ",
  suq: "سُوقُ",
  kursi: "كُرْسِيُّ",
};

export const PHRASES = [
  { p: "fi", n: "bayt", g: {"de": "im Haus", "en": "in the house", "fr": "dans la maison", "ru": "в доме", "tr": "evde"} },
  { p: "fi", n: "madrasa", g: {"de": "in der Schule", "en": "in the school", "fr": "à l'école", "ru": "в школе", "tr": "okulda"} },
  { p: "min", n: "masjid", g: {"de": "aus der Moschee", "en": "from the mosque", "fr": "de la mosquée", "ru": "из мечети", "tr": "mescitten"} },
  { p: "min", n: "suq", g: {"de": "vom Markt", "en": "from the market", "fr": "du marché", "ru": "с рынка", "tr": "çarşıdan"} },
  { p: "ila", n: "madrasa", g: {"de": "zur Schule", "en": "to the school", "fr": "à l'école", "ru": "в школу", "tr": "okula"} },
  { p: "ila", n: "masjid", g: {"de": "zur Moschee", "en": "to the mosque", "fr": "à la mosquée", "ru": "в мечеть", "tr": "mescide"} },
  { p: "ala", n: "tawila", g: {"de": "auf dem Tisch", "en": "on the table", "fr": "sur la table", "ru": "на столе", "tr": "masanın üstünde"} },
  { p: "ala", n: "kursi", g: {"de": "auf dem Stuhl", "en": "on the chair", "fr": "sur la chaise", "ru": "на стуле", "tr": "sandalyenin üstünde"} },
  { p: "an", n: "dars", g: {"de": "über die Lektion", "en": "about the lesson", "fr": "au sujet de la leçon", "ru": "об уроке", "tr": "ders hakkında"} },
  { p: "an", n: "bayt", g: {"de": "vom Haus weg", "en": "away from the house", "fr": "loin de la maison", "ru": "от дома", "tr": "evden uzak"} },
  { p: "bi", n: "qalam", g: {"de": "mit dem Stift", "en": "with the pen", "fr": "avec le stylo", "ru": "ручкой", "tr": "kalemle"} },
  { p: "li", n: "talib", g: {"de": "für den Schüler", "en": "for the student", "fr": "pour l'élève", "ru": "для ученика", "tr": "öğrenci için"} },
  { p: "li", n: "bayt", g: {"de": "gehört zum Haus", "en": "belongs to the house", "fr": "à la maison (appartient)", "ru": "принадлежит дому", "tr": "eve ait"} },
  { p: "ka", n: "qamar", g: {"de": "wie der Mond", "en": "like the moon", "fr": "comme la lune", "ru": "как луна", "tr": "ay gibi"} },
];

export const QURAN = [{"ref": "1:1", "hl": [0], "tr": {"de": "Im Namen Allahs …", "en": "In the name of Allah …", "fr": "Au nom d'Allah …", "ru": "Во имя Аллаха …", "tr": "Allah'ın adıyla …"}, "tag": "بِـ", "text": "بِسۡمِ ٱللَّهِ", "start": true, "end": false}, {"ref": "1:2", "hl": [1], "tr": {"de": "Das Lob ist für Allah …", "en": "Praise is for Allah …", "fr": "La louange est à Allah …", "ru": "Хвала Аллаху …", "tr": "Hamd Allah'adır …"}, "tag": "لِـ", "text": "ٱلۡحَمۡدُ لِلَّهِ", "start": true, "end": false}, {"ref": "2:257", "hl": [1, 3], "tr": {"de": "… Er führt sie aus den Finsternissen hinaus ins Licht …", "en": "… He brings them out of the darkness into the light …", "fr": "… Il les fait sortir des ténèbres vers la lumière …", "ru": "… Он выводит их из мраков к свету …", "tr": "… onları karanlıklardan aydınlığa çıkarır …"}, "tag": "مِنْ · إِلَى", "text": "يُخۡرِجُهُم مِّنَ ٱلظُّلُمَٰتِ إِلَى ٱلنُّورِۖ", "start": false, "end": false}, {"ref": "78:2", "hl": [0], "tr": {"de": "Über die gewaltige Nachricht.", "en": "About the great news.", "fr": "Sur la grande nouvelle.", "ru": "О великой вести.", "tr": "O büyük haberden."}, "tag": "عَنْ", "text": "عَنِ ٱلنَّبَإِ ٱلۡعَظِيمِ", "start": true, "end": true}, {"ref": "95:4", "hl": [0], "tr": {"de": "… in schönster Gestalt.", "en": "… in the finest form.", "fr": "… dans la plus belle forme.", "ru": "… в прекраснейшем облике.", "tr": "… en güzel biçimde."}, "tag": "فِي", "text": "فِيٓ أَحۡسَنِ تَقۡوِيمࣲ", "start": false, "end": true}, {"ref": "2:5", "hl": [1, 3], "tr": {"de": "Diese folgen einer Rechtleitung von ihrem Herrn …", "en": "Those are upon guidance from their Lord …", "fr": "Ceux-là sont sur la bonne voie de leur Seigneur …", "ru": "Они следуют верному руководству от их Господа …", "tr": "İşte onlar Rablerinden bir hidayet üzeredir …"}, "tag": "عَلَى · مِنْ", "text": "أُوْلَٰٓئِكَ عَلَىٰ هُدࣰى مِّن رَّبِّهِمۡۖ", "start": true, "end": false}];
