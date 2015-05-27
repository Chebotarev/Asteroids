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
     this.pos[0],
     this.pos[1],
     this.radius,
     0,
     2 * Math.PI,
     false
   );

   ctx.fill();
  };

  MovingObject.prototype.move = function () {
    var deltaX = this.pos[0] + this.vel[0];
    var deltaY = this.pos[1] + this.vel[1];

    if (this.game.isOutOfBounds(this.pos) && this.isWrappable) {
      if (this.isWrappable) {
        this.pos = this.game.wrap([deltaX, deltaY]);
      } else {
        this.game.remove(this);
      }
    } else {
      this.pos[0] = deltaX;
      this.pos[1] = deltaY;
    }
  };

  MovingObject.prototype.isCollidedWith = function (otherObject) {
    var distance = Math.sqrt(
      Math.pow((this.pos[0] - otherObject.pos[0]), 2) +
      Math.pow((this.pos[1] - otherObject.pos[1]), 2)
    )

    if (distance <= ( this.radius + otherObject.radius )) {
      return true;
    } else {
      return false;
    }
  };

  MovingObject.prototype.collideWith = function (otherObject) {};
})();
