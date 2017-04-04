// <------- variables ------->
var player1, player2;
var deck, deck1, deck2 = [];




// <------- event listeners ------->
$('#newgame').on('click', startGame)
$('#battle').on('click', dealDeck)



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
  return deck1, deck2;
  }


function startGame(){
  var array=[];
  splitDeck(shuffleDeck(buildDeck()));
}



function dealDeck() {
  var $card1 = $('.card1');

  if (deck1.length > 0){
    var card = deck1.shift();
    $card1.addClass(card.css)
  } else{
    return null;
  }

  var $card2 = $('.card2');

  if (deck2.length > 0){
    var card = deck2.shift();
    $card2.addClass(card.css)
  } else{
    return null;
  }



}

function gamePlay(arg1, arg2){
  if (deck1.rank === deck2.rank){
    console.log("war mode");
  }
  if (deck1.rank > deck2.rank) {


  }
}


