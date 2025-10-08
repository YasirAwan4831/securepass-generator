#  SecurePass Generator

A modern, secure, and feature-rich password generator built with HTML, CSS, and JavaScript.

---

##  Features

###  Core Functionality
- **Strong Password Generation**: Create cryptographically secure passwords.
- **Customizable Length**: Generate passwords from 4 to 32 characters.
- **Character Type Selection**: Choose uppercase, lowercase, numbers, and symbols.
- **Exclusion Options**: Option to remove similar or ambiguous characters.

---

###  User Experience
- **Light & Dark Themes**: Auto-detects system theme with manual toggle.
- **Password Strength Meter**: Real-time visual strength feedback.
- **One-Click Copy**: Instantly copy to clipboard with animation.
- **Responsive Design**: Works beautifully across all devices.
- **Font Optimization**: Uses separate `fonts/` folder for future font integration.

---

###  Advanced Features
- **Password History**: Keeps track of recent passwords.
- **Settings Profiles**: Save and reuse preferred configurations.
- **Strength Analysis**: Advanced entropy-based scoring system.
- **Export Options**: Download passwords in JSON, CSV, or TXT.
- **Offline Support**: Works without internet via Service Worker.

---

###  Security
- **Client-Side Only**: No password data leaves your device.
- **Secure Generation**: Cryptographically secure random generation.
- **Clipboard Protection**: Auto-clears clipboard for added safety.
- **No Tracking / No Logs**: 100% privacy-first architecture.

---

##  Installation

1. **Clone or Download**
   ```bash
   git clone https://github.com/YasirAwan4831/securepass-generator.git


### Open in Browser
Simply open index.html — no setup or server required.
Works 100% offline.

## ## 📁 Project Structure
password-generator/
├── index.html                 # Main HTML file
├── styles/
│   ├── style.css              # Main stylesheet
│   ├── components/            # Component-specific styles
│   │   ├── header.css
│   │   ├── generator.css
│   │   ├── settings.css
│   │   └── themes.css
│   └── responsive.css         # Responsive design
├── js/
│   ├── script.js              # Main application script
│   ├── modules/               # Modular JavaScript logic
│   │   ├── passwordGenerator.js
│   │   ├── strengthChecker.js
│   │   ├── themeManager.js
│   │   ├── clipboard.js
│   │   ├── settings.js
│   │   └── themes.js
│   └── utils/
│       └── helpers.js         # Utility functions
├── fonts/
│   ├── fonts.css
│   └── fonts-helper.css
├── assets/
│   ├── icons/
│   └── images/
├── LICENSE
├── CONTRIBUTING.md
├── .gitignore
├── service-worker.js
├── manifest.json
├── package.json (optional)
└── README.md



##  Usage
<b>Basic Password Generation</b>
Adjust password length (4–32 characters).

Select character types (uppercase, lowercase, numbers, symbols).

Click Generate or use Ctrl + Enter.

Copy using Copy Icon or Ctrl + C.


## Advanced Options
Exclude Similar Characters: Remove confusing characters like i, l, 1, L, o, 0, O

Exclude Ambiguous Characters: Remove symbols that might be confusing

Save Profiles: Save your preferred settings for quick access

View History: See recently generated passwords


## Keyboard Shortcuts
Ctrl+Enter / Cmd+Enter: Generate new password

Ctrl+C / Cmd+C: Copy password (when focused)

Escape: Close modals


# Technical Details
## Password Generation Algorithm
Uses cryptographically secure Math.random() with character set diversification

Ensures at least one character from each selected character set

Implements Fisher-Yates shuffle for random distribution

Supports character exclusion for improved readability


## Strength Calculation
Length Score: Longer passwords get higher scores

Character Diversity: Bonus for using multiple character types

Entropy Calculation: Measures theoretical cracking difficulty

Pattern Penalties: Deductions for sequences and repeated characters


## Browser Support
Chrome 60+

Firefox 55+

Safari 12+

Edge 79+

## Browser Compatibility
All modern browsers are supported. The application uses:

ES6+ JavaScript features

CSS Grid and Flexbox

CSS Custom Properties (Variables)

Local Storage API

Clipboard API (with fallback)


## 🔒 Privacy & Security
No Network Requests: Everything happens locally in your browser

No Data Collection: We don't track, store, or transmit your passwords

Client-Side Encryption: All data stays on your device

Open Source: Transparent code for security verification


# Development
## Adding New Features
Create component styles in styles/components/

Add modular JavaScript in js/modules/

Update main application in js/script.js

Test across different browsers and devices



## Building for Production
No build process required! The application works as-is with vanilla JavaScript.

## 📄 License
MIT License - feel free to use this project for personal purposes.


##  Contributing
Contributions are welcome! Please feel free to submit pull requests or open issues for bugs and feature requests.

## Bug Reports
If you find a bug, please open an issue with:

Browser version

Steps to reproduce

Expected vs actual behavior

# ❤️ Made with Passion by Muhammad Yasir

For a safer, smarter and more secure internet.

##  **New Features Added:**
- **Modern UI/UX** with glass morphism design
- **Advanced strength checker** with visual meter
- **Password history** with timestamps
- **Settings profiles** for quick loading
- **Export functionality** (JSON, CSV, TXT)
- **Keyboard shortcuts**
- **Responsive design** for all devices
- **Accessibility features**
- **Theme persistence**
- **Secure clipboard management**
- **Offline functionality**

##  **Technical Improvements:**
- **Modular JavaScript** architecture
- **CSS custom properties** for theming
- **Debounced input handling**
- **Error handling** and user feedback
- **Performance optimizations**
- **Browser compatibility** fallbacks

The project is now production-ready and includes all modern web development best practices!


