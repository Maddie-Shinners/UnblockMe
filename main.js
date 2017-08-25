var boardSize1 = 0;
var boardSize2 = 0;
var $bottomRight;
var bottomRightStatus;
var highScores = [];
var gameCount = 0;
var highScoresListShown = false;

//Get user values and use them to create game board
$('#dimension-submit').on('click', function(){
  console.log('create board click');

  boardSize1 = $('#dim1').val();
  boardSize2 = $('#dim2').val();
  console.log(`boardSize1: ${boardSize1}`);
  console.log(`boardSize2: ${boardSize2}`);
  if(boardSize1 < 2 || boardSize2 < 2){
    alert('Board dimensions must be at least 2');
  }
  else{
    createBoard(boardSize1, boardSize2);
  }

})

// $('#4').on('click', function(){
//   boardSize = 4;
//   createBoard(4);
// })
//
// $('#5').on('click', function(){
//   boardSize = 5;
//   createBoard(5);
// })


var clickCounter = 0;


//dim1 = number of rows
//dim2 = number of columns
var createBoard = function(dim1, dim2){
  $('#choose').hide();
  var $table = $("<table align='center'>");
  var boxHeight = 496/dim1;
  var boxWidth = 496/dim1;

//random indices for special block
  var index1Block = Math.floor(Math.random()*dim1);
  var index2Block = Math.floor(Math.random()*dim2);
  while(index1Block === dim1-1 && index2Block === dim2-1){
    index1Block = Math.floor(Math.random()*dim1);
    index2Block = Math.floor(Math.random()*dim2);
  }

  //create a random number of empty boxes that must be less than 1/3 the total number of boxes
  var emptyIndex = [];
  var numEmptyBoxes = Math.floor(Math.random()*dim1*dim2)+1;
  var maxNum = dim1*dim2/3;
  if(numEmptyBoxes > maxNum){
    numEmptyBoxes = Math.floor(numEmptyBoxes/3);
  }
  console.log(`numEmptyBoxes: ${numEmptyBoxes}`);
  if(numEmptyBoxes === 0){
    numEmptyBoxes = 1;
  }
//assign random locations for empty boxes
  for(let i = 0; i < numEmptyBoxes; i++){
    var boxLocation = {
      index1: Math.floor(Math.random()*dim1),
      index2: Math.floor(Math.random()*dim2)
    };
    emptyIndex.push(boxLocation);
    console.log(`empty indices: ${emptyIndex[i].index1}, ${emptyIndex[i].index2}`);
  }

  // var index1Empty = Math.floor(Math.random()*dim1);
  // var index2Empty = Math.floor(Math.random()*dim2);
  // var index3Empty = Math.floor(Math.random()*dim1);
  // var index4Empty = Math.floor(Math.random()*dim2);
  //console.log('empty: ' + index1Empty + ' ' + index2Empty);


//if an empty and special block have same indices, reset special block
  var specialBoxLocation = {index1Special: index1Block, index2Special: index2Block}
  for(let j = 0; j < numEmptyBoxes; j++){
    while(specialBoxLocation.index1Special === emptyIndex[j].index1 && specialBoxLocation.index2Special === emptyIndex[j].index2){
      index1Block = Math.floor(Math.random()*dim1);
      index2Block = Math.floor(Math.random()*dim2);
      //console.log('empty: ' + index1Empty + ' ' + index2Empty);
    }
}

// i,j = row i, column j (zero-indexed)
  for(let i = 0; i < dim1; i++){

    let $row = $('<tr>').appendTo($table);
    for(let j = 0; j < dim2; j++){

    let $box = $('<td>').attr('id', `${i}${j}`).addClass('box').css('height', boxHeight).css('width', boxWidth);

      $row.append($box);

      //special box
      if(i === index1Block && j===index2Block){
        $box.addClass('special');
        addButtons($box);
      }

      //create blocks
      else{
         $box.addClass('non-empty');
         addButtons($box);
       }

       //create empty boxes
      for(let k = 0; k < numEmptyBoxes; k++){
        if(emptyIndex[k].index1 === i && emptyIndex[k].index2 === j){
          removeButtons($box);
          $box.removeClass('non-empty').addClass('empty');

        }
      }

    }
  }

  $('body').append($table);


//make exit arrows (want differnt number of arrow depending on size of board)
// var arrowNum = 0;
// switch(boardSize1){
//   case 3:
//     arrowNum = 3;
//     break;
//   case 4:
//     arrowNum = 2;
//     break;
//   case 5:
//     arrowNum = 2;
//     break;
//   default:
//     arrowNum = 2;
// }
  //for(let i = 0; i < arrowNum; i++){
    // var $arrow = $('<img>').attr('src', 'http://www.pngmart.com/files/2/Green-Arrow-Transparent-Background.png').attr('id', `arrow-img${i}`)
    //     .css('float', 'right');
    var $checkout = $('<h4>').text('checkout').attr('id', 'checkout')
            .css('float', 'right');

    $('table').append($checkout);

  //}

}//end createBoard


