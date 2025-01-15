const server = require('./src/world-server')
const worldFile = new server.world()
const express = require('express')
const app = express()
const serverworld = express()

app.set('views', './views')
app.set('view engine', 'ejs')

app.use(express.static('public'))
app.use(express.static('resourcepacks'))

app.use((req, res, next) => {
    res.set({
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type, X-Requested-With, Authorization',
        'Access-Control-Allow-Methods': 'GET, POST, DELETE, PUT, PATCH',
    })
    next()
})

serverworld.use((req, res, next) => {
    res.set({
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type, X-Requested-With, Authorization',
        'Access-Control-Allow-Methods': 'GET, POST, DELETE, PUT, PATCH',
    })
    next()
})

app.get('/', (req, res) => {
    res.render('index', { worlds: server.worlds() })
})

app.get('/game', (req, res) => {
    res.render('game', { world: req.query.world, player: req.query.player, id: req.query.id })
})

let flagid = false
app.get('/world-server/:id', (req, res) => {
    if (flagid) return
    serverworld.listen(3000, req.params.id)
    flagid = true
})

serverworld.get('/render', (req, res) => {
    let date = {
        player: { name: req.query.player },
        scale: req.query.scale,
        key: req.query.key ,
        mouse: { x: req.query.x, y: req.query.y, key: req.query.mouse }
    }
    if (date.player.name != undefined 
        && date.scale != undefined
        && date.key != undefined
        && date.mouse.x != undefined
        && date.mouse.y != undefined
        && date.mouse.key != undefined) res.json( worldFile.senddate(date) )
})

serverworld.get('/create', (req, res) => {
    if (server.worlds().indexOf(req.query.world) == -1 && req.query.world != undefined) server.create(req.query.world, { x: req.query.x, y: req.query.y }, req.query.sid)
    worldFile.open(req.query.world)
})

serverworld.get('/player', (req, res) => {
    if (worldFile.players().indexOf(req.query.player) == -1 && req.query.player != undefined) worldFile.addplayer(req.query.player)
})

app.listen(5000, 'localhost')