const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
const topScoreLabel = document.getElementById("topScore");
const bottomScoreLabel = document.getElementById("bottomScore");
const startButton = document.getElementById("startButton");

const ballRadius = 10;
const paddleHeight = 10;
const paddleWidth = 100;
let ballX = canvas.width / 2;
let ballY = canvas.height - 30;
let ballSpeedX = 10;
let ballSpeedY = -10;

let topPaddleX = (canvas.width - paddleWidth) / 2;
let bottomPaddleX = (canvas.width - paddleWidth) / 2;
let isTopPaddleMovingLeft = false;
let isTopPaddleMovingRight = false;
let isBottomPaddleMovingLeft = false;
let isBottomPaddleMovingRight = false;
canvas.style.backgroundColor = "bisque";
let topScore = 0;
let bottomScore = 0;

function drawBall() {
    ctx.beginPath();
    ctx.arc(ballX, ballY, ballRadius, 0, Math.PI * 2);
    ctx.fillStyle = "red";
    ctx.fill();
    ctx.closePath();
}

function drawPaddle(x, y) {
    ctx.beginPath();
    ctx.rect(x, y, paddleWidth, paddleHeight);
    ctx.fillStyle = "blue";
    ctx.fill();
    ctx.closePath();
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    drawBall();
    drawPaddle(topPaddleX, 0);
    drawPaddle(bottomPaddleX, canvas.height - paddleHeight);

    ballX += ballSpeedX;
    ballY += ballSpeedY;

    // 충돌 감지 및 처리
    if (ballY - ballRadius < 0) {
        // 상단 바 충돌
        ballSpeedY = -ballSpeedY;
        topScore++;
    } else if (ballY + ballRadius > canvas.height) {
        // 하단 바 충돌
        ballSpeedY = -ballSpeedY;
        bottomScore++;
    }

    if (ballX - ballRadius < 0 || ballX + ballRadius > canvas.width) {
        // 양쪽 벽 충돌
        ballSpeedX = -ballSpeedX;
    }

    if (
        ballY + ballRadius > canvas.height - paddleHeight &&
        ballX > bottomPaddleX &&
        ballX < bottomPaddleX + paddleWidth
    ) {
        // 하단 바와 공 충돌
        ballSpeedY = -ballSpeedY;
    }

    if (
        ballY - ballRadius < paddleHeight &&
        ballX > topPaddleX &&
        ballX < topPaddleX + paddleWidth
    ) {
        // 상단 바와 공 충돌
        ballSpeedY = -ballSpeedY;
    }

    topScoreLabel.textContent = bottomScore;
    bottomScoreLabel.textContent = topScore;

    requestAnimationFrame(draw);
}

startButton.addEventListener("click", () => {
    requestAnimationFrame(draw);
});

// 패들 움직임 제어
document.addEventListener("keydown", (event) => {
  if (event.key === "ArrowLeft") {
      isBottomPaddleMovingLeft = true;
  } else if (event.key === "ArrowRight") {
      isBottomPaddleMovingRight = true;
  }

  if (event.key === "a") {
      isTopPaddleMovingLeft = true;
  } else if (event.key === "d") {
      isTopPaddleMovingRight = true;
  }
});

document.addEventListener("keyup", (event) => {
  if (event.key === "ArrowLeft") {
      isBottomPaddleMovingLeft = false;
  } else if (event.key === "ArrowRight") {
      isBottomPaddleMovingRight = false;
  }

  if (event.key === "a") {
      isTopPaddleMovingLeft = false;
  } else if (event.key === "d") {
      isTopPaddleMovingRight = false;
  }
});

function moveBottomPaddle() {
  if (isBottomPaddleMovingLeft && bottomPaddleX > 0) {
      bottomPaddleX -= 5;
  }
  if (isBottomPaddleMovingRight && bottomPaddleX < canvas.width - paddleWidth) {
      bottomPaddleX += 5;
  }
}

function moveTopPaddle() {
  if (isTopPaddleMovingLeft && topPaddleX > 0) {
      topPaddleX -= 5;
  }
  if (isTopPaddleMovingRight && topPaddleX < canvas.width - paddleWidth) {
      topPaddleX += 5;
  }
}

setInterval(moveBottomPaddle, 5);
setInterval(moveTopPaddle, 5);