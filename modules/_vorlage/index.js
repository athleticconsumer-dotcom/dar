// =====================================================================
//  VORLAGE FÜR EINE NEUE RUBRIK
//  1. Ordner kopieren:  modules/_vorlage  →  modules/farben   (Beispiel)
//  2. ITEMS unten durch deine Inhalte ersetzen, Texte anpassen
//  3. In js/registry.js eintragen:
//       { id: "farben", status: "live", title: "Farben", ar: "الأَلْوَان",
//         desc: "...", needs: [], level: 1,
//         color: { light: "#2F7D8C", dark: "#7FD0DE" },
//         load: () => import("../modules/farben/index.js") },
//
//  Jede Rubrik exportiert ein Objekt mit:
//    percent(p)  → 0–100   wie weit der Nutzer ist (für Tracker + Leitfaden)
//    summary(p)  → kurzer Text, z. B. „4 von 8 Wörtern“
//    mount(root, api) → zeichnet die Rubrik in root; darf eine Aufräum-Funktion zurückgeben
//
//  api:
//    api.progress()      Fortschritts-Objekt dieser Rubrik (answered, correct, streak, best + eigene Felder)
//    api.update(fn)      eigene Felder ändern:  api.update(p => { p.mastery = {...} })
//    api.answer(ok)      eine beantwortete Aufgabe zählen (XP, Tagesziel, Serie)
//    api.speak(text)     arabischen Text vorlesen (wenn das Gerät eine Stimme hat)
//    api.canSpeak()
// =====================================================================
import { rnd, shuffle, esc, loadCss, judge } from "../../js/shared.js";

const MASTER_AT = 3;
const ITEMS = [
  { id: "ahmar", ar: "أَحْمَر", tr: "aḥmar", de: "rot" },
  { id: "azraq", ar: "أَزْرَق", tr: "azraq", de: "blau" },
  { id: "akhdar", ar: "أَخْضَر", tr: "akhḍar", de: "grün" },
  { id: "asfar", ar: "أَصْفَر", tr: "aṣfar", de: "gelb" },
];

export default {
  percent(p) {
    const m = p.mastery || {};
    return (ITEMS.reduce((s, it) => s + Math.min(m[it.id] || 0, MASTER_AT), 0) / (ITEMS.length * MASTER_AT)) * 100;
  },
  summary(p) {
    const m = p.mastery || {};
    return `${ITEMS.filter((it) => (m[it.id] || 0) >= MASTER_AT).length} von ${ITEMS.length} Wörtern`;
  },

  mount(root, api) {
    loadCss(import.meta.url, "style.css");
    let tab = "erklaerung";

    function frame(body) {
      root.innerHTML = `<div class="tabs" role="group">${[["erklaerung", "Erklärung"], ["aufgaben", "Aufgaben"]]
        .map(([k, t]) => `<button data-tab="${k}" aria-pressed="${tab === k}">${t}</button>`).join("")}</div>${body}`;
      root.querySelectorAll("[data-tab]").forEach((b) => (b.onclick = () => { tab = b.dataset.tab; show(); }));
    }

    function erklaerung() {
      frame(`<div class="card explain"><h2>So funktioniert es</h2>
        <p>Hier steht deine Erklärung.</p>
        ${ITEMS.map((it) => `<div class="ex"><span class="a" lang="ar">${it.ar}</span><b>${esc(it.de)}</b><span class="t">${esc(it.tr)}</span></div>`).join("")}
      </div>`);
    }

    function aufgaben() {
      const it = ITEMS[rnd(0, ITEMS.length - 1)];
      const opts = shuffle([it, ...shuffle(ITEMS.filter((x) => x !== it)).slice(0, 3)]);
      frame(`<div class="card">
        <p class="note" style="text-align:center">Was bedeutet das?</p>
        <div style="font:400 2.2rem/1.6 var(--f-ar);text-align:center" lang="ar" dir="rtl">${it.ar}</div>
        <div class="opts">${opts.map((o) => `<button class="opt" data-v="${o.id}">${esc(o.de)}</button>`).join("")}</div>
        <div class="feedback" aria-live="polite"></div>
        <div class="row center"><button class="btn primary" data-next hidden>Weiter →</button></div></div>`);
      root.querySelectorAll(".opt").forEach((b) => (b.onclick = () => judge({
        root, api, picked: b, correctValue: it.id, onNext: aufgaben,
        extra: (ok) => ok && api.update((p) => { p.mastery = p.mastery || {}; p.mastery[it.id] = (p.mastery[it.id] || 0) + 1; }),
      })));
    }

    function show() { ({ erklaerung, aufgaben })[tab](); }
    show();
  },
};
