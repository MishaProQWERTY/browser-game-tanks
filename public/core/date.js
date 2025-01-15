class Date {
    constructor () {
        this.date = {
            local: { x: 0, y: 0 },
            bias: { x: 0, y: 0},
            params: undefined,
            entities: {
                player: [],
                entities: []
            },
            decor: [],
            floor: [],
            blocks: []
        }
    }

    timing () {
        fetch('http://' + id + ':3000/render?player=' + player + '&scale=' + render.scale  + '&key=' + key.key  + '&x=' + mouse.x  + '&y=' + mouse.y  + '&mouse=' + mouse.key, {
            method: 'get'
        })
        .then(response => {
            return response.json()
        })
        .then(response => {
            this.date = response
        })
    }
}