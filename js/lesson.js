// =====================================================================
//  LESSON-ENGINE für Grammatik-Rubriken mit gleichem Aufbau
//  Tabs: Erklärung · Lernen · Aufgaben · Spiel (60-Sekunden-Sprint)
//
//  Eine Rubrik liefert nur Inhalte:
//    explain()      → HTML der Erklärung (ohne Weiter-Knopf)
//    learn(S, m)    → HTML des Lernen-Tabs (S = Zustand, m = mastery); onLearn(root, S, redraw) optional
//    task(S, m)     → { q, big?, sub?, opts:[{v, html, a?}], answer, why, credit, say? }
//    sprint()       → { big, sub?, opts:[{v, html, a?, cls?}], answer, credit? }
//  Fortschritt: p.mastery[credit], p.sprintBest
// =====================================================================
import { rnd, shuffle, esc, loadCss } from "./shared.js";
import { t as gt } from "./i18n.js";

const SUN = "تثدذرزسشصضطظلن";
/** ال vor ein Wort setzen (mit Sonnenbuchstaben-Regel). w ohne ال, mit Endvokal, z. B. "بَيْتُ" → "الْبَيْتُ", "شَمْسُ" → "الشَّمْسُ" */
export const al = (w) => SUN.includes(w[0]) ? "ال" + w[0] + "\u0651" + w.slice(1) : "الْ" + w;
/** Endvokal tauschen: "بَيْتُ" → endV("بَيْتُ", "ِ") = "بَيْتِ" */
export const endV = (w, v) => w.slice(0, -1) + v;
export const pick = (arr) => arr[rnd(0, arr.length - 1)];
export const arS = (s, cls = "") => `<span class="ar ${cls}" lang="ar" dir="rtl">${s}</span>`;
export const masteryScore = (p, ids, at) => ids.reduce((s, id) => s + Math.min(p.mastery?.[id] || 0, at), 0) / (ids.length * at);
export const mastered = (p, ids, at) => ids.filter((id) => (p.mastery?.[id] || 0) >= at).length;
/** Wählt das nächste Übungsobjekt: zuerst ungeübte, nie zweimal hintereinander */
export function nextItem(items, m, at, last) {
  const open = items.filter((x) => (m[x.id] || 0) < at && x.id !== last);
  const pool = open.length ? open : items.filter((x) => x.id !== last);
  return pick(pool.length ? pool : items);
}
/** Standard-Rubrik-Funktionen (percent, summary, extraStats) */
export function standard({ ids, at, goal, sum }) {
  return {
    percent: (p) => masteryScore(p, ids, at) * 75 + (Math.min(p.sprintBest || 0, goal) / goal) * 25,
    summary: (p) => sum(mastered(p, ids, at), ids.length),
    extraStats: (p) => gt("ls.extra", { n: p.sprintBest || 0 }),
  };
}

