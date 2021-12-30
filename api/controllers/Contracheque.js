const ContrachequeModel = require('../models/Contracheque');

class ContrachequeController {
  
  getDadosUmContrachequePorSaram = async (req, res, next) => {
    const params = req.params;
    await ContrachequeModel.findOne(params)
      .then(dadoGerado => res.status(200).json(dadoGerado))
      .catch(erros => res.status(400).json({"message": "Parâmetro inválido"}));
  }
  
  getUmContrachequePdfPorSaram = async (req, res, next) => {
    const params = req.params;    
    await ContrachequeModel.findOne(params)
      .then(dadoGerado => ContrachequeModel.montaContrachequePdf(dadoGerado, res))
      .catch(erros => ContrachequeModel.montaErroContrachequePdf(res.status(404)));
  }

  getDadosTodosContrachequesAnoPorPessoa = async (req, res, next) => {
    const params = req.params;
    await ContrachequeModel.findAll(params)
      .then(dadoGerado => res.status(200).json(dadoGerado))
      .catch(erros => res.status(400).json({"message": "Parâmetro inválido"}));      
  }
}

module.exports = new ContrachequeController;