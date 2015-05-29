// Utility code, especially vector math stuff.

(function () {
  if (typeof Asteroids === 'undefined') {
    window.Asteroids = {};
  }

  var Utils = Asteroids.Utils = {};

  Utils.inherits = function (ChildClass, ParentClass) {
    function Surrogate () {}
    Surrogate.prototype = ParentClass.prototype;
    ChildClass.prototype = new Surrogate();
  };

  Utils.randVector = function (length) {
    var normX = (Math.random() * 2) - 1;
    var normY = (Math.random() > 0.5 ? -1 : 1) * Math.sqrt(1 - (normX * normX));

    return [normX * length, normY * length];
  };
})();
