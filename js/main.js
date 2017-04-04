// <------- variables ------->
var player1, player2;
var deck, deck1, deck2;



// <------- cached dom elements ------->
var $card1 = $('#card1');
var $card2 = $('#card2');



// <------- event listeners ------->
$('#newgame').on('click', startGame)
$('#battle').on('click', dealBattle)



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
  splitDeck(shuffleDeck(buildDeck()));
}


//dealBattle -> render function possibly?
function dealBattle() {
  if (deck1.length > 0){
    var card = deck1.shift();
    player1 = card;


    $card1.removeClass();
    $card1.addClass('card ' + card.css);

  } else{
    return null;
  }


  if (deck2.length > 0){
    var card = deck2.shift();
    player2 = card;


    $card2.removeClass();
    $card2.addClass('card ' + card.css);


  } else{
    return null;
  }


  if (player1.rank > player2.rank) {
    deck1.push(player1);
    deck1.push(player2);
    console.log ("Player 1 wins");
    console.log (deck1.length);
    console.log (deck2.length);
  }

  if (player1.rank < player2.rank) {
    deck2.push(player2);
    deck2.push(player1);
    console.log ("Player 2 wins");
    console.log (deck1.length);
    console.log (deck2.length);

  }
  if (player1.rank === player2.rank) {
    gameWar();
  }
}

function gameWar(){
  console.log ("In the war function");

}




