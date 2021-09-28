const express = require('express');
const router = express.Router();
const connection = require('../infra/conn');
const contracheque = require('../controllers/contrachequesController');

router.get('/', (req, res, next) => {
  res.status(200).send({
    mensagem: 'GET dentro da rota contracheque'
  })
});

router.get('/:ano/:mes/:nordem', (req, res, next) => {
  const ano = req.params.ano;
  const mes = req.params.mes;
  const nordem = req.params.nordem;
  const sql = `SELECT * FROM ${mes}_pessoais p INNER JOIN ${mes}_caixas c ON p.nordem=c.nordem INNER JOIN ${mes}_unidades u ON p.subom=u.unidade WHERE p.nordem=${nordem}`;
  connection.query(sql, [mes, ano], (err, result, fields) => {
    if(err){
      return res.status(500).json(err);
    } else {
      return res.status(200).json(result);
    }
  })
})

router.post('/', (req, res, next) => {
  res.status(201).send({
    mensagem: 'POST dentro da rota contracheque'
  })
})

module.exports = router;