const {fileReader} = require("../helper");

const paperFolder = (input) => {
    doFold(input, true);
    doFold(input)
}

const generateImage = (dots) => {
    let [maxX, maxY] = dots[0]

    dots.forEach(dot => {
        const [x, y] = dot
        maxX = maxX < x ? x : maxX;
        maxY = maxY < y ? y : maxY;
    })

    let grid = Array.from(Array(maxY + 1), _ => Array(maxX + 1).fill("."))
    dots.forEach(dot => grid[dot[1]][dot[0]] = "#");
    grid.forEach(row => console.log(row.join(" ")))
}

const doFold = (input, doOneFold = false) => {
    const splitIdx = input.findIndex(el => el === "");
    let dots = input.slice(0, splitIdx).map(stringIndex => stringIndex.split(",").map(el => +el));
    let foldCommands = input.slice(splitIdx + 1).filter(el => el !== "");
    let [maxX, maxY] = dots[0]

    foldCommands = doOneFold ? [foldCommands[0]] : foldCommands;

    foldCommands.forEach(command => {
        let [direction, coord] = command.split(" ")[2].split("=")
        const coordIndex = direction === "y" ? 1 : 0;
        coord = +coord;
        dots.forEach(dot => {
            const [x, y] = dot
            maxX = maxX < x ? x : maxX;
            maxY = maxY < y ? y : maxY;
        })

        dots = dots.map(dot => {
            if (dot[coordIndex] > coord && coord * 2 - dot[coordIndex] >= 0) {
                dot[coordIndex] = coord * 2 - dot[coordIndex]
            }
            return dot;
        }).filter(dot => dot[coordIndex] <= coord) // removes those that go over when folding
    })

    doOneFold || generateImage(dots)

    const indexes = dots.map(dot => dot.join(""));
    const uniq = [...new Set(indexes)];
    console.log("Uniques", uniq.length)
}


fileReader("input.txt", paperFolder, false);
fileReader("example_input.txt", paperFolder, false);