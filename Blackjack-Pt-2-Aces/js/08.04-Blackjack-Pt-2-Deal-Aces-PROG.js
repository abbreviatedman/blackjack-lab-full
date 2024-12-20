// Lesson 08.04

// Blackjack - Pt. 2: DEAL & ACES !

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
        if(kind == 'Ace') {
            valu = 11;
        } else if(kind.length > 3) { 
            valu = 10; // Jack, Queen, King
        } else {
            valu = kind;
        }

        // 7. Declare a card object with the 5properties, the values of which are
        // the 5 corresponding variables 

        // 8. Push the card object into the deck array:

    });
});

console.log('freshly made deck:', deck);

// 9. Review: Shuffle (randomize) the deck:
deck.sort(() => Math.random() - 0.5);

deck.sort(function() {
    return Math.random() - 0.5;
});

// another way to shuffle: Fisher-Yates Shuffle algo:
for(let i = 0; i < deck.length; i++) {
    let temp = deck[i];
    let r = Math.floor(Math.random() * deck.length);
    deck[i] = deck[r]; // replace current item w rand item
    deck[r] = temp;
}

console.log('thrice-shuffled deck:', deck);

// 10. Review: Make a shoe consisting of 6 decks of cards, using the spread ... operator:
// const shoe = [deck, deck, deck, deck, deck, deck].flat();
const shoe = [...deck, ...deck, ...deck, ...deck, ...deck, ...deck];
console.log('flattened shoe:', shoe);

// 11. Review: Shuffle (randomize) the shoe
shoe.sort(() => Math.random() - 0.5);

shoe.sort(function() {
    return Math.random() - 0.5;
});

// another way to shuffle: Fisher-Yates Shuffle algo:
// let's do this one as a forEach in contrast to for loop
// for(let i = 0; i < shoe.length; i++) {
const fruits = ['apple', 'banana', 'cherry', 'grape', 'kiwi', 'lemon', 'lime', 'mango', 'orange', 'peach', 'pear', 'plum'];

fruits.forEach((fru,i) => {
    let r = Math.floor(Math.random() * fruits.length);
    fruits[i] = fruits[r]; // replace current item w rand item
    fruits[r] = fru;
});

console.log('shuffled fruits:', fruits);

shoe.forEach((card,i) => {
    let r = Math.floor(Math.random() * shoe.length);
    shoe[i] = shoe[r]; // replace current item w rand item
    shoe[r] = card;
});

console.log('thrice-shuffled shoe:', shoe);

