// Multi-Tool Random Generator JavaScript

// Data for different categories
const DATA = {
    food: [
        "🍕 Pizza", "🍔 Burger", "🍜 Ramen", "🌮 Tacos", "🍣 Sushi",
        "🍝 Pasta", "🥗 Salad", "🍛 Curry", "🌯 Burrito", "🥪 Sandwich",
        "🍳 Breakfast", "🥘 Stew", "🍲 Hot Pot", "🥙 Falafel", "🍖 BBQ",
        "🍤 Seafood", "🥩 Steak", "🍕 Italian", "🥡 Chinese", "🌶️ Mexican"
    ],
    activities: [
        "🎬 Watch a movie", "📚 Read a book", "🚶‍♀️ Take a walk", "🎨 Draw or paint", "🎵 Listen to music",
        "🧘‍♀️ Meditate", "🏃‍♂️ Go for a run", "🎮 Play video games", "📞 Call a friend", "🧹 Clean and organize",
        "🌱 Garden", "🍳 Cook something new", "✍️ Write in a journal", "🧩 Do a puzzle", "💃 Dance",
        "🎯 Learn a new skill", "📸 Take photos", "🛁 Take a relaxing bath", "🎪 Visit a local event", "🏊‍♀️ Go swimming"
    ],
    movies: [
        "🎬 Action/Adventure", "😂 Comedy", "💕 Romance", "😱 Horror/Thriller", "🚀 Sci-Fi",
        "🏰 Fantasy", "🎭 Drama", "🕵️ Mystery", "📚 Documentary", "🎵 Musical",
        "👨‍👩‍👧‍👦 Family", "🌟 Classic", "🎌 Foreign Film", "🦸‍♂️ Superhero", "🤠 Western",
        "⚔️ War", "🏆 Award Winner", "📺 TV Series", "🎪 Indie Film", "🎨 Animated"
    ]
};

const QUOTES = {
    motivation: [
        { text: "The only way to do great work is to love what you do.", author: "Steve Jobs" },
        { text: "Success is not final, failure is not fatal: it is the courage to continue that counts.", author: "Winston Churchill" },
        { text: "The future belongs to those who believe in the beauty of their dreams.", author: "Eleanor Roosevelt" },
        { text: "It is during our darkest moments that we must focus to see the light.", author: "Aristotle" },
        { text: "Don't watch the clock; do what it does. Keep going.", author: "Sam Levenson" }
    ],
    wisdom: [
        { text: "The only true wisdom is in knowing you know nothing.", author: "Socrates" },
        { text: "In the middle of difficulty lies opportunity.", author: "Albert Einstein" },
        { text: "The journey of a thousand miles begins with one step.", author: "Lao Tzu" },
        { text: "Yesterday is history, tomorrow is a mystery, today is a gift.", author: "Eleanor Roosevelt" },
        { text: "Be yourself; everyone else is already taken.", author: "Oscar Wilde" }
    ],
    success: [
        { text: "Success is not the key to happiness. Happiness is the key to success.", author: "Albert Schweitzer" },
        { text: "The way to get started is to quit talking and begin doing.", author: "Walt Disney" },
        { text: "Innovation distinguishes between a leader and a follower.", author: "Steve Jobs" },
        { text: "Success is walking from failure to failure with no loss of enthusiasm.", author: "Winston Churchill" },
        { text: "The only impossible journey is the one you never begin.", author: "Tony Robbins" }
    ],
    life: [
        { text: "Life is what happens to you while you're busy making other plans.", author: "John Lennon" },
        { text: "The purpose of our lives is to be happy.", author: "Dalai Lama" },
        { text: "Life is 10% what happens to you and 90% how you react to it.", author: "Charles R. Swindoll" },
        { text: "In the end, we will remember not the words of our enemies, but the silence of our friends.", author: "Martin Luther King Jr." },
        { text: "Life is really simple, but we insist on making it complicated.", author: "Confucius" }
    ],
    happiness: [
        { text: "Happiness is not something ready made. It comes from your own actions.", author: "Dalai Lama" },
        { text: "The best way to cheer yourself up is to try to cheer somebody else up.", author: "Mark Twain" },
        { text: "Happiness is when what you think, what you say, and what you do are in harmony.", author: "Mahatma Gandhi" },
        { text: "Very little is needed to make a happy life; it is all within yourself, in your way of thinking.", author: "Marcus Aurelius" },
        { text: "The secret of happiness is not in doing what one likes, but in liking what one does.", author: "James M. Barrie" }
    ]
};

