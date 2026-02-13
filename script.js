(function () {
  const navToggle = document.querySelector("[data-nav-toggle]");
  const navLinks = document.querySelector("[data-nav-links]");
  const dropdownToggles = Array.from(document.querySelectorAll("[data-dropdown-toggle]"));

  function closeAllDropdowns(except = null) {
    dropdownToggles.forEach((btn) => {
      if (except && btn === except) return;
      const parent = btn.closest(".has-dropdown");
      if (parent) parent.classList.remove("open");
      btn.setAttribute("aria-expanded", "false");
    });
  }

  function closeMobileNav() {
    if (!navLinks) return;
    navLinks.classList.remove("open");
    if (navToggle) navToggle.setAttribute("aria-expanded", "false");
  }

  // Mobile menu toggle
  if (navToggle && navLinks) {
    navToggle.addEventListener("click", () => {
      const isOpen = navLinks.classList.toggle("open");
      navToggle.setAttribute("aria-expanded", String(isOpen));
      if (!isOpen) closeAllDropdowns();
    });
  }

  // Dropdown toggles (tap/click)
  dropdownToggles.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      const parent = btn.closest(".has-dropdown");
      if (!parent) return;

      const isOpen = parent.classList.toggle("open");
      btn.setAttribute("aria-expanded", String(isOpen));

      if (isOpen) closeAllDropdowns(btn);
    });
  });

  // Close menus when clicking outside
  document.addEventListener("click", (e) => {
    const target = e.target;
    const clickedInsideNav = target.closest(".site-header");
    if (!clickedInsideNav) {
      closeAllDropdowns();
      closeMobileNav();
    }
  });

  // ESC closes everything
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      closeAllDropdowns();
      closeMobileNav();
    }
  });

  // If user clicks a normal link on mobile, close menu
  if (navLinks) {
    navLinks.addEventListener("click", (e) => {
      const a = e.target.closest("a");
      if (!a) return;
      // allow mailto to behave normally, but still close nav
      closeAllDropdowns();
      closeMobileNav();
    });
  }
})();
