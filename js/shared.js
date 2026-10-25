// Kleine Helfer, die jede Rubrik benutzen kann.

export const AR_DIGITS = "٠١٢٣٤٥٦٧٨٩";
/** 2026 → ٢٠٢٦ */
export const toAr = (n) => String(n).replace(/\d/g, (d) => AR_DIGITS[d]);
/** Zufallszahl von a bis b (inklusive) */
export const rnd = (a, b) => a + Math.floor(Math.random() * (b - a + 1));
export const shuffle = (a) => { for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; };
export const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));

// =====================================================================
//  SPRACHAUSGABE – Web Speech API (speechSynthesis), direkt im Browser
//  Nutzt die arabische Stimme des Geräts. Fehlt sie, zeigt die App,
//  wie man sie auf diesem Gerät installiert.
//  (Optional: Cloud-Stimme über TTS_URL in js/config.js)
// =====================================================================
import { TTS_URL, TTS_PREFER_CLOUD } from "./config.js";
import { t, lang } from "./i18n.js";

const hasSynth = (() => { try { return "speechSynthesis" in window && "SpeechSynthesisUtterance" in window; } catch (e) { return false; } })();
let arVoice = null, voicesLoaded = false;

function pickVoice() {
  try {
    const all = speechSynthesis.getVoices();
    if (all.length) voicesLoaded = true;
    const vs = all.filter((v) => /^ar([-_]|$)/i.test(v.lang) || /arab/i.test(v.name));
    // Reihenfolge: hochwertige Stimmen → Saudi-Arabien (Fuṣḥā-nah) → irgendeine arabische
    arVoice = vs.find((v) => /premium|enhanced|natural|neural|online/i.test(v.name))
      || vs.find((v) => /ar[-_]SA/i.test(v.lang)) || vs[0] || null;
  } catch (e) {}
}
if (hasSynth) {
  pickVoice();
  try { speechSynthesis.addEventListener("voiceschanged", pickVoice); } catch (e) { speechSynthesis.onvoiceschanged = pickVoice; }
  // manche Browser (Chrome/Android) liefern die Stimmen erst verzögert
  [250, 1000, 3000].forEach((t) => setTimeout(pickVoice, t));
}

const cloudReady = () => !!TTS_URL && !TTS_URL.includes("DEIN");
let audio = null;

/** Der 🔊-Knopf wird gezeigt, wenn der Browser Sprachausgabe kann. */
export const canSpeak = () => hasSynth || cloudReady();

const ua = navigator.userAgent || "";
const platform = /iPhone|iPad|iPod/i.test(ua) || (/Macintosh/i.test(ua) && "ontouchend" in document) ? "ios"
  : /Android/i.test(ua) ? "android" : /Windows/i.test(ua) ? "windows" : /Macintosh/i.test(ua) ? "mac" : "other";
const HELP = { ios: "voice.ios", android: "voice.android", windows: "voice.windows", mac: "voice.mac", other: "voice.other" };

function speakDevice(text, hint) {
  if (!hasSynth) return false;
  if (!arVoice) pickVoice();
  // Stimmenliste ist geladen, aber ohne Arabisch → Gerät würde Unsinn vorlesen
  if (!arVoice && voicesLoaded && platform !== "android") return false;
  try {
    speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(text);
    u.lang = arVoice ? arVoice.lang : "ar-SA";   // Android: Google-TTS wählt Arabisch auch ohne Eintrag in der Liste
    if (arVoice) u.voice = arVoice;
    u.rate = 0.85;
    u.onerror = (e) => { if (e.error !== "interrupted" && e.error !== "canceled") hint(); };
    speechSynthesis.speak(u);
    // Chrome-Eigenheit: hängt manchmal im Pausenzustand
    setTimeout(() => { try { if (speechSynthesis.paused) speechSynthesis.resume(); } catch (e) {} }, 120);
    return true;
  } catch (e) { return false; }
}

function speakCloud(text, onFail) {
  try {
    if (audio) { audio.pause(); audio.src = ""; }
    audio = new Audio(TTS_URL + (TTS_URL.includes("?") ? "&" : "?") + "text=" + encodeURIComponent(text));
    audio.addEventListener("error", onFail, { once: true });
    const p = audio.play();
    if (p && p.catch) p.catch(onFail);
  } catch (e) { onFail(); }
}

export function stopSpeaking() {
  try { if (hasSynth) speechSynthesis.cancel(); } catch (e) {}
  try { if (audio) audio.pause(); } catch (e) {}
}

let hintShown = false;

// ----- Ton an/aus (gilt für die ganze App, wird im Browser gemerkt) -----
const MUTE_KEY = "dar-mute";
let muted = (() => { try { return localStorage.getItem(MUTE_KEY) === "1"; } catch (e) { return false; } })();
export const isMuted = () => muted;
export function setMuted(v) {
  muted = !!v;
  try { localStorage.setItem(MUTE_KEY, muted ? "1" : "0"); } catch (e) {}
  if (muted) stopSpeaking();
}