//function to add buttons to each box
var addButtons = function(box){
    var $buttonContainer = $('<div>').addClass('button-container');
    var $upButton = $("<button>").text('^').addClass(`Up arrow`).appendTo($buttonContainer);
    var $rightButton = $("<button>").text('>').addClass(`Right arrow`).appendTo($buttonContainer);
    var $downButton = $("<button>").text('v').addClass(`Down arrow`).appendTo($buttonContainer);
    var $leftButton = $("<button>").text('<').addClass(`Left arrow`).appendTo($buttonContainer);
    box.append($buttonContainer);

    $upButton.on('click', function(){
      //console.log('up button clicked');
      clickCounter++;
      moveOnClick('Up', $(this));


    }) //up button click function

    $downButton.on('click', function(){
      //console.log('down button clicked');
      clickCounter++;
      moveOnClick('Down', $(this));

    }) //up button click function

    $leftButton.on('click', function(){
      //console.log('left button clicked');
      clickCounter++;
      moveOnClick('Left', $(this));

    }) //up button click function

    $rightButton.on('click', function(){
      //console.log('right button clicked');
      clickCounter++;
      moveOnClick('Right', $(this));


    }) //up button click function

}//end addButtons



//remove buttons from empty box
var removeButtons = function(box){
  box.empty();
}


//function that moves the boxes on button click
var moveOnClick = function(direction, button){

  //indices of the box that's clicked
  let rowIndex = parseInt(button.parent().parent().attr('id').charAt(0));
  let colIndex = parseInt(button.parent().parent().attr('id').charAt(1));


  var currIndex = `${rowIndex}${colIndex}`;
  let $currBox = $(`#${currIndex}`);

  switch(direction){
    case 'Up':
      var newIndex = `${rowIndex-1}${colIndex}`;
      break;
    case 'Down':
      var newIndex = `${rowIndex+1}${colIndex}`;
      break;
    case 'Left':
      var newIndex = `${rowIndex}${colIndex-1}`;
      break;
    case 'Right':
      var newIndex = `${rowIndex}${colIndex+1}`;
      break;
  }
//console.log(`new index: ${newIndex}`);



//check if box you want to move into is empty
//if it is, switch the empty box with the box you want to move

  if( $(`#${newIndex}`).hasClass('empty')){
    let $currEmptyBox = $(`#${newIndex}`);
    $currEmptyBox.removeClass('empty');


    if($currBox.hasClass('non-empty')){
      $currEmptyBox.addClass('non-empty');
      removeButtons($currBox);
      addButtons($currEmptyBox);
      $currBox.removeClass('non-empty').addClass('empty');
    }

    else if($currBox.hasClass('special')){
      $currEmptyBox.addClass('special');
      removeButtons($currBox);
      addButtons($currEmptyBox);
      $currBox.removeClass('special').addClass('empty');
    }

  }

  checkForWin(boardSize1-1, boardSize2-1);
} //moveOnClick



