require('../lib/style.css');

const {playerImg, pipeImg, reversePipeImg} = require('../lib/images.js')

var Enigma = require('./Enigma.js')
var Building = require('./Building.js')
var Bird = require('./Bird.js')

var canvas = document.getElementById('game');
var context = canvas.getContext('2d');

window.addEventListener('keydown', flying);
canvas.addEventListener('click', flying);
const enigma = new Enigma();

// playerImg.onload = () => enigma.drawImg(context, playerImg);
// enigma.draw(context);


var building1 = new Building(100, 400);
var building2 = new Building(300, 300);
var building3 = new Building(500, 400);
var building4 = new Building(700, 500);

var bird1 = new Bird(100, 0);
var bird2 = new Bird(300, -100);
var bird3 = new Bird(500, 0);
var bird4 = new Bird(700, 0);

function flying() {
  enigma.fly()
  enigma.gravity()
}

function updateEnigma() {
  enigma.fall(canvas);
  engima.draw(c);
  player.drawEnigma
}

function gameLoop () {
  context.fillStyle = "black";

  context.clearRect(0, 0, canvas.width, canvas.height);
  context.fillRect(enigma.y, enigma.x += 2, enigma.width, enigma.height);

  context.fillStyle = "silver";
  context.fillRect(building1.x -= 2, building1.y, 100, 200);
  context.fillRect(bird1.x -= 2, bird1.y, 100, 200);
  if (building1.x <= -100) {
    building1.x = 700;
  }
  if (bird1.x <= -100) {
    bird1.x = 700
  }

  context.fillStyle = "blue";
  context.fillRect(building2.x -= 2, building2.y, 100, 300);
  context.fillRect(bird2.x -= 2, bird2.y, 100, 200);
  if (building2.x <= -100) {
    building2.x = 700;
  } if (bird2.x <= -100) {
    bird2.x = 700
  }


  context.fillStyle = "orange";
  context.fillRect(building3.x -= 2, building3.y, 100, 200);
  context.fillRect(bird3.x -= 2, bird3.y, 100, 200);
  if (building3.x <= -100) {
    building3.x = 700;
  } if (bird3.x <= -100) {
    bird3.x = 700
  }

  context.fillStyle = "green";
  context.fillRect(building4.x -= 2, building4.y, 100, 200);
  context.fillRect(bird4.x -= 2, bird4.y, 100, 300);
  if (building4.x <= -100) {
    building4.x = 700;
  } if (bird4.x <= -100) {
    bird4.x = 700
  }
  requestAnimationFrame(gameLoop);
}

requestAnimationFrame(gameLoop);
