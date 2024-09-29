const db = require("../db/db");
class getVendas {
  static async getMovimentacoes(req, res) {
    const database = await db.db();
    const queery = "SELECT * FROM MOVIMENTACOES WHERE status= ?"
    const result = await await database.all(queery, 'saida');
    res.status(200).send({ msg: result });
  }
}

module.exports = getVendas;