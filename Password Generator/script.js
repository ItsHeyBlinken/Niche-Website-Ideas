// Password Generator Tool
class PasswordGenerator {
    constructor() {
        this.initializeElements();
        this.bindEvents();
        this.loadPasswordHistory();
        this.loadUsernameHistory();
        this.generateInitialPassword();
        this.generateInitialUsername();
        this.initTheme();
    }

    initializeElements() {
        // Tab navigation
        this.tabBtns = document.querySelectorAll('.tab-btn');
        this.tabContents = document.querySelectorAll('.tab-content');

        // Theme toggle
        this.themeToggle = document.getElementById('themeToggle');

        // Password display
        this.passwordInput = document.getElementById('generatedPassword');
        this.copyBtn = document.getElementById('copyBtn');
        this.strengthFill = document.getElementById('strengthFill');
        this.strengthText = document.getElementById('strengthText');

        // Username display
        this.usernameInput = document.getElementById('generatedUsername');
        this.copyUsernameBtn = document.getElementById('copyUsernameBtn');
        this.availabilityText = document.getElementById('availabilityText');

        // Password Options
        this.lengthSlider = document.getElementById('lengthSlider');
        this.lengthValue = document.getElementById('lengthValue');
        this.uppercaseCheckbox = document.getElementById('uppercase');
        this.lowercaseCheckbox = document.getElementById('lowercase');
        this.numbersCheckbox = document.getElementById('numbers');
        this.symbolsCheckbox = document.getElementById('symbols');
        this.excludeSimilarCheckbox = document.getElementById('excludeSimilar');
        this.excludeAmbiguousCheckbox = document.getElementById('excludeAmbiguous');

        // Username Options
        this.usernameLengthSlider = document.getElementById('usernameLengthSlider');
        this.usernameLengthValue = document.getElementById('usernameLengthValue');
        this.usernameLowercaseCheckbox = document.getElementById('usernameLowercase');
        this.usernameNumbersCheckbox = document.getElementById('usernameNumbers');
        this.usernameUnderscoresCheckbox = document.getElementById('usernameUnderscores');
        this.usernameDotsCheckbox = document.getElementById('usernameDots');
        this.usernameHyphensCheckbox = document.getElementById('usernameHyphens');
        this.usernameStyleRadios = document.querySelectorAll('input[name="usernameStyle"]');

        // Buttons
        this.generateBtn = document.getElementById('generateBtn');
        this.generateMultipleBtn = document.getElementById('generateMultipleBtn');
        this.clearHistoryBtn = document.getElementById('clearHistoryBtn');
        this.generateUsernameBtn = document.getElementById('generateUsernameBtn');
        this.generateMultipleUsernamesBtn = document.getElementById('generateMultipleUsernamesBtn');
        this.clearUsernameHistoryBtn = document.getElementById('clearUsernameHistoryBtn');

        // History
        this.passwordList = document.getElementById('passwordList');
        this.usernameList = document.getElementById('usernameList');

        // Password Modal
        this.multipleModal = document.getElementById('multipleModal');
        this.closeMultipleBtn = document.getElementById('closeMultiple');
        this.passwordCountInput = document.getElementById('passwordCount');
        this.multiplePasswordsDiv = document.getElementById('multiplePasswords');
        this.copyAllBtn = document.getElementById('copyAllBtn');
        this.generateNewBtn = document.getElementById('generateNewBtn');

        // Username Modal
        this.multipleUsernamesModal = document.getElementById('multipleUsernamesModal');
        this.closeMultipleUsernamesBtn = document.getElementById('closeMultipleUsernames');
        this.usernameCountInput = document.getElementById('usernameCount');
        this.multipleUsernamesDiv = document.getElementById('multipleUsernames');
        this.copyAllUsernamesBtn = document.getElementById('copyAllUsernamesBtn');
        this.generateNewUsernamesBtn = document.getElementById('generateNewUsernamesBtn');

        // Character sets
        this.characterSets = {
            uppercase: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
            lowercase: 'abcdefghijklmnopqrstuvwxyz',
            numbers: '0123456789',
            symbols: '!@#$%^&*()_+-=[]{}|;:,.<>?',
            similar: 'l1IO0',
            ambiguous: '{}[]|\\'
        };

        // Username word lists
        this.usernameWords = {
            adjectives: [
                'Swift', 'Bright', 'Mystic', 'Cosmic', 'Golden', 'Silver', 'Crimson', 'Azure',
                'Vibrant', 'Serene', 'Dynamic', 'Ethereal', 'Radiant', 'Majestic', 'Whimsical', 'Enigmatic',
                'Luminous', 'Tranquil', 'Energetic', 'Mysterious', 'Brilliant', 'Graceful', 'Powerful', 'Charming'
            ],
            nouns: [
                'Phoenix', 'Dragon', 'Wolf', 'Eagle', 'Lion', 'Tiger', 'Bear', 'Shark',
                'Warrior', 'Mage', 'Archer', 'Knight', 'Ninja', 'Samurai', 'Viking', 'Pirate',
                'Star', 'Moon', 'Sun', 'Comet', 'Nova', 'Galaxy', 'Nebula', 'Cosmos'
            ],
            gaming: [
                'Shadow', 'Blade', 'Storm', 'Thunder', 'Fire', 'Ice', 'Light', 'Dark',
                'Hunter', 'Slayer', 'Destroyer', 'Conqueror', 'Legend', 'Hero', 'Villain', 'Master',
                'Elite', 'Pro', 'Gamer', 'Player', 'Killer', 'Winner', 'Champion', 'King'
            ]
        };
    }

