// Lesson 08.04 - PROG

// Blackjack - Pt. 2: ACES..!

// Review the code for making a deck of cards as array of objects

// 1. Given: Arrays for making and storing the cards:
const kinds = [2, 3, 4, 5, 6, 7, 8, 9, 10, 'Jack', 'Queen', 'King', 'Ace'];
const suits = ['Diamonds', 'Hearts', 'Spades', 'Clubs'];
const deck = [];

// 2. Set up a nested for loop that iterates over 
// the kinds and suits arrays:
for(let k = 0; k < kinds.length; k++) {
    for(let s = 0; s < suits.length; s++) {

        // 3. Simplify the current array items 
        //    by passing them to variables:
        let kind = kinds[k]; // 2
        let suit = suits[s]; // Diamonds

        // 4. Concatenate the card name and image file names:
        // - name "Queen of Diamonds" corresponds to file "Queen-of-Diamonds.png"
        let name = `${kind} of ${suit}`; // 2 of Diamonds
        let file = `${kind}-of-${suit}.png`; // 2-of-Diamonds.png

        // 5. Declare a variable, valu, with an inital value of 0;
        // - valu is for storing the numeric value of the card
        let valu;
        if(kind == "Ace") { // if it's an Ace
            valu = 11; 
        // } else if(kind == "Jack" || kind == "Queen" || kind == "King") { 
        } else if(kind.length > 3) { // if it's a face card
            valu = 10;
        } else { // it is a number (2-10)
            valu = kind;
        }
        // ternary attempt:
        // let valu = kind == "Ace" ? kind.length > 3 ? 11 : 10 : kind;

        // 6. Set the valu property based on the kind of card
        // - the length of the kind string reveals if it is a face card
        // as only "Jack", "Queen", "King" have more than 3 characters

        // Review: Each card is an object with 5 properties:
        /* 
            - name: the name of the card: "Jack of Hearts"
            - file: the card file name: "Jack-of-Hearts.png"
            - kind: 2-10, 'Jack', 'Queen', 'King', 'Ace'
            - suit: 'Diamonds', 'Hearts', 'Spades', 'Clubs'
            - valu: numeric value; face card = 10, Ace = 11
        */

        // 7. Declare a card object with the 5 vars as properties: 
        let card = { 
            kind: kind, 
            suit: suit, 
            name: name,
            file: file, 
            valu: valu, 
        };

        // 8. Push the card object into the deck array:
        deck.push(card);

    } // close inner for loop 
} // close outer for loop

// console.log('fresh deck:', deck);

// 9. Shuffle (randomize) the deck:
deck.sort(() => Math.random() - 0.5);
console.log('shuffled deck:', deck);

// 10. Make a shoe consisting of 6 decks of cards, 
//     using the spread ... operator
const shoe = [...deck, ...deck, ...deck, ...deck, ...deck, ...deck];

// 11. Shuffle (randomize) the shoe:
shoe.sort(() => Math.random() - 0.5);
console.log('shuffled shoe:', shoe);

// 12. Get the DOM elements:

// - Get the DEAL button 
const dealBtn = document.getElementById('deal-btn');
// and assign a listener for calling the deal function when clicked
dealBtn.addEventListener('click', deal);

// - Get the HIT and STAND buttons and assign listeners:
// listeners must be commented out until hit and stand functions actually exist
const hitBtn = document.getElementById('hit-btn');
hitBtn.addEventListener('click', hit);

const standBtn = document.getElementById('stand-btn');
standBtn.addEventListener('click', stand);

// - Get the h2, which will be used for outputting feedback 
//   "HIT or STAND?", "Busted! You Lose!", "Congrats! You Win!"
const feedbackH2 = document.querySelector('h2');

// 13. Get the divs that hold the player and dealer cards and 
const playerCardsDiv = document.getElementById('player-cards-div');
const dealerCardsDiv = document.getElementById('dealer-cards-div');

//     get the spans for displaying player and dealer scores
const playerScoreSpan = document.getElementById('player-score-span');
const dealerScoreSpan = document.getElementById('dealer-score-span');

// 14. Declare global vars need for keeping track of the deal
// - dealCounter keeps track of total cards dealt
let dealCounter = 0;
// - arrays for holding player and dealer cards 
let playerHand = [];
let dealerHand = [];
// variables for keeping score:
let playerScore = 0;
let dealerScore = 0;
// a gloval var for holding the dealer's Hole Card (hidden 2nd) card
// this gets set to equal the dealer's 2nd card once it is dealt
// then later, when the dealer has to show the Hole Card, this
// gets set to the src of the actual 2nd dealer card:
let holeCard;