export function lesson({ api, root, base, explain, learn, onLearn, task, sprint, title, goal = 20, seconds = 60, state = {} }) {
  if (base) loadCss(base, "style.css");
  const S = { tab: api.progress().answered ? "aufgaben" : "erklaerung", last: null, game: null, ...state };
  let timer = null;
  const stop = () => { clearInterval(timer); timer = null; };
  const credit = (id) => id && api.update((p) => { p.mastery = p.mastery || {}; p.mastery[id] = (p.mastery[id] || 0) + 1; });
  const autoSay = (s) => { if (s && api.canSpeak()) api.speak(s, { auto: true }); };

  function frame(body) {
    root.innerHTML = `
      <div class="tabs" role="group">
        ${[["erklaerung", api.t("tab.explain")], ["lernen", api.t("tab.learn")], ["aufgaben", api.t("tab.tasks")], ["spiel", api.t("tab.game")]]
          .map(([k, x]) => `<button data-tab="${k}" aria-pressed="${S.tab === k}">${x}</button>`).join("")}
      </div>${body}`;
    root.querySelectorAll("[data-tab]").forEach((b) => (b.onclick = () => { stop(); S.tab = b.dataset.tab; S.game = null; show(); }));
    root.querySelectorAll("[data-say]").forEach((b) => (b.onclick = () => api.speak(b.dataset.say)));
  }

  function erklaerung() {
    frame(`${explain()}<div class="row center"><button class="btn primary" data-go>${gt("ls.toLearn")}</button></div>`);
    root.querySelector("[data-go]").onclick = () => { S.tab = "lernen"; show(); window.scrollTo(0, 0); };
  }
  function lernen() {
    frame(`<div class="card">${learn(S, api.progress().mastery || {})}</div>`);
    if (onLearn) onLearn(root, S, lernen);
  }

  const optBtn = (o) => `<button class="opt${o.a ? " arabic" : ""}${o.cls ? " " + o.cls : ""}" data-v="${esc(o.v)}" ${o.a ? 'lang="ar" dir="rtl"' : ""}>${o.html}</button>`;
  function aufgaben() {
    const k = task(S, api.progress().mastery || {});
    frame(`<div class="card ls-task">
      <p class="note ls-q">${k.q}</p>
      ${k.big ? `<button class="ls-big" data-say="${esc(k.say || k.bigSay || "")}" lang="ar" dir="rtl">${k.big}</button>` : ""}
      ${k.sub ? `<p class="ls-sub">${k.sub}</p>` : ""}
      <div class="opts">${k.opts.map(optBtn).join("")}</div>
      <div class="feedback" aria-live="polite"></div>
      <div class="row center"><button class="btn primary" data-next hidden>${gt("ls.next")}</button></div>
    </div>`);
    root.querySelectorAll(".opt").forEach((b) => (b.onclick = () => {
      const ok = b.dataset.v === String(k.answer);
      root.querySelectorAll(".opt").forEach((x) => (x.disabled = true));
      b.classList.add(ok ? "ok" : "no");
      if (!ok) [...root.querySelectorAll(".opt")].find((x) => x.dataset.v === String(k.answer))?.classList.add("ok");
      api.answer(ok); if (ok) credit(k.credit);
      autoSay(k.say);
      const fb = root.querySelector(".feedback");
      fb.className = "feedback " + (ok ? "ok" : "no");
      fb.innerHTML = `${ok ? api.t("c.right") : api.t("c.wrong")} ${k.why || ""}`;
      const nx = root.querySelector("[data-next]"); nx.hidden = false; nx.onclick = aufgaben; nx.focus({ preventScroll: true });
    }));
  }

  function spiel() {
    const best = api.progress().sprintBest || 0;
    const G = S.game;
    if (!G) {
      frame(`<div class="card ls-game">
        <h2>${title}</h2><p class="note">${gt("ls.gHint", { s: seconds, n: goal })}</p>
        <p class="ls-best">${gt("ls.best", { n: best })}${best >= goal ? " ✓" : ""}</p>
        <div class="row center"><button class="btn primary" id="lsStart">${gt("ls.start")}</button></div>
      </div>`);
      root.querySelector("#lsStart").onclick = () => {
        S.game = { right: 0, wrong: 0, end: Date.now() + seconds * 1000, item: sprint(), flash: null };
        stop();
        timer = setInterval(() => {
          const left = Math.max(0, Math.ceil((S.game.end - Date.now()) / 1000));
          const el = root.querySelector("#lsLeft"); if (el) el.textContent = gt("ls.left", { s: left });
          const bar = root.querySelector(".ls-timebar i"); if (bar) bar.style.width = (left / seconds) * 100 + "%";
          if (left <= 0) { stop(); S.game.done = true; api.update((p) => { p.sprintBest = Math.max(p.sprintBest || 0, S.game.right); }); spiel(); }
        }, 250);
        spiel();
      };
      return;
    }
    if (G.done) {
      frame(`<div class="card ls-game">
        <h2>${title}</h2>
        <div class="feedback ${G.right >= goal ? "ok" : "no"}">${gt("ls.end", { n: G.right, e: G.wrong })}</div>
        ${G.right >= goal ? `<p class="ls-best">${gt("ls.goal", { n: goal })}</p>` : ""}
        <p class="ls-best">${gt("ls.best", { n: best })}</p>
        <div class="row center"><button class="btn primary" id="lsAgain">${gt("ls.again")}</button></div>
      </div>`);
      root.querySelector("#lsAgain").onclick = () => { S.game = null; spiel(); root.querySelector("#lsStart").click(); };
      return;
    }
    const left = Math.max(0, Math.ceil((G.end - Date.now()) / 1000));
    const it = G.item;
    frame(`<div class="card ls-game">
      <div class="ls-game-head"><span class="pill" id="lsLeft">${gt("ls.left", { s: left })}</span><span class="pill">${gt("ls.score", { n: G.right })}</span></div>
      <div class="ls-timebar"><i style="width:${(left / seconds) * 100}%"></i></div>
      <div class="ls-word${G.flash ? " " + G.flash : ""}" lang="ar" dir="rtl">${it.big}</div>
      ${it.sub ? `<p class="ls-sub">${it.sub}</p>` : ""}
      <div class="ls-btns n${it.opts.length}" dir="rtl">${it.opts.map((o) => `<button class="opt${o.a ? " arabic" : ""}${o.cls ? " " + o.cls : ""}" data-v="${esc(o.v)}" ${o.a ? 'lang="ar"' : 'dir="ltr"'}>${o.html}</button>`).join("")}</div>
    </div>`);
    root.querySelectorAll(".ls-btns .opt").forEach((b) => (b.onclick = () => {
      const ok = b.dataset.v === String(it.answer);
      api.answer(ok);
      if (ok) { G.right++; credit(it.credit); } else G.wrong++;
      G.flash = ok ? "ok" : "no";
      G.item = sprint();
      spiel();
    }));
  }

  function show() { ({ erklaerung, lernen, aufgaben, spiel })[S.tab](); }
  show();
  return stop;
}

/** Qur'an-Beispiele: [{ ref, text, start, end, hl:[Wortindex], tr:{de,en,…}, tag? }] (Text aus Tanzil) */
export function ayatHtml(list, Lf) {
  const AR = "٠١٢٣٤٥٦٧٨٩";
  return `<div class="ls-ayat">${list.map((q) => { const ws = q.text.split(" "); const a = q.ref.split(":")[1];
    return `<figure class="ls-aya">
      <p lang="ar" dir="rtl">${q.start ? "" : "… "}${ws.map((w, i) => (q.hl || []).includes(i) ? `<b>${w}</b>` : w).join(" ")}${q.end ? ` <span class="ls-num">﴿${String(a).replace(/\d/g, (d) => AR[d])}﴾</span>` : " …"}</p>
      <figcaption>${q.tag ? `<span class="ls-tag" lang="ar">${q.tag}</span>` : ""}<span>${esc(Lf(q.tr) || q.tr.de)}</span><small>${q.ref}</small></figcaption>
    </figure>`; }).join("")}</div>`;
}

export { shuffle, esc, rnd };
