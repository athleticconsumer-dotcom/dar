// =====================================================================
//  LERNPLAN pro Rubrik
//  Gespeichert in store.plans[<rubrik-id>] = {
//    known, target       // Prozent: was ich schon kann / was ich können will
//    mode: "date"|"time" // bis zu einem Datum ODER mit fester Zeit pro Tag
//    deadline, minPerDay, daysPerWeek
//    startPct, created, end    // Stand beim Anlegen, geplantes Ende (YYYY-MM-DD)
//    achieved                  // Datum, an dem das Ziel erreicht wurde
//  }
//  Aufwand: rubrik.minutes = geschätzte Minuten für 0 → 100 %.
//  Sobald genug echte Übungszeit gemessen ist (activeSec), rechnet der Plan mit deinem eigenen Tempo.
// =====================================================================
import { store } from "./store.js";
import { t, L, lang } from "./i18n.js";
import { esc } from "./shared.js";

const DAY = 86400000;
export const MIN_CHOICES = [5, 10, 15, 20, 30, 45, 60];
export const DPW_CHOICES = [3, 5, 7];

export const dayKey = (d = new Date()) => d.getFullYear() + "-" + String(d.getMonth() + 1).padStart(2, "0") + "-" + String(d.getDate()).padStart(2, "0");
const parse = (k) => { const [y, m, d] = k.split("-").map(Number); return new Date(y, m - 1, d); };
const daysBetween = (a, b) => Math.round((parse(dayKey(b)) - parse(dayKey(a))) / DAY);
export const fmtDate = (k) => new Intl.DateTimeFormat(lang(), { day: "numeric", month: "long", year: "numeric" }).format(parse(k));
export function fmtDur(min) {
  min = Math.max(1, Math.round(min));
  const h = Math.floor(min / 60), m = min % 60;
  return h ? (m ? t("plan.hm", { h, m }) : t("plan.h", { h })) : t("plan.m", { m });
}

/** Standard-Stufen, wenn eine Rubrik keine eigenen milestones() hat */
export function milestones(mod) {
  const own = mod?.milestones?.();
  const list = own?.length ? own : [25, 50, 75, 100].map((pct) => ({ pct, label: t("plan.ms." + pct) }));
  return [{ pct: 0, label: t("plan.ms.0") }, ...list];
}

/** Minuten pro Prozentpunkt: Schätzung der Rubrik, angepasst an das gemessene Tempo */
export function minPerPct(rubrik, modProgress, current) {
  const base = (rubrik.minutes || 120) / 100;
  const sec = modProgress?.activeSec || 0;
  if (sec < 300 || current < 3) return base;
  const measured = sec / 60 / current;
  const w = Math.min(1, sec / 1800);
  return Math.max(base * 0.4, Math.min(base * 2.5, (1 - w) * base + w * measured));
}

/** Verbleibende Übungsminuten bis zum Ziel. Was man laut eigener Angabe schon kann, geht schneller (nur bestätigen). */
export function remainingMin({ known, target }, current, mpp) {
  const confirm = Math.max(0, Math.min(known, target) - current) * mpp * 0.3;
  const learn = Math.max(0, target - Math.max(current, known)) * mpp;
  return confirm + learn;
}

const studyDays = (calDays, dpw) => Math.max(1, Math.round(calDays * dpw / 7));

/** Ergebnis für das Formular: Minuten pro Tag (Modus Datum) oder Enddatum (Modus Zeit) */
export function compute(f, current, mpp) {
  const total = remainingMin(f, current, mpp);
  if (f.mode === "date") {
    const cal = Math.max(1, daysBetween(new Date(), parse(f.deadline)) + 1);
    const perDay = Math.ceil(total / studyDays(cal, f.daysPerWeek));
    return { total, perDay, end: f.deadline, verdict: perDay <= 20 ? "easy" : perDay <= 45 ? "ok" : perDay <= 90 ? "tight" : "hard" };
  }
  const needDays = Math.ceil(total / f.minPerDay);
  const cal = Math.ceil(needDays * 7 / f.daysPerWeek);
  const end = new Date(Date.now() + Math.max(0, cal - 1) * DAY);
  return { total, perDay: f.minPerDay, end: dayKey(end), weeks: Math.max(1, Math.round(cal / 7)), days: cal };
}

