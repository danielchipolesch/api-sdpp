const connection = require('../infra/conn');
const GeraPdfModel = require('./GeraPdfModel');
const Sql = require('../middlewares/query')

class ContrachequeModel {

  getContracheques(params, res){
    for (i = anoInicio; anoInicio <= i <= anoFim; i++){
      for (j = mesInicio; mesInicio <= j <= mesFim; j++){
        const sql = Sql.selectVariosContracheques(params);        
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
    const sql = Sql.selectUmContracheque(params);
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
    const sql = Sql.selectUmContracheque(params);
    GeraPdfModel.montaUmContrachequePdf(sql, res);
  }
}

module.exports = new ContrachequeModel;