// Wait for both DOM and main.js to load
let productsLoaded = false;
let domLoaded = false;

function initProductPage() {
    if (!productsLoaded || !domLoaded) return;

    // Get product ID from URL
    const urlParams = new URLSearchParams(window.location.search);
    const productId = parseInt(urlParams.get('id'));

    // Find the product
    const product = products.find(p => p.id === productId);

    if (product) {
        // Update page title
        document.title = `${product.name} - PrintParadise`;

        // Update product details
        document.querySelector('.product-title').textContent = product.name;
        document.querySelector('.product-price').textContent = `$${product.price.toFixed(2)}`;
        document.querySelector('.product-description').textContent = product.description;
        document.querySelector('.category span').textContent = product.category;
        document.querySelector('.sku span').textContent = product.id;

        // Set product image
        const mainImage = document.querySelector('.main-image');
        mainImage.innerHTML = `
            <div class="loading-spinner"></div>
            <img src="${product.image}" 
                alt="${product.name}"
                onload="this.parentElement.classList.add('loaded')"
                onerror="this.src='data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjQwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZjBmMGYwIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxNiIgZmlsbD0iIzY2NiIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPkltYWdlIG5vdCBhdmFpbGFibGU8L3RleHQ+PC9zdmc+'; this.parentElement.classList.add('error')"
            >
        `;

        // Quantity selector functionality
        const quantityInput = document.querySelector('.quantity-input');
        const minusBtn = document.querySelector('.quantity-btn.minus');
        const plusBtn = document.querySelector('.quantity-btn.plus');

        minusBtn.addEventListener('click', () => {
            const currentValue = parseInt(quantityInput.value);
            if (currentValue > 1) {
                quantityInput.value = currentValue - 1;
            }
        });

        plusBtn.addEventListener('click', () => {
            const currentValue = parseInt(quantityInput.value);
            if (currentValue < 99) {
                quantityInput.value = currentValue + 1;
            }
        });

        // Add to cart functionality
        const addToCartBtn = document.querySelector('.add-to-cart-btn');
        addToCartBtn.addEventListener('click', () => {
            const quantity = parseInt(quantityInput.value);
            for (let i = 0; i < quantity; i++) {
                addToCart(product.id);
            }
        });
    } else {
        // Handle product not found
        document.querySelector('.product-details-container').innerHTML = `
            <div class="product-not-found">
                <h2>Product Not Found</h2>
                <p>Sorry, the product you're looking for doesn't exist.</p>
                <a href="shop.html" class="cta-button">Return to Shop</a>
            </div>
        `;
    }
}

// Listen for DOM content loaded
document.addEventListener('DOMContentLoaded', () => {
    domLoaded = true;
    initProductPage();
});

// Listen for main.js to load products
window.addEventListener('productsLoaded', () => {
    productsLoaded = true;
    initProductPage();
}); 
