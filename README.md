# Ziko Creative Flow — real media integration contract

This repository contains the existing React studio plus a secure-backend-ready media console. It deliberately does **not** put provider keys in the browser and it never fabricates successful media.

## Required backend contract

Set `VITE_API_BASE_URL` only to your secure backend URL. Implement these server-side endpoints:

- `POST /api/media/music` → `{ status, provider, taskId, audioUrl, previewUrl, duration, title, metadata }`
- `GET /api/media/music/:taskId` → status response with `status`, optional `progress`, and `audioUrl`
- `POST /api/media/voice` → `{ status, provider, taskId, audioUrl }`
- `POST /api/media/video` → `{ status, provider, taskId, videoUrl, thumbnailUrl, duration }`
- `GET /api/media/video/:taskId`
- `POST /api/media/assembly` → final assembled media response
- `GET /api/media/providers` → provider connection states

The backend must load credentials from Base44 Secrets (or server-only environment secrets), implement `MusicProvider`, `VoiceProvider`, and `VideoProvider` adapters, store generated files in Base44 File Storage, and persist the requested entities. Never proxy secrets through `VITE_*` variables.

## Provider policy

Recommended adapters are MiniMax Music or another configured text-to-music API, ElevenLabs/OpenAI TTS, and Runway/Kling/fal.ai video. A provider is shown as unavailable until its server-side credentials are configured. Free tiers may restrict commercial use, quota, duration, or watermarking; verify the provider's current terms before publishing client work.

## Run

```bash
npm install
npm run build
```

With no backend configured the UI explicitly shows `Media Engine غير متصل`; it does not claim to have generated audio or video.
