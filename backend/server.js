const Pdf = require("./controller/Relatorio");

class Express {
  static api = require("express");
  static bodyParser = require("body-parser");
  static apii = require("./router/rota");
  static cors = require("cors");

  static configExpress() {
    const expressApi = this.api()
    expressApi.use(this.bodyParser.json());;
    expressApi.use(this.apii)
    expressApi.use(this.cors());
    expressApi.use(this.api.static("public"));

    expressApi.listen(8080, () => {
      console.log("servidor rodando", 8080);
    });

  }
}

Express.configExpress();
