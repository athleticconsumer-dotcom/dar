// =====================================================================
//  KATEGORIE: GESCHICHTEN AUS DEM QUR'AN (قَصَصُ القُرْآنِ)
//  (Ordner heißt aus technischen Gründen weiter "propheten"; Adresse: #/geschichten)
//  Übersicht der Personen → Level einer Person → Level-Ablauf:
//    1. Erzählung   2. Ayat mit Lückentext   3. Quiz (bestanden ab 4 von 5)
//  Fortschritt: store.module("propheten").persons[<id>].passed[<level>] = beste Punktzahl
// =====================================================================
import { esc, shuffle, loadCss } from "../../js/shared.js";
import { t, L as tl, lang, missing } from "../../js/i18n.js";
import musa from "./data/musa.js";

export const CATEGORY = {
  id: "propheten",
  ar: "قَصَصُ القُرْآنِ",
  title: { de: "Geschichten aus dem Qur'an", en: "Stories from the Qur'an", fr: "Histoires du Coran", ru: "Истории из Корана", tr: "Kur'an'dan Kıssalar" },
  desc: {
    de: "Lerne die Wörter des Qur'an durch die Geschichten der Personen, von denen er erzählt. Jedes Level: eine Erzählung, die passenden Ayat als farbiger Lückentext und ein kurzes Quiz.",
    en: "Learn the words of the Qur'an through the stories of the people it tells about. Each level: a story, the matching āyāt as a colour-coded gap exercise and a short quiz.",
    fr: "Apprends les mots du Coran à travers les histoires des personnes dont il parle. Chaque niveau : un récit, les āyāt correspondantes en texte à trous coloré et un petit quiz.",
    ru: "Учи слова Корана через истории людей, о которых он рассказывает. Каждый уровень: рассказ, соответствующие аяты как цветной текст с пропусками и короткий тест.",
    tr: "Kur'an'ın kelimelerini, anlattığı kişilerin kıssalarıyla öğren. Her seviye: bir kıssa, ilgili âyetler renkli boşluk doldurma olarak ve kısa bir test.",
  },
};

// Personen in grob chronologischer Reihenfolge. Neue Person: Datei in data/ anlegen und hier "data" setzen.
export const PERSONS = [
  { id: "adam", ar: "آدَم", name: { de: "Ādam", en: "Ādam", fr: "Ādam", ru: "Адам", tr: "Âdem" } },
  { id: "nuh", ar: "نُوح", name: { de: "Nūḥ", en: "Nūḥ", fr: "Nūḥ", ru: "Нух", tr: "Nûh" } },
  { id: "ibrahim", ar: "إِبْرَاهِيم", name: { de: "Ibrāhīm", en: "Ibrāhīm", fr: "Ibrāhīm", ru: "Ибрахим", tr: "İbrâhim" } },
  { id: "yusuf", ar: "يُوسُف", name: { de: "Yūsuf", en: "Yūsuf", fr: "Yūsuf", ru: "Юсуф", tr: "Yûsuf" } },
  { id: "musa", ar: "مُوسَىٰ", name: { de: "Mūsā", en: "Mūsā", fr: "Mūsā", ru: "Муса", tr: "Mûsâ" }, data: musa },
  { id: "khidr", ar: "الخَضِر", name: { de: "al-Khiḍr", en: "al-Khiḍr", fr: "al-Khiḍr", ru: "аль-Хидр", tr: "Hızır" } },
  { id: "dhulqarnain", ar: "ذُو القَرْنَيْن", name: { de: "Dhū l-Qarnayn", en: "Dhū l-Qarnayn", fr: "Dhū l-Qarnayn", ru: "Зуль-Карнайн", tr: "Zülkarneyn" } },
  { id: "yunus", ar: "يُونُس", name: { de: "Yūnus", en: "Yūnus", fr: "Yūnus", ru: "Юнус", tr: "Yûnus" } },
  { id: "maryam", ar: "مَرْيَم", name: { de: "Maryam", en: "Maryam", fr: "Maryam", ru: "Марьям", tr: "Meryem" } },
  { id: "isa", ar: "عِيسَىٰ", name: { de: "ʿĪsā", en: "ʿĪsā", fr: "ʿĪsā", ru: "Иса", tr: "Îsâ" } },
];
export const livePersons = () => PERSONS.filter((p) => p.data);
const SURAH = { 18: ["al-Kahf", "الكَهْف"], 20: ["Ṭā-Hā", "طه"], 26: ["ash-Shuʿarāʾ", "الشُّعَرَاء"], 28: ["al-Qaṣaṣ", "القَصَص"] };
const PASS_AT = 4;
const AR = "٠١٢٣٤٥٦٧٨٩", ar = (n) => String(n).replace(/\d/g, (d) => AR[d]);
const WAQF = /[ۖ-ۜ۞۩]/g;
const clean = (w) => w.replace(WAQF, "");
const recitation = (s, a) => `https://everyayah.com/data/Alafasy_128kbps/${String(s).padStart(3, "0")}${String(a).padStart(3, "0")}.mp3`;

