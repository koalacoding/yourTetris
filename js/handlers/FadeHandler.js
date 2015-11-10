function FadeHandler() {

this.fadeCanvasOut = function() {
  $('#game').fadeOut(function() {
    var score = new Score();
    score.showTopScoreIfItExists();
    
    $('#menu').fadeIn(1000);
  });
}

}
