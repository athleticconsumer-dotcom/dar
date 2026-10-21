#!/usr/bin/env python3
"""
Arbeitsblätter (A4-PDF) für die Rubriken erzeugen.

    python3 tools/worksheets/generate.py

Für jedes Blatt entsteht:
    modules/<rubrik>/blaetter/<id>.pdf   (zum Ansehen / Drucken)
    modules/<rubrik>/blaetter/<id>.png   (Vorschaubild für die App)
und die Liste modules/<rubrik>/blaetter/index.json.

Benötigt: playwright (Chromium), pdftoppm, Schriften Amiri, Cinzel, Plus Jakarta Sans.
"""
import json, math, random, subprocess, sys
from pathlib import Path
from playwright.sync_api import sync_playwright
from texts import T as TEXTS

LANG = "de"
LANGS = ["de", "en", "fr", "ru", "tr"]
def S(key, **kw):
    """Text in der aktuellen Sprache (Fallback Deutsch), {platzhalter} werden ersetzt."""
    s = TEXTS.get(LANG, {}).get(key) or TEXTS["de"][key]
    for k, v in kw.items(): s = s.replace("{" + k + "}", str(v))
    return s
def A(text, size=13): return f'<span class="arab" style="font-size:{size}pt">{text}</span>'

ROOT = Path(__file__).resolve().parents[2]
random.seed(7)

# ---------------------------------------------------------------- Farben
MAROON, GOLD, INK, MUTED, LINE = "#4A1525", "#B8853A", "#2A0914", "#73515D", "#E6D9C6"
C_UNIT, C_TEN, C_HUN, C_THO, C_WA = "#2C6A6F", "#4B2D63", "#A8742B", "#82384E", "#8A7A80"
C_HOUR, C_MIN = "#4A1525", "#B8853A"

AR = "٠١٢٣٤٥٦٧٨٩"
def ar(n): return "".join(AR[int(d)] for d in str(n))

# ---------------------------------------------------------------- Zahlwörter (wie modules/zahlen/data.js)
UNITS = ["صِفْر","وَاحِد","اِثْنَان","ثَلَاثَة","أَرْبَعَة","خَمْسَة","سِتَّة","سَبْعَة","ثَمَانِيَة","تِسْعَة","عَشَرَة"]
UNITS_TR = ["ṣifr","wāḥid","ithnān","thalātha","arbaʿa","khamsa","sitta","sabʿa","thamāniya","tisʿa","ʿashara"]
TEENS = {11:"أَحَدَ عَشَرَ",12:"اِثْنَا عَشَرَ",13:"ثَلَاثَةَ عَشَرَ",14:"أَرْبَعَةَ عَشَرَ",15:"خَمْسَةَ عَشَرَ",16:"سِتَّةَ عَشَرَ",17:"سَبْعَةَ عَشَرَ",18:"ثَمَانِيَةَ عَشَرَ",19:"تِسْعَةَ عَشَرَ"}
TENS = {2:"عِشْرُون",3:"ثَلَاثُون",4:"أَرْبَعُون",5:"خَمْسُون",6:"سِتُّون",7:"سَبْعُون",8:"ثَمَانُون",9:"تِسْعُون"}

def word(n):
    if n <= 10: return UNITS[n]
    if n < 20: return TEENS[n]
    t, u = divmod(n, 10)
    return TENS[t] if not u else UNITS[u] + " وَ" + TENS[t]

def word_colored(n):
    """Einer und Zehner farbig, das وَ grau."""
    if n <= 10: return f'<span style="color:{C_UNIT}">{UNITS[n]}</span>'
    if n < 20:
        u, rest = TEENS[n].split(" ")
        return f'<span style="color:{C_UNIT}">{u}</span> <span style="color:{C_TEN}">{rest}</span>'
    t, u = divmod(n, 10)
    if not u: return f'<span style="color:{C_TEN}">{TENS[t]}</span>'
    return f'<span style="color:{C_UNIT}">{UNITS[u]}</span> <span style="color:{C_WA}">وَ</span><span style="color:{C_TEN}">{TENS[t]}</span>'

