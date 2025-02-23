    document.getElementById('shopNowBtn').addEventListener('click', function() {
            document.getElementById('featuredProducts').scrollIntoView({ behavior: 'smooth' });
        });

        // Check authentication status
        document.addEventListener('DOMContentLoaded', function() {
            const user = localStorage.getItem('user');
            const profileLink = document.getElementById('profileLink');
            const authLink = document.getElementById('authLink');
            
            if (user) {
                profileLink.style.display = 'block';
                authLink.style.display = 'none';
            } else {
                profileLink.style.display = 'none';
                authLink.style.display = 'block';
            }

            // Mobile menu functionality
            const menuBtn = document.getElementById('menuBtn');
            const navLinks = document.getElementById('navLinks');
            
            menuBtn.addEventListener('click', function() {
                navLinks.classList.toggle('active');
            });

            // Shopping cart functionality
            const cartBtn = document.getElementById('cartBtn');
            const cartModal = document.getElementById('cartModal');
            const cartOverlay = document.getElementById('cartOverlay');
            const closeBtn = document.querySelector('.cart-close');
            const cartItems = document.getElementById('cartItems');
            const cartTotal = document.getElementById('cartTotal');
            let cart = JSON.parse(localStorage.getItem('cart')) || [];

            function updateCartDisplay() {
                cartItems.innerHTML = cart.map(item => `
                    <div class="cart-item">
                        <img src="${item.image}" alt="${item.name}" style="width: 50px; height: 50px; object-fit: cover;">
                        <div class="cart-item-details">
                            <h4>${item.name}</h4>
                            <p>$${item.price}</p>
                        </div>
                        <button onclick="removeFromCart('${item.id}')" class="btn-remove">Remove</button>
                    </div>
                `).join('');

                const total = cart.reduce((sum, item) => sum + item.price, 0);
                cartTotal.textContent = total.toFixed(2);
            }

            cartBtn.addEventListener('click', function() {
                cartModal.classList.add('active');
                cartOverlay.classList.add('active');
                updateCartDisplay();
            });

            closeBtn.addEventListener('click', function() {
                cartModal.classList.remove('active');
                cartOverlay.classList.remove('active');
            });

            cartOverlay.addEventListener('click', function() {
                cartModal.classList.remove('active');
                cartOverlay.classList.remove('active');
            });

            // Add to cart functionality
            document.querySelectorAll('.add-to-cart').forEach(button => {
                button.addEventListener('click', function(event) {
                    event.stopPropagation();
                    const productId = this.dataset.id;
                    const productName = this.dataset.name;
                    const productPrice = parseFloat(this.dataset.price);
                    const productImage = this.closest('.product-card').querySelector('img').src;

                    cart.push({
                        id: productId,
                        name: productName,
                        price: productPrice,
                        image: productImage
                    });

                    localStorage.setItem('cart', JSON.stringify(cart));
                    updateCartDisplay();
                });
            });

            // Remove from cart functionality
            window.removeFromCart = function(productId) {
                cart = cart.filter(item => item.id !== productId);
                localStorage.setItem('cart', JSON.stringify(cart));
                updateCartDisplay();
            };

            // Update cart display on load
            updateCartDisplay();
        });