// =====================================================================
//  APP – Navigation, Startseite, Leitfaden, Fortschritt und das Laden
//  der Rubriken. Rubriken selbst liegen in /modules/<id>/.
// =====================================================================
import { RUBRIKEN, LEVELS, byId, liveRubriken, levelById, rubrikenOf } from "./registry.js";
import { store } from "./store.js";
import { startFirebase } from "./firebase.js";
import { QUESTIONS, buildPath, recommend } from "./guide.js";
import { DONE_AT } from "./config.js";
import * as PR from "../modules/propheten/index.js";
import { speak, canSpeak, stopSpeaking, esc } from "./shared.js";
import { t, L, LANGS, lang, setLang, onLang } from "./i18n.js";

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
// Gesamt = Durchschnitt aller verfügbaren Rubriken und Geschichten aus dem Qur'an
const overallPercent = () => {
  const parts = [...liveRubriken().map((r) => percentOf(r.id)), ...PR.livePersons().map((p) => PR.personPercent(store, p.id))];
  return parts.length ? Math.round(parts.reduce((a, b) => a + b, 0) / parts.length) : 0;
};
const levelPercent = (lid) => {
  const live = rubrikenOf(lid).filter((r) => r.status === "live");
  return live.length ? Math.round(live.reduce((a, r) => a + percentOf(r.id), 0) / live.length) : 0;
};
const dailyGoal = () => store.get().profile?.daily || 20;

function ring(pct, label) {
  const r = 46, c = 2 * Math.PI * r, off = c * (1 - pct / 100);
  return `<svg class="ring" viewBox="0 0 112 112" role="img" aria-label="${t("c.pctLabel", { label, pct })}">
    <circle cx="56" cy="56" r="${r}" fill="none" stroke="var(--paper)" stroke-width="10"/>
    <circle cx="56" cy="56" r="${r}" fill="none" stroke="var(--gold-a)" stroke-width="10" stroke-linecap="round"
      stroke-dasharray="${c.toFixed(1)}" stroke-dashoffset="${off.toFixed(1)}" transform="rotate(-90 56 56)"/>
    <text x="56" y="54" text-anchor="middle" font-family="Plus Jakarta Sans,system-ui,sans-serif" font-weight="700" font-size="24" fill="var(--heading)">${pct}%</text>
    <text x="56" y="74" text-anchor="middle" font-family="Plus Jakarta Sans,system-ui,sans-serif" font-size="11" fill="var(--muted)">${t("c.total")}</text></svg>`;
}
const bar = (pct) => `<div class="bar" role="progressbar" aria-valuenow="${pct}" aria-valuemin="0" aria-valuemax="100"><i style="width:${pct}%"></i></div>`;

// ---------- Seiten ----------
function roomCards(path, next) {
  return path.map((step, i) => {
    const r = step.rubrik, live = r.status === "live", p = percentOf(r.id);
    const isNext = next && next.rubrik.id === r.id;
    const badge = !live ? `<span class="pill">${t("c.soon")}</span>` : isNext ? `<span class="pill rec">${t("c.recommended")}</span>`
      : step.optional ? `<span class="pill">${t("c.optional")}</span>` : p >= DONE_AT ? `<span class="pill live">${t("c.done")}</span>` : "";
    const inner = `
      <div class="top"><div class="icon" lang="ar">${r.ar}</div>${badge}</div>
      <span class="step">${t("c.step", { n: i + 1 })}</span>
      <h3>${esc(L(r.title))}</h3>
      <p class="desc">${esc(L(r.desc))}</p>
      ${live ? bar(p) : ""}
      <div class="meta"><span>${live ? `${p}% · ${esc(mods[r.id]?.summary?.(store.module(r.id)) || "")}` : t("c.inPrep")}</span></div>`;
    return live
      ? `<a class="room theme-${r.id}" href="#/r/${r.id}">${inner}</a>`
      : `<div class="room soon theme-${r.id}" aria-disabled="true">${inner}</div>`;
  }).join("");
}