let AYAT = null;
async function ayat() {
  if (!AYAT) AYAT = await (await fetch(new URL("ayat.json", import.meta.url))).json();
  return AYAT;
}

// ---------- Fortschritt ----------
function personState(store, id) {
  const m = store.module("propheten");
  m.persons = m.persons || {};
  return (m.persons[id] = m.persons[id] || { passed: {} });
}
export function personPercent(store, id) {
  const p = PERSONS.find((x) => x.id === id);
  if (!p?.data) return 0;
  const passed = Object.keys(personState(store, id).passed).length;
  return Math.round((passed / p.data.levels.length) * 100);
}
export const categoryPercent = (store) => {
  const live = livePersons();
  return live.length ? Math.round(live.reduce((s, p) => s + personPercent(store, p.id), 0) / live.length) : 0;
};
const isUnlocked = (store, id, n) => n === 1 || !!personState(store, id).passed[n - 1];

// ---------- kleine Bilder für die Level ----------
function motif(kind) {
  const g = "var(--gold-a)", m = "var(--maroon)";
  const shapes = {
    wellen: `<path d="M0 60 Q 25 45 50 60 T 100 60 T 150 60 T 200 60" fill="none" stroke="${g}" stroke-width="4"/><path d="M0 75 Q 25 60 50 75 T 100 75 T 150 75 T 200 75" fill="none" stroke="${g}" stroke-width="3" opacity=".6"/><path d="M80 52 h40 l-6 12 h-28z" fill="${m}"/>`,
    brunnen: `<rect x="70" y="45" width="60" height="35" rx="4" fill="none" stroke="${g}" stroke-width="4"/><path d="M62 45 h76 M75 45 V20 M125 45 V20 M70 20 h60" stroke="${m}" stroke-width="4" fill="none"/><path d="M100 20 v22" stroke="${g}" stroke-width="2"/>`,
    feuer: `<path d="M20 85 L80 30 L110 55 L140 25 L190 85Z" fill="none" stroke="${m}" stroke-width="4"/><path d="M140 40 c-10 12 -6 22 0 26 c6 -4 10 -14 0 -26z" fill="${g}"/>`,
    rolle: `<rect x="55" y="25" width="90" height="55" rx="6" fill="none" stroke="${g}" stroke-width="4"/><circle cx="55" cy="52" r="9" fill="${m}"/><circle cx="145" cy="52" r="9" fill="${m}"/><path d="M75 42 h50 M75 54 h50 M75 66 h32" stroke="${g}" stroke-width="3"/>`,
    stab: `<path d="M100 15 V88" stroke="${m}" stroke-width="5" stroke-linecap="round"/><path d="M60 80 q15 -25 0 -40 q-15 -15 0 -25" fill="none" stroke="${g}" stroke-width="3"/><path d="M140 80 q-15 -25 0 -40 q15 -15 0 -25" fill="none" stroke="${g}" stroke-width="3"/>`,
    meer: `<path d="M0 30 Q 20 20 40 30 T 80 30 L80 90 L0 90Z" fill="${g}" opacity=".35"/><path d="M120 30 Q 140 20 160 30 T 200 30 L200 90 L120 90Z" fill="${g}" opacity=".35"/><path d="M100 20 V90" stroke="${m}" stroke-width="4" stroke-dasharray="3 6"/>`,
    meere: `<path d="M0 40 Q 50 30 100 60 Q 150 30 200 40" fill="none" stroke="${g}" stroke-width="4"/><path d="M0 70 Q 50 60 100 60 Q 150 60 200 70" fill="none" stroke="${g}" stroke-width="3" opacity=".6"/><circle cx="100" cy="60" r="6" fill="${m}"/>`,
  };
  return `<svg class="pr-motif" viewBox="0 0 200 95" aria-hidden="true">${shapes[kind] || shapes.wellen}</svg>`;
}

