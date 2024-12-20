// Lesson 08.03 - START

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
kinds.forEach(k => {
    suits.forEach(s => {

        // 4. Concatenate the card name and image file names:
        // - name "Queen of Diamonds" corresponds to file "Queen-of-Diamonds.png"
        let cardName = `${k} of ${s}`;
        let imgFile = `${k}-of-${s}.png`;

        // 5. Declare a variable, valu, with an inital value of 0;
        // - valu is for storing the numeric value of the card

        // 8 lines boiled down into one line w 2-conditions ternary:
        let cardValue = k == 'Ace' ? 11 : k.length > 3 ? 10 : k;

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
        const cardObj = {
            name: cardName,
            file: imgFile,
            kind: k,
            suit: s,
            valu: cardValue
        };

        // 7. Declare a card object with the 5properties, the values of which are the 5 corresponding variables 

        // 8. Push card object into deck:
        deck.push(cardObj);

    }); // close outer suits.forEach()
}); // close outer kinds.forEach()

// 9. Review: Shuffle (randomize) the deck:
deck.sort(() => Math.random() - 0.5);
console.log(deck);

// 10. Review: Make a shoe consisting of 6 decks of cards, using the spread ... operator
const shoe = [...deck, ...deck, ...deck, ...deck, ...deck, ...deck];

// 11. Review: Shuffle (randomize) the shoe:
shoe.sort(() => Math.random() - 0.5);
console.log(shoe);

// 12. Get the DOM elements:

// - Get the DEAL button and assign a listener for calling the deal function when clicked
const dealBtn = document.getElementById('deal-btn');
dealBtn.addEventListener('click', deal);

// - Get the HIT and STAND buttons, which won't be assigned listeners yet
const hitBtn = document.getElementById('hit-btn');
// hitBtn.addEventListener('click', hit);

const standBtn = document.getElementById('stand-btn');
// standBtn.addEventListener('click', stand);

// - Get the h2, which will be used for outputting prompts ("HIT or STAND?", etc.)
const h2 = document.querySelector('h2');

// 13. Get the divs that hold the player and dealer hands and 
// the spans that display the player and dealer scores
const playerCardsDiv = document.getElementById('player-cards-div');
const dealerCardsDiv = document.getElementById('dealer-cards-div');
const playerScoreSpan = document.getElementById('player-score-span');
const dealerScoreSpan = document.getElementById('dealer-score-span');

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
// Now, that we have the shoe, let's deal a hand of Blackjac; to emulate game play, we will use setInterval to deal on a 1-second delay between cards; the deal consists of 2 hands -- player and dealer -- each of whom get 2 cards; the dealer's SECOND card (the "hole card") is dealt face down

const fruits = ['apple', 'banana', 'cherry'];
fruits.splice(0);
console.log('fruits:', fruits);

