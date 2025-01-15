const decor = require('./decor')
const floor = require('./floor')
const blocks = require('./blocks')
const structure = require('./structure')
const entities = require('./entities')
const ai = require('./src/ai')

module.exports.createworld = function createworld (sid, size) {
    let date = {
        decor: [],
        floor: [],
        blocks: []
    }

    for (let x = 0; x < size.x; x++) {
        date.decor.push([])
        date.floor.push([])
        date.blocks.push([])
        for (let y = 0; y < size.y; y++) {
            date.decor[x][y] = null
            date.floor[x][y] = floor.turf()
            date.blocks[x][y] = null
        }
    }

    for (let i = 0; i < Math.floor(sid * 100) + 30; i++) {
        let randomx = Math.floor(Math.random() * size.x),
            randomy = Math.floor(Math.random() * size.y)
        date.floor[randomx][randomy] = 3
    }

    for (let i = 0; i < Math.floor(sid * 17) + 10; i++) {
        let plateau = structure.plateau()
        let randomx = Math.floor(Math.random() * (size.x - 20)),
            randomy = Math.floor(Math.random() * (size.y - 20))
        for (let x = 0; x < plateau.length; x++) {
            for (let y = 0; y < plateau[x].length; y++) {
                if (plateau[x][y] != null) date.floor[randomx+x][randomy+y] = plateau[x][y]
            }
        }
    }

    for (let i = 0; i < Math.floor(sid * 40) + 20; i++) {
        let wood = structure.wood()
        let randomx = Math.floor(Math.random() * (size.x - 20)),
            randomy = Math.floor(Math.random() * (size.y - 20))
        for (let x = 0; x < wood.length; x++) {
            for (let y = 0; y < wood[x].length; y++) {
                date.blocks[randomx+x][randomy+y] = wood[x][y]
            }
        }
    }

    let home = structure.home()
    for (let x = 0; x < home.length; x++) {
        for (let y = 0; y < home[x].length; y++) {
            date.blocks[23 + x][23 + y] = home[x][y]
        }
    }
    
    return date
}

module.exports.addplayer = function addplayer (player) {
    return entities.addplayer(player)
}

module.exports.update = function update (world) {

    if (world.params.time < 3000) world.params.time++
    else world.params.time = 0

    decor.update(world)
    floor.update(world)
    blocks.update(world)
    entities.update(world)

}