$(function() {
  var context = $('#canvas')[0].getContext('2d');

	var grid = new Grid(350, 10, 500, 16, context);
	grid.initializeGridData();
	grid.drawGrid();

	setInterval(function(){
		if (grid.gameOver == false) {
			grid.makeTetrominoFall();
		}
	}, 100);
});