// =====================================================================
//  KONFIGURATION
//  Firebase: Konsole → Projekteinstellungen → Deine Apps → Web-App → Config
//  Solange hier "DEIN_..." steht, speichert die App nur im Browser.
// =====================================================================

export const firebaseConfig = {
  apiKey: "DEIN_API_KEY",
  authDomain: "DEIN_PROJEKT.firebaseapp.com",
  projectId: "DEIN_PROJEKT",
  storageBucket: "DEIN_PROJEKT.appspot.com",
  messagingSenderId: "000000000000",
  appId: "1:000000000000:web:xxxxxxxxxxxxxx",
};

// Wie viele XP es pro richtiger Antwort gibt
export const XP_PER_CORRECT = 10;

// Ab wie viel Prozent gilt eine Rubrik als „abgeschlossen“ (für den Leitfaden)
export const DONE_AT = 80;

// =====================================================================
//  SPRACHAUSGABE (Cloud)
//  Nach dem Deploy der Firebase-Funktion steht ihre Adresse im Terminal, z. B.
//  https://tts-abc123-ew.a.run.app  oder  https://europe-west1-DEIN_PROJEKT.cloudfunctions.net/tts
//  Solange hier "DEIN" steht, nutzt die App nur die Gerätestimme.
// =====================================================================
export const TTS_URL = "https://europe-west1-DEIN_PROJEKT.cloudfunctions.net/tts";

// true  = immer die Cloud-Stimme (klingt auf allen Geräten gleich)
// false = Gerätestimme, Cloud nur wenn das Gerät keine arabische Stimme hat (spart Kosten)
export const TTS_PREFER_CLOUD = true;
