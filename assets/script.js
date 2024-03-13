// direccion API
const apiURL = "https://mindicador.cl/api/";
// Funcion para generar la conversion y mostrar el resultado
async function buscar() {
  document.getElementById("errorInput").innerHTML = ""; // Mensaje de error se elimina al rellenar el campo//
  try {
    const valorPesos = document.getElementById("input").value; //Recoge el valor del input del html//
    if (valorPesos === "") {
      document.getElementById("errorInput").innerHTML = "Ingresa un valor"; //Mensaje de error al no ingresar nada en el input//
      return;
    }
    const monedasConvertir = document.querySelector("select").value; //Recoge el valor del select del html
    const res = await fetch(apiURL + monedasConvertir); //Recoge el valor de la API segun el valor seleccionado en el select del html//
    const monedas = await res.json(); // "Ordena" el texto de la api//
    const conversionSerie = monedas.serie[0].valor; // Recoge el valor de las series de cada moneda seleccionada en el select//
    const valorConvertido = valorPesos / conversionSerie;
    const resultHtml = document.getElementById("resultadoSpan");
    resultHtml.innerHTML = valorConvertido;
    renderGrafica(monedas.serie);
  } catch (error) {
    alert("Debes seleccionar una moneda");
  }
}

async function getAndCreateDataToChart(series) {
  series = series.slice(0, 10);
  const labels = series.map((serie) => {
    return serie.fecha;
  });
  const data = series.map((serie) => {
    const valor = serie.valor;
    return Number(valor);
  });
  const datasets = [
    {
      label: "Valor",
      borderColor: "rgb(255, 99, 132)",
      data,
    },
  ];
  return { labels, datasets };
}

async function renderGrafica(series) {
  const data = await getAndCreateDataToChart(series);
  const config = {
    type: "line",
    data,
  };
  const myChart = document.getElementById("myChart");
  myChart.style.backgroundColor = "white";
  new Chart(myChart, config);
}