# ---------------------------------------------------------------- Uhrzeit (wie modules/uhrzeit/index.js)
HOURS = {1:"الوَاحِدَة",2:"الثَّانِيَة",3:"الثَّالِثَة",4:"الرَّابِعَة",5:"الخَامِسَة",6:"السَّادِسَة",7:"السَّابِعَة",8:"الثَّامِنَة",9:"التَّاسِعَة",10:"العَاشِرَة",11:"الحَادِيَةَ عَشْرَةَ",12:"الثَّانِيَةَ عَشْرَةَ"}
HOURS_TR = {1:"al-wāḥida",2:"ath-thāniya",3:"ath-thālitha",4:"ar-rābiʿa",5:"al-khāmisa",6:"as-sādisa",7:"as-sābiʿa",8:"ath-thāmina",9:"at-tāsiʿa",10:"al-ʿāshira",11:"al-ḥādiyata ʿashrata",12:"ath-thāniyata ʿashrata"}
MIN = {0:("تَمَامًا","genau"),15:("وَالرُّبْع","und ein Viertel"),20:("وَالثُّلُث","und ein Drittel"),30:("وَالنِّصْف","und halb"),40:("إِلَّا ثُلُثًا","minus ein Drittel"),45:("إِلَّا رُبْعًا","minus ein Viertel")}

def phrase(h, m, colored=True, prefix=True):
    hh = (h % 12) + 1 if m >= 40 else h
    hp = HOURS[hh]; mp = MIN[m][0]
    pre = "السَّاعَةُ " if prefix else ""
    if not colored: return pre + hp + " " + mp
    return f'{pre}<span style="color:{C_HOUR}">{hp}</span> <span style="color:{C_MIN}">{mp}</span>'

def fmt(h, m): return f"{h}:{m:02d}"

# ---------------------------------------------------------------- Bilder (SVG)
def clock(h=None, m=None, size=150, numbers=True, wedge=None):
    t = []
    t.append(f'<circle cx="100" cy="100" r="95" fill="#fff" stroke="{GOLD}" stroke-width="5"/>')
    if wedge is not None:   # Sektor von 12 bis "wedge" Minuten – zeigt Viertel/Drittel/Halb
        a = wedge * 6 * math.pi / 180
        x, y = 100 + 86 * math.sin(a), 100 - 86 * math.cos(a)
        large = 1 if wedge > 30 else 0
        t.append(f'<path d="M100 100 L100 14 A86 86 0 {large} 1 {x:.1f} {y:.1f} Z" fill="{C_MIN}" fill-opacity=".22" stroke="{C_MIN}" stroke-width="1.5"/>')
    for i in range(60):
        a = i * 6 * math.pi / 180; big = i % 5 == 0; r1 = 80 if big else 85
        t.append(f'<line x1="{100+r1*math.sin(a):.1f}" y1="{100-r1*math.cos(a):.1f}" x2="{100+89*math.sin(a):.1f}" y2="{100-89*math.cos(a):.1f}" stroke="{INK if big else "#C9B8A6"}" stroke-width="{3 if big else 1.2}" stroke-linecap="round"/>')
    if numbers:
        for i in range(1, 13):
            a = i * 30 * math.pi / 180
            t.append(f'<text x="{100+66*math.sin(a):.1f}" y="{100-66*math.cos(a):.1f}" text-anchor="middle" dominant-baseline="central" font-family="Amiri" font-size="19" fill="{MUTED}">{ar(i)}</text>')
    if h is not None:
        ha = ((h % 12) + m / 60) * 30 * math.pi / 180; ma = m * 6 * math.pi / 180
        t.append(f'<line x1="100" y1="100" x2="{100+44*math.sin(ha):.1f}" y2="{100-44*math.cos(ha):.1f}" stroke="{C_HOUR}" stroke-width="8" stroke-linecap="round"/>')
        t.append(f'<line x1="100" y1="100" x2="{100+72*math.sin(ma):.1f}" y2="{100-72*math.cos(ma):.1f}" stroke="{C_MIN}" stroke-width="5" stroke-linecap="round"/>')
    t.append(f'<circle cx="100" cy="100" r="5" fill="{INK}"/>')
    return f'<svg viewBox="0 0 200 200" width="{size}" height="{size}">{"".join(t)}</svg>'

