function ButtonHandler() {
  // Starts the custom function when clicking on the "Start a new game" button.
  this.handleStartGameButton = function(myfunction, fadeHandler) {
    $(document).on('click', '#start_game_button', function() {
      myfunction(fadeHandler);
    });
  }
}
