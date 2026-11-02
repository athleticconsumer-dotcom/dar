// =====================================================================
//  WÖRTER DER LEKTION IM QUR'AN – pro Bereich einige Stellen
//  ref + from/to: Wortbereich der Āya (0 = erstes Wort). Der Text selbst steht NICHT hier,
//  sondern kommt geprüft aus quran.json (python3 tools/quran/build_segments.py <quran-api>).
//  gaps: Wortposition innerhalb des Ausschnitts · w: Bedeutung für jedes Wort des Ausschnitts
// =====================================================================

export const SECTIONS = ["people", "animal", "plant", "insect", "object", "fluid"];

export const SURAH = {
  2: ["al-Baqara", "البَقَرَة"], 7: ["al-Aʿrāf", "الأَعْرَاف"], 14: ["Ibrāhīm", "إِبْرَاهِيم"], 16: ["an-Naḥl", "النَّحْل"], 18: ["al-Kahf", "الكَهْف"],
  19: ["Maryam", "مَرْيَم"], 21: ["al-Anbiyāʾ", "الأَنْبِيَاء"], 27: ["an-Naml", "النَّمْل"], 29: ["al-ʿAnkabūt", "العَنْكَبُوت"], 47: ["Muḥammad", "مُحَمَّد"],
  48: ["al-Fatḥ", "الفَتْح"], 55: ["ar-Raḥmān", "الرَّحْمٰن"], 88: ["al-Ghāshiya", "الغَاشِيَة"], 95: ["at-Tīn", "التِّين"], 105: ["al-Fīl", "الفِيل"],
};

