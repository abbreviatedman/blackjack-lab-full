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

        // 3. Simplify the current array items by passing them to variables:
        let kind;

        // 4. Concatenate the card name and image file names:
        // - name "Queen of Diamonds" corresponds to file "Queen-of-Diamonds.png"
        let name;

        // 5. Declare a variable, valu, with an inital value of 0;
        // - valu is for storing the numeric value of the card
        let valu;

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

        // 7. Declare a card object with the 5properties, the values of which are
        // the 5 corresponding variables 

        // 8. Push the card object into the deck array:

// 9. Review: Shuffle (randomize) the deck:

// 10. Review: Make a shoe consisting of 6 decks of cards, using the spread ... operator

// 11. Review: Shuffle (randomize) the shoe:


// 12. Get the DOM elements:
// - Get the DEAL button and assign a listener for calling the deal function when clicked
// - Get the HIT and STAND buttons, which won't be assigned listeners yet
// - Get the h2, which will be used for outputting prompts ("HIT or STAND?", etc.)

// 13. Get the divs that hold the player and dealer hands and 
// that display the player and dealer scores

// 14. Declare global vars need for keeping track of the deal
// - arrays for holding player and dealer cards 
// variables for keeping score:
// - dealCounter keeps track of total cards dealt
let dealCounter;

// DEAL
// Now, that we have the shoe, let's deal a hand of Blackjack. We dealt a hand of
// poker in the earlier lesson where we made the deck of cards, BUT this will be
// different: to better emulate game play, we will use setInterval to deal on a 
// 1-second delay between cards
// the deal consists of 2 hands -- player and dealer -- each of whom get 2 cards
// the dealer's first card is dealt face down -- the "hole card"

// 15. Define the deal function:

    // 16. Since this is a new hand, reset the scores and "clear the table"
    // - reset the player and dealer scores
    // - empty the divs that display the cards
    // - clear the text from the output h2
    // - empty the arrays that store the player and dealer handsdealCounter = 0;
    dealCounter = 0;

    // 17. Call the setInterval method with its callback function, set equal to a variable,
    // myInterval, which will be used to clear the interval (stop deal)

        // 18. Increment the counter that keeps track of how many card have been dealt

        // 19. If this is the 4th card being dealt, clear the interval (stop the deal)

        // 20. Instantiate a new image object to hold the card image
        let pic;

        // 21. Pop a card object off the shoe array and save it as a new card
        let card;

        // 22. If this is not the 2nd card / 1st dealer card, set the image 
        // source equal to the card image file path:
       
        // 23. ELSE if this IS the 1st dealer card; deal the "hole card" 
        // face-down by setting its source equal to the back of the card image

       // 24. Set up an if-else statement to handle the logic for dealing two cards 
       // each to player and dealer, starting with the player.
       // Th if condition uses the % mod operator to check the remainder 
       // when the counter is divided by 2. If the remainder is 1, this is 
       // the 1st or 3rd card, which goes to the player

            // 25. Output the card to the player's div

            // 26. Push the card into the player's hand
      
            // 27. Increment the player's score
      
        // 28. Add the else part to handle dealers dealt to the dealer
    
            // 29. Make the dealer cards a bit smaller, to make them appear farther away
          
            // 30. Output the card to the dealer's div
      
            // 31. Push the card into the dealer's hand
        
            // 32. Update the dealer's score

        // 33. Update "Dealer Show"s" once the deal ends--this is not
        // the dealer's score, just the value of the ONE card that IS showing
        // this value equals the dealer's score minus the value of the the hole card

            // 34. Log the dealer's hidden hand and secret score to the console

            // 35. If no one has blackjack, deactivate the DEAL button so that it cannot be clicked again

                // 36. Mute the color of the DEAL button so that it looks unclickable

                // 37. Un-mute the HIT and STAND buttons and set their disabled to false
                // the buttons appearance is handled by removing and adding classes
    
            // 38. Prompt the player to "HIT or STAND?"..for better game play pacing, 
            // do the prompt on a 15-second delay with setTimeout

            // 39. Check to see if either the player or dealer have Blackjack
            // Announce Blackjack on 1 second delay; if no one has Blackjack,
            // prompt player to HIT or STAND:
    
            //40. Set the setInterval timer for the card dealing to repeat every 1 second:

            // 41. Run the file in the browser and click DEAL, being sure to check the 
            // console for the shuffled deck, shuffled shoe and dealer hand / score

// END: Lesson 08.03
// NEXT: Lesson 08.04