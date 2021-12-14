const {fileReader} = require("../helper");

const createDataMap = (input) => {
    const dataMap = {};
    input.forEach(row => {
        const [key, value] = row.split(" -> ")
        dataMap[key] = value
    })

    return dataMap;
}

const polymorizationNaive = (input) => {
    let result = input[0]
    input.splice(0,1)
    const dataMap = createDataMap(input)
    const rounds = 20;

    for (let j = 0; j < rounds; j++) {
        let newResult = [result[0]]
        for (let i = 0; i < result.length - 1; i++) {
            const key = `${result[i]}${result[i +1]}`;
            newResult.push(dataMap[key]);
            newResult.push(result[i + 1]);
        }
        result = newResult.join("")
    }

    const resultMap = {}
    result.split("").forEach((letter) => resultMap[letter] = resultMap[letter] ? resultMap[letter] + 1 : 1)
    const result2 = Object.values(resultMap).sort((a,b) => b - a)
    console.log(resultMap)
    console.log(result2[0] - result2[result2.length - 1])
}


const polymorizationOptimized = (input) => {
    let initialString = input[0]
    input.splice(0,1)
    const dataMap = createDataMap(input)
    const rounds = 40;

    // setup initial state
    let resultPairs = {};
    for (let i = 0; i < initialString.length - 1; i++) {
        const currentPair = `${initialString[i]}${initialString[i +1]}`;
        resultPairs[currentPair] = resultPairs[currentPair] ? resultPairs[currentPair] + 1: 1;
    }

    for (let j = 0; j < rounds; j++) {
        const newResultPairs = {}
        Object.keys(resultPairs).forEach(key => {
            if (resultPairs[key] === 0) return;
            const [keyStart, keyEnd] = key.split("");
            const newKey = dataMap[key];

            const firstNewPair = `${keyStart}${newKey}`
            const secondNewPair = `${newKey}${keyEnd}`
            const currentValue = resultPairs[key]

            newResultPairs[firstNewPair] = newResultPairs[firstNewPair] ? newResultPairs[firstNewPair] + currentValue: currentValue;
            newResultPairs[secondNewPair] = newResultPairs[secondNewPair] ? newResultPairs[secondNewPair] + currentValue : currentValue;

        })
        resultPairs = newResultPairs
    }


    const resultMap = {}
    Object.entries(resultPairs).forEach(([key, value]) => {
        const [first,last] = key.split("");
        resultMap[first] = resultMap[first] ? resultMap[first] + value : value;
        resultMap[last] = resultMap[last] ? resultMap[last] + value : value;

    })

    //remove double counts
    Object.keys(resultMap).forEach(key => {
        resultMap[key] = Math.floor(resultMap[key] / 2);
    })

    // first and last letters are not double counted
    resultMap[initialString[0]] += 1
    resultMap[initialString[initialString.length - 1]] += 1

    const result2 = Object.values(resultMap).sort((a,b) => b - a)
    console.log(result2[0] - result2[result2.length - 1])
}

fileReader("input.txt", polymorizationOptimized)