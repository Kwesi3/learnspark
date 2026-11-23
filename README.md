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

## How it's published

Every push to `main` runs the checks below on GitHub Actions. Only if **all** of them pass is the
site rebuilt and published to GitHub Pages, so a broken version never reaches the kids.

1. Build (`tools/build.py --check`): joins the source into one page and checks the script is valid
2. Lint (ESLint): catches misspelled or missing names
3. Unit and content tests (18 suites, about a minute): every skill's questions, stories, read-along,
   SOL-style formats, daily plan, progress transfer, and more
4. Browser smoke test: clicks through the main screens on a desktop and a phone screen
5. Accessibility audit (axe-core, WCAG 2.1 A/AA) on the same screens

**Roll back:** on GitHub, open **Actions → Test and deploy → Run workflow**, paste the commit ID
(SHA) of a good version into the box, and run it. That version is tested and republished.
(This works for commits from November 23, 2026 on, when this setup started.)

After an update, open the site once while online so devices pick up the new version
(bump `src/CACHE_VERSION` when you want installed copies to refresh their offline cache).

## For developers

```
npm ci                                  # once: installs ESLint, jsdom, axe-core
pip install playwright && python -m playwright install chromium   # once: for browser tests
npm run build                           # src/ → dist/site (the website) and dist/LearnSpark.html (single file)
npm run lint
npm test                                # all unit and content suites;  npm test -- sol story   runs some
python3 tests/e2e_smoke.py              # browser smoke test
python3 tests/a11y.py --all             # accessibility audit, including minor findings
node tools/content/export.js            # every question template, lesson and story as spreadsheets in dist/content/
```

| Folder | What it holds |
| --- | --- |
| `src/js/` | The app, split by feature. Files are joined in name order into one script, so they share one global scope. Later files may extend earlier ones by wrapping a function (`const _x=x; x=function(){…}`). |
| `src/css/`, `src/index.html` | Styles and the page template |
| `src/data/` | Generated data: narration timing (`audio-map.json`) and the video list (`videos.json`) |
| `src/static/` | Home-screen manifest and icons |
| `src/sw.template.js` | Offline support (service worker) |
| `assets/` | Pictures and `assets/video/` |
| `audio/` | Recorded narration, one file per book or lesson set |
| `tools/` | Build script, narration (`tools/tts`), video (`tools/video`) and content export tools |
| `tests/` | Test suites, browser smoke test, accessibility audit |

**Adding a feature:** add a file to `src/js/` with a number that places it after what it uses
(for example `455-my-feature.js`), add a test in `tests/` and list it in `tests/run.js`.

**Narration and videos** are made offline with free tools (Kokoro voice, ffmpeg), then committed:
`tools/tts/gen.py` makes the audio, `tools/tts/merge_map.py` copies it into `audio/` and updates
`src/data/audio-map.json`; `tools/video/render.py` (stories) and `tools/video/lesson.py` (lessons)
make videos, and `tools/video/mkdata.py` copies them into `assets/video/` and updates `src/data/videos.json`.
Pictures are added with the **Fetch illustrations** workflow.

**Problem reports:** in the app, **Settings → App info & problem log** shows the version, any errors
the device logged, and questions a child flagged with **Report a problem**. **Copy report** puts it all
on the clipboard. It holds no names, answers or progress.

## On the kids' devices

- Open the address in **Chrome, Edge, or Safari**. These browsers can listen in
  Story Time. Firefox can't listen yet; everything else works there.
- The first time a child taps **Read to Sparky**, the browser asks for the
  microphone. Choose **Allow**.
- Tablet or phone: use **Add to Home Screen** (Safari: Share button; Chrome: ⋮ menu)
  so it opens like an app.
- Progress stays on each device. To move it, use **Settings → Move progress**.

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
