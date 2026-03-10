// ============================================
// Premium Tech Portfolio - JavaScript
// ============================================

// ============================================
// Sidebar Navigation – Active Link Highlighting
// (navbar/hamburger/nav-menu are not used in the
//  sidebar layout; all selectors are null-guarded)
// ============================================
const navbar = document.getElementById('navbar');   // null in sidebar layout – kept for safety
const hamburger = document.getElementById('hamburger'); // null in sidebar layout – kept for safety
const navMenu = document.getElementById('nav-menu');  // null in sidebar layout – kept for safety
const navLinks = document.querySelectorAll('.sidebar-link');

// Scroll effect only when navbar element actually exists
if (navbar) {
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
}

// ============================================
// Mobile Menu Toggle (hamburger not in current layout)
// Wrapped in existence checks to prevent null errors
// ============================================
function openMenu() {
    if (!navMenu || !hamburger) return;
    navMenu.classList.add('active');
    hamburger.classList.add('active');
    hamburger.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
}

function closeMenu() {
    if (!navMenu || !hamburger) return;
    navMenu.classList.remove('active');
    hamburger.classList.remove('active');
    hamburger.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
}

if (hamburger) {
    hamburger.addEventListener('click', () => {
        if (navMenu && navMenu.classList.contains('active')) {
            closeMenu();
        } else {
            openMenu();
        }
    });
}

// Close button
const closeMenuBtn = document.getElementById('closeMenu');
if (closeMenuBtn) {
    closeMenuBtn.addEventListener('click', closeMenu);
}

// Close mobile menu when clicking on a link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        closeMenu();
    });
});

// Close menu when clicking outside
document.addEventListener('click', (e) => {
    if (navMenu && hamburger &&
        navMenu.classList.contains('active') &&
        !navMenu.contains(e.target) &&
        !hamburger.contains(e.target)) {
        closeMenu();
    }
});

// Close menu on ESC key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && navMenu && navMenu.classList.contains('active')) {
        closeMenu();
    }
});

// ============================================
// Logo Link - Scroll to Top
// ============================================
const logoLink = document.querySelector('.nav-logo-link');
if (logoLink) {
    logoLink.addEventListener('click', (e) => {
        e.preventDefault();
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// ============================================
// Smooth Scroll for Navigation Links
// ============================================
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href');
        const targetSection = document.querySelector(targetId);

        if (targetSection) {
            const offsetTop = targetSection.offsetTop - 80;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// ============================================
// AOS-like Scroll Animations
// ============================================
// Ultra-Luxury Slow Fade-Up Animations
const aosObserverOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -150px 0px'
};

const aosObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            setTimeout(() => {
                entry.target.classList.add('aos-animate');
            }, 100);
            aosObserver.unobserve(entry.target);
        }
    });
}, aosObserverOptions);

// Observe all elements with data-aos attribute
document.querySelectorAll('[data-aos]').forEach(el => {
    aosObserver.observe(el);
});

// ============================================
// Animated Counters
// ============================================
function animateCounter(element, target, suffix = '', duration = 2000) {
    const increment = target / (duration / 16);
    let current = 0;

    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = Math.floor(target) + suffix;
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current) + suffix;
        }
    }, 16);
}

const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !entry.target.classList.contains('counted')) {
            entry.target.classList.add('counted');
            const target = parseFloat(entry.target.getAttribute('data-target'));
            const suffix = entry.target.getAttribute('data-suffix') || '';
            animateCounter(entry.target, target, suffix);
        }
    });
}, { threshold: 0.5 });

document.querySelectorAll('.power-metric-value').forEach(counter => {
    counterObserver.observe(counter);
});

// Spotlight effect removed - replaced with luxury card hover

// ============================================
// Progress Bar Animation
// ============================================
const progressBars = document.querySelectorAll('.progress-fill');

const progressObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !entry.target.classList.contains('animated')) {
            entry.target.classList.add('animated');
            const progress = entry.target.getAttribute('data-progress');
            setTimeout(() => {
                entry.target.style.width = progress + '%';
            }, 300);
        }
    });
}, { threshold: 0.5 });

progressBars.forEach(bar => {
    progressObserver.observe(bar);
});

// ============================================
// Timeline Glow Animation on Scroll
// ============================================
const timeline = document.querySelector('.timeline');
if (timeline) {
    const timelineObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const markers = entry.target.querySelectorAll('.timeline-marker');
                markers.forEach((marker, index) => {
                    setTimeout(() => {
                        marker.style.animation = 'pulse 2s ease-in-out infinite';
                    }, index * 200);
                });
            }
        });
    }, { threshold: 0.3 });

    timelineObserver.observe(timeline);
}

// ============================================
// Contact Form Handling with Validation
// ============================================
const contactForm = document.getElementById('contact-form');

