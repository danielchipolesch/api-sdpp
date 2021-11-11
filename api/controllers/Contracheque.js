const ContrachequeModel = require('../models/Contracheque');

class ContrachequePdfController {
  
  getDadosUmContracheque = async (req, res, next) => {
    const params = req.params;
    await ContrachequeModel.findOne(params)
      .then(dadoGerado => res.status(200).json(dadoGerado))
      .catch(erros => res.status(400).json(erros));
  }
  
  getUmContrachequePdf = async (req, res, next) => {
    const params = req.params;    
    await ContrachequeModel.findOne(params)
      .then(dadoGerado => ContrachequeModel.montaContrachequePdf(dadoGerado, res))
      .catch(erros => ContrachequeModel.montaErroContrachequePdf(res));
  }

  getTodosContrachequesAnoPdf = async (req, res, next) => {
    const params = req.params;
    await ContrachequeModel.geraTodosContrachequesAnoPdf(params, res);
  }
}

module.exports = new ContrachequePdfController;