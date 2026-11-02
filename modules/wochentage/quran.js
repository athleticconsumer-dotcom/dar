// =====================================================================
//  TAGE & MONATE IM QUR'AN – Stellen pro Bereich
//  Text kommt geprüft aus quran.json: python3 tools/quran/build_segments.py <quran-api> wochentage
// =====================================================================

export const SECTIONS = ["days", "hijri"];

export const SURAH = {
  1: ["al-Fātiḥa", "الفَاتِحَة"], 2: ["al-Baqara", "البَقَرَة"], 7: ["al-Aʿrāf", "الأَعْرَاف"], 9: ["at-Tawba", "التَّوْبَة"], 10: ["Yūnus", "يُونُس"],
  16: ["an-Naḥl", "النَّحْل"], 62: ["al-Jumuʿa", "الجُمُعَة"], 69: ["al-Ḥāqqa", "الحَاقَّة"], 97: ["al-Qadr", "القَدْر"],
};

export const PASSAGES = [
  // ---- Tage ----
  { id: "yawm", sec: "days", ref: "1:4", from: 0, to: 2, gaps: [1],
    w: { de: ["Herrscher","des Tages","des Gerichts"], en: ["Master","of the Day","of Judgement"], fr: ["Maître","du Jour","de la Rétribution"], ru: ["Властелин","Дня","Суда"], tr: ["sahibi","gününün","din"] } },
  { id: "jumua", sec: "days", ref: "62:9", from: 0, to: 8, gaps: [7, 8],
    w: { de: ["o ihr","die","glauben","wenn","gerufen wird","zum Gebet","am","Tag","des Freitags"], en: ["O you","who","believe","when","the call is made","for the prayer","on","the day","of Friday"], fr: ["ô vous","qui","croyez","quand","on appelle","à la prière","du","jour","du vendredi"], ru: ["о те","которые","уверовали","когда","призовут","к молитве","в","день","пятницы"], tr: ["ey","-enler","iman edenler","-dığı zaman","çağrıldığı","namaza","-den","günü","cuma"] } },
  { id: "sabt", sec: "days", ref: "16:124", from: 0, to: 2, gaps: [2],
    w: { de: ["nur","wurde auferlegt","der Sabbat (Samstag)"], en: ["only","was appointed","the Sabbath (Saturday)"], fr: ["seulement","a été imposé","le sabbat (samedi)"], ru: ["лишь","был установлен","субботний день"], tr: ["ancak","kılındı","cumartesi"] } },
  { id: "sitta", sec: "days", ref: "7:54", from: 4, to: 9, gaps: [5],
    w: { de: ["Er erschuf","die Himmel","und die Erde","in","sechs","Tagen"], en: ["He created","the heavens","and the earth","in","six","days"], fr: ["Il a créé","les cieux","et la terre","en","six","jours"], ru: ["Он сотворил","небеса","и землю","за","шесть","дней"], tr: ["yarattı","gökleri","ve yeri","-de","altı","gün"] } },
  { id: "layali", sec: "days", ref: "69:7", from: 2, to: 5, gaps: [1, 3],
    w: { de: ["sieben","Nächte","und acht","Tage"], en: ["seven","nights","and eight","days"], fr: ["sept","nuits","et huit","jours"], ru: ["семь","ночей","и восемь","дней"], tr: ["yedi","gece","ve sekiz","gün"] } },
  // ---- Monate & Jahre ----
  { id: "ramadan", sec: "hijri", ref: "2:185", from: 0, to: 5, gaps: [0, 1],
    w: { de: ["der Monat","Ramaḍān","in dem","herabgesandt wurde","in ihm","der Qur'an"], en: ["the month","of Ramaḍān","which","was sent down","in it","the Qur'an"], fr: ["le mois","de Ramaḍān","au cours duquel","a été descendu","en lui","le Coran"], ru: ["месяц","Рамадан","в который","был ниспослан","в нём","Коран"], tr: ["ay","Ramazan","ki","indirildi","onda","Kur'an"] } },
  { id: "shuhur", sec: "hijri", ref: "9:36", from: 0, to: 7, gaps: [2, 7],
    w: { de: ["gewiss","die Anzahl","der Monate","bei","Allah","zwei","zehn","Monate"], en: ["indeed","the number","of months","with","Allah","two","ten","months"], fr: ["certes","le nombre","des mois","auprès d'","Allah","douze","(douze)","mois"], ru: ["поистине","число","месяцев","у","Аллаха","двенадцать","(двенадцать)","месяцев"], tr: ["şüphesiz","sayısı","ayların","katında","Allah'ın","on iki","(on iki)","ay"] } },
  { id: "hurum", sec: "hijri", ref: "9:36", from: 15, to: 17, gaps: [1],
    w: { de: ["von ihnen","vier","heilige"], en: ["of them","four","sacred"], fr: ["parmi eux","quatre","sacrés"], ru: ["из них","четыре","запретных"], tr: ["onlardan","dördü","haram"] } },
  { id: "ahilla", sec: "hijri", ref: "2:189", from: 0, to: 7, gaps: [2],
    w: { de: ["sie fragen dich","nach","den Neumonden","sag","sie sind","Zeitmaße","für die Menschen","und die Pilgerfahrt"], en: ["they ask you","about","the new moons","say","they are","measures of time","for people","and the Hajj"], fr: ["ils t'interrogent","sur","les nouvelles lunes","dis","elles sont","des repères","pour les gens","et le Hajj"], ru: ["они спрашивают тебя","о","молодых лунах","скажи","они","указатели времени","для людей","и хаджа"], tr: ["sana soruyorlar","hakkında","hilaller","de ki","onlar","vakit ölçüleridir","insanlar için","ve hac"] } },
  { id: "alfshahr", sec: "hijri", ref: "97:3", from: 0, to: 5, gaps: [0, 5],
    w: { de: ["die Nacht","der Bestimmung","(ist) besser","als","tausend","Monate"], en: ["the Night","of Decree","(is) better","than","a thousand","months"], fr: ["la Nuit","du Destin","est meilleure","que","mille","mois"], ru: ["Ночь","предопределения","лучше","чем","тысяча","месяцев"], tr: ["gecesi","Kadir","hayırlıdır","-den","bin","ay"] } },
  { id: "sinin", sec: "hijri", ref: "10:5", from: 9, to: 12, gaps: [2],
    w: { de: ["damit ihr kennt","die Anzahl","der Jahre","und die Berechnung"], en: ["so you may know","the number","of years","and the reckoning"], fr: ["afin que vous sachiez","le nombre","des années","et le calcul"], ru: ["чтобы вы знали","число","лет","и счёт"], tr: ["bilesiniz diye","sayısını","yılların","ve hesabı"] } },
];
