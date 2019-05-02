var canvas;
var canvasContext;
var ballX = 50;
var ballY = 50;
var ballSpeedX = 10;
var ballSpeedY = 4;

var player1Score = 0;
var player2Score = 0;
const winingScore = 3;

var paddle1Y = 250;
var paddle2Y = 250;

const paddleThickness = 10;
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

  if (player1Score >= winingScore || player2Score >= winingScore) {

    player1Score = 0;
    player2Score = 0;
  }

  // changing direction
  ballSpeedX = -ballSpeedX;

  // resets ball
  ballX = canvas.width / 2;
  ballY = canvas.height / 2;
}

function computerMovement() {

  var paddle2YCenter = paddle2Y + (paddleHeight / 2);
  if (paddle2Y < ballY - 35) {
    paddle2Y += 6;
  }else if (paddle2Y > ballY + 35) {
    paddle2Y -= 6;
  }
}

function move() {

  computerMovement();

  ballX += ballSpeedX;
  ballY += ballSpeedY;

  if (ballX < 0) {
    if (ballY > paddle1Y && ballY < paddle1Y + paddleHeight) {
      ballSpeedX = -ballSpeedX;

      var deltaY = ballY - (paddle1Y+paddleHeight/2);
      ballSpeedY = deltaY * 0.35;
    }else {
      player2Score++;
      ballReset();
    }
  }
  if (ballX > canvas.width) {
    if (ballY > paddle2Y && ballY < paddle2Y + paddleHeight) {
      ballSpeedX = -ballSpeedX;

      var deltaY = ballY - (paddle2Y+paddleHeight/2);
      ballSpeedY = deltaY * 0.35;
    }else {
      player1Score++;
      ballReset();
    };
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
  drawRectElement(0, paddle1Y, paddleThickness, paddleHeight, 'white');

  // PC paddle
  drawRectElement(canvas.width - paddleThickness, paddle2Y, paddleThickness, paddleHeight, 'white');

  // ball
  drawCircleElement(ballX, ballY, 10, 'red');

  canvasContext.fillText(player1Score, 100, 100);
  canvasContext.fillText(player2Score, canvas.width - 100, 100);
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
