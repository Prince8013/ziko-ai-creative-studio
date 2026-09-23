# Ziko Creative Flow

This project now includes a lightweight backend that can be connected to secure provider credentials.

## Run locally

```bash
npm install
npm run dev
```

The frontend will connect to the backend at `VITE_API_BASE_URL` and the backend reads credentials from server-only environment variables in `.env`.

## Required backend environment variables

Add your own values to `.env`:

```env
VITE_API_BASE_URL=http://localhost:8787
PORT=8787

MUSIC_API_URL=https://your-music-provider.example/api
MUSIC_API_KEY=your_music_key
MUSIC_MODEL=music-v1

VOICE_API_URL=https://your-tts-provider.example/api
VOICE_API_KEY=your_voice_key
VOICE_MODEL=eleven_multilingual_v2

VIDEO_API_URL=https://your-video-provider.example/api
VIDEO_API_KEY=your_video_key
VIDEO_MODEL=video-v1
```

## Important

- Never expose provider keys in browser code.
- Keep secrets on server side only.
- If a provider is not configured, the API returns a clear configuration error instead of pretending success.

## Endpoints

- `GET /health`
- `GET /api/media/providers`
- `POST /api/media/music`
- `GET /api/media/music/:taskId`
- `POST /api/media/voice`
- `POST /api/media/video`
- `GET /api/media/video/:taskId`
- `POST /api/media/assembly`
