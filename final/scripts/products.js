document.addEventListener("DOMContentLoaded", () => {
    const container = document.getElementById("cards-container");

    fetch("data/products.json")
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then(products => {
            products.forEach(product => {
                const card = document.createElement("div");
                card.classList.add("product-card");

                card.innerHTML = `
                    <img src="images/${product.image}" alt="${product.name}">
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
});
