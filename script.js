// http://localhost:3000
// http://demo2-d05j.onrender.com

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

function showPopup() {
  document.getElementById("popup").style.display = "flex";
}

let popupInterval;

window.addEventListener("load", () => {
  if (!localStorage.getItem("subscribe")) {
    popupInterval = setInterval(() => {
      showPopup();
    }, 10000);
  }
});

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

// redirecting to new page
document.addEventListener("DOMContentLoaded", function () {
  const btn = document.getElementById("subscribe-btn");
  const form = document.getElementById("subscribe-form");

  btn.addEventListener("click", function (e) {
    e.preventDefault();

    // open new tab
    window.open(
      "https://hop.clickbank.net/?affiliate=guddu110&vendor=hissecret&lp=0&tid=fb",
      "_blank"
    );

    // reset the form after redirect
    form.reset();
  });
});

// Data sending to backend
document
  .getElementById("subscribe-form")
  .addEventListener("submit", async (e) => {
    e.preventDefault();
    const email = document.getElementById("email").value;

    let response = await fetch(
      "https://globalapp-name-0d4885bd142a.herokuapp.com/subscribe",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      }
    );
    if (response.ok) {
      alert("✅ Subscription successful!");
      document.getElementById("email").value = "";
      hidePopup();
      clearInterval(popupInterval);
      localStorage.setItem("subscribe", true);
    } else {
      alert("🔴 Error saving email");
    }
  });
