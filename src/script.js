// Initialize deck
let deck = [];
const suits = ['Hearts', 'Diamonds', 'Clubs', 'Spades'];
const values = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'Jack', 'Queen', 'King', 'Ace'];

// Add special cards to the deck
deck.push({ value: 'Joker', suit: 'Special' });

suits.forEach(suit => {
    values.forEach(value => {
        deck.push({ value, suit });
    });
});

// Shuffle deck
function shuffleDeck() {
    for (let i = deck.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [deck[i], deck[j]] = [deck[j], deck[i]];
    }
}

shuffleDeck();

// Distribute cards to players
const player1Deck = deck.slice(0, 26);
const player2Deck = deck.slice(26);

const player1DeckElement = document.getElementById('player1Deck');
const player2DeckElement = document.getElementById('player2Deck');
const drawButton = document.getElementById('drawButton');
const resultElement = document.getElementById('result');
const player1ScoreElement = document.getElementById('player1Score');
const player2ScoreElement = document.getElementById('player2Score');

let player1Card, player2Card;
let player1Score = 0;
let player2Score = 0;

// Draw card function
function drawCard() {
    player1Card = player1Deck.shift();
    player2Card = player2Deck.shift();

    updateUI(); // Update UI after drawing cards

    if (compareCards(player1Card, player2Card) === 1) {
        player1Deck.push(player1Card, player2Card);
        player1Score++;
    } else if (compareCards(player1Card, player2Card) === -1) {
        player2Deck.push(player1Card, player2Card);
        player2Score++;
    }

    player1ScoreElement.innerText = `Score: ${player1Score}`;
    player2ScoreElement.innerText = `Score: ${player2Score}`;

    if (player1Deck.length === 0 || player2Deck.length === 0) {
        endGame();
        return;
    }
}

// Compare card values
function compareCards(card1, card2) {
    // Check if either card is a special card
    if (card1.suit === 'Special' || card2.suit === 'Special') {
        // Special cards win against non-special cards
        if (card1.suit === 'Special' && card2.suit !== 'Special') {
            return 1; // Player 1 wins
        } else if (card1.suit !== 'Special' && card2.suit === 'Special') {
            return -1; // Player 2 wins
        } else {
            return 0; // Both cards are special or neither are
        }
    }

    // Regular card comparison
    const valueIndex1 = values.indexOf(card1.value);
    const valueIndex2 = values.indexOf(card2.value);

    if (valueIndex1 > valueIndex2) {
        return 1; // Player 1 wins
    } else if (valueIndex1 < valueIndex2) {
        return -1; // Player 2 wins
    } else {
        return 0; // Draw
    }
}

// Function to update UI elements
function updateUI() {
    // Update player 1 deck UI
    player1DeckElement.innerHTML = `
        <div class="card">
            <img src="images/${player1Card.suit}.png" alt="${player1Card.value} of ${player1Card.suit}">
            <div class="card-value">${player1Card.value}</div>
        </div>
    `;

    // Update player 2 deck UI
    player2DeckElement.innerHTML = `
        <div class="card">
            <img src="images/${player2Card.suit}.png" alt="${player2Card.value} of ${player2Card.suit}">
            <div class="card-value">${player2Card.value}</div>
        </div>
    `;
}

// Function to end the game
function endGame() {
    if (player1Deck.length === 0) {
        resultElement.innerText = "Player 2 wins!";
    } else {
        resultElement.innerText = "Player 1 wins!";
    }
    drawButton.disabled = true;
}

// Event listener for draw button
drawButton.addEventListener('click', drawCard);
