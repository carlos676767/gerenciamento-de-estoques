

class Pdf {
  static doc = require("pdfkit");
  static fs = require('fs')
  static Router(req, res) {
    const {inicio, fim, nome} = req.body
    Pdf.gerardf()
  }

  static gerardf(){
    const doc = new this.doc();
    const writeStream = this.fs.createWriteStream('testes.pdf'); 

    
    doc.pipe(writeStream)
    doc.text('ola', 50, 50)
    doc.
    doc.end()
  }
}



Pdf.Router()