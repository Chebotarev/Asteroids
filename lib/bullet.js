// Kill spacerocks with this. Also a MovingObject subclass.
(function () {
  if (typeof Asteroids === 'undefined') {
    window.Asteroids = {};
  }

  var Bullet = Asteroids.Bullet = function (ship) {
    var initialVel = [ship.vel[0], ship.vel[1]]
    Asteroids.MovingObject.call(this, {
      pos: ship.pos,
      vel: initialVel,
      radius: Bullet.RADIUS,
      color: Bullet.COLOR,
      game: ship.game
    });

    ship.game.bullets.push(this);
  }

  Bullet.RADIUS = 3;
  Bullet.COLOR = 'green'

  Asteroids.Utils.inherits(Bullet, Asteroids.MovingObject);
})();
