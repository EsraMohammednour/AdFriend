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
 */ document.addEventListener('DOMContentLoaded', () => {
  let observer
  const config = { attributes: true, childList: true, subtree: true }

  const processAds = () => {
    chrome.storage.local.get({ extensionActive: true }, (data) => {
      if (!data.extensionActive) {
        if (observer) observer.disconnect()
        document
          .querySelectorAll('.motivational-message')
          .forEach((msg) => msg.remove())
        return
      }

      const adSelectors = [
        '.ad-container',
        '#ad-banner',
        'iframe[src*="ad"]',
        '.ad',
        '.ads',
        '[id*="ad"]',
        '[class*="ad"]',
        'div[data-ad], ins.adsbygoogle',
      ]

      const handleMutations = (mutations) => {
        mutations.forEach((mutation) => {
          mutation.addedNodes.forEach((node) => {
            if (node.nodeType === 1) {
              const ads = node.matches(adSelectors)
                ? [node]
                : node.querySelectorAll(adSelectors)
              ads.forEach(processAd)
            }
          })
        })
      }

      observer = new MutationObserver(handleMutations)
      observer.observe(document.documentElement, config)

      document.querySelectorAll(adSelectors).forEach(processAd)
    })
  }

  const processAd = (ad) => {
    if (!isVisible(ad)) return

    const message = createMessageElement()
    ad.parentNode.replaceChild(message, ad)
  }

  const isVisible = (el) => {
    const style = window.getComputedStyle(el)
    return (
      style.display !== 'none' &&
      style.visibility !== 'hidden' &&
      el.offsetWidth > 0 &&
      el.offsetHeight > 0
    )
  }

  const createMessageElement = () => {
    const message = document.createElement('div')
    message.className = 'motivational-message'
    message.innerHTML = `
      <div class="message-content">${getRandomMessage()}</div>
      <button class="close-button" aria-label="Close">×</button>
    `

    message.querySelector('.close-button').onclick = () => message.remove()
    setTimeout(() => message.classList.add('fade-out'), 15000)
    return message
  }

  chrome.storage.onChanged.addListener(processAds)
  processAds()
})
