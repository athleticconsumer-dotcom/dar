// =====================================================================
//  REGISTRY – die Liste aller Rubriken ("Räume") der App.
//  Neue Rubrik hinzufügen:
//    1. Ordner modules/<id>/ anlegen (Vorlage: modules/_vorlage/)
//    2. Hier einen Eintrag ergänzen, status: "live" und load: () => import(...)
//  Die Reihenfolge hier ist die Standard-Lernreihenfolge für den Leitfaden.
//  title/desc gibt es pro Sprache (de, en, fr, ru, tr); angezeigt wird mit L() aus i18n.js.
// =====================================================================

// Lernwege (Hauptkategorien). Jedes Level gehört über "approach" zu genau einem Lernweg.
export const APPROACHES = [
  {
    id: "vokabel", ar: "مَنْهَجُ المُفْرَدَات",
    title: { de: "Wortschatz-Weg", en: "Vocabulary approach", fr: "Voie du vocabulaire", ru: "Путь словарного запаса", tr: "Kelime yolu" },
    desc: { de: "Viele Wörter, schnell im Einsatz: Zahlen, Uhrzeit, Alltag. Hier baust du dir einen großen Wortschatz auf.", en: "Lots of words, quickly put to use: numbers, time, everyday life. This is where you build a big vocabulary.", fr: "Beaucoup de mots, vite utilisés : nombres, heure, vie quotidienne. Ici, tu te construis un grand vocabulaire.", ru: "Много слов, которые сразу пригодятся: числа, время, повседневная жизнь. Здесь ты набираешь большой словарный запас.", tr: "Çok kelime, hemen kullanım: sayılar, saat, günlük hayat. Burada geniş bir kelime hazinesi kurarsın." },
  },
  {
    id: "grammatik", ar: "مَنْهَجُ القَوَاعِد",
    title: { de: "Grammatik-Weg", en: "Grammar approach", fr: "Voie de la grammaire", ru: "Путь грамматики", tr: "Dilbilgisi yolu" },
    desc: { de: "Von Anfang an verstehen, wie die Sprache gebaut ist: Wortarten, Artikel, Geschlecht, Sätze. Schritt für Schritt nach den klassischen Grundlagen.", en: "Understand from the start how the language is built: parts of speech, the article, gender, sentences. Step by step, following the classical foundations.", fr: "Comprendre dès le début comment la langue est construite : catégories de mots, article, genre, phrases. Pas à pas, selon les bases classiques.", ru: "С самого начала понять, как устроен язык: части речи, артикль, род, предложения. Шаг за шагом по классическим основам.", tr: "En baştan dilin nasıl kurulduğunu anlamak: kelime türleri, harf-i tarif, cinsiyet, cümleler. Klasik temellere göre adım adım." },
  },
];

// Hauptkategorien. Jede Rubrik gehört über "level" zu genau einem Level.
// Neues Level: hier eintragen (mit approach), dann bei den Rubriken level: … setzen.
export const LEVELS = [
  {
    id: 1, approach: "vokabel", title: { de: "Level 1", en: "Level 1", fr: "Niveau 1", ru: "Уровень 1", tr: "Seviye 1" }, ar: "المُسْتَوَى الأَوَّل",
    desc: { de: "Die Grundlagen: Schrift und Laute, Zahlen, Uhrzeit, erste Sätze und der Alltag in der Familie.", en: "The basics: script and sounds, numbers, telling the time, first sentences and family life.", fr: "Les bases : écriture et sons, nombres, l'heure, premières phrases et la vie en famille.", ru: "Основы: письмо и звуки, числа, время, первые фразы и жизнь в семье.", tr: "Temeller: yazı ve sesler, sayılar, saat, ilk cümleler ve aile hayatı." },
  },
  {
    id: "g1", approach: "grammatik", title: { de: "Level 1", en: "Level 1", fr: "Niveau 1", ru: "Уровень 1", tr: "Seviye 1" }, ar: "المُسْتَوَى الأَوَّل",
    desc: { de: "Die Bausteine: Ism, Fiʿl und Ḥarf, bestimmt und unbestimmt, männlich und weiblich, bis zum ersten eigenen Satz.", en: "The building blocks: ism, fiʿl and ḥarf, definite and indefinite, masculine and feminine, up to your first own sentence.", fr: "Les briques : ism, fiʿl et ḥarf, défini et indéfini, masculin et féminin, jusqu'à ta première phrase.", ru: "Основы: исм, фиʿль и харф, определённость и неопределённость, мужской и женский род, вплоть до первого собственного предложения.", tr: "Yapı taşları: isim, fiil ve harf, belirli ve belirsiz, eril ve dişil, ilk kendi cümlene kadar." },
  },
];

