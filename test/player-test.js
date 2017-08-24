const assert = require('chai').assert;
const Player = require('../lib/Player.js');
const Pipe = require('../lib/Pipe.js');
const canvas = { width: 900, height: 700 };

describe('Player', () => {

  it('should be a function', () => {
    assert.isFunction(Player);
  });

  it('should be able to feel the effects of gravity', () => {
    const player = new Player();

    assert.isFunction(player.gravityEffect);
  });

  it('should be able to fly / changing y value', () => {
    const player = new Player();

    player.fly();
    assert.equal(player.y, 225);
  });


  it('should fall at a specific rate', () => {
    const player = new Player();

    assert.equal(player.y, 300);
    player.gravityEffect(canvas);
    assert.equal(player.y, 300.25);
  });

  it('should evaluate to false when there is no collision', () => {
    const player = new Player(0, 0, 120, 25);
    const pipe = new Pipe(400, 400, 100, 100);

    assert.equal(player.collision, false);
  });

  it('should evaluate to true when there is collision', () => {
    const player = new Player(300, 300, 150, 25);
    const pipe = new Pipe(250, 250, 100, 500);

    player.detectCollision(player, pipe);
    assert.equal(player.collision, true);
  });

});
