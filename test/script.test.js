const mockDOM = {
    querySelectorAll: jest.fn(),
    getElementById: jest.fn(),
    addEventListener: jest.fn(),
    createElement: jest.fn()
};

global.document = mockDOM;

function checkWin(board) {
    const winningConditions = [
        [0,1,2], [3,4,5], [6,7,8], // Rows
        [0,3,6], [1,4,7], [2,5,8], // Columns
        [0,4,8], [2,4,6]           // Diagonals
    ];
    for (let condition of winningConditions) {
        const [a, b, c] = condition;
        if (board[a] && board[a] === board[b] && board[a] === board[c]) {
            return board[a];
        }
    }
    return null;
}

function checkDraw(board) {
    return board.every(cell => cell !== '') && !checkWin(board);
}

// Fungsi untuk menguji logika game state
function getGameState(board, currentPlayer) {
    const winner = checkWin(board);
    const isDraw = checkDraw(board);
    
    return {
        winner,
        isDraw,
        gameActive: !winner && !isDraw,
        nextPlayer: winner || isDraw ? currentPlayer : (currentPlayer === 'X' ? 'O' : 'X')
    };
}

function isValidMove(board, index) {
    return index >= 0 && index < 9 && board[index] === '';
}

function makeMove(board, index, player) {
    if (!isValidMove(board, index)) {
        return null;
    }
    
    const newBoard = [...board];
    newBoard[index] = player;
    return newBoard;
}

let testsPassed = 0;
let testsFailed = 0;

function assert(condition, message) {
    if (condition) {
        console.log(`✅ LULUS: ${message}`);
        testsPassed++;
    } else {
        console.error(`❌ GAGAL: ${message}`);
        testsFailed++;
    }
}

function assertEqual(actual, expected, message) {
    assert(JSON.stringify(actual) === JSON.stringify(expected), 
           `${message} - Expected: ${JSON.stringify(expected)}, Got: ${JSON.stringify(actual)}`);
}

console.log("--- Memulai Enhanced Unit Tests ---");

// Test checkWin function
console.log("\n🔍 Testing checkWin function:");
assert(checkWin(['X', 'X', 'X', '', '', '', '', '', '']) === 'X', "Horizontal win X (row 1)");
assert(checkWin(['', '', '', 'O', 'O', 'O', '', '', '']) === 'O', "Horizontal win O (row 2)");
assert(checkWin(['', '', '', '', '', '', 'X', 'X', 'X']) === 'X', "Horizontal win X (row 3)");
assert(checkWin(['X', '', '', 'X', '', '', 'X', '', '']) === 'X', "Vertical win X (col 1)");
assert(checkWin(['', 'O', '', '', 'O', '', '', 'O', '']) === 'O', "Vertical win O (col 2)");
assert(checkWin(['', '', 'X', '', '', 'X', '', '', 'X']) === 'X', "Vertical win X (col 3)");
assert(checkWin(['X', '', '', '', 'X', '', '', '', 'X']) === 'X', "Diagonal win X (top-left to bottom-right)");
assert(checkWin(['', '', 'O', '', 'O', '', 'O', '', '']) === 'O', "Diagonal win O (top-right to bottom-left)");
assert(checkWin(['', '', '', '', '', '', '', '', '']) === null, "Empty board - no winner");
assert(checkWin(['X', 'O', 'X', 'O', 'O', 'X', 'O', 'X', 'O']) === null, "Full board - no winner");

// Test checkDraw function
console.log("\n🤝 Testing checkDraw function:");
assert(checkDraw(['X', 'O', 'X', 'X', 'O', 'O', 'O', 'X', 'X']) === true, "Draw detected correctly");
assert(checkDraw(['X', 'O', 'X', 'O', 'O', 'X', 'O', 'X', 'O']) === true, "Another draw scenario");
assert(checkDraw(['X', 'O', '', '', 'O', 'O', 'X', 'X', '']) === false, "Not a draw - game continues");
assert(checkDraw(['X', 'X', 'X', 'O', 'O', '', 'O', '', '']) === false, "Not a draw - X wins");
assert(checkDraw(['', '', '', '', '', '', '', '', '']) === false, "Empty board - not a draw");

