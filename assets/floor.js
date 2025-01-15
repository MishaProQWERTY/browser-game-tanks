module.exports.earth = function earth () { return 1 }
module.exports.turf = function turf () { return 2 }
module.exports.gravel = function gravel () { return 3 }

module.exports.update = function update(world) {
    for (let x = 0; x < world.date.floor.length; x++) {
        for (let y = 0; y < world.date.floor[x].length; y++) {
            let floor = world.date.floor[x][y]
            if (floor == 1) {
                
            }
        }
    }
}