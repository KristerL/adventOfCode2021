const {fileReader} = require("../helper");

const lowPoints = (input) => {
    const createMatrix = input.map(string => string.split(""))
    const horizontalLen = createMatrix[0].length;
    const verticalLen = createMatrix.length;

    const passedNR = [];
    for (let i = 0; i < verticalLen; i++) {
        for (let j = 0; j < horizontalLen; j++) {
            const currentNumber = createMatrix[i][j]
            const left = j === 0 ? 9 : createMatrix[i][j-1]
            const right = j === horizontalLen - 1  ? 9 : createMatrix[i][j+1]
            const top = i === 0 ? 9 : createMatrix[i - 1][j]
            const bottom = i === verticalLen - 1 ? 9 : createMatrix[i + 1][j]

            const isSmaller = currentNumber < left && currentNumber < right && currentNumber < top && currentNumber < bottom;
            if (isSmaller) {
                passedNR.push(currentNumber)
            }
        }
    }



    const result = passedNR.map(el => +el +1).reduce((acc,curr) => acc + curr,0)
    console.log(result)
}

const basins= []

const checkIfIsInBasin = (key) => {
    return basins.some(basin => {
        return basin.includes(key) === -1
    })
}

const createBasinValues = (i,j, matrix) => {
    if (i < 0 || j < 0) return [];
    if (i >= matrix.length || j >= matrix[0].length) return [];
    const currentNumber = matrix[i][j];
    if (+currentNumber === 9) return [];
    matrix[i][j] = 9
    const leftValues = createBasinValues(i, j - 1, matrix)
    const bottomValues = createBasinValues(i - 1, j, matrix)
    const topValues = createBasinValues(i + 1, j, matrix)
    const rightValues = createBasinValues(i, j + 1, matrix)

    return [...leftValues, ...rightValues, ...topValues, ...bottomValues, `${i}${j}`]
}



const searcher = (input) => {
    const createMatrix = input.map(string => string.split(""))
    createMatrix.forEach((row, idxI) => {
        row.forEach((number, idxJ) => {
            if (+number === 9) return;
            const isNumberInBasin = checkIfIsInBasin(`${idxI}${idxJ}`)
            if (!isNumberInBasin) {
                const basinVals = createBasinValues(idxI, idxJ, createMatrix)
                basins.push(basinVals)
            }
        })

    })

    const sorted = basins.map(basin => basin.length).sort((a,b) => b - a)
    const result = sorted[0] * sorted[1] * sorted[2]
    console.log(result)
    console.timeEnd("start")
}

console.time("start")
fileReader('input.txt', searcher);
fileReader('input.txt', lowPoints);
