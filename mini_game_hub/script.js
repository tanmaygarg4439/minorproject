function showGame(gameId) {
  document.querySelector('.hub-container').style.display = 'none';
  document.querySelectorAll('.game').forEach(game => game.classList.remove('active'));
  document.getElementById(gameId).classList.add('active');
}

function goBack() {
  document.querySelector('.hub-container').style.display = 'flex';
  document.querySelectorAll('.game').forEach(game => game.classList.remove('active'));
}

// Initialize particles.js
particlesJS("particles-js", {
  particles: {
    number: { value: 60 },
    color: { value: "#00ffe7" },
    shape: { type: "circle" },
    opacity: { value: 0.5 },
    size: { value: 3 },
    move: { enable: true, speed: 1.5 }
  },
  interactivity: {
    events: {
      onhover: { enable: true, mode: "repulse" }
    }
  }
});
// --- Tic Tac Toe ---
let currentPlayer = "X";
const board = [];

function createBoard() {
  const table = document.getElementById("board");
  table.innerHTML = "";
  for (let i = 0; i < 3; i++) {
    board[i] = [];
    const row = document.createElement("tr");
    for (let j = 0; j < 3; j++) {
      board[i][j] = "";
      const cell = document.createElement("td");
      cell.style.border = "1px solid white";
      cell.style.width = "60px";
      cell.style.height = "60px";
      cell.style.fontSize = "24px";
      cell.style.cursor = "pointer";
      cell.style.textAlign = "center";
      cell.onclick = () => makeMove(i, j, cell);
      row.appendChild(cell);
    }
    table.appendChild(row);
  }
}

function makeMove(i, j, cell) {
  if (board[i][j] === "") {
    board[i][j] = currentPlayer;
    cell.textContent = currentPlayer;
    if (checkWin(currentPlayer)) {
      document.getElementById("ttt-status").textContent = `${currentPlayer} wins!`;
    } else {
      currentPlayer = currentPlayer === "X" ? "O" : "X";
    }
  }
}

function checkWin(player) {
  return (
    [0,1,2].some(i => board[i].every(c => c === player)) ||
    [0,1,2].some(i => board.every(row => row[i] === player)) ||
    board.every((row, i) => row[i] === player) ||
    board.every((row, i) => row[2 - i] === player)
  );
}

function resetTicTacToe() {
  currentPlayer = "X";
  createBoard();
  document.getElementById("ttt-status").textContent = "";
}

// --- Number Guessing ---
let targetNumber;

function startGuessGame() {
  targetNumber = Math.floor(Math.random() * 100) + 1;
  document.getElementById("guessResult").textContent = "";
}

function checkGuess() {
  const guess = parseInt(document.getElementById("guessInput").value);
  const result = document.getElementById("guessResult");
  if (guess === targetNumber) {
    result.textContent = "🎉 Correct!";
  } else if (guess < targetNumber) {
    result.textContent = "Too low!";
  } else {
    result.textContent = "Too high!";
  }
}

// --- Rock Paper Scissors ---
function playRPS(userChoice) {
  const choices = ["rock", "paper", "scissors"];
  const bot = choices[Math.floor(Math.random() * 3)];
  const result = document.getElementById("rpsResult");
  if (userChoice === bot) result.textContent = "It's a draw!";
  else if (
    (userChoice === "rock" && bot === "scissors") ||
    (userChoice === "scissors" && bot === "paper") ||
    (userChoice === "paper" && bot === "rock")
  ) result.textContent = `You win! ${userChoice} beats ${bot}`;
  else result.textContent = `You lose! ${bot} beats ${userChoice}`;
}

// Init
createBoard();
startGuessGame();
