# Pseudocode for War Game
#### 1. start a game:
       - var player1, player2; 
       - var cardsCount1, cardsCount2 = 0;
       - cards array that contains 52 cards;
#### 2. assign turns - 
* player1 starts;
		
		
#### 3. player1/player2 clicks on the deck of the cards and gets random card;
#### 4. compare 2 cards' values and whichever is higher the player wins and collects 2 cards.  
			
			if (card1 === card2){  
				start warGame();
			}
				
			if (card1 > card2) {
			    cardsCount1 + 1;
			    cardsCount2 - 1;
			}
			    
			if (card1 < card2){
				cardsCount2 + 1;
				cardsCount1 - 1;
			}
#### 5. create `function warGame():`

* when two players get same matched cards the warGame starts;
			
* each player draws 3 cards face down from the deck and 4th card face up;
			
* 4th cards get compared:
					
		while (card1 === card2) 
			warGame starts again;
					
		if (card1 > card2) {
			cardsCount1 + 5;
			cardsCount2 - 5;
		}
			    
		if (card1 < card2){
			cardsCount2 + 5;
			cardsCount1 - 5;
		}	
			  	  
####6. create `function winner():` 
		if  (cardsCount1 === 56)
			player1 is a winner;
	    if  (cardsCount2 === 56)
			player2 is a winner;}
				 
#### 7. create `function state():`
this function will keep track and record the current state of the game (number of cards each player holds) and it will check if there is a winner
			
#### 8. create `function render()`:
this function will reflect the changes of the current state of the game to the DOM


						
			
 
			   
    	