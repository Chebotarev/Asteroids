// Stores a Game instance.
// Stores a canvas context to draw the game into.
// Installs key listeners to move the ship and fire bullets.
// Installs a timer to call Game#step.

(function () {
  if (typeof Asteroids === 'undefined') {
    window.Asteroids = {};
  }

  var GameView = Asteroids.GameView = function (canvasEl, $menu) {
    this.ctx = canvasEl.getContext("2d");
    this.$menu = $menu;
    this.$buttons = this.$menu.find('ul.menu-buttons')
    this.game = new Asteroids.Game();

    this.createStartMenu();
  };

  GameView.prototype.createStartMenu = function () {
    var buttons = {
      "Start Game": this.start.bind(this),
      "Options": function () { console.log("Not Implemented!")}
    };

    this.$buttons.menu(buttons);
  };

  GameView.prototype.start = function () {
    this.bindKeyHandlers();
    // this.captureMouse();
    this.$menu.addClass('hidden');
    var background = new Image();
    background.src = '../src/space.jpg'

    background.onload = function () {
      this.ctx.drawImage(background, 0, 0);
    }.bind(this);

    window.setInterval((function () {
      this.game.draw(this.ctx, background);
      this.game.step(this.ctx);
    }).bind(this), 1000 / 60)
  };

  // GameView.prototype.captureMouse = function () {
  //
  // };

  GameView.prototype.bindKeyHandlers = function () {
    var that = this;
    var sensitivity = 0.5;

    key('up', function() { that.game.ship.power([0, -sensitivity]); });
    key('right', function() { that.game.ship.power([sensitivity, 0]); });
    key('down', function() { that.game.ship.power([0, sensitivity]); });
    key('left', function() { that.game.ship.power([-sensitivity, 0]); });
    key('f', function() { that.game.ship.fireBullet(); });
  };

})();
