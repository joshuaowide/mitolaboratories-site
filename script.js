(function () {
  const navToggle = document.querySelector("[data-nav-toggle]");
  const navLinks = document.querySelector("[data-nav-links]");

  if (!navToggle || !navLinks) return;

  function closeMobileNav() {
    navLinks.classList.remove("open");
    navToggle.setAttribute("aria-expanded", "false");
  }

  // Toggle mobile nav
  navToggle.addEventListener("click", (e) => {
    e.stopPropagation();
    const isOpen = navLinks.classList.toggle("open");
    navToggle.setAttribute("aria-expanded", String(isOpen));
  });

  // Close mobile nav when clicking outside
  document.addEventListener("click", (e) => {
    if (!e.target.closest(".site-header")) {
      closeMobileNav();
    }
  });

  // Close on ESC
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      closeMobileNav();
    }
  });

  // Optional: close menu after tapping a link (useful on mobile)
  navLinks.addEventListener("click", (e) => {
    const link = e.target.closest("a");
    if (link) closeMobileNav();
  });
})();
