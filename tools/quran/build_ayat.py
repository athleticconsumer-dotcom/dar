#!/usr/bin/env python3
"""
Holt die benötigten Ayat für die Propheten-Geschichten aus dem Tanzil-Text (Uthmani, Hafs)
und schreibt modules/propheten/ayat.json. Prüft dabei jede Lücke.

Quelle: github.com/fawazahmed0/quran-api  editions/ara-quranuthmanihaf/<sure>.json
        (Tanzil Quran Text, tanzil.net – Text unverändert, nur überzählige Leerzeichen
         nach offenem Tanwin entfernt, die diese Ausgabe enthält)

    python3 tools/quran/build_ayat.py <pfad-zu-quran-api>
"""
import json, re, subprocess, sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[2]
SRC = Path(sys.argv[1]) / "editions" / "ara-quranuthmanihaf"
DATA = ROOT / "modules" / "propheten" / "data"
WAQF = re.compile(r"[\u06D6-\u06DC\u06DE\u06E9]")   # Pausenzeichen, ۞, ۩

def clean(t):
    t = re.sub(r"([\u08F0-\u08F2]) (?=[\u0627\u0649])", r"\1", t)
    return t.replace("\u200f", "").strip()

refs = {}
NODE = ("const f=process.argv[1];import('file://'+f).then(m=>console.log(JSON.stringify("
        "m.default.levels.flatMap(l=>l.ayat.map(v=>({ref:v.ref,gaps:v.gaps.map(g=>g.i),w:v.w}))))))")
for f in sorted(DATA.glob("*.js")):
    res = subprocess.run(["node", "--input-type=module", "-e", NODE, str(f)], capture_output=True, text=True, check=True)
    for v in json.loads(res.stdout):
        s, a = map(int, v["ref"].split(":"))
        refs[(s, a)] = (f.name, v["gaps"], v["w"])

cache, out, ok = {}, {}, True
for (s, a), (fname, idx, wl) in sorted(refs.items()):
    if s not in cache:
        cache[s] = {v["verse"]: clean(v["text"]) for v in json.load(open(SRC / f"{s}.json", encoding="utf-8"))["chapter"]}
    text = cache[s][a]
    words = text.split(" ")
    for lg, glosses in wl.items():
        if len(glosses) != len(words):
            print(f"✗ {fname} {s}:{a} [{lg}] hat {len(words)} Wörter, aber {len(glosses)} Bedeutungen"); ok = False
    for i in idx:
        if i >= len(words):
            print(f"✗ {fname} {s}:{a} Lücke {i} gibt es nicht ({len(words)} Wörter)"); ok = False
    out[f"{s}:{a}"] = {"s": s, "a": a, "text": text}
    print(f"✓ {s}:{a}  Lücken: " + ", ".join(WAQF.sub("", words[i]) for i in idx if i < len(words)))

(ROOT / "modules" / "propheten" / "ayat.json").write_text(json.dumps(out, ensure_ascii=False, indent=1), encoding="utf-8")
print(f"{len(out)} Ayat geschrieben.")
sys.exit(0 if ok else 1)