/** Status eines gespeicherten Plans */
export function status(plan, current, mpp) {
  if (plan.achieved || current >= plan.target) return { state: "done" };
  const today = new Date();
  const totalDays = Math.max(1, daysBetween(parse(plan.created), parse(plan.end)));
  const passed = Math.min(totalDays, Math.max(0, daysBetween(parse(plan.created), today)));
  const expected = plan.startPct + (plan.target - plan.startPct) * (passed / totalDays);
  const overdue = daysBetween(today, parse(plan.end)) < 0;
  const left = remainingMin(plan, current, mpp);
  let today_ = plan.minPerDay;
  if (plan.mode === "date") {
    const cal = Math.max(1, daysBetween(today, parse(plan.end)) + 1);
    today_ = Math.ceil(left / studyDays(cal, plan.daysPerWeek));
  }
  const state = overdue ? "overdue" : current + 3 >= expected ? "ontrack" : "behind";
  return { state, expected: Math.round(expected), today: overdue ? Math.ceil(left / 7) : today_, left };
}

export const getPlan = (id) => store.get().plans?.[id] || null;

/** Prüft alle Pläne und markiert erreichte Ziele. Gibt die neu erreichten Rubrik-IDs zurück. */
export function checkAchieved(percentOf) {
  const plans = store.get().plans || {};
  const hit = Object.entries(plans).filter(([id, p]) => !p.achieved && percentOf(id) >= p.target).map(([id]) => id);
  if (hit.length) store.setPlans((all) => hit.forEach((id) => (all[id].achieved = dayKey())));
  return hit;
}

// ---------------------------------------------------------------------
//  Oberfläche
// ---------------------------------------------------------------------
const chipRow = (name, items, cur) => `<div class="chips" role="group">${items.map(([v, label]) => `<button type="button" class="chip" data-${name}="${v}" aria-pressed="${String(cur) === String(v)}">${esc(label)}</button>`).join("")}</div>`;
const msLabel = (ms, pct) => (ms.find((m) => m.pct === pct) || { label: pct + "%" }).label;

function progressLine(current, plan) {
  return `<div class="plan-bar" role="img" aria-label="${current}% / ${plan.target}%">
    <i style="width:${Math.min(100, current)}%"></i><b style="left:${plan.target}%" title="${t("plan.goal")}"></b></div>`;
}

/** Kompakte Plan-Karte (Startseite und Rubrik) */
export function planSummary({ rubrik, mod, current, compact }) {
  const plan = getPlan(rubrik.id); if (!plan) return "";
  const ms = milestones(mod), mpp = minPerPct(rubrik, store.module(rubrik.id), current);
  const st = status(plan, current, mpp);
  const pill = { done: ["live", t("plan.st.done")], ontrack: ["live", t("plan.st.ontrack")], behind: ["warn", t("plan.st.behind")], overdue: ["warn", t("plan.st.overdue")] }[st.state];
  const line = st.state === "done"
    ? t("plan.doneText", { date: fmtDate(plan.achieved || dayKey()), goal: esc(msLabel(ms, plan.target)) })
    : `${t("plan.goalLine", { goal: esc(msLabel(ms, plan.target)), date: fmtDate(plan.end) })} · <b>${t("plan.todayMin", { m: Math.max(1, st.today) })}</b>`;
  return `<div class="plan-sum theme-${rubrik.id}${st.state === "done" ? " done" : ""}">
    <div class="plan-sum-top">
      ${compact ? `<a href="#/r/${rubrik.id}" class="plan-title"><b>${esc(L(rubrik.title))}</b> <span class="ar" lang="ar" dir="rtl">${rubrik.ar}</span></a>` : `<b class="plan-title">📅 ${t("plan.yours")}</b>`}
      <span class="pill ${pill[0]}">${pill[1]}</span></div>
    ${progressLine(current, plan)}
    <p class="plan-line">${line}</p>
    ${compact ? `<div class="row"><a class="btn small primary" href="#/r/${rubrik.id}">${st.state === "done" ? t("plan.newGoal") : t("plan.practice")}</a></div>` : ""}
  </div>`;
}

