// Fügt eine Übersetzung in eine Geschichten-Datei ein.
// node tools/quran/merge_lang.mjs modules/propheten/data/musa.js en uebersetzung.json
// JSON: { title, intro, levels: [{ title, source, story: [...], w: [[...] je Aya], quiz: [...] }] }
import fs from "fs"; import path from "path";
const [file, lg, json] = process.argv.slice(2);
const src = fs.readFileSync(file, "utf8");
const head = src.slice(0, src.indexOf("export default"));
const d = (await import("file://" + path.resolve(file))).default;
const tr = JSON.parse(fs.readFileSync(json, "utf8"));
d.title[lg] = tr.title; d.intro[lg] = tr.intro;
if (tr.levels.length !== d.levels.length) throw new Error("Anzahl Level passt nicht");
d.levels.forEach((L, i) => {
  const x = tr.levels[i];
  L.title[lg] = x.title; L.source[lg] = x.source; L.story[lg] = x.story; L.quiz[lg] = x.quiz;
  if (x.w.length !== L.ayat.length) throw new Error(`Level ${i + 1}: Anzahl Ayat passt nicht`);
  L.ayat.forEach((a, k) => {
    if (x.w[k].length !== a.w.de.length) throw new Error(`${a.ref}: ${x.w[k].length} statt ${a.w.de.length} Wörter`);
    a.w[lg] = x.w[k];
  });
  x.quiz.forEach((q, k) => { if (!q.o.includes(q.a)) throw new Error(`Level ${i + 1} Frage ${k + 1}: Antwort fehlt in Optionen`); });
});
const J = (v) => JSON.stringify(v);
const byLang = (o, ind, fn) => Object.entries(o).map(([l, v]) => `${ind}${l}: ${fn(v)},`).join("\n");
let out = head + `export default {\n  id: ${J(d.id)},\n  ar: ${J(d.ar)},\n  title: ${J(d.title)},\n  intro: ${J(d.intro)},\n  levels: [\n`;
for (const L of d.levels) {
  out += `    {\n      motif: ${J(L.motif)},\n      title: ${J(L.title)},\n      source: ${J(L.source)},\n      story: {\n`;
  out += byLang(L.story, "        ", (v) => `[\n${v.map((s) => `          ${J(s)},`).join("\n")}\n        ]`) + "\n      },\n      ayat: [\n";
  for (const a of L.ayat) {
    out += `        { ref: ${J(a.ref)}, gaps: [${a.gaps.map((g) => `{ i: ${g.i} }`).join(", ")}],\n          w: {\n`;
    out += byLang(a.w, "            ", J) + "\n          } },\n";
  }
  out += "      ],\n      quiz: {\n";
  out += byLang(L.quiz, "        ", (v) => `[\n${v.map((q) => `          { q: ${J(q.q)}, a: ${J(q.a)}, o: ${J(q.o)} },`).join("\n")}\n        ]`) + "\n      },\n    },\n";
}
out += "  ],\n};\n";
fs.writeFileSync(file, out);
console.log("ok:", lg, "in", file);
