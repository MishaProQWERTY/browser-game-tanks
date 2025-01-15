const display = new Display()
const key = new Key()

window.addEventListener("keydown", function (event) {
    if (key.key.indexOf(event.code) == -1) key.key.push(event.code)
})

window.addEventListener("keyup", function (event) {
    let keynew = []
    for (let i = 0; i < key.key.length; i++) {
        if (key.key[i] != event.code) keynew.push(key.key[i])
    }
    key.key = keynew
})

const mouse = new Mouse()

window.addEventListener("mousemove", function (event) {
    mouse.x = Math.floor(event.screenX/render.blocks.width) + 1
    mouse.y = Math.floor(event.screenY/render.blocks.height) - 1
})

window.addEventListener("mousedown", function (event) {
    mouse.key = event.button
})

window.addEventListener("mouseup", function (event) {
    mouse.key = 4
})

const date = new Date()
const render = new Render()

render.initsize(display.canvas)

const start = setInterval(function () {
    date.timing()

    display.ctx.fillStyle = "black"
    display.ctx.fillRect(0, 0, display.canvas.width, display.canvas.height)

    for (let x = 0; x < date.date.floor.length; x++) {
        for (let y = 0; y < date.date.floor[x].length; y++) {
            let floor = date.date.floor[x][y]
            if (floor == null) continue
            let img = new Image()
            img.src = `/floor/${floor}.png`
            display.ctx.drawImage(img, render.x(x), render.y(y), render.blocks.width, render.blocks.height)
        }
    }

    for (let x = 0; x < date.date.blocks.length; x++) {
        for (let y = 0; y < date.date.blocks[x].length; y++) {
            let blocks = date.date.blocks[x][y]
            if (blocks == null) continue
            let img = new Image()
            img.src = `/blocks/${blocks}.png`
            display.ctx.drawImage(img, render.x(x), render.y(y), render.blocks.width, render.blocks.height)
        }
    }

    for (let x = 0; x < date.date.decor.length; x++) {
        for (let y = 0; y < date.date.decor[x].length; y++) {
            let decor = date.date.decor[x][y]
            if (decor == null) continue
            let img = new Image()
            img.src = `/decor/${decor}.png`
            display.ctx.drawImage(img, render.x(x), render.y(y), render.blocks.width, render.blocks.height)
        }          
    }

    for (let i = 0; i < date.date.entities.player.length; i++) {
        let player = date.date.entities.player[i]
        let img = new Image()
        img.src = `/player/${player.type}.png`
        display.ctx.drawImage(img, (player.local.x-date.date.local.x)*render.blocks.width-render.blocks.width/2, (player.local.y-date.date.local.y)*render.blocks.height-render.blocks.height/2, render.blocks.width, render.blocks.height)
    }

    for (let i = 0; i < date.date.entities.entities.length; i++) {
        let entities = date.date.entities.entities[i]
        let img = new Image()
        img.src = `/entities/${entities.type}.png`
        display.ctx.drawImage(img, (entities.local.x-date.date.local.x)*render.blocks.width-render.blocks.width/2, (entities.local.y-date.date.local.y)*render.blocks.height-render.blocks.height/2, render.blocks.width, render.blocks.height)
    }

    for (let i = 0; i < date.date.entities.mobs.length; i++) {
        let mobs = date.date.entities.mobs[i]
        let img = new Image()
        img.src = `/mobs/${mobs.type}.png`
        display.ctx.drawImage(img, (mobs.local.x-date.date.local.x)*render.blocks.width-render.blocks.width/2, (mobs.local.y-date.date.local.y)*render.blocks.height-render.blocks.height/2, render.blocks.width, render.blocks.height)
    }
    
    display.ctx.fillStyle = "black"
    display.ctx.strokeRect(render.x(mouse.x), render.y(mouse.y), render.blocks.width, render.blocks.height)

}, display.frequency)

window.addEventListener('resize', () => {
    display.initsize()
    render.initsize(display.canvas)
})