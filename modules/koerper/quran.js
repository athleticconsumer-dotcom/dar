// =====================================================================
//  KÖRPERWÖRTER IM QUR'AN – Stellen pro Bereich (Format wie modules/lebewesen/quran.js)
//  Text kommt geprüft aus quran.json: python3 tools/quran/build_segments.py <quran-api> koerper
// =====================================================================

export const SECTIONS = ["head", "body", "inner"];

export const SURAH = {
  5: ["al-Māʾida", "المَائِدَة"], 13: ["ar-Raʿd", "الرَّعْد"], 15: ["al-Ḥijr", "الحِجْر"], 16: ["an-Naḥl", "النَّحْل"], 19: ["Maryam", "مَرْيَم"],
  26: ["ash-Shuʿarāʾ", "الشُّعَرَاء"], 48: ["al-Fatḥ", "الفَتْح"], 55: ["ar-Raḥmān", "الرَّحْمٰن"], 89: ["al-Fajr", "الفَجْر"], 90: ["al-Balad", "البَلَد"], 94: ["ash-Sharḥ", "الشَّرْح"],
};

export const PASSAGES = [
  // ---- Kopf & Gesicht ----
  { id: "wajh", sec: "head", ref: "55:27", from: 0, to: 5, gaps: [1],
    w: { de: ["und es bleibt","das Angesicht","deines Herrn","Besitzer","der Majestät","und der Ehre"], en: ["and remains","the Face","of your Lord","Owner","of majesty","and honour"], fr: ["et subsiste","la Face","de ton Seigneur","Détenteur","de la majesté","et de la générosité"], ru: ["и останется","Лик","твоего Господа","обладателя","величия","и щедрости"], tr: ["ve baki kalır","yüzü","Rabbinin","sahibi","celâl","ve ikram"] } },
  { id: "ayn", sec: "head", ref: "5:45", from: 6, to: 13, gaps: [0, 2, 4, 6],
    w: { de: ["und das Auge","für das Auge","und die Nase","für die Nase","und das Ohr","für das Ohr","und der Zahn","für den Zahn"], en: ["and the eye","for the eye","and the nose","for the nose","and the ear","for the ear","and the tooth","for the tooth"], fr: ["et l'œil","pour l'œil","et le nez","pour le nez","et l'oreille","pour l'oreille","et la dent","pour la dent"], ru: ["и глаз","за глаз","и нос","за нос","и ухо","за ухо","и зуб","за зуб"], tr: ["ve göze","göz","ve buruna","burun","ve kulağa","kulak","ve dişe","diş"] } },
  { id: "aynayn", sec: "head", ref: "90:8", from: 0, to: 3, gaps: [3],
    w: { de: ["haben Wir nicht","gemacht","für ihn","zwei Augen"], en: ["have We not","made","for him","two eyes"], fr: ["ne lui avons-Nous pas","donné","à lui","deux yeux"], ru: ["разве Мы не","сделали","ему","два глаза"], tr: ["değil mi","kılmadık","ona","iki göz"] } },
  { id: "lisan", sec: "head", ref: "90:9", from: 0, to: 1, gaps: [0, 1],
    w: { de: ["und eine Zunge","und zwei Lippen"], en: ["and a tongue","and two lips"], fr: ["et une langue","et deux lèvres"], ru: ["и язык","и две губы"], tr: ["ve bir dil","ve iki dudak"] } },
  // ---- Körper & Glieder ----
  { id: "yad", sec: "body", ref: "48:10", from: 6, to: 9, gaps: [0, 3],
    w: { de: ["die Hand","Allahs","(ist) über","ihren Händen"], en: ["the Hand","of Allah","is over","their hands"], fr: ["la Main","d'Allah","est au-dessus de","leurs mains"], ru: ["Рука","Аллаха","над","их руками"], tr: ["eli","Allah'ın","üstündedir","ellerinin"] } },
  { id: "wudu", sec: "body", ref: "5:6", from: 7, to: 16, gaps: [2, 4, 9],
    w: { de: ["so wascht","eure Gesichter","und eure Hände","bis","zu den Ellbogen","und streicht","über eure Köpfe","und (wascht) eure Füße","bis","zu den Knöcheln"], en: ["so wash","your faces","and your hands","up to","the elbows","and wipe","over your heads","and (wash) your feet","up to","the ankles"], fr: ["lavez","vos visages","et vos mains","jusqu'aux","coudes","et passez les mains","sur vos têtes","et (lavez) vos pieds","jusqu'aux","chevilles"], ru: ["омывайте","ваши лица","и ваши руки","до","локтей","и протирайте","ваши головы","и (омывайте) ваши ноги","до","щиколоток"], tr: ["yıkayın","yüzlerinizi","ve ellerinizi","-e kadar","dirsekler","ve meshedin","başlarınızı","ve ayaklarınızı","-e kadar","topuklar"] } },
  { id: "sadr", sec: "body", ref: "94:1", from: 0, to: 3, gaps: [3],
    w: { de: ["haben Wir nicht","geweitet","dir","deine Brust"], en: ["have We not","expanded","for you","your chest"], fr: ["n'avons-Nous pas","ouvert","pour toi","ta poitrine"], ru: ["разве Мы не","раскрыли","тебе","твою грудь"], tr: ["değil mi","açmadık","senin için","göğsünü"] } },
  { id: "zahr", sec: "body", ref: "94:3", from: 0, to: 2, gaps: [2],
    w: { de: ["die","beschwerte","deinen Rücken"], en: ["which","weighed down","your back"], fr: ["qui","accablait","ton dos"], ru: ["которое","тяготило","твою спину"], tr: ["ki","bükmüştü","belini"] } },
  { id: "butun", sec: "body", ref: "16:69", from: 9, to: 17, gaps: [2],
    w: { de: ["es kommt heraus","aus","ihren Bäuchen","ein Getränk","verschieden","seine Farben","darin (ist)","Heilung","für die Menschen"], en: ["comes out","from","their bellies","a drink","varying","its colours","in it (is)","healing","for people"], fr: ["sort","de","leurs ventres","une boisson","diverse","ses couleurs","il y a en elle","une guérison","pour les gens"], ru: ["выходит","из","их чрева","питьё","различное","его цвета","в нём","исцеление","для людей"], tr: ["çıkar","-den","karınlarının","bir içecek","çeşitli","renkleri","onda vardır","şifa","insanlar için"] } },
  // ---- Innen & mehr ----
  { id: "qulub", sec: "inner", ref: "13:28", from: 6, to: 10, gaps: [4],
    w: { de: ["wahrlich","durch das Gedenken","Allahs","finden Ruhe","die Herzen"], en: ["truly","in the remembrance","of Allah","find rest","the hearts"], fr: ["certes","par l'évocation","d'Allah","s'apaisent","les cœurs"], ru: ["поистине","поминанием","Аллаха","успокаиваются","сердца"], tr: ["dikkat edin","anmakla","Allah'ı","huzur bulur","kalpler"] } },
  { id: "qalb", sec: "inner", ref: "26:89", from: 0, to: 5, gaps: [4],
    w: { de: ["außer","wer","kommt","zu Allah","mit einem Herzen","heilen"], en: ["except","whoever","comes","to Allah","with a heart","sound"], fr: ["sauf","celui qui","vient","à Allah","avec un cœur","sain"], ru: ["кроме","того, кто","придёт","к Аллаху","с сердцем","здравым"], tr: ["ancak","kim","gelirse","Allah'a","bir kalple","selim"] } },
  { id: "azm", sec: "inner", ref: "19:4", from: 1, to: 8, gaps: [3, 6],
    w: { de: ["mein Herr","gewiss, mir","schwach geworden sind","die Knochen","an mir","und es glüht","der Kopf","vor grauem Haar"], en: ["my Lord","indeed, my","have weakened","bones","in me","and is aflame","the head","with grey hair"], fr: ["mon Seigneur","certes, mes","se sont affaiblis","os","en moi","et s'est embrasée","la tête","de cheveux blancs"], ru: ["Господи","поистине, у меня","ослабели","кости","мои","и покрылась","голова","сединой"], tr: ["Rabbim","şüphesiz ben","zayıfladı","kemik","benim","ve tutuştu","baş","ağarmaktan"] } },
  { id: "nafs", sec: "inner", ref: "89:27", from: 0, to: 2, gaps: [1],
    w: { de: ["o du","Seele","die Ruhe gefunden hat"], en: ["O","soul","at peace"], fr: ["ô","âme","apaisée"], ru: ["о","душа","успокоенная"], tr: ["ey","nefis","mutmain olan"] } },
  { id: "ruh", sec: "inner", ref: "15:29", from: 0, to: 8, gaps: [5],
    w: { de: ["und wenn","Ich ihn geformt habe","und eingehaucht habe","in ihn","von","Meinem Geist","dann fallt","vor ihm","nieder"], en: ["so when","I have proportioned him","and breathed","into him","of","My spirit","then fall down","to him","in prostration"], fr: ["quand","Je l'aurai harmonieusement formé","et aurai insufflé","en lui","de","Mon esprit","tombez","devant lui","prosternés"], ru: ["и когда","Я соразмерю его","и вдохну","в него","от","Моего духа","то падите","перед ним","ниц"], tr: ["ne zaman ki","onu düzenledim","ve üfledim","ona","-den","ruhumdan","kapanın","ona","secdeye"] } },
];
