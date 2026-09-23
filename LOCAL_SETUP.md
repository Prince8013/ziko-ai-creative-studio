# Local setup

The project is configured to run locally with a Vite frontend and Node/Express backend.

## Requirements

- Node.js 18+
- npm 9+

## Start locally

```bash
npm install
npm run dev
```

Open http://localhost:5173. Vite automatically proxies `/api` and `/health` to the backend at http://localhost:8787, so a local `VITE_API_BASE_URL` is not required during development.

You can also run the processes separately:

```bash
npm run server
npm run dev:client
```

## Provider configuration

Copy `.env.example` to `.env` and add real provider values on the server only:

```bash
cp .env.example .env
```

Without provider credentials, the app starts normally and reports the provider as unavailable. It does not generate fake audio or video.

Never commit `.env` or put provider keys in `VITE_*` variables.
