// =====================================================================
//  KATEGORIE: GESCHICHTEN AUS DEM QUR'AN (قَصَصُ القُرْآنِ)
//  (Ordner heißt aus technischen Gründen weiter "propheten"; Adresse: #/geschichten)
//  Übersicht der Personen → Level einer Person → Level-Ablauf:
//    1. Erzählung   2. Ayat mit Lückentext   3. Quiz (bestanden ab 4 von 5)
//  Fortschritt: store.module("propheten").persons[<id>].passed[<level>] = beste Punktzahl
// =====================================================================
import { esc, shuffle, loadCss } from "../../js/shared.js";
import musa from "./data/musa.js";

export const CATEGORY = {
  id: "propheten",
  title: "Geschichten aus dem Qur'an",
  ar: "قَصَصُ القُرْآنِ",
  desc: "Lerne die Wörter des Qur'an durch die Geschichten der Personen, von denen er erzählt. Jedes Level: eine Erzählung, die passenden Ayat als farbiger Lückentext und ein kurzes Quiz.",
};

// Personen in grob chronologischer Reihenfolge. Neue Person: Datei in data/ anlegen und hier "data" setzen.
export const PERSONS = [
  { id: "adam", name: "Ādam", ar: "آدَم" },
  { id: "nuh", name: "Nūḥ", ar: "نُوح" },
  { id: "ibrahim", name: "Ibrāhīm", ar: "إِبْرَاهِيم" },
  { id: "yusuf", name: "Yūsuf", ar: "يُوسُف" },
  { id: "musa", name: "Mūsā", ar: "مُوسَىٰ", data: musa },
  { id: "khidr", name: "al-Khiḍr", ar: "الخَضِر" },
  { id: "dhulqarnain", name: "Dhū l-Qarnayn", ar: "ذُو القَرْنَيْن" },
  { id: "yunus", name: "Yūnus", ar: "يُونُس" },
  { id: "maryam", name: "Maryam", ar: "مَرْيَم" },
  { id: "isa", name: "ʿĪsā", ar: "عِيسَىٰ" },
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
    const inner = `<span class="pr-ar" lang="ar" dir="rtl">${p.ar}</span><b class="pr-name">${esc(p.name)}</b>
      ${live ? `<span class="pr-sub">${p.data.levels.length} Level · ${pct}%</span>${ctx.bar(pct)}` : `<span class="pill">Bald</span>`}`;
    return live ? `<a class="pr-person" href="#/geschichten/${p.id}">${inner}</a>` : `<div class="pr-person soon">${inner}</div>`;
  }).join("");
  view.innerHTML = `
    <section class="welcome"><div class="welcome-card"><div class="text">
      <a class="back" href="#/">← Startseite</a><span class="eyebrow">Kategorie</span>
      <p class="salam" lang="ar" dir="rtl" style="text-align:left">${CATEGORY.ar}</p>
      <h1>${CATEGORY.title}</h1><p class="lead">${CATEGORY.desc}</p></div>
      ${ctx.ring(categoryPercent(ctx.store), CATEGORY.title)}</div></section>
    <section style="display:flex;flex-direction:column;gap:18px">
      <div class="section-head"><span class="eyebrow">Personen</span><h2>Wessen Geschichte möchtest du lernen?</h2></div>
      <div class="pr-people">${cards}</div></section>`;
}

export function renderPerson(view, ctx, id) {
  loadCss(import.meta.url, "style.css");
  const p = PERSONS.find((x) => x.id === id);
  if (!p?.data) { view.innerHTML = `<div class="empty">Diese Geschichte kommt bald. <a href="#/geschichten">Zurück</a></div>`; return; }
  const st = personState(ctx.store, id);
  const steps = p.data.levels.map((l, k) => {
    const n = k + 1, passed = st.passed[n], open = isUnlocked(ctx.store, id, n);
    const status = passed ? `<span class="pill live">Bestanden · ${passed}/5</span>` : open ? `<span class="pill rec">Offen</span>` : `<span class="pill">Gesperrt</span>`;
    const inner = `<span class="pr-node${passed ? " done" : ""}">${passed ? "✓" : n}</span>
      <div class="pr-step-body"><span class="level-no">Level ${n}</span><h3>${esc(l.title)}</h3><span class="pr-src">${esc(l.source)}</span></div>${status}`;
    return open ? `<li><a class="pr-step" href="#/geschichten/${id}/${n}">${inner}</a></li>` : `<li><div class="pr-step locked">${inner}</div></li>`;
  }).join("");
  view.innerHTML = `
    <section class="welcome"><div class="welcome-card"><div class="text">
      <a class="back" href="#/geschichten">← ${CATEGORY.title}</a><span class="eyebrow">${esc(p.name)}</span>
      <p class="salam pr-big" lang="ar" dir="rtl" style="text-align:left">${p.ar}</p>
      <h1>${esc(p.data.title)}</h1><p class="lead">${esc(p.data.intro)}</p></div>
      ${ctx.ring(personPercent(ctx.store, id), p.name)}</div></section>
    <section class="card"><h2>Die Level in zeitlicher Reihenfolge</h2>
      <p class="note">Jedes Level wird freigeschaltet, wenn du das vorherige Quiz bestanden hast (mindestens ${PASS_AT} von 5).</p>
      <ol class="pr-path">${steps}</ol></section>`;
}

