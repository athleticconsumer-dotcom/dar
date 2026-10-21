// =====================================================================
//  APP – Navigation, Startseite, Leitfaden, Fortschritt und das Laden
//  der Rubriken. Rubriken selbst liegen in /modules/<id>/.
// =====================================================================
import { RUBRIKEN, byId, liveRubriken } from "./registry.js";
import { store } from "./store.js";
import { startFirebase } from "./firebase.js";
import { QUESTIONS, buildPath, recommend } from "./guide.js";
import { DONE_AT } from "./config.js";
import { speak, canSpeak, stopSpeaking, esc } from "./shared.js";

const view = document.getElementById("view");
const mods = {};               // geladene Rubrik-Module: { zahlen: {percent, summary, mount} }
let cleanup = null;            // Aufräumfunktion der gerade offenen Rubrik

// ---------- Farbwelten der Rubriken aus der Registry erzeugen ----------
(function themes() {
  const light = [], dark = [];
  for (const r of RUBRIKEN) {
    light.push(`.theme-${r.id}{--m:${r.color.light};--m-ink:#FFFFFF;--m-soft:color-mix(in srgb,${r.color.light} 9%,var(--surface))}`);
    dark.push(`.theme-${r.id}{--m:${r.color.dark};--m-ink:#1A070D;--m-soft:color-mix(in srgb,${r.color.dark} 11%,var(--surface))}`);
  }
  const d = dark.join("");
  const style = document.createElement("style");
  style.textContent = light.join("") +
    `@media (prefers-color-scheme:dark){${d.replace(/\.theme-/g, ':root:not([data-theme="light"]) .theme-')}}` +
    d.replace(/\.theme-/g, ':root[data-theme="dark"] .theme-');
  document.head.appendChild(style);
})();

// ---------- Hilfen ----------
const percentOf = (id) => {
  const m = mods[id];
  if (!m) return 0;
  try { return Math.max(0, Math.min(100, Math.round(m.percent(store.module(id))))); } catch (e) { return 0; }
};
const overallPercent = () => {
  const live = liveRubriken();
  return live.length ? Math.round(live.reduce((s, r) => s + percentOf(r.id), 0) / live.length) : 0;
};
const dailyGoal = () => store.get().profile?.daily || 20;

function ring(pct, label) {
  const r = 46, c = 2 * Math.PI * r, off = c * (1 - pct / 100);
  return `<svg class="ring" viewBox="0 0 112 112" role="img" aria-label="${label}: ${pct} Prozent">
    <circle cx="56" cy="56" r="${r}" fill="none" stroke="var(--paper)" stroke-width="10"/>
    <circle cx="56" cy="56" r="${r}" fill="none" stroke="var(--gold-a)" stroke-width="10" stroke-linecap="round"
      stroke-dasharray="${c.toFixed(1)}" stroke-dashoffset="${off.toFixed(1)}" transform="rotate(-90 56 56)"/>
    <text x="56" y="54" text-anchor="middle" font-family="Plus Jakarta Sans,system-ui,sans-serif" font-weight="700" font-size="24" fill="var(--heading)">${pct}%</text>
    <text x="56" y="74" text-anchor="middle" font-family="Plus Jakarta Sans,system-ui,sans-serif" font-size="11" fill="var(--muted)">gesamt</text></svg>`;
}
const bar = (pct) => `<div class="bar" role="progressbar" aria-valuenow="${pct}" aria-valuemin="0" aria-valuemax="100"><i style="width:${pct}%"></i></div>`;

