const express = require('express');
const newMealController = require('../controllers/newMealController');

const router = express.Router();



router.post('/addNewMeal', newMealController.addNewMeal);



module.exports = router;
