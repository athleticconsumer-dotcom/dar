// =====================================================================
//  RUBRIK: TAGE & MONATE  (الأَيَّام وَالشُّهُور)
//  Tabs: Erklärung · Lernen · Aufgaben · Spiel (Reihenfolge auf Zeit)
//  Fortschritt: mastery: { <id>: richtige }, order: { days|hijri|greg: Bestzeit in Sekunden }
// =====================================================================
import { toAr, rnd, shuffle, esc, loadCss } from "../../js/shared.js";
import { makeT, L } from "../../js/i18n.js";
import DICT from "./lang.js";
import { DAYS, HIJRI, HIJRI_NOTES, GREG, REL, SETS, MASTER_AT } from "./data.js";

const T = makeT(DICT);
const ALL = [...DAYS, ...HIJRI, ...GREG];
const ar = (s, cls = "") => `<span class="ar ${cls}" lang="ar" dir="rtl">${s}</span>`;
const LIST = { days: DAYS, hijri: HIJRI, greg: GREG };
const NUMW = ["أَحَد", "اثْنَان", "ثَلَاثَة", "أَرْبَعَة", "خَمْسَة"];

const score = (p) => ALL.reduce((s, x) => s + Math.min(p.mastery?.[x.id] || 0, MASTER_AT), 0) / (ALL.length * MASTER_AT);
const ordersDone = (p) => SETS.filter((k) => p.order?.[k] != null).length;
const glossOf = (x) => (x.g ? L(x.g) : x.tr);

/** Heutiges Datum in beiden Kalendern */
function todayInfo(d = new Date()) {
  let h = null;
  for (const cal of ["islamic-umalqura", "islamic"]) {
    try {
      const parts = new Intl.DateTimeFormat("en-u-ca-" + cal, { day: "numeric", month: "numeric", year: "numeric" }).formatToParts(d);
      const get = (t) => +parts.find((p) => p.type === t)?.value;
      if (get("month") >= 1 && get("month") <= 12) { h = { day: get("day"), month: get("month"), year: parseInt(parts.find((p) => p.type === "year").value) }; break; }
    } catch (e) {}
  }
  return { wd: DAYS[d.getDay()], gd: d.getDate(), gm: GREG[d.getMonth()], gy: d.getFullYear(), h };
}