const ACTIVITIES = {
    indoor: [
        "🧩 Work on a jigsaw puzzle", "📚 Read a new book", "🎨 Try a new art technique", "🍳 Cook a complex recipe",
        "🧘‍♀️ Practice meditation", "🎮 Play a video game", "📺 Binge-watch a series", "✍️ Write in a journal",
        "🧹 Organize a room", "🎵 Learn a musical instrument", "💻 Learn coding", "🧶 Try knitting or crocheting"
    ],
    outdoor: [
        "🚶‍♀️ Take a nature walk", "🏃‍♂️ Go for a run", "🚴‍♀️ Ride a bike", "🏊‍♀️ Go swimming",
        "🌳 Have a picnic", "📸 Go photography", "🎣 Try fishing", "⛰️ Go hiking",
        "🌻 Visit a garden", "🏐 Play a sport", "🌅 Watch the sunrise", "⭐ Stargaze at night"
    ],
    creative: [
        "🎨 Paint or draw", "✍️ Write a story", "📸 Take artistic photos", "🎵 Compose music",
        "🧶 Try a craft project", "🎭 Practice acting", "💃 Learn a dance", "🎪 Create a video",
        "🖼️ Make a collage", "🎨 Try digital art", "📝 Write poetry", "🎬 Make a short film"
    ],
    physical: [
        "🏃‍♂️ Go running", "🏋️‍♀️ Hit the gym", "🧘‍♀️ Do yoga", "💃 Dance workout",
        "🏊‍♀️ Swimming", "🚴‍♀️ Cycling", "🥾 Hiking", "🏐 Play sports",
        "🤸‍♀️ Try gymnastics", "🥊 Boxing workout", "🏓 Play table tennis", "⛹️‍♀️ Basketball"
    ],
    social: [
        "📞 Call a friend", "🎉 Host a party", "🎲 Play board games", "🍕 Have a group dinner",
        "🎬 Movie night with friends", "🎤 Karaoke session", "🎳 Go bowling", "🎯 Play darts",
        "☕ Meet for coffee", "🎪 Attend an event", "👥 Join a club", "🎨 Take a group class"
    ],
    learning: [
        "📚 Read educational books", "💻 Take an online course", "🌍 Learn a new language", "🔬 Watch documentaries",
        "🎓 Attend a workshop", "📖 Study a new subject", "🧠 Practice brain games", "📝 Learn to write better",
        "🎹 Learn an instrument", "🍳 Master cooking skills", "💼 Develop professional skills", "🎨 Learn art techniques"
    ]
};

// Utility functions
function getRandomItem(array) {
    return array[Math.floor(Math.random() * array.length)];
}

function showLoading(button) {
    button.classList.add('loading');
    button.disabled = true;
}

function hideLoading(button) {
    button.classList.remove('loading');
    button.disabled = false;
}

function showResult(container, content, hasResult = true) {
    container.innerHTML = content;
    if (hasResult) {
        container.classList.add('has-result');
    } else {
        container.classList.remove('has-result');
    }
}

// Tab switching functionality
function initTabs() {
    const tabButtons = document.querySelectorAll('.tab-btn');
    const toolSections = document.querySelectorAll('.tool-section');

    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            const targetTab = button.dataset.tab;
            
            // Update active tab button
            tabButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            
            // Update active tool section
            toolSections.forEach(section => section.classList.remove('active'));
            document.getElementById(targetTab).classList.add('active');
        });
    });
}

// Sub-tab functionality for dice & coin
function initSubTabs() {
    const subTabButtons = document.querySelectorAll('.sub-tab-btn');
    const subTools = document.querySelectorAll('.sub-tool');

    subTabButtons.forEach(button => {
        button.addEventListener('click', () => {
            const targetSubTab = button.dataset.subtab;
            
            // Update active sub-tab button
            subTabButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            
            // Update active sub-tool
            subTools.forEach(tool => tool.classList.remove('active'));
            document.getElementById(targetSubTab).classList.add('active');
        });
    });
}

