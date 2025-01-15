const game = require('../assets/game')
const fs = require('fs')

module.exports.world = class World {
    constructor () {
        this.file = {
            params: undefined,
            entities: undefined,
            date: undefined
        }
        this.timing = 1000/60
        this.timingsaves = 5000
        this.tick
        this.saves
    }

    open (name) {
        this.file.date = JSON.parse(fs.readFileSync(`./world/${name}/date.json`, 'utf8'))
        this.file.entities = JSON.parse(fs.readFileSync(`./world/${name}/entities.json`, 'utf8'))
        this.file.params = JSON.parse(fs.readFileSync(`./world/${name}/params.json`, 'utf8'))
        this.tick = setInterval(() => { game.update(this.file) }, this.timing)
        this.saves = setInterval(() => {
            fs.writeFileSync(`./world/${name}/date.json`, JSON.stringify(this.file.date))
            fs.writeFileSync(`./world/${name}/entities.json`, JSON.stringify(this.file.entities))
            fs.writeFileSync(`./world/${name}/params.json`, JSON.stringify(this.file.params))
        }, this.timingsaves)
    }

    players () {
        let players = []
        for (let i = 0; i < this.file.entities.player.length; i++) {
            players.push(this.file.entities.player[i].name)
        }
        return players
    }

    addplayer (name) {
        this.file.entities.player.push(game.addplayer(name))
    }

    senddate (req) {
        let date = {
            local: { x: 0, y: 0 },
            bias: { x: 0, y: 0 },
            params: this.file.params,
            entities: {
                player: [],
                entities: []
            },
            decor: [],
            floor: [],
            blocks: []
        }

        let playerworld = this.file.entities.player.find(el => el.name == req.player.name)
        if (playerworld != undefined) {
            playerworld.key = req.key
            playerworld.scale = req.scale
            playerworld.mouse.x = req.mouse.x
            playerworld.mouse.y = req.mouse.y
            playerworld.mouse.key = req.mouse.key
            date.local.x = playerworld.local.x - playerworld.vision.l * req.scale
            date.local.y = playerworld.local.y - playerworld.vision.t * req.scale
            date.bias.x = playerworld.local.x - Math.floor(playerworld.local.x)
            date.bias.y = playerworld.local.y - Math.floor(playerworld.local.y)
            for (let x = 0; x < this.file.date.decor.length; x++) {
                if ((x <= playerworld.local.x + (playerworld.vision.r * req.scale) 
                && x >= playerworld.local.x - (playerworld.vision.l * req.scale))) {
                    date.decor.push([])
                    for (let y = 0; y < this.file.date.decor[x].length; y++) {
                        if ((y <= playerworld.local.y + (playerworld.vision.b * req.scale) 
                        && y >= playerworld.local.y - (playerworld.vision.t * req.scale))) {
                            date.decor[date.decor.length-1].push(this.file.date.decor[x][y])
                        }
                    }
                }
            }


            for (let x = 0; x < this.file.date.blocks.length; x++) {
                if ((x <= playerworld.local.x + (playerworld.vision.r * req.scale) 
                && x >= playerworld.local.x - (playerworld.vision.l * req.scale))) {
                    date.blocks.push([])
                    for (let y = 0; y < this.file.date.blocks[x].length; y++) {
                        if ((y <= playerworld.local.y + (playerworld.vision.b * req.scale) 
                        && y >= playerworld.local.y - (playerworld.vision.t * req.scale))) {
                            date.blocks[date.blocks.length-1].push(this.file.date.blocks[x][y])
                        }
                    }
                }
            }

            for (let x = 0; x < this.file.date.floor.length; x++) {
                if ((x <= playerworld.local.x + (playerworld.vision.r * req.scale) 
                && x >= playerworld.local.x - (playerworld.vision.l * req.scale))) {
                    date.floor.push([])
                    for (let y = 0; y < this.file.date.floor[x].length; y++) {
                        if ((y <= playerworld.local.y + (playerworld.vision.b * req.scale) 
                        && y >= playerworld.local.y - (playerworld.vision.t * req.scale))) {
                            date.floor[date.floor.length-1].push(this.file.date.floor[x][y])
                        }
                    }
                }
            }

            for (let i = 0; i < this.file.entities.player.length; i++) {
                let player = this.file.entities.player[i]
                if ((player.local.x <= playerworld.local.x + (playerworld.vision.r * req.scale) 
                && player.local.x >= playerworld.local.x - (playerworld.vision.l * req.scale)) 
                && (player.local.y <= playerworld.local.y + (playerworld.vision.b * req.scale) 
                && player.local.y >= playerworld.local.y - (playerworld.vision.t * req.scale))) {
                    date.entities.player.push(player)
                }
            }

            for (let i = 0; i < this.file.entities.entities.length; i++) {
                let player = this.file.entities.entities[i]
                if ((player.local.x <= playerworld.local.x + (playerworld.vision.r * req.scale) 
                && player.local.x >= playerworld.local.x - (playerworld.vision.l * req.scale)) 
                && (player.local.y <= playerworld.local.y + (playerworld.vision.b * req.scale) 
                && player.local.y >= playerworld.local.y - (playerworld.vision.t * req.scale))) {
                    date.entities.entities.push(player)
                }
            }

            for (let i = 0; i < this.file.entities.mobs.length; i++) {
                let player = this.file.entities.mobs[i]
                if ((player.local.x <= playerworld.local.x + (playerworld.vision.r * req.scale) 
                && player.local.x >= playerworld.local.x - (playerworld.vision.l * req.scale)) 
                && (player.local.y <= playerworld.local.y + (playerworld.vision.b * req.scale) 
                && player.local.y >= playerworld.local.y - (playerworld.vision.t * req.scale))) {
                    date.entities.mobs.push(player)
                }
            }
        }

        return date
    }
}

module.exports.create = function create (name, sizeWorld = { x: 100, y: 100 }, sid = Math.random()) {
    fs.mkdirSync(`./world/${name}`)
    fs.writeFileSync(`./world/${name}/params.json`, JSON.stringify({
        name: name,
        sid: sid,
        spawn: { x: 0, y: 0 },
        time: 0,
        size: { x: sizeWorld.x, y: sizeWorld.y }
    }))

    const datetext = game.createworld(sid, sizeWorld)

    fs.writeFileSync(`./world/${name}/entities.json`, JSON.stringify({
        player: [],
        entities: [],
        mobs: []
    }))

    fs.writeFileSync(`./world/${name}/date.json`, JSON.stringify(datetext))
}

module.exports.worlds = function worlds () {
    const elements = fs.readdirSync('./world/')
    const files = []
    elements.forEach(element => {
        files.push(element.substring(0, element.length))
    })
    return files
}