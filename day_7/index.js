const {fileReader} = require("../helper");

const getMedian = (arr) => {
    const middle = Math.floor(arr.length / 2);
    const sortedArr = [...arr].sort((a, b) => a - b);
    return sortedArr.length % 2 !== 0 ? sortedArr[middle] : (sortedArr[middle - 1] + sortedArr[middle]) / 2;
}

const average = (array) => array.reduce((a, b) => a + b) / array.length

const crabSubmarines = (input) => {
    const positions = input[0].split(",").map(el => +el)
    const median = getMedian(positions);
    const fuelConsumption = positions.reduce((acc, position) => acc + Math.abs(position - median), 0)
    console.log(fuelConsumption)
}

const crabSubmarines2 = (input) => {
    const positions = input[0].split(",").map(el => +el)
    const averaged = Math.round(average(positions))
    const fuelConsumption = positions.reduce((acc, position) => {
        const diff = Math.abs(position - averaged);
        // given diff of 5 creates arr [1,2,3,4,5], that is then summed
        const fuels = [...Array(diff).keys()].reduce((acc, curr) => acc + curr + 1,0)
        return acc + fuels
    }, 0)
    console.log(fuelConsumption)
}

fileReader('example_input.txt', crabSubmarines)
fileReader('input.txt', crabSubmarines)

fileReader('example_input.txt', crabSubmarines2)
fileReader('input.txt', crabSubmarines2)
