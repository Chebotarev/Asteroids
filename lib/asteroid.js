(function () {

  if (typeof Asteroids === 'undefined') {
    window.Asteroids = {};
  }


  var Asteroid = Asteroids.Asteroid = function (pos, game) {
    var vel = Asteroids.Utils.randVector(); // Pass in length later

    Asteroids.MovingObject.call( this, {
      pos: pos,
      vel: vel,
      radius: Asteroid.RADIUS,
      color: Asteroid.COLOR,
      game: game
    });
  };

  Asteroids.Utils.inherits(Asteroid, Asteroids.MovingObject);

  Asteroid.COLOR = 'black';
  Asteroid.RADIUS = 20;

  Asteroid.prototype.collideWith = function(otherObject) {
    if (otherObject instanceof Asteroids.Ship) {
      otherObject.relocate();
    } else if (otherObject instanceof Asteroids.Bullet) {
      this.game.remove(this);
      this.game.remove(otherObject);
    }
  }
})();
