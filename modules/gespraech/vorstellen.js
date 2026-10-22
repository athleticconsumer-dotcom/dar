// =====================================================================
//  GESPRÄCH 1: Begrüßen & sich vorstellen
//  Ein Gesprächs-Thema = Daten + die gemeinsame Engine (engine.js).
//  ar/tr als { m, f }: Fassung für ein Gespräch unter Männern / unter Frauen.
//  {A}/{B} in den Übersetzungen = Namen der Sprecher.
// =====================================================================
import { makeConversation } from "./engine.js";

const NAMES = {
  m: { A: { ar: "أَحْمَدُ", tr: "Aḥmad" }, B: { ar: "يُوسُفُ", tr: "Yūsuf" } },
  f: { A: { ar: "فَاطِمَةُ", tr: "Fāṭima" }, B: { ar: "مَرْيَمُ", tr: "Maryam" } },
};

const DIALOG = [
  { who: "A", ar: "السَّلَامُ عَلَيْكُمْ", tr: "as-salāmu ʿalaykum",
    g: { de: "Friede sei mit euch.", en: "Peace be upon you.", fr: "Que la paix soit sur vous.", ru: "Мир вам.", tr: "Selâm üzerinize olsun." } },
  { who: "B", ar: "وَعَلَيْكُمُ السَّلَامُ وَرَحْمَةُ اللّٰهِ", tr: "wa-ʿalaykumu s-salāmu wa-raḥmatu llāh",
    g: { de: "Und mit euch sei Friede und die Barmherzigkeit Allahs.", en: "And upon you be peace and the mercy of Allah.", fr: "Et sur vous la paix et la miséricorde d'Allah.", ru: "И вам мир и милость Аллаха.", tr: "Selâm ve Allah'ın rahmeti sizin de üzerinize olsun." } },
  { who: "A", ar: { m: "كَيْفَ حَالُكَ؟", f: "كَيْفَ حَالُكِ؟" }, tr: { m: "kayfa ḥāluka?", f: "kayfa ḥāluki?" },
    g: { de: "Wie geht es dir?", en: "How are you?", fr: "Comment vas-tu ?", ru: "Как у тебя дела?", tr: "Nasılsın?" } },
  { who: "B", ar: { m: "بِخَيْرٍ، وَالْحَمْدُ لِلّٰهِ. وَأَنْتَ؟", f: "بِخَيْرٍ، وَالْحَمْدُ لِلّٰهِ. وَأَنْتِ؟" }, tr: { m: "bi-khayrin, wal-ḥamdu lillāh. wa-anta?", f: "bi-khayrin, wal-ḥamdu lillāh. wa-anti?" },
    g: { de: "Gut, Allah sei Dank. Und du?", en: "Well, praise be to Allah. And you?", fr: "Bien, louange à Allah. Et toi ?", ru: "Хорошо, хвала Аллаху. А ты?", tr: "İyiyim, Allah'a hamd olsun. Ya sen?" } },
  { who: "A", ar: { m: "الْحَمْدُ لِلّٰهِ. مَا اسْمُكَ؟", f: "الْحَمْدُ لِلّٰهِ. مَا اسْمُكِ؟" }, tr: { m: "al-ḥamdu lillāh. masmuka?", f: "al-ḥamdu lillāh. masmuki?" },
    g: { de: "Allah sei Dank. Wie heißt du?", en: "Praise be to Allah. What is your name?", fr: "Louange à Allah. Comment t'appelles-tu ?", ru: "Хвала Аллаху. Как тебя зовут?", tr: "Allah'a hamd olsun. Adın ne?" } },
  { who: "B", ar: { m: "اسْمِي يُوسُفُ. وَمَا اسْمُكَ أَنْتَ؟", f: "اسْمِي مَرْيَمُ. وَمَا اسْمُكِ أَنْتِ؟" }, tr: { m: "ismī Yūsuf. wa-masmuka anta?", f: "ismī Maryam. wa-masmuki anti?" },
    g: { de: "Ich heiße {B}. Und wie heißt du?", en: "My name is {B}. And what is your name?", fr: "Je m'appelle {B}. Et toi, comment t'appelles-tu ?", ru: "Меня зовут {B}. А тебя как зовут?", tr: "Benim adım {B}. Ya senin adın ne?" } },
  { who: "A", ar: { m: "اسْمِي أَحْمَدُ. مِنْ أَيْنَ أَنْتَ؟", f: "اسْمِي فَاطِمَةُ. مِنْ أَيْنَ أَنْتِ؟" }, tr: { m: "ismī Aḥmad. min ayna anta?", f: "ismī Fāṭima. min ayna anti?" },
    g: { de: "Ich heiße {A}. Woher kommst du?", en: "My name is {A}. Where are you from?", fr: "Je m'appelle {A}. D'où viens-tu ?", ru: "Меня зовут {A}. Откуда ты?", tr: "Benim adım {A}. Nerelisin?" } },
  { who: "B", ar: { m: "أَنَا مِنْ أَلْمَانِيَا. وَأَنْتَ؟", f: "أَنَا مِنْ أَلْمَانِيَا. وَأَنْتِ؟" }, tr: { m: "anā min Almāniyā. wa-anta?", f: "anā min Almāniyā. wa-anti?" },
    g: { de: "Ich komme aus Deutschland. Und du?", en: "I am from Germany. And you?", fr: "Je viens d'Allemagne. Et toi ?", ru: "Я из Германии. А ты?", tr: "Ben Almanya'danım. Ya sen?" } },
  { who: "A", ar: "أَنَا مِنْ مِصْرَ. تَشَرَّفْنَا!", tr: "anā min Miṣr. tasharrafnā!",
    g: { de: "Ich komme aus Ägypten. Freut mich!", en: "I am from Egypt. Nice to meet you!", fr: "Je viens d'Égypte. Enchanté !", ru: "Я из Египта. Очень приятно!", tr: "Ben Mısır'lıyım. Memnun oldum!" } },
  { who: "B", ar: "تَشَرَّفْنَا. مَعَ السَّلَامَةِ!", tr: "tasharrafnā. maʿa s-salāma!",
    g: { de: "Freut mich auch. Auf Wiedersehen!", en: "Nice to meet you too. Goodbye!", fr: "Enchanté aussi. Au revoir !", ru: "Мне тоже приятно. До свидания!", tr: "Ben de memnun oldum. Hoşça kal!" } },
  { who: "A", ar: "مَعَ السَّلَامَةِ، فِي أَمَانِ اللّٰهِ.", tr: "maʿa s-salāma, fī amāni llāh.",
    g: { de: "Auf Wiedersehen, in Allahs Schutz.", en: "Goodbye, in Allah's protection.", fr: "Au revoir, sous la protection d'Allah.", ru: "До свидания, под защитой Аллаха.", tr: "Hoşça kal, Allah'a emanet ol." } },
];

