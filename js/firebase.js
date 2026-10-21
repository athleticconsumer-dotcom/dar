// =====================================================================
//  FIREBASE – Anmeldung + Speichern des Fortschritts in Firestore.
//  Jeder Besucher wird automatisch anonym angemeldet (Fortschritt pro Gerät).
//  „Mit Google anmelden“ wandelt das anonyme Konto in ein Google-Konto um,
//  der bisherige Fortschritt bleibt erhalten und ist auf allen Geräten da.
// =====================================================================
import { firebaseConfig } from "./config.js";
import { store } from "./store.js";

const V = "10.12.2";
const $ = (s) => document.querySelector(s);
const ui = (on, text) => { $("#syncDot").classList.toggle("on", on); $("#syncText").textContent = text; };

export async function startFirebase() {
  if (!firebaseConfig.apiKey || firebaseConfig.apiKey.startsWith("DEIN")) {
    ui(false, "Fortschritt wird nur in diesem Browser gespeichert (Firebase noch nicht eingerichtet).");
    return;
  }

  let fb;
  try {
    const [appMod, authMod, fsMod] = await Promise.all([
      import(`https://www.gstatic.com/firebasejs/${V}/firebase-app.js`),
      import(`https://www.gstatic.com/firebasejs/${V}/firebase-auth.js`),
      import(`https://www.gstatic.com/firebasejs/${V}/firebase-firestore.js`),
    ]);
    fb = { ...appMod, ...authMod, ...fsMod };
  } catch (e) {
    ui(false, "Offline – Fortschritt wird lokal gespeichert.");
    return;
  }

  const app = fb.initializeApp(firebaseConfig);
  const auth = fb.getAuth(app);
  const db = fb.getFirestore(app);
  const provider = new fb.GoogleAuthProvider();
  let uid = null, timer = null, preferRemote = false;

  const showUser = (user) => {
    $("#loginBtn").hidden = !user.isAnonymous;
    $("#logoutBtn").hidden = user.isAnonymous;
    ui(true, user.isAnonymous
      ? "Fortschritt gespeichert. Melde dich an, um ihn auf allen Geräten zu nutzen."
      : "Angemeldet als " + (user.displayName || user.email || "Google-Konto") + " – Fortschritt wird synchronisiert.");
  };

  const pushNow = (data) =>
    fb.setDoc(fb.doc(db, "users", uid), { ...data, updatedAt: fb.serverTimestamp() })
      .catch((e) => ui(false, "Speichern fehlgeschlagen (" + e.code + ")."));

  // Nach jeder Änderung speichern – gebündelt, damit nicht jeder Klick schreibt
  store.setCloudSaver((data) => {
    if (!uid) return;
    clearTimeout(timer);
    timer = setTimeout(() => pushNow(data), 1000);
  });

  async function sync(user) {
    uid = user.uid;
    try {
      const snap = await fb.getDoc(fb.doc(db, "users", uid));
      const taken = snap.exists() && store.applyRemote(snap.data(), preferRemote);
      preferRemote = false;
      if (!taken) pushNow(store.get());            // dieses Gerät ist weiter → hochladen
    } catch (e) { ui(false, "Fortschritt konnte nicht geladen werden (" + e.code + ")."); }
  }

  fb.onAuthStateChanged(auth, async (user) => {
    if (!user) {
      fb.signInAnonymously(auth).catch((e) => ui(false, "Anmeldung fehlgeschlagen (" + e.code + ")."));
      return;
    }
    showUser(user);
    await sync(user);
  });

  $("#loginBtn").onclick = async () => {
    try {
      const res = await fb.linkWithPopup(auth.currentUser, provider);
      showUser(res.user);
      pushNow(store.get());
    } catch (e) {
      if (e.code === "auth/credential-already-in-use") {
        // Dieses Google-Konto hat schon Fortschritt → den laden (ersetzt den anonymen)
        preferRemote = true;
        try { await fb.signInWithPopup(auth, provider); } catch (e2) { preferRemote = false; }
      } else if (e.code !== "auth/popup-closed-by-user" && e.code !== "auth/cancelled-popup-request") {
        ui(false, "Anmeldung fehlgeschlagen (" + e.code + ").");
      }
    }
  };

  $("#logoutBtn").onclick = async () => {
    clearTimeout(timer);
    store.clearLocal();          // Gerät leeren, damit die nächste Person neu startet
    await fb.signOut(auth);
  };
}
