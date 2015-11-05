function Grid(width, xNumberOfSquare, height, yNumberOfSquare, context) {
	this.gridData = []; // 2d array.

	this.widthStep = width / xNumberOfSquare;
	this.heightStep = height / yNumberOfSquare;

	this.activeTetrominoForm = 0;
	this.activeTetrominoState = 0;

	this.fallingSpeed = 1000; // In millisecond.

	var that = this;

	this.gameOver = false;

	/*----------------------------
	------INITIALIZE GRID DATA----
	----------------------------*/

	this.initializeGridData = function() {
		for (var x = 0; x < xNumberOfSquare; x++) {
			this.gridData[x] = [];
			for (var y = 0; y < yNumberOfSquare; y++) {
				this.gridData[x][y] = 0; // 0 = empty square.
			}
		}
	}

	/*-----------------
	------DRAW GRID----
	-----------------*/

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
					if (this.gridData[x][y] != 0) { // If the current square is not empty.
						this.drawTetrominoSquare(x, y, "#FF0000");
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
				if (this.gridData[x][y] != 0) {
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
					if (this.gridData[x][y] > 1) { // If the current square is an active one.
						thereIsAnActiveTetromino = true;
					}
				}
			}

			if (thereIsAnActiveTetromino == false) {
				var randomNumber = Math.floor(Math.random() * 7); // Random number between 0 and 6.
				var newTetrominoCoordinates = this.newTetrominoCoordinates(randomNumber);

				// If there is already a square in any of the new tetromino coordinates.
				if (this.areNewTetrominoCoordinatesAlreadyOccupied(newTetrominoCoordinates) == true) {
					this.gameOver = true;
				}

				else { // If there is space for the new tetromino, we generate it.
					this.activeTetrominoForm = randomNumber; // Storing the form of the new tetromino.
					this.newTetromino(newTetrominoCoordinates); // Generating the new tetromino.
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

		this.newTetromino = function(newTetrominoCoordinates) {
			for (var i = 0; i < newTetrominoCoordinates.length; i++) {
				var x = newTetrominoCoordinates[i][0];
				var y = newTetrominoCoordinates[i][1];

				// The second square is the square the others will rotate around.
				if (i == 1) this.gridData[x][y] = 3;
				else this.gridData[x][y] = 2;
			}
		}


	/*-----------------------------------
	------IMMOBILIZE ACTIVE TETROMINO----
	-----------------------------------*/

	this.immobilizeActiveTetrominoIfCannotFall = function() {
		if (that.canTetrominoFall() == false) { // If the current tetromino cannot move down.
			for (var y = 0; y < yNumberOfSquare; y++) {
				for (var x = 0; x < xNumberOfSquare; x++) {
					if (this.gridData[x][y] > 1) {
						this.gridData[x][y] = 1;
					}
				}
			}
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
					if (that.gridData[x][y] > 1) { // If the current tetromino square is an active one.
						activeTetrominoSquareFound = true;
						// If we are at the last line of the grid or if the square below is not an empty one.
						if (y == yNumberOfSquare - 1 || this.gridData[x][y + 1] != 0) {
							return false;
						}
					}
				}

				if (activeTetrominoSquareFound == true) {
					return true;
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

			if (that.gameOver == false) {
				if (that.canTetrominoFall() == true) {
					for (var y = yNumberOfSquare - 2; y >= 0; y--) {
						for (var x = 0; x < xNumberOfSquare; x++) {
							if (that.gridData[x][y] > 1) { // If the square is an active one.
								that.gridData[x][y + 1] = that.gridData[x][y];
								that.gridData[x][y] = 0; // Emptying the place where the square was before falling.
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
					if (this.gridData[0][y] > 1) {
						return false;
					}
				}

				for (var y = 0; y < yNumberOfSquare; y++) {
					/* Starting at x = 1 because we already checked above
						 if there was an active square in the first column. */
					for (var x = 1; x < xNumberOfSquare; x++) {
						if (this.gridData[x][y] > 1) { // If the current checked square is an active one.
							if (this.gridData[x - 1][y] == 1) { // If the square to the left is an immobile one.
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
							if (this.gridData[x][y] > 1) {
								this.gridData[x - 1][y] = this.gridData[x][y];
								this.gridData[x][y] = 0; // Freeing the ancient square's position.
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
					if (this.gridData[xNumberOfSquare - 1][y] > 1) {
						return false;
					}
				}

				for (var y = 0; y < yNumberOfSquare; y++) {
					// Starting at xNumberOfSquare - 2 to start checking at the second last column.
					for (var x = xNumberOfSquare - 2; x >= 0; x--) {
						if (this.gridData[x][y] > 1) { // If the current checked square is an active one.
							if (this.gridData[x + 1][y] == 1) { // If the square to the right is an immobile one.
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
							if (this.gridData[x][y] > 1) {
								this.gridData[x + 1][y] = this.gridData[x][y];
								this.gridData[x][y] = 0; // Freeing the ancient square's position.
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
			this.modifyActiveTetrominoStateToNext();
		}
	}


		/*-----------------------------------------------
		------MODIFY ACTIVE TETROMINO STATE TO NEXT------
		-----------------------------------------------*/

		this.modifyActiveTetrominoStateToNext = function() {
			switch (this.activeTetrominoForm) {
				case 0: // **** &&  ** && **
				case 4: //         **      **
				case 6:
					if (this.activeTetrominoState == 0) this.activeTetrominoState++;
					else this.activeTetrominoState = 0;
					break;
				case 1: // *   &&   *  &&  *
				case 2:	// ***    ***     ***
				case 5:
				  if (this.activeTetrominoState < 3) this.activeTetrominoState++;
					else this.activeTetrominoState = 0;
					break;
			}
		}

		/*------------------------------------------
		------RETURN CENTER SQUARE COORDINATES------
		------------------------------------------*/

		this.returnCenterSquareCoords = function() {
			var array = [0, 0];

			for (var y = 0; y < yNumberOfSquare; y++) {
				for (var x = 0; x < xNumberOfSquare; x++) {
					if (this.gridData[x][y] == 3) {
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
					if (this.gridData[x][y] == 2) {
						array.push([x, y]);
					}
				}
			}

			return array;
		}

		/*--------------------------------------------
		------MODIFY ACTIVE TETROMINO'S POSITION------
		--------------------------------------------*/

		this.modifyActiveTetrominoPosition = function(activeTetrominoForm, activeTetrominoState) {
			var newCoordX = 0;
			var newCoordY = 0;

			var centerSquareCoords = this.returnCenterSquareCoords();
			var centerSquareCoordsX = centerSquareCoords[0];
			var centerSquareCoordsY = centerSquareCoords[1];

			for (var y = 0; y < yNumberOfSquare; y++) {
				for (var x = 0; x < xNumberOfSquare; x++) {
					if (this.gridData[x][y] == 2) {
						newCoordX = centerSquareCoordsX + centerSquareCoordsY - y;
						newCoordY = x + centerSquareCoordsY - centerSquareCoordsX;
						return array;
					}
				}
			}
		}
}