const PHRASES = [
  { id: "salam", ar: "السَّلَامُ عَلَيْكُمْ", tr: "as-salāmu ʿalaykum", g: { de: "Friede sei mit euch (Gruß)", en: "Peace be upon you (greeting)", fr: "Que la paix soit sur vous (salut)", ru: "Мир вам (приветствие)", tr: "Selâm üzerinize olsun (selam)" } },
  { id: "wasalam", ar: "وَعَلَيْكُمُ السَّلَامُ", tr: "wa-ʿalaykumu s-salām", g: { de: "Und mit euch sei Friede", en: "And upon you be peace", fr: "Et sur vous la paix", ru: "И вам мир", tr: "Ve aleyküm selâm" } },
  { id: "kayfa", ar: { m: "كَيْفَ حَالُكَ؟", f: "كَيْفَ حَالُكِ؟" }, tr: { m: "kayfa ḥāluka?", f: "kayfa ḥāluki?" }, g: { de: "Wie geht es dir?", en: "How are you?", fr: "Comment vas-tu ?", ru: "Как дела?", tr: "Nasılsın?" } },
  { id: "bikhayr", ar: "بِخَيْرٍ، الْحَمْدُ لِلّٰهِ", tr: "bi-khayrin, al-ḥamdu lillāh", g: { de: "Gut, Allah sei Dank", en: "Well, praise be to Allah", fr: "Bien, louange à Allah", ru: "Хорошо, хвала Аллаху", tr: "İyiyim, elhamdülillah" } },
  { id: "ismq", ar: { m: "مَا اسْمُكَ؟", f: "مَا اسْمُكِ؟" }, tr: { m: "masmuka?", f: "masmuki?" }, g: { de: "Wie heißt du?", en: "What is your name?", fr: "Comment t'appelles-tu ?", ru: "Как тебя зовут?", tr: "Adın ne?" } },
  { id: "ismi", ar: "اسْمِي …", tr: "ismī …", g: { de: "Ich heiße …", en: "My name is …", fr: "Je m'appelle …", ru: "Меня зовут …", tr: "Benim adım …" } },
  { id: "aynaq", ar: { m: "مِنْ أَيْنَ أَنْتَ؟", f: "مِنْ أَيْنَ أَنْتِ؟" }, tr: { m: "min ayna anta?", f: "min ayna anti?" }, g: { de: "Woher kommst du?", en: "Where are you from?", fr: "D'où viens-tu ?", ru: "Откуда ты?", tr: "Nerelisin?" } },
  { id: "anamin", ar: "أَنَا مِنْ …", tr: "anā min …", g: { de: "Ich komme aus …", en: "I am from …", fr: "Je viens de …", ru: "Я из …", tr: "Ben …'lıyım" } },
  { id: "ahlan", ar: "أَهْلًا وَسَهْلًا", tr: "ahlan wa-sahlan", g: { de: "Herzlich willkommen", en: "Welcome", fr: "Bienvenue", ru: "Добро пожаловать", tr: "Hoş geldin" } },
  { id: "ahlanbik", ar: { m: "أَهْلًا بِكَ", f: "أَهْلًا بِكِ" }, tr: { m: "ahlan bika", f: "ahlan biki" }, g: { de: "Willkommen auch dir (Antwort)", en: "Welcome to you too (reply)", fr: "Bienvenue à toi aussi (réponse)", ru: "И тебе добро пожаловать (ответ)", tr: "Hoş bulduk (cevap)" } },
  { id: "tasharrafna", ar: "تَشَرَّفْنَا", tr: "tasharrafnā", g: { de: "Freut mich", en: "Nice to meet you", fr: "Enchanté", ru: "Очень приятно", tr: "Memnun oldum" } },
  { id: "jazak", ar: { m: "جَزَاكَ اللّٰهُ خَيْرًا", f: "جَزَاكِ اللّٰهُ خَيْرًا" }, tr: { m: "jazāka llāhu khayran", f: "jazāki llāhu khayran" }, g: { de: "Möge Allah dich mit Gutem belohnen (Danke)", en: "May Allah reward you with good (thanks)", fr: "Qu'Allah te récompense en bien (merci)", ru: "Да вознаградит тебя Аллах благом (спасибо)", tr: "Allah hayrını versin (teşekkür)" } },
  { id: "waiyyak", ar: { m: "وَإِيَّاكَ", f: "وَإِيَّاكِ" }, tr: { m: "wa-iyyāka", f: "wa-iyyāki" }, g: { de: "Und dich ebenso", en: "And you too", fr: "Et toi aussi", ru: "И тебя тоже", tr: "Seni de" } },
  { id: "shukran", ar: "شُكْرًا", tr: "shukran", g: { de: "Danke", en: "Thank you", fr: "Merci", ru: "Спасибо", tr: "Teşekkürler" } },
  { id: "afwan", ar: "عَفْوًا", tr: "ʿafwan", g: { de: "Gern geschehen", en: "You're welcome", fr: "De rien", ru: "Не за что", tr: "Rica ederim" } },
  { id: "maa", ar: "مَعَ السَّلَامَةِ", tr: "maʿa s-salāma", g: { de: "Auf Wiedersehen", en: "Goodbye", fr: "Au revoir", ru: "До свидания", tr: "Hoşça kal" } },
  { id: "amani", ar: "فِي أَمَانِ اللّٰهِ", tr: "fī amāni llāh", g: { de: "In Allahs Schutz (Abschied)", en: "In Allah's protection (farewell)", fr: "Sous la protection d'Allah (adieu)", ru: "Под защитой Аллаха (прощание)", tr: "Allah'a emanet ol (veda)" } },
  { id: "ataallam", ar: "أَتَعَلَّمُ اللُّغَةَ الْعَرَبِيَّةَ", tr: "ataʿallamu l-lughata l-ʿarabiyya", g: { de: "Ich lerne Arabisch", en: "I am learning Arabic", fr: "J'apprends l'arabe", ru: "Я учу арабский язык", tr: "Arapça öğreniyorum" } },
  { id: "qalilan", ar: "أَتَكَلَّمُ قَلِيلًا", tr: "atakallamu qalīlan", g: { de: "Ich spreche ein wenig", en: "I speak a little", fr: "Je parle un peu", ru: "Я говорю немного", tr: "Biraz konuşuyorum" } },
];

