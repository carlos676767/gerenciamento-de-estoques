const produto = document.getElementById("produto");
class Produtos {
  static async getProdutos() {
    const getPrpduct = await fetch("http://localhost:8080/produtos");
    const response = await getPrpduct.json();
    response.msg.forEach((element) => {
      const { nome, id_produtos } = element;
      produto.innerHTML += `<option value=${id_produtos}>${nome}</option>`;
    });
  }

  static objectValue() {
    const tipo = document.getElementById('tipo')
    const quantidade = document.getElementById('quantidade')
    return {
      id: produto.value,
      status: tipo.value,
      quantidade: quantidade.value.trim()
    };
  }

  static async eventMovimentacoes() {
    try {
      const data = await fetch("http://localhost:8080/movimentacoes", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(this.objectValue()),
      });
      const res = await data.json()
      console.log(res);
      
    } catch (error) {

    }
  }

  static buttonEvent() {
    const button = document.querySelector("button");
    button.addEventListener("click", (e) => {
      this.eventMovimentacoes();
      e.preventDefault();
    });
  }
}

Produtos.getProdutos();
Produtos.buttonEvent();
