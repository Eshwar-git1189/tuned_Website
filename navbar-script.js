// Universal Navigation Script

function initNavbar() {
  // Mobile menu toggle
  const mobileToggle = document.getElementById("mobileToggle");
  const navLinksContainer = document.getElementById("navLinks");

  if (mobileToggle && navLinksContainer) {
    mobileToggle.addEventListener("click", function () {
      navLinksContainer.classList.toggle("active");
      mobileToggle.classList.toggle("active");
    });

    // Close mobile menu when clicking on a link
    navLinksContainer.addEventListener("click", function (e) {
      if (e.target.tagName === "A") {
        navLinksContainer.classList.remove("active");
        mobileToggle.classList.remove("active");
      }
    });

    // Close mobile menu when clicking outside
    document.addEventListener("click", function (e) {
      const navbar = document.querySelector(".navbar");
      if (navbar && !navbar.contains(e.target)) {
        navLinksContainer.classList.remove("active");
        mobileToggle.classList.remove("active");
      }
    });
  }

  // Set active page - improved logic
  const currentPage = window.location.pathname.split("/").pop() || "index.html";
  const navLinkAnchors = document.querySelectorAll(".nav-links a");

  if (navLinkAnchors && navLinkAnchors.length) {
    navLinkAnchors.forEach((link) => {
      const href = link.getAttribute("href");
      // Remove active class from all links first
      link.classList.remove("active");

      // Check if current page matches the link
      if (
        href === currentPage ||
        (currentPage === "" && href === "index.html") ||
        (currentPage.includes("event") && href.includes("event")) ||
        (currentPage.includes("contact") && href.includes("contact")) ||
        (currentPage.includes("about") && href.includes("about")) ||
        (currentPage.includes("team") && href.includes("team"))
      ) {
        link.classList.add("active");
      }
    });

    // Also handle clicks to set active state
    navLinkAnchors.forEach((link) => {
      link.addEventListener("click", function () {
        navLinkAnchors.forEach((l) => l.classList.remove("active"));
        this.classList.add("active");
      });
    });
  }

  // Add scroll effect to navbar
  const navbar = document.querySelector(".navbar");
  if (navbar) {
    window.addEventListener("scroll", function () {
      if (window.scrollY > 100) {
        navbar.classList.add("scrolled");
      } else {
        navbar.classList.remove("scrolled");
      }
    });
  }

  // Theme toggle initialization (safe to call even if navbar elements missing)
  function initTheme() {
    const themeToggle = document.getElementById("themeToggle");
    const themeIcon = document.getElementById("themeIcon");
    const themeText = document.getElementById("themeText");
    const body = document.body;

    function updateThemeIcon(theme) {
      if (!themeIcon || !themeText) return;
      if (theme === "dark") {
        themeIcon.className = "fas fa-sun";
        themeText.textContent = "Light";
      } else {
        themeIcon.className = "fas fa-moon";
        themeText.textContent = "Dark";
      }
    }

    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) {
      body.setAttribute("data-theme", savedTheme);
      updateThemeIcon(savedTheme);
    }

    if (themeToggle) {
      themeToggle.addEventListener("click", function () {
        const currentTheme = body.getAttribute("data-theme");
        const newTheme = currentTheme === "dark" ? "light" : "dark";
        body.setAttribute("data-theme", newTheme);
        localStorage.setItem("theme", newTheme);
        updateThemeIcon(newTheme);
      });
    }
  }

  initTheme();
}

// Initialize on DOM ready in case navbar is already present
document.addEventListener("DOMContentLoaded", initNavbar);

// Also listen for an explicit event after navbar HTML is injected
document.addEventListener("navbarInserted", initNavbar);
