/**
 * Workwell Discovery backend (Google Apps Script).
 *
 * Bound to a Google Sheet in brielle@strousehouse.co's Google Workspace.
 * Deployed as a web app, it:
 *   - saves each unlocked result to the "Responses" tab,
 *   - emails the person a PDF of their results from brielle@strousehouse.co,
 *   - logs anonymous quiz events (start, complete, clicks) to the "Events" tab,
 *   - deletes rows older than RETENTION_DAYS once a day.
 *
 * Everything the email says comes from the live content.json on the website,
 * looked up by archetype key. The browser never decides what the email says,
 * so the endpoint can't be used to send arbitrary messages from Brielle's
 * address. Setup steps are in README.md next to this file.
 */

const CONTENT_URL = 'https://www.workwellcards.com/discovery/content.json';
const SENDER_NAME = 'Brielle at Workwell';
const RESPONSES_SHEET = 'Responses';
const EVENTS_SHEET = 'Events';
const RETENTION_DAYS = 365;
// One results email per address per 10 minutes, to stop the form being used
// to flood someone's inbox.
const RESEND_COOLDOWN_SECONDS = 600;

const RESPONSE_HEADERS = [
  'Timestamp', 'ID', 'Mode', 'Email', 'Marketing consent', 'Consent version', 'Content version',
  'Context', 'Archetype', 'Team Weather', 'Energy', 'Meaning', 'Connection', 'Satisfaction',
  'Enjoyment', 'Coherence', 'Significance', 'Purpose', 'Enablers', 'Practices (how often)', 'Practices other', 'Answers (JSON)', 'Emailed'
];
const EVENT_HEADERS = ['Timestamp', 'ID', 'Event', 'Target'];
const EVENT_TYPES = ['start', 'complete', 'click'];

// ---------- entry points ----------

function doPost(e) {
  try {
    const raw = (e && e.postData && e.postData.contents) || '';
    if (raw.length > 20000) return json({ ok: false, error: 'too_large' });
    const body = JSON.parse(raw);
    if (body.action === 'event') return json(handleEvent(body));
    if (body.action === 'submit') return json(handleSubmit(body));
    return json({ ok: false, error: 'unknown_action' });
  } catch (err) {
    console.error(err);
    return json({ ok: false, error: 'server_error' });
  }
}

function doGet() {
  return json({ ok: true, service: 'workwell-discovery' });
}

// Run once from the editor after pasting this file in: creates the tabs and
// the daily clean-up trigger.
function setup() {
  sheet(RESPONSES_SHEET, RESPONSE_HEADERS);
  sheet(EVENTS_SHEET, EVENT_HEADERS);
  ScriptApp.getProjectTriggers()
    .filter(t => t.getHandlerFunction() === 'purgeOldRows')
    .forEach(t => ScriptApp.deleteTrigger(t));
  ScriptApp.newTrigger('purgeOldRows').timeBased().everyDays(1).atHour(3).create();
}

// Sends a sample results email to yourself so you can check how it looks.
function sendTestEmail() {
  const c = loadContent(true);
  const me = Session.getActiveUser().getEmail();
  sendResults(c, me, {
    mode: 'self', archetype: 'ember', weather: 'changeable', context: 'lead',
    scores: { energy: 33, meaning: 75, connection: 55, satisfaction: 67, enjoyment: 44, coherence: 75, significance: 83, purpose: 67 },
    enablers: ['recovery', 'trust', 'workload'], practices: { breathwork: 2, nature: 1, sleep: 0 }, practicesOther: ''
  });
}

// ---------- handlers ----------

function handleEvent(b) {
  if (EVENT_TYPES.indexOf(b.event) === -1) return { ok: false };
  sheet(EVENTS_SHEET, EVENT_HEADERS).appendRow([
    new Date(), cleanId(b.id), b.event, safeCell(String(b.target || '').replace(/[^\w:\-]/g, '').slice(0, 60))
  ]);
  return { ok: true };
}

