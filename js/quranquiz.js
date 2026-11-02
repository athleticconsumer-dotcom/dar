// =====================================================================
//  QUR'AN-QUIZ für Wortschatz-Rubriken
//  Pro Bereich einige Stellen: erst farbig Wort für Wort lesen, dann Lücken füllen.
//  Benutzt die Mushaf-Ansicht der Geschichten (modules/propheten/style.css).
//
//  Eine Rubrik braucht:  modules/<rubrik>/quran.js   (SECTIONS, SURAH, PASSAGES)
//                        modules/<rubrik>/quran.json (python3 tools/quran/build_segments.py <quran-api> <rubrik>)
//  Fortschritt: p.quran = { <bereich>: true }
// =====================================================================
import { shuffle, esc, loadCss, toAr } from "./shared.js";
import { L } from "./i18n.js";

const WAQF = /[ۖ-ۜ۞۩]/g;
const cleanW = (w) => w.replace(WAQF, "");
const recitation = (s, a) => `https://everyayah.com/data/Alafasy_128kbps/${String(s).padStart(3, "0")}${String(a).padStart(3, "0")}.mp3`;
const col = (i) => `c${i % 6}`;
const cache = {};

export const quranDoneCount = (p, SECTIONS) => SECTIONS.filter((k) => p.quran?.[k]).length;

/**
 * @param api     Rubrik-API (t, answer, update, progress)
 * @param frame   Funktion der Rubrik, die Tabs + Inhalt zeichnet und den Inhalt-Container zurückgibt (root)
 * @param root    Wurzel-Element der Rubrik
 * @param base    import.meta.url der Rubrik (dort liegt quran.json)
 * @param secLabel(k) Name eines Bereichs in der aktuellen Sprache
 * @param isActive()  true, solange der Qur'an-Tab offen ist
 */
