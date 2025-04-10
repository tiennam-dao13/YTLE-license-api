const fetch = require('node-fetch'); // Gọi API từ sheet

module.exports = async (req, res) => {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Only POST allowed' });
  }

  const { key, hwid } = req.body;

  if (!key || !hwid) {
    return res.status(400).json({ valid: false, error: 'Missing key or hwid' });
  }

  // Thay bằng Sheet ID của bạn
  const sheetUrl = 'https://opensheet.elk.sh/15YlsJpx-L77J1K3jvffaNwSBXasyxO2KlOFZ6IvWueQ/licenses';

  try {
    const response = await fetch(sheetUrl);
    const data = await response.json();

    const found = data.find(entry => entry.key === key && entry.hwid === hwid);

    res.status(200).json({ valid: !!found });
  } catch (err) {
    res.status(500).json({ valid: false, error: 'Server error' });
  }
};
