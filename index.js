function createChart() {
    const chart = new Chart("chart", [
        [
            [1,2],[4,10],[5,6],[7,1],[8,3]
        ],
        [
            [5,2],[1,10],[7,6],[6,1],[10,3]
        ]
    ],{
        padding: {
            left: 5,
            right: 5,
            bottom: 5,
            top: 5
        },
        dataStyle: [
            {
                color: "red",
                lineWindt: 3,
                lineDash: [5, 6],
                animation: {
                    speed: 2
                },
                point: {
                    radius: 8,
                    color: "yellow"
                }
            },
            {
                color: "blue",
                lineWindt: 1,
                lineDash: [2,8],
                animation: {
                    speed: 2
                }
            },
        ],
        axis: {
            X: {
                grid: {
                    lineDash: [],
                    visible: true,
                    color: "black",
                    lineWidth: 1,
                    name: {
                        visible: true,
                        fontSize: 16,
                        color: "black",
                        fontFamily: "Roboto"
                    }
                },
                main: {
                    arrow: {
                        width: 5,
                        visible: true,
                        angle: 45,
                        stroke: {
                            color: "black"
                        },
                        fill: {
                            visible: false,
                            color: "black"
                        }
                    },
                    lineDash: [],
                    visible: true,
                    color: "black",
                    lineWidth: 1,
                    name: {
                        visible: true,
                        fontSize: 16,
                        color: "black",
                        fontFamily: "Roboto"
                    }
                },
            },
            Y: {
                grid: {
                    lineDash: [],
                    visible: true,
                    color: "black",
                    lineWidth: 1,
                    name: {
                        visible: true,
                        fontSize: 16,
                        color: "black",
                        fontFamily: "Roboto"
                    }
                },
                main: {
                    arrow: {
                        width: 5,
                        visible: true,
                        angle: 45,
                        stroke: {
                            color: "black"
                        },
                        fill: {
                            visible: false,
                            color: "black"
                        }
                    },
                    lineDash: [],
                    visible: true,
                    color: "black",
                    lineWidth: 1,
                    name: {
                        visible: true,
                        fontSize: 16,
                        color: "black",
                        fontFamily: "Roboto"
                    }
                },
            },
        }
    })
    chart.drawChart()
}
createChart()