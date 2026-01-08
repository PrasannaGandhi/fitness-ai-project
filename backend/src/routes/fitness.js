const express = require('express');
const { getFitnessPlan } = require('../controllers/fitnessController');
const auth = require('../middleware/authMiddleware'); // You need to create this middleware next!

const router = express.Router();

// Route to get the user's personalized fitness plan. Requires JWT authentication.
router.get('/plan', auth, getFitnessPlan);

module.exports = router;
