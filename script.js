
// Product data
const products = [
    {
        id: 1,
        name: "Classic Runner",
        price: 129,
        image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff"
    },
    {
        id: 2,
        name: "Urban Street",
        price: 149,
        image: "https://images.unsplash.com/photo-1551107696-a4b0c5a0d9a2"
    },
    {
        id: 3,
        name: "Sport Elite",
        price: 189,
        image: "https://images.unsplash.com/photo-1560769629-975ec94e6a86"
    }
];

// Mobile menu functionality
document.addEventListener('DOMContentLoaded', function() {
    const menuBtn = document.getElementById('menuBtn');
    const navLinks = document.getElementById('navLinks');
    
    menuBtn.addEventListener('click', function() {
        navLinks.classList.toggle('active');
        const spans = menuBtn.getElementsByTagName('span');
        spans[0].style.transform = navLinks.classList.contains('active') ? 'rotate(45deg) translate(6px, 6px)' : '';
        spans[1].style.opacity = navLinks.classList.contains('active') ? '0' : '1';
        spans[2].style.transform = navLinks.classList.contains('active') ? 'rotate(-45deg) translate(6px, -6px)' : '';
    });

    // Render products
    const productGrid = document.getElementById('productGrid');
    products.forEach(product => {
        const productCard = document.createElement('div');
        productCard.className = 'product-card';
        productCard.innerHTML = `
            <img src="${product.image}" alt="${product.name}" class="product-image">
            <div class="product-info">
                <h3>${product.name}</h3>
                <p>$${product.price}</p>
            </div>
        `;
        productGrid.appendChild(productCard);
    });

    // Simple cart functionality
    const cartBtn = document.getElementById('cartBtn');
    let cartItems = [];

    // Add click event listeners to product cards
    document.querySelectorAll('.product-card').forEach(card => {
        card.addEventListener('click', function() {
            const productName = this.querySelector('h3').textContent;
            const productPrice = parseFloat(this.querySelector('p').textContent.replace('$', ''));
            cartItems.push({ name: productName, price: productPrice });
            alert(`${productName} added to cart!`);
            updateCartCount();
        });
    });

    function updateCartCount() {
        cartBtn.setAttribute('data-count', cartItems.length);
        if (cartItems.length > 0) {
            cartBtn.style.position = 'relative';
            if (!cartBtn.querySelector('.cart-count')) {
                const count = document.createElement('span');
                count.className = 'cart-count';
                count.style.cssText = `
                    position: absolute;
                    top: -8px;
                    right: -8px;
                    background-color: red;
                    color: white;
                    border-radius: 50%;
                    padding: 2px 6px;
                    font-size: 12px;
                `;
                count.textContent = cartItems.length;
                cartBtn.appendChild(count);
            } else {
                cartBtn.querySelector('.cart-count').textContent = cartItems.length;
            }
        }
    }

    // Newsletter form
    const newsletterForm = document.querySelector('.newsletter-form');
    newsletterForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const email = this.querySelector('input[type="email"]').value;
        if (email) {
            alert('Thank you for subscribing!');
            this.querySelector('input[type="email"]').value = '';
        }
    });
});

