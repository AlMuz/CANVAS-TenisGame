var canvas;
var canvasContext;
var ballX = 50;
var ballY = 50;
var ballSpeedX = 10;
var ballSpeedY = 4;

var paddle1Y = 250;
const paddleHeight = 100;

window.onload = () => {
  canvas = document.getElementById('gameCanvas');
  canvasContext = canvas.getContext('2d');

  var framesPerSecond = 30;
  setInterval(() => {
    move();
    draw();
  }, 1000/framesPerSecond);

  canvas.addEventListener('mousemove', function(evt){
    var mousePos = calculateMousePosition(evt);
    paddle1Y = mousePos.y-(paddleHeight/2);
  })
}

function calculateMousePosition(evt) {

  var rect = canvas.getBoundingClientRect();
  var root = document.documentElement;
  var mouseX = evt.clientX - rect.left - root.scrollLeft;
  var mouseY = evt.clientY - rect.top - root.scrollTop;
  return {
    x:mouseX,
    y:mouseY
  }
}

function ballReset() {

  // changing direction
  ballSpeedX = -ballSpeedX;

  // resets ball
  ballX = canvas.width / 2;
  ballY = canvas.height / 2;
}

function move() {

  ballX = ballX + ballSpeedX;
  ballY = ballY + ballSpeedY;

  if (ballX < 0) {
    if (ballY > paddle1Y && ballY < paddle1Y + paddleHeight) {
      ballSpeedX = -ballSpeedX;
    }else {
      ballReset();
    }
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
  drawRectElement(0, paddle1Y, 10, paddleHeight, 'white');

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
