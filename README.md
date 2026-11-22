# LearnSpark

Virginia SOL practice for Grades 1–4 and middle school (Grades 6, 7, and 8) in Math, Reading, Science, Writing, and History & Social Science,
plus Story Time read-aloud books, in one web page.
No server, no accounts, no build step. Each learner's progress is saved in the
browser on the device they use.

## What's inside

- **Learn:** SmartScore practice for every SOL skill in Math, Reading, Science, Writing,
  and History & Social Science, with lessons, worked examples, pictures, and mistake review.
  - Over 1,200 written questions and 350 math question patterns on top of the originals, so practice rarely repeats.
  - **Challenge questions** (gold star) appear as the SmartScore rises, or any time with the Challenge switch, and earn bonus XP.
  - Grades 1–3: 2023 Math SOL, phonics and reading (2024 English strands), science, and history & social science.
  - Grade 4: Virginia Studies. Grade 6: U.S. History 1865 to the Present.
  - Grade 7: 2023 Math SOL (7.NS–7.PFA), Life Science, Civics & Economics.
  - Grade 8: 2023 Math SOL (8.NS–8.PFA), Physical Science, World Geography.
- **About & privacy:** a page inside the app explains what is stored and where.
- **SOL Practice Test:** mixed tests with flag, cross-out, review, and submit, then results by standard.
- **Stories:** read-aloud books where Sparky listens and helps, plus Detective Case Files and Sound Swap.
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
| `assets/` | Pictures: subject illustrations, game art and learner avatars (SVG) |
| `audio/` | Recorded narration (about 45 minutes, 16 MB) |

Keep the `assets/` and `audio/` folders next to `index.html`. Both are saved for offline
use after the first visit. After an update, open the site once while online so devices
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
- The repository is public, so anyone can see the app's code. It contains no
  personal information about your family.

LearnSpark is an independent practice app. It is not affiliated with or endorsed by
the Virginia Department of Education. SmartScores are practice indicators, not SOL
scores. All stories and questions are original. History & Social Science follows the
2023 Virginia History and Social Science Standards of Learning (Grade 4 Virginia Studies,
Grade 6 United States History: 1865 to the Present).
