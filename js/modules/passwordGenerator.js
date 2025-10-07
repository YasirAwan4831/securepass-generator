// Password Generator Module
class PasswordGenerator {
    constructor() {
        this.characterSets = {
            uppercase: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
            lowercase: 'abcdefghijklmnopqrstuvwxyz',
            numbers: '0123456789',
            symbols: '!@#$%^&*()_+-=[]{}|;:,.<>?'
        };

        this.excludedSimilar = 'il1Lo0O';
        this.excludedAmbiguous = '{}[]()/\\\'"`~,;:.<> ';

        this.history = this.loadHistory();
        this.init();
    }

    init() {
        this.bindEvents();
        this.generatePassword(); // Generate initial password
    }

    bindEvents() {
        const generateBtn = document.getElementById('generateBtn');
        const refreshBtn = document.getElementById('refreshBtn');
        const lengthSlider = document.getElementById('passwordLength');
        const settingsInputs = document.querySelectorAll('input[type="checkbox"], input[type="range"]');

        if (generateBtn) {
            generateBtn.addEventListener('click', () => this.generatePassword());
        }

        if (refreshBtn) {
            refreshBtn.addEventListener('click', () => this.generatePassword());
        }

        if (lengthSlider) {
            lengthSlider.addEventListener('input', (e) => {
                document.getElementById('lengthValue').textContent = e.target.value;
                this.generatePassword();
            });
        }

        // Debounced settings change handler
        const debouncedGenerate = Helpers.debounce(() => this.generatePassword(), 300);
        settingsInputs.forEach(input => {
            input.addEventListener('change', debouncedGenerate);
        });
    }

    getActiveCharacterSets() {
        const sets = [];
        
        if (document.getElementById('uppercase')?.checked) {
            sets.push(this.characterSets.uppercase);
        }
        if (document.getElementById('lowercase')?.checked) {
            sets.push(this.characterSets.lowercase);
        }
        if (document.getElementById('numbers')?.checked) {
            sets.push(this.characterSets.numbers);
        }
        if (document.getElementById('symbols')?.checked) {
            sets.push(this.characterSets.symbols);
        }

        // If no sets are selected, use lowercase as default
        if (sets.length === 0) {
            sets.push(this.characterSets.lowercase);
        }

        return sets;
    }

    applyExclusions(characters) {
        let filteredCharacters = characters;

        if (document.getElementById('excludeSimilar')?.checked) {
            filteredCharacters = filteredCharacters.split('')
                .filter(char => !this.excludedSimilar.includes(char))
                .join('');
        }

        if (document.getElementById('excludeAmbiguous')?.checked) {
            filteredCharacters = filteredCharacters.split('')
                .filter(char => !this.excludedAmbiguous.includes(char))
                .join('');
        }

        return filteredCharacters;
    }

    generatePassword() {
        const length = parseInt(document.getElementById('passwordLength').value) || 12;
        const characterSets = this.getActiveCharacterSets();
        
        if (characterSets.length === 0) {
            this.displayPassword('Please select at least one character type');
            return;
        }

        let allCharacters = characterSets.join('');
        allCharacters = this.applyExclusions(allCharacters);

        if (allCharacters.length === 0) {
            this.displayPassword('No characters available with current settings');
            return;
        }

        let password = '';
        const sets = characterSets.map(set => this.applyExclusions(set));

        // Ensure at least one character from each selected set
        sets.forEach(set => {
            if (set.length > 0) {
                password += set[Math.floor(Math.random() * set.length)];
            }
        });

        // Fill the rest with random characters from all sets
        while (password.length < length) {
            const randomChar = allCharacters[Math.floor(Math.random() * allCharacters.length)];
            password += randomChar;
        }

        // Shuffle the password to mix the guaranteed characters
        password = Helpers.shuffleArray(password.split('')).join('').slice(0, length);

        this.displayPassword(password);
        this.addToHistory(password);
    }

    displayPassword(password) {
        const resultElement = document.getElementById('passwordResult');
        if (resultElement) {
            resultElement.value = password;
            
            // Update strength indicator
            if (window.strengthChecker) {
                const settings = this.getCurrentSettings();
                window.strengthChecker.updateStrengthDisplay(password, settings);
            }
        }
    }

    getCurrentSettings() {
        return {
            length: parseInt(document.getElementById('passwordLength').value),
            uppercase: document.getElementById('uppercase').checked,
            lowercase: document.getElementById('lowercase').checked,
            numbers: document.getElementById('numbers').checked,
            symbols: document.getElementById('symbols').checked,
            excludeSimilar: document.getElementById('excludeSimilar').checked,
            excludeAmbiguous: document.getElementById('excludeAmbiguous').checked
        };
    }

    loadHistory() {
        return Helpers.loadFromStorage('passwordHistory') || [];
    }

    saveHistory() {
        Helpers.saveToStorage('passwordHistory', this.history);
    }

    addToHistory(password) {
        const timestamp = new Date().toISOString();
        const historyItem = {
            password: password,
            timestamp: timestamp,
            strength: window.strengthChecker?.calculateStrength(password)?.name || 'Unknown'
        };

        this.history.unshift(historyItem);
        
        // Keep only last 50 items
        if (this.history.length > 50) {
            this.history = this.history.slice(0, 50);
        }

        this.saveHistory();
        this.updateHistoryDisplay();
    }

    updateHistoryDisplay() {
        const historyList = document.getElementById('historyList');
        if (!historyList) return;

        historyList.innerHTML = this.history.map(item => `
            <li class="history-item">
                <span class="history-password">${item.password}</span>
                <div class="history-details">
                    <small class="history-strength ${item.strength.toLowerCase().replace(' ', '-')}">
                        ${item.strength}
                    </small>
                    <small class="history-time">
                        ${new Date(item.timestamp).toLocaleTimeString()}
                    </small>
                </div>
            </li>
        `).join('');
    }

    clearHistory() {
        this.history = [];
        this.saveHistory();
        this.updateHistoryDisplay();
    }

    // Advanced generation methods
    generateMemorablePassword(wordCount = 4, separator = '-') {
        const words = [
            'apple', 'brave', 'cloud', 'dragon', 'eagle', 'flame', 'globe', 'heart',
            'ice', 'jewel', 'king', 'light', 'moon', 'night', 'ocean', 'peace',
            'queen', 'river', 'star', 'tree', 'unity', 'voice', 'water', 'xray',
            'young', 'zenith'
        ];

        const selectedWords = [];
        for (let i = 0; i < wordCount; i++) {
            selectedWords.push(words[Math.floor(Math.random() * words.length)]);
        }

        return selectedWords.join(separator) + Math.floor(Math.random() * 100);
    }

    generatePinCode(length = 6) {
        let pin = '';
        for (let i = 0; i < length; i++) {
            pin += Math.floor(Math.random() * 10);
        }
        return pin;
    }
}

// Initialize password generator when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.passwordGenerator = new PasswordGenerator();
});