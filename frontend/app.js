
const produto = {
  nome: "Produto Exemplo",
  descricao: "Uma descrição detalhada do produto.",
  categoria: "Eletrônicos",
  preco: 99.99,
  quantidade: 10
};

async function cadastrarProduto(produto) {
  try {
    const response = await fetch("http://localhost:8080/post/product", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(produto),
    });
    const res = await response.json()
    console.log(res);
    
  } catch (error) {
    console.error("Erro na requisição:", error);
  }
}

cadastrarProduto(produto);
