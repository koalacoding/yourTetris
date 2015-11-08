$(function() {
  var context = $('#canvas')[0].getContext('2d');

	var grid = new Grid(252, 10, 360, 16, context);
	grid.initializeGridData();
	grid.drawGrid();

	grid.handleKeyPresses();

	grid.handleTetrominoFall();
});
