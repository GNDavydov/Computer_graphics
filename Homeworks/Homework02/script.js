// Оригинальное изображение
const cnv_original = document.getElementById("original")
const cnx_original = cnv_original.getContext("2d")

// Отфильтрованное изображение
const cnv_filtered = document.getElementById("filtered")
const cnx_filtered = cnv_filtered.getContext("2d")

const width = cnv_original.width
const height = cnv_original.height

// Медианный фильтр
function filter() {
    const size = 3
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

            R.sort((x, y) => x - y);
            G.sort((x, y) => x - y);
            B.sort((x, y) => x - y);
            S.sort((x, y) => x - y);

            let m = Math.floor(R.length / 2);
            img_data_filter.data[(j * width + i) * 4] = R[m]
            img_data_filter.data[(j * width + i) * 4 + 1] = G[m]
            img_data_filter.data[(j * width + i) * 4 + 2] = B[m]
            img_data_filter.data[(j * width + i) * 4 + 3] = S[m]
        }
    }

    cnx_filtered.putImageData(img_data_filter, 0, 0, 0, 0, width, height);
}

// Скачивание image
let img = new Image()
img.setAttribute('crossOrigin', 'Anonymous');
img.src = "https://habrastorage.org/files/876/133/b85/876133b8535b4d5fad88a14f152ef5be.png"

// Отрисовка изображения после загрузки
img.onload = function () {
    cnx_original.drawImage(img, 0, 0, width, height)
    let btn = document.getElementById('filter');
    btn.addEventListener("click", filter);
}