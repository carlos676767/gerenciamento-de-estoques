class Itens {
  static tbody = document.querySelector("tbody");
  static async getItens() {
    const getItens = await fetch("http://localhost:8080/produtos");
    const response = await getItens.json();
    response.produtos.forEach((element) => {
      const { nome, descricao, valor, quantidade, data_cadastro, categoria } = element;
      this.tbody.innerHTML += `<tr>
      <td>${nome}</td>
      <td>${descricao}</td>
      <td>${categoria}</td>
      <td>${valor}</td>
      <td>${quantidade}</td>
      <td>${data_cadastro}</td>
     </tr>`;
    });
  }
}

Itens.getItens();