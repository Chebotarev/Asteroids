// Kill spacerocks with this. Also a MovingObject subclass.
(function () {
  if (typeof Asteroids === 'undefined') {
    window.Asteroids = {};
  }

  var Bullet = Asteroids.Bullet = function (ship) {
    console.log(ship);
    Asteroids.MovingObject.call(this,
      ship.pos,
      ship.vel,
      Bullet.RADIUS,
      Bullet.COLOR
    );

    this.game.bullets.push(this);
  }

  Bullet.RADIUS = 3;
  Bullet.COLOR = 'green'

  Asteroids.Utils.inherits(Bullet, Asteroids.MovingObject);
})();
