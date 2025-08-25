document.addEventListener('DOMContentLoaded', () => {
    const cartNum = document.getElementById('cart-numb');
    if (!cartNum) {
        console.error("Cart number element not found");
        return;
    }

    // Load from storage or empty array
    let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    cartNum.textContent = cartItems.reduce((total, item) => total + item.quantity, 0);

    const quantitySelectorHTML = `
        <div class="quantity-selector">
            <button class="decrease">-</button>
            <input type="number" class="quantity-input" value="1" min="0">
            <button class="increase">+</button>
        </div>
    `;

    document.addEventListener('click', (event) => {
        const target = event.target;

        // --- Add to Cart ---
        if (target.matches('.add-to-cart')) {
            const card = target.closest('.card');
            if (!card) {
                console.error("Card container not found");
                return;
            }

            const nameElement = card.querySelector('.name');
            const priceElement = card.querySelector('.price');

            if (!nameElement || !priceElement) {
                console.error("Missing .name or .price in card");
                return;
            }

            const name = nameElement.textContent.trim();
            const priceText = priceElement.textContent.replace('$', '').trim();
            const price = parseFloat(priceText);

            // Replace button
            target.outerHTML = quantitySelectorHTML;

            // Add to cart
            cartItems.push({ name, price, quantity: 1 });
            saveCart();
            updateTotalCartNumber();
        }

        // --- Handle quantity buttons ---
        const selector = target.closest('.quantity-selector');
        if (!selector) return;

        const quantityInput = selector.querySelector('.quantity-input');
        const card = selector.closest('.card');
        if (!card || !quantityInput) return;

        const name = card.querySelector('.name')?.textContent.trim();
        const cartItem = cartItems.find(item => item.name === name);

        if (!cartItem) {
            console.error("Cart item not found for:", name);
            return;
        }

        if (target.matches('.increase')) {
            quantityInput.value++;
            cartItem.quantity++;
        }

        if (target.matches('.decrease')) {
            quantityInput.value--;
            cartItem.quantity--;
        }

        if (Number(quantityInput.value) <= 0) {
            selector.outerHTML = `<button class="add-to-cart">Add to Cart</button>`;
            cartItems = cartItems.filter(item => item.name !== name);
        }

        saveCart();
        updateTotalCartNumber();
    });

    function updateTotalCartNumber() {
        const total = cartItems.reduce((sum, item) => sum + item.quantity, 0);
        cartNum.textContent = total;
    }

    function saveCart() {
        localStorage.setItem('cartItems', JSON.stringify(cartItems));
        console.log("Cart updated:", cartItems);
    }
});