STAR = "M12 1.8l2.9 6.6 7.1.6-5.4 4.7 1.6 7-6.2-3.7-6.2 3.7 1.6-7L2 9l7.1-.6z"
def objects(n, kind):
    """n kleine Bilder: Sterne, Datteln oder Halbmonde."""
    out = []
    for i in range(n):
        if kind == "stern":
            out.append(f'<svg viewBox="0 0 24 24" width="24" height="24"><path d="{STAR}" fill="{GOLD}" stroke="{MAROON}" stroke-width=".8"/></svg>')
        elif kind == "dattel":
            out.append(f'<svg viewBox="0 0 24 24" width="24" height="24"><ellipse cx="12" cy="13" rx="6.5" ry="9.5" fill="#7A4A2A" transform="rotate(20 12 13)"/><ellipse cx="10" cy="9" rx="2" ry="4" fill="#B98559" opacity=".6" transform="rotate(20 12 13)"/></svg>')
        else:
            out.append(f'<svg viewBox="0 0 24 24" width="24" height="24"><path d="M15 3a9 9 0 1 0 6 15.5A8 8 0 0 1 15 3z" fill="{C_TEN}"/></svg>')
    return '<div class="objs">' + "".join(out) + "</div>"

# ---------------------------------------------------------------- Seitenrahmen
CSS = f"""
@page {{ size: A4; margin: 0; }}
* {{ box-sizing: border-box; }}
body {{ margin: 0; font-family: 'Plus Jakarta Sans', 'Manrope', sans-serif; color: {INK}; font-size: 10.5pt; }}
.page {{ width: 210mm; height: 297mm; padding: 13mm 14mm 12mm; position: relative; page-break-after: always; overflow: hidden; display: flex; flex-direction: column; gap: 5mm; }}
.page:last-child {{ page-break-after: auto; }}
.page::before {{ content: ""; position: absolute; inset: 6mm; border: 1.2pt solid {GOLD}; border-radius: 6mm; pointer-events: none; }}
header {{ display: flex; justify-content: space-between; align-items: flex-start; gap: 6mm; }}
.kicker {{ font: 700 7.5pt 'Cinzel', 'Playfair Display', serif; letter-spacing: .16em; text-transform: uppercase; color: #F4E2C2; background: {MAROON}; padding: 1.2mm 3.5mm; border-radius: 99px; display: inline-block; }}
h1 {{ font: 700 21pt 'Cinzel', 'Playfair Display', serif; color: {MAROON}; margin: 2.5mm 0 0; }}
.h-ar {{ font: 700 24pt 'Amiri', serif; color: {GOLD}; direction: rtl; line-height: 1.2; }}
.name {{ display: flex; gap: 6mm; font-size: 9pt; color: {MUTED}; }}
.name span {{ flex: 1; border-bottom: 1pt solid {LINE}; padding-bottom: 1mm; }}
h2 {{ font: 700 12pt 'Cinzel', 'Playfair Display', serif; color: {MAROON}; margin: 0 0 2mm; display: flex; align-items: center; gap: 2.5mm; }}
h2 .n {{ display: inline-grid; place-items: center; width: 7mm; height: 7mm; border-radius: 50%; background: {MAROON}; color: #F4E2C2; font-size: 9pt; }}
.task {{ border: 1pt solid {LINE}; border-radius: 4mm; padding: 4mm 5mm; }}
.hint {{ font-size: 9pt; color: {MUTED}; margin: -1mm 0 3mm; }}
.arab {{ font-family: 'Amiri', serif; direction: rtl; unicode-bidi: isolate; }}
.sol {{ unicode-bidi: isolate; }}
.legend {{ display: flex; flex-wrap: wrap; gap: 3mm 6mm; font-size: 8.5pt; color: {MUTED}; align-items: center; }}
.legend i {{ display: inline-block; width: 3.5mm; height: 3.5mm; border-radius: 1mm; margin-right: 1.5mm; vertical-align: -0.6mm; }}
.info {{ background: #FBF6EC; border: 1pt solid {GOLD}; border-radius: 4mm; padding: 4mm 5mm; }}
.box {{ display: inline-block; min-width: 13mm; height: 11mm; border: 1.2pt solid {LINE}; border-radius: 2.5mm; background: #fff; }}
.wline {{ border-bottom: 1.2pt dotted #B9A795; height: 9mm; }}
.objs {{ display: flex; flex-wrap: wrap; gap: 1.5mm; justify-content: center; min-height: 15mm; align-content: center; }}
.grid {{ display: grid; gap: 3mm; }}
footer {{ margin-top: auto; display: flex; justify-content: space-between; font-size: 7.5pt; color: {MUTED}; padding-top: 2mm; border-top: 1pt dashed {LINE}; }}
footer b {{ font-family: 'Cinzel', 'Playfair Display', serif; color: {MAROON}; }}
.sol {{ color: {C_UNIT}; font-weight: 700; }}
.trace {{ font: 400 26pt/1 'Amiri', serif; color: #E3D6C5; }}
"""

