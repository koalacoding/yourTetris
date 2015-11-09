function FadeHandler() {
  this.fadeMenuIn = function() {
    $('#menu').fadeIn(1000);
  }

  this.fadeCanvasIn = function() {
    $('#menu').fadeOut(function() {
      $('#canvas').fadeIn(1500);
    });
  }

  this.fadeCanvasOut = function() {
    $('#canvas').fadeOut(function() {
      $('#menu').fadeIn(1000);
    });
  }
}
