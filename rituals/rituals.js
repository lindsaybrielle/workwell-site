(function () {
  const RITUALS = [
    { emoji: '🕯️', title: 'Lighting the Hearth', desc: 'A household lights a fire each evening to mark the shift from work to rest.', borrow: ['A fixed moment that always happens, no matter the day.', 'A physical action, not just a thought.', 'Everyone in the room knows what it means.'] },
    { emoji: '🥁', title: 'Talking Drum', desc: 'A message is drummed from village to village until everyone has heard it, unchanged.', borrow: ['The message travels in the same form to everyone.', 'No one is left to hear it secondhand.', 'The rhythm itself carries meaning, not just the words.'] },
    { emoji: '🍵', title: 'Tea Ceremony', desc: 'A precise, unhurried sequence turns a simple drink into a shared moment of attention.', borrow: ['Slowness is the point, not a delay.', 'Every step is done the same way, on purpose.', 'Full attention is given to one small thing.'] },
    { emoji: '🛎️', title: 'Ship’s Bell', desc: 'A bell rings at fixed intervals to mark a watch and hand it to the next crew.', borrow: ['Time is marked out loud, not just tracked silently.', 'The handoff has an exact moment, not a vague window.', 'Everyone hears the same signal at the same time.'] },
    { emoji: '🕊️', title: 'Releasing Lanterns', desc: 'Paper lanterns are released together into the night to mark the close of a shared chapter.', borrow: ['An ending is made visible, not just declared.', 'It happens together, not alone.', 'Letting go is treated as an action, not a feeling.'] },
    { emoji: '🥾', title: 'Threshold Pause', desc: 'Shoes come off before entering a home, a small pause marking outside becoming inside.', borrow: ['A physical threshold signals a mental shift.', 'The pause is brief but never skipped.', 'It resets how you carry yourself before you continue.'] },
    { emoji: '🔔', title: 'Temple Bell at Dusk', desc: 'A single bell struck at day’s end is heard by the whole town as a shared signal to slow down.', borrow: ['One signal reaches everyone at once.', 'It marks an ending clearly, without a meeting.', 'No one has to ask if the day is done — they hear it.'] },
    { emoji: '🫖', title: 'Passing the Kettle', desc: 'Whoever finishes their tea first refills the pot for the table, an unspoken rotation of care.', borrow: ['Care is distributed, not owned by one person.', 'No one has to ask for it to happen.', 'Small acts repeat often enough to become expected.'] },
    { emoji: '🕎', title: 'Weekly Candle Lighting', desc: 'A household pauses together at the same time each week, regardless of what the week held.', borrow: ['The pause happens on schedule, not when convenient.', 'It doesn’t depend on how the week went.', 'Presence together matters more than the agenda.'] },
    { emoji: '🎏', title: 'Carp Streamers', desc: 'Banners are raised each year to mark a milestone and wish strength on whoever carries it forward.', borrow: ['A milestone gets a visible, public marker.', 'The gesture is aimed at whoever comes next.', 'It repeats yearly, so it’s never a one-off.'] },
    { emoji: '🔥', title: 'Relay Torch Handoff', desc: 'A flame carried by one runner is physically passed to the next, witnessed at the exact moment it changes hands.', borrow: ['The exact moment of handoff is visible to everyone watching.', 'Nothing moves forward until the pass is confirmed.', 'One person’s job ends exactly when another’s begins.'] },
    { emoji: '🪘', title: 'Call and Response', desc: 'A leader’s line is repeated back by the group, confirming a message landed before moving on.', borrow: ['The group proves they heard it, out loud.', 'Nothing proceeds until the response comes back.', 'Participation is active, not passive listening.'] },
    { emoji: '🧹', title: 'Sweeping the Doorstep', desc: 'A shopkeeper sweeps the entrance each morning before opening — a small ritual that says "we are ready now."', borrow: ['Readiness is marked by an action, not a clock.', 'It’s done the same way every single day.', 'Others can see the care before they even walk in.'] },
    { emoji: '🕯️', title: 'Blowing Out the Candle', desc: 'A wish is made before extinguishing a flame, turning an ending into a moment of intention.', borrow: ['Endings get a moment of intention, not just a stop.', 'It’s quick — a few seconds, not a ceremony.', 'The person doing it chooses what it means.'] },
    { emoji: '🥂', title: 'The Toast', desc: 'Raising a glass together before a meal begins marks "we start now, together."', borrow: ['A clear, shared moment marks the start.', 'Everyone participates at the same time.', 'It’s brief, warm, and never skipped.'] },
    { emoji: '📯', title: 'Town Crier’s Call', desc: 'A single voice announces the day’s news at a fixed hour, so everyone hears it from the same source.', borrow: ['Everyone gets the news from one source, not rumor.', 'It happens at a predictable time.', 'Hearing it together prevents fragmented versions of the truth.'] }
  ];

  const PROCESSES = [
    { emoji: '🗒️', title: 'Standup', desc: 'A short daily check-in where each person says what they did, what’s next, and what’s blocking them.' },
    { emoji: '🎉', title: 'Sprint Demo', desc: 'The team shows what it shipped this cycle to whoever wants to see it.' },
    { emoji: '🤝', title: 'Handoff', desc: 'One person’s work passes to another who now owns what happens next.' },
    { emoji: '🧭', title: 'Kickoff', desc: 'The first meeting of a new project, setting direction before work begins.' },
    { emoji: '🪦', title: 'Postmortem', desc: 'The team reviews what went wrong after an incident, without assigning blame.' },
    { emoji: '🚪', title: 'Offboarding', desc: 'A departing team member’s knowledge and access are formally transferred and closed out.' },
    { emoji: '👋', title: 'Onboarding', desc: 'A new hire’s first days, structured to help them find their footing.' },
    { emoji: '🗳️', title: 'Retro', desc: 'The team reflects on the last cycle and decides what to change going forward.' },
    { emoji: '✍️', title: 'Sign-off', desc: 'A final review before something ships, where someone explicitly says "this is ready."' },
    { emoji: '📣', title: 'All-Hands', desc: 'The whole company gathers to hear the same update at the same time.' },
    { emoji: '🔄', title: 'Shift Handover', desc: 'One shift briefs the next on what’s in progress before leaving for the day.' },
    { emoji: '🎯', title: '1:1', desc: 'A recurring private check-in between a manager and a report.' },
    { emoji: '🧵', title: 'Async Update', desc: 'A written status posted for anyone to read on their own time, no meeting required.' },
    { emoji: '🏁', title: 'Launch', desc: 'The moment a project goes live, often anticlimactic despite the work behind it.' },
    { emoji: '🧊', title: 'Icebreaker', desc: 'A few minutes at the start of a meeting meant to warm the room up before the real agenda.' },
    { emoji: '📥', title: 'Inbox Zero Friday', desc: 'A recurring block of time set aside to clear out backlog before the week ends.' }
  ];

  const STORAGE_KEY = 'ww-rituals-saved';

  let ritualIdx = 0;
  let processIdx = 0;

  const el = (id) => document.getElementById(id);

  function randomIndexExcluding(length, exclude) {
    if (length <= 1) return 0;
    let i;
    do { i = Math.floor(Math.random() * length); } while (i === exclude);
    return i;
  }

  function renderRitual(idx) {
    ritualIdx = idx;
    const r = RITUALS[idx];
    el('ritual-number').textContent = 'No. ' + (idx + 1) + ' of ' + RITUALS.length;
    el('ritual-icon').textContent = r.emoji;
    el('ritual-title').textContent = r.title;
    el('ritual-desc').textContent = r.desc;
  }

  function renderProcess(idx) {
    processIdx = idx;
    const p = PROCESSES[idx];
    el('process-number').textContent = 'No. ' + (idx + 1) + ' of ' + PROCESSES.length;
    el('process-icon').textContent = p.emoji;
    el('process-title').textContent = p.title;
    el('process-desc').textContent = p.desc;
  }

  function updateCombo() {
    const r = RITUALS[ritualIdx];
    const p = PROCESSES[processIdx];
    el('combo-ritual').textContent = r.emoji + ' ' + r.title;
    el('combo-process').textContent = p.emoji + ' ' + p.title;
    const list = el('borrow-list');
    list.innerHTML = '';
    r.borrow.forEach((line) => {
      const li = document.createElement('li');
      li.textContent = line;
      list.appendChild(li);
    });
    el('try-input').value = '';
    setStatus('Saved privately in this browser — nothing here is shared publicly.');
  }

  function setStatus(msg) {
    el('r-status').textContent = msg;
  }

  function loadSaved() {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
    } catch (e) {
      return [];
    }
  }

  function saveSaved(list) {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
    } catch (e) { /* private browsing or storage disabled; ignore */ }
  }

  function renderSavedList() {
    const list = loadSaved();
    const section = el('saved-section');
    const container = el('saved-list');
    container.innerHTML = '';
    if (!list.length) {
      section.hidden = true;
      return;
    }
    section.hidden = false;
    list.slice().reverse().forEach((item, revIdx) => {
      const realIdx = list.length - 1 - revIdx;
      const div = document.createElement('div');
      div.className = 'saved-item';
      const note = item.note ? '<div class="si-note">' + escapeHtml(item.note) + '</div>' : '';
      div.innerHTML =
        '<button class="si-remove" data-idx="' + realIdx + '">Remove</button>' +
        '<div class="si-combo">' + escapeHtml(item.ritual) + ' → ' + escapeHtml(item.process) + '</div>' +
        note;
      container.appendChild(div);
    });
    container.querySelectorAll('.si-remove').forEach((btn) => {
      btn.addEventListener('click', () => {
        const idx = parseInt(btn.getAttribute('data-idx'), 10);
        const current = loadSaved();
        current.splice(idx, 1);
        saveSaved(current);
        renderSavedList();
      });
    });
  }

  function escapeHtml(s) {
    const d = document.createElement('div');
    d.textContent = s;
    return d.innerHTML;
  }

  el('draw-ritual').addEventListener('click', () => {
    renderRitual(randomIndexExcluding(RITUALS.length, ritualIdx));
    updateCombo();
  });
  el('draw-process').addEventListener('click', () => {
    renderProcess(randomIndexExcluding(PROCESSES.length, processIdx));
    updateCombo();
  });
  el('draw-combo').addEventListener('click', () => {
    renderRitual(randomIndexExcluding(RITUALS.length, ritualIdx));
    renderProcess(randomIndexExcluding(PROCESSES.length, processIdx));
    updateCombo();
  });

  el('copy-answer').addEventListener('click', () => {
    const r = RITUALS[ritualIdx];
    const p = PROCESSES[processIdx];
    const note = el('try-input').value.trim();
    const text = r.emoji + ' ' + r.title + ' → ' + p.emoji + ' ' + p.title +
      '\n\nWorth borrowing:\n' + r.borrow.map((b) => '• ' + b).join('\n') +
      (note ? '\n\nWhat I’d try:\n' + note : '');
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).then(
        () => setStatus('Copied to your clipboard.'),
        () => setStatus('Couldn’t copy — your browser may be blocking clipboard access.')
      );
    } else {
      setStatus('Clipboard isn’t available in this browser.');
    }
  });

  el('save-answer').addEventListener('click', () => {
    const r = RITUALS[ritualIdx];
    const p = PROCESSES[processIdx];
    const note = el('try-input').value.trim();
    const list = loadSaved();
    list.push({ ritual: r.emoji + ' ' + r.title, process: p.emoji + ' ' + p.title, note, date: new Date().toISOString() });
    saveSaved(list);
    renderSavedList();
    setStatus('Saved to your list below.');
  });

  renderRitual(0);
  renderProcess(0);
  updateCombo();
  renderSavedList();
})();
