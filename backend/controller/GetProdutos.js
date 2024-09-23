const Sql = require("../db/db");
//JOIN FORNECEDORES ON PRODUTOS.id = FORNECEDORES.id ORDER BY
class getProdutos {
  static async listProduct(req, res) {
    try {
      const db = await Sql.db()
      const query = "SELECT * FROM PRODUTOS ORDER BY nome ASC;";
      const result = await db.all(query);

      if (result == []) {
        throw new Error("nao ha produtos disponiveis, verifique o estoque.");
      }

      const produtoFormatado = result.map(({id_fornecedor, id, ...resto  }) => resto);

      res.status(200).send({produtos: produtoFormatado})
    } catch (error) {
      res.status(400).send({msg: error.message, err: true})
    }
  }
}


module.exports =  getProdutos