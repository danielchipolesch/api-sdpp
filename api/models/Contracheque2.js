const moment = require('moment');
const Repository = require('../repositories/Contracheque')
const pdf = require('html-pdf');
// const fs = require('fs');


class ContrachequeModel {
  
    
  async findOne(params){
    const result = await Repository.findOneContrachequeForOnePersonPerMonth(params);
    return result;
  }

  async findAll(params){
    const result = await Repository.findAllContrachequesForOnePersonByYear(params);
    return result;
  }

  montaContrachequePdf(result, res){
    const {nordem, digito, cpf, ompag, nm_ompag, subom, nm_sigla_subom, dt, nposto, esp, nm_pessoa, ref, id, banco, agencia, cc, receita, despesa, liquido, anuenio, pasep, depir, depsf, quota, pm, funsa, isir, status} = result[0];
    
    var html = `
    <head>
      <style type="text/css">
        body {
          font-family: 'Times New Roman', Times, serif;
          font-size: 14px;        
        }      
        table{  
          width: 90%;
          border: 1px solid black;
          margin-left: auto;
          margin-right: auto;
        }
        .table-head{
          background-color: #CCCCCC;
          font-size:small;  
        }
        div{
          text-align: center;
        }
        th, td{
          border: 1px solid black;
        }
        .blue{
          color: blue;
        }
        .red{
          color: red;
        }
      </style>
    </head>
    <body>
      <div style="padding-bottom: 1cm;">
        <table style="border: none; margin-top: 2cm; padding-top: 1cm;">
          <tbody>
            <tr>
              <td align="left" style="border: none;">
                <img src="../src/img/DOM-SEFA.png" alt="" style="width: 49.58px; height: 60px">
              </td>
              <td align="center" style="border: none;">
                <img src="../src/img/gladio.png" alt="" style="width: 82.19px; height: 60px;">
              </td>
              <td align="right" style="border: none;">
                <img src="../src/img/DOM-DIRAD.png" alt="" style="width: 49.58px; height: 60px;">
              </td>
            </tr>        
          </tbody>
        </table>
        <div>
          <div style="margin-top: 5px; font-weight: 800;">MINISTÉRIO DA DEFESA</div>
          <div>COMANDO DA AERONÁUTICA</div>
          <div style="text-decoration: underline">SECRETARIA DE ECONOMIA, FINANÇAS E ADMINISTRAÇÃO DA AERONÁUTICA</div>
          <div style="text-decoration: underline">DIRETORIA DE ADMINISTRAÇÃO DA AERONÁUTICA</div>
          <div style="margin-bottom: 5px; text-decoration: underline">SUBDIRETORIA DE PAGAMENTO DE PESSOAL</div>
        </div>
        <table>
          <tbody>
            <tr>
              <td id="matricula">
                <div class="table-head">MATRÍCULA</div>
                <div>123456-7</div>
              </td>
              <td id="upag" colspan="3">
                <div class="table-head">UPAG</div>
                <div>060749 - BAAF</div>
              </td>
              <td id="apoiada" colspan="3">
                <div class="table-head">APOIADA</div>
                <div>060726 - DIRAD</div>
              </td>
              <td id="competencia" colspan="3">
                <div class="table-head">COMPETÊNCIA</div>
                <div>OUT21</div>
              </td>          
            </tr>
            <tr>
              <td id="pg">
                <div class="table-head">P/G</div>
                <div>1T INT</div>
              </td>
              <td id="nome" colspan="4">
                <div class="table-head">NOME</div>
                <div>FULANO DE TAL DE SOUZA</div>
              </td>
              <td id="ptpag">
                <div class="table-head">PT PAG</div>
                <div>00</div>
              </td>
              <td id="idmil" colspan="2">
                <div class="table-head">ID MIL</div>
                <div>0000555555</div>
              </td>
              <td id="cpf" colspan="2">
                <div class="table-head">CPF</div>
                <div>12345678901</div>
              </td>          
            </tr>
            <tr>
              <td colspan="2">
                <div class="table-head">DESCRIÇÃO</div>
                <div style="text-align: left;">SOLDO ATV</div>
                <div style="text-align: left;">ADC HAB ATV</div>
                <div style="text-align: left;">ADC MIL ATV</div>
                <div style="text-align: left;">ADC DISP MIL ATV</div>
                <div style="text-align: left;">FAMHS</div>
                <div style="text-align: left;">PENSAO MILITAR</div>
                <div style="text-align: left;">I RENDA DESC</div>
              </td>
              <td>
                <div class="table-head">ORD</div>
                <div style="color: white;">00</div>
                <div style="color: white;">00</div>
                <div style="color: white;">00</div>
                <div>01</div>
                <div>02</div>
                <div>03</div>
                <div>04</div>
              </td>
              <td>
                <div class="table-head">CAIXA</div>
                <div>A02</div>
                <div>B08</div>
                <div>B16</div>
                <div>B05</div>
                <div>L30</div>
                <div>M02</div>
                <div style="color: white;">00</div>
              </td>
              <td>
                <div class="table-head">%</div>
                <div>100</div>
                <div>19</div>
                <div>19</div>
                <div>6</div>
                <div>*</div>
                <div>*</div>
                <div>*</div>
              </td>
              <td>
                <div class="table-head">RECEITA</div>
                <div style="text-align: right; color: blue;">8.245,00</div>
                <div style="text-align: right; color: blue;">1.566,55</div>
                <div style="text-align: right; color: blue;">1.566,55</div>
                <div style="text-align: right; color: blue;">494,70</div>
                <div style="color: white;">0</div>
                <div style="color: white;">0</div>
                <div style="color: white;">0</div>
              </td>
              <td colspan="2">
                <div class="table-head">DESPESA</div>
                <div style="color: white;">0</div>
                <div style="color: white;">0</div>
                <div style="color: white;">0</div>
                <div style="color: white;">0</div>
                <div style="text-align: right; color: red;">154,34</div>
                <div style="text-align: right; color: red;">1.246,64</div>
                <div style="text-align: right; color: red;">2.010,39</div>
              </td>
              <td>
                <div class="table-head">PRAZO</div>
                <div style="color: white;">0</div>
                <div style="color: white;">0</div>
                <div style="color: white;">0</div>
                <div style="color: white;">0</div>
                <div style="color: white;">0</div>
                <div style="color: white;">0</div>
                <div>10/21</div>
              </td>
              <td colspan="2">
                <div class="table-head">IR</div>
                <div>+</div>
                <div>+</div>
                <div>+</div>
                <div>+</div>
                <div>-</div>
                <div>-</div>           
                <div style="color: white;">0</div>            
              </td>
            </tr> 
            <tr>
              <td>
                <div class="table-head">BANCO</div>
                <div>033</div>
              </td>
              <td>
                <div class="table-head">AGÊNCIA</div>
                <div>04444</div>
              </td>
              <td colspan="3">
                <div class="table-head">CONTA</div>
                <div>10203040</div>
              </td>
              <td>
                <div class="table-head">RECEITA (R$)</div>
                <div class="blue">****11.872</div>
              </td>
              <td colspan="2">
                <div class="table-head">DESPESA (R$)</div>
                <div class="red">*****3.411,37</div>
              </td>
              <td colspan="2">
                <div class="table-head">LÍQUIDO (R$)</div>
                <div style="font-weight: 800;">*****8.461,43</div>
              </td>
            </tr>
            <tr>
              <td>
                <div class="table-head">ANUÊNIO</div>
                <div>JANEIRO</div>
              </td>
              <td>
                <div class="table-head">PASEP</div>
                <div>98765432112</div>
              </td>
              <td>
                <div class="table-head">N° DP IR</div>
                <div>0</div>
              </td>
              <td>
                <div class="table-head">% PM</div>
                <div>10,5</div>
              </td>
              <td>
                <div class="table-head">COTA</div>
                <div>0</div>
              </td>
              <td>
                <div class="table-head">P/G PM</div>
                <div>1T</div>
              </td>
              <td>
                <div class="table-head">P/G FUNSA</div>
                <div>1T</div>
              </td>
              <td colspan="2">
                <div class="table-head">ISENTO IR</div>
                <div>0</div>
              </td>
              <td>
                <div class="table-head">SIT</div>
                <div>A</div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </body>`;

  pdf.create(html).toStream(function(err, stream) {
    if (err) {
        console.log(err)
    } else {
        res.set('Content-type', 'application/pdf');
        stream.pipe(res)
    }
  });

  }
}

module.exports = new ContrachequeModel;