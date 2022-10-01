function f(x, y, R) {
    return Math.pow(x, 2) + Math.pow(y, 2) - Math.pow(R, 2);
}

function dFs(x, y) {
    return 4 * y + 6;
}

function dFd(x, y) {
    return 4 * y + 4 * x + 10;
}

let canvas = document.getElementById("canvas");
let context = canvas.getContext("2d");

let R = 100;
let x = -R;
let y = 0;
let F = 1 - 2 * R;
while (y <= Math.abs(x)) {
    console.log({x, y, F});
    context.fillRect(x + 250, y + 250, 1, 1);
    if (F < 0) {
        F += dFs(x, y)
        y++;
    } else {
        F += dFd(x, y);
        x++;
        y++;
    }
}