// config.js
const dbConfig = {
    user: 'Zili_SQLLogin_2',
    password: 'otzu9c8ov1',
    server: 'zilibomdb.mssql.somee.com',
    database: 'zilibomdb',
    options: {
      encrypt: true,
      enableArithAbort: true,
      trustServerCertificate: true,
      port: 1433,
    }
  };
  
  module.exports = { dbConfig };
  