// Decision Maker functionality
function initDecisionMaker() {
    const categorySelect = document.getElementById('decision-category');
    const customOptions = document.getElementById('custom-options');
    const customList = document.getElementById('custom-list');
    const decisionBtn = document.getElementById('decision-btn');
    const resultContainer = document.getElementById('decision-result');

    // Show/hide custom options
    categorySelect.addEventListener('change', () => {
        if (categorySelect.value === 'custom') {
            customOptions.style.display = 'block';
        } else {
            customOptions.style.display = 'none';
        }
    });

    // Generate decision
    decisionBtn.addEventListener('click', () => {
        showLoading(decisionBtn);
        
        setTimeout(() => {
            let options = [];
            const category = categorySelect.value;
            
            if (category === 'custom') {
                const customText = customList.value.trim();
                if (!customText) {
                    showResult(resultContainer, '<p>Please enter some custom options first!</p>', false);
                    hideLoading(decisionBtn);
                    return;
                }
                options = customText.split('\n').filter(option => option.trim());
            } else {
                options = DATA[category];
            }
            
            if (options.length === 0) {
                showResult(resultContainer, '<p>No options available!</p>', false);
                hideLoading(decisionBtn);
                return;
            }
            
            const choice = getRandomItem(options);
            const resultHTML = `
                <div class="result-text">${choice}</div>
                <div class="result-meta">Your random choice from ${options.length} options</div>
            `;
            
            showResult(resultContainer, resultHTML);
            hideLoading(decisionBtn);
        }, 1000);
    });
}

// Quote Generator functionality  
function initQuoteGenerator() {
    const categorySelect = document.getElementById('quote-category');
    const quoteBtn = document.getElementById('quote-btn');
    const resultContainer = document.getElementById('quote-result');
    const actionsContainer = document.getElementById('quote-actions');

    quoteBtn.addEventListener('click', () => {
        showLoading(quoteBtn);
        
        setTimeout(() => {
            const category = categorySelect.value;
            let quotes = [];
            
            if (category === 'all') {
                quotes = Object.values(QUOTES).flat();
            } else {
                quotes = QUOTES[category];
            }
            
            const quote = getRandomItem(quotes);
            const resultHTML = `
                <div class="quote-text">"${quote.text}"</div>
                <div class="quote-author">${quote.author}</div>
            `;
            
            showResult(resultContainer, resultHTML);
            actionsContainer.style.display = 'flex';
            hideLoading(quoteBtn);
        }, 800);
    });
}

// Dice and Coin functionality
function initDiceAndCoin() {
    const diceBtn = document.getElementById('dice-btn');
    const coinBtn = document.getElementById('coin-btn');
    const diceDisplay = document.getElementById('dice-display');
    const coinDisplay = document.getElementById('coin-display');
    const diceCountSelect = document.getElementById('dice-count');

    // Dice roller
    diceBtn.addEventListener('click', () => {
        showLoading(diceBtn);

        setTimeout(() => {
            const diceCount = parseInt(diceCountSelect.value);
            let diceHTML = '';
            let total = 0;

            for (let i = 0; i < diceCount; i++) {
                const roll = Math.floor(Math.random() * 6) + 1;
                total += roll;
                diceHTML += `<div class="die">${roll}</div>`;
            }

            diceDisplay.innerHTML = diceHTML;

            if (diceCount > 1) {
                diceDisplay.innerHTML += `<div style="width: 100%; text-align: center; margin-top: 20px; font-size: 1.2rem; font-weight: bold; color: #667eea;">Total: ${total}</div>`;
            }

            hideLoading(diceBtn);
        }, 1200);
    });

    // Coin flipper
    coinBtn.addEventListener('click', () => {
        showLoading(coinBtn);

        setTimeout(() => {
            const result = Math.random() < 0.5 ? 'heads' : 'tails';
            const coinHTML = `
                <div class="coin">
                    ${result === 'heads' ? '👑' : '🪙'}
                </div>
                <div style="text-align: center; margin-top: 20px; font-size: 1.3rem; font-weight: bold; color: #667eea; text-transform: uppercase;">
                    ${result}
                </div>
            `;

            coinDisplay.innerHTML = coinHTML;
            hideLoading(coinBtn);
        }, 1000);
    });
}

