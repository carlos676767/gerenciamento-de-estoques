const { app, BrowserWindow } = require("electron/main");

class ElectronJs {
  static #configElectron() {
    const win = new BrowserWindow({
      width: 800,
      height: 600,
    });
    win.loadFile("E://gerenciamento de estoques//frontend//home.html");
  }
  static async loadElectron() {
    await app.whenReady();
    this.#configElectron();
  }
}

ElectronJs.loadElectron()