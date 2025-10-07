// Main Application Script
class PasswordGeneratorApp {
    constructor() {
        this.modals = {};
        this.init();
    }

    init() {
        this.initializeModules();
        this.bindGlobalEvents();
        this.loadSavedProfiles();
        this.setupServiceWorker();
    }

    initializeModules() {
        // Modules are already initialized by their respective classes
        console.log('🔐 SecurePass Generator initialized');
    }

    bindGlobalEvents() {
        // History modal
        const historyBtn = document.getElementById('historyBtn');
        const historyModal = document.getElementById('historyModal');
        const closeModal = document.getElementById('closeModal');

        if (historyBtn && historyModal) {
            historyBtn.addEventListener('click', () => {
                historyModal.style.display = 'block';
                document.body.style.overflow = 'hidden';
            });
        }

        if (closeModal && historyModal) {
            closeModal.addEventListener('click', () => {
                historyModal.style.display = 'none';
                document.body.style.overflow = '';
            });
        }

        // Close modal when clicking outside
        window.addEventListener('click', (e) => {
            const historyModal = document.getElementById('historyModal');
            if (e.target === historyModal) {
                historyModal.style.display = 'none';
                document.body.style.overflow = '';
            }
        });

        // Save profile functionality
        const saveProfileBtn = document.getElementById('saveProfileBtn');
        if (saveProfileBtn) {
            saveProfileBtn.addEventListener('click', () => this.saveProfile());
        }

        // Keyboard shortcuts
        document.addEventListener('keydown', (e) => {
            // Ctrl+Enter or Cmd+Enter to generate new password
            if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
                e.preventDefault();
                window.passwordGenerator?.generatePassword();
            }

            // Escape to close modals
            if (e.key === 'Escape') {
                const modals = document.querySelectorAll('.modal');
                modals.forEach(modal => {
                    modal.style.display = 'none';
                });
                document.body.style.overflow = '';
            }
        });

        // Online/offline detection
        window.addEventListener('online', () => {
            Helpers.showNotification('Back online', 'success');
        });

        window.addEventListener('offline', () => {
            Helpers.showNotification('You are offline', 'warning');
        });
    }

    saveProfile() {
        const settings = window.passwordGenerator?.getCurrentSettings();
        if (!settings) return;

        const profileName = prompt('Enter profile name:', `Profile ${new Date().toLocaleTimeString()}`);
        if (!profileName) return;

        const profiles = Helpers.loadFromStorage('savedProfiles') || {};
        profiles[profileName] = {
            ...settings,
            createdAt: new Date().toISOString()
        };

        if (Helpers.saveToStorage('savedProfiles', profiles)) {
            Helpers.showNotification(`Profile "${profileName}" saved!`, 'success');
        } else {
            Helpers.showNotification('Failed to save profile', 'error');
        }
    }

    loadSavedProfiles() {
        const profiles = Helpers.loadFromStorage('savedProfiles');
        if (profiles) {
            console.log('Loaded saved profiles:', Object.keys(profiles).length);
        }
    }

    setupServiceWorker() {
        if ('serviceWorker' in navigator) {
            window.addEventListener('load', () => {
                navigator.serviceWorker.register('/sw.js')
                    .then(registration => {
                        console.log('SW registered: ', registration);
                    })
                    .catch(registrationError => {
                        console.log('SW registration failed: ', registrationError);
                    });
            });
        }
    }

    // Export functionality
    exportPasswords(format = 'json') {
        const history = window.passwordGenerator?.history || [];
        if (history.length === 0) {
            Helpers.showNotification('No passwords to export', 'warning');
            return;
        }

        let data;
        let filename;
        let mimeType;

        switch (format) {
            case 'json':
                data = JSON.stringify(history, null, 2);
                filename = `passwords-${new Date().toISOString().split('T')[0]}.json`;
                mimeType = 'application/json';
                break;
            case 'csv':
                data = this.convertToCSV(history);
                filename = `passwords-${new Date().toISOString().split('T')[0]}.csv`;
                mimeType = 'text/csv';
                break;
            case 'txt':
                data = history.map(item => 
                    `${item.password} | ${item.strength} | ${new Date(item.timestamp).toLocaleString()}`
                ).join('\n');
                filename = `passwords-${new Date().toISOString().split('T')[0]}.txt`;
                mimeType = 'text/plain';
                break;
        }

        this.downloadFile(data, filename, mimeType);
    }

    convertToCSV(data) {
        const headers = ['Password', 'Strength', 'Timestamp'];
        const rows = data.map(item => [
            item.password,
            item.strength,
            new Date(item.timestamp).toLocaleString()
        ]);
        
        return [headers, ...rows]
            .map(row => row.map(field => `"${field}"`).join(','))
            .join('\n');
    }

    downloadFile(data, filename, mimeType) {
        const blob = new Blob([data], { type: mimeType });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = filename;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
    }
}

// Initialize the application when DOM is fully loaded
document.addEventListener('DOMContentLoaded', () => {
    window.passwordGeneratorApp = new PasswordGeneratorApp();
});

// Handle page visibility changes for security
document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
        // Page is hidden - clear sensitive data if needed
        console.log('Page hidden - consider clearing sensitive data');
    }
});

// Error handling
window.addEventListener('error', (e) => {
    console.error('Application error:', e.error);
    Helpers.showNotification('An error occurred', 'error');
});

// Export global functions for debugging
window.debugApp = {
    getSettings: () => window.passwordGenerator?.getCurrentSettings(),
    getHistory: () => window.passwordGenerator?.history,
    clearData: () => {
        localStorage.clear();
        window.location.reload();
    }
};