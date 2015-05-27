// This is you! Another MovingObject subclass.
(function () {
  if (typeof Asteroids === 'undefined') {
    window.Asteroids = {};
  }

  var Ship = Asteroids.Ship = function (options) {
    Asteroids.MovingObject.call(this, {
      pos: options.pos,
      vel: [0, 0],
      radius: Ship.RADIUS,
      color: Ship.COLOR,
      game: options.game
    });
  }

  Ship.RADIUS = 5;
  Ship.COLOR = 'red';

  Asteroids.Utils.inherits(Ship, Asteroids.MovingObject);

  Ship.prototype.relocate = function() {
    this.pos = this.game.randomPosition();
    this.vel = [0, 0];
  };

  Ship.prototype.power = function (impulse) {
    if (Math.abs(this.vel[0]) < Asteroids.Game.SPEED_LIMIT) {
      this.vel[0] += impulse[0];
    }

    if (Math.abs(this.vel[1]) < Asteroids.Game.SPEED_LIMIT) {
      this.vel[1] += impulse[1];
    }
  };

  Ship.prototype.fireBullet = function () {
    var bullet = new Asteroids.Bullet({
      pos: this.pos.slice(0, 2),
      vel: this.vel.slice(0, 2),
      game: this.game
    });

    this.game.add(bullet);
  };

})();
