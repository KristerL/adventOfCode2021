const {fileReader} = require("../helper");

let flashCounter = 0;

const increaseByOne = (matrix) => {
    const flashIndexes = []
    for (let i = 0; i < matrix.length; i++) {
        for (let j = 0; j < matrix[0].length; j++) {
            const newValue = matrix[i][j] + 1
            matrix[i][j] = newValue
            if (newValue > 9) flashIndexes.push([i, j])
        }
    }
    return {newMatrix: matrix, flashIndexes}
}

const doFlash = (y, x, matrix, add = false) => {
    const matrixHorizontal = matrix[0].length;
    const matrixVertical = matrix.length;
    if (y < 0 || x < 0) return;
    if (y >= matrixVertical || x >= matrixHorizontal) return;
    const currentNumber = matrix[y][x];

    if (currentNumber !== 0) {
        matrix[y][x]++
    }

    if (matrix[y][x] < 10) return;
    flashCounter++;
    matrix[y][x] = 0;

    doFlash(y - 1, x, matrix, true); // top
    doFlash(y + 1, x, matrix, true); // bottom
    doFlash(y, x - 1, matrix, true); // left
    doFlash(y, x + 1, matrix, true); // right

    doFlash(y + 1, x - 1, matrix, true); // top left
    doFlash(y + 1, x + 1, matrix, true); // top right
    doFlash(y - 1, x - 1, matrix, true); // bottom left
    doFlash(y - 1, x + 1, matrix, true); // bottom right
}


const octopus = (input) => {
    let matrix = input.map(row => row.split("").map(number => +number));
    let stepCounter = 1;
    let lastFlashCounter = 0;

    while (true) {
        const {newMatrix, flashIndexes} = increaseByOne(matrix)
        matrix = newMatrix
        flashIndexes.forEach(index => doFlash(index[0], index[1], matrix))
        if (stepCounter === 100) { console.log({flashCounter}) }
        if (flashCounter - lastFlashCounter === 100) {
            console.log({stepCounter})
            break;
        }

        stepCounter++;
        lastFlashCounter = flashCounter;
    }

}




fileReader("input.txt", octopus);