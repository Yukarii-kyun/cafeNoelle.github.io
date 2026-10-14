// Page Router function supporting multiple pages across sections
function switchPage(pageId) {
    let targetView = pageId;
    if (['story', 'branches'].includes(pageId)) targetView = 'about';
    if (['menu-dining', 'menu-coffee', 'menu-desserts'].includes(pageId)) {
        targetView = 'menu';
        if(pageId === 'menu-dining') filterMenu('dining');
        if(pageId === 'menu-coffee') filterMenu('coffee');
        if(pageId === 'menu-desserts') filterMenu('desserts');
    }
    if (['packages', 'inquiry'].includes(pageId)) targetView = 'events';
    if (['promotions', 'vip', 'merch', 'table-reservation', 'faqs'].includes(pageId)) targetView = 'promos';

    // Hide all pages
    const pages = document.querySelectorAll('.page-content');
    pages.forEach(p => p.classList.add('hidden'));

    // Show selected page
    const activePage = document.getElementById(`page-${targetView}`);
    if (activePage) {
        activePage.classList.remove('hidden');
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
}

// Mobile menu toggle
function toggleMobileMenu() {
    const menu = document.getElementById('mobileMenu');
    menu.classList.toggle('hidden');
}

// Menu filter function
function filterMenu(category) {
    const cards = document.querySelectorAll('.menu-card');
    cards.forEach(card => {
        if (category === 'all' || card.getAttribute('data-category') === category) {
            card.style.display = 'flex';
        } else {
            card.style.display = 'none';
        }
    });

    // Update tab styles
    const tabs = document.querySelectorAll('.menu-tab-btn');
    tabs.forEach(tab => {
        if (tab.getAttribute('data-category') === category || (category === 'all' && tab.getAttribute('data-category') === 'all')) {
            tab.className = "menu-tab-btn px-6 py-2.5 rounded-xl font-medium text-xs bg-brand-primary text-white transition shadow-sm";
        } else {
            tab.className = "menu-tab-btn px-6 py-2.5 rounded-xl font-medium text-xs bg-white text-brand-dark border border-brand-accent hover:bg-brand-accent/20 transition";
        }
    });
}

// Form Handlers replacing alert()
function handleReservation(e) {
    e.preventDefault();
    showModal('Reservation Confirmed!', 'Your table has been successfully reserved. A confirmation SMS and email have been dispatched.');
    e.target.reset();
}

function handleEventInquiry(e) {
    e.preventDefault();
    showModal('Inquiry Received!', 'Thank you! Our Events & Catering team will contact you within 24 hours with custom packages.');
    e.target.reset();
}

function showModal(title, message) {
    document.getElementById('modalTitle').innerText = title;
    document.getElementById('modalMessage').innerText = message;
    const modal = document.getElementById('customModal');
    modal.classList.remove('hidden');
    setTimeout(() => {
        modal.classList.remove('opacity-0');
        document.getElementById('modalContent').classList.remove('scale-95');
    }, 10);
}

function closeModal() {
    const modal = document.getElementById('customModal');
    modal.classList.add('opacity-0');
    document.getElementById('modalContent').classList.add('scale-95');
    setTimeout(() => {
        modal.classList.add('hidden');
    }, 300);
}