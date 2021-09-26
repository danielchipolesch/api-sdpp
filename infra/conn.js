const mysql = require('mysql');

const ano = '2021';

const conn = mysql.createConnection({
  host: 'localhost',
  port: 3306,
  user: 'root',
  password: '123456',
  database: 'contracheque_2021'
})

module.exports = conn;