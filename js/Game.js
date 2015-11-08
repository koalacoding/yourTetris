function Game() {
  var that = this;

  var context = $('#canvas')[0].getContext('2d');
  var grid = new Grid(252, 10, 360, 16, context, this);

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
      grid.initialize();
    }

    /*--------------------------
    ------PROPOSE NEW GAME------
    --------------------------*/

    this.proposeNewGame = function() {
      $( "#dialog-confirm" ).attr('title', 'Game over');
  		$( ".ui-dialog-title" ).text('Game over');
      $( "#dialog-confirm p" ).text('Do you want to play again ?');
  		$( "#dialog-confirm" ).dialog({
  			resizable: false,
  			height: 150,
  			modal: true,
  			buttons: {
  				Yes: function() {
            that.restartGame();
  					$( this ).dialog( "close" );
  				},
  				No: function() {
  					$( this ).dialog( "close" );
  				}
  			}
  		});
    }

    /*----------------------
    ------RESTART GAME------
    ----------------------*/

    this.restartGame = function() {
      context.clearRect(0, 0, 252, 360); // Deleting everything drawn on the canvas.

      grid.initializeGridData();
      grid.drawGrid();
      this.gameOver = false;
    }
}
