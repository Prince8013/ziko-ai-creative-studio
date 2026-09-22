# Ziko AI Creative Studio

Premium RTL-first AI creative production workspace for Ahmed Hamdy.

## Current experience

- Egyptian Arabic-first command center with English product labels where useful.
- Ziko creative partner chat with local conversation memory.
- Creative Studio, Script Studio, Music Lab, Video Lab, Voice Demo, Effects, Campaigns, Social variants, Library, Analytics, Brand Center, Profile, Activity, and Settings.
- Music history variation engine that avoids recent fusions and generates new BPM, key, rhythm, instruments, structure, sound design, and visual direction.
- Personal profile photo import is local-only and does not alter the user's identity.
- Demo Data and Demo Mode are explicitly labeled where external services are not connected.
- Responsive touch-friendly layout with no external API keys in the client.

## Run locally

```bash
npm install
npm run dev
```

Production build:

```bash
npm run build
npm run preview
```

## Integration boundary

The UI is intentionally ready for future LLM, TTS, music, image/video, publishing, and analytics adapters. Real credentials must be supplied through server-side environment variables; never place provider secrets in `src/`.

## Developer credit

Designed, developed, and implemented by Engineer Ahmed Hamdy.
