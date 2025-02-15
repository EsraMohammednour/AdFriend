/**
 * This script listens for the DOMContentLoaded event and then selects all elements
 * that match the specified ad-related selectors. For each selected ad element, 
 * it creates a new div element with a motivational message and replaces the ad 
 * element with this new message element.
 *
 * Ad selectors:
 * - .ad-container
 * - #ad-banner
 * - iframe
 * - .ad
 * - .ads
 * - [id*='ad']
 *
 * The motivational message displayed is randomly selected from a predefined list.
 * Each message element includes a close button to remove the message manually.
 * Additionally, the message will automatically fade out and be removed after 15 seconds.
 *
 * @event DOMContentLoaded - The event that triggers the script execution.
 * @constant {string[]} messages - An array of motivational messages.
 * @function querySelectorAll - Selects all ad elements based on the specified selectors.
 * @function forEach - Iterates over each selected ad element.
 * @function createElement - Creates a new div element for the motivational message.
 * @function replaceChild - Replaces the ad element with the new message element.
 * @function onclick - Event handler for the close button to remove the message.
 * @function setTimeout - Sets a timer to automatically fade out and remove the message after 15 seconds.
 *
 * The motivational message displayed is: "Keep pushing forward! You're doing great!"
 */
document.addEventListener("DOMContentLoaded", () => {
  const messages = [
    "Keep pushing forward! You're doing great!",
    "Believe in yourself and all that you are.",
    "Your potential is limitless.",
    "Success is the sum of small efforts, repeated daily.",
    "Don't watch the clock; do what it does. Keep going.",
    "You are capable of amazing things.",
    "Dream it. Believe it. Build it.",
    "Be stronger than your excuses.",
    "Make today amazing!",
    "Your only limit is your mind.",
    "Work hard in silence, let success make the noise.",
    "Believe in the power of yet.",
    "Difficult roads lead to beautiful destinations.",
    "Focus on progress, not perfection.",
    "You got this!",
    "Every day is a second chance.",
    "Small steps lead to big results.",
    "Success doesn’t come from what you do occasionally.",
    "Don’t stop when you’re tired, stop when you’re done.",
    "Stay positive, work hard, make it happen."
  ];

  const ads = document.querySelectorAll(
    "iframe, .ad, .ads,  [id*='ad'], .ad-container, #ad-banner"
  );
  ads.forEach(ad => {
    const message = document.createElement("div");
    message.className = "motivational-message";
    message.innerText = messages[Math.floor(Math.random() * messages.length)];
    
    const closeButton = document.createElement("button");
    closeButton.innerText = "×";
    closeButton.className = "close-button";
  
    
    message.appendChild(closeButton);
    ad.parentNode.replaceChild(message, ad);
    closeButton.onclick = () => message.remove();
    setTimeout(() => {
      message.style.animation = "fadeOut 0.5s ease-in-out";
      setTimeout(() => message.remove(), 500);
    }, 15000);
  });
});
