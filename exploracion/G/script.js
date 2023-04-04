d3.csv('astronautas.csv', d3.autoType).then(data => {

  data = data.filter(d => d.nacionalidad == "U.S.S.R/Rusia" || d.nacionalidad =="EE.UU.");
  let Pais_Genero = d3.group(data, d => d.nacionalidad, d => d.genero);
  let Cantidad = []
  console.log(Pais_Genero);
  for(let nacionalidad of Pais_Genero){
    console.log(nacionalidad);
    let hombres = (nacionalidad[1].get("masculino").length);
    let mujeres = 0;
    if (nacionalidad[1].get("femenino") != undefined){
       mujeres = (nacionalidad[1].get("femenino").length);
    }
    console.log(hombres);
    Cantidad.push({nacionalidad: nacionalidad[0], cant: mujeres, genero: 'femenino'});


  }



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
      
    },
    y: {
      label: "",
    },
    marks: [
      Plot.barY(Cantidad, {
        x: 'nacionalidad',
        y: 'cant',
        fill: 'nacionalidad',
      })
    ]

  })
  d3.select('#chart').append(() => chart)

});