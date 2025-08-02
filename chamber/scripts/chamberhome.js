document.addEventListener("DOMContentLoaded", () => {
    const toggleButton = document.getElementById("menu-toggle");
    const navMenu = document.getElementById("nav-menu");
  
    toggleButton.addEventListener("click", () => {
      navMenu.classList.toggle("active");
    });
  });

function getRandomItems(array, count) {
    const shuffled = array.slice().sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
  }
  
  async function loadMembersHome() {
    try {
      const response = await fetch("data/members.json");
      if (!response.ok) throw new Error("Could not fetch members.json");
  
      const members = await response.json();
  
      const levelMap = {
        1: "Bronze",
        2: "Silver",
        3: "Gold"
      };
  
      const spotlightContainer = document.getElementById("spotlight-cards");
      if (!spotlightContainer) {
        console.error("Missing #spotlight-cards container");
        return;
      }
  
      const filtered = members.filter(m => m.membership === 2 || m.membership === 3);
      const selected = getRandomItems(filtered, 3);
  
      selected.forEach(member => {
        const card = document.createElement("div");
        card.classList.add("spotlight");
  
        card.innerHTML = `
          <img src="images/${member.image}" alt="${member.name}">
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
    } catch (error) {
      console.error("Error loading members:", error);
    }
  }
  
  async function fetchWeather() {
    const apiKey = "795b75c5a64f005f05bf50f83f68fe09";
    const city = "Johannesburg";
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  
    try {
      const response = await fetch(url);
      const data = await response.json();
  
      const weatherInfo = document.getElementById("weather-info");
      if (weatherInfo) {
        weatherInfo.innerHTML = `
          <p><strong>${data.name} Weather:</strong></p>
          <p>${data.weather[0].description}, ${data.main.temp}°C</p>
        `;
      }
    } catch (error) {
      console.error("Weather fetch failed:", error);
    }
  }
  
  // Run functions
  loadMembersHome();
  fetchWeather();

  const full = document.querySelector("#currentyear");
const day = document.querySelector("#lastModified");


const today = new Date();
let lastMod = new Date(document.lastModified);

full.innerHTML = `Today is <span class="highlight">${new Intl.DateTimeFormat(
	"en-US",
	{
		dateStyle: "full"
	}
).format(today)}</span>`;

day.innerHTML = `Last Modified:  <span class="highlight">${new Intl.DateTimeFormat(
	"en-US",
	{
		dateStyle: "full"
	}
).format(lastMod)}</span>`;

full.innerHTML = ` <span class="highlight">${today.getFullYear()}</span>`;

