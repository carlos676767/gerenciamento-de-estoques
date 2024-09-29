class Login {
  static button = document.querySelector("button");
  static username = document.getElementById("username");
  static password = document.getElementById("password");

  static validarToken() {
    const tk = localStorage.getItem("token");
    addEventListener("DOMContentLoaded", async () => {
      const data = await fetch("http://localhost:8080/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${tk}`,
        },
      });

      const { login } = await data.json();

      if (login) {
        location.href ="E://gerenciamento de estoques//frontend//home.html";
      }
    });
  }

  static objectHttp() {
    return {
      nome: this.username.value.trim(),
      senha: this.password.value.trim(),
    };
  }

  static async login() {
    try {
      const data = await fetch("http://localhost:8080/users", {
        method: "POST",
        body: JSON.stringify(this.objectHttp()),
        headers: {
          "Content-Type": "application/json",
        },
      });

      const { msg, login, token } = await data.json();

      if (login) {
        localStorage.setItem("token", token);
        location.href = "http://127.0.0.1:5500/frontend/home.html";
      }
      console.log(msg);
    } catch (error) {
      console.log(error);
    }
  }

  static buttonEvent() {
    this.button.addEventListener("click", (e) => {
      this.login();
      e.preventDefault();
    });
  }
}

Login.buttonEvent();

Login.validarToken()
