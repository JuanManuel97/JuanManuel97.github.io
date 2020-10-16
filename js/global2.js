function setInputFilter(textbox, inputFilter) {
    ["input", "keydown", "keyup", "mousedown", "mouseup", "select", "contextmenu", "drop"].forEach(function (event) {
      textbox.addEventListener(event, function () {
        if (inputFilter(this.value)) {
          this.oldValue = this.value;
          this.oldSelectionStart = this.selectionStart;
          this.oldSelectionEnd = this.selectionEnd;
        } else if (this.hasOwnProperty("oldValue")) {
          this.value = this.oldValue;
          this.setSelectionRange(this.oldSelectionStart, this.oldSelectionEnd);
        } else {
          this.value = "";
        }
      });
    });
  }

  function calcular() {

    if (document.getElementById("tiempoAhorro").value == "" || document.getElementById("montoAhorro").value == "" || document.getElementById("TREA").value == "") {
      alert("Ingrese los datos solicitados");
    } else {
      var monto = document.getElementById("montoAhorro").value;
      var dias = document.getElementById("tiempoAhorro").value;
      var TREA = document.getElementById("TREA").value;

      var resultado = monto;
      var loops;

      if (document.getElementById("capitDiaria").checked) {
        loops = dias;

        for (var i = 0; i < loops; i++) {
          resultado = parseFloat(resultado) + (Math.pow((1 + TREA / 100), (1 / 360)) - 1) * resultado;
        }
      } else if (document.getElementById("capitMensual").checked || document.getElementById("capitAnual").checked) {
        var cantDiasCiclo = document.getElementById("capitMensual").checked ? 30 : 360;

        if (dias < cantDiasCiclo) {
          alert("La cantidad mínima de días para calcular con capitalización mensual es de 30, y con capitalizacin anual es de 360.");
        } else {
          loops = Math.ceil(dias / cantDiasCiclo);

          for (var i = 0; i < loops; i++) {
            if ((dias % cantDiasCiclo) > 0 && i === 0)
              resultado = parseFloat(resultado) + (Math.pow((1 + TREA / 100), ((dias % cantDiasCiclo) / 360)) - 1) * resultado
            else
              resultado = parseFloat(resultado) + (Math.pow((1 + TREA / 100), (cantDiasCiclo / 360)) - 1) * resultado
          }
        }
      } else {
        var resultado = parseFloat(monto) + (Math.pow((1 + TREA / 100), (dias / 360)) - 1) * monto;
      }

      document.getElementById("resultado").innerHTML = "Su ahorro al cabo de " + dias + " d&iacuteas ser&aacute de " + resultado;
      document.getElementById("divResultado").style.display = "block";
    }
  }

