// Password Strength Checker Module
class StrengthChecker {
    constructor() {
        this.weights = {
            length: 4,
            uppercase: 2,
            lowercase: 2,
            numbers: 3,
            symbols: 4,
            diversity: 3
        };
        
        this.levels = [
            { name: 'Very Weak', score: 0, color: 'strength-weak' },
            { name: 'Weak', score: 25, color: 'strength-weak' },
            { name: 'Fair', score: 50, color: 'strength-fair' },
            { name: 'Good', score: 65, color: 'strength-good' },
            { name: 'Strong', score: 80, color: 'strength-strong' },
            { name: 'Very Strong', score: 90, color: 'strength-very-strong' }
        ];
    }

    calculateStrength(password, settings = {}) {
        if (!password || password.length === 0) {
            return this.levels[0];
        }

        let score = 0;
        const length = password.length;

        // Length score
        score += Math.min(length * this.weights.length, 30);

        // Character type diversity
        const hasUpper = /[A-Z]/.test(password);
        const hasLower = /[a-z]/.test(password);
        const hasNumber = /[0-9]/.test(password);
        const hasSymbol = /[^A-Za-z0-9]/.test(password);

        const typeCount = [hasUpper, hasLower, hasNumber, hasSymbol].filter(Boolean).length;
        score += (typeCount - 1) * 10;

        // Bonus points for specific character types
        if (hasUpper) score += this.weights.uppercase;
        if (hasLower) score += this.weights.lowercase;
        if (hasNumber) score += this.weights.numbers;
        if (hasSymbol) score += this.weights.symbols;

        // Entropy bonus
        const entropy = this.calculateEntropy(password);
        score += Math.min(entropy / 2, 15);

        // Penalties for common patterns
        score -= this.calculatePenalties(password);

        // Ensure score is within bounds
        score = Math.max(0, Math.min(100, score));

        return this.getStrengthLevel(score);
    }

    calculateEntropy(password) {
        const charSet = this.getCharacterSetSize(password);
        return Math.log2(Math.pow(charSet, password.length));
    }

    getCharacterSetSize(password) {
        let size = 0;
        if (/[a-z]/.test(password)) size += 26;
        if (/[A-Z]/.test(password)) size += 26;
        if (/[0-9]/.test(password)) size += 10;
        if (/[^A-Za-z0-9]/.test(password)) size += 32; // Common symbols
        return size;
    }

    calculatePenalties(password) {
        let penalties = 0;

        // Repeated characters
        const repeats = (password.match(/(.)\1+/g) || []).length;
        penalties += repeats * 5;

        // Sequential characters (abc, 123, etc.)
        const sequences = this.countSequences(password);
        penalties += sequences * 3;

        // Common patterns
        if (this.isCommonPassword(password)) {
            penalties += 30;
        }

        // Only letters
        if (/^[A-Za-z]+$/.test(password)) {
            penalties += 15;
        }

        // Only numbers
        if (/^[0-9]+$/.test(password)) {
            penalties += 20;
        }

        return penalties;
    }

    countSequences(password) {
        let sequences = 0;
        for (let i = 0; i < password.length - 2; i++) {
            const a = password.charCodeAt(i);
            const b = password.charCodeAt(i + 1);
            const c = password.charCodeAt(i + 2);
            
            if (b - a === 1 && c - b === 1) {
                sequences++;
            }
        }
        return sequences;
    }

    isCommonPassword(password) {
        const commonPasswords = [
            'password', '123456', '12345678', '1234', 'qwerty', 'letmein',
            'welcome', 'admin', 'password1', '12345', '123456789'
        ];
        return commonPasswords.includes(password.toLowerCase());
    }

    getStrengthLevel(score) {
        for (let i = this.levels.length - 1; i >= 0; i--) {
            if (score >= this.levels[i].score) {
                return {
                    ...this.levels[i],
                    score: Math.round(score),
                    percentage: score
                };
            }
        }
        return this.levels[0];
    }

    updateStrengthDisplay(password, settings = {}) {
        const strengthFill = document.getElementById('strengthFill');
        const strengthText = document.getElementById('strengthText');
        
        if (!strengthFill || !strengthText) return;

        const strength = this.calculateStrength(password, settings);

        // Update progress bar
        strengthFill.style.width = `${strength.percentage}%`;
        strengthFill.className = `strength-fill ${strength.color}`;

        // Update text
        strengthText.textContent = `${strength.name} (${strength.score}/100)`;
        strengthText.className = `strength-text ${strength.color}`;
    }
}

// Initialize strength checker when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.strengthChecker = new StrengthChecker();
});