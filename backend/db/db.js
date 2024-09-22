const { open } = require("sqlite");
class Sql {
  static sql = require("sqlite3");
  
  static async db() {
    return await open({
      driver: this.sql.Database,
      filename: "E://gerenciamento de estoques//backend//db//database.db",
    });
  }
}

module.exports = Sql;
