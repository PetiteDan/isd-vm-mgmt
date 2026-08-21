module.exports = (req, res) => {
  if (req.method !== 'POST') return res.status(405).json({ ok: false });
  const { password, type } = req.body || {};
  if (type === 'admin') {
    const adminPassword = process.env.ADMIN_PASSWORD || 'admin1234';
    return res.status(200).json({ ok: password === adminPassword });
  }
  return res.status(400).json({ ok: false });
};
