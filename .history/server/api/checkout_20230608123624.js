const express = require('express');
const router = express.Router();

// POST /checkout
router.post('/checkout', (req, res) => {
  res.json({ message: 'Checkout successful' });
});

module.exports = router;