/**
 * Arabischen Text vorlesen. { auto: true } = automatisch nach einer Antwort:
 * dann erscheint der Hinweis „keine arabische Stimme“ höchstens einmal pro Besuch.
 */
export function speak(text, opts = {}) {
  stopSpeaking();
  if (muted) return;          // Ton aus: nichts vorlesen, auch keinen Stimmen-Hinweis zeigen
  const noVoice = () => { if (opts.auto && hintShown) return; hintShown = true; toast(t(HELP[platform]), 9000); };
  if (cloudReady() && (TTS_PREFER_CLOUD || !arVoice)) {
    speakCloud(text, () => { if (!speakDevice(text, noVoice)) noVoice(); });
    return;
  }
  if (!speakDevice(text, noVoice)) noVoice();
}

/** Kurzer Hinweis unten am Bildschirm */
export function toast(msg, ms = 3500) {
  let el = document.getElementById("toast");
  if (!el) {
    el = document.createElement("div"); el.id = "toast"; el.setAttribute("role", "status");
    el.style.cssText = "position:fixed;left:50%;bottom:calc(20px + env(safe-area-inset-bottom,0px));transform:translateX(-50%);max-width:min(92vw,420px);" +
      "background:var(--maroon);color:var(--gold-light);padding:10px 18px;border-radius:18px;font-size:.88rem;box-shadow:var(--shadow-hover);z-index:50;text-align:center;pointer-events:none";
    document.body.appendChild(el);
  }
  el.textContent = msg; el.hidden = false;
  clearTimeout(toast.t); toast.t = setTimeout(() => (el.hidden = true), ms);
}

/** Lädt die CSS-Datei einer Rubrik genau einmal. Aufruf: loadCss(import.meta.url, "style.css") */
export function loadCss(base, file) {
  const href = new URL(file, base).href;
  if (document.querySelector(`link[data-mod-css="${href}"]`)) return;
  const l = document.createElement("link");
  l.rel = "stylesheet"; l.href = href; l.dataset.modCss = href;
  document.head.appendChild(l);
}

/**
 * Standard-Ablauf für eine Multiple-Choice-Antwort:
 * markiert richtig/falsch, sperrt die Knöpfe, zeigt Feedback, zählt den Fortschritt.
 */
export function judge({ root, api, picked, correctValue, onNext, extra }) {
  const ok = picked.dataset.v === String(correctValue);
  root.querySelectorAll(".opt").forEach((b) => (b.disabled = true));
  picked.classList.add(ok ? "ok" : "no");
  if (!ok) root.querySelector(`.opt[data-v="${correctValue}"]`)?.classList.add("ok");
  api.answer(ok);
  const fb = root.querySelector(".feedback");
  if (fb) { fb.className = "feedback " + (ok ? "ok" : "no"); fb.textContent = ok ? t("c.right") : t("c.wrong"); }
  if (extra) extra(ok);
  const nx = root.querySelector("[data-next]");
  if (nx) { nx.hidden = false; nx.onclick = onNext; nx.focus({ preventScroll: true }); }
  return ok;
}

/**
 * Arbeitsblätter einer Rubrik anzeigen (PDF zum Ansehen, Drucken, Herunterladen).
 * Liest modules/<rubrik>/blaetter/<sprache>/index.json (Fallback: de). Aufruf: showWorksheets(el, import.meta.url)
 */
export async function showWorksheets(el, base) {
  el.innerHTML = `<div class="card"><p class="note">${t("ws.loading")}</p></div>`;
  let list = [];
  let fellBack = false;
  const load = async (l) => { try { const r = await fetch(new URL(`blaetter/${l}/index.json`, base)); return r.ok ? await r.json() : []; } catch (e) { return []; } };
  list = await load(lang());
  if (!list.length && lang() !== "de") { list = await load("de"); fellBack = list.length > 0; }
  if (!list.length) { el.innerHTML = `<div class="card empty">${t("ws.none")}</div>`; return; }
  el.innerHTML = `
    <div class="ws-intro"><span class="eyebrow">${t("ws.eyebrow")}</span>
      <p class="lead">${t("ws.lead")}</p>${fellBack ? `<p class="lang-note">${t("ws.langNote")}</p>` : ""}</div>
    <div class="ws-grid">${list.map((w) => {
      const pdf = new URL(w.pdf, base).href, img = new URL(w.img, base).href;
      return `<article class="ws-card">
        <a class="ws-thumb" href="${pdf}" target="_blank" rel="noopener" aria-label="${esc(w.title)}"><img src="${img}" alt="${esc(t("ws.preview", { t: w.title }))}" loading="lazy"></a>
        <div class="ws-body"><h3>${esc(w.title)}</h3><p>${esc(w.desc)}</p>
          <span class="ws-meta">${t("ws.meta", { n: w.pages })}</span>
          <div class="row"><a class="btn primary small" href="${pdf}" target="_blank" rel="noopener">${t("ws.view")}</a>
            <a class="btn small" href="${pdf}" download>${t("ws.download")}</a></div></div>
      </article>`;
    }).join("")}</div>`;
}
