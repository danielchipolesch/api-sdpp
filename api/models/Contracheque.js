const PdfPrinter = require('pdfmake');
const moment = require('moment');
const Repository = require('../repositories/Contracheque')


class ContrachequeModel {
  
  async findOne(params){
    const result = await Repository.findOne(params);
    return (result);
  }

  montaContrachequePdf(result, res){
    const {nordem, digito, cpf, ompag, nm_ompag, subom, nm_sigla_subom, dt, nposto, esp, nm_pessoa, ref, id, banco, agencia, cc, receita, despesa, liquido, anuenio, pasep, depir, depsf, quota, pm, funsa, isir, status} = result[0];
                        
    var dado = [
      [ 
        { text : 'MATRÍCULA', style: 'header', border: [true, true, true, false]},
        { text : 'UPAG', colSpan: 3, style: 'header', border: [true, true, true, false]},
        { text : '', style: 'header', border: [true, true, true, false]},
        { text : '', style: 'header', border: [true, true, true, false]},
        { text : 'APOIADA', colSpan: 3, style: 'header', border: [true, true, true, false]},
        { text : '', style: 'header', border: [true, true, true, false]},
        { text : '', style: 'header', border: [true, true, true, false]},
        { text : 'COMPETÊNCIA', colSpan: 3, style: 'header', border: [true, true, true, false]},
        { text : '', style: 'header', border: [true, true, true, false]},
        { text : '', style: 'header', border: [true, true, true, false]}
      ],
      [ 
        { text : `${nordem}-${digito}`, alignment : 'center', border: [true, false, true, false]},
        { text : `${ompag} - ${nm_ompag}`, colSpan: 3, alignment : 'center', border: [true, false, true, false]},
        { text : '', alignment : 'center', border: [true, false, true, false]},
        { text : '', alignment : 'center', border: [true, false, true, false]},
        { text : `${subom} - ${nm_sigla_subom}`, colSpan: 3, alignment : 'center', border: [true, false, true, false]},
        { text : '', style: 'header', border: [true, true, true, false]},             
        { text : '', alignment : 'center', border: [true, false, true, false]},
        { text : dt, colSpan: 3, alignment : 'center', border: [true, false, true, false]},
        { text : '', alignment : 'center', border: [true, false, true, false]},
        { text : '', border: [true, true, true, false]},
      ],
      [ 
        { text : 'P/G', style: 'header', border: [true, true, true, false]},
        { text : 'NOME', style: 'header', colSpan: 4, border: [true, true, true, false]},
        { text : '', style: 'header', border: [true, true, true, false]},
        { text : '', style: 'header', border: [true, true, true, false]},
        { text : '', style: 'header', border: [true, true, true, false]},
        { text : 'PT PAG', style: 'header', border: [true, true, true, false]},
        { text : 'ID MIL', colSpan: 2, style: 'header', border: [true, true, true, false]},
        { text : '', style: 'header', border: [true, true, true, false]},
        { text : 'CPF', colSpan: 2, style: 'header', border: [true, true, true, false]},
        { text : '', style: 'header', border: [true, true, true, false]},
      ],
      [ 
        { text : `${nposto} ${esp}`, alignment : 'center', border: [true, false, true, true]},
        { text : nm_pessoa, alignment : 'center', colSpan: 4, border: [true, false, true, true]},
        { text : '', alignment : 'center', border: [true, false, true, false]},
        { text : '', alignment : 'center', border: [true, false, true, false]},
        { text : '', alignment : 'center', border: [true, false, true, false]},
        { text : ref, alignment : 'center', border: [true, false, true, true]},
        { text : id, colSpan: 2, alignment : 'center', border: [true, false, true, true]},
        { text : '', style: 'header', border: [true, true, true, false]},
        { text : cpf, colSpan: 2, alignment : 'center', border: [true, false, true, true]},  
        { text : '', style: 'header', border: [true, true, true, false]},                            
      ],
      [ 
        { text : 'DESCRIÇÃO', colSpan: 2, style: 'header', border: [true, false, true, false]},
        { text : '', style: 'header', border: [true, true, true, false]},
        { text : 'ORD', style: 'header', border: [true, false, true, false]},
        { text : 'CAIXA', style: 'header', border: [true, false, true, false]},
        { text : '%', style: 'header', border: [true, false, true, false]},
        { text : 'RECEITA', style: 'header', border: [true, false, true, false]},
        { text : 'DESPESA', colSpan: 2, style: 'header', border: [true, false, true, false]},
        { text : '', style: 'header', border: [true, true, true, false]},
        { text : 'PRAZO', style: 'header', border: [true, false, true, false]},
        { text : 'IR', style: 'header', border: [true, false, true, false]},
      ]
    ]
    result.forEach((result) => {
      var dadoRow = [];
      dadoRow.push(
        { text : result.discr, colSpan: 2, alignment : 'left', border: [true, false, true, false]},
        { text : '', style: 'header', border: [true, true, true, false]},
        { text : result.ordcx, alignment : 'center', border: [true, false, true, false]},
        { text : result.caixa, alignment : 'center', border: [true, false, true, false]},
        { text : result.perc, alignment : 'center', border: [true, false, true, false]},
        { text : result.rec, alignment : 'right', color: 'blue', border: [true, false, true, false]},
        { text : result.desp, colSpan: 2, alignment : 'right', color: 'red', border: [true, false, true, false]},
        { text : '', style: 'header', border: [true, true, true, false]},
        { text : result.prazo, alignment : 'center', border: [true, false, true, false]},
        { text : result.ir, alignment : 'center', border: [true, false, true, false]}
      );
      dado.push(dadoRow);
    })
    var restante =
      [ 
        { text : 'BANCO', style: 'header', border: [true, true, true, false]},
        { text : 'AGÊNCIA', style: 'header', border: [true, true, true, false]},
        { text : 'CONTA', colSpan: 3, style: 'header', border: [true, true, true, false]},
        { text : '', style: 'header', border: [true, true, true, false]},
        { text : '', style: 'header', border: [true, true, true, false]},
        { text : 'RECEITA (R$)', style: 'header', border: [true, true, true, false]},
        { text : 'DESPESA (R$)', colSpan: 2, style: 'header', border: [true, true, true, false]},
        { text : '', style: 'header', border: [true, true, true, false]},
        { text : 'LÍQUIDO (R$)', colSpan: 2, style: 'header', border: [true, true, true, false]},
        { text : '', style: 'header', border: [true, true, true, false]},
      ];
      
      var restante2 =
      [ 
        { text : banco, alignment : 'center', border: [true, false, true, true]},
        { text : agencia, alignment : 'center', border: [true, false, true, true]},
        { text : cc, colSpan: 3, alignment : 'center', border: [true, false, true, true]},
        { text : '', border: [true, true, true, false]},
        { text : '', border: [true, true, true, false]},
        { text : receita, color: 'blue',alignment : 'center', border: [true, false, true, true]},
        { text : despesa, colSpan: 2, color: 'red', alignment : 'center', border: [true, false, true, true]},
        { text : '', border: [true, true, true, false]},
        { text : liquido, colSpan: 2, alignment : 'center', bold:true, border: [true, false, true, true]},
        { text : '', border: [true, true, true, false]},
      ];

      var restante3 =
      [ 
        { text : 'ANUÊNIO', style: 'header', border: [true, false, true, false]},
        { text : 'PASEP', style: 'header', border: [true, false, true, false]},
        { text : 'Nº DP IR', style: 'header', border: [true, false, true, false]},
        { text : '% PM', style: 'header', border: [true, false, true, false]},
        { text : 'COTA', style: 'header', border: [true, false, true, false]},
        { text : 'P/G PM', style: 'header', border: [true, false, true, false]},
        { text : 'P/G FUNSA', style: 'header', border: [true, false, true, false]},
        { text : 'ISENTO IR', colSpan: 2, style: 'header', border: [true, false, true, false]},
        { text : '', style: 'header', border: [true, false, true, false]},
        { text : 'SIT', style: 'header', border: [true, false, true, false]},        
      ];

      var restante4 =
      [ 
        { text : anuenio, style: 'lines', border: [true, false, true, true]},
        { text : pasep, style: 'lines', border: [true, false, true, true]},
        { text : depir, style: 'lines', border: [true, false, true, true]},
        { text : depsf, style: 'lines', border: [true, false, true, true]},
        { text : quota, style: 'lines', border: [true, false, true, true]},
        { text : pm, style: 'lines', border: [true, false, true, true]},
        { text : funsa, style: 'lines', border: [true, false, true, true]},
        { text : isir, colSpan: 2, style: 'lines', border: [true, false, true, true]},
        { text : '', style: 'lines', border: [true, false, true, true]}, 
        { text : status, style: 'lines', border: [true, false, true, true]},        
      ];
    dado.push(restante, restante2, restante3, restante4);
    
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
      pageSize: 'A4',
      pageOrientation: 'portrait',
      // [left, top, right, bottom] or [horizontal, vertical] or just a number for equal margins
      // pageMargins: [ 40, 60, 40, 40 ],
      info: {
        title: `SARAM ${nordem}-${digito}`,
        author: '1º Ten Int CHIPOLESCH',
        subject: 'Gerador de contracheques da FAB em formato PDF',           
        },
      // watermark:  { text: cpf, color: 'black', opacity: 0.05, bold: true, italics: false },
      // background: 'simple text',
      // header: (currentPage, pageCount, pageSize) => {
      //   // you can apply any logic and return any valid pdfmake element        
      //   return [
      //     { text: 'simple text', alignment: (currentPage % 2) ? 'left' : 'right' },
      //     { canvas: [ { type: 'rect', x: 170, y: 32, w: pageSize.width - 170, h: 40 } ] }
      //   ]
      // },
      footer: { text: `Contracheque emitido em ${moment().format('DD/MM/yyyy')} às ${moment().format('HH:mm:ss')} h`, alignment: 'center'},
      // {
      //   columns: [
      //     { text: 'Left part', alignment: 'left' },
      //     { text: `Contracheque emitido em ${moment().format('DD/MM/yyyy')} às ${moment().format('HH:mm:ss')} h`, alignment: 'center'},
      //     { text: 'Right part', alignment: 'right' },
      //     (currentPage, pageCount) => { return `[${currentPage.toString()}/${pageCount}]`}
      //   ]
      // },
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
        // { text: 'google', link: 'http://fab.mil.br/conheca-seu-contracheque' },
        { 
          // layout: 'noBorders',
          table: 
          {
            // headers are automatically repeated if the table spans over multiple pages
            // you can declare how many rows should be treated as headers
            headerRows: 0,
            widths: [ '*', 'auto', 'auto', 'auto', 'auto', 80, 60, 20, 60, 20 ],
            body: dado
          },
          layout: {
            hLineColor: (i, node) => {
              return (i === 0 || i === node.table.body.length) ? 'black' : 'black';
            },
            vLineColor: (i, node) => {
              return (i === 0 || i === node.table.widths.length) ? 'black' : 'black';
            },
            fillColor: (rowIndex, node, columnIndex) => {
              return (rowIndex === 0 || rowIndex === 2 || rowIndex === 4) ? '#CCCCCC' : null;
            },
            paddingLeft: (i) => {
              return i === 1;
            },
            paddingRight: (i, node) => {
              return (i === node.table.widths.length);
            },                
          },
        },        
        { qr: 'conheça seu contracheque', fit: '50', alignment: 'right', margin: [0, 5, 0, 0] }
      ],
      styles: {
        header: {
          alignment : 'center',
          fontSize : 10,
          fillColor: '#CCCCCC',
          margin: [0, 2],
        },
        lines: {
          alignment : 'center', 
          margin: [0, 2],
        }
      },
      defaultStyle: {
        font: 'Times'
      },
      // pageBreakBefore: function(currentNode, followingNodesOnPage, nodesOnNextPage, previousNodesOnPage) {
      //   return currentNode.headlineLevel === 1 && followingNodesOnPage.length === 0;
      // }
    };
    
    var options = {
      
    }
    
    var pdfDoc = printer.createPdfKitDocument(docDefinition, options);
    pdfDoc.pipe(res);
    pdfDoc.end();
  }

  montaErroContrachequePdf(res){
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
      content: [
        {text: 'Não existem dados para o parâmetro informado', fontSize: 20}
      ],
      defaultStyle: {
        font: 'Times'
      },
    };
    
    var pdfDoc = printer.createPdfKitDocument(docDefinition);
    pdfDoc.pipe(res);
    pdfDoc.end();
  }
}

module.exports = new ContrachequeModel;