export const config = {};

async function parseJsonBody(req) {
  if (req.body && typeof req.body === 'object') return req.body;
  return new Promise((resolve) => {
    let data = '';
    req.on('data', (chunk) => (data += chunk));
    req.on('end', () => {
      try { resolve(JSON.parse(data || '{}')); } catch { resolve({}); }
    });
  });
}

async function loadKnowledge(req) {
  // Try JSON module import (Node 20+). Node 18 may not support this.
  try {
    const mod = await import('../knowledge.json', { assert: { type: 'json' } });
    if (Array.isArray(mod?.default) && mod.default.length) return mod.default;
  } catch {}

  // Fallback to filesystem paths
  try {
    const fs = await import('node:fs');
    const path = await import('node:path');
    const url = await import('node:url');
    const here = url.fileURLToPath(import.meta.url);
    const dir = path.dirname(here);
    const candidates = [
      path.join(process.cwd(), 'knowledge.json'),
      path.join(dir, '..', 'knowledge.json'),
      path.join(dir, 'knowledge.json'),
      path.join(process.cwd(), '../knowledge.json'),
    ];
    for (const p of candidates) {
      try {
        if (fs.existsSync(p)) {
          const raw = fs.readFileSync(p, 'utf-8');
          const data = JSON.parse(raw);
          if (Array.isArray(data)) return data;
        }
      } catch {}
    }
  } catch {}

  // Final fallback: fetch from same deployment if available (requires knowledge.json to be in /public)
  try {
    const host = req.headers['x-forwarded-host'] || req.headers.host;
    const proto = req.headers['x-forwarded-proto'] || 'https';
    if (host) {
      const url = `${proto}://${host}/knowledge.json`;
      const resp = await fetch(url);
      if (resp.ok) {
        const data = await resp.json();
        if (Array.isArray(data)) return data;
      }
    }
  } catch {}

  return [];
}

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.statusCode = 204;
    return res.end();
  }

  if (req.method === 'GET') {
    res.setHeader('Content-Type', 'application/json');
    return res.end(JSON.stringify({ status: 'ok' }));
  }

  if (req.method !== 'POST') {
    res.statusCode = 405;
    res.setHeader('Content-Type', 'application/json');
    return res.end(JSON.stringify({ error: 'Method Not Allowed' }));
  }

  try {
    const knowledge = await loadKnowledge(req);
    const body = await parseJsonBody(req);
    const query = String(body.query || '').toLowerCase();

    const pick = (type) => (Array.isArray(knowledge) ? knowledge : [])
      .filter((it) => it && it.type === type)
      .map((it) => it.content);

    let answer = '';
    if (["skill","skills","tech","stack","technical"].some((w) => query.includes(w))) {
      const list = pick('skill');
      if (list.length) answer = 'Skills: ' + list.join(', ');
    } else if (["project","projects","build","create"].some((w) => query.includes(w))) {
      const list = pick('project');
      if (list.length) answer = 'Projects: ' + list.slice(0, 3).join('. ');
    } else if (["experience","work","job","intern"].some((w) => query.includes(w))) {
      const list = pick('experience');
      if (list.length) answer = 'Experience: ' + list.slice(0, 3).join('. ');
    } else if (["language","languages","mandarin","english"].some((w) => query.includes(w))) {
      const list = pick('language');
      if (list.length) answer = 'Languages: ' + list.join(', ');
    }

    if (!answer) {
      const intro = pick('motivation')[0] || '';
      answer = intro
        ? `${intro} Feel free to ask me about my skills, projects, or experience!`
        : `I'm Krishiv's AI assistant. I can tell you about my skills, projects, and experience.`;
    }

    res.setHeader('Content-Type', 'application/json');
    return res.end(JSON.stringify({ answer, context: [], model: 'edge-simple' }));
  } catch (e) {
    res.setHeader('Content-Type', 'application/json');
    return res.end(JSON.stringify({ answer: "I'm having trouble responding right now. Please try again.", context: [] }));
  }
}
