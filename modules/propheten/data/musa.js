// =====================================================================
//  MŪSĀ (مُوسَىٰ) – 7 Level, chronologisch
//  Jedes Level: story (Erzählung) → ayat (Lesen + Lückentext) → quiz
//
//  SPRACHEN: Alle Texte stehen pro Sprache: { de: …, en: …, fr: …, ru: …, tr: … }.
//  Fehlt eine Sprache, zeigt die App Deutsch. Übersetzen = Feld ergänzen, z. B. title: { de: "…", en: "…" }.
//
//  ayat: ref "Sure:Vers", gaps: Wortposition i (0 = erstes Wort, nach Leerzeichen getrennt),
//        w: Bedeutung für JEDES Wort, pro Sprache (gleiche Anzahl wie Wörter, wird beim Build geprüft)
//  Der Qur'an-Text selbst steht NICHT hier, sondern kommt geprüft aus ../ayat.json
//  (erzeugt mit tools/quran/build_ayat.py aus dem Tanzil-Text, Uthmani/Hafs).
// =====================================================================

export default {
  id: "musa",
  ar: "مُوسَىٰ",
  title: {"de":"Die Geschichte von Mūsā"},
  intro: {"de":"Mūsā (Moses) ist der Prophet, der im Qur'an am häufigsten erwähnt wird. Seine Geschichte beginnt in einem Korb auf dem Fluss und führt durch das geteilte Meer bis zu al-Khiḍr."},
  levels: [
    {
      motif: "wellen",
      title: {"de":"Ein Korb auf dem Fluss"},
      source: {"de":"Sure al-Qaṣaṣ 28:3–13"},
      story: {
        de: [
          "In Ägypten herrschte Pharao (فِرْعَوْن) mit Gewalt. Er ließ die neugeborenen Jungen der Kinder Israels töten, weil er um seine Macht fürchtete.",
          "Als Mūsā geboren wurde, gab Allah seiner Mutter ein: Stille ihn. Und wenn du um ihn fürchtest, dann leg ihn in den Fluss. Fürchte dich nicht und sei nicht traurig, Wir bringen ihn zu dir zurück.",
          "Der Korb trieb bis zum Palast. Die Familie Pharaos nahm das Kind auf, und die Frau Pharaos (in der Überlieferung Āsiya genannt) bat darum, es nicht zu töten.",
          "Doch das Baby nahm von keiner Amme die Brust. Mūsās Schwester, die dem Korb gefolgt war, sagte: Soll ich euch eine Familie zeigen, die für ihn sorgt? So kam Mūsā zu seiner Mutter zurück, und Allahs Versprechen erfüllte sich.",
        ],
      },
      ayat: [
        { ref: "28:7", gaps: [{ i: 11 }, { i: 13 }],
          w: { de: ["und Wir gaben ein","an","die Mutter","von Mūsā","dass","stille ihn","und wenn","du fürchtest","um ihn","dann wirf ihn","in","den Fluss","und nicht","fürchte dich","und nicht","sei traurig","gewiss, Wir","bringen ihn zurück","zu dir","und machen ihn","zu einem der","Gesandten"] } },
        { ref: "28:8", gaps: [{ i: 2 }],
          w: { de: ["da hob ihn auf","die Familie","von Pharao","damit er werde","für sie","ein Feind","und ein Kummer","gewiss","Pharao","und Hāmān","und ihre Heere","waren","im Unrecht"] } },
        { ref: "28:12", gaps: [{ i: 10 }],
          w: { de: ["und Wir verwehrten","ihm","die Ammen","von","vorher","da sagte sie","soll","ich euch hinweisen","auf","die Leute","eines Hauses","die ihn versorgen","für euch","und sie","zu ihm","sind wohlgesinnt"] } },
        { ref: "28:13", gaps: [{ i: 2 }, { i: 7 }],
          w: { de: ["so brachten Wir ihn zurück","zu","seiner Mutter","damit","sich freue","ihr Auge","und nicht","traurig sei","und damit sie wisse","dass","das Versprechen","Allahs","wahr ist","aber","die meisten von ihnen","nicht","wissen"] } },
      ],
      quiz: {
        de: [
          { q: "Wohin sollte Mūsās Mutter ihr Kind legen, wenn sie um es fürchtet?", a: "In den Fluss", o: ["In eine Höhle","In den Fluss","Zu den Nachbarn","In den Palast"] },
          { q: "Was bedeutet ٱلۡيَمّ in dieser Geschichte?", a: "Der Fluss", o: ["Der Korb","Die Mutter","Der Fluss","Das Haus"] },
          { q: "Warum kam Mūsā zu seiner Mutter zurück?", a: "Er nahm keine andere Amme an", o: ["Pharao schickte ihn weg","Er nahm keine andere Amme an","Er lief selbst nach Hause","Seine Mutter holte ihn heimlich"] },
          { q: "Wer folgte dem Korb und half?", a: "Mūsās Schwester", o: ["Mūsās Bruder Hārūn","Mūsās Schwester","Ein Soldat","Die Frau Pharaos"] },
          { q: "Was heißt لَا تَحۡزَنِي?", a: "Sei nicht traurig", o: ["Sei nicht traurig","Geh nicht weg","Hab keine Angst vor Wasser","Sprich nicht"] },
        ],
      },
    },
    {
      motif: "brunnen",
      title: {"de":"Die Flucht nach Madyan"},
      source: {"de":"Sure al-Qaṣaṣ 28:14–28"},
      story: {
        de: [
          "Mūsā wuchs heran und wurde stark. Eines Tages sah er zwei Männer kämpfen: einen aus seinem Volk und einen von dessen Feinden. Mūsā schlug den Angreifer, und der Mann starb. Das hatte Mūsā nicht gewollt.",
          "Sofort bereute er und betete: Mein Herr, ich habe mir selbst Unrecht getan, so vergib mir. Und Allah vergab ihm.",
          "Ein Mann kam angelaufen und warnte ihn: Die Mächtigen beraten, dich zu töten. Mūsā floh voller Furcht in Richtung Madyan und bat Allah um Rettung.",
          "Am Wasser von Madyan sah er zwei Frauen, die ihre Tiere zurückhielten, weil ihr Vater ein alter Mann war. Mūsā tränkte ihre Tiere, setzte sich in den Schatten und betete: Mein Herr, ich bin bedürftig nach allem Guten, das Du mir herabsendest.",
        ],
      },
      ayat: [
        { ref: "28:16", gaps: [{ i: 5 }, { i: 11 }],
          w: { de: ["er sagte","mein Herr","gewiss, ich","habe Unrecht getan","mir selbst","so vergib","mir","da vergab Er","ihm","gewiss, Er","Er ist","der Allvergebende","der Barmherzige"] } },
        { ref: "28:21", gaps: [{ i: 2 }, { i: 6 }],
          w: { de: ["so ging er hinaus","aus ihr","voller Furcht","sich umschauend","er sagte","mein Herr","rette mich","vor","dem Volk","den Ungerechten"] } },
        { ref: "28:23", gaps: [{ i: 2 }, { i: 13 }],
          w: { de: ["und als","er ankam","am Wasser","von Madyan","fand er","dort","eine Gruppe","von","den Menschen","die tränkten","und er fand","abseits","von ihnen","zwei Frauen","die zurückhielten","er sagte","was","ist euer Anliegen","sie sagten","nicht","wir tränken","bis","wegtreiben","die Hirten","und unser Vater","ist ein Greis","hochbetagt"] } },
        { ref: "28:24", gaps: [{ i: 13 }, { i: 14 }],
          w: { de: ["da tränkte er","für sie beide","dann","wandte er sich","zu","dem Schatten","und sagte","mein Herr","gewiss, ich bin","für das, was","Du herabsendest","zu mir","an","Gutem","bedürftig"] } },
      ],
      quiz: {
        de: [
          { q: "Was tat Mūsā, nachdem der Mann gestorben war?", a: "Er bat Allah um Vergebung", o: ["Er versteckte sich im Palast","Er bat Allah um Vergebung","Er ging zu Pharao","Er kämpfte weiter"] },
          { q: "Was bedeutet فَٱغۡفِرۡ لِي?", a: "So vergib mir", o: ["So rette mich","So vergib mir","So hilf mir","So lehre mich"] },
          { q: "Wem half Mūsā am Wasser von Madyan?", a: "Zwei Frauen", o: ["Einem alten Händler","Zwei Frauen","Den Soldaten","Seinem Bruder"] },
          { q: "Warum mussten die Frauen selbst die Tiere tränken?", a: "Ihr Vater war ein alter Mann", o: ["Sie hatten kein Seil","Ihr Vater war ein alter Mann","Der Brunnen war verboten","Sie waren fremd"] },
          { q: "Was heißt فَقِير im Bittgebet von Mūsā?", a: "Bedürftig", o: ["Reich","Müde","Bedürftig","Allein"] },
        ],
      },
    },
    {
      motif: "feuer",
      title: {"de":"Das Feuer am Berg"},
      source: {"de":"Sure Ṭā-Hā 20:9–23"},
      story: {
        de: [
          "Nach Jahren in Madyan reiste Mūsā mit seiner Familie zurück. In einer kalten Nacht sah er in der Ferne ein Feuer. Er sagte: Bleibt hier. Vielleicht bringe ich euch etwas Glut, oder ich finde am Feuer jemanden, der uns den Weg zeigt.",
          "Als er hinkam, rief ihn Allah: Ich bin dein Herr. Zieh deine Sandalen aus, du bist im heiligen Tal Ṭuwā.",
          "Ich bin Allah, es gibt keinen Gott außer Mir. So diene Mir und verrichte das Gebet, um Meiner zu gedenken.",
          "Dann fragte Allah: Was ist das in deiner Rechten, o Mūsā? Er antwortete: Das ist mein Stab. Ich stütze mich darauf und schlage damit Laub für meine Schafe herab. Auf Allahs Befehl warf er ihn hin, und er wurde zu einer sich bewegenden Schlange.",
        ],
      },
      ayat: [
        { ref: "20:10", gaps: [{ i: 2 }, { i: 17 }],
          w: { de: ["als","er sah","ein Feuer","da sagte er","zu seiner Familie","bleibt hier","gewiss, ich","habe bemerkt","ein Feuer","vielleicht","bringe ich euch","davon","eine Glut","oder","finde ich","an","dem Feuer","Wegweisung"] } },
        { ref: "20:12", gaps: [{ i: 4 }, { i: 7 }],
          w: { de: ["gewiss, Ich","Ich bin","dein Herr","so zieh aus","deine Sandalen","gewiss, du bist","im Tal","dem heiligen","Ṭuwā"] } },
        { ref: "20:14", gaps: [{ i: 7 }, { i: 9 }],
          w: { de: ["gewiss, Ich","Ich bin","Allah","kein","Gott","außer","Mir","so diene Mir","und verrichte","das Gebet","zu Meinem Gedenken"] } },
        { ref: "20:17", gaps: [{ i: 2 }],
          w: { de: ["und was","ist das","in deiner Rechten","o Mūsā"] } },
        { ref: "20:18", gaps: [{ i: 2 }, { i: 8 }],
          w: { de: ["er sagte","es ist","mein Stab","ich stütze mich","auf ihn","und ich schlage Laub","mit ihm","für","meine Schafe","und ich habe","an ihm","Nutzen","weitere"] } },
      ],
      quiz: {
        de: [
          { q: "Was sah Mūsā in der Nacht?", a: "Ein Feuer", o: ["Einen Stern","Ein Feuer","Einen Engel","Eine Stadt"] },
          { q: "Was sollte Mūsā im heiligen Tal tun?", a: "Seine Sandalen ausziehen", o: ["Seinen Stab ablegen","Seine Sandalen ausziehen","Schweigen","Zurückgehen"] },
          { q: "Wie heißt das heilige Tal?", a: "Ṭuwā", o: ["Madyan","Ṭuwā","Sīnā","Badr"] },
          { q: "Was bedeutet عَصَايَ?", a: "Mein Stab", o: ["Meine Schafe","Mein Stab","Meine Hand","Mein Weg"] },
          { q: "Was bedeutet ٱلصَّلَوٰة?", a: "Das Gebet", o: ["Das Fasten","Das Gebet","Das Wissen","Die Geduld"] },
        ],
      },
    },
    {
      motif: "rolle",
      title: {"de":"Der Auftrag: Geh zu Pharao"},
      source: {"de":"Sure Ṭā-Hā 20:24–44"},
      story: {
        de: [
          "Allah gab Mūsā einen schweren Auftrag: Geh zu Pharao, denn er hat jedes Maß überschritten.",
          "Mūsā bat um Hilfe mit einem Bittgebet, das Muslime bis heute sprechen: Mein Herr, weite mir meine Brust, erleichtere mir meine Aufgabe und löse den Knoten von meiner Zunge, damit sie meine Rede verstehen.",
          "Er bat auch darum, dass sein Bruder Hārūn ihm zur Seite steht, und Allah erfüllte seine Bitte.",
          "Dann sagte Allah zu beiden: Sprecht zu ihm mit sanften Worten. Vielleicht besinnt er sich oder fürchtet sich. Selbst zu einem Tyrannen sollte man zuerst freundlich sprechen.",
        ],
      },
      ayat: [
        { ref: "20:24", gaps: [{ i: 0 }, { i: 4 }],
          w: { de: ["geh","zu","Pharao","gewiss, er","hat das Maß überschritten"] } },
        { ref: "20:25", gaps: [{ i: 4 }],
          w: { de: ["er sagte","mein Herr","weite","mir","meine Brust"] } },
        { ref: "20:26", gaps: [{ i: 2 }],
          w: { de: ["und erleichtere","mir","meine Aufgabe"] } },
        { ref: "20:27", gaps: [{ i: 3 }],
          w: { de: ["und löse","einen Knoten","von","meiner Zunge"] } },
        { ref: "20:28", gaps: [{ i: 1 }],
          w: { de: ["damit sie verstehen","meine Rede"] } },
        { ref: "20:44", gaps: [{ i: 3 }],
          w: { de: ["und sprecht beide","zu ihm","ein Wort","sanft","vielleicht er","besinnt sich","oder","fürchtet sich"] } },
      ],
      quiz: {
        de: [
          { q: "Zu wem sollte Mūsā gehen?", a: "Zu Pharao", o: ["Zu Pharao","Nach Madyan","Zu den Zauberern","Zum Meer"] },
          { q: "Was bedeutet رَبِّ ٱشۡرَحۡ لِي صَدۡرِي?", a: "Mein Herr, weite mir meine Brust", o: ["Mein Herr, rette mich","Mein Herr, weite mir meine Brust","Mein Herr, vergib mir","Mein Herr, gib mir Wissen"] },
          { q: "Wen wünschte sich Mūsā als Helfer?", a: "Seinen Bruder Hārūn", o: ["Seine Mutter","Seinen Bruder Hārūn","al-Khiḍr","Seinen Diener"] },
          { q: "Was heißt لِسَانِي?", a: "Meine Zunge", o: ["Meine Brust","Meine Rede","Meine Zunge","Mein Herz"] },
          { q: "Wie sollten Mūsā und Hārūn mit Pharao sprechen?", a: "Mit sanften Worten", o: ["Laut und streng","Gar nicht","Mit sanften Worten","Nur schriftlich"] },
        ],
      },
    },
    {
      motif: "stab",
      title: {"de":"Die Zauberer"},
      source: {"de":"Sure Ṭā-Hā 20:56–73"},
      story: {
        de: [
          "Pharao nannte Mūsā einen Zauberer und rief die besten Zauberer des Landes zu einem großen Festtag zusammen.",
          "Sie fragten: O Mūsā, wirfst du zuerst, oder sollen wir die Ersten sein? Ihre Seile und Stäbe schienen sich wie Schlangen zu bewegen, und Mūsā spürte Furcht in sich.",
          "Allah sagte: Fürchte dich nicht, du bist der Überlegene. Wirf, was in deiner Rechten ist. Es verschlingt, was sie gemacht haben. Ein Zauberer hat keinen Erfolg, wo er auch hinkommt.",
          "Der Stab verschlang alles. Da warfen sich die Zauberer nieder und sagten: Wir glauben an den Herrn von Hārūn und Mūsā. Sie erkannten als Erste, dass das kein Zauber war.",
        ],
      },
      ayat: [
        { ref: "20:65", gaps: [{ i: 4 }],
          w: { de: ["sie sagten","o Mūsā","entweder","dass","du wirfst","oder","dass","wir sind","die Ersten","die","werfen"] } },
        { ref: "20:68", gaps: [{ i: 2 }, { i: 5 }],
          w: { de: ["Wir sagten","nicht","fürchte dich","gewiss, du","du bist","der Überlegene"] } },
        { ref: "20:69", gaps: [{ i: 3 }, { i: 10 }],
          w: { de: ["und wirf","was","in","deiner Rechten","es verschlingt","was","sie gemacht haben","nur","sie machten","die List","eines Zauberers","und nicht","hat Erfolg","der Zauberer","wo auch immer","er hinkommt"] } },
        { ref: "20:70", gaps: [{ i: 2 }, { i: 4 }],
          w: { de: ["da wurden geworfen","die Zauberer","niederfallend","sie sagten","wir glauben","an den Herrn","von Hārūn","und Mūsā"] } },
      ],
      quiz: {
        de: [
          { q: "Wen rief Pharao gegen Mūsā zusammen?", a: "Die Zauberer", o: ["Die Soldaten","Die Zauberer","Die Gelehrten","Die Händler"] },
          { q: "Was bedeutet لَا تَخَفۡ?", a: "Fürchte dich nicht", o: ["Wirf nicht","Fürchte dich nicht","Geh nicht","Sprich nicht"] },
          { q: "Was geschah mit Mūsās Stab?", a: "Er verschlang, was sie gemacht hatten", o: ["Er zerbrach","Er verschlang, was sie gemacht hatten","Er verschwand","Er wurde zu Gold"] },
          { q: "Was taten die Zauberer am Ende?", a: "Sie warfen sich nieder und glaubten", o: ["Sie flohen","Sie lachten","Sie warfen sich nieder und glaubten","Sie griffen Mūsā an"] },
          { q: "Was heißt ءَامَنَّا?", a: "Wir glauben", o: ["Wir gehen","Wir glauben","Wir werfen","Wir siegen"] },
        ],
      },
    },
    {
      motif: "meer",
      title: {"de":"Das Meer teilt sich"},
      source: {"de":"Sure ash-Shuʿarāʾ 26:52–67"},
      story: {
        de: [
          "Allah befahl Mūsā, mit den Kindern Israels in der Nacht fortzuziehen. Pharao verfolgte sie mit seinem ganzen Heer.",
          "Am Ufer des Meeres sahen sich beide Gruppen. Die Gefährten von Mūsā riefen: Wir werden eingeholt!",
          "Doch Mūsā sagte: Keineswegs! Mein Herr ist mit mir, Er wird mich leiten.",
          "Allah gab ihm ein: Schlag mit deinem Stab auf das Meer. Da spaltete es sich, und jeder Teil war wie ein gewaltiger Berg. Allah rettete Mūsā und alle, die mit ihm waren, und Pharao und sein Heer ertranken.",
        ],
      },
      ayat: [
        { ref: "26:61", gaps: [{ i: 7 }],
          w: { de: ["und als","sich sahen","die beiden Scharen","sagten","die Gefährten","von Mūsā","gewiss, wir","werden eingeholt"] } },
        { ref: "26:62", gaps: [{ i: 4 }, { i: 5 }],
          w: { de: ["er sagte","keineswegs","gewiss","mit mir ist","mein Herr","Er wird mich leiten"] } },
        { ref: "26:63", gaps: [{ i: 5 }, { i: 6 }],
          w: { de: ["da gaben Wir ein","an","Mūsā","dass","schlag","mit deinem Stab","das Meer","da spaltete es sich","und es war","jeder","Teil","wie ein Berg","gewaltig"] } },
        { ref: "26:65", gaps: [{ i: 0 }],
          w: { de: ["und Wir retteten","Mūsā","und wer","mit ihm war","allesamt"] } },
      ],
      quiz: {
        de: [
          { q: "Was riefen die Gefährten von Mūsā, als sie Pharaos Heer sahen?", a: "Wir werden eingeholt!", o: ["Wir werden eingeholt!","Wir kämpfen!","Wir kehren um!","Wir sind gerettet!"] },
          { q: "Was antwortete Mūsā?", a: "Mein Herr ist mit mir, Er wird mich leiten", o: ["Lauft schnell weg","Mein Herr ist mit mir, Er wird mich leiten","Wir bauen ein Schiff","Ergebt euch"] },
          { q: "Was bedeutet ٱلۡبَحۡر?", a: "Das Meer", o: ["Der Berg","Das Meer","Der Stab","Der Weg"] },
          { q: "Wie sahen die geteilten Wasser aus?", a: "Wie gewaltige Berge", o: ["Wie Wolken","Wie gewaltige Berge","Wie Glas","Wie ein Fluss"] },
          { q: "Was heißt سَيَهۡدِينِ?", a: "Er wird mich leiten", o: ["Er wird mich retten","Er wird mich leiten","Er wird mich hören","Er wird mich lehren"] },
        ],
      },
    },
    {
      motif: "meere",
      title: {"de":"Mūsā und al-Khiḍr"},
      source: {"de":"Sure al-Kahf 18:60–70 · Hadith: Ṣaḥīḥ al-Bukhārī 122, Ṣaḥīḥ Muslim 2380"},
      story: {
        de: [
          "Der Prophet Muhammad ﷺ erzählte (Hadith bei al-Bukhārī und Muslim): Mūsā hielt eine Ansprache vor den Kindern Israels. Jemand fragte ihn: Wer ist der Wissendste unter den Menschen? Er sagte: Ich.",
          "Allah tadelte ihn, weil er das Wissen nicht Allah zuschrieb, und offenbarte ihm: Am Zusammenfluss der zwei Meere gibt es einen Diener von Mir, der mehr weiß als du.",
          "Mūsā machte sich mit seinem jungen Begleiter auf den Weg und sagte: Ich höre nicht auf, bis ich den Zusammenfluss der zwei Meere erreiche. Dort fanden sie einen Diener Allahs, dem Allah Barmherzigkeit und Wissen von Sich gegeben hatte.",
          "Mūsā fragte höflich: Darf ich dir folgen, damit du mich lehrst? Er antwortete: Du wirst mit mir keine Geduld haben. Mūsā versprach: Du wirst mich, so Allah will, geduldig finden. Wie es weitergeht, erfährst du in der Geschichte von al-Khiḍr.",
        ],
      },
      ayat: [
        { ref: "18:60", gaps: [{ i: 9 }],
          w: { de: ["und als","sagte","Mūsā","zu seinem Begleiter","nicht","höre ich auf","bis","ich erreiche","den Zusammenfluss","der beiden Meere","oder","ich ziehe weiter","lange Zeit"] } },
        { ref: "18:65", gaps: [{ i: 5 }, { i: 11 }],
          w: { de: ["da fanden sie","einen Diener","von","Unseren Dienern","Wir gaben ihm","Barmherzigkeit","von","bei Uns","und Wir lehrten ihn","von","Uns aus","Wissen"] } },
        { ref: "18:66", gaps: [{ i: 4 }, { i: 10 }],
          w: { de: ["sagte","zu ihm","Mūsā","darf","ich dir folgen","darauf","dass","du mich lehrst","von dem, was","dir gelehrt wurde","an rechter Leitung"] } },
        { ref: "18:67", gaps: [{ i: 5 }],
          w: { de: ["er sagte","gewiss, du","niemals","wirst du können","mit mir","Geduld haben"] } },
        { ref: "18:69", gaps: [{ i: 5 }, { i: 7 }],
          w: { de: ["er sagte","du wirst mich finden","wenn","will","Allah","geduldig","und nicht","widersetze ich mich","dir","in einer Sache"] } },
      ],
      quiz: {
        de: [
          { q: "Was antwortete Mūsā auf die Frage, wer der Wissendste sei?", a: "Ich", o: ["Allah weiß es","Ich","Hārūn","Pharao"] },
          { q: "Wo sollte Mūsā den wissenden Diener finden?", a: "Am Zusammenfluss der zwei Meere", o: ["Am Berg Ṭūr","In Madyan","Am Zusammenfluss der zwei Meere","Im Palast"] },
          { q: "Was bedeutet عِلۡم?", a: "Wissen", o: ["Geduld","Wissen","Barmherzigkeit","Meer"] },
          { q: "Was befürchtete der Diener Allahs bei Mūsā?", a: "Dass er keine Geduld haben wird", o: ["Dass er nicht lesen kann","Dass er keine Geduld haben wird","Dass er zu langsam ist","Dass er zurückkehrt"] },
          { q: "Was heißt صَابِر?", a: "Geduldig", o: ["Wissend","Geduldig","Ängstlich","Dankbar"] },
        ],
      },
    },
  ],
};
