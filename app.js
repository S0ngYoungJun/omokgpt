const board = document.getElementById('board');
const result = document.getElementById('result');
const restartButton = document.getElementById('restart');
let currentPlayer = 'black';
let gameOver = false;

// 바둑판 그리기
function createBoard() {
  for (let i = 0; i < 19; i++) {
      for (let j = 0; j < 19; j++) {
          const cell = document.createElement('div');
          cell.className = 'cell';
          cell.dataset.row = i;
          cell.dataset.col = j;
          board.appendChild(cell);
      }
  }
}

// 클릭 이벤트 처리
board.addEventListener('click', (event) => {
  if (gameOver) return;

  const cell = event.target;
  if (cell.classList.contains('cell') && !cell.classList.contains('black-stone') && !cell.classList.contains('white-stone')) {
      const stoneClass = currentPlayer === 'black' ? 'black-stone' : 'white-stone';
      cell.classList.add(stoneClass);

      if (checkWin(cell)) {
          gameOver = true;
          result.textContent = `플레이어 ${currentPlayer} 승리!`;
      } else {
          currentPlayer = currentPlayer === 'black' ? 'white' : 'black';
      }
  }
});

// 오목 게임 규칙에 따라 승리 여부 확인
function checkWin(cell) {
  const row = parseInt(cell.dataset.row);
  const col = parseInt(cell.dataset.col);
  const playerClass = currentPlayer === 'black' ? 'black-stone' : 'white-stone';

  // 가로, 세로, 대각선 방향으로 승리 여부 확인
  if (
      checkDirection(row, col, playerClass, 1, 0) || // 가로
      checkDirection(row, col, playerClass, 0, 1) || // 세로
      checkDirection(row, col, playerClass, 1, 1) || // 대각선 (왼쪽 위에서 오른쪽 아래로)
      checkDirection(row, col, playerClass, 1, -1)   // 대각선 (왼쪽 아래에서 오른쪽 위로)
  ) {
      return true;
  }

  return false;
}

// 특정 방향으로 다섯 개의 돌이 연속되는지 확인
function checkDirection(row, col, playerClass, rowDirection, colDirection) {
  let count = 1;
  count += countInDirection(row, col, playerClass, rowDirection, colDirection, 1);
  count += countInDirection(row, col, playerClass, -rowDirection, -colDirection, 1);
  return count >= 5;
}

// 특정 방향으로 연속된 돌의 개수 확인
function countInDirection(row, col, playerClass, rowDirection, colDirection, count) {
  if (count === 5) return 5;

  const nextRow = row + rowDirection;
  const nextCol = col + colDirection;

  const nextCell = document.querySelector(`[data-row="${nextRow}"][data-col="${nextCol}"]`);

  if (nextCell && nextCell.classList.contains(playerClass)) {
      return countInDirection(nextRow, nextCol, playerClass, rowDirection, colDirection, count + 1);
  } else {
      return count;
  }
}
// 재시작 버튼 클릭
restartButton.addEventListener('click', () => {
    clearBoard();
    currentPlayer = 'black';
    gameOver = false;
    result.textContent = '게임 결과: ';
});

// 바둑판 초기화
function clearBoard() {
    const cells = document.querySelectorAll('.cell');
    cells.forEach(cell => cell.textContent = '');
}

// 게임 초기화
createBoard();
