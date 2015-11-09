$(function() {
  var fadeHandler = new FadeHandler();
  fadeHandler.fadeMenuIn();

  var game = new Game(fadeHandler);

  var buttonHandler = new ButtonHandler();
  buttonHandler.handleStartGameButton(game.startGame, fadeHandler);
});
