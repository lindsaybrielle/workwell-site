(function () {
  const RITUALS_BASE = [
    { emoji: '💍', title: 'Wedding Vows', desc: 'Two people publicly promise commitments to each other in front of witnesses.', borrow: ['Promises are said out loud, not just felt.', 'Witnesses make the commitment harder to quietly abandon.'] },
    { emoji: '🎓', title: 'Graduation Ceremony', desc: 'Students walk across a stage to receive their diploma in front of everyone who supported them.', borrow: ['The achievement is marked publicly, not just on paper.', 'Everyone who helped gets to watch the payoff.'] },
    { emoji: '🔥', title: 'Olympic Opening Ceremony', desc: 'Athletes from every nation parade together before a flame is lit to mark the games’ start.', borrow: ['Everyone enters together, regardless of rank.', 'One symbolic act marks "we have officially begun."'] },
    { emoji: '🍵', title: 'Japanese Tea Ceremony', desc: 'A precise, unhurried sequence turns a simple drink into a shared moment of attention.', borrow: ['Slowness is the point, not a delay.', 'Every step is done the same way, on purpose.'] },
    { emoji: '🏅', title: 'Nobel Prize Ceremony', desc: 'A jury’s decision is announced once, on a fixed date, to the whole world at the same time.', borrow: ['The decision is announced once, clearly, not leaked in pieces.', 'A fixed date creates anticipation instead of drift.'] },
    { emoji: '🕊️', title: 'Minute of Silence', desc: 'A large group falls completely silent together for sixty seconds to honour something important.', borrow: ['Silence itself is the message, not a gap to fill.', 'Everyone stops at the same moment, together.'] },
    { emoji: '🎆', title: 'New Year’s Eve Countdown', desc: 'A crowd counts down together to the exact second one year becomes the next.', borrow: ['Everyone experiences the transition at the identical moment.', 'Counting down builds anticipation for something that would otherwise pass unnoticed.'] },
    { emoji: '🔥', title: 'Olympic Torch Relay', desc: 'A flame carried by one runner is physically passed to the next, witnessed at the exact moment it changes hands.', borrow: ['The exact moment of handoff is visible to everyone watching.', 'One person’s leg ends exactly when the next begins.'] },
    { emoji: '👑', title: 'State Opening of Parliament', desc: 'A formal ceremony marks the start of a new parliamentary session, with the agenda read aloud to everyone present.', borrow: ['The coming period’s priorities are stated out loud, publicly, at the start.', 'Pomp signals "this matters," even for routine business.'] },
    { emoji: '🎖️', title: 'Investiture Ceremony', desc: 'An individual’s contribution is formally recognised in person, not just by letter.', borrow: ['Recognition happens face-to-face, not just on paper.', 'The moment is made memorable on purpose.'] },
    { emoji: '💂', title: 'Changing of the Guard', desc: 'One shift formally hands responsibility to the next through a scripted, witnessed routine.', borrow: ['The exact moment of handoff is visible to everyone watching.', 'Nothing proceeds until the pass is confirmed.'] },
    { emoji: '✋', title: 'Swearing-In Ceremony', desc: 'A person raises their hand and speaks a fixed oath before officially taking on a role.', borrow: ['Commitments are spoken aloud, not just signed.', 'The exact moment someone "becomes" the role is unambiguous.'] },
    { emoji: '👑', title: 'Coronation', desc: 'A single, elaborate ceremony marks the formal, public start of a new leader’s role.', borrow: ['A clear, singular moment marks "it’s official now."', 'The scale of the event matches the scale of the responsibility.'] },
    { emoji: '🌺', title: 'Remembrance Sunday', desc: 'A nation pauses together, once a year, on a fixed date, to remember collectively.', borrow: ['It repeats yearly, so it’s never a one-off.', 'A fixed date means no one has to decide when to remember.'] },
    { emoji: '👶', title: 'Christening', desc: 'A new arrival is formally welcomed into a community in front of family and friends.', borrow: ['Belonging is marked publicly, not assumed silently.', 'Family and friends are asked to witness, not just hear about it later.'] },
    { emoji: '📖', title: 'Bar / Bat Mitzvah', desc: 'A young person reads publicly from a sacred text to mark their coming of age.', borrow: ['Competence is demonstrated live, not just declared.', 'The milestone is earned through visible preparation.'] },
    { emoji: '🌙', title: 'Ramadan Iftar', desc: 'A fast is broken together at a fixed time each evening, often shared with others.', borrow: ['A hard boundary removes any ambiguity about when to stop.', 'Breaking it together turns discipline into connection.'] },
    { emoji: '🍷', title: 'Passover Seder', desc: 'A meal follows a fixed script, retelling the same story in the same order every year.', borrow: ['The same story is retold deliberately, not left to fade.', 'A shared script means everyone participates, not just listens.'] },
    { emoji: '🪔', title: 'Diwali Lamp Lighting', desc: 'Lamps are lit across a household and neighbourhood at the same time to mark light overcoming dark.', borrow: ['A simple, repeatable action carries a big meaning.', 'Doing it visibly invites others to do the same.'] },
    { emoji: '👏', title: 'Round of Applause', desc: 'A room claps together, spontaneously synchronising within seconds.', borrow: ['Approval is expressed physically and audibly, not just felt.', 'It requires no words to be immediately understood by everyone.'] },
    { emoji: '🥂', title: 'The Toast', desc: 'Raising a glass together before a meal begins marks "we start now, together."', borrow: ['A clear, shared moment marks the start.', 'It’s brief, warm, and never skipped.'] },
    { emoji: '🎁', title: 'Retirement Send-Off', desc: 'Colleagues gather to formally mark someone’s last day and thank them publicly.', borrow: ['An ending gets a moment of intention, not just a quiet exit.', 'Contributions are named out loud, not assumed to be known.'] },
    { emoji: '🚩', title: 'Flag Raising Ceremony', desc: 'A flag is raised at a fixed time each morning, the same way, by designated people.', borrow: ['The same small act, repeated daily, becomes a marker of identity.', 'It happens whether or not anyone is watching that day.'] },
    { emoji: '🎺', title: 'Trooping the Colour', desc: 'Troops march in a precise, rehearsed formation to publicly mark an official occasion.', borrow: ['Precision itself signals how seriously the occasion is taken.', 'The rehearsal is as much the point as the event.'] },
    { emoji: '🎓', title: 'Cap Toss at Graduation', desc: 'Graduates throw their caps into the air together at a signalled moment.', borrow: ['One synchronised, physical action marks "we did it."', 'The release is a shared, not solitary, act.'] },
    { emoji: '🙌', title: 'Standing Ovation', desc: 'An audience rises to its feet together, unprompted, to signal something exceptional happened.', borrow: ['It can’t be faked by one person — it only works because many agree at once.', 'Standing up costs more effort than clapping, so it means more.'] },
    { emoji: '🤝', title: 'Handshake Agreement', desc: 'Two people physically clasp hands to seal a deal, before any paperwork exists.', borrow: ['Agreement is marked physically, not just implied.', 'It creates a clear "before" and "after" moment.'] },
    { emoji: '🎀', title: 'Ribbon Cutting', desc: 'A ribbon is symbolically cut to mark the official opening of something new.', borrow: ['A physical, photographable act marks an abstract milestone.', 'It gives everyone present something to point to later.'] },
    { emoji: '🏠', title: 'Housewarming', desc: 'Guests bring a small gift and share a meal to mark someone’s new home together.', borrow: ['A new chapter is marked by inviting others in, not just moving in quietly.', 'Small gestures do a lot of the work.'] },
    { emoji: '🎂', title: 'Birthday Candle Blowing', desc: 'A wish is made before extinguishing candles together, with everyone watching.', borrow: ['A brief pause for intention before the celebration continues.', 'Everyone present witnesses the same small moment.'] },
    { emoji: '🍻', title: 'Farewell Toast', desc: 'Colleagues raise a glass and share stories to send someone off well.', borrow: ['Stories are told out loud, not just remembered privately.', 'It gives permission to pause and reflect before moving on.'] },
    { emoji: '⚖️', title: 'Passing the Gavel', desc: 'An outgoing chair formally hands a gavel to their successor in front of the group.', borrow: ['A physical object makes the transfer of authority undeniable.', 'The audience witnesses exactly when responsibility shifts.'] },
    { emoji: '🎖️', title: 'Guard of Honour', desc: 'Colleagues form two lines for someone to walk through, marking a significant departure or arrival.', borrow: ['Respect is shown through collective, coordinated effort.', 'It turns an ordinary walk into a marked moment.'] },
    { emoji: '🔥', title: 'Lighting the Olympic Cauldron', desc: 'A single flame, carried a long distance, ignites a cauldron that burns for the whole event.', borrow: ['A long build-up leads to one unmistakable, symbolic moment.', 'The flame stays visible throughout, a constant reminder of "we’re in this."'] },
    { emoji: '🌾', title: 'Harvest Festival', desc: 'A community gathers once a year to give thanks for the year’s work and share the results.', borrow: ['Effort is explicitly acknowledged, not just assumed to be noticed.', 'It happens on a fixed, predictable schedule.'] },
    { emoji: '🎖️', title: 'Passing-Out Parade', desc: 'New recruits march before family and officers to mark the formal end of training.', borrow: ['Completion is demonstrated publicly, not just certified on paper.', 'Family and mentors are invited to witness the result of their support.'] },
    { emoji: '🏆', title: 'Prize-Giving Assembly', desc: 'A whole school gathers so achievements can be read aloud and applauded together.', borrow: ['Recognition is public, not delivered privately where others can’t share in it.', 'Hearing the reasons for the award matters as much as the award itself.'] },
    { emoji: '🚪', title: 'Threshold Carry', desc: 'A person is carried over the threshold of a new home to mark a new beginning.', borrow: ['A small, physical gesture marks a big, abstract change.', 'It’s a little playful, and that’s part of why it’s remembered.'] },
    { emoji: '🔨', title: 'Auction Gavel Fall', desc: 'A single knock of the gavel marks the exact, irreversible moment a decision is final.', borrow: ['One unambiguous signal ends any lingering negotiation.', 'Everyone in the room hears the same moment of finality.'] },
    { emoji: '⚓', title: 'Changing of the Watch', desc: 'Officers formally brief incoming watch-standers before handing over full responsibility.', borrow: ['Nothing is assumed to carry over silently — it’s said out loud.', 'The outgoing person stays until the handover is confirmed complete.'] },
    { emoji: '🏫', title: 'School Assembly', desc: 'A whole school gathers each morning to hear the same announcements at the same time.', borrow: ['Everyone starts the day with the same information, at the same time.', 'It creates a shared rhythm the whole group can rely on.'] },
    { emoji: '🌸', title: 'Coming-of-Age Ceremony', desc: 'A community formally marks a young person’s transition into adulthood.', borrow: ['A vague, gradual process is given one clear marker.', 'The wider community, not just family, is asked to recognise the change.'] },
    { emoji: '💐', title: 'Vow Renewal', desc: 'A couple repeats their original promises years later, in front of family and friends again.', borrow: ['Commitments are worth repeating out loud, not just assumed to still hold.', 'It’s a chance to re-witness something that’s easy to take for granted.'] },
    { emoji: '🖤', title: 'State Funeral', desc: 'A nation pauses together, following a fixed and dignified sequence, to mark a significant loss.', borrow: ['The sequence is fixed in advance, so no one has to decide what’s appropriate in the moment.', 'Scale of ceremony reflects scale of impact.'] },
    { emoji: '🤝', title: 'Diploma Handshake', desc: 'Each graduate individually shakes the hand of the person presenting their diploma.', borrow: ['Even in a large group, each person gets one individual moment.', 'Physical contact makes an abstract achievement feel real.'] },
    { emoji: '👶', title: 'Naming Ceremony', desc: 'Family and friends gather to formally give a name and welcome a new arrival.', borrow: ['A private decision becomes a shared, public fact.', 'Everyone present becomes, in a small way, a witness to the start.'] },
    { emoji: '🎾', title: 'Ceremonial First Pitch', desc: 'A ceremonial first action, done by someone notable, marks a competition’s official start.', borrow: ['One clear, symbolic action distinguishes "before" from "during."', 'Involving someone notable signals the occasion matters.'] },
    { emoji: '🏮', title: 'Lantern Festival', desc: 'Lanterns are lit and displayed together across a community to mark the close of a celebration.', borrow: ['Individual small acts add up to something visible at scale.', 'It gives a clear, beautiful marker for "this chapter is complete."'] },
    { emoji: '✈️', title: 'In-Flight Safety Briefing', desc: 'The same safety information is delivered the same way, every single time, no exceptions.', borrow: ['Consistency matters more than novelty — it’s done the same way every time, on purpose.', 'Repetition doesn’t excuse skipping it.'] },
    { emoji: '📯', title: 'Town Crier’s Call', desc: 'A single voice announces the day’s news at a fixed hour, so everyone hears it from the same source.', borrow: ['Everyone gets the news from one source, not rumour.', 'Hearing it together prevents fragmented versions of the truth.'] }
  ];

  const PROCESSES_BASE = [
    { emoji: '🗒️', title: 'Standup', desc: 'A short daily check-in where each person says what they did, what’s next, and what’s blocking them.' },
    { emoji: '🎉', title: 'Sprint Demo', desc: 'The team shows what it shipped this cycle to whoever wants to see it.' },
    { emoji: '🤝', title: 'Handoff', desc: 'One person’s work passes to another who now owns what happens next.' },
    { emoji: '🧭', title: 'Kickoff', desc: 'The first meeting of a new project, setting direction before work begins.' },
    { emoji: '🪦', title: 'Postmortem', desc: 'The team reviews what went wrong after an incident, without assigning blame.' },
    { emoji: '🚪', title: 'Offboarding', desc: 'A departing team member’s knowledge and access are formally transferred and closed out.' },
    { emoji: '👋', title: 'Onboarding', desc: 'A new hire’s first days, structured to help them find their footing.' },
    { emoji: '🗳️', title: 'Retro', desc: 'The team reflects on the last cycle and decides what to change going forward.' },
    { emoji: '✍️', title: 'Sign-off', desc: 'A final review before something ships, where someone explicitly says "this is ready."' },
    { emoji: '📣', title: 'All-Hands', desc: 'The whole organisation gathers to hear the same update at the same time.' },
    { emoji: '🔄', title: 'Shift Handover', desc: 'One shift briefs the next on what’s in progress before leaving for the day.' },
    { emoji: '🎯', title: '1:1', desc: 'A recurring private check-in between a manager and a report.' },
    { emoji: '🧵', title: 'Async Update', desc: 'A written status posted for anyone to read on their own time, no meeting required.' },
    { emoji: '🏁', title: 'Launch', desc: 'The moment a project goes live, often anticlimactic despite the work behind it.' },
    { emoji: '🧊', title: 'Icebreaker', desc: 'A few minutes at the start of a meeting meant to warm the room up before the real agenda.' },
    { emoji: '📥', title: 'Inbox Zero Friday', desc: 'A recurring block of time set aside to clear out backlog before the week ends.' },
    { emoji: '📊', title: 'Performance Review', desc: 'A formal, scheduled conversation about how the past period went and what’s next.' },
    { emoji: '🚌', title: 'Team Away Day', desc: 'The team leaves the usual office to think and plan somewhere different for a day.' },
    { emoji: '📦', title: 'Project Closeout', desc: 'A final meeting to formally mark a project as finished and capture what was learned.' },
    { emoji: '✅', title: 'Peer Review', desc: 'One colleague checks another’s work before it moves forward.' },
    { emoji: '📰', title: 'Weekly Newsletter', desc: 'A recurring written update sent to the same audience on the same day each week.' },
    { emoji: '☎️', title: 'Escalation Call', desc: 'An urgent, ad hoc meeting called when something needs attention right now.' },
    { emoji: '💷', title: 'Budget Approval', desc: 'A formal sign-off confirming that spending on something is authorised.' },
    { emoji: '🍽️', title: 'New Starter Welcome Lunch', desc: 'Colleagues share a meal with a new team member in their first week.' },
    { emoji: '🚶', title: 'Exit Interview', desc: 'A departing employee is asked, one last time, for honest feedback.' },
    { emoji: '🏛️', title: 'Parliamentary Questions Prep', desc: 'A team prepares lines to answer questions a minister may face in the chamber.' },
    { emoji: '📋', title: 'Select Committee Hearing', desc: 'Officials or ministers answer questions from MPs in a formal, recorded session.' },
    { emoji: '✉️', title: 'Ministerial Submission', desc: 'A written brief is sent up to a minister, recommending a decision.' },
    { emoji: '📮', title: 'Red Box Submission', desc: 'Papers are sent home with a minister overnight for review before the next day.' },
    { emoji: '📝', title: 'Cabinet Office Write-Round', desc: 'A proposal is circulated to other departments for agreement before it proceeds.' },
    { emoji: '💰', title: 'Spending Review Bid', desc: 'A department makes the case for its share of funding for the years ahead.' },
    { emoji: '📑', title: 'Impact Assessment Sign-Off', desc: 'A proposal’s likely effects are formally reviewed and approved before it moves ahead.' },
    { emoji: '📈', title: 'Business Case Approval', desc: 'A formal case for a proposal is reviewed against set criteria before funding is agreed.' },
    { emoji: '🪑', title: 'Permanent Secretary Board', desc: 'A department’s most senior leaders meet to review priorities and risks.' },
    { emoji: '🔗', title: 'Cross-Government Working Group', desc: 'Officials from several departments meet regularly to coordinate on a shared issue.' },
    { emoji: '📜', title: 'Statutory Instrument Laying', desc: 'A piece of secondary legislation is formally placed before Parliament.' },
    { emoji: '🤫', title: 'Purdah Briefing', desc: 'Teams are briefed on what can and can’t be done during the pre-election restricted period.' },
    { emoji: '🔓', title: 'Freedom of Information Response', desc: 'A formal, deadline-bound reply is prepared to a public request for information.' },
    { emoji: '📨', title: 'Correspondence Clearance', desc: 'A draft reply to a member of the public or MP is checked and approved before sending.' },
    { emoji: '🧾', title: 'Public Accounts Committee Hearing', desc: 'Officials account for how public money was spent, under formal questioning.' },
    { emoji: '🔍', title: 'National Audit Office Review', desc: 'An independent body examines how well a programme used public funds.' },
    { emoji: '🔁', title: 'Secondment Handover', desc: 'An official leaving for a temporary role elsewhere briefs whoever covers their work.' },
    { emoji: '🏢', title: 'Delegated Legislation Committee', desc: 'A small group of MPs scrutinises a piece of secondary legislation in detail.' },
    { emoji: '🧩', title: 'Cross-Whitehall Taskforce Standup', desc: 'A short, regular check-in for a team pulled together from several departments.' },
    { emoji: '🗂️', title: 'Special Adviser Briefing', desc: 'A minister’s political adviser is briefed on the facts before a public appearance.' },
    { emoji: '🚌', title: 'Departmental Awayday', desc: 'Civil servants leave the usual building to plan and reflect somewhere different.' },
    { emoji: '📋', title: 'Annual Appraisal', desc: 'A civil servant’s performance over the year is formally reviewed against set objectives.' },
    { emoji: '🖋️', title: 'Policy Sign-Off', desc: 'A finished policy proposal receives final, formal approval before publication.' },
    { emoji: '🎗️', title: 'Honours Nomination Review', desc: 'A committee reviews nominations for national honours before they’re confirmed.' },
    { emoji: '🎒', title: 'Induction to the Civil Service', desc: 'A new joiner is introduced to the values, structures and expectations of public service.' }
  ];

  const CUSTOM_RITUALS_KEY = 'ww-rituals-custom';
  const CUSTOM_PROCESSES_KEY = 'ww-processes-custom';
  const STORAGE_KEY = 'ww-rituals-saved';

  let ritualIdx = 0;
  let processIdx = 0;
  let currentUser = null;
  let db = null;

  const el = (id) => document.getElementById(id);

  function loadJSON(key) {
    try { return JSON.parse(localStorage.getItem(key) || '[]'); } catch (e) { return []; }
  }
  function saveJSON(key, value) {
    try { localStorage.setItem(key, JSON.stringify(value)); } catch (e) { /* ignore */ }
  }

  function allRituals() { return RITUALS_BASE.concat(loadJSON(CUSTOM_RITUALS_KEY)); }
  function allProcesses() { return PROCESSES_BASE.concat(loadJSON(CUSTOM_PROCESSES_KEY)); }

  function randomIndexExcluding(length, exclude) {
    if (length <= 1) return 0;
    let i;
    do { i = Math.floor(Math.random() * length); } while (i === exclude);
    return i;
  }

  function renderRitual(idx) {
    ritualIdx = idx;
    const list = allRituals();
    const r = list[idx];
    el('ritual-number').textContent = (idx + 1) + ' / ' + list.length;
    el('ritual-icon').textContent = r.emoji;
    el('ritual-title').textContent = r.title;
    el('ritual-desc').textContent = r.desc;
  }

  function renderProcess(idx) {
    processIdx = idx;
    const list = allProcesses();
    const p = list[idx];
    el('process-number').textContent = (idx + 1) + ' / ' + list.length;
    el('process-icon').textContent = p.emoji;
    el('process-title').textContent = p.title;
    el('process-desc').textContent = p.desc;
  }

  function updateCombo() {
    const r = allRituals()[ritualIdx];
    const p = allProcesses()[processIdx];
    el('combo-ritual').textContent = r.emoji + ' ' + r.title;
    el('combo-process').textContent = p.emoji + ' ' + p.title;
    const list = el('borrow-list');
    list.innerHTML = '';
    (r.borrow || []).forEach((line) => {
      const li = document.createElement('li');
      li.textContent = line;
      list.appendChild(li);
    });
    el('try-input').value = '';
    setStatus(currentUser ? 'Signed in — saves sync to your account.' : 'Saved privately in this browser — nothing here is shared publicly.');
  }

  function setStatus(msg) { el('r-status').textContent = msg; }

  function escapeHtml(s) {
    const d = document.createElement('div');
    d.textContent = s;
    return d.innerHTML;
  }

  // ---------- saved list (local + optional Firestore sync) ----------
  function getLocalSaved() { return loadJSON(STORAGE_KEY); }
  function setLocalSaved(list) { saveJSON(STORAGE_KEY, list); }

  async function getSavedList() {
    if (currentUser && db) {
      try {
        const doc = await db.collection('savedRituals').doc(currentUser.uid).get();
        return (doc.exists && doc.data().items) || [];
      } catch (e) {
        console.warn('Firestore read failed, falling back to local list.', e);
        return getLocalSaved();
      }
    }
    return getLocalSaved();
  }

  async function persistSavedList(list) {
    if (currentUser && db) {
      try {
        await db.collection('savedRituals').doc(currentUser.uid).set({ items: list });
        return;
      } catch (e) {
        console.warn('Firestore write failed, saving locally instead.', e);
      }
    }
    setLocalSaved(list);
  }

  async function renderSavedList() {
    const list = await getSavedList();
    const section = el('saved-section');
    const container = el('saved-list');
    container.innerHTML = '';
    if (!list.length) { section.hidden = true; return; }
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
      btn.addEventListener('click', async () => {
        const idx = parseInt(btn.getAttribute('data-idx'), 10);
        const current = await getSavedList();
        current.splice(idx, 1);
        await persistSavedList(current);
        renderSavedList();
      });
    });
  }

  // ---------- draw controls ----------
  el('draw-ritual').addEventListener('click', () => {
    renderRitual(randomIndexExcluding(allRituals().length, ritualIdx));
    updateCombo();
  });
  el('draw-process').addEventListener('click', () => {
    renderProcess(randomIndexExcluding(allProcesses().length, processIdx));
    updateCombo();
  });
  el('draw-combo').addEventListener('click', () => {
    renderRitual(randomIndexExcluding(allRituals().length, ritualIdx));
    renderProcess(randomIndexExcluding(allProcesses().length, processIdx));
    updateCombo();
  });

  el('copy-answer').addEventListener('click', () => {
    const r = allRituals()[ritualIdx];
    const p = allProcesses()[processIdx];
    const note = el('try-input').value.trim();
    const text = r.emoji + ' ' + r.title + ' → ' + p.emoji + ' ' + p.title +
      '\n\nWorth borrowing:\n' + (r.borrow || []).map((b) => '• ' + b).join('\n') +
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

  el('save-answer').addEventListener('click', async () => {
    const r = allRituals()[ritualIdx];
    const p = allProcesses()[processIdx];
    const note = el('try-input').value.trim();
    const list = await getSavedList();
    list.push({ ritual: r.emoji + ' ' + r.title, process: p.emoji + ' ' + p.title, note, date: new Date().toISOString() });
    await persistSavedList(list);
    renderSavedList();
    setStatus(currentUser ? 'Saved to your account.' : 'Saved to your list below (this browser only).');
  });

  // ---------- add your own ----------
  function wireAddForm(toggleId, formId, cancelId, onSubmit) {
    const toggle = el(toggleId);
    const form = el(formId);
    const cancel = el(cancelId);
    toggle.addEventListener('click', () => {
      const showing = !form.hidden;
      form.hidden = showing;
      toggle.setAttribute('aria-expanded', String(!showing));
      toggle.textContent = showing ? toggle.textContent.replace('Cancel', '+') : toggle.textContent;
      if (!showing) form.querySelector('input').focus();
    });
    cancel.addEventListener('click', () => {
      form.hidden = true;
      toggle.setAttribute('aria-expanded', 'false');
      form.reset();
    });
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      onSubmit();
      form.reset();
      form.hidden = true;
      toggle.setAttribute('aria-expanded', 'false');
    });
  }

  wireAddForm('toggle-add-ritual', 'add-ritual-form', 'cancel-add-ritual', () => {
    const name = el('new-ritual-name').value.trim();
    if (!name) return;
    const desc = el('new-ritual-desc').value.trim() || 'A ritual added by a Workwell visitor.';
    const borrow = el('new-ritual-borrow').value.trim();
    const custom = loadJSON(CUSTOM_RITUALS_KEY);
    custom.push({ emoji: '✨', title: name, desc: desc, borrow: borrow ? [borrow] : ['Whatever made this worth adding — try naming it next time.'] });
    saveJSON(CUSTOM_RITUALS_KEY, custom);
    renderRitual(allRituals().length - 1);
    updateCombo();
    setStatus('Added "' + name + '" to the ritual pool on this device.');
  });

  wireAddForm('toggle-add-process', 'add-process-form', 'cancel-add-process', () => {
    const name = el('new-process-name').value.trim();
    if (!name) return;
    const desc = el('new-process-desc').value.trim() || 'A work moment added by a Workwell visitor.';
    const custom = loadJSON(CUSTOM_PROCESSES_KEY);
    custom.push({ emoji: '✨', title: name, desc: desc });
    saveJSON(CUSTOM_PROCESSES_KEY, custom);
    renderProcess(allProcesses().length - 1);
    updateCombo();
    setStatus('Added "' + name + '" to the work moment pool on this device.');
  });

  // ---------- Firebase sign-in (graceful no-op if not configured) ----------
  function firebaseConfigured() {
    const c = window.WW_FIREBASE_CONFIG;
    return c && c.apiKey && c.apiKey.indexOf('YOUR_') !== 0;
  }

  function initFirebase() {
    const signinBtn = el('signin-btn');
    const statusEl = el('r-account-status');

    if (!firebaseConfigured() || typeof firebase === 'undefined') {
      signinBtn.disabled = true;
      statusEl.textContent = 'Sign-in isn’t set up on this site yet — saves stay in this browser for now.';
      return;
    }

    firebase.initializeApp(window.WW_FIREBASE_CONFIG);
    db = firebase.firestore();
    const auth = firebase.auth();

    auth.onAuthStateChanged((user) => {
      currentUser = user;
      if (user) {
        statusEl.innerHTML = 'Signed in as <strong>' + escapeHtml(user.displayName || user.email) + '</strong> — <button class="r-signout" id="signout-btn">Sign out</button>';
        signinBtn.hidden = true;
        el('signout-btn').addEventListener('click', () => auth.signOut());
      } else {
        statusEl.textContent = 'Sign in to sync your saved list across devices.';
        signinBtn.hidden = false;
      }
      renderSavedList();
    });

    signinBtn.addEventListener('click', () => {
      const provider = new firebase.auth.GoogleAuthProvider();
      auth.signInWithPopup(provider).catch((err) => {
        statusEl.textContent = 'Sign-in didn’t complete: ' + (err && err.message ? err.message : 'please try again.');
      });
    });
  }

  renderRitual(0);
  renderProcess(0);
  updateCombo();
  initFirebase();
  renderSavedList();
})();
