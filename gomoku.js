const canvas = document.getElementById("omok-board");
const context = canvas.getContext("2d");
const resetButton = document.getElementById("reset-button");
const currentPlayerSpan = document.getElementById("current-player");
const winnerSpan = document.getElementById("winner");

const boardSize = 19;
const cellSize = canvas.width / boardSize;
let board = new Array(boardSize).fill(null).map(() => new Array(boardSize).fill(null));
let currentPlayer = "흑돌";
let winner = null;

function drawBoard() {
    // 바둑판 그리기
    context.fillStyle = "#f0d993"; // 바둑판의 선 색상
    for (let i = 0; i < boardSize; i++) {
        context.fillRect(0, i * cellSize, canvas.width, 1);
        context.fillRect(i * cellSize, 0, 1, canvas.height);
    }
}

function drawStone(x, y, color) {
    // 돌 그리기
    context.beginPath();
    context.arc(x * cellSize, y * cellSize, 18, 0, 2 * Math.PI);
    context.fillStyle = color;
    context.fill();
}

function checkForWinner(x, y) {
  const directions = [
      [1, 0], [0, 1], [1, 1], [1, -1]
  ];

  for (const [dx, dy] of directions) {
      let count = 1;
      count += countInDirection(x, y, dx, dy);
     

      if (count >= 5) {
          return currentPlayer;
      }
  }

  return null;
}

function countInDirection(x, y, dx, dy) {
  const color = board[y][x];
  let count = 0;
  let newX, newY;

  for (let i = 1; i < 5; i++) {
      newX = x + i * dx;
      newY = y + i * dy;

      if (newX >= 0 && newX < boardSize && newY >= 0 && newY < boardSize && board[newY][newX] === color) {
          count++;
      } else {
          break;
      }
  }

  for (let i = 1; i < 5; i++) {
      newX = x - i * dx;
      newY = y - i * dy;

      if (newX >= 0 && newX < boardSize && newY >= 0 && newY < boardSize && board[newY][newX] === color) {
          count++;
      } else {
          break;
      }
  }

  return count;
}

function handleClick(event) {
    if (winner) return;

    const x = Math.floor(event.offsetX / cellSize);
    const y = Math.floor(event.offsetY / cellSize);

    if (board[y][x] === null) {
        board[y][x] = currentPlayer;
        const stoneColor = currentPlayer === "흑돌" ? "#000000" : "#ffffff"; // 흑돌과 백돌의 색상 설정
        drawStone(x, y, stoneColor);

        winner = checkForWinner(x, y);
        if (winner) {
            winnerSpan.textContent = currentPlayer + " 승리!";
        } else {
            currentPlayer = currentPlayer === "흑돌" ? "백돌" : "흑돌";
            currentPlayerSpan.textContent = currentPlayer;
        }
    }
}

function resetGame() {
    board = new Array(boardSize).fill(null).map(() => new Array(boardSize).fill(null));
    winner = null;
    currentPlayer = "흑돌";
    winnerSpan.textContent = "없음";
    context.clearRect(0, 0, canvas.width, canvas.height);
    drawBoard();
    
}

canvas.addEventListener("click", handleClick);
resetButton.addEventListener("click", resetGame);

drawBoard();