function handleSubmit(b) {
  // Honeypot: real people never fill the hidden "website" field.
  if (b.website) return { ok: true };

  const c = loadContent(false);
  const email = String(b.email || '').trim().slice(0, 254);
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return { ok: false, error: 'bad_email' };
  if (b.consentResults !== true) return { ok: false, error: 'no_consent' };

  const mode = b.mode === 'team' ? 'team' : b.mode === 'self' ? 'self' : null;
  if (!mode) return { ok: false, error: 'bad_mode' };
  if (!c.archetypes[b.archetype]) return { ok: false, error: 'bad_archetype' };
  if (!c.teamWeather.readings[b.weather]) return { ok: false, error: 'bad_weather' };

  const q = byId(c.questions);
  const contextValues = q.context[mode].options.map(o => o.value);
  const enablerValues = q.enablers.options.map(o => o.value);

  const data = {
    mode,
    archetype: b.archetype,
    weather: b.weather,
    context: contextValues.indexOf(b.context) !== -1 ? b.context : '',
    scores: {},
    enablers: pick(b.enablers, enablerValues).slice(0, 3),
    practices: cleanFreq(b.practices, q.practices),
    practicesOther: String(b.practicesOther || '').replace(/\s+/g, ' ').trim().slice(0, 80)
  };
  ['energy', 'meaning', 'connection', 'satisfaction', 'enjoyment', 'coherence', 'significance', 'purpose']
    .forEach(k => { data.scores[k] = clampScore(b.scores && b.scores[k]); });

  const answers = cleanAnswers(b.answers, c.questions, mode);

  let emailed = false;
  const cache = CacheService.getScriptCache();
  const coolKey = 'sent:' + email.toLowerCase();
  if (!cache.get(coolKey) && MailApp.getRemainingDailyQuota() > 5) {
    sendResults(c, email, data);
    cache.put(coolKey, '1', RESEND_COOLDOWN_SECONDS);
    emailed = true;
  }

  sheet(RESPONSES_SHEET, RESPONSE_HEADERS).appendRow([
    new Date(), cleanId(b.id), mode, safeCell(email), b.consentMarketing === true ? 'yes' : 'no',
    safeCell(String(b.consentVersion || '').slice(0, 30)), safeCell(String(b.contentVersion || '').slice(0, 30)),
    data.context, data.archetype, data.weather,
    data.scores.energy, data.scores.meaning, data.scores.connection, data.scores.satisfaction,
    data.scores.enjoyment, data.scores.coherence, data.scores.significance, data.scores.purpose,
    data.enablers.join(', '),
    Object.keys(data.practices).map(k => k + ': ' + q.practices.scale[data.practices[k]].toLowerCase()).join(', '),
    safeCell(data.practicesOther), JSON.stringify(answers), emailed ? 'yes' : 'no'
  ]);

  return { ok: true, emailed };
}

// ---------- email + PDF ----------

function sendResults(c, email, d) {
  const a = c.archetypes[d.archetype];
  const team = d.mode === 'team';
  const subject = (team ? 'Your team\'s Workwell Discovery result: ' : 'Your Workwell Discovery result: ') + a.name;
  const pdf = Utilities.newBlob(reportHtml(c, d), MimeType.HTML)
    .getAs(MimeType.PDF)
    .setName('Workwell Discovery - ' + a.name + '.pdf');

  const L = c.links;
  const html =
    '<div style="font-family:Arial,Helvetica,sans-serif;color:#1f3536;max-width:560px;line-height:1.55">' +
      '<p>Hi there,</p>' +
      '<p>Thanks for taking the Workwell Discovery. ' + (team ? 'Your team reads as' : 'Your result is') +
        ' <strong style="color:' + esc(a.color) + '">' + esc(a.name) + '</strong>: ' + esc(a.tagline.toLowerCase()) + '.</p>' +
      '<p>' + esc(a[d.mode].summary) + '</p>' +
      '<p>Your full results are attached as a PDF, including your scores, your Team Weather reading and three practices to try this week.</p>' +
      (L.discountCode ? '<p>As a thank you, use code <strong>' + esc(L.discountCode) + '</strong>' + (L.discountLabel ? ' for ' + esc(L.discountLabel) : '') + ' on the Workwell card decks.</p>' : '') +
      '<p>If you\'d like to talk your result through, you can book a free 30-minute call with me here: ' +
        '<a href="' + esc(L.calendly) + '" style="color:#235f72">' + esc(L.calendly) + '</a></p>' +
      '<p>Warmly,<br>Brielle<br>Workwell &middot; <a href="https://www.workwellcards.com" style="color:#235f72">workwellcards.com</a></p>' +
      '<p style="font-size:12px;color:#6b7b7c">You\'re getting this because you asked for your results at workwellcards.com/discovery. ' +
        'To have your answers deleted, just reply to this email.</p>' +
    '</div>';

  const text = 'Thanks for taking the Workwell Discovery. ' + (team ? 'Your team reads as ' : 'Your result is ') + a.name +
    ': ' + a.tagline + '.\n\n' + a[d.mode].summary + '\n\nYour full results are attached as a PDF.\n\n' +
    'Book a free 30-minute call: ' + L.calendly + '\n\nWarmly,\nBrielle\nWorkwell';

  GmailApp.sendEmail(email, subject, text, { htmlBody: html, attachments: [pdf], name: SENDER_NAME });
}

