const ContrachequesModel = require('../models/contrachequesModel');

class ContrachequeController {

  getContracheques = (req, res, next) => {
    res.status(200).send({
      mensagem: 'GET para retornar vários contracheques dentro da rota contracheque'
    })
  }

  getUmContracheque = (req, res, next) => {
    const ano = req.params.ano;
    const mes = req.params.mes;
    const nordem = req.params.nordem;
    ContrachequesModel.getUmContracheque(ano, mes, nordem, res);
  }

  geraContrachequePdf = (req, res, next) => {
    
  }
}


module.exports = new ContrachequeController;