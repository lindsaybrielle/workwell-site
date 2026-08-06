(function () {
  const NS = "http://www.w3.org/2000/svg";
  function el(tag, attrs, parent) {
    const e = document.createElementNS(NS, tag);
    for (const k in attrs) e.setAttribute(k, attrs[k]);
    if (parent) parent.appendChild(e);
    return e;
  }

  const BODY_BUMPS = [
    [100, 150, 34], [70, 138, 24], [130, 138, 24],
    [58, 110, 24], [142, 110, 24],
    [72, 84, 22], [128, 84, 22], [100, 72, 24],
    [100, 118, 40]
  ];
  const SHADOW_BUMPS = [[78, 158, 16], [122, 158, 16], [100, 166, 17]];

  function buildBody(svg) {
    const g = el('g', {}, svg);
    SHADOW_BUMPS.forEach(b => el('circle', { cx: b[0], cy: b[1], r: b[2], fill: '#a1657f' }, g));
    BODY_BUMPS.forEach(b => el('circle', { cx: b[0], cy: b[1], r: b[2], fill: '#c48ca0' }, g));
    return g;
  }

  function buildFace(svg, mood) {
    const g = el('g', {}, svg);
    if (mood === 'clench') {
      el('path', { d: 'M78,102 q4,-7 9,0', stroke: '#1f3536', 'stroke-width': 3.4, fill: 'none', 'stroke-linecap': 'round' }, g);
      el('path', { d: 'M113,102 q4,-7 9,0', stroke: '#1f3536', 'stroke-width': 3.4, fill: 'none', 'stroke-linecap': 'round' }, g);
      el('ellipse', { cx: 100, cy: 118, rx: 6, ry: 8, fill: '#1f3536' }, g);
    } else if (mood === 'release') {
      el('path', { d: 'M77,101 q6,6 12,0', stroke: '#1f3536', 'stroke-width': 3.2, fill: 'none', 'stroke-linecap': 'round' }, g);
      el('path', { d: 'M111,101 q6,6 12,0', stroke: '#1f3536', 'stroke-width': 3.2, fill: 'none', 'stroke-linecap': 'round' }, g);
      el('path', { d: 'M86,116 q14,12 28,0', stroke: '#1f3536', 'stroke-width': 3.2, fill: 'none', 'stroke-linecap': 'round' }, g);
    } else if (mood === 'closed') {
      el('path', { d: 'M76,104 q7,5 14,0', stroke: '#1f3536', 'stroke-width': 3.2, fill: 'none', 'stroke-linecap': 'round' }, g);
      el('path', { d: 'M110,104 q7,5 14,0', stroke: '#1f3536', 'stroke-width': 3.2, fill: 'none', 'stroke-linecap': 'round' }, g);
      el('path', { d: 'M92,118 q8,6 16,0', stroke: '#1f3536', 'stroke-width': 3, fill: 'none', 'stroke-linecap': 'round' }, g);
    } else {
      el('ellipse', { cx: 84, cy: 104, rx: 4.5, ry: 5.5, fill: '#1f3536', class: 'eye' }, g);
      el('ellipse', { cx: 116, cy: 104, rx: 4.5, ry: 5.5, fill: '#1f3536', class: 'eye' }, g);
      el('path', { d: 'M88,118 q12,10 24,0', stroke: '#1f3536', 'stroke-width': 3.2, fill: 'none', 'stroke-linecap': 'round' }, g);
    }
  }

  function limb(g, d) { el('path', { d, stroke: '#1f3536', 'stroke-width': 4.4, fill: 'none', 'stroke-linecap': 'round' }, g); }
  function tip(g, x, y) { el('circle', { cx: x, cy: y, r: 5.5, fill: '#1f3536' }, g); }

  const POSES = {
    breathe(svg) {
      buildBody(svg);
      const limbs = el('g', {}, svg);
      limb(limbs, 'M70,128 Q55,150 82,168'); tip(limbs, 82, 168);
      limb(limbs, 'M130,128 Q145,150 118,168'); tip(limbs, 118, 168);
      limb(limbs, 'M78,172 Q100,190 122,172');
      buildFace(svg, 'content');
    },
    clench(svg, phase) {
      buildBody(svg);
      const limbs = el('g', {}, svg);
      if (phase === 'release') {
        limb(limbs, 'M72,120 Q50,110 46,90'); tip(limbs, 46, 90);
        limb(limbs, 'M128,120 Q150,110 154,90'); tip(limbs, 154, 90);
      } else {
        limb(limbs, 'M74,116 Q60,70 62,42'); tip(limbs, 62, 42);
        limb(limbs, 'M126,116 Q140,70 138,42'); tip(limbs, 138, 42);
      }
      limb(limbs, 'M84,182 L78,215'); tip(limbs, 78, 215);
      limb(limbs, 'M116,182 L122,215'); tip(limbs, 122, 215);
      buildFace(svg, phase === 'release' ? 'release' : 'clench');
    },
    snack(svg) {
      buildBody(svg);
      const limbs = el('g', {}, svg);
      limb(limbs, 'M126,120 Q150,105 148,80'); tip(limbs, 148, 80);
      el('path', { d: 'M138,64 Q158,62 156,84 Q150,96 136,88 Q132,74 138,64 Z', fill: '#d98c0c', stroke: '#1f3536', 'stroke-width': 1.6 }, limbs);
      limb(limbs, 'M74,122 Q58,140 66,160'); tip(limbs, 66, 160);
      limb(limbs, 'M84,182 L80,215'); tip(limbs, 80, 215);
      limb(limbs, 'M116,182 L120,215'); tip(limbs, 120, 215);
      buildFace(svg, 'content');
    },
    reflect(svg) {
      buildBody(svg);
      const limbs = el('g', {}, svg);
      limb(limbs, 'M72,130 Q68,168 100,180');
      limb(limbs, 'M128,130 Q132,168 100,180');
      limb(limbs, 'M84,176 Q100,196 116,176');
      buildFace(svg, 'closed');
    }
  };

  function render(svg, pose, extra) {
    svg.innerHTML = '';
    (POSES[pose] || POSES.breathe)(svg, extra);
  }
  window.WWMascot = { render };

  document.querySelectorAll('[data-mascot]').forEach(svg => {
    render(svg, svg.getAttribute('data-mascot'));
  });

  const hero = document.getElementById('hero-mascot');
  if (hero) {
    render(hero, 'breathe');
    let heroIn = true;
    setInterval(() => {
      heroIn = !heroIn;
      hero.style.transition = 'transform 2.6s ease-in-out';
      hero.style.transform = heroIn ? 'scale(1.05)' : 'scale(1)';
    }, 2600);

    const EYE_RADIUS = 2.6;
    let targetX = 0, targetY = 0, curX = 0, curY = 0;
    const heroSection = document.getElementById('top');
    (heroSection || document).addEventListener('mousemove', (e) => {
      const r = hero.getBoundingClientRect();
      if (!r.width) return;
      const cx = r.left + r.width / 2;
      const cy = r.top + r.height / 2;
      const dx = e.clientX - cx;
      const dy = e.clientY - cy;
      const dist = Math.hypot(dx, dy) || 1;
      const clamped = Math.min(dist, 260) / 260;
      targetX = (dx / dist) * EYE_RADIUS * clamped;
      targetY = (dy / dist) * EYE_RADIUS * clamped;
    });
    (function trackEyes() {
      curX += (targetX - curX) * 0.15;
      curY += (targetY - curY) * 0.15;
      hero.querySelectorAll('.eye').forEach((eye) => {
        eye.setAttribute('transform', 'translate(' + curX.toFixed(2) + ',' + curY.toFixed(2) + ')');
      });
      requestAnimationFrame(trackEyes);
    })();
  }

  let clenchTimer = null;
  document.querySelectorAll('.flip-card').forEach(card => {
    card.addEventListener('click', () => card.classList.toggle('flipped'));
    card.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); card.classList.toggle('flipped'); }
    });
    const pose = card.getAttribute('data-pose');
    const svg = card.querySelector('.flip-front svg');
    if (pose === 'clench' && svg) {
      let phase = 'clench';
      render(svg, 'clench', phase);
      setInterval(() => {
        phase = phase === 'clench' ? 'release' : 'clench';
        render(svg, 'clench', phase);
      }, 1400);
    }
  });

  const fabMascot = document.getElementById('fab-mascot');
  let fabPose = 'breathe';
  let fabPanelOpen = false;
  if (fabMascot) {
    render(fabMascot, fabPose);
    setInterval(() => {
      fabMascot.style.transition = 'transform 2.2s ease-in-out';
      fabMascot.style.transform = fabMascot.style.transform === 'scale(1.06)' ? 'scale(1)' : 'scale(1.06)';
    }, 2200);

    const SECTION_POSES = [
      { selector: '#top', pose: 'breathe' },
      { selector: '#practice', pose: 'clench' },
      { selector: '.pack-band.restore', pose: 'breathe' },
      { selector: '.pack-band.connection', pose: 'reflect' },
      { selector: '#workshops', pose: 'snack' },
      { selector: '#about', pose: 'reflect' },
      { selector: '#contact', pose: 'breathe' }
    ].map((s) => ({ ...s, el: document.querySelector(s.selector) })).filter((s) => s.el);

    if (SECTION_POSES.length && 'IntersectionObserver' in window) {
      const observer = new IntersectionObserver((entries) => {
        let best = null;
        entries.forEach((entry) => {
          if (entry.isIntersecting && (!best || entry.intersectionRatio > best.intersectionRatio)) {
            best = entry;
          }
        });
        if (best) {
          const match = SECTION_POSES.find((s) => s.el === best.target);
          if (match && match.pose !== fabPose) {
            fabPose = match.pose;
            if (!fabPanelOpen) render(fabMascot, fabPose);
          }
        }
      }, { threshold: [0.35, 0.5, 0.65] });
      SECTION_POSES.forEach((s) => observer.observe(s.el));
    }
  }

  const fab = document.getElementById('egg-fab');
  const slot = document.getElementById('egg-panel-slot');
  const EGGS = [
    { pose: 'breathe', kicker: '30-second reset', title: 'Breathe with me', copy: 'In for four, hold for four, out for four. Four rounds — I’ll keep pace.', action: 'Start breathing' },
    { pose: 'clench', kicker: 'Stand-up prompt', title: 'Time to unfold', copy: 'Stand, reach both arms up, hold five seconds, drop them heavy. Repeat twice.', action: 'Start stretch' },
    { pose: 'snack', kicker: 'Mindful break', title: 'Step away and eat', copy: 'Pick one bite of something nearby. No screen. Notice three things about it.', action: 'Set 90s timer' },
    { pose: 'reflect', kicker: 'Quiet moment', title: 'One honest line', copy: '“Who made your day a little easier this week?” Say it out loud, or write it down.', action: 'Next question' }
  ];
  let eggIndex = 0;
  let open = false;
  let liveTimer = null;

  function closePanel() {
    open = false;
    fabPanelOpen = false;
    slot.innerHTML = '';
    clearInterval(liveTimer);
    if (fabMascot) render(fabMascot, fabPose);
  }

  function openPanel() {
    open = true;
    fabPanelOpen = true;
    const d = EGGS[eggIndex];
    slot.innerHTML =
      '<div class="egg-panel">' +
      '<div class="k">' + d.kicker + '</div>' +
      '<div class="fig"><svg id="egg-mascot-live" viewBox="0 0 200 240"></svg></div>' +
      '<h4>' + d.title + '</h4>' +
      '<p class="copy" id="egg-copy">' + d.copy + '</p>' +
      '<div class="actions">' +
      '<button class="ghost" id="egg-next">Next</button>' +
      '<button class="solid" id="egg-go">' + d.action + '</button>' +
      '</div></div>';
    const liveMascot = document.getElementById('egg-mascot-live');
    render(liveMascot, d.pose);

    document.getElementById('egg-next').addEventListener('click', () => {
      eggIndex = (eggIndex + 1) % EGGS.length;
      openPanel();
    });
    document.getElementById('egg-go').addEventListener('click', () => {
      const copyEl = document.getElementById('egg-copy');
      clearInterval(liveTimer);
      if (d.pose === 'breathe') {
        let n = 0;
        const cues = ['Breathe in…', 'Hold…', 'Breathe out…', 'Hold…'];
        liveTimer = setInterval(() => {
          copyEl.textContent = cues[n % cues.length];
          liveMascot.style.transition = 'transform 1.8s ease-in-out';
          liveMascot.style.transform = (n % 2 === 0) ? 'scale(1.08)' : 'scale(1)';
          n++;
          if (n > 7) { clearInterval(liveTimer); copyEl.textContent = 'Nicely done. Back to it.'; }
        }, 1800);
      } else if (d.pose === 'clench') {
        let phase = 'clench';
        liveTimer = setInterval(() => {
          phase = phase === 'clench' ? 'release' : 'clench';
          render(liveMascot, 'clench', phase);
          copyEl.textContent = phase === 'clench' ? 'Reach and hold…' : 'Drop and shake it out.';
        }, 1200);
        setTimeout(() => { clearInterval(liveTimer); copyEl.textContent = 'Good — shoulders down, breathe.'; }, 6000);
      } else {
        copyEl.textContent = 'Good. That’s the whole practice — no app required.';
      }
    });
  }

  if (fab) {
    fab.addEventListener('click', () => { if (open) closePanel(); else openPanel(); });
  }

  const contactForm = document.getElementById('contact-form');
  const formStatus = document.getElementById('form-status');
  if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const submitBtn = contactForm.querySelector('button[type="submit"]');
      const accessKey = contactForm.access_key.value;

      if (!accessKey || accessKey === 'PASTE_YOUR_WEB3FORMS_KEY_HERE') {
        formStatus.textContent = 'Form isn’t connected yet — add a Web3Forms access key to go live.';
        return;
      }

      submitBtn.disabled = true;
      formStatus.textContent = 'Sending…';

      try {
        const res = await fetch('https://api.web3forms.com/submit', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
          body: JSON.stringify({
            access_key: accessKey,
            subject: contactForm.subject.value,
            botcheck: contactForm.botcheck.checked,
            Name: contactForm.Name.value.trim(),
            Company: contactForm.Company.value.trim(),
            Email: contactForm.Email.value.trim(),
            Message: contactForm.Message.value.trim()
          })
        });
        const data = await res.json();
        if (data.success) {
          formStatus.textContent = 'Thanks — that’s sent. We’ll get back to you soon.';
          contactForm.reset();
        } else {
          formStatus.textContent = 'Something went wrong sending that. Mind trying again?';
        }
      } catch (err) {
        formStatus.textContent = 'Something went wrong sending that. Mind trying again?';
      } finally {
        submitBtn.disabled = false;
      }
    });
  }
})();
