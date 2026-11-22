# LearnSpark

Virginia SOL practice for Grades 1–8 in Math, Reading, Science, Writing, and History & Social Science,
plus Story Time read-aloud books, in one web page.
No server, no accounts, no build step. Each learner's progress is saved in the
browser on the device they use.

## What's inside

- **Learn:** SmartScore practice for every SOL skill in Math, Reading, Science, Writing,
  and History & Social Science, with lessons, worked examples, pictures, and mistake review.
  - Over 1,200 written questions and 350 math question patterns on top of the originals, so practice rarely repeats.
  - **Challenge questions** (gold star) appear as the SmartScore rises, or any time with the Challenge switch, and earn bonus XP.
  - Grades 1–3: 2023 Math SOL, phonics and reading (2024 English strands), science, and history & social science.
  - Grade 4: Virginia Studies. Grade 5: 2023 Math SOL (5.NS–5.PFA), Science 5.2–5.9, U.S. History to 1865.
  - Grade 6: U.S. History 1865 to the Present.
  - Grade 7: 2023 Math SOL (7.NS–7.PFA), Life Science, Civics & Economics.
  - Grade 8: 2023 Math SOL (8.NS–8.PFA), Physical Science, World Geography.
- **About & privacy:** a page inside the app explains what is stored and where.
- **SOL Practice Test:** mixed tests with flag, cross-out, review, and submit, then results by standard.
- **Stories:** 21 read-aloud books in four levels (Grades 1–8), where Sparky listens and helps,
  plus Detective Case Files and Sound Swap. The newest 12 have painted pictures and themes from
  Ghana and West Africa, Virginia history, science, and everyday kid life.
- **Videos:** a picture-book video for each of the 12 newest stories (narrated, with captions),
  and short lesson explainers (big ideas, then one worked question) for Grade 4–6 math, science,
  reading and writing, and Grade 7–8 math. Each video has a **Save for offline** button.
- **SOL-style question formats:** besides multiple choice, practice and practice tests now use
  type-the-answer (with an on-screen keypad), sort into groups, select all that apply, put in
  order, place a point on a number line, and plot a point on a coordinate grid.
- **Today's 15 minutes:** a daily plan on the home screen: a Fact Sprint warm-up, one skill to
  practice, past mistakes to fix, and a story or lesson video. Finishing it earns bonus stars.
- **Fact Sprint:** a 20-fact speed drill (addition/subtraction for Grades 1–2, times tables and
  division for Grade 3 and up) that focuses on slow or missed facts and shows a times-table map.
- **Printable worksheets:** pick up to three skills and print a fresh worksheet with an answer key.
- **Move progress between devices:** Settings → Move progress saves a progress file or a
  copy-and-paste transfer code. No accounts and no server.
- **Hear your child read (optional):** grown-ups can turn on saving reading recordings. They stay
  on the device and play back in the Parent Report.
- **Arcade:** Speed Math, Math Asteroids, Number Ninja, CodeBot, Fraction Match, Word Wizard,
  SOL Quiz Battle, Map Quest, Timeline Dash, Who Am I?, Pizza Shop, and Integer Elevator.
- **Family Challenge,** Sparky's closet (spend stars on outfits), printable certificates,
  and a parent report with practice tests and reading speed.

## Narration

Story Time books, lessons, Sound Swap and Detective cases are read by a natural AI voice
(Kokoro TTS, generated ahead of time and stored in `audio/`). Practice questions use a Claude
voice inside claude.ai, or the most natural voice on the device. Choose the voice in Settings.

## Files

| File | What it is |
| --- | --- |
| `index.html` | The whole app |
| `manifest.webmanifest`, `icon.svg`, `icon-192.png`, `icon-512.png` | Lets you add LearnSpark to a tablet or phone home screen |
| `sw.js` | Keeps the app working offline after the first visit |
| `assets/` | Pictures (subject illustrations, story art, game art, avatars) and `assets/video/` |
| `audio/` | Recorded narration (about 45 minutes, 16 MB) |

Keep the `assets/` and `audio/` folders next to `index.html`. Pictures and narration are saved
for offline use after the first visit. Videos stream when online; tap **Save for offline** on any
video to keep it on the device. After an update, open the site once while online so devices
pick up the new version.

## Put it on GitHub Pages (free, about 10 minutes, no coding)

1. Sign in at github.com and click **New repository**.
   Name it `learnspark`, choose **Public**, and click **Create repository**.
   (GitHub Pages is free for public repositories.)
2. On the new repository page, click **uploading an existing file**.
   Drag in every file and folder from this folder, then click **Commit changes**.
3. Go to **Settings → Pages**. Under **Build and deployment**, set **Source** to
   **Deploy from a branch**, choose branch **main** and folder **/ (root)**, then **Save**.
4. Wait a minute or two and refresh. The page shows your address:
   `https://YOUR-USERNAME.github.io/learnspark/`

To update the app later, upload the new `index.html` the same way (step 2).
GitHub replaces the old file and the site updates in a minute or two.

## On the kids' devices

- Open the address in **Chrome, Edge, or Safari**. These browsers can listen in
  Story Time. Firefox can't listen yet; everything else works there.
- The first time a child taps **Read to Sparky**, the browser asks for the
  microphone. Choose **Allow**.
- Tablet or phone: use **Add to Home Screen** (Safari: Share button; Chrome: ⋮ menu)
  so it opens like an app.
- Progress stays on each device. A tablet and a laptop keep separate progress.

## A custom address (optional)

The `github.io` address is free and works well. A name of your own, such as
`learnspark-family.com`, costs about $10–15 a year from a domain registrar.
After buying one: in **Settings → Pages → Custom domain**, enter it and save;
at the registrar, add a `CNAME` record for `www` pointing to
`YOUR-USERNAME.github.io`; then tick **Enforce HTTPS** once it's offered.
Skip "free domain" sites: they tend to expire or disappear.

## Privacy

- No names, scores or recordings are sent anywhere by LearnSpark. Everything is
  stored in the browser on the device.
- When Sparky listens, the browser's own speech service turns speech into text
  (Google in Chrome, Microsoft in Edge, Apple in Safari). LearnSpark keeps only
  which words were read.
- Reading recordings are off unless a grown-up turns them on. When on, they are
  saved only in this browser on this device and can be deleted in the Parent Report.
- Progress files and transfer codes contain the learner's name and progress. Treat
  them like any personal file.
- The repository is public, so anyone can see the app's code. It contains no
  personal information about your family.

LearnSpark is an independent practice app. It is not affiliated with or endorsed by
the Virginia Department of Education. SmartScores are practice indicators, not SOL
scores. All stories and questions are original. History & Social Science follows the
2023 Virginia History and Social Science Standards of Learning (Grade 4 Virginia Studies,
Grade 6 United States History: 1865 to the Present).
