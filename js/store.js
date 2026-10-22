// =====================================================================
//  STORE – der komplette Lernfortschritt eines Nutzers.
//  Ein einziges Objekt, lokal im Browser gespeichert und (wenn Firebase
//  eingerichtet ist) zusätzlich in Firestore unter users/{uid}.
//
//  {
//    rev: 12,                         // Zähler, erhöht sich bei jeder Änderung
//    profile: { reading, goal, daily } | null,   // Antworten aus dem Leitfaden
//    overall: { xp, answered, correct, dayStreak, bestDayStreak, lastDay,
//               today: { day, correct } },
//    modules: { zahlen: {...}, uhrzeit: {...} }  // jede Rubrik verwaltet ihr eigenes Objekt
//    plans: { zahlen: {...} }                    // Lernpläne (siehe js/plan.js)
//  }
// =====================================================================
import { XP_PER_CORRECT } from "./config.js";

const KEY = "dar-progress-v1";
const listeners = new Set();
let cloudSave = null;

const fresh = () => ({
  rev: 0,
  profile: null,
  overall: { xp: 0, answered: 0, correct: 0, dayStreak: 0, bestDayStreak: 0, lastDay: null, today: { day: null, correct: 0 } },
  modules: {},
  plans: {},
});

let state = load();

function load() {
  try {
    const raw = JSON.parse(localStorage.getItem(KEY) || "null");
    if (raw && typeof raw === "object") return { ...fresh(), ...raw, overall: { ...fresh().overall, ...raw.overall } };
  } catch (e) {}
  return fresh();
}

function persist() {
  try { localStorage.setItem(KEY, JSON.stringify(state)); } catch (e) {}
  if (cloudSave) cloudSave(state);
  listeners.forEach((fn) => fn(state));
}

const dayKey = (d = new Date()) =>
  d.getFullYear() + "-" + String(d.getMonth() + 1).padStart(2, "0") + "-" + String(d.getDate()).padStart(2, "0");

function touchDay() {
  const o = state.overall, today = dayKey();
  if (o.lastDay === today) return;
  const y = new Date(); y.setDate(y.getDate() - 1);
  o.dayStreak = o.lastDay === dayKey(y) ? o.dayStreak + 1 : 1;
  o.bestDayStreak = Math.max(o.bestDayStreak, o.dayStreak);
  o.lastDay = today;
}

export const store = {
  get: () => state,
  subscribe(fn) { listeners.add(fn); return () => listeners.delete(fn); },

  module(id) {
    if (!state.modules[id]) state.modules[id] = { answered: 0, correct: 0, streak: 0, best: 0 };
    return state.modules[id];
  },

  /** Rubrik-eigene Daten ändern: store.update("zahlen", p => { p.foo = 1 }) */
  update(id, fn) {
    fn(this.module(id));
    state.rev++;
    persist();
  },

  /** Eine beantwortete Aufgabe zählen (Gesamt + Rubrik). */
  answer(id, ok) {
    const p = this.module(id), o = state.overall, today = dayKey();
    touchDay();
    if (o.today.day !== today) o.today = { day: today, correct: 0 };
    p.answered++; o.answered++;
    const now = Date.now();                                   // aktive Übungszeit (für den Lernplan)
    if (p.lastAt && now - p.lastAt < 120000) p.activeSec = (p.activeSec || 0) + Math.round((now - p.lastAt) / 1000);
    p.lastAt = now;
    if (ok) {
      p.correct++; p.streak++; p.best = Math.max(p.best, p.streak);
      o.correct++; o.xp += XP_PER_CORRECT; o.today.correct++;
    } else p.streak = 0;
    state.rev++;
    persist();
  },

  todayCorrect() { return state.overall.today.day === dayKey() ? state.overall.today.correct : 0; },

  /** Tagesserie: wenn gestern/heute nicht geübt wurde, ist sie gerissen. */
  liveDayStreak() {
    const o = state.overall, y = new Date(); y.setDate(y.getDate() - 1);
    return o.lastDay === dayKey() || o.lastDay === dayKey(y) ? o.dayStreak : 0;
  },

  /** Lernpläne ändern: store.setPlans(all => { all.zahlen = {...} }) */
  setPlans(fn) { state.plans = state.plans || {}; fn(state.plans); state.rev++; persist(); },

  setProfile(profile) { state.profile = profile; state.rev++; persist(); },

  reset() { state = fresh(); persist(); },

  // ----- Verbindung zur Cloud (wird von firebase.js gesetzt) -----
  setCloudSaver(fn) { cloudSave = fn; },
  /** Daten aus der Cloud übernehmen, wenn sie neuer sind. Gibt true zurück, wenn übernommen. */
  applyRemote(remote, force = false) {
    if (!remote || (!force && (remote.rev || 0) < state.rev)) return false;
    state = { ...fresh(), ...remote, overall: { ...fresh().overall, ...remote.overall } };
    delete state.updatedAt;
    try { localStorage.setItem(KEY, JSON.stringify(state)); } catch (e) {}
    listeners.forEach((fn) => fn(state));
    return true;
  },
  clearLocal() { state = fresh(); try { localStorage.removeItem(KEY); } catch (e) {} listeners.forEach((fn) => fn(state)); },
};
