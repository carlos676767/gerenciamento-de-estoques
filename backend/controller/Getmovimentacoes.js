const db = require("../db/db");
class movimentacoesGet {
  static async getMovimentacoes(req, res) {
    const database = await db.db();
    const result = await await database.all("SELECT * FROM MOVIMENTACOES");
    res.status(200).send({ msg: result });
  }
}

module.exports = movimentacoesGet;
