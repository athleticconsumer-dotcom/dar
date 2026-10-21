// =====================================================================
//  RUBRIK: UHRZEIT  (السَّاعَة)
//  Tabs: Erklärung · Lernen · Aufgaben · Spiel (Uhr stellen)
//  Fortschritt (api.progress()):  mastery: { "<minute>": richtige }, gameBest
// =====================================================================
import { showWorksheets, toAr, rnd, shuffle, esc, loadCss, judge } from "../../js/shared.js";

const MASTER_AT = 3;           // pro Minuten-Muster
const ROUNDS = 5;              // Runden im Spiel

const HOURS = {
  1: ["الوَاحِدَة", "al-wāḥida"], 2: ["الثَّانِيَة", "ath-thāniya"], 3: ["الثَّالِثَة", "ath-thālitha"], 4: ["الرَّابِعَة", "ar-rābiʿa"],
  5: ["الخَامِسَة", "al-khāmisa"], 6: ["السَّادِسَة", "as-sādisa"], 7: ["السَّابِعَة", "as-sābiʿa"], 8: ["الثَّامِنَة", "ath-thāmina"],
  9: ["التَّاسِعَة", "at-tāsiʿa"], 10: ["العَاشِرَة", "al-ʿāshira"], 11: ["الحَادِيَةَ عَشْرَةَ", "al-ḥādiyata ʿashrata"], 12: ["الثَّانِيَةَ عَشْرَةَ", "ath-thāniyata ʿashrata"],
};
const MIN = {
  0: ["تَمَامًا", "tamāman", "genau"],
  5: ["وَخَمْسُ دَقَائِق", "wa-khamsu daqāʾiq", "und fünf Minuten"],
  10: ["وَعَشْرُ دَقَائِق", "wa-ʿashru daqāʾiq", "und zehn Minuten"],
  15: ["وَالرُّبْع", "war-rubʿ", "und ein Viertel"],
  20: ["وَالثُّلُث", "wath-thulth", "und ein Drittel"],
  25: ["وَالنِّصْفُ إِلَّا خَمْسَ دَقَائِق", "wan-niṣfu illā khamsa daqāʾiq", "und halb minus fünf Minuten"],
  30: ["وَالنِّصْف", "wan-niṣf", "und halb"],
  35: ["وَالنِّصْفُ وَخَمْسُ دَقَائِق", "wan-niṣfu wa-khamsu daqāʾiq", "und halb und fünf Minuten"],
  40: ["إِلَّا ثُلُثًا", "illā thulthan", "minus ein Drittel"],
  45: ["إِلَّا رُبْعًا", "illā rubʿan", "minus ein Viertel"],
  50: ["إِلَّا عَشْرَ دَقَائِق", "illā ʿashra daqāʾiq", "minus zehn Minuten"],
  55: ["إِلَّا خَمْسَ دَقَائِق", "illā khamsa daqāʾiq", "minus fünf Minuten"],
};
const MINUTES = Object.keys(MIN).map(Number);
const HOUR_DE = ["", "eins", "zwei", "drei", "vier", "fünf", "sechs", "sieben", "acht", "neun", "zehn", "elf", "zwölf"];
const DAYTIME = [
  ["صَبَاحًا", "ṣabāḥan", "morgens / vormittags"], ["ظُهْرًا", "ẓuhran", "mittags"], ["عَصْرًا", "ʿaṣran", "nachmittags"],
  ["مَسَاءً", "masāʾan", "abends"], ["لَيْلًا", "laylan", "nachts"],
];

/** Uhrzeit → Satz. Ab :40 zählt man von der NÄCHSTEN Stunde zurück. */
export function phrase(h, m) {
  const hh = m >= 40 ? (h % 12) + 1 : h, mi = MIN[m];
  return { ar: "السَّاعَةُ " + HOURS[hh][0] + " " + mi[0], short: HOURS[hh][0] + " " + mi[0],
    tr: "as-sāʿatu " + HOURS[hh][1] + " " + mi[1], de: "„" + HOUR_DE[hh] + " " + mi[2] + "“" };
}
const fmt = (h, m) => h + ":" + String(m).padStart(2, "0");

