class Chart {
    constructor(canvas_id, param, option = {}) {
        this.canvas = document.getElementById(canvas_id)
        this.ctx = this.canvas.getContext("2d")
        this.canvas.width = this.canvas.offsetWidth
        this.canvas.height = this.canvas.offsetHeight
        this.param = param

        const defaultOption = {
            padding: {
                left: 10,
                right: 10,
                top: 10,
                bottom: 10
            },
            axis: {
                lineWidth: {
                    X: 1,
                    Y: 1
                },
                color : {
                    X: 3,
                    Y: 2
                }
            }
        }

        this.option = Object.assign(defaultOption, option)
    }


    // Chart body size
    chartBodySize() {
        return {
            WIDTH: this.canvas.width - this.option.padding.left - this.option.padding.right,
            HEIGHT: this.canvas.height - this.option.padding.top - this.option.padding.bottom,
        }
    }


    axisZone() {
        return {
            start_X: this.chartBodySize().HEIGHT + this.option.padding.top,
            start_Y: this.option.padding.left,
            end_X: this.option.padding.top,
            end_Y: this.chartBodySize().WIDTH + this.option.padding.left,
        }
    }

    axisUnit() {
        return {
            X: quantity => {
                const arr = []
                const count = this.chartBodySize().HEIGHT / quantity
                for (let i = this.axisZone().start_X; i >= this.axisZone().end_X; i -= count) {
                    arr.push(i)
                }
                return arr
            },
            Y: quantity => {
                const arr = []
                const count = this.chartBodySize().WIDTH / quantity
                for (let i = this.axisZone().start_Y; i <= this.axisZone().end_Y; i += count) {
                    arr.push(i)
                }
                return arr
            }
        }
    }


    // Draw
    drawChartBody() {
        this.ctx.rect(this.option.padding.left,
            this.option.padding.top,
            this.chartBodySize().WIDTH,
            this.chartBodySize().HEIGHT)
        this.ctx.fill()
    }

    drawChart() {
        this.chartAxisDraw().X()
        this.chartAxisDraw().Y()
    }


    chartAxisDraw() {
        return {
            X: () => {
                // this.ctx.lineWidth = this.option.axis.lineWidth.X
                this.ctx.strokeStyle = this.option.axis.color.X
                this.axisUnit().X(10).forEach(item => {
                    this.ctx.beginPath()
                    this.ctx.moveTo(this.axisZone().start_Y, item)
                    this.ctx.lineTo(this.axisZone().end_Y, item)
                    this.ctx.stroke()
                    this.ctx.closePath()
                })
            },
            Y: () => {
                // this.ctx.lineWidth = this.option.axis.lineWidth.Y
                this.ctx.strokeStyle = this.option.axis.color.Y
                this.axisUnit().Y(4).forEach(item => {
                    this.ctx.beginPath()
                    this.ctx.moveTo(item, this.axisZone().end_X)
                    this.ctx.lineTo(item, this.axisZone().start_X)
                    this.ctx.stroke()
                    this.ctx.closePath()
                })
            }
        }
    }
}