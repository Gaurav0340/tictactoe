let board = ['', '', '', '', '', '', '', '', ''];
let currentPlayer = 'X';
let gameActive = true;
let xWins = 0;
let oWins = 0;

const cells = document.querySelectorAll('.cell');
const resetButton = document.getElementById('reset');
const overlay = document.getElementById('overlay');
const gameResult = document.getElementById('game-result');
const overlayResetButton = document.getElementById('overlay-reset');
const xWinsDisplay = document.getElementById('x-wins');
const oWinsDisplay = document.getElementById('o-wins');

const winningCombination = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

function handleClick(event) {
  const cellIndex = event.target.getAttribute('data-index');

  if (board[cellIndex] || !gameActive) return;

  board[cellIndex] = currentPlayer;
  event.target.innerText = currentPlayer;
  event.target.style.color = currentPlayer === 'X' ? getRandomColor() : getRandomColor();

  checkWinner();

  currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
}

function getRandomColor() {
  const colors = ['#FF5733', '#33FF57', '#3357FF', '#FF33F6', '#FF8633', '#33F4FF'];
  return colors[Math.floor(Math.random() * colors.length)];
}

function checkWinner() {
  for (let combination of winningCombination) {
    const [a, b, c] = combination;
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      gameActive = false;
      showGameResult(`${currentPlayer} Wins!`);
      updateScore(currentPlayer);
      return;
    }
  }

  if (!board.includes('')) {
    gameActive = false;
    showGameResult("It's a Draw!");
  }
}

function showGameResult(result) {
  overlay.style.display = 'flex';
  gameResult.innerText = result;
}

function updateScore(player) {
  if (player === 'X') {
    xWins++;
    xWinsDisplay.innerText = xWins;
  } else {
    oWins++;
    oWinsDisplay.innerText = oWins;
  }
}

function resetGame() {
  board = ['', '', '', '', '', '', '', '', ''];
  currentPlayer = 'X';
  gameActive = true;
  cells.forEach(cell => {
    cell.innerText = '';
    cell.style.color = '';
  });
  overlay.style.display = 'none';
}

resetButton.addEventListener('click', resetGame);
overlayResetButton.addEventListener('click', resetGame);
cells.forEach(cell => cell.addEventListener('click', handleClick));
