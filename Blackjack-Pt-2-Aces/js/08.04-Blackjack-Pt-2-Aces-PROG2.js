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
for(let i = 0; i < kinds.length; i++) {
    for(let j = 0; j < suits.length; j++) {
    
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
        if(kind.length > 3) {
            valu = 10;
        } else if(kind == "Ace") {
            valu = 11;
        } else {
            valu = kind;
        }

        // 7. Declare a card object with the 5properties, the values of which are the 5 corresponding variables 

        let card = {kind: kind, 
                    suit: suit, 
                    name: name, 
                    file: file, 
                    valu: valu};
        // 8. Push the card object into the deck array:
        deck.push(card);
    }
}

// 9. Review: Shuffle (randomize) the deck:
for(let i = 0; i < deck.length; i++) {
    let temp = deck[i];
    let r = Math.floor(Math.random() * deck.length);
    deck[i] = deck[r];
    deck[r] = temp;
}

// 9B. shuffle a second time, using a different method
deck.sort((a,b) => 0.5 - Math.random());

console.log(deck); // shuffled deck of 52 card objects of 5 properties each

// 10. Review: Make a shoe consisting of 6 decks of cards, using the spread ... operator

// what is the spread operator ... 
// the spread operator "unpacks" an array to make the items indivually accessible so that they can be combined into other arrays as a flat arr
const froots = ['apple', 'banana', 'cherry'];
const fruits = ['kiwi', 'lime', 'grape', 'mango'];
const fruitBasket = [froots, fruits];
console.log(fruitBasket); // 2D array (matrix)
const frootBasket = [...froots, ...fruits]; 
console.log(frootBasket); // 1D array (flat arr)

// another example of spread operator...
let nums = [5, 12, 34, 65, 14, 3, 67, 8, 39, 9];
let minNum = Math.min(nums);
console.log('minNum:', minNum); // NaN
// try that again:
minNum = Math.min(5, 12, 34, 65, 14, 3, 67, 8, 39, 9);
console.log('minNum:', minNum); // 3
// try that yet again...
minNum = Math.min(...nums);
console.log('minNum:', minNum); // 3

// in casino blackjack, they deal out of a "shoe" (set of 6-8 decks)
const shoe = [...deck, ...deck, ...deck, ...deck, ...deck, ...deck];

// 11. Review: Shuffle (randomize) the shoe:
for(let i = 0; i < shoe.length; i++) {
    let temp = shoe[i];
    let r = Math.floor(Math.random() * shoe.length);
    shoe[i] = shoe[r];
    shoe[r] = temp;
}

// 9B. shuffle a second time, using a different method
shoe.sort((a,b) => 0.5 - Math.random());

console.log(shoe); // 1D array (flat arr)

// 12. Get the DOM elements:

// - Get the DEAL button and assign a listener for calling the deal function when clicked
const dealBtn = document.getElementById('deal-btn');
dealBtn.addEventListener('click', deal);

// - Get the HIT and STAND buttons, which won't be assigned listeners yet
const hitBtn = document.getElementById('hit-btn');
hitBtn.addEventListener('click', hit);

const standBtn = document.getElementById('stand-btn');
standBtn.addEventListener('click', stand);

// - Get the h2, which will be used for outputting prompts ("HIT or STAND?", etc.)
const h2 = document.querySelector('h2');

// 13. Get the divs that hold the player and dealer hands and 
// that display the player and dealer scores
const dealerCardDiv = document.getElementById('dealer-cards-div');
const playerCardDiv = document.getElementById('player-cards-div');
const dealerScoreDiv = document.getElementById('dealer-score-div');
const playerScoreDiv = document.getElementById('player-score-div');

