const fs = require('fs');
const path = require('path');

let bundledKnowledge = [];
try {
  bundledKnowledge = require('../knowledge.json');
} catch {}

async function parseJsonBody(req) {
  if (req.body && typeof req.body === 'object') return req.body;
  return new Promise((resolve) => {
    let data = '';
    req.on('data', (chunk) => (data += chunk));
    req.on('end', () => {
      try {
        resolve(JSON.parse(data || '{}'));
      } catch {
        resolve({});
      }
    });
  });
}

module.exports = async (req, res) => {
  // CORS headers (safe even on same-origin)
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
    const body = await parseJsonBody(req);
    const query = String(body.query || '');

    let knowledge = Array.isArray(bundledKnowledge) ? bundledKnowledge : [];

    if (!knowledge.length) {
      // Resolve knowledge.json from repo root (fallback)
      const root = path.dirname(path.dirname(__dirname));
      const candidates = [
        path.join(root, 'knowledge.json'),
        path.join(__dirname, 'knowledge.json'),
      ];
      for (const p of candidates) {
        try {
          if (fs.existsSync(p)) {
            const raw = fs.readFileSync(p, 'utf-8');
            knowledge = JSON.parse(raw);
            break;
          }
        } catch {}
      }
    }

    const q = query.toLowerCase();
    const pick = (type) => knowledge.filter((it) => it && it.type === type).map((it) => it.content);

    let answer = '';
    if (["skill","skills","tech","stack","technical"].some((w) => q.includes(w))) {
      const list = pick('skill');
      if (list.length) answer = 'Skills: ' + list.join(', ');
    } else if (["project","projects","build","create"].some((w) => q.includes(w))) {
      const list = pick('project');
      if (list.length) answer = 'Projects: ' + list.slice(0, 3).join('. ');
    } else if (["experience","work","job","intern"].some((w) => q.includes(w))) {
      const list = pick('experience');
      if (list.length) answer = 'Experience: ' + list.slice(0, 3).join('. ');
    } else if (["language","languages","mandarin","english"].some((w) => q.includes(w))) {
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
    return res.end(
      JSON.stringify({ answer: "I'm having trouble responding right now. Please try again.", context: [] })
    );
  }
};
