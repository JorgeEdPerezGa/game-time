class Instructions {
  constructor() {
    this.x = 0;
    this.y = 0;
  }

  drawInstructions (context) {
    let instructions = new Image();

    instructions.src = '../images/instructions.png';
    context.drawImage(instructions, this.x, this.y);
  }
}

module.exports = Instructions;
