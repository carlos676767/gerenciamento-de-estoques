class Forncedor {
  static db = require("../db/db");
  static async RouterFor(req, res) {
    try {
      const { nome, telefone } = req.body;
      Forncedor.valideInput(nome, telefone)
      const formatarNumero = telefone.replace( /(\d{2})(\d{5})(\d{4})/,"($1) $2-$3");
      const nomeFormatado = nome.toLowerCase()
      await Forncedor.adicionarForncedores(nomeFormatado, formatarNumero);
      console.log('aaaaa');
      
      res.status(200).send({ msg: "fornecedor cadastrado com sucesso.", cadastro: true });
    } catch (error) {
      res.status(400).send({ msg: error.message });
    }
  };

  static valideInput(nome, telefone) {
    if (!nome || !telefone) {
      throw new Error("Preencha os campos corretamente.");
    }

    if (telefone.length < 8) {
      throw new Error("O numero de telefone precisa ter no minimo 8 digitos.");
    }

    if (telefone < 0) {
      throw new Error("Nao digite um numero negativo.");
    }

    if (nome.length < 3) {
      throw new Error('O nome precisa ter no minimo tres caracteres.')
    }

    const dd = telefone.substring(0, 2)
    if (dd < 11 || dd > 99) {
      throw new Error("O código DDD é inválido.");
    };
    
  }

  static async adicionarForncedores(nome, telefone) {
    const query = "INSERT INTO FORNECEDORES(nome_forncedor,  contato, data_cadastro) VALUES(?, ?, ?)";
    const db = await this.db.db();
    await db.run(query, [nome, telefone, this.dataFormatada()]);
    await db.close()
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
