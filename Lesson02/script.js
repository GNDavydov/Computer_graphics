const canvas = document.getElementById("canvas")
const context = canvas.getContext("2d")

// 147, 123
let x1 = 147
let y1 = 123
let x0 = 50
let y0 = 0
let e = 0
let y = 0


for (let x = x0; x <= x1; ++x) {
    context.fillRect(x, y, 1, 1)
    e = e + (y1 - y0) * 2
    if (e > (x1 - x0)) {
        e = e - 2 * (x1 - x0)
        y += 1
    }
}