// =====================================================================
//  KONFIGURATION
//  Firebase: Konsole → Projekteinstellungen → Deine Apps → Web-App → Config
//  Solange hier "DEIN_..." steht, speichert die App nur im Browser.
// =====================================================================

export const firebaseConfig = {
  apiKey: "AIzaSyCJwoLkDn2W_uN-hlqjMk6kqbhKdZBPT_g",
  authDomain: "dar-a-87f01.firebaseapp.com",
  projectId: "dar-a-87f01",
  storageBucket: "dar-a-87f01.firebasestorage.app",
  messagingSenderId: "926469855723",
  appId: "1:926469855723:web:6676d875c756487afa61ae",
};

// Wie viele XP es pro richtiger Antwort gibt
export const XP_PER_CORRECT = 10;

// Ab wie viel Prozent gilt eine Rubrik als „abgeschlossen“ (für den Leitfaden)
export const DONE_AT = 80;

// =====================================================================
//  SPRACHAUSGABE – Standard: Web Speech API (Stimme des Geräts), nichts einzurichten.
//  Optional später: Cloud-Stimme (Ordner functions/)
//  Nach dem Deploy der Firebase-Funktion steht ihre Adresse im Terminal, z. B.
//  https://tts-abc123-ew.a.run.app  oder  https://europe-west1-DEIN_PROJEKT.cloudfunctions.net/tts
//  Solange hier "DEIN" steht, nutzt die App nur die Gerätestimme.
// =====================================================================
export const TTS_URL = "https://europe-west1-DEIN_PROJEKT.cloudfunctions.net/tts";  // noch nicht eingerichtet → Gerätestimme

// true  = immer die Cloud-Stimme (klingt auf allen Geräten gleich)
// false = Gerätestimme, Cloud nur wenn das Gerät keine arabische Stimme hat (spart Kosten)
export const TTS_PREFER_CLOUD = false;
