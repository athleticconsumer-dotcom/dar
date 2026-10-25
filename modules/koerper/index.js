// =====================================================================
//  RUBRIK: KÖRPER  (الجِسْم)
//  Tabs: Erklärung · Lernen (Figur zum Antippen) · Aufgaben · Spiel („Zeig mir …“)
//  Fortschritt: mastery: { <id>: richtige }, game: { face|body: bestes Ergebnis von 10 }
// =====================================================================
import { rnd, shuffle, esc, loadCss } from "../../js/shared.js";
import { makeT, L } from "../../js/i18n.js";
import DICT from "./lang.js";
import { WORDS, GROUPS, MASTER_AT, WUDU, SENSES } from "./data.js";

const T = makeT(DICT);
const W = (id) => WORDS.find((w) => w.id === id);
const ar = (s, cls = "") => `<span class="ar ${cls}" lang="ar" dir="rtl">${s}</span>`;
const ROUNDS = 10, PASS = 8, VIEWS = ["face", "body"];

const score = (p) => WORDS.reduce((s, w) => s + Math.min(p.mastery?.[w.id] || 0, MASTER_AT), 0) / (WORDS.length * MASTER_AT);
const figsDone = (p) => VIEWS.filter((v) => (p.game?.[v] || 0) >= PASS).length;

// ---------------- Figuren ----------------
const FACE = `
  <path d="M30 280 Q40 250 96 254 L144 254 Q200 250 210 280 Z" class="kp-cloth"/>
  <path d="M97 214 L97 258 Q120 268 143 258 L143 214 Z" class="kp-skin"/>
  <ellipse cx="42" cy="146" rx="14" ry="24" class="kp-skin"/><ellipse cx="198" cy="146" rx="14" ry="24" class="kp-skin"/>
  <ellipse cx="120" cy="140" rx="78" ry="96" class="kp-skin"/>
  <path d="M42 130 Q36 38 120 34 Q204 38 198 130 Q190 84 150 72 Q122 90 78 76 Q50 90 42 130 Z" class="kp-hair"/>
  <path d="M72 112 Q88 102 104 110" class="kp-line"/><path d="M136 110 Q152 102 168 112" class="kp-line"/>
  <ellipse cx="88" cy="130" rx="13" ry="8" class="kp-eye"/><circle cx="88" cy="130" r="5" class="kp-pupil"/>
  <ellipse cx="152" cy="130" rx="13" ry="8" class="kp-eye"/><circle cx="152" cy="130" r="5" class="kp-pupil"/>
  <path d="M118 128 Q110 160 106 170 Q120 180 134 170" class="kp-line"/>
  <circle cx="78" cy="182" r="13" class="kp-blush"/><circle cx="162" cy="182" r="13" class="kp-blush"/>
  <path d="M94 204 Q120 224 146 204 Q120 212 94 204 Z" class="kp-lips"/>`;
const BODY = `
  <path d="M70 112 L52 186 L44 250" class="kp-limb-o"/><path d="M170 112 L188 186 L196 250" class="kp-limb-o"/>
  <path d="M70 112 L52 186 L44 250" class="kp-limb"/><path d="M170 112 L188 186 L196 250" class="kp-limb"/>
  <ellipse cx="42" cy="268" rx="12" ry="16" class="kp-skin"/><ellipse cx="198" cy="268" rx="12" ry="16" class="kp-skin"/>
  <path d="M190 276 L188 292 M197 280 L197 296 M204 276 L206 290" class="kp-finger"/>
  <path d="M102 226 L95 330 L92 404" class="kp-leg-o"/><path d="M138 226 L145 330 L148 404" class="kp-leg-o"/>
  <path d="M102 226 L95 330 L92 404" class="kp-leg"/><path d="M138 226 L145 330 L148 404" class="kp-leg"/>
  <ellipse cx="84" cy="418" rx="22" ry="10" class="kp-skin"/><ellipse cx="156" cy="418" rx="22" ry="10" class="kp-skin"/>
  <rect x="108" y="72" width="24" height="24" rx="6" class="kp-skin"/>
  <path d="M80 96 Q120 86 160 96 Q178 102 178 122 L166 232 Q120 244 74 232 L62 122 Q62 102 80 96 Z" class="kp-cloth"/>
  <circle cx="120" cy="46" r="30" class="kp-skin"/>
  <path d="M90 46 Q88 14 120 14 Q152 14 150 46 Q142 26 120 28 Q98 26 90 46 Z" class="kp-hair"/>
  <path d="M139 152 C124 141 128 127 139 134 C150 127 154 141 139 152 Z" class="kp-heart"/>`;

