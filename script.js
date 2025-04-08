// Initialize AOS (Animate on Scroll) Library
AOS.init({
    duration: 800, // Animation duration in milliseconds
    offset: 100,    // Offset (in px) from the original trigger point
    once: true,     // Whether animation should happen only once - while scrolling down
    easing: 'ease-in-out', // Default easing
});

// Smooth Scrolling for internal links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        // Check if the link is just the base URL '#' (often used for top links)
        if (this.getAttribute('href') === '#') {
             e.preventDefault();
             window.scrollTo({
                top: 0,
                behavior: "smooth"
             });
             // Close mobile menu if open
            const navMenu = document.querySelector('header nav ul');
            if (navMenu && navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
            }
             return; // Stop further processing for '#' link
        }

        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);

        if (targetElement) {
            e.preventDefault(); // Prevent default only if target exists

            const headerOffset = 75; // Height of your fixed header
            const elementPosition = targetElement.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: "smooth"
            });

            // Close mobile menu if open after clicking a link
            const navMenu = document.querySelector('header nav ul');
             if (navMenu && navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
            }
        }
    });
});

// Update Footer Year Automatically
const yearSpan = document.getElementById('year');
if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
}

// Mobile Menu Toggle
const menuToggle = document.getElementById('menu-toggle');
const navMenu = document.querySelector('header nav ul');

if (menuToggle && navMenu) {
    menuToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active'); // Toggles the 'active' class on the nav ul
    });
}

// Optional: Close mobile menu if clicked outside
document.addEventListener('click', function(event) {
  const isClickInsideNav = navMenu.contains(event.target);
  const isClickOnToggle = menuToggle.contains(event.target);

  if (!isClickInsideNav && !isClickOnToggle && navMenu.classList.contains('active')) {
    navMenu.classList.remove('active');
  }
});
