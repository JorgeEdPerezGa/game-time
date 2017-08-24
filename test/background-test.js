const assert = require('chai').assert;
const Background = require('../lib/Background.js');

describe('Background', function () {

  it('should be a function', function () {
    assert.isFunction(Background);
  });

  it('should be able to animate background', function () {
    const background = new Background();

    assert.isFunction(background.animateBackground);
  });

  it('should have a function to fill background', function() {
    const background = new Background();

    assert.isFunction(background.draw);
  });

  it('should have a function to draw image', function() {
    const background = new Background();

    assert.isFunction(background.drawImg);
  });

  it('should not move background at start', function() {
    const background = new Background();

    assert.equal(background.x == 0, true);
    assert.equal(background.y == 0, true);
  });

  it('should move when game starts', function() {
    const background = new Background();

    assert.equal(background.x == 0, true);
    assert.equal(background.y == 0, true);
    background.backgroundMove();
    assert.equal(background.x < 0, true);
    assert.equal(background.y == 0, true);
  });



});
