# Physics lecture website

A Quarto website with full lecture notes, a 27-slide vectors lecture, and a
19-slide motion lecture built around the original handwritten whiteboards.

## Motion lecture

`lectures/motion/index.qmd` contains the explanations and worked examples;
`lectures/motion/slides.qmd` contains the organised handwritten deck. The
sequence follows the lecture's teaching order, not the whiteboard export numbers:
position → displacement and time → constant velocity and acceleration → vector
derivation by pairing → unit vectors and scalar derivation → projectile → incline.

The five original JPEGs are preserved in `lectures/motion/boards/`. CSS windows
frame relevant regions without modifying the originals. Opening diagrams and
the exact interval-average step supplement the handwriting. The notes make the
plane/3D distinction explicit and use N interval averages for N time intervals.

Preview the deck with `quarto preview lectures/motion/slides.qmd --profile teach`.
For an offline copy, use `quarto render lectures/motion/slides.qmd --profile share
--output motion-offline.html` (the shared profile otherwise defaults to the
vectors filename). The normal whole-site render includes both lecture cards.

## Preview and build

Install [Quarto](https://quarto.org), then run these commands from this folder:

```sh
quarto preview
quarto render
```

The built website is in `_site/`. Edit the source files, not the generated HTML.
The site uses system fonts and native MathML; reading the mathematics requires
no external scripts.

## Content and sequence

The agenda is vector arithmetic and algebra for kinematics. A short introduction
prepares students to use addition and subtraction; the two application blocks
receive equal space and suggested teaching time. The notes keep the reasoning
and worked examples in full. Each block moves from a physical question to a
drawing, component calculations, and practice.

| Part | Slides | Suggested time | Content |
| --- | --- | --- | --- |
| 1 · Introduction | 1–5 | 6 min | Vectors across physics, including quantum mechanics and general relativity; four goals; arrows; vector versus components |
| 2A · Addition | 6–15 | 20 min | Addition construction → hunters challenge → swimmer → apples: order and grouping → book tests order → distributive walks → motion components → two problems |
| 2B · Subtraction | 16–25 | 20 min | Reverse and add; component differences; changes and average rates; turning car; rain; bounce; car and walk problems |
| Finish | 26–27 | 5 min | Choose the operation; check the same four opening goals |

The opening and closing share four goals: add vectors, calculate with components,
subtract vectors, and use changes to describe motion. Addition and subtraction
each have ten slides and two worked problems. Speaker notes supply transitions
and discussion prompts. These times are a teaching guide, not a reading timer.

The hunters immediately challenge the physical meaning of the addition
construction. The order rule is introduced with the apples and grouping; the
book tests it afterwards. Walks then connect both arithmetic rules to components.
The notes and speaker prompts follow this same sequence.

The notes follow the same two-part structure. Their route map separates the
short introduction from the two main applications. Core explanations stay
visible; only worked solutions fold away. The full-lap example remains in the
notes and the closing slide check. Advanced geometry and the circular-acceleration
magnitude derivation are omitted. Finite-interval velocity and acceleration are
labelled as averages; the falling example states its physical assumptions.

The existing forest-green design, backgrounds, typography, and layouts are
unchanged. New diagrams explain the two equivalent subtraction constructions
and the component calculation. Blue and green distinguish the input vectors;
coral marks a result or change.

## Files to edit

| File | Purpose |
| --- | --- |
| `index.qmd` | Home page |
| `lectures/vectors/index.qmd` | Full student notes and worked solutions |
| `lectures/vectors/slides.qmd` | Slides and private speaker notes |
| `styles.css` | Website palette, reading layout, mobile and dark modes |
| `lectures/vectors/slides.css` | Slide layout and typography |
| `theme.scss` | System fonts; disables remote font downloads |
| `assets/*.svg` | Shared vector drawings |
| `lecture-list.ejs` | Automatic home-page lecture cards |

The reading outline and numbered sections show the route through the notes.
Short bridge paragraphs explain why the next section follows.

## Presenting

```sh
quarto preview lectures/vectors/slides.qmd --profile teach
```

- Right/left arrows: next/previous slide. `O`: overview. `F`: fullscreen.
- `S`: speaker view. `C`: chalkboard. `B`: blank board.
- `DEL`: clear drawings. `D`: save drawings.
- On questions, open “Follow the reasoning” or “Show the solution” after discussion.

Keep time for the book demonstration, the distributive-rule explanation, and
drawing the two velocities tail to tail. The four original practice problems remain in the
lesson, with two placed at the end of each application block. The walk problem
now explicitly calculates final position minus initial position. Keep addition
and subtraction discussion time balanced; use the notes for additional depth.

`strip-notes.lua` removes speaker notes from normal and share builds.
Only the `teach` profile keeps them and enables the chalkboard.
Do not render the entire public site with this profile.

## Offline copy

```sh
quarto render lectures/vectors/slides.qmd --profile share
```

Creates `_site/lectures/vectors/vectors-offline.html` with the slide player,
drawings, and styles embedded. Open it in a current browser.
The chalkboard is disabled. Links to the notes need the rest of the website.
A full site render cleans the output folder, so generate the offline copy afterwards.

## Avoid blank or nested slides

Use only `##` for slide headings. Every heading starts one slide.
Keep `title: ""`; `pagetitle` supplies the browser-tab title, and the first
slide is the designed cover.

Use bold labels inside cards rather than nested Markdown headings. Keep styling
in the CSS file rather than before the first slide. Do not insert extra horizontal
rules just to separate content in the source. Check all slides, including open
solutions, after structural edits. PDF export does not split fragments into extra pages.

## Add a lecture and publish

Create a folder under `lectures/` containing `index.qmd` and `slides.qmd`.
Give the notes a title, description, image, `order`, `reading-time-label`,
and `slide-count`. The home page lists the notes automatically by order.
Copy the slide stylesheet if the new deck uses the same layout.

The existing GitHub Actions workflow renders and deploys on pushes to
`main`. Choose **Settings → Pages → Source: GitHub Actions** in the
repository, and set `site-url` in `_quarto.yml` once the public address is known.
