const ContrachequeModel = require('../models/ContrachequeModel');

class ContrachequeController {

  getContracheques = (req, res, next) => {
    res.status(200).send({
      mensagem: 'GET para retornar vários contracheques dentro da rota contracheque'
    })
  }

  getUmContracheque = (req, res, next) => {
    const params = req.params;
    ContrachequeModel.findOne(params, res);
  }

  getContrachequePdf = (req, res, next) => {
    const params = req.params;
    ContrachequeModel.geraUmContrachequePdf(params, res);
  }
}


module.exports = new ContrachequeController;