export const PASSAGES = [
  // ---- Menschen ----
  { id: "insan", sec: "people", ref: "95:4", from: 0, to: 5, gaps: [2],
    w: { de: ["gewiss","haben Wir erschaffen","den Menschen","in","schönster","Gestalt"], en: ["indeed","We created","the human being","in","the finest","form"], fr: ["certes","Nous avons créé","l'homme","dans","la plus belle","forme"], ru: ["поистине","Мы создали","человека","в","наилучшем","облике"], tr: ["andolsun","yarattık","insanı","-de","en güzel","biçim"] } },
  { id: "adam", sec: "people", ref: "2:31", from: 0, to: 3, gaps: [1, 2],
    w: { de: ["und Er lehrte","Ādam","die Namen","alle"], en: ["and He taught","Ādam","the names","all of them"], fr: ["et Il apprit à","Ādam","les noms","tous"], ru: ["и Он научил","Адама","именам","всем"], tr: ["ve öğretti","Âdem'e","isimleri","hepsini"] } },
  { id: "muhammad", sec: "people", ref: "48:29", from: 0, to: 2, gaps: [0],
    w: { de: ["Muhammad","(ist der) Gesandte","Allahs"], en: ["Muhammad","(is the) Messenger","of Allah"], fr: ["Muhammad","(est le) Messager","d'Allah"], ru: ["Мухаммад","посланник","Аллаха"], tr: ["Muhammed","elçisidir","Allah'ın"] } },
  { id: "maryam", sec: "people", ref: "19:16", from: 0, to: 3, gaps: [3],
    w: { de: ["und erwähne","in","dem Buch","Maryam"], en: ["and mention","in","the Book","Maryam"], fr: ["et mentionne","dans","le Livre","Maryam"], ru: ["и помяни","в","Писании","Марьям"], tr: ["ve an","içinde","Kitap","Meryem'i"] } },
  // ---- Tiere ----
  { id: "fil", sec: "animal", ref: "105:1", from: 0, to: 6, gaps: [6],
    w: { de: ["hast du nicht","gesehen","wie","verfuhr","dein Herr","mit den Leuten","des Elefanten"], en: ["have you not","seen","how","dealt","your Lord","with the companions","of the elephant"], fr: ["n'as-tu pas","vu","comment","agit","ton Seigneur","envers les gens","de l'éléphant"], ru: ["разве ты не","видел","как","поступил","твой Господь","с обладателями","слона"], tr: ["değil mi","gördün","nasıl","yaptı","Rabbin","sahiplerine","filin"] } },
  { id: "kalb1", sec: "animal", ref: "18:18", from: 9, to: 12, gaps: [0],
    w: { de: ["und ihr Hund","streckte aus","seine Vorderbeine","am Eingang"], en: ["and their dog","stretching","its forelegs","at the entrance"], fr: ["et leur chien","étendant","ses pattes","à l'entrée"], ru: ["а их пёс","вытянул","свои лапы","у входа"], tr: ["köpekleri","uzatmış","ön ayaklarını","girişte"] } },
  { id: "kalb2", sec: "animal", ref: "7:176", from: 10, to: 12, gaps: [2],
    w: { de: ["so ist sein Gleichnis","wie das Gleichnis","des Hundes"], en: ["so his example","is like the example","of the dog"], fr: ["son exemple","est comme l'exemple","du chien"], ru: ["его притча","как притча","о собаке"], tr: ["onun durumu","durumu gibidir","köpeğin"] } },
  // ---- Pflanzen ----
  { id: "nakhla", sec: "plant", ref: "19:25", from: 0, to: 7, gaps: [3],
    w: { de: ["und schüttle","zu dir hin","am Stamm","der Dattelpalme","es fallen","auf dich","frische Datteln","reife"], en: ["and shake","towards you","the trunk","of the date palm","it will drop","upon you","fresh dates","ripe"], fr: ["et secoue","vers toi","le tronc","du palmier","il fera tomber","sur toi","des dattes fraîches","mûres"], ru: ["и потряси","к себе","ствол","пальмы","упадут","на тебя","свежие финики","спелые"], tr: ["ve silkele","kendine doğru","gövdesini","hurma ağacının","dökülsün","üzerine","taze hurma","olgun"] } },
  { id: "shajara", sec: "plant", ref: "14:24", from: 3, to: 9, gaps: [5],
    w: { de: ["prägte","Allah","ein Gleichnis","ein Wort","gutes","wie ein Baum","guter"], en: ["struck","Allah","an example","a word","good","like a tree","good"], fr: ["a proposé","Allah","une parabole","une parole","bonne","comme un arbre","bon"], ru: ["привёл","Аллах","притчу","слово","благое","как дерево","благое"], tr: ["verdi","Allah","bir misal","bir söz","güzel","bir ağaç gibi","güzel"] } },
  { id: "warda", sec: "plant", ref: "55:37", from: 0, to: 5, gaps: [4],
    w: { de: ["und wenn","sich spaltet","der Himmel","und wird","rosenrot","wie Salböl"], en: ["and when","is split","the sky","and becomes","rose-red","like oil"], fr: ["et quand","se fendra","le ciel","et deviendra","rouge comme la rose","comme l'huile"], ru: ["и когда","расколется","небо","и станет","алым, как роза","как масло"], tr: ["ve ne zaman","yarılır","gök","ve olur","gül renginde","yağ gibi"] } },
  // ---- Insekten ----
  { id: "nahl", sec: "insect", ref: "16:68", from: 0, to: 3, gaps: [3],
    w: { de: ["und es gab ein","dein Herr","an","die Bienen"], en: ["and inspired","your Lord","to","the bees"], fr: ["et inspira","ton Seigneur","aux","abeilles"], ru: ["и внушил","твой Господь","к","пчёлам"], tr: ["ve vahyetti","Rabbin","-e","arılara"] } },
  { id: "naml", sec: "insect", ref: "27:18", from: 0, to: 7, gaps: [5, 7],
    w: { de: ["bis","als","sie kamen","über","das Tal","der Ameisen","sagte","eine Ameise"], en: ["until","when","they came","upon","the valley","of the ants","said","an ant"], fr: ["jusqu'à ce que","quand","ils arrivèrent","à","la vallée","des fourmis","dit","une fourmi"], ru: ["пока","когда","они пришли","к","долине","муравьёв","сказала","муравьиха"], tr: ["nihayet","-dığında","geldiler","üzerine","vadisine","karıncaların","dedi","bir karınca"] } },
  { id: "ankabut", sec: "insect", ref: "29:41", from: 7, to: 10, gaps: [1],
    w: { de: ["wie das Gleichnis","der Spinne","sie nahm sich","ein Haus"], en: ["like the example","of the spider","it took","a house"], fr: ["comme l'exemple","de l'araignée","qui prit","une maison"], ru: ["подобны","пауку","который сделал","дом"], tr: ["durumu gibidir","örümceğin","edindi","bir ev"] } },
  { id: "jarad", sec: "insect", ref: "7:133", from: 0, to: 6, gaps: [3],
    w: { de: ["da sandten Wir","über sie","die Flut","und die Heuschrecken","und die Läuse","und die Frösche","und das Blut"], en: ["so We sent","upon them","the flood","and the locusts","and the lice","and the frogs","and the blood"], fr: ["alors Nous envoyâmes","sur eux","le déluge","et les sauterelles","et les poux","et les grenouilles","et le sang"], ru: ["и Мы наслали","на них","потоп","и саранчу","и вшей","и лягушек","и кровь"], tr: ["gönderdik","üzerlerine","tufan","ve çekirge","ve haşere","ve kurbağa","ve kan"] } },
  // ---- Gegenstände ----
  { id: "surur", sec: "object", ref: "88:13", from: 0, to: 2, gaps: [1],
    w: { de: ["darin (sind)","Ruhebetten","erhöhte"], en: ["in it (are)","couches","raised"], fr: ["il y aura","des lits","élevés"], ru: ["там","ложа","возвышенные"], tr: ["orada","tahtlar","yükseltilmiş"] } },
  { id: "bab", sec: "object", ref: "2:58", from: 10, to: 12, gaps: [1],
    w: { de: ["und tretet ein durch","das Tor","euch niederwerfend"], en: ["and enter","the gate","bowing down"], fr: ["et entrez par","la porte","en vous prosternant"], ru: ["и войдите в","ворота","поклоняясь"], tr: ["ve girin","kapıdan","secde ederek"] } },
  { id: "kursi", sec: "object", ref: "2:255", from: 40, to: 43, gaps: [1],
    w: { de: ["es umfasst","Sein Kursī","die Himmel","und die Erde"], en: ["encompasses","His Kursī","the heavens","and the earth"], fr: ["englobe","Son Kursī","les cieux","et la terre"], ru: ["объемлет","Его Курси","небеса","и землю"], tr: ["kaplamıştır","Kürsüsü","gökleri","ve yeri"] } },
  // ---- Flüssigkeiten ----
  { id: "maa", sec: "fluid", ref: "21:30", from: 10, to: 15, gaps: [2],
    w: { de: ["und Wir machten","aus","dem Wasser","alles","Ding","Lebendige"], en: ["and We made","from","water","every","thing","living"], fr: ["et Nous avons fait","à partir de","l'eau","toute","chose","vivante"], ru: ["и Мы создали","из","воды","всякую","вещь","живую"], tr: ["ve kıldık","-den","su","her","şey","canlı"] } },
  { id: "laban", sec: "fluid", ref: "47:15", from: 6, to: 16, gaps: [2, 7],
    w: { de: ["Flüsse","aus","Wasser","nicht","verdorbenem","und Flüsse","aus","Milch","nicht","verändert sich","ihr Geschmack"], en: ["rivers","of","water","not","stale","and rivers","of","milk","not","changes","its taste"], fr: ["des fleuves","d'","eau","non","altérée","et des fleuves","de","lait","ne","change pas","son goût"], ru: ["реки","из","воды","не","испорченной","и реки","из","молока","не","изменился","его вкус"], tr: ["ırmaklar","-den","su","olmayan","bozuk","ve ırmaklar","-den","süt","hiç","değişmeyen","tadı"] } },
  { id: "asal", sec: "fluid", ref: "47:15", from: 22, to: 25, gaps: [2],
    w: { de: ["und Flüsse","aus","Honig","geläutertem"], en: ["and rivers","of","honey","purified"], fr: ["et des fleuves","de","miel","purifié"], ru: ["и реки","из","мёда","очищенного"], tr: ["ve ırmaklar","-den","bal","süzülmüş"] } },
];
