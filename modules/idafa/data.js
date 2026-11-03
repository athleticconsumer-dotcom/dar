// =====================================================================
//  IḌĀFA – zwei Nomen verbinden: 1. Wort ohne ال und ohne Tanwīn, 2. Wort im Genitiv (Kasra)
//  a: 1. Wort (Ḍamma) · b: 2. Wort (Kasra, ohne ال) · al: 1 = 2. Wort bekommt ال, 0 = Name (Allah), -1 = unbestimmt
//  Qur'an-Text der Beispiele aus Tanzil (Uthmani, Hafs), wortgenau ausgeschnitten.
// =====================================================================

export const MASTER_AT = 2;
export const GOAL = 20;

export const ITEMS = [
  { id: "baytullah", a: "بَيْتُ", b: "اللّٰهِ", al: 0, g: {"de": "das Haus Allahs", "en": "the House of Allah", "fr": "la Maison d'Allah", "ru": "Дом Аллаха", "tr": "Allah'ın evi"} },
  { id: "kitab_talib", a: "كِتَابُ", b: "طَالِبِ", al: 1, g: {"de": "das Buch des Schülers", "en": "the student's book", "fr": "le livre de l'élève", "ru": "книга ученика", "tr": "öğrencinin kitabı"} },
  { id: "bab_masjid", a: "بَابُ", b: "مَسْجِدِ", al: 1, g: {"de": "die Tür der Moschee", "en": "the door of the mosque", "fr": "la porte de la mosquée", "ru": "дверь мечети", "tr": "mescidin kapısı"} },
  { id: "ism_walad", a: "اِسْمُ", b: "وَلَدِ", al: 1, g: {"de": "der Name des Jungen", "en": "the boy's name", "fr": "le nom du garçon", "ru": "имя мальчика", "tr": "oğlanın adı"} },
  { id: "sayyara_muallim", a: "سَيَّارَةُ", b: "مُعَلِّمِ", al: 1, g: {"de": "das Auto des Lehrers", "en": "the teacher's car", "fr": "la voiture de l'enseignant", "ru": "машина учителя", "tr": "öğretmenin arabası"} },
  { id: "miftah_bayt", a: "مِفْتَاحُ", b: "بَيْتِ", al: 1, g: {"de": "der Schlüssel des Hauses", "en": "the key of the house", "fr": "la clé de la maison", "ru": "ключ от дома", "tr": "evin anahtarı"} },
  { id: "kalam", a: "كَلَامُ", b: "اللّٰهِ", al: 0, g: {"de": "das Wort Allahs", "en": "the Word of Allah", "fr": "la Parole d'Allah", "ru": "Слово Аллаха", "tr": "Allah'ın kelâmı"} },
  { id: "rasul", a: "رَسُولُ", b: "اللّٰهِ", al: 0, g: {"de": "der Gesandte Allahs", "en": "the Messenger of Allah", "fr": "le Messager d'Allah", "ru": "Посланник Аллаха", "tr": "Allah'ın Resulü"} },
  { id: "yawm_jumua", a: "يَوْمُ", b: "جُمُعَةِ", al: 1, g: {"de": "der Freitag (Tag der Versammlung)", "en": "Friday (day of gathering)", "fr": "le vendredi (jour du rassemblement)", "ru": "пятница (день собрания)", "tr": "cuma günü"} },
  { id: "ghurfa_bint", a: "غُرْفَةُ", b: "بِنْتِ", al: 1, g: {"de": "das Zimmer des Mädchens", "en": "the girl's room", "fr": "la chambre de la fille", "ru": "комната девочки", "tr": "kızın odası"} },
  { id: "salat_fajr", a: "صَلَاةُ", b: "فَجْرِ", al: 1, g: {"de": "das Morgengebet", "en": "the dawn prayer", "fr": "la prière de l'aube", "ru": "утренняя молитва", "tr": "sabah namazı"} },
  { id: "bint_muallim", a: "بِنْتُ", b: "مُعَلِّمِ", al: 1, g: {"de": "die Tochter des Lehrers", "en": "the teacher's daughter", "fr": "la fille de l'enseignant", "ru": "дочь учителя", "tr": "öğretmenin kızı"} },
  { id: "madinat_rasul", a: "مَدِينَةُ", b: "رَسُولِ", al: 1, g: {"de": "die Stadt des Gesandten", "en": "the city of the Messenger", "fr": "la ville du Messager", "ru": "город Посланника", "tr": "Resul'ün şehri"} },
  { id: "bayt_rajul", a: "بَيْتُ", b: "رَجُلٍ", al: -1, g: {"de": "das Haus eines Mannes", "en": "a man's house", "fr": "la maison d'un homme", "ru": "дом какого-то мужчины", "tr": "bir adamın evi"} },
];

export const QURAN = [{"ref": "1:1", "hl": [0, 1], "tr": {"de": "Im Namen Allahs …", "en": "In the name of Allah …", "fr": "Au nom d'Allah …", "ru": "Во имя Аллаха …", "tr": "Allah'ın adıyla …"}, "text": "بِسۡمِ ٱللَّهِ", "start": true, "end": false}, {"ref": "1:2", "hl": [0, 1], "tr": {"de": "… dem Herrn der Welten.", "en": "… the Lord of the worlds.", "fr": "… Seigneur des mondes.", "ru": "… Господу миров.", "tr": "… âlemlerin Rabbi."}, "text": "رَبِّ ٱلۡعَٰلَمِينَ", "start": false, "end": true}, {"ref": "1:4", "hl": [0, 1, 2], "tr": {"de": "Dem Herrscher des Tages des Gerichts.", "en": "Master of the Day of Judgement.", "fr": "Maître du Jour de la Rétribution.", "ru": "Властелину Дня воздаяния.", "tr": "Din gününün sahibi."}, "note": "chain", "text": "مَٰلِكِ يَوۡمِ ٱلدِّينِ", "start": true, "end": true}, {"ref": "48:29", "hl": [1, 2], "tr": {"de": "Muhammad ist der Gesandte Allahs.", "en": "Muhammad is the Messenger of Allah.", "fr": "Muhammad est le Messager d'Allah.", "ru": "Мухаммад Посланник Аллаха.", "tr": "Muhammed Allah'ın Resulüdür."}, "text": "مُّحَمَّدࣱ رَّسُولُ ٱللَّهِۚ", "start": true, "end": false}, {"ref": "7:73", "hl": [1, 2], "tr": {"de": "… Das ist die Kamelstute Allahs …", "en": "… This is the she-camel of Allah …", "fr": "… Voici la chamelle d'Allah …", "ru": "… Это верблюдица Аллаха …", "tr": "… Bu Allah'ın devesidir …"}, "text": "هَٰذِهِۦ نَاقَةُ ٱللَّهِ", "start": false, "end": false}, {"ref": "10:1", "hl": [1, 2], "tr": {"de": "Das sind die Zeichen des weisen Buches.", "en": "Those are the verses of the wise Book.", "fr": "Voici les versets du Livre sage.", "ru": "Это аяты мудрого Писания.", "tr": "Bunlar hikmetli Kitab'ın âyetleridir."}, "text": "تِلۡكَ ءَايَٰتُ ٱلۡكِتَٰبِ ٱلۡحَكِيمِ", "start": false, "end": true}];
