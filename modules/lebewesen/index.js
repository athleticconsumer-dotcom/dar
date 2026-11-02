// =====================================================================
//  RUBRIK: LEBEWESEN & DINGE (الكَائِنَات وَالجَمَادَات) – nach Lektion 6
//  Tabs: Erklärung (mit den Aufgaben der Lektion) · Lernen · Aufgaben · Spiel (Sortier-Sprint)
//  Fortschritt: mastery: { <id>: richtige }, sprintBest, names: [5], fav: [ids]
// =====================================================================
import { rnd, shuffle, esc, loadCss } from "../../js/shared.js";
import { makeT, L } from "../../js/i18n.js";
import DICT from "./lang.js";
import { OVERVIEW, NAMES, WORDS, GROUPS, GROUP_AR, UNITS, SURAS, MASTER_AT, SPRINT_SECONDS, SPRINT_GOAL } from "./data.js";

const T = makeT(DICT);
const W = (id) => WORDS.find((w) => w.id === id);
const ar = (s, cls = "") => `<span class="ar ${cls}" lang="ar" dir="rtl">${s}</span>`;
const sayOf = (w) => w.say || w.ar;
const score = (p) => WORDS.reduce((s, w) => s + Math.min(p.mastery?.[w.id] || 0, MASTER_AT), 0) / (WORDS.length * MASTER_AT);

