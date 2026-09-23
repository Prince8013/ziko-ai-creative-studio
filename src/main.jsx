import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import WorldClock from './components/WorldClock';
import MediaProductionConsole from './components/MediaProductionConsole';
import './styles.css';

function StudioWithMediaEngine() {
  return (
    <>
      <App />
      <div className="media-console-dock"><MediaProductionConsole /></div>
      <div className="world-clock-dock"><WorldClock /></div>
    </>
  );
}

createRoot(document.getElementById('root')).render(<StrictMode><StudioWithMediaEngine /></StrictMode>);
