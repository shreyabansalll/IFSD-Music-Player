const express = require('express');
const { getSongs } = require('../controllers/songController');
const router = express.Router();

// Route to get all songs
router.get('/', getSongs);

module.exports = router;
