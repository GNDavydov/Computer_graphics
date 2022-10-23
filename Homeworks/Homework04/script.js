const canvas = document.getElementById("canvas")
const context = canvas.getContext("2d")

// Размеры canvas
const width = canvas.width
const height = canvas.height

let radius = width / 3

let center_x = width / 2
let center_y = height / 2

function drawPixel(x, y, color) {
    context.fillStyle = color
    context.fillRect(x, y, 1, 1)
}

function drawCircle(x, y, R) {
    let center_x = x
    let center_y = y
    x = 0
    y = R
    let delta = 1 - 2 * R
    let e = 0

    while (y >= 0) {
        drawPixel(center_x + x, center_y + y, "#aa0000")
        drawPixel(center_x + x, center_y - y, "#aaaa00")
        drawPixel(center_x - x, center_y + y, "#00aaaa")
        drawPixel(center_x - x, center_y - y, "#aa00aa")

        e += 2 * (delta + y) - 1
        if (delta < 0 && e <= 0) {
            x += 1
            delta += 2 * x + 1
        } else {
            e = 2 * (delta - x) - 1
            if (delta > 0 && e > 0) {
                y -= 1
                delta += 1 - 2 * y
            } else {
                x += 1
                delta += 2 * (x -y)
                y -= 1
            }
        }
    }
}

drawCircle(center_x, center_y, radius)