const canvas = document.getElementById("canvas")
const context = canvas.getContext("2d")

// Размеры canvas
const width = canvas.width
const height = canvas.height

// Длина стрелки
let size = 100

// Центр
x0 = width / 2
y0 = height / 2

let angle = -0.5

function BresenhamMethod(x1, y1) {
    let dx = x1 - x0
    let dy = y1 - y0

    let sign_x = dx > 0 ? 1 : dx < 0 ? -1 : 0
    let sign_y = dy > 0 ? 1 : dy < 0 ? -1 : 0

    if (dx < 0) dx = -dx
    if (dy < 0) dy = -dy

    let pdx, pdy, es, el
    if (dx > dy) {
        pdx = sign_x
        pdy = 0
        es = dy
        el = dx
    } else {
        pdx = 0
        pdy = sign_y
        es = dx
        el = dy
    }

    let x = x1
    let y = y1
    let error = el / 2
    let count = 0
    context.fillRect(x, y, 1, 1)

    while (count < el) {
        error -= es
        if (error < 0) {
            error += el
            x += sign_x
            y += sign_y
        } else {
            x += pdx
            y += pdy
        }
        ++count
        context.fillRect(x, y, 1, 1)
    }
}

function drawLine() {
    context.fillStyle = "#a110fa"
    let x1 = x0 + Math.cos(angle * Math.PI) * size
    let y1 = y0 + Math.sin(angle * Math.PI) * size
    BresenhamMethod(x1, y1)
    context.fillStyle = "#000000"
    angle += 1 / 6
    x1 = x0 + Math.cos(angle * Math.PI) * size
    y1 = y0 + Math.sin(angle * Math.PI) * size
    BresenhamMethod(x1, y1)
}


setInterval(drawLine, 1000)