// 14. Declare global vars need for keeping track of the deal
// - arrays for holding player and dealer cards 
// variables for keeping score:
// - dealCounter keeps track of total cards dealt
let dealCounter = 0;
let playerHand = [];
let dealerHand = [];
let playerScore = 0;
let dealerScore = 0;
// keep track of total valu of Aces separately
let pAceScore = 0;
let dAceScore = 0;

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
    // - reset the player and dealer scores
    playerScore = 0;
    dealerScore = 0;
    dealCounter = 0;
    pAceScore = 0;
    dAceScore = 0;
    // - empty the divs that display the cards and reset the scores
    playerCardDiv.innerHTML = "";
    dealerCardDiv.innerHTML = "";
    playerScoreDiv.innerHTML = "Player Score: " + playerScore;
    dealerScoreDiv.innerHTML = "Dealer Shows: " + dealerScore;
    // - clear the text from the output h2
    h2.textContent = "";
    // - empty the arrays that store the player and dealer handsdealCounter = 0;
    playerHand = [];
    dealerHand = [];

    // 17. Call the setInterval method with its callback function, set equal to a variable,
    // myInterval, which will be used to clear the interval (stop deal)
    let myInterval = setInterval(() => {
        // 18. Increment the counter that keeps track of how many card have been dealt
        dealCounter++;
        // 19. If this is the 4th card being dealt, clear the interval (stop the deal)
        if(dealCounter == 5) { // this runs only once when the dealin' is done
            clearInterval(myInterval);
            // first dealer card is hidden, so only report valu of visible card
            // wait until deal is done before showing dealerHand[1] (2nd card)
            // 33. Update "Dealer Shows" once the deal ends--this is not
            // the dealer's score, just the value of the ONE card that IS showing
            // this value equals the dealer's score minus the value of the the hole card
            dealerScoreDiv.textContent = "Dealer Shows: " + dealerHand[1].valu;
            
            // make fake scores for testing -- this does NOT affect the cards that 
            // appear on the table, which will NOT be Blackjack, necessarily
            // playerScore = 21;
            // dealerScore = 21;
            // playerScoreDiv.innerHTML = "Player Score: " + playerScore;
            // dealerScoreDiv.innerHTML = "Dealer Shows: " + dealerScore; 
            
            // now that the deal is done, check if anyone got Blackjack (21)
            // 39. Check to see if either the player or dealer have Blackjack
            // Announce Blackjack on 1 second delay; if no one has Blackjack,
            // prompt player to HIT or STAND:
            if(playerScore == 21 && dealerScore == 21) {
                h2.textContent = "You BOTH have Blackjack--PUSH!";
            } else if(playerScore == 21) {
                h2.textContent = "You have Blackjack--You WIN!";
            } else if(dealerScore == 21) {
                h2.textContent = "Dealer has Blackjack--You LOSE!";
            } else {
                // 38. Prompt the player to "HIT or STAND?"..for better game play pacing, 
                // do the prompt on a 15-second delay with setTimeout
                h2.textContent = "Hit or Stand..?";
                // activate HIT and STAND btns
                // 37. Un-mute the HIT and STAND buttons and set their disabled to false
                // the buttons appearance is handled by removing and adding classes
                hitBtn.disabled = false;
                hitBtn.classList.remove('disabled-btn');
                standBtn.disabled = false;
                standBtn.classList.remove('disabled-btn');
                // 35. If no one has blackjack, deactivate the DEAL button so that it cannot be clicked again
                // deactivate DEAL btn
                dealBtn.disabled = true;
                dealBtn.classList.add('disabled-btn');
            }

        } else { // deal a card
            // 20. Instantiate a new image object to hold the card image
            let pic = new Image();
            // 21. Pop a card object off the shoe array and save it as a new card
            let card = shoe.pop();
            pic.src = 'images/cards350px/' + card.file;

            // 24. Set up an if-else statement to handle the logic for dealing two cards 
            // each to player and dealer, starting with the player.
            // The if condition uses the % mod operator to check the remainder 
            // when the counter is divided by 2. If the remainder is 1, this is 
            // the 1st or 3rd card, which goes to the player
            if(dealCounter % 2 == 1) { // odd cards go to player (1,3)
                // 25. Output the card to the player's div
                playerCardDiv.appendChild(pic);
                // 26. Push the card into the player's hand
                playerHand.push(card);

                // 27. Increment the player's score
                // check if card is an "Ace"
                if(card.kind == "Ace") {
                    // check if this is a first or second Ace
                    if(pAceScore == 0) { // if this is the first Ace
                        playerScore += 11; // 11
                        pAceScore += 11;
                    } else { // this is a SECOND Ace on the deal
                        // meaning player was dealt TWO Aces 
                        playerScore++;
                        pAceScore++;
                    }
                } else { // card is NOT an Ace
                    playerScore += card.valu;
                }
                
                // output the player's score
                playerScoreDiv.textContent = "Player Score: " + playerScore;    
            // 28. Add the else part to handle cards dealt to the dealer
            } else { // even cards go to the dealer
                // 29. Make the dealer cards a bit smaller, to make them appear farther away
                pic.style.width = "90px"; // dealer cards need to be a bit smaller
                pic.style.height = "auto";
                // 30. Output the card to the dealer's div
                dealerCardDiv.appendChild(pic);
                // 31. Push the card into the dealer's hand
                dealerHand.push(card);
                // deal the first dealer card face down (this is known as the "hole card")
                // 23. if this IS the 1st dealer card; deal the "hole card" 
                // face-down by setting its source equal to the back of the card image 
                dealerCardDiv.children[0].src = 'images/cards350px/0-Back-of-Card-Red.png';
                // 32. Update the dealer's score

                // check if card is an "Ace"
                if(card.kind == "Ace") {
                    // check if this is a first or second Ace
                    if(dAceScore == 0) { // if this is the first Ace
                        dealerScore += 11; // 11
                        dAceScore += 11;
                    } else { // this is a SECOND Ace on the deal
                        // meaning dealer was dealt TWO Aces 
                        dealerScore++;
                        dAceScore++;
                    }
                } else { // card is NOT an Ace
                    dealerScore += card.valu;
                }
            }
        }
        console.log('Player Hand:', playerHand);
        console.log('Dealer Hand:', dealerHand);
        
        // 22. If this is not the 2nd card / 1st dealer card, set the image 
        // source equal to the card image file path:    

            // 34. Log the dealer's hidden hand and secret score to the console

                // 36. Mute the color of the DEAL button so that it looks unclickable
    
    // 40. Set the setInterval timer for the card dealing to repeat every 1 second:
    }, 1000);

} // close deal() function

