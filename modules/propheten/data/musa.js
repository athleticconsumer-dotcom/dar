// =====================================================================
//  MŪSĀ (مُوسَىٰ) – 7 Level, chronologisch
//  Jedes Level: story (Erzählung) → ayat (Lückentext) → quiz
//  ayat: ref "Sure:Vers", gaps: Wortposition i (0 = erstes Wort, nach Leerzeichen getrennt)
//  Der Qur'an-Text selbst steht NICHT hier, sondern kommt geprüft aus ../ayat.json
//  (erzeugt mit tools/quran/build_ayat.py aus dem Tanzil-Text, Uthmani/Hafs).
// =====================================================================

export default {
  id: "musa",
  name: "Mūsā",
  ar: "مُوسَىٰ",
  title: "Die Geschichte von Mūsā",
  intro: "Mūsā (Moses) ist der Prophet, der im Qur'an am häufigsten erwähnt wird. Seine Geschichte beginnt in einem Korb auf dem Fluss und führt durch das geteilte Meer bis zu al-Khiḍr.",
  levels: [
    {
      title: "Ein Korb auf dem Fluss",
      motif: "wellen",
      source: "Sure al-Qaṣaṣ 28:3–13",
      story: [
        "In Ägypten herrschte Pharao (فِرْعَوْن) mit Gewalt. Er ließ die neugeborenen Jungen der Kinder Israels töten, weil er um seine Macht fürchtete.",
        "Als Mūsā geboren wurde, gab Allah seiner Mutter ein: Stille ihn. Und wenn du um ihn fürchtest, dann leg ihn in den Fluss. Fürchte dich nicht und sei nicht traurig, Wir bringen ihn zu dir zurück.",
        "Der Korb trieb bis zum Palast. Die Familie Pharaos nahm das Kind auf, und die Frau Pharaos (in der Überlieferung Āsiya genannt) bat darum, es nicht zu töten.",
        "Doch das Baby nahm von keiner Amme die Brust. Mūsās Schwester, die dem Korb gefolgt war, sagte: Soll ich euch eine Familie zeigen, die für ihn sorgt? So kam Mūsā zu seiner Mutter zurück, und Allahs Versprechen erfüllte sich.",
      ],
      ayat: [
        { ref: "28:7", gaps: [{ i: 11, de: "den Fluss (al-yamm)" }, { i: 13, de: "fürchte dich (nicht)" }] },
        { ref: "28:8", gaps: [{ i: 2, de: "Pharao" }] },
        { ref: "28:12", gaps: [{ i: 10, de: "ein Haus, eine Familie" }] },
        { ref: "28:13", gaps: [{ i: 2, de: "seine Mutter" }, { i: 7, de: "traurig sein" }] },
      ],
      quiz: [
        { q: "Wohin sollte Mūsās Mutter ihr Kind legen, wenn sie um es fürchtet?", a: "In den Fluss", o: ["In eine Höhle", "In den Fluss", "Zu den Nachbarn", "In den Palast"] },
        { q: "Was bedeutet ٱلۡيَمّ in dieser Geschichte?", a: "Der Fluss", o: ["Der Korb", "Die Mutter", "Der Fluss", "Das Haus"] },
        { q: "Warum kam Mūsā zu seiner Mutter zurück?", a: "Er nahm keine andere Amme an", o: ["Pharao schickte ihn weg", "Er nahm keine andere Amme an", "Er lief selbst nach Hause", "Seine Mutter holte ihn heimlich"] },
        { q: "Wer folgte dem Korb und half?", a: "Mūsās Schwester", o: ["Mūsās Bruder Hārūn", "Mūsās Schwester", "Ein Soldat", "Die Frau Pharaos"] },
        { q: "Was heißt لَا تَحۡزَنِي?", a: "Sei nicht traurig", o: ["Sei nicht traurig", "Geh nicht weg", "Hab keine Angst vor Wasser", "Sprich nicht"] },
      ],
    },
    {
      title: "Die Flucht nach Madyan",
      motif: "brunnen",
      source: "Sure al-Qaṣaṣ 28:14–28",
      story: [
        "Mūsā wuchs heran und wurde stark. Eines Tages sah er zwei Männer kämpfen: einen aus seinem Volk und einen von dessen Feinden. Mūsā schlug den Angreifer, und der Mann starb. Das hatte Mūsā nicht gewollt.",
        "Sofort bereute er und betete: Mein Herr, ich habe mir selbst Unrecht getan, so vergib mir. Und Allah vergab ihm.",
        "Ein Mann kam angelaufen und warnte ihn: Die Mächtigen beraten, dich zu töten. Mūsā floh voller Furcht in Richtung Madyan und bat Allah um Rettung.",
        "Am Wasser von Madyan sah er zwei Frauen, die ihre Tiere zurückhielten, weil ihr Vater ein alter Mann war. Mūsā tränkte ihre Tiere, setzte sich in den Schatten und betete: Mein Herr, ich bin bedürftig nach allem Guten, das Du mir herabsendest.",
      ],
      ayat: [
        { ref: "28:16", gaps: [{ i: 5, de: "so vergib" }, { i: 11, de: "der Allvergebende" }] },
        { ref: "28:21", gaps: [{ i: 2, de: "voller Furcht" }, { i: 6, de: "rette mich" }] },
        { ref: "28:23", gaps: [{ i: 2, de: "Wasser" }, { i: 13, de: "zwei Frauen" }] },
        { ref: "28:24", gaps: [{ i: 13, de: "Gutes" }, { i: 14, de: "bedürftig" }] },
      ],
      quiz: [
        { q: "Was tat Mūsā, nachdem der Mann gestorben war?", a: "Er bat Allah um Vergebung", o: ["Er versteckte sich im Palast", "Er bat Allah um Vergebung", "Er ging zu Pharao", "Er kämpfte weiter"] },
        { q: "Was bedeutet فَٱغۡفِرۡ لِي?", a: "So vergib mir", o: ["So rette mich", "So vergib mir", "So hilf mir", "So lehre mich"] },
        { q: "Wem half Mūsā am Wasser von Madyan?", a: "Zwei Frauen", o: ["Einem alten Händler", "Zwei Frauen", "Den Soldaten", "Seinem Bruder"] },
        { q: "Warum mussten die Frauen selbst die Tiere tränken?", a: "Ihr Vater war ein alter Mann", o: ["Sie hatten kein Seil", "Ihr Vater war ein alter Mann", "Der Brunnen war verboten", "Sie waren fremd"] },
        { q: "Was heißt فَقِير im Bittgebet von Mūsā?", a: "Bedürftig", o: ["Reich", "Müde", "Bedürftig", "Allein"] },
      ],
    },
    {
      title: "Das Feuer am Berg",
      motif: "feuer",
      source: "Sure Ṭā-Hā 20:9–23",
      story: [
        "Nach Jahren in Madyan reiste Mūsā mit seiner Familie zurück. In einer kalten Nacht sah er in der Ferne ein Feuer. Er sagte: Bleibt hier. Vielleicht bringe ich euch etwas Glut, oder ich finde am Feuer jemanden, der uns den Weg zeigt.",
        "Als er hinkam, rief ihn Allah: Ich bin dein Herr. Zieh deine Sandalen aus, du bist im heiligen Tal Ṭuwā.",
        "Ich bin Allah, es gibt keinen Gott außer Mir. So diene Mir und verrichte das Gebet, um Meiner zu gedenken.",
        "Dann fragte Allah: Was ist das in deiner Rechten, o Mūsā? Er antwortete: Das ist mein Stab. Ich stütze mich darauf und schlage damit Laub für meine Schafe herab. Auf Allahs Befehl warf er ihn hin, und er wurde zu einer sich bewegenden Schlange.",
      ],
      ayat: [
        { ref: "20:10", gaps: [{ i: 2, de: "ein Feuer" }, { i: 17, de: "Rechtleitung, Wegweisung" }] },
        { ref: "20:12", gaps: [{ i: 4, de: "deine beiden Sandalen" }, { i: 7, de: "heilig" }] },
        { ref: "20:14", gaps: [{ i: 7, de: "so diene Mir" }, { i: 9, de: "das Gebet" }] },
        { ref: "20:17", gaps: [{ i: 2, de: "in deiner Rechten" }] },
        { ref: "20:18", gaps: [{ i: 2, de: "mein Stab" }, { i: 8, de: "meine Schafe" }] },
      ],
      quiz: [
        { q: "Was sah Mūsā in der Nacht?", a: "Ein Feuer", o: ["Einen Stern", "Ein Feuer", "Einen Engel", "Eine Stadt"] },
        { q: "Was sollte Mūsā im heiligen Tal tun?", a: "Seine Sandalen ausziehen", o: ["Seinen Stab ablegen", "Seine Sandalen ausziehen", "Schweigen", "Zurückgehen"] },
        { q: "Wie heißt das heilige Tal?", a: "Ṭuwā", o: ["Madyan", "Ṭuwā", "Sīnā", "Badr"] },
        { q: "Was bedeutet عَصَايَ?", a: "Mein Stab", o: ["Meine Schafe", "Mein Stab", "Meine Hand", "Mein Weg"] },
        { q: "Was bedeutet ٱلصَّلَوٰة?", a: "Das Gebet", o: ["Das Fasten", "Das Gebet", "Das Wissen", "Die Geduld"] },
      ],
    },
    {
      title: "Der Auftrag: Geh zu Pharao",
      motif: "rolle",
      source: "Sure Ṭā-Hā 20:24–44",
      story: [
        "Allah gab Mūsā einen schweren Auftrag: Geh zu Pharao, denn er hat jedes Maß überschritten.",
        "Mūsā bat um Hilfe mit einem Bittgebet, das Muslime bis heute sprechen: Mein Herr, weite mir meine Brust, erleichtere mir meine Aufgabe und löse den Knoten von meiner Zunge, damit sie meine Rede verstehen.",
        "Er bat auch darum, dass sein Bruder Hārūn ihm zur Seite steht, und Allah erfüllte seine Bitte.",
        "Dann sagte Allah zu beiden: Sprecht zu ihm mit sanften Worten. Vielleicht besinnt er sich oder fürchtet sich. Selbst zu einem Tyrannen sollte man zuerst freundlich sprechen.",
      ],
      ayat: [
        { ref: "20:24", gaps: [{ i: 0, de: "geh" }, { i: 4, de: "er hat das Maß überschritten" }] },
        { ref: "20:25", gaps: [{ i: 4, de: "meine Brust" }] },
        { ref: "20:26", gaps: [{ i: 2, de: "meine Aufgabe, meine Angelegenheit" }] },
        { ref: "20:27", gaps: [{ i: 3, de: "meine Zunge" }] },
        { ref: "20:28", gaps: [{ i: 1, de: "meine Rede" }] },
        { ref: "20:44", gaps: [{ i: 3, de: "sanft, mild" }] },
      ],
      quiz: [
        { q: "Zu wem sollte Mūsā gehen?", a: "Zu Pharao", o: ["Zu Pharao", "Nach Madyan", "Zu den Zauberern", "Zum Meer"] },
        { q: "Was bedeutet رَبِّ ٱشۡرَحۡ لِي صَدۡرِي?", a: "Mein Herr, weite mir meine Brust", o: ["Mein Herr, rette mich", "Mein Herr, weite mir meine Brust", "Mein Herr, vergib mir", "Mein Herr, gib mir Wissen"] },
        { q: "Wen wünschte sich Mūsā als Helfer?", a: "Seinen Bruder Hārūn", o: ["Seine Mutter", "Seinen Bruder Hārūn", "al-Khiḍr", "Seinen Diener"] },
        { q: "Was heißt لِسَانِي?", a: "Meine Zunge", o: ["Meine Brust", "Meine Rede", "Meine Zunge", "Mein Herz"] },
        { q: "Wie sollten Mūsā und Hārūn mit Pharao sprechen?", a: "Mit sanften Worten", o: ["Laut und streng", "Gar nicht", "Mit sanften Worten", "Nur schriftlich"] },
      ],
    },
    {
      title: "Die Zauberer",
      motif: "stab",
      source: "Sure Ṭā-Hā 20:56–73",
      story: [
        "Pharao nannte Mūsā einen Zauberer und rief die besten Zauberer des Landes zu einem großen Festtag zusammen.",
        "Sie fragten: O Mūsā, wirfst du zuerst, oder sollen wir die Ersten sein? Ihre Seile und Stäbe schienen sich wie Schlangen zu bewegen, und Mūsā spürte Furcht in sich.",
        "Allah sagte: Fürchte dich nicht, du bist der Überlegene. Wirf, was in deiner Rechten ist. Es verschlingt, was sie gemacht haben. Ein Zauberer hat keinen Erfolg, wo er auch hinkommt.",
        "Der Stab verschlang alles. Da warfen sich die Zauberer nieder und sagten: Wir glauben an den Herrn von Hārūn und Mūsā. Sie erkannten als Erste, dass das kein Zauber war.",
      ],
      ayat: [
        { ref: "20:65", gaps: [{ i: 4, de: "du wirfst" }] },
        { ref: "20:68", gaps: [{ i: 2, de: "fürchte dich (nicht)" }, { i: 5, de: "der Überlegene" }] },
        { ref: "20:69", gaps: [{ i: 3, de: "deine Rechte" }, { i: 10, de: "eines Zauberers" }] },
        { ref: "20:70", gaps: [{ i: 2, de: "sich niederwerfend" }, { i: 4, de: "wir glauben" }] },
      ],
      quiz: [
        { q: "Wen rief Pharao gegen Mūsā zusammen?", a: "Die Zauberer", o: ["Die Soldaten", "Die Zauberer", "Die Gelehrten", "Die Händler"] },
        { q: "Was bedeutet لَا تَخَفۡ?", a: "Fürchte dich nicht", o: ["Wirf nicht", "Fürchte dich nicht", "Geh nicht", "Sprich nicht"] },
        { q: "Was geschah mit Mūsās Stab?", a: "Er verschlang, was sie gemacht hatten", o: ["Er zerbrach", "Er verschlang, was sie gemacht hatten", "Er verschwand", "Er wurde zu Gold"] },
        { q: "Was taten die Zauberer am Ende?", a: "Sie warfen sich nieder und glaubten", o: ["Sie flohen", "Sie lachten", "Sie warfen sich nieder und glaubten", "Sie griffen Mūsā an"] },
        { q: "Was heißt ءَامَنَّا?", a: "Wir glauben", o: ["Wir gehen", "Wir glauben", "Wir werfen", "Wir siegen"] },
      ],
    },
    {
      title: "Das Meer teilt sich",
      motif: "meer",
      source: "Sure ash-Shuʿarāʾ 26:52–67",
      story: [
        "Allah befahl Mūsā, mit den Kindern Israels in der Nacht fortzuziehen. Pharao verfolgte sie mit seinem ganzen Heer.",
        "Am Ufer des Meeres sahen sich beide Gruppen. Die Gefährten von Mūsā riefen: Wir werden eingeholt!",
        "Doch Mūsā sagte: Keineswegs! Mein Herr ist mit mir, Er wird mich leiten.",
        "Allah gab ihm ein: Schlag mit deinem Stab auf das Meer. Da spaltete es sich, und jeder Teil war wie ein gewaltiger Berg. Allah rettete Mūsā und alle, die mit ihm waren, und Pharao und sein Heer ertranken.",
      ],
      ayat: [
        { ref: "26:61", gaps: [{ i: 7, de: "wir werden eingeholt" }] },
        { ref: "26:62", gaps: [{ i: 4, de: "mein Herr" }, { i: 5, de: "Er wird mich leiten" }] },
        { ref: "26:63", gaps: [{ i: 5, de: "mit deinem Stab" }, { i: 6, de: "das Meer" }] },
        { ref: "26:65", gaps: [{ i: 0, de: "und Wir retteten" }] },
      ],
      quiz: [
        { q: "Was riefen die Gefährten von Mūsā, als sie Pharaos Heer sahen?", a: "Wir werden eingeholt!", o: ["Wir werden eingeholt!", "Wir kämpfen!", "Wir kehren um!", "Wir sind gerettet!"] },
        { q: "Was antwortete Mūsā?", a: "Mein Herr ist mit mir, Er wird mich leiten", o: ["Lauft schnell weg", "Mein Herr ist mit mir, Er wird mich leiten", "Wir bauen ein Schiff", "Ergebt euch"] },
        { q: "Was bedeutet ٱلۡبَحۡر?", a: "Das Meer", o: ["Der Berg", "Das Meer", "Der Stab", "Der Weg"] },
        { q: "Wie sahen die geteilten Wasser aus?", a: "Wie gewaltige Berge", o: ["Wie Wolken", "Wie gewaltige Berge", "Wie Glas", "Wie ein Fluss"] },
        { q: "Was heißt سَيَهۡدِينِ?", a: "Er wird mich leiten", o: ["Er wird mich retten", "Er wird mich leiten", "Er wird mich hören", "Er wird mich lehren"] },
      ],
    },
    {
      title: "Mūsā und al-Khiḍr",
      motif: "meere",
      source: "Sure al-Kahf 18:60–70 · Hadith: Ṣaḥīḥ al-Bukhārī 122, Ṣaḥīḥ Muslim 2380",
      story: [
        "Der Prophet Muhammad ﷺ erzählte (Hadith bei al-Bukhārī und Muslim): Mūsā hielt eine Ansprache vor den Kindern Israels. Jemand fragte ihn: Wer ist der Wissendste unter den Menschen? Er sagte: Ich.",
        "Allah tadelte ihn, weil er das Wissen nicht Allah zuschrieb, und offenbarte ihm: Am Zusammenfluss der zwei Meere gibt es einen Diener von Mir, der mehr weiß als du.",
        "Mūsā machte sich mit seinem jungen Begleiter auf den Weg und sagte: Ich höre nicht auf, bis ich den Zusammenfluss der zwei Meere erreiche. Dort fanden sie einen Diener Allahs, dem Allah Barmherzigkeit und Wissen von Sich gegeben hatte.",
        "Mūsā fragte höflich: Darf ich dir folgen, damit du mich lehrst? Er antwortete: Du wirst mit mir keine Geduld haben. Mūsā versprach: Du wirst mich, so Allah will, geduldig finden. Wie es weitergeht, erfährst du in der Geschichte von al-Khiḍr.",
      ],
      ayat: [
        { ref: "18:60", gaps: [{ i: 9, de: "der beiden Meere" }] },
        { ref: "18:65", gaps: [{ i: 5, de: "Barmherzigkeit" }, { i: 11, de: "Wissen" }] },
        { ref: "18:66", gaps: [{ i: 4, de: "ich folge dir" }, { i: 10, de: "rechte Leitung, gutes Wissen" }] },
        { ref: "18:67", gaps: [{ i: 5, de: "Geduld" }] },
        { ref: "18:69", gaps: [{ i: 5, de: "geduldig" }, { i: 7, de: "ich widersetze mich" }] },
      ],
      quiz: [
        { q: "Was antwortete Mūsā auf die Frage, wer der Wissendste sei?", a: "Ich", o: ["Allah weiß es", "Ich", "Hārūn", "Pharao"] },
        { q: "Wo sollte Mūsā den wissenden Diener finden?", a: "Am Zusammenfluss der zwei Meere", o: ["Am Berg Ṭūr", "In Madyan", "Am Zusammenfluss der zwei Meere", "Im Palast"] },
        { q: "Was bedeutet عِلۡم?", a: "Wissen", o: ["Geduld", "Wissen", "Barmherzigkeit", "Meer"] },
        { q: "Was befürchtete der Diener Allahs bei Mūsā?", a: "Dass er keine Geduld haben wird", o: ["Dass er nicht lesen kann", "Dass er keine Geduld haben wird", "Dass er zu langsam ist", "Dass er zurückkehrt"] },
        { q: "Was heißt صَابِر?", a: "Geduldig", o: ["Wissend", "Geduldig", "Ängstlich", "Dankbar"] },
      ],
    },
  ],
};
