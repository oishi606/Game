const cells = document.querySelectorAll('.cell');
const statusDisplay = document.getElementById('status');
const resetButton = document.getElementById('reset-btn');

let currentPlayer = 'X';
let gameActive = true;
let gameBoard = ['', '', '', '', '', '', '', '', ''];

const checkWinner = () => {
  const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];

  for (let combination of winningCombinations) {
    const [a, b, c] = combination;
    if (gameBoard[a] && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c]) {
      gameActive = false;
      statusDisplay.textContent = `${currentPlayer} Wins!`;
      return;
    }
  }

  if (!gameBoard.includes('')) {
    gameActive = false;
    statusDisplay.textContent = "It's a Draw!";
  }
};

const handleCellClick = (e) => {
  const cellIndex = e.target.id.split('-')[1];
  
  if (gameBoard[cellIndex] !== '' || !gameActive) {
    return;
  }

  gameBoard[cellIndex] = currentPlayer;
  e.target.textContent = currentPlayer;
  
  checkWinner();
  
  if (gameActive) {
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    statusDisplay.textContent = `${currentPlayer}'s Turn`;
  }
};

const resetGame = () => {
  gameActive = true;
  currentPlayer = 'X';
  gameBoard = ['', '', '', '', '', '', '', '', ''];
  cells.forEach(cell => cell.textContent = '');
  statusDisplay.textContent = `${currentPlayer}'s Turn`;
};

cells.forEach(cell => cell.addEventListener('click', handleCellClick));
resetButton.addEventListener('click', resetGame);
