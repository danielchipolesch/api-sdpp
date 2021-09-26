const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {
  res.status(200).send({
    mensagem: 'GET dentro da rota contracheque'
  })
});

router.get('/:ano/:mes/:nordem', (req, res, next) => {
  const parametros = {
    ano : req.params.ano,
    mes : req.params.mes,
    nordem : req.params.nordem
  };

  res.status(200).send({
    mensagem: `GET dentro da rota contracheque usando parâmetros`,
    ano: `${parametros.ano}`,
    mes: `${parametros.mes}`,
    saram: `${parametros.nordem}`
  })
});

router.post('/', (req, res, next) => {
  res.status(201).send({
    mensagem: 'POST dentro da rota contracheque'
  })
})

module.exports = router;