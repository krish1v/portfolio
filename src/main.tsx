import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './styles/globals.css'

// Warm up backend (Render cold starts) without blocking UI
const API_BASE =
  (import.meta as any).env?.MODE === 'production'
    ? (import.meta as any).env?.VITE_API_BASE_URL
    : 'http://127.0.0.1:8000';

const warmBackend = () => {
  // Best-effort: don't await; short network timeout guard
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 2500);
  // Prefer /warmup if available; fall back to /health
  fetch(`${API_BASE}/warmup`, {
    method: 'GET',
    cache: 'no-store',
    signal: controller.signal,
  })
    .catch(() => fetch(`${API_BASE}/health`, { method: 'GET', cache: 'no-store' }).catch(() => {}))
    .finally(() => clearTimeout(timeout));
};

// Schedule warmup once the main thread is idle (or after a brief delay)
if (typeof (window as any).requestIdleCallback === 'function') {
  (window as any).requestIdleCallback(() => warmBackend());
} else {
  setTimeout(() => warmBackend(), 300);
}

// Optional: light keepalive while the tab is open to reduce Render idle sleep
// Runs every 4 minutes; kept modest to avoid unnecessary traffic
let keepaliveTimer: number | undefined;
const startKeepalive = () => {
  stopKeepalive();
  keepaliveTimer = window.setInterval(() => {
    fetch(`${API_BASE}/warmup`, { method: 'GET', cache: 'no-store' })
      .catch(() => fetch(`${API_BASE}/health`, { method: 'GET', cache: 'no-store' }).catch(() => {}));
  }, 4 * 60 * 1000);
};
const stopKeepalive = () => {
  if (keepaliveTimer) {
    clearInterval(keepaliveTimer);
    keepaliveTimer = undefined;
  }
};
// Start keepalive on visibility; pause when hidden
document.addEventListener('visibilitychange', () => {
  if (document.visibilityState === 'visible') startKeepalive();
  else stopKeepalive();
});
// Kick off on load if visible
if (document.visibilityState === 'visible') startKeepalive();

createRoot(document.getElementById("root")!).render(<App />);