function reportHtml(c, d) {
  const a = c.archetypes[d.archetype];
  const m = d.mode;
  const team = m === 'team';
  const s = d.scores;
  const L = c.links;
  const q = byId(c.questions);
  const enablerLabel = v => (q.enablers.options.filter(o => o.value === v)[0] || {}).label || v;
  const w = c.teamWeather.readings[d.weather];

  // Labels starting with two spaces are meaning facets, shown indented under Meaning.
  const bar = (label, v, note) =>
    '<tr><td style="padding:6px 0 6px ' + (label.indexOf('  ') === 0 ? '18px;font-weight:normal' : '0;font-weight:bold') + ';width:150px">' + esc(label.trim()) + '</td>' +
    '<td style="padding:6px 0"><div style="background:#e6e3da;height:10px;width:300px"><div style="background:#3b7a9c;height:10px;width:' + (v * 3) + 'px"></div></div>' +
    (note ? '<div style="font-size:10px;color:#6b7b7c">' + esc(note) + '</div>' : '') + '</td>' +
    '<td style="padding:6px 0 6px 10px;font-weight:bold">' + v + '</td></tr>';

  const h2 = t => '<h2 style="font-family:Georgia,serif;color:#235f72;font-size:20px;margin:26px 0 8px">' + esc(t) + '</h2>';
  const p = t => '<p style="margin:0 0 10px">' + esc(t) + '</p>';

  const decks = (d.archetype === 'ember' ? ['restore'] : d.archetype === 'fog' ? ['restore', 'connection'] : ['connection'])
    .map(k => '<li style="margin-bottom:6px"><strong>' + esc(c.decks[k].name) + '</strong>: ' + esc(c.decks[k].line) +
      ' <a href="' + esc(k === 'restore' ? L.etsyRestore : L.etsyConnection) + '" style="color:#d98c0c">Buy here</a></li>').join('');

  const practiceName = k => k === 'other' && d.practicesOther ? d.practicesOther : (c.practiceLabels[k] || k);
  const usedOften = Object.keys(d.practices).filter(k => d.practices[k] === 2).map(practiceName);
  const usedSometimes = Object.keys(d.practices).filter(k => d.practices[k] === 1).map(practiceName);
  const TW = c.teamWeather;
  const list = items => '<ul style="padding-left:18px;margin:4px 0 10px">' + items.map(t => '<li style="margin-bottom:4px">' + esc(t) + '</li>').join('') + '</ul>';

  return '<html><head><meta charset="utf-8"></head><body style="font-family:Arial,Helvetica,sans-serif;color:#1f3536;font-size:12px;line-height:1.5;margin:28px">' +
    '<div style="background:' + esc(a.color) + ';color:#fff;padding:22px 24px">' +
      '<div style="font-size:10px;letter-spacing:2px;text-transform:uppercase">Workwell Discovery &middot; ' + (team ? 'Team result' : 'Your result') + '</div>' +
      '<div style="font-family:Georgia,serif;font-size:38px;margin-top:6px">' + esc(a.name) + '</div>' +
      '<div style="font-size:15px;font-weight:bold">' + esc(a.tagline) + '</div>' +
      '<p style="margin:10px 0 0;font-size:13px">' + esc(a[m].summary) + '</p>' +
    '</div>' +

    h2(team ? 'Inside a ' + a.name + ' team' : 'Inside ' + a.name) + p(a[m].detail) +
    '<p style="background:#f6e6bd;padding:10px 12px"><strong>What you can expect:</strong> ' + esc(a[m].outcome) + '</p>' +

    h2('Your scores') +
    '<table style="border-collapse:collapse">' +
      bar('Energy', s.energy, 'How replenished or depleted things feel') +
      bar('Meaning', s.meaning) +
      bar('  Coherence', s.coherence, 'The work makes sense') +
      bar('  Significance', s.significance, 'The work matters') +
      bar('  Purpose', s.purpose, 'Goals worth caring about') +
      bar('Connection', s.connection, 'Belonging and safety to speak up') +
    '</table>' +

    h2('Your happiness mix') +
    p('Arthur Brooks describes happiness as a mix of enjoyment, satisfaction and meaning.') +
    '<table style="border-collapse:collapse">' +
      bar('Enjoyment', s.enjoyment, 'Energy and connection in the day-to-day') +
      bar('Satisfaction', s.satisfaction, 'The reward of progress after effort') +
      bar('Meaning', s.meaning, 'Coherence, significance and purpose') +
    '</table>' +

    h2('Team Weather: ' + w.name) + p(c.teamWeather.intro[m]) + p(w[m]) +
    '<h3 style="font-family:Georgia,serif;color:#235f72;font-size:15px;margin:16px 0 6px">The five elements of Team Weather</h3>' +
    p(TW.whyFive) +
    TW.elements.map(e => '<p style="margin:0 0 8px"><strong style="color:#235f72">' + esc(e.name) + '.</strong> ' + esc(e.text) + ' ' + esc(e.why) + '</p>').join('') +
    '<h3 style="font-family:Georgia,serif;color:#235f72;font-size:15px;margin:16px 0 6px">What you can expect when you navigate it well</h3>' +
    '<p style="margin:0"><strong>For leaders</strong></p>' + list(TW.expect.leaders) +
    '<p style="margin:0"><strong>For individuals</strong></p>' + list(TW.expect.individuals) +

    (d.enablers.length ? h2('What needs to be true') +
      '<ul style="padding-left:18px">' + d.enablers.map(v =>
        '<li style="margin-bottom:6px"><strong>' + esc(enablerLabel(v)) + '.</strong> ' + esc(c.enablerTips[v] || '') + '</li>').join('') + '</ul>' : '') +

    h2('Three practices for ' + a.name) +
    a.exercises.map((ex, i) =>
      '<div style="border:1px solid #ddd8cb;padding:12px 14px;margin-bottom:8px">' +
        '<div style="font-size:10px;letter-spacing:1px;text-transform:uppercase;color:#a1657f">0' + (i + 1) + ' &middot; ' + esc(ex.source) + ' &middot; ' + ex.minutes + ' min</div>' +
        '<div style="font-family:Georgia,serif;font-size:15px;color:#235f72;margin-top:2px">' + esc(ex.title) + '</div>' +
        '<p style="margin:6px 0 0">' + esc(ex[m]) + '</p>' +
      '</div>').join('') +
    (usedOften.length ? p((team ? 'Your team often uses ' : 'You often use ') + listJoin(usedOften) + '. Build on what works.')
      : usedSometimes.length ? p((team ? 'Your team sometimes uses ' : 'You sometimes use ') + listJoin(usedSometimes) + '. Turning one of these into a regular habit is a strong first step.') : '') +

    h2('Explore 50 exercises and prompts matched to your result') +
    (L.discountCode ? p('Your discovery discount: use code ' + L.discountCode + (L.discountLabel ? ' for ' + L.discountLabel : '') + ' at checkout.') : '') +
    '<ul style="padding-left:18px">' + decks + '</ul>' +

    h2('Next steps') +
    p(c.teamReport.name + ': ' + c.teamReport.line) +
    '<p>Book a free 30-minute discovery call with Brielle: <a href="' + esc(L.calendly) + '" style="color:#235f72">' + esc(L.calendly) + '</a></p>' +

    (s.energy < 50 ? '<p style="background:#f1dee5;padding:10px 12px;margin-top:18px">' + esc(c.support) + '</p>' : '') +
    '<p style="font-size:10px;color:#6b7b7c;margin-top:18px">' + esc(c.disclaimer) + '</p>' +
    '<p style="font-size:10px;color:#6b7b7c">Workwell &middot; workwellcards.com &middot; ' + esc(L.contactEmail) + '</p>' +
  '</body></html>';
}

