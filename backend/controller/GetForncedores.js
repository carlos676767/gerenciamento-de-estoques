const db = require("../db/db");
class Forncedoress {
  
  static async selectFormnecores(req, res){

    const database = await db.db()
    const result = await database.all('SELECT * FROM FORNECEDORES')
    
    if (result == []) {
     res.status(400).send({msg: 'Nao ha fornecedores cadastrados'});
     return
    }
    
    res.status(200).send({msg: result})
  }
}


module.exports = Forncedoress