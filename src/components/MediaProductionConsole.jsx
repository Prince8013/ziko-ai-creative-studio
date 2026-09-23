import { useEffect, useState } from 'react';
import { mediaEngine, mediaEngineConfig } from '../services/mediaEngine';
import './media-production-console.css';

const initialMusic = {
  title: 'القاهرة بالليل',
  prompt: 'أغنية مصرية سينمائية عن القاهرة بالليل باللهجة المصرية',
  genre: 'Cairo Night Phonk',
  fusion: 'Egyptian Tabla + Cinematic Orchestra',
  bpm: 112,
  maqam: 'Nahawand',
  mood: 'سينمائي',
  duration: 45,
  vocalMode: 'vocal',
  language: 'ar-EG',
};

const statusLabel = { queued: 'في الانتظار', processing: 'جاري المعالجة...', completed: 'اكتمل', failed: 'فشل', disconnected: 'غير متصل' };

export default function MediaProductionConsole() {
  const [music, setMusic] = useState(initialMusic);
  const [job, setJob] = useState(null);
  const [voiceText, setVoiceText] = useState('بص يا صاحبي، القاهرة بالليل مش مجرد مدينة... دي حكاية تانية خالص.');
  const [voiceJob, setVoiceJob] = useState(null);
  const [providers, setProviders] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!mediaEngineConfig.connected) return;
    mediaEngine.providers().then(setProviders).catch((err) => setError(err.message));
  }, []);

  useEffect(() => {
    if (!job?.taskId || !['queued', 'processing'].includes(job.status)) return undefined;
    const timer = window.setInterval(async () => {
      try {
        const next = await mediaEngine.getMusicStatus(job.taskId);
        setJob((current) => ({ ...current, ...next }));
      } catch (err) { setJob((current) => ({ ...current, status: 'failed', error: err.message })); }
    }, 4000);
    return () => window.clearInterval(timer);
  }, [job?.taskId, job?.status]);

  const generateMusic = async () => {
    setError(''); setLoading(true); setJob({ status: 'queued' });
    try { setJob(await mediaEngine.generateMusic({ ...music, instruments: ['Egyptian Tabla', 'Qanun', 'Analog Bass'], structure: ['Intro', 'Verse', 'Chorus', 'Drop', 'Outro'] })); }
    catch (err) { setJob({ status: 'failed', error: err.message }); setError(err.message); }
    finally { setLoading(false); }
  };

  const generateVoice = async () => {
    setError(''); setLoading(true); setVoiceJob({ status: 'queued' });
    try { setVoiceJob(await mediaEngine.generateVoice({ text: voiceText, language: 'ar-EG', style: 'cinematic', speed: 1, stability: .55 })); }
    catch (err) { setVoiceJob({ status: 'failed', error: err.message }); setError(err.message); }
    finally { setLoading(false); }
  };

  return (
    <section className="media-console" dir="rtl" aria-labelledby="media-console-title">
      <div className="media-console__heading">
        <div><span className="media-console__eyebrow">Ziko Media Orchestrator</span><h2 id="media-console-title">محرك الإنتاج الحقيقي</h2><p>لا نجاح وهمي: لا يظهر الملف إلا بعد استجابة Backend ومزود فعلي.</p></div>
        <span className={`engine-status ${mediaEngineConfig.connected ? 'is-connected' : 'is-offline'}`}>{mediaEngineConfig.connected ? 'Backend متصل' : 'Media Engine غير متصل'}</span>
      </div>

      {!mediaEngineConfig.connected && <div className="engine-notice"><strong>Music Engine غير متصل</strong><span>أضف VITE_API_BASE_URL إلى خادم Backend. مفاتيح المزود يجب أن تبقى في Secrets على الخادم، وليس في React.</span></div>}
      {error && <div className="engine-error" role="alert">{error}</div>}

      <div className="media-console__grid">
        <div className="media-panel">
          <div className="media-panel__title"><span>🎵</span><h3>Music Engine</h3></div>
          <label>العنوان<input value={music.title} onChange={(e) => setMusic({ ...music, title: e.target.value })} /></label>
          <label>الفكرة<textarea value={music.prompt} onChange={(e) => setMusic({ ...music, prompt: e.target.value })} /></label>
          <div className="media-fields"><label>Genre<input value={music.genre} onChange={(e) => setMusic({ ...music, genre: e.target.value })} /></label><label>Fusion<input value={music.fusion} onChange={(e) => setMusic({ ...music, fusion: e.target.value })} /></label></div>
          <div className="media-fields"><label>BPM<input type="number" min="40" max="220" value={music.bpm} onChange={(e) => setMusic({ ...music, bpm: Number(e.target.value) })} /></label><label>المقام<input value={music.maqam} onChange={(e) => setMusic({ ...music, maqam: e.target.value })} /></label></div>
          <button className="media-primary" onClick={generateMusic} disabled={loading || !mediaEngineConfig.connected}>🎵 توليد الأغنية الحقيقية</button>
          {job && <div className={`job-card job-card--${job.status}`}><b>{statusLabel[job.status] || job.status}</b>{job.provider && <small>Provider: {job.provider}</small>}{job.taskId && <small>Task ID: {job.taskId}</small>}{job.error && <small>{job.error}</small>}{job.audioUrl && <><audio controls src={job.audioUrl} /><a href={job.audioUrl} download>📥 تنزيل الصوت</a></>}</div>}
        </div>

        <div className="media-panel">
          <div className="media-panel__title"><span>🎙️</span><h3>Voice Engine</h3></div>
          <label>النص باللهجة المصرية<textarea value={voiceText} onChange={(e) => setVoiceText(e.target.value)} /></label>
          <div className="provider-note">يدعم ElevenLabs أو OpenAI TTS من خلال Backend Secrets.</div>
          <button className="media-secondary" onClick={generateVoice} disabled={loading || !mediaEngineConfig.connected}>🎙️ توليد الصوت الحقيقي</button>
          {voiceJob && <div className={`job-card job-card--${voiceJob.status}`}><b>{statusLabel[voiceJob.status] || voiceJob.status}</b>{voiceJob.provider && <small>Provider: {voiceJob.provider}</small>}{voiceJob.audioUrl && <audio controls src={voiceJob.audioUrl} />}{voiceJob.error && <small>{voiceJob.error}</small>}</div>}
          <div className="provider-list"><b>حالة المزودين</b>{providers ? Object.entries(providers).map(([name, state]) => <span key={name}>{name}: {state.enabled ? 'متصل' : 'غير مفعّل'}</span>) : <span>تظهر بعد اتصال Backend</span>}</div>
        </div>
      </div>
    </section>
  );
}
