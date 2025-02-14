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
document.addEventListener('DOMContentLoaded', () => {
  // Check if the extension is set as active.
  chrome.storage.local.get({ extensionActive: true }, (data) => {
    if (!data.extensionActive) {
      console.log('Extension is inactive. Skipping ad replacement.')
      return
    }

    // Proceed only if the extension is active.
    const ads = document.querySelectorAll(
      ".ad-container, #ad-banner, iframe, .ad, .ads, [id*='ad']"
    )
    // Array of motivational messages.
    const motivationalMessages = [
      "Keep pushing forward! You're doing great!",
      'Believe in yourself. You are stronger than you think!',
      'Every day is a new opportunity to shine!',
      'Success is just around the corner. Keep going!',
      "You've got this! Don't give up!",
      'The only way to do great work is to love what you do',
      'Even the darkest night will end and the sun will rise',
      'Progress, not perfection',
      'The best view comes after the hardest climb',
      'Your hard work will pay off. Stay patient',
    ]

    // Function to get a random motivational message.
    function getRandomMessage() {
      const randomIndex = Math.floor(
        Math.random() * motivationalMessages.length
      )
      return motivationalMessages[randomIndex]
    }

    // Replace an ad with a motivational message.
    function replaceAdWithMotivationalMessage(ad) {
      const message = document.createElement('div')
      message.className = 'motivational-message'
      message.innerText = getRandomMessage()
      ad.parentNode.replaceChild(message, ad)
      const closeButton = document.createElement('button')
      closeButton.innerText = '×'
      closeButton.className = 'close-button'
      message.appendChild(closeButton)
      closeButton.onclick = () => message.remove()
      setTimeout(() => {
        message.style.animation = 'fadeOut 0.5s ease-in-out'
        setTimeout(() => message.remove(), 500)
      }, 15000)
    }

    // Loop through all targeted ad elements and replace them.
    ads.forEach((ad) => {
      replaceAdWithMotivationalMessage(ad)
    })
  })
})