// ---------- retention ----------

function purgeOldRows() {
  const cutoff = new Date(Date.now() - RETENTION_DAYS * 24 * 60 * 60 * 1000);
  [RESPONSES_SHEET, EVENTS_SHEET].forEach(name => {
    const sh = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(name);
    if (!sh || sh.getLastRow() < 2) return;
    const dates = sh.getRange(2, 1, sh.getLastRow() - 1, 1).getValues();
    // Rows are appended in time order, so count the old ones from the top.
    let old = 0;
    while (old < dates.length && new Date(dates[old][0]) < cutoff) old++;
    if (old > 0) sh.deleteRows(2, old);
  });
}

// ---------- helpers ----------

function loadContent(fresh) {
  const cache = CacheService.getScriptCache();
  const hit = !fresh && cache.get('content');
  if (hit) return JSON.parse(hit);
  const text = UrlFetchApp.fetch(CONTENT_URL, { muteHttpExceptions: false }).getContentText();
  const parsed = JSON.parse(text);
  if (text.length < 95000) cache.put('content', text, 3600);
  return parsed;
}

function sheet(name, headers) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sh = ss.getSheetByName(name);
  if (!sh) {
    sh = ss.insertSheet(name);
    sh.appendRow(headers);
    sh.setFrozenRows(1);
  }
  return sh;
}