// Activity Picker functionality
function initActivityPicker() {
    const categorySelect = document.getElementById('activity-category');
    const activityBtn = document.getElementById('activity-btn');
    const resultContainer = document.getElementById('activity-result');
    const actionsContainer = document.getElementById('activity-actions');

    activityBtn.addEventListener('click', () => {
        showLoading(activityBtn);

        setTimeout(() => {
            const category = categorySelect.value;
            let activities = [];

            if (category === 'all') {
                activities = Object.values(ACTIVITIES).flat();
            } else {
                activities = ACTIVITIES[category];
            }

            const activity = getRandomItem(activities);
            const resultHTML = `
                <div class="result-text">${activity}</div>
                <div class="result-meta">Perfect for ${category === 'all' ? 'any time' : category + ' activities'}</div>
            `;

            showResult(resultContainer, resultHTML);
            actionsContainer.style.display = 'flex';
            hideLoading(activityBtn);
        }, 900);
    });
}

// Favorites functionality
function initFavorites() {
    const favoriteQuoteBtn = document.getElementById('favorite-quote');
    const favoriteActivityBtn = document.getElementById('favorite-activity');
    const favoritesLink = document.getElementById('favorites-link');
    const favoritesModal = document.getElementById('favorites-modal');
    const closeFavoritesBtn = document.getElementById('close-favorites');
    const favoritesContent = document.getElementById('favorites-content');

    // Load favorites from localStorage
    function getFavorites() {
        return JSON.parse(localStorage.getItem('multiToolFavorites') || '{"quotes": [], "activities": []}');
    }

    function saveFavorites(favorites) {
        localStorage.setItem('multiToolFavorites', JSON.stringify(favorites));
    }

    // Add quote to favorites
    favoriteQuoteBtn.addEventListener('click', () => {
        const quoteResult = document.getElementById('quote-result');
        if (quoteResult.classList.contains('has-result')) {
            const quoteText = quoteResult.querySelector('.quote-text').textContent;
            const quoteAuthor = quoteResult.querySelector('.quote-author').textContent;

            const favorites = getFavorites();
            const quote = { text: quoteText, author: quoteAuthor, timestamp: Date.now() };

            // Check if already favorited
            const exists = favorites.quotes.some(fav => fav.text === quoteText);
            if (!exists) {
                favorites.quotes.unshift(quote);
                saveFavorites(favorites);
                favoriteQuoteBtn.innerHTML = '⭐ Favorited!';
                setTimeout(() => {
                    favoriteQuoteBtn.innerHTML = '⭐ Favorite';
                }, 2000);
            }
        }
    });

    // Add activity to favorites
    favoriteActivityBtn.addEventListener('click', () => {
        const activityResult = document.getElementById('activity-result');
        if (activityResult.classList.contains('has-result')) {
            const activityText = activityResult.querySelector('.result-text').textContent;

            const favorites = getFavorites();
            const activity = { text: activityText, timestamp: Date.now() };

            // Check if already favorited
            const exists = favorites.activities.some(fav => fav.text === activityText);
            if (!exists) {
                favorites.activities.unshift(activity);
                saveFavorites(favorites);
                favoriteActivityBtn.innerHTML = '⭐ Favorited!';
                setTimeout(() => {
                    favoriteActivityBtn.innerHTML = '⭐ Favorite';
                }, 2000);
            }
        }
    });

    // Show favorites modal
    favoritesLink.addEventListener('click', (e) => {
        e.preventDefault();
        const favorites = getFavorites();

        let content = '';

        if (favorites.quotes.length > 0) {
            content += '<h4>📝 Favorite Quotes</h4>';
            favorites.quotes.slice(0, 10).forEach(quote => {
                content += `
                    <div style="margin: 15px 0; padding: 15px; background: #f8f9fa; border-radius: 8px;">
                        <div style="font-style: italic; margin-bottom: 8px;">${quote.text}</div>
                        <div style="font-weight: 500; color: #667eea;">${quote.author}</div>
                    </div>
                `;
            });
        }

        if (favorites.activities.length > 0) {
            content += '<h4 style="margin-top: 25px;">🎯 Favorite Activities</h4>';
            favorites.activities.slice(0, 10).forEach(activity => {
                content += `
                    <div style="margin: 10px 0; padding: 12px; background: #f8f9fa; border-radius: 8px;">
                        ${activity.text}
                    </div>
                `;
            });
        }

        if (content === '') {
            content = '<p>No favorites saved yet. Start using the tools and save your favorites!</p>';
        }

        favoritesContent.innerHTML = content;
        favoritesModal.classList.add('active');
    });

    // Close favorites modal
    closeFavoritesBtn.addEventListener('click', () => {
        favoritesModal.classList.remove('active');
    });

    // Close modal when clicking outside
    favoritesModal.addEventListener('click', (e) => {
        if (e.target === favoritesModal) {
            favoritesModal.classList.remove('active');
        }
    });
}

