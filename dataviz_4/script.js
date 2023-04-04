let chart;
let data;

d3.csv('astronautas.csv', d3.autoType).then(dataChart => {
  data = dataChart;
  createChart();
});

function createChart() {
  let dataFilter = data.filter(d => d.nacionalidad == "EE.UU.");
  dataFilter = dataFilter.filter(d => d.genero == "femenino");

  // Buscar el objeto con nacionalidad "U.S.S.R/Rusia" y género "femenino"
  let dataFilter2 = data.filter(d => d.nacionalidad == "U.S.S.R/Rusia");
  dataFilter2 = dataFilter2.filter(d => d.genero == "femenino");
  

  // Si existe, removerlo del arreglo y asignarle una posición central en la gráfica
  let Centro = dataFilter2[0];
    Centro.x = 500 / 2;
    Centro.y = 500 / 2;
  

  console.log(dataFilter);
  console.log(dataFilter2);
  var radio = 200;
  var angulo = (2 * Math.PI) / 16;
  for (let i = 0; i < dataFilter.length; i++) {
    var x = Math.round(500 / 2 + radio * Math.cos(i * angulo));
    var y = Math.round(500 / 2 + radio * Math.sin(i * angulo));
    console.log(dataFilter[i].nacionalidad);
    dataFilter[i]["x"] = x;
    dataFilter[i]["y"] = y;
  }

  // Agregar el objeto central (si existe) al arreglo de objetos a graficar
  let marks = [];
    marks.push(
      Plot.dot([Centro], {
        x: 'x',
        y: 'y',
        fill: 'nacionalidad',
        r: 12,
        title: (d) =>
          `${d.nombre}
          Ocupacion: ${d.ocupacion}
          Status: ${d.status}
          Edad mision: ${d.edad_mision}
          Año mision: ${d.anio_mision}`,
      })
    );
  
  marks.push(
    Plot.dot(dataFilter, {
      x: 'x',
      y: 'y',
      fill: 'nacionalidad',
      r: 12,
      title: (d) =>
        `${d.nombre}
        Ocupacion: ${d.ocupacion}
        Status: ${d.status}
        Edad mision: ${d.edad_mision}
        Año mision: ${d.anio_mision}`,
    })
  );

  chart = Plot.plot({
    marginLeft: 15,
    height: 280,
    width: 280,
    color: {
      range: ["#32458A", "#E43D3F"],
    },
    y: {
      label: "",
      ticks: 0,
    },
    x: {
      label: "",
      ticks: 0,
    },
    marks: marks,
  });

  d3.select('#chart').append(() => chart);
}
