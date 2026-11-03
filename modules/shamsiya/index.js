// =====================================================================
//  RUBRIK: SONNEN- & MONDBUCHSTABEN (الحُرُوف الشَّمْسِيَّة وَالقَمَرِيَّة) · Grammatik-Weg Level 1, Schritt 3
//  Aufbau über js/lesson.js · Fortschritt: mastery { <buchstabe>: richtige }, sprintBest
// =====================================================================
import { lesson, standard, nextItem, pick, arS, shuffle, esc } from "../../js/lesson.js";
import { makeT, L } from "../../js/i18n.js";
import DICT from "./lang.js";
import { LETTERS, MASTER_AT, GOAL, word, wrongWord, say, wrongSay } from "./data.js";

const T = makeT(DICT);
const gl = (x) => L(x.g) || x.g.de;
const kind = (x) => (x.sun ? "sun" : "moon");
const FATIHA = [["ٱلۡحَمۡدُ", "1:2", 0], ["ٱلۡعَٰلَمِينَ", "1:2", 0], ["ٱلرَّحۡمَٰنِ", "1:3", 1], ["ٱلرَّحِيمِ", "1:3", 1], ["ٱلدِّينِ", "1:4", 1], ["ٱلصِّرَٰطَ", "1:6", 1], ["ٱلۡمُسۡتَقِيمَ", "1:6", 0], ["ٱلضَّآلِّينَ", "1:7", 1]];
const std = standard({ ids: LETTERS.map((x) => x.id), at: MASTER_AT, goal: GOAL, sum: (a, b) => T("sum", { a, b }) });
const chip = (x) => `<button class="sm-${kind(x)}" data-say="${esc(word(x))}"><span lang="ar">${word(x)}</span><small dir="ltr">${say(x)} · ${esc(gl(x))}</small></button>`;

export default {
  ...std,
  milestones() { return [{ pct: 38, label: T("ms.half") }, { pct: 75, label: T("ms.all") }, { pct: 100, label: T("ms.sprint") }]; },
  mount(root, api) {
    const S0 = LETTERS.find((x) => x.id === "sh"), M0 = LETTERS.find((x) => x.id === "q");
    return lesson({
      api, root, base: import.meta.url, title: T("gTitle"), goal: GOAL,
      explain: () => `
        <div class="card explain"><h2>${T("h1")}</h2><p>${T("p1")}</p>
          <div class="sm-pair" dir="rtl">
            ${[M0, S0].map((x) => `<button class="sm-box sm-${kind(x)}" data-say="${esc(word(x))}"><small dir="ltr">${T(kind(x) + "S")}</small><span lang="ar">${word(x)}</span><em dir="ltr">${say(x)}</em><i dir="ltr">${T(kind(x) + "Rule")}</i></button>`).join("")}
          </div></div>
        <div class="card explain"><h2>${T("h2")}</h2><p>${T("p2", { ex: arS("الشَّمْسُ") })}</p>
          <div class="sm-letters sm-sun" dir="rtl" lang="ar">${LETTERS.filter((x) => x.sun).map((x) => `<span>${x.l}</span>`).join("")}</div></div>
        <div class="card explain"><h2>${T("h3")}</h2><p>${T("p3", { ex: arS("الْقَمَرُ") })}</p>
          <div class="sm-letters sm-moon" dir="rtl" lang="ar">${LETTERS.filter((x) => !x.sun).map((x) => `<span>${x.l}</span>`).join("")}</div></div>
        <div class="card explain"><h2>${T("h4")}</h2><p>${T("p4", { ex: arS("اِبْغِ حَجَّكَ وَخَفْ عَقِيمَهُ", "sm-moon-t") })}</p></div>
        <div class="card explain"><h2>${T("h5")}</h2><p>${T("p5")}</p>
          <div class="ls-chips" dir="rtl">${FATIHA.map(([w, r, s]) => `<span class="ls-chip sm-${s ? "sun" : "moon"}"><span lang="ar">${w}</span><small>${r}</small></span>`).join("")}</div></div>`,
      learn: (S, m) => `<p class="note" style="text-align:center">${T("learnHint")}</p>
        ${["sun", "moon"].map((k) => `<h3 class="sm-h sm-${k}">${T(k + "S")}</h3>
          <div class="sm-grid" dir="rtl">${LETTERS.filter((x) => kind(x) === k).map((x) => `<button class="sm-${k}" data-say="${esc(word(x))}"><b lang="ar">${x.l}</b><span lang="ar">${word(x)}</span><small dir="ltr">${say(x)} · ${esc(gl(x))}${(m[x.id] || 0) >= MASTER_AT ? " ✓" : ""}</small></button>`).join("")}</div>`).join("")}`,
      task: (S, m) => {
        const x = nextItem(LETTERS, m, MASTER_AT, S.last); S.last = x.id;
        const why = T("e." + kind(x), { l: arS(x.l), w: arS(word(x)), s: say(x) });
        const special = x.id === "l" || x.id === "a";
        const type = special ? "which" : pick(["which", "which", "read", "write"]);
        if (type === "which") return { q: T("q.which"), big: word(x), say: word(x), credit: x.id, answer: kind(x), why,
          opts: [{ v: "sun", html: T("sunS"), cls: "sm-sun" }, { v: "moon", html: T("moonS"), cls: "sm-moon" }] };
        if (type === "read") return { q: T("q.read"), big: word(x), say: word(x), credit: x.id, answer: say(x), why,
          opts: shuffle([{ v: say(x), html: say(x) }, { v: wrongSay(x), html: wrongSay(x) }]) };
        return { q: T("q.write", { g: esc(gl(x)) }), sub: say(x), say: word(x), credit: x.id, answer: word(x), why,
          opts: shuffle([{ v: word(x), html: word(x), a: 1 }, { v: wrongWord(x), html: wrongWord(x), a: 1 }]) };
      },
      sprint: () => { const x = pick(LETTERS); return { big: word(x), credit: x.id, answer: kind(x),
        opts: [{ v: "moon", html: `<b>${T("moonS")}</b><small>قَمَرِيَّة</small>`, cls: "sm-moon" }, { v: "sun", html: `<b>${T("sunS")}</b><small>شَمْسِيَّة</small>`, cls: "sm-sun" }] }; },
    });
  },
};
