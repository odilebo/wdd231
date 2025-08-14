document.addEventListener("DOMContentLoaded", () => {
    // Navigation toggle
    const toggleButton = document.getElementById("menu-toggle");
    const navMenu = document.querySelector(".navigation-links"); // should target links
  
    toggleButton.addEventListener("click", () => {
      navMenu.classList.toggle("active");
    });
  
    // Load products
    const container = document.getElementById("cards-container");
    if (container) {
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
            container.appendChild(card);
          });
        })
        .catch(error => {
          console.error("Error loading products:", error);
          container.innerHTML = "<p>Failed to load products. Please try again later.</p>";
        });
    }
  });
  