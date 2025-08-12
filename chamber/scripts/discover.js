async function loadPlaces() {
    const response = await fetch('data/discover.json');
    const places = await response.json();
    const container = document.getElementById('cards-container');

    places.forEach(place => {
        const card = document.createElement('article');
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

function checkLastVisit() {
    const visitMessage = document.getElementById('visit-message');
    const lastVisit = localStorage.getItem('lastVisit');
    const now = Date.now();

    if (lastVisit) {
        const daysPassed = Math.floor((now - lastVisit) / (1000 * 60 * 60 * 24));
        if (daysPassed === 0) {
            visitMessage.textContent = "Welcome back! You visited today.";
        } else if (daysPassed <= 7) {
            visitMessage.textContent = `Welcome back! You last visited ${daysPassed} days ago.`;
        } else {
            visitMessage.textContent = "It's been a while! Check out what's new.";
        }
    } else {
        visitMessage.textContent = "Welcome! This is your first visit.";
    }

    localStorage.setItem('lastVisit', now);
}

loadPlaces();
checkLastVisit();

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

document.getElementById("menu-toggle").addEventListener("click", function() {
    document.querySelector(".navigation-links").classList.toggle("active");
  });