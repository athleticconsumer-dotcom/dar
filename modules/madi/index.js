// =====================================================================
//  RUBRIK: DIE VERGANGENHEIT (الفِعْلُ المَاضِي) · Grammatik-Weg Level 2, Schritt 2
//  Tabs: Erklärung · Lernen · Aufgaben · Spiel (Tabellen-Bau auf Zeit)
//  Fortschritt: mastery: { <person>: richtige }, tables: { <verb>: true }, tableBest (Sekunden)
// =====================================================================
import { rnd, shuffle, esc, loadCss, toAr } from "../../js/shared.js";
import { makeT, L } from "../../js/i18n.js";
import DICT from "./lang.js";
import { PERSONS, VERBS, QURAN, CONFUSE, MASTER_AT, TABLE_GOAL, MAX_MISTAKES, stem, form } from "./data.js";

const T = makeT(DICT);
const P = Object.fromEntries(PERSONS.map((p) => [p.id, p]));
const gl = (v) => L(v.g) || v.g.de;
const arS = (s) => `<span class="ar" lang="ar" dir="rtl">${s}</span>`;
/** Form mit farbiger Endung */
const fHtml = (v, p) => `${stem(v)}${p.m}${p.suf ? `<span class="md-end">${p.suf}</span>` : ""}`;
const plabel = (p) => T("p." + p.id);

const score = (p) => PERSONS.reduce((s, x) => s + Math.min(p.mastery?.[x.id] || 0, MASTER_AT), 0) / (PERSONS.length * MASTER_AT);
const tablesDone = (p) => Object.keys(p.tables || {}).length;

