module.exports.physics = function physics (world) {
    if (world.params.time < 3000) world.params.time++
    else world.params.time = 0

    collider(world)
    move(world)
}

function collider (world) {
    for (let i = 0; i < world.entities.player.length; i++) {
        let player = world.entities.player[i]
        if (player.vector.x > 0 && world.date.blocks[Math.ceil(player.local.x + player.vector.x)][Math.ceil(player.local.y)] != null)
            player.vector.x = 0
        if (player.vector.x < 0 && world.date.blocks[Math.ceil(player.local.x - player.vector.x)][Math.ceil(player.local.y)] != null)
            player.vector.x = 0
        if (player.vector.y > 0 && world.date.blocks[Math.ceil(player.local.x)][Math.ceil(player.local.y + player.vector.y)] == null)
            player.vector.y = 0
        if (player.vector.y < 0 && world.date.blocks[Math.ceil(player.local.x)][Math.ceil(player.local.y - player.vector.y)] == null)
            player.vector.y = 0
    }

    for (let i = 0; i < world.entities.entities.length; i++) {
        let player = world.entities.entities[i]
        if (player.vector.x > 0 && world.date.blocks[Math.ceil(player.local.x + player.vector.x)][Math.ceil(player.local.y)] != null)
            player.vector.x = -player.vector.x
        if (player.vector.x < 0 && world.date.blocks[Math.ceil(player.local.x - player.vector.x)][Math.ceil(player.local.y)] != null)
            player.vector.x = -player.vector.x
        if (player.vector.y > 0 && world.date.blocks[Math.ceil(player.local.x)][Math.ceil(player.local.y + player.vector.y)] == null)
            player.vector.y = -player.vector.y
        if (player.vector.y < 0 && world.date.blocks[Math.ceil(player.local.x)][Math.ceil(player.local.y - player.vector.y)] == null)
            player.vector.y = -player.vector.y
    }
}

function move (world) {
    for (let i = 0; i < world.entities.player.length; i++) {
        let player = world.entities.player[i]
        player.local.x += player.vector.x
        player.local.y += player.vector.y
    }

    for (let i = 0; i < world.entities.entities.length; i++) {
        let player = world.entities.entities[i]
        player.local.x += player.vector.x
        player.local.y += player.vector.y
    }
}