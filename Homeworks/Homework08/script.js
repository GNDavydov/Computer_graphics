let canvas = document.getElementById("canvas");
let context = canvas.getContext("2d");

function drawLine(P0, P1) {
    let x0 = P0.x;
    let x1 = P1.x;
    let y0 = P0.y;
    let y1 = P1.y;

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
        console.log(e)
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

function getDistance(P0, P1, P2) {
    let N = Math.sqrt(Math.pow((P1.x - P2.x), 2) + Math.pow((P1.y - P2.y), 2))
    let k = ((P0.x - P1.x) * (P0.y - P2.y) - (P0.y - P1.y) * (P0.x - P2.x)) / (Math.pow((P0.x - P2.x), 2) - Math.pow((P0.y - P2.y), 2))
    return Math.abs(k * N)
}


function draw(P0, P1, P2) {
    if (getDistance(P0, P1, P2) < 1) {
        console.log(P0)
        console.log(P1)
        console.log(P2)
        drawLine(P0, P2)
        return
    }
    let P0_1 = {
        x: 0,
        y: 0
    }

    let P1_1 = {
        x: 0,
        y: 0
    }

    let P0_2 = {
        x: 0,
        y: 0
    }

    P0_1.x = (P0.x + P1.x) * 0.5
    P0_1.y = (P0.y + P1.y) * 0.5
    P1_1.x = (P2.x + P1.x) * 0.5
    P1_1.y = (P2.y + P1.y) * 0.5
    P0_2.x = (P0_1.x + P1_1.x) * 0.5
    P0_2.y = (P0_1.y + P1_1.y) * 0.5

    draw(P0, P0_1, P0_2)
    draw(P0_2, P1_1, P2)
}

P0 = {
    x: 100,
    y: 100
}

P1 = {
    x: 300,
    y: 400
}

P2 = {
    x: 400,
    y: 200
}

draw(P0, P1, P2)