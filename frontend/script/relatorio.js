class Relatorio {
  static startDate = document.getElementById("startDate");
  static endDate = document.getElementById("endDate");
  static button = document.querySelector("button");
  static select = document.querySelector("select");

  static objectValues() {
    return {
      inicio: this.startDate.value.trim(),
      fim: this.endDate.value.trim(),
      opcao: this.select.value,
    };
  }

  static async RelatorioGerar() {
    try {
      const data = await fetch("http://localhost:8080/getrelatorios", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(this.objectValues()),
      });

      const reseponse = await data.json()
      if (reseponse.url) {
        location.href =  `http://localhost:8080/${reseponse.url}`
        return
      }
      
      this.#alertaFalha(reseponse.msg)
    } catch (error) {
      console.log(error);
    }
  }



  static #alertaFalha(msg) {
    Swal.fire({
      icon: "error",
      title: "Falha ao conusltar relatorio!",
      text: msg,
      confirmButtonText: "OK",
    });
  }

  static buttonEvent() {
    this.button.addEventListener("click", (e) => {
      e.preventDefault();
      this.RelatorioGerar();
    });
  }
}

Relatorio.buttonEvent();






class staticasRelatorios {
  static #totalFornecedores = document.getElementById("totalFornecedores");
  static #totalItens = document.getElementById("totalItens");
  static #totalMovimentacoes = document.getElementById("totalMovimentacoes");
  static #totalVendas = document.getElementById("totalVendas");
  static async #getInforRelatorios(nome) {
    try {
      const data = await fetch(`http://localhost:8080/${nome}`);
      const response = await data.json();

      if (data.ok) {
        return response.msg.length;
      }
    } catch (error) {
      console.log(error);
    }
  }

  static async exibirItens() {
    const forncedores = await staticasRelatorios.#getInforRelatorios( "forncedores" );
    const produtos = await staticasRelatorios.#getInforRelatorios("produtos");
    const vendas = await staticasRelatorios.#getInforRelatorios("getVendas");
    const movimentacoes = await staticasRelatorios.#getInforRelatorios("getmovimentacoes" );
    this.#totalFornecedores.innerText = forncedores;
    this.#totalItens.innerHTML = produtos;
    this.#totalMovimentacoes.innerHTML = movimentacoes;
    this.#totalVendas.innerHTML = vendas;
  }
}

staticasRelatorios.exibirItens();

class Grafico {
  static canvas = document.querySelector("canvas").getContext("2d");

  static graficoMostrar() {
    new Chart(this.canvas, {
      type: "bar",
      data: {
        labels: [
          "Janeiro",
          "Fevereiro",
          "Março",
          "Abril",
          "Maio",
          "Junho",
          "Julho",
          "Agosto",
          "Setembro",
          "Outubro",
          "Novembro",
          "Dezembro",
        ],
        datasets: [
          {
            label: "Arroz",
            data: [120, 150, 180, 170, 220, 200, 250, 240, 230, 270, 300, 320],
            backgroundColor: "rgba(255, 99, 132, 0.7)",
          },
          {
            label: "Macarrao",
            data: [100, 130, 150, 140, 210, 190, 220, 210, 200, 260, 280, 310],
            backgroundColor: "rgba(54, 162, 235, 0.7)",
          },
          {
            label: "Peixe",
            data: [90, 120, 140, 130, 200, 180, 210, 200, 190, 250, 270, 300],
            backgroundColor: "rgba(75, 192, 192, 0.7)",
          },
        ],
      },
      options: {
        responsive: true,
        plugins: {
          title: {
            display: true,
           
          },
          legend: {
            position: "top",
          },
        },
        scales: {
          x: {
            beginAtZero: true,
            title: {
              display: true,
              text: "meses",
            },
          },
          y: {
            beginAtZero: true,
            title: {
              display: true,
              text: "Sales Volume",
            },
          },
        },
      },
    });
  }
}

Grafico.graficoMostrar();
