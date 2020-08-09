function createChart() {
    const chart = new Chart("chart", 2,{
        padding: {
            left: 100,
            right: 50,
        },
        axis: {
            lineWidth: {
                X: 1,
                Y: 1
            },
        }
    })

    console.log(chart.option)
}

window.addEventListener("resize", createChart)
window.addEventListener("load", createChart)