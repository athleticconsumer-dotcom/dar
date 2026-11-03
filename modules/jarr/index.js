// =====================================================================
//  RUBRIK: PRÄPOSITIONEN (حُرُوف الجَرّ) · Grammatik-Weg Level 1, Schritt 8
//  Aufbau über js/lesson.js · Fortschritt: mastery { <präposition>: richtige }, sprintBest
// =====================================================================
import { lesson, standard, nextItem, pick, arS, ayatHtml, al, endV, shuffle, esc } from "../../js/lesson.js";
import { makeT, L } from "../../js/i18n.js";
import DICT from "./lang.js";
import { PREPS, NOUNS, PHRASES, QURAN, MASTER_AT, GOAL } from "./data.js";

const T = makeT(DICT);
const gl = (x) => L(x.g) || x.g.de;
const P = Object.fromEntries(PREPS.map((p) => [p.id, p]));
const std = standard({ ids: PREPS.map((p) => p.id), at: MASTER_AT, goal: GOAL, sum: (a, b) => T("sum", { a, b }) });
/** Präposition + bestimmtes Nomen mit Endvokal v (richtig: Kasra) */
function join(pid, nid, v = "ِ") {
  const d = al(endV(NOUNS[nid], v));
  switch (pid) {
    case "min": return "مِنَ " + d;
    case "an": return "عَنِ " + d;
    case "li": return "لِ" + d.slice(1);
    case "bi": return "بِ" + d;
    case "ka": return "كَ" + d;
    default: return P[pid].ar + " " + d;
  }
}
/** typische Schreibfehler bei angehängten Formen */
const badWrite = (pid, nid) => {
  const d = al(endV(NOUNS[nid], "ِ"));
  return { min: ["مِنْ " + d, "مِنُ " + d], an: ["عَنْ " + d, "عَنَ " + d], li: ["لِ" + d, "لِ " + d], bi: ["بِ " + d, "بَ" + d] }[pid];
};

export default {
  ...std,
  milestones() { return [{ pct: 38, label: T("ms.half") }, { pct: 75, label: T("ms.all") }, { pct: 100, label: T("ms.sprint") }]; },
  mount(root, api) {
    return lesson({
      api, root, base: import.meta.url, title: T("gTitle"), goal: GOAL,
      explain: () => `
        <div class="card explain"><h2>${T("h1")}</h2><p>${T("p1")}</p>
          <div class="ls-chips" dir="rtl">${PREPS.map((p) => `<button data-say="${esc(p.ar.replace("ـ", ""))}"><span lang="ar">${p.ar}</span><small dir="ltr">${esc(gl(p))}</small></button>`).join("")}</div></div>
        <div class="card explain"><h2>${T("h2")}</h2><p>${T("p2", { mj: arS("مَجْرُور") })}</p>
          <div class="jr-rows" dir="rtl">${[["الْبَيْتُ", "فِي الْبَيْتِ"], ["بَيْتٌ", "فِي بَيْتٍ"]].map(([a, b]) => `<button data-say="${esc(b)}"><span lang="ar">${a}</span><i>←</i><span lang="ar" class="jr-k">${b}</span></button>`).join("")}</div></div>
        <div class="card explain"><h2>${T("h3")}</h2><p>${T("p3", { a: arS("بِـ"), b: arS("لِـ"), c: arS("كَـ"), ex: arS("بِسْمِ اللّٰهِ") })}</p></div>
        <div class="card explain"><h2>${T("h4")}</h2><p>${T("p4")}</p>
          <div class="ls-chips" dir="rtl">${[["min", "masjid"], ["an", "dars"], ["li", "bayt"], ["bi", "qalam"]].map(([p, n]) => `<button data-say="${esc(join(p, n))}"><span lang="ar">${join(p, n)}</span><small dir="ltr">${T("j." + p)}</small></button>`).join("")}</div></div>
        <div class="card explain"><h2>${T("h5")}</h2>${ayatHtml(QURAN, L)}</div>`,
      learn: (S, m) => `<p class="note" style="text-align:center">${T("learnHint")}</p>
        ${PREPS.map((p) => `<div class="jr-group"><h3><span lang="ar">${p.ar}</span> · ${esc(gl(p))}${(m[p.id] || 0) >= MASTER_AT ? " ✓" : ""}</h3>
          <div class="ls-chips" dir="rtl">${PHRASES.filter((x) => x.p === p.id).map((x) => `<button data-say="${esc(join(x.p, x.n))}"><span lang="ar">${join(x.p, x.n)}</span><small dir="ltr">${esc(gl(x))}</small></button>`).join("")}</div></div>`).join("")}`,
      task: (S, m) => {
        const p = nextItem(PREPS, m, MASTER_AT, S.last); S.last = p.id;
        const ph = pick(PHRASES.filter((x) => x.p === p.id)), good = join(p.id, ph.n);
        const r = Math.random();
        if (badWrite(p.id, ph.n) && r < 0.25) return { q: T("q.write"), sub: `${p.ar} + ${al(NOUNS[ph.n])}`, say: good, credit: p.id, answer: good, why: T("e.write", { f: arS(good) }),
          opts: shuffle([good, ...badWrite(p.id, ph.n)]).map((v) => ({ v, html: v, a: 1 })) };
        if (r < 0.5) return { q: T("q.end"), big: `${p.ar}<span class="jr-gap">…</span>`, sub: esc(gl(ph)), say: good, credit: p.id, answer: good, why: T("e.end", { p: arS(p.ar), f: arS(good) }),
          opts: shuffle(["ِ", "ُ", "َ"].map((v) => join(p.id, ph.n, v))).map((v) => ({ v, html: v, a: 1 })) };
        if (r < 0.8) { const others = shuffle(PREPS.filter((x) => x !== p)).slice(0, 3);
          return { q: T("q.mean", { g: esc(gl(ph)) }), say: good, credit: p.id, answer: p.id, why: T("e.mean", { f: arS(good), g: esc(gl(ph)) }),
            opts: shuffle([p, ...others]).map((x) => ({ v: x.id, html: join(x.id, ph.n), a: 1 })) }; }
        const others = shuffle(PREPS.filter((x) => x !== p)).slice(0, 3);
        return { q: T("q.prep"), big: p.ar, say: p.ar.replace("ـ", ""), credit: p.id, answer: p.id, why: T("e.prep", { p: arS(p.ar), g: esc(gl(p)) }),
          opts: shuffle([p, ...others]).map((x) => ({ v: x.id, html: esc(gl(x)) })) };
      },
      sprint: () => {
        const ph = pick(PHRASES), ok = Math.random() < 0.5;
        return { big: join(ph.p, ph.n, ok ? "ِ" : pick(["ُ", "َ"])), credit: ph.p, answer: ok ? "ok" : "no",
          opts: [{ v: "no", html: T("no") }, { v: "ok", html: T("ok") }] };
      },
    });
  },
};