// Test getGameState function
console.log("\n🎮 Testing getGameState function:");
let state1 = getGameState(['X', 'X', 'X', '', '', '', '', '', ''], 'X');
assertEqual(state1, {winner: 'X', isDraw: false, gameActive: false, nextPlayer: 'X'}, "Game state with X winner");

let state2 = getGameState(['X', 'O', 'X', 'X', 'O', 'O', 'O', 'X', 'X'], 'O');
assertEqual(state2, {winner: null, isDraw: true, gameActive: false, nextPlayer: 'O'}, "Game state with draw");

let state3 = getGameState(['X', 'O', '', '', '', '', '', '', ''], 'X');
assertEqual(state3, {winner: null, isDraw: false, gameActive: true, nextPlayer: 'O'}, "Active game state");

// Test isValidMove function
console.log("\n✅ Testing isValidMove function:");
assert(isValidMove(['', '', '', '', '', '', '', '', ''], 0) === true, "Valid move on empty cell");
assert(isValidMove(['X', '', '', '', '', '', '', '', ''], 0) === false, "Invalid move on occupied cell");
assert(isValidMove(['', '', '', '', '', '', '', '', ''], -1) === false, "Invalid move - negative index");
assert(isValidMove(['', '', '', '', '', '', '', '', ''], 9) === false, "Invalid move - index out of bounds");
assert(isValidMove(['', '', '', '', '', '', '', '', ''], 8) === true, "Valid move on last cell");

// Test makeMove function
console.log("\n🎯 Testing makeMove function:");
let move1 = makeMove(['', '', '', '', '', '', '', '', ''], 0, 'X');
assertEqual(move1, ['X', '', '', '', '', '', '', '', ''], "Valid move creates new board");

let move2 = makeMove(['X', '', '', '', '', '', '', '', ''], 0, 'O');
assertEqual(move2, null, "Invalid move returns null");

let move3 = makeMove(['X', '', '', '', '', '', '', '', ''], 4, 'O');
assertEqual(move3, ['X', '', '', '', 'O', '', '', '', ''], "Valid move on center");

// Test edge cases
console.log("\n🚨 Testing edge cases:");
assert(checkWin(['X', 'X', '', 'X', '', '', '', '', '']) === null, "Almost win but not quite");
assert(checkDraw(['X', 'O', 'X', 'O', 'X', 'O', 'O', '', 'X']) === false, "Almost draw but not quite");

// Test multiple winning conditions (shouldn't happen in real game)
assert(checkWin(['X', 'X', 'X', 'X', 'X', 'X', 'X', 'X', 'X']) === 'X', "Multiple wins still returns winner");

// Test mixed scenarios
console.log("\n🔄 Testing mixed scenarios:");
let emptyBoard = ['', '', '', '', '', '', '', '', ''];
let gameInProgress = ['X', 'O', '', 'O', 'X', '', '', '', ''];
let almostWin = ['X', 'X', '', 'O', 'O', '', '', '', ''];

assert(getGameState(emptyBoard, 'X').gameActive === true, "Empty board is active");
assert(getGameState(gameInProgress, 'X').nextPlayer === 'O', "Next player switches correctly");
assert(getGameState(almostWin, 'X').gameActive === true, "Almost win scenario is still active");

console.log("\n--- Enhanced Unit Tests Selesai ---");
console.log(`Total Tes: ${testsPassed + testsFailed}, Lulus: ${testsPassed}, Gagal: ${testsFailed}`);

if (testsFailed > 0) {
    console.error("🔴 Beberapa tes unit gagal!");
} else {
    console.log("🟢 Semua tes unit berhasil!");
}

// Export functions for potential integration testing
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        checkWin,
        checkDraw,
        getGameState,
        isValidMove,
        makeMove
    };
}