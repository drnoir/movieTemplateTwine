

// Trigger onNewPassageLoad whenever the passage changes
Story.onPassageChange = function () {
  onNewPassageLoad();
};

function onNewPassageLoad() {
    // Run this code after the passage is displayed in Twine
    let transitionTime = 10;
    let linkClicked = false; // Flag to track if a link has been clicked
    // Get the video and question elements
    let videoElement = document.getElementById("scene");
    let questionsElement = document.getElementById("questions");
    let questionsBgElement = document.getElementById("questions_bg");
    let navbarLoad = document.getElementById("navbar-load");
  
    // if (questionsElement) {
      // Set the fade-in transition initially to ensure it applies when opacity changes
      questionsElement.style.transition = "opacity 1.5s ease-in-out";
    // }
  
    // if (questionsBgElement) {
      questionsBgElement.style.transition = "opacity 1.5s ease-in-out";
    // }
  
    // if (videoElement) {
      // Ensure video metadata is loaded before accessing duration
      videoElement.addEventListener("loadedmetadata", () => {
        let sceneTime = videoElement.duration * 1000; // Duration in milliseconds
        // Check if duration is valid (fallback if needed)
        let timeoutDuration = isNaN(sceneTime) || sceneTime === 0 ? 3000 : sceneTime;
        // Call the monitorLinkClicks function to start listening for clicks
        monitorLinkClicks();
        // Set a timeout based on video duration to trigger fade-in
        setTimeout(() => {
          // Apply visibility and fade-in effect
          questionsElement.style.visibility = "visible";
          navbarLoad.style.visibility = "visible";
          questionsBgElement.style.visibility = "visible";
          questionsElement.style.opacity = "1";
          questionsBgElement.style.opacity = "1";
          let linkClicks = hasLinkBeenClicked();
          triggerSound(transitionTime);
          if (!linkClicks) {
            triggerAnimationAndClick(transitionTime)
          }
        }, timeoutDuration);
      });
    // }
  
    function triggerAnimationAndClick(duration) {
      // Set the animation on the progress bar and define the animation duration
      navbarLoad.style.animation = `load ${duration}s linear forwards`;
      // Set a timeout based on the duration of the animation
      setTimeout(() => {
        // Simulate a click on the first link in the passage after the animation finishes
        let firstLink = document.querySelector('a'); // Select the first link element
        if (firstLink) {
          firstLink.click(); // Simulate a click on the first link
        }
      }, duration * 1000); // Convert seconds to milliseconds
    }
  
    // Function to monitor link clicks
    function monitorLinkClicks() {
      // Select all passage links (links inside the passage)
      $('a').on('click', function () {
        linkClicked = true; // Set the flag to true when a link is clicked
      });
    }
  
    // Function to check if a link has been clicked
    function hasLinkBeenClicked() {
      return linkClicked; // Return the status of the linkClicked flag
    }
  
    // Function to play sound and stop it after a set time
    function triggerSound(duration) {
      // Create an audio element
      let audio = new Audio('clock.mp3'); // Replace with your actual sound file
      // Play the sound
      audio.play();
      // Stop the sound after the specified duration (in milliseconds)
      setTimeout(() => {
        audio.pause();    // Pause the audio
        audio.currentTime = 0; // Reset the audio to the start
      }, duration * 1000); // Duration is passed in seconds, convert to milliseconds
    }
}




