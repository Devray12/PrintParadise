// Cart functionality
let cart = JSON.parse(localStorage.getItem('cart')) || [];
updateCartCount();

// Sample product data (in a real application, this would come from a backend)
const products = [
    {
        id: 1,
        name: "My Hero Academia - Class 1-A",
        price: 24.99,
        image: "./images/products/mha-class.jpg",
        category: "posters",
        description: "Colorful poster featuring the entire Class 1-A"
    },
    {
        id: 2,
        name: "One Piece - Straw Hat Crew",
        price: 29.99,
        image: "./images/products/one-piece-crew.jpg",
        category: "posters",
        description: "Dynamic poster of the Straw Hat Pirates"
    },
    {
        id: 3,
        name: "Jujutsu Kaisen - Gojo Satoru",
        price: 39.99,
        image: "./images/products/jjk-gojo.jpg",
        category: "wallscrolls",
        description: "Stunning wall scroll of Gojo Satoru"
    },
    {
        id: 4,
        name: "Naruto - Akatsuki Collection",
        price: 44.99,
        image: "./images/products/naruto-akatsuki.jpg",
        category: "wallscrolls",
        description: "Complete Akatsuki members collection wall scroll"
    },
    {
        id: 5,
        name: "Tokyo Revengers - Chibi Set",
        price: 19.99,
        image: "./images/products/tokyo-rev.jpg",
        category: "merchandise",
        description: "Cute chibi sticker set of Tokyo Revengers characters"
    },
    {
        id: 6,
        name: "Demon Slayer - Corps Collection",
        price: 34.99,
        image: "./images/products/demon-slayer.jpg",
        category: "posters",
        description: "Epic collection of Demon Slayer Corps members"
    },
    {
        id: 7,
        name: "Attack on Titan - Survey Corps",
        price: 32.99,
        image: "./images/products/aot-survey.jpg",
        category: "wallscrolls",
        description: "Survey Corps in action wall scroll"
    },
    {
        id: 8,
        name: "Chainsaw Man - Power",
        price: 27.99,
        image: "./images/products/chainsaw.jpg",
        category: "posters",
        description: "Vibrant poster featuring Power from Chainsaw Man"
    },
    {
        id: 9,
        name: "Dragon Ball - Super Saiyans",
        price: 36.99,
        image: "./images/products/dragon-ball.jpg",
        category: "wallscrolls",
        description: "Legendary Super Saiyan transformations wall scroll"
    },
    {
        id: 10,
        name: "Takumi Fujiwara AE86 Initial-D",
        price: 42.99,
        image: "./images/products/takumi-ae86.jpg",
        category: "posters",
        description: "Iconic night racing scene featuring Takumi's legendary AE86 Trueno from Initial D"
    },
    {
        id: 11,
        name: "F1 Red Bull Racing 2025 Tokyo Livery",
        price: 49.99,
        image: "./images/products/redbull-tokyo.jpg",
        category: "posters",
        description: "Limited edition poster of Red Bull Racing's special Tokyo-themed Formula 1 livery"
    }
];

// Dispatch event to notify that products are loaded
window.dispatchEvent(new Event('productsLoaded'));

// Carousel functionality
let currentSlide = 0;
const slidesToShow = 3; // Number of products to show at once in desktop view

