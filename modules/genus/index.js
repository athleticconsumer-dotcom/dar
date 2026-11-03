// =====================================================================
//  RUBRIK: MÄNNLICH & WEIBLICH (المُذَكَّر وَالمُؤَنَّث) · Grammatik-Weg Level 1, Schritt 4
//  Aufbau über js/lesson.js · Fortschritt: mastery { <nomen|paar>: richtige }, sprintBest
// =====================================================================
import { lesson, standard, nextItem, pick, arS, ayatHtml, shuffle, esc } from "../../js/lesson.js";
import { makeT, L } from "../../js/i18n.js";
import DICT from "./lang.js";
import { NOUNS, PAIRS, REASONS, QURAN, MASTER_AT, GOAL, openT, noTan } from "./data.js";

const T = makeT(DICT);
const gl = (x) => L(x.g) || x.g.de;
const ITEMS = [...NOUNS, ...PAIRS];
const std = standard({ ids: ITEMS.map((x) => x.id), at: MASTER_AT, goal: GOAL, sum: (a, b) => T("sum", { a, b }) });
const chip = (ar, small, cls) => `<button class="gn-${cls}" data-say="${esc(ar)}"><span lang="ar">${ar}</span><small dir="ltr">${small}</small></button>`;
const nounChips = (why, m = {}) => `<div class="ls-chips" dir="rtl">${NOUNS.filter((x) => x.why === why).map((x) => chip(x.ar, esc(gl(x)) + ((m[x.id] || 0) >= MASTER_AT ? " ✓" : ""), x.gen)).join("")}</div>`;
const pairRows = (m = {}) => `<div class="gn-pairs">${PAIRS.map((p) => `<div class="gn-pair" dir="rtl">
  <button class="gn-m" data-say="${esc(p.m)}" lang="ar">${p.m}</button><span class="gn-arrow">←</span>
  <button class="gn-f" data-say="${esc(p.f)}" lang="ar">${p.f}</button>
  <small dir="ltr">${esc(gl(p))}${(m[p.id] || 0) >= MASTER_AT ? " ✓" : ""}</small></div>`).join("")}</div>`;
const genOpts = [{ v: "f", html: T("fS"), cls: "gn-f" }, { v: "m", html: T("mS"), cls: "gn-m" }];

export default {
  ...std,
  milestones() { return [{ pct: 30, label: T("ms.ta") }, { pct: 75, label: T("ms.all") }, { pct: 100, label: T("ms.sprint") }]; },
  mount(root, api) {
    return lesson({
      api, root, base: import.meta.url, title: T("gTitle"), goal: GOAL,
      explain: () => `
        <div class="card explain"><h2>${T("h1")}</h2><p>${T("p1", { ex: arS("بَيْتٌ", "gn-m") })}</p></div>
        <div class="card explain"><h2>${T("h2")}</h2><p>${T("p2")}</p>${pairRows()}<p class="note">${T("p2b")}</p></div>
        <div class="card explain"><h2>${T("h3")}</h2><p>${T("p3")}</p>${nounChips("alif")}</div>
        <div class="card explain"><h2>${T("h4")}</h2><p>${T("p4")}</p>${nounChips("meaning")}</div>
        <div class="card explain"><h2>${T("h5")}</h2><p>${T("p5")}</p>${nounChips("hidden")}</div>
        <div class="card explain"><h2>${T("h6")}</h2><p>${T("p6")}</p>${ayatHtml(QURAN, L)}</div>`,
      learn: (S, m) => `<p class="note" style="text-align:center">${api.t("ls.tap")}</p>
        <h3>${T("learnPairs")}</h3>${pairRows(m)}
        <h3>${T("learnNouns")}</h3>
        ${["m", ...REASONS].map((w) => `<h4 class="gn-h">${T("why." + w)}</h4>${nounChips(w, m)}`).join("")}`,
      task: (S, m) => {
        const x = nextItem(ITEMS, m, MASTER_AT, S.last); S.last = x.id;
        if (x.m) { // Paar
          const other = pick(PAIRS.filter((p) => p !== x));
          const why = T("e.pair", { m: arS(x.m), f: arS(x.f) });
          if (Math.random() < 0.6) return { q: T("q.makeF"), big: x.m, sub: esc(gl(x)), say: x.f, credit: x.id, answer: x.f, why,
            opts: shuffle([x.f, openT(x.f), noTan(x.f), other.f]).map((v) => ({ v, html: v, a: 1 })) };
          return { q: T("q.makeM"), big: x.f, sub: esc(gl(x)), say: x.m, credit: x.id, answer: x.m, why,
            opts: shuffle([x.m, other.m, x.f, pick(PAIRS.filter((p) => p !== x && p !== other)).m]).map((v) => ({ v, html: v, a: 1 })) };
        }
        const why = T("e.gen", { w: arS(x.ar), gen: T(x.gen), why: T("why." + x.why) });
        if (x.gen === "f" && Math.random() < 0.45) return { q: T("q.why"), big: x.ar, sub: esc(gl(x)), say: x.ar, credit: x.id, answer: x.why, why,
          opts: REASONS.map((r) => ({ v: r, html: T("why." + r) })) };
        return { q: T("q.which"), big: x.ar, sub: esc(gl(x)), say: x.ar, credit: x.id, answer: x.gen, why, opts: genOpts };
      },
      sprint: () => {
        const x = pick(ITEMS);
        if (x.m) { const f = Math.random() < 0.5; return { big: f ? x.f : x.m, credit: x.id, answer: f ? "f" : "m", opts: genOpts }; }
        return { big: x.ar, credit: x.id, answer: x.gen, opts: genOpts };
      },
    });
  },
};
