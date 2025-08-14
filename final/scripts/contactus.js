document.addEventListener("DOMContentLoaded", () => {
    // Toggle mobile navigation
    const toggleButton = document.getElementById("menu-toggle");
    const navMenu = document.querySelector(".navigation-links");
  
    toggleButton.addEventListener("click", () => {
      navMenu.classList.toggle("active");
    });
  
    // Display current year
    const yearSpan = document.getElementById("currentyear");
    const today = new Date();
    yearSpan.textContent = today.getFullYear();
  
    // Display last modified date
    const lastModSpan = document.getElementById("lastModified");
    const lastMod = new Date(document.lastModified);
    lastModSpan.textContent = `Last Modified: ${lastMod.toLocaleDateString()}`;
  });
  