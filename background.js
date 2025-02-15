// background.js
console.log("Service worker loaded!");

chrome.runtime.onInstalled.addListener(() => {
console.log("Extension installed or updated.");
// Perform tasks on installation if needed.
});

chrome.runtime.onStartup.addListener(() => {
console.log("Extension started (browser startup).");
});

// Example: Listening for messages from content scripts
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
console.log("Received message from content script:", request);
// You can handle requests from content scripts here.
// Example:
if (request.action === "getMessage") {
sendResponse({ message: "Hello from the background!" });
}
return true; // Important for asynchronous responses!
});