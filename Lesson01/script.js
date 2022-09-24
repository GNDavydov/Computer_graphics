const canvas = document.getElementById("canvas")
const context = canvas.getContext("2d")

// Размеры canvas элемента
const width = canvas.width
const height = canvas.height

const height_block = width - 100

// Текущее положение цветного квадратика
let curr_x = 0
let curr_y = 0

// Размер квадрата
const step = 20


// Генерация случайного цвета
function generateColor() {
    return '#' + Math.floor(Math.random() * 16777215).toString(16)
}


function drawColorBlock() {
    context.fillStyle = generateColor()
    context.fillRect(curr_x, curr_y, step, step)
    curr_x += step
    if (curr_x > width - step) {
        curr_x = 0
        curr_y + 2 * step > height_block ? curr_y = 0 : curr_y += step
    }
}

// Отрисовываем цветные квадратики
timerId = setInterval(drawColorBlock, 10)

// через 15 секунд останавливаем
setTimeout(() => { clearInterval(timerId)}, 15000)

