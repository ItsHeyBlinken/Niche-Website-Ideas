// QR Code Generator Tool
class QRCodeGenerator {
    constructor() {
        this.initializeElements();
        this.bindEvents();
        this.loadQRHistory();
        this.initTheme();
        this.currentQRData = null;
    }

    initializeElements() {
        // Input tabs
        this.inputTabs = document.querySelectorAll('.input-tab');
        this.inputContents = document.querySelectorAll('.input-content');

        // Theme toggle
        this.themeToggle = document.getElementById('themeToggle');

        // Input fields
        this.textInput = document.getElementById('textInput');
        this.wifiSSID = document.getElementById('wifiSSID');
        this.wifiPassword = document.getElementById('wifiPassword');
        this.wifiSecurity = document.getElementById('wifiSecurity');
        this.wifiHidden = document.getElementById('wifiHidden');
        this.contactName = document.getElementById('contactName');
        this.contactPhone = document.getElementById('contactPhone');
        this.contactEmail = document.getElementById('contactEmail');
        this.contactCompany = document.getElementById('contactCompany');
        this.contactAddress = document.getElementById('contactAddress');
        this.phoneNumber = document.getElementById('phoneNumber');
        this.emailAddress = document.getElementById('emailAddress');
        this.emailSubject = document.getElementById('emailSubject');
        this.emailBody = document.getElementById('emailBody');

        // QR display
        this.qrPlaceholder = document.getElementById('qrPlaceholder');
        this.qrCanvas = document.getElementById('qrCanvas');
        this.qrActions = document.getElementById('qrActions');

        // Customization options
        this.qrSize = document.getElementById('qrSize');
        this.sizeValue = document.getElementById('sizeValue');
        this.qrForeground = document.getElementById('qrForeground');
        this.qrBackground = document.getElementById('qrBackground');
        this.qrErrorCorrection = document.getElementById('qrErrorCorrection');

        // Buttons
        this.generateBtn = document.getElementById('generateBtn');
        this.downloadBtn = document.getElementById('downloadBtn');
        this.shareBtn = document.getElementById('shareBtn');
        this.clearHistoryBtn = document.getElementById('clearHistoryBtn');

        // History
        this.qrHistory = document.getElementById('qrHistory');
    }

    bindEvents() {
        // Tab switching
        this.inputTabs.forEach(tab => {
            tab.addEventListener('click', () => {
                this.switchTab(tab.dataset.type);
            });
        });

        // Size slider
        this.qrSize.addEventListener('input', (e) => {
            this.sizeValue.textContent = `${e.target.value}px`;
        });

        // Phone number formatting
        this.phoneNumber.addEventListener('input', (e) => {
            this.formatPhoneNumber(e.target);
        });

        // Generate button
        this.generateBtn.addEventListener('click', () => {
            this.generateQRCode();
        });

        // Download button
        this.downloadBtn.addEventListener('click', () => {
            this.downloadQRCode();
        });

        // Share button
        this.shareBtn.addEventListener('click', () => {
            this.shareQRCode();
        });

        // Clear history button
        this.clearHistoryBtn.addEventListener('click', () => {
            this.clearHistory();
        });

        // Color change events
        this.qrForeground.addEventListener('change', () => {
            if (this.currentQRData) {
                this.regenerateQRCode();
            }
        });

        this.qrBackground.addEventListener('change', () => {
            if (this.currentQRData) {
                this.regenerateQRCode();
            }
        });

        // Error correction change
        this.qrErrorCorrection.addEventListener('change', () => {
            if (this.currentQRData) {
                this.regenerateQRCode();
            }
        });

        // Keyboard shortcuts
        document.addEventListener('keydown', (e) => {
            if (e.ctrlKey || e.metaKey) {
                switch (e.key) {
                    case 'Enter':
                        e.preventDefault();
                        this.generateQRCode();
                        break;
                }
            }
        });
    }

    // Tab Management
    switchTab(tabType) {
        // Update tab buttons
        this.inputTabs.forEach(tab => {
            tab.classList.toggle('active', tab.dataset.type === tabType);
        });

        // Update tab content
        this.inputContents.forEach(content => {
            content.classList.toggle('active', content.id === `${tabType}-input`);
        });

        // Clear current QR code when switching tabs
        this.clearQRDisplay();
    }

