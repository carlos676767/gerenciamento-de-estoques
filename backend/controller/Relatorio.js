

class excel {
  static excelJs = require('exceljs')
  static Router() {
    excel.gerarExcel()
  }

  static async gerarExcel(){
    const plaanilha = new this.excelJs.Workbook()
    const planilha = plaanilha.addWorksheet('planilha.xlsx')

    planilha.columns = [
      {
        header: 'Nome Produto',
        key: 'nome',
        width: 25,
        alignment: 'center'
      },

      {
        header: 'Preco',
        key: 'valor',
        width: 25,
        alignment: 'center'
      },
      {
        header: 'Categoria',
        key: 'categoria',
        width: 25,
        alignment: 'center'
      },
      {
        header: 'Quantidade',
        key: 'quantidade',
        width: 25,
        alignment: 'center'
      }
    ]

    const itens = [
      {
        nome: 'banana',
        valor: 4,
        categoria: 'fruta',
        quantidade: 44
      },

      {
        nome: 'melao',
        valor: 42,
        categoria: 'fruta',
        quantidade: 4
      }]

    itens.forEach((data) => {
      planilha.addRow(data).alignment =  { vertical: 'middle', horizontal: 'center' };
    })

    plaanilha.xlsx.writeFile('E://gerenciamento de estoques//backend//public/planilha.xlsx')
  }
}






module.exports = excel