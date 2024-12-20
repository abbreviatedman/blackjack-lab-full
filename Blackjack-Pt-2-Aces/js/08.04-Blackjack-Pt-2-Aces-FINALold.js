// Lesson 08.04 - FINAL

// Blackjack - Pt. 2: Aces
// evaluating Aces as worth either 11 or 1
// testing the various Blackjack scenarios
// Review the code for making a deck of cards as array of objects

// 1. Given: Arrays for making and storing the cards:
const kinds = [2, 3, 4, 5, 6, 7, 8, 9, 10, 'Jack', 'Queen', 'King', 'Ace'];
const suits = ['Diamonds', 'Hearts', 'Spades', 'Clubs'];
const deck = [];

// 2. Review: Set up a nested for loop that iterates over 
// the kinds and suits arrays:
for (let i = 0; i < kinds.length; i++) {
    for (let j = 0; j < suits.length; j++) {

        // 3. Simplify the current array items by passing them to variables:
        let kind = kinds[i];
        let suit = suits[j];

        // 4. Concatenate the card name and image file names:
        // - name "Queen of Diamonds" corresponds to file "Queen-of-Diamonds.png"
        let name = `${kind} of ${suit}`;
        let file = `${kind}-of-${suit}.png`;

        // 5. Declare a variable, valu, with an inital value of 0;
        // - valu is for storing the numeric value of the card
        let valu = 0;

        // 6. Set the valu property based on the kind of card
        // - the length of the kind string reveals if it is a face card
        // as only "Jack", "Queen", "King" have more than 3 characters
        if(kind.length > 3)  {
            valu = 10;
        } else if(kind == 'Ace') {
            valu = 11;
        } else {
            valu = kind;
        }

        // Review: Each card is an object with 5 properties:
        /* 
            - name: the name of the card: "Jack of Hearts"
            - file: the card file name: "Jack-of-Hearts.png"
            - kind: 2-10, 'Jack', 'Queen', 'King', 'Ace'
            - suit: 'Diamonds', 'Hearts', 'Spades', 'Clubs'
            - valu: numeric value; face card = 10, Ace = 11
        */

        // 7. Declare a card object with the 5properties, the values of which are
        // the 5 corresponding variables 
        let card = { name: name, file: file, kind: kind, suit: suit, valu: valu };

        // 8. Push the card object into the deck array:
        deck.push(card);
    }
}

// 9. Review: Shuffle (randomize) the deck:
deck.sort((a,b) =>{
    return Math.random() - 0.5;
});
console.log('shuffled deck: ', deck);

// 10. Review: Make a shoe consisting of 6 decks of cards, using the spread ... operator
const shoe = [...deck, ...deck, ...deck, ...deck, ...deck, ...deck];

// 11. Review: Shuffle (randomize) the shoe:
shoe.sort((a,b) => {
    return Math.random() - 0.5;
});
console.log('shuffled shoe: ', shoe);

// 12. Get the DOM elements:
// - Get the DEAL button and assign a listener for calling the deal function when clicked
// - Get the HIT and STAND buttons, which won't be assigned listeners yet
// - Get the h2, which will be used for outputting prompts ("HIT or STAND?", etc.)
const dealBtn = document.getElementById('deal-btn');
dealBtn.addEventListener('click', deal);
const hitBtn = document.getElementById('hit-btn');
const standBtn = document.getElementById('stand-btn');
const outputH2 = document.querySelector('h2');

// 13. Get the divs that hold the player and dealer hands and 
// that display the player and dealer scores
const playerCardsDiv = document.getElementById('player-cards-div');
const dealerCardsDiv = document.getElementById('dealer-cards-div');
const playerScoreDiv = document.getElementById('player-score-div');
const dealerScoreDiv = document.getElementById('dealer-score-div');

// 14. Declare global vars need for keeping track of the deal
// - arrays for holding player and dealer cards 
// variables for keeping score:
// - dealCounter keeps track of total cards dealt
let dealCounter = 0;
let playerHand = [];
let dealerHand = [];
let playerScore = 0;
let dealerScore = 0;

// DEAL
// Now, that we have the shoe, let's deal a hand of Blackjack. We dealt a hand of
// poker in the earlier lesson where we made the deck of cards, BUT this will be
// different: to better emulate game play, we will use setInterval to deal on a 
// 1-second delay between cards
// the deal consists of 2 hands -- player and dealer -- each of whom get 2 cards
// the dealer's first card is dealt face down -- the "hole card"

