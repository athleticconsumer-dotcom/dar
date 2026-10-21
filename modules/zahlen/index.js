// =====================================================================
//  RUBRIK: ZAHLEN  (الأَرْقَام)
//  Tabs: Erklärung · Lernen · Aufgaben · Spiel (Zahlen-Sprint)
//  Fortschritt (api.progress()):  mastery: { "<bereich>": richtige }, sprintBest
// =====================================================================
import { showWorksheets, toAr, rnd, shuffle, esc, loadCss, judge, AR_DIGITS } from "../../js/shared.js";
import { words, RANGES, MASTER_AT, pickIn, stepIn, inRange } from "./data.js";
import { makeT } from "../../js/i18n.js";
import DICT from "./lang.js";

const T = makeT(DICT);
const rl = (r) => (r.values ? T("range." + r.key) : r.label);   // Bereichsname in der aktuellen Sprache
const arS = (s) => `<span class="ar" lang="ar">${s}</span>`;

const SPRINT_SECONDS = 60;

export default {
  percent(p) {
    const m = p.mastery || {};
    return (RANGES.reduce((s, r) => s + Math.min(m[r.key] || 0, MASTER_AT), 0) / (RANGES.length * MASTER_AT)) * 100;
  },
  summary(p) {
    const m = p.mastery || {};
    return T("sum", { a: RANGES.filter((r) => (m[r.key] || 0) >= MASTER_AT).length, b: RANGES.length });
  },
  extraStats(p) { return T("record", { n: p.sprintBest || 0 }); },

  mount(root, api) {
    loadCss(import.meta.url, "style.css");
    const firstOpen = () => RANGES.find((r) => (api.progress().mastery?.[r.key] || 0) < MASTER_AT) || RANGES[RANGES.length - 1];
    const S = { tab: api.progress().answered ? "aufgaben" : "erklaerung", range: firstOpen(), n: 3 };
    let timer = null;
    const stopTimer = () => { clearInterval(timer); timer = null; };

    const credit = (rangeKey) => api.update((p) => { p.mastery = p.mastery || {}; p.mastery[rangeKey] = (p.mastery[rangeKey] || 0) + 1; });
    const mastery = (r) => Math.min(api.progress().mastery?.[r.key] || 0, MASTER_AT);
    const listenBtn = (text, label = T("listen")) => api.canSpeak() ? `<button class="btn" data-say="${esc(text)}">${label}</button>` : "";
    const bindSay = () => root.querySelectorAll("[data-say]").forEach((b) => (b.onclick = () => api.speak(b.dataset.say)));

    const chips = (withMastery) => `<div class="chips" role="group" aria-label="${T("rangeAria")}">${RANGES.map((r) => `
      <button class="chip" data-r="${r.key}" aria-pressed="${S.range.key === r.key}">${rl(r)}${withMastery ? ` <small class="z-m">${mastery(r) >= MASTER_AT ? "✓" : mastery(r) + "/" + MASTER_AT}</small>` : ""}</button>`).join("")}</div>`;
    const bindChips = (cb) => root.querySelectorAll(".chip[data-r]").forEach((b) => (b.onclick = () => { S.range = RANGES.find((r) => r.key === b.dataset.r); cb(); }));

    function frame(body) {
      root.innerHTML = `
        <div class="tabs" role="group" aria-label="${T("tabsAria")}">
          ${[["erklaerung", api.t("tab.explain")], ["lernen", api.t("tab.learn")], ["aufgaben", api.t("tab.tasks")], ["spiel", api.t("tab.game")], ["blaetter", api.t("tab.sheets")]]
            .map(([k, t]) => `<button data-tab="${k}" aria-pressed="${S.tab === k}">${t}</button>`).join("")}
        </div>${body}`;
      root.querySelectorAll("[data-tab]").forEach((b) => (b.onclick = () => { stopTimer(); S.tab = b.dataset.tab; show(); }));
    }

    // ---------------- Erklärung ----------------
    function erklaerung() {
      const ex = (n, note) => { const w = words(n); return `<div class="ex"><span class="a" lang="ar">${w.ar}</span><b>${n} · ${toAr(n)}</b><span class="t">${esc(w.tr)}${note ? " · " + note : ""}</span></div>`; };
      frame(`
        <div class="card explain">
          <h2>${T("h1")}</h2>
          <p>${T("p1")}</p>
          <div class="z-digits">${[...Array(10)].map((_, i) => `<div><span>${i}</span><span lang="ar">${AR_DIGITS[i]}</span></div>`).join("")}</div>
          <p class="note">${T("memo")}</p>
        </div>
        <div class="card explain">
          <h2>${T("h2")}</h2>
          <div class="z-grid">${[1,2,3,4,5,6,7,8,9,10].map((n) => ex(n)).join("")}</div>
        </div>
        <div class="card explain">
          <h2>${T("h3")}</h2>
          <p>${T("p3", { ashar: arS("عَشَرَ") })}</p>
          ${ex(11, T("special"))}${ex(12, T("special"))}${ex(13, T("n13"))}
        </div>
        <div class="card explain">
          <h2>${T("h4")}</h2>
          <p>${T("p4")}</p>
          <div class="z-grid">${[20,30,40,50].map((n) => ex(n)).join("")}</div>
        </div>
        <div class="card explain">
          <h2>${T("h5")}</h2>
          <p>${T("p5", { wa: arS("وَ") })}</p>
          ${ex(21, T("n21"))}${ex(47)}${ex(99)}
        </div>
        <div class="card explain">
          <h2>${T("h6")}</h2>
          <p>${T("p6", { mia: arS("مِئَة"), miatan: arS("مِئَتَان"), alf: arS("أَلْف"), alfan: arS("أَلْفَان"), alaf: arS("آلَاف") })}</p>
          ${ex(200, T("dual"))}${ex(350)}${ex(2026)}
        </div>
        <div class="card explain">
          <h2>${T("h7")}</h2>
          <p>${T("p7", { ex1: arS("ثَلَاثَةُ كُتُب"), ex2: arS("ثَلَاثُ سَاعَات"), kitab: arS("كِتَاب"), saa: arS("سَاعَة") })}</p>
        </div>
        <div class="row center"><button class="btn primary" data-go="lernen">${T("toLearn")}</button></div>`);
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
          <input type="range" id="zSlider" class="z-slider" min="0" max="${sliderMax}" value="${sliderVal}" aria-label="${T("slider")}">
          <div class="row center">
            <button class="btn" id="zPrev" aria-label="${T("prev")}">‹</button>
            ${listenBtn(w.ar)}
            <button class="btn" id="zNext" aria-label="${T("next")}">›</button>
            <button class="btn" id="zRand">${T("random")}</button>
          </div>
          <div class="row center"><label class="note" for="zAny">${T("any")}</label>
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
        prompt = `<p class="note">${T("qWord")}</p><div class="z-ar z-ar-big" lang="ar">${toAr(n)}</div>`;
        options = opts.map((o) => `<button class="opt arabic" lang="ar" dir="rtl" data-v="${o}">${words(o).ar}</button>`).join("");
      } else if (type === 1) {
        prompt = `<p class="note">${T("qNum")}</p><div class="z-word" lang="ar" dir="rtl">${w.ar}</div>`;
        options = opts.map((o) => `<button class="opt" data-v="${o}">${o}</button>`).join("");
      } else {
        prompt = `<p class="note">${T("qDigit")}</p><div class="z-num">${n}</div>`;
        options = opts.map((o) => `<button class="opt arabic" lang="ar" data-v="${o}">${toAr(o)}</button>`).join("");
      }
      frame(`
        <div class="card">
          ${chips(true)}
          <div class="hud"><span>${T("hudRange", { r: rl(r), m: mastery(r), max: MASTER_AT })}</span><span>${T("streak", { n: api.progress().streak })}</span></div>
          <div class="z-prompt">${prompt}</div>
          <div class="opts">${options}</div>
          <div class="feedback" aria-live="polite"></div>
          <div class="z-tr" id="zSol" hidden></div>
          <div class="row center">${listenBtn(w.ar)}<button class="btn primary" data-next hidden>${T("nextTask")}</button></div>
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
          <div class="z-sprint-title"><span lang="ar" dir="rtl">سِبَاق الأَرْقَام</span><h2>${T("sprint")}</h2></div>
          <p class="lead">${T("sprintDesc", { s: SPRINT_SECONDS, list: pool.map(rl).join(", ") })}</p>
          <div class="hud"><span>${T("yourRecord", { n: api.progress().sprintBest || 0 })}</span></div>
          <div class="row center"><button class="btn primary" id="zGo">${T("start")}</button></div>
        </div>`);
      root.querySelector("#zGo").onclick = () => run(pool);
    }
    function run(pool) {
      let left = SPRINT_SECONDS, score = 0, current = null;
      frame(`
        <div class="card z-sprint">
          <div class="hud"><span>${T("time", { n: left })}</span><span>${T("points")}</span></div>
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
            <div class="z-sprint-title"><span lang="ar" dir="rtl">${record ? "رَقْم قِيَاسِيّ جَدِيد!" : "أَحْسَنْت!"}</span><h2>${record ? T("newRecord") : T("timeUp")}</h2></div>
            <div class="z-board"><div class="z-num">${score}</div><div class="z-ar" lang="ar">${toAr(score)}</div></div>
            <p class="lead" style="text-align:center">${record ? T("strong") : T("recordIs", { n: best })} ${T("penalty")}</p>
            <div class="row center"><button class="btn primary" id="zAgain">${T("again")}</button></div>
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
