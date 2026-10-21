// =====================================================================
//  Firebase-Funktion "tts": spricht arabischen Text live mit Google Text-to-Speech.
//  Aufruf aus der App:  <TTS_URL>?text=السَّاعَةُ الثَّالِثَة
//  Antwort: MP3, wird vom Browser zwischengespeichert (gleicher Text = kein neuer Aufruf).
// =====================================================================
const { onRequest } = require("firebase-functions/v2/https");
const textToSpeech = require("@google-cloud/text-to-speech");

const client = new textToSpeech.TextToSpeechClient();
const cache = new Map();                     // kleiner Zwischenspeicher pro Instanz

// Stimme: ar-XA-Wavenet-B (männlich) · ar-XA-Wavenet-A / -D (weiblich) · ar-XA-Wavenet-C (männlich)
const VOICE = { languageCode: "ar-XA", name: "ar-XA-Wavenet-B" };

// Nur arabische Schrift, Vokalzeichen, Leerzeichen und Satzzeichen – schützt vor Missbrauch
const ALLOWED = /^[؀-ۿݐ-ݿࢠ-ࣿﭐ-﷿ﹰ-﻿\s.,!?،؟]+$/;

exports.tts = onRequest(
  { region: "europe-west1", cors: true, maxInstances: 3, memory: "256MiB" },
  async (req, res) => {
    const text = String(req.query.text || "").trim();
    if (!text || text.length > 200 || !ALLOWED.test(text)) {
      res.status(400).send("Nur arabischer Text bis 200 Zeichen.");
      return;
    }
    try {
      let mp3 = cache.get(text);
      if (!mp3) {
        const [r] = await client.synthesizeSpeech({
          input: { text },
          voice: VOICE,
          audioConfig: { audioEncoding: "MP3", speakingRate: 0.9 },
        });
        mp3 = r.audioContent;
        if (cache.size > 500) cache.clear();
        cache.set(text, mp3);
      }
      res.set("Content-Type", "audio/mpeg");
      res.set("Cache-Control", "public, max-age=31536000, immutable");
      res.send(Buffer.from(mp3));
    } catch (e) {
      console.error(e);
      res.status(500).send("Sprachausgabe fehlgeschlagen.");
    }
  }
);
