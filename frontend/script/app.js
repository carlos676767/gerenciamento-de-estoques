class Produtos {
  static #name = document.getElementById("name");
  static #description = document.getElementById("description");
  static #category = document.getElementById("category");
  static #price = document.getElementById("price");
  static #quantity = document.getElementById("quantity");
  static #button = document.querySelector("button");
  static #objetoProdutos() {
    return {
      nome: this.#name.value.trim(),
      descricao: this.#description.value.trim(),
      categoria: this.#category.value.trim(),
      preco: this.#price.value.trim(),
      quantidade: this.#quantity.value.trim(),
    };
  }

  static async #cadastrarProduto() {
    try {
      const response = await fetch("http://localhost:8080/post/product", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(this.#objetoProdutos()),
      });

      const data = await response.json();
      if (response.ok) {
        this.#alertaProdutoSucesso();
        this.limparInput();
        return
      }
      this.#alertaFalha(data.msg);
    } catch (error) {
      console.log(error);
    }
  }

  static #alertaProdutoSucesso() {
    Swal.fire({
      icon: "success",
      title: "Produto Cadastrado!",
      text: "O produto foi cadastrado com sucesso.",
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

  static buttonEvent() {
    this.#button.addEventListener("click", (e) => {
      e.preventDefault();
      this.#cadastrarProduto();
    });
  }

  static limparInput() {
    this.#name.value = "";
    this.#description.value = "";
    this.#category.value = "";
    this.#price.value = "";
    this.#quantity.value = "";
  }
}
Produtos.buttonEvent();
