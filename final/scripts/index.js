document.addEventListener("DOMContentLoaded", () => {
    // Navigation toggle
    const toggleButton = document.getElementById("menu-toggle");
    const navMenu = document.querySelector(".navigation-links");
  
    toggleButton.addEventListener("click", () => {
      navMenu.classList.toggle("active");
    });
  
    // Load products if container exists
    const productsContainer = document.getElementById("cards-container");
    if (productsContainer) {
      fetch("data/products.json")
        .then(response => {
          if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
          return response.json();
        })
        .then(products => {
          products.forEach(product => {
            const card = document.createElement("div");
            card.classList.add("product-card");
            card.innerHTML = `
              <img src="${product.image}" alt="${product.name}" loading="lazy">
              <h2>${product.name}</h2>
              <p>${product.description}</p>
              <p><strong>Category:</strong> ${product.category}</p>
              <p><strong>Price:</strong> R${product.price}</p>
            `;
            productsContainer.appendChild(card);
          });
        })
        .catch(error => {
          console.error("Error loading products:", error);
          productsContainer.innerHTML = "<p>Failed to load products. Please try again later.</p>";
        });
    }
  
    // Spotlight members
    function getRandomItems(array, count) {
      const shuffled = array.slice().sort(() => 0.5 - Math.random());
      return shuffled.slice(0, count);
    }
  
    const spotlightContainer = document.getElementById("spotlight-cards");
    if (spotlightContainer) {
      fetch("data/done.json")
        .then(response => {
          if (!response.ok) throw new Error("Could not fetch members.json");
          return response.json();
        })
        .then(members => {
          const levelMap = { 1: "Bronze", 2: "Silver", 3: "Gold" };
          const filtered = members.filter(m => m.membership === 2 || m.membership === 3);
          const selected = getRandomItems(filtered, 3);
  
          selected.forEach(member => {
            const card = document.createElement("div");
            card.classList.add("spotlight");
            card.innerHTML = `
              <img src="${member.image}" alt="${member.name}">
              <div>
                <h3>${member.name}</h3>
                <p><strong>Phone:</strong> ${member.phone}</p>
                <p><strong>Address:</strong> ${member.address}</p>
                <p><a href="${member.website}" target="_blank">Visit Website</a></p>
                <p><strong>Membership:</strong> ${levelMap[member.membership]}</p>
                <p>${member.description}</p>
              </div>
            `;
            spotlightContainer.appendChild(card);
          });
        })
        .catch(error => console.error("Error loading members:", error));
    }
  
    // Fetch weather
    const weatherInfo = document.getElementById("weather-info");
    if (weatherInfo) {
      const apiKey = "795b75c5a64f005f05bf50f83f68fe09";
      const city = "Johannesburg";
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  
      fetch(url)
        .then(response => response.json())
        .then(data => {
          weatherInfo.innerHTML = `
            <p><strong>${data.name} Weather:</strong></p>
            <p>${data.weather[0].description}, ${data.main.temp}°C</p>
          `;
        })
        .catch(error => console.error("Weather fetch failed:", error));
    }
  
    // Footer dates
    const full = document.querySelector("#currentyear");
    const day = document.querySelector("#lastModified");
    const today = new Date();
    const lastMod = new Date(document.lastModified);
  
    if (full) full.textContent = today.getFullYear();
    if (day) day.textContent = `Last Modified: ${lastMod.toLocaleDateString()}`;
  });
  