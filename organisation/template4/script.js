document.addEventListener('DOMContentLoaded', () => {
  // Mobile Menu Toggle
  const hamburger = document.querySelector('.hamburger');
  const navLinks = document.querySelector('.nav-links');

  if (hamburger) {
    hamburger.addEventListener('click', () => {
      navLinks.classList.toggle('active');
      hamburger.classList.toggle('active');
    });
  }

  // Smooth Scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth'
        });
        // Close mobile menu if open
        if (navLinks.classList.contains('active')) {
          navLinks.classList.remove('active');
        }
      }
    });
  });

  // Current Year in Footer
  const yearSpan = document.querySelector('#year');
  if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
  }

  // Active Link Highlighting
  const currentLocation = location.href;
  const menuItems = document.querySelectorAll('.nav-links a');
  const menuLength = menuItems.length;
  for (let i = 0; i < menuLength; i++) {
    if (menuItems[i].href === currentLocation) {
      menuItems[i].classList.add("active");
    }
  }

  // Simple Form Validation (Example for Contact Form)
  const contactForm = document.querySelector('#contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      // Basic validation logic would go here
      alert('Thank you for your message! We will get back to you shortly.');
      contactForm.reset();
    });
  }
  
  // Donation Calculator (Example)
  const donationAmount = document.querySelector('#donation-amount');
  const impactText = document.querySelector('#impact-text');
  
  if (donationAmount && impactText) {
    donationAmount.addEventListener('input', (e) => {
      const val = e.target.value;
      if (val >= 100) {
        impactText.textContent = "Your donation could provide school supplies for 5 children!";
      } else if (val >= 50) {
        impactText.textContent = "Your donation could feed a family for a week!";
      } else if (val >= 20) {
        impactText.textContent = "Your donation could provide hygiene kits for 2 girls.";
      } else {
        impactText.textContent = "Every dollar counts towards empowering our community.";
      }
    });
  }
});
