const conn = require('../infra/conn');

class ContrachequeModel {

  buscaContracheque(nordem, mes) {
    const sql = `SELECT * FROM ${mes}_caixas c INNER JOIN ${mes}_pessoais p ON p.nordem=c.nordem INNER JOIN ${mes}_unidades u ON p.subom=u.unidade WHERE p.nordem=${nordem}`;
    conn.query(sql, (error, result) => {
      if(error){
        return error
        // res.status(400).json(error);
      } else {
        return result
        // res.status(200).json(result);
      }
    })
  }
}

module.exports = new ContrachequeModel;