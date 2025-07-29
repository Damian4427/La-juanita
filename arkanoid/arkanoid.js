const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

let gameStarted = false;
let lives = 3;
let score = 0;
let gameOver = false;


const ball = {
  x: canvas.width / 2,
  y: canvas.height - 30,
  radius: 10,
  dx: 2,
  dy: -2
};

const paddle = {
  height: 10,
  width: 75,
  x: (canvas.width - 75) / 2,
  speed: 7,
  rightPressed: false,
  leftPressed: false
};

const brick = {
  rowCount: 3,
  columnCount: 5,
  width: 75,
  height: 20,
  padding: 10,
  offsetTop: 30,
  offsetLeft: 30
};

let bricks = [];

function initBricks() {
  bricks = [];
  for (let c = 0; c < brick.columnCount; c++) {
    bricks[c] = [];
    for (let r = 0; r < brick.rowCount; r++) {
      bricks[c][r] = { x: 0, y: 0, status: 1 };
    }
  }
}

initBricks();

// Event listeners
document.addEventListener("keydown", keyDownHandler);
document.addEventListener("keyup", keyUpHandler);

function keyDownHandler(e) {
  if (e.key === "Right" || e.key === "ArrowRight") {
    paddle.rightPressed = true;
    if (!gameStarted) gameStarted = true;
  } else if (e.key === "Left" || e.key === "ArrowLeft") {
    paddle.leftPressed = true;
    if (!gameStarted) gameStarted = true;
  }
}

function keyUpHandler(e) {
  if (e.key === "Right" || e.key === "ArrowRight") {
    paddle.rightPressed = false;
  } else if (e.key === "Left" || e.key === "ArrowLeft") {
    paddle.leftPressed = false;
  }
}

function collisionDetection() {
  for (let c = 0; c < brick.columnCount; c++) {
    for (let r = 0; r < brick.rowCount; r++) {
      const b = bricks[c][r];
      if (b.status === 1) {
        if (
          ball.x > b.x &&
          ball.x < b.x + brick.width &&
          ball.y > b.y &&
          ball.y < b.y + brick.height
        ) {
          ball.dy = -ball.dy;
          b.status = 0;
          score++;
          if (score === brick.rowCount * brick.columnCount) {
            setTimeout(() => {
              alert("¡Ganaste!");
              resetGame();
            }, 500);
          }
        }
      }
    }
  }
}

function drawBall() {
  ctx.beginPath();
  ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
  ctx.fillStyle = "#fff";
  ctx.fill();
  ctx.closePath();
}

function drawPaddle() {
  ctx.beginPath();
  ctx.rect(paddle.x, canvas.height - paddle.height, paddle.width, paddle.height);
  ctx.fillStyle = "#0f0";
  ctx.fill();
  ctx.closePath();
}

function drawBricks() {
  for (let c = 0; c < brick.columnCount; c++) {
    for (let r = 0; r < brick.rowCount; r++) {
      if (bricks[c][r].status === 1) {
        const brickX = c * (brick.width + brick.padding) + brick.offsetLeft;
        const brickY = r * (brick.height + brick.padding) + brick.offsetTop;
        bricks[c][r].x = brickX;
        bricks[c][r].y = brickY;

        ctx.beginPath();
        ctx.rect(brickX, brickY, brick.width, brick.height);
        ctx.fillStyle = "#f00";
        ctx.fill();
        ctx.closePath();
      }
    }
  }
}

function drawScore() {
  ctx.font = "16px Arial";
  ctx.fillStyle = "#fff";
  ctx.fillText("Puntos: " + score, 8, 20);
}

function drawLives() {
  ctx.font = "16px Arial";
  ctx.fillStyle = "#fff";
  ctx.fillText("Vidas: " + lives, canvas.width - 80, 20);
}

function resetBallAndPaddle() {
  ball.x = canvas.width / 2;
  ball.y = canvas.height - 30;
  ball.dx = 2;
  ball.dy = -2;
  paddle.x = (canvas.width - paddle.width) / 2;
  gameStarted = false;
}

function resetGame() {
  lives = 3;
  score = 0;
  initBricks();
  resetBallAndPaddle();
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawBricks();
  drawBall();
  drawPaddle();
  drawScore();
  drawLives();
  collisionDetection();

  if (gameStarted) {
    if (ball.x + ball.dx > canvas.width - ball.radius || ball.x + ball.dx < ball.radius) {
      ball.dx = -ball.dx;
    }

    if (ball.y + ball.dy < ball.radius) {
      ball.dy = -ball.dy;
    } else if (ball.y + ball.dy > canvas.height - ball.radius) {
      if (ball.x > paddle.x && ball.x < paddle.x + paddle.width) {
        ball.dy = -ball.dy;
      } else {
        lives--;
        if (lives > 0) {
  resetBallAndPaddle();
} else if (!gameOver) {
  gameOver = true;
  setTimeout(() => {
    alert("¡Fin del juego!");
    resetGame();
    gameOver = false;
  }, 500);
}
      }
    }

    ball.x += ball.dx;
    ball.y += ball.dy;
  }

  if (paddle.rightPressed && paddle.x < canvas.width - paddle.width) {
    paddle.x += paddle.speed;
  } else if (paddle.leftPressed && paddle.x > 0) {
    paddle.x -= paddle.speed;
  }

  requestAnimationFrame(draw);
}

draw();