if (contactForm) {
    const submitBtn = document.getElementById('submitBtn');
    const btnText = submitBtn.querySelector('.btn-text');
    const btnLoader = submitBtn.querySelector('.btn-loader');

    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const message = document.getElementById('message').value.trim();

        // Basic validation
        if (!name || !email || !message) {
            showNotification('Please fill in all fields', 'error');
            return;
        }

        if (!isValidEmail(email)) {
            showNotification('Please enter a valid email address', 'error');
            return;
        }

        // Show loading state
        submitBtn.classList.add('loading');
        btnText.style.display = 'none';
        btnLoader.style.display = 'inline-block';
        submitBtn.disabled = true;

        // Simulate form submission (replace with actual API call)
        setTimeout(() => {
            // Show success message
            showNotification(`Thank you, ${name}! I'll get back to you at ${email} soon.`, 'success');

            // Reset form
            contactForm.reset();

            // Reset button state
            submitBtn.classList.remove('loading');
            btnText.style.display = 'inline';
            btnLoader.style.display = 'none';
            submitBtn.disabled = false;
        }, 1500);
    });

    // Real-time validation feedback
    const inputs = contactForm.querySelectorAll('input, textarea');
    inputs.forEach(input => {
        input.addEventListener('blur', () => {
            if (input.value.trim() && !input.checkValidity()) {
                input.style.borderColor = '#ff4444';
            } else if (input.value.trim() && input.checkValidity()) {
                input.style.borderColor = '#00ff88';
            }
        });
    });
}

function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function showNotification(message, type = 'success') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 2rem;
        background: rgba(5, 5, 5, 0.95);
        backdrop-filter: blur(20px);
        border: 1px solid ${type === 'success' ? 'rgba(0, 212, 255, 0.3)' : 'rgba(255, 68, 68, 0.3)'};
        border-radius: 12px;
        padding: 1.5rem 2rem;
        z-index: 10000;
        box-shadow: 0 8px 32px rgba(0, 123, 255, 0.3);
        animation: slideInRight 0.3s ease-out;
        max-width: 400px;
    `;
    notification.innerHTML = `
        <div style="display: flex; align-items: center; gap: 1rem;">
            <span style="font-size: 1.5rem;">${type === 'success' ? '✓' : '✕'}</span>
            <p style="color: ${type === 'success' ? '#00D4FF' : '#ff4444'}; margin: 0; font-weight: 500;">${message}</p>
        </div>
    `;
    document.body.appendChild(notification);

    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s ease-out';
        setTimeout(() => notification.remove(), 300);
    }, 4000);
}

// ============================================
// CV Download Button
// ============================================
const cvButton = document.querySelector('.hero .btn-primary');
if (cvButton) {
    cvButton.addEventListener('click', (e) => {
        if (cvButton.getAttribute('href') === '#contact') {
            e.preventDefault();
            const contactSection = document.getElementById('contact');
            const offsetTop = contactSection.offsetTop - 80;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
}

// ============================================
// Active Navigation Link Highlighting
// ============================================
const sections = document.querySelectorAll('section[id]');

window.addEventListener('scroll', () => {
    const scrollY = window.pageYOffset + 150;

    sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop;
        const sectionId = section.getAttribute('id');

        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    });
});

// ============================================
// Project Action Buttons
// ============================================
const demoButtons = document.querySelectorAll('.btn-demo');
const sourceButtons = document.querySelectorAll('.btn-source');

demoButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        // Add your demo link here
        console.log('Demo clicked');
    });
});

sourceButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        // Add your source code link here
        console.log('Source clicked');
    });
});

// ============================================
// Smooth Page Load Animation
// ============================================
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.8s ease-in';
        document.body.style.opacity = '1';
    }, 100);
});

// ============================================
// Back to Top Button
// ============================================
const backToTopBtn = document.getElementById('backToTop');

if (backToTopBtn) {
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            backToTopBtn.classList.add('visible');
        } else {
            backToTopBtn.classList.remove('visible');
        }
    });

    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// ============================================
// Keyboard Navigation Support
// ============================================
document.addEventListener('keydown', (e) => {
    // ESC key closes mobile menu (handled above)
    // Tab navigation improvements
    if (e.key === 'Tab') {
        document.body.classList.add('keyboard-nav');
    }
});

document.addEventListener('mousedown', () => {
    document.body.classList.remove('keyboard-nav');
});

// ============================================
// Tech Stack Carousel Pause on Hover
// ============================================
const techCarousel = document.querySelector('.tech-stack-carousel');
if (techCarousel) {
    const track = techCarousel.querySelector('.tech-stack-track');

    techCarousel.addEventListener('mouseenter', () => {
        track.style.animationPlayState = 'paused';
    });

    techCarousel.addEventListener('mouseleave', () => {
        track.style.animationPlayState = 'running';
    });
}

// LinkedIn gradient is now defined in HTML

// ============================================
// Performance Optimization - Debounce Scroll
// ============================================
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Optimize scroll handlers
const optimizedScrollHandler = debounce(() => {
    // Active nav link highlighting is already optimized
}, 10);

window.addEventListener('scroll', optimizedScrollHandler);

// ============================================
// Add fadeOut animation for success message
// ============================================
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeOut {
        from {
            opacity: 1;
            transform: translate(-50%, -50%) scale(1);
        }
        to {
            opacity: 0;
            transform: translate(-50%, -50%) scale(0.9);
        }
    }
`;
document.head.appendChild(style);

// ============================================
// Theme Toggle (Dark / Light Mode)
// ============================================
const themeToggle = document.getElementById('themeToggle');

// Restore saved preference; default to 'dark'
(function applyStoredTheme() {
    const saved = localStorage.getItem('theme') || 'dark';
    document.body.setAttribute('data-theme', saved);
})();

if (themeToggle) {
    themeToggle.addEventListener('click', () => {
        const current = document.body.getAttribute('data-theme');
        const next = current === 'dark' ? 'light' : 'dark';
        document.body.setAttribute('data-theme', next);
        localStorage.setItem('theme', next);
    });
}