// 7. NEW Above the **deal()** function, declare these two variables, 
// **pAceScore** (player Ace score) and **dAceScore** (dealer Ace score):
let pAceScore = 0; // player Ace score
let dAceScore = 0; // dealer Ace score

// 22. NEW Declare a variable called **holeCardPic**, but don't give it a 
// value. This will be set equal to an Image object later.
let holeCardPic;

// 15. Define the deal function:
function deal() {
    // 16. Since this is a new hand, reset the scores and "clear the table"
    pAceScore = 0; // reset player Ace score
    dAceScore = 0; // reset dealer Ace score
    // - reset the counter variable that keeps track of cards dealt
    // = reset the player and dealer scores
    // - empty the divs that display the cards
    // - clear the arrays that store the player and dealer hands
    dealCounter = 0;
    playerScore = 0;
    dealerScore = 0;
    playerScoreDiv.innerHTML = 'Player Score: 0';
    dealerScoreDiv.innerHTML = 'Dealer Shows: 0';  
    playerCardsDiv.innerHTML = '';
    dealerCardsDiv.innerHTML = '';
    outputH2.innerHTML = "";
    playerHand = [];
    dealerHand = []; 

    // 17. Call the setInterval method with its callback function, set equal to a variable,
    // myInterval, which will be used to clear the interval (stop deal)
    let myInterval = setInterval(() => {

        // 18. Increment the counter that keeps track of how many card have been dealt
        dealCounter++;

        // 19. If this is the 4th card being dealt, clear the interval (stop the deal)
        if(dealCounter == 4) clearInterval(myInterval);

        // 20. Instantiate a new image object to hold the card image
        let pic = new Image();

        // 21. Pop a card object off the shoe array and save it as a new card
        let card = shoe.pop();
        // let card;

        /* Testing player-only blackjack */
        /*
        if(dealCounter == 1) { 
            card = {
                file: "Ace-of-Hearts.png",
                kind: "Ace",
                name: "Ace of Hearts",
                suit: "Hearts",
                valu: 11
            };
        // make dealer's second card, the visible card, a Queen
        } else if(dealCounter == 3) {
           card = {
                file: "Queen-of-Diamonds.png",
                kind: "Queen",
                name: "Queen of Diamonds",
                suit: "Diamonds",
                valu: 10
            };
        // make player's cards whatever gets popped off the shoe
        } else {
            card = shoe.pop();
        }
        */

        /* Testing dealer-only blackjack */
        // make dealer's hole card an Ace
        /*
        if(dealCounter == 2) { 
            card = {
                file: "Ace-of-Hearts.png",
                kind: "Ace",
                name: "Ace of Hearts",
                suit: "Hearts",
                valu: 11
            };
        // make dealer's second card, the visible card, a Queen
        } else if(dealCounter == 4) {
           card = {
                file: "Queen-of-Diamonds.png",
                kind: "Queen",
                name: "Queen of Diamonds",
                suit: "Diamonds",
                valu: 10
            };
        // make player's cards whatever gets popped off the shoe
        } else {
            card = shoe.pop();
        }
        */

        /* Testing both player and dealer blackjack */
        /*
        if(dealCounter < 3) {
            card = {
                file: "Ace-of-Hearts.png",
                kind: "Ace",
                name: "Ace of Hearts",
                suit: "Hearts",
                valu: 11
            };
        } else {
            card = {
                file: "Queen-of-Diamonds.png",
                kind: "Queen",
                name: "Queen of Diamonds",
                suit: "Diamonds",
                valu: 10
            };
        }
        */

        // 22. If this is not the 2nd card / 1st dealer card, set the image 
        // source equal to the card image file path:
        if(dealCounter != 2) {
            pic.src = `images/cards350px/${card.file}`; 

        // 23. ELSE if this IS the 1st dealer card; deal the "hole card" 
        // face-down by setting its source equal to the back of the card image
        } else {
            pic.src = 'images/cards350px/0-Back-of-Card-Red.png'; 
            holeCardPic = pic;
        }

       // 24. Set up an if-else statement to handle the logic for dealing two cards 
       // each to player and dealer, starting with the player.
       // Th if condition uses the % mod operator to check the remainder 
       // when the counter is divided by 2. If the remainder is 1, this is 
       // the 1st or 3rd card, which goes to the player
        if(dealCounter % 2 == 1) {
            // 25. Output the card to the player's div
            playerCardsDiv.appendChild(pic);
            // 26. Push the card into the player's hand
            playerHand.push(card);

            // 12 NEW. If the **pAceScore** is *not* currently 0, 
            // the player already has an Ace. A hand cannot have two "Ace 11's", 
            // so this second Ace counts 1. Therefore, increase the **pAceScore** 
            // to 12 AND decrease the value of the card to 1. This must be done 
            // before "old step 27" which updates the player's score by adding 
            // **card.valu** to it:
            if(card.kind == "Ace") {
                if(pAceScore == 0) {
                    pAceScore = 11;
                } else {
                    pAceScore = 12;
                    card.valu = 1;
                }
            }
            console.log('pAceScore:', pAceScore);

            // 27. Increment the player's score
            playerScore += card.valu;
            playerScoreDiv.innerHTML = "Player Score: " + playerScore;

        // 28. Add the else part to handle dealers dealt to the dealer
        } else { 
            // 29. Make the dealer cards a bit smaller, to make them appear farther away
            pic.style.width = "105px";
            pic.style.height = "auto";
            // 30. Output the card to the dealer's div
            dealerCardsDiv.appendChild(pic);
            // 31. Push the card into the dealer's hand
            dealerHand.push(card);

            // 13 NEW: 13. The **else** part handles dealer Aces in the same way. 
            // Add the if-else form the previous step between "old steps" 31 and 32. 
            if(card.kind == "Ace") {
                if(dAceScore == 0) {
                    dAceScore = 11;
                } else {
                    dAceScore = 12;
                    card.valu = 1;
                }
            }
            console.log('dAceScore:', dAceScore);

            // 32. Update the dealer's score
            dealerScore += card.valu;  
         }

        // 33. Update "Dealer Show"s" once the deal ends--this is not
        // the dealer's score, just the value of the ONE card that IS showing
        // this value equals the dealer's score minus the value of the the hole card
        if(dealerHand.length == 2) {
            dealerScoreDiv.innerHTML = "Dealer Shows: " + (dealerScore - dealerHand[0].valu);
            // 34. Log the dealer's hidden hand and secret score to the console
            console.log('dealer hand: ', dealerHand, 'dealer score: ', dealerScore);
            // 35. If no one has blackjack, deactivate the DEAL button so that it cannot be clicked again
            if(dealerScore != 21 && playerScore != 21) {
                dealBtn.disabled = true;
                // 36. Mute the color of the DEAL button so that it looks unclickable
                dealBtn.classList.add('disabled-btn');
                // 37. Un-mute the HIT and STAND buttons and set their disabled to false
                // the buttons appearance is handled by removing and adding classes
                hitBtn.disabled = false;
                standBtn.disabled = false;
            }
            // 38. Prompt the player to "HIT or STAND?"..for better game play pacing, 
            // do the prompt on a 15-second delay with setTimeout
            setTimeout(() => {
                if(playerScore != 21 && dealerScore != 21) {
                    outputH2.innerHTML = "HIT or STAND?";
                    hitBtn.classList.remove('disabled-btn');
                    standBtn.classList.remove('disabled-btn');
                    hitBtn.classList.add('enabled-btn');
                    standBtn.classList.add('enabled-btn');
                }
            }, 1500);

            // 39. Check to see if either the player or dealer have Blackjack
            // Announce Blackjack on 1 second delay; if no one has Blackjack,
            // prompt player to HIT or STAND:
            setTimeout(() => {
                if(playerScore == 21 && dealerScore == 21) {
                     outputH2.innerHTML = "Dealer and Player both have Blackjack! It's a Push!";
                     showHoleCard();
                } else if(playerScore == 21) {
                    outputH2.innerHTML = 'BLACKJACK! You win!';
                } else if(dealerScore == 21) {
                    outputH2.innerHTML = 'Dealer has BLACKJACK! You lose!';
                    showHoleCard();
                } else { // no one has Blackjack
                    outputH2.innerHTML = "HIT or STAND?";
                }
            }, 1000);
         }

    //40. Set the setInterval timer for the card dealing to repeat every 1 second:
    }, 1000);

}

function showHoleCard() {
    setTimeout(() => {
        holeCardPic.src = `images/cards350px/${dealerHand[0].file}`; 
    }, 1000);
}

// 41. Run the file in the browser and click DEAL, being sure to check the 
// console for the shuffled deck, shuffled shoe and dealer hand / score

// END: Lesson 08.04
// NEXT: Lesson 08.05