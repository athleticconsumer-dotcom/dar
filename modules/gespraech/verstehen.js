// =====================================================================
//  GESPRÄCH 2: Wenn du nicht verstehst
//  A = Muttersprachler/in (spricht schnell), B = du als Lernende/r
//  self: true → Form richtet sich nach dem Sprecher (als Mann / als Frau), sonst nach dem Angesprochenen
// =====================================================================
import { makeConversation } from "./engine.js";

const NAMES = {
  m: { A: { ar: "خَالِدٌ", tr: "Khālid" }, B: { ar: "يُوسُفُ", tr: "Yūsuf" } },
  f: { A: { ar: "عَائِشَةُ", tr: "ʿĀʾisha" }, B: { ar: "مَرْيَمُ", tr: "Maryam" } },
};

const INTRO = {
  de: "Muttersprachler sprechen schnell, und das ist normal. Mit diesen Sätzen bleibst du trotzdem im Gespräch: nachfragen, um Wiederholung bitten, ein Wort erklären lassen. Wer nachfragt, lernt am schnellsten.",
  en: "Native speakers talk fast, and that's normal. With these sentences you stay in the conversation anyway: ask again, ask for a repeat, have a word explained. Whoever asks learns fastest.",
  fr: "Les natifs parlent vite, c'est normal. Avec ces phrases, tu restes quand même dans la conversation : redemander, faire répéter, faire expliquer un mot. Celui qui demande apprend le plus vite.",
  ru: "Носители языка говорят быстро, и это нормально. С этими фразами ты всё равно останешься в разговоре: переспросить, попросить повторить, попросить объяснить слово. Кто спрашивает, тот учится быстрее всех.",
  tr: "Ana dili Arapça olanlar hızlı konuşur, bu normaldir. Bu cümlelerle yine de sohbette kalırsın: tekrar sormak, tekrarlatmak, bir kelimeyi açıklatmak. Soran en hızlı öğrenir.",
};

