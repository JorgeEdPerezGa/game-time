class Enigma {
  constructor() {
    this.x = 100,
    this.y = 100,
    this.width  = 30,
    this.height = 30
  }

  draw (context) {
    context.fillStyle = 'transparent'
    context.fillRect(this.x, this.y, this.width, this.height);
  }

  drawImg (context, img) {
    context.drawImage(img, this.x - 5, this.y - 5, this.width + 10, this.height + 10);
  }

  fly(canvas) {
    this.x -= 60;
  }

  gravity(canvas) {
    this.x += 2;
  }
}

module.exports = Enigma;
