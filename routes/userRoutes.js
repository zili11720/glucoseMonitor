const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController.js');
const {startKafkaConsumer, disconnectKafkaConsumer} = require('../kafka/kafkaMiddleware');

// Route for login post
//router.post('/login', userController.login, startKafkaConsumer);
router.post('/login', userController.login, startKafkaConsumer);

router.get('/signUpForm', (req, res) => {
    res.render('pages/signUp');  // Render the signUp.ejs file
});

// Route for sign-up post
router.post('/signUp', userController.signUp);


router.get('/contact', (req, res) => {
    res.render('pages/contact');  
});

router.get('/contactUs', (req, res) => {
    const noUser=true
    res.render('pages/contact',{noUser});  
});

// Logout route
router.get('/logout', disconnectKafkaConsumer); // Handle logout

module.exports = router;
