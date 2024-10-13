const express = require('express');
const newMealController = require('../controllers/newMealController');

const router = express.Router();

router.post('/addNewMeal',  newMealController.upload.single('imageFile'),newMealController.addNewMeal);



module.exports = router;
