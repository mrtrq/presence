# Tarreq — Personal Website Strategy & Roadmap

Last updated: 2026-08-15  
Status: Living plan; update this file as work is implemented.

## North star

Build a calm, easy-to-navigate personal website that explains who Tarreq is, makes his work and thinking easy to explore, and reveals personality through small moments of discovery.

The site should feel simple on first contact and playful on closer inspection. Content must remain useful without the playful layer.

## What the website should accomplish

1. **Profile** — establish who Tarreq is, what he cares about, and the path he is navigating.
2. **Projects** — show the context, decisions, contribution, and outcome behind selected work.
3. **Blog** — make Tarreq's thinking, learning, and experiments part of the portfolio rather than an external afterthought.
4. **Playground** — provide a home for interactive studies, small tools, data stories, and delightful experiments.
5. **Connection** — make it effortless to move between those areas or get in touch.

## Strategic principles

### 1. Clarity before delight

Every page must be understandable and navigable before animation is added. Play should reward attention, not demand it.

### 2. One system, several moods

Profile, projects, blogs, and experiments may have different densities, but they should share the same typography, spacing, colors, radii, interaction timing, and navigation logic.

### 3. Progressive play

Use three levels of interaction:

- **Functional motion:** section transitions, dock feedback, modal transitions, copy confirmation.
- **Responsive personality:** hover reactions, subtle parallax, contextual illustrations, cursor-aware details.
- **Occasional surprise:** a delayed, optional moment that appears once and can be interacted with.

### 4. The navigating theme is a thread, not a slogan

Use wayfinding language and behavior—routes, markers, coordinates, trails, discoveries—without repeatedly writing “navigating through” or turning the site into a travel metaphor.

### 5. Restraint creates the fun

Limit each view to one primary playful idea. Avoid simultaneous ambient animation, novelty cursors, sound, and moving decorations.

### 6. Inclusive by default

All essential interactions must work with keyboard and touch. Motion must respect `prefers-reduced-motion`; surprises must not block reading, steal focus, create layout shift, or play sound automatically.

## Reference: what to learn, not copy