export function quranQuiz({ api, frame, root, base, SECTIONS, SURAH, PASSAGES, secLabel, isActive }) {
  loadCss(import.meta.url, "../modules/propheten/style.css");
  const t = api.t;
  let state = null, audio = null;
  const stopAudio = () => { try { audio && audio.pause(); } catch (e) {} audio = null; };
  const play = (d) => { stopAudio(); audio = new Audio(recitation(d.s, d.a)); audio.play().catch(() => {}); };
  const load = async () => cache[base] || (cache[base] = await (await fetch(new URL("quran.json", base))).json());
  const glossOf = (P) => L(P.w) || P.w.de;
  const inSec = () => PASSAGES.filter((x) => x.sec === state.sec);
  const ayahHtml = (d, inner) => `${d.start ? "" : "… "}${inner}${d.end ? ` <span class="pr-end">﴿${toAr(d.a)}﴾</span>` : " …"}`;
  const hud = (d, label) => {
    const [sn] = SURAH[d.s] || [String(d.s)];
    return `<div class="hud"><span>${secLabel(state.sec)} · ${t(label, { k: state.k + 1, n: inSec().length })}</span><span>${t("qq.surah", { name: sn })} · ${d.s}:${d.a}</span></div>`;
  };
  const mushaf = (d, html) => `<article class="pr-mushaf" lang="ar" dir="rtl"><div class="pr-surah"><span>سُورَةُ ${(SURAH[d.s] || ["", ""])[1]}</span></div>
    <p class="pr-ayah">${ayahHtml(d, html)}</p></article>`;
  const glossList = (words, gl, gapIdx = []) => `<section class="card pr-wbw"><h3>${t("qq.wbw")}</h3><ol class="pr-gloss" dir="rtl">${words.map((w, i) => {
    const gi = gapIdx.indexOf(i);
    return `<li class="${col(i)}${gi >= 0 ? " is-gap" : ""}" ${gi >= 0 ? `data-gl="${gi}"` : ""}><span class="ar" lang="ar" dir="rtl">${gi >= 0 ? "؟" : cleanW(w)}</span><span class="de">${esc(gl[i])}</span></li>`;
  }).join("")}</ol></section>`;
  const top = () => window.scrollTo(0, 0);

  async function show() {
    const Q = await load();
    if (!isActive()) return;
    if (!state) return home();
    const P = inSec()[state.k];
    if (!P) return finish(Q);
    return state.phase === "read" ? read(Q, P) : gap(Q, P);
  }

  function home() {
    const done = api.progress().quran || {};
    frame(`<div class="card qq-home">
      <h2>${t("qq.title")}</h2><p>${t("qq.lead")}</p>
      <div class="qq-secs">${SECTIONS.map((k) => `<button class="choice" data-sec="${k}"><b>${esc(secLabel(k))}${done[k] ? " ✓" : ""}</b>${t("qq.count", { n: PASSAGES.filter((x) => x.sec === k).length })}</button>`).join("")}</div>
      <p class="pr-src">${t("qq.src")}</p>
    </div>`);
    root.querySelectorAll("[data-sec]").forEach((b) => (b.onclick = () => { state = { sec: b.dataset.sec, k: 0, phase: "read" }; show(); top(); }));
  }

  function read(Q, P) {
    const d = Q[P.id], words = d.text.split(" "), gl = glossOf(P);
    frame(`${hud(d, "qq.read")}${mushaf(d, words.map((w, i) => `<span class="pr-w ${col(i)}">${w}</span>`).join(" "))}
      <p class="note" style="text-align:center">${t("qq.readNote")}${d.start && d.end ? "" : " " + t("qq.part")}</p>
      <div class="row center"><button class="btn" id="qRec">${t("qq.recite")}</button><button class="btn primary" id="qGap">${t("qq.toGap")}</button></div>
      ${glossList(words, gl)}`);
    root.querySelector("#qRec").onclick = () => play(d);
    root.querySelector("#qGap").onclick = () => { stopAudio(); state.phase = "gap"; show(); top(); };
  }

  function gap(Q, P) {
    const d = Q[P.id], words = d.text.split(" "), gl = glossOf(P);
    const gapIdx = [...P.gaps].sort((x, y) => x - y);
    const answers = gapIdx.map((i) => cleanW(words[i]));
    const all = PASSAGES.flatMap((x) => x.gaps.map((g) => cleanW(Q[x.id].text.split(" ")[g])));
    const pool = [...new Set(all.filter((w) => !answers.includes(w)))];
    const chips = shuffle([...answers, ...shuffle(pool).slice(0, Math.max(2, 5 - answers.length))]);
    const last = state.k + 1 >= inSec().length;
    let next = 0, mistakes = 0;
    const html = words.map((w, i) => {
      const gi = gapIdx.indexOf(i);
      if (gi < 0) return `<span class="pr-w ${col(i)}">${w}</span>`;
      const waqf = (w.match(WAQF) || []).join("");
      return `<span class="pr-gap ${col(i)}" data-g="${gi}"><small dir="ltr">${esc(gl[i])}</small></span>${waqf ? `<span class="pr-w ${col(i)}">${waqf}</span>` : ""}`;
    }).join(" ");
    frame(`${hud(d, "qq.gap")}${mushaf(d, html)}
      <p class="note" style="text-align:center">${t("qq.gapNote")}</p>
      <div class="pr-chips" lang="ar" dir="rtl">${chips.map((c) => `<button class="pr-chip" data-w="${esc(c)}">${c}</button>`).join("")}</div>
      <div class="feedback" aria-live="polite"></div>
      <div id="qAfter" hidden class="row center"><button class="btn" id="qRec">${t("qq.recite")}</button><button class="btn primary" id="qNext">${last ? t("qq.finish") : t("qq.next")}</button></div>
      ${glossList(words, gl, gapIdx)}`);
    const fb = root.querySelector(".feedback");
    root.querySelectorAll(".pr-chip").forEach((b) => (b.onclick = () => {
      if (next >= answers.length) return;
      if (b.dataset.w === answers[next]) {
        const slot = root.querySelector(`.pr-gap[data-g="${next}"]`);
        slot.textContent = b.dataset.w; slot.classList.add("filled");
        const g2 = root.querySelector(`[data-gl="${next}"] .ar`); if (g2) g2.textContent = b.dataset.w;
        b.disabled = true; b.classList.add("used"); next++; api.answer(true);
        if (next === answers.length) {
          fb.className = "feedback ok"; fb.textContent = mistakes ? t("qq.doneN", { n: mistakes }) : t("qq.perfect");
          root.querySelectorAll(".pr-chip:not(.used)").forEach((c) => (c.disabled = true));
          root.querySelector("#qAfter").hidden = false;
          root.querySelector("#qRec").onclick = () => play(d);
          root.querySelector("#qNext").onclick = () => { stopAudio(); state.k++; state.phase = "read"; show(); top(); };
        }
      } else {
        mistakes++; api.answer(false);
        b.classList.remove("shake"); void b.offsetWidth; b.classList.add("shake"); setTimeout(() => b.classList.remove("shake"), 700);
        fb.className = "feedback no"; fb.textContent = t("qq.wrong");
      }
    }));
  }

  function finish(Q) {
    const sec = state.sec;
    api.update((p) => { p.quran = p.quran || {}; p.quran[sec] = true; });
    const found = inSec().flatMap((x) => { const ws = Q[x.id].text.split(" "), gl = glossOf(x);
      return x.gaps.map((g) => ({ ar: cleanW(ws[g]), g: gl[g], ref: `${Q[x.id].s}:${Q[x.id].a}` })); });
    frame(`<div class="card pr-result qq-done">
      <h2>${t("qq.doneTitle")}</h2><p>${t("qq.doneText")}</p>
      <div class="pr-learned qq-found" dir="rtl">${found.map((f, i) => `<div class="${col(i)}"><span class="ar" lang="ar">${f.ar}</span><span dir="ltr">${esc(f.g)}</span><small>${f.ref}</small></div>`).join("")}</div>
      <div class="row center"><button class="btn primary" id="qBack">${t("qq.back")}</button></div>
    </div>`);
    root.querySelector("#qBack").onclick = () => { state = null; show(); };
  }

  return { show, reset: () => { state = null; stopAudio(); }, stop: stopAudio };
}
