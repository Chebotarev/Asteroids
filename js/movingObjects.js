// Base class for anything that moves.
// Most important methods are #move, #draw(ctx), #isCollidedWith(otherMovingObject).

(function () {
  if (typeof Asteroids === 'undefined') {
    window.Asteroids = {};
  }

  var MovingObject = Asteroids.MovingObject = function(options) {
    this.pos = options.pos;
    this.vel = options.vel;
    this.radius = options.radius;
    this.color = options.color;
    this.game = options.game;

    this.isWrappable = true;
    this.game.add(this);
  };

  MovingObject.prototype.draw = function (ctx) {
    ctx.fillStyle = this.color;
    ctx.beginPath();

    ctx.arc(
     this.pos.x,
     this.pos.y,
     this.radius,
     0,
     2 * Math.PI,
     false
   );

   ctx.fill();
   ctx.closePath();
  };

  MovingObject.prototype.move = function () {
    var delta = this.pos.add(this.vel);

    if (this.game.isOutOfBounds(this.pos) && this.isWrappable) {
      if (this.isWrappable) {
        this.pos = this.game.wrap(delta);
      } else {
        this.game.remove(this);
      }
    } else {
      this.pos = delta;
    }
  };

  MovingObject.prototype.isCollidedWith = function (otherObject) {
    var distance = Math.sqrt(
      Math.pow((this.pos.x - otherObject.pos.x), 2) +
      Math.pow((this.pos.y - otherObject.pos.y), 2)
    )

    if (distance <= ( this.radius + otherObject.radius )) {
      return true;
    } else {
      return false;
    }
  };

  MovingObject.prototype.collideWith = function (otherObject) {};
})();
