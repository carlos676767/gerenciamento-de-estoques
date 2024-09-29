class Excel {
  static excelJs = require("exceljs");
  static database = require("../db/db");
  static async Router(req, res) {
    try {
      const { inicio, fim, opcao } = req.body;

      if (opcao === "selecione") {
        throw new Error("Selecione uma opcao valida.");
      }

      await Excel.gerarExcel(inicio, fim, opcao, res);

    } catch (error) {
      res.status(400).send({ msg: error.message });
    }
  }

  static async buscarDadosDb(inicio, fim, option) {
    if (!inicio || !fim || !option) {
      throw new Error("Por favor preencha os dados.");
    }

    const db = await this.database.db();
    const inicioData = inicio.split("-").reverse().join("/");
    const fimData = fim.split("-").reverse().join("/");
    const query = `SELECT * FROM ${option} WHERE data_cadastro BETWEEN ? AND ?`;

    const result = await db.all(query, [inicioData, fimData]);

    if (result.length == 0) {
      throw new Error(`Nenhum valor encontrado para as datas selecionadas. Verifique os filtros aplicados e tente novamente.`);
    }

    return result.sort();
  }

  static async gerarExcel(inicio, fim, option, res) {
    const plaanilha = new this.excelJs.Workbook();
    const planilha = plaanilha.addWorksheet("planilha.xlsx");
    const result = await Excel.buscarDadosDb(inicio, fim, option);

    const objectSelecao = {
      FORNECEDORES: Excel.#gerarRelatorioFornecedores(result, planilha, plaanilha, option),
      PRODUTOS: Excel.#gerarRelatorioProdutos(result, planilha, plaanilha, option)
    }

    objectSelecao[option] 
    res.download(`E://gerenciamento de estoques//backend//public//${option}.xlsx`)
    // res.status(200).send({msg: `E://gerenciamento de estoques//backend//public//${option}`})
  }


  static #gerarRelatorioFornecedores(result, planilha, plaanilha, option){
    planilha.columns = [
      {
        header: "nome",
        key: `nome`,
        width: 25,
        alignment: "center",
      },

      {
        header: `categoria`,
        key: `categoria`,
        width: 25,
        alignment: "center",
      },
      {
        header: `valor`,
        key: `valor`,
        width: 25,
        alignment: "center",
      },

      {
        header: `quantidade`,
        key: `quantidade`,
        width: 25,
        alignment: "center",
      },
    ];

    result.forEach((data) => {
      (planilha.addRow(data).alignment = {
        vertical: "middle",
        horizontal: "center",
      })
    });

    plaanilha.xlsx.writeFile(`E:/gerenciamento de estoques/backend/public/${option}.xlsx` );
  }



  static #gerarRelatorioProdutos(result, planilha, plaanilha, option){
    planilha.columns = [
      {
        header: "nome_forncedor",
        key: `nome_forncedor`,
        width: 25,
        alignment: "center",
      },

      {
        header: `contato`,
        key: `contato`,
        width: 25,
        alignment: "center",
      },
      {
        header: `data_cadastro`,
        key: `data_cadastro`,
        width: 25,
        alignment: "center",
      },
    ];

    result.forEach((data) => {
      (planilha.addRow(data).alignment = { vertical: "middle", horizontal: "center", })
    });

    plaanilha.xlsx.writeFile(`E:/gerenciamento de estoques/backend/public/${option}.xlsx` );
  }

}

module.exports = Excel;