function levelCards() {
  return LEVELS.map((l) => {
    const all = rubrikenOf(l.id), live = all.filter((r) => r.status === "live"), p = levelPercent(l.id);
    return `<a class="level-card" href="#/level/${l.id}">
      <div class="level-top">
        <div><span class="level-no">${t("lvl.count", { n: all.length })}</span><h3>${esc(L(l.title))}</h3></div>
        <span class="level-ar" lang="ar" dir="rtl">${l.ar}</span>
      </div>
      <p class="desc">${esc(L(l.desc))}</p>
      <div class="level-icons">${all.map((r) => `<span class="theme-${r.id}${r.status === "live" ? "" : " soon"}" lang="ar" title="${esc(L(r.title))}">${r.ar}</span>`).join("")}</div>
      <div class="theme-zahlen">${bar(p)}</div>
      <div class="meta"><span>${t("lvl.meta", { p, live: live.length, all: all.length })}</span><span class="go">${t("c.openArrow")}</span></div>
    </a>`;
  }).join("");
}

function prophetsCard() {
  const C = PR.CATEGORY, p = PR.categoryPercent(store), live = PR.livePersons();
  return `<a class="level-card pr-card" href="#/geschichten">
    <div class="level-top"><div><span class="level-no">${t("cat.kicker", { n: PR.PERSONS.length })}</span><h3>${esc(L(C.title))}</h3></div>
      <span class="level-ar" lang="ar" dir="rtl">${C.ar}</span></div>
    <p class="desc">${esc(L(C.desc))}</p>
    <div class="level-icons">${PR.PERSONS.map((x) => `<span class="${x.data ? "" : "soon"}" style="--m:var(--maroon)" lang="ar" title="${esc(L(x.name))}">${x.ar}</span>`).join("")}</div>
    ${bar(p)}
    <div class="meta"><span>${t("cat.meta", { p, live: live.length, all: PR.PERSONS.length })}</span><span class="go">${t("c.openArrow")}</span></div>
  </a>`;
}

function levelPage(lid) {
  const l = levelById(lid);
  if (!l) { view.innerHTML = `<div class="empty">${t("lvl.notFound")} <a href="#/">${t("c.toHome")}</a></div>`; return; }
  const profile = store.get().profile;
  const { next } = recommend(profile, percentOf, DONE_AT);
  const path = buildPath(profile).filter((st) => st.rubrik.level === l.id);
  const p = levelPercent(l.id);
  view.innerHTML = `
    <section class="welcome">
      <div class="welcome-card">
        <div class="text">
          <a class="back" href="#/">${t("c.backHome")}</a>
          <span class="eyebrow">${esc(L(l.title))}</span>
          <p class="salam" lang="ar" dir="rtl" style="text-align:left">${l.ar}</p>
          <h1>${esc(L(l.title))}</h1>
          <p class="lead">${esc(L(l.desc))}</p>
        </div>
        ${ring(p, t("lvl.progressIn", { title: L(l.title) }))}
      </div>
    </section>
    <section style="display:flex;flex-direction:column;gap:18px">
      <div class="section-head"><span class="eyebrow">${t("c.rubriken")}</span>
        <h2>${t("lvl.whatToday")}</h2>
        <p>${profile ? t("order.guide") : t("order.default")}</p></div>
      <div class="rooms">${roomCards(path, next)}</div>
    </section>`;
}