// Skip activity functionality
function initSkipActivity() {
    const skipBtn = document.getElementById('skip-activity');
    const activityBtn = document.getElementById('activity-btn');

    skipBtn.addEventListener('click', () => {
        activityBtn.click(); // Trigger new activity generation
    });
}

// Share quote functionality
function initShareQuote() {
    const shareBtn = document.getElementById('share-quote');

    shareBtn.addEventListener('click', () => {
        const quoteResult = document.getElementById('quote-result');
        if (quoteResult.classList.contains('has-result')) {
            const quoteText = quoteResult.querySelector('.quote-text').textContent;
            const quoteAuthor = quoteResult.querySelector('.quote-author').textContent;

            const shareText = `${quoteText} ${quoteAuthor}`;

            if (navigator.share) {
                navigator.share({
                    title: 'Inspirational Quote',
                    text: shareText,
                    url: window.location.href
                });
            } else {
                // Fallback: copy to clipboard
                navigator.clipboard.writeText(shareText).then(() => {
                    shareBtn.innerHTML = '📤 Copied!';
                    setTimeout(() => {
                        shareBtn.innerHTML = '📤 Share';
                    }, 2000);
                });
            }
        }
    });
}

// Wheel Spinner Data
const WHEEL_PRESETS = {
    yesno: ["✓ Yes", "✗ No"],
    numbers: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"],
    colors: ["🔴 Red", "🟡 Yellow", "🟢 Green", "🔵 Blue", "🟣 Purple", "⚪ White", "⚫ Black", "🟤 Brown"],
    food: ["🍕 Pizza", "🍔 Burger", "🌮 Tacos", "🍜 Noodles", "🥗 Salad", "🍗 Chicken", "🥩 Steak", "🍣 Sushi"]
};

