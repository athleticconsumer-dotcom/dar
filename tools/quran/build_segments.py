#!/usr/bin/env python3
"""
Schneidet Qur'an-Ausschnitte für Rubriken wortgenau aus dem Tanzil-Text (Uthmani, Hafs)
und schreibt modules/<rubrik>/quran.json. Prüft Wortanzahl der Bedeutungen und die Lücken.

    python3 tools/quran/build_segments.py <pfad-zu-quran-api> [rubrik ...]   (Standard: lebewesen)
"""
import json, re, subprocess, sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[2]
SRC = Path(sys.argv[1]) / "editions" / "ara-quranuthmanihaf"
MODS = sys.argv[2:] or ["lebewesen"]
WAQF = re.compile(r"[ۖ-ۜ۞۩]")

def clean(t):
    t = re.sub(r"([ࣰ-ࣲ]) (?=[اى])", r"\1", t)
    return t.replace("‏", "").strip()

NODE = "const f=process.argv[1];import('file://'+f).then(m=>console.log(JSON.stringify(m.PASSAGES)))"
ok, cache = True, {}
for mod in MODS:
    f = ROOT / "modules" / mod / "quran.js"
    passages = json.loads(subprocess.run(["node", "--input-type=module", "-e", NODE, str(f)], capture_output=True, text=True, check=True).stdout)
    out = {}
    for p in passages:
        s, a = map(int, p["ref"].split(":"))
        if s not in cache:
            cache[s] = {v["verse"]: clean(v["text"]) for v in json.load(open(SRC / f"{s}.json", encoding="utf-8"))["chapter"]}
        words = cache[s][a].split(" ")
        seg = words[p["from"]:p["to"] + 1]
        n = len(seg)
        if p["to"] >= len(words):
            print(f"✗ {p['id']}: {s}:{a} hat nur {len(words)} Wörter"); ok = False
        for lg, gl in p["w"].items():
            if len(gl) != n:
                print(f"✗ {p['id']} [{lg}] {n} Wörter, aber {len(gl)} Bedeutungen"); ok = False
        for i in p["gaps"]:
            if i >= n:
                print(f"✗ {p['id']} Lücke {i} gibt es nicht"); ok = False
        out[p["id"]] = {"s": s, "a": a, "text": " ".join(seg), "start": p["from"] == 0, "end": p["to"] == len(words) - 1}
        print(f"✓ {p['id']:9} {s}:{a} [{p['from']}–{p['to']}]  Lücken: " + ", ".join(WAQF.sub("", seg[i]) for i in p["gaps"] if i < n))
    (ROOT / "modules" / mod / "quran.json").write_text(json.dumps(out, ensure_ascii=False, indent=1), encoding="utf-8")
    print(f"{mod}: {len(out)} Ausschnitte geschrieben.")
sys.exit(0 if ok else 1)
