export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  try {
    const { query = '' } = req.body || {};
    const fs = await import('fs');
    const path = await import('path');

    // Resolve knowledge.json from repo root
    const root = path.dirname(path.dirname(__dirname));
    const candidates = [
      path.join(root, 'knowledge.json'),
      path.join(__dirname, 'knowledge.json')
    ];

    let knowledge = [];
    for (const p of candidates) {
      try {
        if (fs.existsSync(p)) {
          const raw = fs.readFileSync(p, 'utf-8');
          knowledge = JSON.parse(raw);
          break;
        }
      } catch {}
    }

    const q = String(query).toLowerCase();

    const pick = (type) => knowledge.filter((it) => it && it.type === type).map((it) => it.content);

    let answer = '';
    if (["skill","skills","tech","stack","technical"].some(w => q.includes(w))) {
      const list = pick('skill');
      if (list.length) answer = 'Skills: ' + list.join(', ');
    } else if (["project","projects","build","create"].some(w => q.includes(w))) {
      const list = pick('project');
      if (list.length) answer = 'Projects: ' + list.slice(0,3).join('. ');
    } else if (["experience","work","job","intern"].some(w => q.includes(w))) {
      const list = pick('experience');
      if (list.length) answer = 'Experience: ' + list.slice(0,3).join('. ');
    } else if (["language","languages","mandarin","english"].some(w => q.includes(w))) {
      const list = pick('language');
      if (list.length) answer = 'Languages: ' + list.join(', ');
    }

    if (!answer) {
      const intro = pick('motivation')[0] || '';
      answer = intro ? `${intro} Feel free to ask me about my skills, projects, or experience!` : `I'm Krishiv's AI assistant. I can tell you about my skills, projects, and experience.`;
    }

    return res.status(200).json({ answer, context: [], model: 'edge-simple' });
  } catch (e) {
    return res.status(200).json({
      answer: "I'm having trouble responding right now. Please try again.",
      context: []
    });
  }
}
