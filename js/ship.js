(function () {
  if (typeof Asteroids === 'undefined') {
    window.Asteroids = {};
  }

  var Ship = Asteroids.Ship = function (options) {
    Asteroids.MovingObject.call(this, {
      pos: options.pos,
      vel: new Asteroids.Coord({ x: 0, y: 0}),
      radius: Ship.RADIUS,
      color: Ship.COLOR,
      game: options.game
    });
  }

  Ship.RADIUS = 10;
  Ship.COLOR = 'yellow';

  Asteroids.Utils.inherits(Ship, Asteroids.MovingObject);

  Ship.prototype.draw = function (ctx) {
    var x = this.pos.x;
    var y = this.pos.y;
    ctx.fillStyle = this.color;
    ctx.beginPath();

    ctx.moveTo(x, y);
    ctx.lineTo(x + 8, y + 20);
    ctx.lineTo(x, y + 16);
    ctx.lineTo(x - 8, y + 20);
    ctx.fill();

    ctx.closePath();
  };

  Ship.prototype.relocate = function() {
    this.pos = this.game.randomPosition();
    this.vel = new Asteroids.Coord({ x: 0, y: 0});
  };

  Ship.prototype.power = function (impulse) {
    if (Math.abs(this.vel.x + impulse[0]) < Asteroids.Game.SPEED_LIMIT) {
      this.vel.x += impulse[0];
    }

    if (Math.abs(this.vel.y + impulse[1]) < Asteroids.Game.SPEED_LIMIT) {
      this.vel.y += impulse[1];
    }
  };

  Ship.prototype.fireBullet = function () {
    var bullet = new Asteroids.Bullet({
      pos: new Asteroids.Coord({ x: this.pos.x, y: this.pos.y }),
      vel: new Asteroids.Coord({ x: this.vel.x, y: this.vel.y }),
      game: this.game
    });

    this.game.add(bullet);
  };

})();