function clock(h, m, { small = false, interactive = false } = {}) {
  const t = [], nums = [];
  for (let i = 0; i < 60; i++) {
    const a = (i * 6 * Math.PI) / 180, big = i % 5 === 0, r1 = big ? 83 : 88;
    t.push(`<line x1="${(100 + r1 * Math.sin(a)).toFixed(1)}" y1="${(100 - r1 * Math.cos(a)).toFixed(1)}" x2="${(100 + 92 * Math.sin(a)).toFixed(1)}" y2="${(100 - 92 * Math.cos(a)).toFixed(1)}" stroke="var(--${big ? "ink" : "line"})" stroke-width="${big ? 2.6 : 1.2}" stroke-linecap="round"/>`);
  }
  if (!small) for (let i = 1; i <= 12; i++) {
    const a = (i * 30 * Math.PI) / 180;
    nums.push(`<text x="${(100 + 69 * Math.sin(a)).toFixed(1)}" y="${(100 - 69 * Math.cos(a)).toFixed(1)}" text-anchor="middle" dominant-baseline="central" font-family="Amiri,serif" font-size="17" fill="var(--muted)">${toAr(i)}</text>`);
  }
  const ha = (((h % 12) + m / 60) * 30 * Math.PI) / 180, ma = (m * 6 * Math.PI) / 180;
  return `<svg class="u-clock${small ? " small" : ""}${interactive ? " interactive" : ""}" viewBox="0 0 200 200" role="img" aria-label="Uhr zeigt ${fmt(h, m)}">
    <circle cx="100" cy="100" r="96" fill="var(--surface)" stroke="var(--gold-a)" stroke-width="4"/><circle cx="100" cy="100" r="90.5" fill="none" stroke="var(--m)" stroke-width="1" opacity=".35"/>
    ${t.join("")}${nums.join("")}
    <line x1="100" y1="100" x2="${(100 + 46 * Math.sin(ha)).toFixed(1)}" y2="${(100 - 46 * Math.cos(ha)).toFixed(1)}" stroke="var(--ink)" stroke-width="7" stroke-linecap="round"/>
    <line x1="100" y1="100" x2="${(100 + 74 * Math.sin(ma)).toFixed(1)}" y2="${(100 - 74 * Math.cos(ma)).toFixed(1)}" stroke="var(--m)" stroke-width="4" stroke-linecap="round"/>
    <circle cx="100" cy="100" r="5.5" fill="var(--gold-a)" stroke="var(--m)" stroke-width="1.5"/></svg>`;
}

