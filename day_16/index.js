const {fileReader} = require("../helper");

const decodeMap = {
    "0": "0000",
    "1": "0001",
    "2": "0010",
    "3": "0011",
    "4": "0100",
    "5": "0101",
    "6": "0110",
    "7": "0111",
    "8": "1000",
    "9": "1001",
    "A": "1010",
    "B": "1011",
    "C": "1100",
    "D": "1101",
    "E": "1110",
    "F": "1111"
}

const decodeString = (string) => {
    return string.split("").map(el => decodeMap[el]).join("")
}

const binaryToDecimal = (string) => {
    return parseInt(string, 2);
}
const operations = {
    "0": (arr) => [arr.reduce((acc,curr) => acc + curr, 0)],
    "1": (arr) => [arr.reduce((acc, curr) => acc * curr, 1)],
    "2": (arr) => [Math.min(...arr)],
    "3": (arr) => [Math.max(...arr)],
    "4": (arr) => arr,
    "5": (arr) => [arr[0] > arr[1] ? 1 : 0],
    "6": (arr) => [arr[0] < arr[1] ? 1 : 0],
    "7": (arr) => [arr[0] === arr[1] ? 1 : 0],
}

const recursiveParser = (input, startingIndex) => {
    let nextStartingIndex = startingIndex;
    let currentVersion = +binaryToDecimal(input.substring(startingIndex, startingIndex + 3));
    const currentType = +binaryToDecimal(input.substring(startingIndex + 3,startingIndex + 6));
    nextStartingIndex += 6 // shift by six
    let values = []

    if (currentType === 4) { // handle literal
        let result = "";
        while (true) {
            const currentBits = input.substring(nextStartingIndex, nextStartingIndex + 5);
            const startingBit = currentBits[0];
            nextStartingIndex += 5;
            result += currentBits.substring(1);
            if (startingBit === "0" || currentBits === '') break;
        }
        values.push(+binaryToDecimal(result));
    } else { // handle operator
        const lengthType = input[nextStartingIndex];
        nextStartingIndex += 1;
        if (lengthType === "0") {
            let length = +binaryToDecimal(input.substring(nextStartingIndex, nextStartingIndex + 15));
            nextStartingIndex += 15;
            length += nextStartingIndex; // we create endIndex by adding the startingIndex to length
            while (nextStartingIndex < length) {
                const [newStartingIndex, newVersionCount, newValue] = recursiveParser(input, nextStartingIndex);
                nextStartingIndex = newStartingIndex;
                currentVersion += newVersionCount;
                values = [...values, ...newValue];
            }
        } else {
            const numberOfPackets = +binaryToDecimal(input.substring(nextStartingIndex, nextStartingIndex + 11));
            nextStartingIndex += 11
            for (let i = 0; i < numberOfPackets; i++) {
                const [newStartingIndex, newVersionCount, newValue] = recursiveParser(input, nextStartingIndex);
                nextStartingIndex = newStartingIndex;
                currentVersion += newVersionCount;
                values = [...values, ...newValue];
            }
        }
    }
    return [nextStartingIndex, currentVersion, operations[`${currentType}`](values)]
}

const start = (input) => {
    console.log(recursiveParser(decodeString(input[0]),0));
}

fileReader("input.txt", start);