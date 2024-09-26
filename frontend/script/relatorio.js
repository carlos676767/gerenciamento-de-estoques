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
    alert(JSON.stringify(this.objectValues()))
    try {
      const data = await fetch("http://localhost:8080/getrelatorios", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(this.objectValues()),
      });
      const {msg} = await data.json();
      const msgHttpValide = msg.substr(0, 4)
      if (msgHttpValide === 'http') {
        location.href = msg
      }
    } catch (error) {
      console.log(error);
    }
  }

  static buttonEvent() {
    this.button.addEventListener("click", (e) => {
    this.RelatorioGerar();
     e.preventDefault()
    });
  }
}


Relatorio.buttonEvent()