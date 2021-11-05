const PdfPrinter = require('pdfmake');

class ErrorHandler{

  nullParameterPdf(res){
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
        {text: 'Não existem dados para o parâmetro informado'}
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

module.exports = new ErrorHandler;