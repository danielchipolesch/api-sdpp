const mysql = require('mysql');

const conn = mysql.createConnection({
  host: 'localhost',
  port: '3306',
  user: 'root',
  password: '123456',
});

conn.connect(function(err) {
  if (err) {
    console.error('error connecting: ' + err.stack);
    return;
  }
 
  console.log('Conectado com o id ' + conn.threadId);
});

module.exports = conn;
