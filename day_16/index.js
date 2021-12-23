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

const literalValue = (string, subPacketCount, subPacketLength) => {
    let counter = 0;
    let result = [];
    let versionCounter = 0;
    let currentResult = "";
    while (true) {
        const currentString = string.substring(counter * 5, (counter + 1) * 5);
        const startCharacter = currentString.substring(0, 1);
        const currentInput = currentString.substring(1);
        currentResult += currentInput
        if (startCharacter === "0") {
            if (subPacketLength !== Infinity) { subPacketLength -= currentResult.length }
            const [value, versions] = packetParser({ packet: string.substring((counter + 1) * 5), subPacketCount, subPacketLength});
            result = [currentResult, ...value];
            versionCounter += versions;
            break;
        }
        counter++;
    }

    return [result, versionCounter];
}

const operatorValue = (string, subPacketCount) => {
    const lengthId = string.substring(0, 1);
    const parseString = string.substring(1)
    let answer = [];
    let versionCounter = 0;
    console.log({parseString, lengthId})
    if (lengthId === "0") {
        const lengthOfSubPackets = +binaryToDecimal(parseString.substring(0, 15));
        const [answer1, versionCounter1] = packetParser({packet: parseString.substring(15, 15 + lengthOfSubPackets), subPacketLength: lengthOfSubPackets})
        answer = [...answer, ...answer1];
        versionCounter += versionCounter1;
        if (subPacketCount > 0) {
            const [answer2, versionCounter2] = packetParser({packet: parseString.substring(15 + lengthOfSubPackets)})
            answer = [...answer, ...answer2];
            versionCounter += versionCounter2;
        }
    } else {
        const lengthOfSubPackets = +binaryToDecimal(parseString.substring(0, 11));
        console.log(lengthOfSubPackets)
        const newParseString = parseString.substring(11);
        [answer, versionCounter] = packetParser({ packet: newParseString, subPacketCount: lengthOfSubPackets});
        // for (let i = 0; i < lengthOfSubPackets; i++) {
        //     answer = [...answer, value];
        //     versionCounter += versions
        // }
    }

    return [answer, versionCounter]
}

const startParser = (input) => {
    const decodedInput = decodeString(input[0]);
    const [result, versionCounter] = packetParser({ packet: decodedInput});
    console.log({versionCounter});
    console.log(result.map(el => binaryToDecimal(el)));
    return result.map(el => binaryToDecimal(el));
}

const packetParser = ({packet, subPacketCount = Infinity, subPacketLength = Infinity, versionCounter = 0}) => {
    versionCounter += binaryToDecimal(packet.substring(0, 3));
    const typeId = binaryToDecimal(packet.substring(3, 6));
    const parseInput = packet.substring(6);
    if (!parseInput || subPacketCount === 0 || subPacketLength === 0) {
        console.log({subPacketCount, subPacketLength, parseInput})
        return [[], 0];
    }
    if (subPacketCount !== Infinity) {
        subPacketCount--
    }

    console.log("packet parser", {parseInput, versionCounter, typeId, subPacketCount, subPacketLength });
    let value, versions;
    if (typeId === 4) {
        [value, versions] = literalValue(parseInput, subPacketCount, subPacketLength);
    } else {
        [value, versions] = operatorValue(parseInput, subPacketCount, subPacketLength);
    }

    versionCounter += versions
    return [value, versionCounter];
}

fileReader("input.txt", startParser);
//
// const testInput1 = ["D2FE28"];
// console.assert(JSON.stringify(startParser(testInput1)) === JSON.stringify([ 2021 ]))
//
// const testInput2 = ["38006F45291200"];
// console.assert(JSON.stringify(startParser(testInput2)) === JSON.stringify([ 10, 20 ]))
//
// const testInput3 = ["EE00D40C823060"];
// console.assert(JSON.stringify(startParser(testInput3)) === JSON.stringify([ 1,2,3 ]))
//
// const testInput4 = ["8A004A801A8002F478"];
// console.assert(JSON.stringify(startParser(testInput4)) === JSON.stringify([ 1,2,3 ]))