// Wer sagt was → was antwortet man (für „Was antwortest du?“)
const PAIRS = [["salam", "wasalam"], ["kayfa", "bikhayr"], ["ismq", "ismi"], ["aynaq", "anamin"], ["ahlan", "ahlanbik"], ["jazak", "waiyyak"], ["shukran", "afwan"], ["maa", "amani"]];

// Länder für „Dein eigener Satz“ (Form nach مِنْ; al: true → مِنَ)
const COUNTRIES = [
  { ar: "أَلْمَانِيَا", tr: "Almāniyā", g: { de: "Deutschland", en: "Germany", fr: "Allemagne", ru: "Германия", tr: "Almanya" } },
  { ar: "سُوِيسْرَا", tr: "Suwīsrā", g: { de: "Schweiz", en: "Switzerland", fr: "Suisse", ru: "Швейцария", tr: "İsviçre" } },
  { ar: "النِّمْسَا", tr: "n-Nimsā", al: true, g: { de: "Österreich", en: "Austria", fr: "Autriche", ru: "Австрия", tr: "Avusturya" } },
  { ar: "فَرَنْسَا", tr: "Faransā", g: { de: "Frankreich", en: "France", fr: "France", ru: "Франция", tr: "Fransa" } },
  { ar: "تُرْكِيَا", tr: "Turkiyā", g: { de: "Türkei", en: "Türkiye", fr: "Turquie", ru: "Турция", tr: "Türkiye" } },
  { ar: "رُوسِيَا", tr: "Rūsiyā", g: { de: "Russland", en: "Russia", fr: "Russie", ru: "Россия", tr: "Rusya" } },
  { ar: "بِرِيطَانِيَا", tr: "Barīṭāniyā", g: { de: "Großbritannien", en: "Britain", fr: "Grande-Bretagne", ru: "Великобритания", tr: "Britanya" } },
  { ar: "أَمْرِيكَا", tr: "Amrīkā", g: { de: "Amerika", en: "America", fr: "Amérique", ru: "Америка", tr: "Amerika" } },
  { ar: "مِصْرَ", tr: "Miṣr", g: { de: "Ägypten", en: "Egypt", fr: "Égypte", ru: "Египет", tr: "Mısır" } },
  { ar: "الْمَغْرِبِ", tr: "l-Maghrib", al: true, g: { de: "Marokko", en: "Morocco", fr: "Maroc", ru: "Марокко", tr: "Fas" } },
  { ar: "سُورِيَا", tr: "Sūriyā", g: { de: "Syrien", en: "Syria", fr: "Syrie", ru: "Сирия", tr: "Suriye" } },
  { ar: "نَيْجِيرِيَا", tr: "Nayjīriyā", g: { de: "Nigeria", en: "Nigeria", fr: "Nigeria", ru: "Нигерия", tr: "Nijerya" } },
];

export default makeConversation({ id: "vorstellen", NAMES, DIALOG, PHRASES, PAIRS, COUNTRIES });
