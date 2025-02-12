document.addEventListener('DOMContentLoaded', function() {
    const widgetTypeSelect = document.getElementById('widgetType');
    const customWidgetTextInput = document.getElementById('customWidgetText');
    const saveButton = document.getElementById('save');
  
    // Load saved preferences
    chrome.storage.sync.get(['widgetType', 'customWidgetText'], function(data) {
      widgetTypeSelect.value = data.widgetType || 'quote';
      customWidgetTextInput.value = data.customWidgetText || '';
    });
  
    // Save preferences
    saveButton.addEventListener('click', function() {
      const widgetType = widgetTypeSelect.value;
      const customWidgetText = customWidgetTextInput.value;
  
      chrome.storage.sync.set({
        'widgetType': widgetType,
        'customWidgetText': customWidgetText
      }, function() {
        alert('Options saved!');
      });
    });
  });