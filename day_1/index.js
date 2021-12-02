const {fileReader} = require("../helper");

const sonar_sweep = (input) => {
    let lastVal = input[0];
    const result = input.reduce((acc,curr) => {
        acc = lastVal < curr ? acc + 1 : acc;
        lastVal = curr;
        return acc
    }, 0)
    console.log(result)
}

const sonar_sweep_2 = (input) => {
    let result = []
    for (let i = 0; i < input.length; i++) {
        const max = Math.min(input.length, i +3);
        const threeOF = input.slice(i, max)
        const sum = threeOF.reduce((acc, curr) => acc + +curr, 0)
        result.push(sum)
    }
    sonar_sweep(result)
}

fileReader('input.txt', sonar_sweep)
fileReader('input.txt', sonar_sweep_2)