export async function renderLevel(view, ctx, id, n) {
  loadCss(import.meta.url, "style.css");
  const p = PERSONS.find((x) => x.id === id), L = p?.data?.levels[n - 1];
  if (!L) { view.innerHTML = `<div class="empty">Dieses Level gibt es nicht. <a href="#/geschichten">Zurück</a></div>`; return; }
  if (!isUnlocked(ctx.store, id, n)) { location.hash = `#/geschichten/${id}`; return; }
  const A = await ayat();
  const total = p.data.levels.length;
  let audio = null;
  const stopAudio = () => { try { audio?.pause(); } catch (e) {} };

  const head = (stage) => `
    <div class="mod-head"><div class="mod-title"><a class="back" href="#/geschichten/${id}">← ${esc(p.name)}</a>
      <h1>Level ${n} · ${esc(L.title)}</h1></div></div>
    <ol class="pr-stages">${["Erzählung", "Ayat", "Quiz"].map((t, k) => `<li class="${k === stage ? "now" : k < stage ? "done" : ""}"><span>${k + 1}</span>${t}</li>`).join("")}</ol>`;

  // ---- 1. Erzählung ----
  function story() {
    view.innerHTML = head(0) + `
      <article class="card pr-story">${motif(L.motif)}
        <span class="eyebrow">Die Geschichte</span>
        ${L.story.map((t) => `<p>${esc(t)}</p>`).join("")}
        <p class="pr-src">Quelle: ${esc(L.source)}</p>
        <div class="row"><button class="btn primary" id="go">Weiter zu den Ayat →</button></div></article>`;
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
    const gloss = words.map((w, i) => `<li class="${col(i)}"><span class="ar" lang="ar" dir="rtl">${clean(w)}</span><span class="de">${esc(v.w[i])}</span></li>`).join("");
    view.innerHTML = head(1) + `
      <div class="hud"><span>Ayah <b>${k + 1}/${L.ayat.length}</b> · Lesen</span><span>Sure ${sn} · ${d.s}:${d.a}</span></div>
      <article class="pr-mushaf" lang="ar" dir="rtl">
        <div class="pr-surah"><span>سُورَةُ ${sa}</span></div>
        <p class="pr-ayah">${html} <span class="pr-end">﴿${ar(d.a)}﴾</span></p>
      </article>
      <p class="note" style="text-align:center">Lies die Ayah in Ruhe. Jede Farbe gehört zu einer Bedeutung unten. Danach kommt der Lückentext.</p>
      <div class="row center"><button class="btn" id="rec">▶ Rezitation anhören</button>
        <button class="btn primary" id="toGap">Weiter zum Lückentext →</button></div>
      <section class="card pr-wbw"><h3>Wort für Wort</h3><ol class="pr-gloss" dir="rtl">${gloss}</ol>
        <p class="pr-src">Wörtliche Bedeutungen als Lernhilfe, keine vollständige Übersetzung. Rezitation: Mishary Rāshid al-ʿAfāsī (everyayah.com)</p></section>`;
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
    const html = words.map((w, i) => {
      const gi = gapIdx.indexOf(i);
      if (gi < 0) return `<span class="pr-w ${col(i)}">${w}</span>`;
      const waqf = (w.match(WAQF) || []).join("");
      return `<span class="pr-gap ${col(i)}" data-g="${gi}"><small lang="de" dir="ltr">${esc(v.w[i])}</small></span>${waqf ? `<span class="pr-w ${col(i)}">${waqf}</span>` : ""}`;
    }).join(" ");
    const gloss = words.map((w, i) => {
      const gi = gapIdx.indexOf(i);
      return `<li class="${col(i)}${gi >= 0 ? " is-gap" : ""}" ${gi >= 0 ? `data-gl="${gi}"` : ""}>
        <span class="ar" lang="ar" dir="rtl">${gi >= 0 ? "؟" : clean(w)}</span><span class="de">${esc(v.w[i])}</span></li>`;
    }).join("");
    const [sn, sa] = SURAH[d.s] || [String(d.s), ""];
    view.innerHTML = head(1) + `
      <div class="hud"><span>Ayah <b>${k + 1}/${L.ayat.length}</b> · Lückentext</span><span>Sure ${sn} · ${d.s}:${d.a}</span></div>
      <article class="pr-mushaf" lang="ar" dir="rtl">
        <div class="pr-surah"><span>سُورَةُ ${sa}</span></div>
        <p class="pr-ayah">${html} <span class="pr-end">﴿${ar(d.a)}﴾</span></p>
      </article>
      <p class="note" style="text-align:center">In jeder Lücke steht das deutsche Wort. Tippe das passende arabische Wort an, von rechts nach links.</p>
      <div class="pr-chips" lang="ar" dir="rtl">${chips.map((c) => `<button class="pr-chip" data-w="${esc(c)}">${c}</button>`).join("")}</div>
      <div class="feedback" aria-live="polite"></div>
      <div id="after" hidden class="row center">
        <button class="btn" id="rec">▶ Rezitation anhören</button>
        <button class="btn primary" id="nx">${k + 1 < L.ayat.length ? "Nächste Ayah →" : "Zum Quiz →"}</button>
      </div>
      <section class="card pr-wbw"><h3>Wort für Wort</h3><ol class="pr-gloss" dir="rtl">${gloss}</ol>
        <p class="pr-src">Wörtliche Bedeutungen als Lernhilfe, keine vollständige Übersetzung. Rezitation: Mishary Rāshid al-ʿAfāsī (everyayah.com)</p></section>`;
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
          fb.className = "feedback ok"; fb.textContent = mistakes ? `Geschafft, mit ${mistakes} Fehler${mistakes > 1 ? "n" : ""}.` : "مَا شَاءَ ٱللَّه, alles richtig!";
          view.querySelectorAll(".pr-chip:not(.used)").forEach((c) => (c.disabled = true));
          view.querySelector("#after").hidden = false;
          view.querySelector("#rec").onclick = () => { stopAudio(); audio = new Audio(recitation(d.s, d.a)); audio.play().catch(() => (fb.textContent = "Die Rezitation konnte nicht geladen werden.")); };
          view.querySelector("#nx").onclick = () => { stopAudio(); k + 1 < L.ayat.length ? read(k + 1) : quiz(0, 0); };
          view.querySelector("#nx").focus({ preventScroll: true });
        }
      } else {
        mistakes++; ctx.store.answer("propheten", false);
        b.classList.remove("shake"); void b.offsetWidth; b.classList.add("shake"); setTimeout(() => b.classList.remove("shake"), 700);
        fb.className = "feedback no"; fb.textContent = "Dieses Wort passt hier nicht. Versuch ein anderes.";
      }
    }));
  }

  // ---- 3. Quiz ----
  function quiz(q, score) {
    const Q = L.quiz[q], opts = shuffle([...Q.o]);
    view.innerHTML = head(2) + `
      <div class="card">
        <div class="hud"><span>Frage <b>${q + 1}/${L.quiz.length}</b></span><span>Richtig <b>${score}</b></span></div>
        <h2 class="pr-q">${esc(Q.q)}</h2>
        <div class="opts">${opts.map((o) => `<button class="opt" data-v="${esc(o)}">${esc(o)}</button>`).join("")}</div>
        <div class="feedback" aria-live="polite"></div>
        <div class="row center"><button class="btn primary" id="nq" hidden>${q + 1 < L.quiz.length ? "Nächste Frage →" : "Ergebnis"}</button></div>
      </div>`;
    view.querySelectorAll(".opt").forEach((b) => (b.onclick = () => {
      const ok = b.dataset.v === Q.a;
      view.querySelectorAll(".opt").forEach((x) => { x.disabled = true; if (x.dataset.v === Q.a) x.classList.add("ok"); });
      if (!ok) b.classList.add("no");
      ctx.store.answer("propheten", ok);
      const fb = view.querySelector(".feedback"); fb.className = "feedback " + (ok ? "ok" : "no"); fb.textContent = ok ? "صَحِيح – richtig!" : "Nicht ganz – grün ist richtig.";
      const nq = view.querySelector("#nq"); nq.hidden = false; nq.focus({ preventScroll: true });
      nq.onclick = () => (q + 1 < L.quiz.length ? quiz(q + 1, score + (ok ? 1 : 0)) : result(score + (ok ? 1 : 0)));
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
        if (!seen.has(w)) { seen.add(w); learned.push({ w, de: v.w[g.i], ref: v.ref, c: col(g.i) }); }
      });
    });
    const wordList = `<ol class="pr-learned" dir="rtl">${learned.map((x) => `
      <li class="${x.c}"><span class="ar" lang="ar" dir="rtl">${x.w}</span><span class="de">${esc(x.de)}</span><span class="ref">${x.ref}</span></li>`).join("")}</ol>`;
    view.innerHTML = head(passed ? 3 : 2) + `
      <div class="card pr-result">
        <span class="pr-ar-big" lang="ar">${passed ? "بَارَكَ اللهُ فِيكَ" : "حَاوِلْ مَرَّةً أُخْرَى"}</span>
        <h2>${passed ? `Level ${n} bestanden` : "Noch nicht bestanden"}</h2>
        <p class="lead">${score} von ${L.quiz.length} Fragen richtig. ${passed ? (hasNext ? `Level ${n + 1} ist jetzt freigeschaltet.` : `Du hast die ganze Geschichte von ${esc(p.name)} geschafft!`) : `Du brauchst mindestens ${PASS_AT} richtige Antworten. Schau dir die Wörter unten noch einmal an.`}</p>
      </div>
      ${passed ? `<section class="card pr-blessing">
        <span class="eyebrow">Bārakallāhu fīk</span>
        <p>Diese <b>${learned.length} Wörter</b> aus dem Qur'an hast du in diesem Level gelernt. Möge Allah dich für deine Mühe belohnen, es dir leicht machen und dein Wissen vermehren.</p>
        <p class="pr-dua" lang="ar" dir="rtl">رَبِّ زِدْنِي عِلْمًا</p>
        <p class="pr-dua-de">„Mein Herr, mehre mein Wissen.“ (Ṭā-Hā 20:114)</p>
      </section>` : ""}
      <section class="card pr-wbw"><h3>${passed ? "Deine neuen Wörter" : "Die Wörter dieses Levels"}</h3>${wordList}</section>
      ${passed ? `<section class="card pr-kitab">
        <div class="pr-kitab-icon" aria-hidden="true"><svg viewBox="0 0 48 48" width="44" height="44"><path d="M6 10c6-2 12-2 18 2v28c-6-4-12-4-18-2z" fill="none" stroke="var(--maroon)" stroke-width="2.5" stroke-linejoin="round"/><path d="M42 10c-6-2-12-2-18 2v28c6-4 12-4 18-2z" fill="none" stroke="var(--maroon)" stroke-width="2.5" stroke-linejoin="round"/><path d="M33 4l6 6-14 14-7 1 1-7z" fill="var(--gold-a)"/></svg></div>
        <div><h3>Eine Bitte an dich</h3>
          <p>Du hast die Fragen gut beantwortet. Nimm jetzt einen Stift und schreib diese Wörter in dein eigenes <b>Kitāb</b>, also dein Heft: das arabische Wort und daneben die Bedeutung. Mit jedem Level wird dein Kitāb dicker, und mit der Zeit hast du einen großen Wortschatz aus dem Qur'an, mit deiner eigenen Hand geschrieben.</p></div>
      </section>` : ""}
      <div class="row center">
        ${passed && hasNext ? `<a class="btn primary" href="#/geschichten/${id}/${n + 1}">Weiter zu Level ${n + 1} →</a>` : ""}
        ${!passed ? `<button class="btn primary" id="again">Quiz wiederholen</button>` : ""}
        <a class="btn" href="#/geschichten/${id}">Zur Übersicht</a></div>`;
    view.querySelector("#again")?.addEventListener("click", () => quiz(0, 0));
  }

  story();
  return stopAudio;
}
