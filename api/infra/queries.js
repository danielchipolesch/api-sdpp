const connection = require('./Conn');

module.exports = (query, params = '') => {
  return new Promise((resolve, reject) => {
    connection.query(query, params, (err, result, _fields) => {
      try {
        resolve(result);
      } catch (error) {
        reject(error);
      }      
    })
  })
}