    // QR Code Generation
    generateQRCode() {
        const activeTab = document.querySelector('.input-tab.active').dataset.type;
        let qrData = '';

        switch (activeTab) {
            case 'text':
                qrData = this.textInput.value.trim();
                break;
            case 'wifi':
                qrData = this.generateWiFiQRData();
                break;
            case 'contact':
                qrData = this.generateContactQRData();
                break;
            case 'phone':
                qrData = this.generatePhoneQRData();
                break;
            case 'email':
                qrData = this.generateEmailQRData();
                break;
        }

        if (!qrData) {
            this.showError('Please enter some content to generate a QR code!');
            return;
        }

        this.showLoading(true);
        
        // Simulate processing time for better UX
        setTimeout(() => {
            try {
                this.createQRCode(qrData, activeTab);
                // Only show success if no error occurred
                if (this.qrCanvas.style.display !== 'none') {
                    this.showSuccess('QR Code generated successfully!');
                }
            } catch (error) {
                console.error('Error in generateQRCode:', error);
                this.showError('Failed to generate QR code. Please try again.');
            } finally {
                this.showLoading(false);
            }
        }, 300);
    }

    generateWiFiQRData() {
        const ssid = this.wifiSSID.value.trim();
        const password = this.wifiPassword.value.trim();
        const security = this.wifiSecurity.value;
        const hidden = this.wifiHidden.checked;

        if (!ssid) {
            this.showError('Please enter a WiFi network name!');
            return '';
        }

        let qrData = `WIFI:S:${this.escapeSpecialChars(ssid)};`;
        
        if (security !== 'nopass') {
            qrData += `T:${security};P:${this.escapeSpecialChars(password)};`;
        }
        
        if (hidden) {
            qrData += 'H:true;';
        }
        
        qrData += ';;';
        
        return qrData;
    }

    generateContactQRData() {
        const name = this.contactName.value.trim();
        const phone = this.contactPhone.value.trim();
        const email = this.contactEmail.value.trim();
        const company = this.contactCompany.value.trim();
        const address = this.contactAddress.value.trim();

        if (!name) {
            this.showError('Please enter a contact name!');
            return '';
        }

        let qrData = 'BEGIN:VCARD\nVERSION:3.0\n';
        qrData += `FN:${name}\n`;
        
        if (phone) qrData += `TEL:${phone}\n`;
        if (email) qrData += `EMAIL:${email}\n`;
        if (company) qrData += `ORG:${company}\n`;
        if (address) qrData += `ADR:;;${address}\n`;
        
        qrData += 'END:VCARD';
        
        return qrData;
    }

    generatePhoneQRData() {
        const phone = this.phoneNumber.value.trim();
        
        if (!phone) {
            this.showError('Please enter a phone number!');
            return '';
        }

        // Clean the phone number for the tel: link (remove formatting characters)
        const cleanPhone = phone.replace(/\D/g, '');
        
        // Add country code if not present (assume US)
        let formattedPhone = cleanPhone;
        if (cleanPhone.length === 10) {
            formattedPhone = `+1${cleanPhone}`;
        } else if (cleanPhone.length === 11 && cleanPhone.startsWith('1')) {
            formattedPhone = `+${cleanPhone}`;
        } else if (cleanPhone.length > 0) {
            formattedPhone = `+${cleanPhone}`;
        }

        return `tel:${formattedPhone}`;
    }

    generateEmailQRData() {
        const email = this.emailAddress.value.trim();
        const subject = this.emailSubject.value.trim();
        const body = this.emailBody.value.trim();

        if (!email) {
            this.showError('Please enter an email address!');
            return '';
        }

        let qrData = `mailto:${email}`;
        const params = [];
        
        if (subject) params.push(`subject=${encodeURIComponent(subject)}`);
        if (body) params.push(`body=${encodeURIComponent(body)}`);
        
        if (params.length > 0) {
            qrData += `?${params.join('&')}`;
        }
        
        return qrData;
    }

    escapeSpecialChars(str) {
        return str.replace(/[;:,]/g, '\\$&');
    }