const DIALOG = [
  { who: "A", ar: { m: "السَّلَامُ عَلَيْكُمْ، هَلْ تَتَكَلَّمُ الْعَرَبِيَّةَ؟", f: "السَّلَامُ عَلَيْكُمْ، هَلْ تَتَكَلَّمِينَ الْعَرَبِيَّةَ؟" },
    tr: { m: "as-salāmu ʿalaykum, hal tatakallamu l-ʿarabiyya?", f: "as-salāmu ʿalaykum, hal tatakallamīna l-ʿarabiyya?" },
    g: { de: "Friede sei mit euch, sprichst du Arabisch?", en: "Peace be upon you, do you speak Arabic?", fr: "Que la paix soit sur vous, parles-tu arabe ?", ru: "Мир вам, ты говоришь по-арабски?", tr: "Selâm üzerinize olsun, Arapça konuşuyor musun?" } },
  { who: "B", ar: { m: "وَعَلَيْكُمُ السَّلَامُ. نَعَمْ، قَلِيلًا. أَنَا مُبْتَدِئٌ.", f: "وَعَلَيْكُمُ السَّلَامُ. نَعَمْ، قَلِيلًا. أَنَا مُبْتَدِئَةٌ." },
    tr: { m: "wa-ʿalaykumu s-salām. naʿam, qalīlan. anā mubtadiʾ.", f: "wa-ʿalaykumu s-salām. naʿam, qalīlan. anā mubtadiʾa." },
    g: { de: "Und mit euch sei Friede. Ja, ein wenig. Ich bin Anfänger.", en: "And upon you be peace. Yes, a little. I'm a beginner.", fr: "Et sur vous la paix. Oui, un peu. Je suis débutant.", ru: "И вам мир. Да, немного. Я начинающий.", tr: "Ve aleyküm selâm. Evet, biraz. Ben yeni başlayanım." } },
  { who: "A", ar: { m: "مَا شَاءَ اللّٰهُ! مِنْ أَيْنَ أَنْتَ، وَمُنْذُ مَتَى تَتَعَلَّمُ؟", f: "مَا شَاءَ اللّٰهُ! مِنْ أَيْنَ أَنْتِ، وَمُنْذُ مَتَى تَتَعَلَّمِينَ؟" },
    tr: { m: "mā shāʾa llāh! min ayna anta, wa-mundhu matā tataʿallamu?", f: "mā shāʾa llāh! min ayna anti, wa-mundhu matā tataʿallamīna?" },
    g: { de: "Mā shāʾ Allāh! Woher kommst du, und seit wann lernst du?", en: "Mā shāʾ Allāh! Where are you from, and since when have you been learning?", fr: "Mā shāʾ Allāh ! D'où viens-tu, et depuis quand apprends-tu ?", ru: "Ма ша Аллах! Откуда ты и с каких пор учишь?", tr: "Maşallah! Nerelisin ve ne zamandan beri öğreniyorsun?" } },
  { who: "B", ar: { m: "عَفْوًا، لَمْ أَفْهَمْ. تَكَلَّمْ بِبُطْءٍ مِنْ فَضْلِكَ.", f: "عَفْوًا، لَمْ أَفْهَمْ. تَكَلَّمِي بِبُطْءٍ مِنْ فَضْلِكِ." },
    tr: { m: "ʿafwan, lam afham. takallam bi-buṭʾin min faḍlik.", f: "ʿafwan, lam afham. takallamī bi-buṭʾin min faḍliki." },
    g: { de: "Entschuldigung, ich habe nicht verstanden. Sprich bitte langsam.", en: "Sorry, I didn't understand. Please speak slowly.", fr: "Pardon, je n'ai pas compris. Parle lentement, s'il te plaît.", ru: "Извини, я не понял. Говори, пожалуйста, медленно.", tr: "Affedersin, anlamadım. Lütfen yavaş konuş." } },
  { who: "A", ar: { m: "طَيِّبٌ. مُنْذُ مَتَى تَتَعَلَّمُ الْعَرَبِيَّةَ؟", f: "طَيِّبٌ. مُنْذُ مَتَى تَتَعَلَّمِينَ الْعَرَبِيَّةَ؟" },
    tr: { m: "ṭayyib. mundhu matā tataʿallamu l-ʿarabiyya?", f: "ṭayyib. mundhu matā tataʿallamīna l-ʿarabiyya?" },
    g: { de: "Gut. Seit wann lernst du Arabisch?", en: "All right. Since when have you been learning Arabic?", fr: "D'accord. Depuis quand apprends-tu l'arabe ?", ru: "Хорошо. С каких пор ты учишь арабский?", tr: "Peki. Ne zamandan beri Arapça öğreniyorsun?" } },
  { who: "B", ar: "مَا مَعْنَى «مُنْذُ مَتَى»؟", tr: "mā maʿnā «mundhu matā»?",
    g: { de: "Was bedeutet „mundhu matā“?", en: "What does “mundhu matā” mean?", fr: "Que veut dire « mundhu matā » ?", ru: "Что значит «мунзу мата»?", tr: "“Münzü metâ” ne demek?" } },
  { who: "A", ar: "«مُنْذُ مَتَى» يَعْنِي: كَمْ شَهْرًا؟", tr: "«mundhu matā» yaʿnī: kam shahran?",
    g: { de: "„Mundhu matā“ heißt: Wie viele Monate?", en: "“Mundhu matā” means: how many months?", fr: "« Mundhu matā » veut dire : combien de mois ?", ru: "«Мунзу мата» значит: сколько месяцев?", tr: "“Münzü metâ” şu demek: Kaç aydır?" } },
  { who: "B", ar: "فَهِمْتُ! مُنْذُ شَهْرَيْنِ.", tr: "fahimtu! mundhu shahrayn.",
    g: { de: "Verstanden! Seit zwei Monaten.", en: "Got it! For two months.", fr: "Compris ! Depuis deux mois.", ru: "Понял! Два месяца.", tr: "Anladım! İki aydır." } },
  { who: "A", ar: { m: "مُمْتَازٌ! كَلَامُكَ جَمِيلٌ.", f: "مُمْتَازٌ! كَلَامُكِ جَمِيلٌ." }, tr: { m: "mumtāz! kalāmuka jamīl.", f: "mumtāz! kalāmuki jamīl." },
    g: { de: "Ausgezeichnet! Du sprichst schön.", en: "Excellent! You speak nicely.", fr: "Excellent ! Tu parles bien.", ru: "Отлично! Ты красиво говоришь.", tr: "Mükemmel! Güzel konuşuyorsun." } },
  { who: "B", ar: { m: "شُكْرًا عَلَى صَبْرِكَ.", f: "شُكْرًا عَلَى صَبْرِكِ." }, tr: { m: "shukran ʿalā ṣabrik.", f: "shukran ʿalā ṣabriki." },
    g: { de: "Danke für deine Geduld.", en: "Thank you for your patience.", fr: "Merci pour ta patience.", ru: "Спасибо за твоё терпение.", tr: "Sabrın için teşekkürler." } },
  { who: "A", ar: { m: "لَا بَأْسَ، وَفَّقَكَ اللّٰهُ!", f: "لَا بَأْسَ، وَفَّقَكِ اللّٰهُ!" }, tr: { m: "lā baʾs, waffaqaka llāh!", f: "lā baʾs, waffaqaki llāh!" },
    g: { de: "Kein Problem, möge Allah dir Erfolg schenken!", en: "No problem, may Allah grant you success!", fr: "Pas de problème, qu'Allah t'accorde la réussite !", ru: "Ничего страшного, пусть Аллах дарует тебе успех!", tr: "Sorun değil, Allah muvaffak etsin!" } },
];

