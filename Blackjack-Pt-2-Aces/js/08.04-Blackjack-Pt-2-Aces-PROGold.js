// Lesson 08.03 - PROG

// Blackjack - Pt. 1: DEAL..!
// Review of Lesson 05.04: Making a deck of cards with a nested loop
// New for Lesson 08.03: Deal Blackjack on a timer with setInterval
// Keep score and display the score to the DOM
// Detect Blackjack (21) for the Player, the Dealer -- or both
// Prompt Player to Hit or Stand

// Review the code for making a deck of cards as array of objects

// 1. Given: Arrays for making and storing the cards:
const kinds = [2, 3, 4, 5, 6, 7, 8, 9, 10, 'Jack', 'Queen', 'King', 'Ace'];
const suits = ['Diamonds', 'Hearts', 'Spades', 'Clubs'];
const deck = [];

// 2. Review: Set up a nested for loop that iterates over 
// the kinds and suits arrays:
// for(let k = 0; k < kinds.length; k++) {
//     for(let s = 0; s < suits.length; s++) {
kinds.forEach(kind => {
    suits.forEach(suit => {
        // 3. Simplify the current array items by passing them to variables:
        // let kind = kinds[k];
        // let suit = suits[s];

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
        if(kind.length == 3) {
            valu = 11; // Ace
        } else if(kind.length >= 4) {
            valu = 10; // face card
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

        // 7. Declare a card object with the 5properties, the values of which the 5 corresponding variables 
        const card = {name:name, file:file, kind:kind, suit:suit, valu:valu};

        // 8. Push the card object into the deck array:
        deck.push(card);

    }); // kinds.forEach(kind => {
}); // kinds.forEach(suit => {

console.log(deck);

// Triple-shuffle the deck

// 9A. Review: Shuffle (randomize) the deck:
deck.sort(() => Math.random() - 0.5);

// 9B. Review: Fisher-Yates Shuffle 
for(let i = 0; i < deck.length; i++) {
    let temp = deck[i];
    let r = Math.floor(Math.random() * deck.length);
    deck[i] = deck[r];
    deck[r] = temp;
}

// 9C. Fisher-Yates Shuffle using forEach
deck.forEach((e,i,a) => {
    let r = Math.floor(Math.random() * a.length);
    a[i] = a[r];
    a[r] = e;
});

console.log('thrice-shuffled deck', deck);


// 10. Review: Make a shoe consisting of 6 decks of cards, using the spread ... operator
const shoe = [...deck, ...deck, ...deck, ...deck, ...deck, ...deck];
console.log(shoe);

// 11. Review: Shuffle (randomize) the shoe:

shoe.sort(() => Math.random() - 0.5);

// 9B. Review: Fisher-Yates Shuffle 
for(let i = 0; i < shoe.length; i++) {
    let temp = shoe[i];
    let r = Math.floor(Math.random() * shoe.length);
    shoe[i] = shoe[r];
    shoe[r] = temp;
}

// 9C. Fisher-Yates Shuffle using forEach
shoe.forEach((e,i,a) => {
    let r = Math.floor(Math.random() * a.length);
    a[i] = a[r];
    a[r] = e;
});

console.log('thrice-shuffled shoe', shoe);


// 12. Get the DOM elements:
// - Get the DEAL button and assign a listener for calling the deal function when clicked
const dealBtn = document.getElementById('deal-btn');
dealBtn.addEventListener('click', deal);
// - Get the HIT and STAND buttons, which won't be assigned listeners yet
const hitBtn = document.getElementById('hit-btn');
const standBtn = document.getElementById('stand-btn');
// - Get the h2, which will be used for outputting prompts ("HIT or STAND?", etc.)
const promptH2 = document.querySelector('h2');

// 13. Get the divs that hold the player and dealer hands and that display the player and dealer scores
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
// keep track of player and dealer Ace scores
let pAceScore = 0;
let dAceScore = 0;

// DEAL
// Now, that we have the shoe, let's deal a hand of Blackjack. We dealt a hand of poker in the earlier lesson where we made the deck of cards, BUT this will be different: to better emulate game play, we will use setInterval to deal on a 1-second delay between cards
// the deal consists of 2 hands -- player and dealer -- each of whom get 2 cards
// the dealer's first card is dealt face down -- the "hole card"

// 15. Define the deal function:
function deal() {
    // 16. Since this is a new hand, reset the scores and "clear the table"
    // - reset the player and dealer scores
    // - empty the divs that display the cards
    // - clear the text from the output h2
    // - empty the arrays that store the player and dealer handsdealCounter = 0;
    dealCounter = 0;
    playerScore = 0;
    dealerScore = 0;
    playerCardsDiv.innerHTML = "";
    dealerCardsDiv.innerHTML = "";
    playerScoreDiv.innerHTML = 'Player Score: 0';
    dealerScoreDiv.innerHTML = 'Dealer Score: 0';
    playerHand = [];
    dealerHand = [];
    pAceScore = 0;
    dAceScore = 0;

    // 17. Call the setInterval method with its callback function, set equal to a variable,
    // myInterval, which will be used to clear the interval (stop deal)
    let dealInterval = setInterval(() => {

        // 18. Increment the counter that keeps track of how many card have been dealt
        dealCounter++;

        // 19. If this is the 4th card being dealt, clear the interval (stop the deal)
        if(dealCounter == 4) {
            clearInterval(dealInterval);
        }

        // 20. Instantiate a new image object to hold the card image
        let pic = new Image();

        // 21. Pop a card object off the shoe array and save it as a new card
        let card = shoe.pop();

        // 22. If this is not the 2nd card / 1st dealer card, set the image 
        // source equal to the card image file path:
        if(dealCounter != 2) {
            pic.src = `images/cards350px/${card.file}`;
        // 23. ELSE if this IS the 1st dealer card; deal the "hole card" 
        // face-down by setting its source equal to the back of the card image
        } else {
            pic.src = `images/cards350px/0-Back-of-Card-Red.png`;
        }

       // 24. Set up an if-else statement to handle the logic for dealing two cards each to player and dealer, starting with the player.
       // The if condition uses the % mod operator to check the remainder 
       // when the counter is divided by 2. If the remainder is 1, this is 
       // the 1st or 3rd card, which goes to the player
       if(dealCounter % 2 == 1) {

            // 25. Output the card to the player's div
            playerCardsDiv.appendChild(pic);

            // 26. Push the card into the player's hand
            playerHand.push(card);

            // card.kind = "Ace"; // test to see if we get a score of 12 for the player

            if(card.kind == "Ace") {
                // it's an Ace, BUT does the player already have an Ace?
                if(pAceScore == 11) {  // yes, player already has an Ace
                    pAceScore = 12; // so the second Ace counts 1
                    card.valu = 1; // increment player score by 1
                } else { // no, player does NOT already have an Ace
                    pAceScore = 11; // so this first ace counts 11
                }
                // OR: if you can still follow the logic, use a ternary
                // pAceScore = pAceScore == 11 ? 12 : 11;
            }

            // 27. Increment the player's score by the "valu"
            playerScore += card.valu;
      

        // 28. Add the else part to handle cards to the dealer
       } else {

            // 29. Make the dealer cards a bit smaller, to make them appear farther away
            pic.style.width = "105px";
            pic.style.height = "auto";
          
            // 30. Output the card to the dealer's div
            dealerCardsDiv.appendChild(pic);
      
            // 31. Push the card into the dealer's hand
            dealerHand.push(card);

            if(card.kind == "Ace") {
                // it's an Ace, BUT does dealer already have an Ace?
                if(dAceScore == 11) {  // yes, dealer already has an Ace
                    dAceScore = 12; // so the second Ace counts 1
                    card.valu = 1; // increment dealer score by 1
                } else { // no, dealer does NOT already have an Ace
                    dAceScore = 11; // so this first ace counts 11
                }
                // OR: if you can still follow the logic, use a ternary
                // dAceScore = dAceScore == 11 ? 12 : 11;
            }
        
            // 32. Update the dealer's score
            dealerScore += card.valu;

            // Test Blackjack
            // dealerScore = 21;
            // playerScore = 21;
       }

        // 33. Update "Dealer Show"s" once the deal ends--this is not
        // the dealer's score, just the value of the ONE card that IS showing
        // this value equals the dealer's score minus the value of the the hole card

        /// ** ## ** DEAL OVER SO OUTPUT SCORES AND PROMPT PLAYER TO HIT OR STAND ** ## ** 

        if(dealCounter == 4) { // if the deal is done

            // alert(dealCounter);

            dealerScoreDiv.innerHTML = "Dealer Shows: " + dealerHand[1].kind;

            // output the player's score
            playerScoreDiv.innerHTML = "Player Score: " + playerScore;

            // save the first dealer card -- the hidden "hole card" to a variable
            // .children[0] returns the first child element inside the parent element
            let holeCard = document.getElementById("dealer-cards-div").children[0];

            // 34. Log the dealer's hidden hand and secret score to the console
            console.log('dealer score:', dealerScore, ' player score:', playerScore);
            console.log('dealer hand:', dealerHand, ' player hand:', playerHand);
            
            // ** ## ** EVALUATE FOR BLACKJACK: BOTH, JUST PLAYER, JUST DEALER -- OR NEIHER ** ## ** 
            setTimeout(() => {
                // if anyone has BLACKJACK, the game is over
                
                if(playerScore == 21 && dealerScore == 21) { // first check if BOTH have BLACKJACK
                    promptH2.innerHTML = "BOTH have BLACKJACK! It's a PUSH!";
                    holeCard.src = `images/cards350px/${dealerHand[0].file}`;

                } else if(playerScore == 21) { // then check if just the player has blackjack (21)
                    promptH2.innerHTML = "You have BLACKJACK! You WIN!";
                    
                } else if(dealerScore == 21) { // then check if just the dealer has blackjack (21)
                    promptH2.innerHTML = "Dealer has BLACKJACK! You LOSE!";
                    holeCard.src = `images/cards350px/${dealerHand[0].file}`;
                    
                } else { // no one has blackjack

                    // 35. No one has blackjack, so deactivate the DEAL button so that it cannot be clicked again; 
                    // also activate the HIT and STAND buttons so that they become clickable
                    dealBtn.disabled = "true";
                    // 36. Mute the color of the DEAL button so that it looks unclickable by adding the disabled-btn class
                    dealBtn.classList.add('disabled-btn');                    

                    // 37. Remove the disabled-btn class from the HIT and STAND buttons so that they appear clickable
                    hitBtn.classList.remove('disabled-btn');
                    standBtn.classList.remove('disabled-btn');

                    // 37B. Make the HIT and STAND buttons actually clickable by setting disabled property to false
                    hitBtn.disabled = "false";
                    standBtn.disabled = "false";
                
                    // 38. Prompt the player to "HIT or STAND?"
                    promptH2.innerHTML = "Hit or Stand?";

                } // end big if else block
            }, 1500);

            // 39. Check to see if either the player or dealer have Blackjack
            // Announce Blackjack on 1 second delay; if no one has Blackjack,
            // prompt player to HIT or STAND:
    
            // 40. Set the setInterval timer for the card dealing to repeat every 1 second:

        } // close if(dealCounter == 4)

    }, 1000); // close setInterval()

} // close function deal() 

// 41. Run the file in the browser and click DEAL, being sure to check the 
// console for the shuffled deck, shuffled shoe and dealer hand / score

// END: Lesson 08.03
// NEXT: Lesson 08.04