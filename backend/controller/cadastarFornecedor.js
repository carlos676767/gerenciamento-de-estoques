class Forncedor {
  static db = require("../db/db");
  static async RouterFor(req, res) {
    try {
      const { nome, telefone } = req.body;
      Forncedor.valideInput(nome, telefone);
      const formatarNumero = telefone.replace( /(\d{2})(\d{5})(\d{4})/,"($1) $2-$3");
      await Forncedor.adicionarForncedores(nome, formatarNumero);
      res.status(200).send({ àlerta: "fornecedor cadastrado com sucesso." });
    } catch (error) {
      res.status(400).send({ msg: error.message });
    }
  }

  static valideInput(nome, telefone) {
    if (!nome || !telefone) {
      throw new Error("Preencha os campos corretamente.");
    }
  }

  static async adicionarForncedores(nome, telefone) {
    const query = "INSERT INTO FORNECEDORES(nome,  contato, data_cadastro) VALUES(?, ?, ?)";
    const db = await this.db.db();
    await db.run(query, [nome, telefone, this.dataFormatada()]);
  }

  static dataFormatada() {
    const agora = new Date();
    const ano = agora.getFullYear();
    const mes = (agora.getMonth() + 1).toString().padStart(2, "0");
    const dia = agora.getDate().toString().padStart(2, "0");
    return `${dia}/${mes}/${ano}`;
  };

};

module.exports = Forncedor;
