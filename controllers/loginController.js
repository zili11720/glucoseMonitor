const userModel = require('../models/loginModel');

async function login(req, res) {
  const { username, password } = req.body;

  try {
    const isValidUser = await userModel.validateUser(username, password);
  
    if (isValidUser) {
      // If valid, redirect to the next page 
      res.redirect('/dashboard');
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
