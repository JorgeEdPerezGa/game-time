class Player {
  constructor() {
    this.x = 110;
    this.y = 300;
    this.width = 150;
    this.height = 25;
    this.speedX = 0;
    this.speedY = 0;
    this.gravity = 0.25;
    this.gravitySpeed = 0;
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
      this.gravitySpeed += this.gravity;
      this.x += this.speedX;
      this.y += this.speedY + this.gravitySpeed;
    }
  }

  fly () {
    if (this.y > 75) {
      this.y -= 75;
    }
  }

  detectCollision (canvas, pipeArray) {
    if (this.y + this.height >= canvas.height) {
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
        return true;
      }
    }
    return false;
  }
}

module.exports = Player;
