const {fileReader} = require("../helper");

const t = (input) => {
    const [coordx, coordy] = input[0].split(": ")[1].split(", ");
    const [x1, x2] = coordx.replace("x=", "").split("..").map(el => +el);
    const [y1, y2] = coordy.replace("y=", "").split("..").map(el => +el);

    const possibleXs = [];
    let counter = 0
    let steps = 0
    for (let i = 1; i < x2 ; i++) {
        counter += i;
        steps++;
        if (counter > x1) possibleXs.push(steps);
        if (counter > x2) break;
    }

    let answers = [];
    let heights = [];
    for (let y = 1; y <= Math.max(Math.abs(y1),Math.abs(y2)); y++) {
        possibleXs.forEach(x => {
            let startX = x;
            let startY = y;
            let runningX = 0;
            let runningY = 0;
            let highestY = 0;
            while (true) {
                runningX += startX;
                runningY += startY;
                startX = Math.max(startX - 1,0);
                startY--;
                if (runningY > highestY) highestY = runningY;
                if (runningX > x2 || runningY < y1) { break }
                if (runningX >= x1 && runningY <= y2) {
                    answers.push([x,y]);
                    heights.push(highestY);
                    break;
                }
            }
        })
    }

    console.log({answers, heights})

    console.log("max", Math.max(...heights))
}

fileReader("input.txt", t)