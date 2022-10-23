const canvas = document.getElementById("canvas")
const context = canvas.getContext("2d")

// Размеры canvas
const width = canvas.width
const height = canvas.height

const rectangle = {
    x_left: 90,
    x_right: 180,
    y_up: 100,
    y_down: 300
}

function drawLine(x0, y0, x1, y1) {
    let dy = y1 - y0;
    let dx = x1 - x0;

    let sign_x = dx > 0 ? 1 : dx < 0 ? -1 : 0;
    let sign_y = dy > 0 ? 1 : dy < 0 ? -1 : 0;


    if (dx < 0) dx = -dx;
    if (dy < 0) dy = -dy;

    let pdx, pdy, es, el;
    if (dx > dy) {
        pdx = sign_x;
        pdy = 0;
        es = dy;
        el = dx;
    } else {
        pdx = 0;
        pdy = sign_y;
        es = dx;
        el = dy;
    }

    let e = el / 2;
    let t = 0;
    let x = x0;
    let y = y0;

    context.fillRect(x, y, 1, 1);
    while (t < el) {
        e -= es;
        if (e < 0) {
            e += el;
            x += sign_x;
            y += sign_y;
        } else {
            x += pdx;
            y += pdy;
        }
        t += 1;
        context.fillRect(x, y, 1, 1);
    }
}

function computeVector(x, y, x_left, x_right, y_up, y_down) {
    // x, y - координаты точки
    // x_left - прямая слева от прямоугольника
    // x_right - прямая справа от прямоугольника
    // y_up - прямая сверху от прямоугольника
    // y_down - прямая снизу от прямоугольника
    let answer = 0
    if (y < y_up) answer += 8
    if (y > y_down) answer += 4
    if (x < x_left) answer += 2
    if (x > x_right) answer += 1
    return answer
}


function getMid(x1, y1, x2, y2) {
    return [Math.floor((x1 + x2) / 2), Math.floor((y1 + y2) / 2)]
}

function SutherlandCohen(x1, y1, x2, y2, rectangle) {
    let vec_1 = computeVector(x1, y1, rectangle.x_left, rectangle.x_right, rectangle.y_up, rectangle.y_down)
    let vec_2 = computeVector(x2, y2, rectangle.x_left, rectangle.x_right, rectangle.y_up, rectangle.y_down)
    let final_vec = vec_1 & vec_2
    if (vec_1 === 0 && vec_2 === 0) {
        drawLine(x1, y1, x2, y2)
    } else if (final_vec === 0) {
        if (Math.abs(x1 - x2) <= 1 && Math.abs(y1 - y2) <= 1) {
            SutherlandCohen(x1, y1, x1, y1, rectangle)
            SutherlandCohen(x2, y2, x2, y2, rectangle)
        } else {
            let [x_m, y_m] = getMid(x1, y1, x2, y2)
            SutherlandCohen(x1, y1, x_m, y_m, rectangle)
            SutherlandCohen(x_m, y_m, x2, y2, rectangle)
        }

    }
}

SutherlandCohen(0, 0, 400, 400, rectangle)