export default {
  percent(p) { return score(p) * 80 + (Math.min(p.sprintBest || 0, SPRINT_GOAL) / SPRINT_GOAL) * 20; },
  summary(p) { return T("sum", { a: WORDS.filter((w) => (p.mastery?.[w.id] || 0) >= MASTER_AT).length, b: WORDS.length }); },
  extraStats(p) { return T("extra", { n: p.sprintBest || 0 }); },
  milestones() {
    const upTo = (gs) => Math.round((WORDS.filter((w) => gs.includes(w.grp)).length / WORDS.length) * 80);
    return [{ pct: upTo(["animal"]), label: T("ms.animal") }, { pct: upTo(["animal", "plant", "insect"]), label: T("ms.pi") }, { pct: 80, label: T("ms.of") }, { pct: 100, label: T("ms.all") }];
  },

  mount(root, api) {
    loadCss(import.meta.url, "style.css");
    const S = { tab: api.progress().answered ? "aufgaben" : "erklaerung", grp: "animal", last: null, sprint: null };
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
    const card = (w, done) => `<button class="lw-card" data-say="${esc(sayOf(w))}">
      ${w.e ? `<span class="lw-e" aria-hidden="true">${w.e}</span>` : `<span class="lw-e lw-e-none" aria-hidden="true">•</span>`}
      <span class="lw-ar" lang="ar" dir="rtl">${w.ar}</span><span class="lw-tr">${esc(w.tr)}</span>${w.g ? `<span class="lw-g">${esc(L(w.g))}${done ? " ✓" : ""}</span>` : ""}</button>`;

    // ---------------- Erklärung ----------------
    function erklaerung() {
      const p = api.progress(), names = p.names || [], fav = p.fav || [];
      frame(`
        <div class="card explain">
          <h2>${T("h1")}</h2><p>${T("p1")}</p>
          <div class="lw-over" dir="rtl">${OVERVIEW.map((w) => card(w)).join("")}</div>
        </div>
        <div class="card explain">
          <h2>${T("h2")}</h2>
          <p>${T("p2", { adam: ar("آدَمَ وَحَوَّاءَ"), ahmad: ar("أَحْمَد"), muhammad: ar("مُحَمَّد"), mahmud: ar("مَحْمُود"), abd: ar("عَبْد") })}</p>
          <div class="lw-names" dir="rtl">${NAMES.map((n) => `<button class="${n.f ? "f" : ""}" data-say="${esc(n.ar)}"><span lang="ar">${n.ar}</span><small dir="ltr">${n.tr}</small></button>`).join("")}</div>
          <div class="lw-act"><p><b>✎</b> ${T("act1")}</p>
            <div class="lw-inputs">${[0, 1, 2, 3, 4].map((i) => `<input type="text" maxlength="30" data-n="${i}" value="${esc(names[i] || "")}" placeholder="${esc(T("namePh", { n: i + 1 }))}">`).join("")}</div></div>
        </div>
        <div class="card explain">
          <h2>${T("h3")}</h2><p>${T("p3")}</p>
          <div class="lw-units">${UNITS.map((u) => { const [a, b] = u.tr.split(" → ");
            return `<button data-say="${esc(u.coll + "، " + u.one)}" dir="rtl"><span lang="ar">${u.coll}</span><i>←</i><span lang="ar">${u.one}</span><small dir="ltr">${b} ← ${a}</small></button>`; }).join("")}</div>
        </div>
        <div class="card explain">
          <h2>${T("h4")}</h2><p>${T("p4")}</p>
          <div class="lw-suras" dir="rtl">${SURAS.map((s) => `<button data-say="${esc("سُورَةُ " + s.ar)}"><span class="lw-e">${W(s.id).e || ""}</span><span lang="ar">${s.ar}</span><small dir="ltr">${T("sura", { n: s.n })} · ${esc(L(W(s.id).g))}</small></button>`).join("")}</div>
        </div>
        <div class="card explain">
          <p><b>✎</b> ${T("act2")}</p>
          <div class="lw-fav" dir="rtl">${WORDS.filter((w) => w.grp === "animal").map((w) => `<button class="chip" data-fav="${w.id}" aria-pressed="${fav.includes(w.id)}">${w.e} <span lang="ar">${w.ar}</span></button>`).join("")}</div>
          ${fav.length ? `<p class="lw-favline">${T("fav")} ${ar(fav.map((id) => W(id).ar).join("، "))}</p>` : ""}
        </div>
        <div class="row center"><button class="btn primary" data-go>${T("toLearn")}</button></div>`);
      root.querySelector("[data-go]").onclick = () => { S.tab = "lernen"; show(); };
      root.querySelectorAll("[data-n]").forEach((inp) => (inp.onchange = () => api.update((q) => { q.names = q.names || []; q.names[+inp.dataset.n] = inp.value.trim(); })));
      root.querySelectorAll("[data-fav]").forEach((b) => (b.onclick = () => {
        const id = b.dataset.fav;
        api.update((q) => { let f = q.fav || []; f = f.includes(id) ? f.filter((x) => x !== id) : [...f, id].slice(-3); q.fav = f; });
        autoSay(sayOf(W(id)));
        const y = window.scrollY; erklaerung(); window.scrollTo(0, y);
      }));
    }

    // ---------------- Lernen ----------------
    function lernen() {
      const m = api.progress().mastery || {};
      const tabs = [...GROUPS, "names"];
      frame(`<div class="card">
        <div class="chips" role="group">${tabs.map((g) => `<button class="chip" data-grp="${g}" aria-pressed="${S.grp === g}">${T("grp." + g)}</button>`).join("")}</div>
        <p class="note" style="text-align:center">${T("tapHint")}</p>
        ${S.grp === "names"
          ? `<div class="lw-names big" dir="rtl">${NAMES.map((n) => `<button class="${n.f ? "f" : ""}" data-say="${esc(n.ar)}"><span lang="ar">${n.ar}</span><small dir="ltr">${n.tr}</small></button>`).join("")}</div>`
          : `<div class="lw-cards" dir="rtl">${WORDS.filter((w) => w.grp === S.grp).map((w) => card(w, (m[w.id] || 0) >= MASTER_AT)).join("")}</div>`}
        ${S.grp === "insect" ? `<p class="note">${T("spiderNote")}</p>` : ""}
      </div>`);
      root.querySelectorAll("[data-grp]").forEach((b) => (b.onclick = () => { S.grp = b.dataset.grp; lernen(); }));
    }

    // ---------------- Aufgaben ----------------
    function makeTask() {
      const m = api.progress().mastery || {};
      const open = WORDS.filter((w) => (m[w.id] || 0) < MASTER_AT && w.id !== S.last);
      const pool = open.length ? open : WORDS.filter((w) => w.id !== S.last);
      const it = pool[rnd(0, pool.length - 1)];
      S.last = it.id;
      const same = shuffle(WORDS.filter((w) => w !== it && w.grp === it.grp)).slice(0, 2);
      const other = shuffle(WORDS.filter((w) => w !== it && w.grp !== it.grp)).slice(0, 3 - same.length);
      const distract = [...same, ...other];
      const r = Math.random();
      if (r < 0.4) return { it, q: T("q.g2ar"), emoji: it.e, latin: L(it.g), answer: it.id, opts: [it, ...distract].map((x) => ({ v: x.id, html: x.ar, a: 1 })) };
      if (r < 0.75) return { it, q: T("q.ar2g"), big: it.ar, answer: it.id, opts: [it, ...distract].map((x) => ({ v: x.id, html: esc(L(x.g)) })) };
      return { it, q: T("q.cat"), big: it.ar, answer: it.grp, keep: true, opts: GROUPS.map((g) => ({ v: g, html: `<span lang="ar">${GROUP_AR[g]}</span><small>${T("grp." + g)}</small>` })) };
    }
    function aufgaben() {
      const k = makeTask();
      const opts = k.keep ? k.opts : shuffle(k.opts);
      frame(`<div class="card lw-task">
        <p class="note" style="text-align:center">${esc(k.q)}</p>
        ${k.big ? `<button class="lw-big" data-say="${esc(sayOf(k.it))}" lang="ar" dir="rtl">${k.big}</button>`
          : `<div class="lw-q">${k.emoji ? `<span class="lw-q-e">${k.emoji}</span>` : ""}<b>${esc(k.latin)}</b></div>`}
        <div class="opts${k.keep ? " lw-cats" : ""}">${opts.map((o) => `<button class="opt${o.a ? " arabic" : ""}" data-v="${o.v}" ${o.a ? 'lang="ar" dir="rtl"' : ""}>${o.html}</button>`).join("")}</div>
        <div class="feedback" aria-live="polite"></div>
        <div class="row center"><button class="btn primary" data-next hidden>${T("next")}</button></div>
      </div>`);
      root.querySelectorAll(".opt").forEach((b) => (b.onclick = () => {
        const ok = b.dataset.v === k.answer;
        root.querySelectorAll(".opt").forEach((x) => (x.disabled = true));
        b.classList.add(ok ? "ok" : "no");
        if (!ok) root.querySelector(`.opt[data-v="${k.answer}"]`)?.classList.add("ok");
        api.answer(ok); if (ok) credit(k.it.id);
        autoSay(sayOf(k.it));
        const fb = root.querySelector(".feedback");
        fb.className = "feedback " + (ok ? "ok" : "no");
        fb.textContent = `${ok ? api.t("c.right") : api.t("c.wrong")} ${k.it.e ? k.it.e + " " : ""}${k.it.tr} = ${L(k.it.g)} · ${T("grp." + k.it.grp)}`;
        const nx = root.querySelector("[data-next]"); nx.hidden = false; nx.onclick = aufgaben; nx.focus({ preventScroll: true });
      }));
    }

    // ---------------- Spiel: Sortier-Sprint ----------------
    const nextItem = (prev) => { let w; do { w = WORDS[rnd(0, WORDS.length - 1)]; } while (prev && w.id === prev.id); return w; };
    function spiel() {
      const best = api.progress().sprintBest || 0;
      const G = S.sprint;
      if (!G) {
        frame(`<div class="card lw-game">
          <h2>${T("gTitle")}</h2><p class="note">${T("gHint", { n: SPRINT_GOAL })}</p>
          <p class="lw-best">${T("gBest", { n: best })}${best >= SPRINT_GOAL ? " ✓" : ""}</p>
          <div class="row center"><button class="btn primary" id="lwStart">${T("gStart")}</button></div>
        </div>`);
        root.querySelector("#lwStart").onclick = () => {
          S.sprint = { right: 0, wrong: 0, end: Date.now() + SPRINT_SECONDS * 1000, item: nextItem(), flash: null };
          stop();
          timer = setInterval(() => {
            const left = Math.max(0, Math.ceil((S.sprint.end - Date.now()) / 1000));
            const el = root.querySelector("#lwLeft"); if (el) el.textContent = T("gLeft", { s: left });
            const bar = root.querySelector(".lw-timebar i"); if (bar) bar.style.width = (left / SPRINT_SECONDS) * 100 + "%";
            if (left <= 0) { stop(); S.sprint.done = true; api.update((p) => { p.sprintBest = Math.max(p.sprintBest || 0, S.sprint.right); }); spiel(); }
          }, 250);
          spiel();
        };
        return;
      }
      if (G.done) {
        frame(`<div class="card lw-game">
          <h2>${T("gTitle")}</h2>
          <div class="feedback ${G.right >= SPRINT_GOAL ? "ok" : "no"}">${T("gEnd", { n: G.right, e: G.wrong })}</div>
          ${G.right >= SPRINT_GOAL ? `<p class="lw-best">${T("gGoal", { n: SPRINT_GOAL })}</p>` : ""}
          <p class="lw-best">${T("gBest", { n: best })}</p>
          <div class="row center"><button class="btn primary" id="lwAgain">${T("gAgain")}</button></div>
        </div>`);
        root.querySelector("#lwAgain").onclick = () => { S.sprint = null; spiel(); root.querySelector("#lwStart").click(); };
        return;
      }
      const left = Math.max(0, Math.ceil((G.end - Date.now()) / 1000));
      frame(`<div class="card lw-game">
        <div class="lw-game-head"><span class="pill" id="lwLeft">${T("gLeft", { s: left })}</span><span class="pill">${T("gScore", { n: G.right })}</span></div>
        <div class="lw-timebar"><i style="width:${(left / SPRINT_SECONDS) * 100}%"></i></div>
        <div class="lw-sprint-word${G.flash ? " " + G.flash : ""}" lang="ar" dir="rtl">${G.item.ar}</div>
        <div class="lw-sprint-btns" dir="rtl">${GROUPS.map((g) => `<button class="opt" data-a="${g}"><span lang="ar">${GROUP_AR[g]}</span><small>${T("grp." + g)}</small></button>`).join("")}</div>
      </div>`);
      root.querySelectorAll("[data-a]").forEach((b) => (b.onclick = () => {
        const ok = b.dataset.a === G.item.grp;
        api.answer(ok);
        if (ok) { G.right++; credit(G.item.id); } else G.wrong++;
        G.flash = ok ? "ok" : "no";
        G.item = nextItem(G.item);
        spiel();
      }));
    }

    function show() { ({ erklaerung, lernen, aufgaben, spiel })[S.tab](); }
    show();
    return stop;
  },
};
