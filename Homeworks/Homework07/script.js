const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

function DrawLine(x1, y1, x2, y2) {
    const inv = Math.abs(x2 - x1) < Math.abs(y2 - y1);

    if (inv) {
        [x1, y1] = [y1, x1];
        [x2, y2] = [y2, x2];
    }

    if (x1 > x2) {
        [x1, x2] = [x2, x1];
        [y1, y2] = [y2, y1];
    }

    const dx = x2 - x1;
    const dy = Math.abs(y2 - y1);

    let e = dx / 2;

    let y = y1;
    let y_shift = 1;

    if (y1 >= y2) {
        y_shift = -1;
    }

    for (let x = x1; x <= x2; ++x) {
        if (inv) {
            ctx.fillRect(y, x, 2, 2);
        } else {
            ctx.fillRect(x, y, 2, 2);
        }

        e -= dy;
        if (e < 0) {
            e += dx;
            y += y_shift;
        }
    }
}

let global_x0 = -1;
let global_y0 = -1;

let x0 = -1;
let y0 = -1;

let draw_figure = true;

let x_coords = [];
let y_coords = [];

function CyrusBack(x1, y1, x2, y2) {
    let t = 0;

    let ax = 0;
    let ay = 0;

    let bx = 0;
    let by = 0;

    let ex0 = 0;
    let ey0 = 0;

    for (let i = 1; i <= x_coords.length; i++) {
        ax = x_coords[i - 1];
        ay = y_coords[i - 1];

        if (i === x_coords.length) {
            bx = x_coords[0];
            by = y_coords[0];
        } else {
            bx = x_coords[i];
            by = y_coords[i];
        }

        t = ((y1 - y2) * (ax - x1) + (x2 - x1) * (ay - y1)) / ((bx - ax) * (y2 - y1) + (by - ay) * (x1 - x2));

        if (t <= 1 && t >= 0) {
            const ex = (bx - ax) * t + ax;
            const ey = (by - ay) * t + ay;

            if (ex0 === 0 && ey0 === 0) {
                ex0 = ex;
                ey0 = ey;
            } else {
                DrawLine(ex0, ey0, ex, ey);
                ex0 = 0;
                ey0 = 0;
            }

        }
    }
}

document.addEventListener("click", (event) => {
    if (event.button === 0) {
        if (draw_figure) {
            x_coords.push(event.offsetX);
            y_coords.push(event.offsetY);

            if (x0 === -1 && y0 === -1) {
                x0 = event.offsetX;
                y0 = event.offsetY;

                global_x0 = x0;
                global_y0 = y0;

            } else {
                DrawLine(x0, y0, event.offsetX, event.offsetY);

                x0 = event.offsetX;
                y0 = event.offsetY;
            }
        } else {
            if (x0 === -1 && y0 === -1) {
                x0 = event.offsetX;
                y0 = event.offsetY;

            } else {
                CyrusBack(x0, y0, event.offsetX, event.offsetY);

                x0 = -1
                y0 = -1
            }
        }
    }
})

document.addEventListener("keydown", (event) => {
    if (event.code === "Enter") {
        if (draw_figure && global_x0 !== -1 && global_y0 !== -1) {
            DrawLine(global_x0, global_y0, x0, y0)

            x0 = -1
            y0 = -1

            draw_figure = false
        }
    }
});