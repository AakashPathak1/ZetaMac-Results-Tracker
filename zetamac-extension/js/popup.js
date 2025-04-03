document.addEventListener('DOMContentLoaded', function() {
  // DOM elements
  const saveSettingsButton = document.getElementById('save-settings-button');
  const settingsStatus = document.getElementById('settings-status');
  const resultsListDiv = document.getElementById('results-list');
  const clearResultsButton = document.getElementById('clear-results-button');
  const exportResultsButton = document.getElementById('export-results-button');
  const totalGamesElement = document.getElementById('total-games');
  const highScoreElement = document.getElementById('high-score');
  const avgScoreElement = document.getElementById('avg-score');
  
  // Load saved settings and results
  loadSettings();
  loadResults();
  updateStats();
  
  // Event listeners
  saveSettingsButton.addEventListener('click', saveSettings);
  clearResultsButton.addEventListener('click', clearResults);
  exportResultsButton.addEventListener('click', exportResults);
  
  // Save settings
  function saveSettings() {
    const settings = {
      saveDate: document.getElementById('save-date').checked,
      saveScore: document.getElementById('save-score').checked,
      saveTime: document.getElementById('save-time').checked,
      saveSettings: document.getElementById('save-settings').checked
    };
    
    chrome.storage.sync.set({settings: settings}, function() {
      settingsStatus.textContent = 'Settings saved successfully!';
      settingsStatus.className = 'status success';
      
      // Hide status message after a delay
      setTimeout(function() {
        settingsStatus.className = 'status';
      }, 3000);
    });
  }
  
  // Load saved settings
  function loadSettings() {
    chrome.storage.sync.get('settings', function(data) {
      if (data.settings) {
        document.getElementById('save-date').checked = data.settings.saveDate !== false;
        document.getElementById('save-score').checked = data.settings.saveScore !== false;
        document.getElementById('save-time').checked = data.settings.saveTime !== false;
        document.getElementById('save-settings').checked = data.settings.saveSettings !== false;
      }
    });
  }
  
  // Load saved results
  function loadResults() {
    chrome.storage.local.get('results', function(data) {
      const results = data.results || [];
      displayResults(results);
    });
  }
  
  // Display results in the popup
  function displayResults(results) {
    resultsListDiv.innerHTML = '';
    
    if (results.length === 0) {
      resultsListDiv.innerHTML = '<p class="no-results">No game results yet. Play Zetamac to start tracking your scores!</p>';
      return;
    }
    
    // Sort results by date (newest first)
    results.sort((a, b) => new Date(b.date) - new Date(a.date));
    
    // Display each result
    results.forEach(result => {
      const resultItem = document.createElement('div');
      resultItem.className = 'result-item';
      
      // Format date
      let formattedDate = 'N/A';
      if (result.date) {
        const date = new Date(result.date);
        formattedDate = date.toLocaleDateString() + ' ' + date.toLocaleTimeString();
      }
      
      // Create result content
      let resultContent = `
        <div class="result-score">Score: ${result.score || 'N/A'}</div>
        <div class="result-date">${formattedDate}</div>
      `;
      
      if (result.time) {
        resultContent += `<div class="result-time">Time: ${result.time} seconds</div>`;
      }
      
      if (result.settings) {
        resultContent += `<div class="result-settings">${result.settings}</div>`;
      }
      
      resultItem.innerHTML = resultContent;
      resultsListDiv.appendChild(resultItem);
    });
  }
  
  // Update statistics
  function updateStats() {
    chrome.storage.local.get('results', function(data) {
      const results = data.results || [];
      
      // Total games
      totalGamesElement.textContent = results.length;
      
      // High score
      let highScore = 0;
      if (results.length > 0) {
        highScore = Math.max(...results.map(r => parseInt(r.score) || 0));
      }
      highScoreElement.textContent = highScore;
      
      // Average score
      let avgScore = 0;
      if (results.length > 0) {
        const sum = results.reduce((total, r) => total + (parseInt(r.score) || 0), 0);
        avgScore = Math.round(sum / results.length);
      }
      avgScoreElement.textContent = avgScore;
    });
  }
  
  // Clear all results
  function clearResults() {
    if (confirm('Are you sure you want to clear all your game history? This cannot be undone.')) {
      chrome.storage.local.set({results: []}, function() {
        loadResults();
        updateStats();
      });
    }
  }
  
  // Export results as CSV
  function exportResults() {
    chrome.storage.local.get('results', function(data) {
      const results = data.results || [];
      
      if (results.length === 0) {
        alert('No results to export.');
        return;
      }
      
      // Create CSV content
      let csvContent = 'data:text/csv;charset=utf-8,';
      
      // Add headers
      csvContent += 'Date,Score,Time (seconds),Game Settings\n';
      
      // Add data rows
      results.forEach(result => {
        const date = result.date ? new Date(result.date).toISOString() : 'N/A';
        const score = result.score || 'N/A';
        const time = result.time || 'N/A';
        const settings = result.settings ? '"' + result.settings.replace(/"/g, '""') + '"' : 'N/A';
        
        csvContent += `${date},${score},${time},${settings}\n`;
      });
      
      // Create download link
      const encodedUri = encodeURI(csvContent);
      const link = document.createElement('a');
      link.setAttribute('href', encodedUri);
      link.setAttribute('download', 'zetamac_results.csv');
      document.body.appendChild(link);
      
      // Trigger download and clean up
      link.click();
      document.body.removeChild(link);
    });
  }
});
