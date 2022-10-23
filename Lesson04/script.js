// Алгоритм Сазерленда-Коэна
// Отсечение отрезков прямоугольной областью, оси которой параллельны осям координат

const canvas = document.getElementById("canvas")
const context = canvas.getContext("2d")

// Размеры canvas
const width = canvas.width
const height = canvas.height

// Даем точкам координаты в соответствии области, в которой она лежит
// P1P2 = (1000   ==> (0000)
//         0001)
// P1`P2` = (0010  ===> (0000)
//           0100)


// Производим побитовое умножение
//  Если в результате умножение получается не 0000, то дальнейшие вычисления для них не производим,
//  не лежит в нужной совсем
// Также дальнейшее вычисление не производится для тривиального случая, когда
// P1P2 = (0000
//         0000)


// Дальнейшие вычисления для 0000 отрезков, у которых есть 1, внутри скобок
// Алгоритм половинного деления: берем половину отрезка и повторяем операцию
