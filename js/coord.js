(function () {
  if (typeof Asteroids === "undefined") {
    window.Asteroids = {};
  }

  var Coord = Asteroids.Coord = function (options) {
    this.x = options.x;
    this.y = options.y;
    this.radius = options.radius || this.calcRadius();
    this.theta = options.theta || this.calcTheta();
  };

  Coord.prototype.calcRadius = function () {
    return ((this.x * this.x) + (this.y * this.y));
  };

  Coord.prototype.calcTheta = function () {
    if (this.radius === 0) {
      return 0;
    } else {
      return (Math.asin(this.x / this.radius));
    }
  };
})();
