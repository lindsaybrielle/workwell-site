// Settings for the Workwell Discovery quiz.
//
// endpoint: the Google Apps Script web app URL that saves responses to the
// Google Sheet and emails the PDF from brielle@strousehouse.co. Setup steps
// are in apps-script/README.md. While it's empty, the quiz still works and
// unlocks results on screen, but nothing is saved or emailed.
//
// Links (Calendly, Etsy, discount code) live in content.json under "links",
// because the email script reads that file too.
window.WW_DISCOVERY_CONFIG = {
  endpoint: '',
  // Bump this whenever the consent wording on the page changes, so each saved
  // response records which wording the person agreed to.
  consentVersion: '2026-10-v1'
};
