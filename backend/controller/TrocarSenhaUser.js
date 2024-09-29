class Senha {
  static db = require("../db/db");

  static async router(req, res) {
    try {
      const { nome, senha, senhaAntiga } = req.body;
      console.log(req.body);
      
      Senha.validacoes(nome, senha, senhaAntiga);
      await Senha.trocarSenha(nome, senha, res);
    } catch (error) {
      res.status(401).send({ error: error.message });
    }
  }

  static validacoes(nome, senha, senhaAntiga) {
    if (!senha || !nome || !senhaAntiga) {
      throw new Error("Por favor, preencha todos os campos obrigatórios: nome, senha e senha antiga." );
    }

    if (senha.length < 8) {
      throw new Error("A nova senha deve ter no mínimo 8 caracteres.");
    };

    const regexValidacaoSenha = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!regexValidacaoSenha.test(senha)) {
      throw new Error("A nova senha deve conter pelo menos 8 caracteres, incluindo uma letra maiúscula, uma letra minúscula, um número e um caractere especial (@, $, !, %, *, ?, &)." );
    };

    if (senha === senhaAntiga) {
      throw new Error("A nova senha não pode ser igual à senha antiga.");
    };

  }

  static async trocarSenha(nome, senha, res) {
    try {
      const database = await this.db.db();
      const query = "UPDATE USUARIO SET senha_user = ? WHERE nome_user = ?";
      const result = await database.run(query, [senha, nome]);
     
      if (result.changes > 0) {
        res.status(200).send({ msg: "A senha foi atualizada com sucesso." });
        await database.close()
        return
       } 
       
      
      throw new Error('Nenhuma alteração foi realizada. Por favor, verifique se os dados estão corretos e tente novamente.');
    } catch (error) {
      res.status(500).send({  error: error.message,  });
    }
  }
}

module.exports = Senha;
