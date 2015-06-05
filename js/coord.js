(function () {
  if (typeof Asteroids === "undefined") {
    window.Asteroids = {};
  }

  var Coord = Asteroids.Coord = function (options) {
    if (options.x !== undefined && options.y !== undefined) {
      this.x = options.x;
      this.y = options.y;

      this.radius = this.calcRadius(options.x, options.y);
      this.theta = this.calcTheta(options.x, options.y, this.radius);
    } else if (options.radius !== undefined && options.theta !== undefined) {
      this.radius = options.radius;
      this.theta = options.theta;

      var rectCoords = this.calcRect(options.radius, options.theta);
      this.x = rectCoords[0];
      this.y = rectCoords[1];
    } else {
      throw "Invalid Coordinate Arguments!";
    }
  };

  Coord.prototype.add = function (otherCoord) {
    var x = this.x + otherCoord.x;
    var y = this.y + otherCoord.y;

    return new Asteroids.Coord({ x: x, y: y });
  };

  Coord.prototype.calcRadius = function (x, y) {
    return Math.sqrt((x * x) + (y * y));
  };

  Coord.prototype.calcRect = function (radius, theta) {
    return ([
      (radius * Math.cos(theta)),
      (radius * Math.sin(theta))
    ]);
  };

  Coord.prototype.calcTheta = function (x, y, radius) {
    return (Math.atan2(y, x));
  };
})();
