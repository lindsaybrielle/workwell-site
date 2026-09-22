// Firebase config for the Rituals "Save to my list" flow.
//
// This file is safe to commit — Firebase web config values are not secret,
// they just identify which project to talk to (access is controlled by
// Firebase Auth + your Firestore security rules, not by hiding this object).
//
// How sign-in works now: there's no standalone "Sign in with Google" button.
// Clicking "Save to my list" checks if you're signed in; if not, it opens
// the Google sign-in popup right then, and once you're signed in, the item
// saves to your account. Every save is also logged to a write-only
// `submissions` collection — a full activity log across all users, visible
// only to the project owner in the Firebase console (Firestore > Data),
// never to site visitors.
//
// Security rules published on the "workwell-rituals" project:
//   rules_version = '2';
//   service cloud.firestore {
//     match /databases/{database}/documents {
//       match /savedRituals/{uid} {
//         allow read, write: if request.auth != null && request.auth.uid == uid;
//       }
//       match /submissions/{submissionId} {
//         allow create: if request.auth != null && request.resource.data.uid == request.auth.uid;
//         allow read, update, delete: if false;
//       }
//     }
//   }
// `savedRituals/{uid}` is each user's own private list (read/write only by
// them). `submissions` is create-only from the client — nobody, including a
// signed-in user, can read, edit or delete entries in it; only the project
// owner can browse it via the Firebase console.
//
// Google sign-in works for both personal Gmail accounts and Google
// Workspace / enterprise accounts automatically — no extra setup needed
// for that part.
//
// Configured 2026-09-22 against the "workwell-rituals" Firebase project
// (Firestore in europe-west2/London, Google sign-in enabled, security
// rules published above, www.workwellcards.com added as an authorized
// domain, web app registered).

window.WW_FIREBASE_CONFIG = {
  apiKey: "AIzaSyBM9sRZbt8C5DV5i1sp-tdvLDDgjkk9xf8",
  authDomain: "workwell-rituals.firebaseapp.com",
  projectId: "workwell-rituals",
  storageBucket: "workwell-rituals.firebasestorage.app",
  messagingSenderId: "781814282065",
  appId: "1:781814282065:web:00846768cfe35626ec0570"
};
