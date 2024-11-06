const userDataAccess = require('../dataAccess/userDataAccess');

async function validateUser(username, password) {
  try {
     const userData= await userDataAccess.checkUserCredentials(username, password);
     if(userData.recordset.length > 0){//check if the user exists
           return userData.recordset[0];  // Return the full user record 
           
     } else {
      return null;  // Return null if the user is not found
    }

  } catch (err) {
    throw new Error('Error validating user: ' + err.message);
  }
}

async function getUserByEmail(email) {
  try {
    const userData = await userDataAccess.getUserByEmail(email);
    return userData.recordset.length > 0 ? userData.recordset[0] : null;
  } catch (err) {
    throw new Error('Error fetching user by email: ' + err.message);
  }
}

async function createUser(name, password, date_of_birth, weight, email) {
  try {
    await userDataAccess.insertUser(name, password, date_of_birth, weight, email);
  } catch (err) {
    throw new Error('Error creating user: ' + err.message);
  }
}

module.exports = {
  validateUser,
  getUserByEmail,
  createUser
};


