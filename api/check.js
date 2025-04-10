export default function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Only POST method allowed' });
  }

  const { key, hwid } = req.body;

  // Danh sách key và HWID hợp lệ (bạn có thể thay đổi)
  const licenses = {
    'ABC123-XYZ789': 'UUID123-DISK456',
    'DEF456-GHI012': 'UUID999-DISK777'
  };

  if (licenses[key] && licenses[key] === hwid) {
    res.status(200).json({ status: 'valid' });
  } else {
    res.status(200).json({ status: 'invalid' });
  }
}
