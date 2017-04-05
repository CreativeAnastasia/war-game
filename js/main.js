// <------- variables ------->
var inPlay1, inPlay2;
var winner, loser;
var deck, deck1, deck2;
var display1, display2;
var didWar;


    $('#battle').hide();
    $('#war').hide();
    $('#win1').hide();
    $('#win2').hide();



// <------- cached dom elements ------->
var $card1 = $('#card1');
var $card2 = $('#card2');
var $board = $('#board');



// <------- event listeners ------->
$('#newgame').on('click', startGame)
$('#battle').on('click', dealBattle)
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
  deck1 = deck2 = [];
  loser = 0;
  display1 = display2 = null;
  splitDeck(shuffleDeck(buildDeck()));
  dealBattle();
  $('#war').hide();
  $('#win1').hide();
  $('#win2').hide();

}


//dealBattle -> render function possibly?
function dealBattle() {
  $('#battle').show();
  didWar = false;
  inPlay1 = [];
  inPlay2 = [];
  if (deck1.length){
    inPlay1.push(deck1.shift());
  } else{
    loser = 1;
  }
  if (deck2.length){
    inPlay2.push(deck2.shift());
  } else{
    loser = 2;
  }
  winner = getWinner();
  if (winner === 1) {
    $('#win2').hide();
    $('#win1').show();
  } else if (winner ===2){
    $('#win1').hide();
    $('#win2').show();
  }
  while (!winner && !loser) {
    didWar = true;
    dealWar();
    winner = getWinner();
  }
  var victor = winner === 1 ? deck1 : deck2;
  victor.push(...inPlay1);
  victor.push(...inPlay2);
  display1 = inPlay1[0].css;
  display2 = inPlay2[0].css;
  render();
}

function dealWar() {
  if (deck1.length < 4) {
    loser = 1;
  } else if (deck2.length < 4) {
    loser = 2;
  } else {
    for (var i=0; i < 4; i++){
      inPlay1.unshift(deck1.shift());
      inPlay2.unshift(deck2.shift());
    }
  }
}

function render() {
  if (display1) {
    $('#newgame').hide();
    $('#deck1').text(deck1.length);
    $('#deck2').text(deck2.length);
    $card1.removeClass();
    $card1.addClass('card ' + display1);
    $card2.removeClass();
    $card2.addClass('card ' + display2);
    // if loser display that message
    // otherwise display battle loser message
  } else {
    $('#newgame').show();
  }
}

function getWinner() {
  if (inPlay1[0].rank === inPlay2[0].rank) return 0;
  return inPlay1[0].rank > inPlay2[0].rank ? 1 : 2;
}








