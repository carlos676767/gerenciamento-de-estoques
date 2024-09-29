const select = document.querySelector("select");

class Forncedores {
  static async getFornecedores() {
    const data = await fetch("http://localhost:8080/forncedores");
    if (data.ok) {
      const { msg } = await data.json();
      Forncedores.listFornecedores(msg);
    };
  };

  static listFornecedores(list) {
    list.forEach((element) => {
      const { id, nome_forncedor } = element;
      select.innerHTML += `<option value=${id}>${nome_forncedor}</option>`;
    });
  };
};

Forncedores.getFornecedores();

class Produtos {
  static #name = document.getElementById("name");
  static #description = document.getElementById("description");
  static #category = document.getElementById("category");
  static #price = document.getElementById("price");
  static #quantity = document.getElementById("quantity");
  static form = document.querySelector('form');
  static #objetoProdutos() {

    return {
      nome: this.#name.value.trim(),
      descricao: this.#description.value.trim(),
      categoria: this.#category.value.trim(),
      preco: this.#price.value.trim(),
      quantidade: this.#quantity.value.trim(),
      id: select.value,
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
        return;
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
    this.form.addEventListener("submit", async (e) => {
      e.preventDefault();
      await this.#cadastrarProduto();
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


class deleteProduto {
  static btnDelete = document.getElementById('deleteProduct')
  static input = document.getElementById('productIdAction')
  static objectValue(){
    return {
      id: this.input.value
    }
  }

  static async deletarProduto(){
   try {
    const data = await fetch(`http://localhost:8080/deleteProduto/${this.objectValue().id}`,{
      method: 'DELETE'
    })
    const {msg} = await data.json()
    if (data.ok) {
      alert(msg)
    }
    alert(msg)
   } catch (error) {
    console.log(error);
   }
  }

  static eventBtnDelete(){
    this.btnDelete.addEventListener('click', () => {
      this.deletarProduto()
    })
  }
}

deleteProduto.eventBtnDelete()



class EditProduto {
  static editproductcontainerDIv = document.querySelector( ".edit-product-container" );
  static editProduct = document.getElementById("editProduct");

  static buttonCancel = document.querySelector(".btn-cancel");
  static eventButtonAbrirDiv() {
    this.editProduct.addEventListener("click", () => {
      this.editproductcontainerDIv.style.display = "block";
      this.editproductcontainerDIv.style.display = "flex";
    });
  }

  static fecharDiv() {
    this.buttonCancel.addEventListener("click", () => {
      this.editproductcontainerDIv.style.display = "none";
    });
  }

  static objectValues(){
    const selectprodutos = document.getElementById("selectprodutos")
    const id = document.getElementById('id')
    const input = document.getElementById("productValue")
    return {
      value: selectprodutos.value,
      id: id.value.trim(),
      input: input.value.trim()
    }
  }

  static async requestEditProduct(){
    try {
      const data = await fetch('http://localhost:8080/atuaizarProduto', {
        method: 'PATCH',
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(this.objectValues())
      })
      const res = await data.json()
      alert(JSON.stringify(res))
    } catch (error) {
      
    }
  }

  static buttonEventEnviarEdit(){
    const btneditproduct = document.querySelector('.btn-edit-product')
    btneditproduct.addEventListener('click', (e) => {
      e.preventDefault()
      alert('aaa')
      this.requestEditProduct()
    })
  }
}


EditProduto.eventButtonAbrirDiv()
EditProduto.fecharDiv()
EditProduto.buttonEventEnviarEdit()

