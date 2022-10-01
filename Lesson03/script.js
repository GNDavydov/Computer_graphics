/*
  x_s^2 + y_s^2 = R_s^2
  x_d^2 + y_d^2 = R_d^2

  R_s^2 - R^2 ? R^2 - R_d^2
  R_s^2 - 2RR_s + 2R_dR - R_d^2 ? 0
  R_S^2 - 2R^2 + R_d^2 ? 0
  (x_s^2 + y_s^2 - R^2) + (x_d^2 + y_d^2 - R^2) ? 0
  f(x_s,y_s) + f(x_d,y_d) ? 0 [f_s > 0 and f_s < 0]
  F ? 0:
    if >= then по диагонали
    else <= then то по вертикали

  F = f(x,y+1) + f(x+1,y+1) = x^2 + (y+1)^2 - R^2 + (x+1)^2 + (y+1)^2 - R^2
  dF_s = f(x,y+2)+f(x+1,y+2) - f(x,y+1)-f(x+1,y+1)
         x^2 + (y+2)^2 - R^2 + (x+1)^2 + (y+2)^2 - R^2 - x^2 - (y+1)^2 + R^2 - (x+1)^2 - (y+1)^2 + R^2
         2(y+2)^2 - 2(y+1)^2
         2y^2 + 8y + 8 - 2y^2 - 4y - 2
         4y+6
  dF_d = f(x+1,y+2)+f(x+2,y+2) - f(x,y+1)-f(x+1,y+1)
         (x+1)^2 + (y+2)^2 - R^2 + (x+2)^2 + (y+2)^2 - R^2 - x^2 - (y+1)^2 + R^2 - (x+1)^2 - (y+1)^2 + R^2
         2(y+2)^2 + (x+2)^2 - 2(y+1)^2 - x^2
         2y^2 + 8y + 8 - 2y^2 - 4y - 2 + x^2 + 4x + 4 - x^2
         4y + 4x + 10

  F_0 = f(-R, 0) + f(-R+1,0) = (1-R)^2 - R^2 = 1 - 2R
*/

function f(x, y, R) {
    return Math.pow(x, 2) + Math.pow(y, 2) - Math.pow(R, 2);
}

function dFs(x, y) {
    return 4 * y + 6;
}

function dFd(x, y) {
    return 4*y + 4*x + 10;
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