def page(kicker, title, title_ar, body, footer, name=True):
    nm = f'<div class="name"><span>{S("name")}</span><span>{S("date")}</span></div>' if name else ""
    return f"""<section class="page"><header><div><span class="kicker">{kicker}</span><h1>{title}</h1></div>
      <div class="h-ar">{title_ar}</div></header>{nm}{body}<footer><span><b>Dār</b> · {S('brand')} · athleticconsumer-dotcom.github.io/dar</span><span>{footer}</span></footer></section>"""

def task(n, title, hint, inner):
    return f'<div class="task"><h2><span class="n">{n}</span>{title}</h2>{f"<p class=hint>{hint}</p>" if hint else ""}{inner}</div>'

# ================================================================ BLÄTTER
def zahlen_ziffern():
    rows = "".join(f"""<div style="display:grid;grid-template-columns:8mm 14mm repeat(3,13mm) 1fr;align-items:center;gap:2mm;padding:1.2mm 0;border-bottom:1pt dashed {LINE}">
        <b style="color:{MUTED}">{i}</b><span class="arab" style="font-size:26pt;color:{MAROON};text-align:center">{AR[i]}</span>
        {''.join(f'<span class="trace" style="text-align:center">{AR[i]}</span>' for _ in range(3))}<span class="wline"></span></div>""" for i in range(10))
    t1 = task(1, S("t_trace"), S("h_trace"),
              f'<div style="display:grid;grid-template-columns:1fr 1fr;gap:0 8mm">{rows}</div>')
    counts = [3, 7, 5, 9, 2, 6]; kinds = ["stern", "dattel", "mond", "stern", "dattel", "mond"]
    cells = "".join(f'<div style="border:1pt solid {LINE};border-radius:3mm;padding:2.5mm;display:flex;flex-direction:column;gap:2mm;align-items:center">{objects(c,k)}<span class="box" style="width:16mm"></span></div>' for c, k in zip(counts, kinds))
    t2 = task(2, S("t_count"), S("h_count"), f'<div class="grid" style="grid-template-columns:repeat(6,1fr)">{cells}</div>')
    left = [1, 4, 8, 0, 6, 9]; right = random.sample(left, len(left))
    pairs = "".join(f'<div style="display:flex;justify-content:space-between;align-items:center;padding:1.3mm 0"><span style="font:700 15pt Plus Jakarta Sans;color:{INK}">{l} <span style="color:{GOLD}">●</span></span><span style="flex:1"></span><span class="arab" style="font-size:20pt;color:{MAROON}"><span style="color:{GOLD};font-size:12pt">●</span> {AR[r]}</span></div>' for l, r in zip(left, right))
    t3 = task(3, S("t_match"), S("h_match"), f'<div style="max-width:120mm;margin:0 auto">{pairs}</div>')
    seqs = [([1, 2, None, 4, 5], 3), ([5, 6, 7, None, 9], 8), ([None, 1, 2, 3, 4], 0), ([2, 4, None, 8], 6), ([9, 8, 7, None, 5], 6), ([1, 3, 5, None, 9], 7)]
    cells4 = "".join(f'<div style="display:flex;gap:2.5mm;justify-content:center;align-items:center;direction:ltr;border:1pt solid {LINE};border-radius:3mm;padding:3mm">' + "".join(f'<span class="box" style="width:12mm;display:grid;place-items:center"></span>' if v is None else f'<span class="arab" style="font-size:20pt;color:{MAROON};width:9mm;text-align:center">{AR[v]}</span>' for v in sq) + '</div>' for sq, _ in seqs)
    t4 = task(4, S("t_missing"), S("h_missing"), f'<div class="grid" style="grid-template-columns:1fr 1fr">{cells4}</div>')
    K = f"{S('subj_z')} · {S('sheet', n=1)}"
    p1 = page(K, S("z1_title"), "الأَرْقَام ٠–٩", t1 + t2, f"{S('level')} · {S('subj_z')} · {S('sheet', n=1)} · {S('page', n=1)}")
    p1 += page(K, S("z1_title"), "الأَرْقَام ٠–٩", t3 + t4, f"{S('level')} · {S('subj_z')} · {S('sheet', n=1)} · {S('page', n=2)}")
    sol = f"""<div class="info"><h2>{S("sol")}</h2>
      <p><b>2 · {S("t_count")}:</b> {' · '.join(f'{c} = <span class="arab sol" style="font-size:15pt">{AR[c]}</span>' for c in counts)}</p>
      <p><b>3 · {S("t_match")}:</b> {' · '.join(f'{l} = <span class="arab sol" style="font-size:15pt">{AR[l]}</span>' for l in left)}</p>
      <p><b>4 · {S("t_missing")}</b> {' · '.join(f'<span class="arab sol" style="font-size:15pt">{AR[a]}</span>' for _, a in seqs)}</p>
      <p class="hint" style="margin-top:4mm">{S("memo", five=A("٥", 14), zero=A("٠", 14))}</p></div>"""
    p2 = page(K, S("sol"), "الحُلُول", sol, f"{S('level')} · {S('subj_z')} · {S('sheet', n=1)} · {S('sol')}", name=False)
    return "ziffern", S("z1_list"), S("z1_desc"), p1 + p2

