document.addEventListener("DOMContentLoaded", () => {
  const ads = document.querySelectorAll("iframe, .ad, .ads, [id*='ad']");
  ads.forEach(ad => {
    const message = document.createElement("div");
    message.className = "motivational-message";
    message.innerText = "Keep pushing forward! You're doing great!";
    ad.replaceWith(message);
  });
});