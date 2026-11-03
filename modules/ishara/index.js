// =====================================================================
//  RUBRIK: HINWEISWÖRTER (أَسْمَاء الإِشَارَة) · Grammatik-Weg Level 1, Schritt 6
//  Aufbau über js/lesson.js · Fortschritt: mastery { <hinweiswort>: richtige }, sprintBest
// =====================================================================
import { lesson, standard, nextItem, pick, arS, ayatHtml, shuffle, esc } from "../../js/lesson.js";
import { makeT, L } from "../../js/i18n.js";
import DICT from "./lang.js";
import { DEMS, NOUNS, PLURALS, QURAN, MASTER_AT, GOAL, dual, withAl, demFor } from "./data.js";

const T = makeT(DICT);
const gl = (x) => L(x.g) || x.g.de;
const D = Object.fromEntries(DEMS.map((d) => [d.id, d]));
const std = standard({ ids: DEMS.map((d) => d.id), at: MASTER_AT, goal: GOAL, sum: (a, b) => T("sum", { a, b }) });
const demChip = (d, ok) => `<button data-say="${esc(d.ar)}"><span lang="ar">${d.ar}</span><small>${esc(T("d." + d.id))}${ok ? " ✓" : ""}</small></button>`;
/** passendes Wort für ein Hinweiswort erzeugen */
function nounFor(d) {
  if (d.num === "p") return { ar: pick(PLURALS).ar };
  const n = pick(NOUNS.filter((x) => x.gen === d.gen));
  return { ar: d.num === "d" ? dual(n) : n.ar, n };
}
/** Falschantworten: zuerst dieselbe Entfernung oder dasselbe Geschlecht */
const others = (d, k = 3) => shuffle(DEMS.filter((x) => x !== d)).sort((a, b) => ((b.dist === d.dist) + (b.num === d.num)) - ((a.dist === d.dist) + (a.num === d.num))).slice(0, k);
const say = (d, w) => `${d.ar} ${w}`;

export default {
  ...std,
  milestones() { return [{ pct: 20, label: T("ms.near") }, { pct: 75, label: T("ms.all") }, { pct: 100, label: T("ms.sprint") }]; },
  mount(root, api) {
    const kb = NOUNS[0];
    return lesson({
      api, root, base: import.meta.url, title: T("gTitle"), goal: GOAL,
      explain: () => `
        <div class="card explain"><h2>${T("h1")}</h2><p>${T("p1", { a: arS("هٰذَا"), b: arS("هٰذِهِ") })}</p>
          <div class="ls-chips" dir="rtl">${[["هٰذَا كِتَابٌ", kb], ["هٰذِهِ سَيَّارَةٌ", NOUNS[6]]].map(([s, n]) => `<button data-say="${esc(s)}"><span lang="ar">${s}</span><small dir="ltr">${esc(gl(n))}</small></button>`).join("")}</div></div>
        <div class="card explain"><h2>${T("h2")}</h2><p>${T("p2", { a: arS("ذٰلِكَ"), b: arS("تِلْكَ") })}</p>
          <div class="ls-chips" dir="rtl">${[["ذٰلِكَ بَيْتٌ", NOUNS[1]], ["تِلْكَ مَدْرَسَةٌ", NOUNS[7]]].map(([s, n]) => `<button data-say="${esc(s)}"><span lang="ar">${s}</span><small dir="ltr">${esc(gl(n))}</small></button>`).join("")}</div></div>
        <div class="card explain"><h2>${T("h3")}</h2><p>${T("p3", { a: arS("هٰذَانِ"), b: arS("هَاتَانِ"), c: arS("هٰؤُلَاءِ"), d: arS("أُولٰئِكَ") })}</p>
          <div class="ls-chips" dir="rtl">${["هٰذَانِ كِتَابَانِ", "هَاتَانِ سَيَّارَتَانِ", "هٰؤُلَاءِ طُلَّابٌ", "أُولٰئِكَ رِجَالٌ"].map((s) => `<button data-say="${esc(s)}"><span lang="ar">${s}</span></button>`).join("")}</div>
          <p class="note">${T("p3b", { ex: arS("هٰذِهِ كُتُبٌ") })}</p></div>
        <div class="card explain"><h2>${T("h4")}</h2><p>${T("p4")}</p>
          <div class="is-two" dir="rtl"><button data-say="هٰذَا كِتَابٌ"><span lang="ar">هٰذَا كِتَابٌ</span><small dir="ltr">${T("sent")}</small></button><button data-say="هٰذَا الْكِتَابُ"><span lang="ar">هٰذَا الْكِتَابُ</span><small dir="ltr">${T("phrase")}</small></button></div></div>
        <div class="card explain"><h2>${T("h5")}</h2>${ayatHtml(QURAN.map((q) => ({ ...q, tag: q.tag })), L)}</div>`,
      learn: (S, m) => `<p class="note" style="text-align:center">${api.t("ls.tap")}</p>
        ${["near", "far"].map((k) => `<h3>${T(k === "near" ? "learnNear" : "learnFar")}</h3><div class="ls-chips" dir="rtl">${DEMS.filter((d) => d.dist === k).map((d) => demChip(d, (m[d.id] || 0) >= MASTER_AT)).join("")}</div>`).join("")}`,
      task: (S, m) => {
        const d = nextItem(DEMS, m, MASTER_AT, S.last); S.last = d.id;
        const w = nounFor(d);
        const why = T("e.pick", { d: arS(d.ar), m: esc(T("d." + d.id)) });
        const r = Math.random();
        if (d.num === "s" && w.n && r < 0.3) {
          const s1 = `${d.ar} ${w.n.ar}`, s2 = `${d.ar} ${withAl(w.n)}`;
          return { q: T("q.sent"), say: s1, credit: d.id, answer: "s", why: T("e.sent", { s: arS(s1) }), opts: shuffle([{ v: "s", html: s1, a: 1 }, { v: "p", html: s2, a: 1 }]) };
        }
        if (r < 0.55) return { q: T("q.mean"), big: d.ar, say: d.ar, credit: d.id, answer: d.id, why, opts: shuffle([d, ...others(d)]).map((x) => ({ v: x.id, html: esc(T("d." + x.id)) })) };
        return { q: T("q.pick"), big: `<span class="is-gap">…</span> ${w.ar}`, sub: `${T(d.dist)}${w.n ? " · " + esc(gl(w.n)) : ""}`, say: say(d, w.ar), credit: d.id, answer: d.id, why,
          opts: shuffle([d, ...others(d)]).map((x) => ({ v: x.id, html: x.ar, a: 1 })) };
      },
      sprint: () => {
        const d = pick(DEMS), w = nounFor(d);
        return { big: `<span class="is-gap">…</span> ${w.ar}`, sub: T(d.dist), credit: d.id, answer: d.id,
          opts: shuffle([d, ...others(d, 2)]).map((x) => ({ v: x.id, html: x.ar, a: 1 })) };
      },
    });
  },
};
