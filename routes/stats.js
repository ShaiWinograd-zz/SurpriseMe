const express = require('express');
const router = express.Router()

// Importing stats controller methods
const {getStats} = require('../controllers/statsController');

router.route('/stats').get(getStats);

module.exports = router;