function byId(questions) {
  const out = {};
  questions.forEach(q => { out[q.id] = q; });
  return out;
}

function pick(list, allowed) {
  if (!Array.isArray(list)) return [];
  return list.filter((v, i) => allowed.indexOf(v) !== -1 && list.indexOf(v) === i);
}

function cleanAnswers(answers, questions, mode) {
  const out = {};
  if (!answers || typeof answers !== 'object') return out;
  questions.forEach(q => {
    const v = answers[q.id];
    if (q.type === 'multi') {
      out[q.id] = pick(v, q.options.map(o => o.value));
    } else if (q.type === 'grid') {
      out[q.id] = cleanFreq(v, q);
    } else {
      const n = q.type === 'agree' ? 5 : q[mode].options.length;
      if (Number.isInteger(v) && v >= 0 && v < n) out[q.id] = v;
    }
  });
  return out;
}

// Keeps only known practices with a valid Never / Occasionally / Often index.
function cleanFreq(v, q) {
  const out = {};
  if (!v || typeof v !== 'object') return out;
  q.options.forEach(o => {
    const x = v[o.value];
    if (Number.isInteger(x) && x >= 0 && x < q.scale.length) out[o.value] = x;
  });
  return out;
}

// "a, b and c"
function listJoin(items) {
  return items.length < 2 ? items.join('') : items.slice(0, -1).join(', ') + ' and ' + items[items.length - 1];
}

function clampScore(v) {
  const n = Math.round(Number(v));
  return isFinite(n) ? Math.max(0, Math.min(100, n)) : '';
}

function cleanId(id) {
  return String(id || '').replace(/[^\w\-]/g, '').slice(0, 64);
}

// Stops anything typed into the form being read as a spreadsheet formula.
function safeCell(s) {
  return /^[=+\-@]/.test(s) ? "'" + s : s;
}

function esc(s) {
  return String(s == null ? '' : s)
    .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

function json(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(ContentService.MimeType.JSON);
}
