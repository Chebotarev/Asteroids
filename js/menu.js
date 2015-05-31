$.Menu = function (el, gameView) {
  this.$el = $(el);
  this.createButton("Start Game", gameView.start.bind(gameView));
};

$.Menu.prototype.createButton = function (text, callback) {
  var $button = $('<button>').addClass('menu-button').text(text);
  $button.on("click", callback);
  $('<li>').append($button).appendTo(this.$el);
};

$.fn.menu = function (gameView) {
  return this.each(function () {
    new $.Menu(this, gameView);
  });
};