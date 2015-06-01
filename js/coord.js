(function () {
  if (typeof Asteroids === "undefined") {
    window.Asteroids = {};
  }

  var Coord = Asteroids.Coord = function (options) {
    if (options.x !== undefined && options.y !== undefined) {
      this.x = options.x;
      this.y = options.y;

      this.radius = this.calcRadius();
      this.theta = this.calcTheta();
    } else if (options.radius !== undefined && options.theta !== undefined) {
      this.radius = options.radius;
      this.theta = options.theta;

      this.x = this.calcRect()[0];
      this.y = this.calcRect()[1];
    } else {
      throw "Invalid Coordinate Arguments!";
    }
  };

  Coord.prototype.calcRadius = function () {
    return ((this.x * this.x) + (this.y * this.y));
  };

  Coord.prototype.calcRect = function () {
    return ([
      this.radius * Math.sin(this.theta),
      this.radius * Math.cos(this.theta)
    ]);
  };

  Coord.prototype.calcTheta = function () {
    if (this.radius === 0) {
      return 0;
    } else {
      return (Math.asin(this.x / this.radius));
    }
  };
})();