    createQRCode(data, type) {
        const size = parseInt(this.qrSize.value);
        const foreground = this.qrForeground.value;
        const background = this.qrBackground.value;
        const errorCorrection = this.qrErrorCorrection.value;

        // Store current QR data for regeneration
        this.currentQRData = { data, type, size, foreground, background, errorCorrection };

        try {
            // Clear the canvas first
            this.qrCanvas.width = size;
            this.qrCanvas.height = size;
            const ctx = this.qrCanvas.getContext('2d');
            ctx.clearRect(0, 0, size, size);

            // Create a temporary container for the jQuery plugin
            const tempContainer = document.createElement('div');
            tempContainer.style.width = size + 'px';
            tempContainer.style.height = size + 'px';
            
            // Use jQuery QR Code plugin to generate QR code
            $(tempContainer).qrcode({
                text: data,
                width: size,
                height: size,
                colorDark: foreground,
                colorLight: background,
                correctLevel: this.getCorrectLevel(errorCorrection)
            });
            
            // Get the generated canvas from the temporary container
            const generatedCanvas = tempContainer.querySelector('canvas');
            if (generatedCanvas) {
                // Copy the generated QR code to our main canvas
                const mainCtx = this.qrCanvas.getContext('2d');
                mainCtx.drawImage(generatedCanvas, 0, 0);
                
                // Show QR code and hide placeholder
                this.qrPlaceholder.style.display = 'none';
                this.qrCanvas.style.display = 'block';
                this.qrActions.style.display = 'flex';
                
                // Add to history
                this.addToHistory(data, type, size);
            } else {
                throw new Error('Failed to generate QR code canvas');
            }

        } catch (error) {
            console.error('QR Code generation error:', error);
            this.showError('Failed to generate QR code. Please try with different content or settings.');
        }
    }

    getCorrectLevel(level) {
        const levels = { 'L': 0, 'M': 1, 'Q': 2, 'H': 3 };
        return levels[level] || 1; // Default to Medium
    }

    regenerateQRCode() {
        if (this.currentQRData) {
            this.createQRCode(
                this.currentQRData.data,
                this.currentQRData.type
            );
        }
    }

    // Download Functionality
    downloadQRCode() {
        if (!this.currentQRData) {
            this.showError('No QR code to download!');
            return;
        }

        const link = document.createElement('a');
        link.download = `qr-code-${this.currentQRData.type}-${Date.now()}.png`;
        link.href = this.qrCanvas.toDataURL();
        link.click();

        this.showSuccess('QR Code downloaded successfully!');
    }

    // Share Functionality
    shareQRCode() {
        if (!this.currentQRData) {
            this.showError('No QR code to share!');
            return;
        }

        if (navigator.share) {
            // Use native sharing if available
            navigator.share({
                title: 'QR Code',
                text: `QR Code for ${this.currentQRData.type}`,
                files: [this.canvasToBlob()]
            }).catch(err => {
                console.log('Sharing failed:', err);
                this.fallbackShare();
            });
        } else {
            this.fallbackShare();
        }
    }

    fallbackShare() {
        // Fallback: copy to clipboard or show share options
        this.qrCanvas.toBlob((blob) => {
            const url = URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.download = `qr-code-${this.currentQRData.type}-${Date.now()}.png`;
            link.click();
            URL.revokeObjectURL(url);
        });
    }

    canvasToBlob() {
        return new Promise(resolve => {
            this.qrCanvas.toBlob(resolve, 'image/png');
        });
    }

    // History Management
    addToHistory(data, type, size) {
        const history = this.getQRHistory();
        
        // Create thumbnail for history
        const thumbnail = this.createThumbnail(data, size);
        
        history.unshift({
            id: Date.now(),
            data,
            type,
            size,
            timestamp: new Date().toISOString(),
            thumbnail
        });

        // Keep only last 20 QR codes
        if (history.length > 20) {
            history.pop();
        }

        localStorage.setItem('qrHistory', JSON.stringify(history));
        this.updateHistoryDisplay();
    }

    createThumbnail(data, size) {
        // Create a small canvas for thumbnail
        const canvas = document.createElement('canvas');
        canvas.width = 40;
        canvas.height = 40;
        
        // Create a temporary container for the jQuery plugin
        const tempContainer = document.createElement('div');
        tempContainer.style.width = '40px';
        tempContainer.style.height = '40px';
        
        // Generate small QR code for thumbnail using jQuery plugin
        $(tempContainer).qrcode({
            text: data,
            width: 40,
            height: 40,
            colorDark: this.qrForeground.value,
            colorLight: this.qrBackground.value
        });
        
        // Get the generated canvas and copy it to our thumbnail canvas
        const generatedCanvas = tempContainer.querySelector('canvas');
        if (generatedCanvas) {
            const ctx = canvas.getContext('2d');
            ctx.drawImage(generatedCanvas, 0, 0);
        }

        return canvas.toDataURL();
    }

    getQRHistory() {
        try {
            return JSON.parse(localStorage.getItem('qrHistory') || '[]');
        } catch {
            return [];
        }
    }

