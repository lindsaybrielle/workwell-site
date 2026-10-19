(function () {
  const CONFIG = window.WW_DISCOVERY_CONFIG || {};
  const ENDPOINT = (CONFIG.endpoint || '').trim();

  const screens = {
    intro: document.getElementById('screen-intro'),
    path: document.getElementById('screen-path'),
    question: document.getElementById('screen-question'),
    results: document.getElementById('screen-results')
  };
  const qTitle = document.getElementById('q-title');
  const qHint = document.getElementById('q-hint');
  const qOptions = document.getElementById('q-options');
  const qSection = document.getElementById('q-section');
  const qCount = document.getElementById('q-count');
  const progressBar = document.getElementById('progress-bar');
  const backBtn = document.getElementById('back-btn');
  const nextBtn = document.getElementById('next-btn');
  const resultsEl = document.getElementById('results');

  let content = null;
  let state = freshState();

  function freshState() {
    return { id: newId(), mode: null, step: 0, answers: {}, unlocked: false };
  }

  function newId() {
    if (window.crypto && crypto.randomUUID) return crypto.randomUUID();
    return 'id-' + Date.now().toString(36) + '-' + Math.random().toString(36).slice(2, 10);
  }

  function esc(s) {
    return String(s == null ? '' : s)
      .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;').replace(/'/g, '&#39;');
  }

  function show(name) {
    Object.keys(screens).forEach(k => { screens[k].hidden = k !== name; });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function renderMascot(svg, pose) {
    if (!svg || !window.WWMascot) return;
    if (pose === 'release') window.WWMascot.render(svg, 'clench', 'release');
    else window.WWMascot.render(svg, pose);
  }

  // ---------- logging (no cookies; a random id per run of the quiz) ----------
  function logEvent(event, target) {
    if (!ENDPOINT) return;
    const body = JSON.stringify({ action: 'event', id: state.id, event, target: target || '' });
    try {
      if (navigator.sendBeacon) {
        navigator.sendBeacon(ENDPOINT, new Blob([body], { type: 'text/plain;charset=utf-8' }));
      } else {
        fetch(ENDPOINT, { method: 'POST', mode: 'no-cors', keepalive: true, headers: { 'Content-Type': 'text/plain;charset=utf-8' }, body });
      }
    } catch (e) { /* logging is best-effort */ }
  }

  document.addEventListener('click', e => {
    const t = e.target.closest('[data-track]');
    if (t) logEvent('click', t.getAttribute('data-track'));
  });

  // ---------- questions ----------
  function questions() { return content.questions; }

  function renderQuestion() {
    const qs = questions();
    const q = qs[state.step];
    const copy = q[state.mode];

    qSection.textContent = q.section;
    qCount.textContent = (state.step + 1) + ' of ' + qs.length;
    progressBar.style.width = ((state.step) / qs.length * 100) + '%';
    qTitle.textContent = copy.text;
    if (copy.hint) { qHint.textContent = copy.hint; qHint.hidden = false; } else { qHint.hidden = true; }
    qOptions.innerHTML = '';
    qOptions.className = 'd-options' + (q.type === 'agree' ? ' d-options-agree' : '') + (q.type === 'multi' ? ' d-options-multi' : '');

    const current = state.answers[q.id];

    if (q.type === 'single' || q.type === 'agree') {
      const opts = q.type === 'agree' ? content.scales.agree : copy.options;
      qOptions.setAttribute('role', 'radiogroup');
      qOptions.setAttribute('aria-labelledby', 'q-title');
      opts.forEach((opt, i) => {
        const b = document.createElement('button');
        b.type = 'button';
        b.className = 'd-option';
        b.setAttribute('role', 'radio');
        b.setAttribute('aria-checked', current === i ? 'true' : 'false');
        b.textContent = opt.label;
        b.addEventListener('click', () => {
          state.answers[q.id] = i;
          qOptions.querySelectorAll('.d-option').forEach((el, j) => el.setAttribute('aria-checked', j === i ? 'true' : 'false'));
          setTimeout(advance, 220);
        });
        qOptions.appendChild(b);
      });
      nextBtn.hidden = current === undefined;
    } else {
      qOptions.setAttribute('role', 'group');
      qOptions.setAttribute('aria-labelledby', 'q-title');
      const picked = new Set(current || []);
      const max = q.max || 0;
      const sync = () => {
        qOptions.querySelectorAll('.d-option').forEach(el => {
          const v = el.dataset.value;
          const on = picked.has(v);
          el.setAttribute('aria-pressed', on ? 'true' : 'false');
          el.disabled = !on && max > 0 && picked.size >= max;
        });
        state.answers[q.id] = Array.from(picked);
        nextBtn.hidden = false;
        nextBtn.disabled = picked.size === 0;
        nextBtn.textContent = max > 0 ? 'Next (' + picked.size + ' of ' + max + ') →' : 'Next →';
      };
      q.options.forEach(opt => {
        const b = document.createElement('button');
        b.type = 'button';
        b.className = 'd-option';
        b.dataset.value = opt.value;
        b.textContent = opt.label;
        b.addEventListener('click', () => {
          if (picked.has(opt.value)) {
            picked.delete(opt.value);
          } else {
            if (opt.exclusive) picked.clear();
            else q.options.filter(o => o.exclusive).forEach(o => picked.delete(o.value));
            picked.add(opt.value);
          }
          sync();
        });
        qOptions.appendChild(b);
      });
      sync();
    }
    if (q.type !== 'multi') { nextBtn.disabled = false; nextBtn.textContent = 'Next →'; }
    qTitle.focus({ preventScroll: true });
  }

  function advance() {
    if (state.step < questions().length - 1) {
      state.step++;
      renderQuestion();
    } else {
      finish();
    }
  }

  nextBtn.addEventListener('click', advance);
  backBtn.addEventListener('click', () => {
    if (state.step > 0) { state.step--; renderQuestion(); }
    else show('path');
  });

  // ---------- scoring ----------
  function pct(q, idx) {
    if (q.type === 'agree') return content.scales.agree[idx].score / 4 * 100;
    const opts = q.self.options;
    return opts[idx].score / 3 * 100;
  }

  function mean(arr) { return arr.length ? arr.reduce((a, b) => a + b, 0) / arr.length : 0; }

  function score() {
    const byAxis = { energy: [], meaning: [], connection: [], satisfaction: [] };
    const facets = {};
    questions().forEach(q => {
      if (!q.axis) return;
      const v = pct(q, state.answers[q.id]);
      byAxis[q.axis].push(v);
      if (q.facet) facets[q.facet] = Math.round(v);
    });
    const s = {
      energy: Math.round(mean(byAxis.energy)),
      meaning: Math.round(mean(byAxis.meaning)),
      connection: Math.round(mean(byAxis.connection)),
      satisfaction: Math.round(mean(byAxis.satisfaction)),
      facets
    };
    // Happiness mix (Arthur Brooks' framing): enjoyment draws on energy and connection.
    s.enjoyment = Math.round((s.energy + s.connection) / 2);
    const highE = s.energy >= 50;
    const highM = s.meaning >= 50;
    s.archetype = highE ? (highM ? 'flow' : 'sprinter') : (highM ? 'ember' : 'fog');
    s.weather = s.connection >= 70 ? 'clear' : s.connection >= 40 ? 'changeable' : 'overcast';
    return s;
  }

  function contextAnswer() {
    const q = questions().find(x => x.id === 'context');
    const idx = state.answers.context;
    return idx === undefined ? '' : q[state.mode].options[idx].value;
  }

  // ---------- results ----------
  function finish() {
    progressBar.style.width = '100%';
    const s = score();
    state.scores = s;
    logEvent('complete', state.mode + ':' + s.archetype);
    renderResults(s);
    show('results');
  }

  function mapSvg(s, color) {
    // Keep the marker inside the map, even at 0 or 100.
    const x = 40 + s.meaning / 100 * 220;
    const y = 260 - s.energy / 100 * 220;
    return '' +
      '<svg class="d-map" viewBox="0 0 300 300" role="img" aria-label="Energy and meaning map. Energy ' + s.energy + ' out of 100, meaning ' + s.meaning + ' out of 100.">' +
        '<rect x="30" y="30" width="120" height="120" class="m-q m-sprinter"/>' +
        '<rect x="150" y="30" width="120" height="120" class="m-q m-flow"/>' +
        '<rect x="30" y="150" width="120" height="120" class="m-q m-fog"/>' +
        '<rect x="150" y="150" width="120" height="120" class="m-q m-ember"/>' +
        '<text x="90" y="56" class="m-l">Sprinter</text>' +
        '<text x="210" y="56" class="m-l">Flow</text>' +
        '<text x="90" y="256" class="m-l">Fog</text>' +
        '<text x="210" y="256" class="m-l">Ember</text>' +
        '<line x1="30" y1="270" x2="276" y2="270" class="m-axis"/>' +
        '<line x1="30" y1="270" x2="30" y2="24" class="m-axis"/>' +
        '<text x="270" y="290" class="m-a" text-anchor="end">Meaning &rarr;</text>' +
        '<text x="14" y="34" class="m-a" transform="rotate(-90 14 34)" text-anchor="end">Energy &rarr;</text>' +
        '<circle cx="' + x + '" cy="' + y + '" r="16" class="m-pulse" style="fill:' + color + '"/>' +
        '<circle cx="' + x + '" cy="' + y + '" r="8" class="m-dot" style="fill:' + color + '"/>' +
      '</svg>';
  }

  function bar(label, value, note) {
    return '<div class="d-bar"><div class="d-bar-top"><span>' + esc(label) + '</span><span>' + value + '</span></div>' +
      '<div class="d-bar-track"><div class="d-bar-fill" style="width:' + value + '%"></div></div>' +
      (note ? '<div class="d-bar-note">' + esc(note) + '</div>' : '') + '</div>';
  }

  function decksFor(key) {
    // Low energy always sees the Restore Pack; low meaning always sees the Connection Pack.
    if (key === 'ember') return [['restore', 'For rebuilding energy']];
    if (key === 'sprinter') return [['connection', 'For reconnecting to meaning']];
    if (key === 'fog') return [['restore', 'Start here: steady your energy'], ['connection', 'Then: reconnect to people and purpose']];
    return [['connection', 'To keep it going and share it with others']];
  }

  function renderResults(s) {
    const a = content.archetypes[s.archetype];
    const mode = state.mode;
    const copy = a[mode];
    const L = content.links;
    const team = mode === 'team';
    const ctx = contextAnswer();
    const weather = content.teamWeather.readings[s.weather];
    const enablers = state.answers.enablers || [];
    const practices = (state.answers.practices || []).filter(p => p !== 'none');
    const enablerOpts = questions().find(q => q.id === 'enablers').options;
    const labelFor = v => (enablerOpts.find(o => o.value === v) || {}).label || v;
    const lowEnergy = s.energy < 50;

    const callCard = (heading, text, track) =>
      '<div class="d-callout">' +
        '<div><div class="eyebrow">Free 30-minute call</div><h3>' + esc(heading) + '</h3><p>' + esc(text) + '</p></div>' +
        '<a class="btn btn-mustard" href="' + esc(L.calendly) + '" target="_blank" rel="noopener" data-track="' + track + '">Book a free discovery call</a>' +
      '</div>';

    const decks = decksFor(s.archetype).map(([key, why]) => {
      const d = content.decks[key];
      const url = key === 'restore' ? L.etsyRestore : L.etsyConnection;
      return '<a class="d-deck" href="' + esc(url) + '" target="_blank" rel="noopener" data-track="etsy-' + key + '">' +
        '<img src="' + esc(d.image) + '" alt="" loading="lazy">' +
        '<div><div class="d-deck-why">' + esc(why) + '</div><h4>' + esc(d.name) + '</h4><p>' + esc(d.line) + '</p>' +
        '<span class="d-link">See it on Etsy &rarr;</span></div></a>';
    }).join('');

    const discount = L.discountCode
      ? '<p class="d-discount">Your discovery discount: use code <strong>' + esc(L.discountCode) + '</strong>' + (L.discountLabel ? ' for ' + esc(L.discountLabel) : '') + ' at checkout.</p>'
      : '';

    const exercises = a.exercises.map((ex, i) =>
      '<article class="d-ex">' +
        '<div class="d-ex-num">0' + (i + 1) + '</div>' +
        '<div class="d-ex-tag">' + esc(ex.source) + ' &middot; ' + ex.minutes + ' min</div>' +
        '<h4>' + esc(ex.title) + '</h4>' +
        '<p>' + esc(ex[mode]) + '</p>' +
      '</article>').join('');

    const already = practices.length
      ? '<p class="d-note">' + (team ? 'Your team already uses ' : 'You already use ') +
        esc(practices.map(p => content.practiceLabels[p] || p).join(', ')) + '. Build on what works: pair one of these practices with a habit that already sticks.</p>'
      : '';

    const enablerList = enablers.map(v =>
      '<li><strong>' + esc(labelFor(v)) + '</strong><span>' + esc(content.enablerTips[v] || '') + '</span></li>').join('');

    const tiers = content.teamReport.tiers.map(t => '<li><span>' + esc(t.label) + '</span><strong>' + esc(t.price) + '</strong></li>').join('');
    const smallTeam = team && ctx === '2-4'
      ? '<p class="d-note">Team reports need at least 5 people so individual answers stay confidential. For smaller teams, a workshop or discovery call is the better fit.</p>'
      : '';
    const reportSubject = encodeURIComponent('Team Weather report request');
    const reportBody = encodeURIComponent('Hi Brielle,\n\nI\'d like a Team Weather report for my team.\n\nTeam size: ' + (team ? ctx : '') + '\nMy discovery result: ' + a.name + '\n\nThanks!');

    const elements = content.teamWeather.elements.map(el =>
      '<li><strong>' + esc(el.name) + '</strong><span>' + esc(el.text) + '</span></li>').join('');

    resultsEl.innerHTML =
      '<section class="d-res-hero" style="--arch:' + esc(a.color) + '">' +
        '<div class="wrap d-res-grid">' +
          '<div>' +
            '<div class="eyebrow">' + (team ? 'Your team reads as' : 'Your result') + '</div>' +
            '<div class="d-res-title"><svg class="d-res-mascot" viewBox="0 0 200 240" id="res-mascot" aria-hidden="true"></svg><h1>' + esc(a.name) + '</h1></div>' +
            '<p class="d-res-tag">' + esc(a.tagline) + '</p>' +
            '<p class="d-res-summary">' + esc(copy.summary) + '</p>' +
          '</div>' +
          '<div class="d-map-wrap">' + mapSvg(s, a.color) + '</div>' +
        '</div>' +
      '</section>' +

      (team ? '<div class="wrap d-pre-gate">' + callCard('Want to talk your team\'s result through?', 'Bring your result to a free call with Brielle. We\'ll look at what\'s behind it and what would help your team most.', 'calendly-top') + '</div>' : '') +

      '<div class="d-locked" id="locked">' +
        '<div class="d-full" id="full" aria-hidden="true" inert>' +
          '<div class="wrap">' +

            '<section class="d-block">' +
              '<div class="eyebrow">What this means</div>' +
              '<h2>' + (team ? 'Inside a ' + esc(a.name) + ' team' : 'Inside ' + esc(a.name)) + '</h2>' +
              '<p>' + esc(copy.detail) + '</p>' +
              '<p class="d-outcome"><strong>What you can expect:</strong> ' + esc(copy.outcome) + '</p>' +
            '</section>' +

            '<section class="d-block d-two">' +
              '<div>' +
                '<div class="eyebrow">Your scores</div>' +
                '<h3>Energy, meaning and connection</h3>' +
                bar('Energy', s.energy, 'How replenished or depleted things feel') +
                bar('Meaning', s.meaning) +
                '<div class="d-facets">' +
                  bar('Coherence', s.facets.coherence, 'The work makes sense') +
                  bar('Significance', s.facets.significance, 'The work matters') +
                  bar('Purpose', s.facets.purpose, 'Goals worth caring about') +
                '</div>' +
                bar('Connection', s.connection, 'Belonging and safety to speak up') +
              '</div>' +
              '<div>' +
                '<div class="eyebrow">Happiness at work</div>' +
                '<h3>Your happiness mix</h3>' +
                '<p class="d-small">Arthur Brooks describes happiness as a mix of enjoyment, satisfaction and meaning. Here\'s how ' + (team ? 'your team\'s' : 'your') + ' mix looks right now.</p>' +
                bar('Enjoyment', s.enjoyment, 'Energy and connection in the day-to-day') +
                bar('Satisfaction', s.satisfaction, 'The reward of progress after effort') +
                bar('Meaning', s.meaning, 'Coherence, significance and purpose') +
              '</div>' +
            '</section>' +

            '<section class="d-block d-weather">' +
              '<div class="eyebrow">Team Weather</div>' +
              '<h2>' + esc(weather.name) + '</h2>' +
              '<p class="d-small">' + esc(content.teamWeather.intro[mode]) + '</p>' +
              '<p>' + esc(weather[mode]) + '</p>' +
              '<div class="d-weather-more">' +
                '<p><strong>The full Team Weather report</strong> reads five elements of your team\'s climate:</p>' +
                '<ul class="d-elements">' + elements + '</ul>' +
              '</div>' +
            '</section>' +

            (enablerList ? '<section class="d-block">' +
              '<div class="eyebrow">Working at your best</div>' +
              '<h2>What needs to be true</h2>' +
              '<ul class="d-enablers">' + enablerList + '</ul>' +
            '</section>' : '') +

            '<section class="d-block">' +
              '<div class="eyebrow">Try this week</div>' +
              '<h2>Three practices for ' + esc(a.name) + '</h2>' +
              '<div class="d-exs">' + exercises + '</div>' +
              already +
            '</section>' +

            '<section class="d-block">' +
              '<div class="eyebrow">Go deeper</div>' +
              '<h2>Cards matched to your result</h2>' +
              discount +
              '<div class="d-decks">' + decks + '</div>' +
            '</section>' +

            '<section class="d-block">' +
              '<div class="eyebrow">Next steps</div>' +
              '<h2>' + (team ? 'Hear from the whole team' : 'Take it to your team') + '</h2>' +
              '<div class="d-next">' +
                '<div class="d-report">' +
                  '<h3>' + esc(content.teamReport.name) + '</h3>' +
                  '<p>' + esc(content.teamReport.line) + '</p>' +
                  '<ul class="d-tiers">' + tiers + '</ul>' +
                  smallTeam +
                  '<a class="btn btn-teal" href="mailto:' + esc(L.contactEmail) + '?subject=' + reportSubject + '&body=' + reportBody + '" data-track="team-report">Request a team report</a>' +
                '</div>' +
                callCard(team ? 'Talk it through with Brielle' : 'Curious what would help?', team
                  ? 'A free 30-minute call to explore your result and how a Workwell workshop could help your team.'
                  : 'A free 30-minute call to explore your result, and what Workwell could do for you or your team.', 'calendly-bottom') +
              '</div>' +
            '</section>' +

            (lowEnergy ? '<p class="d-support">' + esc(content.support) + '</p>' : '') +
            '<p class="d-disclaimer">' + esc(content.disclaimer) + '</p>' +

            '<div class="d-actions">' +
              '<button class="btn btn-ghost btn-sm" type="button" id="print-btn" data-track="print">Save as PDF</button>' +
              '<button class="btn btn-ghost btn-sm" type="button" id="retake-btn">Take it again</button>' +
            '</div>' +
          '</div>' +
        '</div>' +

        '<div class="d-gate" id="gate">' +
          '<form class="d-gate-card" id="gate-form" novalidate>' +
            '<div class="eyebrow">Your full results are ready</div>' +
            '<h2>Unlock your full ' + (team ? 'team ' : '') + 'results</h2>' +
            '<p>See your scores, your Team Weather, three practices matched to ' + esc(a.name) + ' and your next steps. We\'ll also email you a PDF copy.</p>' +
            '<label for="gate-email">Email</label>' +
            '<input id="gate-email" name="email" type="email" required autocomplete="email" placeholder="you@company.com" maxlength="254">' +
            '<input type="text" name="website" class="d-hp" tabindex="-1" autocomplete="off" aria-hidden="true">' +
            '<label class="d-check"><input type="checkbox" name="consentResults" required> <span>I agree to Workwell storing my answers and using them to create my results and email them to me, including suggested practices and products. My answers may relate to my wellbeing. I\'m 18 or over.</span></label>' +
            '<label class="d-check"><input type="checkbox" name="consentMarketing"> <span>Optional: send me occasional Workwell emails with practices, resources and offers. Unsubscribe any time.</span></label>' +
            '<button class="btn btn-mustard" type="submit" id="gate-submit">Unlock my results</button>' +
            '<p class="d-gate-status" id="gate-status" role="status"></p>' +
            '<p class="d-fine">Read our <a href="../privacy/" target="_blank" rel="noopener">privacy notice</a>. You can ask us to delete your answers at any time.</p>' +
          '</form>' +
        '</div>' +
      '</div>' +
      '<div class="wrap"><p class="d-sent" id="sent-note" role="status" hidden></p></div>';

    renderMascot(document.getElementById('res-mascot'), a.mascot);
    document.getElementById('gate-form').addEventListener('submit', onUnlock);
    document.getElementById('print-btn').addEventListener('click', () => window.print());
    document.getElementById('retake-btn').addEventListener('click', () => {
      state = freshState();
      show('path');
    });
  }

  async function onUnlock(e) {
    e.preventDefault();
    const form = e.target;
    const status = document.getElementById('gate-status');
    const submit = document.getElementById('gate-submit');
    const email = form.email.value.trim();

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      status.textContent = 'Please enter a valid email address.';
      form.email.focus();
      return;
    }
    if (!form.consentResults.checked) {
      status.textContent = 'Please tick the first box so we can create and send your results.';
      return;
    }

    submit.disabled = true;
    status.textContent = 'Unlocking…';

    const s = state.scores;
    const payload = {
      action: 'submit',
      id: state.id,
      mode: state.mode,
      email,
      website: form.website.value,
      consentResults: true,
      consentMarketing: form.consentMarketing.checked,
      consentVersion: CONFIG.consentVersion || '',
      contentVersion: content.version,
      context: contextAnswer(),
      answers: state.answers,
      scores: {
        energy: s.energy, meaning: s.meaning, connection: s.connection, satisfaction: s.satisfaction,
        enjoyment: s.enjoyment, coherence: s.facets.coherence, significance: s.facets.significance, purpose: s.facets.purpose
      },
      archetype: s.archetype,
      weather: s.weather,
      enablers: state.answers.enablers || [],
      practices: state.answers.practices || []
    };

    let sent = false;
    if (ENDPOINT) {
      try {
        const res = await fetch(ENDPOINT, {
          method: 'POST',
          headers: { 'Content-Type': 'text/plain;charset=utf-8' },
          body: JSON.stringify(payload)
        });
        const data = await res.json();
        sent = !!data.ok;
      } catch (err) {
        sent = false;
      }
    }

    unlock(sent, email);
  }

  function unlock(sent, email) {
    state.unlocked = true;
    const full = document.getElementById('full');
    full.removeAttribute('inert');
    full.removeAttribute('aria-hidden');
    document.getElementById('locked').classList.add('is-open');
    document.getElementById('gate').remove();
    const note = document.getElementById('sent-note');
    note.hidden = false;
    note.textContent = sent
      ? 'Your PDF is on its way to ' + email + '. If it isn\'t there in a few minutes, check your spam folder.'
      : 'We couldn\'t email your PDF just now. Use "Save as PDF" below to keep a copy.';
    full.parentNode.insertBefore(note.parentNode, full);
    full.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  // ---------- start ----------
  document.getElementById('start-btn').addEventListener('click', () => show('path'));
  document.querySelectorAll('.d-path').forEach(b => b.addEventListener('click', () => {
    state.mode = b.dataset.mode;
    state.step = 0;
    state.answers = {};
    logEvent('start', state.mode);
    show('question');
    renderQuestion();
  }));

  const startBtn = document.getElementById('start-btn');
  startBtn.disabled = true;
  fetch('content.json', { cache: 'no-cache' })
    .then(r => r.json())
    .then(data => { content = data; startBtn.disabled = false; })
    .catch(() => {
      startBtn.textContent = 'Couldn’t load the discovery. Please refresh.';
    });
})();