function updateCarousel() {
    const carousel = document.querySelector('.carousel-items');
    if (!carousel) return;

    // Calculate total number of slides needed
    const totalSlides = products.length;
    
    // Clear current carousel items
    carousel.innerHTML = '';
    
    // Calculate which products to show
    for (let i = 0; i < slidesToShow; i++) {
        const productIndex = (currentSlide + i) % totalSlides;
        const product = products[productIndex];
        const productElement = createProductElement(product);
        
        // Add position class for animation
        productElement.classList.add('carousel-item');
        if (i === 0) productElement.classList.add('left');
        if (i === 1) productElement.classList.add('center');
        if (i === 2) productElement.classList.add('right');
        
        carousel.appendChild(productElement);
    }

    // Update carousel indicators
    const indicators = document.querySelector('.carousel-indicators');
    if (indicators) {
        indicators.innerHTML = '';
        for (let i = 0; i < totalSlides; i++) {
            const dot = document.createElement('span');
            dot.className = `carousel-dot ${i === currentSlide ? 'active' : ''}`;
            dot.onclick = () => {
                currentSlide = i;
                updateCarousel();
            };
            indicators.appendChild(dot);
        }
    }

    // Update navigation buttons state
    const prevButton = document.querySelector('.carousel-button.prev');
    const nextButton = document.querySelector('.carousel-button.next');
    
    if (prevButton && nextButton) {
        prevButton.disabled = false;
        nextButton.disabled = false;
        prevButton.style.opacity = '1';
        nextButton.style.opacity = '1';
    }
}

function nextSlide() {
    currentSlide = (currentSlide + 1) % products.length;
    const carousel = document.querySelector('.carousel-items');
    if (carousel) {
        carousel.classList.add('sliding-next');
        setTimeout(() => {
            updateCarousel();
            carousel.classList.remove('sliding-next');
        }, 300);
    }
}

function previousSlide() {
    currentSlide = (currentSlide - 1 + products.length) % products.length;
    const carousel = document.querySelector('.carousel-items');
    if (carousel) {
        carousel.classList.add('sliding-prev');
        setTimeout(() => {
            updateCarousel();
            carousel.classList.remove('sliding-prev');
        }, 300);
    }
}

// Mobile menu functionality
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

if (hamburger) {
    hamburger.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        hamburger.classList.toggle('active');
    });
}

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    if (navMenu && navMenu.classList.contains('active') && !e.target.closest('.nav-container')) {
        navMenu.classList.remove('active');
        hamburger.classList.remove('active');
    }
});

// Smooth scroll functionality
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});

// Cart functionality
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) return;

    const existingItem = cart.find(item => item.id === productId);
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            id: product.id,
            name: product.name,
            price: product.price,
            image: product.image,
            quantity: 1
        });
    }

    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
    showNotification('Item added to cart!');
}

function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
    if (window.location.pathname.includes('cart.html')) {
        updateCartDisplay();
    }
}

function updateQuantity(productId, newQuantity) {
    const item = cart.find(item => item.id === productId);
    if (item) {
        item.quantity = Math.max(1, newQuantity);
        localStorage.setItem('cart', JSON.stringify(cart));
        updateCartCount();
        if (window.location.pathname.includes('cart.html')) {
            updateCartDisplay();
        }
    }
}

function updateCartCount() {
    const cartCount = document.querySelector('.cart-count');
    if (cartCount) {
        const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
        cartCount.textContent = totalItems;
    }
}

// Product filtering and sorting
function filterProducts(category) {
    const productElements = document.querySelectorAll('.product-item');
    productElements.forEach(elem => {
        const productCategory = elem.getAttribute('data-category');
        if (category === 'all' || productCategory === category) {
            elem.style.display = 'block';
        } else {
            elem.style.display = 'none';
        }
    });
}

function sortProducts(method) {
    const productGrid = document.querySelector('.product-grid');
    if (!productGrid) return;

    const products = Array.from(productGrid.children);
    
    products.sort((a, b) => {
        const priceA = parseFloat(a.querySelector('.price').textContent.replace('$', ''));
        const priceB = parseFloat(b.querySelector('.price').textContent.replace('$', ''));
        
        if (method === 'price-low-high') {
            return priceA - priceB;
        } else if (method === 'price-high-low') {
            return priceB - priceA;
        }
    });

    products.forEach(product => productGrid.appendChild(product));
}

