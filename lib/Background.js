class Background {
  constructor() {
    this.x = 0;
    this.y = 0;
    this.width = 900;
    this.height = 700;
  }

  draw (context) {
    context.fillStyle = 'solid';
    context.fillRect(this.x, this.y, this.width, this.height);
  }

  drawImg (context, img) {
    context.drawImage(img, this.x - 5, this.y - 5, this.width + 10, this.height + 10);
  }

}

module.exports = Background;
