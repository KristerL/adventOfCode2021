const {fileReader} = require("../helper");


// takes in input in form ["101", "111" "000"]
// transforms it to [[1,0,1],[1,1,1],[0,0,0]]
const createMatrix = (input) => {
    return input.map(row => row.split("").map(Number));
}

// takes in a matrix like [[1,0,1],[1,1,1],[0,0,0]]
// transposes it to [[1,1,0],[0,1,0],[1,1,0]]
const transposeMatrix = (input) => {
    return input[0].map((col, i) => input.map(row => row[i]));
}

const findCommonBits = (matrix) => {
    const fixedRowLen = matrix[0].length;
    const halfOfRowLen = fixedRowLen / 2;
    return matrix.map(row => {
        const sumOfBits = row.reduce((acc,curr) => acc + curr, 0);
        return sumOfBits < halfOfRowLen ? 0 : 1;
    })
}

const diagnostic = (input) => {
    const dataMatrix = createMatrix(input);
    const transposedMatrix = transposeMatrix(dataMatrix);

    const commonBits = findCommonBits(transposedMatrix);
    const commonBitsReversed = commonBits.map(bit => bit === 1 ? 0 : 1);

    const gammaString = commonBits.join("");
    const epsilonString = commonBitsReversed.join("");

    // binary to decimal
    const gammaRate = parseInt(gammaString, 2);
    const epsilonRate = parseInt(epsilonString, 2);

    const powerConsumption = gammaRate * epsilonRate;
    console.log({powerConsumption})
}

const diagnostic_2 = (input) => {
    const dataMatrix = createMatrix(input);
    const commonBits = oxygen_rating(dataMatrix, 0)
    const commonBitsReversed = CO2_rating(dataMatrix, 0)
    const oxygenString = commonBits.join("");
    const C02String = commonBitsReversed.join("");

    // binary to decimal
    const oxygenRating = parseInt(oxygenString, 2);
    const C02Rating = parseInt(C02String, 2);

    const lifeSupportRating = oxygenRating * C02Rating;
    console.log({lifeSupportRating})
}

const oxygen_rating = (matrix, position) => {
    if (matrix.length <= 1) return matrix[0];
    const fixedRowLen = matrix.length;
    const halfOfRowLen = fixedRowLen / 2;
    const positionSum = matrix.reduce((acc,row) => acc + row[position], 0);
    const commonBit = positionSum < halfOfRowLen ? 0 : 1;

    const filteredMatrix = matrix.filter(row => row[position] === commonBit);

    return oxygen_rating(filteredMatrix, position + 1);
}

const CO2_rating = (matrix, position) => {
    if (matrix.length <= 1) return matrix[0];
    const fixedRowLen = matrix.length;
    const halfOfRowLen = fixedRowLen / 2;
    const positionSum = matrix.reduce((acc,row) => acc + row[position], 0);
    const commonBit = positionSum < halfOfRowLen ? 0 : 1;

    const filteredMatrix = matrix.filter(row => row[position] !== commonBit);

    return CO2_rating(filteredMatrix, position + 1);
}

fileReader('input.txt', diagnostic);
fileReader('input.txt', diagnostic_2);