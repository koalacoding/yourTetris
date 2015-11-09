function Grid(width, xNumberOfSquare, height, yNumberOfSquare, context, Game) {
  this.gridData = []; // 2d array.

  this.widthStep = width / xNumberOfSquare;
  this.heightStep = height / yNumberOfSquare;

  this.activeTetrominoForm = 0;
  this.activeTetrominoState = 0;

  this.fallingSpeed = 1000; // In millisecond.

  var that = this;


  /*--------------------------------------
  ----------------------------------------
  --------------INITIALIZING--------------
  ----------------------------------------
  --------------------------------------*/

  this.initialize = function() {
    this.initializeGridData();
  	this.drawGrid();
  	this.handleKeyPresses();
  	this.handleTetrominoFall();
  }


    /*------------------------------
    ------INITIALIZE GRID DATA------
    ------------------------------*/

    this.initializeGridData = function() {
      for (var x = 0; x < xNumberOfSquare; x++) {
        this.gridData[x] = [];
        for (var y = 0; y < yNumberOfSquare; y++) {
          this.gridData[x][y] = []; // 0 = empty square.
          this.gridData[x][y][0] = 0;
        }
      }
    }


  /*-------------------
  ------DRAW GRID------
  -------------------*/

  this.drawGrid = function() {
    // Draw horizontal lines.
    for (var y = 0; y <= height; y += this.heightStep) {
      context.beginPath();
      context.moveTo(0, y);
      context.lineTo(width, y);
      context.lineWidth = 1;
      context.stroke(); // Used to show the draw.
      context.closePath();
    }

    // Draw vertical lines.
    for (var x = 0; x <= width; x += this.widthStep) {
      context.beginPath();
      context.moveTo(x, 0);
      context.lineTo(x, height);
      context.lineWidth = 1;
      context.stroke(); // Used to show the draw.
      context.closePath();
    }
  }


  /*----------------------
  ------DRAW TETROMINO----
  ----------------------*/


    /*-----------------------------
    ------DRAW TETROMINO SQUARE----
    -----------------------------*/

    this.drawTetrominoSquare = function(squareNumberX, squareNumberY, color) {
      var x = squareNumberX * this.widthStep;
      var y = squareNumberY * this.heightStep;
      context.fillStyle = color;

      // Using this to clean the non-white square traces.
      if (color == "#FFFFFF") {
        context.fillRect(x + 1, y + 1, this.widthStep - 2, this.heightStep - 2);
        return;
      }

      context.fillRect(x + 3, y + 3, this.widthStep - 6, this.heightStep - 6);
    }

    /*----------------------------------
    ------DRAW ALL TETROMINO SQUARES----
    ----------------------------------*/

    this.drawAllTetrominoSquares = function() {
      for (var y = 0; y < yNumberOfSquare; y++) {
        for (var x = 0; x < xNumberOfSquare; x++) {
          if (this.gridData[x][y][0] != 0) { // If the current square is not empty.
            this.drawTetrominoSquare(x, y, this.gridData[x][y][1]);
          }

          else { // If the current square is empty.
            this.drawTetrominoSquare(x, y, "#FFFFFF");
          }
        }
      }
    }


  /*---------------------
  ------NEW TETROMINO----
  ---------------------*/


    /*--------------------------------------------------------
    ------ARE NEW TETROMINO COORDINATES ALREADY OCCUPIED ?----
    --------------------------------------------------------*/

    this.areNewTetrominoCoordinatesAlreadyOccupied = function(newTetrominoCoordinates) {
      for (var i = 0; i < newTetrominoCoordinates.length; i++) {
        var x = newTetrominoCoordinates[i][0];
        var y = newTetrominoCoordinates[i][1];
        if (this.gridData[x][y][0] != 0) {
          return true;
        }
      }

      return false;
    }

    /*-----------------------------------------------------
    ------GENERATE NEW TETROMINO IF NO ACTIVE TETROMINO----
    -----------------------------------------------------*/

    this.generateNewTetrominoIfNoActiveTetromino = function() {
      var thereIsAnActiveTetromino = false;

      for (var y = 0; y < yNumberOfSquare; y++) { // Checking if there is an active tetromino.
        for (var x = 0; x < xNumberOfSquare; x++) {
          if (this.gridData[x][y][0] > 1) { // If the current square is an active one.
            thereIsAnActiveTetromino = true;
          }
        }
      }

      if (thereIsAnActiveTetromino == false) {
        var randomNumber = Math.floor(Math.random() * 7); // Random number between 0 and 6.
        
        // toString(16) to convert to hexadecimal. Max 14000000 to avoid too bright colors.
        var randomColor = (Math.floor(Math.random() * 14000001)).toString(16);
        // If randomColor is not 6 characters long, we append zeros to it.
        while (randomColor.length != 6) randomColor += '0';
        randomColor = '#' + randomColor;

        var newTetrominoCoordinates = this.newTetrominoCoordinates(randomNumber);

        // If there is already a square in any of the new tetromino coordinates.
        if (this.areNewTetrominoCoordinatesAlreadyOccupied(newTetrominoCoordinates) == true) {
          Game.gameOver = true;
          Game.proposeNewGame();
        }

        else { // If there is space for the new tetromino, we generate it.
          this.activeTetrominoForm = randomNumber; // Storing the form of the new tetromino.
          this.newTetromino(newTetrominoCoordinates, randomColor); // Generating the new tetromino.
        }
      }
    }

    /*---------------------------------
    ------NEW TETROMINO COORDINATES----
    ---------------------------------*/

    // Return an array containing the coordinates of every square of the new tetromino.
    this.newTetrominoCoordinates = function(form) {
      var newTetrominoCoordinates = [];
      var thirdOfHorizontalGridSize = Math.floor(xNumberOfSquare / 3);
      switch (form) {
          case 0: // ****
              newTetrominoCoordinates.push([thirdOfHorizontalGridSize, 0]);
              newTetrominoCoordinates.push([thirdOfHorizontalGridSize + 1, 0]);
              newTetrominoCoordinates.push([thirdOfHorizontalGridSize + 2, 0]);
              newTetrominoCoordinates.push([thirdOfHorizontalGridSize + 3, 0]);
              break;
          case 1: // *
                  // ***
              newTetrominoCoordinates.push([thirdOfHorizontalGridSize, 0]);
              newTetrominoCoordinates.push([thirdOfHorizontalGridSize, 1]);
              newTetrominoCoordinates.push([thirdOfHorizontalGridSize + 1, 1]);
              newTetrominoCoordinates.push([thirdOfHorizontalGridSize + 2, 1]);
              break;
          case 2: //   *
                  // ***
              newTetrominoCoordinates.push([thirdOfHorizontalGridSize + 2, 0]);
              newTetrominoCoordinates.push([thirdOfHorizontalGridSize + 2, 1]);
              newTetrominoCoordinates.push([thirdOfHorizontalGridSize, 1]);
              newTetrominoCoordinates.push([thirdOfHorizontalGridSize + 1, 1]);
              break;
          case 3: // **
                  // **
              newTetrominoCoordinates.push([thirdOfHorizontalGridSize, 0]);
              newTetrominoCoordinates.push([thirdOfHorizontalGridSize + 1, 0]);
              newTetrominoCoordinates.push([thirdOfHorizontalGridSize, 1]);
              newTetrominoCoordinates.push([thirdOfHorizontalGridSize + 1, 1]);
              break;
          case 4: //  **
                  // **
              newTetrominoCoordinates.push([thirdOfHorizontalGridSize + 1, 0]);
              newTetrominoCoordinates.push([thirdOfHorizontalGridSize + 1, 1]);
              newTetrominoCoordinates.push([thirdOfHorizontalGridSize + 2, 0]);
              newTetrominoCoordinates.push([thirdOfHorizontalGridSize, 1]);
              break;
          case 5: //  *
                  // ***
              newTetrominoCoordinates.push([thirdOfHorizontalGridSize + 1, 0]);
              newTetrominoCoordinates.push([thirdOfHorizontalGridSize + 1, 1]);
              newTetrominoCoordinates.push([thirdOfHorizontalGridSize, 1]);
              newTetrominoCoordinates.push([thirdOfHorizontalGridSize + 2, 1]);
              break;
          case 6: // **
                  //  **
              newTetrominoCoordinates.push([thirdOfHorizontalGridSize, 0]);
              newTetrominoCoordinates.push([thirdOfHorizontalGridSize + 1, 1]);
              newTetrominoCoordinates.push([thirdOfHorizontalGridSize + 1, 0]);
              newTetrominoCoordinates.push([thirdOfHorizontalGridSize + 2, 1]);
              break;
          default:
            alert('Error trying to generate a new tetromino.');
      }

      return newTetrominoCoordinates;
     }

    /*---------------------
    ------NEW TETROMINO----
    ---------------------*/

    this.newTetromino = function(newTetrominoCoordinates, randomColor) {
      for (var i = 0; i < newTetrominoCoordinates.length; i++) {
        var x = newTetrominoCoordinates[i][0];
        var y = newTetrominoCoordinates[i][1];

        // The second square is the square the others will rotate around.
        if (i == 1) this.gridData[x][y][0] = 3;
        else this.gridData[x][y][0] = 2;

        this.gridData[x][y][1] = randomColor;
      }
    }


  /*-----------------------------------
  ------IMMOBILIZE ACTIVE TETROMINO----
  -----------------------------------*/

  this.immobilizeActiveTetrominoIfCannotFall = function() {
    if (that.canTetrominoFall() == false) { // If the current tetromino cannot move down.
      for (var y = 0; y < yNumberOfSquare; y++) {
        for (var x = 0; x < xNumberOfSquare; x++) {
          if (this.gridData[x][y][0] > 1) { // If the current square is an active one.
            this.gridData[x][y][0] = 1; // We immobilize it.
          }
        }
      }

      this.checkIfLinesAreFull();
    }
  }


  /*----------------------
  ------TETROMINO FALL----
  ----------------------*/

    /*----------------------------
    ------CAN TETROMINO FALL ?----
    ----------------------------*/

    this.canTetrominoFall = function() {
      var activeTetrominoSquareFound = false;

      for (var y = yNumberOfSquare - 1; y > 0; y--) { // Starting at the bottom of the grid.
        for (var x = 0; x < xNumberOfSquare; x++) {
          if (that.gridData[x][y][0] > 1) { // If the current tetromino square is an active one.
            activeTetrominoSquareFound = true;
            // If we are at the last line of the grid or if the square below is an immobile one.
            if (y == yNumberOfSquare - 1 || this.gridData[x][y + 1][0] == 1) {
              return false;
            }
          }
        }
      }

      return true;
    }

    /*---------------------------
    ------MAKE TETROMINO FALL----
    ---------------------------*/

    this.handleTetrominoFall = function() {
      var makeTetrominoFall;
      makeTetrominoFall = setInterval(function() {
                            that.makeTetrominoFall();
                          }, that.fallingSpeed);

      window.addEventListener("keydown", function(e) {
          if (e.keyCode == 40) {
            makeTetrominoFall = that.makeTetrominoFall();
          }
      }, false);
    }

    this.makeTetrominoFall = function() {
      that.immobilizeActiveTetrominoIfCannotFall();

      if (Game.gameOver == false) {
        if (that.canTetrominoFall() == true) {
          for (var y = yNumberOfSquare - 2; y >= 0; y--) {
            for (var x = 0; x < xNumberOfSquare; x++) {
              if (that.gridData[x][y][0] > 1) { // If the square is an active one.
                that.gridData[x][y + 1][0] = that.gridData[x][y][0];
                that.gridData[x][y + 1][1] = that.gridData[x][y][1];
                that.gridData[x][y][0] = 0; // Emptying the place where the square was before falling.
              }
            }
          }
        }

        that.generateNewTetrominoIfNoActiveTetromino();
        that.drawAllTetrominoSquares();
      }
    }


  /*--------------------------
  ------HANDLE KEY PRESSES----
  --------------------------*/

  this.handleKeyPresses = function() {
    window.onkeydown = function(event) {
      that.moveTetrominoLeft(event);
      that.moveTetrominoRight(event);
      that.modifyTetrominoState(event);
    }
  }


  /*----------------------
  ------MOVE TETROMINO----
  ----------------------*/


    /*-------------------
    ------TO THE LEFT----
    -------------------*/


      /*--------------------------------------
      ------CAN TETROMINO MOVE TO THE LEFT----
      --------------------------------------*/

      this.canTetrominoMoveLeft = function() {
        // If one of the tetromino's squares is in the first column (so it cannot move to the left).
        for (var y = 0; y < yNumberOfSquare; y++) {
          if (this.gridData[0][y][0] > 1) {
            return false;
          }
        }

        for (var y = 0; y < yNumberOfSquare; y++) {
          /* Starting at x = 1 because we already checked above
             if there was an active square in the first column. */
          for (var x = 1; x < xNumberOfSquare; x++) {
            if (this.gridData[x][y][0] > 1) { // If the current checked square is an active one.
              if (this.gridData[x - 1][y][0] == 1) { // If the square to the left is an immobile one.
                return false;
              }
            }
          }
        }

        return true;
      }

      /*----------------------------------
      ------MOVE TETROMINO TO THE LEFT----
      ----------------------------------*/

      this.moveTetrominoLeft = function(event) {
        if (event.keyCode == 37 && this.canTetrominoMoveLeft() == true) {
          for (var y = 0; y < yNumberOfSquare; y++) {
            for (var x = 1; x < xNumberOfSquare; x++) {
              if (this.gridData[x][y][0] > 1) {
                this.gridData[x - 1][y][0] = this.gridData[x][y][0];
                this.gridData[x - 1][y][1] = this.gridData[x][y][1];
                this.gridData[x][y][0] = 0; // Freeing the ancient square's position.
              }

            }
          }

          this.drawAllTetrominoSquares();
        }
      }


    /*--------------------
    ------TO THE RIGHT----
    --------------------*/


      /*---------------------------------------
      ------CAN TETROMINO MOVE TO THE RIGHT----
      ---------------------------------------*/

      this.canTetrominoMoveRight = function() {
        for (var y = 0; y < yNumberOfSquare; y++) {
          // If one of the tetromino's squares is in the last column.
          if (this.gridData[xNumberOfSquare - 1][y][0] > 1) {
            return false;
          }
        }

        for (var y = 0; y < yNumberOfSquare; y++) {
          // Starting at xNumberOfSquare - 2 to start checking at the second last column.
          for (var x = xNumberOfSquare - 2; x >= 0; x--) {
            if (this.gridData[x][y][0] > 1) { // If the current checked square is an active one.
              if (this.gridData[x + 1][y][0] == 1) { // If the square to the right is an immobile one.
                return false;
              }
            }
          }
        }

        return true;
      }

      /*-----------------------------------
      ------MOVE TETROMINO TO THE RIGHT----
      -----------------------------------*/

      this.moveTetrominoRight = function(event) {
        if (event.keyCode == 39 && this.canTetrominoMoveRight() == true) {
          for (var y = 0; y < yNumberOfSquare; y++) {
            for (var x = xNumberOfSquare - 2; x >= 0; x--) {
              if (this.gridData[x][y][0] > 1) {
                this.gridData[x + 1][y][0] = this.gridData[x][y][0];
                this.gridData[x + 1][y][1] = this.gridData[x][y][1];
                this.gridData[x][y][0] = 0; // Freeing the ancient square's position.
              }
            }
          }

          this.drawAllTetrominoSquares();
        }
      }


  /*-----------------------------------------------
  -------------------------------------------------
  -------------MODIFY TETROMINO'S STATE------------
  -------------------------------------------------
  -----------------------------------------------*/


  this.modifyTetrominoState = function(event) {
    if (event.keyCode == 38) { // If the up arrow is pressed.
      this.modifyActiveTetrominoState();
      this.drawAllTetrominoSquares(); // To immediatly refresh the grid view.
    }
  }


    /*------------------------------------------
    ------RETURN CENTER SQUARE COORDINATES------
    ------------------------------------------*/

    this.returnCenterSquareCoords = function() {
      var array = [0, 0];

      for (var y = 0; y < yNumberOfSquare; y++) {
        for (var x = 0; x < xNumberOfSquare; x++) {
          if (this.gridData[x][y][0] == 3) {
            array = [x, y];
            return array;
          }
        }
      }

      return array; // If no center square has been found.
    }

    /*----------------------------------------
    ------GET ACTIVE SQUARES COORDINATES------
    ----------------------------------------*/

    this.getActiveSquaresCoords = function() {
      var array = [];

      for (var y = 0; y < yNumberOfSquare; y++) {
        for (var x = 0; x < xNumberOfSquare; x++) {
          if (this.gridData[x][y][0] == 2) {
            array.push([x, y]);
          }
        }
      }

      return array;
    }

    /*--------------------------------------------
    ------MODIFY ACTIVE TETROMINO'S POSITION------
    --------------------------------------------*/

    this.modifyActiveTetrominoState = function() {
      var i = 0;

      var newCoordX = 0;
      var newCoordY = 0;

      var activeSquaresCoords = this.getActiveSquaresCoords();
      var activeSquareX = 0;
      var activeSquareY = 0;

      var centerSquareCoords = this.returnCenterSquareCoords();
      var centerSquareCoordsX = centerSquareCoords[0];
      var centerSquareCoordsY = centerSquareCoords[1];

      var toRestore = [];
      var toRestoreX = 0;
      var toRestoreY = 0;

			var cannotModifyTetrominoState = false;

      // First for loop to check if the user has the space to modify the active tetromino's state.
      for (i = 0; i < activeSquaresCoords.length; i++) {
        activeSquareX = activeSquaresCoords[i][0];
        activeSquareY = activeSquaresCoords[i][1];

        newCoordX = centerSquareCoordsX + centerSquareCoordsY - activeSquareY;
        newCoordY = activeSquareX + centerSquareCoordsY - centerSquareCoordsX;

				// If the new square would be out of the grid.
				if (newCoordX < 0 || newCoordX > (xNumberOfSquare - 1)) {
					cannotModifyTetrominoState = true;
					break;
				}

				if (newCoordY < 0 || newCoordY > (yNumberOfSquare - 1)) { // Same for Y.
					cannotModifyTetrominoState = true;
					break;
				}

				if (this.gridData[newCoordX][newCoordY][0] == 1) {
					cannotModifyTetrominoState = true;
					break;
				};
      }

			if (cannotModifyTetrominoState) return;

      for (i = 0; i < activeSquaresCoords.length; i++) {
        activeSquareX = activeSquaresCoords[i][0];
        activeSquareY = activeSquaresCoords[i][1];

        newCoordX = centerSquareCoordsX + centerSquareCoordsY - activeSquareY;
        newCoordY = activeSquareX + centerSquareCoordsY - centerSquareCoordsX;

         // If there is already an active square at the new active square's position.
        if (this.gridData[newCoordX][newCoordY][0] == 2) {
          /* This new square position is going to be deleted as there is already an active square,
             so we store the coordinates in an array that we will use after the for loop
             is finished to restore the deleted new position. */
          toRestore.push([newCoordX, newCoordY]);
        }

        this.gridData[newCoordX][newCoordY][0] = 2;
        this.gridData[newCoordX][newCoordY][1] = this.gridData[activeSquareX][activeSquareY][1];
         // Deleting the old active square's position.
        this.gridData[activeSquareX][activeSquareY][0] = 0;
      }

      for (i = 0; i < toRestore.length; i++) { // Restoring the deleted new active squares.
        toRestoreX = toRestore[i][0];
        toRestoreY = toRestore[i][1];
        this.gridData[toRestoreX][toRestoreY][0] = 2;
      }
    }


  /*---------------------------------------
  -----------------------------------------
  -------------EMPTY FULL LINES------------
  -----------------------------------------
  ---------------------------------------*/


    /*-----------------------------------------
    ----------CHECK IF LINES ARE FULL----------
    -----------------------------------------*/

    this.checkIfLinesAreFull = function() {
      var linesEmptiedYcoord = [];

      for (var y = 0; y < yNumberOfSquare; y++) {
        var thisLineIsFull = true;

        for (var x = 0; x < xNumberOfSquare; x++) {
          if (this.gridData[x][y][0] != 1) { // If the current square is not an immobile one.
            thisLineIsFull = false;
            break; // We skip this line because it can't be full.
          }
        }

        if (thisLineIsFull) {
          this.emptyLine(y); // If the current line is full, we empty it.
          linesEmptiedYcoord.push(y);
          y = 0; // Starting back from the beginning.
        }
      }

      for (var i = 0; i < linesEmptiedYcoord.length; i++) {
        this.makeAllSquaresFallOneLine(linesEmptiedYcoord[i]);
      }

      this.drawAllTetrominoSquares(); // Refreshing the view.
    }

    /*----------------------------
    ----------EMPTY LINE----------
    ----------------------------*/

    this.emptyLine = function(y) {
      for (var x = 0; x < xNumberOfSquare; x++) {
        this.gridData[x][y][0] = 0;
      }
    }

    /*-----------------------------------------------------
    ----------MAKE ALL SQUARES FALL DOWN ONE LINE----------
    -----------------------------------------------------*/

    this.makeAllSquaresFallOneLine = function(startingLine) {
      for (var y = startingLine - 1; y >= 0; y--) {
        for (var x = 0; x < xNumberOfSquare; x++) {
          if (this.gridData[x][y][0] == 1) {
            this.gridData[x][y + 1][0] = 1;
            this.gridData[x][y + 1][1] = this.gridData[x][y][1];
            this.gridData[x][y][0] = 0;
          }
        }
      }
    }
}
