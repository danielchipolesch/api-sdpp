const ContrachequeModel = require('../models/ContrachequeModel');

class ContrachequeController {

  getContracheques = (req, res, next) => {
    res.status(200).send({
      mensagem: 'GET para retornar vários contracheques dentro da rota contracheque'
    })
  }

  getUmContracheque = async (req, res, next) => {
    const params = req.params;
    await ContrachequeModel.findOne(params, res);
  }

  getContrachequePdf = async (req, res, next) => {
    const params = req.params;
    await ContrachequeModel.geraUmContrachequePdf(params, res);
  }
}


module.exports = new ContrachequeController;