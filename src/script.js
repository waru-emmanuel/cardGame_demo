// Initialize deck and other variables
let deck = [];
let player1Deck = [];
let player2Deck = [];
let player1Card, player2Card;
let player1Score = 0;
let player2Score = 0;
let currentRound = 1;
let numberOfRounds = parseInt(document.getElementById('rounds').value); // Get initial value from input
let difficultyLevel = document.getElementById('difficulty').value; // Get initial value from select
let includeSpecialCards = document.getElementById('specialCards').checked; // Get initial value from checkbox

// Function to reset the game
function resetGame() {
    // Reset scores and round number
    player1Score = 0;
    player2Score = 0;
    currentRound = 1;
    document.getElementById('roundTracker').innerText = `Round: ${currentRound}`;
    document.getElementById('player1Score').innerText = `Score: ${player1Score}`;
    document.getElementById('player2Score').innerText = `Score: ${player2Score}`;
    
    // Reset result message
    document.getElementById('result').innerText = '';

    // Shuffle and distribute cards
    shuffleDeck();
    player1Deck = deck.slice(0, 26);
    player2Deck = deck.slice(26);
}

// Function to handle drawing a card
// Function to handle drawing a card
function drawCard() {
    // Adjust difficulty level logic
    let drawProbability = 0.5; // Default draw probability
    switch (difficultyLevel) {
        case 'easy':
            drawProbability = 0.7; // Higher probability of winning for player 1
            break;
        case 'medium':
            drawProbability = 0.5; // Equal probability for both players
            break;
        case 'hard':
            drawProbability = 0.3; // Higher probability of winning for player 2
            break;
        default:
            drawProbability = 0.5;
    }

    // Draw cards
    player1Card = drawCardWithProbability(player1Deck, drawProbability);
    player2Card = drawCardWithProbability(player2Deck, drawProbability);

    // Update UI and game state
    updateUI();
    updateGameState();
}

// Function to update UI elements
function updateUI() {
    // Update player 1 deck UI
    document.getElementById('player1Deck').innerHTML = `
        <div class="card">
            <img src="images/${player1Card.suit}.png" alt="${player1Card.value} of ${player1Card.suit}">
            <div class="card-value">${player1Card.value}</div>
        </div>
    `;
    
    // Update player 2 deck UI
    document.getElementById('player2Deck').innerHTML = `
        <div class="card">
            <img src="images/${player2Card.suit}.png" alt="${player2Card.value} of ${player2Card.suit}">
            <div class="card-value">${player2Card.value}</div>
        </div>
    `;

    // Update player scores UI
    document.getElementById('player1Score').innerText = `Score: ${player1Score}`;
    document.getElementById('player2Score').innerText = `Score: ${player2Score}`;
}

// Function to update game state based on drawn cards
function updateGameState() {
    if (compareCards(player1Card, player2Card) === 1) {
        player1Deck.push(player1Card, player2Card);
        player1Score++;
    } else if (compareCards(player1Card, player2Card) === -1) {
        player2Deck.push(player1Card, player2Card);
        player2Score++;
    }

    // Check for end of game
    if (player1Deck.length === 0 || player2Deck.length === 0) {
        endGame();
    }
}


// Function to draw a card with a given probability
function drawCardWithProbability(deck, probability) {
    // Randomly determine if the card should be drawn based on the probability
    if (Math.random() < probability) {
        return deck.shift(); // Draw the card from the deck
    } else {
        // Simulate drawing a card from an empty deck if probability is not met
        return { value: 'Empty', suit: 'Empty' };
    }
}

// Function to handle including special cards
function includeSpecialCardsLogic() {
    if (includeSpecialCards) {
        // Add special cards to the deck

        deck.push({ value: 'Joker', suit: 'Special' });
    }
}

// Function to end the game
function endGame() {
    // Display winner
    let winner;
    if (player1Score > player2Score) {
        winner = 'Player 1';
    } else if (player2Score > player1Score) {
        winner = 'Player 2';
    } else {
        winner = 'It\'s a tie!';
    }
    document.getElementById('result').innerText = `Game Over! ${winner} wins!`;
    document.getElementById('drawButton').disabled = true; // Disable draw button
}

// Update game options
function updateOptions() {
    numberOfRounds = parseInt(document.getElementById('rounds').value);
    difficultyLevel = document.getElementById('difficulty').value;
    includeSpecialCards = document.getElementById('specialCards').checked;
}

// Event listener for draw button
document.getElementById('drawButton').addEventListener('click', () => {
    updateOptions(); // Update options before drawing card
    drawCard();
});

// Reset game when the page loads
window.onload = function() { 
    includeSpecialCardsLogic();
    resetGame(); // Optionally, reset the game when the page loads
}