def zahlen_bauen():
    legend = f'<div class="legend"><span><i style="background:{C_UNIT}"></i>{S("lg_unit")}</span><span><i style="background:{C_WA}"></i>{S("lg_wa")}</span><span><i style="background:{C_TEN}"></i>{S("lg_ten")}</span></div>'
    info = f"""<div class="info"><h2>{S("z2_info_t")}</h2>
      <p style="margin:0 0 2mm">{S("z2_info_p")}</p>
      <div style="display:flex;align-items:center;justify-content:center;gap:5mm;margin:2mm 0">
        <span style="font:800 22pt Plus Jakarta Sans">25</span><span style="color:{MUTED}">=</span>
        <span class="arab" style="font-size:24pt">{word_colored(25)}</span></div>{legend}</div>"""
    nums1 = [34, 52, 87, 16, 40, 63, 99, 71]
    cells = "".join(f'<div style="display:flex;justify-content:space-between;align-items:center;gap:3mm;border-bottom:1pt dashed {LINE};padding:1.5mm 0"><span class="arab" style="font-size:16pt">{word_colored(n)}</span><span style="display:flex;gap:2mm"><span class="box" title="Ziffern"></span><span class="box"></span></span></div>' for n in nums1)
    t1 = task(1, S("t_read"), S("h_read"), f'<div class="grid" style="grid-template-columns:1fr 1fr;gap:0 8mm">{cells}</div>')
    nums2 = [47, 28, 95, 33, 56, 81]
    cells2 = "".join(f'<div style="display:flex;align-items:center;gap:3mm;justify-content:space-between;border:1pt solid {LINE};border-radius:3mm;padding:2.5mm 3.5mm"><b style="font-size:15pt">{n}</b><span style="display:flex;align-items:center;gap:2mm;direction:rtl"><span class="box" style="width:28mm;border-color:{C_UNIT}"></span><span class="arab" style="color:{C_WA};font-size:15pt">وَ</span><span class="box" style="width:28mm;border-color:{C_TEN}"></span></span></div>' for n in nums2)
    t2 = task(2, S("t_build"), S("h_build"), f'<div class="grid" style="grid-template-columns:1fr 1fr">{cells2}</div>')
    sums = [(20, 5), (30, 7), (40, 2), (60, 9), (10, 8), (90, 1)]
    cells3 = "".join(f'<div style="display:flex;align-items:center;gap:2mm;font-size:15pt" class="arab"><span style="direction:ltr">{ar(a)} + {ar(b)} =</span><span class="box" style="width:18mm"></span></div>' for a, b in sums)
    t3 = task(3, S("t_calc"), S("h_calc"), f'<div class="grid" style="grid-template-columns:repeat(3,1fr);direction:ltr">{cells3}</div>')
    pairs4 = [(45, 54), (19, 90), (36, 63), (72, 27), (80, 18), (58, 85)]
    cells4 = "".join(f'<div style="display:flex;justify-content:space-around;align-items:center;gap:3mm;border:1pt solid {LINE};border-radius:3mm;padding:3mm"><span class="arab" style="font-size:15pt">{word_colored(a)}</span><span style="color:{MUTED}">{S("or")}</span><span class="arab" style="font-size:15pt">{word_colored(b)}</span></div>' for a, b in pairs4)
    t4 = task(4, S("t_more"), S("h_more"), f'<div class="grid" style="grid-template-columns:1fr 1fr">{cells4}</div>')
    K = f"{S('subj_z')} · {S('sheet', n=2)}"
    p1 = page(K, S("z2_title"), "مِنْ ٢١ إِلَى ٩٩", info + t1 + t2, f"{S('level')} · {S('subj_z')} · {S('sheet', n=2)} · {S('page', n=1)}")
    p1 += page(K, S("z2_title"), "مِنْ ٢١ إِلَى ٩٩", t3 + t4, f"{S('level')} · {S('subj_z')} · {S('sheet', n=2)} · {S('page', n=2)}")
    sol = f"""<div class="info"><h2>{S("sol")}</h2>
      <p><b>1 · {S("s_read")}:</b></p><div class="grid" style="grid-template-columns:repeat(4,1fr);margin-bottom:3mm">{''.join(f'<span><b>{n}</b> · <span class="arab sol" style="font-size:14pt">{ar(n)}</span></span>' for n in nums1)}</div>
      <p><b>2 · {S("s_build")}:</b></p><div style="display:grid;grid-template-columns:1fr 1fr;gap:2mm 8mm;margin-bottom:3mm">{''.join(f'<span><b>{n}</b> = <span class="arab" style="font-size:15pt">{word_colored(n)}</span></span>' for n in nums2)}</div>
      <p><b>3 · {S("s_calc")}:</b> {' · '.join(f'{a}+{b} = <span class="arab sol" style="font-size:14pt">{ar(a+b)}</span>' for a, b in sums)}</p>
      <p><b>4 · {S("t_more")}</b> {' · '.join(f'<span class="sol">{max(a, b)}</span>' for a, b in pairs4)}</p>{legend}</div>"""
    p2 = page(K, S("sol"), "الحُلُول", sol, f"{S('level')} · {S('subj_z')} · {S('sheet', n=2)} · {S('sol')}", name=False)
    return "zahlen-bauen", S("z2_list"), S("z2_desc"), p1 + p2

