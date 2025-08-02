
  const container = document.getElementById("membersContainer");
  const gridBtn = document.getElementById("gridViewBtn");
  const listBtn = document.getElementById("listViewBtn");

  async function loadMembers() {
    try {
      const response = await fetch('data/members.json');
      const members = await response.json();
      displayMembers(members);
    } catch (error) {
      console.error('Failed to load members:', error);
    }
  }

  function displayMembers(members) {
    container.innerHTML = '';
    members.forEach(member => {
      const card = document.createElement('div');
      card.className = 'member-card';

      card.innerHTML = `
        <img src="images/${member.image}" alt="${member.name}">
        <div>
          <h3>${member.name}</h3>
          <p><strong>Membership:</strong> ${membershipLabel(member.membership)}</p>
          <p><strong>Address:</strong> ${member.address}</p>
          <p><strong>Phone:</strong> ${member.phone}</p>
          <p><a href="${member.website}" target="_blank">Visit Website</a></p>
          <p>${member.description}</p>
        </div>
      `;

      container.appendChild(card);
    });
  }

  function membershipLabel(level) {
    switch (level) {
      case 1: return "Member";
      case 2: return "Silver";
      case 3: return "Gold";
      default: return "Unknown";
    }
  }

  // View toggle functionality
  gridBtn.addEventListener('click', () => {
    container.classList.add('grid-view');
    container.classList.remove('list-view');
  });

  listBtn.addEventListener('click', () => {
    container.classList.add('list-view');
    container.classList.remove('grid-view');
  });

  // Load members on page load
  loadMembers();

  // Replace with your actual OpenWeatherMap API key
const apiKey = 'YOUR_API_KEY';
const city = 'Johannesburg';

// ===== WEATHER SECTION =====

// Fetch and display current weather
fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`)
  .then(response => response.json())
  .then(data => {
    const temp = data.main.temp.toFixed(1);
    const description = data.weather[0].description;
    document.getElementById('current-weather').innerHTML = `
      <h3>Now in ${data.name}</h3>
      <p><strong>${temp}°C</strong> – ${description}</p>
    `;
  })
  .catch(error => {
    document.getElementById('current-weather').textContent = 'Unable to load current weather.';
    console.error('Current weather error:', error);
  });

// Fetch and display 3-day forecast
fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&cnt=24&appid=${apiKey}`)
  .then(response => response.json())
  .then(data => {
    const forecastContainer = document.getElementById('forecast-weather');
    const dailyTemps = {};

    data.list.forEach(item => {
      const [date, time] = item.dt_txt.split(' ');
      if (time === '12:00:00') {
        dailyTemps[date] = item.main.temp.toFixed(1);
      }
    });

    let forecastHTML = `<h3>3-Day Forecast</h3><ul>`;
    Object.entries(dailyTemps).slice(0, 3).forEach(([date, temp]) => {
      forecastHTML += `<li><strong>${date}</strong>: ${temp}°C</li>`;
    });
    forecastHTML += `</ul>`;
    forecastContainer.innerHTML = forecastHTML;
  })
  .catch(error => {
    document.getElementById('forecast-weather').textContent = 'Unable to load forecast.';
    console.error('Forecast error:', error);
  });

// ===== SPOTLIGHT SECTION =====

// Utility function: get random items from array
function getRandomItems(array, count) {
  const shuffled = array.sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
}

// Load and display random gold/silver members
fetch('members.json')
  .then(response => response.json())
  .then(members => {
    const filtered = members.filter(member =>
      member.membership === 'gold' || member.membership === 'silver'
    );
    const selected = getRandomItems(filtered, 3); // change 3 to 2 if needed

    const spotlightContainer = document.getElementById('spotlight-cards');
    selected.forEach(member => {
      const card = `
        <div class="spotlight">
          <img src="${member.logo}" alt="${member.name} logo">
          <h3>${member.name}</h3>
          <p><strong>Phone:</strong> ${member.phone}</p>
          <p><strong>Address:</strong> ${member.address}</p>
          <p><strong>Website:</strong> <a href="${member.website}" target="_blank">${member.website}</a></p>
          <p><strong>Membership:</strong> ${member.membership.toUpperCase()}</p>
        </div>
      `;
      spotlightContainer.innerHTML += card;
    });
  })
  .catch(error => {
    console.error('Error loading member data:', error);
  });


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
