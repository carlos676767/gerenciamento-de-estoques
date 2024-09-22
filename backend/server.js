

class Express {
  static api = require("express")();
  static bodyParser = require('body-parser')
  static apii = require('./router/rota');
  static configExpress() {
    this.api.use(this.bodyParser.json())
    this.api.use(this.apii)
    this.api.listen(8080, () => {
      console.log("servidor rodando", 8080);
    });
  }
}


Express.configExpress()