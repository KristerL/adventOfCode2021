const fs = require('fs')

fs.readFile('input.txt', `utf8`, (err, data) => {
    if (err) throw err;
    const input = data.split("\n")

    sonar_sweep(input)
    sonar_sweep_2(input)
});

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