const connection = require('../infra/conn');
const GeraPdfModel = require('./GeraPdfModel');
const Sql = require('../infra/query')

class ContrachequeModel {

  getContracheques(params, res){
    const anoInicio = params.anoInicio;
    const mesInicio = params.mesInicio;
    const anoFim = params.anoFim;
    const mesFim = params.mesFim;
    const nordem = params.nordem;
    for (i = anoInicio; anoInicio <= i <= anoFim; i++){
      for (j = mesInicio; mesInicio <= j <= mesFim; j++){
        const sql = Sql.selectVariosContracheques(anoInicio, mesInicio, anoFim, mesFim, nordem);        
      }      
    }
    connection.query(sql, [i, j], (err, result, fields) => {
      if(err){
        res.status(500).json(err);
      } else {
        res.status(200).json(result);
      }
    })
  }
  
  getUmContracheque(params, res) {
    const ano = params.ano;
    const mes = params.mes;
    const nordem = params.nordem;
    const sql = Sql.selectUmContracheque(ano, mes, nordem);    
    connection.query(sql, /* [ano, mes], <- Posso passar os parâmetros aqui para dentro da query, mas, neste caso, pela função que criei, a query já vem preenchida */ 
    (err, result, fields) => {
      if(err){
        res.status(500).json(err);
      } else {
        res.status(200).json(result);
      }
    })
  }

  geraUmContrachequePdf(params, res){    
    const ano = params.ano;
    const mes = params.mes;
    const nordem = params.nordem;
    const sql = Sql.selectUmContracheque(ano, mes, nordem);
    GeraPdfModel.montaUmContrachequePdf(sql, res);
  }
}

module.exports = new ContrachequeModel;