// 12. Get the DOM elements:
// - Get the DEAL button and assign a listener for calling the deal function when clicked
const dealBtn = document.getElementById('deal-btn');
dealBtn.addEventListener('click', deal); // call deal function on click
// - Get the HIT and STAND buttons, which won't be assigned listeners yet
const hitBtn = document.getElementById('hit-btn');
const standBtn = document.getElementById('stand-btn');
// - Get the h2, which will be used for outputting prompts ("HIT or STAND?", etc.)
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
let playerHand = dealerHand = [];
let dealCounter = 0;
let playerScore = 0;
let dealerScore = 0;
let pAceScore = 0;
let dAceSore = 0;

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
    // - empty the divs that display the cards
    // - clear the text from the output h2
    // - empty the arrays that store the player and dealer handsdealCounter = 0;
    dealCounter = 0;
    playerScore = 0;
    dealerScore = 0;
    dAceScore = 0;
    pAceScore = 0;
    playerHand = [];
    dealerHand = [];
    outputH2.innerHTML = "";
    playerCardsDiv.innerHTML = "";
    dealerCardsDiv.innerHTML = "";
    playerScoreDiv.innerHTML = "Player Score: 0";
    dealerScoreDiv.innerHTML = "Dealer Shows: 0";

    // deactivate the deal button, so player doesn't click it again until game over:
    dealBtn.className = "disabled-btn";
    // make the button truly disabled--class is just visual
    dealBtn.disabled = true;

    // 17. Call the setInterval method with its callback function, set equal to a variable,
    // myInterval, which will be used to clear the interval (stop deal)
    let dealInterval = setInterval(() => {

        // 18. Increment the counter that keeps track of how many card have been dealt
        dealCounter++;

        // 19. If this is the 4th card being dealt, clear the interval (stop the deal)
        if(dealCounter == 4) {
            clearInterval(dealInterval);
            // 19B. Update the score boxes:
            playerScoreDiv.textContent = "Player Score: " + playerScore;
            dealerScoreDiv.textContent = "Dealer Shows: " + dealerHand[0].valu;
            
            // once all 4 cards are dealt, wait 1 sec, and then check if anyone has blackjack:
            setTimeout(function() {
                // If BOTH have blackjack, announce that it's a PUSH (tie)
                if(dealerScore && playerScore == 21) {
                    outputH2.textContent = "Both have Blackjack--It's a PUSH!";
                    dealerCardsDiv.children[1].src = `images/cards350px/${dealerHand[1].file}`;
                // If only the dealer has blackjack, player loses:
                } else if(dealerScore == 21) {
                    outputH2.textContent = "Dealer has Blackjack--you LOSE!";
                    dealerCardsDiv.children[1].src = `images/cards350px/${dealerHand[1].file}`;
                // If only the player has blackjack, player wins:
                } else if(playerScore == 21) {
                    outputH2.textContent = "You have Blackjack--you WIN!";
                // no one has blackjack (21), so it's game on:
                } else {
                    outputH2.textContent = "Hit or stand..?";
                    // turn on the hit and stand buttons
                    hitBtn.disabled = false;
                    hitBtn.classList.remove("disabled-btn");
                    standBtn.disabled = false;
                    standBtn.classList.remove("disabled-btn");
                }
            }, 1500);
        }

        // 20. Instantiate a new image object to hold the card image
        let pic = new Image();

        // 21. Pop a card object off the shoe array and save it as a new card
        let card = shoe.pop();
        
        // TESTING the deal scenarios: 2 Aces, 1 Ace with or without Blackjack, no Aces
        // let card;
        // if(dealCounter % 2 == 1) { // player gets 2 aces
        //     // card = {kind: 'Ace', suit: 'Hearts', name: 'Ace of Hearts', file: 'Ace-of-Hearts.png', valu: 11};
        //     card = shoe.pop();
        // } else { // dealer gets random
        //     if(dealCounter == 4) { // 4th card is dealer's  hidden card -- let that be an Ace
        //         card = {kind: 'King', suit: 'Spades', name: 'King of Spades', file: 'King-of-Spades.png', valu: 10};
        //     } else { // dealer's first card (NOT hidden card)
        //         card = {kind: 'Ace', suit: 'Spades', name: 'Ace of Spades', file: 'Ace-of-Spades.png', valu: 11};
        //     }
        // }

        console.log(dealCounter, card);

        // 22. If this is not the hidden dealer card, known as the hole card 
        // (2nd dealer card, which is the last card dealt, so 4th card overall)
        // set the image source equal to the card image file path:
        if(dealCounter != 4) { // if this is not the hidden "hole" card
            pic.src = `images/cards350px/${card.file}`;
        } else { // this is the 4th and final card which is hidden
            // 23. ELSE if this IS the 1st dealer card; deal the "hole card" 
            // face-down by setting its source equal to the back of the card image
            pic.src = 'images/cards350px/0-Back-of-Card-Red.png';
        }

       // 24. Set up an if-else statement to handle the logic for dealing two cards
       // each to player and dealer, starting with the player.
       // The if condition uses the % mod operator to check the remainder 
       // when the counter is divided by 2. If the remainder is 1, this is 
       // the 1st or 3rd card, which goes to the player
       if(dealCounter % 2 == 1) { // if dealCounter is odd, it's player card

        // Pt. 2.1: Check if the just-popped card is an Ace
        if(card.kind == 'Ace') {
            // is this the first Ace or the second Ace?
            // if it's the first Ace, pAceScore is still 0
            // but if it's the second Ace, pAceScore is already 11
            if(pAceScore == 0) { // if it's the 1st Ace
                pAceScore = 11; // it counts 11
            } else { // if it's the 2nd Ace
                pAceScore = 12; // it counts 1
                card.valu = 1; // it counts 1
            }
        }

        // 25. Output the card to the player's div
        playerCardsDiv.appendChild(pic);
        // 26. Push the card into the player's hand
        playerHand.push(card);
        // 27. Increment the player's score
        playerScore += card.valu;
        console.log('playerHand:', playerHand, '\nplayer score:', playerScore, '\npAceScore:', pAceScore);
        // 28. Add the else part to handle dealers dealt to the dealer
       } else { // dealer gets even cards (2nd and 4th)

             // Pt. 2.1: Check if the just-popped card is an Ace
             if(card.kind == 'Ace') {
                // is this the first Ace or the second Ace?
                // if it's the first Ace, pAceScore is still 0
                // but if it's the second Ace, pAceScore is already 11
                if(dAceScore == 0) { // if it's the 1st Ace
                    dAceScore = 11; // it counts 11
                } else { // if it's the 2nd Ace
                    dAceScore = 12; // it counts 1
                    card.valu = 1; // it counts 1
                }
            }    

        // 30. Output the card to the dealer's div
        dealerCardsDiv.appendChild(pic);
        // 31. Push the card into the dealer's hand
        dealerHand.push(card);
        console.log('dealerHand:', dealerHand);
        // 32. Update the dealer's score
        dealerScore += card.valu;

        console.log('dealerHand:', dealerHand, '\ndealer score:', dealerScore, '\ndAceScore:', dAceScore);

        // 29. Make the dealer cards a bit smaller, to make them appear farther away
        pic.style.width = "95px";
        pic.style.height = "auto";

       }

    }, 1000);

} // end deal function