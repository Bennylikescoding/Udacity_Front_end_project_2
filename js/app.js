/*
 * Create a list that holds all of your cards
 */


/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */

// 2.1 Create a variable (an javascript array) to store numbers of opened cards:
openedCards = [];

// 6.1 Create move variable
let moveCount = 0
// 6.3 Change HTML moves:
let moveCounterHTML = document.querySelector('.moves');

// 7. Functionalize HTML restart button:
let restart = document.querySelector('.restart');
restart.addEventListener('click', function(){location.reload()});
console.log('restart button clicked!');

// 8. Store successful pairs:
let successfulPairs = [];
// 9. Change HTML successful pairs:
let successfulPairsHTML = document.querySelector('.success_pairs');
// 10. Change HTML successful rates:
let successfulratesHTML = document.querySelector('.success_rates');
// 15. Change HTML time spent:
let timespentHTML = document.querySelector('.time_spent');


// 12. Add shuffle functionality:
galleryOfAllCards = [];
let allCards_before_shuffle = document.querySelectorAll('.card');
allCards_before_shuffle.forEach(function(card){
    galleryOfAllCards.push(card);
})
shuffle(galleryOfAllCards);
const deck = document.querySelector('.deck');
for(let i = 0; i < galleryOfAllCards.length; i++){
    deck.appendChild(galleryOfAllCards[i]);
};
console.log('shuffle successful!');

// 13.1 Add stars rating:
const stars = document.querySelector('.stars');
const newStar = '<li><i class="fa fa-star"></i></li>';
// 13.3 Generate a star:
function makeStars(numberOfStars){
    initial_star = 1;
    // 13.2.1 First clear all the initial stars:
    stars.textContent = '';
    while(initial_star <= numberOfStars){
        // 13.2.2 Then insert new stars:
        stars.insertAdjacentHTML('afterbegin', newStar);
        initial_star++;
    }
}

// 14. Record time spent
let startTime = Date.now();
console.log('start time: ', Date.now())

// 15. Get spent time:
let initialsecond = 0;
function countup(){
    initialsecond++;
    timespentHTML.innerText = initialsecond;
}
Timecounter = setInterval(countup,1000);


// 1. Click on a card, it will revert and show the icon:
// 1.1 Store and wrap each card into a variable
// 1.1.1 Select all cards, which is the class of "card":
let allCards = document.querySelectorAll('.card');// This will return a node list containing 16 different cards.
// 1.1.2 Add evenlistener for listening to the "click" event, add functionality, to show the icon when clicked.
allCards.forEach(function(card){
    card.addEventListener('click', function(e){

        // 3. Only when a card is none of the following conditions (open, show and match) should it be selected to perform further behaviours:
        if(!card.classList.contains('open') && !card.classList.contains('show') && !card.classList.contains('match')){
            // 4. Restrain to choose only 2 card at a time:
            if(openedCards.length <= 1){
            // 4. If number of openedCards <= 1 (*ok, I don't know why here must be 1 instead of 2*), perform push, otherwise we do nothing:
                // 1.1.2 Add 'open' and 'show' (which is defined in the css file) attributes to the class, using .classList.add('');
                card.classList.add('open', 'show');
                // 1.1.2 log information to ensure that attribute is successfully added
                console.log('open and show SUCCESSFULLY!');

                // 2. Allow for only two cards being open:
                // 2.2 While iterating in the forEach loop, if the card class contains 'open' and 'show', then push that into the openedCards array:
                if(card.classList.contains('open') && card.classList.contains('show')){
                    openedCards.push(card);
                    // print out numbers of opened Cards:
                    console.log('Numbers of Opened Cards: ', openedCards.length);

                    // 5. Check to see if two cards match:

                    // 5.1 store two card name:
                    let card_1_name = openedCards[0].querySelector('i').classList.item(1);
                    let card_2_name = openedCards[1].querySelector('i').classList.item(1);
                    console.log('First name of Opened Cards: ', card_1_name);
                    console.log('Second name of Opened Cards: ', card_2_name);

                    // 6. Add move times
                    // 6.2 set moveCount at the end of two clicks:
                    moveCount += 1;
                    console.log('Total move count is: ', moveCount, 'times.');
                    // 6.4 Change the 'move' HTML context:
                    moveCounterHTML.innerText = moveCount;

                    if(card_1_name == card_2_name){
                        // 5.2 If match, then add a "match" class to the class attribute, and remove 'open' and 'show' attribute. This should be done on both openedCards
                        openedCards[0].classList.add('match');
                        openedCards[0].classList.remove('open');
                        openedCards[0].classList.remove('show');

                        openedCards[1].classList.add('match');
                        openedCards[1].classList.remove('open');
                        openedCards[1].classList.remove('show');

                        console.log('matched cards!');

                        // 8.1 push successful pairs:
                        successfulPairs.push(card);
                        console.log('successfulPairs: ', successfulPairs.length);

                        // 9. Functionalize successfulPairs HTML
                        successfulPairsHTML.innerText = successfulPairs.length;

                        // 11. Successful prompt
                        if(successfulPairs.length == 8){
                            // 14. record end time
                            let endTime = Date.now();
                            let timeSpent = (endTime - startTime) / 1000;
                            console.log('End time: ', endTime);
                            console.log('Time spent: ', timeSpent, 'seconds');

                            // 17. Get final stars:
                            let finalStarsPrompt = stars.childElementCount;

                            // 11. prompt
                            window.alert('Congratulations! You WIN!\nYour total time is ' + timeSpent + ' seconds. \n' + 'You get ' + finalStarsPrompt + ' Stars!\n' + 'Wanna try again?');
                            // 16. Stop time spent countup function:
                            clearInterval(Timecounter);
                        };

                        //to allow for choosing again the card
                        openedCards = [];
                    }else{
                        // 5.3 If not match, after some time, we hide the card:
                        setTimeout(function(){
                            openedCards.forEach(function(card){
                                card.classList.remove('open','show');
                            });
                            // 5.4 set time to 1000ms and also clear the openedCards to 0, to allow for choosing again the card:
                            openedCards = [];
                        }, 1000);
                    };

                    // 10. Functionalize successful rates HTML
                    let scores = successfulPairs.length / moveCount * 100;
                    successfulratesHTML.innerText = Math.round((scores).toFixed(1));
                    console.log('successful rate is: ', scores)

                    // 13.2 Add stars functionality:                        
                    if(scores <= 33 ){
                        makeStars(1);
                    }else if(scores > 33 && scores <= 50){
                        makeStars(2);
                    }else if(scores > 50 && scores <= 67){
                        makeStars(3);
                    }else if(scores > 67 && scores <= 80){
                        makeStars(4);
                    }else if(scores > 80){
                        makeStars(5);
                    };
                };
            };
        };
    });
});
