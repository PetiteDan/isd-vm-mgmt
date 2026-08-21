module.exports = (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ ok: false });

  const body = req.body || {};
  const password = body.password;
  const type = body.type;

  if (type === 'exam') {
    const validPassword = process.env.EXAM_DATE || getTodayString();
    return res.status(200).json({ ok: password === validPassword });
  }

  if (type === 'admin') {
    const adminPassword = process.env.ADMIN_PASSWORD || 'admin1234';
    return res.status(200).json({ ok: password === adminPassword });
  }

  return res.status(400).json({ ok: false });
};

function getTodayString() {
  const now = new Date(new Date().toLocaleString('en-US', { timeZone: 'Asia/Taipei' }));
  const y = now.getFullYear();
  const m = String(now.getMonth() + 1).padStart(2, '0');
  const d = String(now.getDate()).padStart(2, '0');
  return `${y}${m}${d}`;
}
