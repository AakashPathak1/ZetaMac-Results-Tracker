// Background script for Zetamac Results Tracker extension
// Handles basic extension functionality

// Initialize extension when installed or updated
chrome.runtime.onInstalled.addListener(function() {
  console.log('Zetamac Results Tracker extension installed or updated');
  
  // Initialize default settings if not already set
  chrome.storage.sync.get('settings', function(data) {
    if (!data.settings) {
      const defaultSettings = {
        saveDate: true,
        saveScore: true,
        saveTime: true,
        saveSettings: true
      };
      
      chrome.storage.sync.set({settings: defaultSettings}, function() {
        console.log('Default settings initialized');
      });
    }
  });
  
  // Initialize results array if not already set
  chrome.storage.local.get('results', function(data) {
    if (!data.results) {
      chrome.storage.local.set({results: []}, function() {
        console.log('Results array initialized');
      });
    }
  });
});

// Listen for browser action clicks (icon clicks)
chrome.action.onClicked.addListener(function(tab) {
  // This is a fallback in case the popup doesn't open automatically
  // It's not needed for normal operation since we defined a popup in manifest.json
  console.log('Extension icon clicked');
});

// Optional: Listen for tab updates to detect when user is on Zetamac site
chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
  if (changeInfo.status === 'complete' && tab.url && tab.url.includes('arithmetic.zetamac.com')) {
    console.log('User is on Zetamac site');
  }
});
