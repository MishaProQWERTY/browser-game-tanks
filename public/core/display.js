class Display {
    constructor () {
        this.canvas = document.getElementById('canvas')
        this.ctx = canvas.getContext('2d')

        this.frequency = 1000/60

        this.canvas.oncontextmenu = function(e) { e.preventDefault(); e.stopPropagation(); }
        this.initsize()
    }

    initsize () {
        this.canvas.width = document.documentElement.clientWidth
        this.canvas.height = document.documentElement.clientHeight
    }
}