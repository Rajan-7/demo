
  const navToggle = document.querySelector('.nav-toggle');
  const navLinks = document.querySelector('.nav-links');

  navToggle.addEventListener('click', () => {
  navLinks.classList.toggle('open');
  });

  const faqItems = document.querySelectorAll('.faq-item');

  faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');

    question.addEventListener('click', () => {
      item.classList.toggle('active');

      faqItems.forEach(other => {
        if (other !== item) other.classList.remove('active');
      });
    });
  });
  
  function showPopup() {
  document.getElementById("popup").style.display = "flex";
}

function hidePopup() {
  document.getElementById("popup").style.display = "none";
}

// Close button
document.getElementById("popup-close").addEventListener("click", hidePopup);

// Close when clicking outside popup box
document.getElementById("popup").addEventListener("click", (e) => {
  if (e.target.id === "popup") {
    hidePopup();
  }
});

// Show popup every 10–15 seconds
function schedulePopup() {
  const delay = Math.floor(Math.random() * 5000) + 10000; 
  setTimeout(() => {
    showPopup();
    schedulePopup();
  }, delay);
}

// Start scheduling after page load
window.addEventListener("load", () => {
  schedulePopup();
});


