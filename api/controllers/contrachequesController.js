const Contracheque = require('../models/contrachequesModel')

class ContrachequeController {

  buscaUmContracheque(req, res) {
    try {
      const nordem = req.params.nordem;
      const mes = req.params.mes;
      const buscaUmaPessoa = Contracheque.buscaContracheque(nordem, mes);
      return res.status(200).send(buscaUmaPessoa);
      
    } catch (error) {
      return res.status(500).json(error.message)
    }
  }
}

/* module.exports = app => {
  app.get('/contracheque/:ano/:mes/:nordem', (req, res) => {
    //const ano = req.params.ano;
    const mes = req.params.mes;
    const nordem = req.params.nordem;

    Contracheque.buscaContracheque(nordem, mes, res);
    
  });
}
*/

module.exports = new ContrachequeController;