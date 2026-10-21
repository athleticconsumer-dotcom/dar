// =====================================================================
//  RUBRIK: ZAHLEN  (الأَرْقَام)
//  Tabs: Erklärung · Lernen · Aufgaben · Spiel (Zahlen-Sprint)
//  Fortschritt (api.progress()):  mastery: { "<bereich>": richtige }, sprintBest
// =====================================================================
import { showWorksheets, toAr, rnd, shuffle, esc, loadCss, judge, AR_DIGITS } from "../../js/shared.js";
import { words, RANGES, MASTER_AT, pickIn, stepIn, inRange } from "./data.js";

const SPRINT_SECONDS = 60;

export default {
  percent(p) {
    const m = p.mastery || {};
    return (RANGES.reduce((s, r) => s + Math.min(m[r.key] || 0, MASTER_AT), 0) / (RANGES.length * MASTER_AT)) * 100;
  },
  summary(p) {
    const m = p.mastery || {};
    return `${RANGES.filter((r) => (m[r.key] || 0) >= MASTER_AT).length} von ${RANGES.length} Bereichen`;
  },
  extraStats(p) { return `Sprint-Rekord ${p.sprintBest || 0}`; },

  mount(root, api) {
    loadCss(import.meta.url, "style.css");
    const firstOpen = () => RANGES.find((r) => (api.progress().mastery?.[r.key] || 0) < MASTER_AT) || RANGES[RANGES.length - 1];
    const S = { tab: api.progress().answered ? "aufgaben" : "erklaerung", range: firstOpen(), n: 3 };
    let timer = null;
    const stopTimer = () => { clearInterval(timer); timer = null; };

    const credit = (rangeKey) => api.update((p) => { p.mastery = p.mastery || {}; p.mastery[rangeKey] = (p.mastery[rangeKey] || 0) + 1; });
    const mastery = (r) => Math.min(api.progress().mastery?.[r.key] || 0, MASTER_AT);
    const listenBtn = (text, label = "🔊 Anhören") => api.canSpeak() ? `<button class="btn" data-say="${esc(text)}">${label}</button>` : "";
    const bindSay = () => root.querySelectorAll("[data-say]").forEach((b) => (b.onclick = () => api.speak(b.dataset.say)));

    const chips = (withMastery) => `<div class="chips" role="group" aria-label="Zahlenbereich">${RANGES.map((r) => `
      <button class="chip" data-r="${r.key}" aria-pressed="${S.range.key === r.key}">${r.label}${withMastery ? ` <small class="z-m">${mastery(r) >= MASTER_AT ? "✓" : mastery(r) + "/" + MASTER_AT}</small>` : ""}</button>`).join("")}</div>`;
    const bindChips = (cb) => root.querySelectorAll(".chip[data-r]").forEach((b) => (b.onclick = () => { S.range = RANGES.find((r) => r.key === b.dataset.r); cb(); }));

    function frame(body) {
      root.innerHTML = `
        <div class="tabs" role="group" aria-label="Bereich der Rubrik">
          ${[["erklaerung", "Erklärung"], ["lernen", "Lernen"], ["aufgaben", "Aufgaben"], ["spiel", "Spiel"], ["blaetter", "Arbeitsblätter"]]
            .map(([k, t]) => `<button data-tab="${k}" aria-pressed="${S.tab === k}">${t}</button>`).join("")}
        </div>${body}`;
      root.querySelectorAll("[data-tab]").forEach((b) => (b.onclick = () => { stopTimer(); S.tab = b.dataset.tab; show(); }));
    }

    // ---------------- Erklärung ----------------
    function erklaerung() {
      const ex = (n, note) => { const w = words(n); return `<div class="ex"><span class="a" lang="ar">${w.ar}</span><b>${n} · ${toAr(n)}</b><span class="t">${esc(w.tr)}${note ? " – " + note : ""}</span></div>`; };
      frame(`
        <div class="card explain">
          <h2>1 · Die Ziffern</h2>
          <p>Im arabischen Raum (Ägypten, Golfstaaten, Levante) benutzt man arabisch-indische Ziffern. Unsere „arabischen“ Ziffern 0–9 kommen ursprünglich daher. <b>Wichtig:</b> Zahlen werden auch im arabischen Text <b>von links nach rechts</b> geschrieben: ٢٠٢٦ = 2026.</p>
          <div class="z-digits">${[...Array(10)].map((_, i) => `<div><span>${i}</span><span lang="ar">${AR_DIGITS[i]}</span></div>`).join("")}</div>
          <p class="note">Merkhilfe: ٥ (5) sieht aus wie eine kleine Null, und die echte Null ٠ ist nur ein Punkt.</p>
        </div>
        <div class="card explain">
          <h2>2 · Eins bis zehn</h2>
          <div class="z-grid">${[1,2,3,4,5,6,7,8,9,10].map((n) => ex(n)).join("")}</div>
        </div>
        <div class="card explain">
          <h2>3 · Elf bis neunzehn</h2>
          <p>Wie im Deutschen: Einer + zehn. „Zehn“ heißt hier <span class="ar" lang="ar">عَشَرَ</span>. Elf und zwölf sind Sonderformen.</p>
          ${ex(11, "Sonderform")}${ex(12, "Sonderform")}${ex(13, "„drei-zehn“")}
        </div>
        <div class="card explain">
          <h2>4 · Zehner</h2>
          <p>Die Zehner enden auf <b>-ūn</b> und kommen meist von der Einerzahl: arbaʿa (4) → arbaʿūn (40). Nur 20 ist anders: ʿishrūn.</p>
          <div class="z-grid">${[20,30,40,50].map((n) => ex(n)).join("")}</div>
        </div>
        <div class="card explain">
          <h2>5 · 21 bis 99 – wie im Deutschen!</h2>
          <p>Erst die Einer, dann <span class="ar" lang="ar">وَ</span> (wa = „und“), dann die Zehner. Genau wie „einundzwanzig“.</p>
          ${ex(21, "„eins und zwanzig“")}${ex(47)}${ex(99)}
        </div>
        <div class="card explain">
          <h2>6 · Hunderter und Tausender</h2>
          <p><span class="ar" lang="ar">مِئَة</span> = 100. Für 200 gibt es den Dual <span class="ar" lang="ar">مِئَتَان</span> („zwei Hundert“). 300–900 werden zusammengeschrieben. Bei Tausend genauso: <span class="ar" lang="ar">أَلْف</span>, Dual <span class="ar" lang="ar">أَلْفَان</span>, ab 3000 der Plural <span class="ar" lang="ar">آلَاف</span>. Die Teile werden mit وَ verbunden, von groß nach klein.</p>
          ${ex(200, "Dual")}${ex(350)}${ex(2026)}
        </div>
        <div class="card explain">
          <h2>Ausblick: Zahl und Gezähltes</h2>
          <p>Wenn du Dinge zählst, nehmen die Zahlen 3–10 das <b>umgekehrte</b> Geschlecht des Wortes an: <span class="ar" lang="ar">ثَلَاثَةُ كُتُب</span> (drei Bücher, كِتَاب ist männlich), aber <span class="ar" lang="ar">ثَلَاثُ سَاعَات</span> (drei Stunden, سَاعَة ist weiblich). In dieser Rubrik üben wir zuerst die Zahlen selbst.</p>
        </div>
        <div class="row center"><button class="btn primary" data-go="lernen">Weiter zum Lernen →</button></div>`);
      root.querySelector("[data-go]").onclick = () => { S.tab = "lernen"; show(); };
    }

    // ---------------- Lernen ----------------
    function lernen() {
      if (!inRange(S.range, S.n)) S.n = S.range.values ? S.range.values[0] : S.range.min;
      const w = words(S.n), r = S.range;
      const sliderMax = r.values ? r.values.length - 1 : r.max - r.min;
      const sliderVal = r.values ? r.values.indexOf(S.n) : S.n - r.min;
      frame(`
        <div class="card">
          ${chips(false)}
          <div class="z-board">
            <div class="z-num">${S.n}</div>
            <div class="z-ar" lang="ar">${toAr(S.n)}</div>
          </div>
          <div class="z-word" lang="ar" dir="rtl">${w.ar}</div>
          <div class="z-tr">${esc(w.tr)}</div>
          <input type="range" id="zSlider" class="z-slider" min="0" max="${sliderMax}" value="${sliderVal}" aria-label="Zahl im Bereich wählen">
          <div class="row center">
            <button class="btn" id="zPrev" aria-label="Vorherige Zahl">‹</button>
            ${listenBtn(w.ar)}
            <button class="btn" id="zNext" aria-label="Nächste Zahl">›</button>
            <button class="btn" id="zRand">Zufall</button>
          </div>
          <div class="row center"><label class="note" for="zAny">Beliebige Zahl (0–9999)</label>
            <input type="number" id="zAny" class="z-input" min="0" max="9999" inputmode="numeric" value="${S.n}"></div>
        </div>`);
      bindChips(lernen); bindSay();
      root.querySelector("#zPrev").onclick = () => { S.n = stepIn(r, S.n, -1); lernen(); };
      root.querySelector("#zNext").onclick = () => { S.n = stepIn(r, S.n, 1); lernen(); };
      root.querySelector("#zRand").onclick = () => { S.n = pickIn(r); lernen(); };
      root.querySelector("#zSlider").oninput = (e) => { const v = +e.target.value; S.n = r.values ? r.values[v] : r.min + v; updateLive(); };
      root.querySelector("#zSlider").onchange = () => lernen();
      root.querySelector("#zAny").onchange = (e) => {
        const v = Math.max(0, Math.min(9999, parseInt(e.target.value, 10) || 0));
        S.n = v; S.range = RANGES.find((x) => inRange(x, v) && !x.values) || RANGES.find((x) => inRange(x, v)); lernen();
      };
      function updateLive() {   // beim Ziehen ohne Neuaufbau aktualisieren
        const w2 = words(S.n);
        root.querySelector(".z-num").textContent = S.n;
        root.querySelector(".z-ar").textContent = toAr(S.n);
        root.querySelector(".z-word").textContent = w2.ar;
        root.querySelector(".z-tr").textContent = w2.tr;
      }
    }

    // ---------------- Aufgaben ----------------
    function distractors(n, r) {
      const set = new Set([n]); let tries = 0;
      while (set.size < 4 && tries++ < 300) {
        const near = [1, -1, 2, -2, 10, -10, 100, -100, 1000][rnd(0, 8)];
        const c = Math.random() < 0.55 ? n + near : pickIn(r);
        if (c >= 0 && c <= 9999) set.add(c);
      }
      return shuffle([...set]);
    }
    function aufgaben() {
      const r = S.range, n = pickIn(r), w = words(n), type = rnd(0, 2), opts = distractors(n, r);
      let prompt, options;
      if (type === 0) {
        prompt = `<p class="note">Welches Wort passt zur Zahl?</p><div class="z-ar z-ar-big" lang="ar">${toAr(n)}</div>`;
        options = opts.map((o) => `<button class="opt arabic" lang="ar" dir="rtl" data-v="${o}">${words(o).ar}</button>`).join("");
      } else if (type === 1) {
        prompt = `<p class="note">Welche Zahl ist das?</p><div class="z-word" lang="ar" dir="rtl">${w.ar}</div>`;
        options = opts.map((o) => `<button class="opt" data-v="${o}">${o}</button>`).join("");
      } else {
        prompt = `<p class="note">Welche arabische Ziffer ist das?</p><div class="z-num">${n}</div>`;
        options = opts.map((o) => `<button class="opt arabic" lang="ar" data-v="${o}">${toAr(o)}</button>`).join("");
      }
      frame(`
        <div class="card">
          ${chips(true)}
          <div class="hud"><span>Bereich ${r.label}: <b>${mastery(r)}/${MASTER_AT}</b> gemeistert</span><span>Serie <b>${api.progress().streak}</b></span></div>
          <div class="z-prompt">${prompt}</div>
          <div class="opts">${options}</div>
          <div class="feedback" aria-live="polite"></div>
          <div class="z-tr" id="zSol" hidden></div>
          <div class="row center">${listenBtn(w.ar)}<button class="btn primary" data-next hidden>Nächste Aufgabe →</button></div>
        </div>`);
      bindChips(aufgaben); bindSay();
      root.querySelectorAll(".opt").forEach((b) => (b.onclick = () => judge({
        root, api, picked: b, correctValue: n, onNext: aufgaben,
        extra: (ok) => {
          if (ok) credit(r.key);
          const sol = root.querySelector("#zSol"); sol.hidden = false; sol.textContent = `${n} = ${w.tr}`;
          root.querySelector(".hud b").textContent = `${mastery(r)}/${MASTER_AT}`;
          root.querySelector(".hud span:last-child b").textContent = api.progress().streak;
        },
      })));
    }

    // ---------------- Spiel: Zahlen-Sprint ----------------
    function spiel() {
      const idx = RANGES.indexOf(firstOpen());
      const pool = RANGES.slice(0, Math.max(2, idx + 1));
      frame(`
        <div class="card z-sprint">
          <div class="z-sprint-title"><span lang="ar" dir="rtl">سِبَاق الأَرْقَام</span><h2>Zahlen-Sprint</h2></div>
          <p class="lead">${SPRINT_SECONDS} Sekunden. Du siehst ein arabisches Zahlwort – tippe so schnell wie möglich die richtige Zahl. Gemischt aus: ${pool.map((r) => r.label).join(", ")}.</p>
          <div class="hud"><span>Dein Rekord: <b>${api.progress().sprintBest || 0}</b></span></div>
          <div class="row center"><button class="btn primary" id="zGo">Sprint starten</button></div>
        </div>`);
      root.querySelector("#zGo").onclick = () => run(pool);
    }
    function run(pool) {
      let left = SPRINT_SECONDS, score = 0, current = null;
      frame(`
        <div class="card z-sprint">
          <div class="hud"><span>Zeit <b id="zT">${left}</b> s</span><span>Punkte <b id="zS">0</b></span></div>
          <div class="z-timebar"><i id="zTB"></i></div>
          <div class="z-word" id="zQ" lang="ar" dir="rtl"></div>
          <div class="opts" id="zO"></div>
        </div>`);
      const q = () => {
        const r = pool[rnd(0, pool.length - 1)], n = pickIn(r);
        current = { n, r };
        root.querySelector("#zQ").textContent = words(n).ar;
        root.querySelector("#zO").innerHTML = distractors(n, r).map((o) => `<button class="opt" data-v="${o}">${o}</button>`).join("");
        root.querySelectorAll("#zO .opt").forEach((b) => (b.onclick = () => {
          const ok = +b.dataset.v === current.n;
          api.answer(ok);
          if (ok) { score++; credit(current.r.key); root.querySelector("#zS").textContent = score; q(); }
          else { b.classList.add("no"); b.disabled = true; left = Math.max(0, left - 3); tick(true); }
        }));
      };
      const tick = (noDec) => {
        if (!noDec) left--;
        root.querySelector("#zT").textContent = left;
        root.querySelector("#zTB").style.width = (left / SPRINT_SECONDS) * 100 + "%";
        if (left <= 0) finish();
      };
      const finish = () => {
        stopTimer();
        const best = api.progress().sprintBest || 0, record = score > best;
        if (record) api.update((p) => { p.sprintBest = score; });
        frame(`
          <div class="card z-sprint">
            <div class="z-sprint-title"><span lang="ar" dir="rtl">${record ? "رَقْم قِيَاسِيّ جَدِيد!" : "أَحْسَنْت!"}</span><h2>${record ? "Neuer Rekord!" : "Zeit ist um"}</h2></div>
            <div class="z-board"><div class="z-num">${score}</div><div class="z-ar" lang="ar">${toAr(score)}</div></div>
            <p class="lead" style="text-align:center">${record ? "Stark – so viele hattest du noch nie." : `Dein Rekord liegt bei ${best}.`} Falsche Antworten kosten 3 Sekunden.</p>
            <div class="row center"><button class="btn primary" id="zAgain">Noch einmal</button></div>
          </div>`);
        root.querySelector("#zAgain").onclick = () => run(pool);
      };
      q(); tick(true);
      timer = setInterval(tick, 1000);
    }

    function blaetter() { frame(`<div id="wsRoot" style="display:flex;flex-direction:column;gap:16px"></div>`); showWorksheets(root.querySelector("#wsRoot"), import.meta.url); }

    function show() {
      ({ erklaerung, lernen, aufgaben, spiel, blaetter })[S.tab]();
    }
    show();
    return stopTimer;   // wird beim Verlassen der Rubrik aufgerufen
  },
};