    updateHistoryDisplay() {
        const history = this.getQRHistory();
        
        if (history.length === 0) {
            this.qrHistory.innerHTML = '<p class="no-history">No QR codes generated yet. Generate your first QR code above!</p>';
            return;
        }

        this.qrHistory.innerHTML = history.map(item => `
            <div class="qr-history-item">
                <div class="qr-history-content">
                    <img src="${item.thumbnail}" alt="QR Code" class="qr-history-thumbnail">
                    <div class="qr-history-text">
                        <div class="qr-history-title">${this.getHistoryTitle(item)}</div>
                        <div class="qr-history-subtitle">${item.type} • ${item.size}px • ${this.formatDate(item.timestamp)}</div>
                    </div>
                </div>
                <div class="qr-history-actions">
                    <button onclick="qrGenerator.regenerateFromHistory(${item.id})" title="Regenerate">
                        🔄
                    </button>
                    <button onclick="qrGenerator.downloadFromHistory(${item.id})" title="Download">
                        💾
                    </button>
                    <button onclick="qrGenerator.removeFromHistory(${item.id})" title="Remove">
                        🗑️
                    </button>
                </div>
            </div>
        `).join('');
    }

    getHistoryTitle(item) {
        const maxLength = 30;
        let title = '';
        
        switch (item.type) {
            case 'text':
                title = item.data.length > maxLength ? item.data.substring(0, maxLength) + '...' : item.data;
                break;
            case 'wifi':
                const ssid = item.data.match(/S:([^;]+)/);
                title = ssid ? `WiFi: ${ssid[1]}` : 'WiFi Network';
                break;
            case 'contact':
                const name = item.data.match(/FN:([^\n]+)/);
                title = name ? `Contact: ${name[1]}` : 'Contact Info';
                break;
            case 'phone':
                const phone = item.data.replace('tel:', '');
                title = `Phone: ${phone}`;
                break;
            case 'email':
                const email = item.data.match(/mailto:([^?]+)/);
                title = email ? `Email: ${email[1]}` : 'Email';
                break;
            default:
                title = `${item.type} QR Code`;
        }
        
        return title;
    }

    formatDate(timestamp) {
        const date = new Date(timestamp);
        const now = new Date();
        const diff = now - date;
        
        if (diff < 60000) return 'Just now';
        if (diff < 3600000) return `${Math.floor(diff / 60000)}m ago`;
        if (diff < 86400000) return `${Math.floor(diff / 3600000)}h ago`;
        return date.toLocaleDateString();
    }

    regenerateFromHistory(id) {
        const history = this.getQRHistory();
        const item = history.find(h => h.id === id);
        
        if (item) {
            // Switch to appropriate tab
            this.switchTab(item.type);
            
            // Fill in the form data
            this.fillFormFromHistory(item);
            
            // Regenerate QR code
            this.createQRCode(item.data, item.type);
            
            this.showSuccess('QR Code regenerated from history!');
        }
    }

    fillFormFromHistory(item) {
        switch (item.type) {
            case 'text':
                this.textInput.value = item.data;
                break;
            case 'wifi':
                const ssidMatch = item.data.match(/S:([^;]+)/);
                const passwordMatch = item.data.match(/P:([^;]+)/);
                const securityMatch = item.data.match(/T:([^;]+)/);
                const hiddenMatch = item.data.match(/H:true/);
                
                if (ssidMatch) this.wifiSSID.value = ssidMatch[1].replace(/\\/g, '');
                if (passwordMatch) this.wifiPassword.value = passwordMatch[1].replace(/\\/g, '');
                if (securityMatch) this.wifiSecurity.value = securityMatch[1];
                this.wifiHidden.checked = !!hiddenMatch;
                break;
            case 'contact':
                const nameMatch = item.data.match(/FN:([^\n]+)/);
                const phoneMatch = item.data.match(/TEL:([^\n]+)/);
                const emailMatch = item.data.match(/EMAIL:([^\n]+)/);
                const companyMatch = item.data.match(/ORG:([^\n]+)/);
                const addressMatch = item.data.match(/ADR:;;([^\n]+)/);
                
                if (nameMatch) this.contactName.value = nameMatch[1];
                if (phoneMatch) this.contactPhone.value = phoneMatch[1];
                if (emailMatch) this.contactEmail.value = emailMatch[1];
                if (companyMatch) this.contactCompany.value = companyMatch[1];
                if (addressMatch) this.contactAddress.value = addressMatch[1];
                break;
            case 'phone':
                this.phoneNumber.value = item.data.replace('tel:', '');
                break;
            case 'email':
                const emailAddrMatch = item.data.match(/mailto:([^?]+)/);
                const subjectMatch = item.data.match(/subject=([^&]+)/);
                const bodyMatch = item.data.match(/body=([^&]+)/);
                
                if (emailAddrMatch) this.emailAddress.value = emailAddrMatch[1];
                if (subjectMatch) this.emailSubject.value = decodeURIComponent(subjectMatch[1]);
                if (bodyMatch) this.emailBody.value = decodeURIComponent(bodyMatch[1]);
                break;
        }
    }

