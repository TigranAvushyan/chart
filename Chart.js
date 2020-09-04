class Chart {
    constructor(canvas_id, data, option) {
        this.canvas = document.getElementById(canvas_id)
        this.ctx = this.canvas.getContext("2d")
        this.canvas.width = this.canvas.offsetWidth
        this.canvas.height = this.canvas.offsetHeight
        this.data = data
        this.option = option
        this.chartBodySize = { 
            WIDTH: this.canvas.width - this.option.padding.left - this.option.padding.right,
            HEIGHT: this.canvas.height - this.option.padding.top - this.option.padding.bottom,
        }
        
        this.chartZone = {
            left_top: {
                X: this.option.padding.left,
                Y: this.option.padding.top
            },
            left_bottom: {
                X: this.option.padding.left,
                Y: this.chartBodySize.HEIGHT + this.option.padding.top
            },
            right_top: {
                X: this.chartBodySize.WIDTH + this.option.padding.left,
                Y: this.option.padding.top
            },
            right_bottom: {
                X: this.chartBodySize.WIDTH + this.option.padding.left,
                Y: this.chartBodySize.HEIGHT + this.option.padding.top
            }
        }
        this.quantity = {
            X: 4,
            Y: this.data.reduce((maxLength, item) => {
                return maxLength.length < item.length ? item : maxLength
            }).length
        }
        this.offset = []
        this.option.dataStyle.forEach(item => {
            this.offset.push(item.animation.speed)
        })
        console.log(this.offset);
    }
    
    
    
    axisGridUnit() {
        const arrX = []
            const arrY = []
            const countY = (this.chartBodySize.HEIGHT + this.option.axis.X.grid.lineWidth) / this.quantity.X
            const countX = (this.chartBodySize.WIDTH + this.option.axis.Y.grid.lineWidth) / this.quantity.Y
            
            for (let i = this.chartZone.left_bottom.X; i <= this.chartZone.right_bottom.X; i += countX)
            arrX.push(i)
            for (let i = this.chartZone.left_bottom.Y; i >= this.chartZone.left_top.Y; i -= countY)
            arrY.push(i)
            return { X: arrX, Y: arrY }
        }
        
        
        
        // Draw
        
    drawChart() {
        this.ctx.lineCap = this.ctx.lineJoin = 'round'
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
        if(this.option.axis.X.grid.visible)
            this.axisGridDraw().X()
        if(this.option.axis.Y.grid.visible)
            this.axisGridDraw().Y()
        if(this.option.axis.X.main.visible)
            this.axisMainDraw().X()
        if(this.option.axis.Y.main.visible)
            this.axisMainDraw().Y()


        const dataCircleAndAnimation = this.dataUnit()
        dataCircleAndAnimation.forEach((item, ind) => {
            
            if (this.option.dataStyle[ind].point != undefined){
                item.forEach((data, index) => {
                    if (index != 0) {
                        this.ctx.beginPath()
                        let radius = this.option.dataStyle[ind].point.radius
                        this.ctx.fillStyle = this.option.dataStyle[ind].point.color
                        this.ctx.arc(data[0], data[1], radius, 0, 2 * Math.PI, false)
                        this.ctx.fill()
                    }
                })
            }

            setTimeout(() => {this.drawChart()}, 20)
        })
        
    }
    
    dataUnit() {
        let maxX,maxY,minX,minY
        this.data.forEach(item => {
            item.forEach(data => {
                if(data[0] >= (maxX || data[0])) {maxX = data[0]}
                if(data[1] >= (maxY || data[1])) {maxY = data[1]}
                if(data[0] <= (minX || data[0])) {minX = data[0]}
                if(data[1] <= (minY || data[1])) {minY = data[1]}
            })
        })
        const arr = []
        this.data.forEach((item, ind) => {
            const dataArr = []
            item.sort((a, b) => a[0] - b[0])
            this.ctx.beginPath()
            this.ctx.lineWidth = this.option.dataStyle[ind].lineWindt
            this.ctx.strokeStyle = this.option.dataStyle[ind].color
            this.ctx.setLineDash(this.option.dataStyle[ind].lineDash)

            if(this.option.dataStyle[ind].animation != undefined) {
                this.ctx.lineDashOffset = this.offset[ind] -= this.option.dataStyle[ind].animationSpeed
            }
            item.forEach(data => {
                let x = data[0] * (this.chartBodySize.WIDTH) / (maxX + minX)
                let y = this.chartBodySize.HEIGHT + this.option.padding.top - data[1] * (this.chartBodySize.HEIGHT) / (maxY + minY)
                if (data[0] == minX) {
                    this.ctx.moveTo(this.chartZone.left_bottom.X, y)
                    dataArr.push([this.chartZone.left_bottom.X, y])
                }
                else {
                    this.ctx.lineTo(x, y)
                    dataArr.push([x, y])
                }
                this.ctx.stroke()
            })
            arr.push(dataArr)
        })
        return arr
    }

    axisGridDraw() {
        return {
            Y: () => {
                this.ctx.lineWidth = this.option.axis.Y.grid.lineWidth
                this.ctx.strokeStyle = this.option.axis.Y.grid.color
                this.ctx.setLineDash(this.option.axis.Y.grid.lineDash)
                for (let i = 1; i < this.axisGridUnit().Y.length; i++) {
                    this.ctx.beginPath()
                    this.ctx.moveTo(this.chartZone.left_bottom.X, this.axisGridUnit().Y[i])
                    this.ctx.lineTo(this.chartZone.right_bottom.X - 15, this.axisGridUnit().Y[i])
                    this.ctx.stroke()
                }
            },
            X: () => {
                this.ctx.lineWidth = this.option.axis.X.grid.lineWidth
                this.ctx.strokeStyle = this.option.axis.X.grid.color
                this.ctx.setLineDash(this.option.axis.X.grid.lineDash)
                for (let i = 1; i < this.axisGridUnit().X.length; i++) {
                    this.ctx.beginPath()
                    this.ctx.moveTo(this.axisGridUnit().X[i], this.chartZone.left_top.Y + 15)
                    this.ctx.lineTo(this.axisGridUnit().X[i], this.chartZone.left_bottom.Y)
                    this.ctx.stroke()
                }
            }
        }
    }
    
    axisMainDraw() {
        return {
            X : () => {
                this.ctx.lineWidth = this.option.axis.X.main.lineWidth
                this.ctx.strokeStyle = this.option.axis.X.main.color
                this.ctx.setLineDash(this.option.axis.X.main.lineDash)
                this.ctx.beginPath()
                this.ctx.moveTo(this.chartZone.left_bottom.X, this.chartZone.left_bottom.Y)
                this.ctx.lineTo(this.chartZone.right_bottom.X, this.chartZone.right_bottom.Y)
                this.ctx.stroke()

                if (this.option.axis.X.main.arrow.visible){
                    const x1 = this.chartZone.right_bottom.X
                    const y1 = this.chartZone.right_bottom.Y
                    const width = this.option.axis.X.main.arrow.width
                    const angle = this.option.axis.X.main.arrow.angle
                    this.ctx.beginPath()
                    this.ctx.moveTo(x1, y1)
                    this.ctx.lineTo(x1 - width * Math.sin(angle), y1 + width * Math.cos(angle))
                    this.ctx.strokeStyle = this.option.axis.X.main.arrow.stroke.color
                
                    if(this.option.axis.Y.main.arrow.fill.visible){
                        this.ctx.lineTo(x1 + width * Math.sin(angle), y1 - width * Math.cos(angle))
                        this.ctx.closePath()
                        this.ctx.fillStyle = this.option.axis.Y.main.arrow.fill.color
                        this.ctx.fill()
                    } else { 
                        this.ctx.moveTo(x1, y1)
                        this.ctx.lineTo(x1 - width * Math.sin(angle), y1 - width * Math.cos(angle))
                    }
                    this.ctx.stroke()
                }

            },
            Y : () => {
                this.ctx.lineWidth = this.option.axis.Y.main.lineWidth
                this.ctx.strokeStyle = this.option.axis.Y.main.color
                this.ctx.setLineDash(this.option.axis.Y.main.lineDash)
                this.ctx.beginPath()
                this.ctx.moveTo(this.chartZone.left_bottom.X, this.chartZone.left_bottom.Y)
                this.ctx.lineTo(this.chartZone.left_top.X, this.chartZone.left_top.Y)
                this.ctx.stroke()

                if (this.option.axis.Y.main.arrow.visible){
                    const x1 = this.chartZone.left_top.X
                    const y1 = this.chartZone.left_top.Y
                    const width = this.option.axis.Y.main.arrow.width
                    const angle = this.option.axis.Y.main.arrow.angle
                    this.ctx.beginPath()
                    this.ctx.moveTo(x1, y1)
                    this.ctx.lineTo(x1 + width * Math.cos(angle), y1 + width * Math.sin(angle))
                    this.ctx.strokeStyle = this.option.axis.Y.main.arrow.stroke.color
                    if(this.option.axis.Y.main.arrow.fill.visible){
                        this.ctx.lineTo(x1 - width * Math.cos(angle), y1 + width * Math.sin(angle))
                        this.ctx.closePath()
                        this.ctx.fillStyle = this.option.axis.Y.main.arrow.fill.color
                        this.ctx.fill()
                    } else { 
                        this.ctx.moveTo(x1, y1)
                        this.ctx.lineTo(x1 - width * Math.cos(angle), y1 + width * Math.sin(angle))
                    }
                    this.ctx.stroke()
                }
            }
        }
    }
}