const express = require('express');
const newMealController = require('../controllers/newMealController');

const router = express.Router();

// Handle image URL submission and analysis
router.post('/upload', newMealController.analyzeImage);

// Handle USDA glucose lookup with GET
router.get('/usdaGlucose', newMealController.getUSDAglucose);

module.exports = router;
