// function checkWin(board) {
//   const winningConditions = [
//     [0,1,2], [3,4,5], [6,7,8], // Rows
//     [0,3,6], [1,4,7], [2,5,8], // Columns
//     [0,4,8], [2,4,6]           // Diagonals
//   ];
//   for (let condition of winningConditions) {
//     const [a, b, c] = condition;
//     if (board[a] && board[a] === board[b] && board[a] === board[c]) {
//       return board[a];
//     }
//   }
//   return null;
// }

// function checkDraw(board) {
//   return board.every(cell => cell !== '') && !checkWin(board);
// }

// // Unit test

// describe('Tic-Tac-Toe Logic Tests', () => {
//   test('detects a win by X in a row', () => {
//     const board = ['X', 'X', 'X', '', '', '', '', '', ''];
//     expect(checkWin(board)).toBe('X');
//   });

//   test('detects a win by O in a column', () => {
//     const board = ['O', '', '', 'O', '', '', 'O', '', ''];
//     expect(checkWin(board)).toBe('O');
//   });

//   test('detects a diagonal win by X', () => {
//     const board = ['X', '', '', '', 'X', '', '', '', 'X'];
//     expect(checkWin(board)).toBe('X');
//   });

//   test('detects a draw', () => {
//     const board = ['X', 'O', 'X', 'X', 'O', 'O', 'O', 'X', 'X'];
//     expect(checkDraw(board)).toBe(true);
//   });

//   test('detects not a draw if still moves left', () => {
//     const board = ['X', 'O', 'X', '', 'O', 'O', 'O', 'X', 'X'];
//     expect(checkDraw(board)).toBe(false);
//   });

//   test('returns null if no winner yet', () => {
//     const board = ['X', 'O', 'X', '', '', '', '', '', ''];
//     expect(checkWin(board)).toBe(null);
//   });
// });
