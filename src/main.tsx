import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './styles/globals.css'

// Warm the backend early to avoid first-request cold start latency
const API_BASE = (import.meta as any).env?.MODE === 'production'
  ? (import.meta as any).env?.VITE_API_BASE_URL
  : 'http://127.0.0.1:8000';

function warmBackend(): void {
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 2500);
    // Fire-and-forget health check; ignore result/errors
    fetch(`${API_BASE}/health`, {
      method: 'GET',
      cache: 'no-store',
      keepalive: true,
      signal: controller.signal,
    }).finally(() => clearTimeout(timeoutId)).catch(() => {});
  } catch {}
}

warmBackend();

createRoot(document.getElementById("root")!).render(<App />);
