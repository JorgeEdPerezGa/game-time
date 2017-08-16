require('./style.css');
var canvas = document.getElementById('game');
var context = canvas.getContext('2d');


var x = 100;
var y = 100;


context.fillStyle = "blue";
// context.fillRect(20, 20, 80, 20);  // x, y, width, height

requestAnimationFrame(function gameLoop () {
  context.clearRect(0, 0, canvas.width, canvas.height);
  context.fillRect(x, y += 5, 80, 20);
  requestAnimationFrame(gameLoop);
});

  requestAnimationFrame(gameLoop);
