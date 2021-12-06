const {fileReader} = require("../helper");
const daysToLoop = 256

const optimizedLaternFish = (input) => {
    let fishes = input[0].split(",").map(number => +number)
    const fishSpawner = Array(9).fill(0);
    fishes.forEach(fishDay => fishSpawner[fishDay]++)

    for (let i = 0; i < daysToLoop; i++) {
        const fishesToRespawn = fishSpawner[0]
        for (let j = 0; j < 8; j++) fishSpawner[j] = fishSpawner[j+1];
        fishSpawner[6] += fishesToRespawn
        fishSpawner[8] = fishesToRespawn
    }

    const totalFishes = fishSpawner.reduce((acc, curr) => acc + curr, 0)
    console.log(totalFishes)
}

fileReader('input.txt', optimizedLaternFish)