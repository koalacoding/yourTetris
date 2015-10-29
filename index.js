function Grid(width, height, context) {
	this.widthStep = width / 10;
	this.heightStep = height / 16;

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

		widthStep = width / 10;
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

	this.drawTetrominoSquare = function(squareNumberX, squareNumberY) {
		var x = squareNumberX * this.widthStep;
		var y = squareNumberY * this.heightStep;
		context.fillRect(x, y, this.widthStep, this.heightStep);
	}
}

$(function() {
  var context = $('#canvas')[0].getContext('2d');

	var grid = new Grid(400, 500, context);
	grid.drawGrid();
});