// =====================================================================
//  RUBRIK: BESTIMMT & UNBESTIMMT (المَعْرِفَة وَالنَّكِرَة) · Grammatik-Weg Schritt 2
//  Tabs: Erklärung · Lernen · Aufgaben · Spiel (ال-Sprint, 60 Sekunden)
//  Fortschritt: mastery: { <nomen>: richtige }, sprintBest
// =====================================================================
import { rnd, shuffle, esc, loadCss } from "../../js/shared.js";
import { makeT, L } from "../../js/i18n.js";
import DICT from "./lang.js";
import { NOUNS, SPECIAL, IKHLAS, MASTER_AT, SPRINT_SECONDS, SPRINT_GOAL } from "./data.js";

const T = makeT(DICT);
const ar = (s, cls = "") => `<span class="ar ${cls}" lang="ar" dir="rtl">${s}</span>`;
const gl = (x, i) => (L(x.g) || x.g.de)[i];
/** falsche Form mit ال UND Tanwīn (für Fallen) */
const both = (x) => x.m.replace(/ُ(?=[^ُ]*$)/, "ٌ");
/** falsche Form ohne ال und ohne Tanwīn */
const bare = (x) => x.n.replace("ٌ", "ُ");

const score = (p) => NOUNS.reduce((s, x) => s + Math.min(p.mastery?.[x.id] || 0, MASTER_AT), 0) / (NOUNS.length * MASTER_AT);

