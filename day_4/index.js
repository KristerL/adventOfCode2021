const {matrixReader} = require("../helper");

const hasWinningBoard = ({bingoBoards}) => {
    return bingoBoards.findIndex(bingoBoard => {
        const isColumnWinner = checkIfHasColumnWinner(bingoBoard);
        const isRowWinner = checkIfHasWinnerRow(bingoBoard);
        return isColumnWinner || isRowWinner;
    })
}

const checkIfHasWinnerRow = (bingo_board) => {
    return bingo_board.some(row => {
        const rowSum = row.reduce((acc, value) => acc + +value,0)
        return rowSum === -5
    })
}

const checkIfHasColumnWinner = (bingo_board) => {
    let hasWinningColumn = false
    for (let i = 0; i < 5; i++) {
        let columnSum = 0;
        for (let j = 0; j < 5; j++) {
            columnSum += +bingo_board[j][i];
        }
        if (columnSum === -5) {
           hasWinningColumn = true;
           break;
        }
    }
    return hasWinningColumn;
}
// marks found numbers as -1
const markBingoBoards = ({bingoBoards, bingoNumber}) => {
    bingoBoards = bingoBoards.map(bingoBoard => {
        return bingoBoard.map((row, idx) => {
            const changeIndex = row.findIndex(number => {
                return +number === bingoNumber;
            })
            if (changeIndex >= 0) row[changeIndex] = -1
            return row
        })
    })
    return bingoBoards
}

const calculateBoardSum = (bingoBoard) => {
    return bingoBoard.reduce((totalSum, row) => {
        const rowSum = row.reduce((curr, val) => {
            val = val === -1 ? 0 : +val
            return curr + val
        },0)
        return totalSum + rowSum
    }, 0)
}

const createBingoBoards = (input) => {
    // keep all data except first row, that contains bingo numbers
    let bingoBoards = input.slice(1);
    // split data clusters to boards
    bingoBoards = bingoBoards.map(board => board.split("\n"));
    // convert boards to correct format
    bingoBoards = bingoBoards.map(board => {
        board = board.filter(row => row.length) // remove whitespace row
        board = board.map(row => {
            // split by numbers
            row = row.split(" ");
            // filter out additional spaces
            row = row.filter(Boolean);
            // convert values to numbers
            row = row.map(val => +val);

            return row;
        })
        return board;
    })
    return bingoBoards;
}

const bingo_player = (input) => {
    const bingoNumbers = input[0].split(",")
    let bingoBoards = createBingoBoards(input);

    let lastNumber = 0;
    let winningBoardIndex = 0
    bingoNumbers.some(bingoNumber => {
        lastNumber = +bingoNumber
        bingoBoards = markBingoBoards({bingoBoards, bingoNumber: lastNumber})
        const winningIndex = hasWinningBoard({bingoBoards});
        const isWinner = winningIndex >= 0;
        if (isWinner) {
            lastNumber = bingoNumber
            winningBoardIndex = winningIndex;
        }

        return isWinner

    })

    const winningBoardSum = calculateBoardSum(bingoBoards[winningBoardIndex]);
    console.log(winningBoardSum * lastNumber)
}

const bad_bingo_player = (input) => {
    const bingoNumbers = input[0].split(",")
    let bingoBoards = createBingoBoards(input);

    let lastNumber = 0;
    let winningBoardIndexes = []
    let lastWinnerIndex = 0;

    bingoNumbers.some((bingoNumber, idx) => {
        lastNumber = +bingoNumber
        bingoBoards = markBingoBoards({bingoBoards, bingoNumber: lastNumber})
        const newWinningIndexes = hasNewWinningBoard({bingoBoards, winningBoardIndexes});
        const isWinner = newWinningIndexes.length > 0;
        if (isWinner) {
            lastNumber = bingoNumber
            winningBoardIndexes = [...winningBoardIndexes, ...newWinningIndexes]

            if (winningBoardIndexes.length === bingoBoards.length) {
                lastWinnerIndex = newWinningIndexes[0]
                return true;
            }
        }
        return false;
    })


    const losingBoardSum = calculateBoardSum(bingoBoards[lastWinnerIndex]);
    console.log(losingBoardSum * lastNumber)
}

const hasNewWinningBoard = ({bingoBoards, winningBoardIndexes}) => {
    const range = [...Array(bingoBoards.length).keys()]
    const stillNotWonIndexes = range.filter(idx => !winningBoardIndexes.includes(idx))
    const newWinnerIndexes = [];

    stillNotWonIndexes.forEach(idx => {
        const bingoBoard = bingoBoards[idx]
        const isColumnWinner = checkIfHasColumnWinner(bingoBoard);
        const isRowWinner = checkIfHasWinnerRow(bingoBoard);
        if (isColumnWinner || isRowWinner) {
            newWinnerIndexes.push(idx);
        }
    })
    return newWinnerIndexes;
}

matrixReader('input.txt', bingo_player)
matrixReader('input.txt', bad_bingo_player)