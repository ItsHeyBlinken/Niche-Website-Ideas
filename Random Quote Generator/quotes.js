// Comprehensive quotes database organized by categories
const quotesDatabase = {
    inspirational: [
        {
            text: "The only way to do great work is to love what you do.",
            author: "Steve Jobs"
        },
        {
            text: "Life is what happens to you while you're busy making other plans.",
            author: "John Lennon"
        },
        {
            text: "The future belongs to those who believe in the beauty of their dreams.",
            author: "Eleanor Roosevelt"
        },
        {
            text: "It is during our darkest moments that we must focus to see the light.",
            author: "Aristotle"
        },
        {
            text: "The only impossible journey is the one you never begin.",
            author: "Tony Robbins"
        },
        {
            text: "In the middle of difficulty lies opportunity.",
            author: "Albert Einstein"
        },
        {
            text: "Success is not final, failure is not fatal: it is the courage to continue that counts.",
            author: "Winston Churchill"
        },
        {
            text: "The way to get started is to quit talking and begin doing.",
            author: "Walt Disney"
        },
        {
            text: "Don't let yesterday take up too much of today.",
            author: "Will Rogers"
        },
        {
            text: "You learn more from failure than from success. Don't let it stop you. Failure builds character.",
            author: "Unknown"
        }
    ],
    funny: [
        {
            text: "I'm not arguing, I'm just explaining why I'm right.",
            author: "Unknown"
        },
        {
            text: "I told my wife she was drawing her eyebrows too high. She looked surprised.",
            author: "Unknown"
        },
        {
            text: "The early bird might get the worm, but the second mouse gets the cheese.",
            author: "Unknown"
        },
        {
            text: "I haven't slept for ten days, because that would be too long.",
            author: "Mitch Hedberg"
        },
        {
            text: "I'm reading a book about anti-gravity. It's impossible to put down!",
            author: "Unknown"
        },
        {
            text: "Why don't scientists trust atoms? Because they make up everything!",
            author: "Unknown"
        },
        {
            text: "I used to hate facial hair, but then it grew on me.",
            author: "Unknown"
        },
        {
            text: "I'm on a seafood diet. I see food and I eat it.",
            author: "Unknown"
        },
        {
            text: "Time flies like an arrow; fruit flies like a banana.",
            author: "Anthony G. Oettinger"
        },
        {
            text: "I intend to live forever. So far, so good.",
            author: "Steven Wright"
        }
    ],
    tech: [
        {
            text: "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
            author: "Martin Fowler"
        },
        {
            text: "First, solve the problem. Then, write the code.",
            author: "John Johnson"
        },
        {
            text: "Experience is the name everyone gives to their mistakes.",
            author: "Oscar Wilde"
        },
        {
            text: "In order to understand recursion, one must first understand recursion.",
            author: "Unknown"
        },
        {
            text: "There are only two hard things in Computer Science: cache invalidation and naming things.",
            author: "Phil Karlton"
        },
        {
            text: "Code is like humor. When you have to explain it, it's bad.",
            author: "Cory House"
        },
        {
            text: "Programming isn't about what you know; it's about what you can figure out.",
            author: "Chris Pine"
        },
        {
            text: "The best error message is the one that never shows up.",
            author: "Thomas Fuchs"
        },
        {
            text: "Simplicity is the ultimate sophistication.",
            author: "Leonardo da Vinci"
        },
        {
            text: "Talk is cheap. Show me the code.",
            author: "Linus Torvalds"
        }
    ],
    wisdom: [
        {
            text: "The only true wisdom is in knowing you know nothing.",
            author: "Socrates"
        },
        {
            text: "The unexamined life is not worth living.",
            author: "Socrates"
        },
        {
            text: "We are what we repeatedly do. Excellence, then, is not an act, but a habit.",
            author: "Aristotle"
        },
        {
            text: "The only constant in life is change.",
            author: "Heraclitus"
        },
        {
            text: "Yesterday is history, tomorrow is a mystery, today is a gift of God, which is why we call it the present.",
            author: "Bill Keane"
        },
        {
            text: "Be yourself; everyone else is already taken.",
            author: "Oscar Wilde"
        },
        {
            text: "Two things are infinite: the universe and human stupidity; and I'm not sure about the universe.",
            author: "Albert Einstein"
        },
        {
            text: "A room without books is like a body without a soul.",
            author: "Marcus Tullius Cicero"
        },
        {
            text: "Be the change that you wish to see in the world.",
            author: "Mahatma Gandhi"
        },
        {
            text: "In three words I can sum up everything I've learned about life: it goes on.",
            author: "Robert Frost"
        }
    ],
    sassy: [
        {
            text: "I'm not bossy, I just have better ideas.",
            author: "Unknown"
        },
        {
            text: "I'm not short, I'm concentrated awesome.",
            author: "Unknown"
        },
        {
            text: "I don't have an attitude problem. You have a perception problem.",
            author: "Unknown"
        },
        {
            text: "I'm not weird, I'm limited edition.",
            author: "Unknown"
        },
        {
            text: "I'm not lazy, I'm on energy saving mode.",
            author: "Unknown"
        },
        {
            text: "I'm not arguing, I'm just passionately expressing my point of view.",
            author: "Unknown"
        },
        {
            text: "I don't need your approval to be me.",
            author: "Unknown"
        },
        {
            text: "I'm not perfect, but I'm limited edition.",
            author: "Unknown"
        },
        {
            text: "I'm not stubborn, my way is just better.",
            author: "Unknown"
        },
        {
            text: "I'm not always right, but I'm never wrong.",
            author: "Unknown"
        }
    ]
};

