(function () {
  const navToggle = document.querySelector("[data-nav-toggle]");
  const navLinks = document.querySelector("[data-nav-links]");

  if (navToggle && navLinks) {
    navToggle.addEventListener("click", () => {
      const isOpen = navLinks.classList.toggle("open");
      navToggle.setAttribute("aria-expanded", String(isOpen));
    });
  }

  // Close mobile nav when clicking outside
  document.addEventListener("click", (e) => {
    if (!e.target.closest(".site-header")) {
      if (navLinks) navLinks.classList.remove("open");
      if (navToggle) navToggle.setAttribute("aria-expanded", "false");
    }
  });

  // Close on ESC
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      if (navLinks) navLinks.classList.remove("open");
      if (navToggle) navToggle.setAttribute("aria-expanded", "false");
    }
  });
})();


  // Click outside closes
  document.addEventListener("click", (e) => {
    if (!e.target.closest(".site-header")) {
      closeAllDropdowns();
      if (navLinks) navLinks.classList.remove("open");
      if (navToggle) navToggle.setAttribute("aria-expanded", "false");
    }
  });

  // Esc closes
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      closeAllDropdowns();
      if (navLinks) navLinks.classList.remove("open");
      if (navToggle) navToggle.setAttribute("aria-expanded", "false");
    }
  });
})();
