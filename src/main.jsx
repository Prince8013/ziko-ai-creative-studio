import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import WorldClock from './components/WorldClock';
import './styles.css';

function StudioWithClock() {
  return (
    <>
      <App />
      <div className="world-clock-dock">
        <WorldClock />
      </div>
    </>
  );
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <StudioWithClock />
  </StrictMode>
);
