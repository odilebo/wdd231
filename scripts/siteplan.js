// Navigation toggle
document.addEventListener("DOMContentLoaded", () => {
    const toggleButton = document.getElementById("menu-toggle");
    const navMenu = document.querySelector(".navigation-links");
  
    toggleButton.addEventListener("click", () => {
      navMenu.classList.toggle("active");
    });
  
    // Footer dates
    const full = document.querySelector("#currentyear");
    const day = document.querySelector("#lastModified");
    const today = new Date();
    const lastMod = new Date(document.lastModified);
  
    if(full) full.innerHTML = `${today.getFullYear()}`;
    if(day) day.innerHTML = `Last Modified: ${lastMod.toLocaleDateString()}`;
  });
  