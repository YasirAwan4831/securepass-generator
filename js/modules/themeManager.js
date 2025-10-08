// Theme Management Module
class ThemeManager {
    constructor() {
        this.currentTheme = this.getSavedTheme() || this.getSystemPreference();
        this.init();
    }

    init() {
        this.applyTheme(this.currentTheme);
        this.bindEvents();
    }

    getSystemPreference() {
        if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
            return 'dark';
        }
        return 'light';
    }

    getSavedTheme() {
        return Helpers.loadFromStorage('theme');
    }

    saveTheme(theme) {
        Helpers.saveToStorage('theme', theme);
    }

    applyTheme(theme) {
        document.documentElement.setAttribute('data-theme', theme);
        this.updateToggle(theme);
        this.updateThemeLabel(theme);
        this.currentTheme = theme;
        this.saveTheme(theme);
    }

    updateToggle(theme) {
        const toggle = document.getElementById('themeCheckbox');
        if (toggle) {
            toggle.checked = theme === 'dark';
        }
    }

    updateThemeLabel(theme) {
        const label = document.getElementById('themeLabel');
        if (label) {
            label.textContent = theme === 'dark' ? 'Light Mode' : 'Dark Mode';
        }
    }

    toggleTheme() {
        const newTheme = this.currentTheme === 'light' ? 'dark' : 'light';
        this.applyTheme(newTheme);
    }

    bindEvents() {
        const toggle = document.getElementById('themeCheckbox');
        if (toggle) {
            toggle.addEventListener('change', () => {
                this.toggleTheme();
            });
        }

        // Listen for system theme changes
        if (window.matchMedia) {
            window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
                if (!this.getSavedTheme()) { // Only auto-switch if no user preference is saved
                    this.applyTheme(e.matches ? 'dark' : 'light');
                }
            });
        }
    }
}

// Initialize theme manager when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.themeManager = new ThemeManager();
});