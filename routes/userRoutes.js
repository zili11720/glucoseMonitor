const express = require('express');
const router = express.Router();
const loginController = require('../controllers/userController.js');

// Route for login post
router.post('/login', loginController.login);

module.exports = router;
