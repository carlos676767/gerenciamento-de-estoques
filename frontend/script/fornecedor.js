class forncedor {
  static #nome = document.getElementById("nome");
  static #contato = document.getElementById("contato");
  static #botao = document.querySelector('button')
  static objetoForncedores() {
    alert( this.#nome.value)
    return {
      nome: this.#nome.value.trim(),
      telefone: this.#contato.value.trim(),
    };
  }

  static async #enviarForncedor() {
    const data = await fetch("http://localhost:8080/forncedores", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify( this.objetoForncedores() ),
    });

    const { cadastro, msg } = await data.json();
    if (cadastro) {
      this.#alertaProdutoSucesso();
      return
    }
    this.#alertaFalha(msg)
  }

  static #alertaProdutoSucesso() {
    Swal.fire({
      icon: "success",
      title: "Forncedor Cadastrado!",
      text: "O Forncedor foi cadastrado com sucesso.",
      confirmButtonText: "OK",
    });
  }

  static #alertaFalha(msg) {
    Swal.fire({
      icon: "error",
      title: "Falha ao Cadastrar!",
      text: msg,
      confirmButtonText: "OK",
    });
  }

  static buttonEvent(){
    this.#botao.addEventListener('click', (e) => {
      e.preventDefault()
      this.#enviarForncedor()
    })
  }
}

forncedor.buttonEvent();
