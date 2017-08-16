require('./style.css');
var canvas = document.getElementById('game');
var context = canvas.getContext('2d');


var enigmaStartHeight = 0;
var enigmaStartLength = 0;

var buildingX1 = 100;
var buildingY1 = 400;

var birdX1 = 100;
var birdY1 = 0;


var buildingX2 = 300;
var buildingY2 = 300;

var birdX2 = 300;
var birdY2 = -100;


var buildingX3 = 500;
var buildingY3 = 400;

var birdX3 = 500;
var birdY3 = 0;


var buildingX4 = 700;
var buildingY4 = 500;

var birdX4 = 700;
var birdY4 = 0;


requestAnimationFrame(function gameLoop () {
  context.fillStyle = "black";
  context.clearRect(0, 0, canvas.width, canvas.height);
  context.fillRect(enigmaStartHeight, enigmaStartLength += 2, 80, 20);

  context.fillStyle = "silver";
  context.fillRect(buildingX1 -= 2, buildingY1, 100, 200);
  context.fillRect(birdX1 -= 2, birdY1, 100, 200);
  if (buildingX1 <= -100) {
    buildingX1 = 700;
  } if (birdX1 <= -100) {
    birdX1 = 700
  }

  context.fillStyle = "blue";
  context.fillRect(buildingX2 -= 2, buildingY2, 100, 300);
  context.fillRect(birdX2 -= 2, birdY2, 100, 200);
  if (buildingX2 <= -100) {
    buildingX2 = 700;
  } if (birdX2 <= -100) {
    birdX2 = 700
  }


  context.fillStyle = "orange";
  context.fillRect(buildingX3 -= 2, buildingY3, 100, 200);
  context.fillRect(birdX3 -= 2, birdY3, 100, 200);
  if (buildingX3 <= -100) {
    buildingX3 = 700;
  } if (birdX3 <= -100) {
    birdX3 = 700
  }

  context.fillStyle = "green";
  context.fillRect(buildingX4 -= 2, buildingY4, 100, 200);
  context.fillRect(birdX4 -= 2, birdY4, 100, 300);
  if (buildingX4 <= -100) {
    buildingX4 = 700;
  } if (birdX4 <= -100) {
    birdX4 = 700
  }

  requestAnimationFrame(gameLoop);
});

  requestAnimationFrame(gameLoop);
