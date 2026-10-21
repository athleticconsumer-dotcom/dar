// Zahlwörter im Hocharabischen (Pausalform, ohne Kasusendungen am Wortende –
// so werden Zahlen beim Zählen und Vorlesen normalerweise gesprochen).

export const UNITS = [
  ["صِفْر", "ṣifr"], ["وَاحِد", "wāḥid"], ["اِثْنَان", "ithnān"], ["ثَلَاثَة", "thalātha"], ["أَرْبَعَة", "arbaʿa"],
  ["خَمْسَة", "khamsa"], ["سِتَّة", "sitta"], ["سَبْعَة", "sabʿa"], ["ثَمَانِيَة", "thamāniya"], ["تِسْعَة", "tisʿa"], ["عَشَرَة", "ʿashara"],
];
export const TEENS = {
  11: ["أَحَدَ عَشَرَ", "aḥada ʿashar"], 12: ["اِثْنَا عَشَرَ", "ithnā ʿashar"], 13: ["ثَلَاثَةَ عَشَرَ", "thalāthata ʿashar"],
  14: ["أَرْبَعَةَ عَشَرَ", "arbaʿata ʿashar"], 15: ["خَمْسَةَ عَشَرَ", "khamsata ʿashar"], 16: ["سِتَّةَ عَشَرَ", "sittata ʿashar"],
  17: ["سَبْعَةَ عَشَرَ", "sabʿata ʿashar"], 18: ["ثَمَانِيَةَ عَشَرَ", "thamāniyata ʿashar"], 19: ["تِسْعَةَ عَشَرَ", "tisʿata ʿashar"],
};
export const TENS = {
  2: ["عِشْرُون", "ʿishrūn"], 3: ["ثَلَاثُون", "thalāthūn"], 4: ["أَرْبَعُون", "arbaʿūn"], 5: ["خَمْسُون", "khamsūn"],
  6: ["سِتُّون", "sittūn"], 7: ["سَبْعُون", "sabʿūn"], 8: ["ثَمَانُون", "thamānūn"], 9: ["تِسْعُون", "tisʿūn"],
};
export const HUNDREDS = {
  1: ["مِئَة", "miʾa"], 2: ["مِئَتَان", "miʾatān"], 3: ["ثَلَاثُمِئَة", "thalāthumiʾa"], 4: ["أَرْبَعُمِئَة", "arbaʿumiʾa"],
  5: ["خَمْسُمِئَة", "khamsumiʾa"], 6: ["سِتُّمِئَة", "sittumiʾa"], 7: ["سَبْعُمِئَة", "sabʿumiʾa"], 8: ["ثَمَانِمِئَة", "thamānimiʾa"], 9: ["تِسْعُمِئَة", "tisʿumiʾa"],
};
export const THOUSANDS = {
  1: ["أَلْف", "alf"], 2: ["أَلْفَان", "alfān"], 3: ["ثَلَاثَةُ آلَاف", "thalāthatu ālāf"], 4: ["أَرْبَعَةُ آلَاف", "arbaʿatu ālāf"],
  5: ["خَمْسَةُ آلَاف", "khamsatu ālāf"], 6: ["سِتَّةُ آلَاف", "sittatu ālāf"], 7: ["سَبْعَةُ آلَاف", "sabʿatu ālāf"],
  8: ["ثَمَانِيَةُ آلَاف", "thamāniyatu ālāf"], 9: ["تِسْعَةُ آلَاف", "tisʿatu ālāf"],
};

function under100(n) {
  if (n <= 10) return UNITS[n];
  if (n < 20) return TEENS[n];
  const t = Math.floor(n / 10), u = n % 10;
  if (!u) return TENS[t];
  return [UNITS[u][0] + " وَ" + TENS[t][0], UNITS[u][1] + " wa-" + TENS[t][1]];
}

/** 1250 → { ar: "أَلْف وَمِئَتَان وَخَمْسُون", tr: "alf wa-miʾatān wa-khamsūn" } (0–9999) */
export function words(n) {
  if (n === 0) return { ar: UNITS[0][0], tr: UNITS[0][1] };
  const th = Math.floor(n / 1000), h = Math.floor((n % 1000) / 100), r = n % 100, parts = [];
  if (th) parts.push(THOUSANDS[th]);
  if (h) parts.push(HUNDREDS[h]);
  if (r) parts.push(under100(r));
  return { ar: parts.map((p) => p[0]).join(" وَ"), tr: parts.map((p) => p[1]).join(" wa-") };
}

/** Lernbereiche – jeder wird einzeln gemeistert (MASTER_AT richtige Antworten). */
export const RANGES = [
  { key: "0-10", label: "0–10", min: 0, max: 10 },
  { key: "11-20", label: "11–20", min: 11, max: 20 },
  { key: "zehner", label: "Zehner", values: [10, 20, 30, 40, 50, 60, 70, 80, 90] },
  { key: "21-99", label: "21–99", min: 21, max: 99 },
  { key: "hunderter", label: "Hunderter", values: [100, 200, 300, 400, 500, 600, 700, 800, 900] },
  { key: "100-999", label: "100–999", min: 100, max: 999 },
  { key: "1000-9999", label: "1000–9999", min: 1000, max: 9999 },
];
export const MASTER_AT = 10;

/** Zufallszahl aus einem Bereich */
export const pickIn = (r) => r.values ? r.values[Math.floor(Math.random() * r.values.length)] : r.min + Math.floor(Math.random() * (r.max - r.min + 1));
/** Nachbar im Bereich (für Weiter/Zurück) */
export function stepIn(r, n, dir) {
  if (r.values) { const i = r.values.indexOf(n); return r.values[(i < 0 ? 0 : i + dir + r.values.length) % r.values.length]; }
  if (n < r.min || n > r.max) return r.min;
  const x = n + dir; return x > r.max ? r.min : x < r.min ? r.max : x;
}
export const inRange = (r, n) => r.values ? r.values.includes(n) : n >= r.min && n <= r.max;