    downloadFromHistory(id) {
        const history = this.getQRHistory();
        const item = history.find(h => h.id === id);
        
        if (item) {
            // Regenerate QR code temporarily for download
            const tempCanvas = document.createElement('canvas');
            tempCanvas.width = item.size;
            tempCanvas.height = item.size;
            
            // Create a temporary container for the jQuery plugin
            const tempContainer = document.createElement('div');
            tempContainer.style.width = item.size + 'px';
            tempContainer.style.height = item.size + 'px';
            
            $(tempContainer).qrcode({
                text: item.data,
                width: item.size,
                height: item.size,
                colorDark: this.qrForeground.value,
                colorLight: this.qrBackground.value
            });
            
            // Get the generated canvas and copy it to our download canvas
            const generatedCanvas = tempContainer.querySelector('canvas');
            if (generatedCanvas) {
                const ctx = tempCanvas.getContext('2d');
                ctx.drawImage(generatedCanvas, 0, 0);
                
                const link = document.createElement('a');
                link.download = `qr-code-${item.type}-${item.id}.png`;
                link.href = tempCanvas.toDataURL();
                link.click();

                this.showSuccess('QR Code downloaded from history!');
            } else {
                this.showError('Failed to generate QR code for download');
            }
        }
    }

    removeFromHistory(id) {
        if (confirm('Are you sure you want to remove this QR code from history?')) {
            const history = this.getQRHistory();
            const filteredHistory = history.filter(h => h.id !== id);
            localStorage.setItem('qrHistory', JSON.stringify(filteredHistory));
            this.updateHistoryDisplay();
            this.showSuccess('QR Code removed from history!');
        }
    }

    clearHistory() {
        if (confirm('Are you sure you want to clear all QR code history?')) {
            localStorage.removeItem('qrHistory');
            this.updateHistoryDisplay();
            this.showSuccess('QR Code history cleared!');
        }
    }

    loadQRHistory() {
        this.updateHistoryDisplay();
    }

    // Utility Functions
    clearQRDisplay() {
        this.qrPlaceholder.style.display = 'flex';
        this.qrCanvas.style.display = 'none';
        this.qrActions.style.display = 'none';
        this.currentQRData = null;
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
        // Remove any existing notifications first
        const existingNotifications = document.querySelectorAll('.notification');
        existingNotifications.forEach(notification => {
            notification.classList.remove('show');
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.parentNode.removeChild(notification);
                }
            }, 300);
        });

        // Create notification element
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.textContent = message;
        
        document.body.appendChild(notification);

        // Animate in
        setTimeout(() => {
            notification.classList.add('show');
        }, 100);

        // Remove after 3 seconds
        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.parentNode.removeChild(notification);
                }
            }, 300);
        }, 3000);
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

    // Phone Number Formatting
    formatPhoneNumber(input) {
        let phone = input.value.replace(/\D/g, ''); // Remove all non-digit characters
        let formattedPhone = '';

        if (phone.length > 0) {
            // Handle international numbers (starting with 1 for US)
            if (phone.startsWith('1') && phone.length > 10) {
                phone = phone.substring(1); // Remove country code for formatting
            }
            
            if (phone.length < 4) {
                formattedPhone = phone;
            } else if (phone.length < 7) {
                formattedPhone = `(${phone.substring(0, 3)}) ${phone.substring(3)}`;
            } else if (phone.length < 10) {
                formattedPhone = `(${phone.substring(0, 3)}) ${phone.substring(3, 6)}-${phone.substring(6)}`;
            } else {
                formattedPhone = `(${phone.substring(0, 3)}) ${phone.substring(3, 6)}-${phone.substring(6, 10)}`;
                if (phone.length > 10) {
                    formattedPhone += ` x${phone.substring(10)}`;
                }
            }
        }
        input.value = formattedPhone;
    }
}

// Initialize the QR code generator when the page loads
let qrGenerator;

// Simple initialization - wait for jQuery and the plugin to be ready
function initializeQRGenerator() {
    // Check if jQuery and the QR code plugin are loaded
    if (typeof $ !== 'undefined' && typeof $.fn.qrcode !== 'undefined') {
        qrGenerator = new QRCodeGenerator();
        console.log('QR Code Generator initialized successfully!');
    } else {
        // Wait a bit and try again
        setTimeout(initializeQRGenerator, 100);
    }
}

document.addEventListener('DOMContentLoaded', initializeQRGenerator);
