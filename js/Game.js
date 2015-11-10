function Game() {
  var that = this;

  var fadeHandler = new FadeHandler();

  var context = $('#canvas')[0].getContext('2d');

  var score = new Score();
  this.grid = new Grid(252, 10, 360, 16, context, that, fadeHandler, score);

  this.gameOver = false;


  /*---------------------------------------
  -----------------------------------------
  --------------GAME HANDLERS--------------
  -----------------------------------------
  ---------------------------------------*/


    /*--------------------
    ------START GAME------
    --------------------*/

    this.startGame = function() {
      $('#menu').fadeOut(function() {
        that.gameOver = false;

        $('#game').fadeOut(function() { // If the user was already playing a game.
          $('#score span').text('0'); // Setting the score to zero.
        });

        context.clearRect(0, 0, 252, 360); // Deleting everything drawn on the canvas.
        that.grid.initialize();

        $('#game').fadeIn();
      });
    }

    /*--------------------------
    ------PROPOSE NEW GAME------
    --------------------------*/

    this.proposeNewGame = function(fadeHandler) {
      $( "#dialog-confirm" ).attr('title', 'Game over');
  		$( ".ui-dialog-title" ).text('Game over');
      $( "#dialog-confirm p" ).text('Do you want to play again ?');
  		$( "#dialog-confirm" ).dialog({
  			resizable: false,
  			height: 150,
  			modal: true,
  			buttons: {
  				Yes: function() {
            that.startGame(fadeHandler);
  					$( this ).dialog( "close" );
  				},
  				No: function() {
  					$( this ).dialog( "close" );
            fadeHandler.fadeCanvasOut();
  				}
  			}
  		});
    }

    /*----------------------
    ------RESTART GAME------
    ----------------------*/

    /*this.restartGame = function() {
      that.grid.gridData = [];
      that.grid.initializeGridData();
      that.grid.drawAllTetrominoSquares();
      this.gameOver = false;
    }*/
}
