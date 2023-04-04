d3.csv('astronautas.csv', d3.autoType).then(data => {

  let chart = Plot.plot({
    marks: [
      Plot.dot(data, {
        x: "edad_mision",
        y: "mision_hs",
        fill: "nacionalidad",
        title: "nacionalidad"
      }),
    ],
    grid: true,
    line: true,
    nice: true,
    color: {
      legend: true,
    },
  });
 
  d3.select('#chart').append(() => chart)

 })