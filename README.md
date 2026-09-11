# Physics lecture website

A Quarto website with full lecture notes and a 28-slide vectors lecture.

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

The lecture retains the original conceptual argument. The notes explain the
reasoning in full; the slides support the same lesson with drawings and shorter
statements. The website uses forest green, sage, and a clear reading surface.
Blue and green distinguish the two vectors, and coral marks a result or change.

| Original material | Where it appears |
| --- | --- |
| The wider course: vectors, fields, tensors, quantum states | Slide 2; end of notes §5 |
| Size and direction; the book's finite rotations | Slides 3–4; notes §1 |
| Aida and Baurzhan: the vector versus its components | Slide 5; notes §1 |
| Tip-to-tail and parallelogram addition | Slide 6; notes §2 |
| Hoffmann's hunters and the physical meaning of a sum | Slides 7–8; notes §2 |
| Apples and the distributive rule for walks | Slides 9–10; notes §3 |
| Replacing the multiplier with time; component equations | Slides 11–13; notes §3 |
| Differences, rates of change, and the later calculus connection | Slide 14; notes §4 |
| The turning car and the tail-to-tail construction | Slides 15–16; notes §4 |
| Along/perpendicular acceleration; subtraction order | Slides 17–18; notes §4 |
| Rain, a bouncing ball, and impulse | Slides 19–20; notes §4 |
| Scalars, distance/displacement, and the lap | Slides 3 and 21; notes §§1 and 4 |
| Walks on a sphere, parallel transport, and curvature | Slides 22–23; notes §5 |
| All four original problems, with worked solutions | Slides 24–27; notes §6 |
| Six takeaways and common mistakes | Slide 28; closing notes and checklist |

Core explanations in the notes remain visible. Only worked solutions fold away.
The circular-acceleration magnitude derivation remains omitted, as requested.
Finite-interval velocity and acceleration are labelled as averages; the falling
example states the physical assumptions needed for independent components.

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
drawing the two velocities tail to tail. The original examples remain in the
lesson; the shorter deck comes from combining repeated introductions and removing
divider pages.

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
