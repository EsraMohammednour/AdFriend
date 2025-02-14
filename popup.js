document.addEventListener('DOMContentLoaded', () => {
  const toggleCheckbox = document.getElementById('toggleExtension')
  const toggleText = document.getElementById('toggleText')

  if (!toggleCheckbox || !toggleText) {
    console.error('Toggle elements not found in popup.')
    return
  }

  // Update the UI based on the stored extension state.
  function updateToggleUI(isActive) {
    toggleCheckbox.checked = isActive
    toggleText.textContent = isActive ? 'Disable Extension' : 'Enable Extension'
  }

  // Initialize UI state using stored value (default is active: true)
  chrome.storage.local.get({ extensionActive: true }, (data) => {
    updateToggleUI(data.extensionActive)
  })

  // Listen for toggle switch changes.
  toggleCheckbox.addEventListener('change', () => {
    const newState = toggleCheckbox.checked
    chrome.storage.local.set({ extensionActive: newState }, () => {
      updateToggleUI(newState)
    })
  })
})
