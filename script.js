/**
 * Horizon Insight Research Initiative (HiR) Website
 * Minimal JavaScript for functionality
 */

document.addEventListener('DOMContentLoaded', function() {
    // Set current year in footer
    document.getElementById('currentYear').textContent = new Date().getFullYear();

    // Mobile Menu Toggle
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link, .dropdown-link');

    mobileMenuBtn.addEventListener('click', () => {
        navMenu.classList.toggle('active');
    });

    // Dropdown Toggle on Mobile
    const dropdownToggles = document.querySelectorAll('.dropdown-toggle');
    
    dropdownToggles.forEach(toggle => {
        toggle.addEventListener('click', function(e) {
            if (window.innerWidth <= 768) {
                e.preventDefault();
                const dropdown = this.parentElement;
                dropdown.classList.toggle('active');
                
                // Close other open dropdowns
                dropdownToggles.forEach(otherToggle => {
                    if (otherToggle !== this) {
                        otherToggle.parentElement.classList.remove('active');
                    }
                });
            }
        });
    });

    // Close mobile menu when clicking a link
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (window.innerWidth <= 768) {
                navMenu.classList.remove('active');
                mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
                
                // Close any open dropdowns
                document.querySelectorAll('.dropdown').forEach(d => {
                    d.classList.remove('active');
                });
            }
        });
    });

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            // Skip if it's just "#" or a dropdown toggle on mobile
            if (href === '#' || (href === '#services' && window.innerWidth <= 768)) {
                return;
            }

            e.preventDefault();
            const targetId = href.substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 100,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Simple form handling (prevent default, show message)
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // In a real implementation, you would send data to a server here
            // For now, just show an alert and reset the form
            alert('Thank you for your message. For now, please email us directly at info@hir-kakuma.org. This form is a prototype.');
            contactForm.reset();
        });
    }

    // Close dropdowns when clicking outside (desktop)
    document.addEventListener('click', function(e) {
        if (window.innerWidth > 768) {
            if (!e.target.closest('.dropdown')) {
                document.querySelectorAll('.dropdown').forEach(dropdown => {
                    dropdown.classList.remove('active');
                });
            }
        }
    });

    // Hover behavior for dropdowns on desktop
    const dropdowns = document.querySelectorAll('.dropdown');
    dropdowns.forEach(dropdown => {
        dropdown.addEventListener('mouseenter', function() {
            if (window.innerWidth > 768) {
                this.classList.add('active');
            }
        });
        
        dropdown.addEventListener('mouseleave', function() {
            if (window.innerWidth > 768) {
                this.classList.remove('active');
            }
        });
    });

    // Handle window resize
    window.addEventListener('resize', function() {
        // Reset mobile menu if window is resized to desktop size
        if (window.innerWidth > 768) {
            navMenu.classList.remove('active');
            mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';

            // Reset dropdowns
            document.querySelectorAll('.dropdown').forEach(d => {
                d.classList.remove('active');
            });
        }
    });

    // Team Carousel Functionality
    const teamGrid = document.querySelector('.team-grid');
    const teamCards = document.querySelectorAll('.team-card');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    let currentIndex = 2; // Start with the third card active (index 2)

    function updateCarousel() {
        // Remove active class from all cards
        teamCards.forEach(card => card.classList.remove('active'));

        // Add active class to current card
        teamCards[currentIndex].classList.add('active');

        // Calculate transform for centering the active card
        const cardWidth = 250 + 30; // card width + gap
        const offset = -(currentIndex * cardWidth) + (teamGrid.parentElement.offsetWidth / 2) - (250 / 2);
        teamGrid.style.transform = `translateX(${offset}px)`;
    }

    if (prevBtn && nextBtn) {
        prevBtn.addEventListener('click', function() {
            currentIndex = Math.max(0, currentIndex - 1);
            updateCarousel();
        });

        nextBtn.addEventListener('click', function() {
            currentIndex = Math.min(teamCards.length - 1, currentIndex + 1);
            updateCarousel();
        });
    }

    // Initialize carousel
    updateCarousel();

    // Handle window resize for carousel
    window.addEventListener('resize', function() {
        if (window.innerWidth > 1024) {
            updateCarousel();
        }
    });
});
