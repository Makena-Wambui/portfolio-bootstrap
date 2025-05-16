// Wait for DOM to be fully loaded
document.addEventListener("DOMContentLoaded", function () {
  // Navbar scroll behavior
  const mainNav = document.getElementById("mainNav");

  function handleNavbarScroll() {
    if (window.scrollY > 50) {
      mainNav.classList.add("navbar-shrink");
      mainNav.style.padding = "8px 0";
    } else {
      mainNav.classList.remove("navbar-shrink");
      mainNav.style.padding = "15px 0";
    }
  }

  // Add scroll event listener
  window.addEventListener("scroll", handleNavbarScroll);

  // Smooth scrolling for navigation links
  document
    .querySelectorAll('a.nav-link, a[href^="#"]:not(.portfolio-link)')
    .forEach((anchor) => {
      anchor.addEventListener("click", function (e) {
        const targetId = this.getAttribute("href");

        // Only process if it's an internal anchor link
        if (targetId.startsWith("#") && targetId.length > 1) {
          e.preventDefault();

          const targetElement = document.querySelector(targetId);
          if (targetElement) {
            // Calculate offset for fixed navbar
            const navbarHeight = mainNav.clientHeight;
            const targetPosition =
              targetElement.getBoundingClientRect().top +
              window.scrollY -
              navbarHeight;

            // Smooth scroll to target
            window.scrollTo({
              top: targetPosition,
              behavior: "smooth",
            });

            // Close mobile menu if open
            const navbarToggler = document.querySelector(".navbar-toggler");
            const navbarCollapse = document.querySelector(".navbar-collapse");
            if (navbarCollapse.classList.contains("show")) {
              navbarToggler.click();
            }
          }
        }
      });
    });

  // Contact form submission
  const contactForm = document.getElementById("contactForm");

  if (contactForm) {
    contactForm.addEventListener("submit", async function (e) {
      e.preventDefault();

      const formData = new FormData(contactForm);

      try {
        const response = await fetch(contactForm.action, {
          method: "POST",
          body: formData,
          headers: {
            Accept: "application/json",
          },
        });

        if (response.ok) {
          alert("✅ Message sent! Check your email.");
          contactForm.reset();
        } else {
          alert("⚠️ There was a problem submitting the form.");
        }
      } catch (error) {
        alert("❌ Network error. Please try again later.");
      }

      // Reset the form after submission
      contactForm.reset();
    });
  }
  // Fallback for browsers that don't support fetch
  if (!window.fetch) {
    contactForm.addEventListener("submit", function (e) {
      e.preventDefault();
      alert(
        "⚠️ Your browser does not support modern features. Please use a different browser."
      );
    });
  }

  // Add animation for skill cards on scroll
  const observerOptions = {
    threshold: 0.2,
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("animated");
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  // Observe all skill cards
  document.querySelectorAll(".skill-card").forEach((card) => {
    observer.observe(card);
  });

  // Type writer effect for the hero section title
  const titleElement = document.querySelector(".hero .title");
  if (titleElement) {
    const originalText = titleElement.textContent;
    titleElement.textContent = "";

    let i = 0;
    const typeWriter = () => {
      if (i < originalText.length) {
        titleElement.textContent += originalText.charAt(i);
        i++;
        setTimeout(typeWriter, 100);
      }
    };

    // Start the typewriter effect after a delay
    setTimeout(typeWriter, 500);
  }
});

// Dark theme toggle
const themeToggle = document.getElementById("themeToggle");
const root = document.documentElement;

function applySavedTheme() {
  const savedTheme = localStorage.getItem("theme");
  if (savedTheme === "dark") {
    root.setAttribute("data-theme", "dark");
    themeToggle.textContent = "☀️";
  } else {
    root.setAttribute("data-theme", "light");
    themeToggle.textContent = "🌙";
  }
}

themeToggle.addEventListener("click", () => {
  const currentTheme = root.getAttribute("data-theme") || "light";
  const newTheme = currentTheme === "dark" ? "light" : "dark";
  root.setAttribute("data-theme", newTheme);
  localStorage.setItem("theme", newTheme);
  themeToggle.textContent = newTheme === "dark" ? "☀️" : "🌙";
});

applySavedTheme();
