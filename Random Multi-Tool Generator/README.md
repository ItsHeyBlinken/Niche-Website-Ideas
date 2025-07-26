# 🎲 Multi-Tool Random Generator

A comprehensive single-page web application featuring multiple random generators to help users make decisions, find inspiration, and have fun. Built with vanilla HTML, CSS, and JavaScript for optimal performance and compatibility.

## 🌟 Features

### Core Tools
- **🤔 Random Decision Maker** - Choose from food, activities, movies, or create custom lists
- **💭 Quote Generator** - Inspirational quotes with category filtering (motivation, wisdom, success, life, happiness)
- **🎲 Dice Roller & Coin Flipper** - Roll 1-2 dice or flip coins with animations
- **🎯 Activity Picker** - Discover activities by category (indoor, outdoor, creative, physical, social, learning)
- **🎡 Wheel Spinner** - Add your own options, spin with sound/confetti, and save/load custom wheels

### Advanced Features
- **⭐ Favorites System** - Save favorite quotes and activities using localStorage
- **💾 Save/Load Wheel Presets** - Save your own wheel item sets and reload them anytime
- **🌙 Dark/Light Mode** - Toggle between beautiful dark and light themes (with persistent preference)
- **🎉 Confetti & Sound** - Celebrate wheel wins with confetti and sound effects
- **🦾 Accessibility** - ARIA live regions, keyboard navigation, and high-contrast dark mode
- **📱 Mobile-First Design** - Fully responsive and optimized for all devices
- **🎨 Smooth Animations** - Engaging visual feedback, animated header, and loading states
- **📤 Share Functionality** - Share quotes via native sharing or clipboard
- **💾 Local Storage** - Persistent favorites, wheel presets, and preferences

## 🚀 Getting Started

### Prerequisites
- Any modern web browser
- Local web server (optional, for file:// protocol limitations)

### Installation
1. Clone or download the project files
2. Open `index.html` in your browser, or
3. Serve via local server:
   ```bash
   # Python 3
   python -m http.server 8000
   
   # Python 2
   python -m SimpleHTTPServer 8000
   
   # Node.js
   npx serve .
   ```
4. Navigate to `http://localhost:8000`

## 📁 Project Structure

```
Random Multi-Tool Generator/
├── index.html          # Main HTML structure
├── styles.css          # CSS styling and animations
├── script.js           # JavaScript functionality
└── README.md           # Project documentation
```

## 🎯 Usage

### Decision Maker
1. Select a category (Food, Activities, Movies, or Custom)
2. For custom options, enter choices one per line
3. Click "Make My Decision!" to get a random selection

### Quote Generator
1. Choose a quote category or "All Categories"
2. Click "Get Random Quote" for inspiration
3. Use ⭐ Favorite to save quotes or 📤 Share to share them

### Dice & Coin
1. Switch between Dice Roller and Coin Flipper tabs
2. For dice: select 1 or 2 dice and roll
3. For coins: simply flip for heads or tails

### Activity Picker
1. Select activity type or "All Activities"
2. Click "Suggest Activity!" for recommendations
3. Use ⭐ Favorite to save or ⏭️ Skip for another suggestion

### Wheel Spinner
1. Add your own options or use quick presets
2. Save/load your favorite wheels in the sidebar
3. Click "Spin the Wheel!" for a spinning animation, sound, and confetti
4. Enjoy high-contrast, accessible visuals in both light and dark mode

### Favorites
- Click ⭐ Favorite on quotes and activities to save them
- Access saved items via "⭐ My Favorites" in the footer
- Favorites persist between sessions using localStorage

## 🛠️ Technical Details

### Built With
- **HTML5** - Semantic structure and accessibility
- **CSS3** - Modern styling with Flexbox/Grid, animations, and responsive design
- **Vanilla JavaScript** - No dependencies, pure ES6+ features
- **Google Fonts** - Inter font family for clean typography

### Browser Support
- Chrome/Edge 60+
- Firefox 55+
- Safari 12+
- Mobile browsers (iOS Safari, Chrome Mobile)

### Performance Features
- Lightweight (~15KB total)
- No external dependencies
- Optimized animations using CSS transforms
- Efficient DOM manipulation
- localStorage for data persistence

## 🎨 Customization

### Adding New Categories
Edit the `DATA`, `QUOTES`, or `ACTIVITIES` objects in `script.js`:

```javascript
// Add new food options
DATA.food.push("🥗 New Salad Option");

// Add new quote category
QUOTES.inspiration = [
    { text: "Your quote here", author: "Author Name" }
];
```

### Styling Changes
Modify `styles.css` to customize:
- Color scheme (CSS custom properties recommended)
- Animations and transitions
- Layout and spacing
- Mobile breakpoints
- Dark/light mode colors

## 🚀 Future Enhancements

### Planned Features
- User accounts and cloud sync
- Export results as images
- Daily notifications
- Additional generator types:
  - Random Name Picker
  - Color Generator
  - Affirmation Generator
- Animated spinning wheels
- Social sharing improvements

### Monetization Ready
- Ad placement areas identified
- Premium feature hooks
- Affiliate link integration points
- Analytics tracking ready

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📞 Support

For questions or support, please open an issue in the project repository.

---

Made with ❤️ for decision-makers everywhere!
