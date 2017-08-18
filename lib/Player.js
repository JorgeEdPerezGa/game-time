class Player {
  constructor () {
    this.x = 110;
    this.y = 300;
    this.width = 230;
    this.height = 30;
  }

  draw (c) {
    c.fillStyle = 'black';
    c.fillRect = (this.x, this.y, this.width, this.height)
  }

  drawImg (c, img) {
    c.drawImage(img, this.x - 5, this.y - 5, this.width + 10, this.height + 10);
  }

  fall (canvas) {
    if (this.y < canvas.height - this.height) {
      this.y += 10;
    }
  }

  fly () {
    if (this.y > 75) {
      this.y -= 75;
    }
  }
}

module.exports = Player;
