class Produtos
 {
  static database = require("../db/db");
  static async router(req, res) {
    const id = req.params.id;
    await Produtos.deleteProduto(id, res);
  }

  static async deleteProduto(id, res) {
    try {
      const query = "DELETE FROM PRODUTOS WHERE id_produtos = ?";
      const connectDb = await this.database.db();
      const result = await connectDb.run(query, [id]);

      if (result.changes > 0) {
        res.status(200).send({
          msg: `O produto com ID ${id} foi deletado com sucesso.`,
          info: {
            produtoId: id,
            status: "Deletado",
          },
        });
        return;
      }

      res.status(404).send({
        msg: `Nenhum produto encontrado com o ID ${id}. Verifique se o ID está correto.`,
        info: {
          produtoId: id,
          status: "Não encontrado",
        },
      });
      
    } catch (error) {
      console.error("Erro ao tentar deletar o produto:", error);
      res.status(500).send({
        msg: "Ocorreu um erro interno ao tentar deletar o produto. Tente novamente mais tarde.",
        error: error.message,
      });
    }
  }
}

module.exports = Produtos;
