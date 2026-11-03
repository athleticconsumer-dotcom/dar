#!/usr/bin/env python3
"""
Schneidet Qur'an-Ausschnitte wortgenau aus Tanzil (Uthmani, Hafs) und gibt sie als JS-Objekte aus.
    python3 tools/quran/excerpt.py <quran-api> <datei.json>
datei.json: [{ "ref": "2:2", "from": 0, "to": 3, "hl": [0], "tr": {...}, ...weitere Felder }]
Ausgabe: JSON-Liste mit text/start/end ergänzt (für data.js der Rubrik)
"""
import json, re, sys
from pathlib import Path
SRC = Path(sys.argv[1]) / "editions" / "ara-quranuthmanihaf"
def clean(t):
    t = re.sub(r"([ࣰ-ࣲ]) (?=[اى])", r"\1", t); return t.replace("‏", "").strip()
out = []
for e in json.load(open(sys.argv[2], encoding="utf-8")):
    s, a = map(int, e["ref"].split(":"))
    w = clean({v["verse"]: v["text"] for v in json.load(open(SRC / f"{s}.json", encoding="utf-8"))["chapter"]}[a]).split(" ")
    seg = w[e["from"]:e["to"] + 1]
    for i in e.get("hl", []): assert i < len(seg), (e["ref"], i)
    o = {k: v for k, v in e.items() if k not in ("from", "to")}
    o.update(text=" ".join(seg), start=e["from"] == 0, end=e["to"] == len(w) - 1)
    out.append(o)
    print("✓", e["ref"], " ".join(seg), "→", [seg[i] for i in e.get("hl", [])], file=sys.stderr)
print(json.dumps(out, ensure_ascii=False))
