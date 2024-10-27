const userModel = require('../models/userModel');

async function login(req, res,next) {
  const { username, password } = req.body;

  try {
    const isValidUser = await userModel.validateUser(username, password);
  
    if (isValidUser) {
      req.session.userId = isValidUser.id; // Store the user ID in the session
      next(); 
    } else {
      // If invalid, send back an error message without 
      res.render('pages/index', { alertMessage: 'Wrong username or password!' });
    }
  } catch (err) {
    res.status(500).send('Server Error: ' + err.message);
  }
}

async function signUp(req, res) {
  const { full_name, password, date_of_birth, weight, email } = req.body;

  try {
    // Check if the user already exists
    const existingUser = await userModel.getUserByEmail(email);

    if (existingUser) {
      return res.render('pages/signUp', { errorMessage: 'User already exists' });
    }


    // Create the new user
    await userModel.createUser(full_name, password, date_of_birth, weight, email);

    //Go back to index after sign in
    res.render('pages/index', { alertMessage: 'Sign up successful!' });
  } catch (err) {
    res.status(500).send('Server Error: ' + err.message);
  }
}

module.exports = {
  login,
  signUp
};

