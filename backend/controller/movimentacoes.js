class Movimentacoes {
  static db = require("../db/db");
  static async router(req, res) {
    try {
      const { id, status, quantidade } = req.body;
      Movimentacoes.realizarValidacoesInput(id, status, quantidade);
      await Movimentacoes.registrarMovimentacao(id, quantidade, status, res);
    } catch (error) {
      res.status(401).send({ eror: error.message });
    }
  }

  static dataFormatada() {
    const agora = new Date();
    const ano = agora.getFullYear();
    const mes = (agora.getMonth() + 1).toString().padStart(2, "0");
    const dia = agora.getDate().toString().padStart(2, "0");
    return `${dia}/${mes}/${ano}`;
  }

  static realizarValidacoesInput(id, status, quantidade) {
    if (!id || !status || !quantidade) {
      throw new Error("Todos os campos são obrigatórios.");
    }

    if (quantidade <= 0) {
      throw new Error("A quantidade deve ser maior que zero.");
    }
  }
  static async registrarMovimentacao(id, quantidade, status, res) {
    const db = await this.db.db();

    const { valor } = await db.get("SELECT * FROM PRODUTOS WHERE id_produtos = ?", id );
    const novoValorProduto = valor - quantidade;

    const query = "UPDATE PRODUTOS SET valor = ? WHERE id_produtos = ?";
    await db.run(query, [novoValorProduto, id]);

    const buscarNovaQuantidade = await db.get( "SELECT * FROM PRODUTOS WHERE id_produtos = ?", id );

    const queryMovimentacao ="INSERT INTO MOVIMENTACOES (produto_id, quantidade, status, data) VALUES(?, ? ,? ,?)";
    const resultMovimentaco = await db.run(queryMovimentacao, [
      id,
      buscarNovaQuantidade.valor,
      status,
      this.dataFormatada(),
    ]);

    if (resultMovimentaco.changes > 1) {
      res.status(200).send({ msg: "Movimentação realizada com sucesso." });
      return;
    }

    throw new Error("Error na movimentacao tente novamente.");
  }
}

module.exports = Movimentacoes;
