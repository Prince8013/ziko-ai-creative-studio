import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { createProviderStatus, callProvider, buildMusicResponse, buildVoiceResponse, buildVideoResponse } from './provider-adapters.js';

dotenv.config();

const app = express();
const port = Number(process.env.PORT || 8787);

app.use(cors({ origin: true, credentials: true }));
app.use(express.json({ limit: '50mb' }));

app.get('/health', (_req, res) => {
  res.json({ ok: true, status: 'healthy', service: 'ziko-media-backend' });
});

app.get('/api/media/providers', (_req, res) => {
  res.json(createProviderStatus());
});

app.post('/api/media/music', async (req, res) => {
  const input = req.body || {};
  const provider = createProviderStatus().music;

  if (!provider.enabled || !provider.apiKey || !provider.apiUrl) {
    return res.status(400).json({
      status: 'failed',
      provider: 'none',
      error: 'مفتاح API الخاص بمحرك الموسيقى غير موجود.',
      taskId: null,
      audioUrl: null,
      previewUrl: null,
    });
  }

  try {
    const result = await callProvider(provider.apiUrl, provider.apiKey, {
      title: input.title || 'Untitled Track',
      prompt: input.prompt || 'Generate cinematic music',
      genre: input.genre,
      fusion: input.fusion,
      bpm: input.bpm,
      key: input.key,
      maqam: input.maqam,
      mood: input.mood,
      instruments: input.instruments,
      structure: input.structure,
      duration: input.duration,
      vocalMode: input.vocalMode,
      language: input.language,
    }, provider.model);

    return res.json(buildMusicResponse(result, input));
  } catch (error) {
    return res.status(502).json({
      status: 'failed',
      provider: provider.name,
      error: error.message || 'محرك التوليد فشل. جرّب إعادة المحاولة أو تغيير المزود.',
      taskId: null,
      audioUrl: null,
      previewUrl: null,
    });
  }
});

app.get('/api/media/music/:taskId', (req, res) => {
  const provider = createProviderStatus().music;
  if (!provider.enabled || !provider.apiKey || !provider.apiUrl) {
    return res.status(400).json({ status: 'failed', error: 'Music Engine غير متصل' });
  }

  return res.json({
    status: 'processing',
    provider: provider.name,
    taskId: req.params.taskId,
    progress: null,
    audioUrl: null,
    previewUrl: null,
    error: null,
  });
});

app.post('/api/media/voice', async (req, res) => {
  const input = req.body || {};
  const provider = createProviderStatus().voice;

  if (!provider.enabled || !provider.apiKey || !provider.apiUrl) {
    return res.status(400).json({
      status: 'failed',
      provider: 'none',
      error: 'مفتاح API الخاص بمحرك الصوت غير موجود.',
      taskId: null,
      audioUrl: null,
    });
  }

  try {
    const result = await callProvider(provider.apiUrl, provider.apiKey, {
      text: input.text,
      voice: input.voice || 'egyptian-voice',
      language: input.language || 'ar-EG',
      style: input.style || 'cinematic',
      speed: input.speed || 1,
      stability: input.stability || 0.5,
    }, provider.model);

    return res.json(buildVoiceResponse(result, input));
  } catch (error) {
    return res.status(502).json({
      status: 'failed',
      provider: provider.name,
      error: error.message || 'محرك الصوت فشل. جرّب إعادة المحاولة.',
      taskId: null,
      audioUrl: null,
    });
  }
});

app.post('/api/media/video', async (req, res) => {
  const input = req.body || {};
  const provider = createProviderStatus().video;

  if (!provider.enabled || !provider.apiKey || !provider.apiUrl) {
    return res.status(400).json({
      status: 'failed',
      provider: 'none',
      error: 'مفتاح API الخاص بمحرك الفيديو غير موجود.',
      taskId: null,
      videoUrl: null,
      thumbnailUrl: null,
    });
  }

  try {
    const result = await callProvider(provider.apiUrl, provider.apiKey, {
      prompt: input.prompt || 'Create a cinematic video',
      duration: input.duration || 30,
      aspectRatio: input.aspectRatio || '9:16',
      style: input.style || 'Cinematic',
      camera: input.camera,
      lighting: input.lighting,
      motion: input.motion,
      referenceImage: input.referenceImage,
      musicId: input.musicId,
      voiceId: input.voiceId,
    }, provider.model);

    return res.json(buildVideoResponse(result, input));
  } catch (error) {
    return res.status(502).json({
      status: 'failed',
      provider: provider.name,
      error: error.message || 'محرك الفيديو فشل. جرّب إعادة المحاولة أو تغيير المزود.',
      taskId: null,
      videoUrl: null,
      thumbnailUrl: null,
    });
  }
});

app.get('/api/media/video/:taskId', (req, res) => {
  const provider = createProviderStatus().video;
  if (!provider.enabled || !provider.apiKey || !provider.apiUrl) {
    return res.status(400).json({ status: 'failed', error: 'Video Engine غير متصل' });
  }

  return res.json({
    status: 'processing',
    provider: provider.name,
    taskId: req.params.taskId,
    progress: null,
    videoUrl: null,
    thumbnailUrl: null,
    error: null,
  });
});

app.post('/api/media/assembly', async (req, res) => {
  const payload = req.body || {};
  const provider = createProviderStatus().video;

  if (!provider.enabled || !provider.apiKey || !provider.apiUrl) {
    return res.status(400).json({
      status: 'failed',
      provider: 'none',
      error: 'Video Engine غير متصل. يحتاج Backend + video provider.',
    });
  }

  try {
    const result = await callProvider(provider.apiUrl, provider.apiKey, {
      title: payload.title,
      prompt: payload.prompt,
      style: payload.style || 'Cinematic',
      aspectRatio: payload.aspectRatio || '9:16',
      scenes: payload.scenes || [],
      musicId: payload.musicId,
    }, provider.model);

    return res.json({
      status: result.status || 'queued',
      provider: provider.name,
      taskId: result.taskId || result.id || result.task_id || null,
      videoUrl: result.videoUrl || result.video_url || null,
      thumbnailUrl: result.thumbnailUrl || result.thumbnail_url || null,
      duration: result.duration || payload.duration || null,
      metadata: result.metadata || {},
    });
  } catch (error) {
    return res.status(502).json({
      status: 'failed',
      provider: provider.name,
      error: error.message || 'محرك التوصيل فشل. جرّب إعادة المحاولة.',
    });
  }
});

app.listen(port, () => {
  console.log(`Ziko media backend running on http://localhost:${port}`);
});
