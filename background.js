// background.js
console.log("Service worker loaded!");

chrome.runtime.onInstalled.addListener(() => {
console.log("Extension installed or updated.");
// Perform tasks on installation if needed.
});