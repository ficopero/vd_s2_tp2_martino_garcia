d3.csv('astronautas.csv', d3.autoType).then(data => {


  let Pais_Genero = d3.group(data, d => d.nacionalidad, d => d.genero);
  console.log(Pais_Genero.get("Italia").get("masculino").length);
  let Proporciones = [];
  for(let nacionalidad of Pais_Genero){
    let hombres = (nacionalidad[1].get("masculino").length);
    let mujeres = 0;
    if (nacionalidad[1].get("femenino") != undefined){
       mujeres = (nacionalidad[1].get("femenino").length);
    }
    let proporcion = mujeres/(hombres + mujeres);
    Proporciones.push({nacionalidad: nacionalidad[0], proporcion: proporcion});
  }
  console.log(Proporciones);

  let chart = Plot.plot({
    line:true,
    marginLeft: 100,
    color: {
      legend: true,
    },
    y: {
      label: "Nacionalidad",
      domain: d3.sort(Proporciones,(a, b) => d3.descending(a.proporcion, b.proporcion)).map(d => d.nacionalidad)
    },
    marks: [
      Plot.barX(Proporciones, {
        x: 'proporcion',
        y: 'nacionalidad',
        fill: 'nacionalidad'
      })
    ]

  })
  d3.select('#chart').append(() => chart)

})
