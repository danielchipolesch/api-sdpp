const Contracheque = require('../models/contracheques')

module.exports = app => {
  app.get('/contracheques/:ano/:mes/:nordem', (req, res) => {
    //const ano = req.params.ano;
    const mes = req.params.mes;
    const nordem = req.params.nordem;

    Contracheque.buscarContracheque(nordem, mes, res);
    
  });
}