function home() {
  const s = store.get(), o = s.overall, profile = s.profile;
  const pct = overallPercent(), today = store.todayCorrect(), goal = dailyGoal();
  const { next, blocked } = recommend(profile, percentOf, DONE_AT);
  const nextBox = !profile
    ? `<div class="next">
        <div class="txt"><span class="label">${t("home.start.label")}</span><h3>${t("home.start.title")}</h3>
          <p class="lead">${t("home.start.text")}</p></div>
        <a class="btn primary" href="#/leitfaden">${t("home.start.btn")}</a></div>`
    : next ? `<div class="next theme-${next.rubrik.id}">
        <div class="txt"><span class="label">${t("home.next.label")}</span>
          <h3>${esc(L(next.rubrik.title))} <span class="ar" lang="ar" dir="rtl" style="color:var(--m)">${next.rubrik.ar}</span></h3>
          <p class="lead">${blocked ? t("home.next.soon", { title: esc(L(blocked.rubrik.title)) }) : ""}${esc(next.why)}</p></div>
        <a class="btn primary" href="#/r/${next.rubrik.id}">${percentOf(next.rubrik.id) > 0 ? t("home.continue") : t("home.begin")}</a></div>` : "";

  const streak = store.liveDayStreak();
  view.innerHTML = `
    <section class="welcome">
      <div class="welcome-card">
        <div class="text">
          <span class="eyebrow">${t("home.eyebrow")}</span>
          <p class="salam" lang="ar" dir="rtl" style="text-align:left">أَهْلًا وَسَهْلًا</p>
          <h1>${t("home.title")}</h1>
          <p class="lead">${t("home.lead")}</p>
          <div class="kpis">
            <span><b>${o.xp}</b> XP</span>
            <span>${t("home.streak", { n: streak })}</span>
            <span>${t("home.today", { a: Math.min(today, goal), b: goal })}</span>
          </div>
          <div style="max-width:340px">${bar(Math.min(100, Math.round((today / goal) * 100)))}</div>
        </div>
        ${ring(pct, t("home.overall"))}
      </div>
    </section>
    ${nextBox}
    <section style="display:flex;flex-direction:column;gap:18px">
      <div class="section-head"><span class="eyebrow">${t("home.catEyebrow")}</span>
        <h2>${t("home.catTitle")}</h2>
        <p>${t("home.catLead")}</p></div>
      <div class="levels">${levelCards()}${prophetsCard()}</div>
    </section>`;
}

