const database = require("../db/db");
const jwt = require("jsonwebtoken");
const config = require("../config.json");
class Usuario {
  static ValideJwt(req, res, next) {
    if (req.headers.authorization) {
      const token = req.headers.authorization.split(" ")[1];
      jwt.verify(token, config.secretkey, (err, sucess) => {
        if (err) {
          next();
        }
        res.status(200).send({ msg: "Token valido", login: true });
      });
    } else {
      next();
    }
  }

  static async loginUser(req, res) {
    try {
      const { nome, senha } = req.body;
      Usuario.validarInput(nome, senha);
      const db = await database.db();

      const { nome_user, senha_user, id } = await db.get("SELECT * FROM USUARIO WHERE nome_user = ?", nome);

      Usuario.validarNomeUser(nome);

      if (nome_user == nome && senha == senha_user) {
        const token = jwt.sign({ id }, config.secretkey, { expiresIn: "1h" });
        res.status(200).send({ token: token, login: true });
      }
      
    } catch (error) {
      res.status(401).send({ msg: error.message });
    }
  }

  static validarInput(nome, senha) {
    if (!nome || !senha) {
        throw new Error("Por favor, preencha todos os campos obrigatórios: nome e senha.");
    }
  }

  static validarNomeUser(nome_user) {
    if (!nome_user) {
        throw new Error("O usuário informado não existe. Verifique os dados e tente novamente.");
    }    
  }
}

module.exports = Usuario;