def uhr_stunden():
    hours = "".join(f'<div style="display:flex;justify-content:space-between;gap:2mm;padding:1mm 0;border-bottom:1pt dashed {LINE}"><b style="color:{MUTED}">{h}</b><span class="arab" style="color:{C_HOUR};font-size:13.5pt">{HOURS[h]}</span></div>' for h in range(1, 13))
    info = f"""<div class="info"><h2>{S("u1_info_t")}</h2>
      <p style="margin:0 0 2mm">{S("u1_info_p", saa=A("السَّاعَةُ"), tamam=A("تَمَامًا"))}</p>
      <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:0 8mm">{hours}</div></div>"""
    read = [3, 7, 10, 1, 6, 12]
    cells = "".join(f'<div style="display:flex;flex-direction:column;align-items:center;gap:1.5mm;border:1pt solid {LINE};border-radius:3mm;padding:2mm">{clock(h,0,108)}<div class="wline" style="width:100%"></div></div>' for h in read)
    t1 = task(1, S("t_what"), S("h_what", ex=A("السَّاعَةُ الثَّالِثَة تَمَامًا", 11)), f'<div class="grid" style="grid-template-columns:repeat(3,1fr)">{cells}</div>')
    draw = [5, 9, 2, 11]
    cells2 = "".join(f'<div style="display:flex;flex-direction:column;align-items:center;gap:1.5mm;border:1pt solid {LINE};border-radius:3mm;padding:2mm">{clock(None,None,100)}<span class="arab" style="font-size:12pt">{phrase(h,0)}</span></div>' for h in draw)
    t2 = task(2, S("t_hands"), S("h_hands"), f'<div class="grid" style="grid-template-columns:repeat(4,1fr)">{cells2}</div>')
    match = [4, 8, 12, 2, 9]; shuffled = random.sample(match, len(match))
    rows3 = "".join(f'<div style="display:flex;justify-content:space-between;align-items:center;padding:1.8mm 0"><span style="font:700 15pt Plus Jakarta Sans">{h}:00 <span style="color:{GOLD}">●</span></span><span class="arab" style="font-size:15pt"><span style="color:{GOLD};font-size:11pt">●</span> {phrase(s2,0,True,False)}</span></div>' for h, s2 in zip(match, shuffled))
    t3 = task(3, S("t_match"), S("h_conn"), f'<div style="max-width:140mm;margin:0 auto">{rows3}</div>')
    K = f"{S('subj_u')} · {S('sheet', n=1)}"
    p1 = page(K, S("u1_title"), "السَّاعَة", info + t1, f"{S('level')} · {S('subj_u')} · {S('sheet', n=1)} · {S('page', n=1)}")
    p1 += page(K, S("u1_title"), "السَّاعَة", t2 + t3, f"{S('level')} · {S('subj_u')} · {S('sheet', n=1)} · {S('page', n=2)}")
    sol1 = "".join(f'<div style="display:flex;justify-content:space-between;gap:3mm;border-bottom:1pt dashed {LINE};padding:1.5mm 0"><b>{fmt(h,0)}</b><span class="arab" style="font-size:14pt">{phrase(h,0)}</span></div>' for h in read)
    sol2 = "".join(f'<div style="display:flex;flex-direction:column;align-items:center;gap:1mm">{clock(h,0,90)}<b>{fmt(h,0)}</b></div>' for h in draw)
    sol = f'<div class="info"><h2>{S("sol")}</h2><p><b>1 · {S("t_what")}</b></p><div style="display:grid;grid-template-columns:1fr 1fr;gap:0 8mm;margin-bottom:4mm">{sol1}</div><p><b>2 · {S("s_hands")}:</b></p><div class="grid" style="grid-template-columns:repeat(4,1fr);margin-bottom:4mm">{sol2}</div><p><b>3 · {S("t_match")}:</b></p><div style="display:grid;grid-template-columns:1fr 1fr;gap:0 8mm">{"".join(f'<div style="display:flex;justify-content:space-between;border-bottom:1pt dashed {LINE};padding:1.5mm 0"><b>{h}:00</b><span class="arab" style="font-size:14pt">{phrase(h,0)}</span></div>' for h in match)}</div></div>'
    p2 = page(K, S("sol"), "الحُلُول", sol, f"{S('level')} · {S('subj_u')} · {S('sheet', n=1)} · {S('sol')}", name=False)
    return "volle-stunden", S("u1_title"), S("u1_desc"), p1 + p2

