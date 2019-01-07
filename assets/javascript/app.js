/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/
// Global Scope
var scores, roundScore, activePlayer, gamePlaying;

init();

document.querySelector('.btn-roll').addEventListener('click', function () {
    if(gamePlaying) {
    // 1. Random Number
    var dice = Math.floor(Math.random() * 6) + 1;

    // 2. Display the Result
    var diceDOM = document.querySelector('.dice');
    diceDOM.style.display = 'block';
    diceDOM.src = 'dice-' + dice + '.png';

    // 3. Update the score ONLY IF the rolled number was not a 1
    if (dice !== 1) {
        //Add Score
        roundScore += dice;
        document.querySelector('#current-' + activePlayer).textContent = roundScore;
    } else {
        //next player - DRY Principle
        nextPlayer();
        }   
    }
});
// second param is an anoynamous function - doesnt have a name and cant re-use somewhere else, only being used here
document.querySelector('.btn-hold').addEventListener('click', function () {
    if (gamePlaying) {
            // add current score to global score
    scores[activePlayer] += roundScore;

    // update User Interface, DOM
    // usincg activePlayer variable to construct our string name
    document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];
     
    //get the value the user inputed as score needed to win
    var input = document.querySelector('.final-score').value;
    var winningScore;

    // undefined,0,null or "" are COERCED to False
    if(input) {
        winningScore = input;
    } else {
        winningScore = 75;
    }

    // check if player won the game
    if (scores[activePlayer] >= winningScore) {
        document.querySelector('#name-' + activePlayer).textContent = 'Winner!';
        document.querySelector('.dice').style.display = 'none';
        // add styles to winner
        document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
        // remove active class styling
        document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
        // set gamePlaying to false since game is over
        gamePlaying = false;
    } else {
        //Next player
        nextPlayer();
        }
    }
});

function nextPlayer() {
    //next player
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
    roundScore = 0;

    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';

    document.querySelector('.player-0-panel').classList.toggle('active');
    document.querySelector('.player-1-panel').classList.toggle('active');

    document.querySelector('.dice').style.display = 'none';
}

document.querySelector('.btn-new').addEventListener('click', init);


function init() {
    scores = [0, 0];
    activePlayer = 0;
    roundScore = 0;
    gamePlaying = true;

    document.querySelector('.dice').style.display = 'none';

    document.getElementById('score-0').textContent = '0';
    document.getElementById('score-1').textContent = '0';
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';
    document.getElementById('name-0').textContent = 'Player 1';
    document.getElementById('name-1').textContent = 'Player 2';
    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');
    document.querySelector('.player-0-panel').classList.remove('active');
    document.querySelector('.player-1-panel').classList.remove('active');
    document.querySelector('.player-0-panel').classList.add('active');
}