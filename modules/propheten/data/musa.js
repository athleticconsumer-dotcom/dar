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
  title: {"de":"Die Geschichte von Mūsā","en":"The Story of Mūsā"},
  intro: {"de":"Mūsā (Moses) ist der Prophet, der im Qur'an am häufigsten erwähnt wird. Seine Geschichte beginnt in einem Korb auf dem Fluss und führt durch das geteilte Meer bis zu al-Khiḍr.","en":"Mūsā (Moses) is the prophet mentioned most often in the Qur'an. His story begins in a basket on the river and leads through the parted sea to al-Khiḍr."},
  levels: [
    {
      motif: "wellen",
      title: {"de":"Ein Korb auf dem Fluss","en":"A Basket on the River"},
      source: {"de":"Sure al-Qaṣaṣ 28:3–13","en":"Surah al-Qaṣaṣ 28:3–13"},
      story: {
        de: [
          "In Ägypten herrschte Pharao (فِرْعَوْن) mit Gewalt. Er ließ die neugeborenen Jungen der Kinder Israels töten, weil er um seine Macht fürchtete.",
          "Als Mūsā geboren wurde, gab Allah seiner Mutter ein: Stille ihn. Und wenn du um ihn fürchtest, dann leg ihn in den Fluss. Fürchte dich nicht und sei nicht traurig, Wir bringen ihn zu dir zurück.",
          "Der Korb trieb bis zum Palast. Die Familie Pharaos nahm das Kind auf, und die Frau Pharaos (in der Überlieferung Āsiya genannt) bat darum, es nicht zu töten.",
          "Doch das Baby nahm von keiner Amme die Brust. Mūsās Schwester, die dem Korb gefolgt war, sagte: Soll ich euch eine Familie zeigen, die für ihn sorgt? So kam Mūsā zu seiner Mutter zurück, und Allahs Versprechen erfüllte sich.",
        ],
        en: [
          "In Egypt, Pharaoh (فِرْعَوْن) ruled by force. He had the newborn boys of the Children of Israel killed because he feared for his power.",
          "When Mūsā was born, Allah inspired his mother: Nurse him. And when you fear for him, place him in the river. Do not fear and do not grieve, We will return him to you.",
          "The basket drifted to the palace. Pharaoh's family took the child in, and Pharaoh's wife (called Āsiya in the tradition) asked them not to kill him.",
          "But the baby would not feed from any wet nurse. Mūsā's sister, who had followed the basket, said: Shall I show you a family who will take care of him? So Mūsā came back to his mother, and Allah's promise was fulfilled.",
        ],
      },
      ayat: [
        { ref: "28:7", gaps: [{ i: 11 }, { i: 13 }],
          w: {
            de: ["und Wir gaben ein","an","die Mutter","von Mūsā","dass","stille ihn","und wenn","du fürchtest","um ihn","dann wirf ihn","in","den Fluss","und nicht","fürchte dich","und nicht","sei traurig","gewiss, Wir","bringen ihn zurück","zu dir","und machen ihn","zu einem der","Gesandten"],
            en: ["and We inspired","to","the mother","of Mūsā","that","nurse him","and when","you fear","for him","then cast him","into","the river","and do not","fear","and do not","grieve","indeed, We","will return him","to you","and will make him","one of","the messengers"],
          } },
        { ref: "28:8", gaps: [{ i: 2 }],
          w: {
            de: ["da hob ihn auf","die Familie","von Pharao","damit er werde","für sie","ein Feind","und ein Kummer","gewiss","Pharao","und Hāmān","und ihre Heere","waren","im Unrecht"],
            en: ["then picked him up","the family","of Pharaoh","so that he would become","for them","an enemy","and a grief","indeed","Pharaoh","and Hāmān","and their soldiers","were","in error"],
          } },
        { ref: "28:12", gaps: [{ i: 10 }],
          w: {
            de: ["und Wir verwehrten","ihm","die Ammen","von","vorher","da sagte sie","soll","ich euch hinweisen","auf","die Leute","eines Hauses","die ihn versorgen","für euch","und sie","zu ihm","sind wohlgesinnt"],
            en: ["and We forbade","him","the wet nurses","from","before","then she said","shall","I direct you","to","the people","of a household","who will care for him","for you","and they","to him","are well-disposed"],
          } },
        { ref: "28:13", gaps: [{ i: 2 }, { i: 7 }],
          w: {
            de: ["so brachten Wir ihn zurück","zu","seiner Mutter","damit","sich freue","ihr Auge","und nicht","traurig sei","und damit sie wisse","dass","das Versprechen","Allahs","wahr ist","aber","die meisten von ihnen","nicht","wissen"],
            en: ["so We returned him","to","his mother","so that","may be comforted","her eye","and not","she grieve","and that she may know","that","the promise","of Allah","is true","but","most of them","do not","know"],
          } },
      ],
      quiz: {
        de: [
          { q: "Wohin sollte Mūsās Mutter ihr Kind legen, wenn sie um es fürchtet?", a: "In den Fluss", o: ["In eine Höhle","In den Fluss","Zu den Nachbarn","In den Palast"] },
          { q: "Was bedeutet ٱلۡيَمّ in dieser Geschichte?", a: "Der Fluss", o: ["Der Korb","Die Mutter","Der Fluss","Das Haus"] },
          { q: "Warum kam Mūsā zu seiner Mutter zurück?", a: "Er nahm keine andere Amme an", o: ["Pharao schickte ihn weg","Er nahm keine andere Amme an","Er lief selbst nach Hause","Seine Mutter holte ihn heimlich"] },
          { q: "Wer folgte dem Korb und half?", a: "Mūsās Schwester", o: ["Mūsās Bruder Hārūn","Mūsās Schwester","Ein Soldat","Die Frau Pharaos"] },
          { q: "Was heißt لَا تَحۡزَنِي?", a: "Sei nicht traurig", o: ["Sei nicht traurig","Geh nicht weg","Hab keine Angst vor Wasser","Sprich nicht"] },
        ],
        en: [
          { q: "Where was Mūsā's mother to put her child if she feared for him?", a: "Into the river", o: ["Into a cave","Into the river","With the neighbours","Into the palace"] },
          { q: "What does ٱلۡيَمّ mean in this story?", a: "The river", o: ["The basket","The mother","The river","The house"] },
          { q: "Why did Mūsā come back to his mother?", a: "He would not accept any other wet nurse", o: ["Pharaoh sent him away","He would not accept any other wet nurse","He walked home by himself","His mother fetched him secretly"] },
          { q: "Who followed the basket and helped?", a: "Mūsā's sister", o: ["Mūsā's brother Hārūn","Mūsā's sister","A soldier","Pharaoh's wife"] },
          { q: "What does لَا تَحۡزَنِي mean?", a: "Do not grieve", o: ["Do not grieve","Do not go away","Do not fear the water","Do not speak"] },
        ],
      },
    },
    {
      motif: "brunnen",
      title: {"de":"Die Flucht nach Madyan","en":"The Flight to Madyan"},
      source: {"de":"Sure al-Qaṣaṣ 28:14–28","en":"Surah al-Qaṣaṣ 28:14–28"},
      story: {
        de: [
          "Mūsā wuchs heran und wurde stark. Eines Tages sah er zwei Männer kämpfen: einen aus seinem Volk und einen von dessen Feinden. Mūsā schlug den Angreifer, und der Mann starb. Das hatte Mūsā nicht gewollt.",
          "Sofort bereute er und betete: Mein Herr, ich habe mir selbst Unrecht getan, so vergib mir. Und Allah vergab ihm.",
          "Ein Mann kam angelaufen und warnte ihn: Die Mächtigen beraten, dich zu töten. Mūsā floh voller Furcht in Richtung Madyan und bat Allah um Rettung.",
          "Am Wasser von Madyan sah er zwei Frauen, die ihre Tiere zurückhielten, weil ihr Vater ein alter Mann war. Mūsā tränkte ihre Tiere, setzte sich in den Schatten und betete: Mein Herr, ich bin bedürftig nach allem Guten, das Du mir herabsendest.",
        ],
        en: [
          "Mūsā grew up and became strong. One day he saw two men fighting: one from his own people and one from their enemies. Mūsā struck the attacker, and the man died. Mūsā had not intended this.",
          "He regretted it at once and prayed: My Lord, I have wronged myself, so forgive me. And Allah forgave him.",
          "A man came running and warned him: The chiefs are planning to kill you. Full of fear, Mūsā fled towards Madyan and asked Allah to save him.",
          "At the water of Madyan he saw two women holding back their animals, because their father was an old man. Mūsā watered their animals, sat down in the shade and prayed: My Lord, I am in need of whatever good You send down to me.",
        ],
      },
      ayat: [
        { ref: "28:16", gaps: [{ i: 5 }, { i: 11 }],
          w: {
            de: ["er sagte","mein Herr","gewiss, ich","habe Unrecht getan","mir selbst","so vergib","mir","da vergab Er","ihm","gewiss, Er","Er ist","der Allvergebende","der Barmherzige"],
            en: ["he said","my Lord","indeed, I","have wronged","myself","so forgive","me","so He forgave","him","indeed, He","He is","the Most Forgiving","the Most Merciful"],
          } },
        { ref: "28:21", gaps: [{ i: 2 }, { i: 6 }],
          w: {
            de: ["so ging er hinaus","aus ihr","voller Furcht","sich umschauend","er sagte","mein Herr","rette mich","vor","dem Volk","den Ungerechten"],
            en: ["so he left","from it","fearful","watching out","he said","my Lord","save me","from","the people","the wrongdoers"],
          } },
        { ref: "28:23", gaps: [{ i: 2 }, { i: 13 }],
          w: {
            de: ["und als","er ankam","am Wasser","von Madyan","fand er","dort","eine Gruppe","von","den Menschen","die tränkten","und er fand","abseits","von ihnen","zwei Frauen","die zurückhielten","er sagte","was","ist euer Anliegen","sie sagten","nicht","wir tränken","bis","wegtreiben","die Hirten","und unser Vater","ist ein Greis","hochbetagt"],
            en: ["and when","he arrived","at the water","of Madyan","he found","there","a group","of","the people","watering","and he found","apart","from them","two women","holding back","he said","what","is your matter","they said","not","we water","until","take away","the shepherds","and our father","is an old man","very aged"],
          } },
        { ref: "28:24", gaps: [{ i: 13 }, { i: 14 }],
          w: {
            de: ["da tränkte er","für sie beide","dann","wandte er sich","zu","dem Schatten","und sagte","mein Herr","gewiss, ich bin","für das, was","Du herabsendest","zu mir","an","Gutem","bedürftig"],
            en: ["so he watered","for them","then","he turned","to","the shade","and said","my Lord","indeed, I am","for whatever","You send down","to me","of","good","in need"],
          } },
      ],
      quiz: {
        de: [
          { q: "Was tat Mūsā, nachdem der Mann gestorben war?", a: "Er bat Allah um Vergebung", o: ["Er versteckte sich im Palast","Er bat Allah um Vergebung","Er ging zu Pharao","Er kämpfte weiter"] },
          { q: "Was bedeutet فَٱغۡفِرۡ لِي?", a: "So vergib mir", o: ["So rette mich","So vergib mir","So hilf mir","So lehre mich"] },
          { q: "Wem half Mūsā am Wasser von Madyan?", a: "Zwei Frauen", o: ["Einem alten Händler","Zwei Frauen","Den Soldaten","Seinem Bruder"] },
          { q: "Warum mussten die Frauen selbst die Tiere tränken?", a: "Ihr Vater war ein alter Mann", o: ["Sie hatten kein Seil","Ihr Vater war ein alter Mann","Der Brunnen war verboten","Sie waren fremd"] },
          { q: "Was heißt فَقِير im Bittgebet von Mūsā?", a: "Bedürftig", o: ["Reich","Müde","Bedürftig","Allein"] },
        ],
        en: [
          { q: "What did Mūsā do after the man had died?", a: "He asked Allah for forgiveness", o: ["He hid in the palace","He asked Allah for forgiveness","He went to Pharaoh","He kept fighting"] },
          { q: "What does فَٱغۡفِرۡ لِي mean?", a: "So forgive me", o: ["So save me","So forgive me","So help me","So teach me"] },
          { q: "Whom did Mūsā help at the water of Madyan?", a: "Two women", o: ["An old merchant","Two women","The soldiers","His brother"] },
          { q: "Why did the women have to water the animals themselves?", a: "Their father was an old man", o: ["They had no rope","Their father was an old man","The well was forbidden","They were strangers"] },
          { q: "What does فَقِير mean in Mūsā's prayer?", a: "In need", o: ["Rich","Tired","In need","Alone"] },
        ],
      },
    },
    {
      motif: "feuer",
      title: {"de":"Das Feuer am Berg","en":"The Fire on the Mountain"},
      source: {"de":"Sure Ṭā-Hā 20:9–23","en":"Surah Ṭā-Hā 20:9–23"},
      story: {
        de: [
          "Nach Jahren in Madyan reiste Mūsā mit seiner Familie zurück. In einer kalten Nacht sah er in der Ferne ein Feuer. Er sagte: Bleibt hier. Vielleicht bringe ich euch etwas Glut, oder ich finde am Feuer jemanden, der uns den Weg zeigt.",
          "Als er hinkam, rief ihn Allah: Ich bin dein Herr. Zieh deine Sandalen aus, du bist im heiligen Tal Ṭuwā.",
          "Ich bin Allah, es gibt keinen Gott außer Mir. So diene Mir und verrichte das Gebet, um Meiner zu gedenken.",
          "Dann fragte Allah: Was ist das in deiner Rechten, o Mūsā? Er antwortete: Das ist mein Stab. Ich stütze mich darauf und schlage damit Laub für meine Schafe herab. Auf Allahs Befehl warf er ihn hin, und er wurde zu einer sich bewegenden Schlange.",
        ],
        en: [
          "After years in Madyan, Mūsā travelled back with his family. On a cold night he saw a fire in the distance. He said: Stay here. Perhaps I can bring you a burning brand, or find someone at the fire who can show us the way.",
          "When he reached it, Allah called to him: I am your Lord. Take off your sandals, you are in the sacred valley of Ṭuwā.",
          "I am Allah, there is no god except Me. So worship Me and establish the prayer to remember Me.",
          "Then Allah asked: What is that in your right hand, O Mūsā? He answered: It is my staff. I lean on it and beat down leaves with it for my sheep. At Allah's command he threw it down, and it became a moving snake.",
        ],
      },
      ayat: [
        { ref: "20:10", gaps: [{ i: 2 }, { i: 17 }],
          w: {
            de: ["als","er sah","ein Feuer","da sagte er","zu seiner Familie","bleibt hier","gewiss, ich","habe bemerkt","ein Feuer","vielleicht","bringe ich euch","davon","eine Glut","oder","finde ich","an","dem Feuer","Wegweisung"],
            en: ["when","he saw","a fire","he said","to his family","stay here","indeed, I","have perceived","a fire","perhaps","I bring you","from it","a burning brand","or","I find","at","the fire","guidance"],
          } },
        { ref: "20:12", gaps: [{ i: 4 }, { i: 7 }],
          w: {
            de: ["gewiss, Ich","Ich bin","dein Herr","so zieh aus","deine Sandalen","gewiss, du bist","im Tal","dem heiligen","Ṭuwā"],
            en: ["indeed, I","I am","your Lord","so take off","your sandals","indeed, you are","in the valley","the sacred","Ṭuwā"],
          } },
        { ref: "20:14", gaps: [{ i: 7 }, { i: 9 }],
          w: {
            de: ["gewiss, Ich","Ich bin","Allah","kein","Gott","außer","Mir","so diene Mir","und verrichte","das Gebet","zu Meinem Gedenken"],
            en: ["indeed, I","I am","Allah","no","god","except","Me","so worship Me","and establish","the prayer","for My remembrance"],
          } },
        { ref: "20:17", gaps: [{ i: 2 }],
          w: {
            de: ["und was","ist das","in deiner Rechten","o Mūsā"],
            en: ["and what","is that","in your right hand","O Mūsā"],
          } },
        { ref: "20:18", gaps: [{ i: 2 }, { i: 8 }],
          w: {
            de: ["er sagte","es ist","mein Stab","ich stütze mich","auf ihn","und ich schlage Laub","mit ihm","für","meine Schafe","und ich habe","an ihm","Nutzen","weitere"],
            en: ["he said","it is","my staff","I lean","on it","and I beat down leaves","with it","for","my sheep","and I have","in it","uses","other"],
          } },
      ],
      quiz: {
        de: [
          { q: "Was sah Mūsā in der Nacht?", a: "Ein Feuer", o: ["Einen Stern","Ein Feuer","Einen Engel","Eine Stadt"] },
          { q: "Was sollte Mūsā im heiligen Tal tun?", a: "Seine Sandalen ausziehen", o: ["Seinen Stab ablegen","Seine Sandalen ausziehen","Schweigen","Zurückgehen"] },
          { q: "Wie heißt das heilige Tal?", a: "Ṭuwā", o: ["Madyan","Ṭuwā","Sīnā","Badr"] },
          { q: "Was bedeutet عَصَايَ?", a: "Mein Stab", o: ["Meine Schafe","Mein Stab","Meine Hand","Mein Weg"] },
          { q: "Was bedeutet ٱلصَّلَوٰة?", a: "Das Gebet", o: ["Das Fasten","Das Gebet","Das Wissen","Die Geduld"] },
        ],
        en: [
          { q: "What did Mūsā see in the night?", a: "A fire", o: ["A star","A fire","An angel","A city"] },
          { q: "What was Mūsā told to do in the sacred valley?", a: "Take off his sandals", o: ["Put down his staff","Take off his sandals","Stay silent","Go back"] },
          { q: "What is the name of the sacred valley?", a: "Ṭuwā", o: ["Madyan","Ṭuwā","Sīnā","Badr"] },
          { q: "What does عَصَايَ mean?", a: "My staff", o: ["My sheep","My staff","My hand","My way"] },
          { q: "What does ٱلصَّلَوٰة mean?", a: "The prayer", o: ["The fast","The prayer","The knowledge","The patience"] },
        ],
      },
    },
    {
      motif: "rolle",
      title: {"de":"Der Auftrag: Geh zu Pharao","en":"The Mission: Go to Pharaoh"},
      source: {"de":"Sure Ṭā-Hā 20:24–44","en":"Surah Ṭā-Hā 20:24–44"},
      story: {
        de: [
          "Allah gab Mūsā einen schweren Auftrag: Geh zu Pharao, denn er hat jedes Maß überschritten.",
          "Mūsā bat um Hilfe mit einem Bittgebet, das Muslime bis heute sprechen: Mein Herr, weite mir meine Brust, erleichtere mir meine Aufgabe und löse den Knoten von meiner Zunge, damit sie meine Rede verstehen.",
          "Er bat auch darum, dass sein Bruder Hārūn ihm zur Seite steht, und Allah erfüllte seine Bitte.",
          "Dann sagte Allah zu beiden: Sprecht zu ihm mit sanften Worten. Vielleicht besinnt er sich oder fürchtet sich. Selbst zu einem Tyrannen sollte man zuerst freundlich sprechen.",
        ],
        en: [
          "Allah gave Mūsā a heavy mission: Go to Pharaoh, for he has transgressed all bounds.",
          "Mūsā asked for help with a supplication that Muslims still recite today: My Lord, expand my chest for me, make my task easy for me and untie the knot from my tongue, so that they understand my speech.",
          "He also asked that his brother Hārūn stand by his side, and Allah granted his request.",
          "Then Allah said to both of them: Speak to him with gentle words. Perhaps he will take heed or fear. Even to a tyrant, one should first speak kindly.",
        ],
      },
      ayat: [
        { ref: "20:24", gaps: [{ i: 0 }, { i: 4 }],
          w: {
            de: ["geh","zu","Pharao","gewiss, er","hat das Maß überschritten"],
            en: ["go","to","Pharaoh","indeed, he","has transgressed"],
          } },
        { ref: "20:25", gaps: [{ i: 4 }],
          w: {
            de: ["er sagte","mein Herr","weite","mir","meine Brust"],
            en: ["he said","my Lord","expand","for me","my chest"],
          } },
        { ref: "20:26", gaps: [{ i: 2 }],
          w: {
            de: ["und erleichtere","mir","meine Aufgabe"],
            en: ["and make easy","for me","my task"],
          } },
        { ref: "20:27", gaps: [{ i: 3 }],
          w: {
            de: ["und löse","einen Knoten","von","meiner Zunge"],
            en: ["and untie","a knot","from","my tongue"],
          } },
        { ref: "20:28", gaps: [{ i: 1 }],
          w: {
            de: ["damit sie verstehen","meine Rede"],
            en: ["so they understand","my speech"],
          } },
        { ref: "20:44", gaps: [{ i: 3 }],
          w: {
            de: ["und sprecht beide","zu ihm","ein Wort","sanft","vielleicht er","besinnt sich","oder","fürchtet sich"],
            en: ["and speak, both of you","to him","a word","gentle","perhaps he","will take heed","or","fear"],
          } },
      ],
      quiz: {
        de: [
          { q: "Zu wem sollte Mūsā gehen?", a: "Zu Pharao", o: ["Zu Pharao","Nach Madyan","Zu den Zauberern","Zum Meer"] },
          { q: "Was bedeutet رَبِّ ٱشۡرَحۡ لِي صَدۡرِي?", a: "Mein Herr, weite mir meine Brust", o: ["Mein Herr, rette mich","Mein Herr, weite mir meine Brust","Mein Herr, vergib mir","Mein Herr, gib mir Wissen"] },
          { q: "Wen wünschte sich Mūsā als Helfer?", a: "Seinen Bruder Hārūn", o: ["Seine Mutter","Seinen Bruder Hārūn","al-Khiḍr","Seinen Diener"] },
          { q: "Was heißt لِسَانِي?", a: "Meine Zunge", o: ["Meine Brust","Meine Rede","Meine Zunge","Mein Herz"] },
          { q: "Wie sollten Mūsā und Hārūn mit Pharao sprechen?", a: "Mit sanften Worten", o: ["Laut und streng","Gar nicht","Mit sanften Worten","Nur schriftlich"] },
        ],
        en: [
          { q: "To whom was Mūsā to go?", a: "To Pharaoh", o: ["To Pharaoh","To Madyan","To the magicians","To the sea"] },
          { q: "What does رَبِّ ٱشۡرَحۡ لِي صَدۡرِي mean?", a: "My Lord, expand my chest for me", o: ["My Lord, save me","My Lord, expand my chest for me","My Lord, forgive me","My Lord, give me knowledge"] },
          { q: "Whom did Mūsā wish for as a helper?", a: "His brother Hārūn", o: ["His mother","His brother Hārūn","al-Khiḍr","His servant"] },
          { q: "What does لِسَانِي mean?", a: "My tongue", o: ["My chest","My speech","My tongue","My heart"] },
          { q: "How were Mūsā and Hārūn to speak to Pharaoh?", a: "With gentle words", o: ["Loudly and harshly","Not at all","With gentle words","Only in writing"] },
        ],
      },
    },
    {
      motif: "stab",
      title: {"de":"Die Zauberer","en":"The Magicians"},
      source: {"de":"Sure Ṭā-Hā 20:56–73","en":"Surah Ṭā-Hā 20:56–73"},
      story: {
        de: [
          "Pharao nannte Mūsā einen Zauberer und rief die besten Zauberer des Landes zu einem großen Festtag zusammen.",
          "Sie fragten: O Mūsā, wirfst du zuerst, oder sollen wir die Ersten sein? Ihre Seile und Stäbe schienen sich wie Schlangen zu bewegen, und Mūsā spürte Furcht in sich.",
          "Allah sagte: Fürchte dich nicht, du bist der Überlegene. Wirf, was in deiner Rechten ist. Es verschlingt, was sie gemacht haben. Ein Zauberer hat keinen Erfolg, wo er auch hinkommt.",
          "Der Stab verschlang alles. Da warfen sich die Zauberer nieder und sagten: Wir glauben an den Herrn von Hārūn und Mūsā. Sie erkannten als Erste, dass das kein Zauber war.",
        ],
        en: [
          "Pharaoh called Mūsā a magician and gathered the best magicians of the land on a great festival day.",
          "They asked: O Mūsā, will you throw first, or shall we be the first? Their ropes and staffs seemed to move like snakes, and Mūsā felt fear within himself.",
          "Allah said: Do not fear, you will be the superior one. Throw what is in your right hand. It will swallow up what they have made. A magician does not succeed, wherever he goes.",
          "The staff swallowed everything. Then the magicians fell down in prostration and said: We believe in the Lord of Hārūn and Mūsā. They were the first to see that this was no magic.",
        ],
      },
      ayat: [
        { ref: "20:65", gaps: [{ i: 4 }],
          w: {
            de: ["sie sagten","o Mūsā","entweder","dass","du wirfst","oder","dass","wir sind","die Ersten","die","werfen"],
            en: ["they said","O Mūsā","either","that","you throw","or","that","we are","the first","who","throw"],
          } },
        { ref: "20:68", gaps: [{ i: 2 }, { i: 5 }],
          w: {
            de: ["Wir sagten","nicht","fürchte dich","gewiss, du","du bist","der Überlegene"],
            en: ["We said","do not","fear","indeed, you","you are","the superior"],
          } },
        { ref: "20:69", gaps: [{ i: 3 }, { i: 10 }],
          w: {
            de: ["und wirf","was","in","deiner Rechten","es verschlingt","was","sie gemacht haben","nur","sie machten","die List","eines Zauberers","und nicht","hat Erfolg","der Zauberer","wo auch immer","er hinkommt"],
            en: ["and throw","what","in","your right hand","it will swallow","what","they have made","only","they made","the trick","of a magician","and not","succeeds","the magician","wherever","he comes"],
          } },
        { ref: "20:70", gaps: [{ i: 2 }, { i: 4 }],
          w: {
            de: ["da wurden geworfen","die Zauberer","niederfallend","sie sagten","wir glauben","an den Herrn","von Hārūn","und Mūsā"],
            en: ["so were thrown down","the magicians","in prostration","they said","we believe","in the Lord","of Hārūn","and Mūsā"],
          } },
      ],
      quiz: {
        de: [
          { q: "Wen rief Pharao gegen Mūsā zusammen?", a: "Die Zauberer", o: ["Die Soldaten","Die Zauberer","Die Gelehrten","Die Händler"] },
          { q: "Was bedeutet لَا تَخَفۡ?", a: "Fürchte dich nicht", o: ["Wirf nicht","Fürchte dich nicht","Geh nicht","Sprich nicht"] },
          { q: "Was geschah mit Mūsās Stab?", a: "Er verschlang, was sie gemacht hatten", o: ["Er zerbrach","Er verschlang, was sie gemacht hatten","Er verschwand","Er wurde zu Gold"] },
          { q: "Was taten die Zauberer am Ende?", a: "Sie warfen sich nieder und glaubten", o: ["Sie flohen","Sie lachten","Sie warfen sich nieder und glaubten","Sie griffen Mūsā an"] },
          { q: "Was heißt ءَامَنَّا?", a: "Wir glauben", o: ["Wir gehen","Wir glauben","Wir werfen","Wir siegen"] },
        ],
        en: [
          { q: "Whom did Pharaoh gather against Mūsā?", a: "The magicians", o: ["The soldiers","The magicians","The scholars","The merchants"] },
          { q: "What does لَا تَخَفۡ mean?", a: "Do not fear", o: ["Do not throw","Do not fear","Do not go","Do not speak"] },
          { q: "What happened to Mūsā's staff?", a: "It swallowed what they had made", o: ["It broke","It swallowed what they had made","It disappeared","It turned into gold"] },
          { q: "What did the magicians do in the end?", a: "They prostrated and believed", o: ["They fled","They laughed","They prostrated and believed","They attacked Mūsā"] },
          { q: "What does ءَامَنَّا mean?", a: "We believe", o: ["We go","We believe","We throw","We win"] },
        ],
      },
    },
    {
      motif: "meer",
      title: {"de":"Das Meer teilt sich","en":"The Sea Parts"},
      source: {"de":"Sure ash-Shuʿarāʾ 26:52–67","en":"Surah ash-Shuʿarāʾ 26:52–67"},
      story: {
        de: [
          "Allah befahl Mūsā, mit den Kindern Israels in der Nacht fortzuziehen. Pharao verfolgte sie mit seinem ganzen Heer.",
          "Am Ufer des Meeres sahen sich beide Gruppen. Die Gefährten von Mūsā riefen: Wir werden eingeholt!",
          "Doch Mūsā sagte: Keineswegs! Mein Herr ist mit mir, Er wird mich leiten.",
          "Allah gab ihm ein: Schlag mit deinem Stab auf das Meer. Da spaltete es sich, und jeder Teil war wie ein gewaltiger Berg. Allah rettete Mūsā und alle, die mit ihm waren, und Pharao und sein Heer ertranken.",
        ],
        en: [
          "Allah commanded Mūsā to leave by night with the Children of Israel. Pharaoh pursued them with his whole army.",
          "At the shore of the sea the two groups saw each other. Mūsā's companions cried out: We will be overtaken!",
          "But Mūsā said: Not at all! My Lord is with me, He will guide me.",
          "Allah inspired him: Strike the sea with your staff. It split apart, and each part was like a huge mountain. Allah saved Mūsā and all who were with him, and Pharaoh and his army drowned.",
        ],
      },
      ayat: [
        { ref: "26:61", gaps: [{ i: 7 }],
          w: {
            de: ["und als","sich sahen","die beiden Scharen","sagten","die Gefährten","von Mūsā","gewiss, wir","werden eingeholt"],
            en: ["and when","saw each other","the two groups","said","the companions","of Mūsā","indeed, we","will be overtaken"],
          } },
        { ref: "26:62", gaps: [{ i: 4 }, { i: 5 }],
          w: {
            de: ["er sagte","keineswegs","gewiss","mit mir ist","mein Herr","Er wird mich leiten"],
            en: ["he said","not at all","indeed","with me is","my Lord","He will guide me"],
          } },
        { ref: "26:63", gaps: [{ i: 5 }, { i: 6 }],
          w: {
            de: ["da gaben Wir ein","an","Mūsā","dass","schlag","mit deinem Stab","das Meer","da spaltete es sich","und es war","jeder","Teil","wie ein Berg","gewaltig"],
            en: ["then We inspired","to","Mūsā","that","strike","with your staff","the sea","so it split","and was","each","part","like a mountain","huge"],
          } },
        { ref: "26:65", gaps: [{ i: 0 }],
          w: {
            de: ["und Wir retteten","Mūsā","und wer","mit ihm war","allesamt"],
            en: ["and We saved","Mūsā","and whoever","was with him","all together"],
          } },
      ],
      quiz: {
        de: [
          { q: "Was riefen die Gefährten von Mūsā, als sie Pharaos Heer sahen?", a: "Wir werden eingeholt!", o: ["Wir werden eingeholt!","Wir kämpfen!","Wir kehren um!","Wir sind gerettet!"] },
          { q: "Was antwortete Mūsā?", a: "Mein Herr ist mit mir, Er wird mich leiten", o: ["Lauft schnell weg","Mein Herr ist mit mir, Er wird mich leiten","Wir bauen ein Schiff","Ergebt euch"] },
          { q: "Was bedeutet ٱلۡبَحۡر?", a: "Das Meer", o: ["Der Berg","Das Meer","Der Stab","Der Weg"] },
          { q: "Wie sahen die geteilten Wasser aus?", a: "Wie gewaltige Berge", o: ["Wie Wolken","Wie gewaltige Berge","Wie Glas","Wie ein Fluss"] },
          { q: "Was heißt سَيَهۡدِينِ?", a: "Er wird mich leiten", o: ["Er wird mich retten","Er wird mich leiten","Er wird mich hören","Er wird mich lehren"] },
        ],
        en: [
          { q: "What did Mūsā's companions cry out when they saw Pharaoh's army?", a: "We will be overtaken!", o: ["We will be overtaken!","We will fight!","We will turn back!","We are saved!"] },
          { q: "What did Mūsā answer?", a: "My Lord is with me, He will guide me", o: ["Run away quickly","My Lord is with me, He will guide me","We will build a ship","Surrender"] },
          { q: "What does ٱلۡبَحۡر mean?", a: "The sea", o: ["The mountain","The sea","The staff","The way"] },
          { q: "What did the parted waters look like?", a: "Like huge mountains", o: ["Like clouds","Like huge mountains","Like glass","Like a river"] },
          { q: "What does سَيَهۡدِينِ mean?", a: "He will guide me", o: ["He will save me","He will guide me","He will hear me","He will teach me"] },
        ],
      },
    },
    {
      motif: "meere",
      title: {"de":"Mūsā und al-Khiḍr","en":"Mūsā and al-Khiḍr"},
      source: {"de":"Sure al-Kahf 18:60–70 · Hadith: Ṣaḥīḥ al-Bukhārī 122, Ṣaḥīḥ Muslim 2380","en":"Surah al-Kahf 18:60–70 · Hadith: Ṣaḥīḥ al-Bukhārī 122, Ṣaḥīḥ Muslim 2380"},
      story: {
        de: [
          "Der Prophet Muhammad ﷺ erzählte (Hadith bei al-Bukhārī und Muslim): Mūsā hielt eine Ansprache vor den Kindern Israels. Jemand fragte ihn: Wer ist der Wissendste unter den Menschen? Er sagte: Ich.",
          "Allah tadelte ihn, weil er das Wissen nicht Allah zuschrieb, und offenbarte ihm: Am Zusammenfluss der zwei Meere gibt es einen Diener von Mir, der mehr weiß als du.",
          "Mūsā machte sich mit seinem jungen Begleiter auf den Weg und sagte: Ich höre nicht auf, bis ich den Zusammenfluss der zwei Meere erreiche. Dort fanden sie einen Diener Allahs, dem Allah Barmherzigkeit und Wissen von Sich gegeben hatte.",
          "Mūsā fragte höflich: Darf ich dir folgen, damit du mich lehrst? Er antwortete: Du wirst mit mir keine Geduld haben. Mūsā versprach: Du wirst mich, so Allah will, geduldig finden. Wie es weitergeht, erfährst du in der Geschichte von al-Khiḍr.",
        ],
        en: [
          "The Prophet Muhammad ﷺ narrated (hadith in al-Bukhārī and Muslim): Mūsā was giving a sermon to the Children of Israel. Someone asked him: Who is the most knowledgeable of people? He said: I am.",
          "Allah rebuked him because he did not attribute the knowledge to Allah, and revealed to him: At the junction of the two seas there is a servant of Mine who knows more than you.",
          "Mūsā set out with his young companion and said: I will not stop until I reach the junction of the two seas. There they found a servant of Allah to whom Allah had given mercy and knowledge from Himself.",
          "Mūsā asked politely: May I follow you so that you teach me? He answered: You will not be able to have patience with me. Mūsā promised: You will find me patient, if Allah wills. What happens next, you will learn in the story of al-Khiḍr.",
        ],
      },
      ayat: [
        { ref: "18:60", gaps: [{ i: 9 }],
          w: {
            de: ["und als","sagte","Mūsā","zu seinem Begleiter","nicht","höre ich auf","bis","ich erreiche","den Zusammenfluss","der beiden Meere","oder","ich ziehe weiter","lange Zeit"],
            en: ["and when","said","Mūsā","to his young companion","not","will I stop","until","I reach","the junction","of the two seas","or","I continue","for a long time"],
          } },
        { ref: "18:65", gaps: [{ i: 5 }, { i: 11 }],
          w: {
            de: ["da fanden sie","einen Diener","von","Unseren Dienern","Wir gaben ihm","Barmherzigkeit","von","bei Uns","und Wir lehrten ihn","von","Uns aus","Wissen"],
            en: ["then they found","a servant","from","Our servants","We had given him","mercy","from","Us","and We had taught him","from","Our presence","knowledge"],
          } },
        { ref: "18:66", gaps: [{ i: 4 }, { i: 10 }],
          w: {
            de: ["sagte","zu ihm","Mūsā","darf","ich dir folgen","darauf","dass","du mich lehrst","von dem, was","dir gelehrt wurde","an rechter Leitung"],
            en: ["said","to him","Mūsā","may","I follow you","on condition","that","you teach me","from what","you have been taught","of right guidance"],
          } },
        { ref: "18:67", gaps: [{ i: 5 }],
          w: {
            de: ["er sagte","gewiss, du","niemals","wirst du können","mit mir","Geduld haben"],
            en: ["he said","indeed, you","never","will be able","with me","to have patience"],
          } },
        { ref: "18:69", gaps: [{ i: 5 }, { i: 7 }],
          w: {
            de: ["er sagte","du wirst mich finden","wenn","will","Allah","geduldig","und nicht","widersetze ich mich","dir","in einer Sache"],
            en: ["he said","you will find me","if","wills","Allah","patient","and not","will I disobey","you","in any matter"],
          } },
      ],
      quiz: {
        de: [
          { q: "Was antwortete Mūsā auf die Frage, wer der Wissendste sei?", a: "Ich", o: ["Allah weiß es","Ich","Hārūn","Pharao"] },
          { q: "Wo sollte Mūsā den wissenden Diener finden?", a: "Am Zusammenfluss der zwei Meere", o: ["Am Berg Ṭūr","In Madyan","Am Zusammenfluss der zwei Meere","Im Palast"] },
          { q: "Was bedeutet عِلۡم?", a: "Wissen", o: ["Geduld","Wissen","Barmherzigkeit","Meer"] },
          { q: "Was befürchtete der Diener Allahs bei Mūsā?", a: "Dass er keine Geduld haben wird", o: ["Dass er nicht lesen kann","Dass er keine Geduld haben wird","Dass er zu langsam ist","Dass er zurückkehrt"] },
          { q: "Was heißt صَابِر?", a: "Geduldig", o: ["Wissend","Geduldig","Ängstlich","Dankbar"] },
        ],
        en: [
          { q: "What did Mūsā answer when asked who was the most knowledgeable?", a: "I am", o: ["Allah knows best","I am","Hārūn","Pharaoh"] },
          { q: "Where was Mūsā to find the knowledgeable servant?", a: "At the junction of the two seas", o: ["At Mount Ṭūr","In Madyan","At the junction of the two seas","In the palace"] },
          { q: "What does عِلۡم mean?", a: "Knowledge", o: ["Patience","Knowledge","Mercy","Sea"] },
          { q: "What did the servant of Allah fear about Mūsā?", a: "That he would not have patience", o: ["That he could not read","That he would not have patience","That he was too slow","That he would turn back"] },
          { q: "What does صَابِر mean?", a: "Patient", o: ["Knowledgeable","Patient","Fearful","Grateful"] },
        ],
      },
    },
  ],
};
