// Kleine Helfer, die jede Rubrik benutzen kann.

export const AR_DIGITS = "٠١٢٣٤٥٦٧٨٩";
/** 2026 → ٢٠٢٦ */
export const toAr = (n) => String(n).replace(/\d/g, (d) => AR_DIGITS[d]);
/** Zufallszahl von a bis b (inklusive) */
export const rnd = (a, b) => a + Math.floor(Math.random() * (b - a + 1));
export const shuffle = (a) => { for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; };
export const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));

// =====================================================================
//  SPRACHAUSGABE – live, auf jedem Gerät
//  1. Gerätestimme, wenn das Gerät eine arabische Stimme hat
//     (iPhone/iPad/Mac, die meisten Android-Geräte)
//  2. sonst live aus der Cloud: Google Text-to-Speech über die Firebase-Funktion
//     "tts" (Windows, Chrome am PC, Firefox …). Adresse in js/config.js → TTS_URL
//  Mit TTS_PREFER_CLOUD = true klingt es auf allen Geräten gleich (immer Cloud).
// =====================================================================
import { TTS_URL, TTS_PREFER_CLOUD } from "./config.js";

const hasSynth = (() => { try { return "speechSynthesis" in window && "SpeechSynthesisUtterance" in window; } catch (e) { return false; } })();
let arVoice = null;
function pickVoice() {
  try {
    const vs = speechSynthesis.getVoices().filter((v) => /^ar(-|_|$)/i.test(v.lang));
    // bevorzugt hochwertige Stimmen (Online/Premium/Enhanced), dann Standard-Arabisch
    arVoice = vs.find((v) => /premium|enhanced|natural|online/i.test(v.name)) || vs.find((v) => /ar-SA/i.test(v.lang)) || vs[0] || null;
  } catch (e) {}
}
if (hasSynth) { pickVoice(); try { speechSynthesis.addEventListener("voiceschanged", pickVoice); } catch (e) { speechSynthesis.onvoiceschanged = pickVoice; } }

const cloudReady = () => !!TTS_URL && !TTS_URL.includes("DEIN");
let audio = null;

/** Der 🔊-Knopf wird gezeigt, wenn irgendein Weg zur Verfügung steht. */
export const canSpeak = () => cloudReady() || hasSynth;

function speakDevice(text) {
  if (!hasSynth || !arVoice) return false;
  try {
    speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(text);
    u.voice = arVoice; u.lang = arVoice.lang; u.rate = 0.85;
    speechSynthesis.speak(u);
    return true;
  } catch (e) { return false; }
}

function speakCloud(text, onFail) {
  try {
    if (audio) { audio.pause(); audio.src = ""; }
    // Das Audio-Objekt wird direkt im Klick erzeugt – nötig für iPhone/Safari
    audio = new Audio(TTS_URL + (TTS_URL.includes("?") ? "&" : "?") + "text=" + encodeURIComponent(text));
    audio.addEventListener("error", onFail, { once: true });
    const p = audio.play();
    if (p && p.catch) p.catch(onFail);
    return true;
  } catch (e) { onFail(); return true; }
}

export function stopSpeaking() {
  try { if (hasSynth) speechSynthesis.cancel(); } catch (e) {}
  try { if (audio) audio.pause(); } catch (e) {}
}

export function speak(text) {
  stopSpeaking();
  if (!arVoice) pickVoice();
  const noVoice = () => toast("Auf diesem Gerät ist keine arabische Stimme verfügbar.");
  if (cloudReady() && (TTS_PREFER_CLOUD || !arVoice)) {
    // Cloud zuerst; klappt sie nicht (offline), dann Gerätestimme
    speakCloud(text, () => { if (!speakDevice(text)) noVoice(); });
    return;
  }
  if (!speakDevice(text)) noVoice();
}

/** Kurzer Hinweis unten am Bildschirm */
export function toast(msg) {
  let el = document.getElementById("toast");
  if (!el) {
    el = document.createElement("div"); el.id = "toast"; el.setAttribute("role", "status");
    el.style.cssText = "position:fixed;left:50%;bottom:calc(20px + env(safe-area-inset-bottom,0px));transform:translateX(-50%);max-width:min(92vw,420px);" +
      "background:var(--maroon);color:var(--gold-light);padding:10px 16px;border-radius:999px;font-size:.88rem;box-shadow:var(--shadow-hover);z-index:50;text-align:center";
    document.body.appendChild(el);
  }
  el.textContent = msg; el.hidden = false;
  clearTimeout(toast.t); toast.t = setTimeout(() => (el.hidden = true), 3500);
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
  if (fb) { fb.className = "feedback " + (ok ? "ok" : "no"); fb.textContent = ok ? "صَحِيح – richtig!" : "Nicht ganz – grün ist richtig."; }
  if (extra) extra(ok);
  const nx = root.querySelector("[data-next]");
  if (nx) { nx.hidden = false; nx.onclick = onNext; nx.focus({ preventScroll: true }); }
  return ok;
}
