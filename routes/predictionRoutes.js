const express = require('express');
const predictionController = require('../controllers/predictionController.js');

const router = express.Router();

router.get('/', (req, res) => {
    res.render('pages/prediction',{ mealsData: null });  //  זה כאן זמניתץ להעיף את זה מכאן אחכ
});

router.post('/predict', predictionController.predictGlucose);

module.exports = router;