// Wheel Spinner Class
class WheelSpinner {
    constructor(canvas) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.items = [];
        this.colors = [
            '#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4',
            '#FFEEAD', '#D4A5A5', '#9B59B6', '#3498DB',
            '#E67E22', '#2ECC71', '#F1C40F', '#E74C3C'
        ];
        this.isSpinning = false;
        this.currentRotation = 0;
        this.spinDuration = 5000; // 5 seconds
        this.lastFrameTime = 0;
        this.finalAngle = 0;
    }

    draw() {
        const center = this.canvas.width / 2;
        const radius = Math.max(center - 10, 20); // Ensure minimum radius of 20px
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        // Detect dark mode
        const isDark = document.body.classList.contains('dark');

        if (this.items.length > 0) {
            const sliceAngle = (2 * Math.PI) / this.items.length;

            // Draw slices
            this.items.forEach((item, i) => {
                this.ctx.beginPath();
                this.ctx.moveTo(center, center);
                this.ctx.arc(center, center, radius, 
                    i * sliceAngle + this.currentRotation, 
                    (i + 1) * sliceAngle + this.currentRotation);
                this.ctx.closePath();

                this.ctx.fillStyle = this.colors[i % this.colors.length];
                this.ctx.fill();
                this.ctx.strokeStyle = isDark ? '#fff' : '#fff';
                this.ctx.lineWidth = 3;
                this.ctx.stroke();

                // Draw text
                this.ctx.save();
                this.ctx.translate(center, center);
                this.ctx.rotate(i * sliceAngle + sliceAngle / 2 + this.currentRotation);
                this.ctx.textAlign = 'right';
                this.ctx.fillStyle = isDark ? '#fffbe7' : '#fff';

                // Responsive font size based on canvas size
                const fontSize = Math.max(Math.min(radius / 8, 32), 12);
                this.ctx.font = `bold ${fontSize}px Inter, Arial, sans-serif`;
                this.ctx.shadowColor = isDark ? '#232946' : '#333';
                this.ctx.shadowBlur = Math.max(fontSize / 8, 2);

                // Responsive text position
                const textOffset = Math.max(radius * 0.15, 10);
                this.ctx.fillText(item, radius - textOffset, fontSize / 4);
                this.ctx.restore();
            });
        } else {
            // Draw empty state
            this.ctx.beginPath();
            this.ctx.arc(center, center, radius, 0, 2 * Math.PI);
            this.ctx.strokeStyle = '#ccc';
            this.ctx.lineWidth = 2;
            this.ctx.stroke();
            
            this.ctx.fillStyle = '#666';
            const emptyFontSize = Math.max(Math.min(radius / 10, 16), 10);
            this.ctx.font = `${emptyFontSize}px Inter`;
            this.ctx.textAlign = 'center';
            this.ctx.fillText('Add items to spin!', center, center);
        }
    }

    spin() {
        if (this.isSpinning || this.items.length === 0) return false;
        
        this.isSpinning = true;
        this.lastFrameTime = performance.now();
        this.finalAngle = Math.random() * Math.PI * 2;
        // Play spin sound if available
        if (spinAudio) {
            try {
                spinAudio.currentTime = 0;
                spinAudio.play().catch(() => {}); // Handle play promise rejection
            } catch(e) {}
        }
        const animate = (currentTime) => {
            const elapsed = currentTime - this.lastFrameTime;
            const progress = Math.min(elapsed / this.spinDuration, 1);
            
            // Easing function for smooth deceleration
            const easeOut = t => 1 - Math.pow(1 - t, 3);
            
            // Calculate rotation
            const totalRotations = 10; // Number of full rotations
            this.currentRotation = (totalRotations * 2 * Math.PI * easeOut(progress)) + this.finalAngle;
            
            this.draw();
            
            if (progress < 1) {
                requestAnimationFrame(animate);
            } else {
                this.isSpinning = false;
                // Play win sound if available
                if (winAudio) {
                    try {
                        winAudio.currentTime = 0;
                        winAudio.play().catch(() => {}); // Handle play promise rejection
                    } catch(e) {}
                }
                launchConfetti();
                this.announceResult();
            }
        };
        
        requestAnimationFrame(animate);
        return true;
    }

    announceResult() {
        const sliceAngle = (2 * Math.PI) / this.items.length;
        // Pointer is at -Math.PI/2 (top). Find which segment is at that angle.
        let pointerAngle = (3 * Math.PI / 2 - this.currentRotation) % (2 * Math.PI);
        if (pointerAngle < 0) pointerAngle += 2 * Math.PI;
        let winningIndex = Math.floor(pointerAngle / sliceAngle) % this.items.length;
        const winner = this.items[winningIndex];
        
        const resultDisplay = document.getElementById('wheel-result');
        const wheelActions = document.getElementById('wheel-actions');
        
        resultDisplay.innerHTML = `
            <div class="result-text">🎯 ${winner}</div>
            <div class="result-meta">The wheel has spoken!</div>
        `;
        resultDisplay.classList.add('has-result');
        wheelActions.style.display = 'flex';
    }

    addItem(item) {
        if (item && !this.items.includes(item)) {
            this.items.push(item);
            this.draw();
            return true;
        }
        return false;
    }

    removeItem(index) {
        if (index >= 0 && index < this.items.length) {
            this.items.splice(index, 1);
            this.draw();
            return true;
        }
        return false;
    }

    clear() {
        this.items = [];
        this.draw();
    }

    loadPreset(presetName) {
        const preset = WHEEL_PRESETS[presetName];
        if (preset) {
            this.items = [...preset];
            this.draw();
            return true;
        }
        return false;
    }
}

