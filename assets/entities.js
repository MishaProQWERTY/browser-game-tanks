module.exports.fireball = function fireball(time, lx, ly, sx, sy) {
    return {
        type: 'fireball',
        local: { x: lx, y: ly },
        vector: { x: sx, y: sy },
        time: time
    }
}

module.exports.panzer = function panzer (player) {
    return {
        name: player,
        tipe: 0,
        recharge: 0,
        local: { x: 25, y: 25 },
        scale: 1,
        live: {
            ai: undefined,
            vision: { l: 3, t: 3, r: 3, b: 3 },
            vector: { x: 0.06, y: 0.06 },
        }
    }
}

/*module.exports.ai = function ai(ai) {
    return {
        type: 'ai',
        local: { x: 20, y: 20 },
        vector: { x: 0.1, y: 0.1 },
        ai: new ai(2, 4, 0.3, [4, 4])
    }
}*/

module.exports.addplayer = function addplayer (player) {
    return {
        name: player,
        tipe: 0,
        recharge: 0,
        spawn: { x: 25, y: 25 },
        local: { x: 25, y: 25 },
        key: '',
        mouse: { x: 0, y: 0, key: 0 },
        scale: 1,
        vision: { l: 8, t: 5, r: 9, b: 5 },
        vector: { x: 0.06, y: 0.06 }
    }
}

module.exports.update = function update(world, ai) {
    for (let i = 0; i < world.entities.player.length; i++) {
        let player = world.entities.player[i]

        if (world.date.blocks[Math.ceil(player.local.x + 0.5 - player.vector.x)][Math.ceil(player.local.y)] == null && player.local.x + ((player.vision.r)*player.scale) < world.params.size.x && ~player.key.indexOf('KeyD')) {
            player.local.x += player.vector.x
            player.type = 2
        }

        else if (world.date.blocks[Math.ceil(player.local.x)][Math.ceil(player.local.y + 0.5 - player.vector.y)] == null && player.local.y + ((player.vision.b)*player.scale) < world.params.size.y && ~player.key.indexOf('KeyS')) {
            player.local.y += player.vector.y
            player.type = 3
        } 

        else if (world.date.blocks[Math.ceil(player.local.x - 0.5 + player.vector.x)][Math.ceil(player.local.y)] == null && player.local.x - ((player.vision.l)*player.scale) > 0 && ~player.key.indexOf('KeyA')) {
            player.local.x -= player.vector.x
            player.type = 4
        }

        else if (world.date.blocks[Math.ceil(player.local.x)][Math.ceil(player.local.y - 0.5 + player.vector.y)] == null && player.local.y - ((player.vision.t)*player.scale) > 0 && ~player.key.indexOf('KeyW')) {
            player.local.y -= player.vector.y
            player.type = 1
        }

        if (player.mouse.key == 1) {
            player.local.x = player.spawn.x
            player.local.y = player.spawn.y
        }

        if (~player.key.indexOf('Space') && player.recharge == 0) {
            player.recharge = 22

            let fibVector = { x: 0 , y: 0 }

            if (player.type == 1) {
                fibVector.x = 0
                fibVector.y = -0.2
            }
            if (player.type == 2) {
                fibVector.x = 0.2
                fibVector.y = 0
            }
            if (player.type == 3) {
                fibVector.x = 0
                fibVector.y = 0.2
            }
            if (player.type == 4) {
                fibVector.x = -0.2
                fibVector.y = 0
            }

            world.entities.entities.push(this.fireball(world.params.time, player.local.x + fibVector.x, player.local.y + fibVector.y, fibVector.x, fibVector.y))
        }

        if (world.date.floor[Math.ceil(player.local.x)][Math.ceil(player.local.y)] == 3) {
            player.vector.x = 0.02
            player.vector.y = 0.02
        }
        else {
            player.vector.x = 0.1
            player.vector.y = 0.1
        }

        if (player.recharge != 0) player.recharge--

    }

    for (let i = 0; i < world.entities.entities.length; i++) {
        let entitie = world.entities.entities[i]
        if (entitie.type == 'fireball') {
            entitie.local.x += entitie.vector.x
            entitie.local.y += entitie.vector.y
            if (world.params.time - entitie.time > 65) world.entities.entities.splice(i, 1)

            if (world.date.blocks[Math.ceil(entitie.local.x)][Math.ceil(entitie.local.y)] == 4) {
                let boom = [
                    [null, null, null, null],
                    [null, null, null, null],
                    [null, null, null, null],
                    [null, null, null, null],
                ]
                for (let x = 0; x < boom.length; x++) {
                    for (let y = 0; y < boom[x].length; y++) {
                        world.date.blocks[Math.ceil(entitie.local.x) - 2 + x][Math.ceil(entitie.local.y) - 2 + y] = boom[x][y]
                    }
                }
            }

            if (world.date.blocks[Math.ceil(entitie.local.x)][Math.ceil(entitie.local.y)] != null) {
                if (world.date.blocks[Math.ceil(entitie.local.x)][Math.ceil(entitie.local.y)] != 3) world.date.blocks[Math.ceil(entitie.local.x)][Math.ceil(entitie.local.y)] = null
                world.entities.entities.splice(i, 1)
            }
        }

        /*if (entitie.type == 'ai') {
            let neurons = ai.predict([entitie.local.x / 100, entitie.local.y / 100], entitie.ai)
            let neuron = neurons[0]
            for (let i = 0; i < neurons.length; i++) {
                if (neurons[i].output > neuron.output) neuron = neurons[i]
            }
            if (neuron == neurons[0]) entitie.local.x += entitie.vector.x
            if (neuron == neurons[1]) entitie.local.x -= entitie.vector.x
            if (neuron == neurons[2]) entitie.local.y += entitie.vector.y
            if (neuron == neurons[3]) entitie.local.y -= entitie.vector.y
        }*/

        if (entitie.local.x + entitie.vector.x > world.params.size.x - 2) entitie.local.x = world.params.size.x
        if (entitie.local.x - entitie.vector.x < 5) entitie.local.x = 5
        if (entitie.local.y + entitie.vector.y > world.params.size.y - 2) entitie.local.y = world.params.size.y
        if (entitie.local.y - entitie.vector.y < 5) entitie.local.y = 5
    }

    for (let i = 0; i < world.entities.mobs.length; i++) {
        let mobs = world.entities.mobs[i]

        if (mobs.local.x > world.params.size.x - 2) mobs.local.x = world.params.size.x
        if (mobs.local.x < 5) mobs.local.x = 5
        if (mobs.local.y > world.params.size.y - 2) mobs.local.y = world.params.size.y
        if (mobs.local.y < 5) mobs.local.y = 5
    }
}