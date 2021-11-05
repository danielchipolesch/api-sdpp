const Connection = require('./Conn');

const queryExecute = (query, params = '', ano) => {
  const DB = new Connection;  
  return new Promise((resolve, reject) => {
    DB.mysqlConnection(ano).query(query, params, (err, result, fields) => {
      if(err){
        reject(err);
      } else {
        resolve(result);
      }
    })
  })
}

module.exports = queryExecute;