    bindEvents() {
        // Tab switching
        this.tabBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                this.switchTab(btn.dataset.tab);
            });
        });

        // Password length slider
        this.lengthSlider.addEventListener('input', (e) => {
            this.lengthValue.textContent = e.target.value;
        });

        // Username length slider
        this.usernameLengthSlider.addEventListener('input', (e) => {
            this.usernameLengthValue.textContent = e.target.value;
        });

        // Password buttons
        this.generateBtn.addEventListener('click', () => {
            this.generatePassword();
        });

        this.copyBtn.addEventListener('click', () => {
            this.copyToClipboard();
        });

        this.generateMultipleBtn.addEventListener('click', () => {
            this.openMultipleModal();
        });

        this.clearHistoryBtn.addEventListener('click', () => {
            this.clearPasswordHistory();
        });

        // Username buttons
        this.generateUsernameBtn.addEventListener('click', () => {
            this.generateUsername();
        });

        this.copyUsernameBtn.addEventListener('click', () => {
            this.copyUsernameToClipboard();
        });

        this.generateMultipleUsernamesBtn.addEventListener('click', () => {
            this.openMultipleUsernamesModal();
        });

        this.clearUsernameHistoryBtn.addEventListener('click', () => {
            this.clearUsernameHistory();
        });

        // Password modal events
        this.closeMultipleBtn.addEventListener('click', () => {
            this.closeMultipleModal();
        });

        this.copyAllBtn.addEventListener('click', () => {
            this.copyAllPasswords();
        });

        this.generateNewBtn.addEventListener('click', () => {
            this.generateMultiplePasswords();
        });

        // Username modal events
        this.closeMultipleUsernamesBtn.addEventListener('click', () => {
            this.closeMultipleUsernamesModal();
        });

        this.copyAllUsernamesBtn.addEventListener('click', () => {
            this.copyAllUsernames();
        });

        this.generateNewUsernamesBtn.addEventListener('click', () => {
            this.generateMultipleUsernames();
        });

        // Close modals when clicking outside
        window.addEventListener('click', (e) => {
            if (e.target === this.multipleModal) {
                this.closeMultipleModal();
            }
            if (e.target === this.multipleUsernamesModal) {
                this.closeMultipleUsernamesModal();
            }
        });

        // Keyboard shortcuts
        document.addEventListener('keydown', (e) => {
            if (e.ctrlKey || e.metaKey) {
                switch (e.key) {
                    case 'Enter':
                        e.preventDefault();
                        if (this.isPasswordTabActive()) {
                            this.generatePassword();
                        } else {
                            this.generateUsername();
                        }
                        break;
                    case 'c':
                        if (this.isPasswordTabActive() && this.passwordInput.value) {
                            e.preventDefault();
                            this.copyToClipboard();
                        } else if (!this.isPasswordTabActive() && this.usernameInput.value) {
                            e.preventDefault();
                            this.copyUsernameToClipboard();
                        }
                        break;
                }
            }
        });
    }

    // Tab Management
    switchTab(tabName) {
        // Update tab buttons
        this.tabBtns.forEach(btn => {
            btn.classList.toggle('active', btn.dataset.tab === tabName);
        });

        // Update tab content
        this.tabContents.forEach(content => {
            content.classList.toggle('active', content.id === `${tabName}-tab`);
        });
    }

    isPasswordTabActive() {
        return document.querySelector('.tab-btn.active').dataset.tab === 'password';
    }

    // Password Generation
    generatePassword() {
        const length = parseInt(this.lengthSlider.value);
        const options = this.getSelectedOptions();
        
        if (!this.hasValidOptions(options)) {
            this.showError('Please select at least one character type!');
            return;
        }

        this.showLoading(true);
        
        // Simulate some processing time for better UX
        setTimeout(() => {
            const password = this.createPassword(length, options);
            this.passwordInput.value = password;
            this.updatePasswordStrength(password);
            this.addToHistory(password);
            this.showLoading(false);
            this.showSuccess('Password generated successfully!');
        }, 300);
    }

    getSelectedOptions() {
        return {
            uppercase: this.uppercaseCheckbox.checked,
            lowercase: this.lowercaseCheckbox.checked,
            numbers: this.numbersCheckbox.checked,
            symbols: this.symbolsCheckbox.checked,
            excludeSimilar: this.excludeSimilarCheckbox.checked,
            excludeAmbiguous: this.excludeAmbiguousCheckbox.checked
        };
    }

    hasValidOptions(options) {
        return options.uppercase || options.lowercase || options.numbers || options.symbols;
    }

    createPassword(length, options) {
        let charset = '';
        let password = '';

        // Build character set based on options
        if (options.uppercase) charset += this.characterSets.uppercase;
        if (options.lowercase) charset += this.characterSets.lowercase;
        if (options.numbers) charset += this.characterSets.numbers;
        if (options.symbols) charset += this.characterSets.symbols;

        // Remove excluded characters
        if (options.excludeSimilar) {
            charset = charset.split('').filter(char => !this.characterSets.similar.includes(char)).join('');
        }
        if (options.excludeAmbiguous) {
            charset = charset.split('').filter(char => !this.characterSets.ambiguous.includes(char)).join('');
        }

        // Ensure at least one character from each selected type
        if (options.uppercase) password += this.getRandomChar(this.characterSets.uppercase);
        if (options.lowercase) password += this.getRandomChar(this.characterSets.lowercase);
        if (options.numbers) password += this.getRandomChar(this.characterSets.numbers);
        if (options.symbols) password += this.getRandomChar(this.characterSets.symbols);

        // Fill remaining length with random characters
        const remainingLength = length - password.length;
        for (let i = 0; i < remainingLength; i++) {
            password += this.getRandomChar(charset);
        }

        // Shuffle the password to avoid predictable patterns
        return this.shuffleString(password);
    }

    getRandomChar(charset) {
        return charset.charAt(Math.floor(Math.random() * charset.length));
    }

    shuffleString(str) {
        const arr = str.split('');
        for (let i = arr.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [arr[i], arr[j]] = [arr[j], arr[i]];
        }
        return arr.join('');
    }

    updatePasswordStrength(password) {
        const strength = this.calculatePasswordStrength(password);
        const { score, label, color } = strength;

        this.strengthFill.style.width = `${score}%`;
        this.strengthFill.style.backgroundColor = color;
        this.strengthText.textContent = label;
    }

    calculatePasswordStrength(password) {
        let score = 0;
        let feedback = [];

        // Length bonus
        if (password.length >= 12) score += 25;
        else if (password.length >= 8) score += 15;
        else score += 5;

        // Character variety bonus
        if (/[a-z]/.test(password)) score += 10;
        if (/[A-Z]/.test(password)) score += 10;
        if (/[0-9]/.test(password)) score += 10;
        if (/[^A-Za-z0-9]/.test(password)) score += 15;

        // Complexity bonus
        if (password.length > 16) score += 10;
        if (password.length > 20) score += 10;

        // Penalties for patterns
        if (/(.)\1{2,}/.test(password)) score -= 10; // Repeated characters
        if (/123|abc|qwe/i.test(password)) score -= 15; // Common sequences

        // Ensure score is within bounds
        score = Math.max(0, Math.min(100, score));

        // Determine strength level
        let label, color;
        if (score >= 80) {
            label = 'Very Strong';
            color = 'var(--strength-very-strong)';
        } else if (score >= 60) {
            label = 'Strong';
            color = 'var(--strength-strong)';
        } else if (score >= 40) {
            label = 'Good';
            color = 'var(--strength-good)';
        } else if (score >= 20) {
            label = 'Fair';
            color = 'var(--strength-fair)';
        } else {
            label = 'Weak';
            color = 'var(--strength-weak)';
        }

        return { score, label, color };
    }

    async copyToClipboard() {
        if (!this.passwordInput.value) {
            this.showError('No password to copy!');
            return;
        }

        try {
            await navigator.clipboard.writeText(this.passwordInput.value);
            this.showSuccess('Password copied to clipboard!');
            
            // Visual feedback
            this.copyBtn.innerHTML = '<span class="copy-icon">✅</span>';
            setTimeout(() => {
                this.copyBtn.innerHTML = '<span class="copy-icon">📋</span>';
            }, 2000);
        } catch (err) {
            // Fallback for older browsers
            this.passwordInput.select();
            document.execCommand('copy');
            this.showSuccess('Password copied to clipboard!');
        }
    }

    addToHistory(password) {
        const history = this.getPasswordHistory();
        
        // Add new password to beginning
        history.unshift({
            password,
            timestamp: new Date().toISOString(),
            strength: this.calculatePasswordStrength(password)
        });

        // Keep only last 20 passwords
        if (history.length > 20) {
            history.pop();
        }

        localStorage.setItem('passwordHistory', JSON.stringify(history));
        this.updatePasswordHistoryDisplay();
    }

    getPasswordHistory() {
        try {
            return JSON.parse(localStorage.getItem('passwordHistory') || '[]');
        } catch {
            return [];
        }
    }

    updatePasswordHistoryDisplay() {
        const history = this.getPasswordHistory();
        
        if (history.length === 0) {
            this.passwordList.innerHTML = '<p class="no-passwords">No passwords generated yet. Generate your first password above!</p>';
            return;
        }

        this.passwordList.innerHTML = history.map((item, index) => `
            <div class="password-item">
                <span class="password-text">${item.password}</span>
                <div class="password-actions">
                    <button onclick="passwordGenerator.copyHistoryItem('${item.password}')" title="Copy">
                        📋
                    </button>
                    <button onclick="passwordGenerator.removeHistoryItem(${index})" title="Remove">
                        🗑️
                    </button>
                </div>
            </div>
        `).join('');
    }

    copyHistoryItem(password) {
        navigator.clipboard.writeText(password).then(() => {
            this.showSuccess('Password copied from history!');
        });
    }

    removeHistoryItem(index) {
        const history = this.getPasswordHistory();
        history.splice(index, 1);
        localStorage.setItem('passwordHistory', JSON.stringify(history));
        this.updatePasswordHistoryDisplay();
    }

    clearPasswordHistory() {
        if (confirm('Are you sure you want to clear all password history?')) {
            localStorage.removeItem('passwordHistory');
            this.updatePasswordHistoryDisplay();
            this.showSuccess('Password history cleared!');
        }
    }

    openMultipleModal() {
        this.multipleModal.style.display = 'block';
        this.generateMultiplePasswords();
    }

    closeMultipleModal() {
        this.multipleModal.style.display = 'none';
    }

    generateMultiplePasswords() {
        const count = parseInt(this.passwordCountInput.value);
        const options = this.getSelectedOptions();
        
        if (!this.hasValidOptions(options)) {
            this.showError('Please select at least one character type!');
            return;
        }

        const length = parseInt(this.lengthSlider.value);
        const passwords = [];

        for (let i = 0; i < count; i++) {
            const password = this.createPassword(length, options);
            passwords.push(password);
        }

        this.displayMultiplePasswords(passwords);
    }

    displayMultiplePasswords(passwords) {
        this.multiplePasswordsDiv.innerHTML = passwords.map((password, index) => `
            <div class="multiple-password-item">
                <span class="multiple-password-text">${password}</span>
                <button class="multiple-password-copy" onclick="passwordGenerator.copyMultiplePassword('${password}')">
                    📋
                </button>
            </div>
        `).join('');
    }

    copyMultiplePassword(password) {
        navigator.clipboard.writeText(password).then(() => {
            this.showSuccess('Password copied!');
        });
    }

    async copyAllPasswords() {
        const passwordElements = this.multiplePasswordsDiv.querySelectorAll('.multiple-password-text');
        const passwords = Array.from(passwordElements).map(el => el.textContent);
        const allPasswords = passwords.join('\n');

        try {
            await navigator.clipboard.writeText(allPasswords);
            this.showSuccess('All passwords copied to clipboard!');
        } catch (err) {
            this.showError('Failed to copy passwords');
        }
    }

    generateInitialPassword() {
        // Generate a default password on page load
        this.generatePassword();
    }

    loadPasswordHistory() {
        this.updatePasswordHistoryDisplay();
    }

    showLoading(show) {
        const btnText = this.generateBtn.querySelector('.btn-text');
        const spinner = this.generateBtn.querySelector('.btn-spinner');
        
        if (show) {
            btnText.style.display = 'none';
            spinner.style.display = 'inline';
            this.generateBtn.disabled = true;
        } else {
            btnText.style.display = 'inline';
            spinner.style.display = 'none';
            this.generateBtn.disabled = false;
        }
    }

    showSuccess(message) {
        this.showNotification(message, 'success');
    }

    showError(message) {
        this.showNotification(message, 'error');
    }

    showNotification(message, type) {
        // Create notification element
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.textContent = message;
        
        // Style the notification
        Object.assign(notification.style, {
            position: 'fixed',
            top: '20px',
            right: '20px',
            padding: '1rem 1.5rem',
            borderRadius: '8px',
            color: 'white',
            fontWeight: '600',
            zIndex: '10000',
            transform: 'translateX(100%)',
            transition: 'transform 0.3s ease',
            backgroundColor: type === 'success' ? '#10b981' : '#ef4444',
            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
        });

        document.body.appendChild(notification);

        // Animate in
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 100);

        // Remove after 3 seconds
        setTimeout(() => {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 300);
        }, 3000);
    }

    // Username Generation
    generateUsername() {
        const length = parseInt(this.usernameLengthSlider.value);
        const options = this.getUsernameOptions();
        const style = this.getUsernameStyle();
        
        if (!this.hasValidUsernameOptions(options)) {
            this.showError('Please select at least one character type!');
            return;
        }

        this.showUsernameLoading(true);
        
        setTimeout(() => {
            const username = this.createUsername(length, options, style);
            this.usernameInput.value = username;
            this.updateUsernameAvailability(username);
            this.addToUsernameHistory(username);
            this.showUsernameLoading(false);
            this.showSuccess('Username generated successfully!');
        }, 300);
    }

    getUsernameOptions() {
        return {
            lowercase: this.usernameLowercaseCheckbox.checked,
            numbers: this.usernameNumbersCheckbox.checked,
            underscores: this.usernameUnderscoresCheckbox.checked,
            dots: this.usernameDotsCheckbox.checked,
            hyphens: this.usernameHyphensCheckbox.checked
        };
    }

    getUsernameStyle() {
        const selectedRadio = document.querySelector('input[name="usernameStyle"]:checked');
        return selectedRadio ? selectedRadio.value : 'random';
    }

    hasValidUsernameOptions(options) {
        return options.lowercase || options.numbers || options.underscores || options.dots || options.hyphens;
    }

    createUsername(length, options, style) {
        let username = '';

        switch (style) {
            case 'adjective-noun':
                username = this.generateAdjectiveNounUsername();
                break;
            case 'name-number':
                username = this.generateNameNumberUsername();
                break;
            case 'gaming':
                username = this.generateGamingUsername();
                break;
            default:
                username = this.generateRandomUsername(length, options);
        }

        // Ensure username meets length requirements
        if (username.length > length) {
            username = username.substring(0, length);
        } else if (username.length < length) {
            username = this.padUsername(username, length, options);
        }

        return username;
    }

    generateAdjectiveNounUsername() {
        const adjective = this.getRandomWord(this.usernameWords.adjectives);
        const noun = this.getRandomWord(this.usernameWords.nouns);
        return adjective.toLowerCase() + noun.toLowerCase();
    }

    generateNameNumberUsername() {
        const names = ['Alex', 'Sam', 'Jordan', 'Taylor', 'Casey', 'Riley', 'Quinn', 'Avery'];
        const name = this.getRandomWord(names);
        const number = Math.floor(Math.random() * 999) + 1;
        return name.toLowerCase() + number;
    }

    generateGamingUsername() {
        const gamingWords = this.usernameWords.gaming;
        const word1 = this.getRandomWord(gamingWords);
        const word2 = this.getRandomWord(gamingWords);
        const number = Math.floor(Math.random() * 999) + 1;
        return word1.toLowerCase() + word2.toLowerCase() + number;
    }

    generateRandomUsername(length, options) {
        let charset = '';
        if (options.lowercase) charset += this.characterSets.lowercase;
        if (options.numbers) charset += this.characterSets.numbers;
        if (options.underscores) charset += '_';
        if (options.dots) charset += '.';
        if (options.hyphens) charset += '-';

        let username = '';
        for (let i = 0; i < length; i++) {
            username += this.getRandomChar(charset);
        }

        return username;
    }

    padUsername(username, targetLength, options) {
        let charset = '';
        if (options.lowercase) charset += this.characterSets.lowercase;
        if (options.numbers) charset += this.characterSets.numbers;
        if (options.underscores) charset += '_';
        if (options.dots) charset += '.';
        if (options.hyphens) charset += '-';

        while (username.length < targetLength) {
            username += this.getRandomChar(charset);
        }

        return username;
    }

    getRandomWord(wordList) {
        return wordList[Math.floor(Math.random() * wordList.length)];
    }

    updateUsernameAvailability(username) {
        // Simulate availability check
        const isAvailable = Math.random() > 0.3; // 70% chance of being available
        const availabilityText = isAvailable ? '✅ Username appears available' : '⚠️ Username may be taken';
        this.availabilityText.textContent = availabilityText;
        this.availabilityText.style.color = isAvailable ? '#10b981' : '#f59e0b';
    }

    // Username History Management
    addToUsernameHistory(username) {
        const history = this.getUsernameHistory();
        
        history.unshift({
            username,
            timestamp: new Date().toISOString(),
            availability: this.availabilityText.textContent
        });

        if (history.length > 20) {
            history.pop();
        }

        localStorage.setItem('usernameHistory', JSON.stringify(history));
        this.updateUsernameHistoryDisplay();
    }

    getUsernameHistory() {
        try {
            return JSON.parse(localStorage.getItem('usernameHistory') || '[]');
        } catch {
            return [];
        }
    }

    updateUsernameHistoryDisplay() {
        const history = this.getUsernameHistory();
        
        if (history.length === 0) {
            this.usernameList.innerHTML = '<p class="no-usernames">No usernames generated yet. Generate your first username above!</p>';
            return;
        }

        this.usernameList.innerHTML = history.map((item, index) => `
            <div class="username-item">
                <span class="username-text">${item.username}</span>
                <div class="username-actions">
                    <button onclick="passwordGenerator.copyUsernameHistoryItem('${item.username}')" title="Copy">
                        📋
                    </button>
                    <button onclick="passwordGenerator.removeUsernameHistoryItem(${index})" title="Remove">
                        🗑️
                    </button>
                </div>
            </div>
        `).join('');
    }

    copyUsernameHistoryItem(username) {
        navigator.clipboard.writeText(username).then(() => {
            this.showSuccess('Username copied from history!');
        });
    }

    removeUsernameHistoryItem(index) {
        const history = this.getUsernameHistory();
        history.splice(index, 1);
        localStorage.setItem('usernameHistory', JSON.stringify(history));
        this.updateUsernameHistoryDisplay();
    }

    clearUsernameHistory() {
        if (confirm('Are you sure you want to clear all username history?')) {
            localStorage.removeItem('usernameHistory');
            this.updateUsernameHistoryDisplay();
            this.showSuccess('Username history cleared!');
        }
    }

    loadUsernameHistory() {
        this.updateUsernameHistoryDisplay();
    }

    generateInitialUsername() {
        this.generateUsername();
    }

    // Username Modal Management
    openMultipleUsernamesModal() {
        this.multipleUsernamesModal.style.display = 'block';
        this.generateMultipleUsernames();
    }

    closeMultipleUsernamesModal() {
        this.multipleUsernamesModal.style.display = 'none';
    }

    generateMultipleUsernames() {
        const count = parseInt(this.usernameCountInput.value);
        const options = this.getUsernameOptions();
        const style = this.getUsernameStyle();
        
        if (!this.hasValidUsernameOptions(options)) {
            this.showError('Please select at least one character type!');
            return;
        }

        const length = parseInt(this.usernameLengthSlider.value);
        const usernames = [];

        for (let i = 0; i < count; i++) {
            const username = this.createUsername(length, options, style);
            usernames.push(username);
        }

        this.displayMultipleUsernames(usernames);
    }

    displayMultipleUsernames(usernames) {
        this.multipleUsernamesDiv.innerHTML = usernames.map((username, index) => `
            <div class="multiple-username-item">
                <span class="multiple-username-text">${username}</span>
                <button class="multiple-username-copy" onclick="passwordGenerator.copyMultipleUsername('${username}')">
                    📋
                </button>
            </div>
        `).join('');
    }

    copyMultipleUsername(username) {
        navigator.clipboard.writeText(username).then(() => {
            this.showSuccess('Username copied!');
        });
    }

    async copyAllUsernames() {
        const usernameElements = this.multipleUsernamesDiv.querySelectorAll('.multiple-username-text');
        const usernames = Array.from(usernameElements).map(el => el.textContent);
        const allUsernames = usernames.join('\n');

        try {
            await navigator.clipboard.writeText(allUsernames);
            this.showSuccess('All usernames copied to clipboard!');
        } catch (err) {
            this.showError('Failed to copy usernames');
        }
    }

    // Username Copy Functionality
    async copyUsernameToClipboard() {
        if (!this.usernameInput.value) {
            this.showError('No username to copy!');
            return;
        }

        try {
            await navigator.clipboard.writeText(this.usernameInput.value);
            this.showSuccess('Username copied to clipboard!');
            
            this.copyUsernameBtn.innerHTML = '<span class="copy-icon">✅</span>';
            setTimeout(() => {
                this.copyUsernameBtn.innerHTML = '<span class="copy-icon">📋</span>';
            }, 2000);
        } catch (err) {
            this.usernameInput.select();
            document.execCommand('copy');
            this.showSuccess('Username copied to clipboard!');
        }
    }

    // Username Loading States
    showUsernameLoading(show) {
        const btnText = this.generateUsernameBtn.querySelector('.btn-text');
        const spinner = this.generateUsernameBtn.querySelector('.btn-spinner');
        
        if (show) {
            btnText.style.display = 'none';
            spinner.style.display = 'inline';
            this.generateUsernameBtn.disabled = true;
        } else {
            btnText.style.display = 'inline';
            spinner.style.display = 'none';
            this.generateUsernameBtn.disabled = false;
        }
    }

    // Theme Management
    initTheme() {
        const savedTheme = localStorage.getItem('theme') || 'light';
        document.documentElement.setAttribute('data-theme', savedTheme);
        this.updateThemeIcon(savedTheme);
        
        this.themeToggle.addEventListener('click', () => {
            this.toggleTheme();
        });
    }

    toggleTheme() {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        this.updateThemeIcon(newTheme);
    }

    updateThemeIcon(theme) {
        const themeIcon = this.themeToggle.querySelector('.theme-icon');
        themeIcon.textContent = theme === 'dark' ? '☀️' : '🌙';
    }
}

// Initialize the password generator when the page loads
let passwordGenerator;
document.addEventListener('DOMContentLoaded', () => {
    passwordGenerator = new PasswordGenerator();
});
