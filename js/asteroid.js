(function () {

  if (typeof Asteroids === 'undefined') {
    window.Asteroids = {};
  }


  var Asteroid = Asteroids.Asteroid = function (options) {
    var vel = Asteroids.Utils.randVector(2);

    Asteroids.MovingObject.call( this, {
      pos: options.pos,
      vel: vel,
      radius: Asteroid.RADIUS,
      color: Asteroid.COLOR,
      game: options.game
    });
  };

  Asteroids.Utils.inherits(Asteroid, Asteroids.MovingObject);

  Asteroid.COLOR = 'white';
  Asteroid.RADIUS = 20;

  Asteroid.prototype.collideWith = function(otherObject) {
    if (otherObject instanceof Asteroids.Ship) {
      otherObject.relocate();
    } else if (otherObject instanceof Asteroids.Bullet) {
      this.game.remove(otherObject);
      this.game.remove(this);
    }
  }
})();
