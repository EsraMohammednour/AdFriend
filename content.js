(function() {
    const adSelector = '.ad-container, #ad-banner, .advertisement'; // Customize!
    const widgetContainerId = 'ad-friend-widget-container';
  
    // Motivational quotes
    const motivationalQuotes = [
      "Believe in yourself!",
      "You are capable of amazing things!",
      "Every day is a fresh start.",
      "Don't give up on your dreams!",
      "Small steps lead to big results."
    ];
  
    // Activity reminders
    const activityReminders = [
      "Have you done your burpees today? 🤸‍♀️",
      "Time for a quick stretch!",
      "Go for a walk and enjoy the sunshine.",
      "Drink some water! 💧",
      "Take a deep breath and relax."
    ];
  
    // Function to get a random element from an array
    function getRandomElement(array) {
      return array[Math.floor(Math.random() * array.length)];
    }
  
    // Function to create the widget content
    function createWidgetContent(widgetType) {
      let widgetContent = document.createElement('p');
  
      switch (widgetType) {
        case 'quote':
          widgetContent.textContent = getRandomElement(motivationalQuotes);
          break;
        case 'reminder':
          widgetContent.textContent = getRandomElement(activityReminders);
          break;
        case 'custom':
          // Get custom text from storage
          chrome.storage.sync.get('customWidgetText', function(data) {
            widgetContent.textContent = data.customWidgetText || 'This space is now a custom widget!';
          });
          break;
        default:
          widgetContent.textContent = 'Something positive here!';
      }
  
      return widgetContent;
    }
  
    // Function to replace ads
    function replaceAds() {
      const adElements = document.querySelectorAll(adSelector);
  
      if (adElements.length > 0) {
        adElements.forEach(adElement => {
          adElement.style.display = 'none'; // Or adElement.remove();
  
          let widgetContainer = document.getElementById(widgetContainerId);
          if (!widgetContainer) {
              widgetContainer = document.createElement('div');
              widgetContainer.id = widgetContainerId;
              widgetContainer.style.border = '1px solid #ccc';
              widgetContainer.style.padding = '10px';
              widgetContainer.style.marginBottom = '10px';
              widgetContainer.style.backgroundColor = '#f9f9f9';
          }
          if (adElement.contains(widgetContainer)){
              return;
          }
  
          // Get user-selected widget type from storage
          chrome.storage.sync.get('widgetType', function(data) {
            const widgetType = data.widgetType || 'quote'; // Default: motivational quote
  
            // Create the widget content based on user choice
            const widgetContent = createWidgetContent(widgetType);
  
            // Clear existing widget content, append the new content
            widgetContainer.innerHTML = '';
            widgetContainer.appendChild(widgetContent);
            adElement.appendChild(widgetContainer);
          });
  
        });
      }
    }
  
  
    replaceAds();
  
    const observer = new MutationObserver(replaceAds);
    observer.observe(document.body, { childList: true, subtree: true });
  
  })();