// vars for keeping track of Ace scores:
let pAceScore = 0; // Player Ace Score
let dAceScore = 0; // Dealer Ace Score

// DEAL
// Now, that we have the shoe, let's deal a hand of Blackjack. We dealt a hand of
// poker in the earlier lesson where we made the deck of cards, BUT this will be
// different: to better emulate game play, we will use setInterval to deal on a 
// 1-second delay between cards
// the deal consists of 2 hands -- player and dealer -- each of whom get 2 cards
// the dealer's first card is dealt face down -- the "hole card"

// 15. Define the deal function:
function deal() {
    // 16. Since this is a new hand, reset the scores and "clear the table"
    playerScore = dealerScore = dealCounter = 0; // reset player/dealer scores and  deal counter
    playerCardsDiv.innerHTML = ""; // empty divs that display cards
    dealerCardsDiv.innerHTML = ""; 
    feedbackH2.innerHTML = ""; // clear text from feedback h2
    playerHand = []; // empty arrays that store player and dealer hands
    dealerHand = [];
    pAceScore = dAceScore = 0; // reset Ace scores to 0;

    // 17. Call the setInterval method with its callback function, set equal to a variable,
    // myInterval, which will be used to clear the interval (stop deal)
    let dealInterval = setInterval(function() {
        // console.log('dealInterval:', dealInterval, typeof(dealInterval)); // 1 number
        // deal a card each time, total of 4x

        // 18. Increment the counter that keeps track of how many card have been dealt
        dealCounter++; // clear interval when dealCounter equals 4

        // 20. Pop a card object off the shoe array and save it as a new card:
        let card = shoe.pop();
        // testing card for 2 Aces scenario:
        // let card = {
        //     file: "Ace-of-Hearts.png",
        //     kind: "Ace",
        //     name: "Ace of Hearts",
        //     suit: "Hearts",
        //     valu: 11
        // };

        console.log('card:', card); // { kind: 3, suit: 'Spades', name: '3 of Spades',  file: '3-of-Spades.png', valu: 3 }
        console.log('card.file:', card.file); // 3-of-Spades.png

        // 21. Instantiate a new image object to hold the card image and set its source
        let pic = new Image();
        pic.src = `images/cards350px/${card.file}`;
        console.log(pic); // <img src="images/card350px/3-of-Spades.png">

        // 22. If this is not the 2nd card / 1st dealer card, 
        //     set the image source equal to the card image 
        // file path:
       
        // 23. ELSE if this IS the 1st dealer card; deal the "hole card" 
        // face-down by setting its source equal to the back of the card image

       // 24. Set up an if-else statement to handle the logic for dealing two cards 
       // each to player and dealer, starting with the player.
       // The if condition uses the % mod operator to check the remainder 
       // when the counter is divided by 2. If the remainder is 1, this is 
       // the 1st or 3rd card, which goes to the player
       if(dealCounter % 2 == 1) { // if dealCounter is 1 or 3 (odd num)

            // 25. Output the card to the player's div
            playerCardsDiv.appendChild(pic);

            // 26. Push the card into the player's hand
            playerHand.push(card);
            console.log('playerHand:', playerHand);

            // check if Player card is an Ace:
            if(card.kind == "Ace") {
                // if card is Ace:
                if(pAceScore == 0) { // if NO pAceScore yet
                    pAceScore += 11; // 1st Ace counts 11
                } else { // this is the 2nd Ace
                    pAceScore++; // 2nd Ace counts 1
                    card.valu = 1;  // change 2nd Ace valu from 11 to 1
                }
                console.log('pAceScore:', pAceScore);
            }
            // increment player score by card valu:
            playerScore += card.valu;
            console.log('playerScore:', playerScore);

       // 28. Add the else part to handle dealers dealt to the dealer
       } else { // dealCounter is 2 or 4 (even num)
    
            // 29. Make the dealer cards a bit smaller, to make them appear farther away
            pic.style.width = "105px";

            // when dealCounter gets to 4, the dealin's done, so:
            if(dealCounter == 4) {
                // Hide Hole Card (dealer's 2nd card):
                pic.src = 'images/cards350px/0-Back-of-Card-Red.png';
                // assign the card pic an id
                pic.id = "hole-card";
                // Output "Player Score" and  "Dealer Shows":
                playerScoreSpan.textContent = "Player Score: " + playerScore;
                dealerScoreSpan.textContent = "Dealer Shows: " + dealerHand[0].valu;
                // Clear the interval (stop the deal):
                clearInterval(dealInterval);
            }
          
            // 30. Output the card to the dealer's div
            dealerCardsDiv.appendChild(pic);
      
            // 31. Push the card into the dealer's hand
            dealerHand.push(card);
            console.log('dealerHand:', dealerHand);
        
            // check if Dealer card is an Ace:
            if(card.kind == "Ace") {
                // if card is Ace:
                if(dAceScore == 0) { // if NO pAceScore yet
                    dAceScore += 11; // 1st Ace counts 11
                } else { // this is the 2nd Ace
                    dAceScore++; // 2nd Ace counts 1
                    card.valu = 1;  // change 2nd Ace valu from 11 to 1
                }
                console.log('dAceScore:', dAceScore);
            }

            // increment player score by card valu:
            dealerScore += card.valu;
            console.log('dealerScore:', dealerScore);

       } // end if-else

    }, 1000); // end setInterval as soon as the 4 cards are dealt

    // Check for Blackjack: wait 2 sec before doing this to better emulate real gameplay

    // 39. Check to see if the player AND dealer BOTH have Blackjack
    // after deal is done, pause 1.5 sec and then check for Blackjack
    // and if no one has Blackjack, proceed to the HIT / STAND phase
    setTimeout(() => {
        // dealerScore = 21; // emulate dealer Blackjack
        // playerScore = 21; // emulate player Blackjack
        // log everything inside the dealer and player div boxes: 
        
        // We need access to the cards on the DOM (the table); 
        // this children is an array of parent DOM elements
        // console.log('playerCardsDiv.children:\n', playerCardsDiv.children);
        // console.log('1st dealer card img tag:\n', dealerCardsDiv.children[1]);
        
        // go get the hole card, which is the dealer's 2nd card, and assign it to global holeCard var:
        holeCard = document.getElementById('hole-card');

        if(playerScore == 21 && dealerScore == 21) {
            feedbackH2.innerHTML = "Both have BLACKJACK!<br>It's a PUSH!";
            // reveal Hole Card to prove that dealer has Blackjack:
            // dealerCardsDiv.children[1].src = `images/cards350px/${dealerHand[1].file}`;
            holeCard.src = `images/cards350px/${dealerHand[1].file}`;

        } else if(playerScore == 21) {
            feedbackH2.innerHTML = "You have BLACKJACK!<br>You WIN! Congrats!";

        } else if(dealerScore == 21) {
            feedbackH2.innerHTML = "Dealer has BLACKJACK!<br>You LOSE! Sorry!";
            // reveal Hole Card to prove that dealer has Blackjack:
            // dealerCardsDiv.children[1].src = `images/cards350px/${dealerHand[1].file}`;
            holeCard.src = `images/cards350px/${dealerHand[1].file}`;

        } else { // no one has Blackjack, so: 

            // 35. If no one has blackjack, deactivate the DEAL button so that it cannot be clicked again

            // prompt player to Hit or Stand
            // 38. Prompt the player to "HIT or STAND?"..for better game play pacing, 
            feedbackH2.innerHTML = "Hit or Stand..?";

            // deactivate DEAL button; activate HIT & STAND btns

            // 36. Mute the color of the DEAL button so that it looks unclickable
            dealBtn.classList.add("disabled-btn"); // make DEAL btn LOOK unclickable
            dealBtn.disabled = true; // make DEAL button unclickable

            // 37. Un-mute the HIT and STAND buttons and set their disabled to false
            // the buttons appearance is handled by removing and adding classes

            hitBtn.classList.add("enabled-btn"); // make HIT btn LOOK clickable
            hitBtn.classList.remove("disabled-btn");
            hitBtn.disabled = false; // make HIT button clickable

            standBtn.classList.add("enabled-btn"); // make STAND btn LOOK clickable
            standBtn.classList.remove("disabled-btn");
            standBtn.disabled = false; // make STAND button clickable

        } // end blackjack check: if-else if-else if-else

    }, 5500); // end setTimeout Blackjack check / Hit-Stand Prompt / button toggle 
 
} // close deal() function
            
// 41. Run the file in the browser and click DEAL, being sure to check the 
// console for the shuffled deck, shuffled shoe and dealer hand / score

// define empty test hit() and stand() functions so that listeners don't break code
function hit() {
    console.log("You clicked the HIT button!");
}

function stand() {
    console.log("You clicked the STAND button!");
}

