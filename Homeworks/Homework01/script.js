const canvas = document.getElementById("canvas")
const context = canvas.getContext("2d")

// Размеры canvas
const width = canvas.width
const height = canvas.height

// Текущее положение цветного квадратика
let curr_x = 0
let curr_y = 0

// Размер квадратика
const step = 20

let color = "#000000"

function changeColor(event) {
    code = event.keyCode
    code %= 256
    color = '#' + code.toString(16) + "0000"
}

function drawColorBlock() {
    context.fillStyle = color
    context.fillRect(curr_x, curr_y, step, step)
    curr_x += step
    if (curr_x > width - step) {
        curr_x = 0
        curr_y += step
        curr_y = curr_y > height - step ? 0 : curr_y
    }
}

// Отрисовываем движущиеся цветные квадратики
timerId = setInterval(drawColorBlock, 10)

// через 15 секунд останавливаем
setTimeout(() => { clearInterval(timerId)}, 15000)

addEventListener("keydown", changeColor);