export default {
  percent(p) {
    const m = p.mastery || {};
    return (MINUTES.reduce((s, k) => s + Math.min(m[k] || 0, MASTER_AT), 0) / (MINUTES.length * MASTER_AT)) * 100;
  },
  summary(p) {
    const m = p.mastery || {};
    return `${MINUTES.filter((k) => (m[k] || 0) >= MASTER_AT).length} von ${MINUTES.length} Mustern`;
  },
  extraStats(p) { return `Spiel-Rekord ${p.gameBest || 0}/${ROUNDS}`; },

  mount(root, api) {
    loadCss(import.meta.url, "style.css");
    const S = { tab: api.progress().answered ? "aufgaben" : "erklaerung", h: 3, m: 15 };
    const credit = (m) => api.update((p) => { p.mastery = p.mastery || {}; p.mastery[m] = (p.mastery[m] || 0) + 1; });
    const mastered = (m) => Math.min(api.progress().mastery?.[m] || 0, MASTER_AT);
    const listen = (text) => api.canSpeak() ? `<button class="btn" data-say="${esc(text)}">🔊 Anhören</button>` : "";
    const bindSay = () => root.querySelectorAll("[data-say]").forEach((b) => (b.onclick = () => api.speak(b.dataset.say)));
    // Für die Übungen: bevorzugt Muster, die noch nicht sitzen
    const pickMinute = () => {
      const open = MINUTES.filter((m) => mastered(m) < MASTER_AT);
      return open.length && Math.random() < 0.7 ? open[rnd(0, open.length - 1)] : MINUTES[rnd(0, MINUTES.length - 1)];
    };

    function frame(body) {
      root.innerHTML = `
        <div class="tabs" role="group" aria-label="Bereich der Rubrik">
          ${[["erklaerung", "Erklärung"], ["lernen", "Lernen"], ["aufgaben", "Aufgaben"], ["spiel", "Spiel"], ["blaetter", "Arbeitsblätter"]]
            .map(([k, t]) => `<button data-tab="${k}" aria-pressed="${S.tab === k}">${t}</button>`).join("")}
        </div>${body}`;
      root.querySelectorAll("[data-tab]").forEach((b) => (b.onclick = () => { S.tab = b.dataset.tab; show(); }));
    }
    const table = (h, clickable) => `<div class="tablewrap"><table class="ref"><tbody>${MINUTES.map((m) => `
      <tr${clickable ? ` data-m="${m}" tabindex="0"` : ""}><td class="u-time">${fmt(h, m)}</td><td class="a" lang="ar">${MIN[m][0]}</td><td class="t">${MIN[m][2]}</td></tr>`).join("")}</tbody></table></div>`;

    // ---------------- Erklärung ----------------
    function erklaerung() {
      const ex = (h, m, note) => { const p = phrase(h, m); return `<div class="ex"><span class="a" lang="ar">${p.ar}</span><b>${fmt(h, m)}</b><span class="t">${esc(p.tr)}${note ? " – " + note : ""}</span></div>`; };
      frame(`
        <div class="card explain">
          <h2>1 · Die Frage</h2>
          <div class="ex"><span class="a" lang="ar">كَمِ السَّاعَةُ؟</span><b>Wie spät ist es?</b><span class="t">kami s-sāʿa? – wörtlich „wie viel ist die Stunde?“</span></div>
          <p>Die Antwort beginnt immer mit <span class="ar" lang="ar">السَّاعَةُ</span> (as-sāʿa, „die Stunde“) und dann der Stunde als <b>Ordnungszahl</b>: „die dritte“, nicht „drei“.</p>
        </div>
        <div class="card explain">
          <h2>2 · Die Stunden sind weiblich</h2>
          <p>Weil <span class="ar" lang="ar">سَاعَة</span> weiblich ist, steht die Ordnungszahl in der weiblichen Form mit ـة am Ende. Nur bei 1 sagt man <span class="ar" lang="ar">الوَاحِدَة</span>, nicht „die erste“.</p>
          <div class="u-hours">${Object.entries(HOURS).map(([n, [a, t]]) => `<div><b>${n}</b><span class="ar" lang="ar">${a}</span><i>${t}</i></div>`).join("")}</div>
        </div>
        <div class="card explain">
          <h2>3 · Bis halb: „und …“</h2>
          <p>Mit <span class="ar" lang="ar">وَ</span> (wa, „und“) hängst du Viertel, Drittel und Hälfte an. Das <b>Drittel</b> (20 Minuten) gibt es im Deutschen nicht – im Arabischen ist es ganz normal.</p>
          ${ex(3, 15)}${ex(3, 20, "„und ein Drittel“")}${ex(3, 30)}
        </div>
        <div class="card explain">
          <h2>4 · Ab :40 – „minus“ die nächste Stunde</h2>
          <p>Wie „Viertel vor vier“: Ab 40 Minuten nimmst du die <b>nächste</b> Stunde und ziehst mit <span class="ar" lang="ar">إِلَّا</span> (illā, „außer/minus“) ab.</p>
          ${ex(3, 45, "„vier minus ein Viertel“")}${ex(3, 40)}
          <p>Bei 25 und 35 Minuten rechnet man von der halben Stunde aus: „halb minus fünf“ und „halb und fünf“ – wie „fünf vor halb“ im Deutschen.</p>
          ${ex(3, 25)}${ex(3, 35)}
        </div>
        <div class="card explain">
          <h2>5 · Tageszeit dazusagen</h2>
          <p>Die Uhr hat 12 Stunden. Ob morgens oder abends, sagst du mit einem Wort am Ende: <span class="ar" lang="ar">السَّاعَةُ الثَّامِنَةُ مَسَاءً</span> = 8 Uhr abends.</p>
          <div class="tablewrap"><table class="ref"><tbody>${DAYTIME.map(([a, t, d]) => `<tr><td class="a" lang="ar">${a}</td><td class="t">${t}</td><td>${d}</td></tr>`).join("")}</tbody></table></div>
        </div>
        <div class="card explain"><h2>Alle Muster auf einen Blick</h2>${table(3, false)}</div>
        <div class="row center"><button class="btn primary" data-go>Weiter zum Lernen →</button></div>`);
      root.querySelector("[data-go]").onclick = () => { S.tab = "lernen"; show(); };
    }

    // ---------------- Lernen ----------------
    function lernen() {
      const p = phrase(S.h, S.m);
      frame(`
        <div class="card u-stage">
          <div class="u-face">${clock(S.h, S.m, { interactive: true })}</div>
          <div class="u-digital">${fmt(S.h, S.m)}</div>
          <div class="u-phrase" lang="ar" dir="rtl">${p.ar}</div>
          <div class="u-tr">${esc(p.tr)}</div>
          <div class="u-de">${esc(p.de)}</div>
          <div class="row center">
            <button class="btn" data-step="-60">− Stunde</button><button class="btn" data-step="60">+ Stunde</button>
            <button class="btn" data-step="-5">− 5 Min</button><button class="btn" data-step="5">+ 5 Min</button>
          </div>
          <div class="row center">${listen(p.ar)}<button class="btn" id="uRand">Zufällige Uhrzeit</button></div>
          <p class="note" style="text-align:center">Tipp: Tippe auf das Zifferblatt, um den Minutenzeiger zu setzen.</p>
        </div>
        <div class="card"><div class="eyebrow">Muster für ${S.h} Uhr – antippen zum Anzeigen</div>${table(S.h, true)}</div>`);
      bindSay();
      root.querySelectorAll("[data-step]").forEach((b) => (b.onclick = () => {
        const t = (((S.h % 12) * 60 + S.m + +b.dataset.step) % 720 + 720) % 720;
        S.h = Math.floor(t / 60) || 12; S.m = t % 60; lernen();
      }));
      root.querySelector("#uRand").onclick = () => { S.h = rnd(1, 12); S.m = MINUTES[rnd(0, 11)]; lernen(); };
      root.querySelectorAll("tr[data-m]").forEach((tr) => (tr.onclick = tr.onkeydown = (e) => {
        if (e.type === "keydown" && e.key !== "Enter" && e.key !== " ") return;
        S.m = +tr.dataset.m; lernen(); root.scrollIntoView({ behavior: "smooth", block: "start" });
      }));
      setByTap(root.querySelector(".u-clock"), (m) => { S.m = m; lernen(); });
    }

    // Tippen auf die Uhr → Minutenzeiger auf die nächsten 5 Minuten
    function setByTap(svg, cb) {
      svg.addEventListener("click", (e) => {
        const r = svg.getBoundingClientRect();
        const x = e.clientX - (r.left + r.width / 2), y = e.clientY - (r.top + r.height / 2);
        let deg = (Math.atan2(x, -y) * 180) / Math.PI; if (deg < 0) deg += 360;
        cb((Math.round(deg / 30) % 12) * 5);
      });
    }

    // ---------------- Aufgaben ----------------
    function options(h, m) {
      const key = (a, b) => phrase(a, b).ar, set = new Map([[key(h, m), [h, m]]]);
      let tries = 0;
      while (set.size < 4 && tries++ < 200) {
        const k = rnd(0, 3);
        const c = k === 0 ? [h, MINUTES[rnd(0, 11)]] : k === 1 ? [(h % 12) + 1, m] : k === 2 ? [h, (m + 30) % 60] : [rnd(1, 12), MINUTES[rnd(0, 11)]];
        if (!set.has(key(c[0], c[1]))) set.set(key(c[0], c[1]), c);
      }
      return shuffle([...set.values()]);
    }
    function aufgaben() {
      const h = rnd(1, 12), m = pickMinute(), p = phrase(h, m), opts = options(h, m), type = rnd(0, 1);
      const correct = fmt(h, m);
      const prompt = type === 0
        ? `<p class="note">Wie spät ist es? · <span class="ar" lang="ar">كَمِ السَّاعَةُ؟</span></p><div class="u-face">${clock(h, m)}</div>`
        : `<p class="note">Welche Uhr passt?</p><div class="u-phrase" lang="ar" dir="rtl">${p.ar}</div>`;
      const opt = type === 0
        ? opts.map(([a, b]) => `<button class="opt arabic" lang="ar" dir="rtl" data-v="${fmt(a, b)}">${phrase(a, b).short}</button>`).join("")
        : opts.map(([a, b]) => `<button class="opt u-opt" data-v="${fmt(a, b)}" aria-label="${fmt(a, b)}">${clock(a, b, { small: true })}</button>`).join("");
      const done = MINUTES.filter((k) => mastered(k) >= MASTER_AT).length;
      frame(`
        <div class="card">
          <div class="hud"><span>Muster gemeistert <b>${done}/${MINUTES.length}</b></span><span>Serie <b>${api.progress().streak}</b></span></div>
          <div class="u-dots" aria-hidden="true">${MINUTES.map((k) => `<i class="${mastered(k) >= MASTER_AT ? "full" : mastered(k) ? "part" : ""}" title=":${String(k).padStart(2, "0")}"></i>`).join("")}</div>
          <div class="u-prompt">${prompt}</div>
          <div class="opts">${opt}</div>
          <div class="feedback" aria-live="polite"></div>
          <div class="u-tr" id="uSol" hidden></div>
          <div class="row center">${listen(p.ar)}<button class="btn primary" data-next hidden>Nächste Aufgabe →</button></div>
        </div>`);
      bindSay();
      root.querySelectorAll(".opt").forEach((b) => (b.onclick = () => judge({
        root, api, picked: b, correctValue: correct, onNext: aufgaben,
        extra: (ok) => {
          if (ok) credit(m);
          const s = root.querySelector("#uSol"); s.hidden = false; s.textContent = `${correct} = ${p.tr} ${p.de}`;
          root.querySelector(".hud span:last-child b").textContent = api.progress().streak;
        },
      })));
    }

    // ---------------- Spiel: Uhr stellen ----------------
    function spiel() {
      frame(`
        <div class="card u-stage">
          <div class="u-title"><span lang="ar" dir="rtl">اِضْبِطِ السَّاعَة</span><h2>Uhr stellen</h2></div>
          <p class="lead" style="text-align:center">Du liest eine Uhrzeit auf Arabisch und stellst die Zeiger. ${ROUNDS} Runden – wie viele schaffst du ohne Fehler?</p>
          <div class="hud" style="justify-content:center"><span>Dein Rekord: <b>${api.progress().gameBest || 0}/${ROUNDS}</b></span></div>
          <div class="row center"><button class="btn primary" id="uGo">Spiel starten</button></div>
        </div>`);
      root.querySelector("#uGo").onclick = () => round(1, 0);
    }
    function round(n, score) {
      const target = { h: rnd(1, 12), m: pickMinute() }, p = phrase(target.h, target.m);
      const cur = { h: 12, m: 0 };
      const draw = () => {
        root.querySelector(".u-face").innerHTML = clock(cur.h, cur.m, { interactive: true });
        root.querySelector(".u-digital").textContent = fmt(cur.h, cur.m);
        setByTap(root.querySelector(".u-clock"), (m) => { cur.m = m; draw(); });
      };
      frame(`
        <div class="card u-stage">
          <div class="hud"><span>Runde <b>${n}/${ROUNDS}</b></span><span>Richtig <b>${score}</b></span></div>
          <div class="u-phrase" lang="ar" dir="rtl">${p.ar}</div>
          <div class="row center">${listen(p.ar)}</div>
          <div class="u-face"></div>
          <div class="u-digital"></div>
          <div class="row center">
            <button class="btn" data-h="-1">− Stunde</button><button class="btn" data-h="1">+ Stunde</button>
            <button class="btn" data-mm="-5">− 5 Min</button><button class="btn" data-mm="5">+ 5 Min</button>
          </div>
          <div class="feedback" aria-live="polite"></div>
          <div class="row center"><button class="btn primary" id="uCheck">Prüfen</button><button class="btn primary" id="uNext" hidden>${n < ROUNDS ? "Nächste Runde →" : "Ergebnis"}</button></div>
        </div>`);
      bindSay(); draw();
      root.querySelectorAll("[data-h]").forEach((b) => (b.onclick = () => { cur.h = ((cur.h - 1 + +b.dataset.h + 12) % 12) + 1; draw(); }));
      root.querySelectorAll("[data-mm]").forEach((b) => (b.onclick = () => { cur.m = (cur.m + +b.dataset.mm + 60) % 60; draw(); }));
      root.querySelector("#uCheck").onclick = () => {
        const ok = cur.h === target.h && cur.m === target.m;
        api.answer(ok); if (ok) credit(target.m);
        const fb = root.querySelector(".feedback");
        fb.className = "feedback " + (ok ? "ok" : "no");
        fb.textContent = ok ? "صَحِيح – genau richtig!" : `Fast – gemeint war ${fmt(target.h, target.m)} ${p.de}.`;
        if (!ok) { cur.h = target.h; cur.m = target.m; draw(); }
        root.querySelectorAll("[data-h],[data-mm],#uCheck").forEach((b) => (b.disabled = true));
        const next = root.querySelector("#uNext"); next.hidden = false; next.focus({ preventScroll: true });
        next.onclick = () => n < ROUNDS ? round(n + 1, score + (ok ? 1 : 0)) : finish(score + (ok ? 1 : 0));
      };
    }
    function finish(score) {
      const best = api.progress().gameBest || 0, record = score > best;
      if (record) api.update((p) => { p.gameBest = score; });
      frame(`
        <div class="card u-stage">
          <div class="u-title"><span lang="ar" dir="rtl">${score === ROUNDS ? "مُمْتَاز!" : "أَحْسَنْت!"}</span><h2>${score}/${ROUNDS} richtig${record ? " – neuer Rekord!" : ""}</h2></div>
          <p class="lead" style="text-align:center">${record ? "So gut warst du noch nie." : `Dein Rekord liegt bei ${best}/${ROUNDS}.`}</p>
          <div class="row center"><button class="btn primary" id="uAgain">Noch einmal</button></div>
        </div>`);
      root.querySelector("#uAgain").onclick = () => round(1, 0);
    }

    function blaetter() { frame(`<div id="wsRoot" style="display:flex;flex-direction:column;gap:16px"></div>`); showWorksheets(root.querySelector("#wsRoot"), import.meta.url); }

    function show() { ({ erklaerung, lernen, aufgaben, spiel, blaetter })[S.tab](); }
    show();
  },
};
