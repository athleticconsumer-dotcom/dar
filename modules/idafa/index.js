// =====================================================================
//  RUBRIK: DIE IḌĀFA (الإِضَافَة) · Grammatik-Weg Level 1, Schritt 9
//  Aufbau über js/lesson.js · Fortschritt: mastery { <iḍāfa>: richtige }, sprintBest
// =====================================================================
import { lesson, standard, nextItem, pick, arS, ayatHtml, al, endV, shuffle, esc } from "../../js/lesson.js";
import { makeT, L } from "../../js/i18n.js";
import DICT from "./lang.js";
import { ITEMS, QURAN, MASTER_AT, GOAL } from "./data.js";

const T = makeT(DICT);
const gl = (x) => L(x.g) || x.g.de;
const std = standard({ ids: ITEMS.map((x) => x.id), at: MASTER_AT, goal: GOAL, sum: (a, b) => T("sum", { a, b }) });
const second = (x) => (x.al === 1 ? al(x.b) : x.b);
/** Iḍāfa bauen. err: ok | al (ال am 1. Wort) | tan (Tanwīn am 1. Wort) | kasra (2. Wort mit Ḍamma) */
function make(x, err = "ok") {
  const a = err === "al" ? al(x.a.replace(/^اِ/, "ا")) : err === "tan" ? endV(x.a, "ٌ") : x.a;
  let b = second(x);
  if (err === "kasra") b = b.endsWith("ٍ") ? endV(b, "ٌ") : endV(b, "ُ");
  return `${a} ${b}`;
}
const ERRS = ["ok", "al", "tan", "kasra"];

export default {
  ...std,
  milestones() { return [{ pct: 38, label: T("ms.half") }, { pct: 75, label: T("ms.all") }, { pct: 100, label: T("ms.sprint") }]; },
  mount(root, api) {
    const B = ITEMS[0], K = ITEMS[1];
    const say = (s) => `<button data-say="${esc(s)}"><span lang="ar">${s}</span></button>`;
    return lesson({
      api, root, base: import.meta.url, title: T("gTitle"), goal: GOAL,
      explain: () => `
        <div class="card explain"><h2>${T("h1")}</h2><p>${T("p1")}</p>
          <div class="id-parts" dir="rtl"><div class="id-a"><span lang="ar">${B.a}</span><small dir="ltr">${T("mudaf")}</small></div><div class="id-b"><span lang="ar">${second(B)}</span><small dir="ltr">${T("ilayh")}</small></div></div></div>
        <div class="card explain"><h2>${T("h2")}</h2><p>${T("p2")}</p>
          <div class="id-cmp" dir="rtl"><button class="ok" data-say="${esc(make(K))}"><span lang="ar">${make(K)}</span><small>✓</small></button><button class="no"><s lang="ar">${make(K, "al")}</s><small>✗</small></button><button class="no"><s lang="ar">${make(K, "tan")}</s><small>✗</small></button></div></div>
        <div class="card explain"><h2>${T("h3")}</h2><p>${T("p3")}</p>
          <div class="id-cmp" dir="rtl"><button class="ok" data-say="${esc(make(K))}"><span lang="ar">${make(K)}</span><small>✓</small></button><button class="no"><s lang="ar">${make(K, "kasra")}</s><small>✗</small></button></div></div>
        <div class="card explain"><h2>${T("h4")}</h2><p>${T("p4", { a: arS("بَيْتُ الرَّجُلِ"), b: arS("بَيْتُ رَجُلٍ") })}</p></div>
        <div class="card explain"><h2>${T("h5")}</h2><p>${T("p5", { a: arS("سَيَّارَةُ الْمُعَلِّمِ"), b: arS("كِتَابِي") })}</p></div>
        <div class="card explain"><h2>${T("h6")}</h2><p>${T("p6", { a: arS("مَالِكِ يَوْمِ الدِّينِ") })}</p></div>
        <div class="card explain"><h2>${T("h7")}</h2>${ayatHtml(QURAN, L)}</div>`,
      learn: (S, m) => `<p class="note" style="text-align:center">${T("learnHint")}</p>
        <div class="id-list">${ITEMS.map((x) => `<button data-say="${esc(make(x))}"><span lang="ar" dir="rtl"><b class="id-at">${x.a}</b> <b class="id-bt">${second(x)}</b></span><small>${esc(gl(x))}${(m[x.id] || 0) >= MASTER_AT ? " ✓" : ""}</small></button>`).join("")}</div>`,
      task: (S, m) => {
        const x = nextItem(ITEMS, m, MASTER_AT, S.last); S.last = x.id;
        const good = make(x), why = T("e.ok", { x: arS(good), g: esc(gl(x)) });
        const r = Math.random();
        if (r < 0.4) return { q: T("q.make", { g: esc(gl(x)) }), say: good, credit: x.id, answer: "ok", why,
          opts: shuffle(ERRS.map((e) => ({ v: e, html: make(x, e), a: 1 }))) };
        if (r < 0.75) { const e = pick(ERRS); return { q: T("q.what"), big: make(x, e), say: good, credit: x.id, answer: e, why,
          opts: ERRS.map((k) => ({ v: k, html: T("w." + k) })) }; }
        const others = shuffle(ITEMS.filter((y) => y !== x)).slice(0, 3);
        return { q: T("q.mean"), big: good, say: good, credit: x.id, answer: x.id, why, opts: shuffle([x, ...others]).map((y) => ({ v: y.id, html: esc(gl(y)) })) };
      },
      sprint: () => {
        const x = pick(ITEMS), e = Math.random() < 0.45 ? "ok" : pick(["al", "tan", "kasra"]);
        return { big: make(x, e), credit: x.id, answer: e === "ok" ? "ok" : "no",
          opts: [{ v: "no", html: "✗" }, { v: "ok", html: "✓" }] };
      },
    });
  },
};
