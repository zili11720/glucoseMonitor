const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController.js');

// Route for login post
router.post('/login', userController.login);

router.get('/signUpForm', (req, res) => {
    res.render('pages/signUp');  // Render the signUp.ejs file
});

// Route for sign-up post
router.post('/signUp', userController.signUp);


router.get('/contact', (req, res) => {
    res.render('pages/contact');  
});

module.exports = router;
