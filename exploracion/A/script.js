let chart
let data
let selectElement = d3.select('#input')
let valuesDomainX;

d3.csv('astronautas.csv', d3.autoType).then(dataChart => {
  data = dataChart;
  valuesDomainX = [1,3]
  let initYear = selectElement.attr('value');
  changeValueInput(initYear)
  createChart(initYear) 
})


selectElement.on('input', event => {
  let yearSelected = event.target.value
  changeValueInput(yearSelected)
  createChart(yearSelected)
})

function changeValueInput(value) {
  const resultado = document.querySelector('#value-input')
  resultado.textContent = value
}

function createChart(yearSelected) {
  let dataFilter = data.filter(d => d.anio_mision == yearSelected);

dataFilter.sort((a, b) => a.edad_mision - b.edad_mision);

dataFilter.forEach((d, i) => d.rank = i + 1);

let dataFilter2 = dataFilter.slice(0, 3);


console.log(dataFilter2);

chart = Plot.plot({
  line:true,
  grid:true,
  nice: true,
  color: {
    legend: true,
    range: ["pink", "steelblue"],
  },
  x: {
    domain: [1,2,3],
  },
  marks: [
    Plot.dot(dataFilter2, {
      x: d => d.rank ,
      fill: true,
      r: d => (d.rank),
      title: (d) =>
        `${d.nombre}
        Nacionalidad: ${d.nacionalidad}
        Ocupacion: ${d.ocupacion}
        Status: ${d.status},
        Edad: ${d.edad_mision}`,
    })
  ]
})

d3.select('#chart figure').remove()
d3.select('#chart').append(() => chart)
}