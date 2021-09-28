const mysql = require('mysql');

// Depois passar a conexão para Pool
const connection = mysql.createConnection({
  host: 'localhost',
  port: 3306,
  user: 'root',
  password: '123456',
  database: 'contracheque_2021'
})

connection.connect((err) => {
  if(err){
    console.error('Erro ao conectar ao BD: ' + err.stack);
    return;
  }
  console.log('Conectado com o id: ' + connection.threadId);
})

module.exports = connection;