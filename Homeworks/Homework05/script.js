// Оригинальное изображение
const cnv_original = document.getElementById("original")
const cnx_original = cnv_original.getContext("2d")

// Отфильтрованное изображение
const cnv_filtered = document.getElementById("filtered")
const cnx_filtered = cnv_filtered.getContext("2d")

const width = cnv_original.width
const height = cnv_original.height

// Медианный фильтр
function median_filter() {
    const size = 1
    let img_data = cnx_original.getImageData(0, 0, width, height)
    let img_data_filter = cnx_filtered.createImageData(width, height)

    for (let i = 0; i < width; ++i) {
        for (let j = 0; j < height; ++j) {
            const R = []
            const G = []
            const B = []
            const S = []

            for (let k = -size; k <= size; ++k) {
                for (let l = -size; l <= size; ++l) {
                    R.push(img_data.data[((j + l) * width + i + k) * 4])
                    G.push(img_data.data[((j + l) * width + i + k) * 4 + 1])
                    B.push(img_data.data[((j + l) * width + i + k) * 4 + 2])
                    S.push(img_data.data[((j + l) * width + i + k) * 4 + 3])
                }
            }

            R.filter(el => el !== undefined)
            G.filter(el => el !== undefined)
            B.filter(el => el !== undefined)
            S.filter(el => el !== undefined)

            R.sort((x, y) => x - y)
            G.sort((x, y) => x - y)
            B.sort((x, y) => x - y)
            S.sort((x, y) => x - y)

            let m = Math.floor(R.length / 2)
            img_data_filter.data[(j * width + i) * 4] = R[m]
            img_data_filter.data[(j * width + i) * 4 + 1] = G[m]
            img_data_filter.data[(j * width + i) * 4 + 2] = B[m]
            img_data_filter.data[(j * width + i) * 4 + 3] = S[m]
        }
    }

    cnx_filtered.putImageData(img_data_filter, 0, 0, 0, 0, width, height)
}

// Фильтр Гаусса
function gaussian_filter() {
    const size = 1
    const weights = [
        [1, 2, 1],
        [2, 4, 2],
        [1, 2, 1]
    ]

    let weights_sum = 0
    for (let i = 0; i < weights.length; ++i) {
        weights_sum = weights[i].reduce((a, b) => a + b, weights_sum)
    }

    let img_data = cnx_original.getImageData(0, 0, width, height)
    let img_data_filter = cnx_filtered.createImageData(width, height)

    for (let i = 0; i < width; ++i) {
        for (let j = 0; j < height; ++j) {
            let R = 0
            let G = 0
            let B = 0
            let S = 0

            for (let k = -size; k <= size; ++k) {
                for (let l = -size; l <= size; ++l) {
                    R += img_data.data[((j + l) * width + i + k) * 4] * weights[l + size][k + size]
                    G += img_data.data[((j + l) * width + i + k) * 4 + 1] * weights[l + size][k + size]
                    B += img_data.data[((j + l) * width + i + k) * 4 + 2] * weights[l + size][k + size]
                    S += img_data.data[((j + l) * width + i + k) * 4 + 3] * weights[l + size][k + size]
                }
            }

            img_data_filter.data[(j * width + i) * 4] = R / weights_sum
            img_data_filter.data[(j * width + i) * 4 + 1] = G / weights_sum
            img_data_filter.data[(j * width + i) * 4 + 2] = B / weights_sum
            img_data_filter.data[(j * width + i) * 4 + 3] = S / weights_sum
        }
    }

    cnx_filtered.putImageData(img_data_filter, 0, 0, 0, 0, width, height)
}

// Фильтр Собеля
function sobel_filter() {
    const size = 1
    let weight_x = [
        [-1, 0, 1],
        [-2, 0, 2],
        [-1, 0, 1]
    ]

    let weight_y = [
        [-1, -2, -1],
        [0, 0, 0],
        [1, 2, 1]
    ]

    function getGX(pixels, i, j) {
        let gx = 0
        for (let k = -size; k <= size; ++k) {
            for (let l = -size; l <= size; ++l) {
                gx += pixels.data[((j + l) * width + i + k) * 4] * weight_x[l + size][k + size]
                gx += pixels.data[((j + l) * width + i + k) * 4 + 1] * weight_x[l + size][k + size]
                gx += pixels.data[((j + l) * width + i + k) * 4 + 2] * weight_x[l + size][k + size]
            }
        }
        return gx
    }

    function getGY(pixels, i, j) {
        let gy = 0
        for (let k = -size; k <= size; ++k) {
            for (let l = -size; l <= size; ++l) {
                gy += pixels.data[((j + l) * width + i + k) * 4] * weight_y[l + size][k + size]
                gy += pixels.data[((j + l) * width + i + k) * 4 + 1] * weight_y[l + size][k + size]
                gy += pixels.data[((j + l) * width + i + k) * 4 + 2] * weight_y[l + size][k + size]
            }
        }
        return gy
    }

    let img_data = cnx_original.getImageData(0, 0, width, height)
    let img_data_filter = cnx_filtered.createImageData(width, height)

    for (let i = 0; i < width; ++i) {
        for (let j = 0; j < height; ++j) {
            let g = Math.ceil(Math.sqrt(Math.pow(getGX(img_data, i, j), 2) +
                Math.pow(getGY(img_data, i, j), 2)))

            for (let x = 0; x < 3; ++x) {
                img_data_filter.data[(j * width + i) * 4 + x] = g
            }
            img_data_filter.data[(j * width + i) * 4 + 3] = 255
        }
    }
    cnx_filtered.putImageData(img_data_filter, 0, 0, 0, 0, width, height)
}


// Скачивание image
let img = new Image()
img.setAttribute('crossOrigin', 'Anonymous')
img.src = "https://habrastorage.org/files/876/133/b85/876133b8535b4d5fad88a14f152ef5be.png"

// Отрисовка изображения после загрузки
img.onload = function () {
    cnx_original.drawImage(img, 0, 0, width, height)
    let btn_median_filter = document.getElementById('median_filter')
    let btn_gaussian_filter = document.getElementById('gaussian_filter')
    let btn_sobel_filter = document.getElementById('sobel_filter')


    btn_median_filter.addEventListener("click", median_filter)
    btn_gaussian_filter.addEventListener("click", gaussian_filter)
    btn_sobel_filter.addEventListener("click", sobel_filter)
}

