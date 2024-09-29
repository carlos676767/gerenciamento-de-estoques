class ProdutosEdit {
  static db = require("../db/db");

  static async router(req, res) {
    try {
      const { value, id, input } = req.body;
      console.log(req.body);
      
      ProdutosEdit.validacoes(value, id);
      await ProdutosEdit.atualizarDadosDatabase(value, id , input, res)
    } catch (error) {
      res.status(400).send({ msg: error.message });
    }
  }

  static validacoes(value, id) {
    if (!value || !id) {
      throw new Error("Por favor, forneça todos os valores necessários para atualizar o produto." );
    }
  }

  static async atualizarDadosDatabase(value, id, input, res) {
    try {
      const database = await this.db.db();
      const query = `UPDATE PRODUTOS SET ${value} = ? WHERE id_produtos = ?`;
      const result = await database.run(query, [input, id]);
      console.log(result);
      
      if (result.changes > 0) {

        res.status(200).send({ success: "Produto atualizado com sucesso." });
        await database.close();

      }else{
        throw new Error("Não foi possível atualizar o produto. Verifique se o ID está correto e tente novamente." );
      }

    } catch (error) {
      throw new Error("Ocorreu um erro ao tentar atualizar o produto: " + error.message);
    }
  }
};
  
module.exports = ProdutosEdit