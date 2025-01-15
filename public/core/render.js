class Render {
    constructor () {
        this.scale = 1
        this.blocks = { numberw: 16, numberh: 9, width: 0, height: 0 }
    }

    initsize (canvas) {
        this.blocks.width = canvas.width / (this.blocks.numberw * this.scale)
        this.blocks.height = canvas.height / (this.blocks.numberh * this.scale)
    }

    x (x) {
        return (x-date.date.bias.x)*this.blocks.width
    }

    y (y) {
        return (y-date.date.bias.y)*this.blocks.height
    }
}