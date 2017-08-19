require('./game.js')

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
