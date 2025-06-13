let board = ['', '', '', '', '', '', '', '', ''];
let currentPlayer = 'X';
let gameActive = true;
let scores = { X: 0, O: 0, draw: 0 };
let playerNames = { X: 'Player X', O: 'Player O' };

const cells = document.querySelectorAll('.cell');
const currentPlayerDisplay = document.getElementById('currentPlayer');
const gameStatus = document.getElementById('gameStatus');
const scoreX = document.getElementById('scoreX');
const scoreO = document.getElementById('scoreO');
const scoreDraw = document.getElementById('scoreDraw');
const playerXName = document.getElementById('playerXName');
const playerOName = document.getElementById('playerOName');
const playerNamesModal = document.getElementById('playerNamesModal');
const winnerModal = document.getElementById('winnerModal');
const winnerText = document.getElementById('winnerText');

const winConditions = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
    [0, 4, 8], [2, 4, 6] // diagonals
];

// Extracted game logic functions for better testability
function checkWinner() {
    return winConditions.some(condition => {
        const [a, b, c] = condition;
        return board[a] && board[a] === board[b] && board[a] === board[c];
    });
}

function isValidMove(index) {
    return board[index] === '' && gameActive;
}

function makeMove(index) {
    if (!isValidMove(index)) {
        return false;
    }
    
    board[index] = currentPlayer;
    return true;
}

function checkGameEnd() {
    if (checkWinner()) {
        return { type: 'win', player: currentPlayer };
    }
    
    if (board.every(cell => cell !== '')) {
        return { type: 'draw' };
    }
    
    return { type: 'continue' };
}

function switchPlayer() {
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    currentPlayerDisplay.textContent = playerNames[currentPlayer];
}

function updateUI() {
    cells.forEach((cell, index) => {
        cell.textContent = board[index];
        cell.classList.remove('x', 'o');
        if (board[index]) {
            cell.classList.add(board[index].toLowerCase());
        }
    });
}

function initializeGame() {
    cells.forEach((cell, index) => {
        cell.addEventListener('click', () => handleCellClick(index));
        cell.addEventListener('mouseenter', () => {
            if (gameActive && board[index] === '') {
                cell.setAttribute('data-hover', currentPlayer);
            }
        });
        cell.addEventListener('mouseleave', () => {
            cell.removeAttribute('data-hover');
        });
    });

    // Add click listener to winner modal to close it
    winnerModal.addEventListener('click', () => {
        winnerModal.style.display = 'none';
    });

    updateScoreDisplay();
    showPlayerNamesModal(); // Show modal on first load
}

function showPlayerNamesModal() {
    playerNamesModal.style.display = 'flex';
    document.getElementById('playerXInput').focus();
}

function startNewGame() {
    const playerXInput = document.getElementById('playerXInput').value.trim();
    const playerOInput = document.getElementById('playerOInput').value.trim();

    // Use default names if inputs are empty
    playerNames.X = playerXInput || 'Player X';
    playerNames.O = playerOInput || 'Player O';

    playerXName.textContent = playerNames.X;
    playerOName.textContent = playerNames.O;

    playerNamesModal.style.display = 'none';
    resetGame();
}

function handleCellClick(index) {
    if (!makeMove(index)) {
        return;
    }

    updateUI();
    
    const gameResult = checkGameEnd();
    
    switch (gameResult.type) {
        case 'win':
            handleWin();
            break;
        case 'draw':
            handleDraw();
            break;
        case 'continue':
            switchPlayer();
            gameStatus.textContent = '';
            break;
    }
}

function handleWin() {
    gameStatus.textContent = `${playerNames[currentPlayer]} menang!`;
    gameStatus.classList.add('winner');
    scores[currentPlayer]++;
    gameActive = false;
    updateScoreDisplay();
    showWinnerPopup();
}

function handleDraw() {
    gameStatus.textContent = "Seri!";
    scores.draw++;
    gameActive = false;
    updateScoreDisplay();
    showDrawPopup();
}

function showWinnerPopup() {
    const emojis = ['🎉', '🏆', '🎊', '🥳', '✨'];
    const randomEmoji = emojis[Math.floor(Math.random() * emojis.length)];
    winnerText.innerHTML = `${playerNames[currentPlayer]} menang! ${randomEmoji}`;
    winnerModal.style.display = 'flex';
}

function showDrawPopup() {
    winnerText.innerHTML = `Seri! 🤝`;
    winnerModal.style.display = 'flex';
}

function resetGame() {
    board = ['', '', '', '', '', '', '', '', ''];
    currentPlayer = 'X';
    gameActive = true;
    gameStatus.textContent = '';
    gameStatus.classList.remove('winner');
    currentPlayerDisplay.textContent = playerNames[currentPlayer];

    updateUI();
}

function resetScore() {
    scores = { X: 0, O: 0, draw: 0 };
    updateScoreDisplay();
}

function updateScoreDisplay() {
    scoreX.textContent = scores.X;
    scoreO.textContent = scores.O;
    scoreDraw.textContent = scores.draw;
}

// Handle Enter key in input fields - FIXED DUPLICATION
function setupKeyboardListeners() {
    document.getElementById('playerXInput').addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            document.getElementById('playerOInput').focus();
        }
    });

    document.getElementById('playerOInput').addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            startNewGame();
        }
    });
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    setupKeyboardListeners();
    initializeGame();
});

// Export functions for testing (if in Node.js environment)
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        checkWinner,
        isValidMove,
        makeMove,
        checkGameEnd,
        board,
        currentPlayer,
        gameActive,
        scores,
        playerNames
    };
}