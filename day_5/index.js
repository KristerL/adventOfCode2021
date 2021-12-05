const {fileReader} = require("../helper");

const gridSize = 1000
let grid = Array.from(Array(gridSize), _ => Array(gridSize).fill(0));

const isDiagonal = ({startX, endX, startY, endY}) => {
    const x_offset = Math.abs(startX - endX)
    const y_offset = Math.abs(startY - endY)
    return x_offset === y_offset;
}

const markGrid = ({from, to, disableDiagonal = true}) => {
    const [startX, startY] = from.split(",").map(n => parseInt(n));
    const [endX, endY] = to.split(",").map(n => parseInt(n));

    const isDiagonalStep = isDiagonal({startX, endX, startY, endY})
    const isHorizontalOrVertical = startX !== endX && startY !== endY;
    if ((!isDiagonalStep || disableDiagonal) && isHorizontalOrVertical) {
        return;
    }

    const steps = Math.max(Math.abs(startX - endX),Math.abs(startY - endY))
    let xDirection = startX === endX ? 0 : startX > endX ? -1 : 1;
    let yDirection = startY === endY ? 0 : startY > endY ? -1 : 1;

    for (let i = 0; i <= steps; i++) {
        grid[startY + (yDirection * i)][startX + (xDirection * i)]++
    }
}

const hydrothermalVentureDiagonal = (input) => {
    grid = Array.from(Array(gridSize), _ => Array(gridSize).fill(0));
    hydrothermalVenture(input, false)
}

const hydrothermalVenture = (input, disableDiagonal) => {
    input.forEach(command => {
        const [from, to] = command.split(" -> ");
        markGrid({from, to, disableDiagonal});
    })
    const dangerousAreasCount = grid.flat().filter(value => value > 1).length;
    console.log({dangerousAreasCount});
}



fileReader("input.txt", hydrothermalVenture)
fileReader("input.txt", hydrothermalVentureDiagonal)