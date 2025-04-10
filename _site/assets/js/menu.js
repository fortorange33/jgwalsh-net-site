// Toggle mobile menu when the hamburger icon is clicked
document.addEventListener("DOMContentLoaded", () => {
  const toggleBtn = document.getElementById("menuToggle");
  const mobileMenu = document.getElementById("mobileMenu");

  if (toggleBtn && mobileMenu) {
    toggleBtn.addEventListener("click", () => {
      const isHidden = mobileMenu.classList.contains("hidden");
      mobileMenu.classList.toggle("hidden");

      // Update ARIA attribute for accessibility
      toggleBtn.setAttribute("aria-expanded", !isHidden);
    });
  } else {
    console.warn("❗ menuToggle or mobileMenu not found in DOM.");
  }
});