const assert = require('chai').assert;
const Player = require('../lib/Player.js');
const canvas = { width: 900, height: 700 };

describe('Player', () => {

  it('should be a function', () => {
    assert.isFunction(Player);
  });

  it('should be able to feel the effects of gravity', () => {
    var player = new Player();

    assert.isFunction(player.gravityEffect);
  });

  it('should be able to fly / changing y value', () => {
    var player = new Player();

    player.fly();
    assert.equal(player.y, 225);
  });


  it('should fall at a specific rate', () => {
    var player = new Player();

    player.gravityEffect(canvas);
    assert.equal(player.y, 300.25);
  });

});
