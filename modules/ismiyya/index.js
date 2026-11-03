// =====================================================================
//  RUBRIK: DER NOMINALSATZ (الجُمْلَة الاسْمِيَّة) · Grammatik-Weg Level 1, Schritt 7
//  Aufbau über js/lesson.js · Fortschritt: mastery { <nomen>: richtige }, sprintBest
// =====================================================================
import { lesson, standard, nextItem, pick, arS, ayatHtml, al, shuffle, esc } from "../../js/lesson.js";
import { makeT, L } from "../../js/i18n.js";
import DICT from "./lang.js";
import { NOUNS, ADJ, QURAN, MASTER_AT, GOAL, adjF, adjBare } from "./data.js";

const T = makeT(DICT);
const gl = (x) => L(x.g) || x.g.de;
const std = standard({ ids: NOUNS.map((x) => x.id), at: MASTER_AT, goal: GOAL, sum: (a, b) => T("sum", { a, b }) });
const other = (g) => (g === "m" ? "f" : "m");
/** Satz bauen: kind = ok | phrase | gender */
function build(n, a, kind = "ok") {
  const mub = al(n.ar);
  if (kind === "phrase") return `${mub} ${al(adjBare(a, n.gen))}`;
  return `${mub} ${adjF(a, kind === "gender" ? other(n.gen) : n.gen)}`;
}
const chip = (s, small) => `<button data-say="${esc(s)}"><span lang="ar">${s}</span>${small ? `<small dir="ltr">${small}</small>` : ""}</button>`;