// ---------- Seiten ----------
function home() {
  const s = store.get(), o = s.overall, profile = s.profile;
  const pct = overallPercent(), today = store.todayCorrect(), goal = dailyGoal();
  const { next, blocked } = recommend(profile, percentOf, DONE_AT);
  const path = buildPath(profile);

  const nextBox = !profile
    ? `<div class="next">
        <div class="txt"><span class="label">✦ Dein Einstieg</span><h3>Wo fängst du an?</h3>
          <p class="lead">Beantworte drei kurze Fragen, und der Leitfaden schlägt dir die passende Reihenfolge vor.</p></div>
        <a class="btn primary" href="#/leitfaden">Zum Leitfaden →</a></div>`
    : next ? `<div class="next theme-${next.rubrik.id}">
        <div class="txt"><span class="label">✦ Empfohlen als Nächstes</span>
          <h3>${esc(next.rubrik.title)} <span class="ar" lang="ar" dir="rtl" style="color:var(--m)">${next.rubrik.ar}</span></h3>
          <p class="lead">${blocked ? `„${esc(blocked.rubrik.title)}“ kommt bald. Bis dahin: ` : ""}${esc(next.why)}</p></div>
        <a class="btn primary" href="#/r/${next.rubrik.id}">${percentOf(next.rubrik.id) > 0 ? "Weitermachen →" : "Starten →"}</a></div>` : "";

  const rooms = path.map((step, i) => {
    const r = step.rubrik, live = r.status === "live", p = percentOf(r.id);
    const isNext = next && next.rubrik.id === r.id;
    const badge = !live ? '<span class="pill">Bald</span>' : isNext ? '<span class="pill rec">Empfohlen</span>'
      : step.optional ? '<span class="pill">Optional</span>' : p >= DONE_AT ? '<span class="pill live">Geschafft</span>' : "";
    const inner = `
      <div class="top"><div class="icon" lang="ar">${r.ar}</div>${badge}</div>
      <span class="step">Schritt ${i + 1}</span>
      <h3>${esc(r.title)}</h3>
      <p class="desc">${esc(r.desc)}</p>
      ${live ? bar(p) : ""}
      <div class="meta"><span>${live ? `${p}% · ${esc(mods[r.id]?.summary?.(store.module(r.id)) || "")}` : "In Vorbereitung"}</span></div>`;
    return live
      ? `<a class="room theme-${r.id}" href="#/r/${r.id}">${inner}</a>`
      : `<div class="room soon theme-${r.id}" aria-disabled="true">${inner}</div>`;
  }).join("");

  const streak = store.liveDayStreak();
  view.innerHTML = `
    <section class="welcome">
      <div class="welcome-card">
        <div class="text">
          <span class="eyebrow">Fuṣḥā · Hocharabisch</span>
          <p class="salam" lang="ar" dir="rtl" style="text-align:left">أَهْلًا وَسَهْلًا</p>
          <h1>Dein Weg ins Arabische</h1>
          <p class="lead">Wähle eine Rubrik und lerne mit Erklärungen, Übungen und Spielen. Dein Fortschritt wird bei jedem Schritt gespeichert.</p>
          <div class="kpis">
            <span><b>${o.xp}</b> XP</span>
            <span><b>${streak}</b> ${streak === 1 ? "Tag" : "Tage"} in Folge</span>
            <span>Heute <b>${Math.min(today, goal)}/${goal}</b> richtig</span>
          </div>
          <div style="max-width:340px">${bar(Math.min(100, Math.round((today / goal) * 100)))}</div>
        </div>
        ${ring(pct, "Gesamtfortschritt")}
      </div>
    </section>
    ${nextBox}
    <section style="display:flex;flex-direction:column;gap:18px">
      <div class="section-head"><span class="eyebrow">Rubriken</span>
        <h2>Was möchtest du heute lernen?</h2>
        <p>${profile ? "In deiner Reihenfolge aus dem Leitfaden" : "In der empfohlenen Standard-Reihenfolge"}</p></div>
      <div class="rooms">${rooms}</div>
    </section>`;
}

