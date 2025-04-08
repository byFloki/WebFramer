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
    // MODIFIED: Select by class name used in CSS
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('.nav-menu'); // MODIFIED: Select by class name used in CSS & renamed variable

    if (menuToggle && navMenu) { // MODIFIED: Check updated variable name
        console.log("Menu toggle and nav menu found."); // Added confirmation
        menuToggle.addEventListener('click', () => {
            const isExpanded = menuToggle.getAttribute('aria-expanded') === 'true';
            menuToggle.setAttribute('aria-expanded', !isExpanded);
            navMenu.classList.toggle('active'); // MODIFIED: Use updated variable name
            console.log("Menu toggled. Active class:", navMenu.classList.contains('active')); // Added confirmation
            // Optional: Toggle body scroll lock
            // document.body.classList.toggle('no-scroll', !isExpanded);
            // If using scroll lock, make sure you have CSS for .no-scroll { overflow: hidden; }
        });

        // Close menu if clicking outside
        document.addEventListener('click', (event) => {
            // MODIFIED: Check updated variable names
            if (!navMenu.classList.contains('active')) {
                return; // Don't do anything if menu is already closed
            }

            const isClickInsideNav = navMenu.contains(event.target);
            const isClickOnToggle = menuToggle.contains(event.target);

            if (!isClickInsideNav && !isClickOnToggle) {
                navMenu.classList.remove('active'); // MODIFIED: Use updated variable name
                menuToggle.setAttribute('aria-expanded', 'false');
                console.log("Menu closed via outside click."); // Added confirmation
                // document.body.classList.remove('no-scroll');
            }
        });
    } else {
        // Be more specific about what wasn't found
        if (!menuToggle) console.warn("Menu toggle element (.menu-toggle) not found.");
        if (!navMenu) console.warn("Nav menu element (.nav-menu) not found.");
    }


    // --- Smooth Scrolling ---
    // Ensure header height calculation happens *after* potential layout shifts
    let headerHeight = 70; // Default fallback
    const siteHeader = document.querySelector('.site-header');
    if (siteHeader) {
        // Recalculate header height on resize potentially, if header height changes
        // For simplicity, calculate once on load, ensure CSS handles sticky height well
        headerHeight = siteHeader.offsetHeight;
    } else {
        console.warn("Site header (.site-header) not found for height calculation.");
    }


    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');

            // Ensure it's an internal link and not just "#" or empty
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
                    // MODIFIED: Check updated variable names
                    if (navMenu && navMenu.classList.contains('active')) {
                         navMenu.classList.remove('active');
                         // Also ensure the toggle button state is reset
                         if (menuToggle) {
                            menuToggle.setAttribute('aria-expanded', 'false');
                         }
                         console.log("Menu closed via nav link click."); // Added confirmation
                         // document.body.classList.remove('no-scroll');
                    }
                } else {
                    console.warn(`Smooth scroll target not found for ID: ${targetId}`);
                }
            }
             // Optional: If it's a non-hash link within the mobile menu, you might still want to close it
             else if (navMenu && navMenu.contains(this) && navMenu.classList.contains('active')) {
                 navMenu.classList.remove('active');
                 if (menuToggle) {
                     menuToggle.setAttribute('aria-expanded', 'false');
                 }
                 console.log("Menu closed via non-anchor link click.");
                 // document.body.classList.remove('no-scroll');
             }
        });
    });


    // --- Footer Year ---
    const yearSpan = document.getElementById('year');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    } else {
        console.warn("Year span element (#year) not found.");
    }

}); // End DOMContentLoaded