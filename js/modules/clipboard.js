// Clipboard Management Module
class ClipboardManager {
    constructor() {
        this.init();
    }

    init() {
        this.bindEvents();
    }

    bindEvents() {
        const copyBtn = document.getElementById('copyBtn');
        if (copyBtn) {
            copyBtn.addEventListener('click', () => this.copyPassword());
        }

        // Add keyboard shortcut (Ctrl+C when password field is focused)
        document.addEventListener('keydown', (e) => {
            if ((e.ctrlKey || e.metaKey) && e.key === 'c') {
                const activeElement = document.activeElement;
                if (activeElement.id === 'passwordResult') {
                    e.preventDefault();
                    this.copyPassword();
                }
            }
        });
    }

    async copyPassword() {
        const passwordField = document.getElementById('passwordResult');
        if (!passwordField || !passwordField.value) {
            Helpers.showNotification('No password to copy!', 'error');
            return;
        }

        const success = await Helpers.copyToClipboard(passwordField.value);
        
        if (success) {
            Helpers.showNotification('Password copied to clipboard!', 'success');
            this.animateCopyButton();
            
            // Clear clipboard after 2 minutes for security
            setTimeout(() => {
                if (navigator.clipboard) {
                    navigator.clipboard.writeText('').catch(() => {});
                }
            }, 120000);
        } else {
            Helpers.showNotification('Failed to copy password', 'error');
        }
    }

    animateCopyButton() {
        const copyBtn = document.getElementById('copyBtn');
        if (!copyBtn) return;

        const originalHTML = copyBtn.innerHTML;
        copyBtn.innerHTML = '<i class="fas fa-check"></i>';
        copyBtn.style.background = 'var(--success)';
        copyBtn.style.color = 'white';

        setTimeout(() => {
            copyBtn.innerHTML = originalHTML;
            copyBtn.style.background = '';
            copyBtn.style.color = '';
        }, 2000);
    }

    // Advanced clipboard features
    async copyAsText() {
        const password = document.getElementById('passwordResult').value;
        await Helpers.copyToClipboard(password);
    }

    async copyAsHTML() {
        const password = document.getElementById('passwordResult').value;
        const html = `<code style="font-family: monospace; background: #f4f4f4; padding: 2px 4px; border-radius: 3px;">${password}</code>`;
        await Helpers.copyToClipboard(html);
    }

    // Security: Clear clipboard
    async clearClipboard() {
        try {
            if (navigator.clipboard) {
                await navigator.clipboard.writeText('');
                Helpers.showNotification('Clipboard cleared', 'success');
            }
        } catch (err) {
            console.error('Failed to clear clipboard:', err);
        }
    }
}

// Initialize clipboard manager when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.clipboardManager = new ClipboardManager();
});