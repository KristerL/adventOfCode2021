const {fileReader} = require("../helper");

const generateDataMaps = (input) => {
    let starts = [];
    let ends = [];
    let paths = {}

    input.forEach(command => {
        const split = command.split("-")
        const startIdx = split.findIndex(val => val === "start");
        const endIdx = split.findIndex(val => val === "end");
        const firstPart = split[Math.abs(startIdx - 1)];
        const secondPart = split[Math.abs(endIdx - 1)];

        if (secondPart) ends.push(secondPart)
        else if (firstPart) starts.push(firstPart)
        else {
            const first = split[0];
            const second = split[1]
            paths[first] = paths[first] ? [...paths[first], second] : [second]
            paths[second] = paths[second] ? [...paths[second], first] : [first]
        }
    })

    return { starts, ends, paths }
}

const stepper = ({currentLetter, paths, ends, currentPath, possiblePaths = [], isTwice = false, allowOnce = false}) => {
    const possiblePath = paths[currentLetter];
    const canEnd = ends.includes(currentLetter);
    let count = 0;


    if (canEnd) {
        const doesPathAlreadyExist = possiblePaths.some(path => JSON.stringify(path) === JSON.stringify(currentPath))
        if (!doesPathAlreadyExist) count +=  1
    }

    if (possiblePath.length === 0) { return count }

    possiblePath.forEach(letter => {
        const isLowerCase = letter === letter.toLowerCase();
        let newIsTwice = isTwice;
        if (isLowerCase && currentPath.includes(letter)) {
            if (isTwice || allowOnce) return [];
            newIsTwice = true
        }
        count += stepper({currentLetter: letter, paths, ends, currentPath: [...currentPath, letter], possiblePaths, isTwice: newIsTwice, allowOnce})
    })
    return count
}

const smallCavesOnce = (input) => {
    const { starts, ends, paths } = generateDataMaps(input)
    const possiblePaths = starts.map(start => stepper({currentLetter: start, paths, ends, currentPath: [start], allowOnce: true}))
    console.log(possiblePaths.reduce((acc,curr) => acc + curr,0))
}

const smallCavesTwice = (input) => {
    const { starts, ends, paths } = generateDataMaps(input)
    const possiblePaths = starts.map(start => stepper({currentLetter: start, paths, ends, currentPath: [start]}))
    console.log(possiblePaths.reduce((acc,curr) => acc + curr,0))
}



fileReader("input.txt", smallCavesOnce);
fileReader("input.txt", smallCavesTwice);