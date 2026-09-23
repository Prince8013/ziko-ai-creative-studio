import { useEffect, useState } from 'react';
import { mediaEngine } from '../services/mediaEngine';

export default function BackendStatus() {
  const [state, setState] = useState({ loading: true, ok: false, error: '' });

  useEffect(() => {
    let active = true;
    mediaEngine.health()
      .then((data) => active && setState({ loading: false, ok: Boolean(data.ok), error: '' }))
      .catch((error) => active && setState({ loading: false, ok: false, error: error.message }));
    return () => { active = false; };
  }, []);

  return (
    <span className={`backend-status ${state.loading ? 'is-loading' : state.ok ? 'is-ok' : 'is-error'}`} title={state.error || 'Backend status'}>
      {state.loading ? 'Backend...' : state.ok ? 'Backend محلي متصل' : 'Backend غير متصل'}
    </span>
  );
}
