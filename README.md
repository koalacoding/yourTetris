# tetris
Tetris coded with HTML5 and Javascript / jQuery using <canvas>.

## Steps finished.
* Added a grid method : drawing a tetromino square on the grid.
* Added a grid method : generate new tetromino.
* Added a grid method to make fall the active tetromino.
* Added a grid method to generate a new tetromino when the active tetromino cannot fall no more.
* If a new tetromino cannot be generated because the space is already occupied, game is over.
* We can now move the tetromino to the left or right.
* We can now accelerate the tetromino's fall by pressing the down arrow key.
* Fixed a bug that allowed to move the active tetromino left or right through
  immobile tetromino's squares.
* The player can now modify the active tetromino's state by pressing the up arrow key.
* Fixed a bug that allowed tetrominos to sometimes go through others tetrominos.
* Full lines are now emptied.
* Player can now only modify active tetromino's state if it has the space to do it.
* Canvas resized to center the grid in the middle of the page.
* Added a pop-up when the game is over using a jQuery UI widget to ask the user
  if he wants to play again.
* Fixed a bug where sometimes the hexadecimal number generated for the color
  was smaller than 6 characters long.
* Added a random color to the tetrominos.
* Added a start menu.
* The user has now the choice to go back to the start menu after his game is over.
* Added a system that stores the user's top score in a cookie and shows it in the menu.

## To do.
* Check the compatibility for Firefox and IE.
