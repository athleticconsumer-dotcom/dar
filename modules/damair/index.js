// =====================================================================
//  RUBRIK: PERSONALPRONOMEN (الضَّمَائِر) · Grammatik-Weg Level 1, Schritt 5
//  Aufbau über js/lesson.js · Fortschritt: mastery { <pronomen> | a_<pronomen>: richtige }, sprintBest
// =====================================================================
import { lesson, standard, pick, arS, ayatHtml, shuffle, esc } from "../../js/lesson.js";
import { makeT, L } from "../../js/i18n.js";
import DICT from "./lang.js";
import { PRONOUNS, CONFUSE, QURAN, MASTER_AT, GOAL } from "./data.js";

const T = makeT(DICT);
const P = Object.fromEntries(PRONOUNS.map((p) => [p.id, p]));
const IDS = [...PRONOUNS.map((p) => p.id), ...PRONOUNS.map((p) => "a_" + p.id)];
const std = standard({ ids: IDS, at: MASTER_AT, goal: GOAL, sum: (a, b) => T("sum", { a, b }) });
const confusers = (p, n = 3) => {
  const near = shuffle([...new Set(CONFUSE.filter((g) => g.includes(p.id)).flat())].filter((id) => id !== p.id));
  const rest = shuffle(PRONOUNS.map((x) => x.id).filter((id) => id !== p.id && !near.includes(id)));
  return [...near, ...rest].slice(0, n).map((id) => P[id]);
};
/** Tabelle: rechts Einzahl, links Mehrzahl */
const table = (cell, m = {}, key = (p) => p.id) => `<div class="dm-table" dir="rtl">
  ${["s", "d", "p"].map((c, i) => `<span class="dm-col" style="grid-area:1/${i + 1}">${T("col." + c)}</span>`).join("")}
  ${PRONOUNS.map((p) => `<div class="dm-cell g${p.grp}" style="grid-row:${p.row + 1}${p.id === "huma" || p.id === "antuma" ? " / span 2" : ""};grid-column:${p.col}">${cell(p, (m[key(p)] || 0) >= MASTER_AT)}</div>`).join("")}
</div>`;
const free = (p, ok) => `<button data-say="${esc(p.pr)}"><span lang="ar">${p.pr}</span><small>${esc(T("p." + p.id))}${ok ? " ✓" : ""}</small></button>`;
const att = (p, ok) => `<button data-say="${esc(p.book)}"><span lang="ar">${p.book}</span><small>${esc(T("o." + p.id))}${ok ? " ✓" : ""}</small></button>`;

export default {
  ...std,
  milestones() { return [{ pct: 38, label: T("ms.free") }, { pct: 75, label: T("ms.all") }, { pct: 100, label: T("ms.sprint") }]; },
  mount(root, api) {
    return lesson({
      api, root, base: import.meta.url, title: T("gTitle"), goal: GOAL,
      explain: () => `
        <div class="card explain"><h2>${T("h1")}</h2><p>${T("p1")}</p>${table(free)}</div>
        <div class="card explain"><h2>${T("h2")}</h2><p>${T("p2", { a: arS("أَنَا طَالِبٌ"), b: arS("هِيَ طَالِبَةٌ") })}</p></div>
        <div class="card explain"><h2>${T("h3")}</h2><p>${T("p3", { ex: arS("كِتَابٌ") })}</p>${table(att)}</div>
        <div class="card explain"><h2>${T("h4")}</h2><p>${T("p4", { a: arS("بِهِ"), b: arS("فِيهِ"), c: arS("عَلَيْهِمْ") })}</p></div>
        <div class="card explain"><h2>${T("h5")}</h2>${ayatHtml(QURAN, L)}</div>`,
      learn: (S, m) => `<p class="note" style="text-align:center">${api.t("ls.tap")}</p>
        <h3>${T("learnFree")}</h3>${table(free, m)}
        <h3>${T("learnAttached")}</h3>${table(att, m, (p) => "a_" + p.id)}`,
      task: (S, m) => {
        const open = IDS.filter((id) => (m[id] || 0) < MASTER_AT && id !== S.last);
        const id = pick(open.length ? open : IDS.filter((x) => x !== S.last)); S.last = id;
        const attached = id.startsWith("a_"), p = P[id.replace("a_", "")];
        const others = confusers(p);
        if (attached) {
          const why = T("e.o", { a: arS(p.book), o: esc(T("o." + p.id)), s: arS(p.suf) });
          if (Math.random() < 0.5) return { q: T("q.own", { o: esc(T("o." + p.id)) }), say: p.book, credit: id, answer: p.id, why,
            opts: shuffle([p, ...others]).map((x) => ({ v: x.id, html: x.book, a: 1 })) };
          return { q: T("q.mean"), big: p.book, say: p.book, credit: id, answer: p.id, why, opts: shuffle([p, ...others]).map((x) => ({ v: x.id, html: esc(T("o." + x.id)) })) };
        }
        const why = T("e.p", { a: arS(p.pr), p: esc(T("p." + p.id)) });
        if (Math.random() < 0.5) return { q: T("q.which", { p: esc(T("p." + p.id)) }), say: p.pr, credit: id, answer: p.id, why,
          opts: shuffle([p, ...others]).map((x) => ({ v: x.id, html: x.pr, a: 1 })) };
        return { q: T("q.mean"), big: p.pr, say: p.pr, credit: id, answer: p.id, why, opts: shuffle([p, ...others]).map((x) => ({ v: x.id, html: esc(T("p." + x.id)) })) };
      },
      sprint: () => {
        const p = pick(PRONOUNS), attached = Math.random() < 0.4;
        const k = attached ? "o." : "p.";
        return { big: attached ? p.book : p.pr, credit: (attached ? "a_" : "") + p.id, answer: p.id,
          opts: shuffle([p, ...confusers(p, 2)]).map((x) => ({ v: x.id, html: esc(T(k + x.id)) })) };
      },
    });
  },
};
