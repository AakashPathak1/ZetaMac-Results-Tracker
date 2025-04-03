// Content script for Zetamac Results Tracker extension
// This script runs on the Zetamac website and extracts game results

// Main function to observe DOM changes and detect game results
function observeGameResults() {
  console.log('Zetamac Results Tracker: Observer initialized');
  
  // Create a MutationObserver to watch for DOM changes
  const observer = new MutationObserver(function(mutations) {
    // Check if the game has ended
    checkForGameEnd();
  });
  
  // Start observing the document body for changes
  observer.observe(document.body, {
    childList: true,
    subtree: true,
    characterData: true
  });
}

// Function to check if the game has ended
function checkForGameEnd() {
  // Multiple ways to detect game end
  const hasEndText = document.body.innerText.includes('Try again') || 
                     document.body.innerText.includes('change settings');
                     
  // Look for score elements
  const scoreElements = document.querySelectorAll('div');
  let scoreFound = false;
  let scoreValue = null;
  
  // Loop through all divs to find score
  for (const element of scoreElements) {
    const text = element.innerText || '';
    const scoreMatch = text.match(/Score:\s*(\d+)/i);
    
    if (scoreMatch && scoreMatch[1] && !element.dataset.processed) {
      // Mark as processed to avoid duplicate processing
      element.dataset.processed = 'true';
      scoreFound = true;
      scoreValue = scoreMatch[1];
      console.log('Zetamac Results Tracker: Score found:', scoreValue);
      break;
    }
  }
  
  // If we found a score and the game appears to be over
  if (scoreFound && hasEndText) {
    // Get game settings if available
    let gameSettings = '';
    const headings = document.querySelectorAll('h1');
    for (const heading of headings) {
      const nextElement = heading.nextElementSibling;
      if (nextElement && nextElement.tagName === 'P') {
        gameSettings = nextElement.innerText.trim();
        break;
      }
    }
    
    // Get game duration
    let gameDuration = 120; // Default 2 minutes
    const durationMatch = gameSettings.match(/given (\d+) (?:seconds|minutes)/);
    if (durationMatch && durationMatch[1]) {
      if (gameSettings.includes('minutes')) {
        gameDuration = parseInt(durationMatch[1]) * 60;
      } else {
        gameDuration = parseInt(durationMatch[1]);
      }
    }
    
    // Create result object
    const result = {
      score: scoreValue,
      time: gameDuration,
      date: new Date().toISOString(),
      settings: gameSettings
    };
    
    // Save result locally
    saveResultLocally(result);
    
    console.log('Zetamac Results Tracker: Game result detected and saved:', result);
  }
}

// Function to save result locally
function saveResultLocally(result) {
  // Get current settings to determine what to save
  chrome.storage.sync.get('settings', function(data) {
    const settings = data.settings || {
      saveDate: true,
      saveScore: true,
      saveTime: true,
      saveSettings: true
    };
    
    // Filter result based on settings
    const filteredResult = {};
    if (settings.saveDate) filteredResult.date = result.date;
    if (settings.saveScore) filteredResult.score = result.score;
    if (settings.saveTime) filteredResult.time = result.time;
    if (settings.saveSettings) filteredResult.settings = result.settings;
    
    // Get existing results
    chrome.storage.local.get('results', function(data) {
      const results = data.results || [];
      
      // Add new result
      results.push(filteredResult);
      
      // Save updated results
      chrome.storage.local.set({results: results}, function() {
        console.log('Result saved to local storage');
      });
    });
  });
}

// Initialize when the page is fully loaded
if (document.readyState === 'complete') {
  observeGameResults();
  // Also check immediately in case we loaded after the game ended
  checkForGameEnd();
} else {
  window.addEventListener('load', function() {
    observeGameResults();
    // Also check immediately after load
    checkForGameEnd();
  });
}

// Set up periodic checking for game end
setInterval(checkForGameEnd, 2000);

// Also check immediately in case we loaded after the game ended
setTimeout(function() {
  console.log('Zetamac Results Tracker: Performing initial check');
  checkForGameEnd();
  
  // Trigger a small DOM change to activate the observer
  const tempDiv = document.createElement('div');
  tempDiv.style.display = 'none';
  document.body.appendChild(tempDiv);
  setTimeout(() => document.body.removeChild(tempDiv), 100);
}, 1000);
