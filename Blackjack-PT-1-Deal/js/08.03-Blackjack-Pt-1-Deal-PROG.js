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
        // let name = `${k} of ${s}`;
        // let file = `${k}-of-${s}.png`;

        // 5. Declare a variable, valu, with an inital value of k;
        // - valu is for storing the numeric value of the card

        // 6. Set the valu property based on the kind of card
        // - the length of the kind string reveals if it is a face card
        // as only "Jack", "Queen", "King" have more than 3 characters
        // ternary: +k returns NaN for "Ace", "Jack", "Queen", "King"
        // let valu = +k ? k : k.length > 3 ? 10 : 11;

        // Review: Each card is an object with 5 properties:
        /* 
            - name: the name of the card: "Jack of Hearts"
            - file: the card file name: "Jack-of-Hearts.png"
            - kind: 2-10, 'Jack', 'Queen', 'King', 'Ace'
            - suit: 'Diamonds', 'Hearts', 'Spades', 'Clubs'
            - valu: numeric value; face card = 10, Ace = 11
        */

        // 7. Declare a card object with the 5properties, the values of which are
        const card = {
            name: `${k} of ${s}`,
            file: `${k}-of-${s}.png`,
            valu: +k ? k : k.length > 3 ? 10 : 11,
            suit: s,
            kind: k,
        };

        // 8. Push the card object into the deck array:
        deck.push(card);
        
    }); // end suits.forEach
}); // end kinds.forEach

// 9. Review: Shuffle (randomize) the deck:
deck.sort(() => Math.random() - 0.5);

// 9B. Shuffle again, using Fisher-Yates:
for(let i = 0; i < deck.length; i++) {
    let temp = deck[i];
    let r = ~~(Math.random() * deck.length);
    deck[i] = deck[r];
    deck[r] = temp;
}

// console.log(deck);

// 10. Review: Make a shoe consisting of 6 decks of cards, using the spread ... operator
const shoe = [...deck, ...deck, ...deck, ...deck, ...deck, ...deck];
// 11. Review: Shuffle (randomize) the shoe:
shoe.sort(() => Math.random() - 0.5);

// 9B. Shuffle again, using Fisher-Yates:
for(let i = 0; i < shoe.length; i++) {
    let temp = shoe[i];
    let r = ~~(Math.random() * shoe.length);
    shoe[i] = shoe[r];
    shoe[r] = temp;
}

console.log(shoe);

// 12. Get the DOM elements:
// - Get the DEAL button and assign a listener for calling the deal function when clicked
const dealBtn = document.getElementById('deal-btn');
dealBtn.addEventListener('click', deal);

// - Get the HIT and STAND buttons, which won't be assigned listeners yet
// - Get the h2, which will be used for outputting prompts ("HIT or STAND?", etc.)
const hitBtn = document.getElementById('hit-btn');
// hitBtn.addEventListener('click', hit);

const standBtn = document.getElementById('stand-btn');
// standBtn.addEventListener('click', stand);

// 13. Get the divs that hold the player and dealer hands and 
// that display the player and dealer scores
const playerCardsDiv = document.getElementById('player-cards-div');
const dealerCardsDiv = document.getElementById('dealer-cards-div');

const playerScoreSpan = document.getElementById('player-score-span');
const dealerScoreSpan = document.getElementById('dealer-score-span');

// get the prompts / output box
const outH2 = document.querySelector('h2');

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
// the dealer's second card is dealt face down -- the "hole card"

