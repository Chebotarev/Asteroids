$.Menu = function (el, buttons) {
  this.$el = $(el);

  for (var title in buttons) {
    if (buttons.hasOwnProperty(title)) {
      this.createButton(title, buttons[title]);
    }
  }
};

$.Menu.prototype.createButton = function (text, callback) {
  var $button = $('<div>').addClass('menu-button').text(text);
  $button.on("click", callback);
  $('<li>').append($button).appendTo(this.$el);
};

$.fn.menu = function (buttons) {
  return this.each(function () {
    new $.Menu(this, buttons);
  });
};