function guidePage() {
  const profile = { ...(store.get().profile || {}) };
  const render = () => {
    const complete = QUESTIONS.every((q) => profile[q.key] !== undefined);
    const qs = QUESTIONS.map((q) => `
      <div class="qgroup"><h3>${t("guide." + q.key)}</h3>
        <div class="choices">${q.options.map((o) => `
          <button class="choice" data-k="${q.key}" data-v="${o}" aria-pressed="${String(profile[q.key]) === String(o)}">
            <b>${t(`guide.${q.key}.${o}`)}</b>${t(`guide.${q.key}.${o}.d`)}</button>`).join("")}</div></div>`).join("");
    const path = complete ? buildPath(profile) : null;
    view.innerHTML = `
      <section style="display:flex;flex-direction:column;gap:8px">
        <div class="eyebrow">${t("guide.eyebrow")}</div>
        <h1>${t("guide.title")}</h1>
        <p class="lead">${t("guide.lead")}</p>
      </section>
      <div class="card">${qs}</div>
      ${path ? `<div class="card">
        <h2>${t("guide.order")}</h2>
        <ol class="path">${path.map((s, i) => `
          <li class="theme-${s.rubrik.id}"><span class="n">${i + 1}</span>
            <div style="min-width:0"><b>${esc(L(s.rubrik.title))}</b> <span class="ar" lang="ar" style="color:var(--m)">${s.rubrik.ar}</span>
              <div class="why">${esc(s.why)}</div></div>
            ${s.rubrik.status === "live" ? `<a class="btn small" href="#/r/${s.rubrik.id}">${t("c.open")}</a>` : `<span class="pill">${t("c.soon")}</span>`}</li>`).join("")}</ol>
        <div class="row"><a class="btn primary" href="#/">${t("c.toHome")}</a></div>
      </div>` : `<p class="note">${t("guide.answerAll")}</p>`}`;
    view.querySelectorAll(".choice").forEach((b) => (b.onclick = () => {
      const q = QUESTIONS.find((x) => x.key === b.dataset.k);
      profile[q.key] = q.options.find((o) => String(o) === b.dataset.v);
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
      <a href="#/r/${r.id}" style="text-decoration:none;min-width:0"><b>${esc(L(r.title))}</b> <span class="ar" lang="ar" style="color:var(--m)">${r.ar}</span></a>
      <span class="pct">${pct}%</span>${bar(pct)}
      <span class="sub">${esc(mods[r.id]?.summary?.(p) || "")} · ${t("pg.rowSub", { c: p.correct, a: p.answered, pct: a, best: p.best })}${mods[r.id]?.extraStats ? " · " + esc(mods[r.id].extraStats(p)) : ""}</span></div>`;
  }).join("");
  const soon = RUBRIKEN.filter((r) => r.status !== "live").map((r) => esc(L(r.title))).join(", ");

  view.innerHTML = `
    <section class="welcome">
      <div class="welcome-card">
        <div class="text"><span class="eyebrow">${t("pg.eyebrow")}</span>
          <h1>${t("pg.title")}</h1>
          <p class="lead">${t("pg.lead")}</p></div>
        ${ring(overallPercent(), t("home.overall"))}
      </div>
    </section>
    <div class="stats">
      <div class="stat"><b>${o.xp}</b><span>${t("pg.xp")}</span></div>
      <div class="stat"><b>${o.correct}</b><span>${t("pg.correct")}</span></div>
      <div class="stat"><b>${acc}%</b><span>${t("pg.acc")}</span></div>
      <div class="stat"><b>${store.liveDayStreak()}</b><span>${t("pg.streak")}</span></div>
      <div class="stat"><b>${o.bestDayStreak}</b><span>${t("pg.best")}</span></div>
      <div class="stat"><b>${Math.min(store.todayCorrect(), dailyGoal())}/${dailyGoal()}</b><span>${t("pg.goal")}</span></div>
    </div>
    <div class="card"><h2>${t("pg.perRubrik")}</h2>${LEVELS.map((l) => `<div class="level-row"><b>${esc(L(l.title))}</b> <span class="ar" lang="ar">${l.ar}</span><span class="pct">${levelPercent(l.id)}%</span></div>`).join("")}<div class="ptable">${rows}</div>
      ${soon ? `<p class="note">${t("pg.inWork", { list: soon })}</p>` : ""}</div>
    <div class="card"><h2>${esc(L(PR.CATEGORY.title))}</h2>
      <div class="level-row"><b>${esc(L(PR.CATEGORY.title))}</b> <span class="ar" lang="ar">${PR.CATEGORY.ar}</span><span class="pct">${PR.categoryPercent(store)}%</span></div>
      <div class="ptable">${PR.livePersons().map((x) => { const pc = PR.personPercent(store, x.id), n = Object.keys(store.module("propheten").persons?.[x.id]?.passed || {}).length;
        return `<div class="prow"><a href="#/geschichten/${x.id}" style="text-decoration:none;min-width:0"><b>${esc(L(x.name))}</b> <span class="ar" lang="ar" style="color:var(--gold)">${x.ar}</span></a><span class="pct">${pc}%</span>${bar(pc)}<span class="sub">${t("pg.lvPassed", { n, m: x.data.levels.length })}</span></div>`; }).join("")}</div></div>
    <div class="card"><h3>${t("pg.reset.title")}</h3>
      <p class="note">${t("pg.reset.note")}</p>
      <div class="row"><button class="btn" id="reset1">${t("pg.reset.btn")}</button>
        <span id="reset2" hidden>${t("pg.reset.confirm")} <button class="btn small" id="resetYes" style="border-color:var(--bad);color:var(--bad)">${t("pg.reset.yes")}</button>
        <button class="btn small ghost" id="resetNo">${t("pg.reset.no")}</button></span></div></div>`;
  view.querySelector("#reset1").onclick = () => { view.querySelector("#reset2").hidden = false; };
  view.querySelector("#resetNo").onclick = () => { view.querySelector("#reset2").hidden = true; };
  view.querySelector("#resetYes").onclick = () => { store.reset(); progressPage(); };
}

async function rubrikPage(id) {
  const r = byId(id);
  if (!r || r.status !== "live") { view.innerHTML = `<div class="empty">${t("rb.notFound")} <a href="#/">${t("c.toHome")}</a></div>`; return; }
  const mod = mods[id] || (mods[id] = (await r.load()).default);
  view.classList.add("theme-" + id);
  view.innerHTML = `
    <div class="mod-head">
      <div class="mod-title"><a class="back" href="#/level/${r.level}">← ${esc(L(levelById(r.level)?.title) || t("nav.start"))}</a>
        <h1>${esc(L(r.title))}</h1><span class="ar" lang="ar" dir="rtl">${r.ar}</span></div>
      <div style="min-width:180px;flex:0 1 240px"><div class="hud"><span>${t("c.progress")}</span><b id="modPct">${percentOf(id)}%</b></div>${bar(percentOf(id))}</div>
    </div>
    ${lang() !== "de" ? `<p class="lang-note">${t("lang.partial")}</p>` : ""}
    <div id="modRoot" class="mod-${id}" style="display:flex;flex-direction:column;gap:18px"></div>`;
  const api = {
    id, rubrik: r,
    progress: () => store.module(id),
    update: (fn) => store.update(id, fn),
    answer: (ok) => store.answer(id, ok),
    speak, canSpeak, t, L, lang,
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
  } else if (!id && !/^#\/geschichten\/[\w-]+\/\d+/.test(location.hash) && !location.hash.startsWith("#/leitfaden")) route();      // Übersichtsseiten nach Cloud-Sync neu zeichnen
});

// ---------- Router ----------
async function route() {
  if (cleanup) { try { cleanup(); } catch (e) {} cleanup = null; }
  stopSpeaking();
  view.className = "view";
  const h = location.hash || "#/";
  const page = h.startsWith("#/leitfaden") ? "leitfaden" : h.startsWith("#/fortschritt") ? "fortschritt" : h.startsWith("#/r/") ? "rubrik" : h.startsWith("#/level/") ? "level" : h.startsWith("#/geschichten") ? "propheten" : "home";
  document.querySelectorAll("[data-nav]").forEach((a) => a.dataset.nav === (page === "level" || page === "propheten" ? "home" : page) ? a.setAttribute("aria-current", "page") : a.removeAttribute("aria-current"));
  if (page === "leitfaden") guidePage();
  else if (page === "fortschritt") progressPage();
  else if (page === "rubrik") await rubrikPage(h.slice(4).split(/[/?#]/)[0]);
  else if (page === "level") levelPage(h.slice(8).split(/[/?#]/)[0]);
  else if (page === "propheten") {
    const [, , pid, lvl] = h.split(/[/?]/);
    const ctx = { store, bar, ring };
    if (pid && lvl) cleanup = (await PR.renderLevel(view, ctx, pid, Number(lvl))) || null;
    else if (pid) PR.renderPerson(view, ctx, pid);
    else PR.renderCategory(view, ctx);
  }
  else home();
}

// ---------- Sprache ----------
function applyStatic() {
  document.querySelectorAll("[data-i18n]").forEach((el) => (el.textContent = t(el.dataset.i18n)));
  document.querySelectorAll("[data-i18n-aria]").forEach((el) => el.setAttribute("aria-label", t(el.dataset.i18nAria)));
  const sel = document.getElementById("langSel");
  if (sel) { sel.value = lang(); sel.setAttribute("aria-label", t("lang.label")); }
}
(function langSwitch() {
  const sel = document.getElementById("langSel");
  if (!sel) return;
  sel.innerHTML = LANGS.map((l) => `<option value="${l.id}">${l.short} · ${l.name}</option>`).join("");
  sel.onchange = () => setLang(sel.value);
  applyStatic();
  onLang(() => { applyStatic(); route(); });
})();

// ---------- Start ----------
(async function boot() {
  await Promise.all(liveRubriken().map(async (r) => {
    try { mods[r.id] = (await r.load()).default; } catch (e) { console.error("Rubrik konnte nicht geladen werden:", r.id, e); }
  }));
  window.addEventListener("hashchange", () => { route(); window.scrollTo(0, 0); });
  await route();
  startFirebase();
})();
