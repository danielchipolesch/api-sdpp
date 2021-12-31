const query = require('../infra/queries');

class Contracheque {
  // async findOneContrachequeForOnePersonPerMonth(params) {
  //   const {ano, mes, nordem} = params;
  //   const sql = `SELECT p.tipo, p.posto, p.nordem, p.status, p.digito, p.ompag, p.nomeom AS nm_ompag, p.subom, p.dt, p.nposto, p.esp, p.nome AS nm_pessoa, p.ref, p.id, p.cpf, p.banco, p.agencia, p.cc, p.receita, p.despesa, p.liquido, p.anuenio, p.pasep, p.depir, p.depsf, p.quota, p.pm, p.funsa, p.isir, p.margem, c.discr, c.ordcx, c.caixa, c.perc, c.rec, c.desp, c.prazo, c.ir, u.codtabela, u.autonomia, u.filler1, u.nome AS nm_subom, u.sigla AS nm_sigla_subom, u.localidade, u.filler2 FROM contracheque_${ano}.${mes}_pessoais p INNER JOIN contracheque_${ano}.${mes}_caixas c ON p.nordem=c.nordem INNER JOIN contracheque_${ano}.${mes}_unidades u ON p.subom=u.unidade WHERE p.nordem=${nordem}`;

  //   return await query(sql, params);
  // }

  async findOneContrachequeForOnePersonPerMonth(params) {
    const {ano, mes, nordem} = params;
    const sql = `SELECT p.tipo, p.posto, p.nordem, p.status, p.digito, p.ompag, p.nomeom AS nm_ompag, p.subom, p.dt, p.nposto, p.esp, p.nome AS nm_pessoa, p.ref, p.id, p.cpf, p.banco, p.agencia, p.cc, p.receita, p.despesa, p.liquido, p.anuenio, p.pasep, p.depir, p.depsf, p.quota, p.pm, p.funsa, p.isir, p.margem, u.codtabela, u.autonomia, u.filler1, u.nome AS nm_subom, u.sigla AS nm_sigla_subom, u.localidade, u.filler2 FROM contracheque_${ano}.${mes}_pessoais p INNER JOIN contracheque_${ano}.${mes}_unidades u ON p.subom=u.unidade WHERE p.nordem=${nordem}`;

    const sql2 = `SELECT * FROM contracheque_${ano}.${mes}_caixas WHERE nordem=${nordem}`;

    let consulta1 = await query(sql, params);
    let consulta2 = await query(sql2, params);

    return {"pessoa" : consulta1, "contracheque": consulta2};
  }

  async findAllContrachequesForOnePersonByYear(params) {
    const {ano, nordem} = params;
    const meses = ['jan', 'fev', 'mar', 'abr', 'mai', 'jun', 'jul', 'ago', 'set', 'out', 'nov', 'dez'];
        
    async function constructArray(ano, meses, nordem) {
      let dado = [];

      const promises = meses.map(async mes => {

        const sql1 = `SELECT p.tipo, p.posto, p.nordem, p.status, p.digito, p.ompag, p.nomeom AS nm_ompag, p.subom, p.dt, p.nposto, p.esp, p.nome AS nm_pessoa, p.ref, p.id, p.cpf, p.banco, p.agencia, p.cc, p.receita, p.despesa, p.liquido, p.anuenio, p.pasep, p.depir, p.depsf, p.quota, p.pm, p.funsa, p.isir, p.margem, u.codtabela, u.autonomia, u.filler1, u.nome AS nm_subom, u.sigla AS nm_sigla_subom, u.localidade, u.filler2 FROM contracheque_${ano}.${mes}_pessoais p INNER JOIN contracheque_${ano}.${mes}_unidades u ON p.subom=u.unidade WHERE p.nordem=${nordem}`;

        const sql2 = `SELECT * FROM contracheque_${ano}.${mes}_caixas WHERE nordem=${nordem}`;

        let consulta1 = await query(sql1, params);
        let consulta2 = await query(sql2, params);
        
        dado.push({"pessoa" : consulta1, "contracheque" : consulta2});
      });

      await Promise.all(promises);
      return dado;
    }    

    return await constructArray(ano, meses, nordem);
  }
}

module.exports = new Contracheque;