export default {
  ...std,
  milestones() { return [{ pct: 38, label: T("ms.half") }, { pct: 75, label: T("ms.all") }, { pct: 100, label: T("ms.sprint") }]; },
  mount(root, api) {
    const B = NOUNS[0], S0 = NOUNS[7], K = ADJ[0];
    return lesson({
      api, root, base: import.meta.url, title: T("gTitle"), goal: GOAL, state: { n: NOUNS[0].id, a: ADJ[0].id },
      explain: () => `
        <div class="card explain"><h2>${T("h1")}</h2><p>${T("p1", { ex: arS("اللّٰهُ أَكْبَرُ") })}</p>
          <div class="ns-parts" dir="rtl"><div class="ns-m"><span lang="ar">${al(B.ar)}</span><small dir="ltr">${T("mubtada")}</small></div><div class="ns-k"><span lang="ar">${K.ar}</span><small dir="ltr">${T("khabar")}</small></div></div></div>
        <div class="card explain"><h2>${T("h2")}</h2><ol class="ns-rules"><li>${T("r1")}</li><li>${T("r2")}</li><li>${T("r3")}</li></ol>
          <div class="ls-chips" dir="rtl">${chip(build(B, K), esc(gl(B)) + " · " + T("m"))}${chip(build(S0, K), esc(gl(S0)) + " · " + T("f"))}</div></div>
        <div class="card explain"><h2>${T("h3")}</h2><p>${T("p3")}</p>
          <div class="ns-three" dir="rtl">${[[build(B, K), "s1", 1], [build(B, K, "phrase"), "s2"], [B.ar.slice(0, -1) + "ٌ " + K.ar, "s3"]].map(([s, k, ok]) => `<button class="${ok ? "ok" : ""}" data-say="${esc(s)}"><span lang="ar">${s}</span><small dir="ltr">${T(k)}</small></button>`).join("")}</div></div>
        <div class="card explain"><h2>${T("h4")}</h2><p>${T("p4")}</p>
          <div class="ls-chips" dir="rtl">${["هُوَ طَالِبٌ", "هِيَ طَالِبَةٌ", "أَنَا مُسْلِمٌ", "نَحْنُ طُلَّابٌ"].map((s) => chip(s)).join("")}</div></div>
        <div class="card explain"><h2>${T("h5")}</h2><p>${T("p5", { a: arS("الْكِتَابُ عَلَى الطَّاوِلَةِ"), b: arS("الْحَمْدُ لِلّٰهِ") })}</p></div>
        <div class="card explain"><h2>${T("h6")}</h2>${ayatHtml(QURAN.map((q) => ({ ...q, tag: "" })), L)}</div>`,
      learn: (S, m) => {
        const n = NOUNS.find((x) => x.id === S.n), a = ADJ.find((x) => x.id === S.a);
        return `<p class="note" style="text-align:center">${T("learnHint")}</p>
          <div class="ns-pick" dir="rtl">${NOUNS.map((x) => `<button data-n="${x.id}" aria-pressed="${x.id === S.n}" class="g${x.gen}"><span lang="ar">${al(x.ar)}</span><small dir="ltr">${esc(gl(x))}${(m[x.id] || 0) >= MASTER_AT ? " ✓" : ""}</small></button>`).join("")}</div>
          <div class="ns-pick" dir="rtl">${ADJ.map((x) => `<button data-a="${x.id}" aria-pressed="${x.id === S.a}"><span lang="ar">${adjF(x, n.gen)}</span><small dir="ltr">${esc(gl(x))}</small></button>`).join("")}</div>
          <button class="ns-result" data-say="${esc(build(n, a))}"><span lang="ar" dir="rtl"><b class="ns-mt">${al(n.ar)}</b> <b class="ns-kt">${adjF(a, n.gen)}</b></span><small>${T(n.gen)} → ${T(n.gen)}</small></button>`;
      },
      onLearn: (root, S, redraw) => {
        root.querySelectorAll("[data-n]").forEach((b) => (b.onclick = () => { S.n = b.dataset.n; redraw(); }));
        root.querySelectorAll("[data-a]").forEach((b) => (b.onclick = () => { S.a = b.dataset.a; redraw(); }));
      },
      task: (S, m) => {
        const n = nextItem(NOUNS, m, MASTER_AT, S.last); S.last = n.id;
        const a = pick(ADJ), good = build(n, a);
        const okWhy = T("e.ok", { s: arS(good), n: arS(al(n.ar)), g: T(n.gen), k: arS(adjF(a, n.gen)) });
        const r = Math.random();
        if (r < 0.4) return { q: T("q.agree"), big: `${al(n.ar)} <span class="ns-gap">…</span>`, sub: esc(gl(n)) + " · " + esc(gl(a)), say: good, credit: n.id, answer: "ok", why: okWhy,
          opts: shuffle([{ v: "ok", html: adjF(a, n.gen), a: 1 }, { v: "g", html: adjF(a, other(n.gen)), a: 1 }, { v: "p", html: al(adjBare(a, n.gen)), a: 1 }, { v: "p2", html: al(adjBare(a, other(n.gen))), a: 1 }]) };
        if (r < 0.65) return { q: T("q.sent"), say: good, credit: n.id, answer: "ok", why: T("e.phrase", { x: arS(build(n, a, "phrase")), s: arS(good) }),
          opts: shuffle([{ v: "ok", html: good, a: 1 }, { v: "p", html: build(n, a, "phrase"), a: 1 }]) };
        const kind = pick(["ok", "gender", "phrase"]);
        const why = kind === "ok" ? okWhy : kind === "phrase" ? T("e.phrase", { x: arS(build(n, a, "phrase")), s: arS(good) }) : T("e.gender", { n: arS(al(n.ar)), g: T(n.gen), k: arS(adjF(a, n.gen)), s: arS(good) });
        return { q: T("q.check"), big: build(n, a, kind), say: good, credit: n.id, answer: kind, why,
          opts: [{ v: "ok", html: T("c.ok") }, { v: "gender", html: T("c.gender") }, { v: "phrase", html: T("c.phrase") }] };
      },
      sprint: () => {
        const n = pick(NOUNS), a = pick(ADJ), kind = pick(["ok", "ok", "gender", "phrase"]);
        return { big: build(n, a, kind), credit: n.id, answer: kind,
          opts: [{ v: "ok", html: T("c.ok") }, { v: "gender", html: T("c.gender") }, { v: "phrase", html: T("c.phrase") }] };
      },
    });
  },
};
