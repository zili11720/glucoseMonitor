const userModel = require('../models/userModel');

async function login(req, res) {
  const { username, password } = req.body;

  try {
    const isValidUser = await userModel.validateUser(username, password);
  
    if (isValidUser) {
      req.session.userId = isValidUser.id; // Store the user ID in the session
      // If valid, redirect to the next page 
      res.redirect('/home');
    } else {
      // If invalid, send back an error message without 
      res.status(401).send({ error: 'Invalid username or password' });
    }
  } catch (err) {
    res.status(500).send('Server Error: ' + err.message);
  }
}

module.exports = {
  login
};
