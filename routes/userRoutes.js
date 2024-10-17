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

router.get('/home', (req, res) => {
    res.render('pages/home');  // Render the home page
});

router.get('/contact', (req, res) => {
    res.render('pages/contact');  //  זה כאן זמניתץ להעיף את זה מכאן אחכ
});

router.get('/history', (req, res) => {
    res.render('pages/history',{ mealsData: null });  //  זה כאן זמניתץ להעיף את זה מכאן אחכ
});

router.get('/prediction', (req, res) => {
    res.render('pages/prediction',{ mealsData: null });  //  זה כאן זמניתץ להעיף את זה מכאן אחכ
});


module.exports = router;
