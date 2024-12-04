const cartButton = document.getElementById('cart-button');
const cartSection = document.getElementById('cart-section');
const cartList = document.getElementById('cart-list');
const totalPriceElement = document.getElementById('total-price');
const cartCount = document.getElementById('cart-count');

let cart = [];

// Add to cart
document.querySelectorAll('.add-to-cart').forEach(button => {
    button.addEventListener('click', () => {
        const productName = button.dataset.product;
        const productPrice = parseInt(button.dataset.price);

        // Add product to cart
        cart.push({ name: productName, price: productPrice });

        // Update UI
        updateCartUI();
    });
});

document.getElementById('checkout-btn').addEventListener('click', () => {
    // Savatchadagi mahsulotlarni olish
    const cartItems = Array.from(document.querySelectorAll('#cart-list li')).map(item => item.innerText);
    const total = document.getElementById('total-price').textContent;

    // Yuboriladigan xabarni tayyorlash
    const message = `
TEEO MARKET
Buyurtma:
${cartItems.join('\n')}
${total}`;

    // Telegram botga xabarni yuborish uchun URL
    const telegramUrl = `https://t.me/teo_market_bot?text=${encodeURIComponent(message)}`;
    window.open(telegramUrl, '_blank'); // Yangi oynada Telegram ochiladi
});

function updateCartUI() {
    // Update cart list
    cartList.innerHTML = '';
    let total = 0;

    cart.forEach(item => {
        const li = document.createElement('li');
        li.innerHTML = `
            <span>${item.name}</span>
            <span>${item.price} so'm</span>
        `;
        cartList.appendChild(li);
        total += item.price;
    });

    totalPriceElement.textContent = `Jami: ${total} so'm`;
    cartCount.textContent = cart.length;
}

// Show/hide cart
cartButton.addEventListener('click', () => {
    cartSection.classList.toggle('hidden');
});