The inspiration is [muhraufan.com](https://muhraufan.com/), including its [tiket.com case study](https://muhraufan.com/work/tiket-discover-full.html).

Observed patterns worth learning from:

- A quiet, narrow reading layout keeps the person's story and work primary.
- Product design and photography are presented as distinct modes within one identity.
- Small design-engineering experiments sit beside serious case studies.
- Utility controls and progress navigation stay subtle and predictable.
- A guest-card interaction gives visitors something optional to discover.
- The case study includes a delayed canvas flyby and a clickable plane; the surprise is separate from the content and does not gate navigation.

Our response should borrow the **behavioral principle**—delayed, contextual, optional delight—without borrowing the airplane, illustration style, or exact interaction.

## Proposed information architecture

### Main dock

1. **About** — concise profile, values, current direction.
2. **Projects** — research, community work, and websites in one filterable collection.
3. **Writing** — recent essays and interactive articles, with a route to the full blog.
4. **Playground** — experiments, small tools, data visualizations, and future curiosities.
5. **Contact** — email copy action and selected social links.

This reduces the current separation between “Works” and “Websites.” Websites become a project type rather than a competing top-level section. This is a recommendation to approve before changing navigation.

### Supporting routes

- `/projects/[slug]` — durable project or case-study pages.
- `/blog` — full writing index.
- `/blog/[slug]` — essays and interactive stories.
- `/playground` or an in-page Playground scene — experiments that deserve more space.

## Design system direction

### Layout and margins

- Introduce shared `--page-gutter`, `--content-wide`, and `--content-reading` tokens.
- Target generous desktop gutters: approximately 6–8vw, with a sensible maximum.
- Use a wider container for project grids and a narrower container for profile, contact, and long-form reading.
- Preserve 16–24px gutters on small screens.
- Keep the bottom dock visually detached from both the viewport edge and main content.

### Visual language

- Preserve the pale sky/sun palette and restrained grid texture.
- Use glass surfaces for interactive objects, not every container.
- Keep blue as the wayfinding/action color and yellow as a rare moment of warmth or discovery.
- Use one icon family and one consistent stroke weight.

### Motion language

- Fast feedback: 120–180ms.
- Component transitions: 220–420ms.
- Section changes: 350–500ms with directional meaning.
- Surprise interactions: slow enough to notice, never so long that they delay a task.
- Prefer transform and opacity; avoid animation that causes reflow.

## Playful-system concept

### Recommended first signature: “The Wayfinder”

A small abstract marker—possibly a paper boat, waypoint, or curious dot—occasionally traces a route through the background after a period of calm. Clicking or tapping it reveals one short note, project clue, or link to the Playground.

It should be ours rather than an airplane recreation:

- Connected to the site's navigating theme.
- Appears after roughly 10–15 seconds of inactivity, at most once per session.
- Avoids important text and controls.
- Has an accessible button target and label.
- Becomes a static marker or does not appear under reduced motion.
- Never plays audio automatically.
- Can be prototyped behind a feature flag and removed without affecting content.

### Other candidate experiments

- A compass-like dock indicator that leans toward the next destination.
- A route trail that briefly connects the old and new section during navigation.
- A tiny constellation generated from the exoplanet articles.
- Project cards that reveal a small “field note” on a deliberate second interaction.
- A local-only visitor stamp or postcard that never requires an account.

Only one signature concept should graduate into the main experience at first. The others belong in the Playground or future backlog.

## Roadmap

### Phase 0 — Navigation foundation

Status: substantially complete.

- [x] Convert the homepage from a long document into viewport-sized scenes.
- [x] Add the fixed bottom dock and active-section state.
- [x] Preserve URL hashes and browser back/forward behavior.
- [x] Add directional section transitions.
- [x] Create responsive dock behavior for mobile.
- [x] Add reduced-motion handling.
- [x] Rewrite the About introduction around a thoughtful personal narrative.
- [x] Add smoother project-modal entry and exit behavior.
- [x] Add copy-to-clipboard contact interaction and confirmation.
- [x] Maintain a successful production build.

Definition of done: the site's primary navigation feels immediate, predictable, and functional without page scrolling on common desktop sizes.

### Phase 1 — Layout rhythm and design tokens

Status: complete.

- [x] Increase horizontal margins across all homepage scenes.
- [x] Establish page-gutter and content-width tokens.
- [x] Define separate wide, standard, and reading containers.
- [x] Normalize spacing between headers, copy, cards, and the dock.
- [x] Review the full layout at 1440px, 1280px, 1024px, 768px, 390px, and short laptop heights.
- [x] Verify that internal scrolling appears only where content genuinely needs it.

Definition of done: no important content feels pinned to a screen edge; all sections share one obvious horizontal rhythm.

### Phase 2 — Information architecture and content model

Status: planned.

- [ ] Approve the target dock: About / Projects / Writing / Playground / Contact.
- [ ] Decide whether current Websites content folds into Projects.
- [ ] Move homepage content into typed data rather than hard-coded repeated JSX.
- [ ] Define project categories: Research, Community, Web, and Experiment.
- [ ] Define consistent project fields: role, period, context, contribution, outcome, links, media.
- [x] Define consistent article fields: title, date, description, format, topics, reading time.
- [ ] Decide what “current” or “now” information belongs on the profile.

Definition of done: adding a project or article requires editing content data, not redesigning a page.

### Phase 3 — Projects and case studies

Status: first case-study foundation complete; media and deeper project detail remain.

- [ ] Build a unified Projects scene with clear type labels or filters.
- [x] Create a reusable project-detail template.
- [ ] Use a consistent story structure: Context → Question → Contribution → Outcome → Reflection.
- [x] Convert Remote Sensing into the first internal case study.
- [x] Convert BEM Fasilkom UI into a concise leadership/community case study.
- [ ] Decide which websites deserve full stories versus direct links.
- [ ] Add project media with stable aspect ratios and meaningful alt text.
- [x] Keep external decks as secondary evidence, not the only project experience.

Definition of done: a visitor can understand what Tarreq did, why it mattered, and where to learn more without leaving the website.

### Phase 4 — Writing and blog

Status: core implementation complete; editorial review and future publishing remain.

- [x] Create a `/blog` route.
- [x] Create two interactive exoplanet stories.
- [x] Replace outdated Medium links on the homepage with local writing.
- [x] Surface the three most recent local articles inside the main Writing scene.
- [x] Establish Note and Visual story as the two complementary formats.
- [x] Create a reusable article layout and typed metadata model.
- [x] Add local MDX authoring for quiet, text-focused Notes.
- [x] Add topic labels and All / Notes / Visual stories archive filters.
- [x] Make the website the local-first home for future writing.
- [x] Add copy-link and previous/next reading navigation.
- [x] Make article reading distraction-free while preserving a clear return route.
- [ ] Complete editorial review of the first Note before launch.
- [ ] Add richer image, caption, and pull-quote components when a real article needs them.
- [ ] Add RSS only after the local publishing workflow is stable.

Definition of done: Writing feels like a first-class part of the portfolio and new posts can be published consistently.

### Phase 5 — Playground and signature delight

Status: discovery.

- [ ] Create a Playground content model and initial scene or route.
- [ ] Inventory reusable interactive work already present in the repository.
- [ ] Prototype “The Wayfinder” independently from production navigation.
- [ ] Prototype no more than two alternative concepts for comparison.
- [ ] Test timing, interruption risk, touch behavior, and repeat frequency.
- [ ] Choose one signature interaction and document why it belongs.
- [ ] Add a session-level appearance limit.
- [ ] Add keyboard semantics and reduced-motion behavior.
- [ ] Set a performance budget for the playful layer.

Definition of done: the selected interaction feels recognizably Tarreq, rewards curiosity, and can be removed without reducing the site's usefulness.

### Phase 6 — Cohesion, accessibility, and performance

Status: planned.

- [ ] Audit all text and interactive controls for contrast.
- [ ] Verify keyboard order, visible focus, dialogs, and copy feedback.
- [ ] Test screen-reader landmarks and section announcements.
- [ ] Confirm every meaningful image has useful alt text.
- [ ] Confirm decorative animation is hidden from assistive technology.
- [ ] Keep section transitions at 60fps on a typical mobile device.
- [ ] Measure image sizes, JavaScript weight, and Core Web Vitals.
- [ ] Ensure the site remains complete with JavaScript-delayed surprises disabled.
- [ ] Test light/dark direction only if a dark theme becomes a real requirement.

Definition of done: the experience is robust on touch, keyboard, reduced motion, slower devices, and narrow or short screens.

### Phase 7 — Launch and maintenance

Status: planned.

- [ ] Finalize title, description, Open Graph image, favicon, and social preview.
- [ ] Add a custom 404 that shares the site's personality without obstructing recovery.
- [ ] Validate all external links.
- [ ] Add lightweight, privacy-conscious analytics only if there are questions to answer.
- [ ] Define a quarterly content and dependency review.
- [ ] Deploy and complete a post-launch mobile/desktop smoke test.

Definition of done: the site is publishable, observable, and maintainable without becoming a perpetual redesign project.

## Recommended implementation order

1. **Spacing pass:** implement the larger horizontal margins and container tokens.
2. **Architecture decision:** approve the proposed dock and decide how Websites relates to Projects.
3. **Content structure:** move project and writing content into typed data.
4. **First complete story:** build Remote Sensing as the reference project-detail page.
5. **Writing integration:** bring local interactive articles into the homepage Writing scene.
6. **Playground foundation:** create a place where experiments can grow without crowding the profile.
7. **Signature prototype:** test The Wayfinder and one alternative before committing.
8. **Accessibility, performance, and launch pass.**

## Success criteria

- A first-time visitor can identify who Tarreq is and reach Projects or Writing within one interaction.
- Profile, Projects, Writing, and Playground each have a distinct purpose but clearly belong to one system.
- Project stories explain contribution and outcome rather than functioning as link cards alone.
- Playful elements are memorable but never required to understand or navigate the website.
- No surprise appears more than once per session or ignores reduced-motion preferences.
- The layout retains generous side space without compromising mobile readability.
- New projects, articles, and experiments can be added without restructuring the homepage.

## Decisions log

- **2026-08-11:** Adopted a fixed bottom dock and viewport-sized homepage scenes.
- **2026-08-11:** Kept URL hashes and browser history as part of the navigation model.
- **2026-08-14:** Defined the product pillars as Profile, Projects, Blog, and Fun/Interactive.
- **2026-08-14:** Chose “clarity first, delight second” as the interaction strategy.
- **2026-08-14:** Treated muhraufan.com as behavioral inspiration, not a visual or feature template.
- **2026-08-15:** Completed the responsive spacing system with wide, standard, and reading-width tokens plus 6vw desktop gutters.
- **2026-08-15:** Made the website the local-first home for writing, with Notes and Visual stories sharing one archive and reading system.
- **2026-08-15:** Kept the bottom dock on the archive but removed it from article pages to protect distraction-free reading.

## How to maintain this roadmap

- Check an item only after implementation and proportional verification.
- Add new scope to the relevant phase before building it.
- Record lasting information-architecture or design decisions in the Decisions log.
- If a playful feature competes with readability, performance, or accessibility, keep it in the Playground instead of the main experience.
