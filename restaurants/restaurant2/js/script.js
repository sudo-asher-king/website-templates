document.addEventListener('DOMContentLoaded', () => {
    // Mobile Navigation Toggle
    const hamburger = document.querySelector('.hamburger');
    const nav = document.querySelector('header nav');

    if (hamburger && nav) {
        // set initial ARIA state
        hamburger.setAttribute('role', 'button');
        hamburger.setAttribute('aria-controls', 'site-navigation');
        hamburger.setAttribute('aria-expanded', 'false');
        nav.setAttribute('id', 'site-navigation');
        nav.setAttribute('aria-hidden', 'true');

        hamburger.addEventListener('click', (e) => {
            const open = nav.classList.toggle('active');
            hamburger.setAttribute('aria-expanded', open ? 'true' : 'false');
            nav.setAttribute('aria-hidden', open ? 'false' : 'true');
        });

        // Close menu when a nav link is clicked (mobile)
        nav.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                if (nav.classList.contains('active')) {
                    nav.classList.remove('active');
                    hamburger.setAttribute('aria-expanded', 'false');
                    nav.setAttribute('aria-hidden', 'true');
                }
            });
        });

        // Close when clicking outside
        document.addEventListener('click', (e) => {
            if (!nav.classList.contains('active')) return;
            const isClickInside = nav.contains(e.target) || hamburger.contains(e.target);
            if (!isClickInside) {
                nav.classList.remove('active');
                hamburger.setAttribute('aria-expanded', 'false');
                nav.setAttribute('aria-hidden', 'true');
            }
        });

        // Close on Escape
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && nav.classList.contains('active')) {
                nav.classList.remove('active');
                hamburger.setAttribute('aria-expanded', 'false');
                nav.setAttribute('aria-hidden', 'true');
                hamburger.focus();
            }
        });
    }

    // Menu Tab Switching
    const tabBtns = document.querySelectorAll('.tab-btn');
    const menuSections = document.querySelectorAll('.menu-section');

    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const target = btn.dataset.target;

            tabBtns.forEach(b => b.classList.remove('active'));
            menuSections.forEach(s => s.classList.remove('active'));

            btn.classList.add('active');
            document.getElementById(target).classList.add('active');
        });
    });

    // Smooth Scrolling
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
});
