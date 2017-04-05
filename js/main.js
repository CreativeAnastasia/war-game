// <------- variables ------->
var inPlay1, inPlay2;
var winner, loser;
var deck, deck1, deck2;
var display1, display2;
var message;
var inWar;

// <------- cached dom elements ------->
var $card1 = $('#card1');
var $card2 = $('#card2');
var $board = $('#board');



// <------- event listeners ------->
$('#newgame').on('click', startGame);
$('#battle').on('click', dealBattle);
$('#war').on('click', dealBattle);
$('#restart').on('click', startGame)
$('#rules').on('click', function () {
                var w = window.open("", "popupWindow", "width=600, height=400, scrollbars=yes");
                var $w = $(w.document.body);
                $w.html("<textarea>Hello I am rules</textarea>");
            });




// <------- functions ------->
function buildDeck() {
  deck = [];
  ['02', '03', '04', '05', '06', '07', '08', '09', '10', 'J', 'Q', 'K', 'A'].forEach(function(rank, idx) {
    ['d', 's', 'c', 'h'].forEach(function(suit) {
      deck.push({
        rank: idx + 2,
        css: suit + rank
      });
    });
  });
  return deck;
}


function shuffleDeck(array){
  var i,j = 0;
  var temp = null;

  for (i = array.length - 1; i > 0; i -= 1) {
    j = Math.floor(Math.random() * (i + 1))
    temp = array[i]
    array[i] = array[j]
    array[j] = temp
  }
  return array;
}

function splitDeck(array){
  deck1 = deck.splice(0, 26);
  deck2 = deck;
}


function startGame(){
  // initialize variables
  inWar = false;
  deck1 = deck2 = [];
  loser = 0;
  display1 = display2 = null;
  splitDeck(shuffleDeck(buildDeck()));
  dealBattle();
}


//dealBattle -> render function possibly?
function dealBattle() {
  if (inWar) {
    dealWar();
  } else {
    inPlay1 = [];
    inPlay2 = [];
    if (deck1.length){
      inPlay1.push(deck1.shift());  //removes the first card from the deck and puts it at the end of the array
    } else{
      loser = 1; //deck length is 0 we return loser player 1
      winner = 2;
    }
    if (deck2.length){
      inPlay2.push(deck2.shift());
    } else{
      loser = 2;
      winner = 1;
    }
  }
  winner = getWinner();
  if (winner) message = `Player ${winner} Wins`;
  if (loser) message = `Game Over - Player ${winner} Wins`;

  if (!winner && !loser) {
    inWar = true;
    message = "It's WAR!";
  } else {
    inWar = false;
    var victor = winner === 1 ? deck1 : deck2;
    victor.push(...inPlay1);
    victor.push(...inPlay2);
  }
  render();
}

function dealWar() {
  if (deck1.length < 4) {
    loser = 1;
    winner = 2;
  } else if (deck2.length < 4) {
    loser = 2;
    winner = 1;
  } else {
    for (var i=0; i < 4; i++){
      inPlay1.unshift(deck1.shift());
      inPlay2.unshift(deck2.shift());
    }
  }
}

function render() {
  display1 = inPlay1[0].css;
  display2 = inPlay2[0].css;
  if (display1) {
    $('#newgame').hide();
    $('#deck1').text(deck1.length);
    $('#deck2').text(deck2.length);
    $card1.removeClass();
    $card1.addClass('card ' + display1);
    $card2.removeClass();
    $card2.addClass('card ' + display2);
  } else {
    $('#newgame').show();
  }
  inWar ? $('#battle').hide() : $('#battle').show();
  inWar ? $('#war').show() : $('#war').hide();
  $('#message').html(message);
}

function getWinner() {
  if (inPlay1[0].rank === inPlay2[0].rank) return 0;
  return inPlay1[0].rank > inPlay2[0].rank ? 1 : 2;
}








