function Grid(width, xNumberOfSquare, height, yNumberOfSquare, context) {
	this.gridData = []; // 2d array.

	this.widthStep = width / xNumberOfSquare;
	this.heightStep = height / yNumberOfSquare;

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

			context.fillRect(x + 3, y + 3, this.widthStep - 5, this.heightStep - 5);
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

	this.newTetromino = function(form) {
		var thirdOfHorizontalGridSize = Math.floor(xNumberOfSquare / 3);
    switch (form) {
        case 0: // ****
            this.gridData[thirdOfHorizontalGridSize][0] = 2; // 2 = moving tetromino square.
            this.gridData[thirdOfHorizontalGridSize + 1][0] = 2;
            this.gridData[thirdOfHorizontalGridSize + 2][0] = 2;
            this.gridData[thirdOfHorizontalGridSize + 3][0] = 2;
            break;
        case 1: // *
                // ***
            this.gridData[thirdOfHorizontalGridSize][0] = 2;
            this.gridData[thirdOfHorizontalGridSize][1] = 2;
            this.gridData[thirdOfHorizontalGridSize + 1][1] = 2;
            this.gridData[thirdOfHorizontalGridSize + 2][1] = 2;
            break;
        case 2: //   *
                // ***
            this.gridData[thirdOfHorizontalGridSize + 2][0] = 2;
            this.gridData[thirdOfHorizontalGridSize][1] = 2;
            this.gridData[thirdOfHorizontalGridSize + 1][1] = 2;
            this.gridData[thirdOfHorizontalGridSize + 2][1] = 2;
            break;
        case 3: // **
                // **
            this.gridData[thirdOfHorizontalGridSize][0] = 2;
            this.gridData[thirdOfHorizontalGridSize + 1][0] = 2;
            this.gridData[thirdOfHorizontalGridSize][1] = 2;
            this.gridData[thirdOfHorizontalGridSize + 1][1] = 2;
            break;
        case 4: //  **
                // **
            this.gridData[thirdOfHorizontalGridSize + 1][0] = 2;
            this.gridData[thirdOfHorizontalGridSize + 2][0] = 2;
            this.gridData[thirdOfHorizontalGridSize][1] = 2;
            this.gridData[thirdOfHorizontalGridSize + 1][1] = 2;
            break;
        case 5: //  *
                // ***
            this.gridData[thirdOfHorizontalGridSize + 1][0] = 2;
            this.gridData[thirdOfHorizontalGridSize][1] = 2;
            this.gridData[thirdOfHorizontalGridSize + 1][1] = 2;
            this.gridData[thirdOfHorizontalGridSize + 2][1] = 2;
            break;
        case 6: // **
                //  **
            this.gridData[thirdOfHorizontalGridSize][0] = 2;
            this.gridData[thirdOfHorizontalGridSize + 1][0] = 2;
            this.gridData[thirdOfHorizontalGridSize + 1][1] = 2;
            this.gridData[thirdOfHorizontalGridSize + 2][1] = 2;
            break;
        default:
        	alert('Error trying to generate a new tetromino.');
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
					if (this.gridData[x][y] == 2) { // If the current tetromino square is an active one.
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

		this.makeTetrominoFall = function() {
			if (this.canTetrominoFall() == true) {
				for (var y = yNumberOfSquare - 2; y >= 0; y--) {
					for (var x = 0; x < xNumberOfSquare; x++) {
						if (this.gridData[x][y] == 2) {
							this.gridData[x][y + 1] = 2;
							this.gridData[x][y] = 0; // Emptying the place where the square was before falling.
						}
					}
				}
			}

			this.drawAllTetrominoSquares();
		}
}