// =====================================================================
//  RUBRIK: ISM, FIʿL, ḤARF  (أَقْسَامُ الكَلِمَة) · Grammatik-Weg Level 1
//  Tabs: Erklärung · Lernen · Aufgaben · Spiel (Satz-Detektiv)
//  Fortschritt: mastery: { <wort-id>: richtige }, solved: { <satz-index>: true }
// =====================================================================
import { rnd, shuffle, esc, loadCss } from "../../js/shared.js";
import { makeT, L } from "../../js/i18n.js";
import DICT from "./lang.js";
import { TYPES, WORDS, SENTENCES, MASTER_AT } from "./data.js";

const T = makeT(DICT);
const ar = (s, cls = "") => `<span class="ar ${cls}" lang="ar" dir="rtl">${s}</span>`;
const W = (id) => WORDS.find((w) => w.id === id);

const wordsScore = (p) => WORDS.reduce((s, w) => s + Math.min(p.mastery?.[w.id] || 0, MASTER_AT), 0) / (WORDS.length * MASTER_AT);
const solvedCount = (p) => Object.keys(p.solved || {}).length;

export default {
  percent(p) { return wordsScore(p) * 70 + (solvedCount(p) / SENTENCES.length) * 30; },
  summary(p) { return T("sum", { a: WORDS.filter((w) => (p.mastery?.[w.id] || 0) >= MASTER_AT).length, b: WORDS.length }); },
  extraStats(p) { return T("solved", { a: solvedCount(p), b: SENTENCES.length }); },
  milestones() { return [{ pct: 35, label: T("ms.half") }, { pct: 70, label: T("ms.words") }, { pct: 100, label: T("ms.all") }]; },

  mount(root, api) {
    loadCss(import.meta.url, "style.css");
    const S = { tab: api.progress().answered ? "aufgaben" : "erklaerung", filter: "all", last: null, si: null, sel: [], checked: false };

    function frame(body) {
      root.innerHTML = `
        <div class="tabs" role="group">
          ${[["erklaerung", api.t("tab.explain")], ["lernen", api.t("tab.learn")], ["aufgaben", api.t("tab.tasks")], ["spiel", api.t("tab.game")]]
            .map(([k, t]) => `<button data-tab="${k}" aria-pressed="${S.tab === k}">${t}</button>`).join("")}
        </div>${body}`;
      root.querySelectorAll("[data-tab]").forEach((b) => (b.onclick = () => { S.tab = b.dataset.tab; show(); }));
      root.querySelectorAll("[data-say]").forEach((b) => (b.onclick = () => api.speak(b.dataset.say)));
    }
    const typeTag = (t) => `<span class="wa-tag wa-${t}">${T(t)} <small>${T(t + ".sub")}</small></span>`;

    // ---------------- Erklärung ----------------
    function erklaerung() {
      const sign = (key, ex) => `<li><span>${T("sg." + key)}</span>${ar(ex, "wa-ex")}</li>`;
      const typeCard = (t, arName) => `<div class="wa-type wa-${t}">
        <div class="wa-type-head"><b>${T(t)}</b>${ar(arName, "wa-type-ar")}</div>
        <span class="wa-type-sub">${T(t + ".sub")}</span>
        <p>${T(t + ".d", { huwa: ar("هُوَ"), kataba: ar("كَتَبَ"), yaktubu: ar("يَكْتُبُ"), uktub: ar("اُكْتُبْ") })}</p></div>`;
      const s0 = SENTENCES[0];
      frame(`
        <div class="card explain">
          <h2>${T("h1")}</h2>
          <p>${T("p1")}</p>
          <blockquote class="wa-quote">${ar("وَأَقْسَامُهُ ثَلَاثَةٌ: اسْمٌ، وَفِعْلٌ، وَحَرْفٌ جَاءَ لِمَعْنًى")}<span>${T("quoteTr")}</span></blockquote>
          <div class="wa-types">${typeCard("ism", "اِسْم")}${typeCard("fiil", "فِعْل")}${typeCard("harf", "حَرْف")}</div>
          <p class="note">${T("harfNote")}</p>
        </div>
        <div class="card explain wa-signs wa-ism-c">
          <h2>${T("h2")}</h2>
          <ul>${sign("al", "الكِتَابُ")}${sign("tanwin", "كِتَابٌ")}${sign("jarr", "فِي البَيْتِ")}${sign("ta", "مَدْرَسَةٌ")}${sign("pron", "هُوَ · مُحَمَّدٌ")}</ul>
        </div>
        <div class="card explain wa-signs wa-fiil-c">
          <h2>${T("h3")}</h2>
          <ul>${sign("qad", "قَدْ ذَهَبَ")}${sign("sin", "سَيَكْتُبُ")}${sign("tat", "كَتَبَتْ")}${sign("mudari", "يَكْتُبُ")}${sign("amr", "اُكْتُبْ")}</ul>
        </div>
        <div class="card explain wa-harf-c">
          <h2>${T("h4")}</h2>
          <p>${T("p4")}</p>
          <div class="wa-huruf">${["fi", "min", "ila", "ala", "wa", "lam", "hal", "thumma"].map((id) => { const w = W(id); return `<div>${ar(w.ar)}<small>${esc(L(w.g))}</small></div>`; }).join("")}</div>
        </div>
        <div class="card explain">
          <h2>${T("h5")}</h2>
          <div class="wa-sentence" dir="rtl">${s0.ar.map((a, i) => `<span class="wa-w wa-${s0.t[i]}" lang="ar">${a}<small dir="ltr">${T(s0.t[i])}</small></span>`).join("")}</div>
          <p class="wa-gloss">${esc(L(s0.g))}</p>
          <div class="wa-legend">${TYPES.map(typeTag).join("")}</div>
          <p>${T("p5")}</p>
        </div>
        <div class="row center"><button class="btn primary" data-go>${T("toLearn")}</button></div>`);
      root.querySelector("[data-go]").onclick = () => { S.tab = "lernen"; show(); };
    }

    // ---------------- Lernen ----------------
    function lernen() {
      const m = api.progress().mastery || {};
      const list = WORDS.filter((w) => S.filter === "all" || w.t === S.filter);
      frame(`
        <div class="card">
          <div class="chips" role="group">${["all", ...TYPES].map((k) => `<button class="chip" data-f="${k}" aria-pressed="${S.filter === k}">${k === "all" ? T("all") : T(k)}</button>`).join("")}</div>
          <p class="note" style="text-align:center">${T("learnHint")}</p>
          <div class="wa-cards">${list.map((w) => `
            <button class="wa-card wa-${w.t}" data-say="${esc(w.ar)}">
              <span class="wa-card-ar" lang="ar" dir="rtl">${w.ar}</span>
              <span class="wa-card-tr">${esc(w.tr)}</span>
              <span class="wa-card-g">${esc(L(w.g))}</span>
              <span class="wa-card-t">${T(w.t)}${(m[w.id] || 0) >= MASTER_AT ? " ✓" : ""}</span>
            </button>`).join("")}</div>
        </div>`);
      root.querySelectorAll("[data-f]").forEach((b) => (b.onclick = () => { S.filter = b.dataset.f; lernen(); }));
    }

    // ---------------- Aufgaben ----------------
    function pick() {
      const m = api.progress().mastery || {};
      const open = WORDS.filter((w) => (m[w.id] || 0) < MASTER_AT && w.id !== S.last);
      const pool = open.length >= 3 ? open : WORDS.filter((w) => w.id !== S.last);
      const w = pool[rnd(0, pool.length - 1)];
      S.last = w.id;
      return w;
    }
    function aufgaben() {
      const w = pick();
      frame(`
        <div class="card wa-task">
          <p class="note" style="text-align:center">${T("q")}</p>
          <div class="wa-big" lang="ar" dir="rtl">${w.ar}</div>
          <div class="wa-tr">${esc(w.tr)}</div>
          <div class="opts wa-opts">${TYPES.map((t) => `<button class="opt wa-opt wa-${t}" data-v="${t}"><b>${T(t)}</b><small>${T(t + ".sub")}</small></button>`).join("")}</div>
          <div class="feedback" aria-live="polite"></div>
          <p class="wa-why" hidden></p>
          <div class="row center">${api.canSpeak() ? `<button class="btn" data-say="${esc(w.ar)}">${T("listen")}</button>` : ""}<button class="btn primary" data-next hidden>${T("next")}</button></div>
        </div>`);
      root.querySelectorAll(".opt").forEach((b) => (b.onclick = () => {
        const ok = b.dataset.v === w.t;
        root.querySelectorAll(".opt").forEach((x) => (x.disabled = true));
        b.classList.add(ok ? "ok" : "no");
        if (!ok) root.querySelector(`.opt[data-v="${w.t}"]`).classList.add("ok");
        api.answer(ok);
        if (ok) api.update((p) => { p.mastery = p.mastery || {}; p.mastery[w.id] = (p.mastery[w.id] || 0) + 1; });
        const fb = root.querySelector(".feedback");
        fb.className = "feedback " + (ok ? "ok" : "no");
        fb.textContent = `${ok ? api.t("c.right") : api.t("c.wrong")} ${w.ar} = ${L(w.g)}`;
        const why = root.querySelector(".wa-why"); why.hidden = false; why.textContent = T("s." + w.s);
        const nx = root.querySelector("[data-next]"); nx.hidden = false; nx.onclick = aufgaben; nx.focus({ preventScroll: true });
      }));
    }

    // ---------------- Spiel: Satz-Detektiv ----------------
    function newSentence() {
      const solved = api.progress().solved || {};
      const open = SENTENCES.map((_, i) => i).filter((i) => !solved[i] && i !== S.si);
      const pool = open.length ? open : SENTENCES.map((_, i) => i).filter((i) => i !== S.si);
      S.si = pool[open.length ? 0 : rnd(0, pool.length - 1)];
      S.sel = SENTENCES[S.si].ar.map(() => null);
      S.checked = false;
    }
    function spiel() {
      if (S.si === null) newSentence();
      const s = SENTENCES[S.si], done = solvedCount(api.progress());
      const wrong = S.checked ? S.sel.filter((x, i) => x !== s.t[i]).length : 0;
      frame(`
        <div class="card wa-game">
          <div class="wa-game-head"><h2>${T("gTitle")}</h2><span class="pill">${T("solved", { a: done, b: SENTENCES.length })}</span></div>
          <p class="note">${T("gHint")}</p>
          <div class="wa-legend">${TYPES.map(typeTag).join("")}</div>
          <div class="wa-sentence big" dir="rtl">${s.ar.map((a, i) => {
            const shown = S.checked ? s.t[i] : S.sel[i];
            const st = S.checked ? (S.sel[i] === s.t[i] ? " right" : " wrongw") : "";
            return `<button class="wa-w${shown ? " wa-" + shown : " open"}${st}" data-i="${i}" lang="ar" ${S.checked ? "disabled" : ""}>${a}<small dir="ltr">${shown ? T(shown) : "?"}</small></button>`;
          }).join("")}</div>
          ${S.checked ? `<p class="wa-gloss">${esc(L(s.g))}</p><div class="feedback ${wrong ? "no" : "ok"}">${wrong ? T("gNo", { n: wrong }) : T("gOk")}</div>` : ""}
          <div class="row center">
            ${api.canSpeak() ? `<button class="btn" data-say="${esc(s.ar.join(" "))}">${T("listen")}</button>` : ""}
            ${S.checked ? `<button class="btn primary" id="waNext">${T("nextSentence")}</button>`
              : `<button class="btn primary" id="waCheck" ${S.sel.includes(null) ? "disabled" : ""}>${T("check")}</button>`}
          </div>
        </div>`);
      root.querySelectorAll(".wa-w[data-i]").forEach((b) => (b.onclick = () => {
        const i = +b.dataset.i, cur = S.sel[i];
        S.sel[i] = TYPES[(TYPES.indexOf(cur) + 1) % TYPES.length];
        spiel();
      }));
      const chk = root.querySelector("#waCheck");
      if (chk) chk.onclick = () => {
        const ok = S.sel.every((x, i) => x === s.t[i]);
        api.answer(ok);
        if (ok) api.update((p) => { p.solved = p.solved || {}; p.solved[S.si] = true; });
        S.checked = true; spiel();
      };
      const nx = root.querySelector("#waNext");
      if (nx) nx.onclick = () => { newSentence(); spiel(); };
    }

    function show() { ({ erklaerung, lernen, aufgaben, spiel })[S.tab](); }
    show();
  },
};
