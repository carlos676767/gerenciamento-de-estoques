class Senha {
  static button = document.querySelector("button");
  static username = document.getElementById("username");
  static oldPassword = document.getElementById("oldPassword");
  static confirmPassword = document.getElementById("confirmPassword");

  static objectValues() {
    return {
      nome: this.username.value.trim(),
      senha: this.confirmPassword.value.trim(),
      senhaAntiga: this.oldPassword.value.trim(),
    };
  }

  static async httpRequest() {
    try {
      const data = await fetch("http://localhost:8080/atualizarSenha", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(this.objectValues())
      });
      const response = await data.json();
      if (response.msg) {
        alert(response.msg)
        this.#alertaSucesso()
        return
      }
      this.#alertaFalha(response.error)
    } catch (error) {
      console.log(error);
    }
  }

  static buttonEvent() {
    this.button.addEventListener("click", (e) => {
      e.preventDefault()
      this.httpRequest();
    });
  }

  static #alertaSucesso() {
    Swal.fire({
      icon: "success",
      title: "Senha trocada!",
      text: "A senha foi trocada com sucesso.",
      confirmButtonText: "OK",
    });
  }

  static #alertaFalha(msg) {
    Swal.fire({
      icon: "error",
      title: "Falha ao trocar senha!",
      text: msg,
      confirmButtonText: "OK",
    });
  }
}

Senha.buttonEvent()