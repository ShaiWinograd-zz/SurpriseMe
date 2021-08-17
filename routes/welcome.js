const express = require('express');
const router = express.Router()

// Importing surprise controller methods
const {getWelcome} = require('../controllers/welcomeController')

router.route('').get(getWelcome);

module.exports = router;