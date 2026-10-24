// =====================================================================
//  GESPRÄCHS-ENGINE – für alle Themen des Gesprächs-Wegs
//  Tabs: Gespräch · Wendungen (+ eigener Satz) · Aufgaben · Rollenspiel
//  Fortschritt: mastery: { <wendung>: richtige }, roles: { A, B }, me: { name, country }
// =====================================================================
import { rnd, shuffle, esc, loadCss } from "../../js/shared.js";
import { makeT, L } from "../../js/i18n.js";
import DICT from "./lang.js";

const T = makeT(DICT);
const MASTER_AT = 2;
const pick = (v, g) => (v && typeof v === "object" ? v[g] : v);

export function makeConversation({ NAMES, DIALOG, PHRASES, PAIRS, COUNTRIES }) {
  const wordsScore = (p) => PHRASES.reduce((s, x) => s + Math.min(p.mastery?.[x.id] || 0, MASTER_AT), 0) / (PHRASES.length * MASTER_AT);
  const rolesDone = (p) => ["A", "B"].filter((r) => p.roles?.[r]).length;
  const gloss = (line, g) => L(line.g).replace("{A}", NAMES[g].A.tr).replace("{B}", NAMES[g].B.tr);

  return {
    percent(p) { return wordsScore(p) * 60 + (rolesDone(p) / 2) * 40; },
    summary(p) { return T("sum", { a: PHRASES.filter((x) => (p.mastery?.[x.id] || 0) >= MASTER_AT).length, b: PHRASES.length }); },
    extraStats(p) { return T("extra", { a: rolesDone(p) }); },
    milestones() { return [{ pct: 20, label: T("ms.first") }, { pct: 60, label: T("ms.phr") }, { pct: 100, label: T("ms.all") }]; },

    mount(root, api) {
      loadCss(import.meta.url, "style.css");
      const S = { tab: api.progress().answered ? "aufgaben" : "dialog", g: "m", showTr: true, showGl: true, last: null, role: null };
      const say = (text) => { if (api.canSpeak()) api.speak(text, { auto: true }); };   // automatisches Vorlesen nur mit vorhandener Stimme
      const credit = (id) => api.update((p) => { p.mastery = p.mastery || {}; p.mastery[id] = (p.mastery[id] || 0) + 1; });

      function frame(body) {
        root.innerHTML = `<div class="gs">
          <div class="tabs" role="group">
            ${[["dialog", T("tab.dialog")], ["phrases", T("tab.phrases")], ["aufgaben", api.t("tab.tasks")], ["role", T("tab.role")]]
              .map(([k, t]) => `<button data-tab="${k}" aria-pressed="${S.tab === k}">${t}</button>`).join("")}
          </div>${body}</div>`;
        root.querySelectorAll("[data-tab]").forEach((b) => (b.onclick = () => { S.tab = b.dataset.tab; S.role = null; show(); }));
        root.querySelectorAll("[data-say]").forEach((b) => (b.onclick = () => api.speak(b.dataset.say)));
        root.querySelectorAll("[data-g]").forEach((b) => (b.onclick = () => { S.g = b.dataset.g; show(); }));
      }
      const genderSwitch = () => `<div class="chips gs-switch" role="group">${["m", "f"].map((g) => `<button class="chip" data-g="${g}" aria-pressed="${S.g === g}">${T("g." + g)}</button>`).join("")}</div>`;
      const bubble = (line, i, opts = {}) => {
        const ar = pick(line.ar, S.g), tr = pick(line.tr, S.g), who = NAMES[S.g][line.who];
        return `<div class="gs-line gs-${line.who}${opts.cls || ""}">
          <span class="gs-who">${esc(who.tr)}</span>
          <button class="gs-bubble" data-say="${esc(ar)}">
            <span class="gs-ar" lang="ar" dir="rtl">${ar}</span>
            ${S.showTr ? `<span class="gs-tr">${esc(tr)}</span>` : ""}
            ${S.showGl ? `<span class="gs-gl">${esc(gloss(line, S.g))}</span>` : ""}
          </button></div>`;
      };

      // ---------------- Gespräch ----------------
      function dialog() {
        frame(`<div class="card gs-dialog">
          <div class="gs-tools">${genderSwitch()}
            <div class="chips">${[["tr", "showTr"], ["gl", "showGl"]].map(([k, f]) => `<button class="chip" data-opt="${f}" aria-pressed="${S[f]}">${T("opt." + k)}</button>`).join("")}</div></div>
          <p class="note">${T("dlgHint")}</p>
          <div class="gs-chat">${DIALOG.map((l, i) => bubble(l, i)).join("")}</div>
          ${api.canSpeak() ? `<div class="row center"><button class="btn" data-say="${esc(DIALOG.map((l) => pick(l.ar, S.g)).join(" ... "))}">${T("playAll")}</button></div>` : ""}
          <p class="note gs-gnote">${T("genderNote", { m: `<span lang="ar" class="gs-inl">حَالُكَ</span>`, f: `<span lang="ar" class="gs-inl">حَالُكِ</span>` })}</p>
        </div>`);
        root.querySelectorAll("[data-opt]").forEach((b) => (b.onclick = () => { S[b.dataset.opt] = !S[b.dataset.opt]; dialog(); }));
      }

      // ---------------- Wendungen + eigener Satz ----------------
      function phrases() {
        const me = api.progress().me || {};
        const mine = () => {
          const m = api.progress().me || {}, c = COUNTRIES[m.country ?? 0];
          const name = esc((m.name || "").trim() || "…");
          const sent = [`السَّلَامُ عَلَيْكُمْ.`, `اسْمِي ${name}.`, `أَنَا ${c.al ? "مِنَ" : "مِنْ"} ${c.ar}.`, `أَتَعَلَّمُ اللُّغَةَ الْعَرَبِيَّةَ، وَأَتَكَلَّمُ قَلِيلًا.`];
          const sentTr = `as-salāmu ʿalaykum. ismī ${name}. anā ${c.al ? "mina" : "min"} ${c.tr}. ataʿallamu l-lughata l-ʿarabiyya, wa-atakallamu qalīlan.`;
          return `<p lang="ar" dir="rtl">${sent.join(" ")}</p><span class="gs-tr">${sentTr}</span>
            ${api.canSpeak() ? `<button class="btn small" data-say="${esc(sent.join(" "))}">▶</button>` : ""}`;
        };
        frame(`
          <div class="card gs-me">
            <h2>${T("meTitle")}</h2>
            <label class="gs-field"><span>${T("meName")}</span><input id="gsName" type="text" maxlength="30" value="${esc(me.name || "")}" placeholder="${esc(T("meNamePh"))}"></label>
            <div class="gs-field"><span>${T("meCountry")}</span>
              <div class="chips">${COUNTRIES.map((x, i) => `<button class="chip" data-c="${i}" aria-pressed="${(me.country ?? 0) === i}">${esc(L(x.g))}</button>`).join("")}</div></div>
            <div class="gs-mine" id="gsMine">${mine()}</div>
            <p class="note">${T("meHint")}</p>
            ${COUNTRIES.some((x) => x.al) ? `<p class="note">${T("meAlNote")}</p>` : ""}
          </div>
          <div class="card">
            <h2>${T("phrasesTitle")}</h2>
            <div class="gs-phrases">${PHRASES.map((x) => {
              const m = api.progress().mastery?.[x.id] || 0;
              const variants = typeof x.ar === "object"
                ? `<span class="gs-var"><small>${T("toM")}</small><button class="gs-ph-ar" data-say="${esc(x.ar.m)}" lang="ar">${x.ar.m}</button><em>${esc(x.tr.m)}</em></span>
                   <span class="gs-var"><small>${T("toF")}</small><button class="gs-ph-ar" data-say="${esc(x.ar.f)}" lang="ar">${x.ar.f}</button><em>${esc(x.tr.f)}</em></span>`
                : `<span class="gs-var"><button class="gs-ph-ar" data-say="${esc(x.ar)}" lang="ar">${x.ar}</button><em>${esc(x.tr)}</em></span>`;
              return `<div class="gs-ph"><div class="gs-ph-g">${esc(L(x.g))}${m >= MASTER_AT ? " <b>✓</b>" : ""}</div><div class="gs-ph-v">${variants}</div></div>`;
            }).join("")}</div>
          </div>`);
        const box = root.querySelector("#gsMine");
        const refresh = () => { box.innerHTML = mine(); box.querySelectorAll("[data-say]").forEach((b) => (b.onclick = () => api.speak(b.dataset.say))); };
        const inp = root.querySelector("#gsName");
        let tmr = null;
        inp.oninput = () => { clearTimeout(tmr); tmr = setTimeout(() => { api.update((p) => { p.me = { ...(p.me || {}), name: inp.value.trim() }; }); refresh(); }, 250); };
        root.querySelectorAll("[data-c]").forEach((b) => (b.onclick = () => {
          api.update((p) => { p.me = { ...(p.me || {}), name: inp.value.trim(), country: +b.dataset.c }; });
          root.querySelectorAll("[data-c]").forEach((x) => x.setAttribute("aria-pressed", String(x === b)));
          refresh();
        }));
      }

      // ---------------- Aufgaben ----------------
      function aufgaben() {
        const m = api.progress().mastery || {};
        const g = Math.random() < 0.5 ? "m" : "f";
        const usePair = Math.random() < 0.55;
        let prompt, correct, pool, creditId, promptAr = false;
        if (usePair) {
          const open = PAIRS.filter(([, b]) => (m[b] || 0) < MASTER_AT && b !== S.last);
          const [a, b] = (open.length ? open : PAIRS)[rnd(0, (open.length ? open : PAIRS).length - 1)];
          const A = PHRASES.find((x) => x.id === a), B = PHRASES.find((x) => x.id === b);
          prompt = pick(A.ar, g); promptAr = true; correct = B; creditId = b;
          pool = PAIRS.map(([, y]) => PHRASES.find((x) => x.id === y)).filter((x) => x !== B);
        } else {
          const open = PHRASES.filter((x) => (m[x.id] || 0) < MASTER_AT && x.id !== S.last);
          const P = (open.length ? open : PHRASES)[rnd(0, (open.length ? open : PHRASES).length - 1)];
          prompt = L(P.g); correct = P; creditId = P.id;
          pool = PHRASES.filter((x) => x !== P);
        }
        S.last = creditId;
        const opts = shuffle([correct, ...shuffle(pool).slice(0, 3)]);
        frame(`<div class="card gs-task">
          <p class="note" style="text-align:center">${usePair ? T("q.reply") : T("q.say")}</p>
          ${promptAr ? `<button class="gs-prompt-ar" data-say="${esc(prompt)}" lang="ar" dir="rtl">${prompt}</button><p class="note" style="text-align:center">${T("q.replyAsk")}</p>`
            : `<p class="gs-prompt">${esc(prompt)}</p>`}
          <div class="opts gs-opts">${opts.map((o) => `<button class="opt arabic" data-v="${o.id}" lang="ar" dir="rtl">${pick(o.ar, g)}</button>`).join("")}</div>
          <div class="feedback" aria-live="polite"></div>
          <div class="row center"><button class="btn primary" data-next hidden>${T("next")}</button></div>
        </div>`);
        root.querySelectorAll(".opt").forEach((b) => (b.onclick = () => {
          const ok = b.dataset.v === correct.id;
          root.querySelectorAll(".opt").forEach((x) => (x.disabled = true));
          b.classList.add(ok ? "ok" : "no");
          if (!ok) root.querySelector(`.opt[data-v="${correct.id}"]`).classList.add("ok");
          api.answer(ok); if (ok) credit(creditId);
          say(pick(correct.ar, g).replace("…", ""));
          const fb = root.querySelector(".feedback");
          fb.className = "feedback " + (ok ? "ok" : "no");
          fb.textContent = `${ok ? api.t("c.right") : api.t("c.wrong")} ${pick(correct.tr, g)} = ${L(correct.g)}`;
          const nx = root.querySelector("[data-next]"); nx.hidden = false; nx.onclick = aufgaben; nx.focus({ preventScroll: true });
        }));
      }

      // ---------------- Rollenspiel ----------------
      function role() {
        if (!S.role) {
          const p = api.progress();
          frame(`<div class="card gs-rolepick">
            <h2>${T("tab.role")}</h2>${genderSwitch()}
            <p>${T("rolePick")}</p>
            <div class="gs-roles">${["A", "B"].map((r) => `<button class="choice" data-role="${r}"><b>${r === "A" ? T("roleA") : T("roleB")}${p.roles?.[r] ? " ✓" : ""}</b>${esc(NAMES[S.g][r].tr)}</button>`).join("")}</div>
            <p class="note">${T("roleCount", { a: rolesDone(p) })} · ${T("roleNeed")}</p>
          </div>`);
          root.querySelectorAll("[data-role]").forEach((b) => (b.onclick = () => { S.role = { me: b.dataset.role, i: 0, errors: 0, wrong: [] }; role(); }));
          return;
        }
        const R = S.role;
        const partnerFrom = (k) => { const out = []; while (k < DIALOG.length && DIALOG[k].who !== R.me) out.push(pick(DIALOG[k++].ar, S.g)); return out; };
        if (!R.started) { R.started = true; const first = partnerFrom(R.i); if (first.length) say(first.join(" ... ")); }
        while (R.i < DIALOG.length && DIALOG[R.i].who !== R.me) R.i++;     // Partnerzeilen laufen automatisch
        const shown = DIALOG.slice(0, Math.min(R.i, DIALOG.length));
        const done = R.i >= DIALOG.length;
        let choices = "";
        if (!done) {
          const line = DIALOG[R.i];
          const others = DIALOG.filter((l, k) => l.who === R.me && k !== R.i);
          const alt = (others.length >= 2 ? others : DIALOG.filter((l) => l !== line));
          const opts = shuffle([line, ...shuffle(alt).slice(0, 2)]);
          choices = `<p class="gs-your">${T("roleYour")}</p>
            <div class="gs-choices">${opts.map((o) => `<button class="opt arabic${R.wrong.includes(DIALOG.indexOf(o)) ? " no" : ""}" data-k="${DIALOG.indexOf(o)}" lang="ar" dir="rtl" ${R.wrong.includes(DIALOG.indexOf(o)) ? "disabled" : ""}>${pick(o.ar, S.g)}</button>`).join("")}</div>`;
        }
        frame(`<div class="card gs-dialog">
          <div class="gs-chat">${shown.map((l, i) => bubble(l, i, { cls: l.who === R.me ? " mine" : "" })).join("")}</div>
          ${done ? `<div class="gs-done"><h2>${T("roleDone")}</h2><p>${T("roleDoneP", { e: R.errors })}</p>
              <div class="row center"><button class="btn" id="gsAgain">${T("roleAgain")}</button><button class="btn primary" id="gsOther">${T("roleOther")}</button></div></div>` : choices}
        </div>`);
        root.querySelector(".gs-chat .gs-line:last-child")?.scrollIntoView({ block: "nearest" });
        root.querySelectorAll("[data-k]").forEach((b) => (b.onclick = () => {
          const k = +b.dataset.k;
          if (k === R.i) { api.answer(true); R.i++; R.wrong = []; say([pick(DIALOG[k].ar, S.g), ...partnerFrom(R.i)].join(" ... ")); }
          else { api.answer(false); R.errors++; R.wrong.push(k); }
          if (R.i >= DIALOG.length || (R.i < DIALOG.length && DIALOG.slice(R.i).every((l) => l.who !== R.me))) {
            R.i = DIALOG.length;
            if (R.errors <= 2) api.update((p) => { p.roles = { ...(p.roles || {}), [R.me]: true }; });
          }
          role();
        }));
        const again = root.querySelector("#gsAgain"); if (again) again.onclick = () => { S.role = { me: R.me, i: 0, errors: 0, wrong: [] }; role(); };
        const other = root.querySelector("#gsOther"); if (other) other.onclick = () => { S.role = { me: R.me === "A" ? "B" : "A", i: 0, errors: 0, wrong: [] }; role(); };
      }

      function show() { ({ dialog, phrases, aufgaben, role })[S.tab](); }
      show();
    },
  };
}
