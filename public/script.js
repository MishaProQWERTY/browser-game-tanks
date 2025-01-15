const toplay = {
    flag: true,
    world: 'My map',
    sid: undefined,
    width: undefined
}

function play () {
    let inputId = document.getElementById('inputId')
    let inputPlayer = document.getElementById('inputPlayer')
    if (toplay.flag) fetch(`/world-server/${inputId.value}`)
    fetch(`http://${inputId.value}:3000/create` + `?world=${toplay.world}` + `&x=${toplay.width}` + `&y=${toplay.width}` + `&sid=${toplay.sid}`)
    fetch(`http://${inputId.value}:3000/player` + `?player=${inputPlayer.value}`)
    window.open('/game' + `?player=${inputPlayer.value}&world=${toplay.world}&id=${inputId.value}`)
}

function newmapKey (el) {
    el.className = 'input-span-const-2'
    let el2 = document.getElementById('input-out')
    el2.className = 'input-span-const'
    document.getElementById('inputWorld').value = 'выбрать мир'
    document.getElementById('inputWorld').onclick = newmapModal
    toplay.flag = true
    toplay.world = 'New world'
    toplay.sid = Math.random()
    toplay.width = 100
}

function output (el) {
    el.className = 'input-span-const-2'
    let el2 = document.getElementById('input-new')
    el2.className = 'input-span-const'

    document.getElementById('inputWorld').value = 'сетевой'
    document.getElementById('inputWorld').onclick = undefined
    toplay.flag = false
}

function worldOpen () {
    let modal = document.getElementById('modal')
    modal.className = 'one-ring'
    let inputWorld = document.getElementById('inputWorld')
    let selrbrateWorld = document.getElementById('selectWorld')
    let inputNewWorld = document.getElementById('inputNewWorld')
    let inputSid = document.getElementById('inputSid')
    let inputWidth = document.getElementById('inputWidth')
    if (inputSid.value != '') toplay.sid = inputSid.value
    if (inputWidth.value != '') toplay.width = inputWidth.value
    if (inputNewWorld.value == '') inputWorld.value = selrbrateWorld.value
    else inputWorld.value = inputNewWorld.value
    if (inputWorld.value != 'выбрать мир') toplay.world = inputWorld.value
}

function newmapModal () {
    let modal = document.getElementById('modal')
    modal.className = 'modal-container'
    modal.addEventListener('click', (event) => {
        if (event.target.closest('.modal')) {

        } else {
            modal.className = 'one-ring'
        }
    })
}