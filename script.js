const board = document.querySelector('.board');
const cells = [];
const size = 19;
let gameEnded = false;
let players = {
    black: {
        class: 'black-stone',
        name: '흑돌'
    },
    white: {
        class: 'white-stone',
        name: '백돌'
    }
  }
const winnerInfo = document.getElementById('winner-info');
const restartButton = document.getElementById('restart-button');

// 현재 플레이어 설정
let currentPlayer = players.black;

// 보드 생성
for (let i = 0; i < size; i++) {
    for (let j = 0; j < size; j++) {
        let cell = document.createElement('div');
        cell.className = 'cell';
        cell.dataset.row = i;
        cell.dataset.col = j;
        cell.addEventListener('click', handleCellClick);
        board.appendChild(cell);
        cells.push(cell);
    }
}

// 돌 놓기
function placeStone(cell, player) {
    const stone = document.createElement('div');
    stone.className = player.class;
    cell.appendChild(stone);
}

// 승리 조건 확인
function checkWinCondition(cell) {
    if (gameEnded) return;

    const row = parseInt(cell.dataset.row);
    const col = parseInt(cell.dataset.col);
    const currentPlayerClass = currentPlayer.class;

    function checkDirection(dx, dy) {
        let count = 1;
        for (let i = 1; i < 5; i++) {
            const newRow = row + i * dx;
            const newCol = col + i * dy;
            const nextCell = cells.find(cell => cell.dataset.row == newRow && cell.dataset.col == newCol);
            if (nextCell && nextCell.classList.contains(currentPlayerClass)) {
                count++;
            } else {
                break;
            }
        }
        for (let i = 1; i < 5; i++) {
            const newRow = row - i * dx;
            const newCol = col - i * dy;
            const nextCell = cells.find(cell => cell.dataset.row == newRow && cell.dataset.col == newCol);
            if (nextCell && nextCell.classList.contains(currentPlayerClass)) {
                count++;
            } else {
                break;
            }
        }
        return count >= 5;
    }

    // 수평, 수직, 대각선 방향 모두 확인
    if (checkDirection(1, 0) || // 수평
        checkDirection(0, 1) || // 수직
        checkDirection(1, 1) || // 대각선 (왼쪽 상단에서 오른쪽 하단)
        checkDirection(1, -1)) { // 대각선 (왼쪽 하단에서 오른쪽 상단)
          alert(currentPlayer.name + ' 플레이어가 승리했습니다!');
        winnerInfo.innerText = currentPlayer.name + ' 플레이어가 승리했습니다!';
        gameEnded = true;
        return true;
    }

    return false;
}

// 게임 재시작 버튼 클릭 이벤트
restartButton.addEventListener('click', function () {
    cells.forEach(cell => {
        cell.innerHTML = '';
    });
    winnerInfo.innerText = '';
    gameEnded = false;
    currentPlayer = players.black;
});

// 돌 놓기 이벤트 핸들러
function handleCellClick() {
  if (gameEnded) return;
  if (!this.classList.contains('black-stone') && !this.classList.contains('white-stone')) {
      placeStone(this, currentPlayer);
      if (checkWinCondition(this)) {
          alert(currentPlayer.name + ' 플레이어가 승리했습니다!');
          gameEnded = true;
      } else {
          // 플레이어 교체
          currentPlayer = currentPlayer === players.black ? players.white : players.black;
      }
  }
}