// <------- variables ------->
var inPlay1, inPlay2;
var winner, loser;
var deck, deck1, deck2;
var display1, display2;
var message;
var inWar;
var player = new Audio();
var sounds = {
  war: 'http://www.freesound.org/data/previews/352/352719_6513636-lq.mp3',
  battle: 'http://www.freesound.org/data/previews/60/60945_215874-lq.mp3'
};


// <------- cached dom elements ------->
var $card1 = $('#card1');
var $card2 = $('#card2');
var $board = $('#board');


// <------- event listeners ------->
$('#newgame').on('click', startGame);
$('#battle').on('click', handleBattleClick);
$('#war').on('click', handleWarClick);
$('#rules').on('click', function () {
                var w = window.open("", "popupWindow", "width=400, height=450, scrollbars=yes");
                var $w = $(w.document.body);
                $w.html("<b>Deal</b> cards:<br>The deck is divided evenly, with each player receiving 26 cards, dealt one at a time, face down. Anyone may deal first. Each player places his stack of cards face down, in front of him. </br><b>The Play</b><br>Each player turns up a card at the same time and the player with the higher card takes both cards and puts them, face down, on the bottom of his stack. Aces are high, and suits are ignored. If both players draw a card of the same rank, e.g. they both draw 8s, then there's a war. The face up cards are left on the table and each player puts three cards face down on the table, and then puts one card face up. The face up card determines who wins the war and gets all 10 cards that are on the table at this point. If the face up card is again the same rank, then the war goes on, three more face down, one face up etc.</br><b>How to Keep Score</b><br>First player to finish all their cards loses the game. If a player finishes their cards during a war without having enough cards to finish the war then he loses immediately.</br>")});


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
  deck1 = [];
  deck2 = [];
  inPlay1 = [];
  inPlay2 = [];
  loser = 0;
  winner = 0;
  display1 = display2 = null;
  splitDeck(shuffleDeck(buildDeck()));
  message = " ";
  render();
}


function dealCards(num) {
  for (var i = 0; i < num; i++) {
    inPlay1.unshift(deck1.shift());
    inPlay2.unshift(deck2.shift());
  }
}


function handleBattleClick() {
  playWarSound('battle');
  inPlay1 = [];
  inPlay2 = [];
  dealCards(1);
  winner = getWinner();
  if (winner) {
    inWar = false;
    transferCards();
  } else {
    inWar = true;
  }
  render();
}


function handleWarClick() {
  playWarSound('war');
  if (deck1.length > 3 && deck2.length > 3){
    doWar();
  } else {
    loser = deck1.length < 4 ? 1 : 2;
    winner = loser === 1 ? 2 : 1;
    transferCards();
  }
  render();
}


function playWarSound(name) {
  player.src = sounds[name];
  player.play();
}


function doWar() {
  dealCards(4);
  winner = getWinner();
  if (winner) {
    inWar = false;
    transferCards();
  } else {
    inWar = true;
  }
  render();
}


function transferCards() {
  var victor = winner === 1 ? deck1 : deck2;
  victor.push(...inPlay1);
  victor.push(...inPlay2);
  if (loser) {
    var nonVictor = victor === deck1 ? deck2 : deck1;
    victor.push(...nonVictor);
    nonVictor.splice(0);
  }
  if (!deck1.length || !deck2.length) {
    loser = deck1.length ? 2 : 1;
    winner = loser === 1 ? 2 : 1;
  }
}


function getWinner() {
  if (inPlay1[0].rank === inPlay2[0].rank) {
    return 0;
  } else {
    return inPlay1[0].rank > inPlay2[0].rank ? 1 : 2;
  }
}


function render() {
  if (inPlay1[0]) {
    display1 = inPlay1[0].css;
    display2 = inPlay2[0].css;
  }
  $('#deck1').text(deck1.length);
  $('#deck2').text(deck2.length);
  if (display1) {
    $('#battle').show();
    $card1.removeClass();
    $card1.addClass('card large ' + display1);
    $card2.removeClass();
    $card2.addClass('card large ' + display2);
  } else {
    $('#newgame').show();
    $card1.removeClass();
    $card1.addClass('card large');
    $card2.removeClass();
    $card2.addClass('card large');
  }

  if (inWar) {
    message = "It's WAR!";
    $('#battle').hide();
    $('#war').show();
  } else {
    $('#battle').show();
    $('#war').hide();
  }

  if (winner) message = `Player ${winner} Wins`;
  if (loser) {
    message = `Game Over - Player ${winner} Wins`;
    $('#war').hide();
    $('#battle').hide();
    $('#newgame').show();
  }

  $('#message').html(message);
}








