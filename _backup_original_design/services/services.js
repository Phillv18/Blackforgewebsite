// ========================================
// BLACK FORGE SYSTEMS - Services Division JavaScript
// ========================================

document.addEventListener('DOMContentLoaded', function() {

    // Mobile Menu Toggle
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');

    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', function() {
            navLinks.classList.toggle('active');
            this.classList.toggle('active');
        });
    }

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const headerOffset = 120; // Account for fixed nav + division badge
                const elementPosition = target.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });

                // Close mobile menu if open
                navLinks.classList.remove('active');
                mobileMenuBtn.classList.remove('active');
            }
        });
    });

    // Navbar background on scroll
    const navbar = document.querySelector('.navbar');

    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Animate elements on scroll
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    // Observe elements for animation
    document.querySelectorAll('.service-card, .stat, .capability-item, .about-content, .about-image, .engagement-card, .process-card').forEach(el => {
        el.classList.add('animate-on-scroll');
        observer.observe(el);
    });

    // Form handling
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();

            // Get form data
            const formData = new FormData(this);
            const data = Object.fromEntries(formData);

            // Show success message
            const btn = this.querySelector('button[type="submit"]');
            const originalText = btn.textContent;
            btn.textContent = 'Inquiry Sent!';
            btn.style.background = '#22c55e';

            setTimeout(() => {
                btn.textContent = originalText;
                btn.style.background = '';
                this.reset();
            }, 3000);
        });
    }

    // Stats counter animation
    const statsSection = document.querySelector('.stats-banner');
    let statsAnimated = false;

    if (statsSection) {
        const statsObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !statsAnimated) {
                    statsAnimated = true;
                    animateStats();
                }
            });
        }, { threshold: 0.5 });

        statsObserver.observe(statsSection);
    }

    function animateStats() {
        document.querySelectorAll('.stat-number').forEach(stat => {
            const text = stat.textContent;
            const hasPlus = text.includes('+');
            const hasPercent = text.includes('%');
            const isSpecial = text.includes('/') || text.includes(':') || isNaN(parseInt(text));

            if (isSpecial) return; // Skip non-numeric stats

            const num = parseInt(text);
            if (isNaN(num)) return;

            let current = 0;
            const increment = num / 50;
            const suffix = hasPlus ? '+' : (hasPercent ? '%' : '');

            const timer = setInterval(() => {
                current += increment;
                if (current >= num) {
                    stat.textContent = num + suffix;
                    clearInterval(timer);
                } else {
                    stat.textContent = Math.floor(current) + suffix;
                }
            }, 30);
        });
    }

    // Parallax effect for hero background
    const heroBg = document.querySelector('.hero-bg');

    if (heroBg) {
        window.addEventListener('scroll', function() {
            const scrolled = window.pageYOffset;
            const rate = scrolled * 0.3;
            heroBg.style.transform = `translateY(${rate}px)`;
        });
    }

    // Service card hover effects
    document.querySelectorAll('.service-card').forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px)';
        });
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });

    console.log('Black Forge Systems - Services Division Initialized');
});
