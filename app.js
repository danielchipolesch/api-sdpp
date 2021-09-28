const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');

const routeContracheque = require('./api/routes/contrachequesRoute');

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: false })); //apenas dados simples
app.use(bodyParser.json()); //Aceita somente json como entrada
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*'); //Permite restringir os servidores que podem acessar a aplicação. Para isso, basta especificar a URL no lugar do *.
  res.header('Access-Control-Allow-Header', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  if (req.method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT');
    return res.status(200).json({})
  }
  next();
})

app.use('/contracheques', routeContracheque);

//Exceção criada para quando a rota chamada não for identificada
app.use((req, res, next) => {
  const erro = new Error('Rota não encontrada');
  erro.status = 404;
  next(erro);
});

//Exceção criada para quando qualquer erro
app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    erro: {
      mensagem: error.message
    }
  })
});

module.exports = app;








const consign = require('consign');
const conn = require('./api/infra/conn');
const Tabelas = require('./api/infra/tables');

/*
app.use(bodyParser.json());

conn.connect((err) => {
  if(err) {
    console.log(err);
  } else {
    app.listen(PORT, () => console.log("Servidor rodando na porta " + PORT));
    console.log('Conectado com sucesso.');
    Tabelas.init(conn);
  }
})


consign()
  .include('controllers')
  .include('infra')  
  .into(app)
const PORT = 3000;

*/