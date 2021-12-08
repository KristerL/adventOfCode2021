const {fileReader} = require("../helper");

const segmentSearch = (input) => {
    const uniqueDigits = [2, 3, 4, 7];
    let howManyUniques = input.reduce((acc, row) => {
        const rowValues = row.split(" | ")[1].split(" ");
        const sum = rowValues.reduce((acc, curr) => {
            const count = uniqueDigits.includes(curr.length) ? 1 : 0;
            return acc + count
        }, 0);
        return acc + sum;
    }, 0)
    console.log(howManyUniques);
}

const createDecodeObject = (row) => {
    const decodeObject = {};
    const map = {
        right: [],
        leftTopMid: []
    }
    const decodedKey = row.split(" ").sort((a, b) => a.length - b.length);
    decodedKey.forEach(key => {
        const keyLen = key.length;
        const splitKey = key.split("").sort();
        const decodeKey = splitKey.join("");
        if (keyLen === 2) {
            decodeObject[decodeKey] = 1;
            map.right = splitKey;
        } else if (keyLen === 3) {
            decodeObject[decodeKey] = 7;
        } else if (keyLen === 4) {
            decodeObject[decodeKey] = 4;
            map.leftTopMid = splitKey.filter(el => !map.right.includes(el));
        } else if (keyLen === 7) {
            decodeObject[decodeKey] = 8;
        } else if (key.length === 5) {
            if (splitKey.filter(el => map.leftTopMid.includes(el)).length === 2) decodeObject[decodeKey] = 5;
            else if (splitKey.filter(el => map.right.includes(el)).length === 2) decodeObject[decodeKey] = 3;
            else decodeObject[decodeKey] = 2;
        } else if (key.length === 6) {
            if (splitKey.filter(el => map.leftTopMid.includes(el) || map.right.includes(el)).length === 4) decodeObject[decodeKey] = 9;
            else if (splitKey.filter(el => map.leftTopMid.includes(el)).length === 2) decodeObject[decodeKey] = 6;
            else decodeObject[decodeKey] = 0;
        }
    })
    return decodeObject;
}

const segmentSearchFull = (input) => {
    const numbers = [];
    for (const row of input) {
        const [configurationData, encodedData] = row.split(" | ");
        const decodeObject = createDecodeObject(configurationData);
        const rowDigits = encodedData.split(" ");
        const stringNumber = rowDigits.reduce((acc, curr) => {
            const sortedNumber = curr.split("").sort().join("");
            if (isNaN(decodeObject[sortedNumber])) return acc;
            return acc + decodeObject[sortedNumber];
        }, "")
        numbers.push(+stringNumber);
    }

    const sum = numbers.reduce((acc, curr) => acc + +curr, 0);
    console.log(sum);
}


fileReader('example_input.txt', segmentSearch)
fileReader('input.txt', segmentSearchFull);