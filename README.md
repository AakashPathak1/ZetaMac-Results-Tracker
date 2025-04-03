# Zetamac Results Tracker

<div align="center">

![Zetamac Results Tracker Logo](images/icon128.png)

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)
[![Chrome Extension](https://img.shields.io/badge/Platform-Chrome-green.svg)](https://developer.chrome.com/docs/extensions/)
[![JavaScript](https://img.shields.io/badge/Language-JavaScript-yellow.svg)](https://www.javascript.com/)

**Track, analyze, and export your Zetamac arithmetic game results with ease**

</div>

## 📊 Overview

Zetamac Results Tracker is a Chrome extension that automatically captures your [Zetamac arithmetic game](https://arithmetic.zetamac.com/) results, stores them locally in your browser, and provides insightful statistics to help you track your progress over time.

<div align="center">
<img src="screenshots/extension-preview.png" alt="Extension Preview" width="400"/>
</div>

## ✨ Features

- **Automatic Result Capture**: Detects when you complete a Zetamac game and saves your score
- **Local Storage**: All data stays in your browser - no accounts or external services needed
- **Performance Analytics**: View your high score, average score, and total games played
- **Complete History**: Browse through all your previous game results
- **Data Export**: Download your results as CSV for further analysis in spreadsheet software
- **Customizable Tracking**: Choose exactly what data you want to save
- **Privacy-Focused**: No data is sent to any external servers

## 🚀 Installation

### From Source (Developer Mode)

1. Download or clone this repository
2. Open Chrome and navigate to `chrome://extensions/`
3. Enable "Developer mode" using the toggle in the top-right corner
4. Click "Load unpacked" and select the `zetamac-extension` folder
5. The extension icon will appear in your Chrome toolbar

### From Chrome Web Store

*Coming soon!*

## 🎮 How to Use

1. **Play Zetamac**: Visit [arithmetic.zetamac.com](https://arithmetic.zetamac.com/) and play the game as usual
2. **Automatic Tracking**: When you finish a game, your score is automatically saved
3. **View Results**: Click the extension icon to see your statistics and game history
4. **Analyze Data**: Use the built-in stats or export to CSV for deeper analysis
5. **Customize**: Configure which data points to track in the settings section

<div align="center">
<img src="screenshots/game-history.png" alt="Game History" width="400"/>
</div>

## 🧩 Extension Interface

The extension popup is organized into three main sections:

### 1. Statistics Dashboard

At the top of the popup, you'll find key performance metrics:
- **Games**: Total number of games played
- **High Score**: Your personal best score
- **Avg Score**: Your average score across all games

### 2. Settings Panel

Customize what data is tracked for each game:
- Date and time
- Score
- Game duration
- Game settings (difficulty level, etc.)

### 3. Game History

A scrollable list of all your previous games, with the most recent at the top. Each entry shows:
- Score
- Date and time
- Game duration
- Game settings

## 🔧 Troubleshooting

### Results Not Saving

- Make sure the extension is enabled
- Verify that you've completed a full game (wait until you see "Try again or change settings")
- Check the browser console for any error messages
- Try reloading the extension from the Chrome extensions page

### Statistics Not Updating

- Close and reopen the extension popup
- Reload the Zetamac website and play another game
- Clear browser cache if problems persist

## 🔒 Privacy

This extension is designed with privacy in mind:

- **Local Storage Only**: All data is stored locally in your browser
- **No External Servers**: No data is transmitted to any external servers
- **Minimal Permissions**: Only accesses the Zetamac website and local storage
- **No Personal Data**: Only game-related information is collected

## 🛠️ Development

### Project Structure

```
zetamac-extension/
├── manifest.json        # Extension configuration
├── popup.html          # Extension popup interface
├── css/
│   └── popup.css       # Styles for the popup
├── js/
│   ├── background.js   # Background script
│   ├── content.js      # Content script for Zetamac site
│   └── popup.js        # Script for the popup interface
└── images/             # Extension icons
```

### Contributing

Contributions are welcome! To contribute:

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add some amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgements

- [Zetamac](https://arithmetic.zetamac.com/) for creating the awesome arithmetic game
- [Chrome Extension Documentation](https://developer.chrome.com/docs/extensions/) for development resources

---

<div align="center">
Made with ❤️ for mental math enthusiasts
</div>
