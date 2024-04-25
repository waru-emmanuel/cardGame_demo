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

    // Update UI and game state as before
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
        // Example: deck.push({ value: 'Joker', suit: 'Special' });
    }
}

// Function to end the game
function endGame() {
    // Display winner
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
window.onload = resetGame;
