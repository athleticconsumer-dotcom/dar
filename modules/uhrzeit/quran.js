// =====================================================================
//  ZEIT IM QUR'AN – Stunde, Teile der Stunde und Tageszeiten
//  Text kommt geprüft aus quran.json: python3 tools/quran/build_segments.py <quran-api> uhrzeit
// =====================================================================

export const SECTIONS = ["hour", "daytime"];

export const SURAH = {
  4: ["an-Nisāʾ", "النِّسَاء"], 10: ["Yūnus", "يُونُس"], 11: ["Hūd", "هُود"], 24: ["an-Nūr", "النُّور"], 30: ["ar-Rūm", "الرُّوم"],
  73: ["al-Muzzammil", "المُزَّمِّل"], 76: ["al-Insān", "الإِنْسَان"], 103: ["al-ʿAṣr", "العَصْر"],
};

export const PASSAGES = [
  // ---- Stunde & Teile ----
  { id: "saa1", sec: "hour", ref: "10:45", from: 2, to: 8, gaps: [3, 4],
    w: { de: ["als ob","nicht","sie verweilt hätten","außer","einer Stunde","vom","Tag"], en: ["as if","not","they had stayed","except","an hour","of","the day"], fr: ["comme si","ne","ils n'étaient restés","qu'","une heure","du","jour"], ru: ["словно","не","пробыли они","кроме","часа","из","дня"], tr: ["sanki","hiç","kalmamışlar","ancak","bir saat","-den","gündüz"] } },
  { id: "saa2", sec: "hour", ref: "30:55", from: 0, to: 8, gaps: [2, 8],
    w: { de: ["und am Tag","an dem sich erhebt","die Stunde","schwören","die Verbrecher","nicht","sie verweilten","mehr als","eine Stunde"], en: ["and on the day","when arrives","the Hour","swear","the criminals","not","they stayed","but","an hour"], fr: ["et le jour","où se lèvera","l'Heure","jureront","les criminels","ne","ils sont restés","qu'","une heure"], ru: ["и в день","когда наступит","Час","поклянутся","грешники","не","пробыли","более","часа"], tr: ["ve gün","kopacağı","kıyamet","yemin eder","suçlular","değil","kalmadılar","başka","bir saatten"] } },
  { id: "thuluth", sec: "hour", ref: "73:20", from: 0, to: 10, gaps: [7, 9, 10],
    w: { de: ["gewiss","dein Herr","weiß","dass du","aufstehst","weniger","als","zwei Drittel","der Nacht","und ihre Hälfte","und ihr Drittel"], en: ["indeed","your Lord","knows","that you","stand","less","than","two thirds","of the night","and half of it","and a third of it"], fr: ["certes","ton Seigneur","sait","que tu","te lèves","moins","de","deux tiers","de la nuit","et sa moitié","et son tiers"], ru: ["поистине","твой Господь","знает","что ты","стоишь","меньше","чем","две трети","ночи","и половину её","и треть её"], tr: ["şüphesiz","Rabbin","bilir","senin","kalktığını","daha az","-den","üçte ikisi","gecenin","ve yarısı","ve üçte biri"] } },
  { id: "nisf", sec: "hour", ref: "73:3", from: 0, to: 4, gaps: [0],
    w: { de: ["ihre Hälfte","oder","verringere","davon","ein wenig"], en: ["half of it","or","reduce","from it","a little"], fr: ["sa moitié","ou","diminue","de cela","un peu"], ru: ["половину её","или","убавь","от неё","немного"], tr: ["yarısını","ya da","eksilt","ondan","biraz"] } },
  { id: "rub", sec: "hour", ref: "4:12", from: 14, to: 17, gaps: [1],
    w: { de: ["so gehört euch","ein Viertel","von dem, was","sie hinterlassen"], en: ["then for you","a quarter","of what","they left"], fr: ["alors à vous","le quart","de ce que","elles laissent"], ru: ["то вам","четверть","из того, что","они оставили"], tr: ["sizindir","dörtte bir","-den","bıraktıkları"] } },
  // ---- Tageszeiten ----
  { id: "fajr", sec: "daytime", ref: "24:58", from: 12, to: 26, gaps: [5, 10, 14],
    w: { de: ["drei","Male","von","vor","dem Gebet","der Morgendämmerung","und wenn","ihr ablegt","eure Kleider","in","der Mittagshitze","und","nach","dem Gebet","der Nacht"], en: ["three","times","from","before","the prayer","of dawn","and when","you put aside","your clothes","at","midday","and","after","the prayer","of night"], fr: ["trois","fois","de","avant","la prière","de l'aube","et quand","vous ôtez","vos vêtements","à","midi","et","après","la prière","du soir"], ru: ["три","раза","от","до","молитвы","рассвета","и когда","вы снимаете","одежду","в","полдень","и","после","молитвы","вечерней"], tr: ["üç","defa","-den","önce","namazı","sabah","ve -dığınızda","çıkardığınız","elbiselerinizi","-de","öğle sıcağı","ve","sonra","namazı","yatsı"] } },
  { id: "masa", sec: "daytime", ref: "30:17", from: 0, to: 5, gaps: [3, 5],
    w: { de: ["so gepriesen sei","Allah","wenn","ihr den Abend erreicht","und wenn","ihr den Morgen erreicht"], en: ["so glory be to","Allah","when","you reach the evening","and when","you reach the morning"], fr: ["gloire à","Allah","quand","vous êtes au soir","et quand","vous êtes au matin"], ru: ["пречист","Аллах","когда","вы встречаете вечер","и когда","вы встречаете утро"], tr: ["tesbih et","Allah'ı","-dığınızda","akşama girdiğinizde","ve -dığınızda","sabaha girdiğinizde"] } },
  { id: "zuhr", sec: "daytime", ref: "30:18", from: 5, to: 7, gaps: [0, 2],
    w: { de: ["und am Nachmittag","und wenn","ihr den Mittag erreicht"], en: ["and in the late afternoon","and when","you reach midday"], fr: ["et en fin d'après-midi","et quand","vous êtes à midi"], ru: ["и пополудни","и когда","вы встречаете полдень"], tr: ["ve ikindi vakti","ve -dığınızda","öğleye girdiğinizde"] } },
  { id: "asr", sec: "daytime", ref: "103:1", from: 0, to: 0, gaps: [0],
    w: { de: ["bei der Zeit (dem Nachmittag)"], en: ["by time (the afternoon)"], fr: ["par le temps (l'après-midi)"], ru: ["клянусь временем (послеполуднем)"], tr: ["asra (ikindi vaktine) andolsun"] } },
  { id: "layl", sec: "daytime", ref: "11:114", from: 0, to: 6, gaps: [3, 6],
    w: { de: ["und verrichte","das Gebet","an beiden Enden","des Tages","und in Stunden","von","der Nacht"], en: ["and establish","the prayer","at the two ends","of the day","and at hours","of","the night"], fr: ["et accomplis","la prière","aux deux extrémités","du jour","et à des heures","de","la nuit"], ru: ["и выстаивай","молитву","в оба конца","дня","и в часы","из","ночи"], tr: ["ve kıl","namazı","iki ucunda","gündüzün","ve saatlerinde","-den","gecenin"] } },
  { id: "bukra", sec: "daytime", ref: "76:25", from: 0, to: 4, gaps: [3, 4],
    w: { de: ["und gedenke","des Namens","deines Herrn","am Morgen","und am Abend"], en: ["and remember","the name","of your Lord","in the morning","and in the evening"], fr: ["et invoque","le nom","de ton Seigneur","matin","et soir"], ru: ["и поминай","имя","твоего Господа","утром","и вечером"], tr: ["ve an","adını","Rabbinin","sabah","ve akşam"] } },
];
