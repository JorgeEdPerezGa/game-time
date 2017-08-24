const GamePiece = require('./GamePiece.js');

class Pipe extends GamePiece {
  constructor(canvas, gapSize, padding) {
    super(canvas.width, 0, 100, 0);
    this.point = true;
    this.gapSize = gapSize;
    this.padding = padding;

    this.top = {
      y: 0,
      height: (Math.floor(Math.random() * (((canvas.height - gapSize - padding) - padding) + 1)) + padding)
    };

    this.bottom = {
      y: this.top.height + this.gapSize,
      height: canvas.height - (this.top.height + this.gapSize)
    };
  }

  move(speed) {
    this.x -= speed;
  }

  draw(context) {
    context.fillStyle = 'transparent';
    context.fillRect(this.x, this.top.y, this.width, this.top.height);          // top
    context.fillRect(this.x, this.bottom.y, this.width, this.bottom.height);    // bottom
  }

  drawImg (context, img1, img2) {
    context.drawImage(img1, this.x, this.top.y, this.width, this.top.height);
    context.drawImage(img2, this.x, this.bottom.y, this.width, this.bottom.height);
  }
}

module.exports = Pipe;