// Quote management functions
class QuoteManager {
    constructor() {
        this.currentQuote = null;
        this.favorites = this.loadFavorites();
    }

    // Get all quotes from all categories
    getAllQuotes() {
        const allQuotes = [];
        for (const category in quotesDatabase) {
            quotesDatabase[category].forEach(quote => {
                allQuotes.push({
                    ...quote,
                    category: category
                });
            });
        }
        return allQuotes;
    }

    // Get quotes by category
    getQuotesByCategory(category) {
        if (category === 'all') {
            return this.getAllQuotes();
        }
        return quotesDatabase[category] ? quotesDatabase[category].map(quote => ({
            ...quote,
            category: category
        })) : [];
    }

    // Get a random quote from specified category
    getRandomQuote(category = 'all') {
        const quotes = this.getQuotesByCategory(category);
        if (quotes.length === 0) return null;
        
        const randomIndex = Math.floor(Math.random() * quotes.length);
        this.currentQuote = quotes[randomIndex];
        return this.currentQuote;
    }

    // Save quote to favorites
    addToFavorites(quote) {
        if (!quote) return false;
        
        // Check if quote is already in favorites
        const isAlreadyFavorite = this.favorites.some(fav => 
            fav.text === quote.text && fav.author === quote.author
        );
        
        if (!isAlreadyFavorite) {
            this.favorites.push({
                ...quote,
                dateAdded: new Date().toISOString()
            });
            this.saveFavorites();
            return true;
        }
        return false;
    }

    // Remove quote from favorites
    removeFromFavorites(quote) {
        this.favorites = this.favorites.filter(fav => 
            !(fav.text === quote.text && fav.author === quote.author)
        );
        this.saveFavorites();
    }

    // Get all favorite quotes
    getFavorites() {
        return this.favorites;
    }

    // Clear all favorites
    clearFavorites() {
        this.favorites = [];
        this.saveFavorites();
    }

    // Check if quote is in favorites
    isFavorite(quote) {
        if (!quote) return false;
        return this.favorites.some(fav => 
            fav.text === quote.text && fav.author === quote.author
        );
    }

    // Load favorites from localStorage
    loadFavorites() {
        try {
            const saved = localStorage.getItem('quoteGenerator_favorites');
            return saved ? JSON.parse(saved) : [];
        } catch (error) {
            console.error('Error loading favorites:', error);
            return [];
        }
    }

    // Save favorites to localStorage
    saveFavorites() {
        try {
            localStorage.setItem('quoteGenerator_favorites', JSON.stringify(this.favorites));
        } catch (error) {
            console.error('Error saving favorites:', error);
        }
    }

    // Get current quote
    getCurrentQuote() {
        return this.currentQuote;
    }

    // Get quote statistics
    getStats() {
        const allQuotes = this.getAllQuotes();
        const stats = {
            total: allQuotes.length,
            byCategory: {}
        };
        
        for (const category in quotesDatabase) {
            stats.byCategory[category] = quotesDatabase[category].length;
        }
        
        return stats;
    }
}

// Export for use in main script
window.QuoteManager = QuoteManager;
