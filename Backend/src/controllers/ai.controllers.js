const generateContent = require('../services/ai.service');  

module.exports.getReview = async (req, res) => {
  const { code } = req.body;  

  if (!code) {
    return res.status(400).json({ error: 'Code is required' });
  }

  try {
    const review = await generateContent(code);  // ✅ Avoid variable name conflict
    res.send(review);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
