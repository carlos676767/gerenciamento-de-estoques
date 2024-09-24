
class Produtos {
  static Sql = require("../db/db");
  static async routerProducy(req, res) {
    try {
      const { nome, descricao, categoria, preco, quantidade, id} = req.body;
      Produtos.validarValores(nome, descricao, categoria, preco, quantidade, req.body);
      await Produtos.cadastrarProduto(nome, descricao, categoria, preco, quantidade, res, id);
    } catch (error) {
      res.status(400).send({ msg: error.message });
    }
  }

  static validarValores(nome, categoria, descricao, preco, quantidade, body) {
    if (!nome || !descricao || !preco || !quantidade || !categoria || !body) {
      throw new Error("Por favor preencha todos os campos.");
    }

    if (preco < 0 || quantidade < 0) {
      throw new Error('o preco precisa ser um numero valor positivo.')
    }

    
  }

  static async cadastrarProduto(nome, descricao, categoria, preco, quantidade, res,  id_fornecedor) {
    const db = await this.Sql.db(); 
    const query = "INSERT INTO PRODUTOS ( id_fornecedor,nome, descricao, categoria, valor, quantidade, data_cadastro) VALUES(?,?,?,?,?,?, ?)";
    await db.run(query, [id_fornecedor,nome, descricao, categoria, preco, quantidade, this.dataFormatada()]);
    await db.close()
    res.status(200).send({msg: 'Produto cadastrado com sucesso.'})
  }
  
  static dataFormatada() {
    const agora = new Date();
    const ano = agora.getFullYear();
    const mes = (agora.getMonth() + 1).toString().padStart(2, "0");
    const dia = agora.getDate().toString().padStart(2, "0");
    const hora = agora.getHours().toString().padStart(2, "0");
    const minutos = agora.getMinutes().toString().padStart(2, "0");
    return `${dia}/${mes}/${ano}`;
  };

}




module.exports = Produtos;
