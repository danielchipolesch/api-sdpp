const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');

const contrachequeModel = require('./api/models/Contracheque')
const routeContracheque = require('./api/routes/routeContracheque');

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

app.use('/contracheques/', routeContracheque);

//Exceção criada para quando a rota chamada não for identificada
app.use((req, res, next) => {
  contrachequeModel.montaErroContrachequePdf(res.status(404));  
  next();
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