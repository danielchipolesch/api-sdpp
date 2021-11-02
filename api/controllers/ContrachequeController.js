const ContrachequeModel = require('../models/ContrachequeModel');

class ContrachequePdfController {
  
  getDadosUmContracheque = async (req, res, next) => {
    const params = req.params;
    await ContrachequeModel.findOne(params, res);
  }
  
  getUmContrachequePdf = async (req, res, next) => {
    const params = req.params;
    await ContrachequeModel.geraContrachequePdf(params, res);
  }

  getTodosContrachequesAnoPdf = async (req, res, next) => {
    const params = req.params;
    await ContrachequeModel.geraTodosContrachequesAnoPdf(params, res);
  }
}

module.exports = new ContrachequePdfController;