export default {
  percent(p) { return score(p) * 75 + (Math.min(p.sprintBest || 0, SPRINT_GOAL) / SPRINT_GOAL) * 25; },
  summary(p) { return T("sum", { a: NOUNS.filter((x) => (p.mastery?.[x.id] || 0) >= MASTER_AT).length, b: NOUNS.length }); },
  extraStats(p) { return T("extra", { n: p.sprintBest || 0 }); },
  milestones() { return [{ pct: 35, label: T("ms.first") }, { pct: 75, label: T("ms.words") }, { pct: 100, label: T("ms.all") }]; },

  mount(root, api) {
    loadCss(import.meta.url, "style.css");
    const S = { tab: api.progress().answered ? "aufgaben" : "erklaerung", last: null, sprint: null };
    let timer = null;
    const stop = () => { clearInterval(timer); timer = null; };
    const credit = (id) => api.update((p) => { p.mastery = p.mastery || {}; p.mastery[id] = (p.mastery[id] || 0) + 1; });
    const autoSay = (t) => { if (api.canSpeak()) api.speak(t, { auto: true }); };

    function frame(body) {
      root.innerHTML = `
        <div class="tabs" role="group">
          ${[["erklaerung", api.t("tab.explain")], ["lernen", api.t("tab.learn")], ["aufgaben", api.t("tab.tasks")], ["spiel", api.t("tab.game")]]
            .map(([k, t]) => `<button data-tab="${k}" aria-pressed="${S.tab === k}">${t}</button>`).join("")}
        </div>${body}`;
      root.querySelectorAll("[data-tab]").forEach((b) => (b.onclick = () => { stop(); S.tab = b.dataset.tab; S.sprint = null; show(); }));
      root.querySelectorAll("[data-say]").forEach((b) => (b.onclick = () => api.speak(b.dataset.say)));
    }

    // ---------------- Erklärung ----------------
    function erklaerung() {
      const k = NOUNS[0];
      frame(`
        <div class="card explain">
          <h2>${T("h1")}</h2><p>${T("p1")}</p>
          <div class="tf-pair" dir="rtl">
            <button class="tf-box tf-n" data-say="${esc(k.n)}"><small dir="ltr">${T("nAr")}</small><span lang="ar">${k.n}</span><em dir="ltr">${k.nTr}</em><b dir="ltr">${esc(gl(k, 0))}</b><i dir="ltr">${T("nRule")}</i></button>
            <button class="tf-box tf-m" data-say="${esc(k.m)}"><small dir="ltr">${T("mAr")}</small><span lang="ar">${k.m}</span><em dir="ltr">${k.mTr}</em><b dir="ltr">${esc(gl(k, 1))}</b><i dir="ltr">${T("mRule")}</i></button>
          </div>
          <p class="tf-never">✗ ${T("never", { wrong: `<s lang="ar" class="ar">${both(k)}</s>` })}</p>
        </div>
        <div class="card explain">
          <h2>${T("h2")}</h2><p>${T("p2")}</p>
          <div class="tablewrap"><table class="ref tf-cases" dir="rtl"><tbody>
            ${[[k.n, k.m, "case1"], [k.acc, "الْكِتَابَ", "case2"], [k.gen, "الْكِتَابِ", "case3"]].map(([a, b, c]) => `
              <tr><td><button class="tf-n-t" data-say="${esc(a)}" lang="ar">${a}</button></td><td><button class="tf-m-t" data-say="${esc(b)}" lang="ar">${b}</button></td><td dir="ltr" class="tf-c">${T(c)}</td></tr>`).join("")}
          </tbody></table></div>
          <p class="note">${T("pause")}</p>
        </div>
        <div class="card explain">
          <h2>${T("h3")}</h2>
          <p>${T("p3", { ex1: ar("فِي الْبَيْتِ"), ex2: ar("وَالْقَمَرُ") })}</p>
        </div>
        <div class="card explain">
          <h2>${T("h4")}</h2>
          <p>${T("p4", { muhammad: ar("مُحَمَّدٌ") })}</p>
          <div class="tf-special" dir="rtl">${SPECIAL.map((x) => `<button data-say="${esc(x.ar)}"><span lang="ar">${x.ar}</span><small dir="ltr">${T("why." + x.why)}</small></button>`).join("")}</div>
        </div>
        <div class="card explain">
          <h2>${T("h5")}</h2><p>${T("p5")}</p>
          <div class="tf-ayat" dir="rtl" lang="ar">${IKHLAS.map((v) => `${v.w.map((w) => `<span class="${w.k ? "tf-k-" + w.k : ""}">${w.ar}</span>`).join(" ")} <span class="tf-num">﴿${"٠١٢٣٤٥٦٧٨٩"[v.a]}﴾</span>`).join(" ")}</div>
          <div class="tf-legend"><span class="tf-k-n">${T("legendN")}</span><span class="tf-k-m">${T("legendM")}</span><span class="tf-k-name">${T("legendName")}</span></div>
          <p class="tf-trans">${T("ikhlasTr")} <span class="note">(al-Ikhlāṣ 112:1–4)</span></p>
        </div>
        <div class="row center"><button class="btn primary" data-go>${T("toLearn")}</button></div>`);
      root.querySelector("[data-go]").onclick = () => { S.tab = "lernen"; show(); };
    }

    // ---------------- Lernen ----------------
    function lernen() {
      const m = api.progress().mastery || {};
      frame(`<div class="card">
        <p class="note" style="text-align:center">${T("tapHint")}</p>
        <div class="tf-head" dir="rtl"><span class="tf-n-t">${T("nAr")}</span><span class="tf-m-t">${T("mAr")}</span></div>
        <div class="tf-list">${NOUNS.map((x) => `
          <div class="tf-row" dir="rtl">
            <button data-say="${esc(x.n)}" class="tf-cell n"><span lang="ar">${x.n}</span><small dir="ltr">${esc(gl(x, 0))}</small></button>
            <button data-say="${esc(x.m)}" class="tf-cell m"><span lang="ar">${x.m}</span><small dir="ltr">${esc(gl(x, 1))}${(m[x.id] || 0) >= MASTER_AT ? " ✓" : ""}</small></button>
          </div>`).join("")}</div>
      </div>`);
    }

    // ---------------- Aufgaben ----------------
    function makeTask() {
      const m = api.progress().mastery || {};
      if (Math.random() < 0.15) {
        const s = SPECIAL[rnd(0, SPECIAL.length - 1)];
        return { q: T("q.which"), big: s.ar, credit: null, answer: "m", why: T("e." + s.why), opts: [{ v: "n", html: T("n") }, { v: "m", html: T("m") }] };
      }
      const open = NOUNS.filter((x) => (m[x.id] || 0) < MASTER_AT && x.id !== S.last);
      const pool = open.length ? open : NOUNS.filter((x) => x.id !== S.last);
      const x = pool[rnd(0, pool.length - 1)];
      S.last = x.id;
      const other = shuffle(NOUNS.filter((y) => y !== x))[0];
      const type = ["which", "def", "indef", "say"][rnd(0, 3)];
      if (type === "which") {
        const def = Math.random() < 0.5;
        return { q: T("q.which"), big: def ? x.m : x.n, credit: x.id, answer: def ? "m" : "n", why: T(def ? "e.al" : "e.tan"), opts: [{ v: "n", html: T("n") }, { v: "m", html: T("m") }] };
      }
      if (type === "def") return { q: T("q.def"), big: x.n, credit: x.id, answer: "ok", why: T("e.both"),
        opts: shuffle([{ v: "ok", html: x.m, a: 1 }, { v: "both", html: both(x), a: 1 }, { v: "bare", html: bare(x), a: 1 }, { v: "other", html: other.m, a: 1 }]) };
      if (type === "indef") return { q: T("q.indef"), big: x.m, credit: x.id, answer: "ok", why: T("e.both"),
        opts: shuffle([{ v: "ok", html: x.n, a: 1 }, { v: "both", html: both(x), a: 1 }, { v: "bare", html: bare(x), a: 1 }, { v: "other", html: other.n, a: 1 }]) };
      const def = Math.random() < 0.5;
      return { q: T("q.say"), latin: gl(x, def ? 1 : 0), credit: x.id, answer: "ok", why: T(def ? "e.al" : "e.tan"),
        opts: shuffle([{ v: "ok", html: def ? x.m : x.n, a: 1 }, { v: "flip", html: def ? x.n : x.m, a: 1 }, { v: "both", html: both(x), a: 1 }, { v: "other", html: def ? other.m : other.n, a: 1 }]) };
    }
    function aufgaben() {
      const k = makeTask();
      frame(`<div class="card tf-task">
        <p class="note" style="text-align:center">${esc(k.q)}</p>
        ${k.big ? `<button class="tf-big" data-say="${esc(k.big)}" lang="ar" dir="rtl">${k.big}</button>` : `<div class="tf-big-q">${esc(k.latin)}</div>`}
        <div class="opts">${k.opts.map((o) => `<button class="opt${o.a ? " arabic" : ""}" data-v="${o.v}" ${o.a ? 'lang="ar" dir="rtl"' : ""}>${o.html}</button>`).join("")}</div>
        <div class="feedback" aria-live="polite"></div>
        <div class="row center"><button class="btn primary" data-next hidden>${T("next")}</button></div>
      </div>`);
      root.querySelectorAll(".opt").forEach((b) => (b.onclick = () => {
        const ok = b.dataset.v === k.answer;
        root.querySelectorAll(".opt").forEach((x) => (x.disabled = true));
        b.classList.add(ok ? "ok" : "no");
        if (!ok) root.querySelector(`.opt[data-v="${k.answer}"]`)?.classList.add("ok");
        api.answer(ok); if (ok && k.credit) credit(k.credit);
        const said = root.querySelector(`.opt[data-v="${k.answer}"]`);
        autoSay(said && said.lang === "ar" ? said.textContent : k.big || "");
        const fb = root.querySelector(".feedback");
        fb.className = "feedback " + (ok ? "ok" : "no");
        fb.textContent = `${ok ? api.t("c.right") : api.t("c.wrong")} ${!ok && b.dataset.v === "both" ? T("e.both") : k.why}`;
        const nx = root.querySelector("[data-next]"); nx.hidden = false; nx.onclick = aufgaben; nx.focus({ preventScroll: true });
      }));
    }

    // ---------------- Spiel: ال-Sprint ----------------
    function sprintItem() {
      if (Math.random() < 0.2) { const s = SPECIAL[rnd(0, SPECIAL.length - 1)]; return { ar: s.ar, ans: "m", why: s.why }; }
      const x = NOUNS[rnd(0, NOUNS.length - 1)], def = Math.random() < 0.5;
      return { ar: def ? x.m : x.n, ans: def ? "m" : "n", id: x.id };
    }
    function spiel() {
      const best = api.progress().sprintBest || 0;
      const G = S.sprint;
      if (!G) {
        frame(`<div class="card tf-game">
          <h2>${T("gTitle")}</h2><p class="note">${T("gHint", { n: SPRINT_GOAL })}</p>
          <p class="tf-best">${T("gBest", { n: best })}${best >= SPRINT_GOAL ? " ✓" : ""}</p>
          <div class="row center"><button class="btn primary" id="tfStart">${T("gStart")}</button></div>
        </div>`);
        root.querySelector("#tfStart").onclick = () => {
          S.sprint = { right: 0, wrong: 0, end: Date.now() + SPRINT_SECONDS * 1000, item: sprintItem(), flash: null };
          stop();
          timer = setInterval(() => {
            const left = Math.max(0, Math.ceil((S.sprint.end - Date.now()) / 1000));
            const el = root.querySelector("#tfLeft"); if (el) el.textContent = T("gLeft", { s: left });
            const bar = root.querySelector(".tf-timebar i"); if (bar) bar.style.width = (left / SPRINT_SECONDS) * 100 + "%";
            if (left <= 0) { stop(); S.sprint.done = true; api.update((p) => { p.sprintBest = Math.max(p.sprintBest || 0, S.sprint.right); }); spiel(); }
          }, 250);
          spiel();
        };
        return;
      }
      if (G.done) {
        frame(`<div class="card tf-game">
          <h2>${T("gTitle")}</h2>
          <div class="feedback ${G.right >= SPRINT_GOAL ? "ok" : "no"}">${T("gEnd", { n: G.right, e: G.wrong })}</div>
          ${G.right >= SPRINT_GOAL ? `<p class="tf-best">${T("gGoal", { n: SPRINT_GOAL })}</p>` : ""}
          <p class="tf-best">${T("gBest", { n: best })}</p>
          <div class="row center"><button class="btn primary" id="tfAgain">${T("gAgain")}</button></div>
        </div>`);
        root.querySelector("#tfAgain").onclick = () => { S.sprint = null; spiel(); root.querySelector("#tfStart").click(); };
        return;
      }
      const left = Math.max(0, Math.ceil((G.end - Date.now()) / 1000));
      frame(`<div class="card tf-game">
        <div class="tf-game-head"><span class="pill" id="tfLeft">${T("gLeft", { s: left })}</span><span class="pill">${T("gScore", { n: G.right })}</span></div>
        <div class="tf-timebar"><i style="width:${(left / SPRINT_SECONDS) * 100}%"></i></div>
        <div class="tf-sprint-word${G.flash ? " " + G.flash : ""}" lang="ar" dir="rtl">${G.item.ar}</div>
        <div class="tf-sprint-btns" dir="rtl">
          <button class="opt tf-n-btn" data-a="n"><b>${T("n")}</b><small lang="ar">نَكِرَة</small></button>
          <button class="opt tf-m-btn" data-a="m"><b>${T("m")}</b><small lang="ar">مَعْرِفَة</small></button>
        </div>
      </div>`);
      root.querySelectorAll("[data-a]").forEach((b) => (b.onclick = () => {
        const ok = b.dataset.a === G.item.ans;
        api.answer(ok);
        if (ok) { G.right++; if (G.item.id) credit(G.item.id); } else G.wrong++;
        G.flash = ok ? "ok" : "no";
        G.item = sprintItem();
        spiel();
      }));
    }

    function show() { ({ erklaerung, lernen, aufgaben, spiel })[S.tab](); }
    show();
    return stop;
  },
};
