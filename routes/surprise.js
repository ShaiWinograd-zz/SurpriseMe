const express = require('express');
const router = express.Router()

// Importing surprise controller methods
const {getSurprise} = require('../controllers/surpriseController')

router.route('/surprise').get(getSurprise);

module.exports = router;