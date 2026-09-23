export function createProviderStatus() {
  return {
    music: {
      name: 'MiniMax Music',
      apiUrl: process.env.MUSIC_API_URL || '',
      apiKey: process.env.MUSIC_API_KEY || '',
      model: process.env.MUSIC_MODEL || 'music-v1',
      enabled: Boolean(process.env.MUSIC_API_URL && process.env.MUSIC_API_KEY),
      default: true,
    },
    voice: {
      name: 'ElevenLabs',
      apiUrl: process.env.VOICE_API_URL || '',
      apiKey: process.env.VOICE_API_KEY || '',
      model: process.env.VOICE_MODEL || 'eleven_multilingual_v2',
      enabled: Boolean(process.env.VOICE_API_URL && process.env.VOICE_API_KEY),
      default: true,
    },
    video: {
      name: 'Kling / Runway',
      apiUrl: process.env.VIDEO_API_URL || '',
      apiKey: process.env.VIDEO_API_KEY || '',
      model: process.env.VIDEO_MODEL || 'video-v1',
      enabled: Boolean(process.env.VIDEO_API_URL && process.env.VIDEO_API_KEY),
      default: true,
    },
  };
}

export async function callProvider(apiUrl, apiKey, payload, model) {
  if (!apiUrl || !apiKey) {
    throw new Error('مفتاح API الخاص بالمزود غير موجود.');
  }

  const response = await fetch(apiUrl, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
      'X-Model': model || '',
    },
    body: JSON.stringify(payload),
  });

  const text = await response.text();
  let data = {};
  try {
    data = text ? JSON.parse(text) : {};
  } catch {
    data = { raw: text };
  }

  if (!response.ok) {
    throw new Error(data.error || data.message || 'رصيد مزود الموسيقى غير كافٍ.');
  }

  return data;
}

export function buildMusicResponse(result, input) {
  return {
    status: result.status || 'queued',
    provider: result.provider || 'music',
    taskId: result.taskId || result.id || result.task_id || null,
    audioUrl: result.audioUrl || result.audio_url || null,
    previewUrl: result.previewUrl || result.preview_url || null,
    duration: result.duration || input.duration || null,
    title: input.title || 'Untitled Track',
    metadata: result.metadata || {},
  };
}

export function buildVoiceResponse(result, input) {
  return {
    status: result.status || 'completed',
    provider: result.provider || 'voice',
    taskId: result.taskId || result.id || result.task_id || null,
    audioUrl: result.audioUrl || result.audio_url || null,
    thumbnailUrl: result.thumbnailUrl || result.thumbnail_url || null,
    text: input.text || '',
  };
}

export function buildVideoResponse(result, input) {
  return {
    status: result.status || 'queued',
    provider: result.provider || 'video',
    taskId: result.taskId || result.id || result.task_id || null,
    videoUrl: result.videoUrl || result.video_url || null,
    thumbnailUrl: result.thumbnailUrl || result.thumbnail_url || null,
    duration: result.duration || input.duration || null,
  };
}
