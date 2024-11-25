// Variables
var playerChoice = ""; // Variable for player
var computerChoice = ""; // Variable for computer
var emojis = ["✂", "📄", "🪨"]; // Array for computer choices
var currentEmojiNumber = 0;
var shuffleIntervalID = setInterval(shuffleEmojis, 150);
var playerChoiceContainer = document.querySelector("#player-choice-container");
var emojiShuffleElement = document.querySelector("#emoji-shuffle");

// Get audio elements
const winSound = document.getElementById("win-sound");
const loseSound = document.getElementById("lose-sound");

// Event listener for player's choice
playerChoiceContainer.addEventListener("click", handlePlayerChoice);

function handlePlayerChoice(event) {
// Ensure only emojis trigger the event
if (!event.target.classList.contains("emoji")) return;

playerChoice = event.target.textContent;

// Update player's choice visually
playerChoiceContainer.innerHTML = `<p class="emoji">${playerChoice}</p>`;

// Stop the shuffle interval
clearInterval(shuffleIntervalID);

// Determine game winner
determineGameWinner();
}

function shuffleEmojis() {
// Cycle through emojis for the computer
computerChoice = emojis[currentEmojiNumber];
emojiShuffleElement.textContent = computerChoice;

// Increment or reset the emoji index
currentEmojiNumber = (currentEmojiNumber + 1) % emojis.length;
}

function determineGameWinner() {
const gameResultMessageElement = document.querySelector("#game-result-message");
let gameResultMessage = "";

if (playerChoice === computerChoice) {
gameResultMessage = "It's a tie!";
} else if (
(playerChoice === "🪨" && computerChoice === "✂") ||
(playerChoice === "📄" && computerChoice === "🪨") ||
(playerChoice === "✂" && computerChoice === "📄")
) {
gameResultMessage = "Player wins!";
new Audio("win.mp3").play(); // Dynamic sound
} else {
gameResultMessage = "Computer wins!";
new Audio("lose.mp3").play(); // Dynamic sound
}

gameResultMessageElement.textContent = `${gameResultMessage} Click to play again!`;

// Allow the game to be reset when the result message is clicked
gameResultMessageElement.addEventListener("click", resetGame);
}

function playSound(audioElement) {
// Debugging sound playback
console.log(`Attempting to play sound: ${audioElement.src}`);
try {
audioElement.play().catch((error) => {
console.error("Audio playback error:", error);
alert("Sound could not be played. Please check your browser settings.");
});
} catch (error) {
console.error("Sound play failed:", error);
}
}

function resetGame() {
// Reset game variables and UI
playerChoice = "";
computerChoice = "";
currentEmojiNumber = 0;
emojiShuffleElement.textContent = "";
document.querySelector("#game-result-message").textContent = "";
playerChoiceContainer.innerHTML = `
<p class="emoji">🪨</p>
<p class="emoji">📄</p>
<p class="emoji">✂</p>
`;

// Restart the computer's shuffle
shuffleIntervalID = setInterval(shuffleEmojis, 150);
}
