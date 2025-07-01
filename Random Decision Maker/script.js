// Decision categories and their options
const categories = {
    food: {
        emoji: '🍽️',
        options: [
            { text: 'Pizza', emoji: '🍕' },
            { text: 'Tacos', emoji: '🌮' },
            { text: 'Sushi', emoji: '🍣' },
            { text: 'Salad', emoji: '🥗' },
            { text: 'Burger', emoji: '🍔' },
            { text: 'Sandwich', emoji: '🥪' },
            { text: 'Ramen', emoji: '🍜' },
            { text: 'Pasta', emoji: '🍝' }
        ],
        subtitle: 'Time to satisfy those taste buds!'
    },
    activity: {
        emoji: '🎯',
        options: [
            { text: 'Go for a walk', emoji: '🚶‍♀️' },
            { text: 'Watch Netflix', emoji: '📺' },
            { text: 'Read a book', emoji: '📚' },
            { text: 'Take a nap', emoji: '😴' },
            { text: 'Clean something', emoji: '🧹' },
            { text: 'Call a friend', emoji: '📞' },
            { text: 'Listen to music', emoji: '🎵' },
            { text: 'Do some exercise', emoji: '💪' }
        ],
        subtitle: 'Perfect way to spend your time!'
    },
    movie: {
        emoji: '🎬',
        options: [
            { text: 'Action', emoji: '💥' },
            { text: 'Comedy', emoji: '😂' },
            { text: 'Drama', emoji: '🎭' },
            { text: 'Sci-Fi', emoji: '🚀' },
            { text: 'Horror', emoji: '👻' },
            { text: 'Romance', emoji: '💕' },
            { text: 'Documentary', emoji: '📖' },
            { text: 'Thriller', emoji: '🔍' }
        ],
        subtitle: 'Get ready for movie night!'
    }
};

// DOM elements
const categoryButtons = document.querySelectorAll('.category-btn');
const decideButton = document.getElementById('decideBtn');
const resultContainer = document.getElementById('resultContainer');
const resultEmoji = document.getElementById('resultEmoji');
const resultText = document.getElementById('resultText');
const resultSubtitle = document.getElementById('resultSubtitle');
const tryAgainButton = document.getElementById('tryAgainBtn');

// State
let selectedCategory = null;

// Initialize the app
function init() {
    setupEventListeners();
    hideResult();
}

// Set up event listeners
function setupEventListeners() {
    // Category button listeners
    categoryButtons.forEach(button => {
        button.addEventListener('click', () => selectCategory(button));
    });

    // Decide button listener
    decideButton.addEventListener('click', makeDecision);

    // Try again button listener
    tryAgainButton.addEventListener('click', resetForNewDecision);
}

// Handle category selection
function selectCategory(button) {
    // Remove active class from all buttons
    categoryButtons.forEach(btn => btn.classList.remove('active'));
    
    // Add active class to selected button
    button.classList.add('active');
    
    // Store selected category
    selectedCategory = button.dataset.category;
    
    // Enable decide button
    decideButton.disabled = false;
    
    // Hide previous result
    hideResult();
}

// Make a random decision
function makeDecision() {
    if (!selectedCategory) return;
    
    // Disable button and add spinning animation
    decideButton.disabled = true;
    decideButton.classList.add('spinning');
    
    // Add delay for dramatic effect
    setTimeout(() => {
        const result = getRandomChoice(selectedCategory);
        displayResult(result);
        
        // Remove spinning animation
        decideButton.classList.remove('spinning');
    }, 1500);
}

// Get random choice from selected category
function getRandomChoice(category) {
    const categoryData = categories[category];
    const options = categoryData.options;
    const randomIndex = Math.floor(Math.random() * options.length);
    
    return {
        ...options[randomIndex],
        subtitle: categoryData.subtitle
    };
}

// Display the result
function displayResult(result) {
    resultEmoji.textContent = result.emoji;
    resultText.textContent = result.text;
    resultSubtitle.textContent = result.subtitle;
    
    // Show result with animation
    resultContainer.classList.add('show');
    tryAgainButton.style.display = 'inline-block';
}

// Hide the result
function hideResult() {
    resultContainer.classList.remove('show');
    tryAgainButton.style.display = 'none';
}

// Reset for new decision
function resetForNewDecision() {
    hideResult();
    decideButton.disabled = false;
}

// Add some fun interactions
function addSparkleEffect(element) {
    element.style.position = 'relative';
    
    for (let i = 0; i < 5; i++) {
        const sparkle = document.createElement('span');
        sparkle.textContent = '✨';
        sparkle.style.position = 'absolute';
        sparkle.style.left = Math.random() * 100 + '%';
        sparkle.style.top = Math.random() * 100 + '%';
        sparkle.style.animation = `sparkle 1s ease-out ${i * 0.1}s`;
        sparkle.style.pointerEvents = 'none';
        
        element.appendChild(sparkle);
        
        setTimeout(() => sparkle.remove(), 1000);
    }
}

// Add sparkle animation to CSS
const sparkleCSS = `
@keyframes sparkle {
    0% { opacity: 0; transform: scale(0) rotate(0deg); }
    50% { opacity: 1; transform: scale(1) rotate(180deg); }
    100% { opacity: 0; transform: scale(0) rotate(360deg); }
}
`;

// Inject sparkle CSS
const style = document.createElement('style');
style.textContent = sparkleCSS;
document.head.appendChild(style);

// Initialize the app when DOM is loaded
document.addEventListener('DOMContentLoaded', init);
