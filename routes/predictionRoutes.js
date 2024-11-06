const express = require('express');
const predictionController = require('../controllers/predictionController.js');

const router = express.Router();

router.get('/', (req, res) => {
    res.render('pages/prediction',{ mealsData: null }); 
});

router.post('/predict', predictionController.predictGlucose);

module.exports = router;