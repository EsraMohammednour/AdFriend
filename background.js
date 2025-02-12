// background.js

// Initialize default values on extension install
chrome.runtime.onInstalled.addListener(() => {
    chrome.storage.sync.set({
        widgetType: 'quote', // default is quote
        customWidgetText: 'This space is now a custom widget!'
    });
  });