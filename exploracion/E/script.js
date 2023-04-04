d3.csv('astronautas.csv', d3.autoType).then(data => {
 

  let Pais_Genero = d3.group(data, d => d.nacionalidad, d => d.genero);
  let Cantidad = []
  for(let nacionalidad of Pais_Genero){
    let hombres = (nacionalidad[1].get("masculino").length);
    let mujeres = 0;
    if (nacionalidad[1].get("femenino") != undefined){
       mujeres = (nacionalidad[1].get("femenino").length);
    }
    Cantidad.push({nacionalidad: nacionalidad[0], cant: mujeres, genero: 'femenino'});
    Cantidad.push({nacionalidad: nacionalidad[0], cant: hombres, genero: 'masculino'});

    //console.log(mujeres);
  }
  console.log(Cantidad);
  //console.log(Cantidad[1]);
 
  //console.log(Cantidad[1].mujeres);



  let chart = Plot.plot({
    width:1000,
    line:true,
    grid:true,
    color: {
      legend: true,
      range: ["pink", "steelblue"]
    },
    x: {
      label: "Nacionalidad",
      
    },
    y: {
      label: "Misiones",
    },
    marks: [
      Plot.barY(Cantidad, {
        x: 'nacionalidad',
        y: 'cant',
        fill: "genero"
      })
    ]

  })
  d3.select('#chart').append(() => chart)


});