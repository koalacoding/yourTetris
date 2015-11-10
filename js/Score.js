function Score() {

/*-------------------------------------------
---------------------------------------------
-------------ADD ONE TO THE SCORE------------
---------------------------------------------
-------------------------------------------*/

this.addOneToScore = function() {
  var currentScore = parseInt($('#score span').text());
  $('#score span').text(currentScore + 1);
}

/*--------------------------------------------------
----------------------------------------------------
-------------SHOW TOP SCORE IF IT EXISTS------------
----------------------------------------------------
--------------------------------------------------*/

this.showTopScoreIfItExists = function(score) {
  if (typeof Cookies.get('topScore') != 'undefined') { // If the cookie "topScore" exists.
    // We show the top score in the menu.
    $('#topscore').text('Your top score is ' + Cookies.get('topScore'));
  }

  else $('#topscore').text('');
}

}
