// =====================================================================
//  RUBRIK: WURZEL & MUSTER (الجَذْرُ وَالمِيزَان) · Grammatik-Weg Level 2, Schritt 1
//  Tabs: Erklärung · Lernen · Aufgaben · Spiel (Wurzeljagd, 60 Sekunden)
//  Fortschritt: mastery: { <wort>: richtige }, huntBest
// =====================================================================
import { rnd, shuffle, esc, loadCss } from "../../js/shared.js";
import { makeT, L } from "../../js/i18n.js";
import DICT from "./lang.js";
import { ROOTS, WORDS, RAHMA, CATS, MASTER_AT, HUNT_SECONDS, HUNT_GOAL } from "./data.js";

const T = makeT(DICT);
const CL = /[ء-يٱ][ً-ْٰ]*/g;
const FAL = ["ف", "ع", "ل"];
const gl = (x) => L(x.g) || x.g.de;
const rootStr = (r) => r.join(" ");

/** Buchstaben-Gruppen eines Wortes + Positionen der drei Wurzelbuchstaben */
function split(w) {
  const cl = w.ar.match(CL); let k = 0; const idx = [];
  cl.forEach((c, i) => { if (k < 3 && c[0] === w.root.r[k]) { idx.push(i); k++; } });
  return { cl, idx };
}
/** Wort mit farbigen Wurzelbuchstaben */
const colored = (w) => { const { cl, idx } = split(w); return cl.map((c, i) => idx.includes(i) ? `<span class="jd-r${idx.indexOf(i) + 1}">${c}</span>` : c).join(""); };
/** Mīzān mit farbigem ف ع ل */
const coloredM = (m) => [...m.matchAll(CL)].map(([c]) => FAL.includes(c[0]) ? `<span class="jd-r${FAL.indexOf(c[0]) + 1}">${c}</span>` : c).join("");
const rootHtml = (r) => r.map((x, i) => `<span class="jd-r${i + 1}">${x}</span>`).join(" ");

const score = (p) => WORDS.reduce((s, w) => s + Math.min(p.mastery?.[w.id] || 0, MASTER_AT), 0) / (WORDS.length * MASTER_AT);