function figure(view, opts = {}) {
  const pts = WORDS.filter((w) => w.pt?.v === view);
  const vb = view === "face" ? "0 0 240 280" : "0 0 240 440";
  return `<svg class="kp-fig kp-${view}" viewBox="${vb}" role="img" aria-label="${T("view." + view)}">
    ${view === "face" ? FACE : BODY}
    ${pts.map((w) => `<g class="kp-pt${opts.sel === w.id ? " sel" : ""}${opts.mark?.[w.id] ? " " + opts.mark[w.id] : ""}" data-pt="${w.id}" tabindex="0" role="button" aria-label="${esc(opts.hideLabels ? "?" : L(w.g))}" transform="translate(${w.pt.x} ${w.pt.y})">
      <circle r="14" class="kp-halo"/><circle r="6.5" class="kp-dot"/></g>`).join("")}
  </svg>`;
}

export default {
  percent(p) { return score(p) * 80 + (figsDone(p) / 2) * 20; },
  summary(p) { return T("sum", { a: WORDS.filter((w) => (p.mastery?.[w.id] || 0) >= MASTER_AT).length, b: WORDS.length }); },
  extraStats(p) { return T("extra", { a: figsDone(p) }); },
  milestones() {
    const n = (g) => WORDS.filter((w) => GROUPS.indexOf(w.grp) <= GROUPS.indexOf(g)).length;
    const pc = (k) => Math.round((k / WORDS.length) * 80);
    return [{ pct: pc(n("head")), label: T("ms.head") }, { pct: pc(n("body")), label: T("ms.body") }, { pct: 80, label: T("ms.inner") }, { pct: 100, label: T("ms.all") }];
  },

  mount(root, api) {
    loadCss(import.meta.url, "style.css");
    const S = { tab: api.progress().answered ? "aufgaben" : "erklaerung", view: "face", grp: "head", sel: null, last: null, game: null };
    let tmr = null;
    const credit = (id) => api.update((p) => { p.mastery = p.mastery || {}; p.mastery[id] = (p.mastery[id] || 0) + 1; });
    const autoSay = (text) => { if (api.canSpeak()) api.speak(text, { auto: true }); };

    function frame(body) {
      clearTimeout(tmr);
      root.innerHTML = `
        <div class="tabs" role="group">
          ${[["erklaerung", api.t("tab.explain")], ["lernen", api.t("tab.learn")], ["aufgaben", api.t("tab.tasks")], ["spiel", api.t("tab.game")]]
            .map(([k, t]) => `<button data-tab="${k}" aria-pressed="${S.tab === k}">${t}</button>`).join("")}
        </div>${body}`;
      root.querySelectorAll("[data-tab]").forEach((b) => (b.onclick = () => { S.tab = b.dataset.tab; S.game = null; show(); }));
      root.querySelectorAll("[data-say]").forEach((b) => (b.onclick = () => api.speak(b.dataset.say)));
    }
    const bindPts = (fn) => root.querySelectorAll("[data-pt]").forEach((g) => {
      g.onclick = () => fn(g.dataset.pt);
      g.onkeydown = (e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); fn(g.dataset.pt); } };
    });

    const wordCard = (w) => !w ? `<div class="kp-card empty">${T("tapHint")}</div>` : `
      <div class="kp-card">
        <button class="kp-card-ar" data-say="${esc(w.ar)}" lang="ar" dir="rtl">${w.ar}</button>
        <span class="kp-card-tr">${esc(w.tr)}</span>
        <b class="kp-card-g">${esc(L(w.g))}</b>
        <span class="pill">${w.f ? T("fem") : T("masc")}</span>
        <div class="kp-forms">
          ${w.du ? `<button data-say="${esc(w.du)}"><small>${T("du")}</small><span lang="ar">${w.du}</span><em>${w.duTr}</em></button>` : ""}
          ${w.pl ? `<button data-say="${esc(w.pl)}"><small>${T("pl")}</small><span lang="ar">${w.pl}</span><em>${w.plTr}</em></button>` : ""}
        </div>
      </div>`;

    // ---------------- Erklärung ----------------
    function erklaerung() {
      const pairs = ["ayn", "udhun", "yad", "rijl", "qadam"].map(W);
      frame(`
        <div class="card explain kp-intro">
          <h2>${T("h1")}</h2><p>${T("p1")}</p>
          <div class="kp-figs-2">
            <div>${figure("face", { sel: S.sel })}</div>
            <div>${figure("body", { sel: S.sel })}</div>
          </div>
          <div id="kpSel">${wordCard(S.sel && W(S.sel))}</div>
        </div>
        <div class="card explain">
          <h2>${T("h2")}</h2>
          <p>${T("p2", { ex: pairs.map((w) => ar(w.ar)).join("، "), du: ar("عَيْنَانِ") + " · " + ar("يَدَانِ") })}</p>
          <div class="kp-du">${pairs.map((w) => `<button data-say="${esc(w.du)}" dir="rtl"><span lang="ar">${w.ar}</span><i class="kp-arrow">←</i><span lang="ar">${w.du}</span><small dir="ltr">${esc(L(w.g))}</small></button>`).join("")}</div>
        </div>
        <div class="card explain">
          <h2>${T("h3")}</h2><p>${T("p3")}</p>
          <div class="kp-du">${["ras", "wajh", "qalb", "zahr"].map(W).map((w) => `<button data-say="${esc(w.pl)}" dir="rtl"><span lang="ar">${w.ar}</span><i class="kp-arrow">←</i><span lang="ar">${w.pl}</span><small dir="ltr">${esc(w.plTr)} ← ${esc(w.tr)}</small></button>`).join("")}</div>
        </div>
        <div class="card explain">
          <h2>${T("h4")}</h2><p>${T("p4")}</p>
          <div class="kp-ayah" dir="rtl" lang="ar">${WUDU.words.map((x) => x.hl ? `<span class="hl" title="${esc(L(W(x.hl).g))}">${x.ar}<small dir="ltr">${esc(L(W(x.hl).g))}</small></span>` : `<span>${x.ar}</span>`).join(" ")} <span class="kp-ref">﴿٦﴾</span></div>
          <p class="kp-trans">${T("wuduTr")} <span class="note">(al-Māʾida ${WUDU.ref})</span></p>
        </div>
        <div class="card explain kp-hadith">
          <h2>${T("h5")}</h2>
          <blockquote>${ar("أَلَا وَإِنَّ فِي الْجَسَدِ مُضْغَةً، إِذَا صَلَحَتْ صَلَحَ الْجَسَدُ كُلُّهُ، وَإِذَا فَسَدَتْ فَسَدَ الْجَسَدُ كُلُّهُ، أَلَا وَهِيَ الْقَلْبُ")}
            <span>${T("hadithTr")}</span><cite>${T("hadithSrc")}</cite></blockquote>
        </div>
        <div class="card explain">
          <h2>${T("h6")}</h2><p>${T("p6")}</p>
          <div class="kp-pain" dir="rtl">${SENSES.map((x) => `<button data-say="${esc(x.ar)}"><span lang="ar">${x.ar}</span><em dir="ltr">${x.tr}</em><small dir="ltr">${esc(L(x.g))}</small></button>`).join("")}</div>
        </div>
        <div class="row center"><button class="btn primary" data-go>${T("toLearn")}</button></div>`);
      bindPts((id) => { S.sel = id; autoSay(W(id).ar); erklaerung(); root.querySelector("#kpSel")?.scrollIntoView({ block: "nearest", behavior: "smooth" }); });
      root.querySelector("[data-go]").onclick = () => { S.tab = "lernen"; show(); };
    }

    // ---------------- Lernen ----------------
    function lernen() {
      const m = api.progress().mastery || {};
      frame(`
        <div class="card kp-learn">
          <div class="chips" role="group">${VIEWS.map((v) => `<button class="chip" data-view="${v}" aria-pressed="${S.view === v}">${T("view." + v)}</button>`).join("")}</div>
          <div class="kp-learn-grid">
            <div class="kp-figwrap">${figure(S.view, { sel: S.sel })}</div>
            <div>${wordCard(S.sel && W(S.sel))}</div>
          </div>
        </div>
        <div class="card">
          <div class="chips" role="group">${GROUPS.map((g) => `<button class="chip" data-grp="${g}" aria-pressed="${S.grp === g}">${T("grp." + g)}</button>`).join("")}</div>
          <div class="kp-list">${WORDS.filter((w) => w.grp === S.grp).map((w) => `
            <button class="kp-item${S.sel === w.id ? " sel" : ""}" data-w="${w.id}">
              <span lang="ar" dir="rtl">${w.ar}</span><small>${esc(L(w.g))}${(m[w.id] || 0) >= MASTER_AT ? " ✓" : ""}</small></button>`).join("")}</div>
        </div>`);
      const pickW = (id) => { const w = W(id); S.sel = id; if (w.pt) S.view = w.pt.v; autoSay(w.ar); lernen(); };
      bindPts(pickW);
      root.querySelectorAll("[data-w]").forEach((b) => (b.onclick = () => pickW(b.dataset.w)));
      root.querySelectorAll("[data-view]").forEach((b) => (b.onclick = () => { S.view = b.dataset.view; lernen(); }));
      root.querySelectorAll("[data-grp]").forEach((b) => (b.onclick = () => { S.grp = b.dataset.grp; lernen(); }));
    }

    // ---------------- Aufgaben ----------------
    function makeTask() {
      const m = api.progress().mastery || {};
      const open = WORDS.filter((w) => (m[w.id] || 0) < MASTER_AT && w.id !== S.last);
      const pool = open.length ? open : WORDS.filter((w) => w.id !== S.last);
      const it = pool[rnd(0, pool.length - 1)];
      S.last = it.id;
      const others = (f, n = 3) => shuffle(WORDS.filter((w) => w !== it && f(w))).slice(0, n);
      const types = ["ar2g", "g2ar", "ar2g", "g2ar", "gen"];
      if (it.pl) types.push("pl"); if (it.du) types.push("du");
      const type = types[rnd(0, types.length - 1)];
      if (type === "ar2g") return { it, q: T("q.ar2g"), big: it.ar, opts: [it, ...others(() => true)].map((x) => ({ v: x.id, html: esc(L(x.g)) })) };
      if (type === "g2ar") return { it, q: T("q.g2ar"), bigLatin: L(it.g), opts: [it, ...others(() => true)].map((x) => ({ v: x.id, html: x.ar, arabic: true })) };
      if (type === "gen") return { it, q: T("q.gen"), big: it.ar, answer: it.f ? "f" : "m", opts: [{ v: "m", html: T("masc") }, { v: "f", html: T("fem") }] };
      if (type === "pl") return { it, q: T("q.pl"), big: it.ar, answer: "pl", opts: [{ v: "pl", html: it.pl, arabic: true }, ...others((w) => w.pl).map((x) => ({ v: "x" + x.id, html: x.pl, arabic: true }))] };
      return { it, q: T("q.du"), big: it.ar, answer: "du", opts: [{ v: "du", html: it.du, arabic: true }, ...others((w) => w.du).map((x) => ({ v: "x" + x.id, html: x.du, arabic: true }))] };
    }
    function aufgaben() {
      const k = makeTask(), correct = k.answer || k.it.id;
      const opts = k.answer === "f" || k.answer === "m" ? k.opts : shuffle(k.opts);
      frame(`<div class="card kp-task">
        <p class="note" style="text-align:center">${esc(k.q)}</p>
        ${k.big ? `<button class="kp-big" data-say="${esc(k.big)}" lang="ar" dir="rtl">${k.big}</button>` : `<div class="kp-big-q">${esc(k.bigLatin)}</div>`}
        <div class="opts">${opts.map((o) => `<button class="opt${o.arabic ? " arabic" : ""}" data-v="${o.v}" ${o.arabic ? 'lang="ar" dir="rtl"' : ""}>${o.html}</button>`).join("")}</div>
        <div class="feedback" aria-live="polite"></div>
        <div class="row center"><button class="btn primary" data-next hidden>${T("next")}</button></div>
      </div>`);
      root.querySelectorAll(".opt").forEach((b) => (b.onclick = () => {
        const ok = b.dataset.v === correct;
        root.querySelectorAll(".opt").forEach((x) => (x.disabled = true));
        b.classList.add(ok ? "ok" : "no");
        if (!ok) root.querySelector(`.opt[data-v="${correct}"]`)?.classList.add("ok");
        api.answer(ok); if (ok) credit(k.it.id);
        autoSay(k.it.ar);
        const w = k.it, extra = [w.du && `${T("du")}: ${w.duTr}`, w.pl && `${T("pl")}: ${w.plTr}`].filter(Boolean).join(" · ");
        const fb = root.querySelector(".feedback");
        fb.className = "feedback " + (ok ? "ok" : "no");
        fb.textContent = `${ok ? api.t("c.right") : api.t("c.wrong")} ${w.tr} = ${L(w.g)} (${w.f ? T("fem") : T("masc")})${extra ? " · " + extra : ""}`;
        const nx = root.querySelector("[data-next]"); nx.hidden = false; nx.onclick = aufgaben; nx.focus({ preventScroll: true });
      }));
    }

    // ---------------- Spiel: Zeig mir … ----------------
    function nextTarget(G) {
      const pts = WORDS.filter((w) => w.pt?.v === G.view && w.id !== G.target);
      G.target = pts[rnd(0, pts.length - 1)].id;
      autoSay(W(G.target).ar);
    }
    function spiel() {
      const best = api.progress().game || {};
      const G = S.game;
      if (!G) {
        frame(`<div class="card kp-game">
          <h2>${T("gTitle")}</h2><p class="note">${T("gHint")}</p>
          <div class="kp-sets">${VIEWS.map((v) => `<button class="choice" data-g="${v}"><b>${T("view." + v)}${(best[v] || 0) >= PASS ? " ✓" : ""}</b>${best[v] != null ? T("gBest", { n: best[v] }) : "&nbsp;"}</button>`).join("")}</div>
        </div>`);
        root.querySelectorAll("[data-g]").forEach((b) => (b.onclick = () => { S.game = { view: b.dataset.g, round: 1, right: 0, mark: {}, lock: false }; nextTarget(S.game); spiel(); }));
        return;
      }
      const done = G.round > ROUNDS;
      const tw = W(G.target);
      frame(`<div class="card kp-game">
        <div class="kp-game-head"><span class="pill">${done ? T("gScore", { a: G.right, b: ROUNDS }) : T("gRound", { a: G.round, b: ROUNDS })}</span>${done ? "" : `<span class="pill">${T("gScore", { a: G.right, b: G.lock ? G.round : G.round - 1 })}</span>`}</div>
        ${done ? `<div class="feedback ${G.right >= PASS ? "ok" : "no"}">${G.right >= PASS ? T("gPass") : T("gFail")}</div>
            <div class="row center"><button class="btn" id="kpAgain">${T("gAgain")}</button><button class="btn primary" id="kpOther">${T("gOther")}</button></div>`
          : `<button class="kp-target" data-say="${esc(tw.ar)}" lang="ar" dir="rtl">${tw.ar}</button><p class="note kp-msg" aria-live="polite">${G.msg || "&nbsp;"}</p>`}
        <div class="kp-figwrap game">${figure(G.view, { hideLabels: true, mark: G.mark })}</div>
      </div>`);
      if (!done) bindPts((id) => {
        if (G.lock) return;
        G.lock = true;
        const ok = id === G.target;
        api.answer(ok);
        if (ok) { G.right++; credit(G.target); G.mark = { [id]: "ok" }; G.msg = ""; }
        else { G.mark = { [id]: "no", [G.target]: "show" }; G.msg = T("gWrong", { w: L(W(id).g) }); }
        spiel();
        tmr = setTimeout(() => {
          G.round++; G.mark = {}; G.lock = false; G.msg = "";
          if (G.round > ROUNDS) api.update((p) => { p.game = p.game || {}; p.game[G.view] = Math.max(p.game[G.view] || 0, G.right); });
          else nextTarget(G);
          spiel();
        }, ok ? 650 : 1500);
      });
      const again = root.querySelector("#kpAgain"); if (again) again.onclick = () => { S.game = { view: G.view, round: 1, right: 0, mark: {}, lock: false }; nextTarget(S.game); spiel(); };
      const other = root.querySelector("#kpOther"); if (other) other.onclick = () => { S.game = null; spiel(); };
    }

    function show() { ({ erklaerung, lernen, aufgaben, spiel })[S.tab](); }
    show();
    return () => clearTimeout(tmr);
  },
};
