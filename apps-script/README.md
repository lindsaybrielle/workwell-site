# Workwell Discovery: email and data setup

`Code.gs` is a Google Apps Script that runs inside the brielle@strousehouse.co Google Workspace account. It does three things:

- saves every unlocked result to a Google Sheet
- emails the person a PDF of their results from brielle@strousehouse.co
- deletes rows older than 12 months

It's free, and it doesn't need any other services. Setup takes about 15 minutes.

## 1. Publish the site first

The script reads the quiz content (archetypes, practices, links) from `https://www.workwellcards.com/discovery/content.json`. Merge this branch into `main` so that file is live before you test emails.

## 2. Create the sheet and script

1. Signed in as **brielle@strousehouse.co**, create a new Google Sheet called **Workwell Discovery responses**.
2. In the sheet, open **Extensions → Apps Script**.
3. Delete the starter code, paste in everything from `Code.gs`, and click **Save**.
4. In the function dropdown at the top, choose **setup** and click **Run**. Google will ask for permissions: the script needs your Sheet, Gmail (to send results) and external requests (to read content.json). Approve them.
   - `setup` creates the **Responses** and **Events** tabs and a daily clean-up job.
5. Choose **sendTestEmail** and click **Run**. Check your inbox for a sample Ember result with the PDF attached.

## 3. Deploy it as a web app

1. Click **Deploy → New deployment**. Under "Select type" (the cog), choose **Web app**.
2. Set **Execute as: Me (brielle@strousehouse.co)** and **Who has access: Anyone**. "Anyone" lets website visitors send in their results; they never get access to the sheet.
3. Click **Deploy** and copy the **Web app URL** (it ends in `/exec`).
4. Paste it into `discovery/discovery-config.js` as the `endpoint` value, then commit and publish.

If you change `Code.gs` later, use **Deploy → Manage deployments → Edit → Version: New version** so the URL stays the same.

## 4. Optional: an Etsy discount for quiz-takers

Create a coupon in Etsy (**Shop Manager → Marketing → Sales and discounts → Create a promo code**). Put the code and a short label (e.g. `15% off`) in `discovery/content.json` under `links.discountCode` and `links.discountLabel`. It then appears on the results page and in the email.

## What lands in the sheet

- **Responses**: one row per unlocked result, with these columns:
  - email
  - marketing consent (yes/no)
  - the consent wording version
  - mode (self/team)
  - team size or role
  - archetype and Team Weather
  - all scores
  - their top 3 "what needs to be true"
  - how often they use each practice, plus anything they typed under "Other"
  - the raw answers
- **Events**: anonymous funnel events, with no email attached:
  - `start`: someone started the quiz (self or team)
  - `complete`: someone finished it (mode and archetype)
  - `click`: someone clicked a link on the results page, e.g. `etsy-restore`, `etsy-connection`, `calendly-top`, `calendly-bottom` or `team-report`

  Compare `complete` with Responses to see how many people unlock their results. Count `etsy-*` clicks to see how many go on to Etsy.

To build your mailing list, filter **Responses** by *Marketing consent = yes*. Only email people who said yes.

## Data protection to-dos

These come from the research report and still need doing outside the code:

- [ ] **Pay the ICO data protection fee** (Tier 1, £52 a year, or £47 by Direct Debit) at ico.org.uk/fee, if you haven't already.
- [ ] **Write a short DPIA** (data protection impact assessment). The ICO's free template is enough, and wellbeing data plus workplace use makes one likely to be required.
- [ ] **Add your legal name or trading name** to the "Who we are" section of `privacy/index.html`.
- [ ] **Add a cookie consent banner for Google Analytics** on the homepage and Rituals page, or switch to a cookieless analytics tool. The Discovery pages already run without Google Analytics.
- [ ] **Handle deletion requests within a month:** find the email in **Responses**, delete the row, and reply to confirm.
- [ ] **Ask a lawyer to review** the points flagged in the research report, especially whether the follow-up email counts as marketing and how the paid team report should handle consent.