export default {
  percent(p) { return score(p) * 75 + (Math.min(p.huntBest || 0, HUNT_GOAL) / HUNT_GOAL) * 25; },
  summary(p) { return T("sum", { a: WORDS.filter((w) => (p.mastery?.[w.id] || 0) >= MASTER_AT).length, b: WORDS.length }); },
  extraStats(p) { return T("extra", { n: p.huntBest || 0 }); },
  milestones() { return [{ pct: 35, label: T("ms.roots") }, { pct: 75, label: T("ms.words") }, { pct: 100, label: T("ms.all") }]; },

  mount(root, api) {
    loadCss(import.meta.url, "style.css");
    const S = { tab: api.progress().answered ? "aufgaben" : "erklaerung", root: ROOTS[0].id, last: null, hunt: null };
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
      root.querySelectorAll("[data-tab]").forEach((b) => (b.onclick = () => { stop(); S.tab = b.dataset.tab; S.hunt = null; show(); }));
      root.querySelectorAll("[data-say]").forEach((b) => (b.onclick = () => api.speak(b.dataset.say)));
    }
    const card = (w, done) => `<button class="jd-card" data-say="${esc(w.ar)}">
      <span class="jd-w" lang="ar" dir="rtl">${colored(w)}</span>
      <span class="jd-m" lang="ar" dir="rtl">${coloredM(w.m)}</span>
      <small>${esc(gl(w))}${done ? " ✓" : ""}</small></button>`;

    // ---------------- Erklärung ----------------
    function erklaerung() {
      const ktb = ROOTS[0], kw = WORDS.filter((w) => w.root === ktb);
      const byCat = (c) => shuffle(WORDS.filter((w) => w.cat === c)).slice(0, 4);
      frame(`
        <div class="card explain">
          <h2>${T("h1")}</h2><p>${T("p1", { r: `<span class="jd-root" lang="ar" dir="rtl">${rootHtml(ktb.r)}</span>` })}</p>
          <div class="jd-cards" dir="rtl">${kw.map((w) => card(w)).join("")}</div>
          <p class="note">${T("p1b")}</p>
        </div>
        <div class="card explain">
          <h2>${T("h2")}</h2><p>${T("p2", { f: `<b class="jd-r1">ف</b>`, a: `<b class="jd-r2">ع</b>`, l: `<b class="jd-r3">ل</b>` })}</p>
          <div class="jd-weigh" dir="rtl">${kw.slice(0, 5).map((w) => `<button data-say="${esc(w.ar)}"><span lang="ar">${colored(w)}</span><i>←</i><span lang="ar">${coloredM(w.m)}</span></button>`).join("")}</div>
          <p class="note">${T("p2b")}</p>
        </div>
        <div class="card explain">
          <h2>${T("h3")}</h2><p>${T("p3")}</p>
          ${CATS.filter((c) => c !== "verb").map((c) => { const ws = byCat(c); return `
            <div class="jd-cat"><h3><span lang="ar" dir="rtl">${[...new Set(ws.map((w) => w.m))].map(coloredM).join(" · ")}</span> = ${T("cat." + c)}</h3>
            <div class="jd-chips" dir="rtl">${ws.map((w) => `<button data-say="${esc(w.ar)}"><span lang="ar">${colored(w)}</span><small dir="ltr">${esc(gl(w))}</small></button>`).join("")}</div></div>`; }).join("")}
        </div>
        <div class="card explain">
          <h2>${T("h4")}</h2><p>${T("p4", { ex: `<span class="jd-inline" lang="ar">${colored(WORDS.find((w) => w.id === "muhammad"))}</span>` })}</p>
        </div>
        <div class="card explain">
          <h2>${T("h5")}</h2><p>${T("p5", { r: `<span class="jd-root" lang="ar" dir="rtl">${rootHtml(["ر", "ح", "م"])}</span>` })}</p>
          <p class="jd-basmala" lang="ar" dir="rtl">بِسْمِ اللّٰهِ <span class="jd-hl">الرَّحْمٰنِ</span> <span class="jd-hl">الرَّحِيمِ</span></p>
          <div class="jd-chips" dir="rtl">${RAHMA.map((x) => `<button data-say="${esc(x.ar)}"><span lang="ar">${colored({ ar: x.ar, root: { r: ["ر", "ح", "م"] } })}</span><span class="jd-m" lang="ar">${coloredM(x.m)}</span><small dir="ltr">${T("k." + x.k)}</small></button>`).join("")}</div>
        </div>
        <div class="row center"><button class="btn primary" data-go>${T("toLearn")}</button></div>`);
      root.querySelector("[data-go]").onclick = () => { S.tab = "lernen"; show(); window.scrollTo(0, 0); };
    }

    // ---------------- Lernen ----------------
    function lernen() {
      const m = api.progress().mastery || {};
      const R = ROOTS.find((x) => x.id === S.root);
      frame(`<div class="card">
        <p class="note" style="text-align:center">${T("learnHint")}</p>
        <div class="jd-roots" dir="rtl">${ROOTS.map((x) => `<button data-root="${x.id}" aria-pressed="${x.id === S.root}"><span lang="ar">${rootStr(x.r)}</span><small dir="ltr">${esc(gl(x))}</small></button>`).join("")}</div>
        <div class="jd-head"><span class="jd-root big" lang="ar" dir="rtl">${rootHtml(R.r)}</span><span>${esc(gl(R))}</span></div>
        <div class="jd-cards" dir="rtl">${R.w.map((w) => card({ ...w, root: R }, (m[w.id] || 0) >= MASTER_AT)).join("")}</div>
      </div>`);
      root.querySelectorAll("[data-root]").forEach((b) => (b.onclick = () => { S.root = b.dataset.root; lernen(); }));
    }

    // ---------------- Aufgaben ----------------
    function rootOpts(w) {
      const { cl } = split(w);
      const base = cl.map((c) => c[0]);
      const cand = [base.slice(0, 3), base.slice(-3), base.filter((c, i) => i !== split(w).idx[1]).slice(0, 3)]
        .map((r) => r.join(" ")).concat(shuffle(ROOTS.filter((R) => R !== w.root)).map((R) => rootStr(R.r)));
      const right = rootStr(w.root.r);
      return shuffle([right, ...[...new Set(cand)].filter((r) => r !== right).slice(0, 3)]);
    }
    function makeTask() {
      const m = api.progress().mastery || {};
      const open = WORDS.filter((w) => (m[w.id] || 0) < MASTER_AT && w.id !== S.last);
      const pool = open.length ? open : WORDS.filter((w) => w.id !== S.last);
      const w = pool[rnd(0, pool.length - 1)];
      S.last = w.id;
      const types = ["root", "mizan", "build"]; if (w.cat) types.push("cat");
      const type = types[rnd(0, types.length - 1)];
      if (type === "root") {
        const r = rootStr(w.root.r);
        return { q: T("q.root"), big: w.ar, w, answer: r, why: T("e.root", { r: `<span lang="ar" class="ar">${rootHtml(w.root.r)}</span>` }),
          opts: rootOpts(w).map((o) => ({ v: o, html: o, a: 1 })) };
      }
      if (type === "mizan") {
        const others = shuffle([...new Set(WORDS.map((x) => x.m))].filter((x) => x !== w.m)).slice(0, 3);
        return { q: T("q.mizan"), big: w.ar, w, answer: w.m, why: T("e.mizan", { m: `<span lang="ar" class="ar">${coloredM(w.m)}</span>` }),
          opts: shuffle([w.m, ...others]).map((o) => ({ v: o, html: o, a: 1 })) };
      }
      if (type === "cat") return { q: T("q.cat", { m: `<span lang="ar" class="ar">${coloredM(w.m)}</span>` }), big: w.ar, w, answer: w.cat,
        why: T("e.cat", { m: `<span lang="ar" class="ar">${coloredM(w.m)}</span>`, c: T("cat." + w.cat), w: `<span lang="ar" class="ar">${w.ar}</span>`, g: esc(gl(w)) }),
        opts: CATS.map((c) => ({ v: c, html: T("cat." + c) })) };
      const same = [...w.root.w.filter((x) => x.id !== w.id), ...WORDS.filter((x) => x.m === w.m && x.id !== w.id)];
      const others = shuffle([...new Map(same.map((x) => [x.ar, x])).values()]).slice(0, 3);
      return { q: T("q.build", { r: `<span lang="ar" class="ar">${rootHtml(w.root.r)}</span>`, m: `<span lang="ar" class="ar">${coloredM(w.m)}</span>` }), w, answer: w.ar,
        why: T("e.build", { w: `<span lang="ar" class="ar">${w.ar}</span>`, g: esc(gl(w)) }),
        opts: shuffle([w, ...others]).map((x) => ({ v: x.ar, html: x.ar, a: 1 })) };
    }
    function aufgaben() {
      const k = makeTask();
      frame(`<div class="card jd-task">
        <p class="note jd-q" style="text-align:center">${k.q}</p>
        ${k.big ? `<button class="jd-big" data-say="${esc(k.big)}" lang="ar" dir="rtl">${k.big}</button>` : ""}
        <div class="opts">${k.opts.map((o) => `<button class="opt${o.a ? " arabic" : ""}" data-v="${esc(o.v)}" ${o.a ? 'lang="ar" dir="rtl"' : ""}>${o.html}</button>`).join("")}</div>
        <div class="feedback" aria-live="polite"></div>
        <div class="row center"><button class="btn primary" data-next hidden>${T("next")}</button></div>
      </div>`);
      root.querySelectorAll(".opt").forEach((b) => (b.onclick = () => {
        const ok = b.dataset.v === k.answer;
        root.querySelectorAll(".opt").forEach((x) => (x.disabled = true));
        b.classList.add(ok ? "ok" : "no");
        if (!ok) [...root.querySelectorAll(".opt")].find((x) => x.dataset.v === k.answer)?.classList.add("ok");
        api.answer(ok); if (ok) credit(k.w.id);
        autoSay(k.w.ar);
        const fb = root.querySelector(".feedback");
        fb.className = "feedback " + (ok ? "ok" : "no");
        fb.innerHTML = `${ok ? api.t("c.right") : api.t("c.wrong")} ${k.why}`;
        const nx = root.querySelector("[data-next]"); nx.hidden = false; nx.onclick = aufgaben; nx.focus({ preventScroll: true });
      }));
    }

    // ---------------- Spiel: Wurzeljagd ----------------
    const huntWord = (prev) => { let w; do { w = WORDS[rnd(0, WORDS.length - 1)]; } while (prev && w.id === prev.id); return { w, ...split(w), hit: [] }; };
    function spiel() {
      const best = api.progress().huntBest || 0;
      const G = S.hunt;
      if (!G) {
        frame(`<div class="card jd-game">
          <h2>${T("gTitle")}</h2><p class="note">${T("gHint", { n: HUNT_GOAL })}</p>
          <p class="jd-best">${T("gBest", { n: best })}${best >= HUNT_GOAL ? " ✓" : ""}</p>
          <div class="row center"><button class="btn primary" id="jdStart">${T("gStart")}</button></div>
        </div>`);
        root.querySelector("#jdStart").onclick = () => {
          S.hunt = { right: 0, wrong: 0, end: Date.now() + HUNT_SECONDS * 1000, item: huntWord() };
          stop();
          timer = setInterval(() => {
            const left = Math.max(0, Math.ceil((S.hunt.end - Date.now()) / 1000));
            const el = root.querySelector("#jdLeft"); if (el) el.textContent = T("gLeft", { s: left });
            const bar = root.querySelector(".jd-timebar i"); if (bar) bar.style.width = (left / HUNT_SECONDS) * 100 + "%";
            if (left <= 0) { stop(); S.hunt.done = true; api.update((p) => { p.huntBest = Math.max(p.huntBest || 0, S.hunt.right); }); spiel(); }
          }, 250);
          spiel();
        };
        return;
      }
      if (G.done) {
        frame(`<div class="card jd-game">
          <h2>${T("gTitle")}</h2>
          <div class="feedback ${G.right >= HUNT_GOAL ? "ok" : "no"}">${T("gEnd", { n: G.right, e: G.wrong })}</div>
          ${G.right >= HUNT_GOAL ? `<p class="jd-best">${T("gGoal", { n: HUNT_GOAL })}</p>` : ""}
          <p class="jd-best">${T("gBest", { n: best })}</p>
          <div class="row center"><button class="btn primary" id="jdAgain">${T("gAgain")}</button></div>
        </div>`);
        root.querySelector("#jdAgain").onclick = () => { S.hunt = null; spiel(); root.querySelector("#jdStart").click(); };
        return;
      }
      const left = Math.max(0, Math.ceil((G.end - Date.now()) / 1000));
      const it = G.item;
      frame(`<div class="card jd-game">
        <div class="jd-game-head"><span class="pill" id="jdLeft">${T("gLeft", { s: left })}</span><span class="pill">${T("gScore", { n: G.right })}</span></div>
        <div class="jd-timebar"><i style="width:${(left / HUNT_SECONDS) * 100}%"></i></div>
        <p class="note" style="text-align:center">${T("gTap")} · <small>${esc(gl(it.w))}</small></p>
        <div class="jd-letters" dir="rtl" lang="ar">${it.cl.map((c, i) => `<button data-i="${i}" class="${it.hit.includes(i) ? "jd-r" + (it.idx.indexOf(i) + 1) + " hit" : ""}" ${it.hit.includes(i) ? "disabled" : ""}>${c}</button>`).join("")}</div>
        <p class="jd-whole" lang="ar" dir="rtl">${it.w.ar}</p>
      </div>`);
      root.querySelectorAll(".jd-letters button").forEach((b) => (b.onclick = () => {
        const i = +b.dataset.i;
        if (it.idx.includes(i)) {
          it.hit.push(i);
          if (it.hit.length === 3) { G.right++; api.answer(true); credit(it.w.id); G.item = huntWord(it.w); }
          spiel();
        } else {
          G.wrong++; api.answer(false);
          b.classList.remove("shake"); void b.offsetWidth; b.classList.add("shake", "miss");
        }
      }));
    }

    function show() { ({ erklaerung, lernen, aufgaben, spiel })[S.tab](); }
    show();
    return stop;
  },
};