function guidePage() {
  const profile = { ...(store.get().profile || {}) };
  const render = () => {
    const complete = QUESTIONS.every((q) => profile[q.key] !== undefined);
    const qs = QUESTIONS.map((q) => `
      <div class="qgroup"><h3>${q.label}</h3>
        <div class="choices">${q.options.map((o) => `
          <button class="choice" data-k="${q.key}" data-v="${o.v}" aria-pressed="${String(profile[q.key]) === String(o.v)}">
            <b>${o.t}</b>${o.d}</button>`).join("")}</div></div>`).join("");
    const path = complete ? buildPath(profile) : null;
    view.innerHTML = `
      <section style="display:flex;flex-direction:column;gap:8px">
        <div class="eyebrow">Leitfaden</div>
        <h1>Dein Weg durch die Rubriken</h1>
        <p class="lead">Drei Fragen, dann zeigt dir der Leitfaden, womit du anfangen solltest. Du kannst die Antworten jederzeit ändern.</p>
      </section>
      <div class="card">${qs}</div>
      ${path ? `<div class="card">
        <h2>Deine Reihenfolge</h2>
        <ol class="path">${path.map((s, i) => `
          <li class="theme-${s.rubrik.id}"><span class="n">${i + 1}</span>
            <div style="min-width:0"><b>${esc(s.rubrik.title)}</b> <span class="ar" lang="ar" style="color:var(--m)">${s.rubrik.ar}</span>
              <div class="why">${esc(s.why)}</div></div>
            ${s.rubrik.status === "live" ? `<a class="btn small" href="#/r/${s.rubrik.id}">Öffnen</a>` : '<span class="pill">Bald</span>'}</li>`).join("")}</ol>
        <div class="row"><a class="btn primary" href="#/">Zur Startseite</a></div>
      </div>` : `<p class="note">Beantworte alle drei Fragen, um deine Reihenfolge zu sehen.</p>`}`;
    view.querySelectorAll(".choice").forEach((b) => (b.onclick = () => {
      const q = QUESTIONS.find((x) => x.key === b.dataset.k);
      profile[q.key] = q.options.find((o) => String(o.v) === b.dataset.v).v;
      if (QUESTIONS.every((x) => profile[x.key] !== undefined)) store.setProfile({ ...profile });
      render();
    }));
  };
  render();
}

function progressPage() {
  const s = store.get(), o = s.overall;
  const acc = o.answered ? Math.round((o.correct / o.answered) * 100) : 0;
  const rows = liveRubriken().map((r) => {
    const p = store.module(r.id), pct = percentOf(r.id);
    const a = p.answered ? Math.round((p.correct / p.answered) * 100) : 0;
    return `<div class="prow theme-${r.id}">
      <a href="#/r/${r.id}" style="text-decoration:none;min-width:0"><b>${esc(r.title)}</b> <span class="ar" lang="ar" style="color:var(--m)">${r.ar}</span></a>
      <span class="pct">${pct}%</span>${bar(pct)}
      <span class="sub">${esc(mods[r.id]?.summary?.(p) || "")} · ${p.correct}/${p.answered} richtig (${a}%) · beste Serie ${p.best}${mods[r.id]?.extraStats ? " · " + esc(mods[r.id].extraStats(p)) : ""}</span></div>`;
  }).join("");
  const soon = RUBRIKEN.filter((r) => r.status !== "live").map((r) => esc(r.title)).join(", ");

  view.innerHTML = `
    <section class="welcome">
      <div class="welcome-card">
        <div class="text"><span class="eyebrow">Fortschritt</span>
          <h1>Was du schon geschafft hast</h1>
          <p class="lead">Der Gesamtfortschritt ist der Durchschnitt aller verfügbaren Rubriken. Neue Rubriken kommen dazu, sobald sie fertig sind.</p></div>
        ${ring(overallPercent(), "Gesamtfortschritt")}
      </div>
    </section>
    <div class="stats">
      <div class="stat"><b>${o.xp}</b><span>XP gesamt</span></div>
      <div class="stat"><b>${o.correct}</b><span>richtige Antworten</span></div>
      <div class="stat"><b>${acc}%</b><span>Trefferquote</span></div>
      <div class="stat"><b>${store.liveDayStreak()}</b><span>Tage in Folge</span></div>
      <div class="stat"><b>${o.bestDayStreak}</b><span>längste Tagesserie</span></div>
      <div class="stat"><b>${Math.min(store.todayCorrect(), dailyGoal())}/${dailyGoal()}</b><span>Tagesziel heute</span></div>
    </div>
    <div class="card"><h2>Pro Rubrik</h2><div class="ptable">${rows}</div>
      ${soon ? `<p class="note">In Arbeit: ${soon}</p>` : ""}</div>
    <div class="card"><h3>Neu anfangen</h3>
      <p class="note">Löscht deinen gesamten Fortschritt und die Antworten aus dem Leitfaden.</p>
      <div class="row"><button class="btn" id="reset1">Fortschritt zurücksetzen</button>
        <span id="reset2" hidden>Wirklich alles löschen? <button class="btn small" id="resetYes" style="border-color:var(--bad);color:var(--bad)">Ja, löschen</button>
        <button class="btn small ghost" id="resetNo">Abbrechen</button></span></div></div>`;
  view.querySelector("#reset1").onclick = () => { view.querySelector("#reset2").hidden = false; };
  view.querySelector("#resetNo").onclick = () => { view.querySelector("#reset2").hidden = true; };
  view.querySelector("#resetYes").onclick = () => { store.reset(); progressPage(); };
}