def uhr_teile():
    legend = f'<div class="legend"><span><i style="background:{C_HOUR}"></i>{S("lg_hour")}</span><span><i style="background:{C_MIN}"></i>{S("lg_min")}</span></div>'
    parts = [(15, "وَالرُّبْع", S("m15")), (20, "وَالثُّلُث", S("m20")), (30, "وَالنِّصْف", S("m30")), (40, "إِلَّا ثُلُثًا", S("m40")), (45, "إِلَّا رُبْعًا", S("m45"))]
    pics = "".join(f'<div style="display:flex;flex-direction:column;align-items:center;gap:1mm;text-align:center">{clock(None,None,80,numbers=False,wedge=m)}<b>:{m:02d}</b><span class="arab" style="color:{C_MIN};font-size:13pt">{w}</span><span style="font-size:8pt;color:{MUTED}">{d}</span></div>' for m, w, d in parts)
    info = f"""<div class="info"><h2>{S("u2_title")}</h2>
      <p style="margin:0 0 2mm">{S("u2_info_p", illa=A("إِلَّا"), ex=A(phrase(3,45)))}</p>
      <div class="grid" style="grid-template-columns:repeat(5,1fr)">{pics}</div>{legend}</div>"""
    q = [(4, 15), (8, 30), (2, 45), (11, 20), (6, 40), (9, 30)]
    cells = []
    for h, m in q:
        opts = {phrase(h, m, False, False)}
        while len(opts) < 3:
            hh, mm = random.choice([(h, random.choice(list(MIN))), ((h % 12) + 1, m), (random.randint(1, 12), m)])
            opts.add(phrase(hh, mm, False, False))
        opts = random.sample(sorted(opts), 3)
        boxes = "".join(f'<div style="display:flex;align-items:center;gap:2mm;justify-content:flex-end"><span class="arab" style="font-size:11.5pt">{o}</span><span style="width:4mm;height:4mm;border:1.2pt solid {MAROON};border-radius:1mm;flex:none"></span></div>' for o in opts)
        cells.append(f'<div style="display:grid;grid-template-columns:24mm 1fr;align-items:center;gap:2mm;border:1pt solid {LINE};border-radius:3mm;padding:2mm">{clock(h,m,90,numbers=False)}<div style="display:flex;flex-direction:column;gap:1.2mm">{boxes}</div></div>')
    t1 = task(1, S("t_tick"), S("h_tick"), f'<div class="grid" style="grid-template-columns:1fr 1fr">{"".join(cells)}</div>')
    draw = [(1, 15), (5, 30), (7, 45), (10, 20)]
    cells2 = "".join(f'<div style="display:flex;flex-direction:column;align-items:center;gap:1.5mm;border:1pt solid {LINE};border-radius:3mm;padding:2mm">{clock(None,None,96)}<span class="arab" style="font-size:11pt;text-align:center">{phrase(h,m)}</span></div>' for h, m in draw)
    t2 = task(2, S("t_hands"), S("h_hands2"), f'<div class="grid" style="grid-template-columns:repeat(4,1fr)">{cells2}</div>')
    write = [(12, 15), (3, 40), (8, 45)]
    cells3 = "".join(f'<div style="display:grid;grid-template-columns:30mm 1fr;align-items:center;gap:4mm;border:1pt solid {LINE};border-radius:3mm;padding:2.5mm">{clock(h,m,100)}<div class="wline"></div></div>' for h, m in write)
    t3 = task(3, S("t_write"), S("h_write"), f'<div class="grid">{cells3}</div>')
    K = f"{S('subj_u')} · {S('sheet', n=2)}"
    p1 = page(K, S("u2_title"), "الرُّبْع · الثُّلُث · النِّصْف", info + t1, f"{S('level')} · {S('subj_u')} · {S('sheet', n=2)} · {S('page', n=1)}")
    p1 += page(K, S("u2_title"), "الرُّبْع · الثُّلُث · النِّصْف", t2 + t3, f"{S('level')} · {S('subj_u')} · {S('sheet', n=2)} · {S('page', n=2)}")
    sol1 = "".join(f'<div style="display:flex;justify-content:space-between;gap:3mm;border-bottom:1pt dashed {LINE};padding:1.5mm 0"><b>{fmt(h,m)}</b><span class="arab" style="font-size:14pt">{phrase(h,m)}</span></div>' for h, m in q)
    sol2 = "".join(f'<div style="display:flex;flex-direction:column;align-items:center;gap:1mm">{clock(h,m,90)}<b>{fmt(h,m)}</b></div>' for h, m in draw)
    sol = f'<div class="info"><h2>{S("sol")}</h2><p><b>1 · {S("t_tick")}:</b></p><div style="margin-bottom:4mm">{sol1}</div><p><b>2 · {S("s_hands")}:</b></p><div class="grid" style="grid-template-columns:repeat(4,1fr);margin-bottom:4mm">{sol2}</div><p><b>3 · {S("t_write")}:</b></p>{"".join(f'<div style="display:flex;justify-content:space-between;gap:3mm;border-bottom:1pt dashed {LINE};padding:1.5mm 0"><b>{fmt(h,m)}</b><span class="arab" style="font-size:14pt">{phrase(h,m)}</span></div>' for h, m in write)}{legend}</div>'
    p2 = page(K, S("sol"), "الحُلُول", sol, f"{S('level')} · {S('subj_u')} · {S('sheet', n=2)} · {S('sol')}", name=False)
    return "viertel-drittel-halb", S("u2_title"), S("u2_desc"), p1 + p2

