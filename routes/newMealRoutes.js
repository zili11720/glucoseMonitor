const express = require('express');
const newMealController = require('../controllers/newMealController');

const router = express.Router();

router.get('/', (req, res) => {
    res.render('pages/home');  // Render the home page
});

router.post('/addNewMeal',  newMealController.upload.single('imageFile'),newMealController.addNewMeal);



module.exports = router;