// --- Confetti Animation ---
function launchConfetti() {
    // Simple confetti using canvas overlay
    const confettiCanvas = document.createElement('canvas');
    confettiCanvas.width = window.innerWidth;
    confettiCanvas.height = window.innerHeight;
    confettiCanvas.style.position = 'fixed';
    confettiCanvas.style.left = 0;
    confettiCanvas.style.top = 0;
    confettiCanvas.style.pointerEvents = 'none';
    confettiCanvas.style.zIndex = 9999;
    document.body.appendChild(confettiCanvas);
    const ctx = confettiCanvas.getContext('2d');
    const colors = ['#FF6B6B', '#4ECDC4', '#45B7D1', '#FFEEAD', '#D4A5A5', '#9B59B6', '#F1C40F', '#E74C3C'];
    const confetti = Array.from({length: 80}, () => ({
        x: Math.random() * confettiCanvas.width,
        y: Math.random() * -confettiCanvas.height,
        r: 6 + Math.random() * 8,
        d: 2 + Math.random() * 2,
        color: colors[Math.floor(Math.random() * colors.length)],
        tilt: Math.random() * 10 - 5
    }));
    let frame = 0;
    function draw() {
        ctx.clearRect(0, 0, confettiCanvas.width, confettiCanvas.height);
        confetti.forEach(c => {
            ctx.beginPath();
            ctx.arc(c.x, c.y, c.r, 0, 2 * Math.PI);
            ctx.fillStyle = c.color;
            ctx.fill();
        });
    }
    function update() {
        confetti.forEach(c => {
            c.y += c.d + Math.sin(frame / 10 + c.x);
            c.x += Math.sin(frame / 15 + c.tilt);
        });
    }
    function animate() {
        draw();
        update();
        frame++;
        if (frame < 90) {
            requestAnimationFrame(animate);
        } else {
            document.body.removeChild(confettiCanvas);
        }
    }
    animate();
}

// --- Wheel Spin Sound ---
let spinAudio = null;
let winAudio = null;

// Initialize audio with error handling
try {
    spinAudio = new Audio('https://cdn.jsdelivr.net/gh/ste-vg/snd@main/spin-short.mp3');
    winAudio = new Audio('https://cdn.jsdelivr.net/gh/ste-vg/snd@main/win-ding.mp3');

    // Preload audio files
    spinAudio.preload = 'auto';
    winAudio.preload = 'auto';

    // Handle audio loading errors
    spinAudio.addEventListener('error', () => {
        console.log('Spin audio failed to load, continuing without sound');
        spinAudio = null;
    });

    winAudio.addEventListener('error', () => {
        console.log('Win audio failed to load, continuing without sound');
        winAudio = null;
    });
} catch (e) {
    console.log('Audio initialization failed, continuing without sound');
}