export default {
  percent(p) { return score(p) * 75 + (Math.min(tablesDone(p), TABLE_GOAL) / TABLE_GOAL) * 25; },
  summary(p) { return T("sum", { a: PERSONS.filter((x) => (p.mastery?.[x.id] || 0) >= MASTER_AT).length, b: PERSONS.length }); },
  extraStats(p) { return T("extra", { a: Math.min(tablesDone(p), TABLE_GOAL), b: TABLE_GOAL }); },
  milestones() { return [{ pct: Math.round((4 / PERSONS.length) * 75), label: T("ms.he") }, { pct: 75, label: T("ms.all") }, { pct: 100, label: T("ms.tables") }]; },

  mount(root, api) {
    loadCss(import.meta.url, "style.css");
    const S = { tab: api.progress().answered ? "aufgaben" : "erklaerung", verb: VERBS[0].id, last: null, game: null };
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
      root.querySelectorAll("[data-tab]").forEach((b) => (b.onclick = () => { stop(); S.tab = b.dataset.tab; S.game = null; show(); }));
      root.querySelectorAll("[data-say]").forEach((b) => (b.onclick = () => api.speak(b.dataset.say)));
    }

    /** Konjugationstabelle (rechts Einzahl). cell(p) liefert den Inhalt einer Zelle. */
    const table = (cell, cls = "") => `<div class="md-table ${cls}" dir="rtl">
      <span class="md-col" style="grid-area:1/1">${T("col.s")}<i lang="ar">مُفْرَد</i></span>
      <span class="md-col" style="grid-area:1/2">${T("col.d")}<i lang="ar">مُثَنًّى</i></span>
      <span class="md-col" style="grid-area:1/3">${T("col.p")}<i lang="ar">جَمْع</i></span>
      ${PERSONS.map((p) => `<div class="md-cell g${p.grp}" data-p="${p.id}" style="grid-row:${p.row + 1} / span ${p.rs};grid-column:${p.col} / span ${p.cs}">${cell(p)}</div>`).join("")}
    </div>`;
    const sayCell = (v) => (p) => `<button data-say="${esc(form(v, p))}"><span class="md-pr" lang="ar">${p.pr}</span><span class="md-f" lang="ar">${fHtml(v, p)}</span><small>${esc(plabel(p))}</small></button>`;

    // ---------------- Erklärung ----------------
    function erklaerung() {
      const v = VERBS[0], V = (id) => VERBS.find((x) => x.id === id);
      const four = ["ana", "anta", "anti", "hiya"].map((id) => P[id]);
      frame(`
        <div class="card explain">
          <h2>${T("h1")}</h2>
          <p>${T("p1", { v: arS(v.ar), m: arS("فَعَلَ") })}</p>
        </div>
        <div class="card explain">
          <h2>${T("h2")}</h2><p>${T("p2")}</p>
          ${table(sayCell(v))}
          <p class="note">${T("p2b", { ex: arS(form(v, P.ana)), pr: arS(P.ana.pr) })}</p>
        </div>
        <div class="card explain">
          <h2>${T("h3")}</h2><p>${T("p3")}</p>
          <div class="md-four" dir="rtl">${four.map((p) => `<button data-say="${esc(form(v, p))}"><span lang="ar">${fHtml(v, p)}</span><small>${esc(plabel(p))}</small></button>`).join("")}</div>
        </div>
        <div class="card explain">
          <h2>${T("h4")}</h2>
          <p>${T("p4", { a: arS(fHtml(v, P.nahnu)), b: arS(fHtml(v, P.hum)) })}</p>
        </div>
        <div class="card explain">
          <h2>${T("h5")}</h2>
          <p>${T("p5", { a: arS("كَتَبَ"), b: arS("شَرِبَ"), c: arS("كَبُرَ"), d: arS(fHtml(V("shariba"), P.ana)), e: arS(fHtml(V("shariba"), P.nahnu)) })}</p>
        </div>
        <div class="card explain">
          <h2>${T("h6")}</h2><p>${T("p6")}</p>
          <div class="md-ayat">${QURAN.map((q) => { const ws = q.text.split(" "); const [s, a] = q.ref.split(":");
            return `<figure class="md-aya">
              <p lang="ar" dir="rtl">${q.start ? "" : "… "}${ws.map((w, i) => q.hl.includes(i) ? `<b>${w}</b>` : w).join(" ")}${q.end ? ` <span class="md-num">﴿${toAr(+a)}﴾</span>` : " …"}</p>
              <figcaption><span class="md-tags">${q.p.map((id) => `<span lang="ar">${P[id].pr}</span> ${esc(plabel(P[id]))}`).join(" · ")} · <span lang="ar">${q.v}</span></span><span>${esc(L(q.tr) || q.tr.de)}</span><small>${q.ref}</small></figcaption>
            </figure>`; }).join("")}</div>
        </div>
        <div class="row center"><button class="btn primary" data-go>${T("toLearn")}</button></div>`);
      root.querySelector("[data-go]").onclick = () => { S.tab = "lernen"; show(); window.scrollTo(0, 0); };
    }

    // ---------------- Lernen ----------------
    function lernen() {
      const v = VERBS.find((x) => x.id === S.verb);
      const m = api.progress().mastery || {};
      frame(`<div class="card">
        <p class="note" style="text-align:center">${T("learnHint")}</p>
        <div class="md-verbs" dir="rtl">${VERBS.map((x) => `<button data-verb="${x.id}" aria-pressed="${x.id === S.verb}"><span lang="ar">${x.ar}</span><small dir="ltr">${esc(gl(x))}</small></button>`).join("")}</div>
        ${table((p) => sayCell(v)(p).replace("</small>", `${(m[p.id] || 0) >= MASTER_AT ? " ✓" : ""}</small>`))}
      </div>`);
      root.querySelectorAll("[data-verb]").forEach((b) => (b.onclick = () => { S.verb = b.dataset.verb; lernen(); }));
    }

    // ---------------- Aufgaben ----------------
    const confusers = (p) => {
      const near = shuffle([...new Set(CONFUSE.filter((g) => g.includes(p.id)).flat())].filter((id) => id !== p.id));
      const rest = shuffle(PERSONS.map((x) => x.id).filter((id) => id !== p.id && !near.includes(id)));
      return [...near, ...rest].slice(0, 3).map((id) => P[id]);
    };
    const why = (v, p) => p.suf ? T("e.form", { pr: arS(p.pr), f: arS(fHtml(v, p)), s: arS(`<span class="md-end">ـ${p.suf}</span>`) }) : T("e.base", { pr: arS(p.pr), f: arS(form(v, p)) });
    function makeTask() {
      const m = api.progress().mastery || {};
      const open = PERSONS.filter((x) => (m[x.id] || 0) < MASTER_AT && x.id !== S.last);
      const pool = open.length ? open : PERSONS.filter((x) => x.id !== S.last);
      const p = pool[rnd(0, pool.length - 1)];
      S.last = p.id;
      const v = VERBS[rnd(0, VERBS.length - 1)];
      const others = confusers(p);
      // Formen, die gleich aussehen (hum/huma … gibt es nicht doppelt, aber sicher ist sicher)
      const uniq = (arr) => arr.filter((x, i) => arr.findIndex((y) => form(v, y) === form(v, x)) === i);
      if (Math.random() < 0.5) return { type: "who", q: T("q.who"), big: form(v, p), sub: T("q.verb", { v: arS(v.ar), g: esc(gl(v)) }), p, v,
        opts: shuffle(uniq([p, ...others])).map((x) => ({ v: x.id, html: `<span class="md-who"><span lang="ar" class="ar">${x.pr}</span><small>${esc(plabel(x))}</small></span>` })), answer: p.id };
      return { type: "make", q: T("q.make"), big: `${p.pr} + ${v.ar}`, sub: `${esc(plabel(p))} · ${esc(gl(v))}`, p, v,
        opts: shuffle(uniq([p, ...others])).map((x) => ({ v: x.id, html: form(v, x), a: 1 })), answer: p.id };
    }
    function aufgaben() {
      const k = makeTask();
      frame(`<div class="card md-task">
        <p class="note" style="text-align:center">${k.q}</p>
        <button class="md-big" data-say="${esc(k.type === "who" ? k.big : form(k.v, k.p))}" lang="ar" dir="rtl">${k.big}</button>
        <p class="md-sub">${k.sub}</p>
        <div class="opts">${k.opts.map((o) => `<button class="opt${o.a ? " arabic" : ""}" data-v="${o.v}" ${o.a ? 'lang="ar" dir="rtl"' : ""}>${o.html}</button>`).join("")}</div>
        <div class="feedback" aria-live="polite"></div>
        <div class="row center"><button class="btn primary" data-next hidden>${T("next")}</button></div>
      </div>`);
      root.querySelectorAll(".opt").forEach((b) => (b.onclick = () => {
        const ok = b.dataset.v === k.answer;
        root.querySelectorAll(".opt").forEach((x) => (x.disabled = true));
        b.classList.add(ok ? "ok" : "no");
        if (!ok) root.querySelector(`.opt[data-v="${k.answer}"]`)?.classList.add("ok");
        api.answer(ok); if (ok) credit(k.p.id);
        autoSay(form(k.v, k.p));
        const fb = root.querySelector(".feedback");
        fb.className = "feedback " + (ok ? "ok" : "no");
        fb.innerHTML = `${ok ? api.t("c.right") : api.t("c.wrong")} ${why(k.v, k.p)}`;
        const nx = root.querySelector("[data-next]"); nx.hidden = false; nx.onclick = aufgaben; nx.focus({ preventScroll: true });
      }));
    }

    // ---------------- Spiel: Tabellen-Bau ----------------
    function spiel() {
      const pr = api.progress();
      const G = S.game;
      if (!G) {
        frame(`<div class="card md-game">
          <h2>${T("gTitle")}</h2><p class="note">${T("gHint", { m: MAX_MISTAKES, n: TABLE_GOAL })}</p>
          <p class="md-best">${T("extra", { a: Math.min(tablesDone(pr), TABLE_GOAL), b: TABLE_GOAL })}${pr.tableBest ? " · " + T("gBest", { s: pr.tableBest }) : ""}</p>
          <div class="row center"><button class="btn primary" id="mdStart">${T("gStart")}</button></div>
        </div>`);
        root.querySelector("#mdStart").onclick = start;
        return;
      }
      const v = G.v;
      if (G.k >= PERSONS.length) {
        const secs = Math.round((Date.now() - G.t0) / 1000), counts = G.wrong <= MAX_MISTAKES;
        if (!G.saved) {
          G.saved = true;
          if (counts) api.update((p) => { p.tables = p.tables || {}; p.tables[v.id] = true; p.tableBest = p.tableBest ? Math.min(p.tableBest, secs) : secs; });
        }
        const after = api.progress();
        frame(`<div class="card md-game">
          <h2>${T("gTitle")} · <span lang="ar">${v.ar}</span></h2>
          <div class="feedback ${counts ? "ok" : "no"}">${T("gDone", { s: secs, e: G.wrong })} ${counts ? T("gCount", { a: Math.min(tablesDone(after), TABLE_GOAL), b: TABLE_GOAL }) : T("gRetry")}</div>
          ${table(sayCell(v), "done")}
          <p class="md-best">${after.tableBest ? T("gBest", { s: after.tableBest }) : ""}</p>
          <div class="row center"><button class="btn primary" id="mdAgain">${T("gAgain")}</button></div>
        </div>`);
        root.querySelector("#mdAgain").onclick = start;
        return;
      }
      const cur = PERSONS[G.k];
      frame(`<div class="card md-game">
        <div class="md-game-head"><span class="pill"><span lang="ar">${v.ar}</span> · ${esc(gl(v))}</span><span class="pill" id="mdTime">${T("gTime", { s: Math.round((Date.now() - G.t0) / 1000) })}</span><span class="pill">${T("gMist", { n: G.wrong })}</span></div>
        ${table((p) => { const i = PERSONS.indexOf(p);
          return `<span class="md-pr" lang="ar">${p.pr}</span>${i < G.k ? `<span class="md-f" lang="ar">${fHtml(v, p)}</span>` : i === G.k ? `<span class="md-f q">؟</span>` : `<span class="md-f md-hide" aria-hidden="true">${form(v, p)}</span>`}<small>${esc(plabel(p))}</small>`; }, "game")}
        <div class="md-chips" dir="rtl" lang="ar">${G.chips.filter((id) => PERSONS.findIndex((p) => p.id === id) >= G.k).map((id) => `<button data-c="${id}">${form(v, P[id])}</button>`).join("")}</div>
      </div>`);
      root.querySelector(`.md-cell[data-p="${cur.id}"]`)?.classList.add("now");
      root.querySelectorAll("[data-c]").forEach((b) => (b.onclick = () => {
        if (b.dataset.c === cur.id) { G.k++; api.answer(true); credit(cur.id); autoSay(form(v, cur)); spiel(); }
        else { G.wrong++; api.answer(false); b.classList.add("miss"); setTimeout(() => b.classList.remove("miss"), 600);
          const el = root.querySelectorAll(".md-game-head .pill")[2]; if (el) el.textContent = T("gMist", { n: G.wrong }); }
      }));
    }
    function start() {
      const done = api.progress().tables || {};
      const fresh = VERBS.filter((x) => !done[x.id]);
      const pool = fresh.length ? fresh : VERBS;
      S.game = { v: pool[rnd(0, pool.length - 1)], k: 0, wrong: 0, t0: Date.now(), chips: shuffle(PERSONS.map((p) => p.id)) };
      stop();
      timer = setInterval(() => { const el = root.querySelector("#mdTime"); if (el && S.game) el.textContent = T("gTime", { s: Math.round((Date.now() - S.game.t0) / 1000) }); }, 1000);
      spiel();
    }

    function show() { ({ erklaerung, lernen, aufgaben, spiel })[S.tab](); }
    show();
    return stop;
  },
};
