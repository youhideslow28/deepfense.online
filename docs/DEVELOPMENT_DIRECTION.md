# DEEPFENSE 3.0 - Product Direction

## Current Read

DEEPFENSE 3.0 already has the right core: train users through interactive recognition, immediate feedback, crisis response, and light competitive mechanics. The homepage now communicates the main promise clearly: users should learn to detect deepfake images, videos, and voices before they face a real scam.

What is working well:

- The first screen points users to the training challenge instead of only presenting a marketing page.
- The learning path is simple: learn, challenge, ask AI.
- The Challenge page has score, feedback, post-game analysis, survey data, and sharing.
- The Tools page combines behavioral scan, media scan, crisis guidance, knowledge base, and protective demo.
- The folder structure under `src/` is much cleaner than the older flat root layout.

Main risks to fix next:

- The product has many strong modules, but the learning progression is not yet unified into one user journey.
- The home mini-game is fun, but it can distract from the more important detective challenge if it appears too early.
- Training results are collected, but there is no learner profile, badge history, streak, or recommendation loop yet.
- Some AI/forensics features are partly simulation. They should be clearly labeled as training/demo when not backed by real analysis.
- The visual language is energetic, but several screens still feel like separate feature demos rather than one training platform.

## North Star

DEEPFENSE should become a gamified user-training system for synthetic-media defense.

The product should answer one clear question for every learner:

> Can I recognize, verify, and respond to a deepfake scam better than before?

## Recommended Roadmap

### Phase 1 - Tighten The Learning Core

- Make `/challenge` the primary training loop.
- Split each level into `observe -> decide -> explain -> remember`.
- Add lesson tags to every level: face artifacts, voice mismatch, lighting, hand occlusion, context pressure, payment urgency.
- After a wrong answer, route the user to a short lesson card before continuing.
- Turn final analysis into a personalized training report.

### Phase 2 - Add Gamification That Teaches

- Add XP, badges, streaks, and rank titles based on actual skill categories.
- Keep leaderboards secondary; do not let score chasing replace learning quality.
- Add daily missions:
  - Detect 3 suspicious cues.
  - Complete 1 scam simulator.
  - Review 1 crisis checklist.
- Add a "retry weak skills" button after the result screen.

### Phase 3 - Build Learner Memory

- Store per-user progress in Firebase:
  - completed levels
  - skill category scores
  - incorrect cues
  - badges
  - training streak
- Add a dashboard that shows growth over time.
- Recommend the next lesson from weak categories instead of sending everyone through the same path.

### Phase 4 - Clarify AI And Forensics

- Keep the AI assistant, but make it a training coach, not just a generic chatbot.
- Add prompt modes:
  - explain this scam
  - quiz me
  - create family verification script
  - crisis first aid
- Label media scanning as `AI-assisted risk review`, not final proof.
- Separate simulation results from real API results in the UI.

### Phase 5 - Presentation And Trust

- Add a concise "How training works" section below the first viewport.
- Make crisis links and reporting guidance more official and localized.
- Add privacy copy for uploads, surveys, and camera demos.
- Keep the cyber style, but reduce decorative effects on task-heavy pages so users can focus.

## Suggested Folder Shape

The current `src/` shape is good. Keep developing in this direction:

```text
src/
  components/
    common/
    effects/
    layout/
    ui/
  config/
  data/
  features/
    chat/
    dashboard/
    deepfake/
    learning/
    profile/
  hooks/
  lib/
  pages/
  styles/
  types/
```

New feature folders to add later:

- `features/learning/`: lesson cards, skill taxonomy, post-answer explanations.
- `features/profile/`: learner progress, XP, badges, streaks.
- `features/reporting/`: shareable result reports and crisis report flows.

## Cleanup Policy

Keep:

- `src/`, `api/`, `public/`
- config files: `vite.config.ts`, `tsconfig.json`, `tailwind.config.js`, `postcss.config.js`
- deployment files: `vercel.json`, `firebase.json`
- docs: `README.md`, `SECURITY.md`, `LICENSE`, `docs/`

Do not commit:

- `node_modules/`
- `dist/`
- `dev-server.log`
- `.env` and local secrets

## Next Implementation Target

The best next coding milestone is:

> Create a unified training progress system: XP, badges, skill categories, and personalized retry suggestions after each challenge.

This builds directly on the existing challenge, dashboard, and Firebase pieces without changing the product's identity.