// Initialize wheel spinner
document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('wheel-canvas');

    // Set canvas size based on wrapper
    function resizeCanvas() {
        const wrapper = canvas.parentElement;
        const size = Math.min(wrapper.offsetWidth, wrapper.offsetHeight);
        canvas.width = size;
        canvas.height = size;
    }

    resizeCanvas();
    window.addEventListener('resize', () => {
        resizeCanvas();
        wheel.draw();
    });

    const wheel = new WheelSpinner(canvas);
    wheel.draw();

    // Input handling
    const itemInput = document.getElementById('wheel-item-input');
    const addItemBtn = document.getElementById('add-item-btn');
    const itemsList = document.getElementById('items-container');
    const itemCount = document.getElementById('item-count');
    const clearAllBtn = document.getElementById('clear-all-btn');
    const spinBtn = document.getElementById('wheel-spin-btn');
    const spinAgainBtn = document.getElementById('spin-again-btn');
    const presetButtons = document.querySelectorAll('.preset-btn');

    // User Presets
    const savePresetName = document.getElementById('save-preset-name');
    const savePresetBtn = document.getElementById('save-preset-btn');
    const userPresetsList = document.getElementById('user-presets-list');

    function getUserPresets() {
        return JSON.parse(localStorage.getItem('wheelUserPresets') || '{}');
    }
    function setUserPresets(presets) {
        localStorage.setItem('wheelUserPresets', JSON.stringify(presets));
    }
    function updateUserPresetsList() {
        const presets = getUserPresets();
        userPresetsList.innerHTML = Object.keys(presets).length ?
            Object.entries(presets).map(([name, items]) =>
                `<div class="user-preset-item">
                    <span>${name}</span>
                    <span>
                        <button title="Load" data-preset="${name}" class="load-preset-btn">⟳</button>
                        <button title="Delete" data-preset="${name}" class="delete-preset-btn">🗑️</button>
                    </span>
                </div>`
            ).join('') : '<div style="color:#888;font-size:0.95rem;">No saved presets yet.</div>';
    }
    savePresetBtn.addEventListener('click', () => {
        const name = savePresetName.value.trim();
        if (!name) return;
        const presets = getUserPresets();
        presets[name] = [...wheel.items];
        setUserPresets(presets);
        updateUserPresetsList();
        savePresetName.value = '';
    });
    userPresetsList.addEventListener('click', e => {
        if (e.target.classList.contains('load-preset-btn')) {
            const name = e.target.dataset.preset;
            const presets = getUserPresets();
            if (presets[name]) {
                wheel.items = [...presets[name]];
                wheel.draw();
                updateItemsList();
                spinBtn.disabled = wheel.items.length === 0;
            }
        } else if (e.target.classList.contains('delete-preset-btn')) {
            const name = e.target.dataset.preset;
            const presets = getUserPresets();
            delete presets[name];
            setUserPresets(presets);
            updateUserPresetsList();
        }
    });
    updateUserPresetsList();

    // Add item
    const addItem = () => {
        const item = itemInput.value.trim();
        if (item && wheel.addItem(item)) {
            updateItemsList();
            itemInput.value = '';
            spinBtn.disabled = false;
        }
    };

    // Update items list display
    const updateItemsList = () => {
        itemsList.innerHTML = wheel.items.length ? wheel.items.map((item, i) => `
            <div class="wheel-item">
                <span>${item}</span>
                <button class="remove-item" data-index="${i}">✕</button>
            </div>
        `).join('') : '<p class="no-items">No items added yet. Add some options above!</p>';
        
        itemCount.textContent = wheel.items.length;
    };

    // Event Listeners
    addItemBtn.addEventListener('click', addItem);
    itemInput.addEventListener('keypress', e => {
        if (e.key === 'Enter') addItem();
    });

    itemsList.addEventListener('click', e => {
        if (e.target.classList.contains('remove-item')) {
            const index = parseInt(e.target.dataset.index);
            if (wheel.removeItem(index)) {
                updateItemsList();
                spinBtn.disabled = wheel.items.length === 0;
            }
        }
    });

    clearAllBtn.addEventListener('click', () => {
        wheel.clear();
        updateItemsList();
        spinBtn.disabled = true;
    });

    spinBtn.addEventListener('click', () => {
        if (wheel.spin()) {
            document.getElementById('wheel-result').classList.remove('has-result');
            document.getElementById('wheel-actions').style.display = 'none';
        }
    });

    spinAgainBtn.addEventListener('click', () => wheel.spin());

    presetButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const preset = btn.dataset.preset;
            if (wheel.loadPreset(preset)) {
                updateItemsList();
                spinBtn.disabled = false;
            }
        });
    });

    // Theme toggle
    const themeToggle = document.getElementById('theme-toggle');
    function setTheme(dark) {
        document.body.classList.toggle('dark', dark);
        themeToggle.textContent = dark ? '☀️' : '🌙';
        localStorage.setItem('theme', dark ? 'dark' : 'light');
    }
    themeToggle.addEventListener('click', () => {
        setTheme(!document.body.classList.contains('dark'));
    });
    // On load
    setTheme(localStorage.getItem('theme') === 'dark');
});

// Initialize all functionality
document.addEventListener('DOMContentLoaded', () => {
    initTabs();
    initSubTabs();
    initDecisionMaker();
    initQuoteGenerator();
    initDiceAndCoin();
    initActivityPicker();
    initFavorites();
    initSkipActivity();
    initShareQuote();
});
