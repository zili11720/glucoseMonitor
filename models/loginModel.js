const userDataAccess = require('../dataAccess/loginDataAccess');

async function validateUser(username, password) {
  try {
    const isValid = await userDataAccess.checkUserCredentials(username, password);
    return isValid;
  } catch (err) {
    throw new Error('Error validating user: ' + err.message);
  }
}

module.exports = {
  validateUser
};
