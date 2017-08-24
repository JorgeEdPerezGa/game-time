var assert = require('chai').assert;
var Pipe = require('../lib/Player.js');
var canvas = { width: 900, height: 700 };

describe('Pipe', function () {

  it('should be a function', function () {
    assert.isFunction(Pipe);
  });


  it('should not move when game starts', function() {
    var pipe = new Pipe();

    assert.equal(pipe.x >= 0, true);
  });
});
