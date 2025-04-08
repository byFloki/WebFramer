"use strict"; // Enforce stricter parsing and error handling

document.addEventListener('DOMContentLoaded', () => {

    console.log("WebFramer Script Loaded"); // Check if script runs

    // --- AOS Initialization ---
    try {
        AOS.init({
            duration: 700,      // Duration of animation
            offset: 80,         // Offset (in px) from the original trigger point
            once: true,         // Animate elements only once
            easing: 'ease-in-out', // Default easing
            // disable: 'phone', // Optional: disable AOS on smaller screens
        });
        console.log("AOS Initialized");
    } catch (e) {
        console.error("AOS Initialization failed:", e);
    }


    // --- Mobile Menu Toggle ---
    const menuToggle = document.getElementById('menu-toggle');
    const mainMenu = document.getElementById('main-menu');

    if (menuToggle && mainMenu) {
        menuToggle.addEventListener('click', () => {
            const isExpanded = menuToggle.getAttribute('aria-expanded') === 'true';
            menuToggle.setAttribute('aria-expanded', !isExpanded);
            mainMenu.classList.toggle('active');
            // Optional: Toggle body scroll lock
            // document.body.classList.toggle('no-scroll', !isExpanded);
        });

        // Close menu if clicking outside
        document.addEventListener('click', (event) => {
            const isClickInsideNav = mainMenu.contains(event.target);
            const isClickOnToggle = menuToggle.contains(event.target);

            if (mainMenu.classList.contains('active') && !isClickInsideNav && !isClickOnToggle) {
                mainMenu.classList.remove('active');
                menuToggle.setAttribute('aria-expanded', 'false');
                // document.body.classList.remove('no-scroll');
            }
        });
    } else {
        console.warn("Menu toggle or main menu element not found.");
    }


    // --- Smooth Scrolling ---
    const headerHeight = document.querySelector('.site-header')?.offsetHeight || 70; // Get header height dynamically or fallback

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');

            // Ensure it's an internal link and not just "#"
            if (targetId && targetId.length > 1 && targetId.startsWith('#')) {
                const targetElement = document.querySelector(targetId);

                if (targetElement) {
                    e.preventDefault();
                    const elementPosition = targetElement.getBoundingClientRect().top;
                    const offsetPosition = elementPosition + window.pageYOffset - headerHeight;

                    window.scrollTo({
                        top: offsetPosition,
                        behavior: "smooth"
                    });

                    // Close mobile menu if open after clicking a link
                    if (mainMenu && mainMenu.classList.contains('active')) {
                         mainMenu.classList.remove('active');
                         menuToggle.setAttribute('aria-expanded', 'false');
                         // document.body.classList.remove('no-scroll');
                    }
                } else {
                    console.warn(`Smooth scroll target not found for ID: ${targetId}`);
                }
            }
        });
    });


    // --- Footer Year ---
    const yearSpan = document.getElementById('year');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    } else {
        console.warn("Year span element not found.");
    }

}); // End DOMContentLoaded
