document.addEventListener("DOMContentLoaded", () => {
  const ads = document.querySelectorAll(".ad-container, #ad-banner, iframe, .ad, .ads, [id*='ad']");
   // Array of motivational messages
  const motivationalMessages = [
    "Keep pushing forward! You're doing great!",
    "Believe in yourself. You are stronger than you think!",
    "Every day is a new opportunity to shine!",
    "Success is just around the corner. Keep going!",
    "You've got this! Don't give up!",
    "The only way to do great work is to love what you do",
    "Even the darkest night will end and the sun will rise",
    "Progress, not perfection",
    "The best view comes after the hardest climb",
    "Your hard work will pay off. Stay patient"
  ];

  // Function to get random motivational messages
  function getRandomMessage () {
    const randomIndex = Math.floor(Math.random() * motivationalMessages.length);
    return motivationalMessages[randomIndex];
  }

  function replaceAdWithMotivationalMessage(ad) {
    const message = document.createElement("div");
    message.className = "motivational-message";
    message.innerText = getRandomMessage();
    ad.parentNode.replaceChild(message, ad);
  }

  // loop through all the add element and replace them
  ads.forEach(ad => {
    replaceAdWithMotivationalMessage(ad);
  });
});
