const {fileReader} = require("../helper");

// we create a matrix called grid. We interpet the indexes as nodes and the respective values as weighted graph edges
// meaning that in a graph 1 1 6 3 for example (0,0) => (0,1) the edge cost is 1. (0,1) => (0,2) edge cost is 6
//                         1 3 8 1
//                         2 1 3 6
//                         3 6 9 4

const findUnvisitedNeighbours = (node, unvisited) => {
    const [x,y] = node;

    // left, right, top, bottom neigbours
    const indexes = [[x - 1, y], [x + 1, y], [x, y - 1], [x, y + 1]]

    // check first that index is in bounds and if it is unvisited
    return indexes.filter((indexes) => unvisited[indexes[1]]?.[indexes[0]]);
}

const createBiggerMap = (grid) => {
    // extend horizontally
    grid = grid.map((row) => {
        let newRow = [...row];
        for (let i = 1; i < 5; i++) {
            const newValues = [...row].map(value => {
                const newValue = value + i
              return newValue < 10 ? newValue : (newValue % 10) + 1;
            })
            newRow = newRow.concat(newValues)
        }
        return newRow
    })
    // extend vertically
    let newGrid = [...grid]
    for (let i = 1; i < 5; i++) {
        grid.forEach(row => {
            const newValues = [...row].map(value => {
                const newValue = value + i
                return newValue < 10 ? newValue : (newValue % 10) + 1;
            })
            newGrid.push(newValues)
        })
    }
    //newGrid.forEach(row => console.log(row.join("")))
    return newGrid;
}

const djikstra = (graph) => {
    const height = graph.length;
    const width = graph[0].length;
    const distances = Array.from(Array(height), _ => Array(width).fill(Infinity))
    const unvisited = distances.map(row => row.map(() => true))
    distances[0][0] = 0; // initial node is distance 0

    let currentNode = [0,0]
    let currentNodeValue = 0
    const possiblePaths = {}

    while (true) {
        unvisited[currentNode[1]][currentNode[0]] = false;
        const unvisitedNeighbors = findUnvisitedNeighbours(currentNode, unvisited);
        unvisitedNeighbors.forEach(coord => {
            const neighborValue = +graph[coord[1]][coord[0]]
            const newDistance = neighborValue + currentNodeValue;
            // if shorter, set new distance
            if (newDistance < distances[coord[1]][coord[0]]) {
                distances[coord[1]][coord[0]] = newDistance
            }

            const neighborIdx = `${coord[0]}${coord[1]}`
            if (possiblePaths[neighborIdx]?.value) {
                const shorterDistance = newDistance < possiblePaths[neighborIdx].value ? newDistance : possiblePaths[neighborIdx].value
                possiblePaths[neighborIdx] = {idx: coord, value: shorterDistance}
            } else {
                possiblePaths[neighborIdx] = {idx: coord, value: newDistance}
            }
        })

        let smallestKey = Object.keys(possiblePaths)[0]
        const firstPossiblePath = possiblePaths[smallestKey]

        const nextCurrentNode = Object.keys(possiblePaths).reduce((newNode, key) => {
            const currentNewNode = possiblePaths[key];
            if (currentNewNode.value < newNode.value) {
                smallestKey = key;
                return currentNewNode
            } else {
                return newNode
            }
        }, firstPossiblePath)

        delete possiblePaths[smallestKey]
        currentNode = nextCurrentNode.idx
        currentNodeValue = nextCurrentNode.value
        if (distances[height -1][width - 1] !== Infinity) break;
    }



    console.log(distances[height-1][width-1])
    //distances.forEach(row => console.log(row.join(",")))
}

const pathfinder = (input) => {
    const grid = input.map(row => row.split("").map(el => +el))

    djikstra(grid)
    const bigGrid = createBiggerMap(grid)
    djikstra(bigGrid)
}

fileReader("input.txt", pathfinder);