SHEETS = {"zahlen": [zahlen_ziffern, zahlen_bauen], "uhrzeit": [uhr_stunden, uhr_teile]}

def main():
    global LANG
    only = sys.argv[1:]  # optional: nur bestimmte Rubriken
    with sync_playwright() as p:
        b = p.chromium.launch()
        pg = b.new_page()
        for rubrik, fns in SHEETS.items():
            if only and rubrik not in only: continue
            for LANG in LANGS:
                out = ROOT / "modules" / rubrik / "blaetter" / LANG; out.mkdir(parents=True, exist_ok=True)
                index = []
                for fn in fns:
                    random.seed(7 + fns.index(fn))   # gleiche Aufgaben in jeder Sprache
                    sid, title, desc, pages = fn()
                    html = f'<!doctype html><html lang="{LANG}"><head><meta charset="utf-8"><style>{CSS}</style></head><body>{pages}</body></html>'
                    pg.set_content(html); pg.evaluate("document.fonts.ready")
                    pdf = out / f"{sid}.pdf"
                    pg.pdf(path=str(pdf), format="A4", print_background=True, prefer_css_page_size=True)
                    subprocess.run(["pdftoppm", "-png", "-r", "80", "-f", "1", "-l", "1", "-singlefile", str(pdf), str(out / sid)], check=True)
                    n = pages.count('class="page"')
                    index.append({"id": sid, "title": title, "desc": desc, "pdf": f"blaetter/{LANG}/{sid}.pdf", "img": f"blaetter/{LANG}/{sid}.png", "pages": n})
                    print("✓", pdf.relative_to(ROOT))
                (out / "index.json").write_text(json.dumps(index, ensure_ascii=False, indent=2), encoding="utf-8")
        b.close()

if __name__ == "__main__":
    main()
