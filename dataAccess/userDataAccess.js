const sql = require('mssql');
const { dbConfig } = require('../config'); // get connection string from config file

async function checkUserCredentials(username, password) {
    try {
      // Connect to the database
      await sql.connect(dbConfig);
      
      const query = `SELECT * FROM Users WHERE name = '${username}' AND password = '${password}' `;
  
      return await sql.query(query);

    } catch (err) {
      console.error('Error accessing DB:', err);
      throw err;
    }
  }
  
  // Check if a user already exists by email
async function getUserByEmail(email) {
  try {
    await sql.connect(dbConfig);
    const query = `SELECT * FROM Users WHERE email = '${email}'`;
    return await sql.query(query);
  } catch (err) {
    console.error('Error accessing DB:', err);
    throw err;
  }
}

// Insert a new user into the database
async function insertUser(name, password, date_of_birth, weight, email) {
  try {
    await sql.connect(dbConfig);
    const query = `
      INSERT INTO Users (name, password, date_of_birth, weight, email)
      VALUES ('${name}', '${password}', '${date_of_birth}', ${weight}, '${email}')
    `;
    await sql.query(query);
  } catch (err) {
    console.error('Error accessing DB:', err);
    throw err;
  }
}

module.exports = {
  checkUserCredentials,
  getUserByEmail,
  insertUser
};