// ---------- Seiten ----------
export function renderCategory(view, ctx) {
  loadCss(import.meta.url, "style.css");
  const cards = PERSONS.map((p) => {
    const live = !!p.data, pct = personPercent(ctx.store, p.id);
    const inner = `<span class="pr-ar" lang="ar" dir="rtl">${p.ar}</span><b class="pr-name">${esc(tl(p.name))}</b>
      ${live ? `<span class="pr-sub">${t("pr.levels", { n: p.data.levels.length, p: pct })}</span>${ctx.bar(pct)}` : `<span class="pill">${t("c.soon")}</span>`}`;
    return live ? `<a class="pr-person" href="#/geschichten/${p.id}">${inner}</a>` : `<div class="pr-person soon">${inner}</div>`;
  }).join("");
  view.innerHTML = `
    <section class="welcome"><div class="welcome-card"><div class="text">
      <a class="back" href="#/">${t("c.backHome")}</a><span class="eyebrow">${t("pr.category")}</span>
      <p class="salam" lang="ar" dir="rtl" style="text-align:left">${CATEGORY.ar}</p>
      <h1>${esc(tl(CATEGORY.title))}</h1><p class="lead">${esc(tl(CATEGORY.desc))}</p></div>
      ${ctx.ring(categoryPercent(ctx.store), tl(CATEGORY.title))}</div></section>
    <section style="display:flex;flex-direction:column;gap:18px">
      <div class="section-head"><span class="eyebrow">${t("pr.persons")}</span><h2>${t("pr.whose")}</h2></div>
      <div class="pr-people">${cards}</div></section>`;
}

export function renderPerson(view, ctx, id) {
  loadCss(import.meta.url, "style.css");
  const p = PERSONS.find((x) => x.id === id);
  if (!p?.data) { view.innerHTML = `<div class="empty">${t("pr.soonStory")} <a href="#/geschichten">${t("c.back")}</a></div>`; return; }
  const st = personState(ctx.store, id);
  const steps = p.data.levels.map((l, k) => {
    const n = k + 1, passed = st.passed[n], open = isUnlocked(ctx.store, id, n);
    const status = passed ? `<span class="pill live">${t("pr.passedScore", { s: passed })}</span>` : open ? `<span class="pill rec">${t("pr.open")}</span>` : `<span class="pill">${t("pr.locked")}</span>`;
    const inner = `<span class="pr-node${passed ? " done" : ""}">${passed ? "✓" : n}</span>
      <div class="pr-step-body"><span class="level-no">${t("pr.level", { n })}</span><h3>${esc(tl(l.title))}</h3><span class="pr-src">${esc(tl(l.source))}</span></div>${status}`;
    return open ? `<li><a class="pr-step" href="#/geschichten/${id}/${n}">${inner}</a></li>` : `<li><div class="pr-step locked">${inner}</div></li>`;
  }).join("");
  view.innerHTML = `
    <section class="welcome"><div class="welcome-card"><div class="text">
      <a class="back" href="#/geschichten">← ${esc(tl(CATEGORY.title))}</a><span class="eyebrow">${esc(tl(p.name))}</span>
      <p class="salam pr-big" lang="ar" dir="rtl" style="text-align:left">${p.ar}</p>
      <h1>${esc(tl(p.data.title))}</h1><p class="lead">${esc(tl(p.data.intro))}</p></div>
      ${ctx.ring(personPercent(ctx.store, id), tl(p.name))}</div></section>
    ${missing(p.data.intro) ? `<p class="lang-note">${t("lang.partial")}</p>` : ""}
    <section class="card"><h2>${t("pr.pathTitle")}</h2>
      <p class="note">${t("pr.pathNote", { n: PASS_AT })}</p>
      <ol class="pr-path">${steps}</ol></section>`;
}

