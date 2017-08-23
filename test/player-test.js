var assert = require('chai').assert;
var Player = require('../lib/Player.js');
var canvas = { width: 900, height: 700 };
// var canvas = require('../lib/game.js');

describe('Player', function () {

  it('should be a function', function () {
    assert.isFunction(Player);
  });

  it('should be able to fall', function () {
    var player = new Player();
    assert.isFunction(player.fall);
  });

  it('should be able to fly / changing y value', function () {
    var player = new Player();
    player.fly();
    assert.equal(player.y, 225);
  });

it('should fall at a specific rate',
function () {
  var player = new Player();
  player.fall(canvas);
  assert.equal(player.y, 345);
})

});
