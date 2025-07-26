
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
