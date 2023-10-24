// script.js
const board = document.getElementById("board");
const cells = []; // 바둑판의 모든 셀을 저장하는 배열
let currentPlayer = "black"; // 현재 플레이어 (black 또는 white)

// 바둑판 생성
for (let row = 0; row < 19; row++) {
    const rowCells = [];
    const rowElement = document.createElement("tr");
    for (let col = 0; col < 19; col++) {
        const cell = document.createElement("td");
        cell.dataset.row = row;
        cell.dataset.col = col;
        cell.addEventListener("click", handleCellClick);
        rowElement.appendChild(cell);
        rowCells.push(cell);
    }
    board.appendChild(rowElement);
    cells.push(rowCells);
}

// 셀 클릭 처리
function handleCellClick(event) {
  const cell = event.target;
  if (!cell.classList.contains("black-stone") && !cell.classList.contains("white-stone")) {
      placeStone(cell);
      if (checkWin(cell)) {
          alertMessage.textContent = currentPlayer + " 플레이어가 승리했습니다!";
          alertMessage.style.display = "block";
          resetButton.style.display = "block";
      } else {
          currentPlayer = currentPlayer === "black" ? "white" : "black";
      }
  }
}

// 돌 놓기
function placeStone(cell) {
    cell.classList.add(currentPlayer + "-stone");
}

// 승리 조건 확인
function checkWin(cell) {
  const row = parseInt(cell.dataset.row);
  const col = parseInt(cell.dataset.col);

  // 수평 방향 확인
  let horizontalCount = 1;
  for (let i = col + 1; i < 19 && cells[row][i].classList.contains(currentPlayer + "-stone"); i++) {
      horizontalCount++;
  }
  for (let i = col - 1; i >= 0 && cells[row][i].classList.contains(currentPlayer + "-stone"); i--) {
      horizontalCount++;
  }

  // 수직 방향 확인
  let verticalCount = 1;
  for (let i = row + 1; i < 19 && cells[i][col].classList.contains(currentPlayer + "-stone"); i++) {
      verticalCount++;
  }
  for (let i = row - 1; i >= 0 && cells[i][col].classList.contains(currentPlayer + "-stone"); i--) {
      verticalCount++;
  }

  // 대각선 방향 확인 (우하향 대각선)
  let diagonalCount1 = 1;
  for (let i = row + 1, j = col + 1; i < 19 && j < 19 && cells[i][j].classList.contains(currentPlayer + "-stone"); i++, j++) {
      diagonalCount1++;
  }
  for (let i = row - 1, j = col - 1; i >= 0 && j >= 0 && cells[i][j].classList.contains(currentPlayer + "-stone"); i--, j--) {
      diagonalCount1++;
  }

  // 대각선 방향 확인 (우상향 대각선)
  let diagonalCount2 = 1;
  for (let i = row + 1, j = col - 1; i < 19 && j >= 0 && cells[i][j].classList.contains(currentPlayer + "-stone"); i++, j--) {
      diagonalCount2++;
  }
  for (let i = row - 1, j = col + 1; i >= 0 && j < 19 && cells[i][j].classList.contains(currentPlayer + "-stone"); i--, j++) {
      diagonalCount2++;
  }

  // 어느 방향에서도 다섯 개의 돌이 연속으로 놓인 경우 승리
  if (horizontalCount >= 5 || verticalCount >= 5 || diagonalCount1 >= 5 || diagonalCount2 >= 5) {
      return true;
  }

  return false;
}

// 게임 재시작
function resetGame() {
  cells.forEach((row) => {
      row.forEach((cell) => {
          cell.classList.remove("black-stone", "white-stone");
      });
  });
  currentPlayer = "black";
  alertMessage.style.display = "none";
  resetButton.style.display = "none";
}

// 리셋 버튼 클릭 처리
resetButton.addEventListener("click", resetGame);

// 다양한 승리 조건을 확인하기 위한 함수를 구현해야 합니다.