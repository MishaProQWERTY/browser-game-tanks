function ranBlc (items) {
    return items[Math.floor(Math.random()*items.length)]
}

module.exports.wood = function wood() {
    let woodmass = [[ranBlc([null, 2, 3, 1]),ranBlc([null, 2]),ranBlc([null, 2]),ranBlc([null, 2]),ranBlc([null, 2])],
                    [ranBlc([null, 2]),ranBlc([null, 2]),2,ranBlc([null, 2]),ranBlc([null, 2])],
                    [ranBlc([null, 2]),2,2,1,ranBlc([null, 2])],
                    [ranBlc([null, 2, 3]),ranBlc([null, 2]),ranBlc([1, 2, 3]),ranBlc([null, 2]),ranBlc([null, 2])],
                    [ranBlc([null, 2, 4]),ranBlc([null, 2]),ranBlc([null, 2, 3]),ranBlc([null, 2]),ranBlc([null, 2])]]
    return woodmass
}

module.exports.home = function home() {
    return [[3, 3, 3, null, 3, 3, 3],
            [3, null, null, null, null, null, 3],
            [3, null, null, null, null, null,, 3],
            [null, null, null, null, null, null,, null],
            [3, null, null, null, null, null,, 3],
            [3, null, null, null, null, 4,, 3],
            [3, 3, 3, null, 3, 3, 3]]
}

module.exports.plateau = function plateau() {
    return [
        [null, 1, null],
        [1, 1, null],
        [1, 1, 1],
        [1, 1, null],
    ]
}