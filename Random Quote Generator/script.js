// Main application script
class QuoteGeneratorApp {
    constructor() {
        this.quoteManager = new QuoteManager();
        this.currentCategory = 'all';
        this.isInitialized = false;
        
        // DOM elements
        this.elements = {
            quoteText: null,
            quoteAuthor: null,
            newQuoteBtn: null,
            favoriteBtn: null,
            shareBtn: null,
            categoryFilter: null,
            themeToggle: null,
            favoritesSection: null,
            favoritesList: null,
            clearFavoritesBtn: null
        };
        
        this.init();
    }

    // Initialize the application
    init() {
        // Wait for DOM to be ready
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.setupApp());
        } else {
            this.setupApp();
        }
    }

    // Setup the application
    setupApp() {
        this.cacheElements();
        this.setupEventListeners();
        this.loadTheme();
        this.updateFavoritesDisplay();
        this.isInitialized = true;
        
        console.log('Quote Generator App initialized successfully!');
    }

    // Cache DOM elements
    cacheElements() {
        this.elements.quoteText = document.querySelector('.quote-text');
        this.elements.quoteAuthor = document.querySelector('.quote-author');
        this.elements.newQuoteBtn = document.getElementById('newQuoteBtn');
        this.elements.favoriteBtn = document.getElementById('favoriteBtn');
        this.elements.shareBtn = document.getElementById('shareBtn');
        this.elements.categoryFilter = document.getElementById('categoryFilter');
        this.elements.themeToggle = document.getElementById('themeToggle');
        this.elements.favoritesSection = document.querySelector('.favorites-section');
        this.elements.favoritesList = document.getElementById('favoritesList');
        this.elements.clearFavoritesBtn = document.getElementById('clearFavoritesBtn');
    }

    // Setup event listeners
    setupEventListeners() {
        // New quote button
        this.elements.newQuoteBtn?.addEventListener('click', () => this.generateNewQuote());
        
        // Category filter
        this.elements.categoryFilter?.addEventListener('change', (e) => {
            this.currentCategory = e.target.value;
            this.generateNewQuote();
        });
        
        // Theme toggle
        this.elements.themeToggle?.addEventListener('click', () => this.toggleTheme());
        
        // Favorite button
        this.elements.favoriteBtn?.addEventListener('click', () => this.toggleFavorite());
        
        // Share button
        this.elements.shareBtn?.addEventListener('click', () => this.shareQuote());
        
        // Clear favorites button
        this.elements.clearFavoritesBtn?.addEventListener('click', () => this.clearAllFavorites());
        
        // Keyboard shortcuts
        document.addEventListener('keydown', (e) => this.handleKeyboardShortcuts(e));
    }

    // Generate and display a new quote
    generateNewQuote() {
        const quote = this.quoteManager.getRandomQuote(this.currentCategory);
        
        if (!quote) {
            this.displayError('No quotes available for this category.');
            return;
        }
        
        this.displayQuote(quote);
        this.updateActionButtons();
        
        // Add subtle animation
        this.animateQuoteChange();
    }

    // Display quote in the UI
    displayQuote(quote) {
        if (!quote || !this.elements.quoteText || !this.elements.quoteAuthor) return;
        
        this.elements.quoteText.textContent = quote.text;
        this.elements.quoteAuthor.textContent = quote.author || 'Unknown';
        this.elements.quoteAuthor.style.display = quote.author ? 'block' : 'none';
    }

    // Display error message
    displayError(message) {
        if (!this.elements.quoteText) return;
        
        this.elements.quoteText.textContent = message;
        this.elements.quoteAuthor.textContent = '';
        this.elements.quoteAuthor.style.display = 'none';
    }

    // Update action buttons visibility and state
    updateActionButtons() {
        const currentQuote = this.quoteManager.getCurrentQuote();
        
        if (currentQuote) {
            // Show action buttons
            this.elements.favoriteBtn.style.display = 'inline-flex';
            this.elements.shareBtn.style.display = 'inline-flex';
            
            // Update favorite button state
            const isFavorite = this.quoteManager.isFavorite(currentQuote);
            this.elements.favoriteBtn.textContent = isFavorite ? '💖 Remove from Favorites' : '❤️ Save to Favorites';
            this.elements.favoriteBtn.classList.toggle('active', isFavorite);
        } else {
            // Hide action buttons
            this.elements.favoriteBtn.style.display = 'none';
            this.elements.shareBtn.style.display = 'none';
        }
    }

    // Toggle favorite status of current quote
    toggleFavorite() {
        const currentQuote = this.quoteManager.getCurrentQuote();
        if (!currentQuote) return;
        
        const isFavorite = this.quoteManager.isFavorite(currentQuote);
        
        if (isFavorite) {
            this.quoteManager.removeFromFavorites(currentQuote);
            this.showNotification('Removed from favorites', 'info');
        } else {
            const added = this.quoteManager.addToFavorites(currentQuote);
            if (added) {
                this.showNotification('Added to favorites!', 'success');
            } else {
                this.showNotification('Quote already in favorites', 'info');
            }
        }
        
        this.updateActionButtons();
        this.updateFavoritesDisplay();
    }

    // Share current quote
    shareQuote() {
        const currentQuote = this.quoteManager.getCurrentQuote();
        if (!currentQuote) return;

        this.shareSpecificQuote(currentQuote);
    }

    // Share a specific quote (used for both current quote and favorites)
    shareSpecificQuote(quote) {
        if (!quote) return;

        const shareText = `"${quote.text}" - ${quote.author}`;

        // Try native Web Share API first
        if (navigator.share) {
            navigator.share({
                title: 'Inspiring Quote',
                text: shareText,
                url: window.location.href
            }).catch(err => console.log('Error sharing:', err));
        } else {
            // Fallback to clipboard
            this.copyToClipboard(shareText);
        }
    }

    // Copy text to clipboard
    async copyToClipboard(text) {
        try {
            await navigator.clipboard.writeText(text);
            this.showNotification('Quote copied to clipboard!', 'success');
        } catch (err) {
            console.error('Failed to copy:', err);
            this.showNotification('Failed to copy quote', 'error');
        }
    }

    // Update favorites display
    updateFavoritesDisplay() {
        const favorites = this.quoteManager.getFavorites();
        
        if (favorites.length === 0) {
            this.elements.favoritesSection.style.display = 'none';
            return;
        }
        
        this.elements.favoritesSection.style.display = 'block';
        this.elements.favoritesList.innerHTML = '';
        
        favorites.forEach((quote, index) => {
            const favoriteItem = document.createElement('div');
            favoriteItem.className = 'favorite-item';
            favoriteItem.innerHTML = `
                <div class="favorite-quote">"${quote.text}" - ${quote.author}</div>
                <div class="favorite-actions">
                    <button class="share-favorite" data-index="${index}" title="Share this quote">📤</button>
                    <button class="remove-favorite" data-index="${index}" title="Remove from favorites">×</button>
                </div>
            `;

            // Add share functionality
            const shareBtn = favoriteItem.querySelector('.share-favorite');
            shareBtn.addEventListener('click', () => {
                this.shareSpecificQuote(quote);
            });

            // Add remove functionality
            const removeBtn = favoriteItem.querySelector('.remove-favorite');
            removeBtn.addEventListener('click', () => {
                this.quoteManager.removeFromFavorites(quote);
                this.updateFavoritesDisplay();
                this.updateActionButtons();
                this.showNotification('Removed from favorites', 'info');
            });

            this.elements.favoritesList.appendChild(favoriteItem);
        });
    }

    // Clear all favorites
    clearAllFavorites() {
        if (confirm('Are you sure you want to clear all favorites? This action cannot be undone.')) {
            this.quoteManager.clearFavorites();
            this.updateFavoritesDisplay();
            this.updateActionButtons();
            this.showNotification('All favorites cleared', 'info');
        }
    }

    // Toggle theme between light and dark
    toggleTheme() {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('quoteGenerator_theme', newTheme);
        
        // Update theme toggle icon
        const themeIcon = this.elements.themeToggle.querySelector('.theme-icon');
        themeIcon.textContent = newTheme === 'dark' ? '☀️' : '🌙';
        
        this.showNotification(`Switched to ${newTheme} mode`, 'info');
    }

    // Load saved theme
    loadTheme() {
        const savedTheme = localStorage.getItem('quoteGenerator_theme') || 'light';
        document.documentElement.setAttribute('data-theme', savedTheme);
        
        // Update theme toggle icon
        const themeIcon = this.elements.themeToggle.querySelector('.theme-icon');
        themeIcon.textContent = savedTheme === 'dark' ? '☀️' : '🌙';
    }

    // Handle keyboard shortcuts
    handleKeyboardShortcuts(e) {
        // Space or Enter: New quote
        if (e.code === 'Space' || e.code === 'Enter') {
            if (e.target.tagName !== 'INPUT' && e.target.tagName !== 'SELECT' && e.target.tagName !== 'BUTTON') {
                e.preventDefault();
                this.generateNewQuote();
            }
        }
        
        // F: Toggle favorite
        if (e.code === 'KeyF' && !e.ctrlKey && !e.metaKey) {
            if (e.target.tagName !== 'INPUT' && e.target.tagName !== 'SELECT') {
                e.preventDefault();
                this.toggleFavorite();
            }
        }
        
        // T: Toggle theme
        if (e.code === 'KeyT' && !e.ctrlKey && !e.metaKey) {
            if (e.target.tagName !== 'INPUT' && e.target.tagName !== 'SELECT') {
                e.preventDefault();
                this.toggleTheme();
            }
        }
    }

    // Animate quote change
    animateQuoteChange() {
        const quoteContainer = document.querySelector('.quote-container');
        if (!quoteContainer) return;
        
        quoteContainer.style.transform = 'scale(0.98)';
        quoteContainer.style.opacity = '0.7';
        
        setTimeout(() => {
            quoteContainer.style.transform = 'scale(1)';
            quoteContainer.style.opacity = '1';
        }, 150);
    }

    // Show notification to user
    showNotification(message, type = 'info') {
        // Create notification element
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.textContent = message;
        
        // Style the notification
        Object.assign(notification.style, {
            position: 'fixed',
            top: '20px',
            right: '20px',
            padding: '12px 20px',
            borderRadius: '8px',
            color: 'white',
            fontWeight: '500',
            zIndex: '1000',
            transform: 'translateX(100%)',
            transition: 'transform 0.3s ease',
            backgroundColor: type === 'success' ? '#38a169' : type === 'error' ? '#e53e3e' : '#3182ce'
        });
        
        document.body.appendChild(notification);
        
        // Animate in
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 10);
        
        // Remove after 3 seconds
        setTimeout(() => {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 300);
        }, 3000);
    }
}

// Initialize the app when the script loads
const app = new QuoteGeneratorApp();
