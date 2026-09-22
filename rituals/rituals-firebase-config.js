// Firebase config for the Rituals "sign in with Google" + synced saved list.
//
// This file is safe to commit — Firebase web config values are not secret,
// they just identify which project to talk to (access is controlled by
// Firebase Auth + your Firestore security rules, not by hiding this object).
//
// TO ACTIVATE SIGN-IN:
// 1. Go to https://console.firebase.google.com and create a free project
//    (no credit card needed for this usage level).
// 2. In the project, go to Build > Authentication > Sign-in method,
//    enable "Google" as a sign-in provider.
// 3. Go to Build > Firestore Database > Create database (start in
//    "production mode", pick any region).
// 4. In Firestore > Rules, replace the default rules with:
//      rules_version = '2';
//      service cloud.firestore {
//        match /databases/{database}/documents {
//          match /savedRituals/{uid} {
//            allow read, write: if request.auth != null && request.auth.uid == uid;
//          }
//        }
//      }
//    then click Publish. This means each signed-in user can only read/write
//    their own saved list — nothing is public.
// 5. Go to Project settings (gear icon) > General > Your apps > Add app > Web,
//    register the app, and copy the firebaseConfig object it gives you into
//    the object below, replacing the placeholder values.
// 6. In Authentication > Settings > Authorized domains, add:
//      www.workwellcards.com
//
// Google sign-in works for both personal Gmail accounts and Google
// Workspace / enterprise accounts automatically — no extra setup needed
// for that part.
//
// Configured 2026-09-22 against the "workwell-rituals" Firebase project
// (Firestore in europe-west2/London, Google sign-in enabled, security
// rules published, www.workwellcards.com added as an authorized domain).

window.WW_FIREBASE_CONFIG = {
  apiKey: "AIzaSyBM9sRZbt8C5DV5i1sp-tdvLDDgjkk9xf8",
  authDomain: "workwell-rituals.firebaseapp.com",
  projectId: "workwell-rituals",
  storageBucket: "workwell-rituals.firebasestorage.app",
  messagingSenderId: "781814282065",
  appId: "1:781814282065:web:00846768cfe35626ec0570"
};
