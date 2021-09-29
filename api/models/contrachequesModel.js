const connection = require('../infra/conn');

class ContrachequeModel {

  getContracheques(anoInicio, mesInicio, anoFim, mesFim, nordem, res){
    for (i = anoInicio; anoInicio <= i <= anoFim; i++){
      for (j = mesInicio; mesInicio <= j <= mesFim; j++){
        const sql = `SELECT * FROM ${mes}_pessoais p INNER JOIN ${mes}_caixas c ON p.nordem=c.nordem INNER JOIN ${mes}_unidades u ON p.subom=u.unidade WHERE p.nordem=${nordem}`;
        connection.query(sql, [i, j], (err, result, fields) => {
          if(err){
            return res.status(500).json(err);
          } else {
            return res.status(200).json(result);
          }
        })
      }      
    }    
  }
  
  getUmContracheque(ano, mes, nordem, res) {    
    const sql = `SELECT * FROM ${mes}_pessoais p INNER JOIN ${mes}_caixas c ON p.nordem=c.nordem INNER JOIN ${mes}_unidades u ON p.subom=u.unidade WHERE p.nordem=${nordem}`;
    connection.query(sql, [ano, mes], (err, result, fields) => {
      if(err){
        return res.status(500).json(err);
      } else {
        return res.status(200).json(result);
      }
    })
  }
}

module.exports = new ContrachequeModel;