export const RUBRIKEN = [
  {
    id: "alphabet", status: "soon",
    title: { de: "Alphabet & Laute", en: "Alphabet & sounds", fr: "Alphabet & sons", ru: "Алфавит и звуки", tr: "Alfabe ve sesler" }, ar: "الحُرُوف",
    desc: { de: "Die 28 Buchstaben, ihre Formen am Wortanfang, in der Mitte und am Ende.", en: "The 28 letters and their forms at the beginning, middle and end of a word.", fr: "Les 28 lettres et leurs formes en début, milieu et fin de mot.", ru: "28 букв и их формы в начале, середине и конце слова.", tr: "28 harf ve kelimenin başında, ortasında ve sonundaki şekilleri." },
    needs: [], level: 1,
    color: { light: "#82384E", dark: "#E7A1B4" },
  },
  {
    id: "harakat", status: "soon",
    title: { de: "Vokale & Lesen", en: "Vowels & reading", fr: "Voyelles & lecture", ru: "Огласовки и чтение", tr: "Harekeler ve okuma" }, ar: "الحَرَكَات",
    desc: { de: "Fatḥa, Kasra, Ḍamma, Sukūn, Shadda: vom Buchstaben zum Wort.", en: "Fatḥa, kasra, ḍamma, sukūn, shadda: from letter to word.", fr: "Fatḥa, kasra, ḍamma, sukūn, shadda : de la lettre au mot.", ru: "Фатха, кясра, дамма, сукун, шадда: от буквы к слову.", tr: "Üstün, esre, ötre, cezm, şedde: harften kelimeye." },
    needs: ["alphabet"], level: 1,
    color: { light: "#2C6A6F", dark: "#8FCFD3" },
  },
  {
    id: "zahlen", status: "live",
    title: { de: "Zahlen", en: "Numbers", fr: "Nombres", ru: "Числа", tr: "Sayılar" }, ar: "الأَرْقَام",
    desc: { de: "0 bis 9999 lesen, hören und schreiben, mit arabisch-indischen Ziffern.", en: "Read, hear and write 0 to 9999, with Arabic-Indic digits.", fr: "Lire, écouter et écrire de 0 à 9999, avec les chiffres arabo-indiens.", ru: "Читать, слушать и писать числа от 0 до 9999, с арабо-индийскими цифрами.", tr: "0'dan 9999'a kadar okumak, dinlemek ve yazmak, Arap-Hint rakamlarıyla." },
    needs: [], level: 1,
    color: { light: "#A8742B", dark: "#E8C58D" },
    minutes: 300,   // geschätzte Übungszeit 0 → 100 % (für den Lernplan)
    load: () => import("../modules/zahlen/index.js"),
  },
  {
    id: "uhrzeit", status: "live",
    title: { de: "Uhrzeit", en: "Telling the time", fr: "L'heure", ru: "Время", tr: "Saat" }, ar: "السَّاعَة",
    desc: { de: "Die Uhr lesen: Viertel, Drittel, halb und „minus“, wie im Hocharabischen üblich.", en: "Reading the clock: quarter, third, half and “minus”, as is usual in Standard Arabic.", fr: "Lire l'heure : quart, tiers, demie et « moins », comme en arabe littéraire.", ru: "Читать часы: четверть, треть, половина и «без», как принято в литературном арабском.", tr: "Saati okumak: çeyrek, üçte bir, buçuk ve “kala”, Fushâ'da olduğu gibi." },
    needs: ["zahlen"], level: 1,
    color: { light: "#4B2D63", dark: "#C8A9E6" },
    minutes: 240,
    load: () => import("../modules/uhrzeit/index.js"),
  },
  {
    id: "begruessung", status: "soon",
    title: { de: "Begrüßungen", en: "Greetings", fr: "Salutations", ru: "Приветствия", tr: "Selamlaşma" }, ar: "التَّحِيَّات",
    desc: { de: "Salām, Vorstellung, Höflichkeitsformen und Antworten darauf.", en: "Salām, introducing yourself, polite phrases and how to reply.", fr: "Salām, se présenter, formules de politesse et réponses.", ru: "Салам, знакомство, вежливые фразы и ответы на них.", tr: "Selam, kendini tanıtmak, nezaket ifadeleri ve cevapları." },
    needs: [], level: 1,
    color: { light: "#2F6B4F", dark: "#94D3AE" },
  },
  {
    id: "wochentage", status: "soon",
    title: { de: "Tage & Monate", en: "Days & months", fr: "Jours & mois", ru: "Дни и месяцы", tr: "Günler ve aylar" }, ar: "الأَيَّام وَالشُّهُور",
    desc: { de: "Wochentage, Monate (hidschri und gregorianisch) und Datumsangaben.", en: "Days of the week, months (Hijri and Gregorian) and dates.", fr: "Jours de la semaine, mois (hégiriens et grégoriens) et dates.", ru: "Дни недели, месяцы (по хиджре и григорианские) и даты.", tr: "Haftanın günleri, aylar (hicrî ve miladî) ve tarihler." },
    needs: ["zahlen"], level: 1,
    color: { light: "#8A4B2A", dark: "#E6AE88" },
  },
  {
    id: "familie", status: "soon",
    title: { de: "Familie", en: "Family", fr: "Famille", ru: "Семья", tr: "Aile" }, ar: "العَائِلَة",
    desc: { de: "Verwandtschaft, Possessiv-Endungen (ـي، ـكَ، ـهُ) und kleine Sätze.", en: "Relatives, possessive endings (ـي، ـكَ، ـهُ) and short sentences.", fr: "La parenté, les suffixes possessifs (ـي، ـكَ، ـهُ) et de petites phrases.", ru: "Родственники, притяжательные окончания (ـي، ـكَ، ـهُ) и короткие фразы.", tr: "Akrabalar, iyelik ekleri (ـي، ـكَ، ـهُ) ve kısa cümleler." },
    needs: [], level: 1,
    color: { light: "#5E5A2A", dark: "#D3CC8A" },
  },

  // ---------------- GRAMMATIK-WEG · Level 1 ----------------
  {
    id: "wortarten", status: "live",
    title: { de: "Ism, Fiʿl, Ḥarf", en: "Ism, fiʿl, ḥarf", fr: "Ism, fiʿl, ḥarf", ru: "Исм, фиʿль, харф", tr: "İsim, fiil, harf" }, ar: "أَقْسَامُ الكَلِمَة",
    desc: { de: "Jedes arabische Wort ist Nomen, Verb oder Partikel. Woran du sie erkennst.", en: "Every Arabic word is a noun, a verb or a particle. How to tell them apart.", fr: "Chaque mot arabe est un nom, un verbe ou une particule. Comment les reconnaître.", ru: "Каждое арабское слово является именем, глаголом или частицей. Как их различать.", tr: "Her Arapça kelime isim, fiil ya da harftir. Onları nasıl tanırsın." },
    needs: [], level: "g1",
    color: { light: "#1F5C7A", dark: "#8EC6E3" },
    minutes: 60,
    load: () => import("../modules/wortarten/index.js"),
  },
  {
    id: "tarif", status: "soon",
    title: { de: "Bestimmt & unbestimmt", en: "Definite & indefinite", fr: "Défini & indéfini", ru: "Определённость", tr: "Belirli ve belirsiz" }, ar: "المَعْرِفَة وَالنَّكِرَة",
    desc: { de: "Der Artikel ال und das Tanwīn: ein Buch oder das Buch.", en: "The article ال and tanwīn: a book or the book.", fr: "L'article ال et le tanwīn : un livre ou le livre.", ru: "Артикль ال и танвин: какая-то книга или эта книга.", tr: "Harf-i tarif ال ve tenvin: bir kitap ya da o kitap." },
    needs: ["wortarten"], level: "g1",
    color: { light: "#6B4E1F", dark: "#DDBB86" },
  },
  {
    id: "shamsiya", status: "soon",
    title: { de: "Sonnen- & Mondbuchstaben", en: "Sun & moon letters", fr: "Lettres solaires & lunaires", ru: "Солнечные и лунные буквы", tr: "Şemsî ve kamerî harfler" }, ar: "الحُرُوف الشَّمْسِيَّة وَالقَمَرِيَّة",
    desc: { de: "Wann das ل von ال gesprochen wird und wann nicht.", en: "When the ل of ال is pronounced and when it is not.", fr: "Quand le ل de ال se prononce et quand il ne se prononce pas.", ru: "Когда ل в ال произносится, а когда нет.", tr: "ال'deki ل ne zaman okunur, ne zaman okunmaz." },
    needs: ["tarif"], level: "g1",
    color: { light: "#9A5B13", dark: "#F0C27E" },
  },
  {
    id: "genus", status: "soon",
    title: { de: "Männlich & weiblich", en: "Masculine & feminine", fr: "Masculin & féminin", ru: "Мужской и женский род", tr: "Eril ve dişil" }, ar: "المُذَكَّر وَالمُؤَنَّث",
    desc: { de: "Das Tā' marbūṭa ة und andere Zeichen für das Weibliche.", en: "Tāʾ marbūṭa ة and other signs of the feminine.", fr: "Le tāʾ marbūṭa ة et les autres marques du féminin.", ru: "Та марбута ة и другие признаки женского рода.", tr: "Te-i merbûta ة ve dişilliğin diğer işaretleri." },
    needs: ["wortarten"], level: "g1",
    color: { light: "#8B3A5A", dark: "#EBA3BF" },
  },
  {
    id: "damair", status: "soon",
    title: { de: "Personalpronomen", en: "Personal pronouns", fr: "Pronoms personnels", ru: "Личные местоимения", tr: "Şahıs zamirleri" }, ar: "الضَّمَائِر",
    desc: { de: "أَنَا، أَنْتَ، هُوَ … ich, du, er und alle anderen.", en: "أَنَا، أَنْتَ، هُوَ … I, you, he and all the others.", fr: "أَنَا، أَنْتَ، هُوَ … je, tu, il et tous les autres.", ru: "أَنَا، أَنْتَ، هُوَ … я, ты, он и все остальные.", tr: "أَنَا، أَنْتَ، هُوَ … ben, sen, o ve diğerleri." },
    needs: ["genus"], level: "g1",
    color: { light: "#3E5E2B", dark: "#A9D08E" },
  },
  {
    id: "ishara", status: "soon",
    title: { de: "Hinweiswörter", en: "Demonstratives", fr: "Démonstratifs", ru: "Указательные местоимения", tr: "İşaret isimleri" }, ar: "أَسْمَاء الإِشَارَة",
    desc: { de: "هٰذَا، هٰذِهِ، ذٰلِكَ: dies hier und das dort.", en: "هٰذَا، هٰذِهِ، ذٰلِكَ: this here and that there.", fr: "هٰذَا، هٰذِهِ، ذٰلِكَ : ceci et cela.", ru: "هٰذَا، هٰذِهِ، ذٰلِكَ: это и то.", tr: "هٰذَا، هٰذِهِ، ذٰلِكَ: bu ve şu." },
    needs: ["genus"], level: "g1",
    color: { light: "#2C5F5A", dark: "#8FD1C9" },
  },
  {
    id: "ismiyya", status: "soon",
    title: { de: "Der Nominalsatz", en: "The nominal sentence", fr: "La phrase nominale", ru: "Именное предложение", tr: "İsim cümlesi" }, ar: "الجُمْلَة الاسْمِيَّة",
    desc: { de: "Mubtada' und Khabar: Sätze ohne „ist“, wie اللّٰهُ أَكْبَرُ.", en: "Mubtadaʾ and khabar: sentences without “is”, like اللّٰهُ أَكْبَرُ.", fr: "Mubtadaʾ et khabar : des phrases sans « est », comme اللّٰهُ أَكْبَرُ.", ru: "Мубтада и хабар: предложения без «есть», как اللّٰهُ أَكْبَرُ.", tr: "Mübteda ve haber: “-dır” olmadan cümleler, اللّٰهُ أَكْبَرُ gibi." },
    needs: ["tarif", "damair"], level: "g1",
    color: { light: "#5A3A7A", dark: "#C7A8EA" },
  },
  {
    id: "jarr", status: "soon",
    title: { de: "Präpositionen", en: "Prepositions", fr: "Prépositions", ru: "Предлоги", tr: "Harf-i cerler" }, ar: "حُرُوف الجَرّ",
    desc: { de: "فِي، مِنْ، إِلَى، عَلَى und warum danach ein Kasra steht.", en: "فِي، مِنْ، إِلَى، عَلَى and why a kasra follows them.", fr: "فِي، مِنْ، إِلَى، عَلَى et pourquoi une kasra les suit.", ru: "فِي، مِنْ، إِلَى، عَلَى и почему после них стоит кясра.", tr: "فِي، مِنْ، إِلَى، عَلَى ve neden ardından esre gelir." },
    needs: ["ismiyya"], level: "g1",
    color: { light: "#7A2E2E", dark: "#EBA0A0" },
  },
  {
    id: "idafa", status: "soon",
    title: { de: "Die Iḍāfa", en: "The iḍāfa", fr: "L'iḍāfa", ru: "Идафа", tr: "İzafet" }, ar: "الإِضَافَة",
    desc: { de: "Zwei Nomen verbinden: بَيْتُ اللّٰهِ, das Haus Allahs.", en: "Joining two nouns: بَيْتُ اللّٰهِ, the House of Allah.", fr: "Relier deux noms : بَيْتُ اللّٰهِ, la Maison d'Allah.", ru: "Соединение двух имён: بَيْتُ اللّٰهِ, Дом Аллаха.", tr: "İki ismi bağlamak: بَيْتُ اللّٰهِ, Allah'ın evi." },
    needs: ["jarr"], level: "g1",
    color: { light: "#4A4A1E", dark: "#D2D28A" },
  },
];

export const byId = (id) => RUBRIKEN.find((r) => r.id === id);
export const liveRubriken = () => RUBRIKEN.filter((r) => r.status === "live");
export const levelById = (id) => LEVELS.find((l) => String(l.id) === String(id));
export const rubrikenOf = (levelId) => RUBRIKEN.filter((r) => String(r.level) === String(levelId));
export const levelsOf = (approachId) => LEVELS.filter((l) => l.approach === approachId);
