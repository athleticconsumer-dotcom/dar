// =====================================================================
//  ZAHLEN IM QUR'AN – Stellen pro Bereich (Format wie modules/lebewesen/quran.js)
//  Text kommt geprüft aus quran.json: python3 tools/quran/build_segments.py <quran-api> zahlen
// =====================================================================

export const SECTIONS = ["small", "tens", "big"];

export const SURAH = {
  2: ["al-Baqara", "البَقَرَة"], 12: ["Yūsuf", "يُوسُف"], 16: ["an-Naḥl", "النَّحْل"], 18: ["al-Kahf", "الكَهْف"], 29: ["al-ʿAnkabūt", "العَنْكَبُوت"],
  37: ["aṣ-Ṣāffāt", "الصَّافَّات"], 38: ["Ṣād", "ص"], 46: ["al-Aḥqāf", "الأَحْقَاف"], 67: ["al-Mulk", "المُلْك"], 74: ["al-Muddaththir", "المُدَّثِّر"], 112: ["al-Ikhlāṣ", "الإِخْلَاص"],
};

export const PASSAGES = [
  // ---- 1 bis 10 ----
  { id: "ahad", sec: "small", ref: "112:1", from: 0, to: 3, gaps: [3],
    w: { de: ["sag","Er (ist)","Allah","Einer"], en: ["say","He (is)","Allah","One"], fr: ["dis","Il est","Allah","Unique"], ru: ["скажи","Он","Аллах","Один"], tr: ["de ki","O","Allah","birdir"] } },
  { id: "ithnan", sec: "small", ref: "16:51", from: 2, to: 9, gaps: [3, 7],
    w: { de: ["nicht","nehmt euch","zwei Götter","zwei","nur","Er (ist)","ein Gott","Einer"], en: ["do not","take","two gods","two","only","He (is)","a god","one"], fr: ["ne","prenez pas","deux divinités","deux","seulement","Il est","un Dieu","unique"], ru: ["не","берите","двух богов","двух","лишь","Он","Бог","Единый"], tr: ["asla","edinmeyin","iki ilah","iki","ancak","O","bir ilah","tek"] } },
  { id: "kahf", sec: "small", ref: "18:22", from: 0, to: 12, gaps: [1, 5, 11],
    w: { de: ["sie werden sagen","drei","ihr vierter","(ist) ihr Hund","und sie sagen","fünf","ihr sechster","(ist) ihr Hund","als Vermutung","über das Verborgene","und sie sagen","sieben","und ihr achter"], en: ["they will say","three","their fourth","(is) their dog","and they say","five","their sixth","(is) their dog","guessing","at the unseen","and they say","seven","and their eighth"], fr: ["ils diront","trois","le quatrième","(est) leur chien","et ils disent","cinq","le sixième","(est) leur chien","en conjecturant","sur l'inconnu","et ils disent","sept","et le huitième"], ru: ["они скажут","трое","четвёртый из них","их пёс","и говорят","пятеро","шестой из них","их пёс","гадая","о сокровенном","и говорят","семеро","и восьмой из них"], tr: ["diyecekler","üç","dördüncüleri","köpekleridir","ve diyorlar","beş","altıncıları","köpekleridir","tahmin ederek","gayba","ve diyorlar","yedi","ve sekizincileri"] } },
  { id: "ashara", sec: "small", ref: "2:196", from: 47, to: 57, gaps: [1, 5, 9],
    w: { de: ["dann Fasten","von drei","Tagen","während","der Pilgerfahrt","und sieben","wenn","ihr zurückkehrt","das sind","zehn","volle"], en: ["then fasting","of three","days","during","the Hajj","and seven","when","you return","that is","ten","complete"], fr: ["alors un jeûne","de trois","jours","pendant","le Hajj","et sept","quand","vous serez rentrés","cela fait","dix","complets"], ru: ["то пост","три","дня","во время","хаджа","и семь","когда","вернётесь","это","десять","полных"], tr: ["oruç tutmak","üç","gün","-de","hac","ve yedi","-dığınızda","döndüğünüz","bu","on","tam"] } },
  { id: "sab", sec: "small", ref: "67:3", from: 0, to: 4, gaps: [2],
    w: { de: ["der","erschuf","sieben","Himmel","in Schichten"], en: ["who","created","seven","heavens","in layers"], fr: ["qui","a créé","sept","cieux","superposés"], ru: ["который","создал","семь","небес","ярусами"], tr: ["ki O","yarattı","yedi","gök","kat kat"] } },
  // ---- 11 bis 99 ----
  { id: "kawkab", sec: "tens", ref: "12:4", from: 5, to: 11, gaps: [2, 3],
    w: { de: ["ich habe","gesehen","elf","(elf)","Sterne","und die Sonne","und den Mond"], en: ["I","saw","eleven","(eleven)","stars","and the sun","and the moon"], fr: ["j'ai","vu","onze","(onze)","étoiles","et le soleil","et la lune"], ru: ["я","видел","одиннадцать","(одиннадцать)","звёзд","и солнце","и луну"], tr: ["ben","gördüm","on bir","(on bir)","yıldız","ve güneşi","ve ayı"] } },
  { id: "tisa", sec: "tens", ref: "74:30", from: 0, to: 2, gaps: [1, 2],
    w: { de: ["über ihr (sind)","neun","zehn"], en: ["over it (are)","nine","ten"], fr: ["sur lui","neuf","dix"], ru: ["над ним","девять","десять"], tr: ["onun üzerinde","dokuz","on"] } },
  { id: "arbain", sec: "tens", ref: "7:142", from: 0, to: 10, gaps: [2, 9],
    w: { de: ["und Wir verabredeten mit","Mūsā","dreißig","Nächte","und vollendeten sie","mit zehn","so war vollendet","die Frist","seines Herrn","vierzig","Nächte"], en: ["and We appointed","Mūsā","thirty","nights","and completed them","with ten","so was completed","the term","of his Lord","forty","nights"], fr: ["et Nous donnâmes rendez-vous à","Mūsā","trente","nuits","et les complétâmes","par dix","ainsi s'accomplit","le temps fixé","de son Seigneur","quarante","nuits"], ru: ["и Мы назначили","Мусе","тридцать","ночей","и дополнили их","десятью","и завершился","срок","его Господа","сорок","ночей"], tr: ["ve sözleştik","Musa ile","otuz","gece","ve tamamladık","on ile","tamamlandı","vakti","Rabbinin","kırk","gece"] } },
  { id: "thalathun", sec: "tens", ref: "46:15", from: 9, to: 19, gaps: [2],
    w: { de: ["und seine Tragezeit","und seine Entwöhnung","dreißig","Monate","bis","als","er erreichte","seine Vollkraft","und erreichte","vierzig","Jahre"], en: ["and his carrying","and his weaning","thirty","months","until","when","he reached","his full strength","and reached","forty","years"], fr: ["et sa gestation","et son sevrage","trente","mois","jusqu'à","quand","il atteint","sa pleine force","et atteint","quarante","ans"], ru: ["и вынашивание","и отнятие от груди","тридцать","месяцев","пока","когда","он достиг","зрелости","и достиг","сорока","лет"], tr: ["taşınması","ve sütten kesilmesi","otuz","ay","nihayet","-dığında","ulaştı","olgunluk çağına","ve ulaştı","kırk","yaş"] } },
  { id: "tisun", sec: "tens", ref: "38:23", from: 0, to: 9, gaps: [4, 5, 9],
    w: { de: ["gewiss","dieser","mein Bruder","er hat","neun","und neunzig","Schafe","und ich habe","ein Schaf","eines"], en: ["indeed","this","my brother","he has","nine","and ninety","ewes","and I have","a ewe","one"], fr: ["certes","celui-ci","mon frère","il a","neuf","et quatre-vingt-dix","brebis","et moi j'ai","une brebis","seule"], ru: ["поистине","этот","мой брат","у него","девять","и девяносто","овец","а у меня","овца","одна"], tr: ["şüphesiz","bu","kardeşim","onun var","dokuz","ve doksan","koyunu","ve benim","koyunum","bir"] } },
  // ---- Hundert & Tausend ----
  { id: "mia", sec: "big", ref: "2:261", from: 7, to: 16, gaps: [3, 8],
    w: { de: ["wie das Gleichnis","eines Korns","das wachsen ließ","sieben","Ähren","in","jeder","Ähre","hundert","Körner"], en: ["like the example","of a grain","that grew","seven","ears","in","each","ear","a hundred","grains"], fr: ["comme l'exemple","d'un grain","qui produit","sept","épis","dans","chaque","épi","cent","grains"], ru: ["подобно","зерну","которое взрастило","семь","колосьев","в","каждом","колосе","сто","зёрен"], tr: ["benzer","bir taneye","bitirdi","yedi","başak","-de","her","başak","yüz","tane"] } },
  { id: "thalathmia", sec: "big", ref: "18:25", from: 0, to: 7, gaps: [3, 4, 7],
    w: { de: ["und sie verweilten","in","ihrer Höhle","drei","hundert","Jahre","und fügten hinzu","neun"], en: ["and they stayed","in","their cave","three","hundred","years","and added","nine"], fr: ["et ils restèrent","dans","leur caverne","trois","cents","ans","et en ajoutèrent","neuf"], ru: ["и они пробыли","в","своей пещере","триста","(сот)","лет","и добавили","девять"], tr: ["ve kaldılar","-de","mağaralarında","üç","yüz","yıl","ve eklediler","dokuz"] } },
  { id: "alf", sec: "big", ref: "29:14", from: 5, to: 11, gaps: [2, 5],
    w: { de: ["und er blieb","unter ihnen","tausend","Jahre","außer","fünfzig","Jahren"], en: ["and he stayed","among them","a thousand","years","less","fifty","years"], fr: ["et il resta","parmi eux","mille","ans","moins","cinquante","années"], ru: ["и он пробыл","среди них","тысячу","лет","без","пятидесяти","лет"], tr: ["ve kaldı","onların içinde","bin","yıl","eksik","elli","yıl"] } },
  { id: "miatalf", sec: "big", ref: "37:147", from: 0, to: 5, gaps: [2, 3],
    w: { de: ["und Wir sandten ihn","zu","hundert","tausend","oder","mehr"], en: ["and We sent him","to","a hundred","thousand","or","more"], fr: ["et Nous l'envoyâmes","vers","cent","mille","ou","davantage"], ru: ["и Мы отправили его","к","ста","тысячам","или","больше"], tr: ["ve onu gönderdik","-e","yüz","bin","veya","daha fazla"] } },
];
