
    const x = fetch("https://my.api.mockaroo.com/Cars.json?key=c683f360")
    .then((response) => response.json()) 
    .then((data) => {

        const tabela = document.getElementById("tabela");
        data.forEach((item) => {           
        
        const tr = document.createElement("tr");
        tabela.appendChild(tr);

        for (const [key,value] of Object.entries(item)) 
        {
            const td = document.createElement("td");
            td.textContent = value; 

            tr.appendChild(td);
        }
        
        });


        const carsPerYear = {}; 
        const colors = {};  


        const barChart = document.getElementById("bar");
        const lineChartCtx = document.getElementById("line").getContext("2d");
        const pieChart = document.getElementById("pie");

        


//BAR CHART 
        var carCount = {};
        data.forEach((item) => {
            if(carCount[item.Brand]) {
                carCount[item.Brand]++;
            } else {
                carCount[item.Brand] = 1;
            }
        });
        console.log(carCount);

        new Chart(barChart, {
            type: "bar",
            data: {
                datasets: [{
                    label: "Cars per Brand",
                    data: carCount,
                }],
            },
            options: {
                scales: {
                    y: {
                        beginAtZero: true,
                        title: {
                            display: true,
                            text: "Number of Cars",
                        },
                    },
                    x: {
                        title: {
                            display: true,
                            text: "Brand",
                        },
                        ticks:
                        {
                            autoSkip: false
                        },
                    },
                },
            },
        });
        
//PIE CHART
        data.forEach((item) => {
            if (colors[item.Color]) {
                colors[item.Color] += 1;
            } else {
                colors[item.Color] = 1;
            }
        });


            const colorLabels = Object.keys(colors);
            const colorCounts = Object.values(colors);



            function convertColorNamesToHex(colorNames) {
                const colorValues = [];
                colorNames.forEach((colorName) => {
                    const span = document.createElement('span');
                    span.style.color = colorName;
                    document.body.appendChild(span);
                    const computedColor = getComputedStyle(span).color;
                    document.body.removeChild(span);
                    colorValues.push(computedColor);
                });
                return colorValues;
            }



        const colorPalette = convertColorNamesToHex(colorLabels);


            new Chart(pieChart, {
                type: "pie",
                data: {
                    labels: colorLabels,
                    datasets: [{
                        label: "Cars per Color",
                        data: colorCounts,
                        backgroundColor: colorPalette,
                    }],
                },
            });
       
        
//LINE CHART
        
        data.forEach((item) => {
        
            if (carsPerYear[item.Year]) {
                carsPerYear[item.Year] += 1;
            } else {
                carsPerYear[item.Year] = 1;
            }
        });

    
        const years = Object.keys(carsPerYear);
        const carCounts = Object.values(carsPerYear);

        new Chart(lineChartCtx, {
            type: "line",
            data: {
                labels: years,
                datasets: [{
                    label: "Cars per Year",
                    data: carCounts,
                    backgroundColor: "rgba(54, 162, 235, 0.2)",
                    borderColor: "rgba(54, 162, 235, 1)",
                    borderWidth: 1,
                }],
            },
            options: {
                scales: {
                    y: {
                        beginAtZero: true,
                        title: {
                            display: true,
                            text: "Number of Cars",
                        },
                    },
                    x: {
                        title: {
                            display: true,
                            text: "Year",
                        },
                    },
                },
            },
        });

    });