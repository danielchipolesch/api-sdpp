// Depois passar a conexão para Pool
module.exports = (ano) => {
  const mysql = require('mysql');
  return mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: '123456',
    database: `contracheque_${ano}`
  })
}

// connection.connect((err) => {
//   if(err){
//     console.error('Erro ao conectar ao BD: ' + err.stack);
//     return;
//   }
//   console.log('Conectado com o id: ' + connection.threadId);
// })