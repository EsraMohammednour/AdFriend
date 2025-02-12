function replaceAdsWithWorkouts() {
  const adSelectors = [
      'iframe', 
      'div[id*="ad"]', 
      'div[class*="ad"]', 
      'ins', 
      'aside'
  ];

  const workouts = [
      { name: "Jumping Jacks", duration: "30 sec", img: "https://via.placeholder.com/150" },
      { name: "Push-ups", duration: "10 reps", img: "https://via.placeholder.com/150" },
      { name: "Squats", duration: "15 reps", img: "https://via.placeholder.com/150" },
      { name: "Lunges", duration: "10 reps per leg", img: "https://via.placeholder.com/150" },
      { name: "Plank", duration: "30 sec", img: "https://via.placeholder.com/150" }
  ];

  adSelectors.forEach(selector => {
      document.querySelectorAll(selector).forEach(ad => {
          const workout = workouts[Math.floor(Math.random() * workouts.length)];
          ad.innerHTML = `
              <div style="background: #f4f4f4; padding: 15px; text-align: center; border-radius: 10px;">
                  <h3>Workout Break!</h3>
                  <p><strong>${workout.name}</strong> - ${workout.duration}</p>
                  <img src="${workout.img}" alt="${workout.name}" style="width: 100px; height: 100px;">
              </div>
          `;
      });
  });
}

// Run the function every 3 seconds to replace dynamic ads
setInterval(replaceAdsWithWorkouts, 3000);