// Notification system
function showNotification(message) {
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    document.body.appendChild(notification);

    // Trigger animation
    setTimeout(() => notification.classList.add('show'), 100);

    // Remove notification after 3 seconds
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// Load featured products on homepage
function loadFeaturedProducts() {
    const featuredSection = document.querySelector('.featured-products');
    if (!featuredSection) return;

    // Create carousel structure
    featuredSection.innerHTML = `
        <h2>Featured Collections</h2>
        <div class="carousel-container">
            <button class="carousel-button prev" onclick="previousSlide()">❮</button>
            <div class="carousel-items"></div>
            <button class="carousel-button next" onclick="nextSlide()">❯</button>
        </div>
        <div class="carousel-indicators"></div>
    `;

    // Initialize carousel
    updateCarousel();

    // Auto-advance carousel every 5 seconds
    let autoAdvance = setInterval(nextSlide, 5000);

    // Pause auto-advance when user interacts with carousel
    const carouselContainer = document.querySelector('.carousel-container');
    if (carouselContainer) {
        carouselContainer.addEventListener('mouseenter', () => {
            clearInterval(autoAdvance);
        });
        carouselContainer.addEventListener('mouseleave', () => {
            autoAdvance = setInterval(nextSlide, 5000);
        });
    }
}

function createProductElement(product) {
    const div = document.createElement('div');
    div.className = 'product-item';
    div.setAttribute('data-category', product.category);
    div.setAttribute('data-price', product.price);

    // Get the correct relative path based on the current page
    const imagePath = product.image;

    div.innerHTML = `
        <a href="product.html?id=${product.id}" class="product-link">
            <div class="image-container">
                <div class="loading-spinner"></div>
                <img src="${imagePath}" 
                    alt="${product.name}" 
                    loading="lazy"
                    onload="(function(img) {
                        console.log('Successfully loaded image:', img.src);
                        img.closest('.image-container').classList.add('loaded');
                    })(this)"
                    onerror="(function(img) { 
                        console.error('Failed to load image:', img.src); 
                        img.src='data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjQwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZjBmMGYwIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxNiIgZmlsbD0iIzY2NiIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPkltYWdlIG5vdCBhdmFpbGFibGU8L3RleHQ+PC9zdmc+';
                        img.closest('.image-container').classList.add('error');
                    })(this)">
            </div>
            <div class="product-details">
                <h3>${product.name}</h3>
                <p class="description">${product.description}</p>
                <p class="price">$${product.price.toFixed(2)}</p>
            </div>
        </a>
        <button onclick="event.preventDefault(); event.stopPropagation(); addToCart(${product.id})" class="add-to-cart">Add to Cart</button>
    `;

    // Debug log
    console.log('Creating product element:', product.name, 'Image path:', imagePath);
    
    return div;
}

// Initialize page-specific functionality
document.addEventListener('DOMContentLoaded', () => {
    // Initialize cart count
    updateCartCount();

    // Check if we're on the shop page
    const isShopPage = window.location.pathname.includes('shop.html');
    const isHomePage = window.location.pathname.includes('index.html') || window.location.pathname.endsWith('/');

    if (isShopPage) {
        // Load all products for shop page
        const productGrid = document.querySelector('.product-grid');
        if (productGrid) {
            products.forEach(product => {
                const productElement = createProductElement(product);
                productGrid.appendChild(productElement);
            });
        }

        // Initialize sorting
        const sortSelect = document.querySelector('#sort-products');
        if (sortSelect) {
            sortSelect.addEventListener('change', (e) => sortProducts(e.target.value));
        }

        // Initialize filtering
        const filterButtons = document.querySelectorAll('.filter-button');
        filterButtons.forEach(button => {
            button.addEventListener('click', () => {
                filterButtons.forEach(btn => btn.classList.remove('active'));
                button.classList.add('active');
                filterProducts(button.dataset.category);
            });
        });
    } else if (isHomePage) {
        // Load featured products for homepage
        loadFeaturedProducts();
    }
}); 
