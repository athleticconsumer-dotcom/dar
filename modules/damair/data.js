// =====================================================================
//  PERSONALPRONOMEN – getrennt (هُوَ …) und angehängt (كِتَابُهُ …)
//  row/col: Platz in der Tabelle (Spalte 1 = Einzahl, rechts). هُمَا und أَنْتُمَا gelten für beide Geschlechter.
//  Qur'an-Text der Beispiele aus Tanzil (Uthmani, Hafs), wortgenau ausgeschnitten.
// =====================================================================

export const MASTER_AT = 2;
export const GOAL = 20;

export const PRONOUNS = [
  { id: "huwa", pr: "هُوَ", suf: "ـهُ", book: "كِتَابُهُ", row: 1, col: 1, grp: "3" },
  { id: "huma", pr: "هُمَا", suf: "ـهُمَا", book: "كِتَابُهُمَا", row: 1, col: 2, grp: "3" },
  { id: "hum", pr: "هُمْ", suf: "ـهُمْ", book: "كِتَابُهُمْ", row: 1, col: 3, grp: "3" },
  { id: "hiya", pr: "هِيَ", suf: "ـهَا", book: "كِتَابُهَا", row: 2, col: 1, grp: "3" },
  { id: "hunna", pr: "هُنَّ", suf: "ـهُنَّ", book: "كِتَابُهُنَّ", row: 2, col: 3, grp: "3" },
  { id: "anta", pr: "أَنْتَ", suf: "ـكَ", book: "كِتَابُكَ", row: 3, col: 1, grp: "2" },
  { id: "antuma", pr: "أَنْتُمَا", suf: "ـكُمَا", book: "كِتَابُكُمَا", row: 3, col: 2, grp: "2" },
  { id: "antum", pr: "أَنْتُمْ", suf: "ـكُمْ", book: "كِتَابُكُمْ", row: 3, col: 3, grp: "2" },
  { id: "anti", pr: "أَنْتِ", suf: "ـكِ", book: "كِتَابُكِ", row: 4, col: 1, grp: "2" },
  { id: "antunna", pr: "أَنْتُنَّ", suf: "ـكُنَّ", book: "كِتَابُكُنَّ", row: 4, col: 3, grp: "2" },
  { id: "ana", pr: "أَنَا", suf: "ـي", book: "كِتَابِي", row: 5, col: 1, grp: "1" },
  { id: "nahnu", pr: "نَحْنُ", suf: "ـنَا", book: "كِتَابُنَا", row: 5, col: 3, grp: "1" },
];

/** leicht verwechselbare Pronomen */
export const CONFUSE = [["anta", "anti", "ana"], ["antum", "antuma", "antunna"], ["hum", "huma", "hunna"], ["huwa", "hiya"], ["hunna", "nahnu", "antunna"], ["ana", "nahnu"]];

export const QURAN = [{"ref": "112:1", "hl": [1], "tr": {"de": "Sag: Er ist Allah, Einer.", "en": "Say: He is Allah, One.", "fr": "Dis : Il est Allah, Unique.", "ru": "Скажи: Он Аллах Единый.", "tr": "De ki: O Allah birdir."}, "tag": "هُوَ", "text": "قُلۡ هُوَ ٱللَّهُ أَحَدٌ", "start": true, "end": true}, {"ref": "20:14", "hl": [1], "tr": {"de": "Gewiss, Ich bin Allah …", "en": "Indeed, I am Allah …", "fr": "Certes, c'est Moi Allah …", "ru": "Воистину, Я Аллах …", "tr": "Şüphesiz Ben Allah'ım …"}, "tag": "أَنَا", "text": "إِنَّنِيٓ أَنَا ٱللَّهُ", "start": true, "end": false}, {"ref": "15:9", "hl": [1], "tr": {"de": "Wir, ja Wir haben die Ermahnung herabgesandt …", "en": "Indeed, it is We who sent down the Reminder …", "fr": "C'est Nous qui avons fait descendre le Rappel …", "ru": "Воистину, Мы ниспослали Напоминание …", "tr": "Zikri Biz indirdik …"}, "tag": "نَحْنُ", "text": "إِنَّا نَحۡنُ نَزَّلۡنَا ٱلذِّكۡرَ", "start": true, "end": false}, {"ref": "5:116", "hl": [0], "tr": {"de": "… hast du gesagt …?", "en": "… did you say …?", "fr": "… est-ce toi qui as dit …?", "ru": "… ты ли сказал …?", "tr": "… sen mi dedin …?"}, "tag": "أَنْتَ", "text": "ءَأَنتَ قُلۡتَ", "start": false, "end": false}, {"ref": "2:5", "hl": [1], "tr": {"de": "… und sie sind die Erfolgreichen.", "en": "… and it is they who are the successful.", "fr": "… et ce sont eux qui réussissent.", "ru": "… и они преуспевшие.", "tr": "… ve kurtuluşa erenler onlardır."}, "tag": "هُمْ", "text": "وَأُوْلَٰٓئِكَ هُمُ ٱلۡمُفۡلِحُونَ", "start": false, "end": true}, {"ref": "1:5", "hl": [0, 2], "tr": {"de": "Dir allein dienen wir, und Dich allein bitten wir um Hilfe.", "en": "You alone we worship, and You alone we ask for help.", "fr": "C'est Toi seul que nous adorons, et c'est Toi seul dont nous implorons le secours.", "ru": "Тебе одному мы поклоняемся и Тебя одного просим о помощи.", "tr": "Yalnız Sana ibadet eder, yalnız Senden yardım dileriz."}, "tag": "ـكَ", "text": "إِيَّاكَ نَعۡبُدُ وَإِيَّاكَ نَسۡتَعِينُ", "start": true, "end": true}, {"ref": "2:21", "hl": [1], "tr": {"de": "… dient eurem Herrn …", "en": "… worship your Lord …", "fr": "… adorez votre Seigneur …", "ru": "… поклоняйтесь вашему Господу …", "tr": "… Rabbinize ibadet edin …"}, "tag": "ـكُمْ", "text": "ٱعۡبُدُواْ رَبَّكُمُ", "start": false, "end": false}];
