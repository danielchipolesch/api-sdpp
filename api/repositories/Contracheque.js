const query = require('../infra/queries');

class Contracheque {
  findOne(params) {
    const {ano, mes, nordem} = params;
    const sql = `SELECT p.tipo, p.posto, p.nordem, p.status, p.digito, p.ompag, p.nomeom AS nm_ompag, p.subom, p.dt, p.nposto, p.esp, p.nome AS nm_pessoa, p.ref, p.id, p.cpf, p.banco, p.agencia, p.cc, p.receita, p.despesa, p.liquido, p.anuenio, p.pasep, p.depir, p.depsf, p.quota, p.pm, p.funsa, p.isir, p.margem, c.discr, c.ordcx, c.caixa, c.perc, c.rec, c.desp, c.prazo, c.ir, u.codtabela, u.autonomia, u.filler1, u.nome AS nm_subom, u.sigla AS nm_sigla_subom, u.localidade, u.filler2 FROM contracheque_${ano}.${mes}_pessoais p INNER JOIN contracheque_${ano}.${mes}_caixas c ON p.nordem=c.nordem INNER JOIN contracheque_${ano}.${mes}_unidades u ON p.subom=u.unidade WHERE p.nordem=${nordem}`;

    return query(sql, params);
  }
}

module.exports = new Contracheque;