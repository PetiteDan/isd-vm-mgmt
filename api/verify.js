export default function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ ok: false });
  const { password, type } = req.body;
  if (type === 'exam') {
    const validPassword = process.env.EXAM_DATE || getTodayString();
    return res.status(200).json({ ok: password === validPassword });
  }
  if (type === 'admin') {
    const adminPassword = process.env.ADMIN_PASSWORD;
    if (!adminPassword) return res.status(500).json({ ok: false, message: 'Not configured' });
    return res.status(200).json({ ok: password === adminPassword });
  }
  return res.status(400).json({ ok: false });
}
function getTodayString() {
  const now = new Date(new Date().toLocaleString('en-US', { timeZone: 'Asia/Taipei' }));
  return `${now.getFullYear()}${String(now.getMonth()+1).padStart(2,'0')}${String(now.getDate()).padStart(2,'0')}`;
}
