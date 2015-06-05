// Holds collections of the asteroids, bullets, and your ship.
// #step method calls #move on all the objects, and #checkCollisions checks for colliding objects.
// #draw(ctx) draws the game.
// Keeps track of dimensions of the space; wraps objects around when they drift off the screen.

(function () {
  if (typeof Asteroids === 'undefined') {
    window.Asteroids = {};
  }

  var Game = Asteroids.Game = function () {
    this.asteroids = [];
    this.initAsteroids();
    this.ship = new Asteroids.Ship({
      pos: new Asteroids.Coord({x: 375, y: 375}),
      game: this
    });
    this.bullets = [];
  };

  Game.DIM_X = 650;
  Game.DIM_Y = 650;
  Game.SPEED_LIMIT = 6;
  Game.NUM_ASTEROIDS = 5;

  Game.prototype.initAsteroids = function () {
    for (var i = 0; i < Game.NUM_ASTEROIDS; i++) {
      var pos = this.randomPosition();
      this.add(new Asteroids.Asteroid({ pos: pos, game: this }));
    }
  };

  Game.prototype.add = function (object) {
    if (object instanceof Asteroids.Asteroid) {
      this.asteroids.push(object);
    } else if (object instanceof Asteroids.Bullet) {
      this.bullets.push(object);
    }
  };

  Game.prototype.allObjects = function () {
    var objects = [];

    this.asteroids.forEach(function (arg) {
      objects.push(arg);
    });

    this.bullets.forEach(function (arg) {
      objects.push(arg);
    });

    objects.push(this.ship);
    return objects;
  };

  Game.prototype.randomPosition = function () {
    var x = Math.floor(Math.random() * Game.DIM_X);
    var y = Math.floor(Math.random() * Game.DIM_Y);
    return new Asteroids.Coord({ x: x, y: y});
  };

  Game.prototype.draw = function (ctx, background) {
    ctx.clearRect(0, 0,
      Game.DIM_X + Asteroids.Asteroid.RADIUS,
      Game.DIM_Y + Asteroids.Asteroid.RADIUS
    );

    ctx.drawImage(background, 0, 0, Game.DIM_X, Game.DIM_Y);

    this.allObjects().forEach(function (arg) {
      arg.draw(ctx);
    });
  };

  Game.prototype.moveObjects = function (ctx) {
    this.allObjects().forEach(function (arg) {
      arg.move();
    });
  };

  Game.prototype.wrap = function(delta) {
    if (delta.x > Game.DIM_X) {
      var x = (delta.x - Game.DIM_X);
    } else if (delta.x < 0) {
      var x = (delta.x + Game.DIM_X);
    } else {
      var x = (delta.x)
    }

    if (delta.y > Game.DIM_Y) {
      var y = (delta.y - Game.DIM_Y);
    } else if (delta.y < 0) {
      var y = (delta.y + Game.DIM_Y);
    } else {
      var y = (delta.y)
    }

    return new Asteroids.Coord({ x: x, y: y});
  };

  Game.prototype.checkCollisions = function () {
    var objects = this.allObjects();
    var remaining = objects.length;

    for (var i = 0; i < remaining; i++) {
      var collidedObjects = [];
      for (var j = 0; j < remaining; j++) {
        if (i !== j && objects[i].isCollidedWith(objects[j])) {
          objects[i].collideWith(objects[j]);
          objects = this.allObjects();
          remaining = objects.length;
        }
      }
    }
  };

  Game.prototype.isOutOfBounds = function (pos) {
    if (pos.x > Game.DIM_X || pos.x < 0) {
      return true;
    } else if (pos.y > Game.DIM_Y || pos.y < 0) {
      return true;
    }
    return false;
  };

  Game.prototype.step = function (context) {
    this.moveObjects(context);
    this.checkCollisions();
  };

  Game.prototype.remove = function (object) {
    if (object instanceof Asteroids.Asteroid) {
      var asteroidIndex = this.asteroids.indexOf(object);
      this.asteroids.splice(asteroidIndex, 1);
    } else if (object instanceof Asteroids.Bullet) {
      var bulletIndex = this.bullets.indexOf(object);
      this.bullets.splice(bulletIndex, 1)
    }
  }

})();
