const connection = require('../infra/conn');
const pdfDocument = require('pdfkit');
var PdfPrinter = require('pdfmake');

class GeraPdfModel {

  montaUmContrachequePdf(sql, res){    
    connection.query(sql, (err, result, fields) => {
      if (err) {
        res.status(500).json(err);
      } else {                
        const nordem = result[0].nordem;
        const df = result[0].digito;
        const cpf = result[0].cpf;
        const ompag = result[0].ompag;
        const nm_ompag = result[0].nm_ompag;
        const subom = result[0].subom;
        const nome_subom = result[0].nm_sigla_subom;
        const competencia = result[0].dt;
        const nposto = result[0].nposto;
        const esp = result[0].esp;
        const nm_pessoa = result[0].nm_pessoa;
        const ref = result[0].ref;
        const id = result[0].id;
        const banco = result[0].banco;
        const agencia = result[0].agencia;
        const conta = result[0].cc;
        const receita = result[0].receita;
        const despesa = result[0].despesa;
        const liquido = result[0].liquido;
        const anuenio = result[0].anuenio;
        const pasep = result[0].pasep;
        const dep_ir = result[0].depir;
        const dep_sf = result[0].depsf;
        const cota = result[0].quota;
        const pm = result[0].pm;
        const funsa = result[0].funsa;
        const isir = result[0].isir;
        const status = result[0].status;

        var dado = [
          [ 
            { text : 'DESCRIÇÃO', alignment : 'center', border: [true, false, true, false]},
            { text : 'ORD', alignment : 'center', border: [true, false, true, false]},
            { text : 'CAIXA', alignment : 'center', border: [true, false, true, false]},
            { text : '%', alignment : 'center', border: [true, false, true, false]},
            { text : 'RECEITA', alignment : 'center', border: [true, false, true, false]},
            { text : 'DESPESA', alignment : 'center', border: [true, false, true, false]},
            { text : 'PRAZO', alignment : 'center', border: [true, false, true, false]},
            { text : 'IR', alignment : 'center', border: [true, false, true, false]},
          ],
        ]
        result.forEach((result) => {
          var dadoRow = [];
          dadoRow.push(
            { text : result.discr, alignment : 'left', border: [true, false, true, false]},
            { text : result.ordcx, alignment : 'center', border: [true, false, true, false]},
            { text : result.caixa, alignment : 'center', border: [true, false, true, false]},
            { text : result.perc, alignment : 'center', border: [true, false, true, false]},
            { text : result.rec, alignment : 'right', color: 'blue', border: [true, false, true, false]},
            { text : result.desp, alignment : 'right', color: 'red', border: [true, false, true, false]},
            { text : result.prazo, alignment : 'center', border: [true, false, true, false]},
            { text : result.ir, alignment : 'center', border: [true, false, true, false]}
          );
          dado.push(dadoRow);
        })
        
        var fonts = {
          Times: {
            normal: 'Times-Roman',
            bold: 'Times-Bold',
            italics: 'Times-Italic',
            bolditalics: 'Times-BoldItalic'
          }
        };        
        
        var printer = new PdfPrinter(fonts);        
        
        var docDefinition = {
          info: {
            title: `SARAM ${nordem}-${df}`,
            author: '1º Ten Int CHIPOLESCH',
            subject: 'Gerador de contracheques da FAB em formato PDF',           
            },
          watermark:  { text: cpf, color: 'black', opacity: 0.05, bold: true, italics: false },
          background: 'simple text',
          header: function(currentPage, pageCount, pageSize) {
            // you can apply any logic and return any valid pdfmake element

            return [
              { text: 'simple text', alignment: (currentPage % 2) ? 'left' : 'right' },
              { canvas: [ { type: 'rect', x: 170, y: 32, w: pageSize.width - 170, h: 40 } ] }
            ]
          },
          footer: {
            columns: [
              { text: 'Left part', alignment: 'left' },
              { text: 'center part', alignment: 'center' },
              { text: 'Right part', alignment: 'right' },
              // { (currentPage, pageCount) => { return currentPage.toString() + ' of ' + pageCount; } }
            ]
          },
          content: [
            { layout: 'noBorders',
              table:
              {                
                headerRows: 1,
                widths: [ 'auto', '*', 'auto'],
                body: [
                  [ 
                    { image: 'api/src/img/DOM-SEFA.png', alignment: 'center', width: 49.58, height: 60 },
                    { image: 'api/src/img/gladio.png', alignment: 'center', width: 82.19, height: 60 },
                    { image: 'api/src/img/DOM-DIRAD.png', alignment: 'center', width: 49.58, height: 60 },
                  ],
                ]
              }, 
            },
            
            { text: 'MINISTÉRIO DA DEFESA', bold : true, alignment : 'center', lineHeight: 1.1},
            { text: 'COMANDO DA AERONÁUTICA', alignment : 'center', lineHeight: 1.1},
            { text: 'SECRETARIA DE ECONOMIA, FINANÇAS E ADMINISTRAÇÃO DA AERONÁUTICA', decoration : 'underline', alignment : 'center', lineHeight: 1.3},
            { text: 'DIRETORIA DE ADMINISTRAÇÃO DA AERONÁUTICA', decoration : 'underline', alignment : 'center', lineHeight: 1.3},
            { text: 'SUBDIRETORIA DE PAGAMENTO DE PESSOAL\n\n', decoration : 'underline', alignment : 'center', lineHeight: 1.3},
            // { text: 'google', link: 'http://google.com' },
            { 
              table: 
              {
                // headers are automatically repeated if the table spans over multiple pages
                // you can declare how many rows should be treated as headers
                headerRows: 1,
                widths: [ 'auto', '*', '*', 'auto', 'auto', 'auto', 'auto' ],
                body: [
                  [ 
                    { text : 'MATRÍCULA', alignment : 'center', colSpan : 2, border: [true, true, true, false]},
                    { text : '', alignment : 'center', border: [true, true, true, false]},
                    { text : 'CÓD UPAG', alignment : 'center', border: [true, true, true, false]},
                    { text : 'UPAG', alignment : 'center', border: [true, true, true, false]},                    
                    { text : 'CÓD APOIADA', alignment : 'center', border: [true, true, true, false]},
                    { text : 'APOIADA', alignment : 'center', border: [true, true, true, false]},
                    { text : 'COMPETÊNCIA', alignment : 'center', border: [true, true, true, false]},
                  ],
                  [ 
                    { text : `${nordem}-${df}`, alignment : 'center', colSpan : 2, border: [true, false, true, true]},
                    { text : '', alignment : 'center', border: [true, false, true, true]},
                    { text : ompag, alignment : 'center', border: [true, false, true, true]},
                    { text : nm_ompag, alignment : 'center', border: [true, false, true, true]},                    
                    { text : subom, alignment : 'center', border: [true, false, true, true]},
                    { text : nome_subom, alignment : 'center', border: [true, false, true, true]},
                    { text : competencia, alignment : 'center', border: [true, false, true, true]},                   
                  ],
                  [ 
                    { text : 'P/G', alignment : 'center', border: [true, false, true, false]},
                    { text : 'NOME', alignment : 'center', colSpan: 3, border: [true, false, true, false]},
                    { text : '', alignment : 'center', border: [true, false, true, false]},
                    { text : '', alignment : 'center', border: [true, false, true, false]},
                    { text : 'POSTO PG', alignment : 'center', border: [true, false, true, false]},
                    { text : 'ID MIL', alignment : 'center', border: [true, false, true, false]},
                    { text : 'CPF', alignment : 'center', border: [true, false, true, false]},
                  ],
                  [ 
                    { text : `${nposto} ${esp}`, alignment : 'center', border: [true, false, true, true]},
                    { text : nm_pessoa, alignment : 'center', colSpan: 3, border: [true, false, true, true]},
                    { text : '', alignment : 'center', border: [true, false, true, false]},
                    { text : '', alignment : 'center', border: [true, false, true, false]},
                    { text : ref, alignment : 'center', border: [true, false, true, true]},
                    { text : id, alignment : 'center', border: [true, false, true, true]},
                    { text : cpf, alignment : 'center', border: [true, false, true, true]},                   
                  ],
                ]
              },
              layout: {
                hLineColor: (i, node) => {
                  return (i === 0 || i === node.table.body.length) ? 'black' : 'black';
                },
                vLineColor: (i, node) => {
                  return (i === 0 || i === node.table.widths.length) ? 'black' : 'black';
                },
                fillColor: (rowIndex, node, columnIndex) => {
                  return (rowIndex % 2 === 0) ? '#CCCCCC' : null;
                }
              },
            },            
            {   
              table: 
              {  
                headerRows: 1,
                widths: [ 156, 'auto', 'auto', 'auto', '*', '*', '*', 'auto'],
                body: dado,
              },
              layout: {
                hLineColor: (i, node) => {
                  return (i === 0 || i === node.table.body.length) ? 'black' : 'black';
                },
                vLineColor: (i, node) => {
                  return (i === 0 || i === node.table.widths.length) ? 'black' : 'black';
                },
                fillColor: (rowIndex, node, columnIndex) => {
                  return (rowIndex === 0) ? '#CCCCCC' : null;
                }
              },
            },
            { 
              table: 
              {  
                headerRows: 1,
                widths: [ 'auto', 'auto', 'auto', 'auto', '*', '*'],
                body: [
                  [ 
                    { text : 'BANCO', alignment : 'center', border: [true, true, true, false]},
                    { text : 'AGÊNCIA', alignment : 'center', border: [true, true, true, false]},
                    { text : 'CONTA CORRENTE', alignment : 'center', border: [true, true, true, false]},
                    { text : 'RECEITA (R$)', alignment : 'center', border: [true, true, true, false]},
                    { text : 'DESPESA (R$)', alignment : 'center', border: [true, true, true, false]},
                    { text : 'LÍQUIDO (R$)', alignment : 'center', border: [true, true, true, false]}, 
                  ],
                  [ 
                    { text : banco, alignment : 'center', border: [true, false, true, true]},
                    { text : agencia, alignment : 'center', border: [true, false, true, true]},
                    { text : conta, alignment : 'center', border: [true, false, true, true]},
                    { text : receita, alignment : 'center', border: [true, false, true, true]},
                    { text : despesa, alignment : 'center', border: [true, false, true, true]},
                    { text : liquido, alignment : 'center', border: [true, false, true, true]}, 
                  ]
                ]
              },
              layout: {
                hLineColor: (i, node) => {
                  return (i === 0 || i === node.table.body.length) ? 'black' : 'black';
                },
                vLineColor: (i, node) => {
                  return (i === 0 || i === node.table.widths.length) ? 'black' : 'black';
                },
                fillColor: (rowIndex, node, columnIndex) => {
                  return (rowIndex === 0) ? '#CCCCCC' : null;
                }
              },
            },
            { 
              table: 
              {  
                headerRows: 1,
                widths: [ 'auto', 'auto', '*', '*', '*', '*', 'auto', 'auto', 'auto'],
                body: [
                  [ 
                    { text : 'ANUÊNIO', alignment : 'center', border: [true, false, true, false]},
                    { text : 'PASEP', alignment : 'center', border: [true, false, true, false]},
                    { text : 'Nº DP IR', alignment : 'center', border: [true, false, true, false]},
                    { text : 'DESC PM (%)', alignment : 'center', border: [true, false, true, false]},
                    { text : 'COTA', alignment : 'center', border: [true, false, true, false]},
                    { text : 'P/G PM', alignment : 'center', border: [true, false, true, false]},
                    { text : 'P/G FUNSA', alignment : 'center', border: [true, false, true, false]},
                    { text : 'ISENÇÃO IR', alignment : 'center', border: [true, false, true, false]},
                    { text : 'STATUS', alignment : 'center', border: [true, false, true, false]}, 
                  ],
                  [ 
                    { text : anuenio, alignment : 'center', border: [true, false, true, true]},
                    { text : pasep, alignment : 'center', border: [true, false, true, true]},
                    { text : dep_ir, alignment : 'center', border: [true, false, true, true]},
                    { text : dep_sf, alignment : 'center', border: [true, false, true, true]},
                    { text : cota, alignment : 'center', border: [true, false, true, true]},
                    { text : pm, alignment : 'center', border: [true, false, true, true]},
                    { text : funsa, alignment : 'center', border: [true, false, true, true]},
                    { text : isir, alignment : 'center', border: [true, false, true, true]},
                    { text : status, alignment : 'center', border: [true, false, true, true]}, 
                  ]
                ]
              },
              layout: {
                hLineColor: (i, node) => {
                  return (i === 0 || i === node.table.body.length) ? 'black' : 'black';
                },
                vLineColor: (i, node) => {
                  return (i === 0 || i === node.table.widths.length) ? 'black' : 'black';
                },
                fillColor: (rowIndex, node, columnIndex) => {
                  return (rowIndex === 0) ? '#CCCCCC' : null;
                }
              },
            },
            { qr: 'text in QR', fit: '50', alignment: 'right' }
          ],          
          defaultStyle: {
            font: 'Times'
          }
        };
        
        var options = {
          // ...
        }
        
        var pdfDoc = printer.createPdfKitDocument(docDefinition, options);
        pdfDoc.pipe(res);
        pdfDoc.end();
      }
    })
  }
}

module.exports = new GeraPdfModel;