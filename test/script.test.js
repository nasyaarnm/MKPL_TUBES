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

let testsPassed = 0;
let testsFailed = 0;

function assert(condition, message) {
    if (condition) {
        console.log(`✅ LULUS: ${message}`);
        testsPassed++;
    } else {
        console.error(`❌ GAGAL: ${message}`);
        testsFailed++;
        process.exitCode = 1;
    }
}

console.log("--- Memulai Tes Unit Tic-Tac-Toe ---");

assert(checkWin(['X', 'X', 'X', '', '', '', '', '', '']) === 'X', "Menang Horizontal oleh X");
assert(checkWin(['O', '', '', 'O', '', '', 'O', '', '']) === 'O', "Menang Vertikal oleh O");
assert(checkWin(['', '', 'X', '', 'X', '', 'X', '', '']) === 'X', "Menang Diagonal Terbalik oleh X");
assert(checkWin(['', '', '', '', '', '', '', '', '']) === null, "Belum Ada Pemenang");
assert(checkWin(['X', 'O', 'X', 'X', 'O', 'O', 'O', 'X', 'X']) === null, "Seri: Tidak Ada Pemenang");
assert(checkDraw(['X', 'O', 'X', 'X', 'O', 'O', 'O', 'X', 'X']) === true, "Deteksi Seri yang Benar");
assert(checkDraw(['X', 'O', '', '', 'O', 'O', 'X', 'X', '']) === false, "Belum Seri");

console.log("--- Tes Unit Selesai ---");
console.log(`Total Tes: ${testsPassed + testsFailed}, Lulus: ${testsPassed}, Gagal: ${testsFailed}`);

if (testsFailed > 0) {
    console.error("🔴 Beberapa tes unit gagal!");
} else {
    console.log("🟢 Semua tes unit berhasil!");
}