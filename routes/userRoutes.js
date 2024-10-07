const express = require('express');
const router = express.Router();
const loginController = require('../controllers/userController.js');

// Route for login post
router.post('/login', loginController.login);

router.get('/home', (req, res) => {
    res.render('pages/home');  // Render the home page
});

router.get('/contact', (req, res) => {
    res.render('pages/contact');  //  זה כאן זמניתץ להעיף את זה מכאן אחכ
});


module.exports = router;
