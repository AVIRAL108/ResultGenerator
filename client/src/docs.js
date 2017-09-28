import 'pdfmake'
var docDefinition = { content: 'This is an sample PDF printed with pdfMake' };
pdfMake.createPdf(docDefinition).print();