// 15. Define the deal function:
function deal() {
    // 16. Since this is a new hand, reset the scores and "clear the table"
    // - reset the player and dealer scores
    // - empty the divs that display the cards
    // - clear the text from the output h2
    // - empty the arrays that store the player and dealer handsdealCounter = 0;
    h2.innerHTML = '';
    playerCardsDiv.innerHTML = '';
    dealerCardsDiv.innerHTML = '';
    playerScoreSpan.textContent = 'Player: 0';
    dealerScoreSpan.textContent = 'Dealer: 0';
    playerScore = 0;
    dealerScore = 0;
    dealCounter = 0;
    playerHand.splice(0); // empty out the arrays without assignment =
    dealerHand.splice(0);

    // 16B. Turn off the Deal button during the Deal, 
    // so that user cannot click it twice
    dealBtn.classList.add('disabled-btn'); // visual turn off
    dealBtn.disabled = true; // functional turn off

    // 17. Call the setInterval method with its callback function, set equal to a variable,
    // dealInterval, which will be used to clear the interval (stop deal)
    let dealInterval = setInterval(() => { 

        // 18. Increment the counter that keeps track of how many card have been dealt
        dealCounter++;

        // 19. If this is the 4th card being dealt, clear the interval (stop the deal)

        // 20. Instantiate a new image object to hold the card image
        let pic = new Image();

        // 21. Pop a card object off the shoe array and save it as a new card
        let card = shoe.pop();

        // 22. If this is the dealer's 2nd card (hole card) this is the LAST pic, set the image source equal to the "back of card" image file path:
        if(dealCounter == 4) { // if last card, deal it face down and stop deal
            clearInterval(dealInterval);
            pic.src = 'images/cards350px/0-Back-of-Card-Red.png';
        } else { // 23. ELSE set image to the actual card image
            pic.src = 'images/cards350px/' + card.file;
        }
        
       // 24. Set up an if-else statement to handle the logic for dealing two cards 
       // each to player and dealer, starting with the player.
       // The if condition uses the % mod operator to check the remainder 
       // when the counter is divided by 2. If the remainder is 1, this is 
       // the 1st or 3rd card, which goes to the player
        if(dealCounter % 2 == 1) {

            // 25. Output the card to the player's div
            playerCardsDiv.appendChild(pic);

            // 26. Push the card valu into the player's hand
            playerHand.push(card);
            console.log('player card:', card);
      
            // 27. Increment the player's score
            playerScore += card.valu;
            console.log('playerScore:', playerScore);

            // 27B. Update score on the DOM:
            playerScoreSpan.textContent = `Player: ${playerScore}`;
      
        // 28. Add the else part to handle cards dealt to the dealer
        } else {
    
            // 29. Make the dealer cards a bit smaller, to make them appear farther away
            pic.style.width = '105px';
            pic.style.height = 'auto'; 
          
            // 30. Output the card to the dealer's div
            dealerCardsDiv.appendChild(pic);
      
            // 31. Push the card into the dealer's hand
            dealerHand.push(card);
            console.log('dealer card', card);
        
            // 32. Update the dealer's score
            dealerScore += card.valu;
            console.log('dealerScore:', dealerScore);

            // 33. Update score on the DOM -- only show value of dealer's face up card:
            dealerScoreSpan.textContent = `Dealer: ${dealerHand[0].valu}`;
        }

    },1000); // close dealInterval

    // 34. After deal is done, log hands and scores:
    console.log('Player Hand:', playerHand);
    console.log('Player Score:', playerScore);
    console.log('Dealer Hand:', dealerHand);
    console.log('Dealer Score:', dealerScore);

    // 35. Check to see if either (or both) hand has Blackjack (score of 21)

    setTimeout(() => {

        // testing scores:
        // playerScore = 21;
        // dealerScore = 21;

        const holeCard = dealerCardsDiv.children[1];
        if(playerScore == 21 && dealerScore == 21) {
            // 36. if so, announce Blackjack on 1.5 second delay
            h2.textContent = 'Wow! BOTH have Blackjack!';
            // 36B. Prove that the dealer has Blackjack by revealing hole card
            // Get the dealer's 2nd card (hole card) from the DOM  as children[1] property
            holeCard.src = `images/cards350px/${dealerHand[1].file}`; // set hole card src to actual card
            dealerScoreSpan.textContent = 'Dealer: 21';
        } else if(dealerScore == 21) {
            h2.textContent = 'Dealer has Blackjack! You LOSE!';
            holeCard.src = `images/cards350px/${dealerHand[1].file}`;
            dealerScoreSpan.textContent = 'Dealer: 21';
        } else if(playerScore == 21) {
            h2.textContent = 'Congrats! You have Blackjack!';
        } else { // 37. no one has blackjack so activate HIT and STAND btns: 
            // set disabled to false, remove 'disabled-btn' class
            hitBtn.classList.remove('disabled-btn');
            hitBtn.disabled = false;
            standBtn.classList.remove('disabled-btn');
            standBtn.disabled = false;
            // 39. Prompt the player to "HIT or STAND?"
            h2.textContent = 'Hit or Stand..';
        }     
    }, 5500); // 1.5 seconds after 4th and final card is dealt


    // end if blackjack


        


    
} // end deal() function

// END: Lesson 08.03
// NEXT: Lesson 08.04