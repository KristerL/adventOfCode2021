const {fileReader} = require("../helper");

const move_submarine = (input) => {
    let horizontal = 0;
    let depth = 0;

    input.forEach(command => {
        let [commandType, unit] = command.split(" ");
        if (commandType === 'up') {
            depth -= +unit
        } else if (commandType === 'down') {
            depth += +unit
        } else if (commandType === 'forward') {
            horizontal += +unit
        }
    })
    console.log("Result", horizontal * depth)
}

const move_submarine_smart = (input) => {
    let horizontal = 0;
    let depth = 0;
    let aim = 0;

    input.forEach(command => {
        let [commandType, unit] = command.split(" ");
        if (commandType === 'up') {
            aim -= +unit
        } else if (commandType === 'down') {
            aim += +unit
        } else if (commandType === 'forward') {
            horizontal += +unit
            depth += aim * unit
        }
    })
    console.log("Result", horizontal * depth)
}

fileReader('input.txt', move_submarine)
fileReader('input.txt', move_submarine_smart)
