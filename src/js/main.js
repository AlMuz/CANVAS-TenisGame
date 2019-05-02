var canvas;
var canvasContext;
var ballX = 50;
var ballSpeedX = 5;

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

    ballX += ballSpeedX;
    if (ballX < 0) {
      ballSpeedX = -ballSpeedX;
    }
    if (ballX > canvas.width) {
      ballSpeedX = -ballSpeedX;
    }
}

function draw() {

  // background
  drawRectElement(0, 0, canvas.width, canvas.height, 'black');

  // paddle
  drawRectElement(0, 210, 10, 100, 'white');

  // ball
  drawCircleElement(ballX, 100, 10, 'red');
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
