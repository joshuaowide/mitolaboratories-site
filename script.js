(function () {
  const navToggle = document.querySelector("[data-nav-toggle]");
  const navLinks  = document.querySelector("[data-nav-links]");
  if (!navToggle || !navLinks) return;

  const dropdownItems = Array.from(navLinks.querySelectorAll(".nav-item.has-dropdown"));

  const mqMobile  = window.matchMedia("(max-width: 860px)");
  const mqNoHover = window.matchMedia("(hover: none)");

  function clickToOpenMode() {
    // Mobile width OR touch devices (tablets, etc.)
    return mqMobile.matches || mqNoHover.matches;
  }

  function closeAllDropdowns() {
    dropdownItems.forEach((item) => {
      item.classList.remove("open");
      const trigger = item.querySelector("[data-dropdown-toggle]");
      if (trigger) trigger.setAttribute("aria-expanded", "false");
    });
  }

  function closeMobileNav() {
    navLinks.classList.remove("open");
    navToggle.setAttribute("aria-expanded", "false");
    closeAllDropdowns();
  }

  // Toggle mobile nav
  navToggle.addEventListener("click", (e) => {
    e.stopPropagation();
    const isOpen = navLinks.classList.toggle("open");
    navToggle.setAttribute("aria-expanded", String(isOpen));
    if (!isOpen) closeAllDropdowns();
  });

  // Dropdown toggles (tap/click in click-to-open mode)
  dropdownItems.forEach((item) => {
    const trigger = item.querySelector("[data-dropdown-toggle]");
    if (!trigger) return;

    // Ensure basic ARIA is present
    trigger.setAttribute("aria-haspopup", "true");
    if (!trigger.hasAttribute("aria-expanded")) {
      trigger.setAttribute("aria-expanded", "false");
    }

    function setOpen(nextOpen) {
      item.classList.toggle("open", nextOpen);
      trigger.setAttribute("aria-expanded", String(nextOpen));
    }

    trigger.addEventListener("click", (e) => {
      if (!clickToOpenMode()) return; // desktop: allow normal link + hover

      e.preventDefault(); // don't navigate on first tap
      e.stopPropagation();

      const isOpen = !item.classList.contains("open");
      setOpen(isOpen);

      // accordion behavior (close other dropdowns)
      dropdownItems.forEach((other) => {
        if (other !== item) {
          other.classList.remove("open");
          const otherTrigger = other.querySelector("[data-dropdown-toggle]");
          if (otherTrigger) otherTrigger.setAttribute("aria-expanded", "false");
        }
      });
    });

    // Keyboard niceties (works in both modes)
    trigger.addEventListener("keydown", (e) => {
      if (e.key === "Escape") {
        setOpen(false);
        trigger.blur();
        return;
      }

      // In click-to-open mode, allow Space/Enter to toggle without navigating
      if (clickToOpenMode() && (e.key === "Enter" || e.key === " ")) {
        e.preventDefault();
        const isOpen = !item.classList.contains("open");
        setOpen(isOpen);
      }
    });
  });

  // Close when clicking outside header
  document.addEventListener("click", (e) => {
    if (!e.target.closest(".site-header")) {
      // If mobile nav is open, close it; also close any open dropdowns
      closeMobileNav();
    }
  });

  // Close on ESC (mobile nav + dropdowns)
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeMobileNav();
  });

  // Close mobile nav after tapping a REAL link (not a dropdown toggle)
  navLinks.addEventListener("click", (e) => {
    const link = e.target.closest("a");
    if (!link) return;
    if (link.matches("[data-dropdown-toggle]")) return;
    closeMobileNav();
  });

  // Cleanup when switching between modes (more reliable than resize alone)
  function handleModeChange() {
    if (!clickToOpenMode()) {
      navLinks.classList.remove("open");
      navToggle.setAttribute("aria-expanded", "false");
      closeAllDropdowns();
    } else {
      // When entering click-to-open mode, ensure hover-open isn't "stuck"
      closeAllDropdowns();
    }
  }

  window.addEventListener("resize", handleModeChange);
  if (mqMobile.addEventListener) mqMobile.addEventListener("change", handleModeChange);
  if (mqNoHover.addEventListener) mqNoHover.addEventListener("change", handleModeChange);
})();
