class Database{
  mysqlConnection(ano){
    const mysql = require('mysql');
    try {
      const conn = mysql.createConnection({
        host: 'localhost',
        port: '3306',
        user: 'root',
        password: '123456',
        database: `contracheque_${ano}`
      });

      conn.connect((err) => {
        if(err){
          console.error('Erro ao conectar ao BD: ' + err);
          return;
          console.error('Erro ao conectar ao BD: ' + err.stack); // O .stack joga dados sensíveis no console 
        }
        console.log('Conectado com o id: ' + conn.threadId);
      })

      return conn;

    } catch (error) {
      console.error('Erro ao conectar ao BD: ' + error);
      return;
    }    
  }
}

module.exports = Database;
