// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Header background change on scroll
const header = document.querySelector('header');
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        header.style.padding = '0.5rem 5%';
        header.style.background = 'rgba(255, 255, 255, 0.98)';
        header.style.boxShadow = '0 5px 20px rgba(0,0,0,0.1)';
    } else {
        header.style.padding = '0.8rem 5%';
        header.style.background = '#ffffff';
        header.style.boxShadow = '0 2px 20px rgba(0,0,0,0.1)';
    }
});

// Simple intersection observer for animations
const observerOptions = {
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

document.querySelectorAll('.service-card, .about-text-content, .about-services-content, .section-header').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'all 0.8s ease-out';
    observer.observe(el);
});

document.querySelectorAll('.premium-services-list li').forEach((el, index) => {
    el.style.opacity = '0';
    el.style.transform = 'translateX(-20px)';
    el.style.transition = `all 0.5s ease-out ${index * 0.1}s`;
    observer.observe(el);
});

// Add animation class via JS to simplify CSS
const style = document.createElement('style');
style.textContent = `
    .animate {
        opacity: 1 !important;
        transform: translate(0, 0) !important;
    }
`;
document.head.appendChild(style);

// Count-up animation for stats when they come into view
const statObserver = new IntersectionObserver((entries, statObs) => {
    entries.forEach(entry => {
        if (!entry.isIntersecting) return;

        const el = entry.target;
        const target = parseInt(el.getAttribute('data-target'), 10);
        if (isNaN(target)) {
            statObs.unobserve(el);
            return;
        }

        const suffix = el.getAttribute('data-suffix') || '';
        const duration = 1500; // ms
        const startTime = performance.now();

        const startValue = 0;

        const tick = (now) => {
            const progress = Math.min((now - startTime) / duration, 1);
            const current = Math.floor(startValue + (target - startValue) * progress);
            el.textContent = `${current}${suffix}`;

            if (progress < 1) {
                requestAnimationFrame(tick);
            }
        };

        requestAnimationFrame(tick);
        statObs.unobserve(el);
    });
}, { threshold: 0.5 });

document.querySelectorAll('.stat-number').forEach(el => {
    statObserver.observe(el);
});

// Mobile Menu Toggle
const mobileMenu = document.getElementById('mobile-menu');
const nav = document.querySelector('nav');

if (mobileMenu) {
    mobileMenu.addEventListener('click', () => {
        nav.classList.toggle('active');
        const icon = mobileMenu.querySelector('i');
        if (nav.classList.contains('active')) {
            icon.classList.remove('fa-bars');
            icon.classList.add('fa-times');
        } else {
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        }
    });
}

// Close mobile menu when clicking a link
document.querySelectorAll('nav a').forEach(link => {
    link.addEventListener('click', () => {
        nav.classList.remove('active');
        const icon = mobileMenu.querySelector('i');
        if (icon) {
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        }
    });
});