const PHRASES = [
  { id: "lamafham", ar: "عَفْوًا، لَمْ أَفْهَمْ", tr: "ʿafwan, lam afham", g: { de: "Entschuldigung, ich habe nicht verstanden", en: "Sorry, I didn't understand", fr: "Pardon, je n'ai pas compris", ru: "Извини, я не понял(а)", tr: "Affedersin, anlamadım" } },
  { id: "aid", ar: { m: "أَعِدْ مِنْ فَضْلِكَ", f: "أَعِيدِي مِنْ فَضْلِكِ" }, tr: { m: "aʿid min faḍlik", f: "aʿīdī min faḍliki" }, g: { de: "Wiederhole bitte", en: "Please repeat", fr: "Répète, s'il te plaît", ru: "Повтори, пожалуйста", tr: "Lütfen tekrar et" } },
  { id: "bibut", ar: { m: "تَكَلَّمْ بِبُطْءٍ مِنْ فَضْلِكَ", f: "تَكَلَّمِي بِبُطْءٍ مِنْ فَضْلِكِ" }, tr: { m: "takallam bi-buṭʾin min faḍlik", f: "takallamī bi-buṭʾin min faḍliki" }, g: { de: "Sprich bitte langsam", en: "Please speak slowly", fr: "Parle lentement, s'il te plaît", ru: "Говори, пожалуйста, медленно", tr: "Lütfen yavaş konuş" } },
  { id: "mamana", ar: "مَا مَعْنَى …؟", tr: "mā maʿnā …?", g: { de: "Was bedeutet …?", en: "What does … mean?", fr: "Que veut dire … ?", ru: "Что значит …?", tr: "… ne demek?" } },
  { id: "kayfaaqul", ar: "كَيْفَ أَقُولُ … بِالْعَرَبِيَّةِ؟", tr: "kayfa aqūlu … bil-ʿarabiyya?", g: { de: "Wie sage ich … auf Arabisch?", en: "How do I say … in Arabic?", fr: "Comment dit-on … en arabe ?", ru: "Как сказать … по-арабски?", tr: "… Arapça nasıl denir?" } },
  { id: "uktub", ar: { m: "اُكْتُبْهَا مِنْ فَضْلِكَ", f: "اُكْتُبِيهَا مِنْ فَضْلِكِ" }, tr: { m: "uktubhā min faḍlik", f: "uktubīhā min faḍliki" }, g: { de: "Schreib es bitte auf", en: "Please write it down", fr: "Écris-le, s'il te plaît", ru: "Напиши, пожалуйста", tr: "Lütfen yaz" } },
  { id: "halarab", ar: { m: "هَلْ تَتَكَلَّمُ الْعَرَبِيَّةَ؟", f: "هَلْ تَتَكَلَّمِينَ الْعَرَبِيَّةَ؟" }, tr: { m: "hal tatakallamu l-ʿarabiyya?", f: "hal tatakallamīna l-ʿarabiyya?" }, g: { de: "Sprichst du Arabisch?", en: "Do you speak Arabic?", fr: "Parles-tu arabe ?", ru: "Ты говоришь по-арабски?", tr: "Arapça konuşuyor musun?" } },
  { id: "qalilan", ar: "نَعَمْ، قَلِيلًا", tr: "naʿam, qalīlan", g: { de: "Ja, ein wenig", en: "Yes, a little", fr: "Oui, un peu", ru: "Да, немного", tr: "Evet, biraz" } },
  { id: "mubtadi", self: true, ar: { m: "أَنَا مُبْتَدِئٌ", f: "أَنَا مُبْتَدِئَةٌ" }, tr: { m: "anā mubtadiʾ", f: "anā mubtadiʾa" }, g: { de: "Ich bin Anfänger/in", en: "I'm a beginner", fr: "Je suis débutant(e)", ru: "Я начинающий / начинающая", tr: "Yeni başlayanım" } },
  { id: "halfahimta", ar: { m: "هَلْ فَهِمْتَ؟", f: "هَلْ فَهِمْتِ؟" }, tr: { m: "hal fahimta?", f: "hal fahimti?" }, g: { de: "Hast du verstanden?", en: "Did you understand?", fr: "As-tu compris ?", ru: "Ты понял(а)?", tr: "Anladın mı?" } },
  { id: "fahimtu", ar: "نَعَمْ، فَهِمْتُ", tr: "naʿam, fahimtu", g: { de: "Ja, ich habe verstanden", en: "Yes, I understood", fr: "Oui, j'ai compris", ru: "Да, я понял(а)", tr: "Evet, anladım" } },
  { id: "laarif", ar: "لَا أَعْرِفُ", tr: "lā aʿrifu", g: { de: "Ich weiß es nicht", en: "I don't know", fr: "Je ne sais pas", ru: "Я не знаю", tr: "Bilmiyorum" } },
  { id: "sabr", ar: { m: "شُكْرًا عَلَى صَبْرِكَ", f: "شُكْرًا عَلَى صَبْرِكِ" }, tr: { m: "shukran ʿalā ṣabrik", f: "shukran ʿalā ṣabriki" }, g: { de: "Danke für deine Geduld", en: "Thank you for your patience", fr: "Merci pour ta patience", ru: "Спасибо за терпение", tr: "Sabrın için teşekkürler" } },
  { id: "labas", ar: "لَا بَأْسَ", tr: "lā baʾs", g: { de: "Kein Problem", en: "No problem", fr: "Pas de problème", ru: "Ничего страшного", tr: "Sorun değil" } },
  { id: "yani", ar: "… يَعْنِي …", tr: "… yaʿnī …", g: { de: "… bedeutet …", en: "… means …", fr: "… veut dire …", ru: "… значит …", tr: "… demek …" } },
];

const PAIRS = [["halarab", "qalilan"], ["halfahimta", "fahimtu"], ["sabr", "labas"], ["mamana", "yani"]];

export default makeConversation({ id: "verstehen", NAMES, DIALOG, PHRASES, PAIRS, INTRO });
