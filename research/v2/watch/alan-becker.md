# Alan Becker: look and format reference for finance math

**Prepared for:** *Back of the Envelope* (YouTube Shorts, Instagram Reels, TikTok)
**Research date:** 2026-10-07
**Why he is here:** the user asked us to add Alan Becker as a **look and format** reference after rejecting the hand-drawn kraft-envelope look. He is not a finance channel and is **not** a benchmark. We studied him for one thing: how he turns maths into something you can see and enjoy through character animation, and which parts of that carry over to money maths.
**Rule used throughout:** every view, like, subscriber count and URL below comes from vidIQ (pulled 2026-10-07) or from the web sources listed at the end. Hex values are estimates from vidIQ's AI video walkthroughs and are marked "est." Finance numbers in section 6 were computed in Python for this file. Anything that is my own reading is labelled as such.

**vidIQ budget:** 9 of 10 calls used (75 credits): `channel_stats` ×1, `channel_videos` ×2 (popular Shorts, popular long-form), `youtube_search` ×3 (channel-restricted), `video_watch` ×1, `watch_shortform_content` ×2. The three `job_poll` calls are free.

---

## Summary

- **The channel is very large and still growing without new uploads.** It has **34.1M subscribers**, **9.96B views** and 270 videos. In the last 30 days it gained **+100K subscribers and +98.8M views** while publishing **0 videos**.
- **Maths is its best "education" franchise by far.** *Animation vs. Math* (2023) has **148.6M views**. Among the 50 popular long-form videos vidIQ returned, it has the highest current velocity (**7,091 views/hour**) and is the most-viewed upload from 2023 onwards. The sequels did well but fell away: Physics **49.3M**, Geometry **30.5M**, Coding **25.1M**.
- **His Shorts are not about maths.** The Shorts series ("[Noun] - An Actual Short") is slapstick. The top Short is *Ricochet* with **93.9M views**. The closest things to maths Shorts are *Clicks Per Second* (**64.4M**, a live number counter) and *Circle* (**9.4M**, a geometric shape used as a toy).
- **What carries over is the grammar, not the drawing style.** Numbers have mass. Operators are tools the character picks up. A result appears as a physical change (something grows, splits, eats, explodes or becomes a hole). There are no words and no explanations: the character finds the maths and the consequence plays out on screen.
- **We cannot afford his production model.** *Animation vs. Math* credits **13 animators** plus a sound designer, an editor, a composer and a production manager. Even the 24-second *Circle* credits **3 animators**. The feasible version for us is one rigged vector stick figure with a reusable pose library, numbers as kinetic-type objects, and procedural motion, all rendered by the existing `envelope-engine`. See [section 7](#7-production-reality).

---

## 1. Channel facts

| Field | Value |
|---|---|
| Channel | **Alan Becker**, [@alanbecker](https://www.youtube.com/@alanbecker) (ID `UCbKWv2x9t6u8yZoB3KcPtnw`) |
| Created / country | 2006-07-24 / US |
| Subscribers | **34,100,000** |
| Total views | **9,959,422,234** |
| Videos | 270 |
| Last 30 days (2026-09-07 → 2026-10-07) | +100,000 subs · +98,819,888 views · 0 videos published |
| vidIQ topics | Film, Video game culture, Entertainment |
| Tooling | Adobe Animate (formerly Flash), which he has used since 2006 (fandom wiki). Frame-by-frame vector animation |

### 1.1 Top 10 Shorts (vidIQ "popular Shorts")

All ten are slapstick from the "An Actual Short" series. None is about maths. In the 50 Shorts returned, lengths run from 13 s to 60 s, and the top 10 run 18 to 58 s.

| # | Short | Views | Likes | Length | Published |
|---|---|---:|---:|---:|---|
| 1 | [Ricochet](https://www.youtube.com/shorts/iBzLtNUspY0) | 93,853,859 | 4,154,151 | 40 s | 2023-08-19 |
| 2 | [Speedrun](https://www.youtube.com/shorts/RqhGnw-4TeQ) | 89,999,623 | 3,850,799 | 51 s | 2023-12-16 |
| 3 | [Faces](https://www.youtube.com/shorts/VKXMICY7l_g) | 87,023,542 | 3,502,450 | 35 s | 2023-07-22 |
| 4 | [Color Confusion](https://www.youtube.com/shorts/g5FCa7myUwY) | 75,328,295 | 3,457,459 | 43 s | 2022-10-29 |
| 5 | [More Faces](https://www.youtube.com/shorts/8oqYkEr3rTg) | 73,691,146 | 2,706,159 | 39 s | 2024-05-04 |
| 6 | [Bob Is Always There](https://www.youtube.com/shorts/gQp-2HUy_EI) | 65,918,817 | 2,814,653 | 58 s | 2023-07-15 |
| 7 | [Clicks Per Second](https://www.youtube.com/shorts/MUNdQtzgkig) | 64,365,806 | 2,569,032 | 53 s | 2023-04-01 |
| 8 | [Backrooms](https://www.youtube.com/shorts/c2IwDLj9o4Q) | 61,667,422 | 1,865,253 | 55 s | 2023-10-21 |
| 9 | [Sea Shanty](https://www.youtube.com/shorts/SeyBYD0B2BY) | 58,976,836 | 2,939,020 | 21 s | 2024-04-06 |
| 10 | [Cup Song](https://www.youtube.com/shorts/JkUv2UHKPss) | 50,902,874 | 2,347,787 | 18 s | 2023-07-29 |

### 1.2 Maths and STEM videos

Fans call this run the "Animation vs. Education" series (fandom wiki naming). It is written by lead animator Terkoiz.

| Video | Format | Views | Likes (rate) | Comments | Length | Published | Views/hr now |
|---|---|---:|---:|---:|---:|---|---:|
| [**Animation vs. Math**](https://www.youtube.com/watch?v=B1J6Ou4q8vE) | long | **148,624,555** | 1,618,675 (1.09%) | 67,202 | 14:03 | 2023-06-24 | **7,091** |
| [Animation vs. Physics](https://www.youtube.com/watch?v=ErMSHiQRnc8) | long | 49,272,499 | 1,295,106 (2.63%) | 45,279 | 16:08 | 2023-12-09 | 647 |
| [Animation vs. Geometry](https://www.youtube.com/watch?v=VEJWE6cpqw0) | long | 30,480,025 | 631,954 (2.07%) | 27,202 | 9:02 | 2024-06-29 | 1,121 |
| [Animation vs. Coding](https://www.youtube.com/watch?v=EFmxPMdBqmU) | long | 25,069,146 | 765,172 (3.05%) | 26,124 | 9:27 | 2025-03-01 | 1,376 |

**Shorts that touch maths, numbers or physics.** Only the two marked "watched" were viewed. The others are classified by title only.

| Short | Views | Length | Published | Why it is relevant |
|---|---:|---:|---|---|
| [Clicks Per Second](https://www.youtube.com/shorts/MUNdQtzgkig) (watched) | 64,365,806 | 53 s | 2023-04-01 | A live number counter is the story: the score escalates until the UI explodes |
| [Color Sorter](https://www.youtube.com/shorts/cgI5n5v2-UA) | 45,583,101 | 48 s | 2024-07-13 | Sorting puzzle (title only) |
| [Hydraulic Press](https://www.youtube.com/shorts/YMLC8iudXWI) | 40,246,054 | 44 s | 2024-02-24 | Force gag (title only) |
| [Tetris](https://www.youtube.com/shorts/k9VS5QLULHc) | 26,539,160 | 26 s | 2024-03-23 | Shapes and fitting (title only) |
| [Cartoon Physics](https://www.youtube.com/shorts/xrpieJz6qiE) | 24,628,973 | 47 s | 2024-08-31 | Physics gag (title only) |
| [Circle](https://www.youtube.com/shorts/r79NpYw8vAU) (watched) | 9,370,239 | 24 s | 2025-02-08 | A geometric circle becomes a ball, then a halo, a hula hoop and finally a hole |

**What the numbers say**

- **Maths travels.** The 2023 maths video still pulls about 7.1K views an hour, roughly 5.1M a month (est., 7,091 × 24 × 30). It is the channel's evergreen engine while no new videos are being published.
- **The first one gets the novelty premium.** Math 148.6M, then Physics 49.3M, Geometry 30.5M and Coding 25.1M. Each sequel still cleared 25M. The premise ("a stick figure discovers a subject from scratch") keeps working, but the first episode carries the surprise.
- **The biggest video has the lowest like rate:** 1.09%, against 2.07–3.05% for the sequels. Our reading: *Animation vs. Math* reached far past the fanbase, while the sequels mostly reached the core audience.
- **Shorts have a very high like rate** (Ricochet 4.43%, CPS 3.99%, Circle 3.94%) but few comments (0.015–0.032% of views). The long maths videos get about 1.4× to 7× more comments per view (0.045–0.104%). Our reading: viewers argue about and decode the maths. **Puzzle-like maths content drives comments. Slapstick drives likes.**

---

## 2. What was watched

These are vidIQ AI walkthroughs, all run with the same look-focused prompt. Use the timestamps and the order of events. Treat exact on-screen equations and hex values as the tool's estimates. In one place the tool wrote an equation that does not compute ("100 − 1 − 98 − 1 = −1"), so the exact equations in section 2.1 are not quoted as fact. The order of concepts matches press coverage (Cartoon Brew and Laughing Squid both describe counting → harder maths → Euler's identity).

### 2.1 Animation vs. Math (long-form, 14:03): first 60 s and key sequences

- **Frame 1:** a wide, centred shot of an empty **black void** (`#000000`→`#111111` floor gradient, est.). There is **no text and no UI**. The **orange** stick figure lies on the floor.
- **0:00–0:05:** the figure wakes up, stands and stretches.
- **0:06–0:13:** a glowing **white "1"** drops from above. The figure approaches and touches it.
- **0:14–0:23:** the figure picks up a bar, snaps symbols together and builds **1 + 1 = 2**. The result **evaluates live** with a heavy thud.
- **0:24–0:35:** it keeps stacking "+1". The total grows and **the equation physically pushes outward** to make room.
- **0:36–0:49:** it pushes digits together ("1" and "2" become "12"), which is **place value by touch**.
- **0:50–1:00:** the chains get long and the **camera pulls back** to show the equation trailing across an endless canvas. This is a scale reveal.
- **Key sequences:** the crossbar is pulled out of "+" to make "−", and counting goes below zero. **e^iπ comes alive and becomes the antagonist creature**. Repeated addition is wrapped in parentheses and condensed with "×". **Dividing by zero breaks the world**. Exponents unfold flat grids into 3D. A point is rotated off the number line into the imaginary axis, and the **unit circle throws off sine and cosine waves, which the figure wields as weapons**. In the series and calculus fight, the villain fires expansions and the hero blocks with an **integral sign used as a shield**. The ending resolves through **e^iπ + 1 = 0**.
- **Sound:** crisp UI clicks, **heavy mechanical thuds when an equation evaluates**, bass drops when the dimension changes, and an orchestral/synth score (Scott Buckley is credited).

### 2.2 Circle (Short, 24 s)

- **Frame 1:** 9:16. The top 75% is a **pure white** canvas and the bottom 25% is a soft grey floor gradient (`#E2E5E9`→`#CBD0D8`, est.). The **orange** figure (`#FF6A00`, est.) stands lower-left in a hand-on-chin "thinking" pose. A **black vector circle with a "+" draw cursor** sits beside him. There is no text.
- **0:00–0:01:** the cursor draws a circle, turns into a hand and **throws it to the figure**, who catches it.
- **0:02–0:07:** he dribbles the circle like a basketball (squash on each bounce).
- **0:08–0:12:** he flips it and foreshortens it into an **ellipse**, then spins it overhead like a halo.
- **0:13–0:18:** he drops it to his waist and **hula-hoops** to a rhythm.
- **0:19–0:23:** the hoop falls to his feet and **turns into a hole**. He drops through with a vacuum "pop". The cursor hovers over the empty hole, which sets up a loop.
- **Sound:** foley only: rubber squeaks, bounce thuds, whooshes and a deep pop.

### 2.3 Clicks Per Second (Short, 53 s)

- **Frame 1:** a clean **browser "click speed test"** UI. It has a title, time buttons (1s/5s/10s/20s/30s/60s), a "Time 03" card, a **blue "Clicks 17" card** (`#3399FF`, est.), a big click target with a ripple, and a white cursor. The background is `#F4F4F6` (est.). There is no character yet. **The number is already counting in frame 1.**
- **0:00–0:04:** the mouse finishes a run and a result pops up: **6.4 clicks/s**. The orange figure walks in.
- **0:05–0:15:** he shoves the popup aside, hits **TRY AGAIN** and slaps the target by hand. Result: **8.2/s**. Every slap is synced 1:1 with a sound and screen shake.
- **0:16–0:30:** he brings in Red, Yellow, Green and Blue for **18.6/s**, then adds buffs (Speed II, Haste II icons).
- **0:31–0:38:** cut to an **animation-software timeline** at 30 fps, where he draws pecking birds and grabs a jackhammer (the medium itself becomes the weapon).
- **0:39–0:52:** everything hits at once. **The counter blurs into the thousands, the blue target heats to orange and white, cracks and explodes.** The ending is a charred screen.
- **Structure:** an escalation ladder (solo → team → magic → meta-animation) built around **one number that goes up**.

---

## 3. The visual system

### 3.1 Palette (est.)

The rule: **the character is the only saturated colour on screen.** The maths and the UI are neutral: white on black, or black on white. Colour equals identity.

| Role | Dark stage (Animation vs. Math) | Light stage (Circle, CPS) |
|---|---|---|
| Background | `#000000` → `#111111` floor | `#FFFFFF`, floor `#E2E5E9`→`#CBD0D8` (CPS UI `#F4F4F6`) |
| Hero figure | Orange `#FF6A00`–`#FF7700` | Orange `#FF6A00`–`#FF7A00` |
| Maths / tools / cursor | White `#FFFFFF` | Black `#000000`, text `#111111` |
| Guides / grids | Grey `#333333`–`#666666` | UI grey `#D1D1D6` |
| UI accent | – | Blue `#3399FF`, ripple `#70B4FF` |
| "Overheat" state | white impact frames | `#FFAA00` → `#FFFF44` → flash `#FFFFFF`, smoke `#2B2B2B` |
| Supporting cast | – | Red `#E51E25`, Green `#44D62C`, Blue `#00A8FF`, Yellow `#FFD000` |

### 3.2 Line, figure and backgrounds

- **Line:** clean, anti-aliased vector strokes with **one uniform weight and round caps** (the classic Flash look). There is no texture, grain or paper. This is the opposite of the kraft look the user rejected.
- **The stick figure:** a **filled circular head**, a one-line torso, and arms and legs with **two segments each** (elbow and knee bends). There are no hands, feet or clothes, and **no face**. Emotion comes entirely from pose, silhouette and timing. Our reading: the Shorts "Faces" (87.0M) and "More Faces" (73.7M) are titled as gags precisely because faces are normally absent (title-only inference). Head-to-body proportion is about 1 : 4 (est.), and limb stroke is roughly a quarter to a third of the head diameter (est.).
- **Backgrounds:** an **empty void** (black or white) with only a soft floor gradient for a ground plane, **or a faithful vector copy of a real computer surface** (desktop, browser tool, animation-software timeline). The stage is always either "nothing" or "a screen you already know".
- **"Computer" elements:** the **cursor is a character** (the animator's hand). It draws, drags, throws and hovers menacingly. **UI panels are physical**: cards are ledges to stand on, buttons can be grabbed, and a click target can overheat, crack and explode. Software states (a timeline at 30 fps, status-effect icons) become tools.

### 3.3 Motion grammar

- **Anticipation → action → overshoot → settle**, with squash and stretch on contact (the circle squashes on each bounce).
- **Hold, then snap:** long holds for curiosity, then 2–4 frame snaps for action (my reading of "snappy easing" in the walkthroughs).
- **Every impact has three layers**, in the same frame: a **sound**, **screen shake**, and on big hits a **white impact frame**.
- **Smears and motion-blur lines** on very fast actions (the slap and peck frenzy in CPS).
- **Scale reveal by camera pull-back** (the endless equation in AvM). Push-ins are used for focus.
- **Escalation ladders:** each beat raises the stakes one notch (dribble → halo → hula hoop → hole; solo → team → magic → meta).
- **Sound is mostly foley**: clicks, thuds, squeaks, whooshes and bass drops. The Shorts use little or no music. Long-form uses a score.

---

## 4. How the maths is made visible

| Device | Alan Becker example | Principle |
|---|---|---|
| **Numbers are objects** | The "1" drops from above, is touched, carried, stacked, and pushed together into "12" | A number has mass, size and position. The viewer *sees* place value |
| **Operators are tools** | The "+" crossbar is pulled out to make "−". Parentheses gather terms and "×" condenses them. sin/cos are weapons. ∫ is a shield | Each operation is an *action verb* the character performs |
| **Results are transformations** | Equations evaluate with a thud. The line pushes outward as the sum grows. Exponents unfold 2D into 3D. e^iπ becomes a creature | The answer is a change in the world, not text on screen |
| **Impossible maths breaks the world** | Dividing by zero causes chaos | A wrong move has a physical consequence (great for "traps") |
| **Shapes are toys** | Circle → ball → ellipse → hoop → hole | Each transformation is still the same object, read a new way |
| **Numbers are a score** | CPS counter 6.4 → 8.2 → 18.6 → thousands → explosion | One number going up is a complete story |
| **Scale is shown by the camera** | The pull-back reveals an equation running off the canvas | "How big is it?" is answered by zooming out |
| **Nothing is explained** | No words, no labels, no VO | The character *discovers*, and the viewer works it out with them. That is why people rewatch and comment |

---

## 5. Hooks without dialogue (first 1–3 s)

| Piece | 0–3 s | Why it holds |
|---|---|---|
| Circle | The cursor draws a circle and **throws it to the figure** within 1 s | Creator meets creation: an object arrives and the character must react |
| Clicks Per Second | Frame 1 is a **familiar UI with a number already counting** (17 clicks, 3 s left) | The goal is clear without words: *beat the number* |
| Animation vs. Math | A dark void, a figure waking up, **one white "1" falling** | Slow, curiosity-led. It is long-form, so the title and thumbnail do the hooking |

**Patterns we can use**

1. **Frame 1 holds both the protagonist and the object.** No title card, no intro.
2. **Something arrives or changes within 1 s** (a thrown object, a falling number, a counter ticking).
3. **Use a surface people already know** (a click-test UI, a calculator, a bank app balance, a receipt) so the goal needs no explaining.
4. **One-noun premise titles:** "[Noun] - An Actual Short" (*Circle*, *Ricochet*, *Tetris*). The noun is the whole pitch.
5. **The mute test:** the first 2 s must make sense with the sound off. That matters for us because we will keep a voice-over. The picture has to carry the hook alone and the VO comes in on top.

---

## 6. What transfers to finance maths

Each idea pairs one Alan Becker device with one money calculation. All figures were checked in Python on 2026-10-07 (monthly compounding where relevant).

1. **The ×1.07 gate (compounding).** The figure pushes a **$1,000 coin** through a gate labelled **×1.07**, once per "year". Each pass it comes out bigger. By gate 10 it is **$1,967** (about double; Rule of 72: 72 ÷ 7 ≈ 10.3 years). By gate 30 it is **$7,612**, too big to push, and it rolls back and flattens him. *Device: operator as a physical tool + result as transformation + a final scale gag.*
2. **The interest creature (credit card).** A **$5,000** balance sits on a little creature that **eats 2% a month (24% APR ÷ 12) = $100**. The figure feeds it $100 every month and the balance never moves. Paying $150 instead takes **56 months and $8,322**. *Device: e^iπ turned into a living antagonist. The maths has an appetite.*
3. **The paycheck carve.** A **$3,000** number block lands. The figure saws it into **$1,500 / $900 / $600** (50/30/20) and slides each piece into its own envelope. This keeps a small nod to our brand. *Device: digits pushed together and split by hand (the "1"+"2"→"12" moment in reverse).*
4. **The snowball he can't stop (monthly investing).** **$200 a month at 7%**. The figure rolls a small snowball downhill. At year 30 it is **$243,994** and he is sprinting to keep up. At year 40 it is **$524,963**, against **$96,000** actually put in, and it runs him over. *Device: escalation ladder + camera pull-back for scale.*
5. **The inflation shrink ray.** A **$100** bill shrinks a little each year at **3%**. At year 24 it buys what **$49** buys today (Rule of 72: 72 ÷ 3 = 24, so half). The figure ends up holding a postage-stamp-sized bill. *Device: shapes transforming but still the same object (Circle → hole).*
6. **The fee leak.** **$100,000 for 30 years at 7%** grows to **$761,226**. A tiny **"1%" gremlin** sips from the pipe and the tank ends at **$574,349**, a quarter (24.5%) gone. A **0.1%** fee leaves **$740,169**, so the gap between 1% and 0.1% fees is **$165,820**. *Device: a small object with a huge consequence. The cursor-as-character idea, reused as a villain.*
7. **The operator morph (4% rule).** The figure stands before **"$40,000 ÷ 0.04"**, grabs the "÷ 0.04", twists it, and it **morphs into "× 25"**. The pile becomes **$1,000,000**. *Device: the "+" crossbar pulled out to make "−". The operator itself changes shape to show it is the same thing.*
8. **The mortgage splitter.** A **$400,000, 30-year loan at 6.5%** means a **$2,528** payment block. The figure pushes it into a splitter: **$2,167 falls into the bank's bucket and $362 into "your house"**. Over the years he slowly drags the divider across. Total interest: **$510,178**. *Device: UI and machinery as physical objects, plus a repeated effort loop.*
9. **The counter that overheats (earning rate).** This takes the *Clicks Per Second* structure. The frame-1 surface is a "$ per hour" readout at **$28.85/h** ($60,000 ÷ 2,080 hours). He escalates through overtime, a side hustle and investing returns. The counter heats up from blue to orange to white, then cuts to the real answer. *Device: one number going up + escalation ladder + UI failure.* (The escalation steps need their own sourced numbers before scripting.)
10. **Divide-by-zero glitch (the "never" payoff).** In idea 2, when he pays only the interest, the payoff time reads **"$5,000 ÷ $0 of principal per month = ∞ months"** and the screen glitches like AvM's divide-by-zero. *Device: impossible maths breaks the world. Use it as a punchline, not as an episode.*

**Rules to carry over:** one saturated hero colour; maths in neutral ink; every operation is a verb the figure performs; every result is a change in the world; one number per short that the viewer watches move; a twist or loop at the end (the cursor hovering over the hole).

**Do not copy:** his characters (the orange "Second Coming", Red, Blue, Green, Yellow, King Orange, Purple), his orange-on-black key art, or the "Animator vs. Animation" cursor-versus-creation premise as our signature. Borrow the **principles**. The stick figure itself is a generic archetype, but ours should be distinct (see 7.2).

---

## 7. Production reality

### 7.1 What Alan Becker's version costs

- **Animation vs. Math** credits **1 writer, 13 animators**, a sound designer, an editor, a composer and a production manager (YouTube description).
- **Circle (24 s)** credits **3 animators** plus a writer and a sound person. **Tetris (26 s)** credits **5 animators**. **Feel Better (55 s)**: 2 animators.
- It is all **frame-by-frame in Adobe Animate**. Every bounce, smear and impact frame is drawn. A small team cannot keep that up at Shorts cadence.

### 7.2 The feasible version: "puppet + type + physics", rendered in code

We already have `envelope-engine` (Node, `@napi-rs/canvas` → ffmpeg, 1080×1920 at 30 fps, JSON specs, synthesised foley, safe-zone linter). The look changes. The pipeline stays.

1. **One rigged vector figure.** A filled circular head, a one-line torso, and 2-bone limbs solved with **2-bone IK** so hands and feet can be pinned to objects. One uniform stroke, round caps. Pick **our own hero colour** (not Becker orange) and add one small identifying detail (my suggestion: a pencil behind the "ear" or an envelope-flap cap) so the figure reads as ours.
2. **A pose library of about 16 key poses**, stored as joint-angle sets: stand, think (hand to chin), point, push, pull, lift overhead, carry, throw, catch, feed, saw or carve, run (4-pose cycle), climb, shrug, shocked jump, flattened. Transitions are interpolated with ease-in-out plus a **spring overshoot**. Secondary motion (head bob, follow-through, breathing) is procedural.
3. **Interaction primitives** built from the library: `push`, `pull`, `lift`, `throw`, `carve`, `feed`, `ride`, `getFlattened`. Each is anticipation pose → contact pose → a 2–3 pose effort loop → release, with the hand pinned by IK to the object's anchor.
4. **Kinetic typography for numbers.** Numbers are **glyph bodies**: bold geometric sans with tabular figures, plus position, scale and mass. Operators are separate glyphs that can be grabbed, rotated and **morphed** (path interpolation "÷0.04" → "×25"). Counters tick with easing. **Every value is computed from the spec's maths**, so the screen cannot drift from the Python check.
5. **Procedural physics** for bounces, stacks, rolling and squash and stretch. Use simple Verlet or tween presets, not a full engine.
6. **Impact kit:** a 1–2 frame white flash, 6–10 px screen shake decaying over about 6 frames, an optional radial "hit lines" burst, and a matched SFX (thud, click, pop, bass drop). One op triggers all four.
7. **Stages:** a **white void with a floor gradient** (default) or a **dark void** (for "night" topics such as debt), plus vector copies of familiar money surfaces (calculator, bank-app balance, receipt, pay stub). These must be generic and never a real bank's branding.
8. **New engine ops:** `figure`, `pose`, `act` (interaction primitive), `glyph`, `operator` (with `morph`), `counter`, `gate`, `creature`, `split`, `impact`, `stage`. The existing `camera`, captions, `loop` and linter carry over unchanged.

### 7.3 What can be automated, and what can't

| Can be automated (code) | Needs a human |
|---|---|
| All maths and every on-screen number (single source of truth, Python-checked) | **The gag:** premise, twist and ending loop. This is the whole value of the Becker model |
| Counter tick-ups, glyph layout, operator morphs | **Storyboard and comic timing:** where to hold, where to snap |
| Pose-to-pose interpolation, IK contact, overshoot, secondary motion | **New poses** for any new action (an artist keys 2–4 poses once, then they go in the library for good) |
| Physics bounces, rolls, stacks, squash and stretch | **Character design** of recurring props and villains (the interest creature, the fee gremlin): designed once, animated as 2–3 reusable loops |
| Impact kit (flash + shake + SFX) placed on events | **One hand-keyed "hero moment" per short** (a smear, a creature bite, the final explosion) when procedural motion looks too stiff |
| Camera moves, safe zones, captions, frame-0 thumbnail, loop crossfade | Sound taste and music choice; the final "is this funny?" pass |
| Variants (same gag, different rates, amounts or countries) | Fact-checking the real-world inputs (rates, prices) before posting |

**Main risk:** with too few poses the figure looks like a stiff "puppet". Fix this with strong silhouettes, hold-then-snap timing (2–4 frame transitions), overshoot on every stop, and an impact kit on every contact. Stick figures are forgiving. Weak timing is what gives the puppet away, not missing detail.

**Suggested pilot:** ideas **1 (×1.07 gate)** and **2 (interest creature + divide-by-zero payoff)**. Between them they need about 8 poses (stand, push, effort loop, shocked, flattened, feed, shrug, think), one gate prop, one creature and one counter. That is enough to test the whole pipeline before building the full library.

---

## Sources

- vidIQ (2026-10-07): `channel_stats` and `channel_videos` (popular Shorts and long-form) for @alanbecker; channel-restricted `youtube_search` (three queries); `video_watch` on B1J6Ou4q8vE; `watch_shortform_content` on r79NpYw8vAU and MUNdQtzgkig. Credits were read from the YouTube descriptions returned by vidIQ.
- [Cartoon Brew: "The Math Checks Out In Alan Becker's Viral Short 'Animation Vs. Math'"](https://www.cartoonbrew.com/cartoon-brew-pick/alan-becker-animation-vs-math-short-231255.html)
- [Laughing Squid: Animation vs. Math](https://laughingsquid.com/alan-becker-animator-vs-math/) · [Animation vs. Physics](https://laughingsquid.com/animation-vs-physics-alan-becker/) · [Animation vs. Geometry](https://laughingsquid.com/animation-vs-geometry-alan-becker/)
- [Animator vs. Animation Wiki: Alan Becker (YouTube channel)](https://animatorvsanimation.fandom.com/wiki/Alan_Becker_(YouTube_channel)) · [Adobe Animate](https://animatorvsanimation.fandom.com/wiki/Adobe_Animate) · [Terkoiz](https://animatorvsanimation.fandom.com/wiki/Terkoiz)
