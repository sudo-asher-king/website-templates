// Data Models
const menuItems = [
    {
        id: 1,
        name: "Signature Burger",
        category: "mains",
        price: 18.00,
        description: "Wagyu beef patty, aged cheddar, truffle aioli, brioche bun.",
        image: "assets/images/burger.png"
    },
    {
        id: 2,
        name: "Truffle Risotto",
        category: "mains",
        price: 24.00,
        description: "Arborio rice, wild mushrooms, parmesan crisp, truffle oil.",
        image: null
    },
    {
        id: 3,
        name: "Crispy Calamari",
        category: "starters",
        price: 14.00,
        description: "Served with marinara and lemon aioli.",
        image: null
    },
    {
        id: 4,
        name: "Caprese Salad",
        category: "starters",
        price: 12.00,
        description: "Heirloom tomatoes, fresh mozzarella, basil, balsamic glaze.",
        image: null
    },
    {
        id: 5,
        name: "Chocolate Lava Cake",
        category: "desserts",
        price: 10.00,
        description: "Warm molten center, served with vanilla bean ice cream.",
        image: null
    },
    {
        id: 6,
        name: "Artisan Cocktails",
        category: "drinks",
        price: 15.00,
        description: "Ask your server about our seasonal rotations.",
        image: null
    }
];

const events = [
    { title: "Live Jazz Night", date: "Every Friday, 7PM" },
    { title: "Wine Tasting Workshop", date: "Nov 24th, 6PM" },
    { title: "Chef's Table Experience", date: "Dec 1st, 8PM" }
];

const testimonials = [
    { text: "The best dining experience I've had in years. The burger is a must-try!", author: "- Jane Doe" },
    { text: "Incredible atmosphere and even better service. Highly recommended!", author: "- John Smith" },
    { text: "A hidden gem in the city. The truffle risotto was divine.", author: "- Emily R." }
];

// DOM Elements
const menuGrid = document.getElementById('menu-grid');
const filterBtns = document.querySelectorAll('.filter-btn');
const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
const navLinks = document.querySelector('.nav-links');
const cartItemsContainer = document.getElementById('cart-items');
const cartTotalElement = document.getElementById('cart-total');
const cartCountElement = document.getElementById('cart-count');
const checkoutBtn = document.getElementById('checkout-btn');
const reservationForm = document.getElementById('reservation-form');
const reservationMessage = document.getElementById('reservation-message');
const newsletterForm = document.getElementById('newsletter-form');
const giftCardForm = document.getElementById('gift-card-form');
const eventsList = document.getElementById('events-list');

// State
let cart = JSON.parse(localStorage.getItem('cart')) || [];
let currentCategory = 'all';

// Initialization
document.addEventListener('DOMContentLoaded', () => {
    renderMenu();
    updateCartUI();
    renderEvents();
    startTestimonialRotator();
    
    // Mobile Menu Toggle
    mobileMenuBtn.addEventListener('click', () => {
        navLinks.classList.toggle('active');
    });

    // Close mobile menu when clicking a link
    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
        });
    });
});

// Menu Rendering
function renderMenu() {
    menuGrid.innerHTML = '';
    
    const filteredItems = currentCategory === 'all' 
        ? menuItems 
        : menuItems.filter(item => item.category === currentCategory);

    filteredItems.forEach(item => {
        const itemEl = document.createElement('div');
        itemEl.className = 'menu-item';
        
        // Use placeholder if no image
        const imgPath = item.image || `https://placehold.co/400x300?text=${encodeURIComponent(item.name)}`;

        itemEl.innerHTML = `
            <img src="${imgPath}" alt="${item.name}" class="menu-img">
            <div class="menu-content">
                <div class="menu-header">
                    <h4 class="menu-title">${item.name}</h4>
                    <span class="menu-price">$${item.price.toFixed(2)}</span>
                </div>
                <p class="menu-desc">${item.description}</p>
                <button class="btn btn-primary full-width" onclick="addToCart(${item.id})">Add to Order</button>
            </div>
        `;
        menuGrid.appendChild(itemEl);
    });
}

// Filter Logic
filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        // Remove active class from all
        filterBtns.forEach(b => b.classList.remove('active'));
        // Add active to click
        btn.classList.add('active');
        
        currentCategory = btn.dataset.category;
        renderMenu();
    });
});

// Cart Logic
window.addToCart = function(id) {
    const item = menuItems.find(i => i.id === id);
    const existing = cart.find(i => i.id === id);

    if (existing) {
        existing.qty++;
    } else {
        cart.push({ ...item, qty: 1 });
    }

    saveCart();
    updateCartUI();
    
    // Visual feedback
    const btn = event.target;
    const originalText = btn.innerText;
    btn.innerText = "Added!";
    btn.style.backgroundColor = "#27ae60";
    setTimeout(() => {
        btn.innerText = originalText;
        btn.style.backgroundColor = ""; // reset
    }, 1000);
};

function removeFromCart(id) {
    cart = cart.filter(i => i.id !== id);
    saveCart();
    updateCartUI();
}

