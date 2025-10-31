const navToggle = document.querySelector(".nav-toggle");
const navLinks = document.querySelector(".nav-links");

navToggle.addEventListener("click", () => {
  navLinks.classList.toggle("open");
});

const faqItems = document.querySelectorAll(".faq-item");

faqItems.forEach((item) => {
  item.addEventListener("click", () => {
    item.classList.toggle("active");
    faqItems.forEach((other) => {
      if (other !== item) other.classList.remove("active");
    });
  });
});

const popup = document.getElementById("popup");
const popupClose = document.getElementById("popup-close");

function showPopup() {
  popup.style.display = "flex";
}

function hidePopup() {
  popup.style.display = "none";
}

let popupInterval;

window.addEventListener("load", () => {
  if (!localStorage.getItem("subscribe")) {
    popupInterval = setInterval(showPopup, 35000); // Show after 35s
  }
});

// Close popup on close button or outside click
popupClose.addEventListener("click", hidePopup);
popup.addEventListener("click", (e) => {
  if (e.target.id === "popup") hidePopup();
});

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("subscribe-form");
  const btn = document.getElementById("subscribe-btn");
  const emailInput = document.getElementById("email");

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const email = emailInput.value.trim();
    if (!email) return alert("Please enter a valid email address.");

    try {
      // Send to backend
      const response = await fetch(
        "https://demo-backend-rhxb.onrender.com/subscribe",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email }),
        }
      );

      if (response.ok) {
        alert("✅ Subscription successful! Check your inbox.");

        hidePopup();
        clearInterval(popupInterval);
        localStorage.setItem("subscribe", true);

        // Reset form
        form.reset();
      } else {
        alert("🔴 Error saving your email. Please try again.");
      }
    } catch (error) {
      console.error("⚠️ Subscription error:", error);
      alert("⚠️ Something went wrong. Try again later.");
    }
  });

  btn.addEventListener("click", () => {
    // Open affiliate page instantly in new tab
    window.open(
      "https://hop.clickbank.net/?affiliate=guddu110&vendor=hissecret&lp=0&tid=fb",
      "_blank"
    );

    hidePopup();
  });
});
