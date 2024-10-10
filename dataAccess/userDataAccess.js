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
  
  module.exports = {
    checkUserCredentials
  };