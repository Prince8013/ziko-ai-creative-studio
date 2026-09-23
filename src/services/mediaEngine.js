const API_BASE_URL = (import.meta.env.VITE_API_BASE_URL || '').replace(/\/$/, '');

export const mediaEngineConfig = {
  connected: Boolean(API_BASE_URL),
  baseUrl: API_BASE_URL,
  demoMode: import.meta.env.VITE_DEMO_MODE === 'true',
};

async function callEngine(path, options = {}) {
  if (!API_BASE_URL) {
    throw new Error('Media Engine غير متصل: أضف VITE_API_BASE_URL لخادم Backend آمن.');
  }

  const response = await fetch(`${API_BASE_URL}${path}`, {
    ...options,
    headers: { 'Content-Type': 'application/json', ...(options.headers || {}) },
  });
  const payload = await response.json().catch(() => ({}));
  if (!response.ok) throw new Error(payload.error || 'محرك الوسائط فشل. جرّب إعادة المحاولة أو تغيير المزود.');
  return payload;
}

export const mediaEngine = {
  generateMusic: (input) => callEngine('/api/media/music', { method: 'POST', body: JSON.stringify(input) }),
  getMusicStatus: (taskId) => callEngine(`/api/media/music/${encodeURIComponent(taskId)}`),
  generateVoice: (input) => callEngine('/api/media/voice', { method: 'POST', body: JSON.stringify(input) }),
  generateVideo: (input) => callEngine('/api/media/video', { method: 'POST', body: JSON.stringify(input) }),
  getVideoStatus: (taskId) => callEngine(`/api/media/video/${encodeURIComponent(taskId)}`),
  assembleMusicVideo: (input) => callEngine('/api/media/assembly', { method: 'POST', body: JSON.stringify(input) }),
  providers: () => callEngine('/api/media/providers'),
};