// hit() function runs when player clicks HIT button
function hit() {
    setTimeout(() => {
        let pic = new Image();
        let card = shoe.pop();
        pic.src = 'images/cards350px/' + card.file;
        playerCardDiv.appendChild(pic);
        playerHand.push(card);

        if(card.kind == "Ace") {
            // if player score is less than 11, Ace counts as 11
            if(playerScore < 11) { 
                playerScore += 11; // 11
                pAceScore += 11;
            } else { // player score is already 11+ so Ace counts as 1
                playerScore++;
                pAceScore++;
            }
        } else { // card is NOT an Ace
            // check to see if the new card will bust the player
            playerScore += card.valu;
            if(playerScore > 21) { // if new card busts player
                // check to see if player has an "Ace 11" to "un-bust" with
                if(pAceScore >= 11) { // player has an Ace 11, so un-bust:
                    playerScore -= 10; // convert the Ace 11 to an Ace 1
                    pAceScore -= 10;
                } else { // player score is already 11+ so Ace counts as 1
                    playerScore++;
                    pAceScore++;
                }
            }
            playerScore += card.valu;
        }

        playerScoreDiv.textContent = "Player Score: " + playerScore; 
        // fake score for testing:
        // playerScore = 21;
        setTimeout(() => {
            if(playerScore > 21) {
                h2.textContent = "Busted! You LOSE!";
                hitBtn.disabled = true;
                hitBtn.classList.add('disabled-btn');
                standBtn.disabled = true;
                standBtn.classList.add('disabled-btn');
                dealBtn.disabled = false;
                dealBtn.classList.remove('disabled-btn');
            } else if(playerScore == 21) {
                h2.textContent = "You have 21! Dealer's turn..";
                hitBtn.disabled = true;
                hitBtn.classList.add('disabled-btn');
                standBtn.disabled = true;
                standBtn.classList.add('disabled-btn');
                // player has 21, so call the stand function
                stand();
            } else { // player did not bust and does not have 21
                h2.textContent = "Hit Again or Stand..?";
            }
        }, 1000); 
    }, 1000);
} // close hit() function

// stand() function runs when player clicks STAND button
// AND when player's turn is automatically finished due 
// to reaching a score of exactly 21
function stand() {
    console.log("Hello from the stand function");
} // close stand() function


// 41. Run the file in the browser and click DEAL, being sure to check the 
// console for the shuffled deck, shuffled shoe and dealer hand / score

// END: Lesson 08.03
// NEXT: Lesson 08.04