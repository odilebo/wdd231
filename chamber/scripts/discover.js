async function loadPlaces() {
    const response = await fetch('data/discover.json');
    const places = await response.json();
    const container = document.getElementById('cards-container');
    container.innerHTML = ''; 
  
    places.forEach(place => {
      const card = document.createElement('article');
      card.classList.add('card');
      card.innerHTML = `
        <h2>${place.name}</h2>
        <figure>
          <img src="${place.image}" alt="${place.name}" loading="lazy">
        </figure>
        <address>${place.address}</address>
        <p>${place.description}</p>
        <button>Learn More</button>
      `;
      container.appendChild(card);
    });
  }
  
  function showVisitMessage() {
    const visitMessage = document.getElementById('visit-message');
    const now = Date.now();
    const lastVisit = localStorage.getItem('lastVisit');
  
    if (!lastVisit) {
      visitMessage.textContent = "Welcome! Let us know if you have any questions.";
    } else {
      const diffDays = Math.floor((now - lastVisit) / (1000 * 60 * 60 * 24));
      if (diffDays === 0) {
        visitMessage.textContent = "Back so soon! Awesome!";
      } else if (diffDays === 1) {
        visitMessage.textContent = "You last visited 1 day ago.";
      } else {
        visitMessage.textContent = `You last visited ${diffDays} days ago.`;
      }
    }
  
    localStorage.setItem('lastVisit', now);
  }
  
  
  function updateDates() {
    const full = document.querySelector("#currentyear");
    const day = document.querySelector("#lastModified");
    const today = new Date();
    const lastMod = new Date(document.lastModified);
  
    full.textContent = today.getFullYear();
  
    day.innerHTML = `Last Modified: <span class="highlight">${new Intl.DateTimeFormat("en-US", {
      dateStyle: "full"
    }).format(lastMod)}</span>`;
  }
  
  
  document.getElementById("menu-toggle").addEventListener("click", function() {
    document.querySelector(".navigation-links").classList.toggle("active");
  });
  
  loadPlaces();
  showVisitMessage();
  updateDates();
  