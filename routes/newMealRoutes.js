const express = require('express');
const newMealController = require('../controllers/newMealController');

const router = express.Router();

// Handle image URL submission and analysis
router.post('/upload', newMealController.analyzeImage);

module.exports = router;
