class Query{
  selectVariosContracheques(anoInicio, mesInicio, anoFim, mesFim, nordem){
    return `SELECT * FROM ${mes}_pessoais p INNER JOIN ${mes}_caixas c ON p.nordem=c.nordem INNER JOIN ${mes}_unidades u ON p.subom=u.unidade WHERE p.nordem=${nordem}`;
  }

  selectUmContracheque(ano, mes, nordem){
    return `SELECT p.tipo, p.posto, p.nordem, p.status, p.digito, p.ompag, p.nomeom AS nm_ompag, p.subom, p.dt, p.nposto, p.esp, p.nome AS nm_pessoa, p.ref, p.id, p.cpf, p.banco, p.agencia, p.cc, p.receita, p.despesa, p.liquido, p.anuenio, p.pasep, p.depir, p.depsf, p.quota, p.pm, p.funsa, p.isir, p.margem, c.discr, c.ordcx, c.caixa, c.perc, c.rec, c.desp, c.prazo, c.ir, u.codtabela, u.autonomia, u.filler1, u.nome AS nm_subom, u.sigla AS nm_sigla_subom, u.localidade, u.filler2 FROM ${mes}_pessoais p INNER JOIN ${mes}_caixas c ON p.nordem=c.nordem INNER JOIN ${mes}_unidades u ON p.subom=u.unidade WHERE p.nordem=${nordem};`
    // return `SELECT * FROM ${mes}_pessoais p INNER JOIN ${mes}_caixas c ON p.nordem=c.nordem INNER JOIN ${mes}_unidades u ON p.subom=u.unidade WHERE p.nordem=${nordem}`;    
  }
}

module.exports = new Query;