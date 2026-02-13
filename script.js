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

  // Mobile menu
  if (navToggle && navLinks) {
    navToggle.addEventListener("click", () => {
      const isOpen = navLinks.classList.toggle("open");
      navToggle.setAttribute("aria-expanded", String(isOpen));
      if (!isOpen) closeAllDropdowns();
    });
  }

  // Dropdown toggles
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
