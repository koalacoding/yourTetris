/*---------------------------------------
-----------------------------------------
----------------GRID CLASS---------------
-----------------------------------------
---------------------------------------*/

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

		this.drawTetrominoSquare = function(squareNumberX, squareNumberY) {
			var x = squareNumberX * this.widthStep;
			var y = squareNumberY * this.heightStep;
			context.fillRect(x, y, this.widthStep, this.heightStep);
		}

		/*----------------------------------
		------DRAW ALL TETROMINO SQUARES----
		----------------------------------*/		

		this.drawAllTetrominoSquares = function() {
			for (var y = 0; y < yNumberOfSquare; y++) {
				for (var x = 0; x < xNumberOfSquare; x++) {
					if (this.gridData[x][y] != 0) { // If the current square is not empty.
						this.drawTetrominoSquare(x, y);
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
            this.gridData[thirdOfHorizontalGridSize,1] = 2;
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
}


/*---------------------------------
-----------------------------------
----------------MAIN---------------
-----------------------------------
---------------------------------*/

$(function() {
  var context = $('#canvas')[0].getContext('2d');

	var grid = new Grid(400, 10, 500, 16, context);
	grid.initializeGridData();
	grid.drawGrid();
	grid.newTetromino(2);
	grid.drawAllTetrominoSquares();
});