function updateQty(id, change) {
    const item = cart.find(i => i.id === id);
    if (item) {
        item.qty += change;
        if (item.qty <= 0) {
            removeFromCart(id);
        } else {
            saveCart();
            updateCartUI();
        }
    }
}

function saveCart() {
    localStorage.setItem('cart', JSON.stringify(cart));
}

function updateCartUI() {
    cartItemsContainer.innerHTML = '';
    let total = 0;
    let count = 0;

    if (cart.length === 0) {
        cartItemsContainer.innerHTML = '<p class="empty-cart-msg">Your cart is empty.</p>';
        checkoutBtn.disabled = true;
    } else {
        cart.forEach(item => {
            total += item.price * item.qty;
            count += item.qty;

            const div = document.createElement('div');
            div.className = 'cart-item';
            div.innerHTML = `
                <div class="cart-item-info">
                    <h4>${item.name}</h4>
                    <span>$${item.price.toFixed(2)} x ${item.qty}</span>
                </div>
                <div class="cart-controls">
                    <button onclick="updateQty(${item.id}, -1)">-</button>
                    <button onclick="updateQty(${item.id}, 1)">+</button>
                    <button onclick="removeFromCart(${item.id})" style="color:red; margin-left:5px;">&times;</button>
                </div>
            `;
            cartItemsContainer.appendChild(div);
        });
        checkoutBtn.disabled = false;
    }

    cartTotalElement.innerText = `$${total.toFixed(2)}`;
    cartCountElement.innerText = count;
}

// Order Type Selection
const pickupBtn = document.getElementById('btn-pickup');
const deliveryBtn = document.getElementById('btn-delivery');

[pickupBtn, deliveryBtn].forEach(btn => {
    btn.addEventListener('click', () => {
        pickupBtn.classList.remove('active');
        deliveryBtn.classList.remove('active');
        btn.classList.add('active');
    });
});

checkoutBtn.addEventListener('click', () => {
    alert(`Order placed successfully! Total: ${cartTotalElement.innerText}`);
    cart = [];
    saveCart();
    updateCartUI();
});

// Reservations
reservationForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const reservation = {
        name: document.getElementById('res-name').value,
        email: document.getElementById('res-email').value,
        phone: document.getElementById('res-phone').value,
        guests: document.getElementById('res-guests').value,
        date: document.getElementById('res-date').value,
        time: document.getElementById('res-time').value,
        submittedAt: new Date().toISOString()
    };

    // Save to LocalStorage
    const bookings = JSON.parse(localStorage.getItem('reservations')) || [];
    bookings.push(reservation);
    localStorage.setItem('reservations', JSON.stringify(bookings));

    // Show success
    reservationMessage.innerText = `Table reserved for ${reservation.guests} guests on ${reservation.date} at ${reservation.time}. See you then!`;
    reservationMessage.classList.remove('hidden');
    reservationForm.reset();

    setTimeout(() => {
        reservationMessage.classList.add('hidden');
    }, 5000);
});

// Newsletter
newsletterForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.getElementById('news-email').value;
    
    const subscribers = JSON.parse(localStorage.getItem('subscribers')) || [];
    if (!subscribers.includes(email)) {
        subscribers.push(email);
        localStorage.setItem('subscribers', JSON.stringify(subscribers));
    }
    
    const msg = document.getElementById('news-message');
    msg.innerText = "Thanks for subscribing!";
    msg.classList.remove('hidden');
    newsletterForm.reset();
    
    setTimeout(() => msg.classList.add('hidden'), 3000);
});

// Gift Cards
giftCardForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const amount = document.getElementById('gift-amount').value;
    
    const msg = document.getElementById('gift-message');
    msg.innerText = `Added $${amount} Gift Card to your cart!`;
    msg.classList.remove('hidden');
    
    // Add to cart as a special item
    const id = 999 + parseInt(amount); // simple unique id gen
    const existing = cart.find(i => i.id === id);
    if (!existing) {
        cart.push({
            id: id,
            name: `$${amount} Gift Card`,
            price: parseInt(amount),
            qty: 1,
            category: 'gift'
        });
        saveCart();
        updateCartUI();
    } else {
        updateQty(id, 1);
    }

    setTimeout(() => msg.classList.add('hidden'), 3000);
});

// Events Render
function renderEvents() {
    eventsList.innerHTML = events.map(e => `
        <li>
            <div class="event-title">${e.title}</div>
            <div class="event-date">${e.date}</div>
        </li>
    `).join('');
}

// Testimonials Rotator
let testimonialIdx = 0;
function startTestimonialRotator() {
    const textEl = document.getElementById('testimonial-text');
    const authEl = document.getElementById('testimonial-author');
    
    setInterval(() => {
        testimonialIdx = (testimonialIdx + 1) % testimonials.length;
        const t = testimonials[testimonialIdx];
        
        // Simple fade effect could go here
        textEl.innerText = `"${t.text}"`;
        authEl.innerText = t.author;
    }, 5000);
}