/** Plan-Bereich auf der Rubrik-Seite: Zusammenfassung oder Formular */
export function mountPlanBox(el, { rubrik, mod, percent }) {
  let editing = false;
  const draw = () => {
    const current = percent(), plan = getPlan(rubrik.id);
    if (!editing) {
      el.innerHTML = plan
        ? `${planSummary({ rubrik, mod, current })}<div class="row plan-actions"><button class="btn small" data-edit>${plan.achieved ? t("plan.newGoal") : t("plan.edit")}</button><button class="btn small ghost" data-del>${t("plan.delete")}</button></div>`
        : `<div class="plan-cta"><div><b>📅 ${t("plan.ctaTitle")}</b><span>${t("plan.ctaText")}</span></div><button class="btn small primary" data-edit>${t("plan.create")}</button></div>`;
      el.querySelector("[data-edit]").onclick = () => { editing = true; draw(); };
      const del = el.querySelector("[data-del]");
      if (del) del.onclick = () => { store.setPlans((all) => delete all[rubrik.id]); draw(); };
      return;
    }
    form(current, plan);
  };

  function form(current, old) {
    const ms = milestones(mod), mpp = minPerPct(rubrik, store.module(rubrik.id), current);
    const knownDefault = [...ms].reverse().find((m) => m.pct <= current)?.pct ?? 0;
    const in30 = dayKey(new Date(Date.now() + 30 * DAY)), tomorrow = dayKey(new Date(Date.now() + DAY));
    const f = old && !old.achieved
      ? { known: old.known, target: old.target, mode: old.mode, deadline: old.deadline || in30, minPerDay: old.minPerDay || 15, daysPerWeek: old.daysPerWeek || 5 }
      : { known: knownDefault, target: 100, mode: "date", deadline: in30, minPerDay: 15, daysPerWeek: 5 };
    const paint = () => {
      if (f.target <= f.known) f.target = ms.find((m) => m.pct > f.known)?.pct ?? 100;
      const r = compute(f, current, mpp);
      el.innerHTML = `<div class="card plan-form">
        <h2>📅 ${t("plan.formTitle")}</h2>
        <div class="plan-q"><h3>${t("plan.q.known")}</h3>${chipRow("known", ms.filter((m) => m.pct < 100).map((m) => [m.pct, m.label]), f.known)}
          ${current > 0 ? `<p class="note">${t("plan.measured", { p: current })}</p>` : ""}</div>
        <div class="plan-q"><h3>${t("plan.q.target")}</h3>${chipRow("target", ms.filter((m) => m.pct > f.known).map((m) => [m.pct, m.label]), f.target)}</div>
        <div class="plan-q"><h3>${t("plan.q.mode")}</h3>${chipRow("mode", [["date", t("plan.mode.date")], ["time", t("plan.mode.time")]], f.mode)}</div>
        ${f.mode === "date"
          ? `<div class="plan-q"><h3>${t("plan.q.date")}</h3><input type="date" class="plan-date" min="${tomorrow}" value="${f.deadline}"></div>`
          : `<div class="plan-q"><h3>${t("plan.q.min")}</h3>${chipRow("min", MIN_CHOICES.map((m) => [m, t("plan.m", { m })]), f.minPerDay)}</div>`}
        <div class="plan-q"><h3>${t("plan.q.dpw")}</h3>${chipRow("dpw", DPW_CHOICES.map((d) => [d, t("plan.dpw", { n: d })]), f.daysPerWeek)}</div>
        <div class="plan-result">
          <p>${t("plan.r.total", { d: fmtDur(r.total) })}</p>
          ${f.mode === "date"
            ? `<p class="big">${t("plan.r.perDay", { m: r.perDay, n: f.daysPerWeek })}</p><p class="verdict v-${r.verdict}">${t("plan.v." + r.verdict)}</p>`
            : `<p class="big">${t("plan.r.end", { date: fmtDate(r.end) })}</p><p class="note">${t("plan.r.weeks", { n: r.weeks })}</p>`}
          <p class="note">${t("plan.r.how")}</p>
        </div>
        <div class="row"><button class="btn primary" data-save>${t("plan.save")}</button><button class="btn ghost" data-cancel>${t("plan.cancel")}</button></div>
      </div>`;
      const bind = (name, fn) => el.querySelectorAll(`[data-${name}]`).forEach((b) => (b.onclick = () => { fn(b.dataset[name]); paint(); }));
      bind("known", (v) => (f.known = +v)); bind("target", (v) => (f.target = +v)); bind("mode", (v) => (f.mode = v));
      bind("min", (v) => (f.minPerDay = +v)); bind("dpw", (v) => (f.daysPerWeek = +v));
      const d = el.querySelector(".plan-date");
      if (d) d.onchange = () => { if (d.value && d.value >= tomorrow) { f.deadline = d.value; paint(); } };
      el.querySelector("[data-cancel]").onclick = () => { editing = false; draw(); };
      el.querySelector("[data-save]").onclick = () => {
        const res = compute(f, current, mpp);
        store.setPlans((all) => (all[rubrik.id] = { ...f, startPct: current, created: dayKey(), end: res.end, achieved: current >= f.target ? dayKey() : null }));
        editing = false; draw();
        el.scrollIntoView({ block: "nearest", behavior: "smooth" });
      };
    };
    paint();
  }
  draw();
  return draw;
}