//index1, index2 = indices of bottom right square on grid (changes with differnet size boards)
var checkForWin = function(index1, index2){

$bottomRight = $(`#${index1}${index2}`);

bottomRightStatus = $bottomRight.attr('class').split(' ')[1];

//check if special box is in bottom right corner
if(bottomRightStatus === 'special'){
  console.log('win');

  gameCount++;

  var inserted = false;

//blur background
$('#blurOnWin').css('filter', 'blur(5px)' );
$('table').css('filter', 'blur(5px)');
//$('.loader').show();

  // $.ajax({
  //   url: winUrl,
  //   type: "GET",
  //   dataType: "json"
  // })



//  .done(function(response){
  //  $('.loader').hide();
    //console.log(response.data[0].images.original.url);
    //var randomGifNum = Math.floor(Math.random()*25);
    var $winGifUrl = 'images/giphy.gif';
    var $winGif = $('<img>').attr('src', $winGifUrl).attr('id', 'winGif').attr('loop', 'infinite');

    var $winHeader = $('<div>').addClass('win-header');

    var $winMessage = $('<h2>').text(`You won in ${clickCounter} clicks!`).attr('id', 'winMessage');
    $winHeader.append($winMessage);
    $('.win').empty().append($winHeader).append($winGif).css('display', 'block');

    $('table').hide();

    var $exitButton = $('<button>').text('PLAY AGAIN').attr('id', 'exit-button').appendTo($winHeader);

    $bottomRightStatus = null;
  //  console.log($bottomRightStatus);
  //  $bottomRight.removeClass('special');



    var $formDiv = $('<div>').addClass('form-div');
    var $scoresForm = $('<form>').addClass('high-scores');
    var $nameInput = $('<input>').attr('type', 'text').attr('placeholder', 'Enter your name').attr('id', 'user-name');
    var $submit = $('<input>').attr('type', 'submit').attr('value', 'submit').attr('id', 'submit-button');
    $scoresForm.append($nameInput).append($submit).appendTo($formDiv);




    $('body').append($formDiv);


    $('.high-scores').on('submit', function(e){
      e.preventDefault();
      // var username = $('#user-name').val();
      if(highScoresListShown === false){
        var username = $('#user-name').val();
        console.log('click highscores handler');
        console.log(`username: ${username}`);
        var user = {
          name: username,
          score: clickCounter
        }



        //put usename and score in appropriate place in list so scores are ordere best to worst
        if(gameCount===1){
          console.log('adding first score');
          highScores.push(user);
          inserted = true;
        }
        else{

          for(let i = 0; i < gameCount-1; i++){
            //console.log(gameCount);
           if(clickCounter < highScores[i].score){
              console.log('splicing');
              highScores.splice(i, 0, user);
              inserted = true;
              break;
            }
          }
          if(inserted === false){
            console.log('adding to end');
            highScores.push(user);
          }
        }

        console.log(`high scores: ${highScores}`);



        var $scoreList = $('<ol>').text('High Scores').addClass('score-list');
        highScores.forEach(function(item){
          var $score = $('<li>').text(`${item.name}  :    ${item.score}`).appendTo($scoreList).addClass('score-list');
        }) //end forEach



          console.log(`highScoresListShown: ${highScoresListShown}`);

          $formDiv.append($scoreList);
          highScoresListShown = true;
        }

    })//high-scores on submit event

    $exitButton.on('click', resetBoard);
//})
  // .fail(function(){
  //   console.log('api fail');
  // })


  }


}//end checkForWin

//reset board after a win
var resetBoard = function(){

  $('table').remove();
  $('.win').hide();
  $('.form-div').remove();
  $('#blurOnWin').css('filter', 'blur(0px)' );
  $('#choose').css('display', 'block');
  clickCounter = 0;
  highScoresListShown = false;
  //$('#user-name').val('');
}
