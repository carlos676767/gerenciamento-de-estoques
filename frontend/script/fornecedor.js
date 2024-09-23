

class forncedor {
  //   static nome = document.getElementById("nome");
  //   static contato = document.getElementById("contato");
  static objetoForncedores() {
    return {
      nome: this.nome.value.trim(),
      telefone: this.contato.value.trim(),
    };
  }

  static async enviarForncedor() {
    const data = await fetch("http://localhost:8080/forncedores", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        nome: "carlos silva",
        telefone: "66996501132",
      }),
    });
    const response = await data.json()
    
    console.log(response);
  }
}

forncedor.enviarForncedor();