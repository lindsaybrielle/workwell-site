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
// Until you do this, the placeholder values below mean the "Sign in with
// Google" button stays visible but disabled, and saved combinations keep
// working exactly as before — saved locally in this browser only.

window.WW_FIREBASE_CONFIG = {
  apiKey: "YOUR_FIREBASE_API_KEY",
  authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_PROJECT_ID.appspot.com",
  messagingSenderId: "YOUR_SENDER_ID",
  appId: "YOUR_APP_ID"
};
