var canvas;
var canvasContext;
var ballX = 50;
var ballY = 50;
var ballSpeedX = 10;
var ballSpeedY = 4;

window.onload = () => {
  canvas = document.getElementById('gameCanvas');
  canvasContext = canvas.getContext('2d');

  var framesPerSecond = 30;
  setInterval(() => {
    move();
    draw();
  }, 1000/framesPerSecond);
}

function move() {

    ballX = ballX + ballSpeedX;
    ballY = ballY + ballSpeedY;

    if (ballX < 0) {
      ballSpeedX = -ballSpeedX;
    }
    if (ballX > canvas.width) {
      ballSpeedX = -ballSpeedX;
    }

    if (ballY < 0) {
      ballSpeedY = -ballSpeedY;
    }
    if (ballY > canvas.height) {
      ballSpeedY = -ballSpeedY;
    }
}

function draw() {

  // background
  drawRectElement(0, 0, canvas.width, canvas.height, 'black');

  // paddle
  drawRectElement(0, 210, 10, 100, 'white');

  // ball
  drawCircleElement(ballX, ballY, 10, 'red');
}

function drawRectElement(leftX, topY, width, height, drawColor) {

  canvasContext.fillStyle = drawColor;
  canvasContext.fillRect(leftX, topY, width, height);
}

function drawCircleElement(centerX, centerY, radius, drawColor) {
  canvasContext.fillStyle = drawColor;
  canvasContext.beginPath();
  canvasContext.arc(centerX, centerY, radius, 0, Math.PI * 2, true);
  canvasContext.fill();
}
