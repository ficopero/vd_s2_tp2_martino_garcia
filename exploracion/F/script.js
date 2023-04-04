let chart;
let data;
let selectElement = d3.select('#input');
let valuesDomainX;

d3.csv('astronautas.csv', d3.autoType).then(dataCSV => {
  data = dataCSV.filter(d => d.nacionalidad == "U.S.S.R/Rusia" || d.nacionalidad =="EE.UU.");
  let initYear = selectElement.property('value');
  changeValueInput(initYear);
  createChart(initYear); 
});

selectElement.on('input', event => {
  let yearSelected = event.target.value;
  changeValueInput(yearSelected);
  createChart(yearSelected);
});

function changeValueInput(value) {
  const resultado = document.querySelector('#value-input');
  resultado.textContent = value;
}

function createChart(yearSelected) {
  let dataFilter = data.filter(d => d.anio_mision == yearSelected);
  let Pais_Genero = d3.group(dataFilter, d => d.nacionalidad, d => d.genero);
  let Cantidad = [];
  for(let nacionalidad of Pais_Genero){
    let mujeres = (nacionalidad[1].get("femenino") || []).length;
    Cantidad.push({nacionalidad: nacionalidad[0], cant: mujeres, genero: 'femenino'});
  }

  console.log(dataFilter);
  console.log(Cantidad);

  let chart = Plot.plot({

    width:500,
    line:true,
    grid:true,
    color:{
      type: "categorical",
      range: ["#32458A", "#E43D3F"]
    },
    x: {
      label: "",
      domain: valuesDomainX
    },
    y: {
      label: " ",
      domain: [0, 8]
    },
    marks: [
      Plot.barY(Cantidad, {
        x: 'nacionalidad',
        y: 'cant',
        fill: 'nacionalidad',
      })
    ]
  });

  d3.select('#chart svg').remove();
  d3.select('#chart').append(() => chart);
}
