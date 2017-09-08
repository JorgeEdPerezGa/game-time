const GamePiece = require('./GamePiece.js');

class Player extends GamePiece {
  constructor(x, y, width, height) {
    super(x, y, width, height);
    this.speedX = 0;
    this.speedY = 0;
    this.gravity = 0.5;
    this.gravitySpeed = 0;
    this.collision = false;

  }

  draw (context) {
    context.fillStyle = 'transparent';
    context.fillRect(this.x, this.y, this.width, this.height);
  }

  drawImg (context, img) {
    context.drawImage(img, this.x - 5, this.y - 5, this.width + 10, this.height + 10);
  }

  gravityEffect (canvas) {
    if (this.y < canvas.height - this.height) {
      // this.gravitySpeed += this.gravity;
      this.speedY += this.gravity;

      this.x += this.speedX;
      this.y += this.speedY;
    }
  }

  fly () {
    if (this.y > 75) {
      this.speedY -= 10;
    }
  }

  detectCollision (canvas, pipeArray) {
    if (this.y + this.height >= canvas.height) {
      this.collision = true;
      return true;
    }
    if (pipeArray.length > 0) {
      if (
          this.x < pipeArray[0].x + pipeArray[0].width &&
          this.x + this.width > pipeArray[0].x &&
          this.y < pipeArray[0].top.y + pipeArray[0].top.height  &&
          this.height + this.y > pipeArray[0].top.y

          ||

          this.x < pipeArray[0].x + pipeArray[0].width &&
          this.x + this.width > pipeArray[0].x &&
          this.y < pipeArray[0].bottom.y + pipeArray[0].bottom.height  &&
          this.height + this.y > pipeArray[0].bottom.y

         ) {
        this.collision = true;
        return true;
      }
    }
    return false;
  }
}

module.exports = Player;
