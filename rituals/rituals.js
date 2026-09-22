(function () {
  const RITUALS_BASE = [
    { emoji: '💍', title: 'Wedding Vows', tag: 'life-event', desc: 'Two people publicly promise commitments to each other in front of witnesses.', borrow: ['Promises are said out loud, not just felt.', 'Witnesses make the commitment harder to quietly abandon.'], example: 'say the commitment out loud in front of the room, not just in a doc' },
    { emoji: '🎓', title: 'Graduation Ceremony', tag: 'life-event', desc: 'Students walk across a stage to receive their diploma in front of everyone who supported them.', borrow: ['The achievement is marked publicly, not just on paper.', 'Everyone who helped gets to watch the payoff.'], example: 'mark the moment publicly instead of letting it pass in a status update' },
    { emoji: '🔥', title: 'Olympic Opening Ceremony', tag: 'sport', desc: 'Athletes from every nation parade together before a flame is lit to mark the games’ start.', borrow: ['Everyone enters together, regardless of rank.', 'One symbolic act marks "we have officially begun."'], example: 'have everyone walk in together, regardless of seniority' },
    { emoji: '🍵', title: 'Japanese Tea Ceremony', tag: 'cultural', desc: 'A precise, unhurried sequence turns a simple drink into a shared moment of attention.', borrow: ['Slowness is the point, not a delay.', 'Every step is done the same way, on purpose.'], example: 'slow the first five minutes down on purpose, one step at a time' },
    { emoji: '🏅', title: 'Nobel Prize Ceremony', tag: 'public-sector', desc: 'A jury’s decision is announced once, on a fixed date, to the whole world at the same time.', borrow: ['The decision is announced once, clearly, not leaked in pieces.', 'A fixed date creates anticipation instead of drift.'], example: 'announce the outcome once, clearly, on a fixed date, not drip-fed' },
    { emoji: '🕊️', title: 'Minute of Silence', tag: 'public-sector', desc: 'A large group falls completely silent together for sixty seconds to honour something important.', borrow: ['Silence itself is the message, not a gap to fill.', 'Everyone stops at the same moment, together.'], example: 'open with sixty seconds of real silence before anyone speaks' },
    { emoji: '🎆', title: 'New Year’s Eve Countdown', tag: 'everyday', desc: 'A crowd counts down together to the exact second one year becomes the next.', borrow: ['Everyone experiences the transition at the identical moment.', 'Counting down builds anticipation for something that would otherwise pass unnoticed.'], example: 'count down out loud to the exact moment it starts' },
    { emoji: '🔥', title: 'Olympic Torch Relay', tag: 'sport', desc: 'A flame carried by one runner is physically passed to the next, witnessed at the exact moment it changes hands.', borrow: ['The exact moment of handoff is visible to everyone watching.', 'One person’s leg ends exactly when the next begins.'], example: 'make the handoff a visible, witnessed moment, not a quiet email' },
    { emoji: '👑', title: 'State Opening of Parliament', tag: 'public-sector', desc: 'A formal ceremony marks the start of a new parliamentary session, with the agenda read aloud to everyone present.', borrow: ['The coming period’s priorities are stated out loud, publicly, at the start.', 'Pomp signals "this matters," even for routine business.'], example: 'read the priorities out loud at the start, not bury them on slide 12' },
    { emoji: '💂', title: 'Changing of the Guard', tag: 'public-sector', desc: 'One shift formally hands responsibility to the next through a scripted, witnessed routine.', borrow: ['The exact moment of handoff is visible to everyone watching.', 'Nothing proceeds until the pass is confirmed.'], example: 'don’t let the old owner step away until the new owner confirms the handover' },
    { emoji: '✋', title: 'Swearing-In Ceremony', tag: 'public-sector', desc: 'A person raises their hand and speaks a fixed oath before officially taking on a role.', borrow: ['Commitments are spoken aloud, not just signed.', 'The exact moment someone "becomes" the role is unambiguous.'], example: 'have the person say their commitment out loud before they start' },
    { emoji: '👑', title: 'Coronation', tag: 'public-sector', desc: 'A single, elaborate ceremony marks the formal, public start of a new leader’s role.', borrow: ['A clear, singular moment marks "it’s official now."', 'The scale of the event matches the scale of the responsibility.'], example: 'give the start of it real weight, not just a calendar invite' },
    { emoji: '🌺', title: 'Remembrance Sunday', tag: 'public-sector', desc: 'A nation pauses together, once a year, on a fixed date, to remember collectively.', borrow: ['It repeats yearly, so it’s never a one-off.', 'A fixed date means no one has to decide when to remember.'], example: 'put it on a fixed date each year so no one has to decide when' },
    { emoji: '👶', title: 'Christening', tag: 'life-event', desc: 'A new arrival is formally welcomed into a community in front of family and friends.', borrow: ['Belonging is marked publicly, not assumed silently.', 'Family and friends are asked to witness, not just hear about it later.'], example: 'make belonging explicit and public, not assumed' },
    { emoji: '📖', title: 'Bar / Bat Mitzvah', tag: 'cultural', desc: 'A young person reads publicly from a sacred text to mark their coming of age.', borrow: ['Competence is demonstrated live, not just declared.', 'The milestone is earned through visible preparation.'], example: 'let them demonstrate readiness live, not just claim it' },
    { emoji: '🌙', title: 'Ramadan Iftar', tag: 'cultural', desc: 'A fast is broken together at a fixed time each evening, often shared with others.', borrow: ['A hard boundary removes any ambiguity about when to stop.', 'Breaking it together turns discipline into connection.'], example: 'set a hard stop time and break together at it' },
    { emoji: '🍷', title: 'Passover Seder', tag: 'cultural', desc: 'A meal follows a fixed script, retelling the same story in the same order every year.', borrow: ['The same story is retold deliberately, not left to fade.', 'A shared script means everyone participates, not just listens.'], example: 'retell the same story on purpose so it doesn’t fade' },
    { emoji: '🪔', title: 'Diwali Lamp Lighting', tag: 'cultural', desc: 'Lamps are lit across a household and neighbourhood at the same time to mark light overcoming dark.', borrow: ['A simple, repeatable action carries a big meaning.', 'Doing it visibly invites others to do the same.'], example: 'do one small visible act that others can copy' },
    { emoji: '👏', title: 'Round of Applause', tag: 'everyday', desc: 'A room claps together, spontaneously synchronising within seconds.', borrow: ['Approval is expressed physically and audibly, not just felt.', 'It requires no words to be immediately understood by everyone.'], example: 'let the room respond physically, not just say "noted"' },
    { emoji: '🥂', title: 'The Toast', tag: 'everyday', desc: 'Raising a glass together before a meal begins marks "we start now, together."', borrow: ['A clear, shared moment marks the start.', 'It’s brief, warm, and never skipped.'], example: 'open with one brief, shared moment before diving into the agenda' },
    { emoji: '🎁', title: 'Retirement Send-Off', tag: 'life-event', desc: 'Colleagues gather to formally mark someone’s last day and thank them publicly.', borrow: ['An ending gets a moment of intention, not just a quiet exit.', 'Contributions are named out loud, not assumed to be known.'], example: 'name the contribution out loud before they go' },
    { emoji: '🎺', title: 'Trooping the Colour', tag: 'public-sector', desc: 'Troops march in a precise, rehearsed formation to publicly mark an official occasion.', borrow: ['Precision itself signals how seriously the occasion is taken.', 'The rehearsal is as much the point as the event.'], example: 'rehearse it properly — the rehearsal is part of the point' },
    { emoji: '🎓', title: 'Cap Toss at Graduation', tag: 'life-event', desc: 'Graduates throw their caps into the air together at a signalled moment.', borrow: ['One synchronised, physical action marks "we did it."', 'The release is a shared, not solitary, act.'], example: 'end with one synchronised, physical "we did it" moment' },
    { emoji: '🙌', title: 'Standing Ovation', tag: 'everyday', desc: 'An audience rises to its feet together, unprompted, to signal something exceptional happened.', borrow: ['It can’t be faked by one person — it only works because many agree at once.', 'Standing up costs more effort than clapping, so it means more.'], example: 'let something visible happen only when it’s genuinely earned' },
    { emoji: '🤝', title: 'Handshake Agreement', tag: 'everyday', desc: 'Two people physically clasp hands to seal a deal, before any paperwork exists.', borrow: ['Agreement is marked physically, not just implied.', 'It creates a clear "before" and "after" moment.'], example: 'seal it with a clear gesture before the paperwork catches up' },
    { emoji: '🏠', title: 'Housewarming', tag: 'life-event', desc: 'Guests bring a small gift and share a meal to mark someone’s new home together.', borrow: ['A new chapter is marked by inviting others in, not just moving in quietly.', 'Small gestures do a lot of the work.'], example: 'invite people in rather than announcing it after the fact' },
    { emoji: '🎂', title: 'Birthday Candle Blowing', tag: 'life-event', desc: 'A wish is made before extinguishing candles together, with everyone watching.', borrow: ['A brief pause for intention before the celebration continues.', 'Everyone present witnesses the same small moment.'], example: 'pause for intention before moving straight on to the next thing' },
    { emoji: '🍻', title: 'Farewell Toast', tag: 'life-event', desc: 'Colleagues raise a glass and share stories to send someone off well.', borrow: ['Stories are told out loud, not just remembered privately.', 'It gives permission to pause and reflect before moving on.'], example: 'tell the stories out loud instead of just saying thanks in passing' },
    { emoji: '🔥', title: 'Lighting the Olympic Cauldron', tag: 'sport', desc: 'A single flame, carried a long distance, ignites a cauldron that burns for the whole event.', borrow: ['A long build-up leads to one unmistakable, symbolic moment.', 'The flame stays visible throughout, a constant reminder of "we’re in this."'], example: 'build to one unmistakable moment everyone can point to afterwards' },
    { emoji: '🌾', title: 'Harvest Festival', tag: 'cultural', desc: 'A community gathers once a year to give thanks for the year’s work and share the results.', borrow: ['Effort is explicitly acknowledged, not just assumed to be noticed.', 'It happens on a fixed, predictable schedule.'], example: 'set a fixed moment to acknowledge the work, not just assume it’s seen' },
    { emoji: '🚪', title: 'Threshold Carry', tag: 'life-event', desc: 'A person is carried over the threshold of a new home to mark a new beginning.', borrow: ['A small, physical gesture marks a big, abstract change.', 'It’s a little playful, and that’s part of why it’s remembered.'], example: 'add one small, physical gesture to mark the change' },
    { emoji: '🔨', title: 'Auction Gavel Fall', tag: 'everyday', desc: 'A single knock of the gavel marks the exact, irreversible moment a decision is final.', borrow: ['One unambiguous signal ends any lingering negotiation.', 'Everyone in the room hears the same moment of finality.'], example: 'pick one clear signal that means "this is final"' },
    { emoji: '🌸', title: 'Coming-of-Age Ceremony', tag: 'cultural', desc: 'A community formally marks a young person’s transition into adulthood.', borrow: ['A vague, gradual process is given one clear marker.', 'The wider community, not just family, is asked to recognise the change.'], example: 'give a gradual process one clear, marked moment' },
    { emoji: '💐', title: 'Vow Renewal', tag: 'life-event', desc: 'A couple repeats their original promises years later, in front of family and friends again.', borrow: ['Commitments are worth repeating out loud, not just assumed to still hold.', 'It’s a chance to re-witness something that’s easy to take for granted.'], example: 'revisit old commitments out loud instead of assuming they still hold' },
    { emoji: '🖤', title: 'State Funeral', tag: 'public-sector', desc: 'A nation pauses together, following a fixed and dignified sequence, to mark a significant loss.', borrow: ['The sequence is fixed in advance, so no one has to decide what’s appropriate in the moment.', 'Scale of ceremony reflects scale of impact.'], example: 'agree the sequence in advance so no one has to improvise in the moment' },
    { emoji: '🤝', title: 'Diploma Handshake', tag: 'life-event', desc: 'Each graduate individually shakes the hand of the person presenting their diploma.', borrow: ['Even in a large group, each person gets one individual moment.', 'Physical contact makes an abstract achievement feel real.'], example: 'give each person one individual moment, even in a big group' },
    { emoji: '👶', title: 'Naming Ceremony', tag: 'life-event', desc: 'Family and friends gather to formally give a name and welcome a new arrival.', borrow: ['A private decision becomes a shared, public fact.', 'Everyone present becomes, in a small way, a witness to the start.'], example: 'make a private decision a shared, public fact' },
    { emoji: '🎾', title: 'Ceremonial First Pitch', tag: 'sport', desc: 'A ceremonial first action, done by someone notable, marks a competition’s official start.', borrow: ['One clear, symbolic action distinguishes "before" from "during."', 'Involving someone notable signals the occasion matters.'], example: 'have someone notable kick things off to signal it matters' },
    { emoji: '🏮', title: 'Lantern Festival', tag: 'cultural', desc: 'Lanterns are lit and displayed together across a community to mark the close of a celebration.', borrow: ['Individual small acts add up to something visible at scale.', 'It gives a clear, beautiful marker for "this chapter is complete."'], example: 'let small individual contributions add up to something visible' },
    { emoji: '✈️', title: 'In-Flight Safety Briefing', tag: 'everyday', desc: 'The same safety information is delivered the same way, every single time, no exceptions.', borrow: ['Consistency matters more than novelty — it’s done the same way every time, on purpose.', 'Repetition doesn’t excuse skipping it.'], example: 'do the basics the same way every time, no exceptions' },
    { emoji: '🎤', title: 'Presidential Inauguration', tag: 'public-sector', desc: 'A new leader takes an oath and delivers their first address, marking the formal, public start of their term.', borrow: ['The transition has one clear, witnessed moment, not a quiet handover.', 'The new leader’s first words are heard by everyone at once.'], example: 'open with one clear public statement of intent instead of a slow drip of updates' },
    { emoji: '⚖️', title: 'Courtroom "All Rise"', tag: 'public-sector', desc: 'Everyone in the room stands the moment the judge enters, a shared signal that proceedings are about to begin.', borrow: ['One simple, physical cue tells everyone "we’re starting now."', 'The signal works the same way every single time, no explanation needed.'], example: 'agree one simple cue that means "we’re starting now" and stick to it' },
    { emoji: '🌍', title: 'Citizenship Oath Ceremony', tag: 'public-sector', desc: 'New citizens speak a fixed oath together, out loud, to mark their formal welcome into a country.', borrow: ['A big, abstract change is marked by saying something out loud, together.', 'Doing it as a group makes an individual milestone feel shared.'], example: 'have everyone say their commitment out loud together, not just tick a box' },
    { emoji: '🖋️', title: 'Treaty Signing Ceremony', tag: 'public-sector', desc: 'Two sides sign the same document, in front of each other, to make an agreement official and witnessed.', borrow: ['Both sides sign in front of each other, not separately.', 'The physical act of signing makes the agreement feel final.'], example: 'have both sides confirm the agreement in front of each other, not over email' },
    { emoji: '🎶', title: 'National Anthem Opening', tag: 'public-sector', desc: 'A shared anthem opens formal proceedings, giving everyone in the room the same moment to stand together.', borrow: ['Everyone does the same thing, at the same time, without being told how.', 'It signals "this is formal" before a single word is spoken.'], example: 'open with something everyone can join in on before the formal business starts' },
    { emoji: '💀', title: 'Día de los Muertos', tag: 'cultural', desc: 'Families build home altars with photos, favourite foods and marigolds to welcome the memory of loved ones back for one night.', borrow: ['Someone’s contribution is remembered with specific, personal detail, not a generic thank-you.', 'A small, shared physical space holds the memory, not just words.'], example: 'build one small, specific shared marker for something that’s ending, not just a generic thank-you' },
    { emoji: '☕', title: 'Ethiopian Coffee Ceremony', tag: 'cultural', desc: 'Beans are roasted, ground and brewed by hand in front of guests over three unhurried rounds, each one named and savoured.', borrow: ['The process itself is shown, not hidden — people watch it happen.', 'Hosting takes visible time and effort, and that effort is the point.'], example: 'let people watch the process happen, not just receive the finished result' },
    { emoji: '🌿', title: 'Māori Pōwhiri (Welcome Ceremony)', tag: 'cultural', desc: 'Formal calls and speeches welcome visitors onto marae grounds, ending with a hongi — a pressed touch of forehead and nose — between hosts and guests.', borrow: ['A newcomer is formally, ceremonially welcomed in, not just added to a channel.', 'Welcome is reciprocal — both sides speak, not just the host.'], example: 'have the group formally welcome a newcomer out loud, not just cc them on an email' },
    { emoji: '💦', title: 'Songkran Water Festival', tag: 'cultural', desc: 'Thailand’s new year is marked by pouring water over each other and over elders, washing away the old year and blessing the new one.', borrow: ['One clear, physical act marks "we’re starting fresh."', 'Play is allowed to carry real meaning, not just be a break from it.'], example: 'mark a fresh start with one small, playful, shared act' },
    { emoji: '🎨', title: 'Holi (Festival of Colours)', tag: 'cultural', desc: 'Crowds throw coloured powder over each other to mark the arrival of spring, with rank and status deliberately set aside for the day.', borrow: ['Hierarchy is deliberately suspended for one shared moment — everyone ends up the same colour.', 'A joyful, slightly chaotic shared act bonds a whole group fast.'], example: 'deliberately set the usual hierarchy aside for one shared, playful moment' },
    { emoji: '🧧', title: 'Red Envelope Giving', tag: 'cultural', desc: 'At Lunar New Year, elders give money in red envelopes to younger family members, a small gesture repeated deliberately every year.', borrow: ['A small, symbolic gesture repeated every year becomes a real tradition.', 'Recognition flows deliberately from senior to junior, not the other way round.'], example: 'have someone senior give a small, deliberate gesture of thanks to those just starting out' },
    { emoji: '🌏', title: 'Welcome to Country', tag: 'cultural', desc: 'A traditional custodian formally welcomes visitors to their ancestral land before an event begins, acknowledging its history out loud.', borrow: ['Whose space this is, and who came before, is acknowledged explicitly, out loud.', 'It happens first, before any other business starts.'], example: 'name and acknowledge what came before this moment, out loud, before starting' },
    { emoji: '🫖', title: 'Tea Pouring to Elders', tag: 'life-event', desc: 'At weddings and family gatherings, the younger generation kneels or bows to serve tea to elders as a formal sign of respect and gratitude.', borrow: ['Respect is shown through a deliberate action, not just spoken thanks.', 'The junior person initiates the gesture — it isn’t waited for.'], example: 'have someone show respect through one deliberate action, not just a thank-you message' },
    { emoji: '🗣️', title: 'Haka', tag: 'sport', desc: 'A powerful, perfectly synchronised chant and dance is performed together before a match or significant occasion, showing unity and intensity.', borrow: ['The whole group commits to the same act, at full intensity, at the same time.', 'It signals "we are ready" before the real thing even starts.'], example: 'give the group one shared, high-energy moment before the real work begins' },
    { emoji: '🍰', title: 'Fika', tag: 'everyday', desc: 'A dedicated coffee-and-cake break, protected as real social time rather than squeezed in around "actual" work.', borrow: ['The break itself is protected and normalised, not taken guiltily.', 'Connecting with colleagues is treated as real work, not a distraction from it.'], example: 'protect a regular, unhurried break for connection, not just caffeine' },
    { emoji: '🌀', title: 'Sema (Whirling Dervish Ceremony)', tag: 'cultural', desc: 'Sufi practitioners turn in a precise, repeated rotation as a form of meditative devotion, the repetition itself part of the practice.', borrow: ['Repetition, done with full attention, becomes the practice rather than a chore.', 'A disciplined, controlled form makes space for something bigger than any one person.'], example: 'turn one small repeated action into a moment of real focus, not autopilot' },
    { emoji: '🥁', title: 'Capoeira Roda', tag: 'sport', desc: 'A circle of people forms around two players who spar through dance-like movement to live music, with everyone taking a turn in the middle.', borrow: ['Everyone in the circle eventually gets a turn in the middle.', 'The group’s energy — music, clapping — actively supports whoever’s there.'], example: 'make sure the group’s energy actively supports whoever’s currently in the spotlight' },
    { emoji: '🕯️', title: 'Irish Wake', tag: 'life-event', desc: 'Mourners gather to share stories, food, drink and even laughter, treating grief and celebration as belonging in the same room.', borrow: ['Grief and celebration are allowed in the same room, at the same time.', 'Specific stories are told out loud, not just condolences offered.'], example: 'make space for both the hard stories and the funny ones, in the same room' },
    { emoji: '🥃', title: 'Burns Night', tag: 'cultural', desc: 'A formal supper held every January to honour poet Robert Burns, following the same fixed, affectionate script of toasts and readings every year.', borrow: ['An old tradition is kept alive on purpose, with real ceremony, not left to fade.', 'A fixed script gives everyone in the room a role to play.'], example: 'give a recurring tradition a proper, fixed script instead of letting it fade into an afterthought' },
    { emoji: '🤫', title: 'Nyepi (Day of Silence)', tag: 'cultural', desc: 'Once a year, an entire island observes a full day of silence — no work, no lights, no travel — for collective reflection.', borrow: ['A full, enforced stop is sometimes more powerful than a partial one.', 'Everyone observes it together, so no one feels like the odd one out for slowing down.'], example: 'agree a full, enforced stop together, rather than a half-hearted slow-down' },
    { emoji: '🕺', title: 'Adumu (Jumping Dance)', tag: 'life-event', desc: 'Young warriors take turns competing to jump the highest in a circle, with the group actively watching and celebrating each turn.', borrow: ['Individual effort is performed in front of the whole group, not hidden away.', 'The group visibly celebrates each person’s turn, not just the best one.'], example: 'let people show their effort in front of the group, and make sure the group visibly celebrates it' },
    { emoji: '♨️', title: 'Hot Pot Culture', tag: 'everyday', desc: 'Communities gather daily in geothermal pools to talk and unwind together, regardless of job title or rank.', borrow: ['A shared, informal space becomes the default place for real connection.', 'Hierarchy softens naturally when everyone’s in the same low-key setting.'], example: 'find one shared, low-key setting where hierarchy naturally softens' },
    { emoji: '💧', title: 'Libation Pouring', tag: 'cultural', desc: 'A small amount of drink is poured onto the ground before a gathering begins, honouring those who came before and asking for blessing.', borrow: ['The group formally acknowledges who came before, out loud, before starting.', 'A brief, deliberate act marks "we begin with respect."'], example: 'open with a brief, deliberate acknowledgement of who or what came before' },
    { emoji: '☀️', title: 'Inti Raymi (Festival of the Sun)', tag: 'cultural', desc: 'An Inca festival marks the winter solstice with music, offerings and a full community gathering to honour the turning of the year.', borrow: ['A fixed point in the calendar is marked with real ceremony, not left to pass unnoticed.', 'The whole community turns out, not just its leaders.'], example: 'mark a fixed point in the year properly, rather than letting it slide by unmarked' },
    { emoji: '🏇', title: 'Naadam Opening Ceremony', tag: 'sport', desc: 'Mongolia’s "Three Games of Men" — wrestling, archery, horse racing — opens with a formal parade before any competition begins.', borrow: ['Competition is preceded by real ceremony, not just a whistle.', 'A clear, marked "before" separates preparation from the main event.'], example: 'give real ceremony to the moment before the work begins, not just a quiet start' },
    { emoji: '🥖', title: 'Apéro', tag: 'everyday', desc: 'A relaxed pre-dinner gathering over drinks and small snacks, treated in France as essential social time before the "real" meal.', borrow: ['Informal connection time is protected and expected, not squeezed in as an afterthought.', 'It’s deliberately low stakes, with no agenda.'], example: 'protect a low-stakes, no-agenda moment before the "real" thing starts' },
    { emoji: '🍊', title: 'Tết Ancestor Offering', tag: 'cultural', desc: 'At Lunar New Year, families prepare special food and offer it at a home altar to honour their ancestors.', borrow: ['Gratitude toward those who came before is made specific and concrete, not general.', 'The same act is repeated every year, on purpose.'], example: 'make gratitude specific and concrete, not just a generic thank-you' },
    { emoji: '🎊', title: 'Doljanchi (First Birthday)', tag: 'life-event', desc: 'At a baby’s first birthday, the child picks one object from a table in front of family, said to predict their future path.', borrow: ['One small, playful, symbolic act stands in for a much bigger hope.', 'Everyone present witnesses the same small, meaningful moment together.'], example: 'use one small, playful, symbolic act to represent a much bigger hope or intention' },
    { emoji: '🍺', title: 'Oktoberfest "Prost"', tag: 'everyday', desc: 'Steins are raised together on a shouted count, with direct eye contact required around the table before the first drink.', borrow: ['A simple shared rule turns a routine moment into a real connection point.', 'Everyone participates in the same small ritual at exactly the same time.'], example: 'add one small shared rule that turns a routine moment into real connection' },
    { emoji: '🌴', title: 'Lei Greeting', tag: 'life-event', desc: 'A garland of flowers is placed around a visitor’s neck as a welcome, making arrival and hospitality visible to everyone.', borrow: ['Welcome is made physical and visible, not just said — everyone can see who’s new.', 'Hospitality is offered before any business begins.'], example: 'give a new arrival a visible, physical welcome before getting into business' }
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

  const TAG_LABELS = {
    'public-sector': 'Public sector & ceremony',
    cultural: 'Cultural & religious',
    'life-event': 'Life events',
    everyday: 'Everyday moments',
    sport: 'Sport & competition'
  };

  const CUSTOM_RITUALS_KEY = 'ww-rituals-custom';
  const CUSTOM_PROCESSES_KEY = 'ww-processes-custom';
  const STORAGE_KEY = 'ww-rituals-saved';
  const VOTED_KEY = 'ww-room-voted';
  const ROOM_CODE_KEY = 'ww-room-code';
  const CODE_CHARS = 'ABCDEFGHJKMNPQRSTUVWXYZ23456789';

  let ritualIdx = 0;
  let processIdx = 0;
  let currentUser = null;
  let db = null;
  let auth = null;
  let ritualQueue = [];
  let processQueue = [];
  let activeTag = 'all';
  let roomCode = null;
  let roomUnsubscribe = null;

  const el = (id) => document.getElementById(id);

  function loadJSON(key) {
    try { return JSON.parse(localStorage.getItem(key) || '[]'); } catch (e) { return []; }
  }
  function saveJSON(key, value) {
    try { localStorage.setItem(key, JSON.stringify(value)); } catch (e) { /* ignore */ }
  }

  function allRitualsRaw() { return RITUALS_BASE.concat(loadJSON(CUSTOM_RITUALS_KEY)); }
  function allRituals() {
    const list = allRitualsRaw();
    if (activeTag === 'all') return list;
    return list.filter((r) => r.tag === activeTag || !r.tag);
  }
  function allProcesses() { return PROCESSES_BASE.concat(loadJSON(CUSTOM_PROCESSES_KEY)); }

  // Shuffle-bag draw: work through every option in a random order before any repeat.
  function shuffledIndices(length) {
    const arr = Array.from({ length }, (_, i) => i);
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      const tmp = arr[i]; arr[i] = arr[j]; arr[j] = tmp;
    }
    return arr;
  }

  function nextFromQueue(queue, length, currentIdx) {
    if (length === 0) return 0;
    if (queue.length === 0) {
      queue.push.apply(queue, shuffledIndices(length));
      if (queue.length > 1 && queue[0] === currentIdx) {
        const tmp = queue[0]; queue[0] = queue[1]; queue[1] = tmp;
      }
    }
    return queue.shift();
  }

  function nextRitualIndex() { return nextFromQueue(ritualQueue, allRituals().length, ritualIdx); }
  function nextProcessIndex() { return nextFromQueue(processQueue, allProcesses().length, processIdx); }

  function renderRitual(idx) {
    ritualIdx = idx;
    const list = allRituals();
    const r = list[idx] || list[0];
    el('ritual-icon').textContent = r.emoji;
    el('ritual-title').textContent = r.title;
    el('ritual-desc').textContent = r.desc;
  }

  function renderProcess(idx) {
    processIdx = idx;
    const list = allProcesses();
    const p = list[idx] || list[0];
    el('process-icon').textContent = p.emoji;
    el('process-title').textContent = p.title;
    el('process-desc').textContent = p.desc;
  }

  function updateCombo() {
    const r = allRituals()[ritualIdx];
    const p = allProcesses()[processIdx];
    if (!r || !p) return;
    el('combo-ritual').textContent = r.emoji + ' ' + r.title;
    el('combo-process').textContent = p.emoji + ' ' + p.title;
    const list = el('borrow-list');
    list.innerHTML = '';
    (r.borrow || []).forEach((line) => {
      const li = document.createElement('li');
      li.textContent = line;
      list.appendChild(li);
    });
    const exampleFragment = r.example || ('try one small, deliberate version of it in your next ' + p.title.toLowerCase());
    el('r-example').innerHTML = 'For example: “Before your next ' + escapeHtml(p.title) + ', ' + escapeHtml(exampleFragment) + '.”';
    el('try-input').value = '';
    if (currentUser) {
      setStatus('Signed in — saves sync to your account.');
    } else if (firebaseConfigured()) {
      setStatus('Click "Save to my list" to sign in with Google and save this, or use "Share to team board" to post it to your team’s session.');
    } else {
      setStatus('Saved privately in this browser — nothing here is shared publicly.');
    }
  }

  function setStatus(msg) { el('r-status').textContent = msg; }

  function escapeHtml(s) {
    const d = document.createElement('div');
    d.textContent = s;
    return d.innerHTML;
  }

  // ---------- clipboard (with fallback for browsers that block the async API) ----------
  function copyText(text) {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      return navigator.clipboard.writeText(text).catch(() => copyTextFallback(text));
    }
    return copyTextFallback(text);
  }

  function copyTextFallback(text) {
    return new Promise((resolve, reject) => {
      try {
        const ta = document.createElement('textarea');
        ta.value = text;
        ta.setAttribute('readonly', '');
        ta.style.position = 'fixed';
        ta.style.left = '-9999px';
        document.body.appendChild(ta);
        ta.select();
        ta.setSelectionRange(0, text.length);
        const ok = document.execCommand('copy');
        document.body.removeChild(ta);
        if (ok) resolve(); else reject(new Error('execCommand failed'));
      } catch (e) {
        reject(e);
      }
    });
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

  // ---------- filter ----------
  el('ritual-filter').addEventListener('change', (e) => {
    activeTag = e.target.value;
    ritualQueue = [];
    const list = allRituals();
    ritualIdx = Math.min(ritualIdx, list.length - 1);
    renderRitual(nextRitualIndex());
    updateCombo();
  });

  // ---------- draw controls ----------
  el('draw-ritual').addEventListener('click', () => {
    renderRitual(nextRitualIndex());
    updateCombo();
  });
  el('draw-process').addEventListener('click', () => {
    renderProcess(nextProcessIndex());
    updateCombo();
  });
  el('draw-combo').addEventListener('click', () => {
    renderRitual(nextRitualIndex());
    renderProcess(nextProcessIndex());
    updateCombo();
  });

  function currentComboText() {
    const r = allRituals()[ritualIdx];
    const p = allProcesses()[processIdx];
    const note = el('try-input').value.trim();
    return {
      r, p, note,
      text: r.emoji + ' ' + r.title + ' → ' + p.emoji + ' ' + p.title +
        '\n\nWorth borrowing:\n' + (r.borrow || []).map((b) => '• ' + b).join('\n') +
        (note ? '\n\nWhat I’d try:\n' + note : '')
    };
  }

  el('share-team-btn').addEventListener('click', async () => {
    if (!db) { setStatus('Team board needs a live connection that isn’t available right now.'); return; }
    const { r, p, note } = currentComboText();
    const btn = el('share-team-btn');
    btn.disabled = true;
    let code = roomCode;
    if (!code) {
      code = randomRoomCode();
      try {
        await db.collection('rooms').doc(code).set({ createdAt: firebase.firestore.FieldValue.serverTimestamp(), active: true });
        showRoomActive(code);
        watchRoom(code);
      } catch (e) {
        btn.disabled = false;
        setStatus('Couldn’t start a team board right now — please try again.');
        return;
      }
    }
    try {
      await addRoomEntry(code, r, p, note, '');
      setStatus('Shared to your team board — code ' + code + '. Scroll down to see it and invite your team.');
      el('room-section').scrollIntoView({ behavior: 'smooth', block: 'start' });
    } catch (e) {
      setStatus('Couldn’t share to the team board — please try again.');
    }
    btn.disabled = false;
  });

  el('save-answer').addEventListener('click', async () => {
    const { r, p, note } = currentComboText();
    const saveBtn = el('save-answer');

    if (firebaseConfigured() && auth && !currentUser) {
      setStatus('Opening Google sign-in…');
      saveBtn.disabled = true;
      try {
        const result = await auth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
        currentUser = result.user;
      } catch (err) {
        saveBtn.disabled = false;
        setStatus('Sign-in didn’t finish, so this wasn’t saved. Try again, or use "Share to team board" instead.');
        return;
      }
      saveBtn.disabled = false;
    }

    const list = await getSavedList();
    list.push({ ritual: r.emoji + ' ' + r.title, process: p.emoji + ' ' + p.title, note, date: new Date().toISOString() });
    await persistSavedList(list);
    logSubmission(r, p, note);
    renderSavedList();
    setStatus(currentUser ? 'Saved to your account.' : 'Saved to your list below (this browser only).');
  });

  function logSubmission(r, p, note) {
    if (!db || !currentUser) return;
    db.collection('submissions').add({
      uid: currentUser.uid,
      name: currentUser.displayName || '',
      email: currentUser.email || '',
      ritual: r.title,
      process: p.title,
      note: note,
      createdAt: firebase.firestore.FieldValue.serverTimestamp()
    }).catch((err) => console.warn('Submission log failed', err));
  }

  // ---------- add your own ----------
  function wireAddForm(toggleId, formId, cancelId, onSubmit) {
    const toggle = el(toggleId);
    const form = el(formId);
    const cancel = el(cancelId);
    toggle.addEventListener('click', () => {
      const showing = !form.hidden;
      form.hidden = showing;
      toggle.setAttribute('aria-expanded', String(!showing));
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
    ritualQueue = [];
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
    processQueue = [];
    renderProcess(allProcesses().length - 1);
    updateCombo();
    setStatus('Added "' + name + '" to the work moment pool on this device.');
  });

  // ---------- Firebase (graceful no-op if not configured) ----------
  function firebaseConfigured() {
    const c = window.WW_FIREBASE_CONFIG;
    return c && c.apiKey && c.apiKey.indexOf('YOUR_') !== 0;
  }

  function initFirebase() {
    if (!firebaseConfigured() || typeof firebase === 'undefined') return;

    firebase.initializeApp(window.WW_FIREBASE_CONFIG);
    db = firebase.firestore();
    auth = firebase.auth();

    auth.onAuthStateChanged((user) => {
      currentUser = user;
      renderSavedList();
    });
  }

  // ---------- room (shared board, no sign-in required) ----------
  function randomRoomCode() {
    let code = '';
    for (let i = 0; i < 5; i++) code += CODE_CHARS[Math.floor(Math.random() * CODE_CHARS.length)];
    return code;
  }

  function setRoomStatus(msg) { el('room-status').textContent = msg || ''; }

  function showRoomActive(code) {
    roomCode = code;
    el('room-setup').hidden = true;
    el('room-active').hidden = false;
    el('room-code-display').textContent = code;
    saveJSON(ROOM_CODE_KEY, code);
    const params = new URLSearchParams(window.location.search);
    params.set('room', code);
    history.replaceState(null, '', window.location.pathname + '?' + params.toString());
  }

  function showRoomSetup() {
    roomCode = null;
    el('room-setup').hidden = false;
    el('room-active').hidden = true;
    saveJSON(ROOM_CODE_KEY, '');
    const params = new URLSearchParams(window.location.search);
    params.delete('room');
    const qs = params.toString();
    history.replaceState(null, '', window.location.pathname + (qs ? '?' + qs : ''));
    if (roomUnsubscribe) { roomUnsubscribe(); roomUnsubscribe = null; }
    el('room-board').innerHTML = '';
  }

  function watchRoom(code) {
    if (!db) return;
    if (roomUnsubscribe) roomUnsubscribe();
    roomUnsubscribe = db.collection('rooms').doc(code).collection('entries')
      .orderBy('votes', 'desc')
      .onSnapshot((snap) => {
        const votedIds = new Set(loadJSON(VOTED_KEY));
        const board = el('room-board');
        board.innerHTML = '';
        if (snap.empty) {
          board.innerHTML = '<p class="r-note">No combinations shared yet — be the first.</p>';
          return;
        }
        snap.forEach((doc) => {
          const data = doc.data();
          const voted = votedIds.has(doc.id);
          const row = document.createElement('div');
          row.className = 'r-room-entry';
          const noteHtml = data.note ? '<div class="r-room-entry-note">' + escapeHtml(data.note) + '</div>' : '';
          const nameHtml = data.name ? '<div class="r-room-entry-name">— ' + escapeHtml(data.name) + '</div>' : '';
          row.innerHTML =
            '<div class="r-room-entry-body">' +
              '<div class="r-room-entry-combo">' + escapeHtml(data.ritual || '') + ' → ' + escapeHtml(data.process || '') + '</div>' +
              noteHtml + nameHtml +
            '</div>' +
            '<button class="r-room-vote' + (voted ? ' voted' : '') + '" data-id="' + doc.id + '">' +
              '<span class="v-icon">' + (voted ? '♥' : '♡') + '</span><span>' + (data.votes || 0) + '</span>' +
            '</button>';
          board.appendChild(row);
        });
        board.querySelectorAll('.r-room-vote').forEach((btn) => {
          btn.addEventListener('click', () => voteEntry(btn.getAttribute('data-id')));
        });
      }, (err) => {
        setRoomStatus('Couldn’t load this room’s board: ' + (err && err.message ? err.message : 'please try again.'));
      });
  }

  function addRoomEntry(code, r, p, note, name) {
    return db.collection('rooms').doc(code).collection('entries').add({
      ritual: r.emoji + ' ' + r.title,
      process: p.emoji + ' ' + p.title,
      note: note,
      name: name || '',
      votes: 0,
      createdAt: firebase.firestore.FieldValue.serverTimestamp()
    });
  }

  async function voteEntry(entryId) {
    const votedIds = new Set(loadJSON(VOTED_KEY));
    if (votedIds.has(entryId) || !db || !roomCode) return;
    const ref = db.collection('rooms').doc(roomCode).collection('entries').doc(entryId);
    try {
      await db.runTransaction(async (t) => {
        const doc = await t.get(ref);
        if (!doc.exists) return;
        t.update(ref, { votes: (doc.data().votes || 0) + 1 });
      });
      votedIds.add(entryId);
      saveJSON(VOTED_KEY, Array.from(votedIds));
    } catch (e) {
      setRoomStatus('Vote didn’t go through — please try again.');
    }
  }

  el('room-start-btn').addEventListener('click', async () => {
    if (!db) { setRoomStatus('Rooms need a live connection that isn’t available right now.'); return; }
    const code = randomRoomCode();
    try {
      await db.collection('rooms').doc(code).set({ createdAt: firebase.firestore.FieldValue.serverTimestamp(), active: true });
      showRoomActive(code);
      watchRoom(code);
      setRoomStatus('Room started — share the code with the room.');
    } catch (e) {
      setRoomStatus('Couldn’t start a room right now — please try again.');
    }
  });

  el('room-join-btn').addEventListener('click', () => {
    const code = el('room-join-input').value.trim().toUpperCase();
    if (!code) return;
    if (!db) { setRoomStatus('Rooms need a live connection that isn’t available right now.'); return; }
    showRoomActive(code);
    watchRoom(code);
    setRoomStatus('Joined room ' + code + '.');
  });

  el('room-leave-btn').addEventListener('click', () => {
    showRoomSetup();
  });

  el('room-share-btn').addEventListener('click', async () => {
    if (!db || !roomCode) return;
    const { r, p, note } = currentComboText();
    const name = el('room-name-input').value.trim();
    try {
      await addRoomEntry(roomCode, r, p, note, name);
      setRoomStatus('Shared to the room board.');
    } catch (e) {
      setRoomStatus('Couldn’t share to the room — please try again.');
    }
  });

  el('room-export-btn').addEventListener('click', async () => {
    if (!db || !roomCode) return;
    try {
      const snap = await db.collection('rooms').doc(roomCode).collection('entries').orderBy('votes', 'desc').get();
      if (snap.empty) { setRoomStatus('Nothing to export yet.'); return; }
      const lines = ['Room ' + roomCode + ' — shortlist', ''];
      snap.forEach((doc) => {
        const d = doc.data();
        lines.push((d.votes || 0) + ' votes — ' + (d.ritual || '') + ' → ' + (d.process || '') + (d.note ? ' — ' + d.note : '') + (d.name ? ' (' + d.name + ')' : ''));
      });
      copyText(lines.join('\n')).then(
        () => setRoomStatus('Shortlist copied to your clipboard.'),
        () => setRoomStatus('Couldn’t copy automatically — try again.')
      );
    } catch (e) {
      setRoomStatus('Couldn’t build the shortlist right now — please try again.');
    }
  });

  function initRoomFromUrlOrStorage() {
    const params = new URLSearchParams(window.location.search);
    const urlCode = (params.get('room') || '').toUpperCase();
    const storedCode = loadJSON(ROOM_CODE_KEY);
    const code = urlCode || (typeof storedCode === 'string' ? storedCode : '');
    if (code && db) {
      showRoomActive(code);
      watchRoom(code);
    }
  }

  renderRitual(0);
  renderProcess(0);
  updateCombo();
  initFirebase();
  renderSavedList();
  initRoomFromUrlOrStorage();
})();
