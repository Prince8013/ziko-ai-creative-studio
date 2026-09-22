import { useEffect, useMemo, useState } from 'react';
import './world-clock.css';

const zones = [
  { id: 'cairo', city: 'القاهرة', country: 'مصر', zone: 'Africa/Cairo', flag: '🇪🇬' },
  { id: 'dubai', city: 'دبي', country: 'الإمارات', zone: 'Asia/Dubai', flag: '🇦🇪' },
  { id: 'london', city: 'لندن', country: 'المملكة المتحدة', zone: 'Europe/London', flag: '🇬🇧' },
  { id: 'new-york', city: 'نيويورك', country: 'الولايات المتحدة', zone: 'America/New_York', flag: '🇺🇸' },
  { id: 'tokyo', city: 'طوكيو', country: 'اليابان', zone: 'Asia/Tokyo', flag: '🇯🇵' },
  { id: 'sydney', city: 'سيدني', country: 'أستراليا', zone: 'Australia/Sydney', flag: '🇦🇺' },
];

const formatTime = (date, timeZone) => new Intl.DateTimeFormat('ar-EG', {
  timeZone,
  hour: '2-digit',
  minute: '2-digit',
  second: '2-digit',
  hour12: true,
}).format(date);

const formatDate = (date, timeZone) => new Intl.DateTimeFormat('ar-EG', {
  timeZone,
  weekday: 'long',
  day: 'numeric',
  month: 'long',
}).format(date);

export default function WorldClock() {
  const [now, setNow] = useState(() => new Date());
  const [query, setQuery] = useState('');
  const [favoriteIds, setFavoriteIds] = useState(() => {
    try { return JSON.parse(localStorage.getItem('ziko-clock-favorites')) || ['cairo']; } catch { return ['cairo']; }
  });

  useEffect(() => {
    const timer = window.setInterval(() => setNow(new Date()), 1000);
    return () => window.clearInterval(timer);
  }, []);

  useEffect(() => {
    localStorage.setItem('ziko-clock-favorites', JSON.stringify(favoriteIds));
  }, [favoriteIds]);

  const visibleZones = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    return zones.filter((item) => !normalized || `${item.city} ${item.country} ${item.zone}`.toLowerCase().includes(normalized));
  }, [query]);

  const toggleFavorite = (id) => setFavoriteIds((current) => current.includes(id) ? current.filter((item) => item !== id) : [...current, id]);

  return (
    <section className="world-clock" aria-labelledby="world-clock-title">
      <div className="world-clock__header">
        <div>
          <span className="world-clock__eyebrow">Ziko Time Intelligence</span>
          <h2 id="world-clock-title">الساعة العالمية</h2>
          <p>اعرف الوقت الحالي في أهم أماكن شغلك وسفرك، في لمحة واحدة.</p>
        </div>
        <div className="world-clock__now" aria-live="polite">
          <small>التوقيت المحلي</small>
          <strong>{formatTime(now, Intl.DateTimeFormat().resolvedOptions().timeZone)}</strong>
        </div>
      </div>

      <label className="world-clock__search">
        <span aria-hidden="true">⌕</span>
        <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="ابحث عن مدينة أو دولة..." aria-label="ابحث عن مدينة أو دولة" />
      </label>

      <div className="world-clock__grid">
        {visibleZones.map((item) => (
          <article className={`clock-card ${favoriteIds.includes(item.id) ? 'clock-card--favorite' : ''}`} key={item.id}>
            <div className="clock-card__topline">
              <span className="clock-card__flag" aria-hidden="true">{item.flag}</span>
              <button className="clock-card__favorite" onClick={() => toggleFavorite(item.id)} aria-label={`${favoriteIds.includes(item.id) ? 'إزالة' : 'إضافة'} ${item.city} للمفضلة`} aria-pressed={favoriteIds.includes(item.id)}>
                {favoriteIds.includes(item.id) ? '★' : '☆'}
              </button>
            </div>
            <h3>{item.city}</h3>
            <p>{item.country}</p>
            <time dateTime={now.toISOString()}>{formatTime(now, item.zone)}</time>
            <small>{formatDate(now, item.zone)}</small>
            <span className="clock-card__zone">{item.zone}</span>
          </article>
        ))}
      </div>

      {visibleZones.length === 0 && <div className="world-clock__empty">مش لاقي المكان ده. جرّب اسم مدينة تاني.</div>}
    </section>
  );
}
