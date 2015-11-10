$(function() {
  var score = new Score();
  score.showTopScoreIfItExists();

  $('#menu').fadeIn(1000);

  var game = new Game();

  var buttonHandler = new ButtonHandler();
  buttonHandler.handleStartGameButton(game.startGame);
});
