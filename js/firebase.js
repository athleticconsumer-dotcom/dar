// =====================================================================
//  FIREBASE – Anmeldung + Speichern des Fortschritts in Firestore.
//  Jeder Besucher wird automatisch anonym angemeldet (Fortschritt pro Gerät).
//  „Mit Google anmelden“ wandelt das anonyme Konto in ein Google-Konto um,
//  der bisherige Fortschritt bleibt erhalten und ist auf allen Geräten da.
// =====================================================================
import { firebaseConfig } from "./config.js";
import { store } from "./store.js";
import { t, onLang } from "./i18n.js";

const V = "10.12.2";
const $ = (s) => document.querySelector(s);
let last = null;   // letzte Statusmeldung, wird bei Sprachwechsel neu übersetzt
const ui = (on, key, vars) => {
  last = [on, key, vars];
  const el = $("#syncText"); el.removeAttribute("data-i18n");
  $("#syncDot").classList.toggle("on", on); el.textContent = t(key, vars);
};
onLang(() => { if (last) ui(...last); });

export async function startFirebase() {
  if (!firebaseConfig.apiKey || firebaseConfig.apiKey.startsWith("DEIN")) {
    ui(false, "fb.local");
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
    ui(false, "fb.offline");
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
    if (user.isAnonymous) ui(true, "fb.anon");
    else ui(true, "fb.signedIn", { name: user.displayName || user.email || t("fb.account") });
  };

  const pushNow = (data) =>
    fb.setDoc(fb.doc(db, "users", uid), { ...data, updatedAt: fb.serverTimestamp() })
      .catch((e) => ui(false, "fb.saveFail", { code: e.code }));

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
    } catch (e) { ui(false, "fb.loadFail", { code: e.code }); }
  }

  fb.onAuthStateChanged(auth, async (user) => {
    if (!user) {
      fb.signInAnonymously(auth).catch((e) => ui(false, "fb.loginFail", { code: e.code }));
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
        ui(false, "fb.loginFail", { code: e.code });
      }
    }
  };

  $("#logoutBtn").onclick = async () => {
    clearTimeout(timer);
    store.clearLocal();          // Gerät leeren, damit die nächste Person neu startet
    await fb.signOut(auth);
  };
}