export async function renderLevel(view, ctx, id, n) {
  loadCss(import.meta.url, "style.css");
  const p = PERSONS.find((x) => x.id === id), L = p?.data?.levels[n - 1];
  if (!L) { view.innerHTML = `<div class="empty">${t("pr.noLevel")} <a href="#/geschichten">${t("c.back")}</a></div>`; return; }
  if (!isUnlocked(ctx.store, id, n)) { location.hash = `#/geschichten/${id}`; return; }
  const A = await ayat();
  const total = p.data.levels.length;
  // Inhalte in der gewählten Sprache (Fallback Deutsch)
  const pname = tl(p.name), ltitle = tl(L.title), lsource = tl(L.source), lstory = tl(L.story), lquiz = tl(L.quiz);
  const wOf = (v) => tl(v.w);
  const note = missing(L.story) ? `<p class="lang-note">${t("lang.partial")}</p>` : "";
  let audio = null;
  const stopAudio = () => { try { audio?.pause(); } catch (e) {} };

  const head = (stage) => `
    <div class="mod-head"><div class="mod-title"><a class="back" href="#/geschichten/${id}">← ${esc(pname)}</a>
      <h1>${t("pr.level", { n })} · ${esc(ltitle)}</h1></div></div>${note}
    <ol class="pr-stages">${[t("pr.st.story"), t("pr.st.ayat"), t("pr.st.quiz")].map((label, k) => `<li class="${k === stage ? "now" : k < stage ? "done" : ""}"><span>${k + 1}</span>${label}</li>`).join("")}</ol>`;

  // ---- 1. Erzählung ----
  function story() {
    view.innerHTML = head(0) + `
      <article class="card pr-story">${motif(L.motif)}
        <span class="eyebrow">${t("pr.storyEyebrow")}</span>
        ${lstory.map((x) => `<p>${esc(x)}</p>`).join("")}
        <p class="pr-src">${t("pr.source", { s: esc(lsource) })}</p>
        <div class="row"><button class="btn primary" id="go">${t("pr.toAyat")}</button></div></article>`;
    view.querySelector("#go").onclick = () => read(0);
  }

  // ---- 2. Ayat mit Lücken: jedes Wort in eigener Farbe, Übersetzung darunter in derselben Farbe ----
  const allGapWords = L.ayat.flatMap((v) => v.gaps.map((g) => clean(A[v.ref].text.split(" ")[g.i])));
  const col = (i) => `c${i % 6}`;
  // ---- 2a. Ayah zuerst ganz lesen: alle Wörter farbig, Wort für Wort darunter ----
  function read(k) {
    stopAudio();
    const v = L.ayat[k], d = A[v.ref], words = d.text.split(" ");
    const [sn, sa] = SURAH[d.s] || [String(d.s), ""];
    const html = words.map((w, i) => `<span class="pr-w ${col(i)}">${w}</span>`).join(" ");
    const gl = wOf(v);
    const gloss = words.map((w, i) => `<li class="${col(i)}"><span class="ar" lang="ar" dir="rtl">${clean(w)}</span><span class="de">${esc(gl[i])}</span></li>`).join("");
    view.innerHTML = head(1) + `
      <div class="hud"><span>${t("pr.ayahRead", { k: k + 1, n: L.ayat.length })}</span><span>${t("pr.surah", { name: sn })} · ${d.s}:${d.a}</span></div>
      <article class="pr-mushaf" lang="ar" dir="rtl">
        <div class="pr-surah"><span>سُورَةُ ${sa}</span></div>
        <p class="pr-ayah">${html} <span class="pr-end">﴿${ar(d.a)}﴾</span></p>
      </article>
      <p class="note" style="text-align:center">${t("pr.readNote")}</p>
      <div class="row center"><button class="btn" id="rec">${t("pr.recite")}</button>
        <button class="btn primary" id="toGap">${t("pr.toGap")}</button></div>
      <section class="card pr-wbw"><h3>${t("pr.wbw")}</h3><ol class="pr-gloss" dir="rtl">${gloss}</ol>
        <p class="pr-src">${t("pr.wbwNote")}</p></section>`;
    view.querySelector("#rec").onclick = () => { stopAudio(); audio = new Audio(recitation(d.s, d.a)); audio.play().catch(() => {}); };
    view.querySelector("#toGap").onclick = () => { stopAudio(); verse(k); window.scrollTo(0, 0); };
  }

  function verse(k) {
    const v = L.ayat[k], d = A[v.ref], words = d.text.split(" ");
    const gapIdx = v.gaps.map((g) => g.i).sort((x, y) => x - y);
    const answers = gapIdx.map((i) => clean(words[i]));
    const pool = [...new Set(allGapWords.filter((w) => !answers.includes(w)))];
    const chips = shuffle([...answers, ...shuffle(pool).slice(0, Math.max(2, 5 - answers.length))]);
    let next = 0, mistakes = 0;
    const glw = wOf(v);
    const html = words.map((w, i) => {
      const gi = gapIdx.indexOf(i);
      if (gi < 0) return `<span class="pr-w ${col(i)}">${w}</span>`;
      const waqf = (w.match(WAQF) || []).join("");
      return `<span class="pr-gap ${col(i)}" data-g="${gi}"><small lang="${lang()}" dir="ltr">${esc(glw[i])}</small></span>${waqf ? `<span class="pr-w ${col(i)}">${waqf}</span>` : ""}`;
    }).join(" ");
    const gloss = words.map((w, i) => {
      const gi = gapIdx.indexOf(i);
      return `<li class="${col(i)}${gi >= 0 ? " is-gap" : ""}" ${gi >= 0 ? `data-gl="${gi}"` : ""}>
        <span class="ar" lang="ar" dir="rtl">${gi >= 0 ? "؟" : clean(w)}</span><span class="de">${esc(glw[i])}</span></li>`;
    }).join("");
    const [sn, sa] = SURAH[d.s] || [String(d.s), ""];
    view.innerHTML = head(1) + `
      <div class="hud"><span>${t("pr.ayahGap", { k: k + 1, n: L.ayat.length })}</span><span>${t("pr.surah", { name: sn })} · ${d.s}:${d.a}</span></div>
      <article class="pr-mushaf" lang="ar" dir="rtl">
        <div class="pr-surah"><span>سُورَةُ ${sa}</span></div>
        <p class="pr-ayah">${html} <span class="pr-end">﴿${ar(d.a)}﴾</span></p>
      </article>
      <p class="note" style="text-align:center">${t("pr.gapNote")}</p>
      <div class="pr-chips" lang="ar" dir="rtl">${chips.map((c) => `<button class="pr-chip" data-w="${esc(c)}">${c}</button>`).join("")}</div>
      <div class="feedback" aria-live="polite"></div>
      <div id="after" hidden class="row center">
        <button class="btn" id="rec">${t("pr.recite")}</button>
        <button class="btn primary" id="nx">${k + 1 < L.ayat.length ? t("pr.nextAyah") : t("pr.toQuiz")}</button>
      </div>
      <section class="card pr-wbw"><h3>${t("pr.wbw")}</h3><ol class="pr-gloss" dir="rtl">${gloss}</ol>
        <p class="pr-src">${t("pr.wbwNote")}</p></section>`;
    const fb = view.querySelector(".feedback");
    view.querySelectorAll(".pr-chip").forEach((b) => (b.onclick = () => {
      if (next >= answers.length) return;
      if (b.dataset.w === answers[next]) {
        const slot = view.querySelector(`.pr-gap[data-g="${next}"]`);
        slot.textContent = b.dataset.w; slot.classList.add("filled");
        const gl = view.querySelector(`[data-gl="${next}"] .ar`); if (gl) gl.textContent = b.dataset.w;
        b.disabled = true; b.classList.add("used"); next++;
        ctx.store.answer("propheten", true);
        if (next === answers.length) {
          fb.className = "feedback ok"; fb.textContent = mistakes ? (mistakes > 1 ? t("pr.doneN", { n: mistakes }) : t("pr.done1")) : t("pr.perfect");
          view.querySelectorAll(".pr-chip:not(.used)").forEach((c) => (c.disabled = true));
          view.querySelector("#after").hidden = false;
          view.querySelector("#rec").onclick = () => { stopAudio(); audio = new Audio(recitation(d.s, d.a)); audio.play().catch(() => (fb.textContent = t("pr.recFail"))); };
          view.querySelector("#nx").onclick = () => { stopAudio(); k + 1 < L.ayat.length ? read(k + 1) : quiz(0, 0); };
          view.querySelector("#nx").focus({ preventScroll: true });
        }
      } else {
        mistakes++; ctx.store.answer("propheten", false);
        b.classList.remove("shake"); void b.offsetWidth; b.classList.add("shake"); setTimeout(() => b.classList.remove("shake"), 700);
        fb.className = "feedback no"; fb.textContent = t("pr.wrongWord");
      }
    }));
  }

  // ---- 3. Quiz ----
  function quiz(q, score) {
    const Q = lquiz[q], opts = shuffle([...Q.o]);
    view.innerHTML = head(2) + `
      <div class="card">
        <div class="hud"><span>${t("pr.question", { q: q + 1, n: lquiz.length })}</span><span>${t("pr.correctN", { s: score })}</span></div>
        <h2 class="pr-q">${esc(Q.q)}</h2>
        <div class="opts">${opts.map((o) => `<button class="opt" data-v="${esc(o)}">${esc(o)}</button>`).join("")}</div>
        <div class="feedback" aria-live="polite"></div>
        <div class="row center"><button class="btn primary" id="nq" hidden>${q + 1 < lquiz.length ? t("pr.nextQ") : t("pr.result")}</button></div>
      </div>`;
    view.querySelectorAll(".opt").forEach((b) => (b.onclick = () => {
      const ok = b.dataset.v === Q.a;
      view.querySelectorAll(".opt").forEach((x) => { x.disabled = true; if (x.dataset.v === Q.a) x.classList.add("ok"); });
      if (!ok) b.classList.add("no");
      ctx.store.answer("propheten", ok);
      const fb = view.querySelector(".feedback"); fb.className = "feedback " + (ok ? "ok" : "no"); fb.textContent = ok ? t("c.right") : t("c.wrong");
      const nq = view.querySelector("#nq"); nq.hidden = false; nq.focus({ preventScroll: true });
      nq.onclick = () => (q + 1 < lquiz.length ? quiz(q + 1, score + (ok ? 1 : 0)) : result(score + (ok ? 1 : 0)));
    }));
  }

  function result(score) {
    const passed = score >= PASS_AT;
    if (passed) ctx.store.update("propheten", (m) => {
      m.persons = m.persons || {}; const s = (m.persons[id] = m.persons[id] || { passed: {} });
      s.passed[n] = Math.max(s.passed[n] || 0, score);
    });
    const hasNext = n < total;
    // alle gesuchten Wörter dieses Levels, ohne Doppelte
    const seen = new Set(), learned = [];
    L.ayat.forEach((v) => {
      const words = A[v.ref].text.split(" ");
      [...v.gaps].sort((x, y) => x.i - y.i).forEach((g) => {
        const w = clean(words[g.i]);
        if (!seen.has(w)) { seen.add(w); learned.push({ w, de: wOf(v)[g.i], ref: v.ref, c: col(g.i) }); }
      });
    });
    const wordList = `<ol class="pr-learned" dir="rtl">${learned.map((x) => `
      <li class="${x.c}"><span class="ar" lang="ar" dir="rtl">${x.w}</span><span class="de">${esc(x.de)}</span><span class="ref">${x.ref}</span></li>`).join("")}</ol>`;
    view.innerHTML = head(passed ? 3 : 2) + `
      <div class="card pr-result">
        <span class="pr-ar-big" lang="ar">${passed ? "بَارَكَ اللهُ فِيكَ" : "حَاوِلْ مَرَّةً أُخْرَى"}</span>
        <h2>${passed ? t("pr.passed", { n }) : t("pr.notPassed")}</h2>
        <p class="lead">${t("pr.score", { s: score, n: lquiz.length })} ${passed ? (hasNext ? t("pr.unlocked", { n: n + 1 }) : t("pr.allDone", { name: esc(pname) })) : t("pr.needMore", { n: PASS_AT })}</p>
      </div>
      ${passed ? `<section class="card pr-blessing">
        <span class="eyebrow">${t("pr.blessEyebrow")}</span>
        <p>${t("pr.blessText", { n: learned.length })}</p>
        <p class="pr-dua" lang="ar" dir="rtl">رَبِّ زِدْنِي عِلْمًا</p>
        <p class="pr-dua-de">${t("pr.duaMeaning")}</p>
      </section>` : ""}
      <section class="card pr-wbw"><h3>${passed ? t("pr.newWords") : t("pr.levelWords")}</h3>${wordList}</section>
      ${passed ? `<section class="card pr-kitab">
        <div class="pr-kitab-icon" aria-hidden="true"><svg viewBox="0 0 48 48" width="44" height="44"><path d="M6 10c6-2 12-2 18 2v28c-6-4-12-4-18-2z" fill="none" stroke="var(--maroon)" stroke-width="2.5" stroke-linejoin="round"/><path d="M42 10c-6-2-12-2-18 2v28c6-4 12-4 18-2z" fill="none" stroke="var(--maroon)" stroke-width="2.5" stroke-linejoin="round"/><path d="M33 4l6 6-14 14-7 1 1-7z" fill="var(--gold-a)"/></svg></div>
        <div><h3>${t("pr.kitabTitle")}</h3>
          <p>${t("pr.kitabText")}</p></div>
      </section>` : ""}
      <div class="row center">
        ${passed && hasNext ? `<a class="btn primary" href="#/geschichten/${id}/${n + 1}">${t("pr.nextLevel", { n: n + 1 })}</a>` : ""}
        ${!passed ? `<button class="btn primary" id="again">${t("pr.retry")}</button>` : ""}
        <a class="btn" href="#/geschichten/${id}">${t("pr.overview")}</a></div>`;
    view.querySelector("#again")?.addEventListener("click", () => quiz(0, 0));
  }

  story();
  return stopAudio;
}