export default {
  percent(p) { return score(p) * 80 + (ordersDone(p) / 3) * 20; },
  summary(p) { return T("sum", { a: ALL.filter((x) => (p.mastery?.[x.id] || 0) >= MASTER_AT).length, b: ALL.length }); },
  extraStats(p) { return T("extra", { a: ordersDone(p) }); },
  milestones() {
    const pc = (n) => Math.round((n / ALL.length) * 80);
    return [{ pct: pc(DAYS.length), label: T("ms.days") }, { pct: pc(DAYS.length + HIJRI.length), label: T("ms.hijri") }, { pct: 80, label: T("ms.greg") }, { pct: 100, label: T("ms.all") }];
  },

  mount(root, api) {
    loadCss(import.meta.url, "style.css");
    const S = { tab: api.progress().answered ? "aufgaben" : "erklaerung", set: "days", last: null, game: null };
    let timer = null;
    const stop = () => { clearInterval(timer); timer = null; };
    const credit = (id) => api.update((p) => { p.mastery = p.mastery || {}; p.mastery[id] = (p.mastery[id] || 0) + 1; });

    function frame(body) {
      root.innerHTML = `
        <div class="tabs" role="group">
          ${[["erklaerung", api.t("tab.explain")], ["lernen", api.t("tab.learn")], ["aufgaben", api.t("tab.tasks")], ["spiel", api.t("tab.game")]]
            .map(([k, t]) => `<button data-tab="${k}" aria-pressed="${S.tab === k}">${t}</button>`).join("")}
        </div>${body}`;
      root.querySelectorAll("[data-tab]").forEach((b) => (b.onclick = () => { stop(); S.tab = b.dataset.tab; S.game = null; show(); }));
      root.querySelectorAll("[data-say]").forEach((b) => (b.onclick = () => api.speak(b.dataset.say)));
    }

    const todayCard = () => {
      const t = todayInfo();
      return `<div class="card tm-today">
        <span class="eyebrow">${T("today")}</span>
        <button class="tm-today-ar" data-say="${esc("اليَوْمُ يَوْمُ " + t.wd.gen)}" lang="ar" dir="rtl">اليَوْمُ يَوْمُ ${t.wd.gen}</button>
        <div class="tm-today-grid">
          <div><small>${T("todayGreg")}</small>${ar(`${toAr(t.gd)} ${t.gm.ar} ${toAr(t.gy)}`, "tm-big")}<span>${t.gd}. ${esc(L(t.gm.g))} ${t.gy}</span></div>
          ${t.h ? `<div><small>${T("todayHijri")}</small>${ar(`${toAr(t.h.day)} ${HIJRI[t.h.month - 1].ar} ${toAr(t.h.year)} هـ`, "tm-big")}<span>${t.h.day}. ${HIJRI[t.h.month - 1].tr} ${t.h.year}</span></div>` : ""}
        </div></div>`;
    };

    // ---------------- Erklärung ----------------
    function erklaerung() {
      const dayRow = (d, i) => {
        const origin = i < 5 ? T("fromNum", { w: ar(NUMW[i]), n: i + 1 }) : i === 5 ? T("jumuaO") : T("sabtO");
        return `<div class="tm-row"><button class="tm-ar" data-say="${esc(d.ar)}" lang="ar">${d.ar}</button><div><b>${esc(L(d.g))}</b><span class="tm-tr">${d.tr}</span><span class="tm-o">${origin}</span></div></div>`;
      };
      frame(`
        ${todayCard()}
        <div class="card explain">
          <h2>${T("h1")}</h2><p>${T("p1")}</p>
          <div class="tm-rows">${DAYS.map(dayRow).join("")}</div>
        </div>
        <div class="card explain">
          <h2>${T("h2")}</h2>
          <p>${T("p2", { yawm: ar("يَوْم"), ex: ar("يَوْمُ الجُمُعَةِ") })}</p>
        </div>
        <div class="card explain">
          <h2>${T("h3")}</h2>
          <div class="tm-rel">${REL.map((r) => `<button data-say="${esc(r.ar)}"><span lang="ar">${r.ar}</span><small>${r.tr}</small><b>${T("relG." + r.id)}</b></button>`).join("")}</div>
          <p><b>${T("qa")}</b></p>
          <div class="tm-qa"><button data-say="مَا اليَوْمُ؟" lang="ar">مَا اليَوْمُ؟</button><span>${T("qaQ")}</span>
            <button data-say="اليَوْمُ يَوْمُ السَّبْتِ" lang="ar">اليَوْمُ يَوْمُ السَّبْتِ.</button><span>${T("qaA")}</span></div>
        </div>
        <div class="card explain">
          <h2>${T("h4")}</h2><p>${T("p4")}</p>
          <blockquote class="tm-quote">${ar("مِنْهَا أَرْبَعَةٌ حُرُمٌ")}<span>${T("q936")}</span></blockquote>
          <div class="tm-rows">${HIJRI.map((m, i) => `<div class="tm-row${m.sacred ? " sacred" : ""}"><span class="tm-n">${i + 1}</span><button class="tm-ar" data-say="${esc(m.ar)}" lang="ar">${m.ar}</button>
            <div><b>${m.tr}</b>${m.sacred ? ` <span class="pill">${T("sacred")}</span>` : ""}${HIJRI_NOTES.includes(m.id) ? `<span class="tm-o">${T("hn." + m.id)}</span>` : ""}</div></div>`).join("")}</div>
        </div>
        <div class="card explain">
          <h2>${T("h5")}</h2><p>${T("p5")}</p>
          <div class="tablewrap"><table class="ref tm-greg"><thead><tr><th></th><th>${T("common")}</th><th>${T("lev")}</th></tr></thead><tbody>
            ${GREG.map((m, i) => `<tr><td>${i + 1} · ${esc(L(m.g))}</td><td><button data-say="${esc(m.ar)}" lang="ar">${m.ar}</button></td><td class="tm-lev"><button data-say="${esc(m.lev)}" lang="ar">${m.lev}</button></td></tr>`).join("")}
          </tbody></table></div>
        </div>
        <div class="row center"><button class="btn primary" data-go>${T("toLearn")}</button></div>`);
      root.querySelector("[data-go]").onclick = () => { S.tab = "lernen"; show(); };
    }

    // ---------------- Lernen ----------------
    function lernen() {
      const m = api.progress().mastery || {};
      const list = LIST[S.set];
      frame(`<div class="card">
        <div class="chips" role="group">${SETS.map((k) => `<button class="chip" data-set="${k}" aria-pressed="${S.set === k}">${T("set." + k)}</button>`).join("")}</div>
        <p class="note" style="text-align:center">${T("tapHint")}</p>
        <div class="tm-cards">${list.map((x, i) => `
          <button class="tm-card${x.sacred ? " sacred" : ""}" data-say="${esc(x.ar)}">
            <span class="tm-card-n">${i + 1}</span>
            <span class="tm-card-ar" lang="ar" dir="rtl">${x.ar}</span>
            <span class="tm-card-tr">${esc(x.tr)}</span>
            <span class="tm-card-g">${x.g ? esc(L(x.g)) : x.sacred ? T("sacred") : "&nbsp;"}${(m[x.id] || 0) >= MASTER_AT ? " ✓" : ""}</span>
            ${x.lev ? `<span class="tm-card-lev" lang="ar">${x.lev}</span>` : ""}
          </button>`).join("")}</div>
      </div>`);
      root.querySelectorAll("[data-set]").forEach((b) => (b.onclick = () => { S.set = b.dataset.set; lernen(); }));
    }

    // ---------------- Aufgaben ----------------
    function makeTask() {
      const m = api.progress().mastery || {};
      const open = ALL.filter((x) => (m[x.id] || 0) < MASTER_AT && x.id !== S.last);
      const pool = open.length ? open : ALL.filter((x) => x.id !== S.last);
      const it = pool[rnd(0, pool.length - 1)];
      S.last = it.id;
      const list = DAYS.includes(it) ? DAYS : HIJRI.includes(it) ? HIJRI : GREG;
      const idx = list.indexOf(it);
      const others = (n) => shuffle(list.filter((x) => x !== it)).slice(0, n);
      const arOpt = (x) => ({ v: x.id, html: x.ar, arabic: true });
      const r = Math.random();
      if (list === DAYS) {
        const facts = it.id === "jumua" && r < 0.3;
        if (facts) return { it, q: T("q.jumuah"), opts: [it, ...others(3)].map(arOpt) };
        if (r < 0.35) return { it, q: T("q.ar2g"), big: it.ar, opts: [it, ...others(3)].map((x) => ({ v: x.id, html: esc(L(x.g)) })) };
        if (r < 0.65) return { it, q: T("q.g2ar"), big: L(it.g), bigLatin: true, opts: [it, ...others(3)].map(arOpt) };
        const after = r < 0.83, ref = DAYS[(idx + (after ? 6 : 1)) % 7];
        return { it, q: T(after ? "q.after" : "q.before", { d: L(ref.g) }), big: ref.ar, opts: [it, ...others(3)].map(arOpt) };
      }
      if (list === HIJRI) {
        const fact = { ramadan: "q.fast", dhulhijja: "q.hajj", shawwal: "q.fitr", muharram: "q.ashura" }[it.id];
        if (fact && r < 0.5) return { it, q: T(fact), opts: [it, ...others(3)].map(arOpt) };
        if (r < 0.5) return { it, q: T("q.hnum", { n: idx + 1 }), opts: [it, ...others(3)].map(arOpt) };
        const nums = shuffle([idx + 1, ...shuffle([...Array(12).keys()].map((k) => k + 1).filter((k) => k !== idx + 1)).slice(0, 3)]);
        return { it, q: T("q.hpos"), big: it.ar, opts: nums.map((n) => ({ v: n === idx + 1 ? it.id : "x" + n, html: String(n) })) };
      }
      if (r < 0.35) return { it, q: T("q.ar2g"), big: it.ar, opts: [it, ...others(3)].map((x) => ({ v: x.id, html: esc(L(x.g)) })) };
      if (r < 0.7) return { it, q: T("q.g2ar"), big: L(it.g), bigLatin: true, opts: [it, ...others(3)].map(arOpt) };
      return { it, q: T("q.gnum", { n: idx + 1 }), opts: [it, ...others(3)].map(arOpt) };
    }
    function aufgaben() {
      const k = makeTask();
      const opts = shuffle(k.opts);
      frame(`<div class="card tm-task">
        <p class="note" style="text-align:center">${esc(k.q)}</p>
        ${k.big ? (k.bigLatin ? `<div class="tm-big-q">${esc(k.big)}</div>` : `<button class="tm-big-ar" data-say="${esc(k.big)}" lang="ar" dir="rtl">${k.big}</button>`) : ""}
        <div class="opts">${opts.map((o) => `<button class="opt${o.arabic ? " arabic" : ""}" data-v="${o.v}" ${o.arabic ? 'lang="ar" dir="rtl"' : ""}>${o.html}</button>`).join("")}</div>
        <div class="feedback" aria-live="polite"></div>
        <div class="row center"><button class="btn primary" data-next hidden>${T("next")}</button></div>
      </div>`);
      root.querySelectorAll(".opt").forEach((b) => (b.onclick = () => {
        const ok = b.dataset.v === k.it.id;
        root.querySelectorAll(".opt").forEach((x) => (x.disabled = true));
        b.classList.add(ok ? "ok" : "no");
        if (!ok) root.querySelector(`.opt[data-v="${k.it.id}"]`)?.classList.add("ok");
        api.answer(ok); if (ok) credit(k.it.id);
        if (api.canSpeak()) api.speak(k.it.ar, { auto: true });
        const fb = root.querySelector(".feedback");
        fb.className = "feedback " + (ok ? "ok" : "no");
        fb.textContent = `${ok ? api.t("c.right") : api.t("c.wrong")} ${k.it.tr} = ${glossOf(k.it)}`;
        const nx = root.querySelector("[data-next]"); nx.hidden = false; nx.onclick = aufgaben; nx.focus({ preventScroll: true });
      }));
    }

    // ---------------- Spiel: Reihenfolge ----------------
    function spiel() {
      const best = api.progress().order || {};
      const G = S.game;
      if (!G) {
        frame(`<div class="card tm-game">
          <h2>${T("gTitle")}</h2><p class="note">${T("gHint")}</p>
          <div class="tm-sets">${SETS.map((k) => `<button class="choice" data-g="${k}"><b>${T("set." + k)}${best[k] != null ? " ✓" : ""}</b>${best[k] != null ? T("gBest", { s: best[k] }) : T("gNoBest")}</button>`).join("")}</div>
        </div>`);
        root.querySelectorAll("[data-g]").forEach((b) => (b.onclick = () => {
          const list = LIST[b.dataset.g];
          S.game = { set: b.dataset.g, tiles: shuffle(list.map((x, i) => ({ x, i }))), next: 0, errors: 0, start: Date.now(), wrong: null };
          stop(); timer = setInterval(() => { const el = root.querySelector("#tmTime"); if (el && S.game && !S.game.done) el.textContent = T("gTime", { s: Math.floor((Date.now() - S.game.start) / 1000) }); }, 500);
          spiel();
        }));
        return;
      }
      const list = LIST[G.set];
      frame(`<div class="card tm-game">
        <div class="tm-game-head"><h2>${T("set." + G.set)}</h2><span class="pill" id="tmTime">${T("gTime", { s: Math.floor(((G.end || Date.now()) - G.start) / 1000) })}</span></div>
        <ol class="tm-done-list">${list.slice(0, G.next).map((x) => `<li lang="ar">${x.ar}</li>`).join("")}</ol>
        ${G.done ? `<div class="feedback ok">${T("gDone", { s: G.secs })} · ${T("gErr", { n: G.errors })}</div>
            <p class="note" style="text-align:center">${T("gBest", { s: best[G.set] })}</p>
            <div class="row center"><button class="btn" id="tmAgain">${T("gAgain")}</button><button class="btn primary" id="tmOther">${T("gOther")}</button></div>`
          : `<div class="tm-tiles">${G.tiles.filter((t) => t.i >= G.next).map((t) => `<button class="tm-tile${G.wrong === t.i ? " no" : ""}" data-i="${t.i}" lang="ar" dir="rtl">${t.x.ar}</button>`).join("")}</div>
             <p class="note" style="text-align:center">${T("gErr", { n: G.errors })}</p>`}
      </div>`);
      root.querySelectorAll(".tm-tile").forEach((b) => (b.onclick = () => {
        const i = +b.dataset.i;
        if (i === G.next) {
          G.next++; G.wrong = null; api.answer(true);
          if (G.next >= list.length) {
            G.done = true; G.end = Date.now(); G.secs = Math.round((G.end - G.start) / 1000); stop();
            api.update((p) => { p.order = p.order || {}; if (p.order[G.set] == null || G.secs < p.order[G.set]) p.order[G.set] = G.secs; });
          }
        } else { G.errors++; G.wrong = i; api.answer(false); }
        spiel();
      }));
      const again = root.querySelector("#tmAgain"); if (again) again.onclick = () => { const set = G.set; S.game = null; spiel(); root.querySelector(`[data-g="${set}"]`).click(); };
      const other = root.querySelector("#tmOther"); if (other) other.onclick = () => { S.game = null; spiel(); };
    }

    function show() { ({ erklaerung, lernen, aufgaben, spiel })[S.tab](); }
    show();
    return stop;
  },
};