// 15. Define the deal function:
function deal() {

    // 16. Since this is a new hand, reset the scores and "clear the table"
    // - reset the player and dealer scores
    playerScore = 0;
    dealerScore = 0;
    // - empty the divs that display the cards
    playerCardsDiv.innerHTML = "";
    dealerCardsDiv.innerHTML = "";
    // - clear the text from the output h2
    outH2.innerHTML = "";
    // - empty the arrays that store the player and dealer hands
    playerHand = [];
    dealerHand = [];
    // - reset the dealCounter:
    dealCounter = 0;

    // disable Deal button so it can't be clicked again til hand is over
    dealBtn.classList.toggle('disabled-btn');
    dealBtn.disabled = true;

    // 17. Call the setInterval method with its callback function, set equal to a variable,
    // myInterval, which will be used to clear the interval (stop deal)
    let dealInterval = setInterval(() => {

        // 18. Increment the counter that keeps track of how many card have been dealt
        dealCounter++;

        // 20. Instantiate a new image object to hold the card image
        let pic = new Image();

        // 21. Pop a card object off the shoe array and save it as a new card
        let card = shoe.pop();
        
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
            console.log('playerHand:', playerHand);
            // 27. Increment the player's score
            playerScore += card.valu;
            console.log('playerScore:', playerScore);
            // 27B. Output the player's score:
            playerScoreSpan.textContent = "Player Score: " + playerScore;
        // 28. Add the else part to handle dealers dealt to the dealer
        } else {
            // 29. Make the dealer cards a bit smaller, to make them appear farther away
            pic.style.width = "105px";
            // 30. Output the card to the dealer's div
            dealerCardsDiv.appendChild(pic);
            // 31. Push the card into the dealer's hand
            dealerHand.push(card);
            console.log('dealerHand:', dealerHand);
            // 32. Update the dealer's score
            dealerScore += card.valu;
            console.log('dealerScore:', dealerScore);
            // 32B. Output "dealer "shows":
            dealerScoreSpan.textContent = "Dealer Shows: " + dealerHand[0].valu;
        }

        // 22. If this is the last card -- the "hole card" -- set the image to the back of the card image
        // 19. If this is the 4th card being dealt, clear the interval (stop the deal)
        if(dealCounter == 4) {
            clearInterval(dealInterval);
            pic.src = "images/cards350px/0-Back-of-Card-Red.png"; 

            // ## ** ## ** ## ** CHECK for BLACKJACK (21) !! ## ** ## ** ## **
            // but only AFTER all 4 cards are out and hands / scores are updated:

            // set up testing scores:
            playerScore = 21;
            dealerScore = 20;

            // assess Blackjack, but for better gameplay do so on a delay:
            setTimeout(() => {
                // check if BOTH Player AND Dealer have Blackjack: 
                if(playerScore == 21 && dealerScore == 21) {
                    outH2.textContent = "Dealer and Player BOTH have Blackjack -- it's a PUSH!";
                // check if Player ONLY has Blackjack: 
                } else if(playerScore == 21) {
                    outH2.textContent = "You have Blackjack -- you WIN..!";
                // check if Dealer ONLY has Blackjack: 
                } else if(dealerScore == 21) {
                    outH2.textContent = "Dealer has Blackjack -- you LOSE..!";
                // no one has Blackjack, so prompt player to Hit or Stand:
                } else {
                    outH2.textContent = "Hit or Stand..?";
                    // enable the Hit and Stand buttons:
                    hitBtn.disabled = false;
                    hitBtn.classList.toggle('disabled-btn');
                    standBtn.disabled = false;
                    standBtn.classList.toggle('disabled-btn');
                }
                // if anyone has Blackjack, game is over, so reactivate Deal btn:
                // but do so on a slight delay:
                setTimeout(() => {
                    // if hit button is still disabled, someone got Blackjack:
                    if(hitBtn.disabled) {
                        // so reactivate the Deal button for a new game:
                        dealBtn.disabled = false;
                        dealBtn.classList.toggle('disabled-btn');
                    }
                }, 1500);
            }, 1500);

        } else { // set source to be of the actual card
            pic.src = `images/cards350px/${card.file}`;        
        }

    }, 1000); // end setInterval

        // 33. Update "Dealer Show"s" once the deal ends--this is not
        // the dealer's score, just the value of the ONE card that IS showing
        // this value equals the dealer's score minus the value of the the hole card

            // 34. Log the dealer's hidden hand and secret score to the console

            // 35. If no one has blackjack, deactivate the DEAL button so that it cannot be clicked again

                // 36. Mute the color of the DEAL button so that it looks unclickable

                // 37. Un-mute the HIT and STAND buttons and set their disabled to false
                // the buttons appearance is handled by removing and adding classes
    
            // 38. Prompt the player to "HIT or STAND?"..for better game play pacing, 
            // do the prompt on a 1.5-second delay with setTimeout
å
            // 39. Check to see if either the player or dealer have Blackjack
            // Announce Blackjack on 1 second delay; if no one has Blackjack,
            // prompt player to HIT or STAND:
    
            // 40. Set the setInterval timer for the card dealing to repeat every 1 second:

            // 41. Run the file in the browser and click DEAL, being sure to check the 
            // console for the shuffled deck, shuffled shoe and dealer hand / score

} // end deal() func

// END: Lesson 08.03
// NEXT: Lesson 08.04