async function rubrikPage(id) {
  const r = byId(id);
  if (!r || r.status !== "live") { view.innerHTML = `<div class="empty">Diese Rubrik gibt es (noch) nicht. <a href="#/">Zur Startseite</a></div>`; return; }
  const mod = mods[id] || (mods[id] = (await r.load()).default);
  view.classList.add("theme-" + id);
  view.innerHTML = `
    <div class="mod-head">
      <div class="mod-title"><a class="back" href="#/">← Alle Rubriken</a>
        <h1>${esc(r.title)}</h1><span class="ar" lang="ar" dir="rtl">${r.ar}</span></div>
      <div style="min-width:180px;flex:0 1 240px"><div class="hud"><span>Fortschritt</span><b id="modPct">${percentOf(id)}%</b></div>${bar(percentOf(id))}</div>
    </div>
    <div id="modRoot" class="mod-${id}" style="display:flex;flex-direction:column;gap:18px"></div>`;
  const api = {
    id, rubrik: r,
    progress: () => store.module(id),
    update: (fn) => store.update(id, fn),
    answer: (ok) => store.answer(id, ok),
    speak, canSpeak,
  };
  cleanup = mod.mount(view.querySelector("#modRoot"), api) || null;
}

// Kopf der Rubrik live aktualisieren, wenn sich etwas ändert
store.subscribe(() => {
  const el = document.getElementById("modPct");
  const id = location.hash.match(/^#\/r\/([\w-]+)/)?.[1];
  if (el && id) {
    const p = percentOf(id);
    el.textContent = p + "%";
    const i = el.closest(".mod-head").querySelector(".bar > i");
    if (i) i.style.width = p + "%";
  } else if (!id) route();      // Startseite/Fortschritt nach Cloud-Sync neu zeichnen
});

// ---------- Router ----------
async function route() {
  if (cleanup) { try { cleanup(); } catch (e) {} cleanup = null; }
  stopSpeaking();
  view.className = "view";
  const h = location.hash || "#/";
  const page = h.startsWith("#/leitfaden") ? "leitfaden" : h.startsWith("#/fortschritt") ? "fortschritt" : h.startsWith("#/r/") ? "rubrik" : "home";
  document.querySelectorAll("[data-nav]").forEach((a) => a.dataset.nav === page ? a.setAttribute("aria-current", "page") : a.removeAttribute("aria-current"));
  if (page === "leitfaden") guidePage();
  else if (page === "fortschritt") progressPage();
  else if (page === "rubrik") await rubrikPage(h.slice(4).split(/[/?#]/)[0]);
  else home();
}

// ---------- Start ----------
(async function boot() {
  await Promise.all(liveRubriken().map(async (r) => {
    try { mods[r.id] = (await r.load()).default; } catch (e) { console.error("Rubrik konnte nicht geladen werden:", r.id, e); }
  }));
  window.addEventListener("hashchange", () => { route(); window.scrollTo(0, 0); });
  await route();
  startFirebase();
})();
