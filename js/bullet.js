// Kill spacerocks with this. Also a MovingObject subclass.
(function () {
  if (typeof Asteroids === 'undefined') {
    window.Asteroids = {};
  }

  var Bullet = Asteroids.Bullet = function (options) {

    Asteroids.MovingObject.call(this, {
      pos: options.pos,
      vel: options.vel,
      radius: Bullet.RADIUS,
      color: Bullet.COLOR,
      game: options.game
    });

    this.isWrappable = false;
    this.game.add(this);
  }

  Bullet.RADIUS = 3;
  Bullet.COLOR = 'red'

  Asteroids.Utils.inherits(Bullet, Asteroids.MovingObject);

  Bullet.prototype.collideWith = function (otherObject) {
    if (otherObject instanceof Asteroids.Asteroid) {
      this.game.remove(otherObject);
      this.game.remove(this);
    }
  };

})();
