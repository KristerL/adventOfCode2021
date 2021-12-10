const {fileReader} = require("../helper");

const missingScores = {
    ")": 3,
    "(": 3,
    "]": 57,
    "[": 57,
    "}": 1197,
    "{": 1197,
    ">": 25137,
    "<": 25137
}
const uncompletedScores = {
    "(": 1,
    "[": 2,
    "{": 3,
    "<": 4
}

const ch = {
    ")": "(",
    "]": "[",
    "}": "{",
    ">": "<"
}

const isOpeningCharacter = (char) => ["(","{","[","<"].includes(char);
const createScore = (stack) => {
    return stack.reverse().reduce((acc, curr) => {
        let result = acc * 5;
        result += uncompletedScores[curr];
        return result;
    },0)
}

const t = (input) => {
    const illegal = []
    const scores = []
    input.forEach(line => {
        let currentRowStack = []
        line.split("").some(el => {
            if (isOpeningCharacter(el)) currentRowStack.push(el)
            else if (currentRowStack.pop() !== ch[el]) {
                illegal.push(el)
                currentRowStack = []
                return true
            }
        })
        scores.push(createScore(currentRowStack))
    })
    const result = illegal.map(el => missingScores[el]).reduce((acc,curr) => acc + curr,0)
    const sortedScores = scores.filter(Boolean).sort((a,b) => b - a);

    console.log("Score of illegal characters: ", result)
    console.log("Center value of uncompleted scores",sortedScores[Math.floor(sortedScores.length / 2)])
}

fileReader("example_input.txt", t);