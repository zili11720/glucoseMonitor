const userDataAccess = require('../dataAccess/userDataAccess');

async function validateUser(username, password) {
  try {
     const userData= await userDataAccess.checkUserCredentials(username, password);
     if(userData.recordset.length > 0){//check if the user exists
           return userData.recordset[0];  // Return the full user record 
           
     } else {
      return null;  // Return null if the user is not found
    }

    return isValid;
  } catch (err) {
    throw new Error('Error validating user: ' + err.message);
  }
}

module.exports = {
  validateUser
};
