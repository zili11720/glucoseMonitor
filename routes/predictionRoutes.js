const express = require('express');
const predictionController = require('../controllers/predictionController.js');

const router = express.Router();

router.post('/predict', predictionController.predictGlucose);

module.exports = router;